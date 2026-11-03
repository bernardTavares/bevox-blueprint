---
name: okr-rollup
description: Aggregate and roll up OKR progress from target repo OKR files, returning structured JSON with per-KR and per-Objective completion percentages and RAG status for board reports and review agents.
---

## Purpose

Parse the corporate OKR file (and optionally team-level OKR files), compute roll-up progress percentages per Key Result and per Objective, classify each item by RAG status (green/yellow/red), and return structured JSON. The output is consumed by the `/okr-review` command and the `weekly-okr-review` cron agent.

This skill is **read-only** — it never writes to the target repo.

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `okr_file` | path (string) | `okrs/q4-corporate.md` | Path to the primary OKR file, relative to the repo root |
| `team_filter` | string | *(none)* | Optional owner filter (e.g. `"CPO"`) — when set, only Objectives/KRs owned by that role are included in the output |
| `current_values` | object | *(none)* | Optional map of `KR-id → current_value` (e.g. `{ "KR1.1": 14, "KR1.2": 108 }`) for overriding parsed current values with live metric data |

## Process

1. **Read** the OKR file at `okr_file`. If the file does not exist, return `{ "error": "okr-file-not-found" }` immediately.
2. **Parse Objectives** — each H2 heading (`## Objective N — ...`) is one Objective record. Extract: id (e.g. `O1`), name, owner (from KR owner fields under the objective).
3. **Parse Key Results** — each H3 heading (`### KRN.M — ...`) under an Objective is one KR record. Extract:
   - `id` (e.g. `KR1.1`)
   - `name` (heading text after the id)
   - `owner` (from the **Owner:** bullet)
   - `baseline` (from the **Baseline:** bullet — numeric portion)
   - `target` (from the **Target:** bullet — numeric portion)
   - `current` (from `current_values[id]` if provided; otherwise attempt to parse from the **Baseline:** line as a starting point)
   - If a KR line is malformed (missing Owner/Target), skip it and emit a `warnings[]` entry.
4. **Compute progress** per KR:
   - `progress_pct = round((current - baseline) / (target - baseline) * 100, 1)` — clamped to [0, 100].
   - Where baseline == target, treat as 0% unless current >= target (then 100%).
   - Where numeric values cannot be extracted, set `progress_pct: null` and `status: "unknown"`.
5. **Classify RAG status** per KR:
   - `green` — progress_pct >= 80
   - `yellow` — 50 <= progress_pct < 80
   - `red` — progress_pct < 50 (or null)
6. **Roll up to Objective level** — `objective.progress_pct` = mean of non-null KR progress_pcts under it. Apply same RAG thresholds.
7. Apply `team_filter` if set — exclude Objectives with no matching KRs; exclude non-matching KRs within included Objectives.
8. **Build summary** across all included Objectives/KRs.
9. Return structured JSON (see Output section).

## Output

```json
{
  "objectives": [
    {
      "id": "O1",
      "name": "Reach the 10–50 customer leap with healthy retention",
      "progress_pct": 42.5,
      "status": "red",
      "key_results": [
        {
          "id": "KR1.1",
          "name": "Grow the paying-customer base by net-new logos",
          "owner": "CEO",
          "baseline": 12,
          "target": 20,
          "current": 14,
          "progress_pct": 25.0,
          "status": "red"
        }
      ]
    }
  ],
  "summary": {
    "total_objectives": 3,
    "total_key_results": 13,
    "total_green": 2,
    "total_yellow": 4,
    "total_red": 7,
    "total_unknown": 0,
    "overall_pct": 38.2
  },
  "warnings": [],
  "meta": {
    "okr_file": "okrs/q4-corporate.md",
    "team_filter": null,
    "parsed_at": "2026-05-22T23:04:00Z"
  }
}
```

`overall_pct` is the mean of all non-null KR `progress_pct` values across all Objectives.

## Failure modes

| Condition | Behaviour |
|-----------|-----------|
| `okr_file` not found | Return `{ "error": "okr-file-not-found", "okr_file": "<path>" }` |
| Malformed KR line (missing Owner or Target) | Skip the KR; append `{ "kr_id": "...", "reason": "missing-owner\|missing-target" }` to `warnings[]` |
| Non-numeric baseline/target/current | Set `progress_pct: null`, `status: "unknown"` for that KR |
| All KRs under an Objective are unknown | Objective `progress_pct: null`, `status: "unknown"` |
| `team_filter` matches no KRs | Return empty `objectives: []` with `summary.total_key_results: 0`; no error |

## Integration points

- **`/okr-review` command** — invokes this skill with optional `current_values` from a manual update, formats the JSON as a human-readable review table.
- **`weekly-okr-review` cron agent** (Phase 3) — invokes this skill each week, compares with the prior run's JSON to surface trending KRs, and writes the result to `okrs/weekly-review-<YYYY-WNN>.md`.
- **CEO agent** — reads output to arbitrate cross-functional tradeoffs when red KRs appear.

## Constraints

- Read-only: never calls Write, Edit, or Bash mutation commands.
- Operates entirely on files under `okrs/` — never reads outside that subtree unless `okr_file` is explicitly overridden.
- Does not call external APIs or make network requests.
