# CLAUDE.md — bevox-blueprint

Guidance for any Claude session working in this repository. Read this first.

## What this repo is

`bevox-blueprint` is the **agentic-enterprise blueprint** for BEVOX: a plan in which every
department and role is a dispatchable Claude Code agent that Bernard (the single human operator)
can invoke to run the company. It contains the strategic foundation (`charter.md`, `strategy.md`,
`org-chart.md`, `raci-matrix.md`, `okrs/`, `processes/`) plus the runnable agent files and skills.

This repo is a **planning/operating blueprint**, not the product codebase and not the canonical
source of truth. For ground truth, see "Source of truth" below.

## What BEVOX is (summary — verify against the SoT)

A B2B vertical SaaS: an operating system for appointment-based Brazilian SMBs (physiotherapy,
pilates, studios, aesthetics, independent professionals). It unifies calendar + conversation
(WhatsApp/Instagram) + payments (Stripe Connect — Pix + card) into one flow, driven by an AI
secretary that becomes progressively autonomous after learning each business's rules.

**Canonical product modules (8)** — per the SoT (ADR-011); the README's "8 modules" wording is
otherwise correct but read the SoT for the authoritative description of each:

| Module | What it is |
|---|---|
| `bevox-backend` | Shared application backend; source of truth for domain data (auth, tenants, agenda, services, payments). Fastify + TS + Postgres 16 + pgvector + Redis + BullMQ. |
| `bevox-harness` | Runtime engine of the AI secretary (conversations, memory, skills, policies). Headless Node/TS. |
| `bevox-web` | Web app for the **Bevox customer** (professional/clinic): setup, policies, agenda, config. Next.js 14. |
| `bevox-mobile` | Mobile **operator** app for the customer's day-to-day: inbox, human handoff, agenda, alerts. Expo SDK 52 + RN. |
| `bevox-console` | Internal super-admin backoffice for the **Bevox team** (not customer-facing). |
| `bevox-meta-api` | The **single gateway** for all Meta traffic (WhatsApp Cloud + Instagram Graph). No module calls Graph directly (ADR-012). |
| `bevox-direct` | A **separate, autonomous** B2B SaaS for bulk-WhatsApp dispatch + AI prospecting (own stack). NOT "legacy Chatwoot". |
| `bevox-site` | Public marketing site. |

> Canonical detail and the single reference agents should cite: **`docs/modules.md`**.

## Two layers of agents (the dual-layer model)

This blueprint deliberately models **two complementary layers**:

1. **Management layer** (this repo's personas) — `CEO/CTO/CPO/CFO/CMO/COO/CHRO`, department heads,
   and ICs. These are business/decision functions. See `org-chart.md` and `docs/agents/`.
2. **Operating layer** (the real Company OS) — the OpenClaw runtime plus the functional agents that
   actually build and operate the product (`vox`, `dispatcher-agent`, `tester-agent`, etc.), under
   the L1–L4 governance model (ADR-003). This layer lives in the SoT, not here. See
   `docs/operating-layer.md`.

The management personas **dispatch delivery work into** the operating layer. The
`company-os-liaison` agent is the bridge: it reads the SoT and reports the real topology/status so
the personas stay grounded in reality.

## Source of truth (SoT)

The canonical source of truth for Bevox is the **`<org>/bevox-knowledge`** repo (private)
— PRDs, ADRs, architecture, roadmap, releases (ADR-005 = SoT; ADR-010 = layout). **When this
blueprint's inline copies disagree with the SoT, the SoT wins.**

- To read it, use the **`bevox-knowledge-read`** skill (read-only; gh API on `main` is the
  canonical-fresh path; a local clone at `<home>\bevox-knowledge` is a fast-path).
- Project status/progress lives in `40_roadmap/_shared/delivery-tracker.yml` + per-project
  `40_roadmap/<slot>/` + `50_releases/<slot>/`.
- A standing audit of blueprint-vs-SoT drift is in `docs/sot-reconciliation-audit.md`.
- **Known caveat:** `.loop/objective.md` is immutable (see governance) and still calls
  `bevox-direct` "legacy Chatwoot" — that label is wrong; trust the table above and the SoT.
- Writing to the SoT is **not** this repo's job — that is the canonical `bevox-knowledge-contribute`
  skill on the OpenClaw host (approval-gated). Nothing here writes to `bevox-knowledge`.

## Repository structure

```
charter.md  strategy.md  org-chart.md  raci-matrix.md   # strategic foundation
okrs/  processes/                                        # OKRs + process docs
docs/agents/<role>.md         # human-readable role specs (deliverables)
docs/skills/<skill>.md        # prose mirrors of skills
docs/operating-layer.md       # the real Company OS / OpenClaw operating layer
docs/sot-reconciliation-audit.md
.claude/agents/<role>.md      # dispatchable Claude Code subagents (corporate personas)
.claude/skills/<skill>/SKILL.md
.claude/rules/<noun>.md       # injected rules (compliance, conventions, decision-authority)
.claude/settings.json
.loop/                        # claude-loop runtime state (objective.md is IMMUTABLE)
```

## Conventions & rules (always apply)

Three rule files in `.claude/rules/` are injected into every session and **override default
behavior** — follow them exactly:

- `conventions.md` — naming, file structure, agent output format, emoji policy, commit/branch
  naming, Portuguese (`você`) for customer-facing text, English for code/config/agent files.
- `compliance.md` — LGPD + Pix/Stripe guardrails; never log/commit PII or secrets; escalation SLAs.
- `decision-authority.md` — which role/agent holds authority per decision class; when a boundary is
  hit, **stop, write `HUMAN_NEEDED.md`, and halt**.

## Governance & safety

- The agent loop is currently **HALTED** (kill switch). Do not perform autonomous loop actions.
- **Do not commit or push** unless the operator explicitly asks. Workers never merge inline.
- `.loop/objective.md` is **immutable after bootstrap** — never edit it.
- Loop-brain changes under `.claude/**` follow `decision-authority.md` (self-evolver proposes;
  human sets `autonomy_pass`). Corporate-persona deliverables under `.claude/agents/` and
  `docs/agents/` are edited under the operator's direction.
- Respect hardened-file deny rules and the secrets denylist in `compliance.md`.

## Working here

- **Ground facts in the SoT.** Before asserting what a module/agent/decision is, check
  `bevox-knowledge` via the `bevox-knowledge-read` skill and cite it. Do not propagate inline drift.
- **Agents are dual-output:** each role has `.claude/agents/<role>.md` (dispatchable subagent) +
  `docs/agents/<role>.md` (prose mirror). Keep them in sync.
- **Stage-honest:** post-PMF, 10–50 customers. No enterprise bloat; right-size everything.

## Skills available in this repo

`bevox-knowledge-read` (read the SoT), `cost-monitor`, `okr-rollup`, `stripe-reconciler`,
`whatsapp-health-probe`, `format-board-report`, `gh-issue-from-feedback`. See `.claude/skills/` and
`docs/skills/`.
