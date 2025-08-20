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

    this.toolHandlers = new RechargeToolHandlers();
    this.setupToolHandlers();
    this.setupErrorHandling();
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

      try {
        switch (name) {
          // Customer tools
          case 'recharge_get_customers':
            return await this.toolHandlers.handleGetCustomers(args);
          case 'recharge_get_customer':
            return await this.toolHandlers.handleGetCustomer(args);
          case 'recharge_update_customer':
            return await this.toolHandlers.handleUpdateCustomer(args);
          case 'recharge_create_customer':
            return await this.toolHandlers.handleCreateCustomer(args);

          // Subscription tools
          case 'recharge_get_subscriptions':
            return await this.toolHandlers.handleGetSubscriptions(args);
          case 'recharge_create_subscription':
            return await this.toolHandlers.handleCreateSubscription(args);
          case 'recharge_get_subscription':
            return await this.toolHandlers.handleGetSubscription(args);
          case 'recharge_update_subscription':
            return await this.toolHandlers.handleUpdateSubscription(args);
          case 'recharge_cancel_subscription':
            return await this.toolHandlers.handleCancelSubscription(args);
          case 'recharge_activate_subscription':
            return await this.toolHandlers.handleActivateSubscription(args);

          // Product tools
          case 'recharge_get_products':
            return await this.toolHandlers.handleGetProducts(args);
          case 'recharge_get_product':
            return await this.toolHandlers.handleGetProduct(args);

          // Order tools
          case 'recharge_get_orders':
            return await this.toolHandlers.handleGetOrders(args);
          case 'recharge_get_order':
            return await this.toolHandlers.handleGetOrder(args);

          // Charge tools
          case 'recharge_get_charges':
            return await this.toolHandlers.handleGetCharges(args);
          case 'recharge_get_charge':
            return await this.toolHandlers.handleGetCharge(args);

          // Address tools
          case 'recharge_get_addresses':
            return await this.toolHandlers.handleGetAddresses(args);
          case 'recharge_get_address':
            return await this.toolHandlers.handleGetAddress(args);
          case 'recharge_update_address':
            return await this.toolHandlers.handleUpdateAddress(args);
          case 'recharge_create_address':
            return await this.toolHandlers.handleCreateAddress(args);

          // Discount tools
          case 'recharge_get_discounts':
            return await this.toolHandlers.handleGetDiscounts(args);
          case 'recharge_get_discount':
            return await this.toolHandlers.handleGetDiscount(args);
          case 'recharge_update_discount':
            return await this.toolHandlers.handleUpdateDiscount(args);
          case 'recharge_delete_discount':
            return await this.toolHandlers.handleDeleteDiscount(args);
          case 'recharge_create_discount':
            return await this.toolHandlers.handleCreateDiscount(args);

          // Metafield tools
          case 'recharge_get_metafields':
            return await this.toolHandlers.handleGetMetafields(args);
          case 'recharge_get_metafield':
            return await this.toolHandlers.handleGetMetafield(args);
          case 'recharge_update_metafield':
            return await this.toolHandlers.handleUpdateMetafield(args);
          case 'recharge_delete_metafield':
            return await this.toolHandlers.handleDeleteMetafield(args);
          case 'recharge_create_metafield':
            return await this.toolHandlers.handleCreateMetafield(args);

          // Webhook tools
          case 'recharge_get_webhooks':
            return await this.toolHandlers.handleGetWebhooks(args);
          case 'recharge_get_webhook':
            return await this.toolHandlers.handleGetWebhook(args);
          case 'recharge_update_webhook':
            return await this.toolHandlers.handleUpdateWebhook(args);
          case 'recharge_delete_webhook':
            return await this.toolHandlers.handleDeleteWebhook(args);
          case 'recharge_create_webhook':
            return await this.toolHandlers.handleCreateWebhook(args);

          // Payment method tools
          case 'recharge_get_payment_methods':
            return await this.toolHandlers.handleGetPaymentMethods(args);
          case 'recharge_get_payment_method':
            return await this.toolHandlers.handleGetPaymentMethod(args);
          case 'recharge_update_payment_method':
            return await this.toolHandlers.handleUpdatePaymentMethod(args);

          // Checkout tools
          case 'recharge_get_checkouts':
            return await this.toolHandlers.handleGetCheckouts(args);
          case 'recharge_get_checkout':
            return await this.toolHandlers.handleGetCheckout(args);
          case 'recharge_update_checkout':
            return await this.toolHandlers.handleUpdateCheckout(args);
          case 'recharge_process_checkout':
            return await this.toolHandlers.handleProcessCheckout(args);
          case 'recharge_create_checkout':
            return await this.toolHandlers.handleCreateCheckout(args);

          // Onetime tools
          case 'recharge_get_onetimes':
            return await this.toolHandlers.handleGetOnetimes(args);
          case 'recharge_get_onetime':
            return await this.toolHandlers.handleGetOnetime(args);
          case 'recharge_update_onetime':
            return await this.toolHandlers.handleUpdateOnetime(args);
          case 'recharge_delete_onetime':
            return await this.toolHandlers.handleDeleteOnetime(args);
          case 'recharge_create_onetime':
            return await this.toolHandlers.handleCreateOnetime(args);

          // Store credit tools
          case 'recharge_get_store_credits':
            return await this.toolHandlers.handleGetStoreCredits(args);
          case 'recharge_get_store_credit':
            return await this.toolHandlers.handleGetStoreCredit(args);
          case 'recharge_update_store_credit':
            return await this.toolHandlers.handleUpdateStoreCredit(args);
          case 'recharge_create_store_credit':
            return await this.toolHandlers.handleCreateStoreCredit(args);

          // Charge action tools
          case 'recharge_skip_charge':
            return await this.toolHandlers.handleSkipCharge(args);
          case 'recharge_process_charge':
            return await this.toolHandlers.handleProcessCharge(args);
          case 'recharge_unskip_charge':
            return await this.toolHandlers.handleUnskipCharge(args);
          case 'recharge_delay_charge':
            return await this.toolHandlers.handleDelayCharge(args);
          case 'recharge_refund_charge':
            return await this.toolHandlers.handleRefundCharge(args);

          // Subscription action tools
          case 'recharge_skip_subscription_charge':
            return await this.toolHandlers.handleSkipSubscriptionCharge(args);
          case 'recharge_unskip_subscription_charge':
            return await this.toolHandlers.handleUnskipSubscriptionCharge(args);

          // Shop tools
          case 'recharge_get_shop':
            return await this.toolHandlers.handleGetShop(args);

          // Collection tools
          case 'recharge_get_collections':
            return await this.toolHandlers.handleGetCollections(args);
          case 'recharge_get_collection':
            return await this.toolHandlers.handleGetCollection(args);

          // Analytics tools
          case 'recharge_get_subscription_analytics':
            return await this.toolHandlers.handleGetSubscriptionAnalytics(args);
          case 'recharge_get_customer_analytics':
            return await this.toolHandlers.handleGetCustomerAnalytics(args);

          // Order action tools
          case 'recharge_update_order':
            return await this.toolHandlers.handleUpdateOrder(args);
          case 'recharge_delete_order':
            return await this.toolHandlers.handleDeleteOrder(args);
          case 'recharge_clone_order':
            return await this.toolHandlers.handleCloneOrder(args);

          // Customer portal tools
          case 'recharge_get_customer_portal_session':
            return await this.toolHandlers.handleGetCustomerPortalSession(args);
          case 'recharge_create_customer_portal_session':
            return await this.toolHandlers.handleCreateCustomerPortalSession(args);

          // Bundle selection tools
          case 'recharge_get_bundle_selections':
            return await this.toolHandlers.handleGetBundleSelections(args);
          case 'recharge_get_bundle_selection':
            return await this.toolHandlers.handleGetBundleSelection(args);
          case 'recharge_create_bundle_selection':
            return await this.toolHandlers.handleCreateBundleSelection(args);
          case 'recharge_update_bundle_selection':
            return await this.toolHandlers.handleUpdateBundleSelection(args);
          case 'recharge_delete_bundle_selection':
            return await this.toolHandlers.handleDeleteBundleSelection(args);

          // Retention strategy tools
          case 'recharge_get_retention_strategies':
            return await this.toolHandlers.handleGetRetentionStrategies(args);
          case 'recharge_get_retention_strategy':
            return await this.toolHandlers.handleGetRetentionStrategy(args);

          // Async batch tools
          case 'recharge_get_async_batches':
            return await this.toolHandlers.handleGetAsyncBatches(args);
          case 'recharge_get_async_batch':
            return await this.toolHandlers.handleGetAsyncBatch(args);
          case 'recharge_create_async_batch':
            return await this.toolHandlers.handleCreateAsyncBatch(args);

          // Notification tools
          case 'recharge_get_notifications':
            return await this.toolHandlers.handleGetNotifications(args);
          case 'recharge_get_notification':
            return await this.toolHandlers.handleGetNotification(args);

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
  if (event.path === '/health') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(healthCheck())
    };
  }
  
  // For MCP, we typically use stdio, but this allows HTTP deployment
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Recharge MCP Server - Use stdio transport for MCP communication'
  };
};

// Start the server
if (!process.env.NETLIFY && import.meta.url === `file://${process.argv[1]}`) {
  const server = new RechargeServer();
  server.run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}