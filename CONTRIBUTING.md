# Contributing to Recharge MCP Server

Thank you for your interest in contributing to the Recharge MCP Server! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Development Standards](#development-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/recharge-mcp-server.git
   cd recharge-mcp-server
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Git
- A Recharge API key for testing (optional)

### Environment Configuration

Create a `.env` file with the following variables:

```bash
# Required for testing with real API
RECHARGE_API_KEY=your_test_api_key_here
RECHARGE_API_URL=https://api.rechargeapps.com

# Optional configuration
RECHARGE_API_TIMEOUT=30000
RECHARGE_API_RETRY_ATTEMPTS=3
RECHARGE_API_RETRY_DELAY=1000
NODE_ENV=development
```

### Running the Development Server

```bash
# Start in development mode with auto-reload
npm run dev

# Start in production mode
npm start

# Validate code syntax
npm run validate

# Run validation script
./scripts/validate.sh
```

## Contributing Guidelines

### Types of Contributions

We welcome the following types of contributions:

1. **Bug fixes** - Fix issues in existing functionality
2. **Feature additions** - Add new Recharge API endpoints or tools
3. **Documentation improvements** - Enhance README, guides, or code comments
4. **Performance improvements** - Optimize existing code
5. **Test additions** - Add or improve test coverage
6. **Infrastructure improvements** - Enhance Docker, Kubernetes, or deployment configurations

### Before You Start

1. **Check existing issues** to see if your contribution is already being worked on
2. **Create an issue** to discuss major changes before implementing them
3. **Review the codebase** to understand the existing patterns and architecture

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Follow the existing code style and patterns
- Add appropriate error handling
- Update documentation as needed
- Add or update tests if applicable

### 3. Test Your Changes

```bash
# Validate syntax
npm run validate

# Run validation script
./scripts/validate.sh

# Test with Docker (optional)
./scripts/docker-build.sh
./scripts/docker-run.sh
```

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add support for new Recharge endpoint"
# or
git commit -m "fix: resolve timeout issue in API client"
# or
git commit -m "docs: update setup instructions for Cursor IDE"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Reference to related issues** (if applicable)
- **Testing instructions** for reviewers

## Issue Reporting

When reporting issues, please include:

### Bug Reports

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment information** (Node.js version, OS, etc.)
- **Error messages** or logs (if applicable)
- **API endpoint** or tool affected (if applicable)

### Feature Requests

- **Clear description** of the desired feature
- **Use case** or problem it solves
- **Proposed implementation** (if you have ideas)
- **Recharge API documentation** links (if applicable)

## Development Standards

### Code Style

- Use **ES modules** (`import`/`export`)
- Use **async/await** for asynchronous operations
- Follow **camelCase** for variables and functions
- Use **descriptive variable names**
- Add **JSDoc comments** for functions and classes
- Keep functions **focused and small**
- Use **consistent error handling** patterns

### File Organization

- Keep files **under 300 lines** when possible
- Use **clear, descriptive file names**
- Organize related functionality into **separate modules**
- Follow the existing **directory structure**

### Error Handling

- Always **catch and handle errors** appropriately
- Provide **meaningful error messages**
- Use the existing **error formatting patterns**
- Include **context** in error messages

### API Integration

- Follow **Recharge API v2021-11** specifications
- Include **proper request headers**
- Implement **retry logic** for transient failures
- Add **input validation** for all parameters
- Use **consistent parameter naming**

## Testing

### Manual Testing

1. **Test with real API** (if you have access):
   ```bash
   # Set up your API key in .env
   npm run dev
   # Test with MCP client
   ```

2. **Test Docker build**:
   ```bash
   ./scripts/docker-build.sh
   ./scripts/docker-run.sh
   ```

3. **Test validation**:
   ```bash
   ./scripts/validate.sh
   ```

### Adding New Tools

When adding new Recharge API endpoints:

1. **Add tool schema** in `src/tools.js`
2. **Add client method** in `src/recharge-client.js`
3. **Add handler method** in `src/tool-handlers.js`
4. **Register tool** in `index.js`
5. **Update documentation** in README.md
6. **Add usage examples**

### Example: Adding a New Tool

```javascript
// 1. In src/tools.js
export const getNewResourceSchema = {
  name: 'recharge_get_new_resource',
  description: 'Retrieve new resource from Recharge',
  inputSchema: {
    type: 'object',
    properties: {
      resource_id: {
        type: 'string',
        description: 'The resource ID'
      },
      api_key: {
        type: 'string',
        description: 'Optional API key to override the default server API key'
      }
    },
    required: ['resource_id']
  }
};

// 2. In src/recharge-client.js
async getNewResource(resourceId) {
  return this.request(`/new_resources/${resourceId}`);
}

// 3. In src/tool-handlers.js
async handleGetNewResource(args) {
  try {
    this.validateRequired(args, ['resource_id']);
    const client = this.createClient(args);
    const data = await client.getNewResource(args.resource_id);
    return this.formatResponse(data);
  } catch (error) {
    return this.formatError('retrieving new resource', error);
  }
}

// 4. In index.js (add to tools list and switch statement)
```

## Documentation

### README Updates

When making changes that affect usage:

- Update the **Available Tools** section
- Add **Sample Usage** examples
- Update **configuration instructions** if needed
- Add **troubleshooting** information for new features

### Code Documentation

- Add **JSDoc comments** for new functions
- Include **parameter descriptions**
- Document **return values**
- Add **usage examples** in comments

### Changelog

Update `CHANGELOG.md` with:

- **Version number** (follow semantic versioning)
- **Date** of release
- **Added**, **Changed**, **Fixed**, **Removed** sections
- **Clear descriptions** of changes

## Questions and Support

If you have questions about contributing:

1. **Check existing issues** and documentation first
2. **Create a new issue** with the "question" label
3. **Be specific** about what you're trying to accomplish

## Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub contributors** page

Thank you for contributing to the Recharge MCP Server!