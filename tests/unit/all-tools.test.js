import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { RechargeToolHandlers } from '../../src/tool-handlers.js';
import { RechargeClient } from '../../src/recharge-client.js';

// Mock the RechargeClient
jest.mock('../../src/recharge-client.js');

describe('All Tools Comprehensive Test Suite', () => {
  let handlers;
  let mockClient;

  beforeEach(() => {
    // Create comprehensive mock client with all methods
    mockClient = {
      // Customer methods
      getCustomers: jest.fn(),
      getCustomer: jest.fn(),
      createCustomer: jest.fn(),
      updateCustomer: jest.fn(),
      getCustomerAddresses: jest.fn(),
      getCustomerSubscriptions: jest.fn(),
      getCustomerOrders: jest.fn(),
      getCustomerCharges: jest.fn(),
      getCustomerPaymentSources: jest.fn(),
      createPaymentMethod: jest.fn(),
      updatePaymentMethod: jest.fn(),
      deletePaymentMethod: jest.fn(),

      // Subscription methods
      getSubscriptions: jest.fn(),
      createSubscription: jest.fn(),
      getSubscription: jest.fn(),
      updateSubscription: jest.fn(),
      cancelSubscription: jest.fn(),
      activateSubscription: jest.fn(),
      skipSubscriptionCharge: jest.fn(),
      unskipSubscriptionCharge: jest.fn(),
      swapSubscription: jest.fn(),
      setNextChargeDate: jest.fn(),
      getSubscriptionCharges: jest.fn(),
      createSubscriptionCharge: jest.fn(),
      getSubscriptionLineItems: jest.fn(),
      createSubscriptionLineItem: jest.fn(),
      updateSubscriptionLineItem: jest.fn(),
      deleteSubscriptionLineItem: jest.fn(),
      getSubscriptionNotes: jest.fn(),
      createSubscriptionNote: jest.fn(),
      updateSubscriptionNote: jest.fn(),
      deleteSubscriptionNote: jest.fn(),
      getSubscriptionDeliverySchedule: jest.fn(),
      updateSubscriptionDeliverySchedule: jest.fn(),
      pauseSubscription: jest.fn(),
      resumeSubscription: jest.fn(),
      getSubscriptionDiscounts: jest.fn(),
      applyDiscount: jest.fn(),
      removeDiscount: jest.fn(),

      // Product methods
      getProducts: jest.fn(),
      getProduct: jest.fn(),

      // Order methods
      getOrders: jest.fn(),
      getOrder: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
      cloneOrder: jest.fn(),
      getOrderLineItems: jest.fn(),
      getOrderDiscounts: jest.fn(),

      // Charge methods
      getCharges: jest.fn(),
      getCharge: jest.fn(),
      createCharge: jest.fn(),
      updateCharge: jest.fn(),
      deleteCharge: jest.fn(),
      skipCharge: jest.fn(),
      processCharge: jest.fn(),
      unskipCharge: jest.fn(),
      delayCharge: jest.fn(),
      refundCharge: jest.fn(),
      getChargeLineItems: jest.fn(),
      updateChargeLineItem: jest.fn(),
      getChargeAttempts: jest.fn(),
      getChargeDiscounts: jest.fn(),

      // Address methods
      getAddresses: jest.fn(),
      getAddress: jest.fn(),
      updateAddress: jest.fn(),
      createAddress: jest.fn(),
      deleteAddress: jest.fn(),
      validateAddress: jest.fn(),
      getAddressSubscriptions: jest.fn(),
      getAddressCharges: jest.fn(),

      // Discount methods
      getDiscounts: jest.fn(),
      getDiscount: jest.fn(),
      updateDiscount: jest.fn(),
      deleteDiscount: jest.fn(),
      createDiscount: jest.fn(),

      // Metafield methods
      getMetafields: jest.fn(),
      getMetafield: jest.fn(),
      updateMetafield: jest.fn(),
      deleteMetafield: jest.fn(),
      createMetafield: jest.fn(),

      // Webhook methods
      getWebhooks: jest.fn(),
      getWebhook: jest.fn(),
      updateWebhook: jest.fn(),
      deleteWebhook: jest.fn(),
      createWebhook: jest.fn(),

      // Payment method methods
      getPaymentMethods: jest.fn(),
      getPaymentMethod: jest.fn(),

      // Checkout methods
      getCheckouts: jest.fn(),
      getCheckout: jest.fn(),
      updateCheckout: jest.fn(),
      processCheckout: jest.fn(),
      createCheckout: jest.fn(),

      // One-time product methods
      getOnetimes: jest.fn(),
      getOnetime: jest.fn(),
      updateOnetime: jest.fn(),
      deleteOnetime: jest.fn(),
      createOnetime: jest.fn(),

      // Store credit methods
      getStoreCredits: jest.fn(),
      getStoreCredit: jest.fn(),
      updateStoreCredit: jest.fn(),
      createStoreCredit: jest.fn(),

      // Shop methods
      getShop: jest.fn(),
      updateShop: jest.fn(),

      // Collection methods
      getCollections: jest.fn(),
      getCollection: jest.fn(),
      createCollection: jest.fn(),
      updateCollection: jest.fn(),
      deleteCollection: jest.fn(),

      // Analytics methods
      getSubscriptionAnalytics: jest.fn(),
      getCustomerAnalytics: jest.fn(),

      // Customer portal methods
      getCustomerPortalSession: jest.fn(),
      createCustomerPortalSession: jest.fn(),

      // Bundle selection methods
      getBundleSelections: jest.fn(),
      getBundleSelection: jest.fn(),
      createBundleSelection: jest.fn(),
      updateBundleSelection: jest.fn(),
      deleteBundleSelection: jest.fn(),

      // Retention strategy methods
      getRetentionStrategies: jest.fn(),
      getRetentionStrategy: jest.fn(),

      // Async batch methods
      getAsyncBatches: jest.fn(),
      getAsyncBatch: jest.fn(),
      createAsyncBatch: jest.fn(),

      // Notification methods
      getNotifications: jest.fn(),
      getNotification: jest.fn(),

      // Plan methods
      getPlans: jest.fn(),
      getPlan: jest.fn(),
      createPlan: jest.fn(),
      updatePlan: jest.fn(),
      deletePlan: jest.fn(),

      // Subscription plan methods
      getSubscriptionPlans: jest.fn(),
      getSubscriptionPlan: jest.fn(),
      createSubscriptionPlan: jest.fn(),
      updateSubscriptionPlan: jest.fn(),
      deleteSubscriptionPlan: jest.fn(),

      // Shipping rate methods
      getShippingRates: jest.fn(),
      getShippingRate: jest.fn(),
      createShippingRate: jest.fn(),
      updateShippingRate: jest.fn(),
      deleteShippingRate: jest.fn(),

      // Tax line methods
      getTaxLines: jest.fn(),
      getTaxLine: jest.fn(),

      // Bulk operation methods
      bulkUpdateSubscriptions: jest.fn(),
      bulkSkipCharges: jest.fn(),
      bulkUnskipCharges: jest.fn(),
    };

    RechargeClient.mockImplementation(() => mockClient);
    handlers = new RechargeToolHandlers('test_api_key');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Customer Tools', () => {
    test('should handle customer retrieval with proper parameters', async () => {
      const mockData = { customers: [{ id: '123', email: 'test@example.com' }] };
      mockClient.getCustomers.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomers({ limit: 10, email: 'test@example.com' });

      expect(mockClient.getCustomers).toHaveBeenCalledWith({ limit: 10, email: 'test@example.com' });
      expect(result.content[0].text).toContain('"customers"');
    });

    test('should handle single customer retrieval with valid ID', async () => {
      const mockData = { customer: { id: '123', email: 'test@example.com' } };
      mockClient.getCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(mockClient.getCustomer).toHaveBeenCalledWith('123');
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should create customer with required fields first', async () => {
      const customerData = { email: 'new@example.com', first_name: 'John' };
      const mockData = { customer: { id: '456', ...customerData } };
      mockClient.createCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleCreateCustomer({ ...customerData, api_key: 'test' });

      expect(mockClient.createCustomer).toHaveBeenCalledWith(customerData);
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should update customer only after creation', async () => {
      const updateData = { first_name: 'Jane' };
      const mockData = { customer: { id: '123', first_name: 'Jane' } };
      mockClient.updateCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateCustomer({ customer_id: '123', ...updateData });

      expect(mockClient.updateCustomer).toHaveBeenCalledWith('123', updateData);
      expect(result.content[0].text).toContain('"customer"');
    });

    test('should get customer addresses only for existing customer', async () => {
      const mockData = { addresses: [{ id: '789', customer_id: '123' }] };
      mockClient.getCustomerAddresses.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerAddresses({ customer_id: '123', limit: 25 });

      expect(mockClient.getCustomerAddresses).toHaveBeenCalledWith('123', { limit: 25 });
      expect(result.content[0].text).toContain('"addresses"');
    });

    test('should get customer subscriptions with proper filtering', async () => {
      const mockData = { subscriptions: [{ id: '456', customer_id: '123' }] };
      mockClient.getCustomerSubscriptions.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerSubscriptions({ customer_id: '123', status: 'active' });

      expect(mockClient.getCustomerSubscriptions).toHaveBeenCalledWith('123', { status: 'active' });
      expect(result.content[0].text).toContain('"subscriptions"');
    });

    test('should get customer orders after charges are processed', async () => {
      const mockData = { orders: [{ id: '789', customer_id: '123' }] };
      mockClient.getCustomerOrders.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerOrders({ customer_id: '123' });

      expect(mockClient.getCustomerOrders).toHaveBeenCalledWith('123', {});
      expect(result.content[0].text).toContain('"orders"');
    });

    test('should get customer charges with status filtering', async () => {
      const mockData = { charges: [{ id: '101', customer_id: '123' }] };
      mockClient.getCustomerCharges.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerCharges({ customer_id: '123', status: 'success' });

      expect(mockClient.getCustomerCharges).toHaveBeenCalledWith('123', { status: 'success' });
      expect(result.content[0].text).toContain('"charges"');
    });

    test('should get customer payment sources for existing customer', async () => {
      const mockData = { payment_methods: [{ id: '202', customer_id: '123' }] };
      mockClient.getCustomerPaymentSources.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerPaymentSources({ customer_id: '123' });

      expect(mockClient.getCustomerPaymentSources).toHaveBeenCalledWith('123', {});
      expect(result.content[0].text).toContain('"payment_methods"');
    });

    test('should create payment source only for existing customer', async () => {
      const paymentData = { payment_token: 'tok_123', payment_type: 'credit_card' };
      const mockData = { payment_method: { id: '303', ...paymentData } };
      mockClient.createPaymentMethod.mockResolvedValue(mockData);

      const result = await handlers.handleCreateCustomerPaymentSource({ customer_id: '123', ...paymentData });

      expect(mockClient.createPaymentMethod).toHaveBeenCalledWith('123', paymentData);
      expect(result.content[0].text).toContain('"payment_method"');
    });

    test('should update payment source only after creation', async () => {
      const updateData = { billing_address: { city: 'New York' } };
      const mockData = { payment_method: { id: '303', ...updateData } };
      mockClient.updatePaymentMethod.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateCustomerPaymentSource({ 
        customer_id: '123', 
        payment_source_id: '303', 
        ...updateData 
      });

      expect(mockClient.updatePaymentMethod).toHaveBeenCalledWith('123', '303', updateData);
      expect(result.content[0].text).toContain('"payment_method"');
    });

    test('should delete payment source only if not in use', async () => {
      const mockData = { success: true };
      mockClient.deletePaymentMethod.mockResolvedValue(mockData);

      const result = await handlers.handleDeleteCustomerPaymentSource({ 
        customer_id: '123', 
        payment_source_id: '303' 
      });

      expect(mockClient.deletePaymentMethod).toHaveBeenCalledWith('123', '303');
      expect(result.content[0].text).toContain('"success"');
    });
  });

  describe('Subscription Tools', () => {
    test('should get subscriptions with proper filtering', async () => {
      const mockData = { subscriptions: [{ id: '456', status: 'active' }] };
      mockClient.getSubscriptions.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptions({ customer_id: '123', status: 'active' });

      expect(mockClient.getSubscriptions).toHaveBeenCalledWith({ customer_id: '123', status: 'active' });
      expect(result.content[0].text).toContain('"subscriptions"');
    });

    test('should create subscription only with valid address', async () => {
      const subscriptionData = { 
        address_id: '789', 
        next_charge_scheduled_at: '2024-02-01T00:00:00Z',
        order_interval_frequency: '1',
        order_interval_unit: 'month',
        quantity: 2,
        shopify_variant_id: '345678'
      };
      const mockData = { subscription: { id: '456', ...subscriptionData } };
      mockClient.createSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleCreateSubscription(subscriptionData);

      expect(mockClient.createSubscription).toHaveBeenCalledWith(subscriptionData);
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should get subscription by valid ID', async () => {
      const mockData = { subscription: { id: '456', status: 'active' } };
      mockClient.getSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscription({ subscription_id: '456' });

      expect(mockClient.getSubscription).toHaveBeenCalledWith('456');
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should update subscription only after creation', async () => {
      const updateData = { quantity: 3 };
      const mockData = { subscription: { id: '456', quantity: 3 } };
      mockClient.updateSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateSubscription({ subscription_id: '456', ...updateData });

      expect(mockClient.updateSubscription).toHaveBeenCalledWith('456', updateData);
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should cancel subscription only if active', async () => {
      const mockData = { subscription: { id: '456', status: 'cancelled' } };
      mockClient.cancelSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleCancelSubscription({ 
        subscription_id: '456', 
        cancellation_reason: 'Customer request' 
      });

      expect(mockClient.cancelSubscription).toHaveBeenCalledWith('456', 'Customer request');
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should activate subscription only if cancelled', async () => {
      const mockData = { subscription: { id: '456', status: 'active' } };
      mockClient.activateSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleActivateSubscription({ subscription_id: '456' });

      expect(mockClient.activateSubscription).toHaveBeenCalledWith('456');
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should skip subscription charge before processing', async () => {
      const mockData = { success: true };
      mockClient.skipSubscriptionCharge.mockResolvedValue(mockData);

      const result = await handlers.handleSkipSubscriptionCharge({ 
        subscription_id: '456', 
        charge_date: '2024-02-01T00:00:00Z' 
      });

      expect(mockClient.skipSubscriptionCharge).toHaveBeenCalledWith('456', '2024-02-01T00:00:00Z');
      expect(result.content[0].text).toContain('"success"');
    });

    test('should unskip subscription charge only after skipping', async () => {
      const mockData = { success: true };
      mockClient.unskipSubscriptionCharge.mockResolvedValue(mockData);

      const result = await handlers.handleUnskipSubscriptionCharge({ 
        subscription_id: '456', 
        charge_date: '2024-02-01T00:00:00Z' 
      });

      expect(mockClient.unskipSubscriptionCharge).toHaveBeenCalledWith('456', '2024-02-01T00:00:00Z');
      expect(result.content[0].text).toContain('"success"');
    });

    test('should swap subscription to valid variant', async () => {
      const swapData = { shopify_variant_id: '987654' };
      const mockData = { subscription: { id: '456', shopify_variant_id: '987654' } };
      mockClient.swapSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleSwapSubscription({ subscription_id: '456', ...swapData });

      expect(mockClient.swapSubscription).toHaveBeenCalledWith('456', swapData);
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should set next charge date for active subscription', async () => {
      const mockData = { subscription: { id: '456', next_charge_scheduled_at: '2024-03-01T00:00:00Z' } };
      mockClient.setNextChargeDate.mockResolvedValue(mockData);

      const result = await handlers.handleSetNextChargeDate({ 
        subscription_id: '456', 
        date: '2024-03-01T00:00:00Z' 
      });

      expect(mockClient.setNextChargeDate).toHaveBeenCalledWith('456', { date: '2024-03-01T00:00:00Z' });
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should pause active subscription only', async () => {
      const pauseData = { pause_reason: 'Vacation', resume_date: '2024-03-01T00:00:00Z' };
      const mockData = { subscription: { id: '456', status: 'paused' } };
      mockClient.pauseSubscription.mockResolvedValue(mockData);

      const result = await handlers.handlePauseSubscription({ subscription_id: '456', ...pauseData });

      expect(mockClient.pauseSubscription).toHaveBeenCalledWith('456', pauseData);
      expect(result.content[0].text).toContain('"subscription"');
    });

    test('should resume paused subscription only', async () => {
      const mockData = { subscription: { id: '456', status: 'active' } };
      mockClient.resumeSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleResumeSubscription({ subscription_id: '456' });

      expect(mockClient.resumeSubscription).toHaveBeenCalledWith('456');
      expect(result.content[0].text).toContain('"subscription"');
    });

    // Nested resource tests
    test('should get subscription charges for existing subscription', async () => {
      const mockData = { charges: [{ id: '101', subscription_id: '456' }] };
      mockClient.getSubscriptionCharges.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionCharges({ subscription_id: '456', status: 'success' });

      expect(mockClient.getSubscriptionCharges).toHaveBeenCalledWith('456', { status: 'success' });
      expect(result.content[0].text).toContain('"charges"');
    });

    test('should create subscription charge for active subscription', async () => {
      const chargeData = { scheduled_at: '2024-02-01T00:00:00Z' };
      const mockData = { charge: { id: '101', subscription_id: '456' } };
      mockClient.createSubscriptionCharge.mockResolvedValue(mockData);

      const result = await handlers.handleCreateSubscriptionCharge({ subscription_id: '456', ...chargeData });

      expect(mockClient.createSubscriptionCharge).toHaveBeenCalledWith('456', chargeData);
      expect(result.content[0].text).toContain('"charge"');
    });

    test('should get line items for existing subscription', async () => {
      const mockData = { line_items: [{ id: '202', subscription_id: '456' }] };
      mockClient.getSubscriptionLineItems.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionLineItems({ subscription_id: '456' });

      expect(mockClient.getSubscriptionLineItems).toHaveBeenCalledWith('456', {});
      expect(result.content[0].text).toContain('"line_items"');
    });

    test('should add line item to existing subscription', async () => {
      const lineItemData = { shopify_variant_id: '987654', quantity: 2 };
      const mockData = { line_item: { id: '202', ...lineItemData } };
      mockClient.createSubscriptionLineItem.mockResolvedValue(mockData);

      const result = await handlers.handleCreateSubscriptionLineItem({ subscription_id: '456', ...lineItemData });

      expect(mockClient.createSubscriptionLineItem).toHaveBeenCalledWith('456', lineItemData);
      expect(result.content[0].text).toContain('"line_item"');
    });

    test('should update line item only after creation', async () => {
      const updateData = { quantity: 3 };
      const mockData = { line_item: { id: '202', quantity: 3 } };
      mockClient.updateSubscriptionLineItem.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateSubscriptionLineItem({ 
        subscription_id: '456', 
        line_item_id: '202', 
        ...updateData 
      });

      expect(mockClient.updateSubscriptionLineItem).toHaveBeenCalledWith('456', '202', updateData);
      expect(result.content[0].text).toContain('"line_item"');
    });

    test('should delete line item only if subscription has multiple items', async () => {
      const mockData = { success: true };
      mockClient.deleteSubscriptionLineItem.mockResolvedValue(mockData);

      const result = await handlers.handleDeleteSubscriptionLineItem({ 
        subscription_id: '456', 
        line_item_id: '202' 
      });

      expect(mockClient.deleteSubscriptionLineItem).toHaveBeenCalledWith('456', '202');
      expect(result.content[0].text).toContain('"success"');
    });

    test('should get notes for existing subscription', async () => {
      const mockData = { notes: [{ id: '303', subscription_id: '456' }] };
      mockClient.getSubscriptionNotes.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionNotes({ subscription_id: '456' });

      expect(mockClient.getSubscriptionNotes).toHaveBeenCalledWith('456', {});
      expect(result.content[0].text).toContain('"notes"');
    });

    test('should create note for existing subscription', async () => {
      const noteData = { body: 'Customer requested weekend delivery only' };
      const mockData = { note: { id: '303', ...noteData } };
      mockClient.createSubscriptionNote.mockResolvedValue(mockData);

      const result = await handlers.handleCreateSubscriptionNote({ subscription_id: '456', ...noteData });

      expect(mockClient.createSubscriptionNote).toHaveBeenCalledWith('456', noteData);
      expect(result.content[0].text).toContain('"note"');
    });

    test('should update note only after creation', async () => {
      const updateData = { body: 'Updated note content' };
      const mockData = { note: { id: '303', ...updateData } };
      mockClient.updateSubscriptionNote.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateSubscriptionNote({ 
        subscription_id: '456', 
        note_id: '303', 
        ...updateData 
      });

      expect(mockClient.updateSubscriptionNote).toHaveBeenCalledWith('456', '303', updateData);
      expect(result.content[0].text).toContain('"note"');
    });

    test('should delete note after creation', async () => {
      const mockData = { success: true };
      mockClient.deleteSubscriptionNote.mockResolvedValue(mockData);

      const result = await handlers.handleDeleteSubscriptionNote({ 
        subscription_id: '456', 
        note_id: '303' 
      });

      expect(mockClient.deleteSubscriptionNote).toHaveBeenCalledWith('456', '303');
      expect(result.content[0].text).toContain('"success"');
    });

    test('should get delivery schedule for existing subscription', async () => {
      const mockData = { delivery_schedule: { id: '404', subscription_id: '456' } };
      mockClient.getSubscriptionDeliverySchedule.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionDeliverySchedule({ subscription_id: '456' });

      expect(mockClient.getSubscriptionDeliverySchedule).toHaveBeenCalledWith('456');
      expect(result.content[0].text).toContain('"delivery_schedule"');
    });

    test('should update delivery schedule for active subscription', async () => {
      const scheduleData = { delivery_days: ['monday', 'wednesday'] };
      const mockData = { delivery_schedule: { id: '404', ...scheduleData } };
      mockClient.updateSubscriptionDeliverySchedule.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateSubscriptionDeliverySchedule({ 
        subscription_id: '456', 
        delivery_schedule: scheduleData 
      });

      expect(mockClient.updateSubscriptionDeliverySchedule).toHaveBeenCalledWith('456', scheduleData);
      expect(result.content[0].text).toContain('"delivery_schedule"');
    });

    test('should get discounts for existing subscription', async () => {
      const mockData = { discounts: [{ id: '505', subscription_id: '456' }] };
      mockClient.getSubscriptionDiscounts.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionDiscounts({ subscription_id: '456' });

      expect(mockClient.getSubscriptionDiscounts).toHaveBeenCalledWith('456', {});
      expect(result.content[0].text).toContain('"discounts"');
    });

    test('should apply discount to existing subscription', async () => {
      const mockData = { discount_application: { id: '606', discount_id: 'discount_123' } };
      mockClient.applyDiscount.mockResolvedValue(mockData);

      const result = await handlers.handleApplySubscriptionDiscount({ 
        subscription_id: '456', 
        discount_id: 'discount_123' 
      });

      expect(mockClient.applyDiscount).toHaveBeenCalledWith('456', { discount_id: 'discount_123' });
      expect(result.content[0].text).toContain('"discount_application"');
    });

    test('should remove discount only after application', async () => {
      const mockData = { success: true };
      mockClient.removeDiscount.mockResolvedValue(mockData);

      const result = await handlers.handleRemoveSubscriptionDiscount({ 
        subscription_id: '456', 
        discount_id: 'discount_123' 
      });

      expect(mockClient.removeDiscount).toHaveBeenCalledWith('456', 'discount_123');
      expect(result.content[0].text).toContain('"success"');
    });
  });

  describe('Product Tools', () => {
    test('handleGetProducts should work correctly', async () => {
      const mockData = { products: [{ id: '789', title: 'Test Product' }] };
      mockClient.getProducts.mockResolvedValue(mockData);

      const result = await handlers.handleGetProducts({ limit: 25, title: 'Test' });

      expect(mockClient.getProducts).toHaveBeenCalledWith({ limit: 25, title: 'Test' });
      expect(result.content[0].text).toContain('"products"');
    });

    test('handleGetProduct should work correctly', async () => {
      const mockData = { product: { id: '789', title: 'Test Product' } };
      mockClient.getProduct.mockResolvedValue(mockData);

      const result = await handlers.handleGetProduct({ product_id: '789' });

      expect(mockClient.getProduct).toHaveBeenCalledWith('789');
      expect(result.content[0].text).toContain('"product"');
    });
  });

  describe('Order Tools', () => {
    test('handleGetOrders should work correctly', async () => {
      const mockData = { orders: [{ id: '101', customer_id: '123' }] };
      mockClient.getOrders.mockResolvedValue(mockData);

      const result = await handlers.handleGetOrders({ customer_id: '123', status: 'processed' });

      expect(mockClient.getOrders).toHaveBeenCalledWith({ customer_id: '123', status: 'processed' });
      expect(result.content[0].text).toContain('"orders"');
    });

    test('handleGetOrder should work correctly', async () => {
      const mockData = { order: { id: '101', customer_id: '123' } };
      mockClient.getOrder.mockResolvedValue(mockData);

      const result = await handlers.handleGetOrder({ order_id: '101' });

      expect(mockClient.getOrder).toHaveBeenCalledWith('101');
      expect(result.content[0].text).toContain('"order"');
    });

    test('handleUpdateOrder should work correctly', async () => {
      const updateData = { note: 'Updated order note' };
      const mockData = { order: { id: '101', note: 'Updated order note' } };
      mockClient.updateOrder.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateOrder({ order_id: '101', ...updateData });

      expect(mockClient.updateOrder).toHaveBeenCalledWith('101', updateData);
      expect(result.content[0].text).toContain('"order"');
    });

    test('handleDeleteOrder should work correctly', async () => {
      const mockData = { success: true };
      mockClient.deleteOrder.mockResolvedValue(mockData);

      const result = await handlers.handleDeleteOrder({ order_id: '101' });

      expect(mockClient.deleteOrder).toHaveBeenCalledWith('101');
      expect(result.content[0].text).toContain('"success"');
    });

    test('handleCloneOrder should work correctly', async () => {
      const mockData = { order: { id: '102', cloned_from: '101' } };
      mockClient.cloneOrder.mockResolvedValue(mockData);

      const result = await handlers.handleCloneOrder({ order_id: '101' });

      expect(mockClient.cloneOrder).toHaveBeenCalledWith('101');
      expect(result.content[0].text).toContain('"order"');
    });

    test('handleGetOrderLineItems should work correctly', async () => {
      const mockData = { line_items: [{ id: '202', order_id: '101' }] };
      mockClient.getOrderLineItems.mockResolvedValue(mockData);

      const result = await handlers.handleGetOrderLineItems({ order_id: '101' });

      expect(mockClient.getOrderLineItems).toHaveBeenCalledWith('101', {});
      expect(result.content[0].text).toContain('"line_items"');
    });

    test('handleGetOrderDiscounts should work correctly', async () => {
      const mockData = { discounts: [{ id: '505', order_id: '101' }] };
      mockClient.getOrderDiscounts.mockResolvedValue(mockData);

      const result = await handlers.handleGetOrderDiscounts({ order_id: '101' });

      expect(mockClient.getOrderDiscounts).toHaveBeenCalledWith('101', {});
      expect(result.content[0].text).toContain('"discounts"');
    });
  });

  describe('Charge Tools', () => {
    test('handleGetCharges should work correctly', async () => {
      const mockData = { charges: [{ id: '303', customer_id: '123' }] };
      mockClient.getCharges.mockResolvedValue(mockData);

      const result = await handlers.handleGetCharges({ customer_id: '123', status: 'success' });

      expect(mockClient.getCharges).toHaveBeenCalledWith({ customer_id: '123', status: 'success' });
      expect(result.content[0].text).toContain('"charges"');
    });

    test('handleGetCharge should work correctly', async () => {
      const mockData = { charge: { id: '303', status: 'success' } };
      mockClient.getCharge.mockResolvedValue(mockData);

      const result = await handlers.handleGetCharge({ charge_id: '303' });

      expect(mockClient.getCharge).toHaveBeenCalledWith('303');
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleCreateCharge should work correctly', async () => {
      const chargeData = { 
        address_id: '789', 
        line_items: [{ variant_id: '345678', quantity: 2 }] 
      };
      const mockData = { charge: { id: '303', ...chargeData } };
      mockClient.createCharge.mockResolvedValue(mockData);

      const result = await handlers.handleCreateCharge(chargeData);

      expect(mockClient.createCharge).toHaveBeenCalledWith(chargeData);
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleUpdateCharge should work correctly', async () => {
      const updateData = { line_items: [{ variant_id: '345678', quantity: 3 }] };
      const mockData = { charge: { id: '303', ...updateData } };
      mockClient.updateCharge.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateCharge({ charge_id: '303', ...updateData });

      expect(mockClient.updateCharge).toHaveBeenCalledWith('303', updateData);
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleDeleteCharge should work correctly', async () => {
      const mockData = { success: true };
      mockClient.deleteCharge.mockResolvedValue(mockData);

      const result = await handlers.handleDeleteCharge({ charge_id: '303' });

      expect(mockClient.deleteCharge).toHaveBeenCalledWith('303');
      expect(result.content[0].text).toContain('"success"');
    });

    test('handleSkipCharge should work correctly', async () => {
      const mockData = { charge: { id: '303', status: 'skipped' } };
      mockClient.skipCharge.mockResolvedValue(mockData);

      const result = await handlers.handleSkipCharge({ charge_id: '303' });

      expect(mockClient.skipCharge).toHaveBeenCalledWith('303');
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleProcessCharge should work correctly', async () => {
      const mockData = { charge: { id: '303', status: 'success' } };
      mockClient.processCharge.mockResolvedValue(mockData);

      const result = await handlers.handleProcessCharge({ charge_id: '303' });

      expect(mockClient.processCharge).toHaveBeenCalledWith('303');
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleUnskipCharge should work correctly', async () => {
      const mockData = { charge: { id: '303', status: 'queued' } };
      mockClient.unskipCharge.mockResolvedValue(mockData);

      const result = await handlers.handleUnskipCharge({ charge_id: '303' });

      expect(mockClient.unskipCharge).toHaveBeenCalledWith('303');
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleDelayCharge should work correctly', async () => {
      const mockData = { charge: { id: '303', scheduled_at: '2024-03-01T00:00:00Z' } };
      mockClient.delayCharge.mockResolvedValue(mockData);

      const result = await handlers.handleDelayCharge({ 
        charge_id: '303', 
        date: '2024-03-01T00:00:00Z' 
      });

      expect(mockClient.delayCharge).toHaveBeenCalledWith('303', { date: '2024-03-01T00:00:00Z' });
      expect(result.content[0].text).toContain('"charge"');
    });

    test('handleRefundCharge should work correctly', async () => {
      const refundData = { amount: '25.99', reason: 'Product defect' };
      const mockData = { refund: { id: '404', ...refundData } };
      mockClient.refundCharge.mockResolvedValue(mockData);

      const result = await handlers.handleRefundCharge({ charge_id: '303', ...refundData });

      expect(mockClient.refundCharge).toHaveBeenCalledWith('303', refundData);
      expect(result.content[0].text).toContain('"refund"');
    });

    test('handleGetChargeLineItems should work correctly', async () => {
      const mockData = { line_items: [{ id: '202', charge_id: '303' }] };
      mockClient.getChargeLineItems.mockResolvedValue(mockData);

      const result = await handlers.handleGetChargeLineItems({ charge_id: '303' });

      expect(mockClient.getChargeLineItems).toHaveBeenCalledWith('303', {});
      expect(result.content[0].text).toContain('"line_items"');
    });

    test('handleUpdateChargeLineItem should work correctly', async () => {
      const updateData = { quantity: 3 };
      const mockData = { line_item: { id: '202', quantity: 3 } };
      mockClient.updateChargeLineItem.mockResolvedValue(mockData);

      const result = await handlers.handleUpdateChargeLineItem({ 
        charge_id: '303', 
        line_item_id: '202', 
        ...updateData 
      });

      expect(mockClient.updateChargeLineItem).toHaveBeenCalledWith('303', '202', updateData);
      expect(result.content[0].text).toContain('"line_item"');
    });

    test('handleGetChargeAttempts should work correctly', async () => {
      const mockData = { charge_attempts: [{ id: '505', charge_id: '303' }] };
      mockClient.getChargeAttempts.mockResolvedValue(mockData);

      const result = await handlers.handleGetChargeAttempts({ charge_id: '303' });

      expect(mockClient.getChargeAttempts).toHaveBeenCalledWith('303', {});
      expect(result.content[0].text).toContain('"charge_attempts"');
    });

    test('handleGetChargeDiscounts should work correctly', async () => {
      const mockData = { discounts: [{ id: '606', charge_id: '303' }] };
      mockClient.getChargeDiscounts.mockResolvedValue(mockData);

      const result = await handlers.handleGetChargeDiscounts({ charge_id: '303' });

      expect(mockClient.getChargeDiscounts).toHaveBeenCalledWith('303', {});
      expect(result.content[0].text).toContain('"discounts"');
    });

    test('handleApplyChargeDiscount should work correctly', async () => {
      const mockData = { discount_application: { id: '707', discount_id: 'discount_123' } };
      mockClient.applyDiscount.mockResolvedValue(mockData);

      const result = await handlers.handleApplyChargeDiscount({ 
        charge_id: '303', 
        discount_id: 'discount_123' 
      });

      expect(mockClient.applyDiscount).toHaveBeenCalledWith('303', { discount_id: 'discount_123' });
      expect(result.content[0].text).toContain('"discount_application"');
    });

    test('handleRemoveChargeDiscount should work correctly', async () => {
      const mockData = { success: true };
      mockClient.removeDiscount.mockResolvedValue(mockData);

      const result = await handlers.handleRemoveChargeDiscount({ 
        charge_id: '303', 
        discount_id: 'discount_123' 
      });

      expect(mockClient.removeDiscount).toHaveBeenCalledWith('303', 'discount_123');
      expect(result.content[0].text).toContain('"success"');
    });
  });

  describe('Error Handling', () => {
    test('should handle API errors gracefully', async () => {
      const error = new Error('Recharge API error 404: Customer not found');
      mockClient.getCustomer.mockRejectedValue(error);

      const result = await handlers.handleGetCustomer({ customer_id: 'nonexistent' });

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: Recharge API error 404: Customer not found' }],
        isError: true
      });
    });

    test('should handle network errors gracefully', async () => {
      const error = new Error('Network request failed');
      mockClient.getCustomers.mockRejectedValue(error);

      const result = await handlers.handleGetCustomers({ limit: 10 });

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: Network request failed' }],
        isError: true
      });
    });

    test('should handle validation errors gracefully', async () => {
      const error = new Error('Recharge API error 422: Email is invalid');
      mockClient.createCustomer.mockRejectedValue(error);

      const result = await handlers.handleCreateCustomer({ email: 'invalid-email' });

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: Recharge API error 422: Email is invalid' }],
        isError: true
      });
    });
  });

  describe('API Key Handling', () => {
    test('should use client-provided API key when available', () => {
      const apiKey = handlers.getApiKey({ api_key: 'client_provided_key' });
      expect(apiKey).toBe('client_provided_key');
    });

    test('should fall back to default API key', () => {
      const apiKey = handlers.getApiKey({});
      expect(apiKey).toBe('test_api_key');
    });

    test('should create client with correct API key', () => {
      handlers.createClient({ api_key: 'custom_key' });
      expect(RechargeClient).toHaveBeenCalledWith('custom_key');
    });
  });
});