#!/bin/bash
# Build script for Azure Static Web Apps
# This script replaces environment variable placeholders with actual values

echo "Starting build process..."

# Replace the placeholder in config.js with the actual environment variable
if [ -n "$API_ENDPOINT" ]; then
    echo "Configuring API endpoint: $API_ENDPOINT"
    sed -i "s|#{API_ENDPOINT}#|$API_ENDPOINT|g" config.js
else
    echo "Warning: API_ENDPOINT environment variable not set"
    echo "Using default placeholder value"
fi

echo "Build completed successfully!"
