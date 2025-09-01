# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2024-01-21

### Added
- **Complete nested resource relationships**: Customer addresses, subscriptions, orders, charges
- **Subscription line item management**: Add, update, remove items from subscriptions
- **Subscription notes system**: Customer service note management
- **Customer payment source management**: Full CRUD for payment methods
- **Advanced subscription features**: Delivery schedules, pause/resume functionality
- **Charge attempt tracking**: View payment attempt history
- **Collection management**: Create, update, delete product collections
- **Shop configuration updates**: Modify shop settings
- **Bulk operations**: Mass subscription updates and charge management
- **Line item management**: Detailed order and charge item handling
- **Missing API endpoints**: Added subscription swap, set next charge date, charge CRUD operations
- **Address validation**: Added address validation and deletion endpoints
- **Plan management**: Added complete plan and subscription plan management tools
- Comprehensive JSDoc documentation throughout codebase
- Enhanced error handling with exponential backoff retry logic
- Input sanitization and validation improvements
- Security policy (SECURITY.md) with best practices
- Comprehensive .gitignore file
- Quick Start section in README for faster onboarding
- Additional npm scripts for better developer experience

### Changed
- Improved retry logic with exponential backoff instead of linear delays
- Enhanced query parameter building with null/undefined filtering
- Better error messages with more context and troubleshooting guidance
- Updated documentation with better organization and troubleshooting
- Improved package.json with better metadata and scripts

### Fixed
- Improved error handling for edge cases in API responses
- Better handling of empty or invalid query parameters
- Fixed potential security issues with input validation

### Security
- Added comprehensive security documentation
- Improved input sanitization across all handlers
- Enhanced API key handling and validation
- Added security best practices documentation
- Implemented proper error message sanitization

## [1.1.0] - 2024-01-20

### Added
- Comprehensive MCP server for Recharge API v2021-11
- Support for 70+ Recharge API endpoints
- Flexible API key configuration (environment variable + per-request override)
- Full CRUD operations for customers, subscriptions, orders, charges
- Advanced features: analytics, webhooks, bundle selections, retention strategies
- Comprehensive documentation with setup guides for multiple MCP clients
- Retry logic and timeout handling for API requests
- Input validation and error handling
- Support for Claude Desktop, Continue, Cursor, and VSCode with Copilot

### Features
- **Customer Management**: Create, read, update customer information
- **Subscription Management**: Full lifecycle management including cancellation and reactivation
- **Order Management**: View and manage order history
- **Charge Management**: Handle billing, refunds, and charge scheduling
- **Address Management**: Create and update customer addresses
- **Discount Management**: Create and manage discount codes
- **Metafield Management**: Custom data storage for resources
- **Webhook Management**: Event notification setup
- **Payment Method Management**: Payment information handling
- **Checkout Management**: One-time purchase processing
- **Store Credit Management**: Store credit creation and management
- **Analytics**: Subscription and customer analytics data
- **Bundle Selections**: Subscription bundle management
- **Retention Strategies**: Customer retention configuration
- **Async Batches**: Bulk operation processing
- **Notifications**: Customer notification management

### Technical
- Node.js 18+ support
- ES modules architecture
- Comprehensive error handling
- Request retry logic with exponential backoff
- Timeout handling for API requests
- Input validation for all endpoints
- Structured logging
- Environment-based configuration

### Documentation
- Complete README with setup instructions
- API usage examples for all 70+ tools
- MCP client configuration guides
- Troubleshooting section
- Best practices guide
- Sample usage for all endpoints

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Basic MCP server structure
- Core Recharge API integration
- Essential customer and subscription management