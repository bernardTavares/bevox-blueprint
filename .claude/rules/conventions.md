# Conventions rule — Bevox Blueprint

Injected into every agent session. Follow these rules exactly. When in doubt, apply the most restrictive interpretation.

---

## Document naming

- Internal docs: kebab-case English (`decision-authority.md`, `raci-matrix.md`)
- Customer-facing slugs: kebab-case Portuguese-first (`politica-privacidade.md`)
- OKR files: `OKR-YYYY-QN-<slug>` — e.g. `OKR-2026-Q4-receita`
- Mission IDs: `M-YYYYMMDD-HHMM-<slug>` (UTC, slug ≤30 chars kebab-case ASCII)
- Agent prose mirrors: `docs/agents/<role>.md`
- Claude subagent files: `.claude/agents/<role>.md`
- Claude commands: `.claude/commands/<verb-noun>.md`
- Claude rules: `.claude/rules/<noun-phrase>.md`
- No spaces in file or directory names; `.md` for all prose, `.json` for config

## Agent output format

**Cron / headless agents — terse-log (one line per action):**
```
[ts] [agent] [tick=<cron_id>] action=<verb> mission=<id|-> result=ok|noop|fail notes=<≤80 chars>
```
No emoji in log output. Long reasoning → `$LOOP_DIR/decisions.md`.

**Human-facing reports:** Portuguese (`você` register), ≤400 words for operational updates, no filler phrases.

**Decision log entries:**
```
| <ISO-ts> | <agent> | <decision> | <rationale> |
```

## OKR naming

`OKR-YYYY-QN-<slug>` — slug ≤20 chars, kebab-case, Portuguese or English noun phrase.
KR identifiers within a file: `KR-<N>` (sequential, no padding).

## Code conventions

**Fastify:** route files `<resource>.<method>.ts`; plugin files `<name>.plugin.ts`; handler functions camelCase verbs.

**Postgres:**
- Tables: plural snake_case (`appointments`, `business_profiles`)
- Columns: snake_case; FK columns `<table_singular>_id`; booleans `is_<state>` / `has_<attr>`; timestamps UTC, suffix `_at`
- Indexes: `idx_<table>_<columns>`; enum types singular snake_case

**BullMQ:**
- Queue names: kebab-case noun (`appointment-reminder`, `whatsapp-outbound`)
- Job names: `<queue>:<verb>` (`appointment-reminder:send`)
- Bull board mounted at `/internal/bull-board` — never expose publicly

**TypeScript:** PascalCase types/interfaces; SCREAMING_SNAKE_CASE constants and enum values; avoid `any`, use `unknown`.

## Communication — WhatsApp and Portuguese

- Customer-facing text: `você` always (never `tu`, never `senhor/senhora` in automated messages)
- WhatsApp message body: ≤4096 chars hard limit; recommended ≤160 chars for first contact
- First message to new contacts: approved HSM template required (Meta policy)
- Split long messages — max 2 consecutive sends without user reply before waiting

## Emoji policy

- Business documents, specs, OKR files, decisions.md, process docs: **no emoji**
- Agent log output / terse-log: **no emoji**
- Claude subagent and rule files: **no emoji**
- WhatsApp customer messages: up to 2 relevant emoji, CMO-approved only

## Language mixing

- Customer-visible text: Portuguese primary
- Code, configs, agent files: English primary
- Do not mix languages within a single paragraph
- Glossary terms (Pix, WhatsApp, BullMQ, Fastify) may appear verbatim in Portuguese text

## File structure

```
<target>/
  charter.md  strategy.md  org-chart.md  raci-matrix.md
  docs/agents/  docs/commands/  docs/rules/  docs/skills/
  okrs/  processes/
  .claude/agents/  .claude/commands/  .claude/rules/  .claude/hooks/  .claude/skills/
  .claude/settings.json
```

## Commit and branch naming

Commits: `auto(<kind>): <mission_id> — <verb> <object>` (≤60 chars verb+object, English imperative)
Branches: worker → `auto/mission-<mission_id>`; self-evolve → `auto/evolve-<mission_id>`
Human branches: `feat/<slug>` or `fix/<slug>`
