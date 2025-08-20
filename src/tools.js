/**
 * Tool definitions for Recharge MCP server
 */

// Customer tools
export const getCustomersSchema = {
  name: 'recharge_get_customers',
  description: 'Retrieve a list of customers from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        description: 'Recharge API key (optional if set in environment)'
      },
      limit: {
        type: 'number',
        description: 'Number of customers to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      email: {
        type: 'string',
        description: 'Filter customers by email'
      },
      created_at_min: {
        type: 'string',
        description: 'Filter customers created after this date (ISO 8601)'
      },
      created_at_max: {
        type: 'string',
        description: 'Filter customers created before this date (ISO 8601)'
      }
    }
  }
};

export const getCustomerSchema = {
  name: 'recharge_get_customer',
  description: 'Retrieve a specific customer by ID',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        description: 'Recharge API key (optional if set in environment)'
      },
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      }
    },
    required: ['customer_id']
  }
};

export const createCustomerSchema = {
  name: 'recharge_create_customer',
  description: 'Create a new customer in Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Customer email address'
      },
      first_name: {
        type: 'string',
        description: 'Customer first name'
      },
      last_name: {
        type: 'string',
        description: 'Customer last name'
      },
      phone: {
        type: 'string',
        description: 'Customer phone number'
      }
    },
    required: ['email']
  }
};

export const updateCustomerSchema = {
  name: 'recharge_update_customer',
  description: 'Update an existing customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      email: {
        type: 'string',
        description: 'Customer email address'
      },
      first_name: {
        type: 'string',
        description: 'Customer first name'
      },
      last_name: {
        type: 'string',
        description: 'Customer last name'
      },
      phone: {
        type: 'string',
        description: 'Customer phone number'
      }
    },
    required: ['customer_id']
  }
};

// Subscription tools
export const getSubscriptionsSchema = {
  name: 'recharge_get_subscriptions',
  description: 'Retrieve a list of subscriptions from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of subscriptions to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter subscriptions by customer ID'
      },
      status: {
        type: 'string',
        enum: ['active', 'cancelled', 'expired'],
        description: 'Filter subscriptions by status'
      },
      created_at_min: {
        type: 'string',
        description: 'Filter subscriptions created after this date (ISO 8601)'
      },
      created_at_max: {
        type: 'string',
        description: 'Filter subscriptions created before this date (ISO 8601)'
      }
    }
  }
};

export const createSubscriptionSchema = {
  name: 'recharge_create_subscription',
  description: 'Create a new subscription',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'Address ID for the subscription'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When the next charge should occur (ISO 8601)'
      },
      order_interval_frequency: {
        type: 'string',
        description: 'How often the subscription renews'
      },
      order_interval_unit: {
        type: 'string',
        enum: ['day', 'week', 'month'],
        description: 'The unit for the interval frequency'
      },
      quantity: {
        type: 'number',
        description: 'Subscription quantity'
      },
      shopify_variant_id: {
        type: 'string',
        description: 'Shopify variant ID'
      }
    },
    required: ['address_id', 'next_charge_scheduled_at', 'order_interval_frequency', 'order_interval_unit', 'quantity', 'shopify_variant_id']
  }
};

export const getSubscriptionSchema = {
  name: 'recharge_get_subscription',
  description: 'Retrieve a specific subscription by ID',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      }
    },
    required: ['subscription_id']
  }
};

export const updateSubscriptionSchema = {
  name: 'recharge_update_subscription',
  description: 'Update an existing subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      quantity: {
        type: 'number',
        description: 'Subscription quantity'
      },
      order_interval_frequency: {
        type: 'string',
        description: 'How often the subscription renews'
      },
      order_interval_unit: {
        type: 'string',
        enum: ['day', 'week', 'month'],
        description: 'The unit for the interval frequency'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When the next charge should occur (ISO 8601)'
      }
    },
    required: ['subscription_id']
  }
};

