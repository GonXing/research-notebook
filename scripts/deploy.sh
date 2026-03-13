#!/bin/bash

# Configuration file path (outside project repo)
SECRETS_FILE="../.research_notebook_secrets.env"

# Load secrets
if [ -f "$SECRETS_FILE" ]; then
    source "$SECRETS_FILE"
else
    echo "Error: Secrets file not found at $SECRETS_FILE"
    exit 1
fi

# Validate essential variables
if [ -z "$SERVER_IP" ] || [ -z "$SSH_USER" ] || [ -z "$REMOTE_PATH" ]; then
    echo "Error: SERVER_IP, SSH_USER, or REMOTE_PATH is not set in $SECRETS_FILE"
    exit 1
fi

echo "--- Starting Deployment to $SERVER_IP ---"

# 1. Build the project locally
echo "Step 1: Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Aborting deployment."
    exit 1
fi

# 2. Sync files to the server
echo "Step 2: Syncing files to $SERVER_IP:$REMOTE_PATH..."

# Prepare the secrets file for sync (we want it to be .research_notebook_secrets.env on the server)
# If it's in the current dir, use that. If not, use the one from ../
LOCAL_SECRETS=".research_notebook_secrets.env"
if [ ! -f "$LOCAL_SECRETS" ]; then
    LOCAL_SECRETS="../.research_notebook_secrets.env"
fi

# Use rsync if available (more efficient), otherwise scp
if command -v rsync >/dev/null 2>&1; then
    # Prefer SSH Key if provided
    if [ -n "$SSH_KEY_PATH" ]; then
        rsync -avz --delete -e "ssh -i $SSH_KEY_PATH" \
            --exclude='node_modules' --exclude='.git' --exclude='data/market_indices.json' \
            dist/ scripts posts "$LOCAL_SECRETS" "$SSH_USER@$SERVER_IP:$REMOTE_PATH/"
    else
        rsync -avz --delete \
            --exclude='node_modules' --exclude='.git' --exclude='data/market_indices.json' \
            dist/ scripts posts "$LOCAL_SECRETS" "$SSH_USER@$SERVER_IP:$REMOTE_PATH/"
    fi
else
    echo "rsync not found, falling back to scp (slower, no delete)..."
    scp -r dist/* scripts posts "$LOCAL_SECRETS" "$SSH_USER@$SERVER_IP:$REMOTE_PATH/"
fi

if [ $? -ne 0 ]; then
    echo "Deployment failed during file sync!"
    exit 1
fi

echo "--- Deployment Successful! ---"
echo "URL: http://$SERVER_IP"
