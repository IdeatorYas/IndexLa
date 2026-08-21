#!/usr/bin/env bash
#
# INDEXLA — ZERO-DOWNTIME production deployment
#
# Rules:
# - NEVER delete/move live .next or node_modules while PM2 is serving them
# - Build in an isolated worktree first
# - Only swap + restart after the candidate build is verified
# - On failure: keep (or restore) the previous known-good release
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
BUILD_ROOT="${APP_DIR}/.deploy-builds"

mkdir -p /var/log "$BUILD_ROOT"
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
    if ! verify_build_artifacts "$GOOD_BUILD_DIR"; then
      log "CRITICAL: failed to snapshot known-good build"
      rm -rf "$GOOD_BUILD_DIR"
      return 1
    fi
    git -C "$APP_DIR" rev-parse HEAD >"$GOOD_COMMIT_FULL_FILE"
    git -C "$APP_DIR" rev-parse --short HEAD >"$GOOD_COMMIT_FILE"
  else
    log "WARN: no valid live .next to snapshot"
  fi
  return 0
}

pm2_ensure_running() {
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    local status
    status="$(pm2_app_status)"
    if [[ "$status" != "online" ]]; then
      log "PM2: app not online (${status}) — restarting known live process"
      pm2 restart "$PM2_APP" --update-env || true
    fi
  else
    log "PM2: starting ${PM2_APP}"
    pm2 start "${APP_DIR}/node_modules/next/dist/bin/next" --name "$PM2_APP" -- start
    pm2 save
  fi
}

restore_known_good() {
  local reason="$1"
  local failed_short="${2:-unknown}"
  local failed_full="${3:-unknown}"

  if [[ ! -d "$GOOD_BUILD_DIR" ]] || [[ ! -f "$GOOD_COMMIT_FULL_FILE" ]]; then
    log "CRITICAL: cannot restore known-good — backup missing (${reason})"
    write_state "failed_no_recovery" "$failed_short" "$failed_full" "$reason"
    # Still try to keep whatever is currently live running
    pm2_ensure_running
    return 1
  fi

  local good_full good_short
  good_full="$(cat "$GOOD_COMMIT_FULL_FILE")"
  good_short="$(cat "$GOOD_COMMIT_FILE" 2>/dev/null || echo "${good_full:0:7}")"

  log "RESTORE: reverting source to known-good ${good_short} (${reason})"
  git -C "$APP_DIR" reset --hard "$good_full"
  git -C "$APP_DIR" clean -fd \
    -e .env.local \
    -e .next \
    -e .next-good \
    -e .deploy-good-commit \
    -e .deploy-good-commit-full \
    -e .deploy-state \
    -e .deploy-builds

  log "RESTORE: reinstalling dependencies for known-good (live kept until swap)"
  # Install into a temp node_modules then swap — avoid deleting live modules first
  local tmp_modules="${APP_DIR}/node_modules.restore-$$"
  rm -rf "$tmp_modules"
  mkdir -p "${APP_DIR}/.restore-npm-$$"
  # Use npm ci in APP_DIR but preserve live modules via rename swap
  if [[ -d "${APP_DIR}/node_modules" ]]; then
    mv "${APP_DIR}/node_modules" "$tmp_modules"
  fi
  (
    cd "$APP_DIR"
    npm ci
  ) || {
    log "RESTORE: npm ci failed — putting previous node_modules back"
    rm -rf "${APP_DIR}/node_modules"
    [[ -d "$tmp_modules" ]] && mv "$tmp_modules" "${APP_DIR}/node_modules"
    write_state "failed_corrupt_recovery" "$failed_short" "$failed_full" "$reason"
    pm2_ensure_running
    return 1
  }
  rm -rf "$tmp_modules"

  log "RESTORE: restoring known-good .next via atomic replace"
  local next_tmp="${APP_DIR}/.next.restore-$$"
  rm -rf "$next_tmp"
  cp -a "$GOOD_BUILD_DIR" "$next_tmp"
  if ! verify_build_artifacts "$next_tmp"; then
    log "CRITICAL: known-good build artifacts invalid after copy"
    rm -rf "$next_tmp"
    write_state "failed_corrupt_recovery" "$failed_short" "$failed_full" "$reason"
    pm2_ensure_running
    return 1
  fi
  rm -rf "${APP_DIR}/.next.prev"
  if [[ -d "${APP_DIR}/.next" ]]; then
    mv "${APP_DIR}/.next" "${APP_DIR}/.next.prev"
  fi
  mv "$next_tmp" "${APP_DIR}/.next"
  rm -rf "${APP_DIR}/.next.prev"

  log "RESTORE: restarting PM2 with known-good build"
  pm2 flush "$PM2_APP" >/dev/null 2>&1 || true
  pm2 restart "$PM2_APP" --update-env || {
    pm2 delete "$PM2_APP" >/dev/null 2>&1 || true
    pm2 start "${APP_DIR}/node_modules/next/dist/bin/next" --name "$PM2_APP" -- start
  }
  pm2 save

  update_deploy_header "$good_short"
  write_state "restored" "$good_short" "$good_full" "failed=${failed_short}; restored=${good_short}; reason=${reason}"
  log "RESTORED: production running known-good ${good_short}"
  return 0
}