export const cancelSubscriptionSchema = {
  name: 'recharge_cancel_subscription',
  description: 'Cancel a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      cancellation_reason: {
        type: 'string',
        description: 'Reason for cancellation'
      }
    },
    required: ['subscription_id']
  }
};

export const activateSubscriptionSchema = {
  name: 'recharge_activate_subscription',
  description: 'Activate a cancelled subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      }
    },
    required: ['subscription_id']
  }
};

// Product tools
export const getProductsSchema = {
  name: 'recharge_get_products',
  description: 'Retrieve a list of products from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of products to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      title: {
        type: 'string',
        description: 'Filter products by title'
      }
    }
  }
};

export const getProductSchema = {
  name: 'recharge_get_product',
  description: 'Retrieve a specific product by ID',
  inputSchema: {
    type: 'object',
    properties: {
      product_id: {
        type: 'string',
        description: 'The product ID'
      }
    },
    required: ['product_id']
  }
};

// Order tools
export const getOrdersSchema = {
  name: 'recharge_get_orders',
  description: 'Retrieve a list of orders from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of orders to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter orders by customer ID'
      },
      status: {
        type: 'string',
        description: 'Filter orders by status'
      },
      created_at_min: {
        type: 'string',
        description: 'Filter orders created after this date (ISO 8601)'
      },
      created_at_max: {
        type: 'string',
        description: 'Filter orders created before this date (ISO 8601)'
      }
    }
  }
};

export const getOrderSchema = {
  name: 'recharge_get_order',
  description: 'Retrieve a specific order by ID',
  inputSchema: {
    type: 'object',
    properties: {
      order_id: {
        type: 'string',
        description: 'The order ID'
      }
    },
    required: ['order_id']
  }
};

// Charge tools
export const getChargesSchema = {
  name: 'recharge_get_charges',
  description: 'Retrieve a list of charges from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of charges to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter charges by customer ID'
      },
      subscription_id: {
        type: 'string',
        description: 'Filter charges by subscription ID'
      },
      status: {
        type: 'string',
        description: 'Filter charges by status'
      }
    }
  }
};

export const getChargeSchema = {
  name: 'recharge_get_charge',
  description: 'Retrieve a specific charge by ID',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
      }
    },
    required: ['charge_id']
  }
};

// Address tools
export const getAddressesSchema = {
  name: 'recharge_get_addresses',
  description: 'Retrieve a list of addresses from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of addresses to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter addresses by customer ID'
      }
    }
  }
};

export const getAddressSchema = {
  name: 'recharge_get_address',
  description: 'Retrieve a specific address by ID',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'The address ID'
      }
    },
    required: ['address_id']
  }
};

export const updateAddressSchema = {
  name: 'recharge_update_address',
  description: 'Update an existing address',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'The address ID'
      },
      first_name: {
        type: 'string',
        description: 'First name'
      },
      last_name: {
        type: 'string',
        description: 'Last name'
      },
      address1: {
        type: 'string',
        description: 'Address line 1'
      },
      address2: {
        type: 'string',
        description: 'Address line 2'
      },
      city: {
        type: 'string',
        description: 'City'
      },
      province: {
        type: 'string',
        description: 'Province/State'
      },
      country_code: {
        type: 'string',
        description: 'Country code (e.g., US, CA, GB)'
      },
      zip: {
        type: 'string',
        description: 'Postal/ZIP code'
      },
      phone: {
        type: 'string',
        description: 'Phone number'
      }
    },
    required: ['address_id']
  }
};

export const createAddressSchema = {
  name: 'recharge_create_address',
  description: 'Create a new address for a customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      first_name: {
        type: 'string',
        description: 'First name'
      },
      last_name: {
        type: 'string',
        description: 'Last name'
      },
      address1: {
        type: 'string',
        description: 'Address line 1'
      },
      address2: {
        type: 'string',
        description: 'Address line 2'
      },
      city: {
        type: 'string',
        description: 'City'
      },
      province: {
        type: 'string',
        description: 'Province/State'
      },
      country_code: {
        type: 'string',
        description: 'Country code (e.g., US, CA, GB)'
      },
      zip: {
        type: 'string',
        description: 'Postal/ZIP code'
      },
      phone: {
        type: 'string',
        description: 'Phone number'
      }
    },
    required: ['customer_id', 'first_name', 'last_name', 'address1', 'city', 'province', 'country_code', 'zip']
  }
};

