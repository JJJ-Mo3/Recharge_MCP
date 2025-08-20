# Recharge MCP Server

A comprehensive **local** Model Context Protocol (MCP) server that provides tools for interacting with the Recharge API v2021-11. This server runs as a local process and communicates with MCP clients via stdio (standard input/output). It enables AI assistants to manage subscriptions, customers, orders, charges, and other Recharge resources with full CRUD operations and advanced features.

## Server Architecture

This is a **local MCP server** that:
- Runs as a local Node.js process on your machine
- Communicates with MCP clients via stdio (standard input/output)
- Follows the standard MCP local server pattern
- Can be configured in MCP clients like Claude Desktop, Continue, or other MCP-compatible tools

While the project includes deployment configurations for remote hosting (Docker, Kubernetes, Vercel, etc.), these are primarily for health monitoring and API documentation. The core MCP functionality operates locally via stdio communication.

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

### Discount Management
- Get discounts (with filtering and pagination)
- Create new discounts

### Metafield Management
- Get metafields (with filtering by resource type)
- Create new metafields for customers, subscriptions, or store

### Webhook Management
- Get webhooks
- Create new webhooks for event notifications

### Payment Method Management
- Get payment methods (with customer filtering)

### Checkout Management
- Create new checkouts for one-time purchases

### One-time Product Management
- Get one-time products
- Create new one-time products

### Store Credit Management
- Get store credits
- Create new store credits

### Charge Actions
- Skip charges
- Process charges
- Refund charges

### Subscription Actions
- Skip subscription charges

### Shop Information
- Get shop details and configuration

### Collection Management
- Get product collections

### Analytics
- Get subscription analytics
- Get customer analytics

### Order Actions
- Update order details
- Delete orders
- Clone existing orders

### Customer Portal
- Get customer portal session information
- Create customer portal sessions

### Bundle Selections
- Get bundle selections for subscriptions
- Create and manage bundle selections

### Retention Strategies
- Get retention strategies and configurations

### Async Batches
- Create and manage batch operations
- Monitor batch processing status

