# Operating Layer — Company OS / OpenClaw

This document describes the **real operating layer** of Bevox — the Company OS that actually builds
and runs the product — and how this blueprint's management personas map onto it. It is the
"operation" half of the dual-layer model (the "management" half is `org-chart.md`).

Ground truth lives in the SoT (`<org>/bevox-knowledge`); read it with the
`bevox-knowledge-read` skill. Citations below are SoT paths on `main`. This doc is a blueprint-side
mirror — **on conflict, the SoT wins.**

---

## The two layers

- **Management layer** (this blueprint): `CEO/CTO/.../Heads/ICs` — business and decision functions.
- **Operating layer** (Company OS, in the SoT): the OpenClaw runtime + functional agents that
  execute software delivery and company operations under L1–L4 governance.

They are complementary: management decides *what/why*; the operating layer executes *build/run*. The
`company-os-liaison` agent is the bridge between them.

## Company OS components (ADR-001, ADR-002)

| Component | What it is |
|---|---|
| **openclaw** | Self-hosted agent platform / runtime: gateway, sessions, hooks, agents, kanban, runners. The only place a persistent "agent" exists. |
| **vox** | The principal agent ("chief-of-staff digital"), level **L4**. Orchestrates daily ops, runs skills, does canonical commits via `knowledge-sync`, routes Telegram/CLI. |
| **bevox-knowledge** | The canonical documentary SoT (PRDs, ADRs, roadmaps, architecture). ADR-005. |
| **mission-control** | Read-only executive dashboard (Next.js, hard-fork of TenacitOS) at `mc.example.com`; approvals happen in Telegram, not here. |
| **agent-registry** | Formal registry of agents (`20_architecture/_shared/registry.md`); documental today, executable layer deferred. |
| **approval-center** | Sensitive-action approval system (partly delivered). |

**Boundary (ADR-001):** OpenClaw = company operation (agents, memory, crons, channels);
Claude Code = product coding; bevox-knowledge = shared canonical knowledge that both read and
neither writes canonically without the approval flow.

## Agent governance (ADR-003)

Levels: **L1 Observer → L2 Contributor → L3 Operator → L4 Trusted.** Every new agent starts at L1;
promotion is owner-decided (never automatic), gated on time + quality + minimum volume; risk
categories (financial / publish / infra-critical / destructive / write-external) can cap the level.
Owner today is Bernard for all agents. Retired agents move to `_retired/`.

## The 12 active functional agents (agent-registry)

| Agent | Level | Role |
|---|---|---|
| `vox` | L4 | Chief-of-staff; orchestrates daily ops, canonical commits, Telegram/CLI routing. |
| `agent-creator-agent` | L1 | Operationalizes agent creation (`CREATING.md`). |
| `clarification-agent` | L1 | Answers the executor's operational questions strictly from canonical context; auto-resolves or escalates. |
| `delivery-agent` | L1 | Proposes backlog work derived from active specs (never alone). |
| `delivery-status-agent` | L1 | Keeps `delivery-tracker.yml` in sync; one wave status flip per invocation. |
| `dispatcher-agent` | L1 | Selects next `ready` kanban task, spawns the executor; includes reaper + cron-dispatcher. |
| `documentation-agent` | L1 | Writes/cross-references canonical docs; reduces drift. |
| `github-admin-agent` | L1 | Operates `github.com/<org>` repos. |
| `infra-agent` | L1 | Monitors/diagnoses Company-OS infra (health/cost/finance state). |
| `product-agent` | L1 | Drafts PRDs, shapes roadmap, decomposes epics→features (never accepts canon alone). |
| `scrum-master-agent` | L1 | Projects implementation plans into kanban tasks 1:1; writes no code. |
| `tester-agent` | L1 | Validates `testing` tasks; never auto-rejects (Bernard gate). |

Default model for LLM agents: `openai-codex/gpt-5.4` (fallback `openrouter/deepseek/deepseek-v3.2`).
Most run in **Hub-dispatch** mode (no own runtime session — Vox executes their playbook under its L4
policy). The autonomous loop (E10, delivered) chains: escalation → Telegram → Bernard → clarification
daemon → kanban gate → scrum-master → cron-dispatcher → executor → reaper → tester → done.

## Capabilities (ADR-013, proposed)

A per-project **capability state machine** over 8 capabilities — `code_repo`, `knowledge_slot`,
`kanban_sprints`, `workspace`, `persona`, `bot`, `telegram_topics`, `mission_control` — each
`absent | partial | provisioned | drifted`. Entry points `openclaw project create` (greenfield) /
`project adopt` (brownfield), with composable `provision-*` ops (including `provision-knowledge`,
which invokes the `bevox-knowledge-contribute` skill per ADR-014). This is the target unification —
parts are proposed/in-progress, not all delivered.

## How the management personas map to the operating layer

The personas decide; the operating agents execute. Indicative mapping (not 1:1):

| Management persona (blueprint) | Dispatches into (operating layer) |
|---|---|
| CTO / Head of Engineering | `dispatcher-agent`, `tester-agent`, `scrum-master-agent`, `github-admin-agent`, `infra-agent` |
| CPO / Head of Product | `product-agent`, `delivery-agent`, `delivery-status-agent` |
| COO | `infra-agent`, `delivery-status-agent`, mission-control reporting |
| All personas | `vox` (orchestration), `documentation-agent` (canonical docs), `clarification-agent` (executor Q&A) |

The **`company-os-liaison`** blueprint agent is the read-only bridge: it queries the SoT (via
`bevox-knowledge-read`) and reports the real registry, capabilities, and delivery status so the
management personas plan against reality, not against stale inline copies.

---

*Sources (SoT `main`): `30_adr/_shared/ADR-001-company-os-boundary.md`, `ADR-002-system-topology.md`,
`ADR-003-agent-governance.md`, `ADR-011-add-bevox-direct-site-meta-api.md`,
`ADR-012-meta-services-consumption-boundary.md`, `30_adr/openclaw/ADR-013-project-capability-state-machine.md`,
`20_architecture/_shared/registry.md`, `20_architecture/company-os/mission-control.md`,
`40_roadmap/_shared/delivery-tracker.yml`. Read live with the `bevox-knowledge-read` skill.*