// Discount tools
export const getDiscountsSchema = {
  name: 'recharge_get_discounts',
  description: 'Retrieve a list of discounts from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of discounts to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Filter discounts by status'
      }
    }
  }
};

export const getDiscountSchema = {
  name: 'recharge_get_discount',
  description: 'Retrieve a specific discount by ID',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      }
    },
    required: ['discount_id']
  }
};

export const updateDiscountSchema = {
  name: 'recharge_update_discount',
  description: 'Update an existing discount',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      },
      code: {
        type: 'string',
        description: 'Discount code'
      },
      value: {
        type: 'number',
        description: 'Discount value'
      },
      value_type: {
        type: 'string',
        enum: ['percentage', 'fixed_amount'],
        description: 'Type of discount value'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Discount status'
      },
      usage_limit: {
        type: 'number',
        description: 'Maximum number of times discount can be used'
      },
      applies_to: {
        type: 'string',
        enum: ['checkout', 'recurring'],
        description: 'Where the discount applies'
      }
    },
    required: ['discount_id']
  }
};

export const deleteDiscountSchema = {
  name: 'recharge_delete_discount',
  description: 'Delete a discount',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      }
    },
    required: ['discount_id']
  }
};

export const createDiscountSchema = {
  name: 'recharge_create_discount',
  description: 'Create a new discount in Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'Discount code'
      },
      value: {
        type: 'number',
        description: 'Discount value'
      },
      value_type: {
        type: 'string',
        enum: ['percentage', 'fixed_amount'],
        description: 'Type of discount value'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Discount status'
      },
      usage_limit: {
        type: 'number',
        description: 'Maximum number of times discount can be used'
      },
      applies_to: {
        type: 'string',
        enum: ['checkout', 'recurring'],
        description: 'Where the discount applies'
      }
    },
    required: ['code', 'value', 'value_type']
  }
};

// Metafield tools
export const getMetafieldsSchema = {
  name: 'recharge_get_metafields',
  description: 'Retrieve metafields from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of metafields to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      owner_resource: {
        type: 'string',
        enum: ['customer', 'subscription', 'store'],
        description: 'Resource type that owns the metafield'
      },
      owner_id: {
        type: 'string',
        description: 'ID of the resource that owns the metafield'
      }
    }
  }
};

export const getMetafieldSchema = {
  name: 'recharge_get_metafield',
  description: 'Retrieve a specific metafield by ID',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      }
    },
    required: ['metafield_id']
  }
};

export const updateMetafieldSchema = {
  name: 'recharge_update_metafield',
  description: 'Update an existing metafield',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      },
      namespace: {
        type: 'string',
        description: 'Metafield namespace'
      },
      key: {
        type: 'string',
        description: 'Metafield key'
      },
      value: {
        type: 'string',
        description: 'Metafield value'
      },
      value_type: {
        type: 'string',
        enum: ['string', 'integer', 'json_string'],
        description: 'Type of the metafield value'
      }
    },
    required: ['metafield_id']
  }
};

export const deleteMetafieldSchema = {
  name: 'recharge_delete_metafield',
  description: 'Delete a metafield',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      }
    },
    required: ['metafield_id']
  }
};

export const createMetafieldSchema = {
  name: 'recharge_create_metafield',
  description: 'Create a new metafield',
  inputSchema: {
    type: 'object',
    properties: {
      namespace: {
        type: 'string',
        description: 'Metafield namespace'
      },
      key: {
        type: 'string',
        description: 'Metafield key'
      },
      value: {
        type: 'string',
        description: 'Metafield value'
      },
      value_type: {
        type: 'string',
        enum: ['string', 'integer', 'json_string'],
        description: 'Type of the metafield value'
      },
      owner_resource: {
        type: 'string',
        enum: ['customer', 'subscription', 'store'],
        description: 'Resource type that owns the metafield'
      },
      owner_id: {
        type: 'string',
        description: 'ID of the resource that owns the metafield'
      }
    },
    required: ['namespace', 'key', 'value', 'value_type', 'owner_resource', 'owner_id']
  }
};

