#!/bin/bash

# Kubernetes cleanup script for Recharge MCP Server
# Usage: ./scripts/k8s-cleanup.sh

set -e

NAMESPACE="recharge-mcp"

echo "🧹 Cleaning up Recharge MCP Server from Kubernetes"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed or not in PATH"
    exit 1
fi

# Check if namespace exists
if ! kubectl get namespace ${NAMESPACE} &> /dev/null; then
    echo "✅ Namespace ${NAMESPACE} doesn't exist, nothing to clean up"
    exit 0
fi

echo "📋 Current resources in namespace ${NAMESPACE}:"
kubectl get all -n ${NAMESPACE}
echo ""

# Confirm deletion
read -p "Are you sure you want to delete all resources in namespace ${NAMESPACE}? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cleanup cancelled"
    exit 1
fi

echo "🗑️  Deleting all resources..."

# Delete individual resources first (graceful)
kubectl delete ingress --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete hpa --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete service --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete deployment --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete configmap --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete secret --all -n ${NAMESPACE} --ignore-not-found=true
kubectl delete networkpolicy --all -n ${NAMESPACE} --ignore-not-found=true

# Wait a moment for graceful deletion
echo "⏳ Waiting for resources to be deleted..."
sleep 10

# Delete the namespace
echo "🗑️  Deleting namespace ${NAMESPACE}..."
kubectl delete namespace ${NAMESPACE} --ignore-not-found=true

echo "✅ Cleanup completed successfully!"
echo "🔍 Remaining namespaces:"
kubectl get namespaces | grep recharge || echo "No recharge-related namespaces found"