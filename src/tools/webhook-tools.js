/**
 * Webhook management tools for Recharge MCP server
 */

export const getWebhooksSchema = {
  name: 'recharge_get_webhooks',
  description: 'Retrieve webhooks from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of webhooks to retrieve (max 250)',
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

export const getWebhookSchema = {
  name: 'recharge_get_webhook',
  description: 'Retrieve a specific webhook by ID',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['webhook_id']
  }
};

export const updateWebhookSchema = {
  name: 'recharge_update_webhook',
  description: 'Update an existing webhook',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      },
      address: {
        type: 'string',
        description: 'Webhook endpoint URL'
      },
      topic: {
        type: 'string',
        description: 'Webhook topic/event'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['webhook_id']
  }
};

export const deleteWebhookSchema = {
  name: 'recharge_delete_webhook',
  description: 'Delete a webhook',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['webhook_id']
  }
};

export const createWebhookSchema = {
  name: 'recharge_create_webhook',
  description: 'Create a new webhook',
  inputSchema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'Webhook endpoint URL'
      },
      topic: {
        type: 'string',
        description: 'Webhook topic/event'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['address', 'topic']
  }
};