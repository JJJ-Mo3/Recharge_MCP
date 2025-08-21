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