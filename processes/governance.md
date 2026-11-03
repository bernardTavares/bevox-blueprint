# BEVOX — Governance Process

This is the canonical, written description of **how BEVOX governs itself as an agentic enterprise**: how decisions get made and reviewed, what the operating cadence is, where the line sits between what agents do autonomously and what escalates to Bernard, how compliance and legal risk are governed, and how the agent catalog stays clean. It is the place every "who decides, and how do we know it's working" question looks first.

It consumes `raci-matrix.md` (Row 1 — Strategy & OKRs — and Row 6 — Compliance & governance), `docs/agents/ceo.md` (the CEO's strategy/governance mandate and the single human gate; the canonical role template is cited as `references/corporate-roles/ceo.md:16-43`), `references/industry-playbooks/saas-b2b.md:31-36` (the regulatory/compliance dimension of the B2B-SaaS playbook), and `.loop/objective.md:14` (the total-autonomy operating principle and its structural safeguards). Where this doc and `raci-matrix.md` disagree on who is accountable, **the matrix wins** and this doc is corrected.

## Stage honesty

This process is sized for BEVOX **as it is**: post-PMF, scaling toward 10–50 paying customers, operated by a single human (Bernard Tavares) and a roster of Claude Code agents (`.loop/objective.md:13` — "Still scrappy — no enterprise bloat"). There is no board, no audit committee, no compliance department, no quarterly governance offsite. There is one human, one CEO agent that is his single interface, and a C-suite of agents beneath it. The governance discipline here is the *minimum viable* set of rhythms and guardrails that keep the org coherent and safe as customers and decisions are added — not a corporate governance manual for a company that does not exist yet (`raci-matrix.md` — "Stage honesty … we do not invent accountability for roles that have not been instantiated yet").

## Ownership (from `raci-matrix.md`)

Governance at BEVOX splits into two matrix rows, each with a single accountable owner:

| Concern | Accountable (A) | Responsible (R) | Consulted (C) | Informed (I) |
|---|---|---|---|---|
| **Strategy, OKRs, org coherence, this governance process** (Row 1) | **CEO** | CEO | all C-suite (CTO, CPO, CFO, CMO, COO, CHRO) | Bernard (final escalation) |
| **Compliance & governance — LGPD, payment regulation** (Row 6) | **CFO** (via Head of Legal, planned) | CTO (technical controls); COO (process/audit cadence) | CHRO (agent-org governance); Bernard (legal escalation) | CEO |

Two stage-honest rules, straight from the matrix:

1. **Exactly one A per concern.** Strategy/governance is the CEO's (`docs/agents/ceo.md` — "Strategy / OKRs: CEO is **A** and **R**"). Compliance is the CFO's, exercised through a **planned** Head of Legal that does not yet exist; until it is instantiated, accountability rolls up to the CFO (`raci-matrix.md` Row 6 — "Why A = CFO (not Head of Legal): the Head of Legal is a **planned** Phase 1b/2 role … accountability rolls up to its C-suite parent, the **CFO**"). The CEO is the standing tie-breaker if two roles both believe they hold an A (`raci-matrix.md` — "escalate to the CEO, who is the standing tie-breaker").
2. **No process doc may assign accountability that contradicts the matrix.** If this doc and `raci-matrix.md` disagree, the matrix wins.

## 1. Operating rhythm — how the org stays coherent

The CEO is accountable for keeping `org-chart.md`, `raci-matrix.md`, `charter.md`, `strategy.md`, and `okrs/` from drifting apart (`docs/agents/ceo.md` — "Keep the org coherent … Resolve contradictions between them"). The cadence below is the lightweight rhythm that enforces that, sized for one human and a roster of agents.

### Weekly Business Review (WBR)
- **What:** the CEO rolls up the company's vital signs and the week's cross-functional decisions. Inputs: MRR/ARR trajectory, net burn / months of runway, NPS, eNPS (the CEO's owned KPIs per `docs/agents/ceo.md` — KPIs Owned), plus the secondary metrics it watches (NRR, gross churn, CAC payback target ≤ 3 months, gross margin ≥ 70% on the SaaS component).
- **Who:** CEO accountable; all C-suite agents contribute their function's numbers (R for their own metrics).
- **Output:** a short written review — what moved, what decisions were made and their recorded rationale (tie-breaks especially, per `docs/agents/ceo.md` — "Cast the deciding vote … record the rationale"), and what the org is doing next. The deciding-vote log is part of governance: any cross-VP dispute the CEO resolved is captured with its rationale.

### OKR check-in
- **What:** progress against the current `okrs/` file — the single source of truth for "what we are trying to win this quarter" (`docs/agents/ceo.md` — "Own the company objective"). Each key result is marked on/ahead/behind, with the owning department's read on why.
- **Who:** CEO accountable; each department lead reports its cascaded OKRs. Run on a cadence that fits the quarter (typically alongside or interleaved with the WBR; formally re-baselined at quarter boundaries).
- **Output:** an updated status on each KR and any re-prioritization. If the objective itself needs to change mid-quarter, the CEO owns the rewrite and keeps it consistent with `charter.md` and `strategy.md` (`docs/agents/ceo.md` — "keeping that file current, unambiguous, and consistent").

### Monthly operator report to Bernard
- **What:** the CEO's monthly written report to Bernard — the one human and sole board member (`docs/agents/ceo.md` — "The 'board' is one person"). It summarizes the month's vital signs, the major decisions made autonomously, anything escalated and its resolution, compliance/legal posture, and the few decisions on the horizon that may *need* the human.
- **Who:** CEO is Bernard's single interface (`raci-matrix.md` — "CEO … is Bernard's single interface"; `.loop/objective.md` — "Bernard is the single human"). Bernard is **I** (informed) on almost everything and is consulted/escalated only for the three gated decision classes (below).
- **Output:** the operator report, plus surfacing of any pending escalations so Bernard can act on the few things only he can.

This rhythm is the mechanism behind the saas-b2b playbook's regulatory/operating discipline at this stage (`references/industry-playbooks/saas-b2b.md:31-36`): a deliberate, written cadence rather than ad-hoc decisions, right-sized to post-PMF.

## 2. Decision authority — autonomous vs. escalate-to-Bernard

BEVOX runs on **total autonomy**: agents execute everything operational — code, support, marketing execution, content, reporting, analysis, billing ops — end to end, without a human approval gate (`.loop/objective.md:14` — "total autonomy … Bernard is the single human"; `docs/agents/ceo.md` — "The CEO executes its mandate without a human approval gate"). The authority split is therefore short and explicit.

### Agents decide and execute autonomously
- Company objective / quarterly OKRs, capital allocation across departments, tie-breaks between two C-suite agents, pricing & packaging, the decision to open a role, product roadmap priority, GTM channel mix, financial controls and the runway model, and routine incident response — all owned within the org per the matrix and the CEO's decision-authority table (`docs/agents/ceo.md` — Decision Authority). The CEO casts the deciding vote on cross-functional disputes and records the rationale; it does **not** ask Bernard to break ties.

### Escalate to Bernard (the only human gate)
The CEO escalates — and does **not** act unilaterally — only when a decision is one of three classes (`docs/agents/ceo.md` — "Escalation to Bernard (the only human gate)"):
1. **Genuinely irreversible** — e.g. shutting down a module customers depend on, a one-way data deletion.
2. **Legal / regulatory** — LGPD exposure, contractual commitments, anything carrying liability.
3. **Above the spend cap** — capital commitments beyond the configured budget limit.

Everything else, the org decides and executes. Sev1 incidents and any data breach also reach Bernard as the legal escalation (`raci-matrix.md` Row 5 — "Bernard for Sev1 or any breach (the legal escalation)").

### The loop's structural safeguards (the enforced autonomy limits)
The escalation triggers above are *policy*. They are backstopped by **structural safeguards built into the loop itself** — these, and only these, are the hard limits on agent autonomy (`.loop/objective.md:14` — "the template's existing safeguards … are the only limits"):

- **`HALTED.md` kill switch.** The presence of a `HALTED.md` halt file stops the loop. This is Bernard's immediate, unconditional override of all agent activity — the master off switch that needs no agent cooperation.
- **Budget caps.** Spend is bounded by the configured limits (`.loop/config/budget.json` and `.loop/config/cron-budget.json`). An agent cannot commit capital past the cap; "above the spend cap" is precisely the third escalation class above, and the cap is what mechanically enforces it.
- **Hardened-file deny rules.** Sensitive, structural, and safety-critical files are protected by deny rules so that no agent can rewrite the safeguards, the objective's ground truth, or other hardened paths. Autonomy explicitly excludes editing the guardrails themselves.
- **`Stop.sh` whitelist.** The template-remote whitelist constrains what the loop may reach/stop, bounding side effects to the approved surface.

Together these convert "total autonomy" into *bounded* autonomy: agents are free to act inside the box, and the box is enforced in code, not by trust. This is the core safeguard story BEVOX governance rests on.

## 3. Compliance governance (LGPD, payments, data handling)

Compliance is matrix Row 6. At this stage **A = CFO**, exercised through the planned **Head of Legal** (which reports primarily to the CFO — "LGPD compliance, contracts, payment-regulation risk all sit close to finance"); the CTO is **R** for the technical controls that make compliance real, and the COO is **R** for the process/audit cadence (`raci-matrix.md` Row 6). When the Head of Legal agent is instantiated, it carries the day-to-day R and the A may move to it under CFO oversight — at which point `raci-matrix.md` is updated *first*, then this doc.

### What is in scope
- **LGPD (Lei Geral de Proteção de Dados, Brazil).** BEVOX processes personal data of Brazilian SMBs and their end-customers across WhatsApp/Instagram, calendar, and billing (`.loop/objective.md` — Brazilian B2B vertical SaaS). Governance covers lawful basis, data minimization, retention and deletion, breach response, and tenant isolation — the CTO is Responsible for these technical controls (`raci-matrix.md` Row 6 — "lawful-basis enforcement, data minimization, retention/deletion, breach response, tenant isolation").
- **Payment compliance — Stripe Connect / Pix.** Revenue flows through Stripe Connect (Pix + card, Connect Express subaccounts, automatic Bevox-fee split) (`.loop/objective.md:11` — Business model). Governance covers payment-regulation risk, fee-split correctness, Connect Express onboarding integrity, webhook signature verification, and PCI-scope minimization (`raci-matrix.md` Rows 6–7 — CTO Responsible for money-movement integrity; CFO Accountable for the economics). The detailed runbook for *incidents* on these rails lives in `processes/billing-incidents.md`; governance owns the *standing* compliance posture.
- **Data handling generally.** How customer data is stored (Postgres 16 + pgvector), processed (the AI harness, RAG/embeddings), and exposed across modules — held to LGPD's minimization and lawful-basis bar.

This is the regulatory dimension the B2B-SaaS playbook flags as a stage gate for selling into regulated buyers (`references/industry-playbooks/saas-b2b.md:31-36`): get the compliance posture written and owned before scaling the customer count, not after.

### Audit cadence and the compliance-recheck cron concept
The COO owns the **process/audit cadence** for governance — the recurring discipline of confirming the compliance posture is still real (`raci-matrix.md` Row 6; `docs/agents/cto.md` — "the governance process defines the audit cadence", which points the cadence at this doc). The intended mechanism is a **compliance-recheck cron**: a scheduled, autonomous pass that re-verifies the standing controls (lawful-basis enforcement, retention/deletion still firing, webhook signature verification intact, fee-split correctness, tenant isolation) and surfaces any drift to the CFO (A) and CTO (R), escalating to Bernard only on the legal/regulatory gate. This doc is the conceptual seed for that cron; the cron itself is a loop-internal capability (`kind: self-evolve`) authored in a later wave.

## 4. Agent-catalog hygiene

BEVOX maintains **two** agent catalogs, by design, and governance keeps them clean and non-contradictory:

- **`docs/agents/<role>.md`** — human-readable role specs (mission, responsibilities, decision authority, KPIs owned, RACI handoffs). The "what this role is" source of truth (`.loop/objective.md:23-24` — dual output per role).
- **`.claude/agents/<role>.md`** — dispatchable Claude Code subagents with valid frontmatter (`name`, `description`, `tools`, `model`) plus operating instructions. The "what Bernard invokes" runnable artifact.

Hygiene rules (CEO-accountable as part of org coherence, `docs/agents/ceo.md` — "Keep the org coherent"):

1. **One role, one pair, one name.** Every instantiated role has exactly one spec in `docs/agents/` and exactly one runnable in `.claude/agents/`, sharing the same canonical slug (`ceo`, `cto`, `cfo`, …). The two files must agree on mission and decision authority; if they diverge, the `docs/agents/` spec is the human source of truth and the `.claude/agents/` runnable is corrected to match.
2. **No duplicates, no orphans.** No two files describe the same role under different names; no runnable exists without its spec, and no spec stays unfilled once the role is instantiated. Periodic dedup is part of the WBR's org-coherence check.
3. **Clear who-owns-what.** Each role's accountability is exactly what `raci-matrix.md` says — the agent catalogs may not assign an A that the matrix does not grant. Planned-but-not-instantiated roles (Head of Legal, Head of Finance, Head of People, etc.) appear as *future delegates* in the matrix and do **not** get a live runnable in `.claude/agents/` until instantiated (`raci-matrix.md` — planned-vs-instantiated distinction).
4. **Corporate roles never live in the template.** Corporate personas are `deliverable` artifacts in the target (`docs/agents/`, `.claude/agents/`); loop-internal capabilities are `self-evolve` under the template's `.claude/`. The two must never be mixed (`.loop/objective.md:63` — "NEVER put corporate roles in the template's `.claude/agents/`").

## RACI summary for this process

| Activity | A | R | C | I |
|---|---|---|---|---|
| This governance doc + operating rhythm (WBR, OKR check-in, monthly report) | **CEO** | CEO | all C-suite | Bernard |
| Strategy / OKRs / org coherence / catalog hygiene | **CEO** | CEO | all C-suite | Bernard |
| Decision-authority policy & deciding-vote log | **CEO** | CEO | parties to the dispute | Bernard (3 gated classes) |
| Compliance & governance (LGPD, payments, data handling) | **CFO** (via Head of Legal, planned) | CTO (technical controls); COO (audit cadence) | CHRO (agent-org gov); Bernard (legal escalation) | CEO |

---

*Grounding:* the operating rhythm, decision-authority split, the single-human gate, and org-coherence ownership from `docs/agents/ceo.md` (canonical role template cited as `references/corporate-roles/ceo.md:16-43`); the total-autonomy operating principle and the four structural safeguards (HALTED.md kill switch, budget caps, hardened-file deny rules, Stop.sh whitelist) from `.loop/objective.md:14`; the regulatory/compliance dimension and stage discipline from `references/industry-playbooks/saas-b2b.md:31-36`; RACI ownership (A = CEO for strategy/governance, A = CFO via planned Head of Legal for compliance) from `raci-matrix.md` Rows 1 and 6, which is the dependency root and wins on any conflict.
