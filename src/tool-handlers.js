import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 * Handles all tool execution and API communication
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
   * Create client instance with appropriate API key
   */
  createClient(args) {
    const apiKey = this.getApiKey(args);
    return new RechargeClient(apiKey);
  }

  /**
   * Format successful response
   */
  formatResponse(data) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  /**
   * Format error response
   */
  formatError(error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomers(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomer(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomer(args.customer_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateCustomer(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, api_key, ...updateData } = args;
      const data = await client.updateCustomer(customer_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCustomer(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...customerData } = args;
      const data = await client.createCustomer(customerData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Subscription handlers
  async handleGetSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptions(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscription(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...subscriptionData } = args;
      const data = await client.createSubscription(subscriptionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscription(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscription(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...updateData } = args;
      const data = await client.updateSubscription(subscription_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCancelSubscription(args) {
    try {
      const client = this.createClient(args);
      const data = await client.cancelSubscription(args.subscription_id, args.cancellation_reason);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleActivateSubscription(args) {
    try {
      const client = this.createClient(args);
      const data = await client.activateSubscription(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleSwapSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...swapData } = args;
      const data = await client.swapSubscription(subscription_id, swapData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleSetNextChargeDate(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...dateData } = args;
      const data = await client.setNextChargeDate(subscription_id, dateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Product handlers
  async handleGetProducts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getProducts(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetProduct(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getProduct(args.product_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Order handlers
  async handleGetOrders(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOrders(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetOrder(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateOrder(args) {
    try {
      const client = this.createClient(args);
      const { order_id, api_key, ...updateData } = args;
      const data = await client.updateOrder(order_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteOrder(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCloneOrder(args) {
    try {
      const client = this.createClient(args);
      const data = await client.cloneOrder(args.order_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Charge handlers
  async handleGetCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCharges(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCharge(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...chargeData } = args;
      const data = await client.createCharge(chargeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, api_key, ...updateData } = args;
      const data = await client.updateCharge(charge_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleSkipCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.skipCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleProcessCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.processCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUnskipCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.unskipCharge(args.charge_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDelayCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, api_key, ...delayData } = args;
      const data = await client.delayCharge(charge_id, delayData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleRefundCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, api_key, ...refundData } = args;
      const data = await client.refundCharge(charge_id, refundData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Address handlers
  async handleGetAddresses(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAddresses(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetAddress(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAddress(args.address_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateAddress(args) {
    try {
      const client = this.createClient(args);
      const { address_id, api_key, ...updateData } = args;
      const data = await client.updateAddress(address_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateAddress(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...addressData } = args;
      const data = await client.createAddress(addressData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteAddress(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteAddress(args.address_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleValidateAddress(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...addressData } = args;
      const data = await client.validateAddress(addressData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Discount handlers
  async handleGetDiscounts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getDiscounts(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetDiscount(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getDiscount(args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateDiscount(args) {
    try {
      const client = this.createClient(args);
      const { discount_id, api_key, ...updateData } = args;
      const data = await client.updateDiscount(discount_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteDiscount(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteDiscount(args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateDiscount(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...discountData } = args;
      const data = await client.createDiscount(discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Metafield handlers
  async handleGetMetafields(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getMetafields(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetMetafield(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getMetafield(args.metafield_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateMetafield(args) {
    try {
      const client = this.createClient(args);
      const { metafield_id, api_key, ...updateData } = args;
      const data = await client.updateMetafield(metafield_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteMetafield(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteMetafield(args.metafield_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateMetafield(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...metafieldData } = args;
      const data = await client.createMetafield(metafieldData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Webhook handlers
  async handleGetWebhooks(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getWebhooks(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetWebhook(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getWebhook(args.webhook_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateWebhook(args) {
    try {
      const client = this.createClient(args);
      const { webhook_id, api_key, ...updateData } = args;
      const data = await client.updateWebhook(webhook_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteWebhook(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteWebhook(args.webhook_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateWebhook(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...webhookData } = args;
      const data = await client.createWebhook(webhookData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Payment method handlers
  async handleGetPaymentMethods(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPaymentMethods(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetPaymentMethod(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPaymentMethod(args.payment_method_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdatePaymentMethod(args) {
    try {
      const client = this.createClient(args);
      const { payment_method_id, api_key, ...updateData } = args;
      const data = await client.updatePaymentMethod(payment_method_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Checkout handlers
  async handleGetCheckouts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCheckouts(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCheckout(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCheckout(args.checkout_token);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateCheckout(args) {
    try {
      const client = this.createClient(args);
      const { checkout_token, api_key, ...updateData } = args;
      const data = await client.updateCheckout(checkout_token, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleProcessCheckout(args) {
    try {
      const client = this.createClient(args);
      const data = await client.processCheckout(args.checkout_token);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCheckout(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...checkoutData } = args;
      const data = await client.createCheckout(checkoutData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Onetime handlers
  async handleGetOnetimes(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOnetimes(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetOnetime(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOnetime(args.onetime_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateOnetime(args) {
    try {
      const client = this.createClient(args);
      const { onetime_id, api_key, ...updateData } = args;
      const data = await client.updateOnetime(onetime_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteOnetime(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteOnetime(args.onetime_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateOnetime(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...onetimeData } = args;
      const data = await client.createOnetime(onetimeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Store credit handlers
  async handleGetStoreCredits(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getStoreCredits(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getStoreCredit(args.store_credit_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const { store_credit_id, api_key, ...updateData } = args;
      const data = await client.updateStoreCredit(store_credit_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...storeCreditData } = args;
      const data = await client.createStoreCredit(storeCreditData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Subscription action handlers
  async handleSkipSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.skipSubscriptionCharge(args.subscription_id, args.charge_date);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUnskipSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const data = await client.unskipSubscriptionCharge(args.subscription_id, args.charge_date);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Shop handlers
  async handleGetShop(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShop();
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateShop(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...shopData } = args;
      const data = await client.updateShop(shopData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Collection handlers
  async handleGetCollections(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCollections(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCollection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCollection(args.collection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCollection(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...collectionData } = args;
      const data = await client.createCollection(collectionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateCollection(args) {
    try {
      const client = this.createClient(args);
      const { collection_id, api_key, ...updateData } = args;
      const data = await client.updateCollection(collection_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteCollection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteCollection(args.collection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Analytics handlers
  async handleGetSubscriptionAnalytics(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionAnalytics(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerAnalytics(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerAnalytics(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerPortalSession(args.customer_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, api_key, ...sessionData } = args;
      const data = await client.createCustomerPortalSession(customer_id, sessionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Bundle selection handlers
  async handleGetBundleSelections(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getBundleSelections(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...bundleData } = args;
      const data = await client.createBundleSelection(bundleData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const { bundle_selection_id, api_key, ...updateData } = args;
      const data = await client.updateBundleSelection(bundle_selection_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Retention strategy handlers
  async handleGetRetentionStrategies(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getRetentionStrategies(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetRetentionStrategy(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getRetentionStrategy(args.retention_strategy_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Async batch handlers
  async handleGetAsyncBatches(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAsyncBatches(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAsyncBatch(args.async_batch_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...batchData } = args;
      const data = await client.createAsyncBatch(batchData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Notification handlers
  async handleGetNotifications(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getNotifications(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetNotification(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getNotification(args.notification_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Plan handlers
  async handleGetPlans(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPlans(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreatePlan(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...planData } = args;
      const data = await client.createPlan(planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdatePlan(args) {
    try {
      const client = this.createClient(args);
      const { plan_id, api_key, ...updateData } = args;
      const data = await client.updatePlan(plan_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeletePlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deletePlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Subscription plan handlers
  async handleGetSubscriptionPlans(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionPlans(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...planData } = args;
      const data = await client.createSubscriptionPlan(planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const { subscription_plan_id, api_key, ...updateData } = args;
      const data = await client.updateSubscriptionPlan(subscription_plan_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Shipping rate handlers
  async handleGetShippingRates(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShippingRates(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetShippingRate(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...rateData } = args;
      const data = await client.createShippingRate(rateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const { shipping_rate_id, api_key, ...updateData } = args;
      const data = await client.updateShippingRate(shipping_rate_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteShippingRate(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Tax line handlers
  async handleGetTaxLines(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getTaxLines(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetTaxLine(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getTaxLine(args.tax_line_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Subscription discount handlers
  async handleGetSubscriptionDiscounts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionDiscounts(args.subscription_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleApplySubscriptionDiscount(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...discountData } = args;
      const data = await client.applySubscriptionDiscount(subscription_id, discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleRemoveSubscriptionDiscount(args) {
    try {
      const client = this.createClient(args);
      const data = await client.removeSubscriptionDiscount(args.subscription_id, args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Order discount handlers
  async handleGetOrderDiscounts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOrderDiscounts(args.order_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Charge discount handlers
  async handleGetChargeDiscounts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getChargeDiscounts(args.charge_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleApplyChargeDiscount(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, api_key, ...discountData } = args;
      const data = await client.applyChargeDiscount(charge_id, discountData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleRemoveChargeDiscount(args) {
    try {
      const client = this.createClient(args);
      const data = await client.removeChargeDiscount(args.charge_id, args.discount_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Nested resource handlers - Customer relationships
  async handleGetCustomerAddresses(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerAddresses(args.customer_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerSubscriptions(args.customer_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerOrders(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerOrders(args.customer_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerCharges(args.customer_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerPaymentSources(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerPaymentSources(args.customer_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, api_key, ...paymentData } = args;
      const data = await client.createCustomerPaymentSource(customer_id, paymentData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, payment_source_id, api_key, ...updateData } = args;
      const data = await client.updateCustomerPaymentSource(customer_id, payment_source_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteCustomerPaymentSource(args.customer_id, args.payment_source_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Nested resource handlers - Subscription relationships
  async handleGetSubscriptionCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionCharges(args.subscription_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...chargeData } = args;
      const data = await client.createSubscriptionCharge(subscription_id, chargeData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscriptionLineItems(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionLineItems(args.subscription_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...lineItemData } = args;
      const data = await client.createSubscriptionLineItem(subscription_id, lineItemData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, line_item_id, api_key, ...updateData } = args;
      const data = await client.updateSubscriptionLineItem(subscription_id, line_item_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteSubscriptionLineItem(args.subscription_id, args.line_item_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscriptionNotes(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionNotes(args.subscription_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...noteData } = args;
      const data = await client.createSubscriptionNote(subscription_id, noteData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, note_id, api_key, ...updateData } = args;
      const data = await client.updateSubscriptionNote(subscription_id, note_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteSubscriptionNote(args.subscription_id, args.note_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscriptionDeliverySchedule(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionDeliverySchedule(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscriptionDeliverySchedule(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...scheduleData } = args;
      const data = await client.updateSubscriptionDeliverySchedule(subscription_id, scheduleData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handlePauseSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, api_key, ...pauseData } = args;
      const data = await client.pauseSubscription(subscription_id, pauseData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleResumeSubscription(args) {
    try {
      const client = this.createClient(args);
      const data = await client.resumeSubscription(args.subscription_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Nested resource handlers - Address relationships
  async handleGetAddressSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAddressSubscriptions(args.address_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetAddressCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAddressCharges(args.address_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Line item handlers
  async handleGetOrderLineItems(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getOrderLineItems(args.order_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetChargeLineItems(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getChargeLineItems(args.charge_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateChargeLineItem(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, line_item_id, api_key, ...updateData } = args;
      const data = await client.updateChargeLineItem(charge_id, line_item_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetChargeAttempts(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getChargeAttempts(args.charge_id, args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Bulk operation handlers
  async handleBulkUpdateSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...bulkData } = args;
      const data = await client.bulkUpdateSubscriptions(bulkData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleBulkSkipCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.bulkSkipCharges(args.charge_ids);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleBulkUnskipCharges(args) {
    try {
      const client = this.createClient(args);
      const data = await client.bulkUnskipCharges(args.charge_ids);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }
}
  // Bundle selection handlers
  async handleGetBundleSelections(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getBundleSelections(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...bundleData } = args;
      const data = await client.createBundleSelection(bundleData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const { bundle_selection_id, api_key, ...updateData } = args;
      const data = await client.updateBundleSelection(bundle_selection_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteBundleSelection(args.bundle_selection_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Retention strategy handlers
  async handleGetRetentionStrategies(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getRetentionStrategies(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetRetentionStrategy(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getRetentionStrategy(args.retention_strategy_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Async batch handlers
  async handleGetAsyncBatches(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAsyncBatches(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getAsyncBatch(args.async_batch_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...batchData } = args;
      const data = await client.createAsyncBatch(batchData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Notification handlers
  async handleGetNotifications(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getNotifications(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetNotification(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getNotification(args.notification_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Plan handlers
  async handleGetPlans(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPlans(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getPlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreatePlan(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...planData } = args;
      const data = await client.createPlan(planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdatePlan(args) {
    try {
      const client = this.createClient(args);
      const { plan_id, api_key, ...updateData } = args;
      const data = await client.updatePlan(plan_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeletePlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deletePlan(args.plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Subscription plan handlers
  async handleGetSubscriptionPlans(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionPlans(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...planData } = args;
      const data = await client.createSubscriptionPlan(planData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const { subscription_plan_id, api_key, ...updateData } = args;
      const data = await client.updateSubscriptionPlan(subscription_plan_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteSubscriptionPlan(args.subscription_plan_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Shipping rate handlers
  async handleGetShippingRates(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShippingRates(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetShippingRate(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const { api_key, ...rateData } = args;
      const data = await client.createShippingRate(rateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleUpdateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const { shipping_rate_id, api_key, ...updateData } = args;
      const data = await client.updateShippingRate(shipping_rate_id, updateData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleDeleteShippingRate(args) {
    try {
      const client = this.createClient(args);
      const data = await client.deleteShippingRate(args.shipping_rate_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Tax line handlers
  async handleGetTaxLines(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getTaxLines(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetTaxLine(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getTaxLine(args.tax_line_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Analytics handlers
  async handleGetSubscriptionAnalytics(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getSubscriptionAnalytics(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleGetCustomerAnalytics(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerAnalytics(args);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const data = await client.getCustomerPortalSession(args.customer_id);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }

  async handleCreateCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, api_key, ...sessionData } = args;
      const data = await client.createCustomerPortalSession(customer_id, sessionData);
      return this.formatResponse(data);
    } catch (error) {
      return this.formatError(error);
    }
  }