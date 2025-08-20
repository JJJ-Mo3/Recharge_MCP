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