// Webhook tools
export const getWebhooksSchema = {
  name: 'recharge_get_webhooks',
  description: 'Retrieve webhooks from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of webhooks to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      }
    }
  }
};

export const getWebhookSchema = {
  name: 'recharge_get_webhook',
  description: 'Retrieve a specific webhook by ID',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      }
    },
    required: ['webhook_id']
  }
};

export const updateWebhookSchema = {
  name: 'recharge_update_webhook',
  description: 'Update an existing webhook',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      },
      address: {
        type: 'string',
        description: 'Webhook endpoint URL'
      },
      topic: {
        type: 'string',
        description: 'Webhook topic/event'
      }
    },
    required: ['webhook_id']
  }
};

export const deleteWebhookSchema = {
  name: 'recharge_delete_webhook',
  description: 'Delete a webhook',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      }
    },
    required: ['webhook_id']
  }
};

export const createWebhookSchema = {
  name: 'recharge_create_webhook',
  description: 'Create a new webhook',
  inputSchema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'Webhook endpoint URL'
      },
      topic: {
        type: 'string',
        description: 'Webhook topic/event'
      }
    },
    required: ['address', 'topic']
  }
};

// Payment method tools
export const getPaymentMethodsSchema = {
  name: 'recharge_get_payment_methods',
  description: 'Retrieve payment methods from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of payment methods to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter payment methods by customer ID'
      }
    }
  }
};

export const getPaymentMethodSchema = {
  name: 'recharge_get_payment_method',
  description: 'Retrieve a specific payment method by ID',
  inputSchema: {
    type: 'object',
    properties: {
      payment_method_id: {
        type: 'string',
        description: 'The payment method ID'
      }
    },
    required: ['payment_method_id']
  }
};

export const updatePaymentMethodSchema = {
  name: 'recharge_update_payment_method',
  description: 'Update an existing payment method',
  inputSchema: {
    type: 'object',
    properties: {
      payment_method_id: {
        type: 'string',
        description: 'The payment method ID'
      },
      billing_address: {
        type: 'object',
        description: 'Billing address information'
      }
    },
    required: ['payment_method_id']
  }
};

// Checkout tools
export const createCheckoutSchema = {
  name: 'recharge_create_checkout',
  description: 'Create a new checkout',
  inputSchema: {
    type: 'object',
    properties: {
      line_items: {
        type: 'array',
        description: 'Array of line items for the checkout',
        items: {
          type: 'object',
          properties: {
            variant_id: {
              type: 'string',
              description: 'Product variant ID'
            },
            quantity: {
              type: 'number',
              description: 'Quantity of the item'
            }
          },
          required: ['variant_id', 'quantity']
        }
      },
      email: {
        type: 'string',
        description: 'Customer email'
      }
    },
    required: ['line_items']
  }
};

export const getCheckoutsSchema = {
  name: 'recharge_get_checkouts',
  description: 'Retrieve checkouts from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of checkouts to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      }
    }
  }
};

export const getCheckoutSchema = {
  name: 'recharge_get_checkout',
  description: 'Retrieve a specific checkout by token',
  inputSchema: {
    type: 'object',
    properties: {
      checkout_token: {
        type: 'string',
        description: 'The checkout token'
      }
    },
    required: ['checkout_token']
  }
};