### Notifications
- Get customer notifications
- Retrieve notification details

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
   ```

3. **Get your Recharge API key:**
   - Log in to your Recharge dashboard
   - Navigate to Apps & integrations > Private apps
   - Create a new private app or use an existing one
   - Copy the API access token

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
Deploy without setting `RECHARGE_API_KEY` in the environment. All clients must provide their own API key with each request.

**Note:** 
- Client-provided API keys always take precedence over environment variables
- If no API key is available (neither environment nor client-provided), requests will fail with a clear error message
- This design allows multiple clients to use their own Recharge accounts through the same MCP server instance
## Usage

### Running the Local MCP Server

This server is designed to be run by MCP clients automatically. When properly configured in your MCP client, it will be started automatically when needed.

For testing or development, you can run it manually:

```bash
npm start
```

The server will start and listen for MCP protocol messages on stdin/stdout. You can then send MCP protocol messages via stdin to interact with it.

### Development Mode
```bash
npm run dev
```


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

### Other MCP Clients

For other MCP-compatible clients, configure them to run this server as a local process using the Node.js command with the path to `index.js`.

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

### Product Tools
- `recharge_get_products` - Retrieve products with filtering and pagination
- `recharge_get_product` - Get a specific product by ID

### Order Tools
- `recharge_get_orders` - Retrieve orders with filtering and pagination
- `recharge_get_order` - Get a specific order by ID

### Charge Tools
- `recharge_get_charges` - Retrieve charges with filtering and pagination
- `recharge_get_charge` - Get a specific charge by ID

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

### Charge Action Tools
- `recharge_skip_charge` - Skip a specific charge
- `recharge_process_charge` - Process a specific charge
- `recharge_unskip_charge` - Unskip a previously skipped charge
- `recharge_delay_charge` - Delay a specific charge
- `recharge_refund_charge` - Refund a specific charge

### Subscription Action Tools
- `recharge_skip_subscription_charge` - Skip the next charge for a subscription
- `recharge_unskip_subscription_charge` - Unskip a previously skipped subscription charge

### Shop Tools
- `recharge_get_shop` - Get shop information

### Collection Tools
- `recharge_get_collections` - Retrieve product collections with pagination
- `recharge_get_collection` - Get a specific collection by ID

### Analytics Tools
- `recharge_get_subscription_analytics` - Get subscription analytics data
- `recharge_get_customer_analytics` - Get customer analytics data

### Order Action Tools
- `recharge_update_order` - Update order details
- `recharge_delete_order` - Delete an order
- `recharge_clone_order` - Clone an existing order

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

## API Documentation

This server implements endpoints from the Recharge API v2021-11. For detailed API documentation, visit: https://developer.rechargepayments.com/2021-11

## Error Handling

The server includes comprehensive error handling:
- **API errors** are caught and returned with descriptive messages including error codes
- **Network errors** are handled gracefully with retry suggestions
- **Validation errors** for required fields, formats, and constraints
- **Invalid tool calls** return appropriate error responses
- **All errors** include context about what operation failed
- **Structured error responses** with consistent formatting

## Security

- API keys are loaded from environment variables
- All API requests use proper authentication headers
- No sensitive data is logged to stdout (only to stderr for debugging)

## Rate Limiting

Recharge API has rate limits. The server doesn't implement client-side rate limiting, so ensure your usage stays within Recharge's limits:
- Standard: 500 requests per minute
- Plus: 1000 requests per minute
- Pro: 1500 requests per minute

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your API key (environment variable or client-provided) is correct
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
   - Implement retry logic for transient failures

4. **Validation Errors**
   - Ensure all required fields are provided
   - Use proper date formats (ISO 8601: YYYY-MM-DDTHH:mm:ssZ)
   - Validate email addresses before creating customers
   - Check that numeric values are within acceptable ranges

5. **Data Format Issues**
   - Use strings for IDs, not numbers
   - Ensure currency amounts are formatted as strings
   - Validate enum values against allowed options

6. **Timeout Issues**
   - Use pagination for large datasets
   - Implement request timeouts
   - Consider using async batches for bulk operations
## License

MIT License - see LICENSE file for details.

## Deployment

While this is primarily a **local MCP server**, it can also be deployed to various platforms for health monitoring, API documentation, or serverless function compatibility. Note that when deployed remotely, the core MCP functionality still requires local stdio communication.

### Local Development and Production Use

For normal MCP usage, simply configure the server in your MCP client as shown in the [MCP Configuration](#mcp-configuration) section. The client will handle starting and stopping the server process automatically.

### Remote Deployment (Optional)

Remote deployment is optional and primarily useful for:
- Health monitoring and status checks
- API documentation hosting  
- Serverless function compatibility
- Container orchestration in enterprise environments

The MCP protocol communication still happens locally via stdio, but you can deploy the server for monitoring purposes:

### Docker

#### Basic Docker Deployment
```bash
# Build the Docker image
docker build -t recharge-mcp-server .

# Run the container
docker run -d \
  --name recharge-mcp-server \
  -p 3000:3000 \
  -e RECHARGE_API_KEY=your_api_key_here \
  -e RECHARGE_API_URL=https://api.rechargeapps.com \
  -e NODE_ENV=production \
  --restart unless-stopped \
  recharge-mcp-server
```

#### Docker Compose Deployment
```bash
# Create .env file with your configuration
echo "RECHARGE_API_KEY=your_api_key_here" > .env
echo "RECHARGE_API_URL=https://api.rechargeapps.com" >> .env

# Start the services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the services
docker-compose down
```

#### Docker Health Checks
The Docker container includes built-in health checks:
```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' recharge-mcp-server
```

#### Docker Production Considerations
- **Security**: The container runs as a non-root user (`mcp:nodejs`)
- **Signal Handling**: Uses `dumb-init` for proper signal forwarding
- **Resource Limits**: Consider setting memory and CPU limits in production
- **Logging**: Logs are written to `/app/logs` volume for persistence
- **Networking**: Uses bridge networking for container isolation

#### Docker Environment Variables
Required:
- `RECHARGE_API_KEY`: Your Recharge API access token

Optional:
- `RECHARGE_API_URL`: Recharge API URL (defaults to https://api.rechargeapps.com)
- `NODE_ENV`: Environment (defaults to production in Docker)
- `PORT`: Port to listen on (defaults to 3000)

#### Docker Troubleshooting
```bash
# View container logs
docker logs recharge-mcp-server

