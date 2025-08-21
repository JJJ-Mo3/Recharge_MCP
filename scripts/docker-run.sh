#!/bin/bash

# Docker run script for Recharge MCP Server
# Usage: ./scripts/docker-run.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found. Please create one with your RECHARGE_API_KEY${NC}"
    echo -e "${YELLOW}Example:${NC}"
    echo -e "${BLUE}RECHARGE_API_KEY=your_api_key_here${NC}"
    echo -e "${BLUE}RECHARGE_API_URL=https://api.rechargeapps.com${NC}"
    exit 1
fi

# Load environment variables
source .env

# Check if API key is set
if [ -z "$RECHARGE_API_KEY" ]; then
    echo -e "${RED}❌ RECHARGE_API_KEY not set in .env file${NC}"
    exit 1
fi

IMAGE_NAME="recharge-mcp-server"
CONTAINER_NAME="recharge-mcp-server"

echo -e "${BLUE}🐳 Starting Recharge MCP Server container...${NC}"

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${YELLOW}🛑 Stopping existing container...${NC}"
    docker stop "${CONTAINER_NAME}" || true
    docker rm "${CONTAINER_NAME}" || true
fi

# Check if image exists
if ! docker images --format 'table {{.Repository}}:{{.Tag}}' | grep -q "^${IMAGE_NAME}:latest$"; then
    echo -e "${YELLOW}⚠️  Image ${IMAGE_NAME}:latest not found. Building it first...${NC}"
    ./scripts/docker-build.sh latest
fi

# Run the container
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p 3000:3000 \
  -e RECHARGE_API_KEY="${RECHARGE_API_KEY}" \
  -e RECHARGE_API_URL="${RECHARGE_API_URL:-https://api.rechargeapps.com}" \
  -e NODE_ENV=production \
  -v "$(pwd)/logs:/app/logs" \
  --restart unless-stopped \
  "${IMAGE_NAME}:latest"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully!${NC}"
else
    echo -e "${RED}❌ Failed to start container${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📊 Container status:${NC}"
docker ps --filter "name=${CONTAINER_NAME}"
echo ""
echo -e "${GREEN}📋 Useful commands:${NC}"
echo -e "${BLUE}View logs: docker logs -f ${CONTAINER_NAME}${NC}"
echo -e "${BLUE}Check health: docker inspect --format='{{json .State.Health}}' ${CONTAINER_NAME}${NC}"
echo -e "${BLUE}Stop container: docker stop ${CONTAINER_NAME}${NC}"
echo -e "${BLUE}Remove container: docker rm ${CONTAINER_NAME}${NC}"
echo ""
echo -e "${GREEN}🌐 Health check: curl http://localhost:3000/health${NC}"