/**
 * Advanced tools for Recharge MCP server
 * Includes one-time products, store credits, bundles, retention, batches, and notifications
 */

// Onetime tools
export const getOnetimesSchema = {
  name: 'recharge_get_onetimes',
  description: 'Retrieve one-time products from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of onetimes to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      address_id: {
        type: 'string',
        description: 'Filter onetimes by address ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getOnetimeSchema = {
  name: 'recharge_get_onetime',
  description: 'Retrieve a specific one-time product by ID',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['onetime_id']
  }
};

export const updateOnetimeSchema = {
  name: 'recharge_update_onetime',
  description: 'Update an existing one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When to charge for this one-time product (ISO 8601)'
      },
      product_title: {
        type: 'string',
        description: 'Product title'
      },
      variant_title: {
        type: 'string',
        description: 'Variant title'
      },
      price: {
        type: 'string',
        description: 'Product price'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['onetime_id']
  }
};

export const deleteOnetimeSchema = {
  name: 'recharge_delete_onetime',
  description: 'Delete a one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      onetime_id: {
        type: 'string',
        description: 'The one-time product ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['onetime_id']
  }
};

export const createOnetimeSchema = {
  name: 'recharge_create_onetime',
  description: 'Create a new one-time product',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'Address ID for the one-time product'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When to charge for this one-time product (ISO 8601)'
      },
      product_title: {
        type: 'string',
        description: 'Product title'
      },
      variant_title: {
        type: 'string',
        description: 'Variant title'
      },
      price: {
        type: 'string',
        description: 'Product price'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      },
      shopify_variant_id: {
        type: 'string',
        description: 'Shopify variant ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['address_id', 'next_charge_scheduled_at', 'product_title', 'price', 'quantity', 'shopify_variant_id']
  }
};

// Store credit tools
export const getStoreCreditsSchema = {
  name: 'recharge_get_store_credits',
  description: 'Retrieve store credits from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of store credits to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter store credits by customer ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getStoreCreditSchema = {
  name: 'recharge_get_store_credit',
  description: 'Retrieve a specific store credit by ID',
  inputSchema: {
    type: 'object',
    properties: {
      store_credit_id: {
        type: 'string',
        description: 'The store credit ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['store_credit_id']
  }
};

export const createStoreCreditSchema = {
  name: 'recharge_create_store_credit',
  description: 'Create a new store credit',
  inputSchema: {
    type: 'object',
    properties: {
      amount: {
        type: 'string',
        description: 'Store credit amount'
      },
      customer_id: {
        type: 'string',
        description: 'Customer ID'
      },
      note: {
        type: 'string',
        description: 'Note about the store credit'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['amount', 'customer_id']
  }
};

export const updateStoreCreditSchema = {
  name: 'recharge_update_store_credit',
  description: 'Update an existing store credit',
  inputSchema: {
    type: 'object',
    properties: {
      store_credit_id: {
        type: 'string',
        description: 'The store credit ID'
      },
      amount: {
        type: 'string',
        description: 'Store credit amount'
      },
      note: {
        type: 'string',
        description: 'Note about the store credit'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['store_credit_id']
  }
};

// Bundle selection tools
export const getBundleSelectionsSchema = {
  name: 'recharge_get_bundle_selections',
  description: 'Retrieve bundle selections',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of bundle selections to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      subscription_id: {
        type: 'string',
        description: 'Filter by subscription ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getBundleSelectionSchema = {
  name: 'recharge_get_bundle_selection',
  description: 'Retrieve a specific bundle selection by ID',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['bundle_selection_id']
  }
};

export const createBundleSelectionSchema = {
  name: 'recharge_create_bundle_selection',
  description: 'Create a new bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      external_product_id: {
        type: 'string',
        description: 'External product ID'
      },
      external_variant_id: {
        type: 'string',
        description: 'External variant ID'
      },
      quantity: {
        type: 'number',
        description: 'Quantity'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'external_product_id', 'external_variant_id', 'quantity']
  }
};

export const updateBundleSelectionSchema = {
  name: 'recharge_update_bundle_selection',
  description: 'Update an existing bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      },
      quantity: {
        type: 'number',
        description: 'Updated quantity'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['bundle_selection_id']
  }
};

export const deleteBundleSelectionSchema = {
  name: 'recharge_delete_bundle_selection',
  description: 'Delete a bundle selection',
  inputSchema: {
    type: 'object',
    properties: {
      bundle_selection_id: {
        type: 'string',
        description: 'The bundle selection ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['bundle_selection_id']
  }
};

// Retention strategy tools
export const getRetentionStrategiesSchema = {
  name: 'recharge_get_retention_strategies',
  description: 'Retrieve retention strategies',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of retention strategies to retrieve (max 250)',
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

export const getRetentionStrategySchema = {
  name: 'recharge_get_retention_strategy',
  description: 'Retrieve a specific retention strategy by ID',
  inputSchema: {
    type: 'object',
    properties: {
      retention_strategy_id: {
        type: 'string',
        description: 'The retention strategy ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['retention_strategy_id']
  }
};

// Async batch tools
export const getAsyncBatchesSchema = {
  name: 'recharge_get_async_batches',
  description: 'Retrieve async batches',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of async batches to retrieve (max 250)',
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

export const getAsyncBatchSchema = {
  name: 'recharge_get_async_batch',
  description: 'Retrieve a specific async batch by ID',
  inputSchema: {
    type: 'object',
    properties: {
      async_batch_id: {
        type: 'string',
        description: 'The async batch ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['async_batch_id']
  }
};

export const createAsyncBatchSchema = {
  name: 'recharge_create_async_batch',
  description: 'Create a new async batch',
  inputSchema: {
    type: 'object',
    properties: {
      batch_type: {
        type: 'string',
        description: 'Type of batch operation'
      },
      requests: {
        type: 'array',
        description: 'Array of batch requests'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['batch_type', 'requests']
  }
};

// Notification tools
export const getNotificationsSchema = {
  name: 'recharge_get_notifications',
  description: 'Retrieve notifications',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of notifications to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getNotificationSchema = {
  name: 'recharge_get_notification',
  description: 'Retrieve a specific notification by ID',
  inputSchema: {
    type: 'object',
    properties: {
      notification_id: {
        type: 'string',
        description: 'The notification ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['notification_id']
  }
};