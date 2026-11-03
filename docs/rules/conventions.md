# Bevox — Conventions Guide

This document codifies the naming, formatting, communication, and code conventions that all Bevox agents and operators must follow. These are structural and stylistic rules only — no hardcoded business data.

---

## 1. Document Naming

| Context | Convention | Example |
|---|---|---|
| Internal docs (agent-facing) | kebab-case, English | `decision-authority.md`, `raci-matrix.md` |
| Customer-facing docs or slugs | kebab-case, Portuguese-first | `politica-privacidade.md`, `termos-uso.md` |
| Process docs | lowercase kebab-case noun phrase | `billing-incidents.md`, `customer-success.md` |
| OKR files | `OKR-YYYY-QN-<slug>` | `OKR-2026-Q4-receita` |
| Agent prose mirrors | `docs/agents/<role>.md` (role = kebab-case) | `docs/agents/head-of-engineering.md` |
| Claude subagent files | `.claude/agents/<role>.md` | `.claude/agents/cto.md` |
| Claude commands | `.claude/commands/<name>.md` (verb-noun) | `.claude/commands/okr-review.md` |
| Claude rules | `.claude/rules/<name>.md` (noun phrase) | `.claude/rules/conventions.md` |
| Mission IDs | `M-YYYYMMDD-HHMM-<slug>` (UTC, kebab-slug ≤30 chars) | `M-20260522-1430-fix-login-redirect` |
| Git branches (worker) | `auto/mission-<mission_id>` | `auto/mission-M-20260522-1430-fix-login-redirect` |

### File extension rules

- All prose documents: `.md` (Markdown)
- All configuration: `.json` (no YAML for config; YAML only inside Markdown frontmatter)
- Shell scripts: `.sh` (POSIX) or `.ps1` (PowerShell) — never mix extensions
- Never use spaces in file or directory names

---

## 2. Agent Output Format

### Cron / headless agents (terse-log)

One line per top-level action:

```
[ts] [agent] [tick=<cron_id>] action=<verb> mission=<id|-> result=ok|noop|fail notes=<≤80 chars>
```

- `ts`: ISO-8601 UTC, compact (`2026-05-22T23:06:00Z`)
- `agent`: agent role name in brackets, e.g. `[worker-generic]`
- `tick`: cron id that triggered this run, e.g. `tick=orchestrator-tick`
- `action`: present-tense verb matching what was attempted (`create`, `commit`, `verify`, `stamp`, `refuse`)
- `result`: exactly one of `ok`, `noop`, `fail`
- `notes`: ≤80 characters, ASCII, no emoji

Long reasoning goes to `$LOOP_DIR/decisions.md`, not chat output.

### Human-facing reports (prose)

- Language: Portuguese (você register — see §5)
- Structure: heading → short paragraph → bullet list if >3 items
- Length: ≤400 words for operational updates; ≤800 for strategic reports
- Tone: direct, data-grounded, no filler phrases ("com certeza", "obviamente")

### Decision log entries

Every row appended to `decisions.md` must use this table row format:

```
| <ISO-ts> | <agent> | <decision> | <rationale> |
```

Header (written once by architect or first agent): `| ts | agent | decision | rationale |`

---

## 3. OKR Naming

```
OKR-YYYY-QN-<slug>
```

- `YYYY`: four-digit year
- `QN`: quarter (`Q1`–`Q4`)
- `<slug>`: ≤20 char kebab-case noun phrase describing the objective in Portuguese or English
- Examples: `OKR-2026-Q4-receita`, `OKR-2026-Q4-activation-rate`, `OKR-2026-Q4-churn`

KR identifiers within an OKR file: `KR-<N>` (sequential integers, no zero-padding).

---

## 4. Code Conventions (Fastify + Postgres + BullMQ)

### Fastify routes

- HTTP method + path: lowercase, kebab-case path segments
- Route file naming: `<resource>.<method>.ts` (e.g. `appointment.post.ts`, `business.get.ts`)
- Plugin naming: camelCase export, kebab-case file (`whatsapp-webhook.plugin.ts`)
- Handler functions: camelCase verbs (`createAppointment`, `cancelBooking`)

### Postgres tables and columns

