import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 */
export class RechargeToolHandlers {
  constructor(defaultApiKey = null) {
    this.defaultApiKey = defaultApiKey;
  }

  /**
   * Get or create a Recharge client with the appropriate API key
   */
  getClient(clientApiKey = null) {
    const apiKey = clientApiKey || this.defaultApiKey;
    if (!apiKey) {
      throw new Error('API key is required. Provide it via constructor parameter, RECHARGE_API_KEY environment variable, or as api_key parameter in tool calls');
    }
    return new RechargeClient(apiKey);
  }

  /**
   * Validate required fields
   */
  validateRequired(args, requiredFields) {
    const missing = requiredFields.filter(field => !args[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCustomers(params);
      
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
      this.validateRequired(args, ['customer_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCustomer(params.customer_id);
      
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
      this.validateRequired(args, ['email']);
      const { api_key: clientApiKey, ...customerData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createCustomer(customerData);
      
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
      this.validateRequired(args, ['customer_id']);
      const { api_key: clientApiKey, customer_id, ...customerData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateCustomer(customer_id, customerData);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getSubscriptions(params);
      
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
      this.validateRequired(args, ['address_id', 'next_charge_scheduled_at', 'order_interval_frequency', 'order_interval_unit', 'quantity', 'shopify_variant_id']);
      const { api_key: clientApiKey, ...subscriptionData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createSubscription(subscriptionData);
      
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
      this.validateRequired(args, ['subscription_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getSubscription(params.subscription_id);
      
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
      this.validateRequired(args, ['subscription_id']);
      const { api_key: clientApiKey, subscription_id, ...subscriptionData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateSubscription(subscription_id, subscriptionData);
      
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
      this.validateRequired(args, ['subscription_id']);
      const { api_key: clientApiKey, subscription_id, cancellation_reason = '' } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.cancelSubscription(subscription_id, cancellation_reason);
      
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
      this.validateRequired(args, ['subscription_id']);
      const { api_key: clientApiKey, subscription_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.activateSubscription(subscription_id);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getProducts(params);
      
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
      this.validateRequired(args, ['product_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getProduct(params.product_id);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getOrders(params);
      
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
      this.validateRequired(args, ['order_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getOrder(params.order_id);
      
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

  async handleUpdateOrder(args) {
    try {
      this.validateRequired(args, ['order_id']);
      const { api_key: clientApiKey, order_id, ...orderData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateOrder(order_id, orderData);
      
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
      this.validateRequired(args, ['order_id']);
      const { api_key: clientApiKey, order_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteOrder(order_id);
      
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
      this.validateRequired(args, ['order_id']);
      const { api_key: clientApiKey, order_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.cloneOrder(order_id);
      
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

  // Charge handlers
  async handleGetCharges(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCharges(params);
      
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
      this.validateRequired(args, ['charge_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCharge(params.charge_id);
      
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

  async handleSkipCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const { api_key: clientApiKey, charge_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.skipCharge(charge_id);
      
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
      this.validateRequired(args, ['charge_id']);
      const { api_key: clientApiKey, charge_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.processCharge(charge_id);
      
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

  async handleUnskipCharge(args) {
    try {
      this.validateRequired(args, ['charge_id']);
      const { api_key: clientApiKey, charge_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.unskipCharge(charge_id);
      
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
      this.validateRequired(args, ['charge_id', 'date']);
      const { api_key: clientApiKey, charge_id, date } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.delayCharge(charge_id, { date });
      
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

  async handleRefundCharge(args) {
    try {
      this.validateRequired(args, ['charge_id', 'amount']);
      const { api_key: clientApiKey, charge_id, amount, reason } = args;
      const client = this.getClient(clientApiKey);
      const refundData = { amount };
      if (reason) refundData.reason = reason;
      const result = await client.refundCharge(charge_id, refundData);
      
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

  // Address handlers
  async handleGetAddresses(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getAddresses(params);
      
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
      this.validateRequired(args, ['address_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getAddress(params.address_id);
      
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

  async handleCreateAddress(args) {
    try {
      this.validateRequired(args, ['customer_id', 'first_name', 'last_name', 'address1', 'city', 'province', 'country_code', 'zip']);
      const { api_key: clientApiKey, ...addressData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createAddress(addressData);
      
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

  async handleUpdateAddress(args) {
    try {
      this.validateRequired(args, ['address_id']);
      const { api_key: clientApiKey, address_id, ...addressData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateAddress(address_id, addressData);
      
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

  // Discount handlers
  async handleGetDiscounts(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getDiscounts(params);
      
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
      this.validateRequired(args, ['discount_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getDiscount(params.discount_id);
      
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

  async handleCreateDiscount(args) {
    try {
      this.validateRequired(args, ['code', 'value', 'value_type']);
      const { api_key: clientApiKey, ...discountData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createDiscount(discountData);
      
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

  async handleUpdateDiscount(args) {
    try {
      this.validateRequired(args, ['discount_id']);
      const { api_key: clientApiKey, discount_id, ...discountData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateDiscount(discount_id, discountData);
      
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
      this.validateRequired(args, ['discount_id']);
      const { api_key: clientApiKey, discount_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteDiscount(discount_id);
      
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

  // Metafield handlers
  async handleGetMetafields(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getMetafields(params);
      
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
      this.validateRequired(args, ['metafield_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getMetafield(params.metafield_id);
      
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

  async handleCreateMetafield(args) {
    try {
      this.validateRequired(args, ['namespace', 'key', 'value', 'value_type', 'owner_resource', 'owner_id']);
      const { api_key: clientApiKey, ...metafieldData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createMetafield(metafieldData);
      
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

  async handleUpdateMetafield(args) {
    try {
      this.validateRequired(args, ['metafield_id']);
      const { api_key: clientApiKey, metafield_id, ...metafieldData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateMetafield(metafield_id, metafieldData);
      
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
      this.validateRequired(args, ['metafield_id']);
      const { api_key: clientApiKey, metafield_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteMetafield(metafield_id);
      
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

  // Webhook handlers
  async handleGetWebhooks(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getWebhooks(params);
      
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
      this.validateRequired(args, ['webhook_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getWebhook(params.webhook_id);
      
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

  async handleCreateWebhook(args) {
    try {
      this.validateRequired(args, ['address', 'topic']);
      const { api_key: clientApiKey, ...webhookData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createWebhook(webhookData);
      
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

  async handleUpdateWebhook(args) {
    try {
      this.validateRequired(args, ['webhook_id']);
      const { api_key: clientApiKey, webhook_id, ...webhookData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateWebhook(webhook_id, webhookData);
      
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
      this.validateRequired(args, ['webhook_id']);
      const { api_key: clientApiKey, webhook_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteWebhook(webhook_id);
      
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

  // Payment method handlers
  async handleGetPaymentMethods(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getPaymentMethods(params);
      
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
      this.validateRequired(args, ['payment_method_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getPaymentMethod(params.payment_method_id);
      
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
      this.validateRequired(args, ['payment_method_id']);
      const { api_key: clientApiKey, payment_method_id, ...paymentMethodData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updatePaymentMethod(payment_method_id, paymentMethodData);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCheckouts(params);
      
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
      this.validateRequired(args, ['checkout_token']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCheckout(params.checkout_token);
      
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

  async handleCreateCheckout(args) {
    try {
      this.validateRequired(args, ['line_items']);
      const { api_key: clientApiKey, ...checkoutData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createCheckout(checkoutData);
      
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

  async handleUpdateCheckout(args) {
    try {
      this.validateRequired(args, ['checkout_token']);
      const { api_key: clientApiKey, checkout_token, ...checkoutData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateCheckout(checkout_token, checkoutData);
      
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
      this.validateRequired(args, ['checkout_token']);
      const { api_key: clientApiKey, checkout_token } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.processCheckout(checkout_token);
      
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

  // Onetime handlers
  async handleGetOnetimes(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getOnetimes(params);
      
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
      this.validateRequired(args, ['onetime_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getOnetime(params.onetime_id);
      
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

  async handleCreateOnetime(args) {
    try {
      this.validateRequired(args, ['address_id', 'next_charge_scheduled_at', 'product_title', 'price', 'quantity', 'shopify_variant_id']);
      const { api_key: clientApiKey, ...onetimeData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createOnetime(onetimeData);
      
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

  async handleUpdateOnetime(args) {
    try {
      this.validateRequired(args, ['onetime_id']);
      const { api_key: clientApiKey, onetime_id, ...onetimeData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateOnetime(onetime_id, onetimeData);
      
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
      this.validateRequired(args, ['onetime_id']);
      const { api_key: clientApiKey, onetime_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteOnetime(onetime_id);
      
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

  // Store credit handlers
  async handleGetStoreCredits(args) {
    try {
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getStoreCredits(params);
      
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
      this.validateRequired(args, ['store_credit_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getStoreCredit(params.store_credit_id);
      
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
      this.validateRequired(args, ['amount', 'customer_id']);
      const { api_key: clientApiKey, ...storeCreditData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createStoreCredit(storeCreditData);
      
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
      this.validateRequired(args, ['store_credit_id']);
      const { api_key: clientApiKey, store_credit_id, ...storeCreditData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateStoreCredit(store_credit_id, storeCreditData);
      
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

  // Subscription action handlers
  async handleSkipSubscriptionCharge(args) {
    try {
      this.validateRequired(args, ['subscription_id', 'charge_date']);
      const { api_key: clientApiKey, subscription_id, charge_date } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.skipSubscriptionCharge(subscription_id, charge_date);
      
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
      this.validateRequired(args, ['subscription_id', 'charge_date']);
      const { api_key: clientApiKey, subscription_id, charge_date } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.unskipSubscriptionCharge(subscription_id, charge_date);
      
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
      const { api_key: clientApiKey } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getShop();
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCollections(params);
      
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
      this.validateRequired(args, ['collection_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCollection(params.collection_id);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getSubscriptionAnalytics(params);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCustomerAnalytics(params);
      
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

  // Customer portal handlers
  async handleGetCustomerPortalSession(args) {
    try {
      this.validateRequired(args, ['customer_id']);
      const { api_key: clientApiKey, customer_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getCustomerPortalSession(customer_id);
      
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
      this.validateRequired(args, ['customer_id']);
      const { api_key: clientApiKey, customer_id, ...sessionData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createCustomerPortalSession(customer_id, sessionData);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getBundleSelections(params);
      
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
      this.validateRequired(args, ['bundle_selection_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getBundleSelection(params.bundle_selection_id);
      
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
      this.validateRequired(args, ['subscription_id', 'external_product_id', 'external_variant_id', 'quantity']);
      const { api_key: clientApiKey, ...bundleSelectionData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createBundleSelection(bundleSelectionData);
      
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
      this.validateRequired(args, ['bundle_selection_id']);
      const { api_key: clientApiKey, bundle_selection_id, ...bundleSelectionData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.updateBundleSelection(bundle_selection_id, bundleSelectionData);
      
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
      this.validateRequired(args, ['bundle_selection_id']);
      const { api_key: clientApiKey, bundle_selection_id } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.deleteBundleSelection(bundle_selection_id);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getRetentionStrategies(params);
      
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
      this.validateRequired(args, ['retention_strategy_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getRetentionStrategy(params.retention_strategy_id);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getAsyncBatches(params);
      
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
      this.validateRequired(args, ['async_batch_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getAsyncBatch(params.async_batch_id);
      
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
      this.validateRequired(args, ['batch_type', 'requests']);
      const { api_key: clientApiKey, ...asyncBatchData } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.createAsyncBatch(asyncBatchData);
      
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
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getNotifications(params);
      
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
      this.validateRequired(args, ['notification_id']);
      const { api_key: clientApiKey, ...params } = args;
      const client = this.getClient(clientApiKey);
      const result = await client.getNotification(params.notification_id);
      
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
}