update_deploy_header() {
  local commit_short="$1"
  if [[ -f "$NGINX_SITE" ]]; then
    sed -i "s/X-Deploy-Commit [^ ]*/X-Deploy-Commit ${commit_short}/" "$NGINX_SITE"
    nginx -t && systemctl reload nginx
  fi
}

pm2_app_status() {
  node -e "
    const { execSync } = require('child_process');
    const apps = JSON.parse(execSync('pm2 jlist', { encoding: 'utf8' }));
    const app = apps.find((entry) => entry.name === process.argv[1]);
    process.stdout.write(app?.pm2_env?.status || 'missing');
  " "$PM2_APP" 2>/dev/null || echo "missing"
}

wait_for_app_ready() {
  local attempt
  for attempt in $(seq 1 30); do
    local code
    code="$(curl -s -o /tmp/indexla-ready.html -w '%{http_code}' --max-time 5 "http://${HEALTH_HOST}:${PORT}/" || echo "000")"
    if [[ "$code" == "200" ]] && grep -q "HomeRevealGate" /tmp/indexla-ready.html 2>/dev/null; then
      log "READY: homepage valid on attempt ${attempt}"
      return 0
    fi
    sleep 2
  done
  log "READY FAIL: homepage not valid within 60s"
  return 1
}

health_check() {
  local commit_short="$1"
  local failures=0

  log "HEALTH: starting checks for ${commit_short}"

  if ! pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    log "HEALTH FAIL: PM2 app ${PM2_APP} not found"
    return 1
  fi

  if ! wait_for_app_ready; then
    log "HEALTH FAIL: app not ready"
    return 1
  fi

  local pm2_status
  pm2_status="$(pm2_app_status)"
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

  local path
  for path in "${paths[@]}"; do
    local code
    code="$(curl -s -o /tmp/indexla-health-path.html -w '%{http_code}' --max-time 20 "http://${HEALTH_HOST}:${PORT}${path}" || echo "000")"
    if [[ "$code" != "200" ]]; then
      log "HEALTH FAIL: ${path} returned HTTP ${code}"
      failures=$((failures + 1))
    fi
  done

  curl -s -o /tmp/indexla-health-home.html --max-time 20 "http://${HEALTH_HOST}:${PORT}/" >/dev/null || true
  if ! grep -q "HomeRevealGate" /tmp/indexla-health-home.html 2>/dev/null; then
    log "HEALTH FAIL: homepage missing HomeRevealGate marker"
    failures=$((failures + 1))
  fi

  local chunk
  chunk="$(grep -oE '/_next/static/chunks/[^\" ]+\.js' /tmp/indexla-health-home.html 2>/dev/null | head -1 || true)"
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

  if [[ "$failures" -gt 0 ]]; then
    log "HEALTH FAIL: ${failures} check(s) failed"
    return 1
  fi

  log "HEALTH: all checks passed for ${commit_short}"
  return 0
}

