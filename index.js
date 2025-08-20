#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { RechargeToolHandlers } from './src/tool-handlers.js';
import * as tools from './src/tools.js';

// Health check endpoint for deployment platforms
const healthCheck = () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  };
};

/**
 * Recharge MCP Server
 * 
 * This server provides tools for interacting with the Recharge API,
 * allowing management of subscriptions, customers, orders, charges, and more.
 */
class RechargeServer {
  constructor() {
    this.server = new Server(
      {
        name: 'recharge-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize with default handlers (using env var)
    this.toolHandlers = new RechargeToolHandlers();
    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  // Method to create handlers with specific API key
  createHandlersWithApiKey(apiKey) {
    return new RechargeToolHandlers(apiKey);
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          // Customer tools
          tools.getCustomersSchema,
          tools.getCustomerSchema,
          tools.updateCustomerSchema,
          tools.createCustomerSchema,

          // Subscription tools
          tools.getSubscriptionsSchema,
          tools.createSubscriptionSchema,
          tools.getSubscriptionSchema,
          tools.updateSubscriptionSchema,
          tools.cancelSubscriptionSchema,
          tools.activateSubscriptionSchema,

          // Product tools
          tools.getProductsSchema,
          tools.getProductSchema,

          // Order tools
          tools.getOrdersSchema,
          tools.getOrderSchema,

          // Charge tools
          tools.getChargesSchema,
          tools.getChargeSchema,

          // Address tools
          tools.getAddressesSchema,
          tools.getAddressSchema,
          tools.updateAddressSchema,
          tools.createAddressSchema,

          // Discount tools
          tools.getDiscountsSchema,
          tools.getDiscountSchema,
          tools.updateDiscountSchema,
          tools.deleteDiscountSchema,
          tools.createDiscountSchema,

          // Metafield tools
          tools.getMetafieldsSchema,
          tools.getMetafieldSchema,
          tools.updateMetafieldSchema,
          tools.deleteMetafieldSchema,
          tools.createMetafieldSchema,

          // Webhook tools
          tools.getWebhooksSchema,
          tools.getWebhookSchema,
          tools.updateWebhookSchema,
          tools.deleteWebhookSchema,
          tools.createWebhookSchema,

          // Payment method tools
          tools.getPaymentMethodsSchema,
          tools.getPaymentMethodSchema,
          tools.updatePaymentMethodSchema,

          // Checkout tools
          tools.getCheckoutsSchema,
          tools.getCheckoutSchema,
          tools.updateCheckoutSchema,
          tools.processCheckoutSchema,
          tools.createCheckoutSchema,

          // Onetime tools
          tools.getOnetimesSchema,
          tools.getOnetimeSchema,
          tools.updateOnetimeSchema,
          tools.deleteOnetimeSchema,
          tools.createOnetimeSchema,

          // Store credit tools
          tools.getStoreCreditsSchema,
          tools.getStoreCreditSchema,
          tools.updateStoreCreditSchema,
          tools.createStoreCreditSchema,

          // Charge action tools
          tools.skipChargeSchema,
          tools.processChargeSchema,
          tools.unskipChargeSchema,
          tools.delayChargeSchema,
          tools.refundChargeSchema,

          // Subscription action tools
          tools.skipSubscriptionChargeSchema,
          tools.unskipSubscriptionChargeSchema,

          // Shop tools
          tools.getShopSchema,

          // Collection tools
          tools.getCollectionsSchema,
          tools.getCollectionSchema,

          // Analytics tools
          tools.getSubscriptionAnalyticsSchema,
          tools.getCustomerAnalyticsSchema,

          // Order action tools
          tools.updateOrderSchema,
          tools.deleteOrderSchema,
          tools.cloneOrderSchema,

          // Customer portal tools
          tools.getCustomerPortalSessionSchema,
          tools.createCustomerPortalSessionSchema,

          // Bundle selection tools
          tools.getBundleSelectionsSchema,
          tools.getBundleSelectionSchema,
          tools.createBundleSelectionSchema,
          tools.updateBundleSelectionSchema,
          tools.deleteBundleSelectionSchema,

          // Retention strategy tools
          tools.getRetentionStrategiesSchema,
          tools.getRetentionStrategySchema,

          // Async batch tools
          tools.getAsyncBatchesSchema,
          tools.getAsyncBatchSchema,
          tools.createAsyncBatchSchema,

          // Notification tools
          tools.getNotificationsSchema,
          tools.getNotificationSchema,
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      // Check if API key is provided in arguments
      let handlers = this.toolHandlers;
      if (args && args.api_key) {
        // Create new handlers with the provided API key
        const { api_key, ...cleanArgs } = args;
        handlers = this.createHandlersWithApiKey(api_key);
        // Update args to remove api_key before passing to handlers
        request.params.arguments = cleanArgs;
      }

      try {
        switch (name) {
          // Customer tools
          case 'recharge_get_customers':
            return await handlers.handleGetCustomers(request.params.arguments);
          case 'recharge_get_customer':
            return await handlers.handleGetCustomer(request.params.arguments);
          case 'recharge_update_customer':
            return await handlers.handleUpdateCustomer(request.params.arguments);
          case 'recharge_create_customer':
            return await handlers.handleCreateCustomer(request.params.arguments);

          // Subscription tools
          case 'recharge_get_subscriptions':
            return await handlers.handleGetSubscriptions(request.params.arguments);
          case 'recharge_create_subscription':
            return await handlers.handleCreateSubscription(request.params.arguments);
          case 'recharge_get_subscription':
            return await handlers.handleGetSubscription(request.params.arguments);
          case 'recharge_update_subscription':
            return await handlers.handleUpdateSubscription(request.params.arguments);
          case 'recharge_cancel_subscription':
            return await handlers.handleCancelSubscription(request.params.arguments);
          case 'recharge_activate_subscription':
            return await handlers.handleActivateSubscription(request.params.arguments);

          // Product tools
          case 'recharge_get_products':
            return await handlers.handleGetProducts(request.params.arguments);
          case 'recharge_get_product':
            return await handlers.handleGetProduct(request.params.arguments);

          // Order tools
          case 'recharge_get_orders':
            return await handlers.handleGetOrders(request.params.arguments);
          case 'recharge_get_order':
            return await handlers.handleGetOrder(request.params.arguments);

          // Charge tools
          case 'recharge_get_charges':
            return await handlers.handleGetCharges(request.params.arguments);
          case 'recharge_get_charge':
            return await handlers.handleGetCharge(request.params.arguments);

          // Address tools
          case 'recharge_get_addresses':
            return await handlers.handleGetAddresses(request.params.arguments);
          case 'recharge_get_address':
            return await handlers.handleGetAddress(request.params.arguments);
          case 'recharge_update_address':
            return await handlers.handleUpdateAddress(request.params.arguments);
          case 'recharge_create_address':
            return await handlers.handleCreateAddress(request.params.arguments);

          // Discount tools
          case 'recharge_get_discounts':
            return await handlers.handleGetDiscounts(request.params.arguments);
          case 'recharge_get_discount':
            return await handlers.handleGetDiscount(request.params.arguments);
          case 'recharge_update_discount':
            return await handlers.handleUpdateDiscount(request.params.arguments);
          case 'recharge_delete_discount':
            return await handlers.handleDeleteDiscount(request.params.arguments);
          case 'recharge_create_discount':
            return await handlers.handleCreateDiscount(request.params.arguments);

          // Metafield tools
          case 'recharge_get_metafields':
            return await handlers.handleGetMetafields(request.params.arguments);
          case 'recharge_get_metafield':
            return await handlers.handleGetMetafield(request.params.arguments);
          case 'recharge_update_metafield':
            return await handlers.handleUpdateMetafield(request.params.arguments);
          case 'recharge_delete_metafield':
            return await handlers.handleDeleteMetafield(request.params.arguments);
          case 'recharge_create_metafield':
            return await handlers.handleCreateMetafield(request.params.arguments);

          // Webhook tools
          case 'recharge_get_webhooks':
            return await handlers.handleGetWebhooks(request.params.arguments);
          case 'recharge_get_webhook':
            return await handlers.handleGetWebhook(request.params.arguments);
          case 'recharge_update_webhook':
            return await handlers.handleUpdateWebhook(request.params.arguments);
          case 'recharge_delete_webhook':
            return await handlers.handleDeleteWebhook(request.params.arguments);
          case 'recharge_create_webhook':
            return await handlers.handleCreateWebhook(request.params.arguments);

          // Payment method tools
          case 'recharge_get_payment_methods':
            return await handlers.handleGetPaymentMethods(request.params.arguments);
          case 'recharge_get_payment_method':
            return await handlers.handleGetPaymentMethod(request.params.arguments);
          case 'recharge_update_payment_method':
            return await handlers.handleUpdatePaymentMethod(request.params.arguments);

          // Checkout tools
          case 'recharge_get_checkouts':
            return await handlers.handleGetCheckouts(request.params.arguments);
          case 'recharge_get_checkout':
            return await handlers.handleGetCheckout(request.params.arguments);
          case 'recharge_update_checkout':
            return await handlers.handleUpdateCheckout(request.params.arguments);
          case 'recharge_process_checkout':
            return await handlers.handleProcessCheckout(request.params.arguments);
          case 'recharge_create_checkout':
            return await handlers.handleCreateCheckout(request.params.arguments);

          // Onetime tools
          case 'recharge_get_onetimes':
            return await handlers.handleGetOnetimes(request.params.arguments);
          case 'recharge_get_onetime':
            return await handlers.handleGetOnetime(request.params.arguments);
          case 'recharge_update_onetime':
            return await handlers.handleUpdateOnetime(request.params.arguments);
          case 'recharge_delete_onetime':
            return await handlers.handleDeleteOnetime(request.params.arguments);
          case 'recharge_create_onetime':
            return await handlers.handleCreateOnetime(request.params.arguments);

          // Store credit tools
          case 'recharge_get_store_credits':
            return await handlers.handleGetStoreCredits(request.params.arguments);
          case 'recharge_get_store_credit':
            return await handlers.handleGetStoreCredit(request.params.arguments);
          case 'recharge_update_store_credit':
            return await handlers.handleUpdateStoreCredit(request.params.arguments);
          case 'recharge_create_store_credit':
            return await handlers.handleCreateStoreCredit(request.params.arguments);

          // Charge action tools
          case 'recharge_skip_charge':
            return await handlers.handleSkipCharge(request.params.arguments);
          case 'recharge_process_charge':
            return await handlers.handleProcessCharge(request.params.arguments);
          case 'recharge_unskip_charge':
            return await handlers.handleUnskipCharge(request.params.arguments);
          case 'recharge_delay_charge':
            return await handlers.handleDelayCharge(request.params.arguments);
          case 'recharge_refund_charge':
            return await handlers.handleRefundCharge(request.params.arguments);

          // Subscription action tools
          case 'recharge_skip_subscription_charge':
            return await handlers.handleSkipSubscriptionCharge(request.params.arguments);
          case 'recharge_unskip_subscription_charge':
            return await handlers.handleUnskipSubscriptionCharge(request.params.arguments);

          // Shop tools
          case 'recharge_get_shop':
            return await handlers.handleGetShop(request.params.arguments);

          // Collection tools
          case 'recharge_get_collections':
            return await handlers.handleGetCollections(request.params.arguments);
          case 'recharge_get_collection':
            return await handlers.handleGetCollection(request.params.arguments);

          // Analytics tools
          case 'recharge_get_subscription_analytics':
            return await handlers.handleGetSubscriptionAnalytics(request.params.arguments);
          case 'recharge_get_customer_analytics':
            return await handlers.handleGetCustomerAnalytics(request.params.arguments);

          // Order action tools
          case 'recharge_update_order':
            return await handlers.handleUpdateOrder(request.params.arguments);
          case 'recharge_delete_order':
            return await handlers.handleDeleteOrder(request.params.arguments);
          case 'recharge_clone_order':
            return await handlers.handleCloneOrder(request.params.arguments);

          // Customer portal tools
          case 'recharge_get_customer_portal_session':
            return await handlers.handleGetCustomerPortalSession(request.params.arguments);
          case 'recharge_create_customer_portal_session':
            return await handlers.handleCreateCustomerPortalSession(request.params.arguments);

          // Bundle selection tools
          case 'recharge_get_bundle_selections':
            return await handlers.handleGetBundleSelections(request.params.arguments);
          case 'recharge_get_bundle_selection':
            return await handlers.handleGetBundleSelection(request.params.arguments);
          case 'recharge_create_bundle_selection':
            return await handlers.handleCreateBundleSelection(request.params.arguments);
          case 'recharge_update_bundle_selection':
            return await handlers.handleUpdateBundleSelection(request.params.arguments);
          case 'recharge_delete_bundle_selection':
            return await handlers.handleDeleteBundleSelection(request.params.arguments);

          // Retention strategy tools
          case 'recharge_get_retention_strategies':
            return await handlers.handleGetRetentionStrategies(request.params.arguments);
          case 'recharge_get_retention_strategy':
            return await handlers.handleGetRetentionStrategy(request.params.arguments);

          // Async batch tools
          case 'recharge_get_async_batches':
            return await handlers.handleGetAsyncBatches(request.params.arguments);
          case 'recharge_get_async_batch':
            return await handlers.handleGetAsyncBatch(request.params.arguments);
          case 'recharge_create_async_batch':
            return await handlers.handleCreateAsyncBatch(request.params.arguments);

          // Notification tools
          case 'recharge_get_notifications':
            return await handlers.handleGetNotifications(request.params.arguments);
          case 'recharge_get_notification':
            return await handlers.handleGetNotification(request.params.arguments);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });

    process.on('uncaughtException', (error) => {
      console.error('[Uncaught Exception]', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('[Unhandled Rejection]', reason, 'at', promise);
      // Don't exit in production for unhandled rejections
      if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Recharge MCP server running on stdio');
  }
}

// Export for serverless platforms
export const handler = async (event, context) => {
  // Handle different serverless platform event formats
  const path = event.path || event.rawPath || event.url || '/';
  
  if (path === '/health' || path.includes('/health')) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(healthCheck())
    };
  }
  
  // Handle API routes
  if (path.startsWith('/api/')) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Recharge MCP Server API',
        version: '1.1.0',
        endpoints: ['/health']
      })
    };
  }
  
  // Default response for MCP server
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Recharge MCP Server',
      description: 'Use stdio transport for MCP communication',
      version: '1.1.0'
    })
  };
};

// Start the server
if (!process.env.NETLIFY && import.meta.url === new URL(process.argv[1], import.meta.url).href) {
  const server = new RechargeServer();
  server.run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}