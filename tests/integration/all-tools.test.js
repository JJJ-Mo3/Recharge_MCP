import { RechargeToolHandlers } from '../../src/tool-handlers.js';
import nock from 'nock';

describe('Integration Tests - Recharge Subscription Flows', () => {
  let handlers;
  const baseUrl = 'https://api.rechargeapps.com';
  const apiKey = 'test_api_key';

  beforeEach(() => {
    handlers = new RechargeToolHandlers(apiKey);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Complete Customer Onboarding Flow', () => {
    test('should handle full customer onboarding in correct order', async () => {
      // Step 1: Create Customer (Required first step)
      const customerData = {
        email: 'customer@example.com',
        first_name: 'John',
        last_name: 'Doe'
      };
      
      nock(baseUrl)
        .post('/customers', customerData)
        .reply(201, { customer: { id: '123', ...customerData } });

      const customerResult = await handlers.handleCreateCustomer(customerData);
      expect(customerResult.content[0].text).toContain('"id": "123"');

      // Step 2: Create Address (Required before subscription)
      const addressData = {
        customer_id: '123',
        first_name: 'John',
        last_name: 'Doe',
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };

      nock(baseUrl)
        .post('/addresses', addressData)
        .reply(201, { address: { id: '456', ...addressData } });

      const addressResult = await handlers.handleCreateAddress(addressData);
      expect(addressResult.content[0].text).toContain('"id": "456"');

      // Step 3: Create Subscription (Requires customer and address)
      const subscriptionData = {
        address_id: '456',
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '30',
        order_interval_unit: 'day',
        quantity: 1,
        shopify_variant_id: '789'
      };

      nock(baseUrl)
        .post('/subscriptions', subscriptionData)
        .reply(201, { subscription: { id: '789', ...subscriptionData, status: 'active' } });

      const subscriptionResult = await handlers.handleCreateSubscription(subscriptionData);
      expect(subscriptionResult.content[0].text).toContain('"status": "active"');
    });
  });

  describe('Subscription Lifecycle Management', () => {
    test('should handle subscription lifecycle in proper Recharge order', async () => {
      const subscriptionId = '789';

      // Step 1: Get subscription (verify exists)
      nock(baseUrl)
        .get(`/subscriptions/${subscriptionId}`)
        .reply(200, { subscription: { id: subscriptionId, status: 'active' } });

      const getResult = await handlers.handleGetSubscription({ subscription_id: subscriptionId });
      expect(getResult.content[0].text).toContain('"status": "active"');

      // Step 2: Update subscription (modify before pausing)
      const updateData = { quantity: 2 };
      nock(baseUrl)
        .put(`/subscriptions/${subscriptionId}`, updateData)
        .reply(200, { subscription: { id: subscriptionId, quantity: 2, status: 'active' } });

      const updateResult = await handlers.handleUpdateSubscription({ 
        subscription_id: subscriptionId, 
        ...updateData 
      });
      expect(updateResult.content[0].text).toContain('"quantity": 2');

      // Step 3: Pause subscription (temporary hold)
      const pauseData = { pause_reason: 'Customer vacation' };
      nock(baseUrl)
        .post(`/subscriptions/${subscriptionId}/pause`, pauseData)
        .reply(200, { subscription: { id: subscriptionId, status: 'paused' } });

      const pauseResult = await handlers.handlePauseSubscription({ 
        subscription_id: subscriptionId, 
        ...pauseData 
      });
      expect(pauseResult.content[0].text).toContain('"status": "paused"');

      // Step 4: Resume subscription (reactivate)
      nock(baseUrl)
        .post(`/subscriptions/${subscriptionId}/resume`)
        .reply(200, { subscription: { id: subscriptionId, status: 'active' } });

      const resumeResult = await handlers.handleResumeSubscription({ subscription_id: subscriptionId });
      expect(resumeResult.content[0].text).toContain('"status": "active"');

      // Step 5: Cancel subscription (final step)
      const cancelReason = 'Customer no longer needs product';
      nock(baseUrl)
        .post(`/subscriptions/${subscriptionId}/cancel`, { cancellation_reason: cancelReason })
        .reply(200, { subscription: { id: subscriptionId, status: 'cancelled' } });

      const cancelResult = await handlers.handleCancelSubscription({ 
        subscription_id: subscriptionId, 
        cancellation_reason: cancelReason 
      });
      expect(cancelResult.content[0].text).toContain('"status": "cancelled"');
    });
  });

  describe('Charge Management Flow', () => {
    test('should handle charge operations in correct sequence', async () => {
      const chargeId = '456';

      // Step 1: Get upcoming charge
      nock(baseUrl)
        .get(`/charges/${chargeId}`)
        .reply(200, { charge: { id: chargeId, status: 'queued', scheduled_at: '2024-02-01T00:00:00Z' } });

      const getResult = await handlers.handleGetCharge({ charge_id: chargeId });
      expect(getResult.content[0].text).toContain('"status": "queued"');

      // Step 2: Skip charge (before processing)
      nock(baseUrl)
        .post(`/charges/${chargeId}/skip`)
        .reply(200, { charge: { id: chargeId, status: 'skipped' } });

      const skipResult = await handlers.handleSkipCharge({ charge_id: chargeId });
      expect(skipResult.content[0].text).toContain('"status": "skipped"');

      // Step 3: Unskip charge (if needed)
      nock(baseUrl)
        .post(`/charges/${chargeId}/unskip`)
        .reply(200, { charge: { id: chargeId, status: 'queued' } });

      const unskipResult = await handlers.handleUnskipCharge({ charge_id: chargeId });
      expect(unskipResult.content[0].text).toContain('"status": "queued"');

      // Step 4: Process charge
      nock(baseUrl)
        .post(`/charges/${chargeId}/process`)
        .reply(200, { charge: { id: chargeId, status: 'success' } });

      const processResult = await handlers.handleProcessCharge({ charge_id: chargeId });
      expect(processResult.content[0].text).toContain('"status": "success"');
    });
  });

  describe('Product Swapping Flow', () => {
    test('should handle subscription product swap correctly', async () => {
      const subscriptionId = '789';

      // Step 1: Get current subscription details
      nock(baseUrl)
        .get(`/subscriptions/${subscriptionId}`)
        .reply(200, { 
          subscription: { 
            id: subscriptionId, 
            shopify_variant_id: '111',
            status: 'active' 
          } 
        });

      const getResult = await handlers.handleGetSubscription({ subscription_id: subscriptionId });
      expect(getResult.content[0].text).toContain('"shopify_variant_id": "111"');

      // Step 2: Swap to new product variant
      const swapData = { shopify_variant_id: '222' };
      nock(baseUrl)
        .post(`/subscriptions/${subscriptionId}/swap`, swapData)
        .reply(200, { 
          subscription: { 
            id: subscriptionId, 
            shopify_variant_id: '222',
            status: 'active' 
          } 
        });

      const swapResult = await handlers.handleSwapSubscription({ 
        subscription_id: subscriptionId, 
        ...swapData 
      });
      expect(swapResult.content[0].text).toContain('"shopify_variant_id": "222"');
    });
  });

  describe('Discount Application Flow', () => {
    test('should handle discount creation and application', async () => {
      // Step 1: Create discount
      const discountData = {
        code: 'SAVE20',
        value: 20,
        value_type: 'percentage',
        status: 'enabled'
      };

      nock(baseUrl)
        .post('/discounts', discountData)
        .reply(201, { discount: { id: '123', ...discountData } });

      const createResult = await handlers.handleCreateDiscount(discountData);
      expect(createResult.content[0].text).toContain('"code": "SAVE20"');

      // Step 2: Apply discount to subscription
      const subscriptionId = '789';
      const discountId = '123';

      nock(baseUrl)
        .post('/discount_applications', { discount_id: discountId, subscription_id: subscriptionId })
        .reply(201, { discount_application: { id: '456', discount_id: discountId } });

      const applyResult = await handlers.handleApplySubscriptionDiscount({ 
        subscription_id: subscriptionId, 
        discount_id: discountId 
      });
      expect(applyResult.content[0].text).toContain('"discount_id": "123"');
    });
  });

  describe('Analytics and Reporting Flow', () => {
    test('should handle analytics queries correctly', async () => {
      const analyticsParams = {
        start_date: '2024-01-01',
        end_date: '2024-01-31'
      };

      // Customer analytics
      nock(baseUrl)
        .get('/analytics/customers')
        .query(analyticsParams)
        .reply(200, { 
          analytics: { 
            total_customers: 100,
            new_customers: 25,
            churned_customers: 5 
          } 
        });

      const customerAnalytics = await handlers.handleGetCustomerAnalytics(analyticsParams);
      expect(customerAnalytics.content[0].text).toContain('"total_customers": 100');

      // Subscription analytics
      nock(baseUrl)
        .get('/analytics/subscriptions')
        .query(analyticsParams)
        .reply(200, { 
          analytics: { 
            total_subscriptions: 150,
            active_subscriptions: 120,
            cancelled_subscriptions: 30 
          } 
        });

      const subscriptionAnalytics = await handlers.handleGetSubscriptionAnalytics(analyticsParams);
      expect(subscriptionAnalytics.content[0].text).toContain('"active_subscriptions": 120');
    });
  });

  describe('Bulk Operations Flow', () => {
    test('should handle bulk operations correctly', async () => {
      // Bulk update subscriptions
      const bulkData = {
        subscriptions: [
          { id: '123', quantity: 2 },
          { id: '456', quantity: 3 }
        ]
      };

      nock(baseUrl)
        .post('/async_batches', {
          batch_type: 'subscriptions_bulk_update',
          requests: bulkData.subscriptions
        })
        .reply(201, { async_batch: { id: '789', status: 'processing' } });

      const bulkResult = await handlers.handleBulkUpdateSubscriptions(bulkData);
      expect(bulkResult.content[0].text).toContain('"status": "processing"');
    });
  });

  describe('Error Scenarios', () => {
    test('should handle 404 errors correctly', async () => {
      nock(baseUrl)
        .get('/customers/nonexistent')
        .reply(404, { errors: ['Customer not found'] });

      const result = await handlers.handleGetCustomer({ customer_id: 'nonexistent' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Customer not found');
    });

    test('should handle 422 validation errors', async () => {
      nock(baseUrl)
        .post('/customers', { email: 'invalid-email' })
        .reply(422, { errors: ['Email is invalid'] });

      const result = await handlers.handleCreateCustomer({ email: 'invalid-email' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Email is invalid');
    });

    test('should handle rate limiting (429)', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(429, { error: 'Rate limit exceeded' });

      const result = await handlers.handleGetCustomer({ customer_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Rate limit exceeded');
    });

    test('should handle server errors (500)', async () => {
      nock(baseUrl)
        .get('/subscriptions/123')
        .reply(500, 'Internal Server Error');

      const result = await handlers.handleGetSubscription({ subscription_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('Internal Server Error');
    });

    test('should handle network timeouts', async () => {
      nock(baseUrl)
        .get('/charges/123')
        .delay(15000) // Longer than timeout
        .reply(200, {});

      const result = await handlers.handleGetCharge({ charge_id: '123' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('timeout');
    });

    test('should handle malformed JSON responses', async () => {
      nock(baseUrl)
        .get('/orders/123')
        .reply(200, 'invalid json response');

      const result = await handlers.handleGetOrder({ order_id: '123' });
      expect(result.isError).toBe(true);
    });
  });

  describe('Advanced Workflow Validation', () => {
    test('should validate proper dependency order for subscription creation', async () => {
      // This test ensures we follow Recharge's required order:
      // 1. Customer must exist
      // 2. Address must be created for customer
      // 3. Subscription can be created with address_id

      const customerId = '123';
      const addressId = '456';
      const subscriptionId = '789';

      // Verify customer exists first
      nock(baseUrl)
        .get(`/customers/${customerId}`)
        .reply(200, { customer: { id: customerId, email: 'test@example.com' } });

      // Verify address exists and belongs to customer
      nock(baseUrl)
        .get(`/addresses/${addressId}`)
        .reply(200, { address: { id: addressId, customer_id: customerId } });

      // Create subscription with proper dependencies
      nock(baseUrl)
        .post('/subscriptions', {
          address_id: addressId,
          next_charge_scheduled_at: '2024-02-01T00:00:00Z',
          order_interval_frequency: '30',
          order_interval_unit: 'day',
          quantity: 1,
          shopify_variant_id: '999'
        })
        .reply(201, { 
          subscription: { 
            id: subscriptionId, 
            address_id: addressId,
            status: 'active' 
          } 
        });

      // Execute in proper order
      const customerResult = await handlers.handleGetCustomer({ customer_id: customerId });
      expect(customerResult.content[0].text).toContain(customerId);

      const addressResult = await handlers.handleGetAddress({ address_id: addressId });
      expect(addressResult.content[0].text).toContain(addressId);

      const subscriptionResult = await handlers.handleCreateSubscription({
        address_id: addressId,
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '30',
        order_interval_unit: 'day',
        quantity: 1,
        shopify_variant_id: '999'
      });
      expect(subscriptionResult.content[0].text).toContain('"status": "active"');
    });
  });
});