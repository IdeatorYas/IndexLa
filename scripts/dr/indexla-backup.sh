#!/usr/bin/env bash
#
# INDEXLA — production backup (read-only, no PM2/nginx restart)
#
# Backs up: nginx, PM2 dump, deploy manifests, static public assets,
# encrypted environment files, optional PostgreSQL dump.
#
# Does NOT: stop services, modify live app dirs, commit secrets to git.
#
set -euo pipefail

CONFIG="${INDEXLA_DR_CONFIG:-/root/.indexla-dr/config.env}"
[[ -f "$CONFIG" ]] && source "$CONFIG"

BACKUP_ROOT="${INDEXLA_DR_BACKUP_ROOT:-/var/backups/indexla}"
PASSPHRASE_FILE="${INDEXLA_DR_PASSPHRASE_FILE:-/root/.indexla-dr/passphrase}"
DAILY_RETENTION="${INDEXLA_DR_DAILY_RETENTION_DAYS:-7}"
WEEKLY_RETENTION="${INDEXLA_DR_WEEKLY_RETENTION_DAYS:-28}"
WEBSITE_DIR="${INDEXLA_WEBSITE_DIR:-/var/www/IndexLa}"
APP_DIR="${INDEXLA_APP_DIR:-/var/www/IndexLa-App}"
LOG="${INDEXLA_DR_LOG:-/var/log/indexla-dr-backup.log}"

WEBSITE_REPO="${INDEXLA_WEBSITE_REPO:-https://github.com/IdeatorYas/IndexLa.git}"
APP_REPO="${INDEXLA_APP_REPO:-https://github.com/IdeatorYas/IndexlaApp.git}"

STAMP="$(date -u +%Y%m%d-%H%M%S)"
DAY="$(date -u +%u)"
STAGING="${BACKUP_ROOT}/staging/${STAMP}"
ARCHIVE_NAME="indexla-dr-${STAMP}.tar.gz"
DAILY_DIR="${BACKUP_ROOT}/daily"
WEEKLY_DIR="${BACKUP_ROOT}/weekly"

mkdir -p "$STAGING" "$DAILY_DIR" "$WEEKLY_DIR" "$(dirname "$LOG")"
exec >>"$LOG" 2>&1

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"
}

env_key_names_json() {
  local file="$1"
  local keys=""
  if [[ -f "$file" ]]; then
    keys="$(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$file" | cut -d= -f1 | sort -u | sed 's/.*/"&"/' | paste -sd, -)"
  fi
  printf '[%s]' "${keys:-}"
}

copy_if_exists() {
  local src="$1"
  local dest="$2"
  if [[ -e "$src" ]]; then
    mkdir -p "$(dirname "$dest")"
    cp -a "$src" "$dest"
  fi
}

encrypt_env_files() {
  local out_dir="$1"
  mkdir -p "$out_dir"
  if [[ ! -f "$PASSPHRASE_FILE" ]]; then
    log "WARN: passphrase missing ($PASSPHRASE_FILE) — skipping encrypted env backup"
    echo "env_encryption=skipped_no_passphrase" >"$out_dir/ENCRYPTION_STATUS"
    return 0
  fi
  local f
  for f in "${WEBSITE_DIR}/.env.local" "${APP_DIR}/.env.local"; do
    [[ -f "$f" ]] || continue
    local base
    base="$(basename "$(dirname "$f")")"
    gpg --batch --yes --symmetric --cipher-algo AES256 \
      --passphrase-file "$PASSPHRASE_FILE" \
      --output "${out_dir}/${base}.env.local.gpg" "$f"
    log "ENCRYPTED: $f → ${base}.env.local.gpg"
  done
  echo "env_encryption=gpg_aes256" >"$out_dir/ENCRYPTION_STATUS"
}

read_env_value() {
  local file="$1"
  local key="$2"
  [[ -f "$file" ]] || return 1
  grep -E "^${key}=" "$file" | head -1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//" -e 's/\r$//'
}

dump_database_if_possible() {
  local out_dir="$1"
  mkdir -p "$out_dir"
  local env_file="${WEBSITE_DIR}/.env.local"
  if [[ ! -f "$env_file" ]]; then
    echo "database=skipped_no_env" >"$out_dir/DATABASE_STATUS"
    return 0
  fi
  local db_url
  db_url="$(read_env_value "$env_file" "DATABASE_URL" || true)"
  if [[ -z "${db_url:-}" ]]; then
    echo "database=skipped_no_database_url" >"$out_dir/DATABASE_STATUS"
    return 0
  fi
  if ! command -v pg_dump >/dev/null 2>&1; then
    log "WARN: pg_dump not installed — external DB must be backed up at provider"
    echo "database=skipped_no_pg_dump_client" >"$out_dir/DATABASE_STATUS"
    echo "database_provider_backup_required=true" >>"$out_dir/DATABASE_STATUS"
    return 0
  fi
  pg_dump "$db_url" --no-owner --format=custom --file "${out_dir}/website-postgres.dump"
  log "DATABASE: pg_dump written"
  echo "database=pg_dump_custom" >"$out_dir/DATABASE_STATUS"
}

