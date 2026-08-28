# Monthly backup monitoring checklist

**Owner:** Founder / ops  
**Frequency:** Monthly (1st week)  
**Duration:** ~15 minutes

## GitHub source of truth

- [ ] `IndexLa` `master` matches last intentional website deploy (`X-Deploy-Commit` header)
- [ ] `IndexlaApp` `main` tip documented; production app commit noted in inventory
- [ ] No unpushed critical commits on either repo
- [ ] DR scripts/docs present on `master` (`scripts/dr/`, `docs/ops/`)

## VPS backup job

- [ ] `/var/log/indexla-dr-backup.log` shows successful run in last 25 hours
- [ ] Latest archive exists: `ls -lt /var/backups/indexla/daily/ | head`
- [ ] Archive size reasonable (not 0 bytes)
- [ ] Weekly copy present on Sundays: `/var/backups/indexla/weekly/`

## Off-server copies

- [ ] `INDEXLA_DR_OFFSITE_*` configured in `/root/.indexla-dr/config.env`
- [ ] Offsite destination has today's `daily/indexla-dr-*.tar.gz`
- [ ] Offsite weekly folder has recent copy
- [ ] GPG passphrase stored offline (password manager / secure note)

## Hostinger

- [ ] hPanel → VPS → Snapshots & Backups: auto-backup schedule **Weekly** or **Daily**
- [ ] Latest automated backup date < 8 days (weekly) or < 2 days (daily)
- [ ] Manual snapshot taken after major infra changes

## External database

- [ ] Postgres provider (Neon/Supabase/etc.) automated backups enabled
- [ ] Point-in-time recovery window documented
- [ ] Restore procedure tested at provider at least once per quarter

## Production health (no restart)

- [ ] `https://indexla.tech` → HTTP 200
- [ ] `https://app.indexla.tech/app` → HTTP 200
- [ ] `pm2 list` shows `indexla` + `indexla-app` online (read-only SSH)

## Alerts / follow-up

- [ ] Log any WARN lines in backup log (missing pg_dump, offsite sync failure)
- [ ] Ticket opened if offsite sync failed 2+ consecutive days

**Sign-off:** _______________  **Date:** _______________
