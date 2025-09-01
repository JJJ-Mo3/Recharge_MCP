/**
 * Miscellaneous tools for Recharge MCP server
 * Includes shop, collections, analytics, plans, and other general tools
 */

// Shop tools
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

// Collection tools
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

// Analytics tools
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

// Customer portal tools
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

// Plan tools
export const getPlansSchema = {
  name: 'recharge_get_plans',
  description: 'Retrieve plans from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of plans to retrieve (max 250)',
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

export const getPlanSchema = {
  name: 'recharge_get_plan',
  description: 'Retrieve a specific plan by ID',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: {
        type: 'string',
        description: 'The plan ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['plan_id']
  }
};

export const createPlanSchema = {
  name: 'recharge_create_plan',
  description: 'Create a new plan',
  inputSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Plan title'
      },
      description: {
        type: 'string',
        description: 'Plan description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['title']
  }
};

export const updatePlanSchema = {
  name: 'recharge_update_plan',
  description: 'Update an existing plan',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: {
        type: 'string',
        description: 'The plan ID'
      },
      title: {
        type: 'string',
        description: 'Plan title'
      },
      description: {
        type: 'string',
        description: 'Plan description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['plan_id']
  }
};

export const deletePlanSchema = {
  name: 'recharge_delete_plan',
  description: 'Delete a plan',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: {
        type: 'string',
        description: 'The plan ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['plan_id']
  }
};

// Subscription plan tools
export const getSubscriptionPlansSchema = {
  name: 'recharge_get_subscription_plans',
  description: 'Retrieve subscription plans from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of subscription plans to retrieve (max 250)',
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

export const getSubscriptionPlanSchema = {
  name: 'recharge_get_subscription_plan',
  description: 'Retrieve a specific subscription plan by ID',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_plan_id: {
        type: 'string',
        description: 'The subscription plan ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_plan_id']
  }
};

export const createSubscriptionPlanSchema = {
  name: 'recharge_create_subscription_plan',
  description: 'Create a new subscription plan',
  inputSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Subscription plan title'
      },
      description: {
        type: 'string',
        description: 'Subscription plan description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['title']
  }
};

export const updateSubscriptionPlanSchema = {
  name: 'recharge_update_subscription_plan',
  description: 'Update an existing subscription plan',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_plan_id: {
        type: 'string',
        description: 'The subscription plan ID'
      },
      title: {
        type: 'string',
        description: 'Subscription plan title'
      },
      description: {
        type: 'string',
        description: 'Subscription plan description'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_plan_id']
  }
};

export const deleteSubscriptionPlanSchema = {
  name: 'recharge_delete_subscription_plan',
  description: 'Delete a subscription plan',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_plan_id: {
        type: 'string',
        description: 'The subscription plan ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_plan_id']
  }
};