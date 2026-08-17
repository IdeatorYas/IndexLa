#!/usr/bin/env bash
# Install INDEXLA deploy script on the VPS (run on server as root after git pull).
set -euo pipefail

APP_DIR="${INDEXLA_APP_DIR:-/var/www/IndexLa}"
SOURCE="${APP_DIR}/scripts/deploy-indexla.sh"
TARGET="/usr/local/bin/deploy-indexla.sh"

if [[ ! -f "$SOURCE" ]]; then
  echo "ERROR: missing ${SOURCE}" >&2
  exit 1
fi

cp "$SOURCE" "$TARGET"
chmod +x "$TARGET"
echo "Installed deploy script: ${TARGET} (copy from ${SOURCE})"
