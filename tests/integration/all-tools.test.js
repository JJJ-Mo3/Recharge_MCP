import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import nock from 'nock';
import { RechargeToolHandlers } from '../../src/tool-handlers.js';
import * as allTools from '../../src/tools/index.js';

describe('Integration Tests - Complete Workflows', () => {
  let handlers;
  const baseUrl = 'https://api.rechargeapps.com';
  const apiKey = 'test_api_key_integration';

  beforeEach(() => {
    handlers = new RechargeToolHandlers(apiKey);
    nock.cleanAll();
    
    // Ensure clean state
    if (!nock.isActive()) {
      nock.activate();
    }
  });

  afterEach(() => {
    nock.cleanAll();
    nock.restore();
  });

  describe('Tool Registration Validation', () => {
    test('should have all required tool categories', () => {
      const toolNames = Object.keys(allTools);
      
      // Customer tools (12)
      expect(toolNames.filter(name => name.includes('Customer'))).toHaveLength(12);
      
      // Subscription tools (29)
      expect(toolNames.filter(name => name.includes('Subscription'))).toHaveLength(29);
      
      // Charge tools (15)
      expect(toolNames.filter(name => name.includes('Charge'))).toHaveLength(15);
      
      // Address tools (8)
      expect(toolNames.filter(name => name.includes('Address'))).toHaveLength(8);
      
      // Discount tools (12)
      expect(toolNames.filter(name => name.includes('Discount'))).toHaveLength(12);
      
      // Product tools (2)
      expect(toolNames.filter(name => name.includes('Product'))).toHaveLength(2);
      
      // Order tools (7)
      expect(toolNames.filter(name => name.includes('Order'))).toHaveLength(7);
    });

    test('should have all advanced tool categories', () => {
      const toolNames = Object.keys(allTools);
      
      // Metafield tools (5)
      expect(toolNames.filter(name => name.includes('Metafield'))).toHaveLength(5);
      
      // Webhook tools (5)
      expect(toolNames.filter(name => name.includes('Webhook'))).toHaveLength(5);
      
      // Payment method tools (3)
      expect(toolNames.filter(name => name.includes('PaymentMethod'))).toHaveLength(3);
      
      // Checkout tools (5)
      expect(toolNames.filter(name => name.includes('Checkout'))).toHaveLength(5);
      
      // One-time product tools (5)
      expect(toolNames.filter(name => name.includes('Onetime'))).toHaveLength(5);
      
      // Store credit tools (4)
      expect(toolNames.filter(name => name.includes('StoreCredit'))).toHaveLength(4);
      
      // Shop tools (2)
      expect(toolNames.filter(name => name.includes('Shop'))).toHaveLength(2);
      
      // Collection tools (5)
      expect(toolNames.filter(name => name.includes('Collection'))).toHaveLength(5);
      
      // Analytics tools (2)
      expect(toolNames.filter(name => name.includes('Analytics'))).toHaveLength(2);
      
      // Plan tools (10)
      expect(toolNames.filter(name => name.includes('Plan'))).toHaveLength(10);
      
      // Shipping rate tools (5)
      expect(toolNames.filter(name => name.includes('ShippingRate'))).toHaveLength(5);
      
      // Tax line tools (2)
      expect(toolNames.filter(name => name.includes('TaxLine'))).toHaveLength(2);
      
      // Bulk operation tools (3)
      expect(toolNames.filter(name => name.includes('Bulk'))).toHaveLength(3);
    });
  });

  describe('Complete Customer Onboarding Workflow', () => {
    test('should handle full customer lifecycle', async () => {
      // Step 1: Create customer
      const customerData = { email: 'integration@test.com', first_name: 'Integration', last_name: 'Test' };
      const createdCustomer = { customer: { id: '12345', ...customerData } };
      
      nock(baseUrl)
        .post('/customers', customerData)
        .reply(201, createdCustomer);

      const createResult = await handlers.handleCreateCustomer(customerData);
      expect(JSON.parse(createResult.content[0].text)).toHaveProperty('customer');

      // Step 2: Create address for customer
      const addressData = {
        customer_id: '12345',
        first_name: 'Integration',
        last_name: 'Test',
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };
      const createdAddress = { address: { id: '67890', ...addressData } };
      
      nock(baseUrl)
        .post('/addresses', addressData)
        .reply(201, createdAddress);

      const addressResult = await handlers.handleCreateAddress(addressData);
      expect(JSON.parse(addressResult.content[0].text)).toHaveProperty('address');

      // Step 3: Create subscription
      const subscriptionData = {
        address_id: '67890',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '1',
        order_interval_unit: 'month',
        quantity: 2,
        shopify_variant_id: '345678'
      };
      const createdSubscription = { subscription: { id: '11111', customer_id: '12345', ...subscriptionData } };
      
      nock(baseUrl)
        .post('/subscriptions', subscriptionData)
        .reply(201, createdSubscription);

      const subscriptionResult = await handlers.handleCreateSubscription(subscriptionData);
      expect(JSON.parse(subscriptionResult.content[0].text)).toHaveProperty('subscription');
    });
  });

  describe('Advanced Feature Workflows', () => {
    test('should handle metafield management workflow', async () => {
      // Create metafield
      nock(baseUrl)
        .post('/metafields')
        .reply(201, { 
          metafield: { 
            id: '123', 
            namespace: 'custom', 
            key: 'notes',
            value: 'VIP customer',
            owner_resource: 'customer',
            owner_id: '456'
          } 
        });

      const createResult = await handlers.handleCreateMetafield({
        namespace: 'custom',
        key: 'notes',
        value: 'VIP customer',
        value_type: 'string',
        owner_resource: 'customer',
        owner_id: '456'
      });

      expect(createResult.content[0].text).toContain('metafield');

      // Update metafield
      nock(baseUrl)
        .put('/metafields/123')
        .reply(200, { 
          metafield: { 
            id: '123', 
            value: 'Premium VIP customer' 
          } 
        });

      const updateResult = await handlers.handleUpdateMetafield({
        metafield_id: '123',
        value: 'Premium VIP customer'
      });

      expect(updateResult.content[0].text).toContain('Premium VIP customer');
    });

    test('should handle webhook management workflow', async () => {
      // Create webhook
      nock(baseUrl)
        .post('/webhooks')
        .reply(201, { 
          webhook: { 
            id: '789', 
            address: 'https://example.com/webhook',
            topic: 'subscription/created'
          } 
        });

      const createResult = await handlers.handleCreateWebhook({
        address: 'https://example.com/webhook',
        topic: 'subscription/created'
      });

      expect(createResult.content[0].text).toContain('webhook');

      // Update webhook
      nock(baseUrl)
        .put('/webhooks/789')
        .reply(200, { 
          webhook: { 
            id: '789', 
            address: 'https://newdomain.com/webhook'
          } 
        });

      const updateResult = await handlers.handleUpdateWebhook({
        webhook_id: '789',
        address: 'https://newdomain.com/webhook'
      });

      expect(updateResult.content[0].text).toContain('newdomain.com');
    });

    test('should handle checkout workflow', async () => {
      // Create checkout
      nock(baseUrl)
        .post('/checkouts')
        .reply(201, { 
          checkout: { 
            token: 'abc123',
            line_items: [{ variant_id: '456', quantity: 1 }]
          } 
        });

      const createResult = await handlers.handleCreateCheckout({
        line_items: [{ variant_id: '456', quantity: 1 }]
      });

      expect(createResult.content[0].text).toContain('checkout');

      // Process checkout
      nock(baseUrl)
        .post('/checkouts/abc123/process')
        .reply(200, { 
          checkout: { 
            token: 'abc123', 
            status: 'processed'
          } 
        });

      const processResult = await handlers.handleProcessCheckout({
        checkout_token: 'abc123'
      });

      expect(processResult.content[0].text).toContain('processed');
    });

    test('should handle analytics workflow', async () => {
      // Get subscription analytics
      nock(baseUrl)
        .get('/analytics/subscriptions')
        .query({ start_date: '2024-01-01', end_date: '2024-01-31' })
        .reply(200, { 
          analytics: { 
            total_subscriptions: 150,
            active_subscriptions: 120,
            revenue: '15000.00'
          } 
        });

      const subscriptionAnalytics = await handlers.handleGetSubscriptionAnalytics({
        start_date: '2024-01-01',
        end_date: '2024-01-31'
      });

      expect(subscriptionAnalytics.content[0].text).toContain('analytics');
      expect(subscriptionAnalytics.content[0].text).toContain('15000.00');

      // Get customer analytics
      nock(baseUrl)
        .get('/analytics/customers')
        .query({ start_date: '2024-01-01', end_date: '2024-01-31' })
        .reply(200, { 
          analytics: { 
            total_customers: 75,
            new_customers: 25,
            churn_rate: '5.2'
          } 
        });

      const customerAnalytics = await handlers.handleGetCustomerAnalytics({
        start_date: '2024-01-01',
        end_date: '2024-01-31'
      });

      expect(customerAnalytics.content[0].text).toContain('analytics');
      expect(customerAnalytics.content[0].text).toContain('churn_rate');
    });

    test('should handle bulk operations workflow', async () => {
      // Bulk update subscriptions
      nock(baseUrl)
        .post('/async_batches')
        .reply(201, { 
          async_batch: { 
            id: '999', 
            status: 'processing',
            batch_type: 'subscriptions_bulk_update'
          } 
        });

      const bulkUpdateResult = await handlers.handleBulkUpdateSubscriptions({
        subscriptions: [
          { id: '123', quantity: 2 },
          { id: '456', quantity: 3 }
        ]
      });

      expect(bulkUpdateResult.content[0].text).toContain('async_batch');
      expect(bulkUpdateResult.content[0].text).toContain('processing');

      // Bulk skip charges
      nock(baseUrl)
        .post('/async_batches')
        .reply(201, { 
          async_batch: { 
            id: '888', 
            status: 'processing',
            batch_type: 'charges_bulk_skip'
          } 
        });

      const bulkSkipResult = await handlers.handleBulkSkipCharges({
        charge_ids: ['789', '101112']
      });

      expect(bulkSkipResult.content[0].text).toContain('async_batch');
      expect(bulkSkipResult.content[0].text).toContain('charges_bulk_skip');
    });
  });

  describe('Error Handling Scenarios', () => {
    test('should handle 404 errors gracefully', async () => {
      nock(baseUrl)
        .get('/customers/nonexistent')
        .reply(404, { errors: ['Customer not found'] });

      const result = await handlers.handleGetCustomer({ customer_id: 'nonexistent' });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Customer not found');
    });

    test('should handle 422 validation errors', async () => {
      nock(baseUrl)
        .post('/customers')
        .reply(422, { errors: ['Email is required', 'Email format is invalid'] });

      const result = await handlers.handleCreateCustomer({ first_name: 'John' });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Email is required');
    });

    test('should handle 429 rate limit errors', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(429, { error: 'Rate limit exceeded' });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Rate limit exceeded');
    });

    test('should handle network timeout errors', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .delay(6000) // Longer than timeout
        .reply(200, {});

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('timeout');
    });

    test('should handle malformed JSON responses', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(200, 'invalid json response');

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(result.isError).toBe(true);
    });

    test('should handle server errors with retry logic', async () => {
      // First request fails with 500
      nock(baseUrl)
        .get('/customers/123')
        .reply(500, 'Internal Server Error');

      // Second request succeeds
      nock(baseUrl)
        .get('/customers/123')
        .reply(200, { customer: { id: '123', email: 'test@example.com' } });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('test@example.com');
    });
  });

  describe('Network and HTTP Error Handling', () => {
    test('should handle network connection errors', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .replyWithError('ECONNREFUSED');

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error:');
    });

    test('should handle DNS resolution errors', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .replyWithError('ENOTFOUND');

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error:');
    });

    test('should handle malformed JSON responses', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(200, 'invalid json{');

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error:');
    });
  });
  describe('Customer Tools Integration', () => {
    test('should handle complete customer workflow in correct order', async () => {
      // Step 1: Create customer first
      // Mock customer creation
      const customerData = { email: 'integration@test.com', first_name: 'Integration', last_name: 'Test' };
      const createdCustomer = { customer: { id: '12345', ...customerData } };
      
      nock(baseUrl)
        .post('/customers', customerData)
        .reply(201, createdCustomer);

      const createResult = await handlers.handleCreateCustomer(customerData);
      expect(createResult.content[0].text).toContain('"customer"');
      expect(createResult.content[0].text).toContain('12345');
      expect(createResult.isError).toBeUndefined();

      // Step 2: Retrieve customer to verify creation
      nock(baseUrl)
        .get('/customers/12345')
        .reply(200, createdCustomer);

      const getResult = await handlers.handleGetCustomer({ customer_id: '12345' });
      expect(getResult.content[0].text).toContain('"customer"');
      expect(getResult.content[0].text).toContain('integration@test.com');
      expect(getResult.isError).toBeUndefined();

      // Step 3: Update customer information
      const updateData = { first_name: 'Updated' };
      const updatedCustomer = { customer: { id: '12345', ...customerData, ...updateData } };
      
      nock(baseUrl)
        .put('/customers/12345', updateData)
        .reply(200, updatedCustomer);

      const updateResult = await handlers.handleUpdateCustomer({ customer_id: '12345', ...updateData });
      expect(updateResult.content[0].text).toContain('"customer"');
      expect(updateResult.content[0].text).toContain('Updated');
      expect(updateResult.isError).toBeUndefined();
    });

    test('should handle customer → address → subscription → charge workflow', async () => {
      const customerId = '12345';
      
      // Step 1: Customer must exist first (assume created in previous test)
      // Step 2: Create address for customer
      const addressData = {
        customer_id: customerId,
        first_name: 'John',
        last_name: 'Doe',
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };
      const createdAddress = { address: { id: '67890', ...addressData } };
      
      nock(baseUrl)
        .post('/addresses', addressData)
        .reply(201, createdAddress);

      const addressResult = await handlers.handleCreateAddress(addressData);
      expect(addressResult.content[0].text).toContain('"address"');
      expect(addressResult.content[0].text).toContain('67890');

      // Step 3: Get customer addresses (should include the one we just created)
      const addressesResponse = { addresses: [{ id: '67890', customer_id: customerId }] };
      nock(baseUrl)
        .get('/addresses')
        .query({ customer_id: customerId })
        .reply(200, addressesResponse);

      const addressesResult = await handlers.handleGetCustomerAddresses({ customer_id: customerId });
      expect(addressesResult.content[0].text).toContain('"addresses"');
      expect(addressesResult.content[0].text).toContain('67890');

      // Step 4: Create subscription using the address
      const subscriptionData = {
        address_id: '67890',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '1',
        order_interval_unit: 'month',
        quantity: 2,
        shopify_variant_id: '345678'
      };
      const createdSubscription = { subscription: { id: '11111', customer_id: customerId, ...subscriptionData } };
      
      nock(baseUrl)
        .post('/subscriptions', subscriptionData)
        .reply(201, createdSubscription);

      const subscriptionResult = await handlers.handleCreateSubscription(subscriptionData);
      expect(subscriptionResult.content[0].text).toContain('"subscription"');
      expect(subscriptionResult.content[0].text).toContain('11111');

      // Step 5: Get customer subscriptions (should include the one we just created)
      const subscriptionsResponse = { subscriptions: [{ id: '11111', customer_id: customerId }] };
      nock(baseUrl)
        .get('/subscriptions')
        .query({ customer_id: customerId, status: 'active' })
        .reply(200, subscriptionsResponse);

      const subscriptionsResult = await handlers.handleGetCustomerSubscriptions({ 
        customer_id: customerId, 
        status: 'active' 
      });
      expect(subscriptionsResult.content[0].text).toContain('"subscriptions"');
      expect(subscriptionsResult.content[0].text).toContain('11111');

      // Step 6: Create charge for the subscription
      const chargeData = {
        address_id: '67890',
        line_items: [{ variant_id: '345678', quantity: 2 }]
      };
      const createdCharge = { charge: { id: '33333', customer_id: customerId, subscription_id: '11111', ...chargeData } };
      
      nock(baseUrl)
        .post('/charges', chargeData)
        .reply(201, createdCharge);

      const chargeResult = await handlers.handleCreateCharge(chargeData);
      expect(chargeResult.content[0].text).toContain('"charge"');
      expect(chargeResult.content[0].text).toContain('33333');

      // Step 7: Get customer orders (generated from charges)
      const ordersResponse = { orders: [{ id: '22222', customer_id: customerId }] };
      nock(baseUrl)
        .get('/orders')
        .query({ customer_id: customerId })
        .reply(200, ordersResponse);

      const ordersResult = await handlers.handleGetCustomerOrders({ customer_id: customerId });
      expect(ordersResult.content[0].text).toContain('"orders"');

      // Step 8: Get customer charges (should include the one we created)
      const chargesResponse = { charges: [{ id: '33333', customer_id: customerId }] };
      nock(baseUrl)
        .get('/charges')
        .query({ customer_id: customerId })
        .reply(200, chargesResponse);

      const chargesResult = await handlers.handleGetCustomerCharges({ customer_id: customerId });
      expect(chargesResult.content[0].text).toContain('"charges"');
      expect(chargesResult.content[0].text).toContain('33333');
    });
  });

  describe('Subscription Tools Integration', () => {
    test('should handle subscription lifecycle in correct dependency order', async () => {
      // Prerequisites: Customer (12345) and Address (67890) must exist
      
      // Step 1: Create subscription
      const subscriptionData = {
        address_id: '67890',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '1',
        order_interval_unit: 'month',
        quantity: 2,
        shopify_variant_id: '345678'
      };

      const createdSubscription = { subscription: { id: '11111', ...subscriptionData } };
      nock(baseUrl)
        .post('/subscriptions', subscriptionData)
        .reply(201, createdSubscription);

      const createResult = await handlers.handleCreateSubscription(subscriptionData);
      expect(createResult.content[0].text).toContain('"subscription"');
      expect(createResult.content[0].text).toContain('11111');

      // Step 2: Update subscription (only after creation)
      const updateData = { quantity: 3 };
      const updatedSubscription = { subscription: { id: '11111', ...subscriptionData, ...updateData } };
      nock(baseUrl)
        .put('/subscriptions/11111', updateData)
        .reply(200, updatedSubscription);

      const updateResult = await handlers.handleUpdateSubscription({ subscription_id: '11111', ...updateData });
      expect(updateResult.content[0].text).toContain('"subscription"');
      expect(updateResult.content[0].text).toContain('"quantity": 3');

      // Step 3: Pause subscription (only active subscriptions can be paused)
      const pauseData = { pause_reason: 'Customer vacation' };
      const pausedSubscription = { subscription: { id: '11111', status: 'paused' } };
      nock(baseUrl)
        .post('/subscriptions/11111/pause', pauseData)
        .reply(200, pausedSubscription);

      const pauseResult = await handlers.handlePauseSubscription({ subscription_id: '11111', ...pauseData });
      expect(pauseResult.content[0].text).toContain('"subscription"');
      expect(pauseResult.content[0].text).toContain('paused');

      // Step 4: Resume subscription (only paused subscriptions can be resumed)
      const resumedSubscription = { subscription: { id: '11111', status: 'active' } };
      nock(baseUrl)
        .post('/subscriptions/11111/resume')
        .reply(200, resumedSubscription);

      const resumeResult = await handlers.handleResumeSubscription({ subscription_id: '11111' });
      expect(resumeResult.content[0].text).toContain('"subscription"');
      expect(resumeResult.content[0].text).toContain('active');

      // Step 5: Cancel subscription (final action - cannot be undone)
      const cancelledSubscription = { subscription: { id: '11111', status: 'cancelled' } };
      nock(baseUrl)
        .post('/subscriptions/11111/cancel', { cancellation_reason: 'Customer request' })
        .reply(200, cancelledSubscription);

      const cancelResult = await handlers.handleCancelSubscription({ 
        subscription_id: '11111', 
        cancellation_reason: 'Customer request' 
      });
      expect(cancelResult.content[0].text).toContain('"subscription"');
      expect(cancelResult.content[0].text).toContain('cancelled');
    });

    test('should handle subscription line items in correct order', async () => {
      const subscriptionId = '11111';
      // Prerequisites: Subscription must exist and be active

      // Step 1: Get existing line items (subscription starts with base line items)
      const lineItemsResponse = { line_items: [{ id: '44444', subscription_id: subscriptionId }] };
      nock(baseUrl)
        .get('/line_items')
        .query({ subscription_id: subscriptionId })
        .reply(200, lineItemsResponse);

      const getResult = await handlers.handleGetSubscriptionLineItems({ subscription_id: subscriptionId });
      expect(getResult.content[0].text).toContain('"line_items"');

      // Step 2: Add new line item to subscription
      const lineItemData = { shopify_variant_id: '987654', quantity: 1 };
      const createdLineItem = { line_item: { id: '55555', ...lineItemData } };
      nock(baseUrl)
        .post('/line_items', { ...lineItemData, subscription_id: subscriptionId })
        .reply(201, createdLineItem);

      const createResult = await handlers.handleCreateSubscriptionLineItem({ 
        subscription_id: subscriptionId, 
        ...lineItemData 
      });
      expect(createResult.content[0].text).toContain('"line_item"');
      expect(createResult.content[0].text).toContain('55555');

      // Step 3: Update line item (only after creation)
      const updateData = { quantity: 2 };
      const updatedLineItem = { line_item: { id: '55555', quantity: 2 } };
      nock(baseUrl)
        .put('/line_items/55555', updateData)
        .reply(200, updatedLineItem);

      const updateResult = await handlers.handleUpdateSubscriptionLineItem({ 
        subscription_id: subscriptionId, 
        line_item_id: '55555', 
        ...updateData 
      });
      expect(updateResult.content[0].text).toContain('"line_item"');
      expect(updateResult.content[0].text).toContain('"quantity": 2');

      // Step 4: Delete line item (final action)
      nock(baseUrl)
        .delete('/line_items/55555')
        .reply(200, { success: true });

      const deleteResult = await handlers.handleDeleteSubscriptionLineItem({ 
        subscription_id: subscriptionId, 
        line_item_id: '55555' 
      });
      expect(deleteResult.content[0].text).toContain('"success": true');
    });

    test('should handle subscription notes in chronological order', async () => {
      const subscriptionId = '11111';
      // Prerequisites: Subscription must exist

      // Step 1: Get existing notes (may be empty initially)
      const notesResponse = { notes: [{ id: '66666', subscription_id: subscriptionId }] };
      nock(baseUrl)
        .get('/notes')
        .query({ subscription_id: subscriptionId })
        .reply(200, notesResponse);

      const getResult = await handlers.handleGetSubscriptionNotes({ subscription_id: subscriptionId });
      expect(getResult.content[0].text).toContain('"notes"');

      // Step 2: Add first note
      const noteData = { body: 'Customer prefers weekend delivery' };
      const createdNote = { note: { id: '77777', ...noteData } };
      nock(baseUrl)
        .post('/notes', { ...noteData, subscription_id: subscriptionId })
        .reply(201, createdNote);

      const createResult = await handlers.handleCreateSubscriptionNote({ 
        subscription_id: subscriptionId, 
        ...noteData 
      });
      expect(createResult.content[0].text).toContain('"note"');
      expect(createResult.content[0].text).toContain('77777');

      // Step 3: Update note (only after creation)
      const updateData = { body: 'Updated note content' };
      const updatedNote = { note: { id: '77777', ...updateData } };
      nock(baseUrl)
        .put('/notes/77777', updateData)
        .reply(200, updatedNote);

      const updateResult = await handlers.handleUpdateSubscriptionNote({ 
        subscription_id: subscriptionId, 
        note_id: '77777', 
        ...updateData 
      });
      expect(updateResult.content[0].text).toContain('"note"');
      expect(updateResult.content[0].text).toContain('Updated note content');

      // Step 4: Delete note (final action)
      nock(baseUrl)
        .delete('/notes/77777')
        .reply(200, { success: true });

      const deleteResult = await handlers.handleDeleteSubscriptionNote({ 
        subscription_id: subscriptionId, 
        note_id: '77777' 
      });
      expect(deleteResult.content[0].text).toContain('"success": true');
    });
  });

  describe('Charge Tools Integration', () => {
    test('should handle charge workflow in correct business order', async () => {
      // Prerequisites: Customer, Address, and Subscription must exist
      
      // Step 1: Create charge (typically auto-generated, but can be manual)
      const chargeData = {
        address_id: '67890',
        line_items: [{ variant_id: '345678', quantity: 2 }]
      };

      const createdCharge = { charge: { id: '88888', ...chargeData } };
      nock(baseUrl)
        .post('/charges', chargeData)
        .reply(201, createdCharge);

      const createResult = await handlers.handleCreateCharge(chargeData);
      expect(createResult.content[0].text).toContain('"charge"');
      expect(createResult.content[0].text).toContain('88888');

      // Step 2: Skip charge (before processing - common customer service action)
      const skippedCharge = { charge: { id: '88888', status: 'skipped' } };
      nock(baseUrl)
        .post('/charges/88888/skip')
        .reply(200, skippedCharge);

      const skipResult = await handlers.handleSkipCharge({ charge_id: '88888' });
      expect(skipResult.content[0].text).toContain('"charge"');
      expect(skipResult.content[0].text).toContain('skipped');

      // Step 3: Unskip charge (customer changed mind)
      const unskippedCharge = { charge: { id: '88888', status: 'queued' } };
      nock(baseUrl)
        .post('/charges/88888/unskip')
        .reply(200, unskippedCharge);

      const unskipResult = await handlers.handleUnskipCharge({ charge_id: '88888' });
      expect(unskipResult.content[0].text).toContain('"charge"');
      expect(unskipResult.content[0].text).toContain('queued');

      // Step 4: Process charge (attempt payment)
      const processedCharge = { charge: { id: '88888', status: 'success' } };
      nock(baseUrl)
        .post('/charges/88888/process')
        .reply(200, processedCharge);

      const processResult = await handlers.handleProcessCharge({ charge_id: '88888' });
      expect(processResult.content[0].text).toContain('"charge"');
      expect(processResult.content[0].text).toContain('success');

      // Step 5: Refund charge (only after successful processing)
      const refundData = { amount: '25.99', reason: 'Product defect' };
      const refundResponse = { refund: { id: '99999', ...refundData } };
      nock(baseUrl)
        .post('/charges/88888/refund', refundData)
        .reply(200, refundResponse);

      const refundResult = await handlers.handleRefundCharge({ charge_id: '88888', ...refundData });
      expect(refundResult.content[0].text).toContain('"refund"');
      expect(refundResult.content[0].text).toContain('99999');
    });

    test('should handle charge attempts after processing attempts', async () => {
      const chargeId = '88888';
      // Prerequisites: Charge must exist and have processing attempts
      
      const attemptsResponse = { charge_attempts: [{ id: '10101', charge_id: chargeId }] };
      
      nock(baseUrl)
        .get('/charge_attempts')
        .query({ charge_id: chargeId })
        .reply(200, attemptsResponse);

      const result = await handlers.handleGetChargeAttempts({ charge_id: chargeId });
      expect(result.content[0].text).toContain('"charge_attempts"');
      expect(result.content[0].text).toContain('10101');
    });
  });

  describe('Address Tools Integration', () => {
    test('should handle address workflow with proper customer dependency', async () => {
      // Prerequisites: Customer must exist first
      
      // Step 1: Create address for existing customer
      const addressData = {
        customer_id: '12345',
        first_name: 'John',
        last_name: 'Doe',
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };

      const createdAddress = { address: { id: '67890', ...addressData } };
      nock(baseUrl)
        .post('/addresses', addressData)
        .reply(201, createdAddress);

      const createResult = await handlers.handleCreateAddress(addressData);
      expect(createResult.content[0].text).toContain('"address"');
      expect(createResult.content[0].text).toContain('67890');

      // Step 2: Validate address (can be done before or after creation)
      const validationData = {
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };
      const validationResponse = { address: { ...validationData, valid: true } };
      nock(baseUrl)
        .post('/addresses/validate', validationData)
        .reply(200, validationResponse);

      const validateResult = await handlers.handleValidateAddress(validationData);
      expect(validateResult.content[0].text).toContain('"address"');
      expect(validateResult.content[0].text).toContain('true');

      // Step 3: Update address (only after creation)
      const updateData = { address1: '456 Oak Ave' };
      const updatedAddress = { address: { id: '67890', ...addressData, ...updateData } };
      nock(baseUrl)
        .put('/addresses/67890', updateData)
        .reply(200, updatedAddress);

      const updateResult = await handlers.handleUpdateAddress({ address_id: '67890', ...updateData });
      expect(updateResult.content[0].text).toContain('"address"');
      expect(updateResult.content[0].text).toContain('456 Oak Ave');

      // Step 4: Delete address (only if no active subscriptions use it)
      nock(baseUrl)
        .delete('/addresses/67890')
        .reply(200, { success: true });

      const deleteResult = await handlers.handleDeleteAddress({ address_id: '67890' });
      expect(deleteResult.content[0].text).toContain('"success": true');
    });

    test('should handle address nested resources after address creation', async () => {
      const addressId = '67890';
      // Prerequisites: Address must exist and have associated resources

      // Step 1: Get subscriptions using this address
      const subscriptionsResponse = { subscriptions: [{ id: '11111', address_id: addressId }] };
      nock(baseUrl)
        .get('/subscriptions')
        .query({ address_id: addressId })
        .reply(200, subscriptionsResponse);

      const subscriptionsResult = await handlers.handleGetAddressSubscriptions({ address_id: addressId });
      expect(subscriptionsResult.content[0].text).toContain('"subscriptions"');

      // Step 2: Get charges for this address
      const chargesResponse = { charges: [{ id: '88888', address_id: addressId }] };
      nock(baseUrl)
        .get('/charges')
        .query({ address_id: addressId })
        .reply(200, chargesResponse);

      const chargesResult = await handlers.handleGetAddressCharges({ address_id: addressId });
      expect(chargesResult.content[0].text).toContain('"charges"');
    });
  });

  describe('Discount Tools Integration', () => {
    test('should handle discount workflow in business logic order', async () => {
      // Step 1: Create discount first
      const discountData = {
        code: 'SAVE20',
        value: 20,
        value_type: 'percentage',
        status: 'enabled',
        usage_limit: 100,
        applies_to: 'checkout'
      };

      const createdDiscount = { discount: { id: 'discount_123', ...discountData } };
      nock(baseUrl)
        .post('/discounts', discountData)
        .reply(201, createdDiscount);

      const createResult = await handlers.handleCreateDiscount(discountData);
      expect(createResult.content[0].text).toContain('"discount"');
      expect(createResult.content[0].text).toContain('discount_123');

      // Step 2: Apply discount to subscription (only after discount exists)
      // Prerequisites: Subscription must exist
      const applicationResponse = { discount_application: { id: 'app_456', discount_id: 'discount_123' } };
      nock(baseUrl)
        .post('/discount_applications', { discount_id: 'discount_123', subscription_id: '11111' })
        .reply(201, applicationResponse);

      const applyResult = await handlers.handleApplySubscriptionDiscount({ 
        subscription_id: '11111', 
        discount_id: 'discount_123' 
      });
      expect(applyResult.content[0].text).toContain('"discount_application"');
      expect(applyResult.content[0].text).toContain('app_456');

      // Step 3: Remove discount (only after application)
      nock(baseUrl)
        .delete('/discount_applications/app_456')
        .reply(200, { success: true });

      const removeResult = await handlers.handleRemoveSubscriptionDiscount({ 
        subscription_id: '11111', 
        discount_id: 'discount_123' 
      });
      expect(removeResult.content[0].text).toContain('"success": true');
    });
  });

  describe('Bulk Operations Integration', () => {
    test('should handle bulk operations with proper prerequisites', async () => {
      // Prerequisites: All subscriptions must exist before bulk operations
      
      const subscriptionsData = {
        subscriptions: [
          { id: '11111', quantity: 2 },
          { id: '22222', quantity: 3 }
        ]
      };

      const batchResponse = { 
        async_batch: { 
          id: 'batch_123', 
          batch_type: 'subscriptions_bulk_update',
          status: 'processing' 
        } 
      };

      nock(baseUrl)
        .post('/async_batches', {
          batch_type: 'subscriptions_bulk_update',
          requests: subscriptionsData.subscriptions
        })
        .reply(201, batchResponse);

      const result = await handlers.handleBulkUpdateSubscriptions(subscriptionsData);
      expect(result.content[0].text).toContain('"async_batch"');
      expect(result.content[0].text).toContain('batch_123');
    });

    test('should handle bulk charge operations with existing charges', async () => {
      // Prerequisites: All charges must exist before bulk operations
      const chargeIds = ['88888', '99999', '10101'];

      // Step 1: Bulk skip charges
      const skipBatchResponse = { 
        async_batch: { 
          id: 'batch_456', 
          batch_type: 'charges_bulk_skip',
          status: 'processing' 
        } 
      };

      nock(baseUrl)
        .post('/async_batches', {
          batch_type: 'charges_bulk_skip',
          requests: chargeIds.map(id => ({ charge_id: id }))
        })
        .reply(201, skipBatchResponse);

      const skipResult = await handlers.handleBulkSkipCharges({ charge_ids: chargeIds });
      expect(skipResult.content[0].text).toContain('"async_batch"');
      expect(skipResult.content[0].text).toContain('batch_456');

      // Step 2: Bulk unskip charges (only after they were skipped)
      const unskipBatchResponse = { 
        async_batch: { 
          id: 'batch_789', 
          batch_type: 'charges_bulk_unskip',
          status: 'processing' 
        } 
      };

      nock(baseUrl)
        .post('/async_batches', {
          batch_type: 'charges_bulk_unskip',
          requests: chargeIds.map(id => ({ charge_id: id }))
        })
        .reply(201, unskipBatchResponse);

      const unskipResult = await handlers.handleBulkUnskipCharges({ charge_ids: chargeIds });
      expect(unskipResult.content[0].text).toContain('"async_batch"');
      expect(unskipResult.content[0].text).toContain('batch_789');
    });
  });

  describe('Complete Business Workflow Integration', () => {
    test('should handle end-to-end customer onboarding workflow', async () => {
      // Complete realistic business workflow
      
      // Step 1: Create customer
      const customerData = { email: 'workflow@test.com', first_name: 'Workflow', last_name: 'Test' };
      const createdCustomer = { customer: { id: 'cust_001', ...customerData } };
      
      nock(baseUrl)
        .post('/customers', customerData)
        .reply(201, createdCustomer);

      await handlers.handleCreateCustomer(customerData);

      // Step 2: Create address for customer
      const addressData = {
        customer_id: 'cust_001',
        first_name: 'Workflow',
        last_name: 'Test',
        address1: '789 Business St',
        city: 'Commerce City',
        province: 'CA',
        country_code: 'US',
        zip: '90210'
      };
      const createdAddress = { address: { id: 'addr_001', ...addressData } };
      
      nock(baseUrl)
        .post('/addresses', addressData)
        .reply(201, createdAddress);

      await handlers.handleCreateAddress(addressData);

      // Step 3: Create subscription
      const subscriptionData = {
        address_id: 'addr_001',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '1',
        order_interval_unit: 'month',
        quantity: 1,
        shopify_variant_id: 'var_001'
      };
      const createdSubscription = { subscription: { id: 'sub_001', ...subscriptionData } };
      
      nock(baseUrl)
        .post('/subscriptions', subscriptionData)
        .reply(201, createdSubscription);

      await handlers.handleCreateSubscription(subscriptionData);

      // Step 4: Add line item to subscription
      const lineItemData = { shopify_variant_id: 'var_002', quantity: 1 };
      const createdLineItem = { line_item: { id: 'line_001', ...lineItemData } };
      
      nock(baseUrl)
        .post('/line_items', { ...lineItemData, subscription_id: 'sub_001' })
        .reply(201, createdLineItem);

      await handlers.handleCreateSubscriptionLineItem({ subscription_id: 'sub_001', ...lineItemData });

      // Step 5: Create discount and apply to subscription
      const discountData = { code: 'WELCOME10', value: 10, value_type: 'percentage' };
      const createdDiscount = { discount: { id: 'disc_001', ...discountData } };
      
      nock(baseUrl)
        .post('/discounts', discountData)
        .reply(201, createdDiscount);

      await handlers.handleCreateDiscount(discountData);

      const applicationResponse = { discount_application: { id: 'app_001', discount_id: 'disc_001' } };
      nock(baseUrl)
        .post('/discount_applications', { discount_id: 'disc_001', subscription_id: 'sub_001' })
        .reply(201, applicationResponse);

      const applyResult = await handlers.handleApplySubscriptionDiscount({ 
        subscription_id: 'sub_001', 
        discount_id: 'disc_001' 
      });
      
      expect(applyResult.content[0].text).toContain('"discount_application"');
      expect(applyResult.isError).toBeUndefined();
    });
  });

  describe('Comprehensive Tool Coverage Integration', () => {
    test('should handle all payment method operations', async () => {
      // Get payment methods
      const paymentMethodsResponse = { payment_methods: [{ id: 'pm_123', customer_id: '123' }] };
      nock(baseUrl)
        .get('/payment_methods')
        .query({ customer_id: '123' })
        .reply(200, paymentMethodsResponse);

      const getResult = await handlers.handleGetPaymentMethods({ customer_id: '123' });
      expect(getResult.content[0].text).toContain('"payment_methods"');
      expect(getResult.isError).toBeUndefined();

      // Get single payment method
      const paymentMethodResponse = { payment_method: { id: 'pm_123', customer_id: '123' } };
      nock(baseUrl)
        .get('/payment_methods/pm_123')
        .reply(200, paymentMethodResponse);

      const getSingleResult = await handlers.handleGetPaymentMethod({ payment_method_id: 'pm_123' });
      expect(getSingleResult.content[0].text).toContain('"payment_method"');
      expect(getSingleResult.isError).toBeUndefined();

      // Update payment method
      const updateData = { billing_address: { city: 'New York' } };
      const updatedPaymentMethod = { payment_method: { id: 'pm_123', ...updateData } };
      nock(baseUrl)
        .put('/payment_methods/pm_123', updateData)
        .reply(200, updatedPaymentMethod);

      const updateResult = await handlers.handleUpdatePaymentMethod({ payment_method_id: 'pm_123', ...updateData });
      expect(updateResult.content[0].text).toContain('"payment_method"');
      expect(updateResult.isError).toBeUndefined();
    });

    test('should handle all plan operations', async () => {
      // Get plans
      const plansResponse = { plans: [{ id: 'plan_123', title: 'Basic Plan' }] };
      nock(baseUrl)
        .get('/plans')
        .query({ limit: 25 })
        .reply(200, plansResponse);

      const getResult = await handlers.handleGetPlans({ limit: 25 });
      expect(getResult.content[0].text).toContain('"plans"');
      expect(getResult.isError).toBeUndefined();

      // Create plan
      const planData = { title: 'Premium Plan', description: 'Premium subscription plan' };
      const createdPlan = { plan: { id: 'plan_456', ...planData } };
      nock(baseUrl)
        .post('/plans', planData)
        .reply(201, createdPlan);

      const createResult = await handlers.handleCreatePlan(planData);
      expect(createResult.content[0].text).toContain('"plan"');
      expect(createResult.content[0].text).toContain('plan_456');
      expect(createResult.isError).toBeUndefined();

      // Update plan
      const updateData = { description: 'Updated description' };
      const updatedPlan = { plan: { id: 'plan_456', ...updateData } };
      nock(baseUrl)
        .put('/plans/plan_456', updateData)
        .reply(200, updatedPlan);

      const updateResult = await handlers.handleUpdatePlan({ plan_id: 'plan_456', ...updateData });
      expect(updateResult.content[0].text).toContain('"plan"');
      expect(updateResult.isError).toBeUndefined();

      // Delete plan
      nock(baseUrl)
        .delete('/plans/plan_456')
        .reply(200, { success: true });

      const deleteResult = await handlers.handleDeletePlan({ plan_id: 'plan_456' });
      expect(deleteResult.content[0].text).toContain('"success"');
      expect(deleteResult.isError).toBeUndefined();
    });

    test('should handle all shipping rate operations', async () => {
      // Get shipping rates
      const shippingRatesResponse = { shipping_rates: [{ id: 'rate_123', name: 'Standard' }] };
      nock(baseUrl)
        .get('/shipping_rates')
        .query({ limit: 25 })
        .reply(200, shippingRatesResponse);

      const getResult = await handlers.handleGetShippingRates({ limit: 25 });
      expect(getResult.content[0].text).toContain('"shipping_rates"');
      expect(getResult.isError).toBeUndefined();

      // Create shipping rate
      const rateData = { name: 'Express', price: '9.99' };
      const createdRate = { shipping_rate: { id: 'rate_456', ...rateData } };
      nock(baseUrl)
        .post('/shipping_rates', rateData)
        .reply(201, createdRate);

      const createResult = await handlers.handleCreateShippingRate(rateData);
      expect(createResult.content[0].text).toContain('"shipping_rate"');
      expect(createResult.isError).toBeUndefined();
    });

    test('should handle all tax line operations', async () => {
      // Get tax lines
      const taxLinesResponse = { tax_lines: [{ id: 'tax_123', rate: '0.08' }] };
      nock(baseUrl)
        .get('/tax_lines')
        .query({ limit: 25 })
        .reply(200, taxLinesResponse);

      const getResult = await handlers.handleGetTaxLines({ limit: 25 });
      expect(getResult.content[0].text).toContain('"tax_lines"');
      expect(getResult.isError).toBeUndefined();

      // Get single tax line
      const taxLineResponse = { tax_line: { id: 'tax_123', rate: '0.08' } };
      nock(baseUrl)
        .get('/tax_lines/tax_123')
        .reply(200, taxLineResponse);

      const getSingleResult = await handlers.handleGetTaxLine({ tax_line_id: 'tax_123' });
      expect(getSingleResult.content[0].text).toContain('"tax_line"');
      expect(getSingleResult.isError).toBeUndefined();
    });

    test('should handle all bundle selection operations', async () => {
      // Get bundle selections
      const bundleSelectionsResponse = { bundle_selections: [{ id: 'bundle_123', subscription_id: 'sub_001' }] };
      nock(baseUrl)
        .get('/bundle_selections')
        .query({ subscription_id: 'sub_001' })
        .reply(200, bundleSelectionsResponse);

      const getResult = await handlers.handleGetBundleSelections({ subscription_id: 'sub_001' });
      expect(getResult.content[0].text).toContain('"bundle_selections"');
      expect(getResult.isError).toBeUndefined();

      // Create bundle selection
      const bundleData = {
        subscription_id: 'sub_001',
        external_product_id: 'prod_123',
        external_variant_id: 'var_123',
        quantity: 2
      };
      const createdBundle = { bundle_selection: { id: 'bundle_456', ...bundleData } };
      nock(baseUrl)
        .post('/bundle_selections', bundleData)
        .reply(201, createdBundle);

      const createResult = await handlers.handleCreateBundleSelection(bundleData);
      expect(createResult.content[0].text).toContain('"bundle_selection"');
      expect(createResult.isError).toBeUndefined();
    });

    test('should handle all retention strategy operations', async () => {
      // Get retention strategies
      const retentionStrategiesResponse = { retention_strategies: [{ id: 'retention_123', name: 'Win-back' }] };
      nock(baseUrl)
        .get('/retention_strategies')
        .query({ limit: 25 })
        .reply(200, retentionStrategiesResponse);

      const getResult = await handlers.handleGetRetentionStrategies({ limit: 25 });
      expect(getResult.content[0].text).toContain('"retention_strategies"');
      expect(getResult.isError).toBeUndefined();

      // Get single retention strategy
      const retentionStrategyResponse = { retention_strategy: { id: 'retention_123', name: 'Win-back' } };
      nock(baseUrl)
        .get('/retention_strategies/retention_123')
        .reply(200, retentionStrategyResponse);

      const getSingleResult = await handlers.handleGetRetentionStrategy({ retention_strategy_id: 'retention_123' });
      expect(getSingleResult.content[0].text).toContain('"retention_strategy"');
      expect(getSingleResult.isError).toBeUndefined();
    });

    test('should handle all async batch operations', async () => {
      // Get async batches
      const asyncBatchesResponse = { async_batches: [{ id: 'batch_123', status: 'completed' }] };
      nock(baseUrl)
        .get('/async_batches')
        .query({ limit: 25 })
        .reply(200, asyncBatchesResponse);

      const getResult = await handlers.handleGetAsyncBatches({ limit: 25 });
      expect(getResult.content[0].text).toContain('"async_batches"');
      expect(getResult.isError).toBeUndefined();

      // Create async batch
      const batchData = {
        batch_type: 'subscriptions_bulk_update',
        requests: [{ id: 'sub_001', quantity: 2 }]
      };
      const createdBatch = { async_batch: { id: 'batch_456', ...batchData } };
      nock(baseUrl)
        .post('/async_batches', batchData)
        .reply(201, createdBatch);

      const createResult = await handlers.handleCreateAsyncBatch(batchData);
      expect(createResult.content[0].text).toContain('"async_batch"');
      expect(createResult.isError).toBeUndefined();
    });

    test('should handle all notification operations', async () => {
      // Get notifications
      const notificationsResponse = { notifications: [{ id: 'notif_123', customer_id: 'cust_001' }] };
      nock(baseUrl)
        .get('/notifications')
        .query({ customer_id: 'cust_001' })
        .reply(200, notificationsResponse);

      const getResult = await handlers.handleGetNotifications({ customer_id: 'cust_001' });
      expect(getResult.content[0].text).toContain('"notifications"');
      expect(getResult.isError).toBeUndefined();

      // Get single notification
      const notificationResponse = { notification: { id: 'notif_123', customer_id: 'cust_001' } };
      nock(baseUrl)
        .get('/notifications/notif_123')
        .reply(200, notificationResponse);

      const getSingleResult = await handlers.handleGetNotification({ notification_id: 'notif_123' });
      expect(getSingleResult.content[0].text).toContain('"notification"');
      expect(getSingleResult.isError).toBeUndefined();
    });
  });
  describe('Missing Tool Categories Integration', () => {
    test('should handle metafield workflow', async () => {
      // Create metafield for customer
      const metafieldData = {
        namespace: 'custom',
        key: 'loyalty_tier',
        value: 'gold',
        value_type: 'string',
        owner_resource: 'customer',
        owner_id: 'cust_001'
      };
      const createdMetafield = { metafield: { id: 'meta_001', ...metafieldData } };
      
      nock(baseUrl)
        .post('/metafields', metafieldData)
        .reply(201, createdMetafield);

      const createResult = await handlers.handleCreateMetafield(metafieldData);
      expect(createResult.content[0].text).toContain('"metafield"');
      expect(createResult.content[0].text).toContain('meta_001');
      expect(createResult.isError).toBeUndefined();

      // Get metafields for customer
      const metafieldsResponse = { metafields: [{ id: 'meta_001', owner_id: 'cust_001' }] };
      nock(baseUrl)
        .get('/metafields')
        .query({ owner_resource: 'customer', owner_id: 'cust_001' })
        .reply(200, metafieldsResponse);

      const getResult = await handlers.handleGetMetafields({ 
        owner_resource: 'customer', 
        owner_id: 'cust_001' 
      });
      expect(getResult.content[0].text).toContain('"metafields"');
      expect(getResult.isError).toBeUndefined();
    });

    test('should handle webhook workflow', async () => {
      // Create webhook
      const webhookData = {
        address: 'https://example.com/webhook',
        topic: 'subscription/created'
      };
      const createdWebhook = { webhook: { id: 'hook_001', ...webhookData } };
      
      nock(baseUrl)
        .post('/webhooks', webhookData)
        .reply(201, createdWebhook);

      const createResult = await handlers.handleCreateWebhook(webhookData);
      expect(createResult.content[0].text).toContain('"webhook"');
      expect(createResult.content[0].text).toContain('hook_001');

      // Update webhook
      const updateData = { topic: 'subscription/updated' };
      const updatedWebhook = { webhook: { id: 'hook_001', ...updateData } };
      
      nock(baseUrl)
        .put('/webhooks/hook_001', updateData)
        .reply(200, updatedWebhook);

      const updateResult = await handlers.handleUpdateWebhook({ webhook_id: 'hook_001', ...updateData });
      expect(updateResult.content[0].text).toContain('"webhook"');
    });

    test('should handle checkout workflow', async () => {
      // Create checkout
      const checkoutData = {
        line_items: [{ variant_id: 'var_001', quantity: 1 }],
        email: 'checkout@test.com'
      };
      const createdCheckout = { checkout: { token: 'checkout_001', ...checkoutData } };
      
      nock(baseUrl)
        .post('/checkouts', checkoutData)
        .reply(201, createdCheckout);

      const createResult = await handlers.handleCreateCheckout(checkoutData);
      expect(createResult.content[0].text).toContain('"checkout"');
      expect(createResult.content[0].text).toContain('checkout_001');

      // Process checkout
      const processedCheckout = { checkout: { token: 'checkout_001', status: 'processed' } };
      
      nock(baseUrl)
        .post('/checkouts/checkout_001/process')
        .reply(200, processedCheckout);

      const processResult = await handlers.handleProcessCheckout({ checkout_token: 'checkout_001' });
      expect(processResult.content[0].text).toContain('"checkout"');
    });

    test('should handle one-time product workflow', async () => {
      // Create one-time product
      const onetimeData = {
        address_id: 'addr_001',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        product_title: 'One-time Product',
        price: '19.99',
        quantity: 1,
        shopify_variant_id: 'var_onetime'
      };
      const createdOnetime = { onetime: { id: 'onetime_001', ...onetimeData } };
      
      nock(baseUrl)
        .post('/onetimes', onetimeData)
        .reply(201, createdOnetime);

      const createResult = await handlers.handleCreateOnetime(onetimeData);
      expect(createResult.content[0].text).toContain('"onetime"');
      expect(createResult.content[0].text).toContain('onetime_001');

      // Update one-time product
      const updateData = { quantity: 2 };
      const updatedOnetime = { onetime: { id: 'onetime_001', quantity: 2 } };
      
      nock(baseUrl)
        .put('/onetimes/onetime_001', updateData)
        .reply(200, updatedOnetime);

      const updateResult = await handlers.handleUpdateOnetime({ onetime_id: 'onetime_001', ...updateData });
      expect(updateResult.content[0].text).toContain('"onetime"');
    });

    test('should handle store credit workflow', async () => {
      // Create store credit
      const storeCreditData = {
        amount: '50.00',
        customer_id: 'cust_001',
        note: 'Refund for defective product'
      };
      const createdStoreCredit = { store_credit: { id: 'credit_001', ...storeCreditData } };
      
      nock(baseUrl)
        .post('/store_credits', storeCreditData)
        .reply(201, createdStoreCredit);

      const createResult = await handlers.handleCreateStoreCredit(storeCreditData);
      expect(createResult.content[0].text).toContain('"store_credit"');
      expect(createResult.content[0].text).toContain('credit_001');

      // Get store credits for customer
      const creditsResponse = { store_credits: [{ id: 'credit_001', customer_id: 'cust_001' }] };
      nock(baseUrl)
        .get('/store_credits')
        .query({ customer_id: 'cust_001' })
        .reply(200, creditsResponse);

      const getResult = await handlers.handleGetStoreCredits({ customer_id: 'cust_001' });
      expect(getResult.content[0].text).toContain('"store_credits"');
    });

    test('should handle shop configuration', async () => {
      // Get shop info
      const shopResponse = { shop: { id: 'shop_001', name: 'Test Shop' } };
      
      nock(baseUrl)
        .get('/shop')
        .reply(200, shopResponse);

      const getResult = await handlers.handleGetShop({});
      expect(getResult.content[0].text).toContain('"shop"');

      // Update shop
      const updateData = { name: 'Updated Shop Name' };
      const updatedShop = { shop: { id: 'shop_001', name: 'Updated Shop Name' } };
      
      nock(baseUrl)
        .put('/shop', updateData)
        .reply(200, updatedShop);

      const updateResult = await handlers.handleUpdateShop(updateData);
      expect(updateResult.content[0].text).toContain('"shop"');
    });

    test('should handle collection management', async () => {
      // Create collection
      const collectionData = {
        name: 'Premium Products',
        description: 'High-end subscription products'
      };
      const createdCollection = { collection: { id: 'coll_001', ...collectionData } };
      
      nock(baseUrl)
        .post('/collections', collectionData)
        .reply(201, createdCollection);

      const createResult = await handlers.handleCreateCollection(collectionData);
      expect(createResult.content[0].text).toContain('"collection"');
      expect(createResult.content[0].text).toContain('coll_001');

      // Get collections
      const collectionsResponse = { collections: [{ id: 'coll_001', name: 'Premium Products' }] };
      nock(baseUrl)
        .get('/collections')
        .query({ limit: 25 })
        .reply(200, collectionsResponse);

      const getResult = await handlers.handleGetCollections({ limit: 25 });
      expect(getResult.content[0].text).toContain('"collections"');
    });

    test('should handle analytics queries', async () => {
      // Get subscription analytics
      const subscriptionAnalytics = { 
        analytics: { 
          total_subscriptions: 150,
          active_subscriptions: 120,
          cancelled_subscriptions: 30
        } 
      };
      
      nock(baseUrl)
        .get('/analytics/subscriptions')
        .query({ start_date: '2024-01-01', end_date: '2024-01-31' })
        .reply(200, subscriptionAnalytics);

      const subscriptionResult = await handlers.handleGetSubscriptionAnalytics({ 
        start_date: '2024-01-01', 
        end_date: '2024-01-31' 
      });
      expect(subscriptionResult.content[0].text).toContain('"analytics"');
      expect(subscriptionResult.content[0].text).toContain('150');

      // Get customer analytics
      const customerAnalytics = { 
        analytics: { 
          total_customers: 100,
          new_customers: 25,
          returning_customers: 75
        } 
      };
      
      nock(baseUrl)
        .get('/analytics/customers')
        .query({ start_date: '2024-01-01', end_date: '2024-01-31' })
        .reply(200, customerAnalytics);

      const customerResult = await handlers.handleGetCustomerAnalytics({ 
        start_date: '2024-01-01', 
        end_date: '2024-01-31' 
      });
      expect(customerResult.content[0].text).toContain('"analytics"');
      expect(customerResult.content[0].text).toContain('100');
    });

    test('should handle customer portal sessions', async () => {
      // Create customer portal session
      const sessionData = {
        customer_id: 'cust_001',
        return_url: 'https://example.com/return'
      };
      const createdSession = { 
        customer_portal_session: { 
          id: 'session_001', 
          url: 'https://portal.rechargeapps.com/session_001' 
        } 
      };
      
      nock(baseUrl)
        .post('/customer_portal', sessionData)
        .reply(201, createdSession);

      const createResult = await handlers.handleCreateCustomerPortalSession(sessionData);
      expect(createResult.content[0].text).toContain('"customer_portal_session"');
      expect(createResult.content[0].text).toContain('session_001');
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle 404 errors correctly', async () => {
      nock(baseUrl)
        .get('/customers/nonexistent')
        .reply(404, { errors: ['Customer not found'] });

      const result = await handlers.handleGetCustomer({ customer_id: 'nonexistent' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('404');
      expect(result.content[0].text).toContain('Customer not found');
    });

    test('should handle 422 validation errors correctly', async () => {
      nock(baseUrl)
        .post('/customers', { email: 'invalid-email' })
        .reply(422, { errors: ['Email is invalid'] });

      const result = await handlers.handleCreateCustomer({ email: 'invalid-email' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('422');
      expect(result.content[0].text).toContain('Email is invalid');
    });

    test('should handle 429 rate limit errors with retry', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(429, { errors: ['Rate limit exceeded'] })
        .get('/customers/123')
        .reply(200, { customer: { id: '123', email: 'test@example.com' } });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should handle network timeouts', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .delay(6000) // Longer than timeout
        .reply(200, {});

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('timeout');
    });

    test('should handle 500 server errors with retry', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(500, 'Internal Server Error')
        .get('/customers/123')
        .reply(200, { customer: { id: '123', email: 'test@example.com' } });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should handle 503 service unavailable with retry', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(503, 'Service Unavailable')
        .get('/customers/123')
        .reply(200, { customer: { id: '123', email: 'test@example.com' } });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should handle empty response bodies', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(200, '');

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Error:');
    });
  });
});