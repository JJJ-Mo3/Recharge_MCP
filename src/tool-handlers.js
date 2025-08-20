import { RechargeClient } from './recharge-client.js';

/**
 * Tool handlers for Recharge MCP server
 */
export class RechargeToolHandlers {
  constructor(apiKey = null) {
    try {
      this.client = new RechargeClient(apiKey);
    } catch (error) {
      // If no API key is provided, we'll create the client when needed
      this.client = null;
      this.apiKey = apiKey;
    }
  }

  // Helper method to ensure we have a valid client
  getClient(providedApiKey = null) {
    const keyToUse = providedApiKey || this.apiKey || process.env.RECHARGE_API_KEY;
    
    if (!keyToUse) {
      throw new Error('API key is required. Provide it via api_key parameter, constructor, or RECHARGE_API_KEY environment variable');
    }

    // If we have a client and the key matches, reuse it
    if (this.client && this.client.apiKey === keyToUse) {
      return this.client;
    }

    // Create new client with the provided key
    return new RechargeClient(keyToUse);
  }

  // Customer handlers
  async handleGetCustomers(args) {
    try {
      const { api_key, ...cleanArgs } = args || {};
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      // Validate pagination parameters
      if (cleanArgs.limit && (cleanArgs.limit < 1 || cleanArgs.limit > 250)) {
        throw new Error('Limit must be between 1 and 250');
      }
      
      // Validate date format if provided
      if (cleanArgs.created_at_min && !this.isValidISODate(cleanArgs.created_at_min)) {
        throw new Error('created_at_min must be in ISO 8601 format');
      }
      if (cleanArgs.created_at_max && !this.isValidISODate(cleanArgs.created_at_max)) {
        throw new Error('created_at_max must be in ISO 8601 format');
      }
      
      const result = await client.getCustomers(cleanArgs);
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

  // Helper method to validate ISO date format
  isValidISODate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.includes('T');
  }

  // Helper method to validate required fields
  validateRequiredFields(args, requiredFields) {
    const missing = requiredFields.filter(field => !args[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
  }
  async handleGetCustomer(args) {
    try {
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.getCustomer(cleanArgs.customer_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      this.validateRequiredFields(cleanArgs, ['email']);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanArgs.email)) {
        throw new Error('Invalid email format');
      }
      
      const result = await client.createCustomer(cleanArgs);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, customer_id, ...updateData } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.updateCustomer(customer_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.getSubscriptions(cleanArgs);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      this.validateRequiredFields(cleanArgs, [
        'address_id', 
        'next_charge_scheduled_at', 
        'order_interval_frequency', 
        'order_interval_unit', 
        'quantity', 
        'shopify_variant_id'
      ]);
      
      // Validate interval unit
      const validUnits = ['day', 'week', 'month'];
      if (!validUnits.includes(cleanArgs.order_interval_unit)) {
        throw new Error(`Invalid order_interval_unit. Must be one of: ${validUnits.join(', ')}`);
      }
      
      // Validate quantity
      if (cleanArgs.quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      
      // Validate date format
      if (!this.isValidISODate(cleanArgs.next_charge_scheduled_at)) {
        throw new Error('next_charge_scheduled_at must be in ISO 8601 format');
      }
      
      const result = await client.createSubscription(cleanArgs);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.getSubscription(cleanArgs.subscription_id);
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
      const { api_key, subscription_id, ...updateData } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.updateSubscription(subscription_id, updateData);
      const { subscription_id, ...updateData } = args;
      const result = await client.updateSubscription(subscription_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.cancelSubscription(
        cleanArgs.subscription_id, 
        cleanArgs.cancellation_reason || ''
        cleanArgs.subscription_id, 
        cleanArgs.cancellation_reason || ''
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      
      const result = await client.activateSubscription(cleanArgs.subscription_id);
      const client = this.getClient(api_key);
      const result = await client.activateSubscription(cleanArgs.subscription_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getProducts(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getProduct(cleanArgs.product_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getOrders(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getOrder(cleanArgs.order_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCharges(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCharge(cleanArgs.charge_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getAddresses(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getAddress(cleanArgs.address_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { address_id, ...updateData } = args;
      const result = await client.updateAddress(address_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createAddress(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getDiscounts(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getDiscount(cleanArgs.discount_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { discount_id, ...updateData } = args;
      const result = await client.updateDiscount(discount_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteDiscount(cleanArgs.discount_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createDiscount(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getMetafields(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getMetafield(cleanArgs.metafield_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { metafield_id, ...updateData } = args;
      const result = await client.updateMetafield(metafield_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteMetafield(cleanArgs.metafield_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createMetafield(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getWebhooks(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getWebhook(cleanArgs.webhook_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { webhook_id, ...updateData } = args;
      const result = await client.updateWebhook(webhook_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteWebhook(cleanArgs.webhook_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createWebhook(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getPaymentMethods(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getPaymentMethod(cleanArgs.payment_method_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { payment_method_id, ...updateData } = args;
      const result = await client.updatePaymentMethod(payment_method_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCheckouts(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCheckout(cleanArgs.checkout_token);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { checkout_token, ...updateData } = args;
      const result = await client.updateCheckout(checkout_token, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.processCheckout(cleanArgs.checkout_token);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createCheckout(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getOnetimes(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getOnetime(cleanArgs.onetime_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { onetime_id, ...updateData } = args;
      const result = await client.updateOnetime(onetime_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteOnetime(cleanArgs.onetime_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createOnetime(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getStoreCredits(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getStoreCredit(cleanArgs.store_credit_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createStoreCredit(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { store_credit_id, ...updateData } = args;
      const result = await client.updateStoreCredit(store_credit_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.skipCharge(cleanArgs.charge_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.processCharge(cleanArgs.charge_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { charge_id, ...refundData } = args;
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

  async handleUnskipCharge(args) {
    try {
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.unskipCharge(cleanArgs.charge_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { charge_id, ...delayData } = args;
      const result = await client.delayCharge(charge_id, delayData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.skipSubscriptionCharge(cleanArgs.subscription_id, cleanArgs.charge_date);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.unskipSubscriptionCharge(cleanArgs.subscription_id, cleanArgs.charge_date);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCollections(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCollection(cleanArgs.collection_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getSubscriptionAnalytics(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCustomerAnalytics(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { order_id, ...updateData } = args;
      const result = await client.updateOrder(order_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteOrder(cleanArgs.order_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.cloneOrder(cleanArgs.order_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getCustomerPortalSession(cleanArgs.customer_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { customer_id, ...sessionData } = args;
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getBundleSelections(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getBundleSelection(cleanArgs.bundle_selection_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createBundleSelection(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const { bundle_selection_id, ...updateData } = args;
      const result = await client.updateBundleSelection(bundle_selection_id, updateData);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.deleteBundleSelection(cleanArgs.bundle_selection_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getRetentionStrategies(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getRetentionStrategy(cleanArgs.retention_strategy_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getAsyncBatches(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getAsyncBatch(cleanArgs.async_batch_id);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.createAsyncBatch(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getNotifications(args);
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
      const { api_key, ...cleanArgs } = args || {};
      const client = this.getClient(api_key);
      const result = await client.getNotification(cleanArgs.notification_id);
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