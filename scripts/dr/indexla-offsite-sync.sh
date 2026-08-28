#!/usr/bin/env bash
#
# INDEXLA — sync latest DR archive off the VPS (optional)
#
set -euo pipefail

CONFIG="${INDEXLA_DR_CONFIG:-/root/.indexla-dr/config.env}"
[[ -f "$CONFIG" ]] && source "$CONFIG"

LOG="${INDEXLA_DR_OFFSITE_LOG:-/var/log/indexla-dr-offsite.log}"
ARCHIVE="${INDEXLA_DR_ARCHIVE:-}"

mkdir -p "$(dirname "$LOG")"
exec >>"$LOG" 2>&1

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"
}

if [[ -z "$ARCHIVE" ]]; then
  BACKUP_ROOT="${INDEXLA_DR_BACKUP_ROOT:-/var/backups/indexla}"
  ARCHIVE="$(ls -1t "${BACKUP_ROOT}/daily"/indexla-dr-*.tar.gz 2>/dev/null | head -1 || true)"
fi

if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  log "SKIP: no archive to sync"
  exit 0
fi

BASE="$(basename "$ARCHIVE")"
SYNCED=0

if [[ -n "${INDEXLA_DR_OFFSITE_RSYNC:-}" ]]; then
  rsync -az "$ARCHIVE" "${INDEXLA_DR_OFFSITE_RSYNC%/}/daily/${BASE}"
  if [[ -d "${BACKUP_ROOT:-/var/backups/indexla}/weekly" ]]; then
    rsync -az "${BACKUP_ROOT}/weekly/" "${INDEXLA_DR_OFFSITE_RSYNC%/}/weekly/" 2>/dev/null || true
  fi
  log "RSYNC OK → ${INDEXLA_DR_OFFSITE_RSYNC}"
  SYNCED=1
fi

if [[ -n "${INDEXLA_DR_OFFSITE_RCLONE:-}" ]]; then
  rclone copy "$ARCHIVE" "${INDEXLA_DR_OFFSITE_RCLONE%/}/daily/" --fast-list
  log "RCLONE OK → ${INDEXLA_DR_OFFSITE_RCLONE}"
  SYNCED=1
fi

if [[ -n "${INDEXLA_DR_OFFSITE_SCP:-}" ]]; then
  scp -q "$ARCHIVE" "${INDEXLA_DR_OFFSITE_SCP%/}/daily/${BASE}"
  log "SCP OK → ${INDEXLA_DR_OFFSITE_SCP}"
  SYNCED=1
fi

if [[ "$SYNCED" -eq 0 ]]; then
  log "WARN: no offsite destination configured (set INDEXLA_DR_OFFSITE_* in ${CONFIG})"
  exit 0
fi

log "DONE offsite sync for ${BASE}"
