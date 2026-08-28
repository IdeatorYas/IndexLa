# Monthly restore test checklist

**Owner:** Founder / ops  
**Frequency:** Monthly (automated drill on 1st @ 04:45 UTC + manual review)  
**Rule:** Non-destructive only — extracts to `/tmp/`, never touches `/var/www/` or PM2.

## Automated drill

- [ ] Cron entry present: `crontab -l | grep indexla-dr-restore-drill`
- [ ] Latest log: `/var/log/indexla-dr-restore-drill.log`
- [ ] Last run exit 0; `fail_checks=0` in report

## Manual drill (optional, same month)

```bash
/usr/local/bin/indexla-dr-restore-drill.sh
LATEST=$(ls -1dt /tmp/indexla-dr-restore-test-* | head -1)
cat "$LATEST"/*/DRILL_REPORT.txt 2>/dev/null || cat "$LATEST"/DRILL_REPORT.txt
```

Verify report includes:

- [ ] `MANIFEST.json` with website + app commits
- [ ] Nginx configs for both sites
- [ ] PM2 dump present
- [ ] `website-public.tar.gz` extracts with files > 0
- [ ] Encrypted env decrypts (key names listed, not values)
- [ ] Database status documented (`DATABASE_STATUS`)

## Decrypt spot-check (local or VPS temp)

```bash
gpg --decrypt --passphrase-file /root/.indexla-dr/passphrase \
  -o /tmp/env-check.website /path/to/IndexLa.env.local.gpg
grep -E '^[A-Za-z_][A-Za-z0-9_]*=' /tmp/env-check.website | cut -d= -f1
rm -f /tmp/env-check.website
```

- [ ] Expected env key names present (see inventory doc)
- [ ] Decrypted file deleted immediately after check

## Cleanup

- [ ] Old `/tmp/indexla-dr-restore-test-*` dirs > 30 days removed

## Recovery time estimate refresh

| Step | Estimate |
|------|----------|
| New VPS + DNS | 30–60 min |
| Restore env + clone repos | 30 min |
| npm ci + both deploys | 45–90 min |
| certbot + smoke tests | 30 min |
| **Total RTO** | **~2–4 hours** |

**Sign-off:** _______________  **Date:** _______________
