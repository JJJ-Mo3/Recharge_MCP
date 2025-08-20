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
      'X-Recharge-Version': '2021-11',
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

  // Discount methods
  async getDiscounts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/discounts?${searchParams}`);
  }

  async getDiscount(discountId) {
    return this.request(`/discounts/${discountId}`);
  }

  async createDiscount(discountData) {
    return this.request('/discounts', {
      method: 'POST',
      body: JSON.stringify(discountData)
    });
  }

  async updateDiscount(discountId, discountData) {
    return this.request(`/discounts/${discountId}`, {
      method: 'PUT',
      body: JSON.stringify(discountData)
    });
  }

  async deleteDiscount(discountId) {
    return this.request(`/discounts/${discountId}`, {
      method: 'DELETE'
    });
  }

  // Metafield methods
  async getMetafields(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/metafields?${searchParams}`);
  }

  async getMetafield(metafieldId) {
    return this.request(`/metafields/${metafieldId}`);
  }

  async createMetafield(metafieldData) {
    return this.request('/metafields', {
      method: 'POST',
      body: JSON.stringify(metafieldData)
    });
  }

  async updateMetafield(metafieldId, metafieldData) {
    return this.request(`/metafields/${metafieldId}`, {
      method: 'PUT',
      body: JSON.stringify(metafieldData)
    });
  }

  async deleteMetafield(metafieldId) {
    return this.request(`/metafields/${metafieldId}`, {
      method: 'DELETE'
    });
  }

  // Payment method methods
  async getPaymentMethods(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/payment_methods?${searchParams}`);
  }

  async getPaymentMethod(paymentMethodId) {
    return this.request(`/payment_methods/${paymentMethodId}`);
  }

  async updatePaymentMethod(paymentMethodId, paymentMethodData) {
    return this.request(`/payment_methods/${paymentMethodId}`, {
      method: 'PUT',
      body: JSON.stringify(paymentMethodData)
    });
  }

  // Webhook methods
  async getWebhooks(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/webhooks?${searchParams}`);
  }

  async getWebhook(webhookId) {
    return this.request(`/webhooks/${webhookId}`);
  }

  async createWebhook(webhookData) {
    return this.request('/webhooks', {
      method: 'POST',
      body: JSON.stringify(webhookData)
    });
  }

  async updateWebhook(webhookId, webhookData) {
    return this.request(`/webhooks/${webhookId}`, {
      method: 'PUT',
      body: JSON.stringify(webhookData)
    });
  }

  async deleteWebhook(webhookId) {
    return this.request(`/webhooks/${webhookId}`, {
      method: 'DELETE'
    });
  }

  // Shop methods
  async getShop() {
    return this.request('/shop');
  }

  // Collection methods
  async getCollections(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/collections?${searchParams}`);
  }

  async getCollection(collectionId) {
    return this.request(`/collections/${collectionId}`);
  }

  // Bundle selection methods
  async getBundleSelections(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/bundle_selections?${searchParams}`);
  }

  async getBundleSelection(bundleSelectionId) {
    return this.request(`/bundle_selections/${bundleSelectionId}`);
  }

  async createBundleSelection(bundleSelectionData) {
    return this.request('/bundle_selections', {
      method: 'POST',
      body: JSON.stringify(bundleSelectionData)
    });
  }

  async updateBundleSelection(bundleSelectionId, bundleSelectionData) {
    return this.request(`/bundle_selections/${bundleSelectionId}`, {
      method: 'PUT',
      body: JSON.stringify(bundleSelectionData)
    });
  }

  async deleteBundleSelection(bundleSelectionId) {
    return this.request(`/bundle_selections/${bundleSelectionId}`, {
      method: 'DELETE'
    });
  }

  // Retention strategy methods
  async getRetentionStrategies(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/retention_strategies?${searchParams}`);
  }

  async getRetentionStrategy(retentionStrategyId) {
    return this.request(`/retention_strategies/${retentionStrategyId}`);
  }

  // Async batch methods
  async getAsyncBatches(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/async_batches?${searchParams}`);
  }

  async getAsyncBatch(asyncBatchId) {
    return this.request(`/async_batches/${asyncBatchId}`);
  }

  async createAsyncBatch(asyncBatchData) {
    return this.request('/async_batches', {
      method: 'POST',
      body: JSON.stringify(asyncBatchData)
    });
  }

  // Checkout methods
  async getCheckouts(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/checkouts?${searchParams}`);
  }

  async getCheckout(checkoutToken) {
    return this.request(`/checkouts/${checkoutToken}`);
  }

  async createCheckout(checkoutData) {
    return this.request('/checkouts', {
      method: 'POST',
      body: JSON.stringify(checkoutData)
    });
  }

  async updateCheckout(checkoutToken, checkoutData) {
    return this.request(`/checkouts/${checkoutToken}`, {
      method: 'PUT',
      body: JSON.stringify(checkoutData)
    });
  }

  async processCheckout(checkoutToken) {
    return this.request(`/checkouts/${checkoutToken}/process`, {
      method: 'POST'
    });
  }

  // Notification methods
  async getNotifications(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/notifications?${searchParams}`);
  }

  async getNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`);
  }

  // Order methods (additional)
  async updateOrder(orderId, orderData) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    });
  }

  async deleteOrder(orderId) {
    return this.request(`/orders/${orderId}`, {
      method: 'DELETE'
    });
  }

  async cloneOrder(orderId) {
    return this.request(`/orders/${orderId}/clone`, {
      method: 'POST'
    });
  }

  // Customer portal methods
  async getCustomerPortalSession(customerId) {
    return this.request(`/customers/${customerId}/portal_session`);
  }

  async createCustomerPortalSession(customerId, sessionData) {
    return this.request(`/customers/${customerId}/portal_session`, {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }
  // Onetimes methods
  async getOnetimes(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/onetimes?${searchParams}`);
  }

  async getOnetime(onetimeId) {
    return this.request(`/onetimes/${onetimeId}`);
  }

  async createOnetime(onetimeData) {
    return this.request('/onetimes', {
      method: 'POST',
      body: JSON.stringify(onetimeData)
    });
  }

  async updateOnetime(onetimeId, onetimeData) {
    return this.request(`/onetimes/${onetimeId}`, {
      method: 'PUT',
      body: JSON.stringify(onetimeData)
    });
  }

  async deleteOnetime(onetimeId) {
    return this.request(`/onetimes/${onetimeId}`, {
      method: 'DELETE'
    });
  }

  // Subscription analytics methods
  async getSubscriptionAnalytics(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/analytics/subscriptions?${searchParams}`);
  }

  // Customer analytics methods
  async getCustomerAnalytics(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/analytics/customers?${searchParams}`);
  }

  // Store credit methods
  async getStoreCredits(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/store_credits?${searchParams}`);
  }

  async getStoreCredit(storeCreditId) {
    return this.request(`/store_credits/${storeCreditId}`);
  }

  async createStoreCredit(storeCreditData) {
    return this.request('/store_credits', {
      method: 'POST',
      body: JSON.stringify(storeCreditData)
    });
  }

  async updateStoreCredit(storeCreditId, storeCreditData) {
    return this.request(`/store_credits/${storeCreditId}`, {
      method: 'PUT',
      body: JSON.stringify(storeCreditData)
    });
  }

  // Subscription charge methods
  async skipSubscriptionCharge(subscriptionId, chargeDate) {
    return this.request(`/subscriptions/${subscriptionId}/skip`, {
      method: 'POST',
      body: JSON.stringify({ date: chargeDate })
    });
  }

  async unskipSubscriptionCharge(subscriptionId, chargeDate) {
    return this.request(`/subscriptions/${subscriptionId}/unskip`, {
      method: 'POST',
      body: JSON.stringify({ date: chargeDate })
    });
  }

  // Charge delay methods
  async delayCharge(chargeId, delayData) {
    return this.request(`/charges/${chargeId}/delay`, {
      method: 'POST',
      body: JSON.stringify(delayData)
    });
  }

  // Charge process methods
  async processCharge(chargeId) {
    return this.request(`/charges/${chargeId}/process`, {
      method: 'POST'
    });
  }

  async skipCharge(chargeId) {
    return this.request(`/charges/${chargeId}/skip`, {
      method: 'POST'
    });
  }

  async unskipCharge(chargeId) {
    return this.request(`/charges/${chargeId}/unskip`, {
      method: 'POST'
    });
  }

  async refundCharge(chargeId, refundData) {
    return this.request(`/charges/${chargeId}/refund`, {
      method: 'POST',
      body: JSON.stringify(refundData)
    });
  }

  // Order methods (additional)
  async updateOrder(orderId, orderData) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    });
  }

  async deleteOrder(orderId) {
    return this.request(`/orders/${orderId}`, {
      method: 'DELETE'
    });
  }

  async cloneOrder(orderId) {
    return this.request(`/orders/${orderId}/clone`, {
      method: 'POST'
    });
  }

  // Customer portal methods
  async getCustomerPortalSession(customerId) {
    return this.request(`/customers/${customerId}/portal_session`);
  }

  async createCustomerPortalSession(customerId, sessionData) {
    return this.request(`/customers/${customerId}/portal_session`, {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }
}