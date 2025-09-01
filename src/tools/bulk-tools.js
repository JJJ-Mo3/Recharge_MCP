/**
 * Bulk operation tools for Recharge MCP server
 */

export const bulkUpdateSubscriptionsSchema = {
  name: 'recharge_bulk_update_subscriptions',
  description: 'Bulk update multiple subscriptions',
  inputSchema: {
    type: 'object',
    properties: {
      subscriptions: {
        type: 'array',
        description: 'Array of subscription updates',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Subscription ID'
            },
            quantity: {
              type: 'number',
              description: 'Updated quantity'
            },
            next_charge_scheduled_at: {
              type: 'string',
              description: 'Next charge date (ISO 8601)'
            },
            order_interval_frequency: {
              type: 'string',
              description: 'Order interval frequency'
            },
            order_interval_unit: {
              type: 'string',
              enum: ['day', 'week', 'month'],
              description: 'Order interval unit'
            }
          },
          required: ['id']
        }
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscriptions']
  }
};

export const bulkSkipChargesSchema = {
  name: 'recharge_bulk_skip_charges',
  description: 'Bulk skip multiple charges',
  inputSchema: {
    type: 'object',
    properties: {
      charge_ids: {
        type: 'array',
        description: 'Array of charge IDs to skip',
        items: {
          type: 'string'
        }
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_ids']
  }
};

export const bulkUnskipChargesSchema = {
  name: 'recharge_bulk_unskip_charges',
  description: 'Bulk unskip multiple charges',
  inputSchema: {
    type: 'object',
    properties: {
      charge_ids: {
        type: 'array',
        description: 'Array of charge IDs to unskip',
        items: {
          type: 'string'
        }
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_ids']
  }
};