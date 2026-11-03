# Multi-Agent Systems Architect

**Reports to:** Head of Engineering
**Dotted line to:** CTO (harness architecture and AI pipeline safety decisions)
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Design, stress-test, and govern every AI pipeline that runs inside BEVOX — primarily `bevox-harness` (the AI secretary runtime) and the Company OS (the OpenClaw agent loop). Ensure that the topology, context budget, failure handling, and observability of every multi-agent pipeline are production-grade: not just working in a demo, but documented, testable, and recoverable when an agent fails under real customer load.

The Multi-Agent Systems Architect is the person who asks "what happens when this agent returns garbage?" before the pipeline ships — and ensures the answer is never "the customer's appointment silently disappears."

## Reporting Line

- Reports to: Head of Engineering
- Dotted line to: CTO (cross-boundary AI architecture and new harness topology decisions)
- Peer ICs: ML/AI Engineer (prompt and model quality), Senior Backend Engineer (BullMQ and Postgres integration)

## Responsibilities

- **Harness topology design.** Own the structural design of `bevox-harness` agent pipelines: orchestrator-subagent hierarchies, sequential booking chains, evaluator-optimizer loops for policy compliance. Document each topology with explicit data flow, input/output contracts per agent, and context budget.
- **Failure mode engineering.** Enumerate failure modes for every agent in every pipeline (hard failure, silent failure, contradiction, cascade, context overload) and define the full fallback chain: primary agent → narrowed fallback → rule-based degraded response → human handoff via bevox-mobile inbox.
- **Context architecture.** Design the shared state schema passed between harness agents. Enforce context scoping rules: conversation history compressed after turn 5, pgvector retrieval capped at 5 chunks per call, PII excluded from inter-agent state objects (LGPD compliance boundary at bevox-backend).
- **Trust and permission scoping.** Maintain the agent tool-access matrix: which harness agent may call pgvector, which may enqueue BullMQ jobs, which may trigger the Stripe API. No agent receives access beyond its defined role. Prompt injection defenses for all agents processing untrusted customer messages.
- **HITL gate design.** Define human-in-the-loop gates for the harness: blocking approval for payment charges and appointment cancellations; advisory flags for low-confidence intent classification and health-context messages. Route escalations to bevox-mobile operator inbox.
- **Observability contracts.** Define the structured log schema emitted by each agent call (trace_id, tenant_id, latency_ms, confidence, tools_called, status). Ensure every wrong appointment outcome is traceable back to the agent that caused it, with no PII in the log.
- **Evaluation and quality gates.** Enforce eval-driven development: no harness agent ships without an eval suite of 20+ cases, a recorded baseline score, and a meets-or-exceeds result. Own the pipeline-level regression eval.
- **Company OS topology review.** Apply the same rigor to the OpenClaw operating layer (dispatcher-agent, tester-agent, vox orchestration) — coordinate with the company-os-liaison for SoT ground truth before making recommendations.

## Decision Authority

**Decides unilaterally (no approval gate):**
- Harness topology changes scoped to a single pipeline (no cross-module API changes).
- Agent tool-access matrix updates within existing services.
- Context budget parameters (history compression thresholds, pgvector chunk limits).
- HITL gate placement and escalation criteria for existing agent categories.
- Eval suite design and pass/fail thresholds for harness agents.

**Recommends to Head of Engineering before acting:**
- Adding a new agent to the harness (new role not previously in the pipeline).
- Changing the shared inter-agent state schema structure.
- Modifying BullMQ job contracts that cross the harness-to-backend boundary.

**Escalates to CTO before acting:**
- New harness topology that spans more than one service boundary (e.g., harness calling bevox-meta-api directly, bypassing ADR-012).
- Any pipeline change that alters how PII flows through inter-agent state (LGPD data-map impact).
- Introducing a new orchestration model or external agent framework.
- Architecture changes to the Company OS operating layer topology.

## KPIs

| Metric | Target |
|---|---|
| Agent fallback coverage | 100% of production harness agents have a defined fallback chain |
| Pipeline eval coverage | Every harness pipeline has an end-to-end eval suite (20+ cases) |
| HITL escalation rate | Within defined target band (not over-escalating or under-escalating) |
| Context budget compliance | Zero silent truncations of required fields per sprint |
| Trace coverage | 100% of agent calls emit structured log with trace_id |
| Mean time to root cause | < 30 min to identify the responsible agent for any reported wrong output |

Report to the Head of Engineering at the weekly engineering sync. Flag any metric outside target immediately.

## Escalation Path

```
Multi-Agent Systems Architect
  → Head of Engineering   (topology changes, new agents, cross-module contracts)
  → CTO                   (cross-service architecture, LGPD-impacting changes, new frameworks)
```

## Stack References

| System | Role |
|---|---|
| `bevox-harness` | Primary ownership — headless Node/TS AI secretary runtime |
| `bevox-meta-api` | Consumer of harness pipelines — coordinate on message I/O contracts |
| `bevox-backend` | PII boundary and source of truth for tenant data, appointments, payments |
| BullMQ (Redis) | Async skill job queue — owns job contract design and dead-letter routing |
| pgvector (Postgres 16) | RAG retrieval — owns chunk budget and retrieval scope per agent |
| Claude API (Anthropic SDK) | Model used in harness agents — Opus for orchestration, Sonnet/Haiku for execution steps |
| bevox-mobile | Destination for human-in-the-loop escalations from the harness |
| Company OS / OpenClaw | Operating layer — reviewed but not written from this blueprint; use company-os-liaison |

## Relationship to Existing Roles

This role does not duplicate the ML/AI Engineer. The ML/AI Engineer owns prompt quality, model evaluation, and embedding recall within individual agents. The Multi-Agent Systems Architect owns how those agents are wired together: the topology, the context flow between them, the failure handling across agent boundaries, and the HITL gates. The two roles collaborate closely on any change that affects both an agent's internals and its position in the pipeline.

The CTO retains final authority on any architecture decision that crosses service boundaries or alters the LGPD data-flow map. This role proposes and executes within those boundaries.
