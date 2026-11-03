---
name: cost-monitor
description: Read loop usage data and estimate Claude API operational costs, flagging daily spend anomalies for the CFO agent and runway-check cron.
---

## Purpose

Monitor Bevox Blueprint operational costs by aggregating Claude API token usage from `$LOOP_DIR/usage.jsonl`, estimating spend using current pricing tier defaults, and returning a structured JSON cost snapshot. The output supports runway tracking, burn-rate alerts, and CFO agent reporting.

This skill is **read-only** — it reads `usage.jsonl` and emits JSON. It never writes to the repo or loop state.

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `loop_dir` | string (required) | — | Absolute path to `$LOOP_DIR` (e.g. `/path/to/bevox-blueprint/.loop`) |
| `period_days` | integer | `7` | Rolling window in days for usage aggregation. Records older than `period_days` are excluded. |
| `alert_threshold_usd` | number | `50` | Daily spend threshold (USD, estimated) above which `alert: true` is set |

## Process

1. **Locate usage data.** Open `$loop_dir/usage.jsonl`. If the file does not exist, return `{ "error": "usage-data-unavailable" }` immediately.

2. **Filter by period.** Parse each JSONL line as a usage record. Keep only records whose `ts` (ISO-8601 timestamp) falls within the trailing `period_days` window. Malformed or non-parseable lines are skipped; count skipped rows in `skipped_rows`.

3. **Aggregate tokens.** For each retained record, extract:
   - `agent` — agent role (e.g. `worker-generic`, `orchestrator`); default `"unknown"` if absent
   - `model` — model identifier (e.g. `claude-sonnet-4-6`); default `"unknown"` if absent
   - `input_tokens` — integer; default `0`
   - `output_tokens` — integer; default `0`
   Accumulate totals per `(agent, model)` pair.

4. **Estimate cost.** Apply the pricing table below (conservative defaults; mark as estimates). For each `(agent, model)` pair compute:
   `cost_usd = (input_tokens / 1_000_000) * input_rate + (output_tokens / 1_000_000) * output_rate`

   **Default pricing tiers (estimates — verify against Anthropic pricing page):**

   | Model pattern | Input ($/M tokens) | Output ($/M tokens) |
   |---------------|--------------------|----------------------|
   | `claude-opus-*` | 15.00 | 75.00 |
   | `claude-sonnet-*` | 3.00 | 15.00 |
   | `claude-haiku-*` | 0.25 | 1.25 |
   | `*` (fallback) | 3.00 | 15.00 |

   Match by prefix (longest match wins). If a `$loop_dir/config/pricing.json` file exists, load it and override the table for any model patterns it declares — same `{ "input_per_m": N, "output_per_m": N }` shape.

5. **Compute summary metrics:**
   - `total_tokens` = sum of all input + output tokens across the period
   - `total_cost_usd_est` = sum of all per-pair cost estimates
   - `cost_by_agent` = map of `agent → total_cost_usd_est` for that agent
   - `cost_by_model` = map of `model → total_cost_usd_est` for that model
   - `daily_avg_usd` = `total_cost_usd_est / period_days` (rounded to 4 decimal places)
   - `trend` = compare `daily_avg_usd` for the current period vs the prior period of equal length:
     - `"up"` if current > prior × 1.10
     - `"down"` if current < prior × 0.90
     - `"flat"` otherwise; `"insufficient-data"` if the prior period has no records

6. **Alert check.** If `daily_avg_usd > alert_threshold_usd`, set `alert: true` and populate `alert_reason` with a human-readable string (e.g. `"daily_avg_usd 72.50 exceeds threshold 50.00"`). Otherwise `alert: false`, omit `alert_reason`.

7. **Return** the JSON output object (see Output section).

## Output

```json
{
  "period_days": 7,
  "window_start": "2026-05-15T00:00:00Z",
  "window_end": "2026-05-22T00:00:00Z",
  "total_tokens": 4820000,
  "total_cost_usd_est": 18.47,
  "cost_by_agent": {
    "worker-generic": 9.12,
    "orchestrator": 4.31,
    "reflector": 3.22,
    "architect": 1.82
  },
  "cost_by_model": {
    "claude-sonnet-4-6": 14.46,
    "claude-opus-4-5": 4.01
  },
  "daily_avg_usd": 2.6386,
  "trend": "flat",
  "alert": false,
  "skipped_rows": 0,
  "pricing_source": "defaults",
  "meta": {
    "loop_dir": "/path/to/bevox-blueprint/.loop",
    "period_days": 7,
    "alert_threshold_usd": 50,
    "evaluated_at": "2026-05-22T10:00:00Z"
  }
}
```

When `alert: true`:

```json
{
  "alert": true,
  "alert_reason": "daily_avg_usd 72.50 exceeds threshold 50.00"
}
```

`pricing_source` is either `"defaults"` or `"config"` (when `$loop_dir/config/pricing.json` was loaded).

## Failure modes

| Condition | Behaviour |
|-----------|-----------|
| `usage.jsonl` does not exist | Return `{ "error": "usage-data-unavailable", "loop_dir": "<path>" }` |
| All rows malformed / outside window | Return output with all zero values, `skipped_rows` = total count |
| `pricing.json` present but malformed | Fall back to defaults; set `pricing_source: "defaults-fallback"`, append `warnings[]` entry |
| `loop_dir` path not accessible | Return `{ "error": "loop-dir-inaccessible", "loop_dir": "<path>" }` |

## Integration points

- **CFO agent** — invokes this skill in the runway-review context; receives `total_cost_usd_est`, `daily_avg_usd`, `trend`, and `alert` to populate the monthly burn narrative.
- **`monitor-runway` cron** — fires this skill on a scheduled cadence; if `alert: true`, writes a `kind: fix` mission requesting human review of spend anomaly.
- **`/status` command** — surfaces `daily_avg_usd`, `trend`, and `alert` in the operator status dashboard.
- **Head of Finance agent** — uses `cost_by_agent` to attribute operational costs to loop activities for internal reporting.

## Constraints

- Read-only: never calls Write, Edit, or Bash mutation commands.
- Only reads files inside `$loop_dir/` (usage.jsonl, config/pricing.json). Never reads target repo code.
- Does not make network requests; pricing rates are bundled defaults (or `config/pricing.json`).
- All cost figures are estimates and must be labeled as such in any consumer output.