export const updateCheckoutSchema = {
  name: 'recharge_update_checkout',
  description: 'Update an existing checkout',
  inputSchema: {
    type: 'object',
    properties: {
      checkout_token: {
        type: 'string',
        description: 'The checkout token'
      },
      line_items: {
        type: 'array',
        description: 'Array of line items for the checkout',
        items: {
          type: 'object',
          properties: {
            variant_id: {
              type: 'string',
              description: 'Product variant ID'
            },
            quantity: {
              type: 'number',
              description: 'Quantity of the item'
            }
          },
          required: ['variant_id', 'quantity']
        }
      },
      email: {
        type: 'string',
        description: 'Customer email'
      }
    },
    required: ['checkout_token']
  }
};

export const processCheckoutSchema = {
  name: 'recharge_process_checkout',
  description: 'Process a checkout to complete the purchase',
  inputSchema: {
    type: 'object',
    properties: {
      checkout_token: {
        type: 'string',
        description: 'The checkout token'
      }
    },
    required: ['checkout_token']
  }
};

// Onetime tools
export const getOnetimesSchema = {
  name: 'recharge_get_onetimes',
  description: 'Retrieve one-time products from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of onetimes to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      address_id: {
        type: 'string',
        description: 'Filter onetimes by address ID'
      }
    }
  }
};

export const getOnetimeSchema = {
  name: 'recharge_get_onetime',
  description: 'Retrieve a specific one-time product by ID',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      }
    },
    required: ['onetime_id']
  }
};

export const updateOnetimeSchema = {
  name: 'recharge_update_onetime',
  description: 'Update an existing one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When to charge for this one-time product (ISO 8601)'
      },
      product_title: {
        type: 'string',
        description: 'Product title'
      },
      variant_title: {
        type: 'string',
        description: 'Variant title'
      },
      price: {
        type: 'string',
        description: 'Product price'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      }
    },
    required: ['onetime_id']
  }
};

export const deleteOnetimeSchema = {
  name: 'recharge_delete_onetime',
  description: 'Delete a one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      }
    },
    required: ['onetime_id']
  }
};

export const createOnetimeSchema = {
  name: 'recharge_create_onetime',
  description: 'Create a new one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'Address ID for the one-time product'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When to charge for this one-time product (ISO 8601)'
      },
      product_title: {
        type: 'string',
        description: 'Product title'
      },
      variant_title: {
        type: 'string',
        description: 'Variant title'
      },
      price: {
        type: 'string',
        description: 'Product price'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      },
      shopify_variant_id: {
        type: 'string',
        description: 'Shopify variant ID'
      }
    },
    required: ['address_id', 'next_charge_scheduled_at', 'product_title', 'price', 'quantity', 'shopify_variant_id']
  }
};

// Store credit tools
export const getStoreCreditsSchema = {
  name: 'recharge_get_store_credits',
  description: 'Retrieve store credits from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of store credits to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter store credits by customer ID'
      }
    }
  }
};

export const getStoreCreditSchema = {
  name: 'recharge_get_store_credit',
  description: 'Retrieve a specific store credit by ID',
  inputSchema: {
    type: 'object',
    properties: {
      store_credit_id: {
        type: 'string',
        description: 'The store credit ID'
      }
    },
    required: ['store_credit_id']
  }
};

export const createStoreCreditSchema = {
  name: 'recharge_create_store_credit',
  description: 'Create a new store credit',
  inputSchema: {
    type: 'object',
    properties: {
      amount: {
        type: 'string',
        description: 'Store credit amount'
      },
      customer_id: {
        type: 'string',
        description: 'Customer ID'
      },
      note: {
        type: 'string',
        description: 'Note about the store credit'
      }
    },
    required: ['amount', 'customer_id']
  }
};

export const updateStoreCreditSchema = {
  name: 'recharge_update_store_credit',
  description: 'Update an existing store credit',
  inputSchema: {
    type: 'object',
    properties: {
      store_credit_id: {
        type: 'string',
        description: 'The store credit ID'
      },
      amount: {
        type: 'string',
        description: 'Store credit amount'
      },
      note: {
        type: 'string',
        description: 'Note about the store credit'
      }
    },
    required: ['store_credit_id']
  }
};

// Charge action tools
export const skipChargeSchema = {
  name: 'recharge_skip_charge',
  description: 'Skip a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to skip'
      }
    },
    required: ['charge_id']
  }
};

