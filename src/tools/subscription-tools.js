/**
 * Subscription management tools for Recharge MCP server
 */

export const getSubscriptionsSchema = {
  name: 'recharge_get_subscriptions',
  description: 'Retrieve a list of subscriptions from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of subscriptions to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter subscriptions by customer ID'
      },
      status: {
        type: 'string',
        enum: ['active', 'cancelled', 'expired'],
        description: 'Filter subscriptions by status'
      },
      created_at_min: {
        type: 'string',
        description: 'Filter subscriptions created after this date (ISO 8601)'
      },
      created_at_max: {
        type: 'string',
        description: 'Filter subscriptions created before this date (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const createSubscriptionSchema = {
  name: 'recharge_create_subscription',
  description: 'Create a new subscription',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'Address ID for the subscription'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When the next charge should occur (ISO 8601)'
      },
      order_interval_frequency: {
        type: 'string',
        description: 'How often the subscription renews'
      },
      order_interval_unit: {
        type: 'string',
        enum: ['day', 'week', 'month'],
        description: 'The unit for the interval frequency'
      },
      quantity: {
        type: 'number',
        description: 'Subscription quantity'
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
    required: ['address_id', 'next_charge_scheduled_at', 'order_interval_frequency', 'order_interval_unit', 'quantity', 'shopify_variant_id']
  }
};

export const getSubscriptionSchema = {
  name: 'recharge_get_subscription',
  description: 'Retrieve a specific subscription by ID',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const updateSubscriptionSchema = {
  name: 'recharge_update_subscription',
  description: 'Update an existing subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      quantity: {
        type: 'number',
        description: 'Subscription quantity'
      },
      order_interval_frequency: {
        type: 'string',
        description: 'How often the subscription renews'
      },
      order_interval_unit: {
        type: 'string',
        enum: ['day', 'week', 'month'],
        description: 'The unit for the interval frequency'
      },
      next_charge_scheduled_at: {
        type: 'string',
        description: 'When the next charge should occur (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const cancelSubscriptionSchema = {
  name: 'recharge_cancel_subscription',
  description: 'Cancel a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      cancellation_reason: {
        type: 'string',
        description: 'Reason for cancellation'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const activateSubscriptionSchema = {
  name: 'recharge_activate_subscription',
  description: 'Activate a cancelled subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const skipSubscriptionChargeSchema = {
  name: 'recharge_skip_subscription_charge',
  description: 'Skip the next charge for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      charge_date: {
        type: 'string',
        description: 'Date of the charge to skip (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'charge_date']
  }
};

export const unskipSubscriptionChargeSchema = {
  name: 'recharge_unskip_subscription_charge',
  description: 'Unskip a previously skipped subscription charge',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      charge_date: {
        type: 'string',
        description: 'Date of the charge to unskip (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'charge_date']
  }
};

export const swapSubscriptionSchema = {
  name: 'recharge_swap_subscription',
  description: 'Swap a subscription to a different product variant',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      shopify_variant_id: {
        type: 'string',
        description: 'New Shopify variant ID to swap to'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'shopify_variant_id']
  }
};

export const setNextChargeDateSchema = {
  name: 'recharge_set_next_charge_date',
  description: 'Set the next charge date for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      date: {
        type: 'string',
        description: 'New next charge date (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'date']
  }
};

// Nested resource tools for subscriptions
export const getSubscriptionChargesSchema = {
  name: 'recharge_get_subscription_charges',
  description: 'Retrieve charges for a specific subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      limit: {
        type: 'number',
        description: 'Number of charges to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      status: {
        type: 'string',
        description: 'Filter charges by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const createSubscriptionChargeSchema = {
  name: 'recharge_create_subscription_charge',
  description: 'Create a new charge for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      scheduled_at: {
        type: 'string',
        description: 'When to schedule the charge (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const getSubscriptionLineItemsSchema = {
  name: 'recharge_get_subscription_line_items',
  description: 'Retrieve line items for a specific subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      limit: {
        type: 'number',
        description: 'Number of line items to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const createSubscriptionLineItemSchema = {
  name: 'recharge_create_subscription_line_item',
  description: 'Add a line item to a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      shopify_variant_id: {
        type: 'string',
        description: 'Shopify variant ID'
      },
      quantity: {
        type: 'number',
        description: 'Quantity of the item'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'shopify_variant_id', 'quantity']
  }
};

export const updateSubscriptionLineItemSchema = {
  name: 'recharge_update_subscription_line_item',
  description: 'Update a subscription line item',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      line_item_id: {
        type: 'string',
        description: 'The line item ID'
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
    required: ['subscription_id', 'line_item_id']
  }
};

export const deleteSubscriptionLineItemSchema = {
  name: 'recharge_delete_subscription_line_item',
  description: 'Remove a line item from a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      line_item_id: {
        type: 'string',
        description: 'The line item ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'line_item_id']
  }
};

export const getSubscriptionNotesSchema = {
  name: 'recharge_get_subscription_notes',
  description: 'Retrieve notes for a specific subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      limit: {
        type: 'number',
        description: 'Number of notes to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const createSubscriptionNoteSchema = {
  name: 'recharge_create_subscription_note',
  description: 'Add a note to a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      body: {
        type: 'string',
        description: 'Note content'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'body']
  }
};

export const updateSubscriptionNoteSchema = {
  name: 'recharge_update_subscription_note',
  description: 'Update a subscription note',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      note_id: {
        type: 'string',
        description: 'The note ID'
      },
      body: {
        type: 'string',
        description: 'Updated note content'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'note_id']
  }
};

export const deleteSubscriptionNoteSchema = {
  name: 'recharge_delete_subscription_note',
  description: 'Delete a subscription note',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      note_id: {
        type: 'string',
        description: 'The note ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'note_id']
  }
};

export const getSubscriptionDeliveryScheduleSchema = {
  name: 'recharge_get_subscription_delivery_schedule',
  description: 'Get delivery schedule for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const updateSubscriptionDeliveryScheduleSchema = {
  name: 'recharge_update_subscription_delivery_schedule',
  description: 'Update delivery schedule for a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      delivery_schedule: {
        type: 'object',
        description: 'Delivery schedule configuration'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id', 'delivery_schedule']
  }
};

export const pauseSubscriptionSchema = {
  name: 'recharge_pause_subscription',
  description: 'Pause a subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      pause_reason: {
        type: 'string',
        description: 'Reason for pausing'
      },
      resume_date: {
        type: 'string',
        description: 'When to resume the subscription (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};

export const resumeSubscriptionSchema = {
  name: 'recharge_resume_subscription',
  description: 'Resume a paused subscription',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
        description: 'The subscription ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['subscription_id']
  }
};