#!/bin/sh

# Wait for all Redis nodes to be available
sleep 5

# Run the Redis cluster create command
echo "Creating Redis cluster..."
echo "yes" | redis-cli --cluster create \
  redis-node-1:6379 \
  redis-node-2:6379 \
  redis-node-3:6379 \
  --cluster-replicas 0
echo "Redis cluster created!"