/**
 * Charge management tools for Recharge MCP server
 */

export const getChargesSchema = {
  name: 'recharge_get_charges',
  description: 'Retrieve a list of charges from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of charges to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter charges by customer ID'
      },
      subscription_id: {
        type: 'string',
        description: 'Filter charges by subscription ID'
      },
      status: {
        type: 'string',
        description: 'Filter charges by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getChargeSchema = {
  name: 'recharge_get_charge',
  description: 'Retrieve a specific charge by ID',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

export const skipChargeSchema = {
  name: 'recharge_skip_charge',
  description: 'Skip a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to skip'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

export const processChargeSchema = {
  name: 'recharge_process_charge',
  description: 'Process a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to process'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

export const refundChargeSchema = {
  name: 'recharge_refund_charge',
  description: 'Refund a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to refund'
      },
      amount: {
        type: 'string',
        description: 'Refund amount'
      },
      reason: {
        type: 'string',
        description: 'Reason for refund'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id', 'amount']
  }
};

export const unskipChargeSchema = {
  name: 'recharge_unskip_charge',
  description: 'Unskip a previously skipped charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to unskip'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

export const delayChargeSchema = {
  name: 'recharge_delay_charge',
  description: 'Delay a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID to delay'
      },
      date: {
        type: 'string',
        description: 'New date for the charge (ISO 8601)'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id', 'date']
  }
};

export const createChargeSchema = {
  name: 'recharge_create_charge',
  description: 'Create a new charge',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'Address ID for the charge'
      },
      line_items: {
        type: 'array',
        description: 'Array of line items for the charge'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['address_id', 'line_items']
  }
};

export const updateChargeSchema = {
  name: 'recharge_update_charge',
  description: 'Update an existing charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
      },
      line_items: {
        type: 'array',
        description: 'Updated line items for the charge'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

export const deleteChargeSchema = {
  name: 'recharge_delete_charge',
  description: 'Delete a charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};

// Nested resource tools for charges
export const getChargeLineItemsSchema = {
  name: 'recharge_get_charge_line_items',
  description: 'Retrieve line items for a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
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
    required: ['charge_id']
  }
};

export const updateChargeLineItemSchema = {
  name: 'recharge_update_charge_line_item',
  description: 'Update a charge line item',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
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
    required: ['charge_id', 'line_item_id']
  }
};

export const getChargeAttemptsSchema = {
  name: 'recharge_get_charge_attempts',
  description: 'Retrieve charge attempts for a specific charge',
  inputSchema: {
    type: 'object',
    properties: {
      charge_id: {
        type: 'string',
        description: 'The charge ID'
      },
      limit: {
        type: 'number',
        description: 'Number of charge attempts to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['charge_id']
  }
};