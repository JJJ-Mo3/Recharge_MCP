import { config } from 'dotenv';

config();

/**
 * Recharge API client for handling HTTP requests
 */
export class RechargeClient {
  constructor() {
    this.apiKey = process.env.RECHARGE_API_KEY;
    this.baseUrl = process.env.RECHARGE_API_URL || 'https://api.rechargeapps.com';
    
    if (!this.apiKey) {
      throw new Error('RECHARGE_API_KEY environment variable is required');
    }
  }

  /**
   * Make authenticated request to Recharge API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Recharge-Access-Token': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Recharge API error ${response.status}: ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  // Customer methods
  async getCustomers(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/customers?${searchParams}`);
  }

  async getCustomer(customerId) {
    return this.request(`/customers/${customerId}`);
  }

  async createCustomer(customerData) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData)
    });
  }

  async updateCustomer(customerId, customerData) {
    return this.request(`/customers/${customerId}`, {
      method: 'PUT',
      body: JSON.stringify(customerData)
    });
  }

  // Subscription methods
  async getSubscriptions(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/subscriptions?${searchParams}`);
  }

  async getSubscription(subscriptionId) {
    return this.request(`/subscriptions/${subscriptionId}`);
  }

  async createSubscription(subscriptionData) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData)
    });
  }

  async updateSubscription(subscriptionId, subscriptionData) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      body: JSON.stringify(subscriptionData)
    });
  }

  async cancelSubscription(subscriptionId, reason = '') {
    return this.request(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ cancellation_reason: reason })
    });
  }

  async activateSubscription(subscriptionId) {
    return this.request(`/subscriptions/${subscriptionId}/activate`, {
      method: 'POST'
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/products?${searchParams}`);
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  // Order methods
  async getOrders(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/orders?${searchParams}`);
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  // Charge methods
  async getCharges(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/charges?${searchParams}`);
  }

  async getCharge(chargeId) {
    return this.request(`/charges/${chargeId}`);
  }

  // Address methods
  async getAddresses(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/addresses?${searchParams}`);
  }

  async getAddress(addressId) {
    return this.request(`/addresses/${addressId}`);
  }

  async createAddress(addressData) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
  }

  async updateAddress(addressId, addressData) {
    return this.request(`/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    });
  }
}