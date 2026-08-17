#!/usr/bin/env bash
#
# INDEXLA — safe production deployment
# Builds separately, preserves last known-good, never restarts PM2 on failure.
#
set -euo pipefail

APP_DIR="${INDEXLA_APP_DIR:-/var/www/IndexLa}"
BRANCH="${INDEXLA_BRANCH:-master}"
LOG="${INDEXLA_DEPLOY_LOG:-/var/log/indexla-deploy.log}"
LOCK_FILE="${INDEXLA_DEPLOY_LOCK:-/var/run/indexla-deploy.lock}"
NGINX_SITE="${INDEXLA_NGINX_SITE:-/etc/nginx/sites-enabled/indexla}"
PM2_APP="${INDEXLA_PM2_APP:-indexla}"
PORT="${INDEXLA_PORT:-3000}"
HEALTH_HOST="${INDEXLA_HEALTH_HOST:-127.0.0.1}"

GOOD_BUILD_DIR="${APP_DIR}/.next-good"
GOOD_COMMIT_FILE="${APP_DIR}/.deploy-good-commit"
GOOD_COMMIT_FULL_FILE="${APP_DIR}/.deploy-good-commit-full"
STATE_FILE="${APP_DIR}/.deploy-state"
PRE_DEPLOY_BUILD="" # set when live .next is moved aside for candidate build

mkdir -p /var/log
exec >>"$LOG" 2>&1

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"
}

write_state() {
  local status="$1"
  local commit_short="$2"
  local commit_full="$3"
  local message="$4"
  cat >"$STATE_FILE" <<EOF
status=${status}
commit_short=${commit_short}
commit_full=${commit_full}
updated_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)
message=${message}
EOF
}

acquire_lock() {
  exec 9>"$LOCK_FILE"
  if ! flock -n 9; then
    log "SKIP: another deployment is in progress"
    exit 0
  fi
}

verify_build_artifacts() {
  local build_dir="$1"
  [[ -f "${build_dir}/BUILD_ID" ]] || return 1
  [[ -d "${build_dir}/server" ]] || return 1
  [[ -d "${build_dir}/static" ]] || return 1
  [[ -f "${build_dir}/required-server-files.json" ]] || return 1
  return 0
}

snapshot_known_good() {
  if [[ -d "${APP_DIR}/.next" ]] && verify_build_artifacts "${APP_DIR}/.next"; then
    log "SNAPSHOT: preserving current live build as known-good"
    rm -rf "$GOOD_BUILD_DIR"
    cp -a "${APP_DIR}/.next" "$GOOD_BUILD_DIR"
    git -C "$APP_DIR" rev-parse HEAD >"$GOOD_COMMIT_FULL_FILE"
    git -C "$APP_DIR" rev-parse --short HEAD >"$GOOD_COMMIT_FILE"
  else
    log "WARN: no valid live .next to snapshot (first deploy or corrupt live build)"
  fi
}

restore_known_good() {
  local reason="$1"
  local failed_short="${2:-unknown}"
  local failed_full="${3:-unknown}"

  if [[ ! -d "$GOOD_BUILD_DIR" ]] || [[ ! -f "$GOOD_COMMIT_FULL_FILE" ]]; then
    log "CRITICAL: cannot restore known-good — backup missing (${reason})"
    write_state "failed_no_recovery" "$failed_short" "$failed_full" "$reason"
    return 1
  fi

  local good_full
  good_full="$(cat "$GOOD_COMMIT_FULL_FILE")"
  local good_short
  good_short="$(cat "$GOOD_COMMIT_FILE" 2>/dev/null || echo "${good_full:0:7}")"

  log "RESTORE: reverting source to known-good ${good_short} (${reason})"
  git -C "$APP_DIR" reset --hard "$good_full"
  git -C "$APP_DIR" clean -fd \
    -e .env.local \
    -e .next-good \
    -e .deploy-good-commit \
    -e .deploy-good-commit-full \
    -e .deploy-state \
    -e .next-pre-deploy-*

  log "RESTORE: reinstalling exact dependencies for known-good commit"
  cd "$APP_DIR"
  npm ci

  log "RESTORE: restoring known-good .next"
  rm -rf "${APP_DIR}/.next"
  cp -a "$GOOD_BUILD_DIR" "${APP_DIR}/.next"

  if ! verify_build_artifacts "${APP_DIR}/.next"; then
    log "CRITICAL: known-good build artifacts invalid after restore"
    write_state "failed_corrupt_recovery" "$failed_short" "$failed_full" "$reason"
    return 1
  fi

  log "RESTORE: restarting PM2 with known-good build"
  pm2 restart "$PM2_APP" --update-env || {
    pm2 delete "$PM2_APP" >/dev/null 2>&1 || true
    pm2 start "${APP_DIR}/node_modules/next/dist/bin/next" --name "$PM2_APP" -- start
  }
  pm2 save

  update_deploy_header "$good_short"

  write_state "restored" "$good_short" "$good_full" "failed=${failed_short}; restored=${good_short}; reason=${reason}"
  log "RESTORED: production running known-good ${good_short} after failed ${failed_short}"
  return 0
}

