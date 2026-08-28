# INDEXLA — VPS production inventory

> **Read-only snapshot.** Env **names** only — never values.  
> Last collected: **2026-08-28** (agent SSH inventory, non-destructive).

## Public endpoints

| URL | PM2 | Port | Path |
|-----|-----|------|------|
| https://indexla.tech | `indexla` | 3000 | `/var/www/IndexLa` |
| https://app.indexla.tech | `indexla-app` | 3001 | `/var/www/IndexLa-App` |

Both bind `127.0.0.1` only; nginx terminates TLS.

## GitHub repositories

| Product | Remote | Branch | Deployed commit (2026-08-28) |
|---------|--------|--------|------------------------------|
| Website | https://github.com/IdeatorYas/IndexLa.git | `master` | `34e62bb` (git clone on VPS) |
| App | https://github.com/IdeatorYas/IndexlaApp.git | `main` | `0ed8a05` (tarball deploy; `.deploy-source-commit`) |

App repo `main` tip is ahead (`345a00f` post Step 3 merge) — **not redeployed** during DR work.

## Nginx

| Site file | Domains | Cert path |
|-----------|---------|-----------|
| `/etc/nginx/sites-enabled/indexla` | indexla.tech, www | `/etc/letsencrypt/live/indexla.tech/` |
| `/etc/nginx/sites-enabled/indexla-app` | app.indexla.tech | `/etc/letsencrypt/live/app.indexla.tech/` |

Reference templates (no live commit headers): `scripts/dr/reference/`

## Deploy tooling (VPS)

| Script | Purpose |
|--------|---------|
| `/usr/local/bin/deploy-indexla.sh` | Website zero-downtime deploy |
| `/usr/local/bin/deploy-indexla-app.sh` | App zero-downtime deploy |
| `/usr/local/bin/indexla-dr-backup.sh` | DR backup (after install) |
| `/usr/local/bin/indexla-dr-restore-drill.sh` | Non-destructive restore test |

## Environment variable names (production)

**Website** (`/var/www/IndexLa/.env.local`):

- `DATABASE_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`

**App** (`/var/www/IndexLa-App/.env.local`):

- `COINGECKO_API_KEY`, `COINGECKO_API_BASE_URL`
- `TWELVE_DATA_API_KEY`

(Full app template: IndexlaApp `.env.example` — production may use a subset.)

## Databases & persistent data

| Asset | Location | Backup path |
|-------|----------|-------------|
| PostgreSQL | **External** (`DATABASE_URL`; no local `postgresql` service) | Provider console + optional `pg_dump` after installing client |
| Website static | `/var/www/IndexLa/public` (~6.3 MB) | DR archive `static/website-public.tar.gz` |
| User uploads | None separate — static assets in `public/` | Same tarball |
| App build | `/var/www/IndexLa-App/.next` | Rebuild from GitHub + deploy script |
| PM2 state | `/root/.pm2/dump.pm2` | DR archive |
| TLS certs | `/etc/letsencrypt/` | Re-issue via certbot on rebuild (or restore from Hostinger snapshot) |

## Cron (pre-DR)

| Schedule | Command |
|----------|---------|
| `* * * * *` | `/usr/local/bin/deploy-indexla.sh` |

## DR scripts (repo)

See `docs/ops/DISASTER_RECOVERY.md` and `scripts/dr/`.

Refresh inventory on VPS:

```bash
/usr/local/bin/indexla-dr-inventory.sh /tmp/indexla-production-inventory.json
```
