/**
 * Payment method management tools for Recharge MCP server
 */

export const getPaymentMethodsSchema = {
  name: 'recharge_get_payment_methods',
  description: 'Retrieve payment methods from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of payment methods to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      customer_id: {
        type: 'string',
        description: 'Filter payment methods by customer ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getPaymentMethodSchema = {
  name: 'recharge_get_payment_method',
  description: 'Retrieve a specific payment method by ID',
  inputSchema: {
    type: 'object',
    properties: {
      payment_method_id: {
        type: 'string',
        description: 'The payment method ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['payment_method_id']
  }
};

export const updatePaymentMethodSchema = {
  name: 'recharge_update_payment_method',
  description: 'Update an existing payment method',
  inputSchema: {
    type: 'object',
    properties: {
      payment_method_id: {
        type: 'string',
        description: 'The payment method ID'
      },
      billing_address: {
        type: 'object',
        description: 'Billing address information'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['payment_method_id']
  }
};