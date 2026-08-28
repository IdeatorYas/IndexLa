#!/usr/bin/env bash
#
# INDEXLA — read-only production inventory (env key names only)
#
set -euo pipefail

WEBSITE_DIR="${INDEXLA_WEBSITE_DIR:-/var/www/IndexLa}"
APP_DIR="${INDEXLA_APP_DIR:-/var/www/IndexLa-App}"
OUT="${1:-/tmp/indexla-production-inventory.json}"

env_keys_json() {
  local file="$1"
  local keys=""
  if [[ -f "$file" ]]; then
    keys="$(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$file" | cut -d= -f1 | sort -u | sed 's/.*/"&"/' | paste -sd, -)"
  fi
  printf '[%s]' "${keys:-}"
}

website_head="unknown"
website_short="unknown"
if git -C "$WEBSITE_DIR" rev-parse HEAD >/dev/null 2>&1; then
  website_head="$(git -C "$WEBSITE_DIR" rev-parse HEAD)"
  website_short="$(git -C "$WEBSITE_DIR" rev-parse --short HEAD)"
fi

app_commit="unknown"
[[ -f "${APP_DIR}/.deploy-source-commit" ]] && app_commit="$(tr -d ' \r\n' <"${APP_DIR}/.deploy-source-commit")"

cat >"$OUT" <<EOF
{
  "collected_utc": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "hostname": "$(hostname -f 2>/dev/null || hostname)",
  "public_urls": ["https://indexla.tech", "https://app.indexla.tech/app"],
  "website": {
    "path": "${WEBSITE_DIR}",
    "git_head": "${website_head}",
    "git_short": "${website_short}",
    "repo": "https://github.com/IdeatorYas/IndexLa.git",
    "branch": "master",
    "pm2": "indexla",
    "port": 3000,
    "env_keys": $(env_keys_json "${WEBSITE_DIR}/.env.local")
  },
  "app": {
    "path": "${APP_DIR}",
    "deploy_source_commit": "${app_commit}",
    "repo": "https://github.com/IdeatorYas/IndexlaApp.git",
    "branch": "main",
    "pm2": "indexla-app",
    "port": 3001,
    "env_keys": $(env_keys_json "${APP_DIR}/.env.local")
  },
  "nginx_sites": ["/etc/nginx/sites-enabled/indexla", "/etc/nginx/sites-enabled/indexla-app"],
  "deploy_scripts": ["/usr/local/bin/deploy-indexla.sh", "/usr/local/bin/deploy-indexla-app.sh"],
  "postgresql_on_vps": $(systemctl is-active postgresql >/dev/null 2>&1 && echo '"active"' || echo '"inactive"'),
  "notes": "Values never included. External DATABASE_URL provider must have its own backup policy."
}
EOF

echo "$OUT"