# Execute commands in running container
docker exec -it recharge-mcp-server sh

# Check container resource usage
docker stats recharge-mcp-server

# Restart container
docker restart recharge-mcp-server
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Railway
```bash
npm install -g @railway/cli
railway deploy
```

### Render
Connect your GitHub repository to Render and it will auto-deploy.

### Fly.io
```bash
flyctl deploy
```

### Kubernetes

#### Prerequisites
- Kubernetes cluster (local or cloud)
- kubectl configured and connected to your cluster
- Docker image built and available to your cluster

#### Quick Deployment
```bash
# Build and tag the Docker image
docker build -t recharge-mcp-server:v1.1.0 .

# If using a remote registry, push the image
# docker tag recharge-mcp-server:v1.1.0 your-registry/recharge-mcp-server:v1.1.0
# docker push your-registry/recharge-mcp-server:v1.1.0

# Set your API key
export RECHARGE_API_KEY=your_api_key_here

# Deploy to Kubernetes
./scripts/k8s-deploy.sh

# Deploy with ingress (for external access)
./scripts/k8s-deploy.sh production with-ingress
```

#### Manual Deployment
```bash
# Apply all manifests
kubectl apply -f k8s/

# Update secret with your API key
kubectl create secret generic recharge-mcp-secret \
  --from-literal=RECHARGE_API_KEY=your_api_key_here \
  -n recharge-mcp
```

#### Using Kustomize
```bash
# Deploy with kustomize
kubectl apply -k k8s/

# Deploy to different environment
kubectl apply -k k8s/ --namespace=recharge-mcp-staging
```

#### Kubernetes Configuration Files

The `k8s/` directory contains:
- `namespace.yaml` - Dedicated namespace for the application
- `configmap.yaml` - Non-sensitive configuration
- `secret.yaml` - Sensitive configuration (API keys)
- `deployment.yaml` - Main application deployment
- `service.yaml` - Internal service configuration
- `ingress.yaml` - External access configuration
- `hpa.yaml` - Horizontal Pod Autoscaler
- `networkpolicy.yaml` - Network security policies
- `kustomization.yaml` - Kustomize configuration

#### Kubernetes Features
- **High Availability**: 2+ replicas with rolling updates
- **Auto-scaling**: HPA based on CPU/memory usage (2-10 pods)
- **Health Checks**: Liveness and readiness probes
- **Security**: Non-root containers, network policies, resource limits
- **Monitoring**: Prometheus annotations for metrics collection
- **SSL/TLS**: Automatic certificate management with cert-manager
- **Resource Management**: CPU/memory requests and limits
- **Graceful Shutdown**: Proper termination handling

#### Kubernetes Management Commands
```bash
# View deployment status
kubectl get deployments -n recharge-mcp

# View pods
kubectl get pods -n recharge-mcp

# View logs
kubectl logs -f deployment/recharge-mcp-server -n recharge-mcp

# Scale deployment
kubectl scale deployment recharge-mcp-server --replicas=5 -n recharge-mcp

# Port forward for local access
kubectl port-forward service/recharge-mcp-service 8080:80 -n recharge-mcp

# Update deployment image
kubectl set image deployment/recharge-mcp-server \
  recharge-mcp-server=recharge-mcp-server:v1.2.0 -n recharge-mcp

# Rollback deployment
kubectl rollout undo deployment/recharge-mcp-server -n recharge-mcp

# Clean up everything
./scripts/k8s-cleanup.sh
```

