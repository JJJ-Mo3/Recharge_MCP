import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 */
export class RechargeToolHandlers {
  constructor() {
    this.client = new RechargeClient();
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const result = await this.client.getCustomers(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving customers: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetCustomer(args) {
    try {
      const result = await this.client.getCustomer(args.customer_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving customer: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateCustomer(args) {
    try {
      const result = await this.client.createCustomer(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating customer: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateCustomer(args) {
    try {
      const { customer_id, ...updateData } = args;
      const result = await this.client.updateCustomer(customer_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating customer: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Subscription handlers
  async handleGetSubscriptions(args) {
    try {
      const result = await this.client.getSubscriptions(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving subscriptions: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateSubscription(args) {
    try {
      const result = await this.client.createSubscription(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating subscription: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetSubscription(args) {
    try {
      const result = await this.client.getSubscription(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving subscription: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateSubscription(args) {
    try {
      const { subscription_id, ...updateData } = args;
      const result = await this.client.updateSubscription(subscription_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating subscription: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCancelSubscription(args) {
    try {
      const result = await this.client.cancelSubscription(
        args.subscription_id, 
        args.cancellation_reason || ''
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error cancelling subscription: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleActivateSubscription(args) {
    try {
      const result = await this.client.activateSubscription(args.subscription_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error activating subscription: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Product handlers
  async handleGetProducts(args) {
    try {
      const result = await this.client.getProducts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving products: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetProduct(args) {
    try {
      const result = await this.client.getProduct(args.product_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving product: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Order handlers
  async handleGetOrders(args) {
    try {
      const result = await this.client.getOrders(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving orders: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetOrder(args) {
    try {
      const result = await this.client.getOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving order: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Charge handlers
  async handleGetCharges(args) {
    try {
      const result = await this.client.getCharges(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving charges: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetCharge(args) {
    try {
      const result = await this.client.getCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Address handlers
  async handleGetAddresses(args) {
    try {
      const result = await this.client.getAddresses(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving addresses: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetAddress(args) {
    try {
      const result = await this.client.getAddress(args.address_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving address: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateAddress(args) {
    try {
      const { address_id, ...updateData } = args;
      const result = await this.client.updateAddress(address_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating address: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateAddress(args) {
    try {
      const result = await this.client.createAddress(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating address: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Discount handlers
  async handleGetDiscounts(args) {
    try {
      const result = await this.client.getDiscounts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving discounts: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetDiscount(args) {
    try {
      const result = await this.client.getDiscount(args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving discount: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateDiscount(args) {
    try {
      const { discount_id, ...updateData } = args;
      const result = await this.client.updateDiscount(discount_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating discount: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteDiscount(args) {
    try {
      const result = await this.client.deleteDiscount(args.discount_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting discount: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateDiscount(args) {
    try {
      const result = await this.client.createDiscount(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating discount: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Metafield handlers
  async handleGetMetafields(args) {
    try {
      const result = await this.client.getMetafields(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving metafields: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetMetafield(args) {
    try {
      const result = await this.client.getMetafield(args.metafield_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving metafield: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateMetafield(args) {
    try {
      const { metafield_id, ...updateData } = args;
      const result = await this.client.updateMetafield(metafield_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating metafield: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteMetafield(args) {
    try {
      const result = await this.client.deleteMetafield(args.metafield_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting metafield: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateMetafield(args) {
    try {
      const result = await this.client.createMetafield(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating metafield: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Webhook handlers
  async handleGetWebhooks(args) {
    try {
      const result = await this.client.getWebhooks(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving webhooks: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetWebhook(args) {
    try {
      const result = await this.client.getWebhook(args.webhook_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving webhook: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateWebhook(args) {
    try {
      const { webhook_id, ...updateData } = args;
      const result = await this.client.updateWebhook(webhook_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating webhook: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteWebhook(args) {
    try {
      const result = await this.client.deleteWebhook(args.webhook_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting webhook: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateWebhook(args) {
    try {
      const result = await this.client.createWebhook(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating webhook: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Payment method handlers
  async handleGetPaymentMethods(args) {
    try {
      const result = await this.client.getPaymentMethods(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving payment methods: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetPaymentMethod(args) {
    try {
      const result = await this.client.getPaymentMethod(args.payment_method_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving payment method: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdatePaymentMethod(args) {
    try {
      const { payment_method_id, ...updateData } = args;
      const result = await this.client.updatePaymentMethod(payment_method_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating payment method: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Checkout handlers
  async handleGetCheckouts(args) {
    try {
      const result = await this.client.getCheckouts(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving checkouts: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetCheckout(args) {
    try {
      const result = await this.client.getCheckout(args.checkout_token);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving checkout: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateCheckout(args) {
    try {
      const { checkout_token, ...updateData } = args;
      const result = await this.client.updateCheckout(checkout_token, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating checkout: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleProcessCheckout(args) {
    try {
      const result = await this.client.processCheckout(args.checkout_token);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error processing checkout: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateCheckout(args) {
    try {
      const result = await this.client.createCheckout(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating checkout: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Onetime handlers
  async handleGetOnetimes(args) {
    try {
      const result = await this.client.getOnetimes(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving onetimes: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetOnetime(args) {
    try {
      const result = await this.client.getOnetime(args.onetime_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving onetime: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateOnetime(args) {
    try {
      const { onetime_id, ...updateData } = args;
      const result = await this.client.updateOnetime(onetime_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating onetime: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteOnetime(args) {
    try {
      const result = await this.client.deleteOnetime(args.onetime_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting onetime: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateOnetime(args) {
    try {
      const result = await this.client.createOnetime(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating onetime: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Store credit handlers
  async handleGetStoreCredits(args) {
    try {
      const result = await this.client.getStoreCredits(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving store credits: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetStoreCredit(args) {
    try {
      const result = await this.client.getStoreCredit(args.store_credit_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving store credit: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateStoreCredit(args) {
    try {
      const result = await this.client.createStoreCredit(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating store credit: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateStoreCredit(args) {
    try {
      const { store_credit_id, ...updateData } = args;
      const result = await this.client.updateStoreCredit(store_credit_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating store credit: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Charge action handlers
  async handleSkipCharge(args) {
    try {
      const result = await this.client.skipCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error skipping charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleProcessCharge(args) {
    try {
      const result = await this.client.processCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error processing charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleRefundCharge(args) {
    try {
      const { charge_id, ...refundData } = args;
      const result = await this.client.refundCharge(charge_id, refundData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error refunding charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUnskipCharge(args) {
    try {
      const result = await this.client.unskipCharge(args.charge_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error unskipping charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDelayCharge(args) {
    try {
      const { charge_id, ...delayData } = args;
      const result = await this.client.delayCharge(charge_id, delayData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error delaying charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Subscription action handlers
  async handleSkipSubscriptionCharge(args) {
    try {
      const result = await this.client.skipSubscriptionCharge(args.subscription_id, args.charge_date);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error skipping subscription charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUnskipSubscriptionCharge(args) {
    try {
      const result = await this.client.unskipSubscriptionCharge(args.subscription_id, args.charge_date);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error unskipping subscription charge: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Shop handlers
  async handleGetShop(args) {
    try {
      const result = await this.client.getShop();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving shop: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Collection handlers
  async handleGetCollections(args) {
    try {
      const result = await this.client.getCollections(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving collections: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetCollection(args) {
    try {
      const result = await this.client.getCollection(args.collection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving collection: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Analytics handlers
  async handleGetSubscriptionAnalytics(args) {
    try {
      const result = await this.client.getSubscriptionAnalytics(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving subscription analytics: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetCustomerAnalytics(args) {
    try {
      const result = await this.client.getCustomerAnalytics(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving customer analytics: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Order action handlers
  async handleUpdateOrder(args) {
    try {
      const { order_id, ...updateData } = args;
      const result = await this.client.updateOrder(order_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating order: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteOrder(args) {
    try {
      const result = await this.client.deleteOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting order: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCloneOrder(args) {
    try {
      const result = await this.client.cloneOrder(args.order_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error cloning order: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      const result = await this.client.getCustomerPortalSession(args.customer_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving customer portal session: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateCustomerPortalSession(args) {
    try {
      const { customer_id, ...sessionData } = args;
      const result = await this.client.createCustomerPortalSession(customer_id, sessionData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating customer portal session: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Bundle selection handlers
  async handleGetBundleSelections(args) {
    try {
      const result = await this.client.getBundleSelections(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving bundle selections: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetBundleSelection(args) {
    try {
      const result = await this.client.getBundleSelection(args.bundle_selection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving bundle selection: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateBundleSelection(args) {
    try {
      const result = await this.client.createBundleSelection(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating bundle selection: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleUpdateBundleSelection(args) {
    try {
      const { bundle_selection_id, ...updateData } = args;
      const result = await this.client.updateBundleSelection(bundle_selection_id, updateData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error updating bundle selection: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleDeleteBundleSelection(args) {
    try {
      const result = await this.client.deleteBundleSelection(args.bundle_selection_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error deleting bundle selection: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Retention strategy handlers
  async handleGetRetentionStrategies(args) {
    try {
      const result = await this.client.getRetentionStrategies(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving retention strategies: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetRetentionStrategy(args) {
    try {
      const result = await this.client.getRetentionStrategy(args.retention_strategy_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving retention strategy: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Async batch handlers
  async handleGetAsyncBatches(args) {
    try {
      const result = await this.client.getAsyncBatches(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving async batches: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetAsyncBatch(args) {
    try {
      const result = await this.client.getAsyncBatch(args.async_batch_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving async batch: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleCreateAsyncBatch(args) {
    try {
      const result = await this.client.createAsyncBatch(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating async batch: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  // Notification handlers
  async handleGetNotifications(args) {
    try {
      const result = await this.client.getNotifications(args);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving notifications: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async handleGetNotification(args) {
    try {
      const result = await this.client.getNotification(args.notification_id);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving notification: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }