/**
 * Customer portal tools for Recharge MCP server
 */

export const getCustomerPortalSessionSchema = {
  name: 'recharge_get_customer_portal_session',
  description: 'Get customer portal session information',
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

export const createCustomerPortalSessionSchema = {
  name: 'recharge_create_customer_portal_session',
  description: 'Create a customer portal session',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      return_url: {
        type: 'string',
        description: 'URL to redirect to after portal session'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id']
  }
};