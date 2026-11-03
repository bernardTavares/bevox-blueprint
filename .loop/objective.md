# Objective

Build the complete agentic-enterprise blueprint for BEVOX — a real company operated by a single human (Bernard Tavares) where every department and role is a Claude Code agent with full autonomy.

## Company context (ground truth)

BEVOX is a B2B vertical SaaS: an operating system for appointment-based small businesses in Brazil (physiotherapy, pilates, sports studios, aesthetics/wellness, independent professionals). It coordinates the full service cycle — availability → booking → confirmation → rescheduling → billing → follow-up — through an AI secretary that becomes progressively autonomous after learning the business's rules. It is NOT a generic chatbot nor clinic software; it unifies calendar + conversation (WhatsApp/Instagram) + payments into one flow.

- **Customer / ICP:** Brazilian SMBs (1–10 professionals) whose revenue depends on booked time slots, heavy WhatsApp + Instagram users. Four personas: owner/manager, attending professional, human operator (receptionist), and the AI secretary itself.
- **Business model:** SaaS per-professional subscription + PSP transaction fee via Stripe Connect (Pix + card, Connect Express subaccounts, automatic Bevox-fee split).
- **Stack:** Node.js + TypeScript + Fastify (backend) · Postgres 16 + pgvector (RAG/embeddings) · Redis + BullMQ (AI job queue) · Expo SDK 52 + React Native (mobile) · Next.js 14 + Tailwind + shadcn/ui + Clerk (web) · headless Node/TS harness (AI engine: declarative skills, RAG, MCP, OTel). Auth: Clerk + staff RBAC. Callbacks: authenticated HTTP (X-Execution-Token).
- **Modules:** bevox-backend (canonical domain API), bevox-console (staff admin), bevox-harness (AI engine, prototype), bevox-mobile (client app), bevox-web (client panel), bevox-meta-api (WhatsApp/Instagram integration), bevox-direct (legacy Chatwoot), bevox-site (marketing).
- **Stage:** post-PMF target — designing for 10–50 paying customers (the next leap). Roles must handle real customer load, imminent pricing/packaging decisions, first growth metrics (NRR, churn, CAC), first 1–3 potential hires, beginning of process discipline. Still scrappy — no enterprise bloat.
- **Operating principle:** total autonomy. Agents execute everything operational (code, support, marketing execution, content, reporting, analysis, billing ops) end to end. Bernard is the single human; the template's existing safeguards (HALTED.md kill switch, budget caps, hardened-file deny rules, Stop.sh template-remote whitelist) are the only limits.

## Mission of this blueprint

Plan BEVOX completely as an agentic enterprise: every sector and role becomes a dispatchable Claude Code agent that Bernard can invoke to run the company. Produce both the strategic foundation (so the org is coherent) and the runnable agent files (so it actually operates).

## Output contract (dual output per role)

For EACH leadership role and IC role:
- `docs/agents/<role>.md` — human-readable role spec (mission, responsibilities, decision authority, KPIs owned, RACI handoffs). `kind: deliverable`, scope relative to target root.
- `.claude/agents/<role>.md` — dispatchable Claude Code subagent with valid frontmatter (`name`, `description`, `tools`, `model`) + operating instructions. `kind: deliverable`, scope `target/.claude/agents/<role>.md`.

For strategic artifacts: markdown in target root (`charter.md`, `strategy.md`, `org-chart.md`, `raci-matrix.md`, `okrs/`, `processes/`).

For new loop-internal capabilities (a sensor/skill the LOOP itself needs to operate the company — e.g. a GitHub-issue sensor, a Stripe reconciliation skill): `kind: self-evolve`, scope under template `.claude/`.

## Phased decomposition (architect: emit in waves, respect the 20-mission cap)

**Phase 1 — Foundation + leadership (this architect run, ~19 missions):**
- `charter.md` (mission, vision, values, positioning, business model) + `strategy.md` (3 strategic horizons for post-PMF stage)
- `org-chart.md` (mermaid graph + reporting lines) + `raci-matrix.md` (R/A/C/I across roles × processes: strategy, hiring, pricing, product-launch, incident, compliance, billing)
- 7 C-suite agents (dual output each): CEO, CTO, CPO, CFO, CMO, COO, CHRO — adapted to Bevox's stage and stack
- 8 department-lead agents (dual output each): Head of Engineering, Product, Marketing, Sales, Customer Success, Finance, Legal, People
- `okrs/q4-corporate.md` — corporate OKRs cascaded to each department, with quantitative key results grounded in post-PMF SaaS benchmarks
- `processes/` catalog: hiring.md, customer-success.md, billing-incidents.md, gtm.md, product-strategy.md, governance.md

**Phase 2 — IC roles per department (architect rerun, ~25 missions):**
Each department-lead's spec should declare the IC roles its department needs at 10–50 customers. Phase 2 creates dual-output agents for those ICs (e.g. senior backend engineer, ML/AI engineer, mobile engineer, product designer, content writer, BDR, account executive, support specialist, billing analyst, data analyst, etc.). Right-size to the stage — only ICs that earn their seat at 10–50 customers.

**Phase 3 — Operational integrations (architect rerun, ~6 missions):**
- Custom skills (`target/.claude/skills/`): e.g. `gh-issue-from-feedback`, `cost-monitor`, `stripe-reconciler`, `whatsapp-health-probe` — `kind: deliverable` in target unless the loop itself needs them (then self-evolve).
- MCP integration docs: Stripe Connect, WhatsApp/Meta Cloud API, Google Calendar — how each role-agent connects to the real service.
- `target/.claude/settings.json` refinement: permissions + hooks appropriate for an operator opening the target as a Claude Code project.

## Reference grounding (REQUIRED)

Ground every capability in the references KB and cite the source (file:line) in each architecture.md capability block:
- `references/industry-playbooks/saas-b2b.md` — SaaS KPIs (NRR, CAC payback, T2D3), org evolution by stage, common pitfalls.
- `references/corporate-roles/<role>.md` — reuse the canonical role templates (CEO, CTO, CFO, ... head-of-*) as the starting frontmatter + responsibilities for each agent, adapted to Bevox.
- `references/agent-patterns/<pattern>.md` — for any sensor/reporter/monitor/digester/fixer behavior (especially Phase 3 skills).
- `references/arsenal/<bucket>/<agent>.md` — when a role maps to an existing specialist archetype, cite it and inherit its tools/model.
- `references/ecc-skills/<skill>/SKILL.md` — for loop-infrastructure patterns if a self-evolve mission is needed.

A capability without a cited reference must be tagged `confidence: low`.

## Constraints

- Stack-aware: agent specs must reference Bevox's actual stack (Fastify, Postgres+pgvector, BullMQ, Stripe Connect, Expo, Next.js, Clerk) where relevant — e.g. the Head of Engineering agent knows the codebase is Fastify+Postgres, the CFO agent knows revenue flows through Stripe Connect.
- Stage-right-sized: post-PMF (10–50 customers). No enterprise bloat (no "VP of VPs"), no roles that earn their seat only at 1000 customers.
- Correct `kind` classification: corporate personas = `deliverable` in target; new loop capabilities = `self-evolve` in template. NEVER put corporate roles in the template's `.claude/agents/`.
- Total autonomy: agent operating instructions assume they execute without human approval gates (the loop's structural safeguards are the only limits).
- Brazilian context where relevant: LGPD for compliance/legal, Pix for payments, Portuguese-first customer comms.

Slug: bevox-blueprint
Created: 2026-05-22T03:39:09.579Z
Cadence: every 5 minutes
