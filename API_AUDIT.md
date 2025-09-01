# Recharge API v2021-11 Complete Endpoint Audit

## Current Implementation Status

### ✅ FULLY IMPLEMENTED RESOURCES

#### Customers
- GET /customers ✅
- GET /customers/{id} ✅
- POST /customers ✅
- PUT /customers/{id} ✅

#### Subscriptions
- GET /subscriptions ✅
- GET /subscriptions/{id} ✅
- POST /subscriptions ✅
- PUT /subscriptions/{id} ✅
- POST /subscriptions/{id}/cancel ✅
- POST /subscriptions/{id}/activate ✅
- POST /subscriptions/{id}/swap ✅
- POST /subscriptions/{id}/set_next_charge_date ✅
- POST /subscriptions/{id}/skip ✅
- POST /subscriptions/{id}/unskip ✅

#### Products
- GET /products ✅
- GET /products/{id} ✅

#### Orders
- GET /orders ✅
- GET /orders/{id} ✅
- PUT /orders/{id} ✅
- DELETE /orders/{id} ✅
- POST /orders/{id}/clone ✅

#### Charges
- GET /charges ✅
- GET /charges/{id} ✅
- POST /charges ✅
- PUT /charges/{id} ✅
- DELETE /charges/{id} ✅
- POST /charges/{id}/skip ✅
- POST /charges/{id}/unskip ✅
- POST /charges/{id}/process ✅
- POST /charges/{id}/delay ✅
- POST /charges/{id}/refund ✅

#### Addresses
- GET /addresses ✅
- GET /addresses/{id} ✅
- POST /addresses ✅
- PUT /addresses/{id} ✅
- DELETE /addresses/{id} ✅
- POST /addresses/validate ✅

#### Discounts
- GET /discounts ✅
- GET /discounts/{id} ✅
- POST /discounts ✅
- PUT /discounts/{id} ✅
- DELETE /discounts/{id} ✅

#### Metafields
- GET /metafields ✅
- GET /metafields/{id} ✅
- POST /metafields ✅
- PUT /metafields/{id} ✅
- DELETE /metafields/{id} ✅

#### Webhooks
- GET /webhooks ✅
- GET /webhooks/{id} ✅
- POST /webhooks ✅
- PUT /webhooks/{id} ✅
- DELETE /webhooks/{id} ✅

#### Payment Methods
- GET /payment_methods ✅
- GET /payment_methods/{id} ✅
- PUT /payment_methods/{id} ✅

#### Checkouts
- GET /checkouts ✅
- GET /checkouts/{token} ✅
- POST /checkouts ✅
- PUT /checkouts/{token} ✅
- POST /checkouts/{token}/process ✅

### ❌ MISSING CRITICAL RESOURCES

#### Collections
- GET /collections ✅
- GET /collections/{id} ✅
- POST /collections ❌ MISSING
- PUT /collections/{id} ❌ MISSING
- DELETE /collections/{id} ❌ MISSING

#### Shop
- GET /shop ✅
- PUT /shop ❌ MISSING

#### Subscription Discounts (Resource-specific)
- GET /subscriptions/{id}/discounts ✅
- POST /subscriptions/{id}/discounts ✅
- DELETE /subscriptions/{id}/discounts/{discount_id} ✅

#### Order Discounts (Resource-specific)
- GET /orders/{id}/discounts ✅

#### Charge Discounts (Resource-specific)
- GET /charges/{id}/discounts ✅
- POST /charges/{id}/discounts ✅
- DELETE /charges/{id}/discounts/{discount_id} ✅

### ❌ COMPLETELY MISSING MAJOR RESOURCES

#### Subscription Plans
- GET /subscription_plans ✅
- GET /subscription_plans/{id} ✅
- POST /subscription_plans ✅
- PUT /subscription_plans/{id} ✅
- DELETE /subscription_plans/{id} ✅

#### Plans
- GET /plans ✅
- GET /plans/{id} ✅
- POST /plans ✅
- PUT /plans/{id} ✅
- DELETE /plans/{id} ✅

#### Shipping Rates
- GET /shipping_rates ✅
- GET /shipping_rates/{id} ✅
- POST /shipping_rates ✅
- PUT /shipping_rates/{id} ✅
- DELETE /shipping_rates/{id} ✅

#### Tax Lines
- GET /tax_lines ✅
- GET /tax_lines/{id} ✅

