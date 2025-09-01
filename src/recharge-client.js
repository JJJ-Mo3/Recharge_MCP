import { config } from 'dotenv';

config();

/**
 * Recharge API client for handling HTTP requests
 * Supports the Recharge API v2021-11 with comprehensive error handling,
 * retry logic, and timeout management.
 */
export class RechargeClient {
  constructor(apiKey = null) {
    // Allow API key to be passed in constructor or fall back to environment
    this.apiKey = apiKey || process.env.RECHARGE_API_KEY || null;
    this.baseUrl = process.env.RECHARGE_API_URL || 'https://api.rechargeapps.com';
    this.timeout = parseInt(process.env.RECHARGE_API_TIMEOUT) || 30000; // 30 seconds default
    this.retryAttempts = parseInt(process.env.RECHARGE_API_RETRY_ATTEMPTS) || 3;
    this.retryDelay = parseInt(process.env.RECHARGE_API_RETRY_DELAY) || 1000; // 1 second base delay
  }

  /**
   * Validate that API key is available
   */
  validateApiKey() {
    if (!this.apiKey) {
      throw new Error('API key is required. Provide it via constructor parameter, RECHARGE_API_KEY environment variable, or as api_key parameter in tool calls');
    }
  }

  /**
   * Sleep for specified milliseconds
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Make authenticated request to Recharge API
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Request options (method, body, headers, etc.)
   * @returns {Promise<Object>} - API response data
   * @throws {Error} - On API errors, network errors, or timeouts
   */
  async request(endpoint, options = {}) {
    this.validateApiKey();
    
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Recharge-Access-Token': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Recharge-Version': '2021-11',
      'User-Agent': 'recharge-mcp-server/1.1.0',
      ...options.headers
    };

