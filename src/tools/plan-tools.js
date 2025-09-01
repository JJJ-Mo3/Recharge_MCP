/**
 * Plan management tools for Recharge MCP server
 */

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