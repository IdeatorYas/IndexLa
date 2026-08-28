#!/usr/bin/env bash
#
# INDEXLA — non-destructive restore drill (extract to temp dir only)
#
# Usage:
#   indexla-dr-restore-drill.sh [path/to/indexla-dr-YYYYMMDD-HHMMSS.tar.gz]
#
set -euo pipefail

ARCHIVE="${1:-}"
BACKUP_ROOT="${INDEXLA_DR_BACKUP_ROOT:-/var/backups/indexla}"
PASSPHRASE_FILE="${INDEXLA_DR_PASSPHRASE_FILE:-/root/.indexla-dr/passphrase}"
LOG="${INDEXLA_DR_DRILL_LOG:-/var/log/indexla-dr-restore-drill.log}"

if [[ -z "$ARCHIVE" ]]; then
  ARCHIVE="$(ls -1t "${BACKUP_ROOT}/daily"/indexla-dr-*.tar.gz 2>/dev/null | head -1 || true)"
fi

if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  echo "ERROR: no backup archive found" >&2
  exit 1
fi

STAMP="$(date -u +%Y%m%d-%H%M%S)"
RESTORE_ROOT="/tmp/indexla-dr-restore-test-${STAMP}"
REPORT="${RESTORE_ROOT}/DRILL_REPORT.txt"

mkdir -p "$(dirname "$LOG")"
exec > >(tee -a "$LOG") 2>&1

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"
}

log "DRILL START archive=${ARCHIVE}"
mkdir -p "$RESTORE_ROOT"
tar -xzf "$ARCHIVE" -C "$RESTORE_ROOT"

INNER="$(find "$RESTORE_ROOT" -mindepth 1 -maxdepth 1 -type d | head -1)"
if [[ -z "$INNER" ]]; then
  log "FAIL: empty archive layout"
  exit 1
fi

{
  echo "INDEXLA DR restore drill"
  echo "archive=${ARCHIVE}"
  echo "extracted=${INNER}"
  echo "utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo ""
  echo "=== manifest ==="
  if [[ -f "${INNER}/MANIFEST.json" ]]; then
    cat "${INNER}/MANIFEST.json"
  else
    echo "MISSING MANIFEST.json"
  fi
  echo ""
  echo "=== nginx files ==="
  ls -la "${INNER}/nginx" 2>/dev/null || echo "missing nginx/"
  echo ""
  echo "=== pm2 dump ==="
  ls -la "${INNER}/pm2" 2>/dev/null || echo "missing pm2/"
  echo ""
  echo "=== encrypted env ==="
  ls -la "${INNER}/encrypted" 2>/dev/null || echo "missing encrypted/"
  echo ""
  echo "=== database status ==="
  cat "${INNER}/database/DATABASE_STATUS" 2>/dev/null || echo "no database status"
} >"$REPORT"

PASS=0
FAIL=0

check() {
  local label="$1"
  local path="$2"
  if [[ -e "$path" ]]; then
    log "OK   ${label}"
    PASS=$((PASS + 1))
  else
    log "FAIL ${label} (${path})"
    FAIL=$((FAIL + 1))
  fi
}

check "manifest" "${INNER}/MANIFEST.json"
check "nginx website" "${INNER}/nginx/indexla"
check "nginx app" "${INNER}/nginx/indexla-app"
check "pm2 dump" "${INNER}/pm2/dump.pm2"
check "website public tarball" "${INNER}/static/website-public.tar.gz"

if [[ -f "${INNER}/encrypted/ENCRYPTION_STATUS" ]]; then
  status="$(grep -E '^env_encryption=' "${INNER}/encrypted/ENCRYPTION_STATUS" | cut -d= -f2)"
  if [[ "$status" == "gpg_aes256" && -f "$PASSPHRASE_FILE" ]]; then
    for gpg_file in "${INNER}"/encrypted/*.env.local.gpg; do
      [[ -f "$gpg_file" ]] || continue
      out="${RESTORE_ROOT}/decrypted-$(basename "$gpg_file" .gpg)"
      if gpg --batch --yes --decrypt --passphrase-file "$PASSPHRASE_FILE" --output "$out" "$gpg_file" 2>/dev/null; then
        log "OK   decrypt $(basename "$gpg_file") (keys only in report)"
        grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$out" | cut -d= -f1 | sort -u >>"$REPORT"
        rm -f "$out"
        PASS=$((PASS + 1))
      else
        log "FAIL decrypt $(basename "$gpg_file")"
        FAIL=$((FAIL + 1))
      fi
    done
  else
    log "WARN env encryption status=${status}"
  fi
fi

if [[ -f "${INNER}/static/website-public.tar.gz" ]]; then
  mkdir -p "${RESTORE_ROOT}/public-check"
  tar -xzf "${INNER}/static/website-public.tar.gz" -C "${RESTORE_ROOT}/public-check"
  if [[ -d "${RESTORE_ROOT}/public-check/public" ]]; then
    log "OK   public tree extracted ($(find "${RESTORE_ROOT}/public-check/public" -type f | wc -l) files)"
    PASS=$((PASS + 1))
  fi
fi

echo "" >>"$REPORT"
echo "pass_checks=${PASS}" >>"$REPORT"
echo "fail_checks=${FAIL}" >>"$REPORT"
echo "restore_test_dir=${RESTORE_ROOT}" >>"$REPORT"

log "DRILL REPORT: ${REPORT}"
log "DRILL DONE pass=${PASS} fail=${FAIL} temp=${RESTORE_ROOT}"

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi

exit 0
