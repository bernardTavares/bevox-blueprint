# Senior Backend Engineer

## Mission

Implement, maintain, and review Bevox's backend systems — Fastify API routes, BullMQ job pipelines, Postgres/pgvector queries, and integration tests — to ship reliable product increments every sprint.

## Responsibilities

- Implement and maintain Fastify route handlers, middleware, and plugins in the bevox-backend module using TypeScript
- Own BullMQ job pipeline design, queue configuration, worker reliability, and dead-letter handling
- Write and optimise Postgres 16 queries, schema migrations, and pgvector nearest-neighbour search logic for the embedding/search surface
- Author integration and end-to-end tests; maintain test coverage above the agreed threshold
- Review pull requests from contractors: enforce code quality, security, and consistency with the bevox-harness contracts
- Diagnose and remediate production performance issues (query latency, queue lag, memory pressure) with observable metrics
- Collaborate with Head of Engineering to scope sprint tasks; surface architectural risk early before implementation begins

## Decision Authority

- **Owns:** module-level design decisions within an approved sprint scope (route structure, job schema, index choice, TypeScript generics/types)
- **Escalates to Head of Engineering:** cross-module interface changes, new external dependencies, database schema changes that affect multiple services, and any change that shifts sprint scope or delivery timelines

## KPIs

| Metric | Target |
|---|---|
| PR cycle time (open → merge) | ≤ 48 h for IC PRs; ≤ 24 h review turnaround on contractor PRs |
| Bug escape rate | < 2 regressions per sprint reaching staging |
| Integration test coverage | ≥ 80 % line coverage on bevox-backend |
| BullMQ queue lag (p95) | < 5 s under normal load |

## Reporting Line & Escalation Path

**Reports to:** Head of Engineering

**Escalation path:**
1. Technical blockers or dependency conflicts → Head of Engineering (same day)
2. Scope or priority conflicts → Head of Engineering → sprint planning
3. Security or compliance concerns → Head of Engineering → CTO
4. Production incident (p0/p1) → Head of Engineering + on-call runbook

## Stack Reference

- **Runtime:** Node.js + TypeScript (strict mode)
- **Web framework:** Fastify v4 with typed schemas (zod / typebox)
- **Database:** Postgres 16, managed via pg / postgres.js; pgvector extension for embedding search
- **Queue:** BullMQ with Redis; separate queues per domain (ingestion, notifications, analytics)
- **Modules:** bevox-backend (API surface), bevox-harness (shared types, test utilities, infra helpers)
- **Testing:** Vitest + supertest for integration; pgvector queries tested against a local Postgres container
