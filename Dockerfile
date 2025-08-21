# Use Node.js LTS version
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Add metadata labels
LABEL maintainer="Recharge MCP Server Team"
LABEL version="1.1.0"
LABEL description="Recharge MCP Server for API v2021-11"

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user early
RUN addgroup -g 1001 -S nodejs && adduser -S mcp -u 1001
# Production stage
FROM base AS production

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies as root, then change ownership
RUN npm ci --only=production && \
    npm cache clean --force && \
    chown -R mcp:nodejs /app/node_modules

# Copy source code
COPY . .


# Create logs directory and set permissions
RUN mkdir -p /app/logs && \
    chown -R mcp:nodejs /app && \
    chmod +x /app/scripts/*.sh 2>/dev/null || true

# Switch to non-root user
USER mcp

# Expose port (though MCP typically uses stdio)
EXPOSE 3000

# Add health check with better error handling
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e " \
    const http = require('http'); \
    const options = { \
      hostname: 'localhost', \
      port: 3000, \
      path: '/health', \
      timeout: 5000, \
      method: 'GET' \
    }; \
    const req = http.request(options, (res) => { \
      if (res.statusCode === 200) { \
        console.log('Health check passed'); \
        process.exit(0); \
      } else { \
        console.error('Health check failed with status:', res.statusCode); \
        process.exit(1); \
      } \
    }); \
    req.on('error', (err) => { \
      console.error('Health check error:', err.message); \
      process.exit(1); \
    }); \
    req.on('timeout', () => { \
      console.error('Health check timeout'); \
      req.destroy(); \
      process.exit(1); \
    }); \
    req.end(); \
  "
# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]