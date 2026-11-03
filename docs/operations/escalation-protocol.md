# Escalation Protocol

How cron agents escalate to Bernard and how Bernard unblocks them. This protocol implements the escalation section of `decision-authority.md` for the operational (cron) layer.

---

## When to escalate

A cron agent must escalate — and halt further analysis on the topic — when it hits any of the conditions defined in its operating instructions OR in `decision-authority.md`. Common triggers:

| Trigger class | Examples | Authority |
|---|---|---|
| Strategic decision | Entering a new vertical, licensing the technology, pricing change | CEO + Bernard |
| Financial commitment | Budget above threshold, fundraising signal, cost-cut decision | CFO (±R$5k), CEO (>R$5k) |
| Runway critical | Runway < 2 months | CFO + CEO |
| Competitive P0 | Competitor announces direct AI-secretary + WhatsApp + payments feature | CMO + CEO |
| Churn spike | ≥3 High-risk accounts simultaneously | COO + Head of CS |
| Legal/compliance | New data collection, potential breach, ANPD inquiry | Head of Legal |
| OKR off-track | Any KR > 25% below linear expectation | CEO |

---

## How to write HUMAN_NEEDED.md

Write `.loop/HUMAN_NEEDED.md` (overwrite if a previous one exists — there is at most one active HUMAN_NEEDED file). Format:

```markdown
# HUMAN_NEEDED — [trigger class]

**Written by:** [agent-name]
**Date:** YYYY-MM-DD HH:MM UTC
**Cron:** [cron-id]
**Blocking:** [what cannot proceed until resolved]

## Situation

[2-4 sentences: what was detected, why it requires a human decision, what will happen if not resolved]

## Options (if applicable)

1. [Option A] — consequence
2. [Option B] — consequence

## Data available

[Pointer to the relevant file or inline data the human needs to decide]

## What the agent needs to continue

[One sentence: what specific action Bernard must take to unblock this — delete this file / set autonomy_pass:true / update a specific doc]
```

Then:
1. Append a one-line summary to `docs/operations/escalations-pending.md`
2. Log `result=escalated` in `docs/operations/cron-run-log.md`
3. Halt analysis on the blocking topic (do not retry on the next tick)

---

## How Bernard unblocks

1. Read `.loop/HUMAN_NEEDED.md`
2. Make the decision
3. Take the required action (update a doc, approve a mission, etc.)
4. Delete `.loop/HUMAN_NEEDED.md`
5. Mark the item as RESOLVED in `docs/operations/escalations-pending.md` with date and decision
6. If needed, set `autonomy_pass: true` on the relevant mission file

The cron will detect the absence of `HUMAN_NEEDED.md` on its next tick and resume.

---

## Escalation SLAs (from compliance.md)

| Trigger | SLA |
|---|---|
| Possible data breach or unauthorized PII access | Immediately — 72h ANPD notification window |
| LGPD data subject request | Within 72h |
| Runway < 2 months critical | Same-day human review |
| Competitor P0 signal | Same-day CMO + CEO review |
| Any other HUMAN_NEEDED | Next business-day review |