cleanup_pre_deploy_build() {
  if [[ -n "$PRE_DEPLOY_BUILD" ]] && [[ -d "$PRE_DEPLOY_BUILD" ]]; then
    rm -rf "$PRE_DEPLOY_BUILD"
    PRE_DEPLOY_BUILD=""
  fi
}

abort_deploy() {
  local reason="$1"
  local failed_short="${2:-unknown}"
  local failed_full="${3:-unknown}"

  log "ABORT: ${reason}"

  if [[ -n "$PRE_DEPLOY_BUILD" ]] && [[ -d "$PRE_DEPLOY_BUILD" ]]; then
    rm -rf "$PRE_DEPLOY_BUILD"
    PRE_DEPLOY_BUILD=""
  fi

  rm -rf "${APP_DIR}/.next"

  if ! restore_known_good "$reason" "$failed_short" "$failed_full"; then
    log "CRITICAL: deployment aborted and recovery failed"
    exit 1
  fi

  exit 1
}

update_deploy_header() {
  local commit_short="$1"
  if [[ -f "$NGINX_SITE" ]]; then
    sed -i "s/X-Deploy-Commit [^ ]*/X-Deploy-Commit ${commit_short}/" "$NGINX_SITE"
    nginx -t && systemctl reload nginx
  fi
}

health_check() {
  local commit_short="$1"
  local failures=0

  log "HEALTH: starting checks for ${commit_short}"

  if ! pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    log "HEALTH FAIL: PM2 app ${PM2_APP} not found"
    return 1
  fi

  local pm2_status
  pm2_status="$(pm2 list 2>/dev/null | awk -v app="$PM2_APP" '$2==app {print $10; exit}')"
  pm2_status="${pm2_status:-missing}"

  if [[ "$pm2_status" != "online" ]]; then
    log "HEALTH FAIL: PM2 status is ${pm2_status}"
    failures=$((failures + 1))
  fi

  local paths=(
    "/"
    "/investors"
    "/creators"
    "/tokenomics"
    "/faq"
    "/how-it-works"
    "/strategies"
    "/whitepaper/1-executive-summary"
  )

  for path in "${paths[@]}"; do
    local code
    code="$(curl -s -o /tmp/indexla-health.html -w '%{http_code}' --max-time 20 "http://${HEALTH_HOST}:${PORT}${path}" || echo "000")"
    if [[ "$code" != "200" ]]; then
      log "HEALTH FAIL: ${path} returned HTTP ${code}"
      failures=$((failures + 1))
    fi
  done

  if ! grep -q "HomeRevealGate" /tmp/indexla-health.html 2>/dev/null; then
    log "HEALTH FAIL: homepage missing HomeRevealGate marker"
    failures=$((failures + 1))
  fi

  local chunk
  chunk="$(grep -oE '/_next/static/chunks/[^\" ]+\\.js' /tmp/indexla-health.html 2>/dev/null | head -1 || true)"
  if [[ -z "$chunk" ]]; then
    log "HEALTH FAIL: no Next.js chunk found on homepage"
    failures=$((failures + 1))
  else
    local chunk_code
    chunk_code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "http://${HEALTH_HOST}:${PORT}${chunk}" || echo "000")"
    if [[ "$chunk_code" != "200" ]]; then
      log "HEALTH FAIL: chunk ${chunk} returned HTTP ${chunk_code}"
      failures=$((failures + 1))
    fi
  fi

  if [[ -s /root/.pm2/logs/indexla-error.log ]]; then
    if grep -qE 'MODULE_NOT_FOUND|Failed to load chunk|unhandledRejection' /root/.pm2/logs/indexla-error.log 2>/dev/null; then
      log "HEALTH FAIL: critical errors present in PM2 error log"
      failures=$((failures + 1))
    fi
  fi

  if [[ "$failures" -gt 0 ]]; then
    log "HEALTH FAIL: ${failures} check(s) failed"
    return 1
  fi

  log "HEALTH: all checks passed for ${commit_short}"
  return 0
}

