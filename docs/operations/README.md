# docs/operations — Operational State Layer

This directory is the orchestrator's working memory in **operation mode**. It replaces `backlog.md` as the primary context surface once Phase 4 is active.

Construction mode (Phases 1–3) was driven by missions and a build backlog. Operation mode is driven by cron runs, escalations, and customer signals. This directory holds the state that connects them.

---

## Structure

```
docs/operations/
  README.md                    — this file; index and conventions
  cron-run-log.md              — append-only log; one terse line per cron tick
  escalations-pending.md       — open items that require Bernard's attention or a human decision
  decisions-log.md             — decisions made by agents (operational, not strategic)
  cron-health.md               — last-run status per cron; updated on every tick
  escalation-protocol.md       — how HUMAN_NEEDED.md is written and resolved
  marketing/
    case-study-pipeline.md     — case study status register; gates mkt-campaign-manager activation
    campaign-state.md          — active Meta Ads campaigns and their current budget/status
    content-calendar.md        — weekly content calendar; mkt-content-manager writes here
  customers/                   — (to be created by COO/Head of CS) per-account health records
  finance/                     — (maintained by CFO) burn-rate.md, runway.md
```

---

## Writing conventions for cron agents

Every cron must append exactly one terse-log line to `cron-run-log.md` at the end of each tick, following the format in `conventions.md`:

```
[YYYY-MM-DDThh:mm] [agent-name] [tick=cron-id] action=<verb> mission=<id|-> result=ok|fail|partial|noop notes=<≤80 chars>
```

No emoji in log output. Long reasoning goes to `decisions-log.md`.

---

## Escalation flow

1. Cron detects a condition requiring human judgment.
2. Cron writes `HUMAN_NEEDED.md` in `.loop/` (see `escalation-protocol.md` for format).
3. Cron appends to `escalations-pending.md` with a one-line summary and a pointer to `HUMAN_NEEDED.md`.
4. Cron halts further analysis on the topic until Bernard acknowledges.

Bernard unblocks by: reviewing `.loop/HUMAN_NEEDED.md` → deciding → deleting the file → optionally setting `autonomy_pass: true` on the relevant mission.

---

## Gate register

`docs/operations/marketing/case-study-pipeline.md` is the single source of truth for the published-case-studies count. The `mkt-campaign-manager-weekly` cron reads this file on every tick. If `published_case_studies < 3`, the cron logs `result=noop` and halts — no campaign activation occurs. This gate is enforced here, not in the Meta Ads API.
