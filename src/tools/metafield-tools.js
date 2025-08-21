/**
 * Metafield management tools for Recharge MCP server
 */

export const getMetafieldsSchema = {
  name: 'recharge_get_metafields',
  description: 'Retrieve metafields from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of metafields to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      owner_resource: {
        type: 'string',
        enum: ['customer', 'subscription', 'store'],
        description: 'Resource type that owns the metafield'
      },
      owner_id: {
        type: 'string',
        description: 'ID of the resource that owns the metafield'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getMetafieldSchema = {
  name: 'recharge_get_metafield',
  description: 'Retrieve a specific metafield by ID',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['metafield_id']
  }
};

export const updateMetafieldSchema = {
  name: 'recharge_update_metafield',
  description: 'Update an existing metafield',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      },
      namespace: {
        type: 'string',
        description: 'Metafield namespace'
      },
      key: {
        type: 'string',
        description: 'Metafield key'
      },
      value: {
        type: 'string',
        description: 'Metafield value'
      },
      value_type: {
        type: 'string',
        enum: ['string', 'integer', 'json_string'],
        description: 'Type of the metafield value'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['metafield_id']
  }
};

export const deleteMetafieldSchema = {
  name: 'recharge_delete_metafield',
  description: 'Delete a metafield',
  inputSchema: {
    type: 'object',
    properties: {
      metafield_id: {
        type: 'string',
        description: 'The metafield ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['metafield_id']
  }
};

export const createMetafieldSchema = {
  name: 'recharge_create_metafield',
  description: 'Create a new metafield',
  inputSchema: {
    type: 'object',
    properties: {
      namespace: {
        type: 'string',
        description: 'Metafield namespace'
      },
      key: {
        type: 'string',
        description: 'Metafield key'
      },
      value: {
        type: 'string',
        description: 'Metafield value'
      },
      value_type: {
        type: 'string',
        enum: ['string', 'integer', 'json_string'],
        description: 'Type of the metafield value'
      },
      owner_resource: {
        type: 'string',
        enum: ['customer', 'subscription', 'store'],
        description: 'Resource type that owns the metafield'
      },
      owner_id: {
        type: 'string',
        description: 'ID of the resource that owns the metafield'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['namespace', 'key', 'value', 'value_type', 'owner_resource', 'owner_id']
  }
};