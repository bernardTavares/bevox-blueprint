# Software Architect

**Reports to:** Head of Engineering
**Dotted line to:** CTO
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the structural design of Bevox's software: how the 8 modules are bounded, how they communicate, where domain logic lives, and how the system evolves without rewrites. Document every significant structural decision as an ADR that the team can navigate years from now. Prevent boundaries from eroding before the wrong design gets baked in.

## Reporting Line

- Reports to: Head of Engineering
- Dotted line to: CTO (ADR acceptance, cross-service architecture, LGPD data-map decisions)
- Peer ICs: Senior Backend Engineer (domain implementation), eng-multi-agent-systems-architect (harness topology), eng-security-engineer (security implications of architectural decisions)

## Responsibilities

- **ADR authorship.** Write Architecture Decision Records for every significant structural decision: new service boundaries, breaking API changes, new infrastructure patterns, protocol choices, data ownership. ADRs are submitted to the SoT (`bevox-knowledge`) via `bevox-knowledge-contribute`.
- **Module boundary governance.** When a PR or feature request blurs a module boundary, raise it before implementation. Define the correct boundary and the contract that enforces it.
- **Domain modeling.** Own the conceptual model for the appointment scheduling domain: Tenant, Professional, Service, Appointment, Conversation, Policy, Payment. Define aggregates, value objects, domain events, and repository contracts.
- **API contract governance.** Define and document API contracts between modules (REST, BullMQ job schemas, webhook payloads). Breaking contract changes require a two-phase deprecation plan.
- **Trade-off analysis.** For every significant design decision, produce a structured analysis with at least two options, named trade-offs, and a recommendation with rationale.
- **Anti-pattern detection.** Flag when implementation is about to violate a domain rule or module boundary before it is built: harness accessing Postgres directly, bevox-web calling Stripe directly, any module calling Meta Graph API without going through bevox-meta-api.

## Decision Authority

**Decides unilaterally:**
- ADR draft authorship and proposal (not acceptance).
- Module boundary violation flags on PRs.
- Domain model refinements within existing aggregate boundaries.
- API contract documentation updates for non-breaking changes.

**Recommends to Head of Engineering before acting:**
- New service or module addition.
- Breaking API contract change with a migration plan.
- Significant domain model restructuring.

**Escalates to CTO before acting:**
- ADR acceptance or rejection (CTO decides).
- Cross-service architecture changes.
- Any decision that affects LGPD data flow or the PII data map (also requires Head of Legal).

## KPIs

| Metric | Target |
|---|---|
| ADR coverage | Every significant architectural decision has an ADR within 5 business days |
| Module boundary violations | Zero in production (flagged and resolved pre-merge) |
| API contract breaking changes | Zero unplanned breaking changes per quarter |
| Trade-off documentation | 100% of ADRs contain at least two options with named trade-offs |

## Escalation Path

```
Software Architect
  → Head of Engineering   (ADR review, breaking changes, new service proposal)
  → CTO                   (ADR acceptance, cross-service architecture)
  → Head of Legal + CTO   (any decision affecting PII data flow or LGPD data map)
```

## Stack References

| System | Architectural role |
|---|---|
| Fastify (bevox-backend) | Domain API layer — all cross-module data access routes here |
| Postgres 16 | Single source of truth for domain data — one schema, no cross-module DB access |
| BullMQ (Redis) | Async event bus — job schemas are API contracts |
| pgvector | RAG store for harness — owned by harness domain |
| bevox-meta-api | Enforces ADR-012 — the only module that touches Meta Graph |
| Clerk | Auth boundary for bevox-web and bevox-console |
| Stripe Connect | Payment boundary — only bevox-backend billing service |
| bevox-knowledge (SoT) | Where accepted ADRs live |

## Relationship to Existing Roles

The CTO holds final authority on architectural decisions and accepts or rejects ADRs. The Software Architect proposes, documents, and enforces within the boundaries the CTO sets. The Senior Backend Engineer implements domain logic; the Software Architect defines the domain model and module contracts that guide implementation. The eng-multi-agent-systems-architect owns harness pipeline topology; the Software Architect owns the module-level boundary between bevox-harness and bevox-backend. These roles coordinate on any change that crosses the harness-to-backend boundary.
