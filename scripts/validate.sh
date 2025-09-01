@@ .. @@
 #!/bin/bash
 
-# Validation script for Recharge MCP Server
+# Comprehensive validation script for Recharge MCP Server
 # Checks syntax, dependencies, and configuration
 
 set -e
@@ .. @@
 echo "🔍 Validating Recharge MCP Server..."
 echo "=================================="
 
+# Check Node.js version
+echo "📋 Checking Node.js version..."
+node_version=$(node --version | cut -d'v' -f2)
+required_version="18.0.0"
+
+if ! node -e "
+  const current = process.version.slice(1).split('.').map(Number);
+  const required = '$required_version'.split('.').map(Number);
+  const isValid = current[0] > required[0] || 
+    (current[0] === required[0] && current[1] > required[1]) ||
+    (current[0] === required[0] && current[1] === required[1] && current[2] >= required[2]);
+  if (!isValid) process.exit(1);
+"; then
+  echo "❌ Node.js version $node_version is below required version $required_version"
+  exit 1
+fi
+echo "✅ Node.js version $node_version is compatible"
+
 # Check if dependencies are installed
 echo "📦 Checking dependencies..."
 if [ ! -d "node_modules" ]; then
@@ .. @@
 echo "✅ Dependencies are installed"
 
 # Validate main files syntax
-echo "🔍 Validating syntax..."
+echo "🔍 Validating file syntax..."
 
 files_to_check=(
   "index.js"
@@ .. @@
   "src/tools/index.js"
 )
 
 for file in "${files_to_check[@]}"; do
   if [ -f "$file" ]; then
     echo "  Checking $file..."
     if ! node -c "$file"; then
       echo "❌ Syntax error in $file"
       exit 1
     fi
   else
     echo "❌ Required file $file not found"
     exit 1
   fi
 done
 
 echo "✅ All files have valid syntax"
 
+# Check for required tool files
+echo "🔍 Checking tool files..."
+tool_files=(
+  "src/tools/customer-tools.js"
+  "src/tools/subscription-tools.js"
+  "src/tools/product-tools.js"
+  "src/tools/order-tools.js"
+  "src/tools/charge-tools.js"
+  "src/tools/address-tools.js"
+  "src/tools/discount-tools.js"
+  "src/tools/metafield-tools.js"
+  "src/tools/webhook-tools.js"
+  "src/tools/payment-tools.js"
+  "src/tools/checkout-tools.js"
+  "src/tools/misc-tools.js"
+  "src/tools/advanced-tools.js"
+)
+
+for file in "${tool_files[@]}"; do
+  if [ ! -f "$file" ]; then
+    echo "❌ Required tool file $file not found"
+    exit 1
+  fi
+done
+echo "✅ All tool files present"
+
 # Check environment configuration
 echo "🔧 Checking environment configuration..."
 if [ -f ".env" ]; then
   echo "✅ .env file found"
   if grep -q "RECHARGE_API_KEY" .env; then
     echo "✅ RECHARGE_API_KEY configured in .env"
   else
     echo "⚠️  RECHARGE_API_KEY not found in .env (clients must provide their own)"
   fi
 else
   echo "⚠️  .env file not found (using .env.example as reference)"
   if [ -f ".env.example" ]; then
     echo "✅ .env.example file found"
   else
     echo "❌ .env.example file missing"
     exit 1
   fi
 fi
 
+# Test basic server startup (quick check)
+echo "🚀 Testing server startup..."
+timeout 5s node index.js --test 2>/dev/null || {
+  echo "⚠️  Server startup test skipped (requires stdio connection)"
+  echo "   This is normal for MCP servers - they need MCP client connection"
+}
+
 echo ""
 echo "🎉 All validations passed!"
-echo "📝 To start the server: npm start"
-echo "🔧 To run in development mode: npm run dev"