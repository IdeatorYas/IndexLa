# INDEXLA — disaster recovery & backup

> Recover **indexla.tech** and **app.indexla.tech** from **GitHub + encrypted off-server backups** if the Hostinger VPS is deleted.

## What is protected

| Layer | Source | Recovery |
|-------|--------|----------|
| Application source | GitHub `IndexLa` + `IndexlaApp` | `git clone` + deploy scripts |
| Runtime config | GPG-encrypted `.env.local` in DR archives | Decrypt with offline passphrase |
| Nginx / PM2 | DR archives + repo reference configs | Restore files + `certbot` |
| Static assets | DR archive + git `public/` | Extract tarball or git |
| PostgreSQL | External provider (`DATABASE_URL`) | **Provider backup** (not on VPS disk) |
| TLS | Let's Encrypt | Re-issue on new VPS |
| Weekly VPS snapshot | Hostinger hPanel | Full-server restore |

## Backup layout (VPS)

```
/var/backups/indexla/
  daily/indexla-dr-YYYYMMDD-HHMMSS.tar.gz   # retain 7 days
  weekly/                                   # Sunday copies, retain 28 days
```

Archive contents:

- `MANIFEST.json` — commits, env key names, paths
- `nginx/` — live site configs
- `pm2/` — `dump.pm2`, process list
- `deploy/` — deploy markers + script copies
- `encrypted/*.env.local.gpg` — secrets (AES256 GPG)
- `database/` — status + optional `pg_dump`
- `static/website-public.tar.gz`

## Off-server destination (required for VPS-loss scenario)

Configure on VPS: `/root/.indexla-dr/config.env` (from `scripts/dr/dr-config.example.env`):

- `INDEXLA_DR_OFFSITE_RSYNC` — e.g. `user@backup-host:/backups/indexla-vps/`
- or `INDEXLA_DR_OFFSITE_RCLONE` — e.g. `b2:indexla-dr`
- or `INDEXLA_DR_OFFSITE_SCP`

**Passphrase:** `/root/.indexla-dr/passphrase` (600) — store an offline copy in a password manager.

Without offsite sync, backups die with the VPS.

## Install (VPS, zero downtime)

After website repo deploy or manual copy of `scripts/dr/`:

```bash
cd /var/www/IndexLa
git pull origin master   # when DR scripts are on master
bash scripts/dr/install-backup-cron.sh
/usr/local/bin/indexla-dr-backup.sh
/usr/local/bin/indexla-dr-restore-drill.sh
```

Cron (installed by script):

- **Daily 03:15 UTC** — backup + offsite sync
- **Monthly 1st 04:45 UTC** — restore drill to `/tmp/`

## Restore runbook — fresh Ubuntu VPS

**Estimated RTO:** 2–4 hours (DNS + TLS + builds), assuming offsite backups and DB provider access.

### 1. Provision server

- Ubuntu 22.04+ on Hostinger (or any provider)
- Point `indexla.tech`, `www`, `app.indexla.tech` A records to new IP (can wait until step 6)
- Enable Hostinger **weekly** (or paid **daily**) backups + create manual snapshot after go-live

### 2. Base packages

```bash
apt update && apt install -y git nginx certbot python3-certbot-nginx nodejs npm gpg rsync
npm i -g pm2
```

Optional for DB restore: `apt install -y postgresql-client`

### 3. Restore encrypted config (from offsite DR archive)

```bash
mkdir -p /root/.indexla-dr /var/backups/indexla/daily
# copy latest indexla-dr-*.tar.gz from offsite to /var/backups/indexla/daily/
tar -xzf /var/backups/indexla/daily/indexla-dr-*.tar.gz -C /tmp/dr-restore
# place passphrase in /root/.indexla-dr/passphrase (from password manager)
gpg --decrypt --passphrase-file /root/.indexla-dr/passphrase \
  -o /var/www/IndexLa/.env.local /tmp/dr-restore/*/encrypted/IndexLa.env.local.gpg
mkdir -p /var/www/IndexLa-App
gpg --decrypt --passphrase-file /root/.indexla-dr/passphrase \
  -o /var/www/IndexLa-App/.env.local /tmp/dr-restore/*/encrypted/IndexLa-App.env.local.gpg
chmod 600 /var/www/IndexLa/.env.local /var/www/IndexLa-App/.env.local
```

### 4. Clone repositories

```bash
git clone https://github.com/IdeatorYas/IndexLa.git /var/www/IndexLa
cd /var/www/IndexLa && git checkout master && git checkout <manifest.website.git_short>

git clone https://github.com/IdeatorYas/IndexlaApp.git /var/www/IndexLa-App
cd /var/www/IndexLa-App && git checkout main && git checkout <manifest.app.deploy_source_commit>
```

### 5. Install deploy + DR scripts

```bash
install -m 0755 /var/www/IndexLa/scripts/deploy-indexla.sh /usr/local/bin/deploy-indexla.sh
install -m 0755 /var/www/IndexLa-App/scripts/deploy-indexla-app.sh /usr/local/bin/deploy-indexla-app.sh
bash /var/www/IndexLa/scripts/dr/install-backup-cron.sh
```

### 6. Nginx + TLS

```bash
cp /var/www/IndexLa/scripts/dr/reference/nginx-indexla.conf /etc/nginx/sites-available/indexla
cp /var/www/IndexLa-App/scripts/nginx-indexla-app.conf /etc/nginx/sites-available/indexla-app
ln -sf /etc/nginx/sites-available/indexla /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/indexla-app /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d indexla.tech -d www.indexla.tech -d app.indexla.tech
```

### 7. Deploy applications

```bash
cd /var/www/IndexLa && npm ci && /usr/local/bin/deploy-indexla.sh
cd /var/www/IndexLa-App && npm ci && /usr/local/bin/deploy-indexla-app.sh
pm2 save && pm2 startup
```

### 8. Database

If using external Postgres: restore from **provider** backup into a new instance; update `DATABASE_URL` in website `.env.local` if hostname changed.

If archive contains `website-postgres.dump`:

```bash
pg_restore -d "$DATABASE_URL" --no-owner database/website-postgres.dump
```

### 9. Verify

```bash
curl -sI https://indexla.tech | grep HTTP
curl -sI https://app.indexla.tech/app | grep HTTP
/usr/local/bin/indexla-dr-restore-drill.sh
```

## Hostinger panel (manual)

1. [hPanel → VPS](https://hpanel.hostinger.com/servers/) → **Manage**
2. **Backups & Monitoring → Snapshots & Backups**
3. Confirm **Weekly** auto-backup is **on** (default)
4. Optional: **Upgrade → Daily backups** (~$6/mo) for 2 daily + 2 weekly retention off-disk
5. **Create Snapshot** now (baseline after DR install)
6. Download or verify you can restore a backup archive off-server periodically

## Related docs

- `docs/ops/VPS_PRODUCTION_INVENTORY.md`
- `docs/ops/BACKUP_MONITORING_CHECKLIST.md`
- `docs/ops/RESTORE_TEST_CHECKLIST.md`
- `docs/PRODUCTION_ZERO_DOWNTIME.md`
- IndexlaApp `docs/OPS_DISASTER_RECOVERY.md` (pointer)

## Still at risk if not configured

- Offsite DR destination not set → VPS deletion loses encrypted archives
- External Postgres without provider backups → early-access DB lost
- GPG passphrase only on VPS → cannot decrypt env after total loss
- App deployed from old tarball commit without git clone → use GitHub `main` + manifest commit
- Let's Encrypt private keys not backed up → re-issue only (acceptable)