export const processChargeSchema = {
  name: 'recharge_process_charge',
  description: 'Process a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to process'
      }
    },
    required: ['charge_id']
  }
};

export const refundChargeSchema = {
  name: 'recharge_refund_charge',
  description: 'Refund a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to refund'
      },
      amount: {
        type: 'string',
        description: 'Refund amount'
      },
      reason: {
        type: 'string',
        description: 'Reason for refund'
      }
    },
    required: ['charge_id', 'amount']
  }
};

export const unskipChargeSchema = {
  name: 'recharge_unskip_charge',
  description: 'Unskip a previously skipped charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to unskip'
      }
    },
    required: ['charge_id']
  }
};

export const delayChargeSchema = {
  name: 'recharge_delay_charge',
  description: 'Delay a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to delay'
      },
      date: {
        type: 'string',
        description: 'New date for the charge (ISO 8601)'
      }
    },
    required: ['charge_id', 'date']
  }
};

// Subscription action tools
export const skipSubscriptionChargeSchema = {
  name: 'recharge_skip_subscription_charge',
  description: 'Skip the next charge for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      charge_date: {
        type: 'string',
        description: 'Date of the charge to skip (ISO 8601)'
      }
    },
    required: ['subscription_id', 'charge_date']
  }
};

export const unskipSubscriptionChargeSchema = {
  name: 'recharge_unskip_subscription_charge',
  description: 'Unskip a previously skipped subscription charge',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      charge_date: {
        type: 'string',
        description: 'Date of the charge to unskip (ISO 8601)'
      }
    },
    required: ['subscription_id', 'charge_date']
  }
};

// Shop tools
export const getShopSchema = {
  name: 'recharge_get_shop',
  description: 'Retrieve shop information',
  inputSchema: {
    type: 'object',
    properties: {}
  }
};

// Collection tools
export const getCollectionsSchema = {
  name: 'recharge_get_collections',
  description: 'Retrieve collections from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of collections to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      }
    }
  }
};

export const getCollectionSchema = {
  name: 'recharge_get_collection',
  description: 'Retrieve a specific collection by ID',
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
        description: 'The collection ID'
      }
    },
    required: ['collection_id']
  }
};

// Analytics tools
export const getSubscriptionAnalyticsSchema = {
  name: 'recharge_get_subscription_analytics',
  description: 'Retrieve subscription analytics',
  inputSchema: {
    type: 'object',
    properties: {
      start_date: {
        type: 'string',
        description: 'Start date for analytics (YYYY-MM-DD)'
      },
      end_date: {
        type: 'string',
        description: 'End date for analytics (YYYY-MM-DD)'
      }
    }
  }
};

export const getCustomerAnalyticsSchema = {
  name: 'recharge_get_customer_analytics',
  description: 'Retrieve customer analytics',
  inputSchema: {
    type: 'object',
    properties: {
      start_date: {
        type: 'string',
        description: 'Start date for analytics (YYYY-MM-DD)'
      },
      end_date: {
        type: 'string',
        description: 'End date for analytics (YYYY-MM-DD)'
      }
    }
  }
}

// Order action tools
export const updateOrderSchema = {
  name: 'recharge_update_order',
  description: 'Update an existing order',
  inputSchema: {
    type: 'object',
    properties: {
      order_id: {
        type: 'string',
        description: 'The order ID'
      },
      shipping_address: {
        type: 'object',
        description: 'Updated shipping address'
      },
      note: {
        type: 'string',
        description: 'Order note'
      }
    },
    required: ['order_id']
  }
};

export const deleteOrderSchema = {
  name: 'recharge_delete_order',
  description: 'Delete an order',
  inputSchema: {
    type: 'object',
    properties: {
      order_id: {
        type: 'string',
        description: 'The order ID'
      }
    },
    required: ['order_id']
  }
};

