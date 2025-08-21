/**
 * Checkout management tools for Recharge MCP server
 */

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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['checkout_token']
  }
};