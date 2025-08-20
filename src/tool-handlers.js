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
}