export const cloneOrderSchema = {
  name: 'recharge_clone_order',
  description: 'Clone an existing order',
  inputSchema: {
    type: 'object',
    properties: {
      order_id: {
        type: 'string',
        description: 'The order ID to clone'
      }
    },
    required: ['order_id']
  }
};

// Customer portal tools
export const getCustomerPortalSessionSchema = {
  name: 'recharge_get_customer_portal_session',
  description: 'Get customer portal session information',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      }
    },
    required: ['customer_id']
  }
};

export const createCustomerPortalSessionSchema = {
  name: 'recharge_create_customer_portal_session',
  description: 'Create a customer portal session',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      return_url: {
        type: 'string',
        description: 'URL to redirect to after portal session'
      }
    },
    required: ['customer_id']
  }
};

// Bundle selection tools
export const getBundleSelectionsSchema = {
  name: 'recharge_get_bundle_selections',
  description: 'Retrieve bundle selections',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of bundle selections to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      subscription_id: {
        type: 'string',
        description: 'Filter by subscription ID'
      }
    }
  }
};

export const getBundleSelectionSchema = {
  name: 'recharge_get_bundle_selection',
  description: 'Retrieve a specific bundle selection by ID',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      }
    },
    required: ['bundle_selection_id']
  }
};

export const createBundleSelectionSchema = {
  name: 'recharge_create_bundle_selection',
  description: 'Create a new bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      external_product_id: {
        type: 'string',
        description: 'External product ID'
      },
      external_variant_id: {
        type: 'string',
        description: 'External variant ID'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      }
    },
    required: ['subscription_id', 'external_product_id', 'external_variant_id', 'quantity']
  }
};

export const updateBundleSelectionSchema = {
  name: 'recharge_update_bundle_selection',
  description: 'Update an existing bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      },
      quantity: {
        type: 'number',
        description: 'Updated quantity'
      }
    },
    required: ['bundle_selection_id']
  }
};

export const deleteBundleSelectionSchema = {
  name: 'recharge_delete_bundle_selection',
  description: 'Delete a bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      }
    },
    required: ['bundle_selection_id']
  }
};

// Retention strategy tools
export const getRetentionStrategiesSchema = {
  name: 'recharge_get_retention_strategies',
  description: 'Retrieve retention strategies',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of retention strategies to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      }
    }
  }
};

export const getRetentionStrategySchema = {
  name: 'recharge_get_retention_strategy',
  description: 'Retrieve a specific retention strategy by ID',
  inputSchema: {
    type: 'object',
    properties: {
      retention_strategy_id: {
        type: 'string',
        description: 'The retention strategy ID'
      }
    },
    required: ['retention_strategy_id']
  }
};

// Async batch tools
export const getAsyncBatchesSchema = {
  name: 'recharge_get_async_batches',
  description: 'Retrieve async batches',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of async batches to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      }
    }
  }
};

export const getAsyncBatchSchema = {
  name: 'recharge_get_async_batch',
  description: 'Retrieve a specific async batch by ID',
  inputSchema: {
    type: 'object',
    properties: {
      async_batch_id: {
        type: 'string',
        description: 'The async batch ID'
      }
    },
    required: ['async_batch_id']
  }
};

export const createAsyncBatchSchema = {
  name: 'recharge_create_async_batch',
  description: 'Create a new async batch',
  inputSchema: {
    type: 'object',
    properties: {
      batch_type: {
        type: 'string',
        description: 'Type of batch operation'
      },
      requests: {
        type: 'array',
        description: 'Array of batch requests'
      }
    },
    required: ['batch_type', 'requests']
  }
};

// Notification tools
export const getNotificationsSchema = {
  name: 'recharge_get_notifications',
  description: 'Retrieve notifications',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of notifications to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer ID'
      }
    }
  }
};

export const getNotificationSchema = {
  name: 'recharge_get_notification',
  description: 'Retrieve a specific notification by ID',
  inputSchema: {
    type: 'object',
    properties: {
      notification_id: {
        type: 'string',
        description: 'The notification ID'
      }
    },
    required: ['notification_id']
  }
};