#!/usr/bin/env node

/**
 * Recharge MCP Server
 * 
 * A comprehensive Model Context Protocol (MCP) server for the Recharge API v2021-11.
 * Provides 70+ tools for managing subscriptions, customers, orders, charges, and more.
 * 
 * @version 1.1.0
 * @author Recharge MCP Server Team
 * @license MIT
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { RechargeToolHandlers } from './src/tool-handlers.js';
import * as tools from './src/tools/index.js';

/**
 * Recharge MCP Server
 * 
 * Provides comprehensive access to the Recharge API v2021-11 through MCP tools.
 * Supports flexible API key configuration and robust error handling.
 */
class RechargeServer {
  constructor() {
    this.server = new Server(
      {
        name: 'recharge-mcp-server',
        version: '1.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize handlers without requiring API key upfront
    this.toolHandlers = new RechargeToolHandlers(process.env.RECHARGE_API_KEY);
    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  /**
   * Set up all tool handlers and request handlers
   */

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
            return await this.toolHandlers.handleGetCustomers(request.params.arguments);
          case 'recharge_get_customer':
            return await this.toolHandlers.handleGetCustomer(request.params.arguments);
          case 'recharge_update_customer':
            return await this.toolHandlers.handleUpdateCustomer(request.params.arguments);
          case 'recharge_create_customer':
            return await this.toolHandlers.handleCreateCustomer(request.params.arguments);

          // Subscription tools
          case 'recharge_get_subscriptions':
            return await this.toolHandlers.handleGetSubscriptions(request.params.arguments);
          case 'recharge_create_subscription':
            return await this.toolHandlers.handleCreateSubscription(request.params.arguments);
          case 'recharge_get_subscription':
            return await this.toolHandlers.handleGetSubscription(request.params.arguments);
          case 'recharge_update_subscription':
            return await this.toolHandlers.handleUpdateSubscription(request.params.arguments);
          case 'recharge_cancel_subscription':
            return await this.toolHandlers.handleCancelSubscription(request.params.arguments);
          case 'recharge_activate_subscription':
            return await this.toolHandlers.handleActivateSubscription(request.params.arguments);

          // Product tools
          case 'recharge_get_products':
            return await this.toolHandlers.handleGetProducts(request.params.arguments);
          case 'recharge_get_product':
            return await this.toolHandlers.handleGetProduct(request.params.arguments);

          // Order tools
          case 'recharge_get_orders':
            return await this.toolHandlers.handleGetOrders(request.params.arguments);
          case 'recharge_get_order':
            return await this.toolHandlers.handleGetOrder(request.params.arguments);

          // Charge tools
          case 'recharge_get_charges':
            return await this.toolHandlers.handleGetCharges(request.params.arguments);
          case 'recharge_get_charge':
            return await this.toolHandlers.handleGetCharge(request.params.arguments);

          // Address tools
          case 'recharge_get_addresses':
            return await this.toolHandlers.handleGetAddresses(request.params.arguments);
          case 'recharge_get_address':
            return await this.toolHandlers.handleGetAddress(request.params.arguments);
          case 'recharge_update_address':
            return await this.toolHandlers.handleUpdateAddress(request.params.arguments);
          case 'recharge_create_address':
            return await this.toolHandlers.handleCreateAddress(request.params.arguments);

          // Discount tools
          case 'recharge_get_discounts':
            return await this.toolHandlers.handleGetDiscounts(request.params.arguments);
          case 'recharge_get_discount':
            return await this.toolHandlers.handleGetDiscount(request.params.arguments);
          case 'recharge_update_discount':
            return await this.toolHandlers.handleUpdateDiscount(request.params.arguments);
          case 'recharge_delete_discount':
            return await this.toolHandlers.handleDeleteDiscount(request.params.arguments);
          case 'recharge_create_discount':
            return await this.toolHandlers.handleCreateDiscount(request.params.arguments);

          // Metafield tools
          case 'recharge_get_metafields':
            return await this.toolHandlers.handleGetMetafields(request.params.arguments);
          case 'recharge_get_metafield':
            return await this.toolHandlers.handleGetMetafield(request.params.arguments);
          case 'recharge_update_metafield':
            return await this.toolHandlers.handleUpdateMetafield(request.params.arguments);
          case 'recharge_delete_metafield':
            return await this.toolHandlers.handleDeleteMetafield(request.params.arguments);
          case 'recharge_create_metafield':
            return await this.toolHandlers.handleCreateMetafield(request.params.arguments);

          // Webhook tools
          case 'recharge_get_webhooks':
            return await this.toolHandlers.handleGetWebhooks(request.params.arguments);
          case 'recharge_get_webhook':
            return await this.toolHandlers.handleGetWebhook(request.params.arguments);
          case 'recharge_update_webhook':
            return await this.toolHandlers.handleUpdateWebhook(request.params.arguments);
          case 'recharge_delete_webhook':
            return await this.toolHandlers.handleDeleteWebhook(request.params.arguments);
          case 'recharge_create_webhook':
            return await this.toolHandlers.handleCreateWebhook(request.params.arguments);

          // Payment method tools
          case 'recharge_get_payment_methods':
            return await this.toolHandlers.handleGetPaymentMethods(request.params.arguments);
          case 'recharge_get_payment_method':
            return await this.toolHandlers.handleGetPaymentMethod(request.params.arguments);
          case 'recharge_update_payment_method':
            return await this.toolHandlers.handleUpdatePaymentMethod(request.params.arguments);

          // Checkout tools
          case 'recharge_get_checkouts':
            return await this.toolHandlers.handleGetCheckouts(request.params.arguments);
          case 'recharge_get_checkout':
            return await this.toolHandlers.handleGetCheckout(request.params.arguments);
          case 'recharge_update_checkout':
            return await this.toolHandlers.handleUpdateCheckout(request.params.arguments);
          case 'recharge_process_checkout':
            return await this.toolHandlers.handleProcessCheckout(request.params.arguments);
          case 'recharge_create_checkout':
            return await this.toolHandlers.handleCreateCheckout(request.params.arguments);

          // Onetime tools
          case 'recharge_get_onetimes':
            return await this.toolHandlers.handleGetOnetimes(request.params.arguments);
          case 'recharge_get_onetime':
            return await this.toolHandlers.handleGetOnetime(request.params.arguments);
          case 'recharge_update_onetime':
            return await this.toolHandlers.handleUpdateOnetime(request.params.arguments);
          case 'recharge_delete_onetime':
            return await this.toolHandlers.handleDeleteOnetime(request.params.arguments);
          case 'recharge_create_onetime':
            return await this.toolHandlers.handleCreateOnetime(request.params.arguments);

          // Store credit tools
          case 'recharge_get_store_credits':
            return await this.toolHandlers.handleGetStoreCredits(request.params.arguments);
          case 'recharge_get_store_credit':
            return await this.toolHandlers.handleGetStoreCredit(request.params.arguments);
          case 'recharge_update_store_credit':
            return await this.toolHandlers.handleUpdateStoreCredit(request.params.arguments);
          case 'recharge_create_store_credit':
            return await this.toolHandlers.handleCreateStoreCredit(request.params.arguments);

          // Charge action tools
          case 'recharge_skip_charge':
            return await this.toolHandlers.handleSkipCharge(request.params.arguments);
          case 'recharge_process_charge':
            return await this.toolHandlers.handleProcessCharge(request.params.arguments);
          case 'recharge_unskip_charge':
            return await this.toolHandlers.handleUnskipCharge(request.params.arguments);
          case 'recharge_delay_charge':
            return await this.toolHandlers.handleDelayCharge(request.params.arguments);
          case 'recharge_refund_charge':
            return await this.toolHandlers.handleRefundCharge(request.params.arguments);

          // Subscription action tools
          case 'recharge_skip_subscription_charge':
            return await this.toolHandlers.handleSkipSubscriptionCharge(request.params.arguments);
          case 'recharge_unskip_subscription_charge':
            return await this.toolHandlers.handleUnskipSubscriptionCharge(request.params.arguments);

          // Shop tools
          case 'recharge_get_shop':
            return await this.toolHandlers.handleGetShop(request.params.arguments);

          // Collection tools
          case 'recharge_get_collections':
            return await this.toolHandlers.handleGetCollections(request.params.arguments);
          case 'recharge_get_collection':
            return await this.toolHandlers.handleGetCollection(request.params.arguments);

          // Analytics tools
          case 'recharge_get_subscription_analytics':
            return await this.toolHandlers.handleGetSubscriptionAnalytics(request.params.arguments);
          case 'recharge_get_customer_analytics':
            return await this.toolHandlers.handleGetCustomerAnalytics(request.params.arguments);

          // Order action tools
          case 'recharge_update_order':
            return await this.toolHandlers.handleUpdateOrder(request.params.arguments);
          case 'recharge_delete_order':
            return await this.toolHandlers.handleDeleteOrder(request.params.arguments);
          case 'recharge_clone_order':
            return await this.toolHandlers.handleCloneOrder(request.params.arguments);

          // Customer portal tools
          case 'recharge_get_customer_portal_session':
            return await this.toolHandlers.handleGetCustomerPortalSession(request.params.arguments);
          case 'recharge_create_customer_portal_session':
            return await this.toolHandlers.handleCreateCustomerPortalSession(request.params.arguments);

          // Bundle selection tools
          case 'recharge_get_bundle_selections':
            return await this.toolHandlers.handleGetBundleSelections(request.params.arguments);
          case 'recharge_get_bundle_selection':
            return await this.toolHandlers.handleGetBundleSelection(request.params.arguments);
          case 'recharge_create_bundle_selection':
            return await this.toolHandlers.handleCreateBundleSelection(request.params.arguments);
          case 'recharge_update_bundle_selection':
            return await this.toolHandlers.handleUpdateBundleSelection(request.params.arguments);
          case 'recharge_delete_bundle_selection':
            return await this.toolHandlers.handleDeleteBundleSelection(request.params.arguments);

          // Retention strategy tools
          case 'recharge_get_retention_strategies':
            return await this.toolHandlers.handleGetRetentionStrategies(request.params.arguments);
          case 'recharge_get_retention_strategy':
            return await this.toolHandlers.handleGetRetentionStrategy(request.params.arguments);

          // Async batch tools
          case 'recharge_get_async_batches':
            return await this.toolHandlers.handleGetAsyncBatches(request.params.arguments);
          case 'recharge_get_async_batch':
            return await this.toolHandlers.handleGetAsyncBatch(request.params.arguments);
          case 'recharge_create_async_batch':
            return await this.toolHandlers.handleCreateAsyncBatch(request.params.arguments);

          // Notification tools
          case 'recharge_get_notifications':
            return await this.toolHandlers.handleGetNotifications(request.params.arguments);
          case 'recharge_get_notification':
            return await this.toolHandlers.handleGetNotification(request.params.arguments);

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

  /**
   * Set up comprehensive error handling and graceful shutdown
   */
  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      console.log('Received SIGINT, shutting down gracefully...');
      await this.server.close();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Received SIGTERM, shutting down gracefully...');
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

  /**
   * Start the MCP server with stdio transport
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`Recharge MCP Server v1.1.0 running on stdio (Node.js ${process.version})`);
  }
}

// Start the server
if (import.meta.url === new URL(process.argv[1], import.meta.url).href) {
  const server = new RechargeServer();
  server.run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}