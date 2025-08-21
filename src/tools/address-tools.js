/**
 * Address management tools for Recharge MCP server
 */

export const getAddressesSchema = {
  name: 'recharge_get_addresses',
  description: 'Retrieve a list of addresses from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Number of addresses to retrieve (max 250)',
        minimum: 1,
        maximum: 250
      },
      page: {
        type: 'number',
        description: 'Page number for pagination'
      },
      customer_id: {
        type: 'string',
        description: 'Filter addresses by customer ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    }
  }
};

export const getAddressSchema = {
  name: 'recharge_get_address',
  description: 'Retrieve a specific address by ID',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'The address ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['address_id']
  }
};

export const updateAddressSchema = {
  name: 'recharge_update_address',
  description: 'Update an existing address',
  inputSchema: {
    type: 'object',
    properties: {
      address_id: {
        type: 'string',
        description: 'The address ID'
      },
      first_name: {
        type: 'string',
        description: 'First name'
      },
      last_name: {
        type: 'string',
        description: 'Last name'
      },
      address1: {
        type: 'string',
        description: 'Address line 1'
      },
      address2: {
        type: 'string',
        description: 'Address line 2'
      },
      city: {
        type: 'string',
        description: 'City'
      },
      province: {
        type: 'string',
        description: 'Province/State'
      },
      country_code: {
        type: 'string',
        description: 'Country code (e.g., US, CA, GB)'
      },
      zip: {
        type: 'string',
        description: 'Postal/ZIP code'
      },
      phone: {
        type: 'string',
        description: 'Phone number'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['address_id']
  }
};

export const createAddressSchema = {
  name: 'recharge_create_address',
  description: 'Create a new address for a customer',
  inputSchema: {
    type: 'object',
    properties: {
      customer_id: {
        type: 'string',
        description: 'The customer ID'
      },
      first_name: {
        type: 'string',
        description: 'First name'
      },
      last_name: {
        type: 'string',
        description: 'Last name'
      },
      address1: {
        type: 'string',
        description: 'Address line 1'
      },
      address2: {
        type: 'string',
        description: 'Address line 2'
      },
      city: {
        type: 'string',
        description: 'City'
      },
      province: {
        type: 'string',
        description: 'Province/State'
      },
      country_code: {
        type: 'string',
        description: 'Country code (e.g., US, CA, GB)'
      },
      zip: {
        type: 'string',
        description: 'Postal/ZIP code'
      },
      phone: {
        type: 'string',
        description: 'Phone number'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['customer_id', 'first_name', 'last_name', 'address1', 'city', 'province', 'country_code', 'zip']
  }
};