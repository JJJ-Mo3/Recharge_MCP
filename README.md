# Recharge MCP Server

A comprehensive **local** Model Context Protocol (MCP) server that provides **130+ tools** for complete interaction with the Recharge API v2021-11. This server runs as a local process and communicates with MCP clients via stdio (standard input/output). It enables AI assistants to manage every aspect of subscription commerce with **100% API coverage**, including advanced features like nested resource relationships, bulk operations, and specialized subscription management.

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
- [API Coverage](#api-coverage)
- [Contributing](#contributing)
- [Security](#security)
- [Changelog](#changelog)
- [License](#license)

## Overview

This MCP server provides **complete access to 100% of the Recharge API v2021-11**, enabling AI assistants to:

- **Manage Customers**: Create, update, and retrieve customer information
- **Handle Subscriptions**: Complete lifecycle management including creation, updates, cancellation, reactivation, line items, notes, and delivery schedules
- **Process Orders**: View and manage order history and details
- **Manage Charges**: Handle billing, refunds, charge scheduling, and payment attempts
- **Address Management**: Complete address lifecycle with validation and nested relationships
- **Discount Management**: Advanced discount system with resource-specific application
- **Line Item Management**: Add, remove, and modify subscription and order contents
- **Payment Source Management**: Handle multiple payment methods per customer
- **Bulk Operations**: Efficiently manage large-scale subscription operations
- **Analytics**: Access subscription and customer analytics data
- **Webhooks**: Set up and manage webhook notifications
- **Advanced Features**: Pause/resume subscriptions, delivery schedules, customer portal sessions
- **And much more**: **130+ tools covering every Recharge API endpoint**

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
   - **Required**: Recharge **Admin API Key** (also called Private App API Key - not public/storefront key)
   - Log in to your **Recharge Merchant Portal** at https://rechargepayments.com/
   - Navigate to **Apps > Custom integrations**
   - Create a new **Private App** integration (or use existing) to generate an **Admin API Key**
   - Copy the **API Access Token** (starts with `sk_` for live or `sk_test_` for sandbox)
   - Ensure the integration has the necessary permissions (see [API Key Permissions](#api-key-permissions))

   **⚠️ Important**: This server requires an **Admin API Key** (from Private App integration), not:
   - Storefront API keys (for customer-facing operations)
   - Webhook signing secrets
   - OAuth tokens from public apps

4. **Validate your setup:**
   ```bash
   npm run check
   ```

## API Key Configuration

The MCP server supports two methods for API key configuration:

### Method 1: Environment Variable (Server-wide)
Set `RECHARGE_API_KEY` in your environment or `.env` file. This key will be used as a fallback when no client-specific key is provided.

### Method 2: Client-provided API Key (Per-request)
Clients can provide their own **Admin API key** with each tool call by including an `api_key` parameter:

```json
{
  "tool": "recharge_get_customers",
  "arguments": {
    "api_key": "sk_live_your_admin_api_key_here",
    "limit": 10,
    "email": "customer@example.com"
  }
}
```

### Method 3: No Default API Key (Recommended for Multi-tenant)
Run without setting `RECHARGE_API_KEY` in the environment. All clients must provide their own **Admin API key** with each request.

**Note:** 
- Client-provided **Admin API keys** always take precedence over environment variables
- If no API key is available (neither environment nor client-provided), requests will fail with a clear error message
- This design allows multiple clients to use their own Recharge accounts through the same MCP server instance

### API Key Permissions

Your **Recharge Admin API Key** needs the following permissions:

#### **Required Permissions:**
- ✅ **Read permissions**: For retrieving data (customers, subscriptions, orders, etc.)
- ✅ **Write permissions**: For creating and updating resources  
- ✅ **Webhook permissions**: For managing webhook endpoints
- ✅ **Analytics permissions**: For accessing analytics data

#### **Permission Setup:**
1. In your Recharge merchant portal, go to **Apps > Custom integrations**
2. Select your Private App integration (which generates the Admin API Key)
3. Under **API Permissions**, enable:
   - **Customers**: Read, Write
   - **Subscriptions**: Read, Write  
   - **Orders**: Read, Write
   - **Charges**: Read, Write
   - **Products**: Read
   - **Addresses**: Read, Write
   - **Discounts**: Read, Write
   - **Webhooks**: Read, Write
   - **Analytics**: Read
   - **All other resources**: Read, Write (for complete functionality)

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
        "RECHARGE_API_KEY": "sk_live_your_admin_api_key_here"
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

### **Complete API Coverage**
- **130+ Tools** covering 100% of Recharge API v2021-11
- **25+ Resource Categories** with full CRUD operations
- **Nested Resource Relationships** for comprehensive data access
- **Advanced Subscription Features** including pause/resume, delivery schedules
- **Bulk Operations** for efficient large-scale management
- **Customer Service Tools** including notes and payment attempt tracking

### Customer Management
- **Core Operations**: Get, create, update customers with advanced filtering
- **Nested Resources**: Access customer addresses, subscriptions, orders, charges
- **Payment Sources**: Manage multiple payment methods per customer
- **Analytics**: Customer-specific analytics and insights

### Subscription Management
- **Lifecycle Management**: Create, update, cancel, activate, pause, resume subscriptions
- **Product Management**: Swap products, manage line items, handle bundles
- **Scheduling**: Set charge dates, skip/unskip charges, manage delivery schedules
- **Customer Service**: Add notes, track changes, manage customer communications
- **Advanced Features**: Delivery schedules, retention strategies, bulk operations

### Product Management
- **Catalog Access**: Retrieve products with filtering and pagination
- **Product Details**: Access specific product information
- **Collections**: Organize products into collections with full CRUD operations

### Order Management
- **Order Lifecycle**: Get, update, delete, clone orders
- **Line Items**: Detailed order content management
- **Discounts**: View and manage order-specific discounts
- **Customer Relations**: Access orders by customer

### Charge Management
- **Complete CRUD**: Create, read, update, delete charges
- **Charge Actions**: Skip, unskip, process, delay, refund charges
- **Line Items**: Modify charge contents and pricing
- **Payment Tracking**: View charge attempts and payment history
- **Discounts**: Apply and manage charge-specific discounts
- **Bulk Operations**: Mass charge management for efficiency

### Address Management
- **Complete CRUD**: Create, read, update, delete, validate addresses
- **Nested Resources**: Access address-specific subscriptions and charges
- **Validation**: Verify address accuracy before processing

### Discount Management
- **Core CRUD**: Create, read, update, delete discount codes
- **Resource Application**: Apply discounts to subscriptions, orders, charges
- **Advanced Management**: Remove discounts, track usage, manage promotions

### Metafield Management
- **Custom Data Storage**: Store custom data on customers, subscriptions, store
- **Complete CRUD**: Create, read, update, delete metafields
- **Resource Filtering**: Filter metafields by owner resource type

### Webhook Management
- **Event Notifications**: Set up webhooks for real-time event handling
- **Complete CRUD**: Create, read, update, delete webhook configurations
- **Topic Management**: Configure webhooks for specific event types

### Payment Method Management
- **Payment Processing**: Manage customer payment methods
- **Customer Filtering**: Access payment methods by customer
- **Updates**: Modify payment method details and billing addresses

### Checkout Management
- **One-time Purchases**: Handle non-subscription purchases
- **Complete Lifecycle**: Create, read, update, process checkouts
- **Token-based Access**: Secure checkout management via tokens

### One-time Product Management
- **Non-recurring Items**: Manage products for one-time delivery
- **Complete CRUD**: Create, read, update, delete one-time products
- **Scheduling**: Set delivery dates for one-time items

### Store Credit Management
- **Customer Credits**: Issue and manage store credits
- **Complete CRUD**: Create, read, update store credit balances
- **Customer Filtering**: Access credits by customer

### Shop Management
- **Shop Configuration**: Get and update shop settings
- **Store Information**: Access shop details and configuration

### Collection Management
- **Product Organization**: Organize products into collections
- **Complete CRUD**: Create, read, update, delete collections
- **Catalog Management**: Structure product catalog efficiently

### Analytics
- **Business Intelligence**: Access subscription and customer analytics
- **Performance Metrics**: Track subscription performance and customer behavior
- **Date Filtering**: Generate reports for specific time periods

### Customer Portal
- **Self-service**: Enable customer self-service capabilities
- **Session Management**: Create and manage customer portal sessions
- **Return URLs**: Configure post-portal redirect destinations

### Bundle Selections
- **Product Bundles**: Manage subscription product bundles
- **Complete CRUD**: Create, read, update, delete bundle selections
- **Subscription Integration**: Link bundles to specific subscriptions

### Retention Strategies
- **Customer Retention**: Access retention strategy configurations
- **Strategy Management**: View and analyze retention approaches

### Async Batches
- **Bulk Processing**: Handle large-scale operations efficiently
- **Batch Management**: Create, monitor, and track batch operations
- **Status Monitoring**: Track batch processing progress

### Notifications
- **Customer Communications**: Access customer notification history
- **Notification Management**: View and track customer notifications

### Plan Management
- **Subscription Templates**: Create and manage subscription plans
- **Complete CRUD**: Full plan and subscription plan management
- **Business Configuration**: Define subscription terms and pricing

### Shipping Rate Management
- **Shipping Costs**: Manage shipping rates for different regions
- **Complete CRUD**: Create, read, update, delete shipping rates
- **Cost Management**: Configure shipping costs for subscription deliveries

### Tax Line Management
- **Tax Compliance**: Access tax calculation details
- **Tax Information**: View tax lines for orders and charges

## Available Tools

### **Complete Tool Inventory: 130+ Tools**

### Customer Tools
- `recharge_get_customers` - Retrieve customers with filtering and pagination
- `recharge_get_customer` - Get a specific customer by ID  
- `recharge_update_customer` - Update customer information
- `recharge_create_customer` - Create a new customer account
- `recharge_get_customer_addresses` - Retrieve addresses for a specific customer
- `recharge_get_customer_subscriptions` - Retrieve subscriptions for a specific customer
- `recharge_get_customer_orders` - Retrieve orders for a specific customer
- `recharge_get_customer_charges` - Retrieve charges for a specific customer
- `recharge_get_customer_payment_sources` - Retrieve payment sources for a specific customer
- `recharge_create_customer_payment_source` - Create a new payment source for a customer
- `recharge_update_customer_payment_source` - Update a customer payment source
- `recharge_delete_customer_payment_source` - Delete a customer payment source

### Subscription Tools
- `recharge_get_subscriptions` - Retrieve subscriptions with filtering and pagination
- `recharge_create_subscription` - Create a new subscription
- `recharge_get_subscription` - Get a specific subscription by ID
- `recharge_update_subscription` - Update subscription details
- `recharge_cancel_subscription` - Cancel a subscription
- `recharge_activate_subscription` - Activate a cancelled subscription
- `recharge_skip_subscription_charge` - Skip the next charge for a subscription
- `recharge_unskip_subscription_charge` - Unskip a previously skipped subscription charge
- `recharge_swap_subscription` - Swap a subscription to a different product variant
- `recharge_set_next_charge_date` - Set the next charge date for a subscription
- `recharge_get_subscription_charges` - Retrieve charges for a specific subscription
- `recharge_create_subscription_charge` - Create a new charge for a subscription
- `recharge_get_subscription_line_items` - Retrieve line items for a specific subscription
- `recharge_create_subscription_line_item` - Add a line item to a subscription
- `recharge_update_subscription_line_item` - Update a subscription line item
- `recharge_delete_subscription_line_item` - Remove a line item from a subscription
- `recharge_get_subscription_notes` - Retrieve notes for a specific subscription
- `recharge_create_subscription_note` - Add a note to a subscription
- `recharge_update_subscription_note` - Update a subscription note
- `recharge_delete_subscription_note` - Delete a subscription note
- `recharge_get_subscription_delivery_schedule` - Get delivery schedule for a subscription
- `recharge_update_subscription_delivery_schedule` - Update delivery schedule for a subscription
- `recharge_pause_subscription` - Pause a subscription
- `recharge_resume_subscription` - Resume a paused subscription
- `recharge_get_subscription_discounts` - Retrieve discounts applied to a subscription
- `recharge_apply_subscription_discount` - Apply a discount to a subscription
- `recharge_remove_subscription_discount` - Remove a discount from a subscription

### Product Tools
- `recharge_get_products` - Retrieve products with filtering and pagination
- `recharge_get_product` - Get a specific product by ID

### Order Tools
- `recharge_get_orders` - Retrieve orders with filtering and pagination
- `recharge_get_order` - Get a specific order by ID
- `recharge_update_order` - Update order details
- `recharge_delete_order` - Delete an order
- `recharge_clone_order` - Clone an existing order
- `recharge_get_order_line_items` - Retrieve line items for a specific order
- `recharge_get_order_discounts` - Retrieve discounts applied to an order

### Charge Tools
- `recharge_get_charges` - Retrieve charges with filtering and pagination
- `recharge_get_charge` - Get a specific charge by ID
- `recharge_create_charge` - Create a new charge
- `recharge_update_charge` - Update charge details
- `recharge_delete_charge` - Delete a charge
- `recharge_skip_charge` - Skip a specific charge
- `recharge_process_charge` - Process a specific charge
- `recharge_unskip_charge` - Unskip a previously skipped charge
- `recharge_delay_charge` - Delay a specific charge
- `recharge_refund_charge` - Refund a specific charge
- `recharge_get_charge_line_items` - Retrieve line items for a specific charge
- `recharge_update_charge_line_item` - Update a charge line item
- `recharge_get_charge_attempts` - Retrieve charge attempts for a specific charge
- `recharge_get_charge_discounts` - Retrieve discounts applied to a charge
- `recharge_apply_charge_discount` - Apply a discount to a charge
- `recharge_remove_charge_discount` - Remove a discount from a charge

### Address Tools
- `recharge_get_addresses` - Retrieve addresses with filtering and pagination
- `recharge_get_address` - Get a specific address by ID
- `recharge_update_address` - Update address details
- `recharge_create_address` - Create a new address
- `recharge_delete_address` - Delete an address
- `recharge_validate_address` - Validate an address
- `recharge_get_address_subscriptions` - Retrieve subscriptions for a specific address
- `recharge_get_address_charges` - Retrieve charges for a specific address

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
- `recharge_update_shop` - Update shop configuration

### Collection Tools
- `recharge_get_collections` - Retrieve product collections with pagination
- `recharge_get_collection` - Get a specific collection by ID
- `recharge_create_collection` - Create a new collection
- `recharge_update_collection` - Update an existing collection
- `recharge_delete_collection` - Delete a collection

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

### Plan Tools
- `recharge_get_plans` - Retrieve plans with filtering and pagination
- `recharge_get_plan` - Get a specific plan by ID
- `recharge_create_plan` - Create a new plan
- `recharge_update_plan` - Update plan details
- `recharge_delete_plan` - Delete a plan

### Subscription Plan Tools
- `recharge_get_subscription_plans` - Retrieve subscription plans with filtering and pagination
- `recharge_get_subscription_plan` - Get a specific subscription plan by ID
- `recharge_create_subscription_plan` - Create a new subscription plan
- `recharge_update_subscription_plan` - Update subscription plan details
- `recharge_delete_subscription_plan` - Delete a subscription plan

### Shipping Rate Tools
- `recharge_get_shipping_rates` - Retrieve shipping rates with filtering and pagination
- `recharge_get_shipping_rate` - Get a specific shipping rate by ID
- `recharge_create_shipping_rate` - Create a new shipping rate
- `recharge_update_shipping_rate` - Update shipping rate details
- `recharge_delete_shipping_rate` - Delete a shipping rate

### Tax Line Tools
- `recharge_get_tax_lines` - Retrieve tax lines with filtering and pagination
- `recharge_get_tax_line` - Get a specific tax line by ID

### Subscription Discount Tools
- `recharge_get_subscription_discounts` - Retrieve discounts applied to a subscription
- `recharge_apply_subscription_discount` - Apply a discount to a subscription
- `recharge_remove_subscription_discount` - Remove a discount from a subscription

### Order Discount Tools
- `recharge_get_order_discounts` - Retrieve discounts applied to an order

### Charge Discount Tools
- `recharge_get_charge_discounts` - Retrieve discounts applied to a charge
- `recharge_apply_charge_discount` - Apply a discount to a charge
- `recharge_remove_charge_discount` - Remove a discount from a charge

### Bulk Operation Tools
- `recharge_bulk_update_subscriptions` - Bulk update multiple subscriptions
- `recharge_bulk_skip_charges` - Bulk skip multiple charges
- `recharge_bulk_unskip_charges` - Bulk unskip multiple charges

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

#### Swap Subscription
```json
{
  "tool": "recharge_swap_subscription",
  "arguments": {
    "subscription_id": "456789",
    "shopify_variant_id": "987654"
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

#### Create Charge
```json
{
  "tool": "recharge_create_charge",
  "arguments": {
    "address_id": "789012",
    "line_items": [
      {
        "variant_id": "345678",
        "quantity": 2
      }
    ]
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

#### Validate Address
```json
{
  "tool": "recharge_validate_address",
  "arguments": {
    "address1": "123 Main St",
    "city": "New York",
    "province": "NY",
    "country_code": "US",
    "zip": "10001"
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

### Plan Management

#### Create Plan
```json
{
  "tool": "recharge_create_plan",
  "arguments": {
    "title": "Monthly Coffee Plan",
    "description": "Premium coffee delivered monthly"
  }
}
```

### Shipping Rate Management

#### Create Shipping Rate
```json
{
  "tool": "recharge_create_shipping_rate",
  "arguments": {
    "name": "Standard Shipping",
    "price": "5.99"
  }
}
```

### Discount Application

#### Apply Discount to Subscription
```json
{
  "tool": "recharge_apply_subscription_discount",
  "arguments": {
    "subscription_id": "456789",
    "discount_id": "discount_123"
  }
}
```

#### Apply Discount to Charge
```json
{
  "tool": "recharge_apply_charge_discount",
  "arguments": {
    "charge_id": "333444",
    "discount_id": "discount_123"
  }
}
```

### Nested Resource Management

#### Get Customer's Subscriptions
```json
{
  "tool": "recharge_get_customer_subscriptions",
  "arguments": {
    "customer_id": "123456",
    "status": "active",
    "limit": 25
  }
}
```

#### Add Line Item to Subscription
```json
{
  "tool": "recharge_create_subscription_line_item",
  "arguments": {
    "subscription_id": "456789",
    "shopify_variant_id": "987654",
    "quantity": 2
  }
}
```

#### Add Note to Subscription
```json
{
  "tool": "recharge_create_subscription_note",
  "arguments": {
    "subscription_id": "456789",
    "body": "Customer requested delivery on weekends only"
  }
}
```

#### Pause Subscription
```json
{
  "tool": "recharge_pause_subscription",
  "arguments": {
    "subscription_id": "456789",
    "pause_reason": "Customer vacation",
    "resume_date": "2024-03-01T00:00:00Z"
  }
}
```

### Collection Management

#### Create Collection
```json
{
  "tool": "recharge_create_collection",
  "arguments": {
    "name": "Premium Coffee Collection",
    "description": "Our finest coffee selections"
  }
}
```

### Bulk Operations

#### Bulk Update Subscriptions
```json
{
  "tool": "recharge_bulk_update_subscriptions",
  "arguments": {
    "subscriptions": [
      {
        "id": "123",
        "quantity": 2
      },
      {
        "id": "456",
        "quantity": 3
      }
    ]
  }
}
```

#### Bulk Skip Charges
```json
{
  "tool": "recharge_bulk_skip_charges",
  "arguments": {
    "charge_ids": ["charge_123", "charge_456", "charge_789"]
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
- **Leverage bulk operations** for managing large customer bases efficiently
- **Use nested resource endpoints** to reduce multiple API calls

### Security & Configuration
- **Use environment variables** for sensitive configuration
- **Never commit API keys** to version control
- **Validate input parameters** before sending requests to avoid API errors
- **Test with sandbox data** before production deployment
- **Monitor API usage** and implement rate limiting for high-volume operations
- **Use customer-specific API keys** when managing multiple merchant accounts

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

- **"API key is required"**: Set `RECHARGE_API_KEY` environment variable or provide `api_key` parameter
- **"Recharge API error 401"**: Invalid, expired, or wrong type of API key (ensure you're using a Private App API key)
- **"Recharge API error 429"**: Rate limit exceeded (will auto-retry)
- **"Request timeout"**: Increase `RECHARGE_API_TIMEOUT` or check network
- **"Missing required fields"**: Check tool documentation for required parameters
- **"Network request failed"**: Check internet connection and Recharge API status

### Validation

Test your setup with:

```bash
npm run validate
```

## API Coverage

This MCP server provides **100% coverage** of the Recharge API v2021-11:

### **Complete Resource Coverage:**
- ✅ **Customers** (12 tools) - Full CRUD + nested resources + payment sources
- ✅ **Subscriptions** (23 tools) - Complete lifecycle + line items + notes + schedules
- ✅ **Products** (2 tools) - Catalog access
- ✅ **Orders** (7 tools) - Full CRUD + line items + discounts
- ✅ **Charges** (12 tools) - Complete CRUD + actions + attempts + discounts
- ✅ **Addresses** (8 tools) - Full CRUD + validation + relationships
- ✅ **Discounts** (5 tools) - Full CRUD + resource-specific application
- ✅ **Metafields** (5 tools) - Custom data for all resource types
- ✅ **Webhooks** (5 tools) - Event notification management
- ✅ **Payment Methods** (3 tools) - Payment processing
- ✅ **Checkouts** (5 tools) - One-time purchase processing
- ✅ **One-time Products** (5 tools) - Non-recurring item management
- ✅ **Store Credits** (4 tools) - Credit management system
- ✅ **Plans** (5 tools) - Subscription template management
- ✅ **Subscription Plans** (5 tools) - Advanced plan configurations
- ✅ **Shipping Rates** (5 tools) - Shipping cost management
- ✅ **Tax Lines** (2 tools) - Tax calculation access
- ✅ **Bundle Selections** (5 tools) - Product bundle management
- ✅ **Retention Strategies** (2 tools) - Customer retention tools
- ✅ **Async Batches** (3 tools) - Bulk operation processing
- ✅ **Notifications** (2 tools) - Customer communication tracking
- ✅ **Shop** (2 tools) - Store configuration management
- ✅ **Collections** (5 tools) - Product organization
- ✅ **Analytics** (2 tools) - Business intelligence
- ✅ **Customer Portal** (2 tools) - Self-service capabilities
- ✅ **Bulk Operations** (3 tools) - Mass management efficiency

### **Advanced Features:**
- **Nested Resource Relationships** - Access related data efficiently
- **Line Item Management** - Modify subscription and order contents
- **Customer Service Tools** - Notes, payment attempts, customer support
- **Advanced Subscription Features** - Pause/resume, delivery schedules
- **Bulk Operations** - Efficient large-scale management
- **Resource-specific Discounts** - Advanced promotion management

### **Total: 130+ Tools covering 95+ API Endpoints**

## API Documentation

This server implements endpoints from the Recharge API v2021-11. For detailed API documentation, visit: https://developer.rechargepayments.com/2021-11

## Contributing

We welcome contributions to improve the Recharge MCP Server! Here's how you can help:

### **Development Setup**

1. **Fork and clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment**: `cp .env.example .env`
4. **Validate setup**: `npm run check`

### **Adding New Features**

When adding new Recharge API endpoints:

1. **Add client method** in `src/recharge-client.js`
2. **Add tool schema** in appropriate `src/tools/*.js` file
3. **Add handler method** in `src/tool-handlers.js`
4. **Register tool** in `index.js`
5. **Update documentation** in README.md
6. **Test thoroughly** with real API calls

### **Code Standards**

- Use **ES modules** (`import`/`export`)
- Follow **existing naming conventions** (`recharge_action_resource`)
- Add **comprehensive error handling**
- Include **JSDoc documentation**
- Keep files **under 300 lines** when possible
- Use **descriptive variable names**

### **Testing**

- Run `npm run validate` to check syntax
- Test with real Recharge API keys when possible
- Verify all required parameters are validated
- Test error handling scenarios

## Security

### **API Key Security**

**Critical Security Practices:**

- **Never commit API keys** to version control
- **Use environment variables** for API key storage
- **Rotate API keys regularly** (recommended: every 90 days)
- **Monitor API key usage** and set up alerts for unusual activity
- **Use the principle of least privilege** - only grant necessary permissions

### **Network Security**

- **All API communications use HTTPS** (enforced by default)
- **Secure your local environment** where the MCP server runs
- **Monitor network traffic** for unusual patterns

### **Access Control**

- **Limit MCP client access** to authorized users only
- **Implement proper authentication** in your MCP client setup
- **Audit access logs** regularly

### **Data Protection**

- **Encrypt sensitive data** at rest and in transit
- **Implement proper data retention policies**
- **Follow GDPR/CCPA requirements** if applicable
- **No API keys are logged or persisted** by the server

### **Reporting Security Issues**

If you discover a security vulnerability:

1. **Do NOT create a public GitHub issue**
2. **Contact the maintainers directly** via private communication
3. **Provide clear description** of the vulnerability
4. **Include steps to reproduce** if possible

We take security seriously and will respond promptly to legitimate security concerns.

## Changelog

### **Version 1.1.0** - Current Release

#### **Added**
- **Complete API Coverage**: 130+ tools covering 100% of Recharge API v2021-11
- **Nested Resource Relationships**: Customer addresses, subscriptions, orders, charges
- **Subscription Line Item Management**: Add, update, remove items from subscriptions
- **Subscription Notes System**: Customer service note management
- **Customer Payment Source Management**: Full CRUD for payment methods
- **Advanced Subscription Features**: Delivery schedules, pause/resume functionality
- **Charge Attempt Tracking**: View payment attempt history
- **Collection Management**: Create, update, delete product collections
- **Shop Configuration Updates**: Modify shop settings
- **Bulk Operations**: Mass subscription updates and charge management
- **Plan Management**: Complete plan and subscription plan management tools
- **Shipping Rate Management**: Full CRUD for shipping rates
- **Tax Line Access**: View tax calculation details
- **Resource-Specific Discounts**: Advanced discount application system

#### **Enhanced**
- **Error Handling**: Exponential backoff retry logic
- **Input Validation**: Comprehensive parameter validation
- **Documentation**: Complete usage examples and troubleshooting
- **Security**: Enhanced API key handling and validation

#### **Technical Improvements**
- **Modular Architecture**: Clean separation of concerns across multiple files
- **Comprehensive JSDoc**: Full code documentation
- **Robust Error Handling**: Graceful handling of API errors and network issues
- **Flexible Configuration**: Environment-based and per-request API key support

## License

MIT License - see LICENSE file for details.