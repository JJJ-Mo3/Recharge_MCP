import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 * Handles all tool execution, validation, and response formatting
 * Provides consistent error handling and API key management
 */
export class RechargeToolHandlers {
  constructor(defaultApiKey = null) {
    this.defaultApiKey = defaultApiKey;
  }

  /**
   * Get API key from arguments or use default
   */
  getApiKey(args) {
    return args.api_key || this.defaultApiKey;
  }

  /**
   * Create Recharge client with appropriate API key
   */
  createClient(args) {
    const apiKey = this.getApiKey(args);
    if (!apiKey) {
      throw new Error('API key is required. Provide it via RECHARGE_API_KEY environment variable or as api_key parameter');
    }
    return new RechargeClient(apiKey);
  }

  /**
   * Format successful response
   * @param {Object} data - Response data from API
   * @returns {Object} - Formatted MCP response
   */
  formatResponse(data) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }

  /**
   * Format error response
   * @param {string} operation - Description of the operation that failed
   * @param {Error} error - The error object
   * @returns {Object} - Formatted MCP error response
   */
  formatError(operation, error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error ${operation}: ${error.message}`
        }
      ],
      isError: true
    };
  }

  /**
   * Validate required fields
   * @param {Object} args - Arguments to validate
   * @param {string[]} requiredFields - Array of required field names
   * @throws {Error} - If any required fields are missing
   */
  validateRequired(args, requiredFields) {
    const missing = requiredFields.filter(field => !args[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }

  /**
   * Sanitize and validate input parameters
   * @param {Object} args - Input arguments
   * @returns {Object} - Sanitized arguments
   */
  sanitizeArgs(args) {
    const sanitized = {};
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined && value !== null && value !== '') {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getCustomers(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving customers', error);
    }
  }

  async handleGetCustomer(args) {
    try {
      this.validateRequired(args, ['customer_id']);
      const client = this.createClient(args);
      const data = await client.getCustomer(args.customer_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving customer', error);
    }
  }

  async handleCreateCustomer(args) {
    try {
      this.validateRequired(args, ['email']);
      const client = this.createClient(args);
      const { api_key, ...customerData } = this.sanitizeArgs(args);
      const data = await client.createCustomer(customerData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating customer', error);
    }
  }

  async handleUpdateCustomer(args) {
    try {
      this.validateRequired(args, ['customer_id']);
      const client = this.createClient(args);
      const { api_key, customer_id, ...customerData } = this.sanitizeArgs(args);
      const data = await client.updateCustomer(customer_id, customerData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating customer', error);
    }
  }

  // Subscription handlers
  async handleGetSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getSubscriptions(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscriptions', error);
    }
  }

  async handleCreateSubscription(args) {
    try {
      this.validateRequired(args, ['address_id', 'next_charge_scheduled_at', 'order_interval_frequency', 'order_interval_unit', 'quantity', 'shopify_variant_id']);
      const client = this.createClient(args);
      const { api_key, ...subscriptionData } = this.sanitizeArgs(args);
      const data = await client.createSubscription(subscriptionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating subscription', error);
    }
  }

  async handleGetSubscription(args) {
    try {
      this.validateRequired(args, ['subscription_id']);
      const client = this.createClient(args);
      const data = await client.getSubscription(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscription', error);
    }
  }

  async handleUpdateSubscription(args) {
    try {
      this.validateRequired(args, ['subscription_id']);
      const client = this.createClient(args);
      const { api_key, subscription_id, ...subscriptionData } = args;
      const data = await client.updateSubscription(subscription_id, subscriptionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating subscription', error);
    }
  }

  async handleCancelSubscription(args) {
    try {
      this.validateRequired(args, ['subscription_id']);
      const client = this.createClient(args);
      const data = await client.cancelSubscription(args.subscription_id, args.cancellation_reason);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('cancelling subscription', error);
    }
  }

  async handleActivateSubscription(args) {
    try {
      this.validateRequired(args, ['subscription_id']);
      const client = this.createClient(args);
      const data = await client.activateSubscription(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('activating subscription', error);
    }
  }

  async handleSwapSubscription(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'shopify_variant_id']);
      const client = this.createClient(args);
      const { api_key, subscription_id, ...swapData } = args;
      const data = await client.swapSubscription(subscription_id, swapData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('swapping subscription', error);
    }
  }

  async handleSetNextChargeDate(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'date']);
      const client = this.createClient(args);
      const { api_key, subscription_id, ...dateData } = args;
      const data = await client.setNextChargeDate(subscription_id, dateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('setting next charge date', error);
    }
  }

  // Product handlers
  async handleGetProducts(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getProducts(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving products', error);
    }
  }

  async handleGetProduct(args) {
    try {
      this.validateRequired(args, ['product_id']);
      const client = this.createClient(args);
      const data = await client.getProduct(args.product_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving product', error);
    }
  }

  // Order handlers
  async handleGetOrders(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getOrders(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving orders', error);
    }
  }

  async handleGetOrder(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const client = this.createClient(args);
      const data = await client.getOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving order', error);
    }
  }

  // Charge handlers
  async handleGetCharges(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getCharges(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving charges', error);
    }
  }

  async handleGetCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const data = await client.getCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving charge', error);
    }
  }

  async handleCreateCharge(args) {
    try {
      this.validateRequired(args, ['address_id', 'line_items']);
      const client = this.createClient(args);
      const { api_key, ...chargeData } = this.sanitizeArgs(args);
      const data = await client.createCharge(chargeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating charge', error);
    }
  }

  async handleUpdateCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const { api_key, charge_id, ...chargeData } = this.sanitizeArgs(args);
      const data = await client.updateCharge(charge_id, chargeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating charge', error);
    }
  }

  async handleDeleteCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const data = await client.deleteCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting charge', error);
    }
  }

  // Address handlers
  async handleGetAddresses(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getAddresses(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving addresses', error);
    }
  }

  async handleGetAddress(args) {
    try {
      this.validateRequired(args, ['address_id']);
      const client = this.createClient(args);
      const data = await client.getAddress(args.address_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving address', error);
    }
  }

  async handleCreateAddress(args) {
    try {
      this.validateRequired(args, ['customer_id', 'first_name', 'last_name', 'address1', 'city', 'province', 'country_code', 'zip']);
      const client = this.createClient(args);
      const { api_key, ...addressData } = this.sanitizeArgs(args);
      const data = await client.createAddress(addressData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating address', error);
    }
  }

  async handleUpdateAddress(args) {
    try {
      this.validateRequired(args, ['address_id']);
      const client = this.createClient(args);
      const { api_key, address_id, ...addressData } = this.sanitizeArgs(args);
      const data = await client.updateAddress(address_id, addressData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating address', error);
    }
  }

  async handleDeleteAddress(args) {
    try {
      this.validateRequired(args, ['address_id']);
      const client = this.createClient(args);
      const data = await client.deleteAddress(args.address_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting address', error);
    }
  }

  async handleValidateAddress(args) {
    try {
      this.validateRequired(args, ['address1', 'city', 'province', 'country_code', 'zip']);
      const client = this.createClient(args);
      const { api_key, ...addressData } = this.sanitizeArgs(args);
      const data = await client.validateAddress(addressData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('validating address', error);
    }
  }

  // Discount handlers
  async handleGetDiscounts(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getDiscounts(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving discounts', error);
    }
  }

  async handleGetDiscount(args) {
    try {
      this.validateRequired(args, ['discount_id']);
      const client = this.createClient(args);
      const data = await client.getDiscount(args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving discount', error);
    }
  }

  async handleCreateDiscount(args) {
    try {
      this.validateRequired(args, ['code', 'value', 'value_type']);
      const client = this.createClient(args);
      const { api_key, ...discountData } = this.sanitizeArgs(args);
      const data = await client.createDiscount(discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating discount', error);
    }
  }

  async handleUpdateDiscount(args) {
    try {
      this.validateRequired(args, ['discount_id']);
      const client = this.createClient(args);
      const { api_key, discount_id, ...discountData } = this.sanitizeArgs(args);
      const data = await client.updateDiscount(discount_id, discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating discount', error);
    }
  }

  async handleDeleteDiscount(args) {
    try {
      this.validateRequired(args, ['discount_id']);
      const client = this.createClient(args);
      const data = await client.deleteDiscount(args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting discount', error);
    }
  }

  // Metafield handlers
  async handleGetMetafields(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getMetafields(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving metafields', error);
    }
  }

  async handleGetMetafield(args) {
    try {
      this.validateRequired(args, ['metafield_id']);
      const client = this.createClient(args);
      const data = await client.getMetafield(args.metafield_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving metafield', error);
    }
  }

  async handleCreateMetafield(args) {
    try {
      this.validateRequired(args, ['namespace', 'key', 'value', 'value_type', 'owner_resource', 'owner_id']);
      const client = this.createClient(args);
      const { api_key, ...metafieldData } = this.sanitizeArgs(args);
      const data = await client.createMetafield(metafieldData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating metafield', error);
    }
  }

  async handleUpdateMetafield(args) {
    try {
      this.validateRequired(args, ['metafield_id']);
      const client = this.createClient(args);
      const { api_key, metafield_id, ...metafieldData } = this.sanitizeArgs(args);
      const data = await client.updateMetafield(metafield_id, metafieldData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating metafield', error);
    }
  }

  async handleDeleteMetafield(args) {
    try {
      this.validateRequired(args, ['metafield_id']);
      const client = this.createClient(args);
      const data = await client.deleteMetafield(args.metafield_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting metafield', error);
    }
  }

  // Webhook handlers
  async handleGetWebhooks(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getWebhooks(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving webhooks', error);
    }
  }

  async handleGetWebhook(args) {
    try {
      this.validateRequired(args, ['webhook_id']);
      const client = this.createClient(args);
      const data = await client.getWebhook(args.webhook_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving webhook', error);
    }
  }

  async handleCreateWebhook(args) {
    try {
      this.validateRequired(args, ['address', 'topic']);
      const client = this.createClient(args);
      const { api_key, ...webhookData } = this.sanitizeArgs(args);
      const data = await client.createWebhook(webhookData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating webhook', error);
    }
  }

  async handleUpdateWebhook(args) {
    try {
      this.validateRequired(args, ['webhook_id']);
      const client = this.createClient(args);
      const { api_key, webhook_id, ...webhookData } = this.sanitizeArgs(args);
      const data = await client.updateWebhook(webhook_id, webhookData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating webhook', error);
    }
  }

  async handleDeleteWebhook(args) {
    try {
      this.validateRequired(args, ['webhook_id']);
      const client = this.createClient(args);
      const data = await client.deleteWebhook(args.webhook_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting webhook', error);
    }
  }

  // Payment method handlers
  async handleGetPaymentMethods(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getPaymentMethods(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving payment methods', error);
    }
  }

  async handleGetPaymentMethod(args) {
    try {
      this.validateRequired(args, ['payment_method_id']);
      const client = this.createClient(args);
      const data = await client.getPaymentMethod(args.payment_method_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving payment method', error);
    }
  }

  async handleUpdatePaymentMethod(args) {
    try {
      this.validateRequired(args, ['payment_method_id']);
      const client = this.createClient(args);
      const { api_key, payment_method_id, ...paymentMethodData } = this.sanitizeArgs(args);
      const data = await client.updatePaymentMethod(payment_method_id, paymentMethodData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating payment method', error);
    }
  }

  // Checkout handlers
  async handleGetCheckouts(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getCheckouts(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving checkouts', error);
    }
  }

  async handleGetCheckout(args) {
    try {
      this.validateRequired(args, ['checkout_token']);
      const client = this.createClient(args);
      const data = await client.getCheckout(args.checkout_token);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving checkout', error);
    }
  }

  async handleCreateCheckout(args) {
    try {
      this.validateRequired(args, ['line_items']);
      const client = this.createClient(args);
      const { api_key, ...checkoutData } = this.sanitizeArgs(args);
      const data = await client.createCheckout(checkoutData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating checkout', error);
    }
  }

  async handleUpdateCheckout(args) {
    try {
      this.validateRequired(args, ['checkout_token']);
      const client = this.createClient(args);
      const { api_key, checkout_token, ...checkoutData } = this.sanitizeArgs(args);
      const data = await client.updateCheckout(checkout_token, checkoutData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating checkout', error);
    }
  }

  async handleProcessCheckout(args) {
    try {
      this.validateRequired(args, ['checkout_token']);
      const client = this.createClient(args);
      const data = await client.processCheckout(args.checkout_token);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('processing checkout', error);
    }
  }

  // Onetime handlers
  async handleGetOnetimes(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getOnetimes(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving onetimes', error);
    }
  }

  async handleGetOnetime(args) {
    try {
      this.validateRequired(args, ['onetime_id']);
      const client = this.createClient(args);
      const data = await client.getOnetime(args.onetime_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving onetime', error);
    }
  }

  async handleCreateOnetime(args) {
    try {
      this.validateRequired(args, ['address_id', 'next_charge_scheduled_at', 'product_title', 'price', 'quantity', 'shopify_variant_id']);
      const client = this.createClient(args);
      const { api_key, ...onetimeData } = this.sanitizeArgs(args);
      const data = await client.createOnetime(onetimeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating onetime', error);
    }
  }

  async handleUpdateOnetime(args) {
    try {
      this.validateRequired(args, ['onetime_id']);
      const client = this.createClient(args);
      const { api_key, onetime_id, ...onetimeData } = this.sanitizeArgs(args);
      const data = await client.updateOnetime(onetime_id, onetimeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating onetime', error);
    }
  }

  async handleDeleteOnetime(args) {
    try {
      this.validateRequired(args, ['onetime_id']);
      const client = this.createClient(args);
      const data = await client.deleteOnetime(args.onetime_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting onetime', error);
    }
  }

  // Store credit handlers
  async handleGetStoreCredits(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getStoreCredits(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving store credits', error);
    }
  }

  async handleGetStoreCredit(args) {
    try {
      this.validateRequired(args, ['store_credit_id']);
      const client = this.createClient(args);
      const data = await client.getStoreCredit(args.store_credit_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving store credit', error);
    }
  }

  async handleCreateStoreCredit(args) {
    try {
      this.validateRequired(args, ['amount', 'customer_id']);
      const client = this.createClient(args);
      const { api_key, ...storeCreditData } = this.sanitizeArgs(args);
      const data = await client.createStoreCredit(storeCreditData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating store credit', error);
    }
  }

  async handleUpdateStoreCredit(args) {
    try {
      this.validateRequired(args, ['store_credit_id']);
      const client = this.createClient(args);
      const { api_key, store_credit_id, ...storeCreditData } = this.sanitizeArgs(args);
      const data = await client.updateStoreCredit(store_credit_id, storeCreditData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating store credit', error);
    }
  }

  // Charge action handlers
  async handleSkipCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const data = await client.skipCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('skipping charge', error);
    }
  }

  async handleProcessCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const data = await client.processCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('processing charge', error);
    }
  }

  async handleUnskipCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const data = await client.unskipCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('unskipping charge', error);
    }
  }

  async handleDelayCharge(args) {
    try {
      this.validateRequired(args, ['charge_id', 'date']);
      const client = this.createClient(args);
      const data = await client.delayCharge(args.charge_id, { date: args.date });
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('delaying charge', error);
    }
  }

  async handleRefundCharge(args) {
    try {
      this.validateRequired(args, ['charge_id', 'amount']);
      const client = this.createClient(args);
      const refundData = { amount: args.amount };
      if (args.reason) refundData.reason = args.reason;
      const data = await client.refundCharge(args.charge_id, refundData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('refunding charge', error);
    }
  }

  // Subscription action handlers
  async handleSkipSubscriptionCharge(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'charge_date']);
      const client = this.createClient(args);
      const data = await client.skipSubscriptionCharge(args.subscription_id, args.charge_date);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('skipping subscription charge', error);
    }
  }

  async handleUnskipSubscriptionCharge(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'charge_date']);
      const client = this.createClient(args);
      const data = await client.unskipSubscriptionCharge(args.subscription_id, args.charge_date);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('unskipping subscription charge', error);
    }
  }

  // Shop handlers
  async handleGetShop(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShop();
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving shop', error);
    }
  }

  // Collection handlers
  async handleGetCollections(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getCollections(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving collections', error);
    }
  }

  async handleGetCollection(args) {
    try {
      this.validateRequired(args, ['collection_id']);
      const client = this.createClient(args);
      const data = await client.getCollection(args.collection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving collection', error);
    }
  }

  // Analytics handlers
  async handleGetSubscriptionAnalytics(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getSubscriptionAnalytics(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscription analytics', error);
    }
  }

  async handleGetCustomerAnalytics(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getCustomerAnalytics(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving customer analytics', error);
    }
  }

  // Order action handlers
  async handleUpdateOrder(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const client = this.createClient(args);
      const { api_key, order_id, ...orderData } = this.sanitizeArgs(args);
      const data = await client.updateOrder(order_id, orderData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating order', error);
    }
  }

  async handleDeleteOrder(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const client = this.createClient(args);
      const data = await client.deleteOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting order', error);
    }
  }

  async handleCloneOrder(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const client = this.createClient(args);
      const data = await client.cloneOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('cloning order', error);
    }
  }

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      this.validateRequired(args, ['customer_id']);
      const client = this.createClient(args);
      const data = await client.getCustomerPortalSession(args.customer_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving customer portal session', error);
    }
  }

  async handleCreateCustomerPortalSession(args) {
    try {
      this.validateRequired(args, ['customer_id']);
      const client = this.createClient(args);
      const { api_key, customer_id, ...sessionData } = this.sanitizeArgs(args);
      const data = await client.createCustomerPortalSession(customer_id, sessionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating customer portal session', error);
    }
  }

  // Bundle selection handlers
  async handleGetBundleSelections(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getBundleSelections(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving bundle selections', error);
    }
  }

  async handleGetBundleSelection(args) {
    try {
      this.validateRequired(args, ['bundle_selection_id']);
      const client = this.createClient(args);
      const data = await client.getBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving bundle selection', error);
    }
  }

  async handleCreateBundleSelection(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'external_product_id', 'external_variant_id', 'quantity']);
      const client = this.createClient(args);
      const { api_key, ...bundleSelectionData } = this.sanitizeArgs(args);
      const data = await client.createBundleSelection(bundleSelectionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating bundle selection', error);
    }
  }

  async handleUpdateBundleSelection(args) {
    try {
      this.validateRequired(args, ['bundle_selection_id']);
      const client = this.createClient(args);
      const { api_key, bundle_selection_id, ...bundleSelectionData } = this.sanitizeArgs(args);
      const data = await client.updateBundleSelection(bundle_selection_id, bundleSelectionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating bundle selection', error);
    }
  }

  async handleDeleteBundleSelection(args) {
    try {
      this.validateRequired(args, ['bundle_selection_id']);
      const client = this.createClient(args);
      const data = await client.deleteBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting bundle selection', error);
    }
  }

  // Retention strategy handlers
  async handleGetRetentionStrategies(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getRetentionStrategies(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving retention strategies', error);
    }
  }

  async handleGetRetentionStrategy(args) {
    try {
      this.validateRequired(args, ['retention_strategy_id']);
      const client = this.createClient(args);
      const data = await client.getRetentionStrategy(args.retention_strategy_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving retention strategy', error);
    }
  }

  // Async batch handlers
  async handleGetAsyncBatches(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getAsyncBatches(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving async batches', error);
    }
  }

  async handleGetAsyncBatch(args) {
    try {
      this.validateRequired(args, ['async_batch_id']);
      const client = this.createClient(args);
      const data = await client.getAsyncBatch(args.async_batch_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving async batch', error);
    }
  }

  async handleCreateAsyncBatch(args) {
    try {
      this.validateRequired(args, ['batch_type', 'requests']);
      const client = this.createClient(args);
      const { api_key, ...asyncBatchData } = this.sanitizeArgs(args);
      const data = await client.createAsyncBatch(asyncBatchData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating async batch', error);
    }
  }

  // Notification handlers
  async handleGetNotifications(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getNotifications(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving notifications', error);
    }
  }

  async handleGetNotification(args) {
    try {
      this.validateRequired(args, ['notification_id']);
      const client = this.createClient(args);
      const data = await client.getNotification(args.notification_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving notification', error);
    }
  }

  // Plan handlers
  async handleGetPlans(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getPlans(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving plans', error);
    }
  }

  async handleGetPlan(args) {
    try {
      this.validateRequired(args, ['plan_id']);
      const client = this.createClient(args);
      const data = await client.getPlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving plan', error);
    }
  }

  async handleCreatePlan(args) {
    try {
      this.validateRequired(args, ['title']);
      const client = this.createClient(args);
      const { api_key, ...planData } = this.sanitizeArgs(args);
      const data = await client.createPlan(planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating plan', error);
    }
  }

  async handleUpdatePlan(args) {
    try {
      this.validateRequired(args, ['plan_id']);
      const client = this.createClient(args);
      const { api_key, plan_id, ...planData } = this.sanitizeArgs(args);
      const data = await client.updatePlan(plan_id, planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating plan', error);
    }
  }

  async handleDeletePlan(args) {
    try {
      this.validateRequired(args, ['plan_id']);
      const client = this.createClient(args);
      const data = await client.deletePlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting plan', error);
    }
  }

  // Subscription plan handlers
  async handleGetSubscriptionPlans(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getSubscriptionPlans(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscription plans', error);
    }
  }

  async handleGetSubscriptionPlan(args) {
    try {
      this.validateRequired(args, ['subscription_plan_id']);
      const client = this.createClient(args);
      const data = await client.getSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscription plan', error);
    }
  }

  async handleCreateSubscriptionPlan(args) {
    try {
      this.validateRequired(args, ['title']);
      const client = this.createClient(args);
      const { api_key, ...subscriptionPlanData } = this.sanitizeArgs(args);
      const data = await client.createSubscriptionPlan(subscriptionPlanData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating subscription plan', error);
    }
  }

  async handleUpdateSubscriptionPlan(args) {
    try {
      this.validateRequired(args, ['subscription_plan_id']);
      const client = this.createClient(args);
      const { api_key, subscription_plan_id, ...subscriptionPlanData } = this.sanitizeArgs(args);
      const data = await client.updateSubscriptionPlan(subscription_plan_id, subscriptionPlanData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating subscription plan', error);
    }
  }

  async handleDeleteSubscriptionPlan(args) {
    try {
      this.validateRequired(args, ['subscription_plan_id']);
      const client = this.createClient(args);
      const data = await client.deleteSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting subscription plan', error);
    }
  }

  // Shipping rate handlers
  async handleGetShippingRates(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getShippingRates(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving shipping rates', error);
    }
  }

  async handleGetShippingRate(args) {
    try {
      this.validateRequired(args, ['shipping_rate_id']);
      const client = this.createClient(args);
      const data = await client.getShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving shipping rate', error);
    }
  }

  async handleCreateShippingRate(args) {
    try {
      this.validateRequired(args, ['name', 'price']);
      const client = this.createClient(args);
      const { api_key, ...shippingRateData } = this.sanitizeArgs(args);
      const data = await client.createShippingRate(shippingRateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('creating shipping rate', error);
    }
  }

  async handleUpdateShippingRate(args) {
    try {
      this.validateRequired(args, ['shipping_rate_id']);
      const client = this.createClient(args);
      const { api_key, shipping_rate_id, ...shippingRateData } = this.sanitizeArgs(args);
      const data = await client.updateShippingRate(shipping_rate_id, shippingRateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('updating shipping rate', error);
    }
  }

  async handleDeleteShippingRate(args) {
    try {
      this.validateRequired(args, ['shipping_rate_id']);
      const client = this.createClient(args);
      const data = await client.deleteShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('deleting shipping rate', error);
    }
  }

  // Tax line handlers
  async handleGetTaxLines(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...params } = this.sanitizeArgs(args);
      const data = await client.getTaxLines(params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving tax lines', error);
    }
  }

  async handleGetTaxLine(args) {
    try {
      this.validateRequired(args, ['tax_line_id']);
      const client = this.createClient(args);
      const data = await client.getTaxLine(args.tax_line_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving tax line', error);
    }
  }

  // Subscription discount handlers
  async handleGetSubscriptionDiscounts(args) {
    try {
      this.validateRequired(args, ['subscription_id']);
      const client = this.createClient(args);
      const { api_key, subscription_id, ...params } = this.sanitizeArgs(args);
      const data = await client.getSubscriptionDiscounts(subscription_id, params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving subscription discounts', error);
    }
  }

  async handleApplySubscriptionDiscount(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'discount_id']);
      const client = this.createClient(args);
      const { api_key, subscription_id, ...discountData } = this.sanitizeArgs(args);
      const data = await client.applySubscriptionDiscount(subscription_id, discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('applying subscription discount', error);
    }
  }

  async handleRemoveSubscriptionDiscount(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'discount_id']);
      const client = this.createClient(args);
      const data = await client.removeSubscriptionDiscount(args.subscription_id, args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('removing subscription discount', error);
    }
  }

  // Order discount handlers
  async handleGetOrderDiscounts(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const client = this.createClient(args);
      const { api_key, order_id, ...params } = this.sanitizeArgs(args);
      const data = await client.getOrderDiscounts(order_id, params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving order discounts', error);
    }
  }

  // Charge discount handlers
  async handleGetChargeDiscounts(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const client = this.createClient(args);
      const { api_key, charge_id, ...params } = this.sanitizeArgs(args);
      const data = await client.getChargeDiscounts(charge_id, params);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('retrieving charge discounts', error);
    }
  }

  async handleApplyChargeDiscount(args) {
    try {
      this.validateRequired(args, ['charge_id', 'discount_id']);
      const client = this.createClient(args);
      const { api_key, charge_id, ...discountData } = this.sanitizeArgs(args);
      const data = await client.applyChargeDiscount(charge_id, discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('applying charge discount', error);
    }
  }

  async handleRemoveChargeDiscount(args) {
    try {
      this.validateRequired(args, ['charge_id', 'discount_id']);
      const client = this.createClient(args);
      const data = await client.removeChargeDiscount(args.charge_id, args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError('removing charge discount', error);
    }
  }
}