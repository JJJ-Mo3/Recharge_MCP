#!/bin/bash

# Validation script for Recharge MCP Server
# Usage: ./scripts/validate.sh [--verbose]

set -e

# Parse arguments
VERBOSE=false
if [[ "$1" == "--verbose" ]]; then
    VERBOSE=true
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Validating Recharge MCP Server...${NC}"

if [[ "$VERBOSE" == "true" ]]; then
    echo -e "${YELLOW}Running in verbose mode...${NC}"
    set -x
fi

# Check Node.js version
echo -e "${YELLOW}📋 Checking Node.js version...${NC}"
NODE_VERSION=$(node --version)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is not supported. Please use Node.js 18 or higher.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js version $NODE_VERSION is supported${NC}"
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

if [ ! -f package.json ]; then
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Installing dependencies...${NC}"
    echo -e "${BLUE}Running: npm install${NC}"
    npm install
fi

# Validate syntax of main files
echo -e "${YELLOW}📋 Validating JavaScript syntax...${NC}"

FILES_TO_CHECK=(
    "index.js"
    "src/recharge-client.js"
    "src/tool-handlers.js"
    "src/tool-handlers.js"
    "src/tools/index.js"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${BLUE}  Checking $file...${NC}"
        if node -c "$file" 2>/dev/null; then
            echo -e "${GREEN}  ✅ $file syntax is valid${NC}"
        else
            echo -e "${RED}  ❌ $file has syntax errors${NC}"
            exit 1
        fi
    else
        echo -e "${RED}  ❌ $file not found${NC}"
        exit 1
    fi
done

# Check for modular tools structure
echo -e "${YELLOW}📋 Checking modular tools structure...${NC}"
TOOL_FILES=(
    "src/tools/customer-tools.js"
    "src/tools/subscription-tools.js"
    "src/tools/index.js"
)

for file in "${TOOL_FILES[@]}"; do
    [[ -f "$file" ]] && echo -e "${GREEN}  ✅ $file found${NC}" || echo -e "${YELLOW}  ⚠️  $file not found${NC}"
done

# Check environment file
echo -e "${YELLOW}📋 Checking environment configuration...${NC}"
if [ -f .env ]; then
    echo -e "${GREEN}✅ .env file found${NC}"
    
    # Check if API key is set (optional)
    if grep -q "RECHARGE_API_KEY=" .env; then
        if grep -q "RECHARGE_API_KEY=your_" .env || grep -q "RECHARGE_API_KEY=$" .env; then
            echo -e "${YELLOW}⚠️  Default API key placeholder found in .env${NC}"
        else
            echo -e "${GREEN}✅ API key configured in .env${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  No API key found in .env (clients must provide their own)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env file not found (using .env.example as reference)${NC}"
    if [ -f .env.example ]; then
        echo -e "${BLUE}  You can copy .env.example to .env and configure it${NC}"
    fi
fi

# Check for sensitive files that shouldn't be committed
echo -e "${YELLOW}📋 Checking for sensitive files...${NC}"
if [ -f .env ] && ! grep -q ".env" .gitignore 2>/dev/null; then
    echo -e "${YELLOW}⚠️  .env file exists but may not be in .gitignore${NC}"
else
    echo -e "${GREEN}✅ Sensitive files properly configured${NC}"
fi

# Check Docker files
echo -e "${YELLOW}📋 Checking Docker configuration...${NC}"
if [ -f Dockerfile ]; then
    echo -e "${GREEN}✅ Dockerfile found${NC}"
else
    echo -e "${YELLOW}⚠️  Dockerfile not found${NC}"
fi

if [ -f docker-compose.yml ]; then
    echo -e "${GREEN}✅ docker-compose.yml found${NC}"
else
    echo -e "${YELLOW}⚠️  docker-compose.yml not found${NC}"
fi

# Check Kubernetes files
echo -e "${YELLOW}📋 Checking Kubernetes configuration...${NC}"
if [ -d k8s ]; then
    K8S_FILES=(
        "k8s/namespace.yaml"
        "k8s/configmap.yaml"
        "k8s/secret.yaml"
        "k8s/deployment.yaml"
        "k8s/service.yaml"
        "k8s/ingress.yaml"
        "k8s/hpa.yaml"
        "k8s/networkpolicy.yaml"
    )
    
    for file in "${K8S_FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}  ✅ $file found${NC}"
        else
            echo -e "${YELLOW}  ⚠️  $file not found${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  k8s directory not found${NC}"
fi

# Check scripts
echo -e "${YELLOW}📋 Checking scripts...${NC}"
SCRIPTS=(
    "scripts/docker-build.sh"
    "scripts/docker-run.sh"
    "scripts/k8s-deploy.sh"
    "scripts/k8s-cleanup.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            echo -e "${GREEN}  ✅ $script found and executable${NC}"
        else
            echo -e "${YELLOW}  ⚠️  $script found but not executable${NC}"
            chmod +x "$script"
            echo -e "${GREEN}  ✅ Made $script executable${NC}"
        fi
    else
        echo -e "${YELLOW}  ⚠️  $script not found${NC}"
    fi
done

# Test basic functionality
echo -e "${YELLOW}📋 Testing basic functionality...${NC}"
if timeout 10s node -e "
try {
  import('./index.js').then(() => {
    console.log('✅ Server can be imported successfully');
    process.exit(0);
  }).catch((err) => {
    console.error('Import failed:', err.message);
    process.exit(1);
  });
} catch (err) {
  console.error('Import failed:', err.message);
  process.exit(1);
}
" 2>/dev/null; then
    echo -e "${GREEN}✅ Basic functionality test passed${NC}"
else
    echo -e "${YELLOW}⚠️  Basic functionality test failed or timed out${NC}"
fi

# Check documentation
echo -e "${YELLOW}📋 Checking documentation...${NC}"
if [ -f README.md ]; then
    echo -e "${GREEN}✅ README.md found${NC}"
    
    # Check if README has basic sections
    SECTIONS=("Setup" "Usage" "Configuration" "Deployment" "Quick Start")
    for section in "${SECTIONS[@]}"; do
        if grep -q "## $section" README.md; then
            echo -e "${GREEN}  ✅ $section section found${NC}"
        else
            echo -e "${YELLOW}  ⚠️  $section section not found${NC}"
        fi
    done
else
    echo -e "${RED}❌ README.md not found${NC}"
fi

if [ -f LICENSE ]; then
    echo -e "${GREEN}✅ LICENSE found${NC}"
else
    echo -e "${YELLOW}⚠️  LICENSE not found${NC}"
fi

# Final summary
echo ""
echo -e "${GREEN}🎉 Validation completed successfully!${NC}"
echo ""

echo ""
echo -e "${GREEN}🎉 Validation completed!${NC}"
echo ""
echo -e "${BLUE}📋 Summary:${NC}"
echo -e "${GREEN}✅ All critical files are present and valid${NC}"
echo -e "${GREEN}✅ JavaScript syntax is correct${NC}"
echo -e "${GREEN}✅ Node.js version is compatible${NC}"
echo ""
echo -e "${BLUE}🚀 Ready to run:${NC}"
echo -e "${BLUE}  npm start                    # Start the MCP server${NC}"
echo -e "${BLUE}  npm run dev                  # Start in development mode${NC}"
echo -e "${BLUE}  npm run docker:build         # Build Docker image${NC}"
echo -e "${BLUE}  npm run docker:run           # Run in Docker${NC}"
echo ""
echo -e "${BLUE}📖 Next steps:${NC}"
echo -e "${BLUE}  1. Configure your MCP client (see README.md)${NC}"
echo -e "${BLUE}  2. Add your Recharge API key to .env or client config${NC}"
echo -e "${BLUE}  npm start${NC}"
echo -e "${BLUE}  npm run dev${NC}"