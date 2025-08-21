#!/bin/bash

# Docker run script for Recharge MCP Server
# Usage: ./scripts/docker-run.sh

set -e

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create one with your RECHARGE_API_KEY"
    echo "Example:"
    echo "RECHARGE_API_KEY=your_api_key_here"
    echo "RECHARGE_API_URL=https://api.rechargeapps.com"
    exit 1
fi

# Load environment variables
source .env

# Check if API key is set
if [ -z "$RECHARGE_API_KEY" ]; then
    echo "❌ RECHARGE_API_KEY not set in .env file"
    exit 1
fi

IMAGE_NAME="recharge-storefront-api-mcp"
CONTAINER_NAME="recharge-storefront-api-mcp"

echo "🐳 Starting Recharge Storefront API MCP Server container..."

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop "${CONTAINER_NAME}" || true
    docker rm "${CONTAINER_NAME}" || true
fi

# Run the container
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p 3000:3000 \
  -e RECHARGE_API_KEY="${RECHARGE_API_KEY}" \
  -e RECHARGE_API_URL="${RECHARGE_API_URL:-https://api.rechargeapps.com}" \
  -e NODE_ENV=production \
  --restart unless-stopped \
  "${IMAGE_NAME}:latest"

echo "✅ Container started successfully!"
echo ""
echo "📊 Container status:"
docker ps --filter "name=${CONTAINER_NAME}"
echo ""
echo "📋 To view logs: docker logs -f ${CONTAINER_NAME}"
echo "🔍 To check health: docker inspect --format='{{json .State.Health}}' ${CONTAINER_NAME}"
echo "🛑 To stop: docker stop ${CONTAINER_NAME}"