# Strategy

## Current phase: Phase 4 active — Operational activation (2026-07-01)

Phases 1–3 are complete and merged into target main. Phase 4 shifts the loop from BUILDING the company to OPERATING it.

### Phase 4 architect rerun (2026-07-01)

Architecture rerun produced `arch_version: 2` with 14 missions and 9 new cron declarations. Key deliverables completed in this rerun:

| Deliverable | Status |
|---|---|
| 4 cron-agent files created in target `.claude/agents/` | DONE — digester-okr, monitor-runway, monitor-churn, sensor-competitor |
| 4 prose mirrors in `docs/agents/` | DONE |
| `docs/operations/` operational state layer bootstrapped | DONE — 6 files + marketing/ subfolder |
| 9 new crons declared in `crons_to_create[]` | DONE — 4 cross-dept + 5 marketing |
| `architecture.md` advanced to arch_version: 2 | DONE |

### Cron-agent status (Phase 4)

All 4 cron-agents now exist in target `.claude/agents/` and are instantiable:

| Cron agent | File | Cron ID | Schedule |
|---|---|---|---|
| digester-okr | `.claude/agents/digester-okr.md` | weekly-okr-review | Mon 09:05 |
| monitor-runway | `.claude/agents/monitor-runway.md` | runway-check | Daily 08:09 |
| monitor-churn | `.claude/agents/monitor-churn.md` | churn-risk-scan | Daily 07:31 |
| sensor-competitor | `.claude/agents/sensor-competitor.md` | competitor-watch | Mon+Thu 09:29 |

### Marketing cron status (Phase 4)

10 mkt-* agents verified in target (added manually outside loop). 5 marketing crons now declared:

| Cron ID | Schedule | Role |
|---|---|---|
| mkt-market-intelligence-weekly | Thu 09:00 | mkt-market-intelligence |
| mkt-geo-probe-biweekly | 1st+15th 10:00 | mkt-geo-agent |
| mkt-marketing-analytics-friday | Fri 14:00 | mkt-marketing-analytics |
| mkt-content-manager-weekly | Mon 08:00 | mkt-content-manager |
| mkt-campaign-manager-weekly | Mon 08:30 | mkt-campaign-manager (GATED) |

### Next steps

1. **Scheduler**: instantiate the 9 new crons declared in `architecture.md` crons_to_create[] at BOOTSTRAP_COMPLETE.
2. **Bernard**: confirm the `bevox-site` CMS platform so `cms-site` MCP can be built (open_question in architecture.md).
3. **mkt-customer-story-writer**: begin case study pipeline — `docs/operations/marketing/case-study-pipeline.md` must reach `published_case_studies: 3` before paid campaigns activate.
4. **COO**: create `docs/operations/customers/` health register so `monitor-churn` can scan on first tick.
5. **CFO**: create `docs/finance/burn-rate.md` so `monitor-runway` can compute runway on first tick.

### Escalation

- L1 (3 noops): retry current approach
- L2 (5 noops): write architect-rerun.flag to trigger structural replan
- L3 (8 noops): write HUMAN_NEEDED.md + halt
