#!/usr/bin/env bash
#
# INDEXLA — install DR scripts + cron on VPS (no PM2/nginx restart)
#
set -euo pipefail

SRC_DIR="${1:-/var/www/IndexLa/scripts/dr}"
INSTALL_PREFIX="/usr/local/bin"
CONFIG_DIR="/root/.indexla-dr"
PASSPHRASE_FILE="${CONFIG_DIR}/passphrase"

log() {
  echo "[indexla-dr-install] $*"
}

if [[ $EUID -ne 0 ]]; then
  echo "Run as root on the VPS." >&2
  exit 1
fi

mkdir -p "$CONFIG_DIR" /var/backups/indexla/daily /var/backups/indexla/weekly /var/log
chmod 700 "$CONFIG_DIR"

for script in indexla-backup.sh indexla-offsite-sync.sh indexla-restore-drill.sh production-inventory.sh; do
  src="${SRC_DIR}/${script}"
  dest="${INSTALL_PREFIX}/${script/.sh/}"
  dest="${INSTALL_PREFIX}/indexla-dr-${script#indexla-}"
  # normalize names
  case "$script" in
    indexla-backup.sh) dest="${INSTALL_PREFIX}/indexla-dr-backup.sh" ;;
    indexla-offsite-sync.sh) dest="${INSTALL_PREFIX}/indexla-dr-offsite-sync.sh" ;;
    indexla-restore-drill.sh) dest="${INSTALL_PREFIX}/indexla-dr-restore-drill.sh" ;;
    production-inventory.sh) dest="${INSTALL_PREFIX}/indexla-dr-inventory.sh" ;;
  esac
  if [[ ! -f "$src" ]]; then
    log "WARN: missing $src (skip)"
    continue
  fi
  install -m 0755 "$src" "$dest"
  log "installed $dest"
done

if [[ ! -f "$PASSPHRASE_FILE" ]]; then
  umask 077
  openssl rand -base64 48 >"$PASSPHRASE_FILE"
  chmod 600 "$PASSPHRASE_FILE"
  log "created GPG passphrase at $PASSPHRASE_FILE (store offline copy securely)"
fi

if [[ ! -f "${CONFIG_DIR}/config.env" ]]; then
  if [[ -f "${SRC_DIR}/dr-config.example.env" ]]; then
    cp "${SRC_DIR}/dr-config.example.env" "${CONFIG_DIR}/config.env"
    sed -i 's/\r$//' "${CONFIG_DIR}/config.env" 2>/dev/null || true
    chmod 600 "${CONFIG_DIR}/config.env"
    log "seeded ${CONFIG_DIR}/config.env — configure offsite destination"
  fi
fi

CRON_MARK="# indexla-dr-backup"
CRON_DAILY="15 3 * * * /usr/local/bin/indexla-dr-backup.sh"
CRON_DRILL="45 4 1 * * /usr/local/bin/indexla-dr-restore-drill.sh"

TMP_CRON="$(mktemp)"
crontab -l 2>/dev/null | grep -v 'indexla-dr-backup' | grep -v 'indexla-dr-restore-drill' >"$TMP_CRON" || true
{
  cat "$TMP_CRON"
  echo "$CRON_MARK daily"
  echo "$CRON_DAILY"
  echo "$CRON_MARK monthly drill"
  echo "$CRON_DRILL"
} | crontab -
rm -f "$TMP_CRON"

log "cron installed (daily 03:15 UTC backup, monthly restore drill)"
log "next: set INDEXLA_DR_OFFSITE_* in ${CONFIG_DIR}/config.env"
log "done"
