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
          tools.swapSubscriptionSchema,
          tools.setNextChargeDateSchema,

          // Product tools
          tools.getProductsSchema,
          tools.getProductSchema,

          // Order tools
          tools.getOrdersSchema,
          tools.getOrderSchema,

          // Charge tools
          tools.getChargesSchema,
          tools.getChargeSchema,
          tools.createChargeSchema,
          tools.updateChargeSchema,
          tools.deleteChargeSchema,

          // Address tools
          tools.getAddressesSchema,
          tools.getAddressSchema,
          tools.updateAddressSchema,
          tools.createAddressSchema,
          tools.deleteAddressSchema,
          tools.validateAddressSchema,

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

          // Plan tools
          tools.getPlansSchema,
          tools.getPlanSchema,
          tools.createPlanSchema,
          tools.updatePlanSchema,
          tools.deletePlanSchema,

          // Subscription plan tools
          tools.getSubscriptionPlansSchema,
          tools.getSubscriptionPlanSchema,
          tools.createSubscriptionPlanSchema,
          tools.updateSubscriptionPlanSchema,
          tools.deleteSubscriptionPlanSchema,

          // Shipping rate tools
          tools.getShippingRatesSchema,
          tools.getShippingRateSchema,
          tools.createShippingRateSchema,
          tools.updateShippingRateSchema,
          tools.deleteShippingRateSchema,

          // Tax line tools
          tools.getTaxLinesSchema,
          tools.getTaxLineSchema,

          // Subscription discount tools
          tools.getSubscriptionDiscountsSchema,
          tools.applySubscriptionDiscountSchema,
          tools.removeSubscriptionDiscountSchema,

          // Order discount tools
          tools.getOrderDiscountsSchema,

          // Charge discount tools
          tools.getChargeDiscountsSchema,
          tools.applyChargeDiscountSchema,
          tools.removeChargeDiscountSchema,

          // Nested resource tools - Customer relationships
          tools.getCustomerAddressesSchema,
          tools.getCustomerSubscriptionsSchema,
          tools.getCustomerOrdersSchema,
          tools.getCustomerChargesSchema,
          tools.getCustomerPaymentSourcesSchema,
          tools.createCustomerPaymentSourceSchema,
          tools.updateCustomerPaymentSourceSchema,
          tools.deleteCustomerPaymentSourceSchema,

          // Nested resource tools - Subscription relationships
          tools.getSubscriptionChargesSchema,
          tools.createSubscriptionChargeSchema,
          tools.getSubscriptionLineItemsSchema,
          tools.createSubscriptionLineItemSchema,
          tools.updateSubscriptionLineItemSchema,
          tools.deleteSubscriptionLineItemSchema,
          tools.getSubscriptionNotesSchema,
          tools.createSubscriptionNoteSchema,
          tools.updateSubscriptionNoteSchema,
          tools.deleteSubscriptionNoteSchema,
          tools.getSubscriptionDeliveryScheduleSchema,
          tools.updateSubscriptionDeliveryScheduleSchema,
          tools.pauseSubscriptionSchema,
          tools.resumeSubscriptionSchema,

          // Nested resource tools - Address relationships
          tools.getAddressSubscriptionsSchema,
          tools.getAddressChargesSchema,

          // Line item tools
          tools.getOrderLineItemsSchema,
          tools.getChargeLineItemsSchema,
          tools.updateChargeLineItemSchema,
          tools.getChargeAttemptsSchema,

          // Collection management tools
          tools.createCollectionSchema,
          tools.updateCollectionSchema,
          tools.deleteCollectionSchema,
          tools.updateShopSchema,

          // Bulk operation tools
          tools.bulkUpdateSubscriptionsSchema,
          tools.bulkSkipChargesSchema,
          tools.bulkUnskipChargesSchema,
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

          case 'recharge_swap_subscription':
            return await this.toolHandlers.handleSwapSubscription(request.params.arguments);
          case 'recharge_set_next_charge_date':
            return await this.toolHandlers.handleSetNextChargeDate(request.params.arguments);

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

          case 'recharge_create_charge':
            return await this.toolHandlers.handleCreateCharge(request.params.arguments);
          case 'recharge_update_charge':
            return await this.toolHandlers.handleUpdateCharge(request.params.arguments);
          case 'recharge_delete_charge':
            return await this.toolHandlers.handleDeleteCharge(request.params.arguments);

          // Address tools
          case 'recharge_get_addresses':
            return await this.toolHandlers.handleGetAddresses(request.params.arguments);
          case 'recharge_get_address':
            return await this.toolHandlers.handleGetAddress(request.params.arguments);
          case 'recharge_update_address':
            return await this.toolHandlers.handleUpdateAddress(request.params.arguments);
          case 'recharge_create_address':
            return await this.toolHandlers.handleCreateAddress(request.params.arguments);

          case 'recharge_delete_address':
            return await this.toolHandlers.handleDeleteAddress(request.params.arguments);
          case 'recharge_validate_address':
            return await this.toolHandlers.handleValidateAddress(request.params.arguments);

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

          case 'recharge_update_shop':
            return await this.toolHandlers.handleUpdateShop(request.params.arguments);

          // Collection tools
          case 'recharge_get_collections':
            return await this.toolHandlers.handleGetCollections(request.params.arguments);
          case 'recharge_get_collection':
            return await this.toolHandlers.handleGetCollection(request.params.arguments);

          case 'recharge_create_collection':
            return await this.toolHandlers.handleCreateCollection(request.params.arguments);
          case 'recharge_update_collection':
            return await this.toolHandlers.handleUpdateCollection(request.params.arguments);
          case 'recharge_delete_collection':
            return await this.toolHandlers.handleDeleteCollection(request.params.arguments);

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

          // Plan tools
          case 'recharge_get_plans':
            return await this.toolHandlers.handleGetPlans(request.params.arguments);
          case 'recharge_get_plan':
            return await this.toolHandlers.handleGetPlan(request.params.arguments);
          case 'recharge_create_plan':
            return await this.toolHandlers.handleCreatePlan(request.params.arguments);
          case 'recharge_update_plan':
            return await this.toolHandlers.handleUpdatePlan(request.params.arguments);
          case 'recharge_delete_plan':
            return await this.toolHandlers.handleDeletePlan(request.params.arguments);

          // Subscription plan tools
          case 'recharge_get_subscription_plans':
            return await this.toolHandlers.handleGetSubscriptionPlans(request.params.arguments);
          case 'recharge_get_subscription_plan':
            return await this.toolHandlers.handleGetSubscriptionPlan(request.params.arguments);
          case 'recharge_create_subscription_plan':
            return await this.toolHandlers.handleCreateSubscriptionPlan(request.params.arguments);
          case 'recharge_update_subscription_plan':
            return await this.toolHandlers.handleUpdateSubscriptionPlan(request.params.arguments);
          case 'recharge_delete_subscription_plan':
            return await this.toolHandlers.handleDeleteSubscriptionPlan(request.params.arguments);

          // Shipping rate tools
          case 'recharge_get_shipping_rates':
            return await this.toolHandlers.handleGetShippingRates(request.params.arguments);
          case 'recharge_get_shipping_rate':
            return await this.toolHandlers.handleGetShippingRate(request.params.arguments);
          case 'recharge_create_shipping_rate':
            return await this.toolHandlers.handleCreateShippingRate(request.params.arguments);
          case 'recharge_update_shipping_rate':
            return await this.toolHandlers.handleUpdateShippingRate(request.params.arguments);
          case 'recharge_delete_shipping_rate':
            return await this.toolHandlers.handleDeleteShippingRate(request.params.arguments);

          // Tax line tools
          case 'recharge_get_tax_lines':
            return await this.toolHandlers.handleGetTaxLines(request.params.arguments);
          case 'recharge_get_tax_line':
            return await this.toolHandlers.handleGetTaxLine(request.params.arguments);

          // Subscription discount tools
          case 'recharge_get_subscription_discounts':
            return await this.toolHandlers.handleGetSubscriptionDiscounts(request.params.arguments);
          case 'recharge_apply_subscription_discount':
            return await this.toolHandlers.handleApplySubscriptionDiscount(request.params.arguments);
          case 'recharge_remove_subscription_discount':
            return await this.toolHandlers.handleRemoveSubscriptionDiscount(request.params.arguments);

          // Order discount tools
          case 'recharge_get_order_discounts':
            return await this.toolHandlers.handleGetOrderDiscounts(request.params.arguments);

          // Charge discount tools
          case 'recharge_get_charge_discounts':
            return await this.toolHandlers.handleGetChargeDiscounts(request.params.arguments);
          case 'recharge_apply_charge_discount':
            return await this.toolHandlers.handleApplyChargeDiscount(request.params.arguments);
          case 'recharge_remove_charge_discount':
            return await this.toolHandlers.handleRemoveChargeDiscount(request.params.arguments);

          // Nested resource tools - Customer relationships
          case 'recharge_get_customer_addresses':
            return await this.toolHandlers.handleGetCustomerAddresses(request.params.arguments);
          case 'recharge_get_customer_subscriptions':
            return await this.toolHandlers.handleGetCustomerSubscriptions(request.params.arguments);
          case 'recharge_get_customer_orders':
            return await this.toolHandlers.handleGetCustomerOrders(request.params.arguments);
          case 'recharge_get_customer_charges':
            return await this.toolHandlers.handleGetCustomerCharges(request.params.arguments);
          case 'recharge_get_customer_payment_sources':
            return await this.toolHandlers.handleGetCustomerPaymentSources(request.params.arguments);
          case 'recharge_create_customer_payment_source':
            return await this.toolHandlers.handleCreateCustomerPaymentSource(request.params.arguments);
          case 'recharge_update_customer_payment_source':
            return await this.toolHandlers.handleUpdateCustomerPaymentSource(request.params.arguments);
          case 'recharge_delete_customer_payment_source':
            return await this.toolHandlers.handleDeleteCustomerPaymentSource(request.params.arguments);

          // Nested resource tools - Subscription relationships
          case 'recharge_get_subscription_charges':
            return await this.toolHandlers.handleGetSubscriptionCharges(request.params.arguments);
          case 'recharge_create_subscription_charge':
            return await this.toolHandlers.handleCreateSubscriptionCharge(request.params.arguments);
          case 'recharge_get_subscription_line_items':
            return await this.toolHandlers.handleGetSubscriptionLineItems(request.params.arguments);
          case 'recharge_create_subscription_line_item':
            return await this.toolHandlers.handleCreateSubscriptionLineItem(request.params.arguments);
          case 'recharge_update_subscription_line_item':
            return await this.toolHandlers.handleUpdateSubscriptionLineItem(request.params.arguments);
          case 'recharge_delete_subscription_line_item':
            return await this.toolHandlers.handleDeleteSubscriptionLineItem(request.params.arguments);
          case 'recharge_get_subscription_notes':
            return await this.toolHandlers.handleGetSubscriptionNotes(request.params.arguments);
          case 'recharge_create_subscription_note':
            return await this.toolHandlers.handleCreateSubscriptionNote(request.params.arguments);
          case 'recharge_update_subscription_note':
            return await this.toolHandlers.handleUpdateSubscriptionNote(request.params.arguments);
          case 'recharge_delete_subscription_note':
            return await this.toolHandlers.handleDeleteSubscriptionNote(request.params.arguments);
          case 'recharge_get_subscription_delivery_schedule':
            return await this.toolHandlers.handleGetSubscriptionDeliverySchedule(request.params.arguments);
          case 'recharge_update_subscription_delivery_schedule':
            return await this.toolHandlers.handleUpdateSubscriptionDeliverySchedule(request.params.arguments);
          case 'recharge_pause_subscription':
            return await this.toolHandlers.handlePauseSubscription(request.params.arguments);
          case 'recharge_resume_subscription':
            return await this.toolHandlers.handleResumeSubscription(request.params.arguments);

          // Nested resource tools - Address relationships
          case 'recharge_get_address_subscriptions':
            return await this.toolHandlers.handleGetAddressSubscriptions(request.params.arguments);
          case 'recharge_get_address_charges':
            return await this.toolHandlers.handleGetAddressCharges(request.params.arguments);

          // Line item tools
          case 'recharge_get_order_line_items':
            return await this.toolHandlers.handleGetOrderLineItems(request.params.arguments);
          case 'recharge_get_charge_line_items':
            return await this.toolHandlers.handleGetChargeLineItems(request.params.arguments);
          case 'recharge_update_charge_line_item':
            return await this.toolHandlers.handleUpdateChargeLineItem(request.params.arguments);
          case 'recharge_get_charge_attempts':
            return await this.toolHandlers.handleGetChargeAttempts(request.params.arguments);

          // Collection management tools
          case 'recharge_create_collection':
            return await this.toolHandlers.handleCreateCollection(request.params.arguments);
          case 'recharge_update_collection':
            return await this.toolHandlers.handleUpdateCollection(request.params.arguments);
          case 'recharge_delete_collection':
            return await this.toolHandlers.handleDeleteCollection(request.params.arguments);
          case 'recharge_update_shop':
            return await this.toolHandlers.handleUpdateShop(request.params.arguments);

          // Bulk operation tools
          case 'recharge_bulk_update_subscriptions':
            return await this.toolHandlers.handleBulkUpdateSubscriptions(request.params.arguments);
          case 'recharge_bulk_skip_charges':
            return await this.toolHandlers.handleBulkSkipCharges(request.params.arguments);
          case 'recharge_bulk_unskip_charges':
            return await this.toolHandlers.handleBulkUnskipCharges(request.params.arguments);

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