    let lastError;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = await response.text();
          }
          
          const errorMessage = typeof errorData === 'object' && errorData.errors 
            ? JSON.stringify(errorData.errors)
            : errorData || `HTTP ${response.status}`;
          
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500) {
            throw new Error(`Recharge API error ${response.status}: ${errorMessage}`);
          }
          
          // Retry on server errors (5xx) and rate limits (429)
          if (attempt < this.retryAttempts && (response.status >= 500 || response.status === 429 || response.status === 503)) {
            console.error(`Attempt ${attempt} failed with status ${response.status}, retrying...`);
            await this.sleep(this.retryDelay * Math.pow(2, attempt - 1)); // Exponential backoff
            continue;
          }
          
          throw new Error(`Recharge API error ${response.status}: ${errorMessage}`);
        }

        return await response.json();
        
      } catch (error) {
        lastError = error;
        
        if (error.message.includes('Recharge API error')) {
          throw error;
        }
        
        if (error.name === 'AbortError') {
          if (attempt < this.retryAttempts) {
            console.error(`Request timeout on attempt ${attempt}, retrying...`);
            await this.sleep(this.retryDelay * attempt);
            continue;
          }
          throw new Error(`Request timeout after ${this.timeout}ms`);
        }
        
        // Retry on network errors
        if (attempt < this.retryAttempts) {
          console.error(`Network error on attempt ${attempt}: ${error.message}, retrying...`);
          await this.sleep(this.retryDelay * Math.pow(2, attempt - 1)); // Exponential backoff
          continue;
        }
      }
    }
    
    throw new Error(`Network request failed after ${this.retryAttempts} attempts: ${lastError.message}`);
  }

  // Utility method for building query parameters
  buildQueryParams(params) {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
    return new URLSearchParams(filteredParams);
  }

  // Customer methods
  async getCustomers(params = {}) {
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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

  async swapSubscription(subscriptionId, swapData) {
    return this.request(`/subscriptions/${subscriptionId}/swap`, {
      method: 'POST',
      body: JSON.stringify(swapData)
    });
  }

  async setNextChargeDate(subscriptionId, dateData) {
    return this.request(`/subscriptions/${subscriptionId}/set_next_charge_date`, {
      method: 'POST',
      body: JSON.stringify(dateData)
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/products?${searchParams}`);
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  // Order methods
  async getOrders(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/orders?${searchParams}`);
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  // Charge methods
  async getCharges(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/charges?${searchParams}`);
  }

  async getCharge(chargeId) {
    return this.request(`/charges/${chargeId}`);
  }

  async createCharge(chargeData) {
    return this.request('/charges', {
      method: 'POST',
      body: JSON.stringify(chargeData)
    });
  }

  async updateCharge(chargeId, chargeData) {
    return this.request(`/charges/${chargeId}`, {
      method: 'PUT',
      body: JSON.stringify(chargeData)
    });
  }

  async deleteCharge(chargeId) {
    return this.request(`/charges/${chargeId}`, {
      method: 'DELETE'
    });
  }

  // Address methods
  async getAddresses(params = {}) {
    const searchParams = this.buildQueryParams(params);
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

  async validateAddress(addressData) {
    return this.request('/addresses/validate', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
  }

  // Discount methods
  async getDiscounts(params = {}) {
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
    return this.request(`/collections?${searchParams}`);
  }

  async getCollection(collectionId) {
    return this.request(`/collections/${collectionId}`);
  }

  // Bundle selection methods
  async getBundleSelections(params = {}) {
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
    return this.request(`/retention_strategies?${searchParams}`);
  }

  async getRetentionStrategy(retentionStrategyId) {
    return this.request(`/retention_strategies/${retentionStrategyId}`);
  }

  // Async batch methods
  async getAsyncBatches(params = {}) {
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
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
    const searchParams = this.buildQueryParams(params);
    return this.request(`/analytics/subscriptions?${searchParams}`);
  }

  // Customer analytics methods
  async getCustomerAnalytics(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/analytics/customers?${searchParams}`);
  }

  // Shipping rate methods
  async getShippingRates(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/shipping_rates?${searchParams}`);
  }

  async getShippingRate(shippingRateId) {
    return this.request(`/shipping_rates/${shippingRateId}`);
  }

  async createShippingRate(shippingRateData) {
    return this.request('/shipping_rates', {
      method: 'POST',
      body: JSON.stringify(shippingRateData)
    });
  }

  async updateShippingRate(shippingRateId, shippingRateData) {
    return this.request(`/shipping_rates/${shippingRateId}`, {
      method: 'PUT',
      body: JSON.stringify(shippingRateData)
    });
  }

  async deleteShippingRate(shippingRateId) {
    return this.request(`/shipping_rates/${shippingRateId}`, {
      method: 'DELETE'
    });
  }

  // Tax line methods
  async getTaxLines(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/tax_lines?${searchParams}`);
  }

  async getTaxLine(taxLineId) {
    return this.request(`/tax_lines/${taxLineId}`);
  }

  // Store credit methods
  async getStoreCredits(params = {}) {
    const searchParams = this.buildQueryParams(params);
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

  // Plan methods
  async getPlans(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/plans?${searchParams}`);
  }

  async getPlan(planId) {
    return this.request(`/plans/${planId}`);
  }

  async createPlan(planData) {
    return this.request('/plans', {
      method: 'POST',
      body: JSON.stringify(planData)
    });
  }

  async updatePlan(planId, planData) {
    return this.request(`/plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData)
    });
  }

  async deletePlan(planId) {
    return this.request(`/plans/${planId}`, {
      method: 'DELETE'
    });
  }

  // Subscription plan methods
  async getSubscriptionPlans(params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/subscription_plans?${searchParams}`);
  }

  async getSubscriptionPlan(subscriptionPlanId) {
    return this.request(`/subscription_plans/${subscriptionPlanId}`);
  }

  async createSubscriptionPlan(subscriptionPlanData) {
    return this.request('/subscription_plans', {
      method: 'POST',
      body: JSON.stringify(subscriptionPlanData)
    });
  }

  async updateSubscriptionPlan(subscriptionPlanId, subscriptionPlanData) {
    return this.request(`/subscription_plans/${subscriptionPlanId}`, {
      method: 'PUT',
      body: JSON.stringify(subscriptionPlanData)
    });
  }

  async deleteSubscriptionPlan(subscriptionPlanId) {
    return this.request(`/subscription_plans/${subscriptionPlanId}`, {
      method: 'DELETE'
    });
  }

  // Nested resource methods - Customer relationships
  async getCustomerAddresses(customerId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/customers/${customerId}/addresses?${searchParams}`);
  }

  async getCustomerSubscriptions(customerId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/customers/${customerId}/subscriptions?${searchParams}`);
  }

  async getCustomerOrders(customerId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/customers/${customerId}/orders?${searchParams}`);
  }

  async getCustomerCharges(customerId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/customers/${customerId}/charges?${searchParams}`);
  }

  // Nested resource methods - Subscription relationships
  async getSubscriptionCharges(subscriptionId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/subscriptions/${subscriptionId}/charges?${searchParams}`);
  }

  async createSubscriptionCharge(subscriptionId, chargeData) {
    return this.request(`/subscriptions/${subscriptionId}/charges`, {
      method: 'POST',
      body: JSON.stringify(chargeData)
    });
  }

  // Nested resource methods - Address relationships
  async getAddressSubscriptions(addressId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/addresses/${addressId}/subscriptions?${searchParams}`);
  }

  async getAddressCharges(addressId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/addresses/${addressId}/charges?${searchParams}`);
  }

  // Line item management
  async getSubscriptionLineItems(subscriptionId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/subscriptions/${subscriptionId}/line_items?${searchParams}`);
  }

  async createSubscriptionLineItem(subscriptionId, lineItemData) {
    return this.request(`/subscriptions/${subscriptionId}/line_items`, {
      method: 'POST',
      body: JSON.stringify(lineItemData)
    });
  }

  async updateSubscriptionLineItem(subscriptionId, lineItemId, lineItemData) {
    return this.request(`/subscriptions/${subscriptionId}/line_items/${lineItemId}`, {
      method: 'PUT',
      body: JSON.stringify(lineItemData)
    });
  }

  async deleteSubscriptionLineItem(subscriptionId, lineItemId) {
    return this.request(`/subscriptions/${subscriptionId}/line_items/${lineItemId}`, {
      method: 'DELETE'
    });
  }

  async getOrderLineItems(orderId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/orders/${orderId}/line_items?${searchParams}`);
  }

  async getChargeLineItems(chargeId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/charges/${chargeId}/line_items?${searchParams}`);
  }

  async updateChargeLineItem(chargeId, lineItemId, lineItemData) {
    return this.request(`/charges/${chargeId}/line_items/${lineItemId}`, {
      method: 'PUT',
      body: JSON.stringify(lineItemData)
    });
  }

  // Subscription notes
  async getSubscriptionNotes(subscriptionId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/subscriptions/${subscriptionId}/notes?${searchParams}`);
  }

  async createSubscriptionNote(subscriptionId, noteData) {
    return this.request(`/subscriptions/${subscriptionId}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteData)
    });
  }

  async updateSubscriptionNote(subscriptionId, noteId, noteData) {
    return this.request(`/subscriptions/${subscriptionId}/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify(noteData)
    });
  }

  async deleteSubscriptionNote(subscriptionId, noteId) {
    return this.request(`/subscriptions/${subscriptionId}/notes/${noteId}`, {
      method: 'DELETE'
    });
  }

  // Customer payment sources
  async getCustomerPaymentSources(customerId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/customers/${customerId}/payment_sources?${searchParams}`);
  }

  async createCustomerPaymentSource(customerId, paymentSourceData) {
    return this.request(`/customers/${customerId}/payment_sources`, {
      method: 'POST',
      body: JSON.stringify(paymentSourceData)
    });
  }

  async updateCustomerPaymentSource(customerId, paymentSourceId, paymentSourceData) {
    return this.request(`/customers/${customerId}/payment_sources/${paymentSourceId}`, {
      method: 'PUT',
      body: JSON.stringify(paymentSourceData)
    });
  }

  async deleteCustomerPaymentSource(customerId, paymentSourceId) {
    return this.request(`/customers/${customerId}/payment_sources/${paymentSourceId}`, {
      method: 'DELETE'
    });
  }

  // Subscription delivery schedules
  async getSubscriptionDeliverySchedule(subscriptionId) {
    return this.request(`/subscriptions/${subscriptionId}/delivery_schedule`);
  }

  async updateSubscriptionDeliverySchedule(subscriptionId, scheduleData) {
    return this.request(`/subscriptions/${subscriptionId}/delivery_schedule`, {
      method: 'PUT',
      body: JSON.stringify(scheduleData)
    });
  }

  // Charge attempts
  async getChargeAttempts(chargeId, params = {}) {
    const searchParams = this.buildQueryParams(params);
    return this.request(`/charges/${chargeId}/charge_attempts?${searchParams}`);
  }

  // Subscription pause/resume
  async pauseSubscription(subscriptionId, pauseData) {
    return this.request(`/subscriptions/${subscriptionId}/pause`, {
      method: 'POST',
      body: JSON.stringify(pauseData)
    });
  }

  async resumeSubscription(subscriptionId) {
    return this.request(`/subscriptions/${subscriptionId}/resume`, {
      method: 'POST'
    });
  }

  // Collection management (missing CRUD operations)
  async createCollection(collectionData) {
    return this.request('/collections', {
      method: 'POST',
      body: JSON.stringify(collectionData)
    });
  }

  async updateCollection(collectionId, collectionData) {
    return this.request(`/collections/${collectionId}`, {
      method: 'PUT',
      body: JSON.stringify(collectionData)
    });
  }

  async deleteCollection(collectionId) {
    return this.request(`/collections/${collectionId}`, {
      method: 'DELETE'
    });
  }

}