#!/usr/bin/env bash
# Install INDEXLA deploy wrapper on the VPS (run once on server as root).
set -euo pipefail

APP_DIR="${INDEXLA_APP_DIR:-/var/www/IndexLa}"
TARGET="/usr/local/bin/deploy-indexla.sh"

cat >"$TARGET" <<EOF
#!/usr/bin/env bash
set -euo pipefail
exec ${APP_DIR}/scripts/deploy-indexla.sh "\$@"
EOF

chmod +x "$TARGET"
chmod +x "${APP_DIR}/scripts/deploy-indexla.sh"

echo "Installed wrapper: ${TARGET} -> ${APP_DIR}/scripts/deploy-indexla.sh"
