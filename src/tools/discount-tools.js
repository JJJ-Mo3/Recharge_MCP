/**
 * Discount management tools for Recharge MCP server
 */

export const getDiscountsSchema = {
  name: 'recharge_get_discounts',
  description: 'Retrieve a list of discounts from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of discounts to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Filter discounts by status'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getDiscountSchema = {
  name: 'recharge_get_discount',
  description: 'Retrieve a specific discount by ID',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['discount_id']
  }
};

export const updateDiscountSchema = {
  name: 'recharge_update_discount',
  description: 'Update an existing discount',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      },
      code: {
        type: 'string',
        description: 'Discount code'
      },
      value: {
        type: 'number',
        description: 'Discount value'
      },
      value_type: {
        type: 'string',
        enum: ['percentage', 'fixed_amount'],
        description: 'Type of discount value'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Discount status'
      },
      usage_limit: {
        type: 'number',
        description: 'Maximum number of times discount can be used'
      },
      applies_to: {
        type: 'string',
        enum: ['checkout', 'recurring'],
        description: 'Where the discount applies'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['discount_id']
  }
};

export const deleteDiscountSchema = {
  name: 'recharge_delete_discount',
  description: 'Delete a discount',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
        description: 'The discount ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['discount_id']
  }
};

export const createDiscountSchema = {
  name: 'recharge_create_discount',
  description: 'Create a new discount in Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'Discount code'
      },
      value: {
        type: 'number',
        description: 'Discount value'
      },
      value_type: {
        type: 'string',
        enum: ['percentage', 'fixed_amount'],
        description: 'Type of discount value'
      },
      status: {
        type: 'string',
        enum: ['enabled', 'disabled'],
        description: 'Discount status'
      },
      usage_limit: {
        type: 'number',
        description: 'Maximum number of times discount can be used'
      },
      applies_to: {
        type: 'string',
        enum: ['checkout', 'recurring'],
        description: 'Where the discount applies'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['code', 'value', 'value_type']
  }
};