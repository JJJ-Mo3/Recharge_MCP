/**
 * Tax line management tools for Recharge MCP server
 */

export const getTaxLinesSchema = {
  name: 'recharge_get_tax_lines',
  description: 'Retrieve tax lines from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of tax lines to retrieve (max 250)',
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

export const getTaxLineSchema = {
  name: 'recharge_get_tax_line',
  description: 'Retrieve a specific tax line by ID',
  inputSchema: {
    type: 'object',
    properties: {
      tax_line_id: {
        type: 'string',
        description: 'The tax line ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['tax_line_id']
  }
};