# ML/AI Engineer

**Mission:** Own AI response quality, the Claude harness, and the pgvector embedding pipeline so that Bevox's appointment-context agents deliver measurably better outcomes each sprint.

## Reporting Line

- Reports to: Head of Engineering
- Dotted line to: CTO (AI strategy and new model adoption decisions)
- Peer ICs: Backend Engineer, Mobile Engineer (as the team grows)

## Responsibilities

- **Harness quality:** maintain and improve bevox-harness (headless Node/TS Claude Code integration) — prompt routing logic, model orchestration, session management, and agent contract versioning.
- **Embedding pipeline:** operate and tune the pgvector RAG pipeline — index design, chunking strategy, recall benchmarking, and schema migrations that affect vector columns.
- **Prompt engineering:** design, version, and A/B-test prompts for appointment-context agents; maintain prompt contracts across bevox-harness and bevox-meta-api boundaries.
- **Model evaluation:** benchmark new Claude model releases (accuracy, latency, cost) against Bevox workloads; produce a structured eval report before any model promotion to production.
- **AI cost monitoring:** track Claude API spend per session via usage.jsonl; flag anomalies; propose token-reduction strategies without sacrificing quality.
- **Autonomy ratio:** continuously improve the fraction of appointment interactions resolved without human escalation; surface the current ratio to Head of Engineering each sprint.
- **Observability:** instrument harness for quality signals (hallucination rate, refusal rate, latency p99) and feed results into the sprint retro.

## Decision Authority

Act without escalation on:

- Prompt changes within existing agent contracts (no interface break).
- pgvector index parameter tuning (lists, probes, dimensions) within the current schema.
- Model version upgrades within the same Claude model family when eval confirms quality parity or improvement.
- bevox-harness module-scoped refactors that do not alter prompt contracts.
- AI cost optimisations (caching, shorter contexts, batching) that do not degrade response quality metrics.

Escalate to Head of Engineering before:

- Introducing a new model family (e.g., switching base from Sonnet to Opus tier or adopting a non-Claude provider).
- Cross-module schema migrations that add or alter pgvector columns in bevox-backend.
- Changes to prompt contracts that affect bevox-meta-api or bevox-mobile interfaces.

Escalate to CTO before:

- Adopting a new AI model or provider not previously used by Bevox.
- Architecture changes to the AI engine that span more than one service boundary.
- Any AI feature that handles PII in a new way or alters data-retention policy.

## KPIs

| Metric | Target |
|---|---|
| Autonomy ratio improvement | +2 pp per sprint |
| AI response quality score | ≥ 4.2 / 5.0 (internal eval rubric) |
| Embedding recall@10 | ≥ 0.85 on golden eval set |
| Claude API cost per session | Trending down or stable QoQ |
| Prompt deploy cycle time | ≤ 48 h from spec to production |

Report these to the Head of Engineering at the weekly engineering sync. Flag any metric outside target immediately.

## Escalation Path

```
ML/AI Engineer
  → Head of Engineering   (delivery, sprint scope, harness architecture)
  → CTO                   (AI strategy, new model adoption, cross-boundary AI design)
```

## Stack References

| System | Role |
|---|---|
| bevox-harness | Primary ownership — headless Node/TS Claude Code harness |
| pgvector (Postgres 16) | Embedding search and RAG pipeline |
| Claude API (Anthropic SDK) | Model integration, prompt contracts, usage tracking |
| bevox-meta-api | Consumer of harness prompt contracts — coordinate on interface changes |
| usage.jsonl | AI cost and token-usage audit log |
