# Use Node.js LTS version
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Production stage
FROM base AS production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

# Create logs directory
RUN mkdir -p /app/logs && chown -R mcp:nodejs /app/logs

# Change ownership of the app directory
RUN chown -R mcp:nodejs /app
USER mcp

# Expose port (though MCP typically uses stdio)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "const http = require('http'); const req = http.request({hostname: 'localhost', port: 3000, path: '/health', timeout: 5000}, (res) => { res.statusCode === 200 ? process.exit(0) : process.exit(1); }); req.on('error', () => process.exit(1)); req.end();" || exit 1

# Start the server
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]