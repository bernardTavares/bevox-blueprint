# Bevox modules — canonical reference

This is the blueprint's **single canonical reference** for what the Bevox modules are. It mirrors the
source of truth (`bevox-knowledge`, ADR-002/008/011). **On conflict, the SoT wins** — read the live
truth with the `bevox-knowledge-read` skill. Agents and docs that need to name a module should
**cite this file** (or the SoT) instead of re-listing modules in their own words, so descriptions do
not drift.

## Product Bevox — 8 canonical modules (ADR-011)

| Module | What it is | Primary stack |
|---|---|---|
| `bevox-backend` | Shared application backend; **source of truth for domain data** (auth, tenants, agenda, services, payments, notifications, audit). HTTP APIs consumed by console/web/mobile + harness. | Fastify + TypeScript + Postgres 16 + pgvector + Redis + BullMQ |
| `bevox-harness` | Runtime **engine of the AI secretary** — orchestrates conversations over connected channels; memory, skills, policies. Consumes `bevox-backend` for domain data. | Headless Node/TS |
| `bevox-web` | Web app for the **Bevox customer** (professional/clinic): setup, policies, agenda, configuration. Authenticated. | Next.js 14 + Tailwind + shadcn/ui + Clerk |
| `bevox-mobile` | Mobile **operator** app for the customer's day-to-day: inbox, human handoff, daily agenda, alerts. | Expo SDK 52 + React Native |
| `bevox-console` | **Internal super-admin backoffice** for the Bevox team (tenant management, platform config, ops). Not customer-facing. | Next.js |
| `bevox-meta-api` | The **single gateway** for all Meta traffic (WhatsApp Business Cloud + Instagram Graph). No module may call Graph directly (ADR-012). Stores only Meta tokens/bindings/audit. | Internal gateway API |
| `bevox-direct` | A **separate, autonomous** B2B SaaS for bulk-WhatsApp dispatch + AI prospecting. Own frontend/backend/DB/multi-tenancy; embeddable in Chatwoot via iframe. **NOT "legacy Chatwoot"**; does not extend `bevox-web`. | Own stack |
| `bevox-site` | Public/institutional **marketing site**. Anonymous traffic. | — |

## Common pitfalls (drift to avoid)

- `bevox-web` is for the **professional/customer**, not the end-client; `bevox-mobile` is the
  **operator** app — avoid the ambiguous "client app / client panel" wording.
- `bevox-meta-api` is the **Meta gateway** (ADR-012), not a generic "cross-module API layer".
- `bevox-direct` is a **bulk-WhatsApp ERP**, not "legacy Chatwoot" (the immutable
  `.loop/objective.md` still has the wrong label — ignore it).

## Delivery-tracking scope (note)

The SoT delivery-tracker (`40_roadmap/_shared/delivery-tracker.yml`, ADR-023 `product_modules`)
tracks delivery for **6 modules**: `bevox-backend`, `bevox-harness`, `bevox-meta-api`, `bevox-web`,
`bevox-mobile`, `bevox-console`. `bevox-direct` and `bevox-site` exist as projects (and in
`20_architecture/`) but are **outside** the `product_modules` delivery-tracking scope. For live
status, ask the `company-os-liaison` agent.

## Company OS modules

The operating layer (`openclaw`, `vox`, `mission-control`, `agent-registry`, `approval-center`,
`bevox-knowledge`) is documented in `docs/operating-layer.md`.

---

*Canonical sources (SoT `main`): `30_adr/_shared/ADR-002-system-topology.md`,
`ADR-011-add-bevox-direct-site-meta-api.md`, `ADR-012-meta-services-consumption-boundary.md`,
`40_roadmap/_shared/delivery-tracker.yml` (ADR-023 `product_modules`),
`10_prd/_shared/2026-05-15-bevox-prd-mestre-produto-v1.md`. Read live with `bevox-knowledge-read`.*
