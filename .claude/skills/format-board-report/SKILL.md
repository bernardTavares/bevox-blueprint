---
name: format-board-report
description: Format structured OKR and loop data into a polished, board-ready markdown report for async leadership review or export.
---

# Skill: format-board-report

## Purpose

Transform structured loop data (OKR roll-up JSON, recent decisions, active missions summary) into a concise, board-ready markdown report (<=800 words). Suitable for async leadership review or PDF export. Pure-transform — no writes to the target repo.

## Inputs

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `okr_json` | JSON object | No | `null` | Output from the `okr-rollup` skill. If absent, report is generated with an "OKR data unavailable" placeholder. |
| `period` | string | Yes | — | Human-readable period label, e.g. `"Q4 2026 Week 3"` or `"May 2026"`. |
| `include_decisions` | boolean | No | `true` | When true, renders the last 5 key decisions from `decisions.md`. |
| `include_missions` | boolean | No | `true` | When true, renders active mission count and done-this-week count. |

## Process

1. **Header** — Render company name (Bevox), period, today's date (UTC), and "Prepared by: CEO Agent (automated)".
2. **OKR summary table** — Columns: Objective | Key Result | Progress | Status. Status uses traffic-light indicators: `GREEN` (>=70%), `YELLOW` (40–69%), `RED` (<40%). If `okr_json` is null or malformed, render a single placeholder row: `| OKR data unavailable | — | — | — |`.
3. **Key decisions** (if `include_decisions: true`) — Read `$LOOP_DIR/decisions.md`, extract the last 5 non-empty lines that start with a bullet or date prefix. Present as a numbered list. If file is absent or empty, omit the section silently.
4. **Missions summary** (if `include_missions: true`) — Count files in `$LOOP_DIR/missions/active/` (active) and files in `$LOOP_DIR/missions/done/` modified in the last 7 calendar days (done-this-week). Render as two inline figures: `Active: N | Shipped this week: M`.
5. **Key risks & actions** — Extract OKRs whose Status is RED or YELLOW. For each, render a one-line risk statement and a suggested next action (derived from the KR description if present, otherwise "Review with responsible owner").
6. **Next steps** — Render a 3–5 item bullet list synthesising top priorities from red/yellow KRs and pending active missions.

## Output

A single markdown string with the following section order:

```
# Board Report — Bevox | <period>
_<date UTC> | Prepared by: CEO Agent (automated)_

## OKR Summary
<table>

## Key Decisions (Last 5)
<numbered list>  ← omitted if include_decisions: false

## Missions
Active: N | Shipped this week: M  ← omitted if include_missions: false

## Key Risks & Actions
<bullet list>

## Next Steps
<bullet list>
```

The skill returns (or prints) the formatted markdown string. It does not write any file.

## Failure modes

| Condition | Behaviour |
|---|---|
| `okr_json` missing or null | Render report with "OKR data unavailable" placeholder in OKR section; all other sections proceed normally. |
| `decisions.md` absent | Silently omit the Key Decisions section (do not error). |
| `missions/active/` or `missions/done/` absent | Render missions line as `Active: 0 | Shipped this week: 0`. |
| `period` missing | Abort with error: `"period is required"`. |
| Report exceeds 800 words | Truncate Next Steps to 3 items, then Key Decisions to 3 items. If still over, truncate OKR table to top 5 rows. |

## Invocation

This skill is invoked by:
- `/okr-review` command (passes `okr_json` from prior `okr-rollup` run, `period` from command argument).
- CEO agent when generating board updates or async leadership summaries.

Example call inside a Claude Code session:

```
/format-board-report period="Q4 2026 Week 3" include_decisions=true include_missions=true
```

Or via Task dispatch from CEO agent:

```
Task("format-board-report", "period=Q4 2026 Week 3, okr_json=<okr_rollup_output>")
```

## Notes

- Report may be bilingual (PT/EN). If `okr_json` contains a `language` field set to `"pt"`, render section headings in Portuguese (e.g. "Resumo de OKRs", "Decisoes Recentes", "Missoes", "Riscos e Acoes", "Proximos Passos") while keeping data values in the original language.
- The 800-word cap is intentional: board reports must be scannable in under 3 minutes.
- This skill complements `okr-rollup` (M-2304), which produces the `okr_json` input.
