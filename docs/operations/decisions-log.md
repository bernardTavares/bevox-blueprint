# Decisions Log — Operational Decisions

Agent-level operational decisions that do not rise to the HUMAN_NEEDED threshold but are worth recording for audit and context. Append-only.

Format:
```
| ISO-timestamp | agent | decision | rationale |
```

---

| Timestamp | Agent | Decision | Rationale |
|---|---|---|---|
| 2026-07-01T12:43 | coo (phase4-bootstrap) | Bootstrapped docs/operations/ as operational state layer | Phase 4 shifts loop from BUILD to OPERATE; backlog.md construction-mode context replaced by this operational surface |
| 2026-07-01T12:43 | coo (phase4-bootstrap) | Carried forward arch_v1 cron schedules unchanged for 4 cross-dept crons | Schedules (weekly-okr-review Mon 09:05, runway-check 08:09 daily, churn-risk-scan 07:31 daily, competitor-watch Mon+Thu 09:29) were correct in arch_v1; only agent_status changed from NEEDS_BUILD to EXISTS |
| 2026-07-01T12:43 | coo (phase4-bootstrap) | Set mkt-campaign-manager-weekly to schedule Mon 08:30 | After mkt-content-manager-weekly at Mon 08:00 — campaign ops starts after content briefing is distributed; 30-min gap avoids resource contention |
