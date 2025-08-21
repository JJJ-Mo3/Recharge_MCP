#!/bin/bash

# Docker build script for Recharge MCP Server
# Usage: ./scripts/docker-build.sh [tag]

set -e

# Default tag
TAG=${1:-latest}
IMAGE_NAME="recharge-storefront-api-mcp"

echo "🐳 Building Docker image: ${IMAGE_NAME}:${TAG}"

# Build the image
docker build \
  --tag "${IMAGE_NAME}:${TAG}" \
  --build-arg NODE_ENV=production \
  --label "version=$(node -p "require('./package.json').version")" \
  --label "build-date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
  .

echo "✅ Docker image built successfully: ${IMAGE_NAME}:${TAG}"

# Show image info
docker images "${IMAGE_NAME}:${TAG}"

echo ""
echo "🚀 To run the container:"
echo "docker run -d --name recharge-mcp-server -p 3000:3000 -e RECHARGE_API_KEY=your_key ${IMAGE_NAME}:${TAG}"
echo ""
echo "📋 To use with docker-compose:"
echo "docker-compose up -d"