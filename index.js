#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { RechargeToolHandlers } from './src/tool-handlers.js';
import * as tools from './src/tools.js';

/**
 * Recharge Payments MCP Server
 * 
 * This server provides tools for interacting with the Recharge Payments API,
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
          tools.createCustomerSchema,

          // Subscription tools
          tools.getSubscriptionsSchema,
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
          tools.createAddressSchema,

          // Discount tools
          tools.getDiscountsSchema,
          tools.createDiscountSchema,

          // Metafield tools
          tools.getMetafieldsSchema,
          tools.createMetafieldSchema,

          // Webhook tools
          tools.getWebhooksSchema,
          tools.createWebhookSchema,

          // Payment method tools
          tools.getPaymentMethodsSchema,

          // Checkout tools
          tools.createCheckoutSchema,

          // Onetime tools
          tools.getOnetimesSchema,
          tools.createOnetimeSchema,

          // Store credit tools
          tools.getStoreCreditSchema,
          tools.createStoreCreditSchema,

          // Charge action tools
          tools.skipChargeSchema,
          tools.processChargeSchema,
          tools.refundChargeSchema,

          // Subscription action tools
          tools.skipSubscriptionChargeSchema,

          // Shop tools
          tools.getShopSchema,

          // Collection tools
          tools.getCollectionsSchema,

          // Analytics tools
          tools.getSubscriptionAnalyticsSchema,
          tools.getCustomerAnalyticsSchema,
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
          case 'recharge_create_customer':
            return await this.toolHandlers.handleCreateCustomer(args);

          // Subscription tools
          case 'recharge_get_subscriptions':
            return await this.toolHandlers.handleGetSubscriptions(args);
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
          case 'recharge_create_address':
            return await this.toolHandlers.handleCreateAddress(args);

          // Discount tools
          case 'recharge_get_discounts':
            return await this.toolHandlers.handleGetDiscounts(args);
          case 'recharge_create_discount':
            return await this.toolHandlers.handleCreateDiscount(args);

          // Metafield tools
          case 'recharge_get_metafields':
            return await this.toolHandlers.handleGetMetafields(args);
          case 'recharge_create_metafield':
            return await this.toolHandlers.handleCreateMetafield(args);

          // Webhook tools
          case 'recharge_get_webhooks':
            return await this.toolHandlers.handleGetWebhooks(args);
          case 'recharge_create_webhook':
            return await this.toolHandlers.handleCreateWebhook(args);

          // Payment method tools
          case 'recharge_get_payment_methods':
            return await this.toolHandlers.handleGetPaymentMethods(args);

          // Checkout tools
          case 'recharge_create_checkout':
            return await this.toolHandlers.handleCreateCheckout(args);

          // Onetime tools
          case 'recharge_get_onetimes':
            return await this.toolHandlers.handleGetOnetimes(args);
          case 'recharge_create_onetime':
            return await this.toolHandlers.handleCreateOnetime(args);

          // Store credit tools
          case 'recharge_get_store_credits':
            return await this.toolHandlers.handleGetStoreCredits(args);
          case 'recharge_create_store_credit':
            return await this.toolHandlers.handleCreateStoreCredit(args);

          // Charge action tools
          case 'recharge_skip_charge':
            return await this.toolHandlers.handleSkipCharge(args);
          case 'recharge_process_charge':
            return await this.toolHandlers.handleProcessCharge(args);
          case 'recharge_refund_charge':
            return await this.toolHandlers.handleRefundCharge(args);

          // Subscription action tools
          case 'recharge_skip_subscription_charge':
            return await this.toolHandlers.handleSkipSubscriptionCharge(args);

          // Shop tools
          case 'recharge_get_shop':
            return await this.toolHandlers.handleGetShop(args);

          // Collection tools
          case 'recharge_get_collections':
            return await this.toolHandlers.handleGetCollections(args);

          // Analytics tools
          case 'recharge_get_subscription_analytics':
            return await this.toolHandlers.handleGetSubscriptionAnalytics(args);
          case 'recharge_get_customer_analytics':
            return await this.toolHandlers.handleGetCustomerAnalytics(args);

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
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Recharge MCP server running on stdio');
  }
}

// Start the server
const server = new RechargeServer();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});