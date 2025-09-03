const nock = require('nock');
const { RechargeClient } = require('../../src/recharge-client.js');

describe('RechargeClient', () => {
  let client;
  const baseUrl = 'https://api.rechargeapps.com';
  const apiKey = 'test_api_key';

  beforeEach(() => {
    client = new RechargeClient(apiKey);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Constructor and Configuration', () => {
    test('should initialize with provided API key', () => {
      expect(client.apiKey).toBe(apiKey);
      expect(client.baseUrl).toBe(baseUrl);
    });

    test('should use environment variables as fallback', () => {
      const clientWithoutKey = new RechargeClient();
      expect(clientWithoutKey.apiKey).toBe('test_api_key_12345');
    });

    test('should validate API key before requests', async () => {
      const clientWithoutKey = new RechargeClient(null);
      clientWithoutKey.apiKey = null;
      
      await expect(clientWithoutKey.getCustomers()).rejects.toThrow('API key is required');
    });
  });

  describe('Customer Methods', () => {
    test('getCustomers should make correct API call', async () => {
      const mockResponse = { customers: [{ id: '123', email: 'test@example.com' }] };
      
      nock(baseUrl)
        .get('/customers')
        .query({ limit: 10 })
        .reply(200, mockResponse);

      const result = await client.getCustomers({ limit: 10 });
      expect(result).toEqual(mockResponse);
    });

    test('getCustomer should fetch specific customer', async () => {
      const mockResponse = { customer: { id: '123', email: 'test@example.com' } };
      
      nock(baseUrl)
        .get('/customers/123')
        .reply(200, mockResponse);

      const result = await client.getCustomer('123');
      expect(result).toEqual(mockResponse);
    });

    test('createCustomer should create new customer', async () => {
      const customerData = { email: 'new@example.com', first_name: 'John' };
      const mockResponse = { customer: { id: '456', ...customerData } };
      
      nock(baseUrl)
        .post('/customers', customerData)
        .reply(201, mockResponse);

      const result = await client.createCustomer(customerData);
      expect(result).toEqual(mockResponse);
    });

    test('updateCustomer should update existing customer', async () => {
      const updateData = { first_name: 'Jane' };
      const mockResponse = { customer: { id: '123', first_name: 'Jane' } };
      
      nock(baseUrl)
        .put('/customers/123', updateData)
        .reply(200, mockResponse);

      const result = await client.updateCustomer('123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Subscription Methods', () => {
    test('getSubscriptions should make correct API call', async () => {
      const mockResponse = { subscriptions: [{ id: '789', status: 'active' }] };
      
      nock(baseUrl)
        .get('/subscriptions')
        .query({ customer_id: '123', status: 'active' })
        .reply(200, mockResponse);

      const result = await client.getSubscriptions({ customer_id: '123', status: 'active' });
      expect(result).toEqual(mockResponse);
    });

    test('cancelSubscription should cancel subscription', async () => {
      const mockResponse = { subscription: { id: '789', status: 'cancelled' } };
      
      nock(baseUrl)
        .post('/subscriptions/789/cancel', { cancellation_reason: 'Customer request' })
        .reply(200, mockResponse);

      const result = await client.cancelSubscription('789', 'Customer request');
      expect(result).toEqual(mockResponse);
    });

    test('pauseSubscription should pause subscription', async () => {
      const pauseData = { pause_reason: 'Vacation' };
      const mockResponse = { subscription: { id: '789', status: 'paused' } };
      
      nock(baseUrl)
        .post('/subscriptions/789/pause', pauseData)
        .reply(200, mockResponse);

      const result = await client.pauseSubscription('789', pauseData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    test('should handle 404 errors', async () => {
      nock(baseUrl)
        .get('/customers/nonexistent')
        .reply(404, { errors: ['Customer not found'] });

      await expect(client.getCustomer('nonexistent')).rejects.toThrow('Recharge API error 404: Customer not found');
    });

    test('should handle 422 validation errors', async () => {
      nock(baseUrl)
        .post('/customers', { email: 'invalid' })
        .reply(422, { errors: ['Email is invalid'] });

      await expect(client.createCustomer({ email: 'invalid' })).rejects.toThrow('Recharge API error 422: Email is invalid');
    });

    test('should retry on 500 errors', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .reply(500, 'Internal Server Error')
        .get('/customers/123')
        .reply(200, { customer: { id: '123' } });

      const result = await client.getCustomer('123');
      expect(result).toEqual({ customer: { id: '123' } });
    });

    test('should handle network timeouts', async () => {
      nock(baseUrl)
        .get('/customers/123')
        .delay(6000) // Longer than our test timeout
        .reply(200, {});

      await expect(client.getCustomer('123')).rejects.toThrow('Request timeout');
    });
  });

  describe('Query Parameter Building', () => {
    test('should filter out undefined and null values', () => {
      const params = {
        limit: 10,
        page: undefined,
        status: null,
        email: '',
        customer_id: '123'
      };
      
      const queryParams = client.buildQueryParams(params);
      expect(queryParams.toString()).toBe('limit=10&customer_id=123');
    });
  });
});