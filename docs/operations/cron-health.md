# Cron Health

Last-run status per cron. Updated by each cron agent on every tick. Scheduler reads this file to detect stale crons (last_run > 2× expected interval).

---

## Cross-department operational crons

| Cron ID | Schedule | Role | Last run | Last result | Consecutive noops | Notes |
|---|---|---|---|---|---|---|
| weekly-okr-review | Mon 09:05 | digester-okr | — (never run) | — | 0 | Awaiting first tick after Phase 4 activation |
| runway-check | Daily 08:09 | monitor-runway | — (never run) | — | 0 | Awaiting first tick |
| churn-risk-scan | Daily 07:31 | monitor-churn | — (never run) | — | 0 | Awaiting first tick |
| competitor-watch | Mon+Thu 09:29 | sensor-competitor | — (never run) | — | 0 | Awaiting first tick |

## Marketing operational crons

| Cron ID | Schedule | Role | Last run | Last result | Consecutive noops | Notes |
|---|---|---|---|---|---|---|
| mkt-market-intelligence-weekly | Thu 09:00 | mkt-market-intelligence | — (never run) | — | 0 | Awaiting first tick |
| mkt-geo-probe-biweekly | 1st+15th 10:00 | mkt-geo-agent | — (never run) | — | 0 | Awaiting first tick |
| mkt-marketing-analytics-friday | Fri 14:00 | mkt-marketing-analytics | — (never run) | — | 0 | Awaiting first tick |
| mkt-content-manager-weekly | Mon 08:00 | mkt-content-manager | — (never run) | — | 0 | Awaiting first tick |
| mkt-campaign-manager-weekly | Mon 08:30 | mkt-campaign-manager | — (never run) | — | 0 | GATED: runs as noop until case-study-pipeline.md shows published_case_studies >= 3 |

## Existing crons (arch_v1 — status reference)

| Cron ID | Schedule | Role | Status |
|---|---|---|---|
| code-validation | Hourly 07min | code-validator | Active since Phase 1 |
| improvement-hunting | Every 6h 23min | improvement-hunter | Active since Phase 1 |
| consistency-checker | Tue 05:37 | improvement-hunter | Active since Phase 1 |

---

**Update format** (each cron appends/overwrites its own row):
```
| cron-id | schedule | role | YYYY-MM-DDThh:mm | ok/fail/partial/noop | N | <=40-char note |
```