cleanup_build_dir() {
  local build_dir="$1"
  if [[ -n "$build_dir" && -d "$build_dir" ]]; then
    # Remove git worktree registration if present
    git -C "$APP_DIR" worktree remove --force "$build_dir" 2>/dev/null || rm -rf "$build_dir"
  fi
}

run_deploy() {
  local local_hash remote_hash local_short remote_short
  local build_dir=""

  cd "$APP_DIR"

  git fetch origin "$BRANCH"
  local_hash="$(git rev-parse HEAD)"
  remote_hash="$(git rev-parse "origin/${BRANCH}")"
  local_short="$(git rev-parse --short HEAD)"
  remote_short="$(git rev-parse --short "origin/${BRANCH}")"

  if [[ "$local_hash" == "$remote_hash" ]]; then
    log "SKIP: already up to date at ${local_short}"
    # Ensure production process is healthy even on skip
    pm2_ensure_running
    exit 0
  fi

  log "DEPLOY: new commit detected ${local_short} -> ${remote_short}"
  if ! snapshot_known_good; then
    log "ABORT: unable to preserve known-good backup before deploy"
    exit 1
  fi

  # ------------------------------------------------------------------
  # ZERO-DOWNTIME BUILD: isolate in a detached worktree.
  # Live APP_DIR/.next and node_modules stay untouched until swap.
  # ------------------------------------------------------------------
  build_dir="${BUILD_ROOT}/${remote_short}-$$"
  cleanup_build_dir "$build_dir"
  mkdir -p "$BUILD_ROOT"

  log "DEPLOY: creating isolated build worktree at ${build_dir}"
  git -C "$APP_DIR" worktree add --detach "$build_dir" "$remote_hash"

  # Copy env into build tree (needed for build-time env if any)
  if [[ -f "${APP_DIR}/.env.local" ]]; then
    cp "${APP_DIR}/.env.local" "${build_dir}/.env.local"
  fi

  log "DEPLOY: installing deps in isolated worktree (live node_modules untouched)"
  if ! (cd "$build_dir" && npm ci); then
    log "ABORT: npm ci failed in worktree — production unchanged"
    cleanup_build_dir "$build_dir"
    write_state "failed_build" "$remote_short" "$remote_hash" "npm ci failed; production unchanged"
    pm2_ensure_running
    exit 1
  fi

  if grep -q '"build"[[:space:]]*:[[:space:]]*"next build --turbopack"' "${build_dir}/package.json"; then
    log "ABORT: turbopack build forbidden — production unchanged"
    cleanup_build_dir "$build_dir"
    write_state "failed_build" "$remote_short" "$remote_hash" "turbopack forbidden; production unchanged"
    pm2_ensure_running
    exit 1
  fi

  log "DEPLOY: building candidate in isolated worktree (live .next untouched)"
  if ! (cd "$build_dir" && npm run build); then
    log "ABORT: npm run build failed — production unchanged"
    cleanup_build_dir "$build_dir"
    write_state "failed_build" "$remote_short" "$remote_hash" "build failed; production unchanged"
    pm2_ensure_running
    exit 1
  fi

  if ! verify_build_artifacts "${build_dir}/.next"; then
    log "ABORT: candidate artifacts incomplete — production unchanged"
    cleanup_build_dir "$build_dir"
    write_state "failed_build" "$remote_short" "$remote_hash" "incomplete artifacts; production unchanged"
    pm2_ensure_running
    exit 1
  fi

  log "DEPLOY: candidate verified — preparing atomic activation"

  # Update live source tree WITHOUT deleting live .next/node_modules yet
  log "DEPLOY: updating live source to ${remote_short}"
  git -C "$APP_DIR" reset --hard "$remote_hash"
  git -C "$APP_DIR" clean -fd \
    -e .env.local \
    -e .next \
    -e .next-good \
    -e .next.prev \
    -e node_modules \
    -e .deploy-good-commit \
    -e .deploy-good-commit-full \
    -e .deploy-state \
    -e .deploy-builds

  # Swap node_modules: move candidate modules in, keep previous until success
  log "DEPLOY: swapping node_modules"
  local modules_prev="${APP_DIR}/node_modules.prev-$$"
  rm -rf "$modules_prev"
  if [[ -d "${APP_DIR}/node_modules" ]]; then
    mv "${APP_DIR}/node_modules" "$modules_prev"
  fi
  mv "${build_dir}/node_modules" "${APP_DIR}/node_modules"

  # Swap .next atomically
  log "DEPLOY: swapping .next"
  local next_prev="${APP_DIR}/.next.prev-$$"
  rm -rf "$next_prev"
  if [[ -d "${APP_DIR}/.next" ]]; then
    mv "${APP_DIR}/.next" "$next_prev"
  fi
  mv "${build_dir}/.next" "${APP_DIR}/.next"

  # Brief restart window only (seconds), after artifacts are already in place
  log "DEPLOY: restarting PM2 onto new artifacts"
  pm2 flush "$PM2_APP" >/dev/null 2>&1 || true
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    pm2 restart "$PM2_APP" --update-env
  else
    pm2 start "${APP_DIR}/node_modules/next/dist/bin/next" --name "$PM2_APP" -- start
  fi
  pm2 save

  sleep 2

  if ! health_check "$remote_short"; then
    log "DEPLOY: health failed — rolling back to previous artifacts"
    # Roll back .next
    rm -rf "${APP_DIR}/.next"
    if [[ -d "$next_prev" ]]; then
      mv "$next_prev" "${APP_DIR}/.next"
    elif [[ -d "$GOOD_BUILD_DIR" ]]; then
      cp -a "$GOOD_BUILD_DIR" "${APP_DIR}/.next"
    fi
    # Roll back node_modules
    if [[ -d "$modules_prev" ]]; then
      rm -rf "${APP_DIR}/node_modules"
      mv "$modules_prev" "${APP_DIR}/node_modules"
    fi
    cleanup_build_dir "$build_dir"
    restore_known_good "health checks failed after activation" "$remote_short" "$remote_hash" || true
    exit 1
  fi

  # Success — cleanup previous artifacts and build worktree
  rm -rf "$next_prev" "$modules_prev"
  cleanup_build_dir "$build_dir"

  log "DEPLOY: refreshing known-good backup"
  rm -rf "$GOOD_BUILD_DIR"
  cp -a "${APP_DIR}/.next" "$GOOD_BUILD_DIR"
  echo "$remote_hash" >"$GOOD_COMMIT_FULL_FILE"
  echo "$remote_short" >"$GOOD_COMMIT_FILE"

  update_deploy_header "$remote_short"
  write_state "success" "$remote_short" "$remote_hash" "deployed successfully (zero-downtime build)"

  if [[ -f "${APP_DIR}/scripts/deploy-indexla.sh" ]]; then
    cp "${APP_DIR}/scripts/deploy-indexla.sh" /usr/local/bin/deploy-indexla.sh
    chmod +x /usr/local/bin/deploy-indexla.sh
  fi

  log "SUCCESS: production running ${remote_short}"
}

main() {
  log "==== deploy start (zero-downtime) ===="
  acquire_lock

  if [[ "${1:-}" == "--restore-good" ]]; then
    restore_known_good "manual recovery requested" "manual" "manual" || exit 1
    health_check "$(cat "$GOOD_COMMIT_FILE" 2>/dev/null || echo unknown)" || exit 1
    log "==== manual restore complete ===="
    exit 0
  fi

  if [[ "${1:-}" == "--health" ]]; then
    pm2_ensure_running
    health_check "$(git -C "$APP_DIR" rev-parse --short HEAD 2>/dev/null || echo unknown)" || exit 1
    exit 0
  fi

  run_deploy
  log "==== deploy complete ===="
}

main "$@"
