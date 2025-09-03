// Global test setup
process.env.NODE_ENV = 'test';
process.env.RECHARGE_API_KEY = 'test_api_key_12345';
process.env.RECHARGE_API_URL = 'https://api.rechargeapps.com';
process.env.RECHARGE_API_TIMEOUT = '10000';
process.env.RECHARGE_API_RETRY_ATTEMPTS = '2';
process.env.RECHARGE_API_RETRY_DELAY = '100';

// Increase timeout for integration tests
jest.setTimeout(60000);

// Mock console methods to reduce test noise
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn()
}