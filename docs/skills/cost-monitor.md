# cost-monitor skill

## What it does

The `cost-monitor` skill aggregates Claude API token usage from the loop's `usage.jsonl` log, estimates operational spend using conservative per-model pricing defaults, and returns a structured JSON cost snapshot. It supports daily spend alerting and rolling trend analysis so the CFO agent and `monitor-runway` cron can track Bevox Blueprint's burn rate without manual counting.

The skill is read-only. It never modifies the target repo or loop state.

## Why it exists

At the 10–50 customer stage, Claude API spend is Bevox Blueprint's primary loop operational cost. As the number of agents and cron ticks grows, individual usage records accumulate quickly and the aggregate cost can drift upward without a single agent noticing. `cost-monitor` is the canonical computation layer for: "how much did we spend running the loop over the last N days, and is that trending up?"

Without this skill, each agent that cares about cost (CFO, Head of Finance, the `/status` command) would re-parse `usage.jsonl` independently and risk producing inconsistent estimates. `cost-monitor` is the single source of truth.

## Cost categories tracked

| Category | Source field | Notes |
|----------|-------------|-------|
| Claude API input tokens | `input_tokens` in each `usage.jsonl` row | Priced per million tokens |
| Claude API output tokens | `output_tokens` in each `usage.jsonl` row | Priced per million tokens (higher rate) |
| Cost by agent role | Grouped by `agent` field | Attributes spend to orchestrator, worker-generic, reflector, architect, etc. |
| Cost by model | Grouped by `model` field | Useful for understanding sonnet vs opus split |

Infrastructure costs (hosting, CI, GitHub) are not tracked by this skill — they are not present in `usage.jsonl`. Those are tracked by the Head of Finance agent directly from billing dashboards.

## Pricing tier defaults

All cost figures produced by this skill are **estimates**. The pricing table below is bundled as a default and should be verified against the current [Anthropic pricing page](https://www.anthropic.com/pricing).

| Model pattern | Input (USD / 1M tokens) | Output (USD / 1M tokens) |
|---------------|------------------------|--------------------------|
| `claude-opus-*` | $15.00 | $75.00 |
| `claude-sonnet-*` | $3.00 | $15.00 |
| `claude-haiku-*` | $0.25 | $1.25 |
| Fallback (unknown model) | $3.00 | $15.00 |

To override defaults, create `$LOOP_DIR/config/pricing.json` with entries of the form:

```json
{
  "claude-sonnet-4-6": { "input_per_m": 3.00, "output_per_m": 15.00 },
  "claude-opus-4-7": { "input_per_m": 15.00, "output_per_m": 75.00 }
}
```

The skill reports `pricing_source: "config"` in its output when this override file is loaded, or `"defaults"` otherwise.

## Alert threshold logic

The `alert_threshold_usd` parameter (default: **$50/day**) is compared against `daily_avg_usd` — the total estimated cost over the rolling window divided by `period_days`. When the daily average exceeds the threshold:

- `alert: true` is set in the output
- `alert_reason` is populated with a human-readable message (e.g. `"daily_avg_usd 72.50 exceeds threshold 50.00"`)
- The `monitor-runway` cron emits a `kind: fix` mission to surface the anomaly for human review

The threshold is intentionally conservative at $50/day for the current Bevox stage. At 10–50 customers, loop operational cost above that level warrants investigation (e.g. a runaway cron, an unusually expensive architect run, or unexpected model upgrades).

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `loop_dir` | string | *required* | Absolute path to `$LOOP_DIR` |
| `period_days` | integer | `7` | Rolling window for aggregation. Records older than this are excluded. |
| `alert_threshold_usd` | number | `50` | Daily spend threshold in USD (estimated) that triggers `alert: true` |

## Output

The skill returns a single JSON object:

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

`trend` values: `"up"` (>10% increase vs prior period), `"down"` (>10% decrease), `"flat"` (within 10%), `"insufficient-data"` (prior period has no records).

## Usage examples

### Via the CFO agent (automated)

The CFO agent invokes this skill during runway reviews, passing `loop_dir` from the session environment. It uses `daily_avg_usd` and `trend` to project monthly burn:

```
loop_dir: /path/to/bevox-blueprint/.loop
period_days: 30
alert_threshold_usd: 50
```

### Via the `/status` command (on demand)

Running `/status` in the Bevox Blueprint repo surfaces `daily_avg_usd`, `trend`, and `alert` inline in the status dashboard. Uses the default 7-day rolling window.

### Via the monitor-runway cron (scheduled)

The `monitor-runway` cron fires this skill daily with `period_days: 1`. If `alert: true`, it emits a `kind: fix` mission for human review with the `alert_reason` as context.

### Checking a specific period

To audit cost over the last 30 days:

```
loop_dir: /path/to/bevox-blueprint/.loop
period_days: 30
```

## Failure handling

If `usage.jsonl` does not exist (e.g. loop not yet started, or very first bootstrap), the skill returns `{ "error": "usage-data-unavailable" }` immediately without throwing. Consumers should check for the `error` key before reading any other fields.

Malformed JSONL rows are silently skipped; `skipped_rows` in the output shows how many were dropped so operators can detect a corrupt log.

## Integration map

| Consumer | When | What it uses |
|----------|------|-------------|
| CFO agent | Runway review sessions | `total_cost_usd_est`, `daily_avg_usd`, `trend`, `cost_by_agent` |
| `monitor-runway` cron | Daily | `alert`, `alert_reason`, `daily_avg_usd` |
| `/status` command | On demand | `daily_avg_usd`, `trend`, `alert` |
| Head of Finance agent | Monthly reporting | `cost_by_agent`, `cost_by_model`, `total_cost_usd_est` |

## Source

Skill definition: `.claude/skills/cost-monitor/SKILL.md`
Usage log: `$LOOP_DIR/usage.jsonl`
Pricing override: `$LOOP_DIR/config/pricing.json` (optional)
Architecture reference: `architecture-backlog.md` Phase 3 — skills section
