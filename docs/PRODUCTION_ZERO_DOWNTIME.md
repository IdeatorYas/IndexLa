# INDEXLA — Production vs Development (ZERO DOWNTIME)

## CRITICAL RULE

**NEVER edit, build, test, or experiment against the running production instance.**

Required flow:

**Local/Development → Build → Test → Verify → Deploy → Verify Production**

If a new build fails, **production stays on the previous working version**.

---

## PRODUCTION (public site)

| Item | Value |
|------|--------|
| Public URL | https://indexla.tech |
| Server path | `/var/www/IndexLa` |
| Process manager | **PM2** app name: `indexla` |
| App port | **3000** (bound to `127.0.0.1` only) |
| Reverse proxy | **nginx** → `http://127.0.0.1:3000` |
| Deploy trigger | GitHub Actions on push to `master` → SSH → `/usr/local/bin/deploy-indexla.sh` |
| Deploy script (repo) | `scripts/deploy-indexla.sh` |
| Deploy log | `/var/log/indexla-deploy.log` |
| Known-good build | `/var/www/IndexLa/.next-good` |
| Deploy state | `/var/www/IndexLa/.deploy-state` |

### Production commands (VPS only, when needed)

```bash
# Health check (does not deploy)
/usr/local/bin/deploy-indexla.sh --health

# Manual restore to last known-good
/usr/local/bin/deploy-indexla.sh --restore-good

# PM2 status
pm2 status
pm2 logs indexla --lines 50
```

### What production deploy does (safe)

1. Snapshots current live `.next` as known-good
2. Builds the new commit in an **isolated git worktree** (live `.next` / `node_modules` untouched)
3. Only after a successful build: atomic swap of `.next` + `node_modules`
4. Brief PM2 restart
5. Health checks; on failure → automatic rollback to known-good
6. Production stays online during the entire build phase

---

## DEVELOPMENT (local only)

| Item | Value |
|------|--------|
| Machine | Developer laptop / Cursor agent workspace |
| Typical ports | **3456–3461** (or any free local port **≠ production 3000 on the VPS**) |
| Commands | `npm run dev` or `npm run build && npm run start -- -p <local-port>` |
| Scope | Localhost only — **never** kills/restarts PM2 on the VPS |

### Local port convention

- Use high ports such as `3456+` for PDF export / preview servers
- Do **not** SSH into the VPS to run `npm run build` or `pm2 restart` for experiments
- Do **not** stop local processes and assume that affects https://indexla.tech — it does not
- Do **not** push unfinished work to `master` unless you intend a production deploy

---

## Why production used to go offline (root cause)

The previous deploy script:

1. Ran on **every** `master` push (including intermediate PDF/logo commits)
2. **Moved live `.next` aside before the new build finished**
3. Ran `rm -rf node_modules && npm ci` on the live app directory while PM2 was still serving

During that window (often several minutes), nginx still proxied to port 3000 but Next.js had no valid build → **public site appeared down**.

Local `npm start` / killing local ports did **not** take Hostinger production offline. Repeated **auto-deploys from `master` pushes** did.

---

## Agent / developer checklist before any production-affecting action

- [ ] Change is complete and verified locally
- [ ] Production is currently healthy (`https://indexla.tech` returns 200)
- [ ] Push to `master` is intentional (triggers deploy)
- [ ] After deploy: verify live URL + `X-Deploy-Commit` header
- [ ] Never manually stop PM2 `indexla` unless restoring known-good
