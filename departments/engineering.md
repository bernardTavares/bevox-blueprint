# Department: Engineering

## C-suite Owner

**CTO** — owns the codebase, platform reliability, security, and incident command.

## Lead

**[Head of Engineering](../docs/agents/head-of-engineering.md)** — operational ownership of delivery, on-call, and engineering execution under the CTO.

## IC Roles (Team)

| Role | Agent doc | Responsibility at 10–50 customers |
|---|---|---|
| Senior Backend Engineer | [docs/agents/senior-backend-engineer.md](../docs/agents/senior-backend-engineer.md) | Fastify API, BullMQ pipelines, Postgres/pgvector, integration tests |
| ML/AI Engineer | [docs/agents/ml-ai-engineer.md](../docs/agents/ml-ai-engineer.md) | AI response quality, Claude harness, pgvector embedding pipeline |
| Mobile Engineer | [docs/agents/mobile-engineer.md](../docs/agents/mobile-engineer.md) | Expo SDK 52 / React Native mobile app |

## OKRs Owned

From `okrs/q4-corporate.md`:

- **KR3.3** — Platform reliability: change failure rate < 15%, MTTR < 1h for Sev1/Sev2, zero Sev1 (Owner: CTO)
- **KR3.4** — Infrastructure efficiency: infra cost as % of revenue trending down, LLM/inference spend within CFO cap (Owner: CTO, CFO co-owns)
- **KR3.1** (contributing) — AI-secretary autonomy ≥ 75%: ML/AI Engineer delivers the inference and harness improvements that raise this number (Owner: CPO; Engineering contributes)

## Processes Owned

From `raci-matrix.md`:

- **Incident response** (`processes/billing-incidents.md`) — CTO is **A** (incident commander); Engineering agents are **R** for mitigation
- **Compliance & governance** (`processes/governance.md`) — CTO is **R** for technical controls (LGPD enforcement, data minimization, breach response, tenant isolation)
- **Billing & PSP operations** (`processes/billing-incidents.md`) — CTO is **R** for Stripe Connect technical integrity (webhook signatures, fee-split correctness)
