/**
 * Product management tools for Recharge MCP server
 */

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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
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
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['product_id']
  }
};