# Architecture backlog

Overflow from architect run arch_version=1 (2026-05-22). Phase 1 emitted 18/20 missions (charter, strategy, org-chart, raci-matrix, 7 C-suite dual-output agents, okrs/q4-corporate, 6 process docs). The items below were deferred to respect the <=20 mission cap and the Phase-2/3 plan in objective.md.

## Phase 1b / Phase 2 — Department-lead dual-output agents (8)
Each = dual output: `docs/agents/<role>.md` (prose) + `.claude/agents/<role>.md` (dispatchable subagent). kind: deliverable. Reuse the "Suggested subagent frontmatter" + responsibilities from the cited reference, adapted to Bevox's post-PMF stage and stack.

| Role | Reports to | Reference | Bevox notes |
|---|---|---|---|
| Head of Engineering | CTO | references/corporate-roles/head-of-engineering.md | knows Fastify+Postgres+pgvector+BullMQ codebase; owns delivery throughput |
| Head of Product | CPO | references/corporate-roles/head-of-product.md | owns roadmap execution + usage-analytics-digest cron duty |
| Head of Marketing | CMO | references/corporate-roles/head-of-marketing.md | WhatsApp/Instagram-native, Portuguese-first content |
| Head of Sales | CMO (or CEO) | references/corporate-roles/head-of-sales.md | SMB inside-sales motion; pipeline-review cron duty |
| Head of Customer Success | COO | references/corporate-roles/head-of-customer-success.md | owns churn-risk-scan cron duty; NRR/GRR |
| Head of Finance | CFO | references/corporate-roles/head-of-finance.md | Stripe Connect reconciliation, controller duties |
| Head of Legal | CFO/COO | references/corporate-roles/head-of-legal.md | LGPD, Stripe/Pix compliance; compliance-recheck cron duty |
| Head of People | CHRO | references/corporate-roles/head-of-people.md | first-hires onboarding; tiny team at this stage |

## Phase 2 — Constructs (commands, skills, rules)
- commands: `/status`, `/okr-review`, `/standup`, `/onboard-customer` (.claude/commands/*) — see architecture.md commands_to_create.
- skills: `okr-rollup`, `format-board-report` (.claude/skills/*/SKILL.md).
- rules: `compliance.md` (LGPD + Pix/Stripe Connect guardrails). conventions.md + decision-authority.md are Phase-1 rules already in architecture.md (consider emitting next run if not produced).

## Phase 3 — Hooks, crons, integrations
- hooks: SessionStart.sh (inject company state when operator opens target).
- Cron-agent self-evolve missions (build agent before scheduler instantiates the cron):
  - build-digester-okr-agent (weekly-okr-review, CEO) — from references/agent-patterns/digester.md
  - build-monitor-runway-agent (runway-check, CFO) — from references/agent-patterns/monitor.md
  - build-monitor-churn-agent (churn-risk-scan, Head of CS) — from references/agent-patterns/monitor.md
  - build-sensor-competitor-agent (competitor-watch, CMO) — from references/agent-patterns/sensor.md
  - (code-validation + improvement-hunting reuse EXISTING code-validator / improvement-hunter agents — no build needed.)
- Skills (target or self-evolve): `gh-issue-from-feedback`, `cost-monitor`, `stripe-reconciler`, `whatsapp-health-probe`.
- MCP integration docs: Stripe Connect, WhatsApp/Meta Cloud API, Google Calendar, Clerk — how each role-agent connects.
- `target/.claude/settings.json` refinement (permissions + hooks for an operator).
- Phase 2 IC roles per department (declared by each dept-lead spec): senior backend engineer, ML/AI engineer, mobile engineer, product designer, content writer, BDR, account executive, support specialist, billing analyst, data analyst — right-sized to 10-50 customers.