run_deploy() {
  local local_hash remote_hash local_short remote_short

  cd "$APP_DIR"

  git fetch origin "$BRANCH"
  local_hash="$(git rev-parse HEAD)"
  remote_hash="$(git rev-parse "origin/${BRANCH}")"
  local_short="$(git rev-parse --short HEAD)"
  remote_short="$(git rev-parse --short "origin/${BRANCH}")"

  if [[ "$local_hash" == "$remote_hash" ]]; then
    log "SKIP: already up to date at ${local_short}"
    exit 0
  fi

  log "DEPLOY: new commit detected ${local_short} -> ${remote_short}"
  snapshot_known_good

  log "DEPLOY: updating source to origin/${BRANCH}"
  git reset --hard "origin/${BRANCH}"
  git clean -fd \
    -e .env.local \
    -e .next-good \
    -e .deploy-good-commit \
    -e .deploy-good-commit-full \
    -e .deploy-state \
    -e .next-pre-deploy-*

  log "DEPLOY: installing exact dependencies (npm ci)"
  npm ci

  if grep -q '"build"[[:space:]]*:[[:space:]]*"next build --turbopack"' package.json; then
    log "ABORT: production build must not use Turbopack"
    abort_deploy "turbopack build script forbidden" "$remote_short" "$remote_hash"
  fi

  if [[ -d "${APP_DIR}/.next" ]]; then
    PRE_DEPLOY_BUILD="${APP_DIR}/.next-pre-deploy-${remote_short}-$$"
    log "DEPLOY: moving live .next aside to ${PRE_DEPLOY_BUILD}"
    mv "${APP_DIR}/.next" "$PRE_DEPLOY_BUILD"
  fi

  log "DEPLOY: building candidate production bundle (next build)"
  if ! npm run build; then
    abort_deploy "npm run build failed" "$remote_short" "$remote_hash"
  fi

  if ! verify_build_artifacts "${APP_DIR}/.next"; then
    abort_deploy "build artifacts incomplete" "$remote_short" "$remote_hash"
  fi

  log "DEPLOY: candidate build verified — activating"
  cleanup_pre_deploy_build

  : > /root/.pm2/logs/indexla-error.log 2>/dev/null || true

  log "DEPLOY: restarting PM2"
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    pm2 restart "$PM2_APP" --update-env
  else
    pm2 start "${APP_DIR}/node_modules/next/dist/bin/next" --name "$PM2_APP" -- start
  fi
  pm2 save

  sleep 4

  if ! health_check "$remote_short"; then
    abort_deploy "health checks failed after activation" "$remote_short" "$remote_hash"
  fi

  log "DEPLOY: refreshing known-good backup"
  rm -rf "$GOOD_BUILD_DIR"
  cp -a "${APP_DIR}/.next" "$GOOD_BUILD_DIR"
  echo "$remote_hash" >"$GOOD_COMMIT_FULL_FILE"
  echo "$remote_short" >"$GOOD_COMMIT_FILE"

  update_deploy_header "$remote_short"
  write_state "success" "$remote_short" "$remote_hash" "deployed successfully"

  if [[ -f "${APP_DIR}/scripts/deploy-indexla.sh" ]]; then
    cp "${APP_DIR}/scripts/deploy-indexla.sh" /usr/local/bin/deploy-indexla.sh
    chmod +x /usr/local/bin/deploy-indexla.sh
  fi

  log "SUCCESS: production running ${remote_short}"
}

main() {
  log "==== deploy start ===="
  acquire_lock

  if [[ "${1:-}" == "--restore-good" ]]; then
    restore_known_good "manual recovery requested" "manual" "manual" || exit 1
    health_check "$(cat "$GOOD_COMMIT_FILE")" || exit 1
    log "==== manual restore complete ===="
    exit 0
  fi

  run_deploy
  log "==== deploy complete ===="
}

main "$@"
