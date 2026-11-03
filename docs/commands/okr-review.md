# /okr-review — Command Documentation

## Purpose

The `/okr-review` command triggers a structured OKR review session for Bevox Blueprint. It reads the current quarter's OKR file (`okrs/q4-corporate.md`) and recent decision log entries, then produces a board-ready progress report — including a status table, at-risk flagging, and recommended actions.

This command is designed for the **weekly cadence** that every post-PMF company needs: a disciplined, repeatable check on whether the quarter's bets are still on track and where attention needs to go before problems compound.

## Intended Users

- **CEO / C-Suite:** Weekly review before stand-up or async board update.
- **Orchestrator / Agents:** Automated progress measurement after a planning tick.
- **Board / Investors:** Async update digest (the ≤500-word executive summary output).

## Usage

```
/okr-review
```

No arguments required. The command reads live files at runtime — it never uses hardcoded data.

## What It Does

1. Reads `okrs/q4-corporate.md` — parses all Objectives and Key Results (owner, baseline, target).
2. Reads `.loop/decisions.md` — extracts the most recent entries for context on what has changed.
3. Produces a structured **OKR Progress Table** (see Output Format below).
4. **Flags at-risk KRs** — any KR assessed as Red (off-track) or Yellow (at risk) is highlighted with 1–3 recommended actions.
5. Outputs a **≤500-word Executive Summary** suitable for an async board update or weekly leadership message.

## Output Format

### OKR Progress Table

| Objective | Key Result | Target | Current | Status | Owner |
|-----------|-----------|--------|---------|--------|-------|
| O1 — Retention | KR1.1 Net-new logos | 20+ customers | _live_ | 🟡 Yellow | CEO |
| ... | ... | ... | ... | ... | ... |

Status values:
- **Green** — on track, no intervention needed
- **Yellow** — at risk, monitor closely
- **Red** — off-track, action required

### At-Risk Section

For each Yellow or Red KR, the command outputs:

```
### [KR ID] — [KR Name]
Status: [Red|Yellow]
Owner: [Role]
Gap: [Current vs Target narrative]
Recommended Actions:
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

### Executive Summary

A plain-language ≤500-word summary written in the voice appropriate for a board async update. Covers:
- Overall quarter health (1–2 sentences)
- Top 2–3 wins or on-track KRs
- Top 1–2 risks with owners and recommended actions
- Closing signal: "on track to close Q4 as planned" or escalation flag

## Frequency Guidance

Run **weekly** — ideally Monday morning before the leadership stand-up. A consistent weekly cadence is the minimum for catching drift before it becomes a miss.

For automated operation, wire this command to the `weekly-okr-review` cron (scheduler-owned, configured in `.loop/config/`).

## Example Invocation

```
/okr-review
```

Expected runtime: under 60 seconds (file reads + LLM synthesis).

## Related

- **`okrs/q4-corporate.md`** — the source of truth for OKR definitions, owners, baselines, and targets
- **`.loop/decisions.md`** — decision log used for context
- **`okr-rollup` skill** (when built) — can be invoked by this command for deeper KR aggregation
- **`charter.md`** — unit-economics anchors (NRR > 110 %, LTV:CAC > 3:1, CAC payback < 12 months, gross margin > 75 %)
