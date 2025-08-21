#!/bin/bash

# Docker build script for Recharge MCP Server
# Usage: ./scripts/docker-build.sh [tag]

set -e

# Default tag
TAG=${1:-latest}
IMAGE_NAME="recharge-mcp-server"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Building Docker image: ${IMAGE_NAME}:${TAG}${NC}"

# Check if Dockerfile exists
if [ ! -f Dockerfile ]; then
    echo -e "${RED}❌ Dockerfile not found${NC}"
    exit 1
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

# Get version from package.json
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "unknown")
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
echo -e "${YELLOW}📦 Version: ${VERSION}${NC}"
echo -e "${YELLOW}📅 Build Date: ${BUILD_DATE}${NC}"

# Build the image
echo -e "${BLUE}🔨 Building image...${NC}"
docker build \
  --tag "${IMAGE_NAME}:${TAG}" \
  --build-arg NODE_ENV=production \
  --label "version=${VERSION}" \
  --label "build-date=${BUILD_DATE}" \
  --label "git-commit=$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" \
  .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully: ${IMAGE_NAME}:${TAG}${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Show image info
echo -e "${BLUE}📊 Image information:${NC}"
docker images "${IMAGE_NAME}:${TAG}"

# Show image size
IMAGE_SIZE=$(docker images --format "table {{.Size}}" "${IMAGE_NAME}:${TAG}" | tail -n 1)
echo -e "${YELLOW}📏 Image size: ${IMAGE_SIZE}${NC}"

echo ""
echo -e "${GREEN}🚀 To run the container:${NC}"
echo -e "${BLUE}docker run -d --name recharge-mcp-server -p 3000:3000 -e RECHARGE_API_KEY=your_key ${IMAGE_NAME}:${TAG}${NC}"
echo ""
echo -e "${GREEN}📋 To use with docker-compose:${NC}"
echo -e "${BLUE}docker-compose up -d${NC}"