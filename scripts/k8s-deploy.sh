#!/bin/bash

# Kubernetes deployment script for Recharge MCP Server
# Usage: ./scripts/k8s-deploy.sh [environment]

set -e

# Default environment
ENVIRONMENT=${1:-production}
NAMESPACE="recharge-mcp"

echo "🚀 Deploying Recharge MCP Server to Kubernetes (${ENVIRONMENT})"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed or not in PATH"
    exit 1
fi

# Check if we can connect to cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster"
    exit 1
fi

# Function to wait for deployment
wait_for_deployment() {
    local deployment_name=$1
    local namespace=$2
    
    echo "⏳ Waiting for deployment ${deployment_name} to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/${deployment_name} -n ${namespace}
}

# Function to check if namespace exists
check_namespace() {
    if kubectl get namespace ${NAMESPACE} &> /dev/null; then
        echo "✅ Namespace ${NAMESPACE} already exists"
    else
        echo "📦 Creating namespace ${NAMESPACE}..."
        kubectl apply -f k8s/namespace.yaml
    fi
}

# Function to update secret with API key
update_secret() {
    if [ -z "$RECHARGE_API_KEY" ]; then
        echo "⚠️  RECHARGE_API_KEY environment variable not set"
        echo "Please set it before deploying:"
        echo "export RECHARGE_API_KEY=your_api_key_here"
        echo ""
        echo "Or update the secret manually after deployment:"
        echo "kubectl create secret generic recharge-mcp-secret --from-literal=RECHARGE_API_KEY=your_key -n ${NAMESPACE}"
        return
    fi
    
    echo "🔐 Updating secret with API key..."
    kubectl create secret generic recharge-mcp-secret \
        --from-literal=RECHARGE_API_KEY="${RECHARGE_API_KEY}" \
        --namespace=${NAMESPACE} \
        --dry-run=client -o yaml | kubectl apply -f -
}

# Main deployment steps
echo "🔍 Checking cluster connection..."
kubectl cluster-info

echo "📋 Current context: $(kubectl config current-context)"
echo ""

# Check and create namespace
check_namespace

# Update secret if API key is provided
update_secret

# Apply all Kubernetes manifests
echo "📦 Applying Kubernetes manifests..."
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/networkpolicy.yaml

# Apply ingress if specified
if [ "$2" = "with-ingress" ]; then
    echo "🌐 Applying ingress configuration..."
    kubectl apply -f k8s/ingress.yaml
fi

# Wait for deployment to be ready
wait_for_deployment "recharge-mcp-server" "${NAMESPACE}"

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Deployment status:"
kubectl get deployments -n ${NAMESPACE}
echo ""
echo "🔍 Pod status:"
kubectl get pods -n ${NAMESPACE}
echo ""
echo "🌐 Service status:"
kubectl get services -n ${NAMESPACE}
echo ""

# Show useful commands
echo "📋 Useful commands:"
echo "View logs: kubectl logs -f deployment/recharge-mcp-server -n ${NAMESPACE}"
echo "Scale deployment: kubectl scale deployment recharge-mcp-server --replicas=3 -n ${NAMESPACE}"
echo "Port forward: kubectl port-forward service/recharge-mcp-service 8080:80 -n ${NAMESPACE}"
echo "Delete deployment: kubectl delete namespace ${NAMESPACE}"
echo ""

# Check health endpoint if port-forward is possible
echo "🏥 Testing health endpoint..."
kubectl port-forward service/recharge-mcp-service 8080:80 -n ${NAMESPACE} &
PORT_FORWARD_PID=$!
sleep 5

if curl -s http://localhost:8080/health > /dev/null; then
    echo "✅ Health check passed!"
else
    echo "⚠️  Health check failed - check pod logs"
fi

# Clean up port-forward
kill $PORT_FORWARD_PID 2>/dev/null || true

echo "🎉 Kubernetes deployment complete!"