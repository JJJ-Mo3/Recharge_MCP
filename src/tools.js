import { z } from 'zod';

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
export const getStoreCreditSchema = {
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
};