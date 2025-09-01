/**
 * Analytics tools for Recharge MCP server
 */

export const getSubscriptionAnalyticsSchema = {
  name: 'recharge_get_subscription_analytics',
  description: 'Retrieve subscription analytics',
  inputSchema: {
    type: 'object',
    properties: {
      start_date: {
        type: 'string',
        description: 'Start date for analytics (YYYY-MM-DD)'
      },
      end_date: {
        type: 'string',
        description: 'End date for analytics (YYYY-MM-DD)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getCustomerAnalyticsSchema = {
  name: 'recharge_get_customer_analytics',
  description: 'Retrieve customer analytics',
  inputSchema: {
    type: 'object',
    properties: {
      start_date: {
        type: 'string',
        description: 'Start date for analytics (YYYY-MM-DD)'
      },
      end_date: {
        type: 'string',
        description: 'End date for analytics (YYYY-MM-DD)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};