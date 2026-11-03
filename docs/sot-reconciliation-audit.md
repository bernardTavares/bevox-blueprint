# Blueprint ↔ SoT Reconciliation Audit

**Date:** 2026-05-29
**Scope:** Reconcile `bevox-blueprint` (this repo) against the canonical source of truth
`<org>/bevox-knowledge` (SoT). Focus: products/modules and the agent structure.
**Method:** Read the SoT on `main` (README, `20_architecture/`, ADR-001/002/003/011/012/013,
`40_roadmap/_shared/delivery-tracker.yml`, agent registry) and the blueprint's agents + strategic
docs; diff. **Rule applied:** on conflict, the SoT wins (ADR-005).

---

## 1. Canonical ground truth (from the SoT)

**Product Bevox — 8 modules** (ADR-011 amends ADR-002/008):
`bevox-backend`, `bevox-harness`, `bevox-web`, `bevox-mobile`, `bevox-console`, `bevox-meta-api`,
`bevox-direct`, `bevox-site`. See `CLAUDE.md` for the one-line description of each. Key nuances:
- `bevox-web` serves the **Bevox customer (professional/clinic)**; `bevox-mobile` is the **operator**
  app for that customer's day-to-day; `bevox-console` is the **internal** Bevox-team backoffice.
- `bevox-meta-api` is the **single Meta gateway** (ADR-012) — no module calls Graph directly.
- `bevox-direct` is a **separate autonomous** bulk-WhatsApp + AI-prospecting ERP, NOT "legacy
  Chatwoot".

**Company OS — operating layer** (ADR-001 boundary; ADR-002): `openclaw` (agent runtime), `vox`
(principal agent, L4), `bevox-knowledge` (the SoT), `mission-control` (read-only exec UI),
`agent-registry`, `approval-center`. Agent governance is L1→L4 (ADR-003). The agent registry lists
**12 active functional agents** (see `docs/operating-layer.md`).

**Project status** (`40_roadmap/_shared/delivery-tracker.yml`): Company-OS epics E0–E2 delivered,
E8/E10 delivered, E3–E12 mostly partial. Product modules: `bevox-backend` heavily delivered;
`bevox-harness`/`bevox-meta-api` partial-delivered; `bevox-web`/`bevox-mobile`/`bevox-console` have
no tracked work items yet. The delivery-tracker's `product_modules` key (ADR-023) tracks **6**
modules (backend/harness/meta-api/web/mobile/console); `bevox-direct` and `bevox-site` are
**outside** that delivery-tracking scope (surfaced by the `company-os-liaison` demo, 2026-05-30).

---

## 2. Drift findings (products/modules)

| # | Where | Blueprint says | SoT truth | Action |
|---|---|---|---|---|
| 1 | `head-of-engineering.md` (.claude + docs) | "six modules"; lists 6 | 8 product modules | Fixed → 8 |
| 2 | `head-of-engineering.md:29` | `bevox-meta-api` = "Cross-module API layer" | Single Meta gateway (ADR-012) | Fixed |
| 3 | `docs/agents/cto.md`, `README.md` | `bevox-web` "client panel", `bevox-mobile` "client app" | web = customer/professional app; mobile = operator app | Clarified |
| 4 | `.loop/objective.md:12` | `bevox-direct` = "legacy Chatwoot" | bulk-WhatsApp ERP | **Cannot fix — file is immutable.** Caveat recorded in `CLAUDE.md`. |
| 5 | various agents | vertical lists drift (e.g. "barbershops" in some, not others) | — | Noted; low priority, not corrected in this pass |

Module-count inconsistency across agents (CTO=8, HoE=6, HoP=4) is partly intentional scoping
(HoP lists the surfaces it cares about). Only clear factual errors were corrected.

---

## 3. Structural finding (the big gap)

The entire **Company OS / OpenClaw operating layer is absent** from the blueprint — zero mentions of
`openclaw`, `company-os`, `mission-control`, or `vox` across all 50 agent files. The blueprint
models a 25-role human-style corporate org (management layer) that does not exist as such in
reality; reality runs on 12 functional Company-OS agents under L1–L4 governance.

**These two are complementary, not contradictory:** the blueprint's personas are
business/management functions; the real agents are software-delivery automation. The blueprint's
`.loop/objective.md` (immutable) mandates the persona org, so the personas are kept.

**Resolution (dual-layer):** keep the management personas; add the operating layer as documentation
(`docs/operating-layer.md`) + an updated `org-chart.md` dual-layer view + a bridge agent
(`company-os-liaison`) that reads the SoT and reports real topology/status.

---

## 4. Changes made in this reconciliation

- **New:** `CLAUDE.md`, `docs/modules.md` (canonical module reference), `docs/operating-layer.md`,
  `docs/agents/company-os-liaison.md`, `.claude/agents/company-os-liaison.md`, this audit.
- **Edited:** `org-chart.md` (dual-layer view), `head-of-engineering.md` ×2 (8 modules + meta-api
  label), `cto.md` (docs) + `README.md` (web/mobile clarification).
- **Not changed:** `.loop/objective.md` (immutable); vertical-list drift (deferred).

## 5. Recommendations (future)

- **Done (2026-05-30):** `docs/modules.md` is now the single canonical module reference (mirrors the
  SoT). Remaining: migrate agent enumerations to cite it instead of re-listing modules.
- Reconcile vertical lists against the SoT's PRDs. **Finding:** the canonical ICP (SoT master PRD
  `10_prd/_shared/2026-05-15-bevox-prd-mestre-produto-v1.md:35`) = fisioterapia, pilates,
  modalidades esportivas, estética/wellness, profissionais liberais — matching `charter.md`.
  "barbershop/barbearia" appears in ~8 agents but is **not** in the SoT/charter list. Targeting it is
  a GTM decision (CMO/CEO own ICP), not a pure factual error — so it is flagged for an explicit
  decision rather than swept.
- As the operating layer matures (ADR-013 capability state machine, `project adopt`), keep
  `docs/operating-layer.md` synced via the `company-os-liaison` agent.
- Re-run this audit after any major SoT topology change (new ADR amending ADR-002/010/011).
