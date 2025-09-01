/**
 * Collection management tools for Recharge MCP server
 */

export const getCollectionsSchema = {
  name: 'recharge_get_collections',
  description: 'Retrieve collections from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of collections to retrieve (max 250)',
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

export const getCollectionSchema = {
  name: 'recharge_get_collection',
  description: 'Retrieve a specific collection by ID',
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
        description: 'The collection ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['collection_id']
  }
};

export const createCollectionSchema = {
  name: 'recharge_create_collection',
  description: 'Create a new collection',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Collection name'
      },
      description: {
        type: 'string',
        description: 'Collection description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['name']
  }
};

export const updateCollectionSchema = {
  name: 'recharge_update_collection',
  description: 'Update an existing collection',
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
        description: 'The collection ID'
      },
      name: {
        type: 'string',
        description: 'Collection name'
      },
      description: {
        type: 'string',
        description: 'Collection description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['collection_id']
  }
};

export const deleteCollectionSchema = {
  name: 'recharge_delete_collection',
  description: 'Delete a collection',
  inputSchema: {
    type: 'object',
    properties: {
      collection_id: {
        type: 'string',
        description: 'The collection ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['collection_id']
  }
};