/**
 * Shipping rate management tools for Recharge MCP server
 */

export const getShippingRatesSchema = {
  name: 'recharge_get_shipping_rates',
  description: 'Retrieve shipping rates from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of shipping rates to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getShippingRateSchema = {
  name: 'recharge_get_shipping_rate',
  description: 'Retrieve a specific shipping rate by ID',
  inputSchema: {
    type: 'object',
    properties: {
      shipping_rate_id: {
        type: 'string',
        description: 'The shipping rate ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['shipping_rate_id']
  }
};

export const createShippingRateSchema = {
  name: 'recharge_create_shipping_rate',
  description: 'Create a new shipping rate',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Shipping rate name'
      },
      price: {
        type: 'string',
        description: 'Shipping rate price'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['name', 'price']
  }
};

export const updateShippingRateSchema = {
  name: 'recharge_update_shipping_rate',
  description: 'Update an existing shipping rate',
  inputSchema: {
    type: 'object',
    properties: {
      shipping_rate_id: {
        type: 'string',
        description: 'The shipping rate ID'
      },
      name: {
        type: 'string',
        description: 'Shipping rate name'
      },
      price: {
        type: 'string',
        description: 'Shipping rate price'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['shipping_rate_id']
  }
};

export const deleteShippingRateSchema = {
  name: 'recharge_delete_shipping_rate',
  description: 'Delete a shipping rate',
  inputSchema: {
    type: 'object',
    properties: {
      shipping_rate_id: {
        type: 'string',
        description: 'The shipping rate ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['shipping_rate_id']
  }
};