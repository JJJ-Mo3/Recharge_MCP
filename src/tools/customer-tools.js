/**
 * Customer management tools for Recharge MCP server
 */

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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

// Nested resource tools for customers
export const getCustomerAddressesSchema = {
  name: 'recharge_get_customer_addresses',
  description: 'Retrieve addresses for a specific customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      limit: {
        type: 'number',
        description: 'Number of addresses to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

export const getCustomerSubscriptionsSchema = {
  name: 'recharge_get_customer_subscriptions',
  description: 'Retrieve subscriptions for a specific customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      limit: {
        type: 'number',
        description: 'Number of subscriptions to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      status: {
        type: 'string',
        enum: ['active', 'cancelled', 'expired'],
        description: 'Filter subscriptions by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

export const getCustomerOrdersSchema = {
  name: 'recharge_get_customer_orders',
  description: 'Retrieve orders for a specific customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      limit: {
        type: 'number',
        description: 'Number of orders to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      status: {
        type: 'string',
        description: 'Filter orders by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

export const getCustomerChargesSchema = {
  name: 'recharge_get_customer_charges',
  description: 'Retrieve charges for a specific customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      limit: {
        type: 'number',
        description: 'Number of charges to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      status: {
        type: 'string',
        description: 'Filter charges by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

export const getCustomerPaymentSourcesSchema = {
  name: 'recharge_get_customer_payment_sources',
  description: 'Retrieve payment sources for a specific customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      limit: {
        type: 'number',
        description: 'Number of payment sources to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};

export const createCustomerPaymentSourceSchema = {
  name: 'recharge_create_customer_payment_source',
  description: 'Create a new payment source for a customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      payment_token: {
        type: 'string',
        description: 'Payment token from payment processor'
      },
      payment_type: {
        type: 'string',
        description: 'Type of payment method'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id', 'payment_token', 'payment_type']
  }
};

export const updateCustomerPaymentSourceSchema = {
  name: 'recharge_update_customer_payment_source',
  description: 'Update a customer payment source',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      payment_source_id: {
        type: 'string',
        description: 'The payment source ID'
      },
      billing_address: {
        type: 'object',
        description: 'Updated billing address'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id', 'payment_source_id']
  }
};

export const deleteCustomerPaymentSourceSchema = {
  name: 'recharge_delete_customer_payment_source',
  description: 'Delete a customer payment source',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      payment_source_id: {
        type: 'string',
        description: 'The payment source ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id', 'payment_source_id']
  }
};