# Recharge MCP Server

A comprehensive **local** Model Context Protocol (MCP) server that provides 70+ tools for interacting with the Recharge API v2021-11. This server runs as a local process and communicates with MCP clients via stdio (standard input/output). It enables AI assistants to manage subscriptions, customers, orders, charges, and other Recharge resources with full CRUD operations and advanced features.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Setup](#setup)
- [API Key Configuration](#api-key-configuration)
- [MCP Configuration](#mcp-configuration)
- [Features](#features)
- [Available Tools](#available-tools)
- [Sample Usage](#sample-usage)
- [Response Format](#response-format)
- [Common Parameters](#common-parameters)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

This MCP server provides comprehensive access to the Recharge API v2021-11, enabling AI assistants to:

- **Manage Customers**: Create, update, and retrieve customer information
- **Handle Subscriptions**: Full lifecycle management including creation, updates, cancellation, and reactivation
- **Process Orders**: View and manage order history and details
- **Manage Charges**: Handle billing, refunds, and charge scheduling
- **Address Management**: Create and update customer addresses
- **Discount Management**: Create and manage discount codes and promotions
- **Analytics**: Access subscription and customer analytics data
- **Webhooks**: Set up and manage webhook notifications
- **And much more**: 70+ tools covering all major Recharge API endpoints

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key (optional):**
   ```bash
   cp .env.example .env
   # Edit .env and add your RECHARGE_API_KEY
   ```

3. **Add to your MCP client configuration:**
   ```json
   {
     "mcpServers": {
       "recharge": {
         "command": "node",
         "args": ["/path/to/recharge-mcp-server/index.js"],
         "env": {
           "RECHARGE_API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```

4. **Start using the tools in your AI assistant!**

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Recharge API credentials (optional if clients provide their own keys):
   ```
   RECHARGE_API_KEY=your_default_recharge_api_key_here
   RECHARGE_API_URL=https://api.rechargeapps.com
   RECHARGE_API_TIMEOUT=30000
   RECHARGE_API_RETRY_ATTEMPTS=3
   RECHARGE_API_RETRY_DELAY=1000
   ```

3. **Get your Recharge API key:**
   - Log in to your Recharge merchant portal
   - Navigate to Apps > Custom integrations
   - Create a new integration or use an existing one
   - Copy the API access token
   - Ensure the integration has the necessary permissions (see [API Key Permissions](#api-key-permissions))

4. **Validate your setup:**
   ```bash
   npm run check
   ```

## API Key Configuration

The MCP server supports two methods for API key configuration:

### Method 1: Environment Variable (Server-wide)
Set `RECHARGE_API_KEY` in your environment or `.env` file. This key will be used as a fallback when no client-specific key is provided.

### Method 2: Client-provided API Key (Per-request)
Clients can provide their own API key with each tool call by including an `api_key` parameter:

```json
{
  "tool": "recharge_get_customers",
  "arguments": {
    "api_key": "your_client_specific_api_key",
    "limit": 10,
    "email": "customer@example.com"
  }
}
```

### Method 3: No Default API Key (Recommended for Multi-tenant)
Run without setting `RECHARGE_API_KEY` in the environment. All clients must provide their own API key with each request.

**Note:** 
- Client-provided API keys always take precedence over environment variables
- If no API key is available (neither environment nor client-provided), requests will fail with a clear error message
- This design allows multiple clients to use their own Recharge accounts through the same MCP server instance

### API Key Permissions

Your Recharge API key needs the following permissions:

- **Read permissions**: For retrieving data (customers, subscriptions, orders, etc.)
- **Write permissions**: For creating and updating resources
- **Webhook permissions**: For managing webhook endpoints
- **Analytics permissions**: For accessing analytics data

**Security Best Practices:**
- Use environment variables or secure configuration management
- Never commit API keys to version control
- Rotate API keys regularly
- Use the principle of least privilege - only grant necessary permissions
- Monitor API key usage and set up alerts for unusual activity

## MCP Configuration

To use this server with an MCP client, add it to your client's configuration. This is a **local MCP server** that runs as a process and communicates via stdio.

### Claude Desktop Configuration

Add to your Claude Desktop configuration file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "recharge": {
      "command": "node", 
      "args": ["/path/to/recharge-mcp-server/index.js"],
      "env": {
        "RECHARGE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Continue IDE Configuration

Add to your Continue configuration:

```json
{
  "mcpServers": {
    "recharge": {
      "command": "node",
      "args": ["/path/to/recharge-mcp-server/index.js"]
    }
  }
}
```

### Cursor IDE Configuration

Add to your Cursor settings or create a `.cursor/settings.json` file in your project root:

```json
{
  "mcpServers": {
    "recharge": {
      "command": "node",
      "args": ["/absolute/path/to/recharge-mcp-server/index.js"],
      "env": {
        "RECHARGE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### VSCode with GitHub Copilot Configuration

Add to your VSCode `settings.json` or workspace `.vscode/settings.json`:

```json
{
  "github.copilot.mcpServers": {
    "recharge": {
      "command": "node",
      "args": ["/absolute/path/to/recharge-mcp-server/index.js"],
      "env": {
        "RECHARGE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Other MCP Clients

For other MCP-compatible clients, configure them to run this server as a local process using the Node.js command with the path to `index.js`.

## Features

### Customer Management
- Get customers (with filtering and pagination)
- Get specific customer by ID
- Create new customers
- Update customer information

### Subscription Management
- Get subscriptions (with filtering and pagination)
- Get specific subscription by ID
- Update subscription details
- Cancel subscriptions
- Activate cancelled subscriptions
- Skip/unskip subscription charges

### Product Management
- Get products (with filtering and pagination)
- Get specific product by ID

### Order Management
- Get orders (with filtering and pagination)
- Get specific order by ID
- Update order details
- Delete orders
- Clone existing orders

### Charge Management
- Get charges (with filtering and pagination)
- Get specific charge by ID
- Skip charges
- Process charges
- Unskip charges
- Delay charges
- Refund charges

### Address Management
- Get addresses (with filtering and pagination)
- Get specific address by ID
- Create new addresses
- Update address details

### Discount Management
- Get discounts (with filtering and pagination)
- Get specific discount by ID
- Create new discounts
- Update discount details
- Delete discounts

### Metafield Management
- Get metafields (with filtering by resource type)
- Get specific metafield by ID
- Create new metafields for customers, subscriptions, or store
- Update metafield details
- Delete metafields

### Webhook Management
- Get webhooks
- Get specific webhook by ID
- Create new webhooks for event notifications
- Update webhook details
- Delete webhooks

### Payment Method Management
- Get payment methods (with customer filtering)
- Get specific payment method by ID
- Update payment method details

### Checkout Management
- Get checkouts
- Get specific checkout by token
- Create new checkouts for one-time purchases
- Update checkout details
- Process checkouts

### One-time Product Management
- Get one-time products
- Get specific one-time product by ID
- Create new one-time products
- Update one-time product details
- Delete one-time products

### Store Credit Management
- Get store credits
- Get specific store credit by ID
- Create new store credits
- Update store credit details

### Shop Information
- Get shop details and configuration

### Collection Management
- Get product collections
- Get specific collection by ID

### Analytics
- Get subscription analytics
- Get customer analytics

### Customer Portal
- Get customer portal session information
- Create customer portal sessions

### Bundle Selections
- Get bundle selections for subscriptions
- Get specific bundle selection by ID
- Create and manage bundle selections
- Update bundle selection details
- Delete bundle selections

### Retention Strategies
- Get retention strategies and configurations
- Get specific retention strategy by ID

### Async Batches
- Create and manage batch operations
- Get async batches
- Get specific async batch by ID
- Monitor batch processing status

### Notifications
- Get customer notifications
- Get specific notification by ID

## Available Tools

### Customer Tools
- `recharge_get_customers` - Retrieve customers with filtering and pagination
- `recharge_get_customer` - Get a specific customer by ID  
- `recharge_update_customer` - Update customer information
- `recharge_create_customer` - Create a new customer account

### Subscription Tools
- `recharge_get_subscriptions` - Retrieve subscriptions with filtering and pagination
- `recharge_create_subscription` - Create a new subscription
- `recharge_get_subscription` - Get a specific subscription by ID
- `recharge_update_subscription` - Update subscription details
- `recharge_cancel_subscription` - Cancel a subscription
- `recharge_activate_subscription` - Activate a cancelled subscription
- `recharge_skip_subscription_charge` - Skip the next charge for a subscription
- `recharge_unskip_subscription_charge` - Unskip a previously skipped subscription charge

### Product Tools
- `recharge_get_products` - Retrieve products with filtering and pagination
- `recharge_get_product` - Get a specific product by ID

### Order Tools
- `recharge_get_orders` - Retrieve orders with filtering and pagination
- `recharge_get_order` - Get a specific order by ID
- `recharge_update_order` - Update order details
- `recharge_delete_order` - Delete an order
- `recharge_clone_order` - Clone an existing order

### Charge Tools
- `recharge_get_charges` - Retrieve charges with filtering and pagination
- `recharge_get_charge` - Get a specific charge by ID
- `recharge_skip_charge` - Skip a specific charge
- `recharge_process_charge` - Process a specific charge
- `recharge_unskip_charge` - Unskip a previously skipped charge
- `recharge_delay_charge` - Delay a specific charge
- `recharge_refund_charge` - Refund a specific charge

### Address Tools
- `recharge_get_addresses` - Retrieve addresses with filtering and pagination
- `recharge_get_address` - Get a specific address by ID
- `recharge_update_address` - Update address details
- `recharge_create_address` - Create a new address

### Discount Tools
- `recharge_get_discounts` - Retrieve discounts with filtering and pagination
- `recharge_get_discount` - Get a specific discount by ID
- `recharge_update_discount` - Update discount details
- `recharge_delete_discount` - Delete a discount
- `recharge_create_discount` - Create a new discount

### Metafield Tools
- `recharge_get_metafields` - Retrieve metafields with filtering and pagination
- `recharge_get_metafield` - Get a specific metafield by ID
- `recharge_update_metafield` - Update metafield details
- `recharge_delete_metafield` - Delete a metafield
- `recharge_create_metafield` - Create a new metafield

### Webhook Tools
- `recharge_get_webhooks` - Retrieve webhooks with pagination
- `recharge_get_webhook` - Get a specific webhook by ID
- `recharge_update_webhook` - Update webhook details
- `recharge_delete_webhook` - Delete a webhook
- `recharge_create_webhook` - Create a new webhook

### Payment Method Tools
- `recharge_get_payment_methods` - Retrieve payment methods with filtering
- `recharge_get_payment_method` - Get a specific payment method by ID
- `recharge_update_payment_method` - Update payment method details

### Checkout Tools
- `recharge_get_checkouts` - Retrieve checkouts with pagination
- `recharge_get_checkout` - Get a specific checkout by token
- `recharge_update_checkout` - Update checkout details
- `recharge_process_checkout` - Process a checkout to complete purchase
- `recharge_create_checkout` - Create a new checkout

### One-time Product Tools
- `recharge_get_onetimes` - Retrieve one-time products with filtering
- `recharge_get_onetime` - Get a specific one-time product by ID
- `recharge_update_onetime` - Update one-time product details
- `recharge_delete_onetime` - Delete a one-time product
- `recharge_create_onetime` - Create a new one-time product

### Store Credit Tools
- `recharge_get_store_credits` - Retrieve store credits with filtering
- `recharge_get_store_credit` - Get a specific store credit by ID
- `recharge_update_store_credit` - Update store credit details
- `recharge_create_store_credit` - Create a new store credit

### Shop Tools
- `recharge_get_shop` - Get shop information

### Collection Tools
- `recharge_get_collections` - Retrieve product collections with pagination
- `recharge_get_collection` - Get a specific collection by ID

### Analytics Tools
- `recharge_get_subscription_analytics` - Get subscription analytics data
- `recharge_get_customer_analytics` - Get customer analytics data

### Customer Portal Tools
- `recharge_get_customer_portal_session` - Get customer portal session information
- `recharge_create_customer_portal_session` - Create a customer portal session

### Bundle Selection Tools
- `recharge_get_bundle_selections` - Retrieve bundle selections with filtering
- `recharge_get_bundle_selection` - Get a specific bundle selection by ID
- `recharge_create_bundle_selection` - Create a new bundle selection
- `recharge_update_bundle_selection` - Update bundle selection details
- `recharge_delete_bundle_selection` - Delete a bundle selection

### Retention Strategy Tools
- `recharge_get_retention_strategies` - Retrieve retention strategies with pagination
- `recharge_get_retention_strategy` - Get a specific retention strategy by ID

### Async Batch Tools
- `recharge_get_async_batches` - Retrieve async batches with pagination
- `recharge_get_async_batch` - Get a specific async batch by ID
- `recharge_create_async_batch` - Create a new async batch

### Notification Tools
- `recharge_get_notifications` - Retrieve notifications with filtering
- `recharge_get_notification` - Get a specific notification by ID

## Sample Usage

Below are examples of how to use each tool with sample parameters and expected responses.

### Customer Management

#### Get Customers
```json
{
  "tool": "recharge_get_customers",
  "arguments": {
    "limit": 10,
    "email": "customer@example.com",
    "created_at_min": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Single Customer
```json
{
  "tool": "recharge_get_customer",
  "arguments": {
    "customer_id": "123456"
  }
}
```

#### Create Customer
```json
{
  "tool": "recharge_create_customer",
  "arguments": {
    "email": "newcustomer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1234567890"
  }
}
```

#### Update Customer
```json
{
  "tool": "recharge_update_customer",
  "arguments": {
    "customer_id": "123456",
    "first_name": "Jane",
    "phone": "+0987654321"
  }
}
```

### Subscription Management

#### Get Subscriptions
```json
{
  "tool": "recharge_get_subscriptions",
  "arguments": {
    "limit": 25,
    "customer_id": "123456",
    "status": "active"
  }
}
```

#### Create Subscription
```json
{
  "tool": "recharge_create_subscription",
  "arguments": {
    "address_id": "789012",
    "next_charge_scheduled_at": "2024-02-01T00:00:00Z",
    "order_interval_frequency": "1",
    "order_interval_unit": "month",
    "quantity": 2,
    "shopify_variant_id": "345678"
  }
}
```

#### Cancel Subscription
```json
{
  "tool": "recharge_cancel_subscription",
  "arguments": {
    "subscription_id": "456789",
    "cancellation_reason": "Customer requested cancellation"
  }
}
```

### Charge Management

#### Skip Charge
```json
{
  "tool": "recharge_skip_charge",
  "arguments": {
    "charge_id": "333444"
  }
}
```

#### Refund Charge
```json
{
  "tool": "recharge_refund_charge",
  "arguments": {
    "charge_id": "333444",
    "amount": "25.99",
    "reason": "Product defect"
  }
}
```

### Address Management

#### Create Address
```json
{
  "tool": "recharge_create_address",
  "arguments": {
    "customer_id": "123456",
    "first_name": "John",
    "last_name": "Doe",
    "address1": "123 Main St",
    "city": "New York",
    "province": "NY",
    "country_code": "US",
    "zip": "10001",
    "phone": "+1234567890"
  }
}
```

### Discount Management

#### Create Discount
```json
{
  "tool": "recharge_create_discount",
  "arguments": {
    "code": "SAVE20",
    "value": 20,
    "value_type": "percentage",
    "status": "enabled",
    "usage_limit": 100,
    "applies_to": "checkout"
  }
}
```

### Webhook Management

#### Create Webhook
```json
{
  "tool": "recharge_create_webhook",
  "arguments": {
    "address": "https://myapp.com/webhooks/recharge",
    "topic": "subscription/created"
  }
}
```

## Response Format

All tools return responses in the following format:

### Success Response
```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"customer\": {\"id\": 123456, \"email\": \"customer@example.com\", ...}}"
    }
  ]
}
```

### Error Response
```json
{
  "content": [
    {
      "type": "text",
      "text": "Error retrieving customer: Recharge API error 404: Customer not found"
    }
  ],
  "isError": true
}
```

## Common Parameters

### Pagination
Most list endpoints support pagination:
- `limit`: Number of items to return (max 250)
- `page`: Page number for pagination

### Date Filtering
Many endpoints support date filtering:
- `created_at_min`: Filter items created after this date (ISO 8601)
- `created_at_max`: Filter items created before this date (ISO 8601)

### Status Filtering
Resources with status fields support filtering:
- `status`: Filter by status (varies by resource type)

## Best Practices

### API Usage
- **Use pagination** for large datasets to avoid timeouts
- **Filter by customer_id** when possible to reduce response size
- **Use date ranges** for analytics and reporting queries
- **Use specific IDs** when retrieving individual resources for better performance
- **Monitor rate limits** - Recharge has API rate limits that vary by plan
- **Use async batches** for bulk operations to improve performance

### Error Handling
- **Handle errors gracefully** - check the `isError` field in responses
- **Validate required fields** before making tool calls
- **Implement proper error handling** for network timeouts and API errors
- **Check response status** and handle different error types appropriately
- **Use proper date formats** (ISO 8601) for all date fields

### Performance & Reliability
- **Cache frequently accessed data** like product information to reduce API calls
- **Use webhooks** for real-time updates instead of polling
- **Implement retry logic** for transient failures (built-in to this server)
- **Use connection pooling** for better performance in production

### Security & Configuration
- **Use environment variables** for sensitive configuration
- **Never commit API keys** to version control
- **Validate input parameters** before sending requests to avoid API errors
- **Test with sandbox data** before production deployment

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your API key is correct
   - Ensure the API key has proper permissions
   - Check that the API key hasn't expired
   - If using client-provided keys, ensure the `api_key` parameter is included in requests

2. **Rate Limiting**
   - Implement delays between requests if hitting rate limits
   - Use pagination to reduce large data requests
   - Consider caching frequently accessed data

3. **Network Errors**
   - Check internet connectivity
   - Verify Recharge API status
   - The server includes built-in retry logic for transient failures

4. **Validation Errors**
   - Ensure all required fields are provided
   - Use proper date formats (ISO 8601: YYYY-MM-DDTHH:mm:ssZ)
   - Validate email addresses before creating customers
   - Check that numeric values are within acceptable ranges

### Environment Variables for Configuration

```bash
# API Configuration
RECHARGE_API_KEY=your_api_key_here     # Your Recharge API key
RECHARGE_API_URL=https://api.rechargeapps.com  # API base URL
RECHARGE_API_TIMEOUT=30000          # Request timeout in milliseconds
RECHARGE_API_RETRY_ATTEMPTS=3       # Number of retry attempts
RECHARGE_API_RETRY_DELAY=1000       # Delay between retries in milliseconds

# Logging
NODE_ENV=development                # Enable detailed error logging
```

### Debug Mode

Run the server in development mode for more detailed logging:

```bash
NODE_ENV=development npm run dev
```

### Common Error Messages

- **"API key is required"**: Set `RECHARGE_API_KEY` or provide `api_key` parameter
- **"Recharge API error 401"**: Invalid or expired API key
- **"Recharge API error 429"**: Rate limit exceeded (will auto-retry)
- **"Request timeout"**: Increase `RECHARGE_API_TIMEOUT` or check network
- **"Missing required fields"**: Check tool documentation for required parameters
- **"Network request failed"**: Check internet connection and Recharge API status

### Validation

Test your setup with:

```bash
npm run validate
```

## API Documentation

This server implements endpoints from the Recharge API v2021-11. For detailed API documentation, visit: https://developer.rechargepayments.com/2021-11

## License

MIT License - see LICENSE file for details.