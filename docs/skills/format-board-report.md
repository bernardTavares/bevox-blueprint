# format-board-report

**Type:** Skill (pure-transform, read-only)
**Invoked by:** `/okr-review` command, CEO agent
**Complements:** `okr-rollup` skill

## What it does

`format-board-report` takes structured loop data and formats it into a polished, board-ready markdown report. The output is a single markdown string — clean, concise, and under 800 words — suitable for async leadership review or PDF export.

The skill is a pure transform: it reads data, renders markdown, and returns the result. It writes nothing to the repository.

## When to use it

Use this skill whenever the CEO agent or a human operator needs a snapshot of the company's OKR progress and mission status formatted for board-level consumption. Typical triggers:

- Weekly board or leadership sync preparation.
- End-of-sprint async update shared via Notion, Slack, or email.
- On-demand report requested by an investor or advisor.

## Inputs

The skill accepts four parameters:

- **`period`** (required): A human-readable label for the reporting period, e.g. `"Q4 2026 Week 3"` or `"May 2026"`. This appears in the report header.
- **`okr_json`** (optional): Structured OKR data produced by the `okr-rollup` skill. If not supplied, the OKR section renders with a placeholder noting the data is unavailable — the rest of the report still generates normally.
- **`include_decisions`** (optional, default true): When true, the report includes the last five key decisions recorded in `decisions.md`.
- **`include_missions`** (optional, default true): When true, the report includes a missions status line showing how many missions are active and how many shipped in the last seven days.

## Output format

The report follows a consistent six-section structure:

1. **Header** — Company (Bevox), period, date, and a note that the report was prepared by the CEO Agent.
2. **OKR Summary** — A table listing each Objective and Key Result with progress percentage and a traffic-light status (GREEN / YELLOW / RED).
3. **Key Decisions** — The last five decisions from `decisions.md`, numbered in recency order.
4. **Missions** — A single line: `Active: N | Shipped this week: M`.
5. **Key Risks & Actions** — Bullet list of OKRs rated RED or YELLOW, each with a suggested corrective action.
6. **Next Steps** — A 3–5 item priority list derived from the riskiest KRs and the current mission queue.

## Bilingual support

Bevox operates in the Brazilian market. If the `okr_json` input carries a `language: "pt"` field, the skill renders section headings in Portuguese while keeping data values in their original language. This makes the report ready for PT-language board packs without a separate translation step.

## Error handling

The skill is designed to degrade gracefully. If OKR data is missing, it renders a placeholder rather than failing. If `decisions.md` does not exist, the decisions section is silently omitted. Missing mission directories result in zero counts rather than errors. The only hard failure is a missing `period` parameter, which the skill rejects immediately with a clear message.

If the formatted output exceeds 800 words, the skill trims the Next Steps list first, then Key Decisions, and finally the OKR table, always preserving the most critical information.

## Integration

`format-board-report` is designed to be called after `okr-rollup`. The typical flow inside an `/okr-review` command is:

1. `okr-rollup` aggregates OKR progress from the target repo and returns structured JSON.
2. `format-board-report` receives that JSON plus a `period` label and produces the board report markdown.
3. The CEO agent presents or stores the output as needed.

The skill can also be called standalone — for example, when a human operator wants a report mid-week without triggering a full OKR roll-up.
