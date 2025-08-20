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