| Object | Convention | Example |
|---|---|---|
| Tables | plural snake_case | `appointments`, `business_profiles` |
| Columns | snake_case | `created_at`, `customer_phone` |
| FK columns | `<referenced_table_singular>_id` | `appointment_id`, `business_id` |
| Boolean columns | `is_<state>` or `has_<attribute>` | `is_confirmed`, `has_paid` |
| Timestamps | always UTC, column suffix `_at` | `cancelled_at`, `confirmed_at` |
| Indexes | `idx_<table>_<column(s)>` | `idx_appointments_business_id` |
| Enum types | singular snake_case | `appointment_status`, `payment_method` |

### BullMQ jobs

- Queue names: kebab-case noun (what the queue processes) — `appointment-reminder`, `payment-webhook`, `whatsapp-outbound`
- Job names: `<queue>:<verb>` — `appointment-reminder:send`, `payment-webhook:process`
- Job data keys: camelCase
- Bull board: mounted at `/internal/bull-board` (never exposed publicly)

### TypeScript / general

- Interfaces: PascalCase prefixed with `I` only when disambiguation is needed; prefer plain PascalCase types
- Enums: PascalCase; values SCREAMING_SNAKE_CASE
- Constants: SCREAMING_SNAKE_CASE at module top
- Avoid `any`; use `unknown` and narrow

---

## 5. Communication Conventions (WhatsApp + Português)

### Pronoun register

- **Customer-facing (WhatsApp, app UI):** `você` always. Never `tu`. Matches Brazilian nationwide standard for business software.
- **Internal docs and agent outputs:** English or formal Portuguese — `você` if Portuguese is used.
- Never use `senhor/senhora` in automated messages (too formal, unnatural in WhatsApp context).

### WhatsApp message constraints

| Type | Hard limit | Recommended |
|---|---|---|
| Text message body | 4096 chars | ≤160 chars for first message |
| Template (HSM) approved name | 512 chars | ≤60 chars |
| Button text | 20 chars | ≤15 chars |
| Quick-reply button count | 3 | 2–3 |

- Split long messages into multiple sequential sends (max 2 consecutive without user reply before waiting)
- First message to a new contact must use an approved HSM template (Meta policy)
- Never include competitor names in WhatsApp messages

### Emoji policy

- **Business documents, specs, OKR files, decisions.md, process docs:** no emoji
- **WhatsApp messages to customers:** up to 2 relevant emoji allowed (e.g. calendar, check) — approved by CMO
- **Agent log output / terse-log:** no emoji
- **Claude subagent / rule files:** no emoji

### Language mixing

- Portuguese is the primary language for any customer-visible text
- English is the primary language for code, configs, and internal agent files
- Do not mix languages within a single paragraph in prose documents
- Glossary exceptions (Pix, WhatsApp, BullMQ, Fastify) may appear verbatim in Portuguese text

---

## 6. File Structure Conventions

```
<target>/
  charter.md              # company charter
  strategy.md             # 3-horizon strategy
  org-chart.md            # reporting lines (mermaid)
  raci-matrix.md          # RACI across 7 processes
  docs/
    agents/               # prose mirrors of .claude/agents/
    commands/             # prose docs for slash-commands
    rules/                # this file and siblings — human-readable rule guides
    skills/               # prose docs for .claude/skills/
  okrs/                   # OKR-YYYY-QN-<slug>.md files
  processes/              # standing operating processes
  .claude/
    agents/               # Claude Code subagent frontmatter + body
    commands/             # slash-command prompt files
    rules/                # machine-readable rule injections (this file's sibling)
    hooks/                # lifecycle hooks (SessionStart, PreToolUse, etc.)
    skills/               # reusable skill SKILL.md files
    settings.json         # permissions + hook registration
```

---

## 7. Commit and Branch Conventions

Commit format: `auto(<kind>): <mission_id> — <verb> <object>`

- `<kind>` in `{mission, evolve, halt, resume, purge, health, gc}`
- `<verb> <object>`: imperative, ≤60 chars, English
- Example: `auto(mission): M-20260522-2306-rule-conventions — add conventions rule`

Branch naming:
- Worker missions: `auto/mission-<mission_id>`
- Self-evolve missions: `auto/evolve-<mission_id>`
- Human feature branches: `feat/<slug>` or `fix/<slug>` (standard Git Flow)
