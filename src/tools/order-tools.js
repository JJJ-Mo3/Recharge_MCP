/**
 * Order management tools for Recharge MCP server
 */

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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['order_id']
  }
};

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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['order_id']
  }
};