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