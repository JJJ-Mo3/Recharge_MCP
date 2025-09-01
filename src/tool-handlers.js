import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 * Handles all tool execution and API interactions
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
    return new RechargeClient(apiKey);
  }

  /**
   * Handle errors consistently
   */
  handleError(error, operation) {
    return {
      content: [
        {
          type: 'text',
          text: `Error ${operation}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCustomers(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customers');
    }
  }

  async handleGetCustomer(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCustomer(args.customer_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer');
    }
  }

  async handleCreateCustomer(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createCustomer(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating customer');
    }
  }

  async handleUpdateCustomer(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...updateData } = args;
      const result = await client.updateCustomer(customer_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating customer');
    }
  }

  // Subscription handlers
  async handleGetSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscriptions(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscriptions');
    }
  }

  async handleCreateSubscription(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createSubscription(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating subscription');
    }
  }

  async handleGetSubscription(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscription(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription');
    }
  }

  async handleUpdateSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...updateData } = args;
      const result = await client.updateSubscription(subscription_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating subscription');
    }
  }

  async handleCancelSubscription(args) {
    try {
      const client = this.createClient(args);
      const result = await client.cancelSubscription(args.subscription_id, args.cancellation_reason);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'cancelling subscription');
    }
  }

  async handleActivateSubscription(args) {
    try {
      const client = this.createClient(args);
      const result = await client.activateSubscription(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'activating subscription');
    }
  }

  async handleSwapSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...swapData } = args;
      const result = await client.swapSubscription(subscription_id, swapData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'swapping subscription');
    }
  }

  async handleSetNextChargeDate(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...dateData } = args;
      const result = await client.setNextChargeDate(subscription_id, dateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'setting next charge date');
    }
  }

  // Product handlers
  async handleGetProducts(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getProducts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving products');
    }
  }

  async handleGetProduct(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getProduct(args.product_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving product');
    }
  }

  // Order handlers
  async handleGetOrders(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getOrders(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving orders');
    }
  }

  async handleGetOrder(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving order');
    }
  }

  async handleUpdateOrder(args) {
    try {
      const client = this.createClient(args);
      const { order_id, ...updateData } = args;
      const result = await client.updateOrder(order_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating order');
    }
  }

  async handleDeleteOrder(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting order');
    }
  }

  async handleCloneOrder(args) {
    try {
      const client = this.createClient(args);
      const result = await client.cloneOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'cloning order');
    }
  }

  // Charge handlers
  async handleGetCharges(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCharges(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving charges');
    }
  }

  async handleGetCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving charge');
    }
  }

  async handleCreateCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createCharge(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating charge');
    }
  }

  async handleUpdateCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...updateData } = args;
      const result = await client.updateCharge(charge_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating charge');
    }
  }

  async handleDeleteCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting charge');
    }
  }

  async handleSkipCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.skipCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'skipping charge');
    }
  }

  async handleProcessCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.processCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'processing charge');
    }
  }

  async handleUnskipCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.unskipCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'unskipping charge');
    }
  }

  async handleDelayCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...delayData } = args;
      const result = await client.delayCharge(charge_id, delayData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'delaying charge');
    }
  }

  async handleRefundCharge(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...refundData } = args;
      const result = await client.refundCharge(charge_id, refundData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'refunding charge');
    }
  }

  // Address handlers
  async handleGetAddresses(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getAddresses(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving addresses');
    }
  }

  async handleGetAddress(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getAddress(args.address_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving address');
    }
  }

  async handleCreateAddress(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createAddress(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating address');
    }
  }

  async handleUpdateAddress(args) {
    try {
      const client = this.createClient(args);
      const { address_id, ...updateData } = args;
      const result = await client.updateAddress(address_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating address');
    }
  }

  async handleDeleteAddress(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteAddress(args.address_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting address');
    }
  }

  async handleValidateAddress(args) {
    try {
      const client = this.createClient(args);
      const result = await client.validateAddress(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'validating address');
    }
  }

  // Discount handlers
  async handleGetDiscounts(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getDiscounts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving discounts');
    }
  }

  async handleGetDiscount(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getDiscount(args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving discount');
    }
  }

  async handleCreateDiscount(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createDiscount(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating discount');
    }
  }

  async handleUpdateDiscount(args) {
    try {
      const client = this.createClient(args);
      const { discount_id, ...updateData } = args;
      const result = await client.updateDiscount(discount_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating discount');
    }
  }

  async handleDeleteDiscount(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteDiscount(args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting discount');
    }
  }

  // Metafield handlers
  async handleGetMetafields(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getMetafields(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving metafields');
    }
  }

  async handleGetMetafield(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getMetafield(args.metafield_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving metafield');
    }
  }

  async handleCreateMetafield(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createMetafield(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating metafield');
    }
  }

  async handleUpdateMetafield(args) {
    try {
      const client = this.createClient(args);
      const { metafield_id, ...updateData } = args;
      const result = await client.updateMetafield(metafield_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating metafield');
    }
  }

  async handleDeleteMetafield(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteMetafield(args.metafield_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting metafield');
    }
  }

  // Webhook handlers
  async handleGetWebhooks(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getWebhooks(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving webhooks');
    }
  }

  async handleGetWebhook(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getWebhook(args.webhook_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving webhook');
    }
  }

  async handleCreateWebhook(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createWebhook(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating webhook');
    }
  }

  async handleUpdateWebhook(args) {
    try {
      const client = this.createClient(args);
      const { webhook_id, ...updateData } = args;
      const result = await client.updateWebhook(webhook_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating webhook');
    }
  }

  async handleDeleteWebhook(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteWebhook(args.webhook_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting webhook');
    }
  }

  // Payment method handlers
  async handleGetPaymentMethods(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getPaymentMethods(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving payment methods');
    }
  }

  async handleGetPaymentMethod(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getPaymentMethod(args.payment_method_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving payment method');
    }
  }

  async handleUpdatePaymentMethod(args) {
    try {
      const client = this.createClient(args);
      const { payment_method_id, ...updateData } = args;
      const result = await client.updatePaymentMethod(payment_method_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating payment method');
    }
  }

  // Checkout handlers
  async handleGetCheckouts(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCheckouts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving checkouts');
    }
  }

  async handleGetCheckout(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCheckout(args.checkout_token);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving checkout');
    }
  }

  async handleCreateCheckout(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createCheckout(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating checkout');
    }
  }

  async handleUpdateCheckout(args) {
    try {
      const client = this.createClient(args);
      const { checkout_token, ...updateData } = args;
      const result = await client.updateCheckout(checkout_token, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating checkout');
    }
  }

  async handleProcessCheckout(args) {
    try {
      const client = this.createClient(args);
      const result = await client.processCheckout(args.checkout_token);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'processing checkout');
    }
  }

  // Onetime handlers
  async handleGetOnetimes(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getOnetimes(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving onetimes');
    }
  }

  async handleGetOnetime(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getOnetime(args.onetime_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving onetime');
    }
  }

  async handleCreateOnetime(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createOnetime(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating onetime');
    }
  }

  async handleUpdateOnetime(args) {
    try {
      const client = this.createClient(args);
      const { onetime_id, ...updateData } = args;
      const result = await client.updateOnetime(onetime_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating onetime');
    }
  }

  async handleDeleteOnetime(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteOnetime(args.onetime_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting onetime');
    }
  }

  // Store credit handlers
  async handleGetStoreCredits(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getStoreCredits(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving store credits');
    }
  }

  async handleGetStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getStoreCredit(args.store_credit_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving store credit');
    }
  }

  async handleCreateStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createStoreCredit(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating store credit');
    }
  }

  async handleUpdateStoreCredit(args) {
    try {
      const client = this.createClient(args);
      const { store_credit_id, ...updateData } = args;
      const result = await client.updateStoreCredit(store_credit_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating store credit');
    }
  }

  // Subscription charge action handlers
  async handleSkipSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.skipSubscriptionCharge(args.subscription_id, args.charge_date);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'skipping subscription charge');
    }
  }

  async handleUnskipSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const result = await client.unskipSubscriptionCharge(args.subscription_id, args.charge_date);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'unskipping subscription charge');
    }
  }

  // Shop handlers
  async handleGetShop(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getShop();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving shop');
    }
  }

  async handleUpdateShop(args) {
    try {
      const client = this.createClient(args);
      const result = await client.updateShop(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating shop');
    }
  }

  // Collection handlers
  async handleGetCollections(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCollections(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving collections');
    }
  }

  async handleGetCollection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCollection(args.collection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving collection');
    }
  }

  async handleCreateCollection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createCollection(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating collection');
    }
  }

  async handleUpdateCollection(args) {
    try {
      const client = this.createClient(args);
      const { collection_id, ...updateData } = args;
      const result = await client.updateCollection(collection_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating collection');
    }
  }

  async handleDeleteCollection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteCollection(args.collection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting collection');
    }
  }

  // Analytics handlers
  async handleGetSubscriptionAnalytics(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscriptionAnalytics(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription analytics');
    }
  }

  async handleGetCustomerAnalytics(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCustomerAnalytics(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer analytics');
    }
  }

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getCustomerPortalSession(args.customer_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer portal session');
    }
  }

  async handleCreateCustomerPortalSession(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...sessionData } = args;
      const result = await client.createCustomerPortalSession(customer_id, sessionData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating customer portal session');
    }
  }

  // Bundle selection handlers
  async handleGetBundleSelections(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getBundleSelections(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving bundle selections');
    }
  }

  async handleGetBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getBundleSelection(args.bundle_selection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving bundle selection');
    }
  }

  async handleCreateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createBundleSelection(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating bundle selection');
    }
  }

  async handleUpdateBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const { bundle_selection_id, ...updateData } = args;
      const result = await client.updateBundleSelection(bundle_selection_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating bundle selection');
    }
  }

  async handleDeleteBundleSelection(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteBundleSelection(args.bundle_selection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting bundle selection');
    }
  }

  // Retention strategy handlers
  async handleGetRetentionStrategies(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getRetentionStrategies(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving retention strategies');
    }
  }

  async handleGetRetentionStrategy(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getRetentionStrategy(args.retention_strategy_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving retention strategy');
    }
  }

  // Async batch handlers
  async handleGetAsyncBatches(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getAsyncBatches(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving async batches');
    }
  }

  async handleGetAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getAsyncBatch(args.async_batch_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving async batch');
    }
  }

  async handleCreateAsyncBatch(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createAsyncBatch(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating async batch');
    }
  }

  // Notification handlers
  async handleGetNotifications(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getNotifications(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving notifications');
    }
  }

  async handleGetNotification(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getNotification(args.notification_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving notification');
    }
  }

  // Plan handlers
  async handleGetPlans(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getPlans(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving plans');
    }
  }

  async handleGetPlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getPlan(args.plan_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving plan');
    }
  }

  async handleCreatePlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createPlan(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating plan');
    }
  }

  async handleUpdatePlan(args) {
    try {
      const client = this.createClient(args);
      const { plan_id, ...updateData } = args;
      const result = await client.updatePlan(plan_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating plan');
    }
  }

  async handleDeletePlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deletePlan(args.plan_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting plan');
    }
  }

  // Subscription plan handlers
  async handleGetSubscriptionPlans(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscriptionPlans(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription plans');
    }
  }

  async handleGetSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscriptionPlan(args.subscription_plan_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription plan');
    }
  }

  async handleCreateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createSubscriptionPlan(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating subscription plan');
    }
  }

  async handleUpdateSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const { subscription_plan_id, ...updateData } = args;
      const result = await client.updateSubscriptionPlan(subscription_plan_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating subscription plan');
    }
  }

  async handleDeleteSubscriptionPlan(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteSubscriptionPlan(args.subscription_plan_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting subscription plan');
    }
  }

  // Shipping rate handlers
  async handleGetShippingRates(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getShippingRates(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving shipping rates');
    }
  }

  async handleGetShippingRate(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getShippingRate(args.shipping_rate_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving shipping rate');
    }
  }

  async handleCreateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const result = await client.createShippingRate(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating shipping rate');
    }
  }

  async handleUpdateShippingRate(args) {
    try {
      const client = this.createClient(args);
      const { shipping_rate_id, ...updateData } = args;
      const result = await client.updateShippingRate(shipping_rate_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating shipping rate');
    }
  }

  async handleDeleteShippingRate(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteShippingRate(args.shipping_rate_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting shipping rate');
    }
  }

  // Tax line handlers
  async handleGetTaxLines(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getTaxLines(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving tax lines');
    }
  }

  async handleGetTaxLine(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getTaxLine(args.tax_line_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving tax line');
    }
  }

  // Bulk operation handlers
  async handleBulkUpdateSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const result = await client.bulkUpdateSubscriptions(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'bulk updating subscriptions');
    }
  }

  async handleBulkSkipCharges(args) {
    try {
      const client = this.createClient(args);
      const result = await client.bulkSkipCharges(args.charge_ids);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'bulk skipping charges');
    }
  }

  async handleBulkUnskipCharges(args) {
    try {
      const client = this.createClient(args);
      const result = await client.bulkUnskipCharges(args.charge_ids);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'bulk unskipping charges');
    }
  }

  // Nested resource handlers - Customer relationships
  async handleGetCustomerAddresses(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...params } = args;
      const result = await client.getCustomerAddresses(customer_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer addresses');
    }
  }

  async handleGetCustomerSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...params } = args;
      const result = await client.getCustomerSubscriptions(customer_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer subscriptions');
    }
  }

  async handleGetCustomerOrders(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...params } = args;
      const result = await client.getCustomerOrders(customer_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer orders');
    }
  }

  async handleGetCustomerCharges(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...params } = args;
      const result = await client.getCustomerCharges(customer_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer charges');
    }
  }

  async handleGetCustomerPaymentSources(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...params } = args;
      const result = await client.getCustomerPaymentSources(customer_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving customer payment sources');
    }
  }

  async handleCreateCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, ...paymentSourceData } = args;
      const result = await client.createCustomerPaymentSource(customer_id, paymentSourceData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating customer payment source');
    }
  }

  async handleUpdateCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const { customer_id, payment_source_id, ...updateData } = args;
      const result = await client.updateCustomerPaymentSource(customer_id, payment_source_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating customer payment source');
    }
  }

  async handleDeleteCustomerPaymentSource(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteCustomerPaymentSource(args.customer_id, args.payment_source_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting customer payment source');
    }
  }

  // Nested resource handlers - Subscription relationships
  async handleGetSubscriptionCharges(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...params } = args;
      const result = await client.getSubscriptionCharges(subscription_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription charges');
    }
  }

  async handleCreateSubscriptionCharge(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...chargeData } = args;
      const result = await client.createSubscriptionCharge(subscription_id, chargeData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating subscription charge');
    }
  }

  async handleGetSubscriptionLineItems(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...params } = args;
      const result = await client.getSubscriptionLineItems(subscription_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription line items');
    }
  }

  async handleCreateSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...lineItemData } = args;
      const result = await client.createSubscriptionLineItem(subscription_id, lineItemData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating subscription line item');
    }
  }

  async handleUpdateSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, line_item_id, ...updateData } = args;
      const result = await client.updateSubscriptionLineItem(subscription_id, line_item_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating subscription line item');
    }
  }

  async handleDeleteSubscriptionLineItem(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteSubscriptionLineItem(args.subscription_id, args.line_item_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting subscription line item');
    }
  }

  async handleGetSubscriptionNotes(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...params } = args;
      const result = await client.getSubscriptionNotes(subscription_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription notes');
    }
  }

  async handleCreateSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...noteData } = args;
      const result = await client.createSubscriptionNote(subscription_id, noteData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'creating subscription note');
    }
  }

  async handleUpdateSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, note_id, ...updateData } = args;
      const result = await client.updateSubscriptionNote(subscription_id, note_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating subscription note');
    }
  }

  async handleDeleteSubscriptionNote(args) {
    try {
      const client = this.createClient(args);
      const result = await client.deleteSubscriptionNote(args.subscription_id, args.note_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'deleting subscription note');
    }
  }

  async handleGetSubscriptionDeliverySchedule(args) {
    try {
      const client = this.createClient(args);
      const result = await client.getSubscriptionDeliverySchedule(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription delivery schedule');
    }
  }

  async handleUpdateSubscriptionDeliverySchedule(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...scheduleData } = args;
      const result = await client.updateSubscriptionDeliverySchedule(subscription_id, scheduleData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating subscription delivery schedule');
    }
  }

  async handlePauseSubscription(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...pauseData } = args;
      const result = await client.pauseSubscription(subscription_id, pauseData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'pausing subscription');
    }
  }

  async handleResumeSubscription(args) {
    try {
      const client = this.createClient(args);
      const result = await client.resumeSubscription(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'resuming subscription');
    }
  }

  // Nested resource handlers - Address relationships
  async handleGetAddressSubscriptions(args) {
    try {
      const client = this.createClient(args);
      const { address_id, ...params } = args;
      const result = await client.getAddressSubscriptions(address_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving address subscriptions');
    }
  }

  async handleGetAddressCharges(args) {
    try {
      const client = this.createClient(args);
      const { address_id, ...params } = args;
      const result = await client.getAddressCharges(address_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving address charges');
    }
  }

  // Line item handlers
  async handleGetOrderLineItems(args) {
    try {
      const client = this.createClient(args);
      const { order_id, ...params } = args;
      const result = await client.getOrderLineItems(order_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving order line items');
    }
  }

  async handleGetChargeLineItems(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...params } = args;
      const result = await client.getChargeLineItems(charge_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving charge line items');
    }
  }

  async handleUpdateChargeLineItem(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, line_item_id, ...updateData } = args;
      const result = await client.updateChargeLineItem(charge_id, line_item_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'updating charge line item');
    }
  }

  async handleGetChargeAttempts(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...params } = args;
      const result = await client.getChargeAttempts(charge_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving charge attempts');
    }
  }

  // Discount application handlers
  async handleGetSubscriptionDiscounts(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...params } = args;
      const result = await client.getSubscriptionDiscounts(subscription_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving subscription discounts');
    }
  }

  async handleApplySubscriptionDiscount(args) {
    try {
      const client = this.createClient(args);
      const { subscription_id, ...discountData } = args;
      const result = await client.applySubscriptionDiscount(subscription_id, discountData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'applying subscription discount');
    }
  }

  async handleRemoveSubscriptionDiscount(args) {
    try {
      const client = this.createClient(args);
      const result = await client.removeSubscriptionDiscount(args.subscription_id, args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'removing subscription discount');
    }
  }

  async handleGetOrderDiscounts(args) {
    try {
      const client = this.createClient(args);
      const { order_id, ...params } = args;
      const result = await client.getOrderDiscounts(order_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving order discounts');
    }
  }

  async handleGetChargeDiscounts(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...params } = args;
      const result = await client.getChargeDiscounts(charge_id, params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'retrieving charge discounts');
    }
  }

  async handleApplyChargeDiscount(args) {
    try {
      const client = this.createClient(args);
      const { charge_id, ...discountData } = args;
      const result = await client.applyChargeDiscount(charge_id, discountData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'applying charge discount');
    }
  }

  async handleRemoveChargeDiscount(args) {
    try {
      const client = this.createClient(args);
      const result = await client.removeChargeDiscount(args.charge_id, args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return this.handleError(error, 'removing charge discount');
    }
  }
}