write_manifest() {
  local manifest="$STAGING/MANIFEST.json"
  local website_head="unknown"
  local website_short="unknown"
  if git -C "$WEBSITE_DIR" rev-parse HEAD >/dev/null 2>&1; then
    website_head="$(git -C "$WEBSITE_DIR" rev-parse HEAD)"
    website_short="$(git -C "$WEBSITE_DIR" rev-parse --short HEAD)"
  fi
  local app_commit="unknown"
  [[ -f "${APP_DIR}/.deploy-source-commit" ]] && app_commit="$(tr -d ' \r\n' <"${APP_DIR}/.deploy-source-commit")"
  local app_good="unknown"
  [[ -f "${APP_DIR}/.deploy-good-commit" ]] && app_good="$(tr -d ' \r\n' <"${APP_DIR}/.deploy-good-commit")"
  local website_good="unknown"
  [[ -f "${WEBSITE_DIR}/.deploy-good-commit" ]] && website_good="$(tr -d ' \r\n' <"${WEBSITE_DIR}/.deploy-good-commit")"
  local app_is_git="false"
  git -C "$APP_DIR" rev-parse HEAD >/dev/null 2>&1 && app_is_git="true"

  cat >"$manifest" <<EOF
{
  "backup_stamp": "${STAMP}",
  "backup_utc": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "hostname": "$(hostname -f 2>/dev/null || hostname)",
  "website": {
    "path": "${WEBSITE_DIR}",
    "git_head": "${website_head}",
    "git_short": "${website_short}",
    "repo": "${WEBSITE_REPO}",
    "branch": "master",
    "deploy_good_commit": "${website_good}"
  },
  "app": {
    "path": "${APP_DIR}",
    "deploy_source_commit": "${app_commit}",
    "deploy_good_commit": "${app_good}",
    "repo": "${APP_REPO}",
    "branch": "main",
    "is_git_clone": ${app_is_git}
  },
  "pm2_processes": ["indexla", "indexla-app"],
  "nginx_sites": ["indexla", "indexla-app"],
  "website_env_keys": $(env_key_names_json "${WEBSITE_DIR}/.env.local"),
  "app_env_keys": $(env_key_names_json "${APP_DIR}/.env.local"),
  "notes": "Secrets are in encrypted/*.gpg only. Rebuild apps from GitHub + deploy scripts."
}
EOF
}

log "START backup ${STAMP}"

write_manifest

mkdir -p "${STAGING}/nginx" "${STAGING}/pm2" "${STAGING}/deploy" "${STAGING}/encrypted" "${STAGING}/database" "${STAGING}/static"

copy_if_exists "/etc/nginx/sites-enabled/indexla" "${STAGING}/nginx/indexla"
copy_if_exists "/etc/nginx/sites-enabled/indexla-app" "${STAGING}/nginx/indexla-app"
copy_if_exists "/etc/nginx/nginx.conf" "${STAGING}/nginx/nginx.conf"
copy_if_exists "/root/.pm2/dump.pm2" "${STAGING}/pm2/dump.pm2"
pm2 list --no-color >"${STAGING}/pm2/pm2-list.txt" 2>/dev/null || true

for marker in .deploy-state .deploy-good-commit .deploy-good-commit-full .deploy-source-commit; do
  copy_if_exists "${WEBSITE_DIR}/${marker}" "${STAGING}/deploy/website-${marker}"
  copy_if_exists "${APP_DIR}/${marker}" "${STAGING}/deploy/app-${marker}"
done

copy_if_exists "/usr/local/bin/deploy-indexla.sh" "${STAGING}/deploy/deploy-indexla.sh"
copy_if_exists "/usr/local/bin/deploy-indexla-app.sh" "${STAGING}/deploy/deploy-indexla-app.sh"
copy_if_exists "/usr/local/bin/indexla-dr-backup.sh" "${STAGING}/deploy/indexla-dr-backup.sh"
copy_if_exists "/usr/local/bin/indexla-dr-offsite-sync.sh" "${STAGING}/deploy/indexla-dr-offsite-sync.sh"

if [[ -d "${WEBSITE_DIR}/public" ]]; then
  tar -C "$WEBSITE_DIR" -czf "${STAGING}/static/website-public.tar.gz" public
fi

encrypt_env_files "${STAGING}/encrypted"
dump_database_if_possible "${STAGING}/database"

tar -C "${BACKUP_ROOT}/staging" -czf "${DAILY_DIR}/${ARCHIVE_NAME}" "$STAMP"
rm -rf "$STAGING"

if [[ "$DAY" == "7" ]]; then
  cp -a "${DAILY_DIR}/${ARCHIVE_NAME}" "${WEEKLY_DIR}/${ARCHIVE_NAME}"
  log "WEEKLY: copied to ${WEEKLY_DIR}/${ARCHIVE_NAME}"
fi

find "$DAILY_DIR" -type f -name 'indexla-dr-*.tar.gz' -mtime +"$DAILY_RETENTION" -delete 2>/dev/null || true
find "$WEEKLY_DIR" -type f -name 'indexla-dr-*.tar.gz' -mtime +"$WEEKLY_RETENTION" -delete 2>/dev/null || true

log "LOCAL: ${DAILY_DIR}/${ARCHIVE_NAME}"

if [[ -x /usr/local/bin/indexla-dr-offsite-sync.sh ]]; then
  INDEXLA_DR_ARCHIVE="${DAILY_DIR}/${ARCHIVE_NAME}" /usr/local/bin/indexla-dr-offsite-sync.sh || log "WARN: offsite sync failed"
fi

log "DONE backup ${STAMP}"
