# Head of Engineering

**Reports to:** CTO
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Turn product requirements into shipped, reliable software on a predictable cadence across Bevox's eight product modules, while building and coaching the first 1–3 engineering hires.

## Responsibilities

- Own delivery throughput: run sprints, code review, CI/CD pipelines, and on-call rotations across bevox-backend, bevox-harness, bevox-web, bevox-mobile, bevox-console, bevox-meta-api (the single Meta gateway, ADR-012), bevox-direct (a separate autonomous product), and bevox-site.
- Maintain stack health for the Fastify + TypeScript + Postgres 16 + pgvector + Redis + BullMQ backend and the Expo SDK 52 + React Native mobile layer.
- Set and enforce quality bars: test coverage targets, definition of done, PR standards for the Next.js 14 + Tailwind + shadcn/ui + Clerk web layer.
- Drive the engineering hiring pipeline — write job specs, conduct technical interviews, onboard the first 1–3 hires.
- Translate CTO architectural vision into sprint-level priorities; renegotiate scope early when slipping.
- Perform hands-on code review and contribute to critical path modules (lean lead, not pure manager).

*Reference: references/corporate-roles/head-of-engineering.md, lines 16–22*

## Decision Authority

**Decides unilaterally (no approval gate):**
- Sprint planning, task assignment, and story prioritization within the current roadmap.
- Code-review standards, PR merge criteria, and branch protection rules.
- On-call rotation policy and incident response escalation thresholds.
- IC hiring decisions up to and including senior engineer level.
- Architectural decisions scoped to a single module (does not cross module boundaries without CTO sign-off).

**Recommends (CTO approves):**
- Cross-module architectural changes or significant schema migrations in Postgres 16.
- Staff-level or above hiring, or any hire outside the approved headcount plan.
- Major refactors to bevox-harness (AI engine) that affect model routing or prompt contracts.

**Informs:**
- Sprint velocity, escaped defect count, PR review turnaround, on-call page volume.

*Reference: references/corporate-roles/head-of-engineering.md, lines 24–27*

## KPIs Owned

| Metric | Target | Frequency |
|---|---|---|
| Delivery throughput (stories shipped / sprint) | ≥ 90 % of committed scope | Per sprint |
| Bug escape rate (post-deploy defects / total deploys) | < 5 % | Monthly |
| System uptime (bevox-backend + bevox-meta-api) | ≥ 99.5 % | Monthly |
| Time-to-merge (PR open → merged) | ≤ 48 h median | Weekly |
| On-call pages / week | < 10 actionable pages | Weekly |

*Reference: references/corporate-roles/head-of-engineering.md, lines 29–36; stage-sizing from references/industry-playbooks/saas-b2b.md (post-PMF, 10–50 customers)*

## RACI Handoffs

| Process | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Sprint planning | Head of Engineering | Head of Engineering | CPO | CTO |
| Production release | Head of Engineering | Head of Engineering | QA | CTO, COO |
| Incident postmortem | Head of Engineering | Head of Engineering | Affected module owners | CTO, CPO |
| IC hire (≤ senior) | Head of Engineering | Head of Engineering | CTO | CFO, COO |
| Cross-module refactor | CTO | CTO | Head of Engineering | CPO |
| Budget / tooling spend | Head of Engineering | CFO | CTO | COO |

*Reference: references/corporate-roles/head-of-engineering.md, lines 38–44*

## Reporting Line and Escalation

- **Direct report to:** CTO.
- **Escalate to CTO when:** an incident exceeds 30 min SLO breach; a scope cut would drop a customer-committed feature; a hire decision exceeds approved headcount.
- **Escalate to CFO/COO when:** tooling or infrastructure spend exceeds the pre-approved monthly cap.
- **Handle independently:** all day-to-day delivery, code-review disputes, sprint scope adjustments within ±20 % velocity.

## Confidence Tags

- Delivery cadence and KPI targets: **confidence: high** (grounded in reference role template + SaaS B2B post-PMF playbook).
- Stack-specific module ownership: **confidence: high** (grounded in mission Bevox context; no external citation needed).
- Hiring authority (IC ≤ senior, unilateral): **confidence: medium** — standard for this stage but Bevox has not formally ratified a headcount approval policy yet.