#### Kubernetes Troubleshooting
```bash
# Check pod status and events
kubectl describe pods -n recharge-mcp

# Check deployment events
kubectl describe deployment recharge-mcp-server -n recharge-mcp

# Check service endpoints
kubectl get endpoints -n recharge-mcp

# Test connectivity from within cluster
kubectl run test-pod --image=curlimages/curl -it --rm -- \
  curl http://recharge-mcp-service.recharge-mcp.svc.cluster.local/health

# Check resource usage
kubectl top pods -n recharge-mcp
kubectl top nodes
```

#### Production Considerations for Kubernetes
- **Image Registry**: Use a private registry for production images
- **Secrets Management**: Consider using external secret management (Vault, AWS Secrets Manager)
- **Monitoring**: Deploy Prometheus and Grafana for comprehensive monitoring
- **Logging**: Use centralized logging (ELK stack, Fluentd)
- **Backup**: Regular backups of configurations and persistent data
- **Security**: Regular security scans and updates
- **Resource Limits**: Set appropriate CPU/memory limits based on load testing
- **Network Policies**: Implement strict network segmentation
- **RBAC**: Use Role-Based Access Control for cluster security

### Environment Variables
All deployment platforms require:
- `RECHARGE_API_KEY`: Your Recharge API key
- `RECHARGE_API_URL`: Recharge API URL (defaults to https://api.rechargeapps.com)
- `NODE_ENV`: Set to "production" for production deployments

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

#### Get Single Subscription
```json
{
  "tool": "recharge_get_subscription",
  "arguments": {
    "subscription_id": "456789"
  }
}
```

#### Update Subscription
```json
{
  "tool": "recharge_update_subscription",
  "arguments": {
    "subscription_id": "456789",
    "quantity": 3,
    "order_interval_frequency": "2",
    "next_charge_scheduled_at": "2024-03-01T00:00:00Z"
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

#### Activate Subscription
```json
{
  "tool": "recharge_activate_subscription",
  "arguments": {
    "subscription_id": "456789"
  }
}
```

### Product Management

#### Get Products
```json
{
  "tool": "recharge_get_products",
  "arguments": {
    "limit": 50,
    "title": "Coffee Subscription"
  }
}
```

#### Get Single Product
```json
{
  "tool": "recharge_get_product",
  "arguments": {
    "product_id": "987654"
  }
}
```

### Order Management

#### Get Orders
```json
{
  "tool": "recharge_get_orders",
  "arguments": {
    "limit": 20,
    "customer_id": "123456",
    "status": "success",
    "created_at_min": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Single Order
```json
{
  "tool": "recharge_get_order",
  "arguments": {
    "order_id": "111222"
  }
}
```

### Charge Management

#### Get Charges
```json
{
  "tool": "recharge_get_charges",
  "arguments": {
    "limit": 30,
    "customer_id": "123456",
    "subscription_id": "456789",
    "status": "success"
  }
}
```

#### Get Single Charge
```json
{
  "tool": "recharge_get_charge",
  "arguments": {
    "charge_id": "333444"
  }
}
```

### Address Management

#### Get Addresses
```json
{
  "tool": "recharge_get_addresses",
  "arguments": {
    "limit": 15,
    "customer_id": "123456"
  }
}
```

#### Get Single Address
```json
{
  "tool": "recharge_get_address",
  "arguments": {
    "address_id": "789012"
  }
}
```

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

#### Update Address
```json
{
  "tool": "recharge_update_address",
  "arguments": {
    "address_id": "789012",
    "address1": "456 Oak Ave",
    "city": "Los Angeles",
    "province": "CA",
    "zip": "90210"
  }
}
```

### Discount Management

#### Get Discounts
```json
{
  "tool": "recharge_get_discounts",
  "arguments": {
    "limit": 25,
    "status": "enabled"
  }
}
```

#### Get Single Discount
```json
{
  "tool": "recharge_get_discount",
  "arguments": {
    "discount_id": "555666"
  }
}
```

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

#### Update Discount
```json
{
  "tool": "recharge_update_discount",
  "arguments": {
    "discount_id": "555666",
    "value": 25,
    "usage_limit": 50,
    "status": "disabled"
  }
}
```

#### Delete Discount
```json
{
  "tool": "recharge_delete_discount",
  "arguments": {
    "discount_id": "555666"
  }
}
```

### Metafield Management

#### Get Metafields
```json
{
  "tool": "recharge_get_metafields",
  "arguments": {
    "limit": 20,
    "owner_resource": "customer",
    "owner_id": "123456"
  }
}
```

#### Get Single Metafield
```json
{
  "tool": "recharge_get_metafield",
  "arguments": {
    "metafield_id": "777888"
  }
}
```

#### Create Metafield
```json
{
  "tool": "recharge_create_metafield",
  "arguments": {
    "namespace": "custom",
    "key": "preferred_delivery_time",
    "value": "morning",
    "value_type": "string",
    "owner_resource": "customer",
    "owner_id": "123456"
  }
}
```

#### Update Metafield
```json
{
  "tool": "recharge_update_metafield",
  "arguments": {
    "metafield_id": "777888",
    "value": "evening",
    "key": "preferred_delivery_time"
  }
}
```

#### Delete Metafield
```json
{
  "tool": "recharge_delete_metafield",
  "arguments": {
    "metafield_id": "777888"
  }
}
```

### Webhook Management

#### Get Webhooks
```json
{
  "tool": "recharge_get_webhooks",
  "arguments": {
    "limit": 10
  }
}
```

#### Get Single Webhook
```json
{
  "tool": "recharge_get_webhook",
  "arguments": {
    "webhook_id": "999000"
  }
}
```

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

#### Update Webhook
```json
{
  "tool": "recharge_update_webhook",
  "arguments": {
    "webhook_id": "999000",
    "address": "https://myapp.com/webhooks/recharge/v2",
    "topic": "subscription/updated"
  }
}
```

#### Delete Webhook
```json
{
  "tool": "recharge_delete_webhook",
  "arguments": {
    "webhook_id": "999000"
  }
}
```

### Payment Method Management

#### Get Payment Methods
```json
{
  "tool": "recharge_get_payment_methods",
  "arguments": {
    "limit": 15,
    "customer_id": "123456"
  }
}
```

#### Get Single Payment Method
```json
{
  "tool": "recharge_get_payment_method",
  "arguments": {
    "payment_method_id": "111333"
  }
}
```

#### Update Payment Method
```json
{
  "tool": "recharge_update_payment_method",
  "arguments": {
    "payment_method_id": "111333",
    "billing_address": {
      "first_name": "Jane",
      "last_name": "Smith",
      "address1": "789 Pine St",
      "city": "Seattle",
      "province": "WA",
      "country_code": "US",
      "zip": "98101"
    }
  }
}
```

### Checkout Management

#### Get Checkouts
```json
{
  "tool": "recharge_get_checkouts",
  "arguments": {
    "limit": 20
  }
}
```

#### Get Single Checkout
```json
{
  "tool": "recharge_get_checkout",
  "arguments": {
    "checkout_token": "abc123def456"
  }
}
```

#### Create Checkout
```json
{
  "tool": "recharge_create_checkout",
  "arguments": {
    "line_items": [
      {
        "variant_id": "345678",
        "quantity": 2
      },
      {
        "variant_id": "987654",
        "quantity": 1
      }
    ],
    "email": "customer@example.com"
  }
}
```

#### Update Checkout
```json
{
  "tool": "recharge_update_checkout",
  "arguments": {
    "checkout_token": "abc123def456",
    "line_items": [
      {
        "variant_id": "345678",
        "quantity": 3
      }
    ],
    "email": "updated@example.com"
  }
}
```

#### Process Checkout
```json
{
  "tool": "recharge_process_checkout",
  "arguments": {
    "checkout_token": "abc123def456"
  }
}
```

### One-time Product Management

#### Get One-time Products
```json
{
  "tool": "recharge_get_onetimes",
  "arguments": {
    "limit": 25,
    "address_id": "789012"
  }
}
```

#### Get Single One-time Product
```json
{
  "tool": "recharge_get_onetime",
  "arguments": {
    "onetime_id": "222444"
  }
}
```

#### Create One-time Product
```json
{
  "tool": "recharge_create_onetime",
  "arguments": {
    "address_id": "789012",
    "next_charge_scheduled_at": "2024-02-15T00:00:00Z",
    "product_title": "Special Edition Coffee",
    "variant_title": "Medium Roast",
    "price": "24.99",
    "quantity": 1,
    "shopify_variant_id": "567890"
  }
}
```

#### Update One-time Product
```json
{
  "tool": "recharge_update_onetime",
  "arguments": {
    "onetime_id": "222444",
    "quantity": 2,
    "price": "19.99",
    "next_charge_scheduled_at": "2024-03-01T00:00:00Z"
  }
}
```

#### Delete One-time Product
```json
{
  "tool": "recharge_delete_onetime",
  "arguments": {
    "onetime_id": "222444"
  }
}
```

### Store Credit Management

#### Get Store Credits
```json
{
  "tool": "recharge_get_store_credits",
  "arguments": {
    "limit": 30,
    "customer_id": "123456"
  }
}
```

#### Get Single Store Credit
```json
{
  "tool": "recharge_get_store_credit",
  "arguments": {
    "store_credit_id": "666777"
  }
}
```

#### Create Store Credit
```json
{
  "tool": "recharge_create_store_credit",
  "arguments": {
    "amount": "50.00",
    "customer_id": "123456",
    "note": "Refund for damaged product"
  }
}
```

#### Update Store Credit
```json
{
  "tool": "recharge_update_store_credit",
  "arguments": {
    "store_credit_id": "666777",
    "amount": "75.00",
    "note": "Updated refund amount"
  }
}
```

### Charge Actions

#### Skip Charge
```json
{
  "tool": "recharge_skip_charge",
  "arguments": {
    "charge_id": "333444"
  }
}
```

#### Process Charge
```json
{
  "tool": "recharge_process_charge",
  "arguments": {
    "charge_id": "333444"
  }
}
```

#### Unskip Charge
```json
{
  "tool": "recharge_unskip_charge",
  "arguments": {
    "charge_id": "333444"
  }
}
```

#### Delay Charge
```json
{
  "tool": "recharge_delay_charge",
  "arguments": {
    "charge_id": "333444",
    "date": "2024-03-15T00:00:00Z"
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

### Subscription Actions

#### Skip Subscription Charge
```json
{
  "tool": "recharge_skip_subscription_charge",
  "arguments": {
    "subscription_id": "456789",
    "charge_date": "2024-02-01T00:00:00Z"
  }
}
```

#### Unskip Subscription Charge
```json
{
  "tool": "recharge_unskip_subscription_charge",
  "arguments": {
    "subscription_id": "456789",
    "charge_date": "2024-02-01T00:00:00Z"
  }
}
```

### Shop Information

#### Get Shop
```json
{
  "tool": "recharge_get_shop",
  "arguments": {}
}
```

### Collection Management

#### Get Collections
```json
{
  "tool": "recharge_get_collections",
  "arguments": {
    "limit": 40
  }
}
```

#### Get Single Collection
```json
{
  "tool": "recharge_get_collection",
  "arguments": {
    "collection_id": "888999"
  }
}
```

### Analytics

#### Get Subscription Analytics
```json
{
  "tool": "recharge_get_subscription_analytics",
  "arguments": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

#### Get Customer Analytics
```json
{
  "tool": "recharge_get_customer_analytics",
  "arguments": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

### Order Actions

#### Update Order
```json
{
  "tool": "recharge_update_order",
  "arguments": {
    "order_id": "111222",
    "note": "Updated order note",
    "shipping_address": {
      "first_name": "Jane",
      "last_name": "Smith",
      "address1": "456 Oak Ave",
      "city": "Los Angeles",
      "province": "CA",
      "country_code": "US",
      "zip": "90210"
    }
  }
}
```

#### Delete Order
```json
{
  "tool": "recharge_delete_order",
  "arguments": {
    "order_id": "111222"
  }
}
```

#### Clone Order
```json
{
  "tool": "recharge_clone_order",
  "arguments": {
    "order_id": "111222"
  }
}
```

### Customer Portal Management

#### Get Customer Portal Session
```json
{
  "tool": "recharge_get_customer_portal_session",
  "arguments": {
    "customer_id": "123456"
  }
}
```

#### Create Customer Portal Session
```json
{
  "tool": "recharge_create_customer_portal_session",
  "arguments": {
    "customer_id": "123456",
    "return_url": "https://mystore.com/account"
  }
}
```

### Bundle Selection Management

#### Get Bundle Selections
```json
{
  "tool": "recharge_get_bundle_selections",
  "arguments": {
    "limit": 25,
    "subscription_id": "456789"
  }
}
```

#### Get Single Bundle Selection
```json
{
  "tool": "recharge_get_bundle_selection",
  "arguments": {
    "bundle_selection_id": "999888"
  }
}
```

#### Create Bundle Selection
```json
{
  "tool": "recharge_create_bundle_selection",
  "arguments": {
    "subscription_id": "456789",
    "external_product_id": "prod_123",
    "external_variant_id": "var_456",
    "quantity": 2
  }
}
```

#### Update Bundle Selection
```json
{
  "tool": "recharge_update_bundle_selection",
  "arguments": {
    "bundle_selection_id": "999888",
    "quantity": 3
  }
}
```

#### Delete Bundle Selection
```json
{
  "tool": "recharge_delete_bundle_selection",
  "arguments": {
    "bundle_selection_id": "999888"
  }
}
```

### Retention Strategy Management

#### Get Retention Strategies
```json
{
  "tool": "recharge_get_retention_strategies",
  "arguments": {
    "limit": 20
  }
}
```

#### Get Single Retention Strategy
```json
{
  "tool": "recharge_get_retention_strategy",
  "arguments": {
    "retention_strategy_id": "ret_123"
  }
}
```

### Async Batch Management

#### Get Async Batches
```json
{
  "tool": "recharge_get_async_batches",
  "arguments": {
    "limit": 15
  }
}
```

#### Get Single Async Batch
```json
{
  "tool": "recharge_get_async_batch",
  "arguments": {
    "async_batch_id": "batch_456"
  }
}
```

#### Create Async Batch
```json
{
  "tool": "recharge_create_async_batch",
  "arguments": {
    "batch_type": "subscription_update",
    "requests": [
      {
        "method": "PUT",
        "path": "/subscriptions/123",
        "body": {
          "quantity": 2
        }
      },
      {
        "method": "PUT",
        "path": "/subscriptions/456",
        "body": {
          "quantity": 3
        }
      }
    ]
  }
}
```

### Notification Management

#### Get Notifications
```json
{
  "tool": "recharge_get_notifications",
  "arguments": {
    "limit": 30,
    "customer_id": "123456"
  }
}
```

#### Get Single Notification
```json
{
  "tool": "recharge_get_notification",
  "arguments": {
    "notification_id": "notif_789"
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

### Validation Error Response
```json
{
  "content": [
    {
      "type": "text",
      "text": "Error creating customer: Missing required fields: email"
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

1. **Use pagination** for large datasets to avoid timeouts
2. **Filter by customer_id** when possible to reduce response size
3. **Use date ranges** for analytics and reporting queries
4. **Handle errors gracefully** - check the `isError` field in responses
5. **Validate required fields** before making tool calls
6. **Use specific IDs** when retrieving individual resources for better performance
7. **Monitor rate limits** - Recharge has API rate limits that vary by plan
8. **Use async batches** for bulk operations to improve performance
9. **Implement proper error handling** for network timeouts and API errors
10. **Cache frequently accessed data** like product information to reduce API calls
11. **Use webhooks** for real-time updates instead of polling
12. **Implement retry logic** for transient failures
13. **Log API calls** for debugging and monitoring
14. **Use environment variables** for sensitive configuration
15. **Test with sandbox data** before production deployment
16. **Validate input parameters** before sending requests to avoid API errors
17. **Use proper date formats** (ISO 8601) for all date fields
18. **Check response status** and handle different error types appropriately
19. **Implement circuit breakers** for high-volume applications
20. **Use connection pooling** for better performance in production
