import { RechargeToolHandlers } from '../../src/tool-handlers.js';
import { RechargeClient } from '../../src/recharge-client.js';
import * as tools from '../../src/tools/index.js';

// Mock the RechargeClient
jest.mock('../../src/recharge-client.js');

describe('All Tools Unit Tests', () => {
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
      createCustomerPaymentSource: jest.fn(),
      updateCustomerPaymentSource: jest.fn(),
      deleteCustomerPaymentSource: jest.fn(),

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
      applySubscriptionDiscount: jest.fn(),
      removeSubscriptionDiscount: jest.fn(),

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
      applyChargeDiscount: jest.fn(),
      removeChargeDiscount: jest.fn(),

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
      updatePaymentMethod: jest.fn(),

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
      next_charge_scheduled_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      // Bulk operation methods
      bulkUpdateSubscriptions: jest.fn(),
      bulkSkipCharges: jest.fn(),
      bulkUnskipCharges: jest.fn()
    };

    RechargeClient.mockImplementation(() => mockClient);
    handlers = new RechargeToolHandlers('test_api_key');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Schema Validation', () => {
    test('should export all required tool schemas', () => {
      const toolNames = Object.keys(tools);
      expect(toolNames.length).toBeGreaterThan(130);
      
      // Verify key tool categories are present
      const customerTools = toolNames.filter(name => name.includes('Customer'));
      const subscriptionTools = toolNames.filter(name => name.includes('Subscription'));
      const chargeTools = toolNames.filter(name => name.includes('Charge'));
      
      expect(customerTools.length).toBeGreaterThan(10);
      expect(subscriptionTools.length).toBeGreaterThan(25);
      expect(chargeTools.length).toBeGreaterThan(10);
    });

    test('should have proper schema structure for all tools', () => {
      Object.values(tools).forEach(tool => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(tool.inputSchema).toHaveProperty('type', 'object');
        expect(tool.inputSchema).toHaveProperty('properties');
      });
    });
  });

  describe('Customer Tools', () => {
    test('handleGetCustomers should work correctly', async () => {
      const mockData = { customers: [{ id: '123', email: 'test@example.com' }] };
      mockClient.getCustomers.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomers({ limit: 10 });

      expect(mockClient.getCustomers).toHaveBeenCalledWith({ limit: 10 });
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleCreateCustomer should create customer', async () => {
      const customerData = { email: 'new@example.com', first_name: 'John' };
      const mockData = { customer: { id: '456', ...customerData } };
      mockClient.createCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleCreateCustomer({ ...customerData, api_key: 'test' });

      expect(mockClient.createCustomer).toHaveBeenCalledWith(customerData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleGetCustomerPaymentSources should work', async () => {
      const mockData = { payment_methods: [{ id: '789' }] };
      mockClient.getCustomerPaymentSources.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomerPaymentSources({ customer_id: '123' });

      expect(mockClient.getCustomerPaymentSources).toHaveBeenCalledWith('123', {});
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });
  });

  describe('Subscription Tools', () => {
    test('handleCreateSubscription should create subscription', async () => {
      const subscriptionData = {
        address_id: '123',
        next_charge_scheduled_at: '2024-01-01T00:00:00Z',
        order_interval_frequency: '30',
        order_interval_unit: 'day',
        quantity: 1,
        shopify_variant_id: '456'
      };
      const mockData = { subscription: { id: '789', ...subscriptionData } };
      mockClient.createSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleCreateSubscription(subscriptionData);

      expect(mockClient.createSubscription).toHaveBeenCalledWith(subscriptionData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handlePauseSubscription should pause subscription', async () => {
      const pauseData = { pause_reason: 'Customer vacation' };
      const mockData = { subscription: { id: '789', status: 'paused' } };
      mockClient.pauseSubscription.mockResolvedValue(mockData);

      const result = await handlers.handlePauseSubscription({ subscription_id: '789', ...pauseData });

      expect(mockClient.pauseSubscription).toHaveBeenCalledWith('789', pauseData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleSwapSubscription should swap product variant', async () => {
      const swapData = { shopify_variant_id: '999' };
      const mockData = { subscription: { id: '789', shopify_variant_id: '999' } };
      mockClient.swapSubscription.mockResolvedValue(mockData);

      const result = await handlers.handleSwapSubscription({ subscription_id: '789', ...swapData });

      expect(mockClient.swapSubscription).toHaveBeenCalledWith('789', swapData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });
  });

  describe('Charge Tools', () => {
    test('handleSkipCharge should skip charge', async () => {
      const mockData = { charge: { id: '123', status: 'skipped' } };
      mockClient.skipCharge.mockResolvedValue(mockData);

      const result = await handlers.handleSkipCharge({ charge_id: '123' });

      expect(mockClient.skipCharge).toHaveBeenCalledWith('123');
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleRefundCharge should refund charge', async () => {
      const refundData = { amount: '10.00', reason: 'Customer request' };
      const mockData = { charge: { id: '123', refunded_amount: '10.00' } };
      mockClient.refundCharge.mockResolvedValue(mockData);

      const result = await handlers.handleRefundCharge({ charge_id: '123', ...refundData });

      expect(mockClient.refundCharge).toHaveBeenCalledWith('123', refundData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });
  });

  describe('Address Tools', () => {
    test('handleValidateAddress should validate address', async () => {
      const addressData = {
        address1: '123 Main St',
        city: 'New York',
        province: 'NY',
        country_code: 'US',
        zip: '10001'
      };
      const mockData = { address: { ...addressData, valid: true } };
      mockClient.validateAddress.mockResolvedValue(mockData);

      const result = await handlers.handleValidateAddress(addressData);

      expect(mockClient.validateAddress).toHaveBeenCalledWith(addressData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });
  });

  describe('Advanced Tools', () => {
    test('handleGetSubscriptionAnalytics should work', async () => {
      const mockData = { analytics: { total_subscriptions: 100 } };
      mockClient.getSubscriptionAnalytics.mockResolvedValue(mockData);

      const result = await handlers.handleGetSubscriptionAnalytics({ start_date: '2024-01-01' });

      expect(mockClient.getSubscriptionAnalytics).toHaveBeenCalledWith({ start_date: '2024-01-01' });
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleBulkUpdateSubscriptions should work', async () => {
      const subscriptionsData = {
        subscriptions: [
          { id: '123', quantity: 2 },
          { id: '456', quantity: 3 }
        ]
      };
      const mockData = { async_batch: { id: '789', status: 'processing' } };
      mockClient.bulkUpdateSubscriptions.mockResolvedValue(mockData);

      const result = await handlers.handleBulkUpdateSubscriptions(subscriptionsData);

      expect(mockClient.bulkUpdateSubscriptions).toHaveBeenCalledWith(subscriptionsData);
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle client errors gracefully', async () => {
      const error = new Error('API Error');
      mockClient.getCustomers.mockRejectedValue(error);

      const result = await handlers.handleGetCustomers({ limit: 10 });

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: API Error' }],
        isError: true
      });
    });

      resume_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days from now
    test('should handle network errors', async () => {
      const error = new Error('Network timeout');
      mockClient.getSubscription.mockRejectedValue(error);

      const result = await handlers.handleGetSubscription({ subscription_id: '123' });

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: Network timeout' }],
        isError: true
      });
    });
  });

  describe('API Key Handling', () => {
    test('should use provided API key', () => {
      const apiKey = handlers.getApiKey({ api_key: 'custom_key' });
      expect(apiKey).toBe('custom_key');
    });

    test('should fall back to default API key', () => {
      const apiKey = handlers.getApiKey({});
      expect(apiKey).toBe('test_api_key');
    });
  });

  test('handleSetNextChargeDate should set future charge date', async () => {
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
    const mockData = { subscription: { id: '789', next_charge_scheduled_at: futureDate } };
    mockClient.setNextChargeDate.mockResolvedValue(mockData);

    const result = await handlers.handleSetNextChargeDate({ 
      subscription_id: '789', 
      date: futureDate 
    });

    expect(mockClient.setNextChargeDate).toHaveBeenCalledWith('789', { date: futureDate });
    expect(result).toEqual({
      content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
    });
  });

  test('handleSkipSubscriptionCharge should skip future charge', async () => {
    const futureChargeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
    const mockData = { subscription: { id: '789', status: 'active' } };
    mockClient.skipSubscriptionCharge.mockResolvedValue(mockData);

    const result = await handlers.handleSkipSubscriptionCharge({ 
      subscription_id: '789', 
      charge_date: futureChargeDate 
    });

    expect(mockClient.skipSubscriptionCharge).toHaveBeenCalledWith('789', futureChargeDate);
    expect(result).toEqual({
      content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
    });
  });

  test('handleDelayCharge should delay charge to future date', async () => {
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
    const mockData = { charge: { id: '123', scheduled_at: futureDate } };
    mockClient.delayCharge.mockResolvedValue(mockData);

    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago
    const endDate = new Date().toISOString().split('T')[0]; // today
    const result = await handlers.handleDelayCharge({ 
      charge_id: '123', 
      date: futureDate 
    const result = await handlers.handleGetSubscriptionAnalytics({ 
      start_date: startDate,
      end_date: endDate 
    });

    expect(mockClient.getSubscriptionAnalytics).toHaveBeenCalledWith({ 
      start_date: startDate,
      end_date: endDate 
    });
    expect(result).toEqual({
      content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
    });
  });

  test('handleCreateCharge should create charge with future date', async () => {
    const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
    const futureDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(); // 1 day from now
    const chargeData = {
        { id: '123', quantity: 2, next_charge_scheduled_at: futureDate },
        { id: '456', quantity: 3, next_charge_scheduled_at: futureDate }
      scheduled_at: futureDate
    };
    const mockData = { charge: { id: '123', ...chargeData } };
    mockClient.createCharge.mockResolvedValue(mockData);

    const result = await handlers.handleCreateCharge(chargeData);

    expect(mockClient.createCharge).toHaveBeenCalledWith(chargeData);
    expect(result).toEqual({
      content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
    });
  });

  test('handleCreateOnetime should create onetime with future charge date', async () => {
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
    const onetimeData = {
      address_id: '456',
      next_charge_scheduled_at: futureDate,
      product_title: 'One-time Product',
      price: '29.99',
      quantity: 1,
      shopify_variant_id: '789'
    };
    const mockData = { onetime: { id: '123', ...onetimeData } };
    mockClient.createOnetime.mockResolvedValue(mockData);

    const result = await handlers.handleCreateOnetime(onetimeData);

    expect(mockClient.createOnetime).toHaveBeenCalledWith(onetimeData);
    expect(result).toEqual({
      content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
    });
  });
});