# okr-rollup skill

## What it does

The `okr-rollup` skill reads the corporate OKR file (`docs/okrs/q4-corporate.md` by default), parses every Objective and Key Result, computes roll-up progress percentages, and returns a single structured JSON object. It is the canonical data source for any agent or command that needs to display or reason about OKR health — including the `/okr-review` command and the `weekly-okr-review` cron agent.

The skill is read-only. It never writes to the repo.

## Why it exists

Bevox runs on a small number of quarterly OKRs that cascade from the corporate level down to each C-suite role. As the loop evolves, multiple agents (the CEO agent's weekly review, the COO's operating cadence, ad-hoc `/okr-review` calls) all need to answer the same question: where do we stand? Without a shared rollup skill, each agent would re-parse the OKR file independently and produce subtly inconsistent progress numbers. `okr-rollup` is the single source of truth for that computation.

## Inputs

| Parameter | Default | Description |
|-----------|---------|-------------|
| `okr_file` | `docs/okrs/q4-corporate.md` | Path to the OKR file, relative to repo root |
| `team_filter` | *(none)* | Restrict output to KRs owned by a specific role (e.g. `"CPO"`) |
| `current_values` | *(none)* | Map of `KR-id → current numeric value` for injecting live metric data |

When `current_values` is omitted, the skill uses the KR's **Baseline** as the starting current value (i.e. 0% progress). Callers that have access to live metrics should pass `current_values` to get meaningful percentages.

## Output

The skill returns a JSON object with three top-level keys:

- **`objectives`** — array of Objective records, each containing its rolled-up `progress_pct`, RAG `status`, and a `key_results` array with per-KR detail.
- **`summary`** — aggregate counts (total green/yellow/red KRs, overall percentage across all KRs).
- **`warnings`** — list of KRs that were skipped due to malformed lines, with the reason.

RAG thresholds: green ≥ 80%, yellow 50–79%, red < 50%. A KR whose numeric values cannot be parsed is marked `status: "unknown"` and excluded from the average.

Example summary output for a mid-quarter review:

```json
{
  "summary": {
    "total_objectives": 3,
    "total_key_results": 13,
    "total_green": 2,
    "total_yellow": 4,
    "total_red": 7,
    "total_unknown": 0,
    "overall_pct": 38.2
  }
}
```

## Usage examples

### Via the `/okr-review` command (interactive)

Open the target repo in Claude Code and run:

```
/okr-review
```

The command invokes this skill and formats the result as a human-readable review table with RAG indicators.

### Via the weekly-okr-review cron agent (automated)

The `weekly-okr-review` cron (Phase 3) calls this skill each Monday, compares the result with the prior week's JSON, surfaces trending KRs (improving/declining), and appends a review entry to `okrs/weekly-review-<YYYY-WNN>.md`.

### Passing live metric data

When up-to-date numbers are available (e.g. pulled from your analytics tool), pass them as `current_values`:

```
current_values: { "KR1.1": 16, "KR1.2": 112, "KR2.3": 65 }
```

The skill will compute progress against the targets declared in the OKR file.

### Filtering by owner

To see only the CPO's KRs:

```
team_filter: "CPO"
```

## Failure handling

If `okr_file` does not exist, the skill returns `{ "error": "okr-file-not-found" }` without throwing. Malformed KR entries (missing owner or non-numeric target) are skipped with a warning rather than aborting the whole rollup — this keeps the output useful even when the OKR file is mid-edit.

## Integration map

| Consumer | When | Notes |
|----------|------|-------|
| `/okr-review` command | On demand | Formats JSON as a review table |
| `weekly-okr-review` cron | Weekly (Monday) | Compares with prior run, writes `okrs/weekly-review-<YYYY-WNN>.md` |
| CEO agent | Weekly review session | Reads output to arbitrate cross-functional tradeoffs |
| COO agent | OKR check-ins | Monitors NRR, churn, cost-to-serve KRs |

## Source

Skill definition: `.claude/skills/okr-rollup/SKILL.md`
OKR file: `docs/okrs/q4-corporate.md`
Architecture reference: `architecture-backlog.md` Phase 2 — skills section
