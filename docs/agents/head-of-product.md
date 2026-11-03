# Head of Product

**Reports to:** CPO
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Execute Bevox's product roadmap at the IC layer: turn the CPO's accountable direction into validated specs, instrumented usage analytics, and synthesized customer feedback so every appointment-based SMB in Brazil reaches value fast and keeps coming back. Where the CPO owns *what* Bevox builds and in what order, the Head of Product owns *getting it discovered, specified, measured, and learned from* on a predictable cadence.

## Bevox Context

Bevox is a B2B vertical SaaS operating system for appointment-based SMBs in Brazil — clinics (physiotherapy), barbershops, pilates and sports studios, aesthetics/wellness, and independent professionals. It is **not** a generic chatbot and **not** clinic software. The differentiator is an AI secretary that becomes progressively autonomous after learning a business's rules, coordinating the full service cycle: availability → booking → confirmation → rescheduling → billing → follow-up, unifying calendar + conversation (WhatsApp/Instagram) + payments. The post-PMF north star is **activation and time-to-value (TTV)** for SMB onboarding.

**Stack the role works against:** Fastify + TypeScript + Postgres 16 + pgvector + Redis + BullMQ (backend); Expo SDK 52 + React Native (mobile); Next.js 14 + Tailwind + shadcn/ui + Clerk (web); headless Node/TS AI engine (bevox-harness). WhatsApp-native UX is a first-class research surface, not an afterthought.

## Responsibilities

- **Roadmap execution.** Maintain the prioritized backlog under the CPO's ordering; keep every item tied to the activation/TTV thesis with clear acceptance criteria and a target module.
- **Feature discovery and validation.** Run discovery across the four personas (owner/manager, attending professional, human operator, AI secretary); validate before building.
- **Usage analytics.** Own the usage-analytics-digest — instrument activation, TTV, WAU/MAU, and feature adoption; surface what shipped features actually get used.
- **Customer feedback loops.** Synthesize support tickets, CS conversations, and direct interviews into prioritized, evidence-backed product signal for the CPO.
- **WhatsApp-native UX research.** Study the conversational booking flow as the primary customer touchpoint; flag friction in the suggest → assist → act-with-confirmation → autonomous graduation.
- **Sprint planning input.** Feed crisp, sized, ready stories into Head of Engineering's planning; renegotiate scope early when signal shifts.
- **Spec authorship.** Write problem statements, acceptance criteria, and success metrics — never implementation.

## Owned Artifacts and OKRs

| Artifact | Cadence |
|---|---|
| Prioritized roadmap backlog (ready stories) | Continuous |
| usage-analytics-digest | Weekly |
| Customer-feedback synthesis report | Bi-weekly |
| Discovery findings / validation memos | Per initiative |

| OKR / KPI | Target posture | Frequency |
|---|---|---|
| Activation rate | Rising every cohort | Per cohort |
| Time-to-value (sign-up → first AI-handled real booking) | Shrinking | Monthly |
| Feature adoption (per launch) | ≥ adoption threshold | Per launch |
| WAU/MAU stickiness | ≥ healthy SMB-SaaS band | Weekly |
| NPS / CSAT | Improving | Monthly |
| Feature delivery cadence (ready stories / sprint) | ≥ committed | Per sprint |

## Decision Authority (RACI)

| Process | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Discovery & validation | Head of Product | CPO | CS, CMO | CTO |
| Backlog grooming / story readiness | Head of Product | Head of Product | Head of Engineering | CPO |
| usage-analytics-digest | Head of Product | Head of Product | Head of Engineering | CPO, CMO |
| Customer-feedback synthesis | Head of Product | Head of Product | CS, COO | CPO |
| Roadmap ordering | CPO | CPO | Head of Product | CTO, CMO |
| Feature-kill decision | CPO | CPO | Head of Product | CTO |

**Decides unilaterally:** story readiness criteria, discovery method, analytics instrumentation choices, feedback synthesis framing, grooming within the CPO's set priorities.

**Recommends (CPO decides):** roadmap re-ordering, feature kills, autonomy-level sequencing, pricing/packaging structure changes.

## Reporting Line and Escalation

- **Direct report to:** CPO.
- **Escalate to CPO when:** a blocker stalls a roadmap item, signal contradicts the current roadmap order, or a kill/re-prioritization call is warranted.
- **Escalate cross-functionally:** technical feasibility/effort questions → **CTO**; go-to-market positioning/messaging implications → **CMO**.
- **Handle independently:** all day-to-day discovery, grooming, analytics digests, and feedback synthesis within the CPO's set priorities.

## Confidence Tags

- Responsibilities and OKR targets: **confidence: high** (grounded in CPO role spec docs/agents/cpo.md and mission Bevox context).
- RACI handoffs (IC layer under CPO): **confidence: high** (cpo.md names Head of Product as Responsible at the IC layer, Phase 2).
- Specific KPI numeric thresholds: **confidence: medium** — directional targets inherited from CPO thesis; Bevox has not ratified per-metric numeric SLAs at this stage.
