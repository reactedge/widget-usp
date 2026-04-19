#!/bin/bash
set -e

WIDGET_NAME=$1
BASE_DIR="www"

if [ -z "$WIDGET_NAME" ]; then
  echo "Usage: build-widget.sh <widget-name>"
  exit 1
fi

VERSION=$(node -p "require('./vite_project/package.json').version")

FILE="${BASE_DIR}/widget-${WIDGET_NAME}@${VERSION}.iife.js"

if [ ! -f "$FILE" ]; then
  echo "ERROR: build file not found: $FILE"
  exit 1
fi

# IMPORTANT: keep base64 (NOT url-safe) for SRI
HASH=$(openssl dgst -sha256 -binary "$FILE" | openssl base64 -A)

NEW_FILE="${BASE_DIR}/widget-${WIDGET_NAME}@${HASH}.iife.js"

mv "$FILE" "$NEW_FILE"

MANIFEST="${BASE_DIR}/widget-${WIDGET_NAME}.manifest.json"

cat <<EOF > "$MANIFEST"
{
  "widget": "${WIDGET_NAME}",
  "version": "${VERSION}",
  "hash": "${HASH}",
  "filename": "widget-${WIDGET_NAME}@${HASH}.iife.js",
  "built_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "version=$VERSION" >> $GITHUB_OUTPUT
echo "hash=$HASH" >> $GITHUB_OUTPUT
echo "file=$NEW_FILE" >> $GITHUB_OUTPUT