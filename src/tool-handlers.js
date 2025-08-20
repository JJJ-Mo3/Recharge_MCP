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

  // Checkout handlers
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
}