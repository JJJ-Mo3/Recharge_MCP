const { RechargeToolHandlers } = require('../../src/tool-handlers.js');
const { RechargeClient } = require('../../src/recharge-client.js');

// Mock the RechargeClient
jest.mock('../../src/recharge-client.js');

describe('RechargeToolHandlers', () => {
  let handlers;
  let mockClient;

  beforeEach(() => {
    mockClient = {
      getCustomers: jest.fn(),
      getCustomer: jest.fn(),
      createCustomer: jest.fn(),
      updateCustomer: jest.fn(),
      getSubscriptions: jest.fn(),
      cancelSubscription: jest.fn(),
      getCharges: jest.fn(),
      skipCharge: jest.fn(),
      // Add more mock methods as needed
    };

    RechargeClient.mockImplementation(() => mockClient);
    handlers = new RechargeToolHandlers('test_api_key');
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    test('should create client with correct API key', () => {
      handlers.createClient({ api_key: 'custom_key' });
      expect(RechargeClient).toHaveBeenCalledWith('custom_key');
    });
  });

  describe('Customer Handlers', () => {
    test('handleGetCustomers should call client and format response', async () => {
      const mockData = { customers: [{ id: '123' }] };
      mockClient.getCustomers.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomers({ limit: 10 });

      expect(mockClient.getCustomers).toHaveBeenCalledWith({ limit: 10 });
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleGetCustomer should handle single customer', async () => {
      const mockData = { customer: { id: '123' } };
      mockClient.getCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleGetCustomer({ customer_id: '123' });

      expect(mockClient.getCustomer).toHaveBeenCalledWith('123');
      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(mockData, null, 2) }]
      });
    });

    test('handleCreateCustomer should create customer', async () => {
      const customerData = { email: 'test@example.com' };
      const mockData = { customer: { id: '456', ...customerData } };
      mockClient.createCustomer.mockResolvedValue(mockData);

      const result = await handlers.handleCreateCustomer({ ...customerData, api_key: 'test' });

      expect(mockClient.createCustomer).toHaveBeenCalledWith(customerData);
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

    test('should format error responses correctly', () => {
      const error = new Error('Test error');
      const result = handlers.handleError(error);

      expect(result).toEqual({
        content: [{ type: 'text', text: 'Error: Test error' }],
        isError: true
      });
    });
  });

  describe('Response Formatting', () => {
    test('should format successful responses correctly', () => {
      const data = { test: 'data' };
      const result = handlers.formatResponse(data);

      expect(result).toEqual({
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      });
    });
  });
});