#### One-time Products (Onetimes)
- GET /onetimes ✅
- GET /onetimes/{id} ✅
- POST /onetimes ✅
- PUT /onetimes/{id} ✅
- DELETE /onetimes/{id} ✅

#### Store Credits
- GET /store_credits ✅
- GET /store_credits/{id} ✅
- POST /store_credits ✅
- PUT /store_credits/{id} ✅

#### Bundle Selections
- GET /bundle_selections ✅
- GET /bundle_selections/{id} ✅
- POST /bundle_selections ✅
- PUT /bundle_selections/{id} ✅
- DELETE /bundle_selections/{id} ✅

#### Retention Strategies
- GET /retention_strategies ✅
- GET /retention_strategies/{id} ✅

#### Async Batches
- GET /async_batches ✅
- GET /async_batches/{id} ✅
- POST /async_batches ✅

#### Notifications
- GET /notifications ✅
- GET /notifications/{id} ✅

#### Analytics
- GET /analytics/subscriptions ✅
- GET /analytics/customers ✅

#### Customer Portal
- GET /customers/{id}/portal_session ✅
- POST /customers/{id}/portal_session ✅

### ❌ NEWLY IDENTIFIED MISSING RESOURCES

#### Subscription Charges (Nested Resource)
- GET /subscriptions/{id}/charges ❌ MISSING
- POST /subscriptions/{id}/charges ❌ MISSING

#### Customer Addresses (Nested Resource)
- GET /customers/{id}/addresses ❌ MISSING

#### Customer Subscriptions (Nested Resource)
- GET /customers/{id}/subscriptions ❌ MISSING

#### Customer Orders (Nested Resource)
- GET /customers/{id}/orders ❌ MISSING

#### Customer Charges (Nested Resource)
- GET /customers/{id}/charges ❌ MISSING

#### Address Subscriptions (Nested Resource)
- GET /addresses/{id}/subscriptions ❌ MISSING

#### Address Charges (Nested Resource)
- GET /addresses/{id}/charges ❌ MISSING

#### Subscription Line Items (Nested Resource)
- GET /subscriptions/{id}/line_items ❌ MISSING
- POST /subscriptions/{id}/line_items ❌ MISSING
- PUT /subscriptions/{id}/line_items/{id} ❌ MISSING
- DELETE /subscriptions/{id}/line_items/{id} ❌ MISSING

#### Order Line Items (Nested Resource)
- GET /orders/{id}/line_items ❌ MISSING

#### Charge Line Items (Nested Resource)
- GET /charges/{id}/line_items ❌ MISSING
- PUT /charges/{id}/line_items/{id} ❌ MISSING

#### Subscription Notes (Nested Resource)
- GET /subscriptions/{id}/notes ❌ MISSING
- POST /subscriptions/{id}/notes ❌ MISSING
- PUT /subscriptions/{id}/notes/{id} ❌ MISSING
- DELETE /subscriptions/{id}/notes/{id} ❌ MISSING

#### Customer Payment Sources (Nested Resource)
- GET /customers/{id}/payment_sources ❌ MISSING
- POST /customers/{id}/payment_sources ❌ MISSING
- PUT /customers/{id}/payment_sources/{id} ❌ MISSING
- DELETE /customers/{id}/payment_sources/{id} ❌ MISSING

#### Subscription Delivery Schedules
- GET /subscriptions/{id}/delivery_schedule ❌ MISSING
- PUT /subscriptions/{id}/delivery_schedule ❌ MISSING

#### Charge Attempts
- GET /charges/{id}/charge_attempts ❌ MISSING

#### Subscription Pauses
- POST /subscriptions/{id}/pause ❌ MISSING
- POST /subscriptions/{id}/resume ❌ MISSING

#### Bulk Operations
- POST /subscriptions/bulk_update ❌ MISSING
- POST /charges/bulk_skip ❌ MISSING
- POST /charges/bulk_unskip ❌ MISSING

## SUMMARY

### Current Status: ~95 tools implemented
### Missing: ~35+ critical endpoints
### Completion Rate: ~73% (NOT 100% as previously claimed)

### Most Critical Missing Features:
1. **Nested Resource Access** - Customer/Address/Subscription relationships
2. **Line Item Management** - Critical for subscription modifications
3. **Collection Management** - Product organization
4. **Subscription Notes** - Customer service functionality
5. **Payment Source Management** - Payment method handling
6. **Bulk Operations** - Efficiency for large operations
7. **Subscription Pauses** - Common subscription management need