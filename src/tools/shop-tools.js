/**
 * Shop management tools for Recharge MCP server
 */

export const getShopSchema = {
  name: 'recharge_get_shop',
  description: 'Retrieve shop information',
  inputSchema: {
    type: 'object',
    properties: {
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const updateShopSchema = {
  name: 'recharge_update_shop',
  description: 'Update shop configuration',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Shop name'
      },
      email: {
        type: 'string',
        description: 'Shop email'
      },
      timezone: {
        type: 'string',
        description: 'Shop timezone'
      },
      currency: {
        type: 'string',
        description: 'Shop currency'
      },
      domain: {
        type: 'string',
        description: 'Shop domain'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};