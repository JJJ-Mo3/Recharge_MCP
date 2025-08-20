# Recharge Payments MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with the Recharge Payments API. This server enables AI assistants to manage subscriptions, customers, orders, charges, and other Recharge resources.

## Features

### Customer Management
- Get customers (with filtering and pagination)
- Get specific customer by ID
- Create new customers

### Subscription Management
- Get subscriptions (with filtering and pagination)
- Get specific subscription by ID
- Update subscription details
- Cancel subscriptions
- Activate cancelled subscriptions

### Product Management
- Get products (with filtering and pagination)
- Get specific product by ID

### Order Management
- Get orders (with filtering and pagination)
- Get specific order by ID

### Charge Management
- Get charges (with filtering and pagination)
- Get specific charge by ID

### Address Management
- Get addresses (with filtering and pagination)
- Create new addresses

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Recharge API credentials:
   ```
   RECHARGE_API_KEY=your_recharge_api_key_here
   RECHARGE_API_URL=https://api.rechargeapps.com
   ```

3. **Get your Recharge API key:**
   - Log in to your Recharge partner dashboard
   - Navigate to Apps & integrations > Private apps
   - Create a new private app or use an existing one
   - Copy the API access token

## Usage

### Running the server
```bash
npm start
```

The server will start and listen for MCP protocol messages on stdin/stdout.

### Development
```bash
npm run dev
```

This runs the server with Node.js watch mode for development.

## MCP Configuration

To use this server with an MCP client, add it to your client's configuration:

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

## Available Tools

### Customer Tools
- `recharge_get_customers` - Retrieve customers with filtering options
- `recharge_get_customer` - Get a specific customer by ID
- `recharge_create_customer` - Create a new customer

### Subscription Tools
- `recharge_get_subscriptions` - Retrieve subscriptions with filtering
- `recharge_get_subscription` - Get a specific subscription by ID
- `recharge_update_subscription` - Update subscription details
- `recharge_cancel_subscription` - Cancel a subscription
- `recharge_activate_subscription` - Activate a cancelled subscription

### Product Tools
- `recharge_get_products` - Retrieve products with filtering
- `recharge_get_product` - Get a specific product by ID

### Order Tools
- `recharge_get_orders` - Retrieve orders with filtering
- `recharge_get_order` - Get a specific order by ID

### Charge Tools
- `recharge_get_charges` - Retrieve charges with filtering
- `recharge_get_charge` - Get a specific charge by ID

### Address Tools
- `recharge_get_addresses` - Retrieve addresses with filtering
- `recharge_create_address` - Create a new address

## API Documentation

This server implements endpoints from the Recharge Payments API v2021-11. For detailed API documentation, visit: https://developer.rechargepayments.com/2021-11

## Error Handling

The server includes comprehensive error handling:
- API errors are caught and returned with descriptive messages
- Network errors are handled gracefully
- Invalid tool calls return appropriate error responses
- All errors include context about what operation failed

## Security

- API keys are loaded from environment variables
- All API requests use proper authentication headers
- No sensitive data is logged to stdout (only to stderr for debugging)

## Rate Limiting

Recharge API has rate limits. The server doesn't implement client-side rate limiting, so ensure your usage stays within Recharge's limits:
- Standard: 500 requests per minute
- Plus: 1000 requests per minute
- Pro: 1500 requests per minute

## License

MIT License - see LICENSE file for details.