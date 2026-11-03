# /status — Command Documentation

## Purpose

The `/status` command produces a terse, read-only health snapshot of the Bevox loop and business metrics. It reads live state files and outputs a compact Markdown status card (no emojis, max 40 lines) covering loop health, business metrics, and active alerts.

This command is the fastest way for an operator to answer "is the loop healthy and is the business on track?" without opening individual files.

## Intended Users

- **CEO / Operator:** Quick daily pulse check on loop and business health.
- **Orchestrator / Agents:** Pre-tick sanity check to surface halts, stalled missions, or violations before acting.
- **On-call engineer:** Incident triage — immediately see if the loop is halted, if missions are stalled, or if violations are accumulating.

## Usage

```
/status
```

No arguments required. The command reads live files at runtime — it never uses hardcoded data.

## What It Reads

The command is strictly read-only. It inspects the following sources and never modifies them:

### Loop State

| Source | What it extracts |
|--------|-----------------|
| `.loop/missions/propose/` | Count of proposed missions |
| `.loop/missions/active/` | Count of active missions |
| `.loop/missions/done/` | Count of completed missions |
| `.loop/iterations.jsonl` | Last 5 entries; surfaces any with `result=fail` (shows `ts`, `mission`, `notes`) |
| `.loop/HALTED.md` | If present, reports halted status with the first line as reason |
| `.loop/HUMAN_NEEDED.md` | If present, reports human-needed status with the first line as reason |
| `.loop/strategy.md` | Current phase heading (first H2 or H3 line found) |
| `.loop/violations.jsonl` | Violations from the last 24 hours — count and up to 3 most recent `reason` fields |
| `.loop/missions/active/*.md` | Scans frontmatter for `attempts: 2` to flag stalled missions |

### Business Metrics (optional)

| Source | What it extracts |
|--------|-----------------|
| `docs/metrics/` | Most recently modified `.md` or `.json` file — extracts MRR, churn rate, and runway figures |
| `docs/reports/` | Most recently modified report file — prints its title/date line |

If a data source directory does not exist or contains no files, the command prints "not found" or "none" for that section. It never skips a section.

## Output Format

The command produces a fixed-structure status card:

```
# Bevox Status — <current date>

## Loop Health
Missions: propose=N  active=N  done=N
Strategy phase: <phase>
Recent failures: <none | list>
Halted: <no | reason>
Human needed: <no | reason>

## Business Metrics
MRR: <value | not found>
Churn: <value | not found>
Runway: <value | not found>
Latest report: <title | none>

## Alerts
Violations (24h): N
<list up to 3 recent violation reasons>
Stalled missions: <none | list ids>
```

Every section is always present. Missing data sources produce "not found" or "none" — never blank sections.

## Read-Only Guarantee

The `/status` command follows the **reporter pattern**: it takes a snapshot of current state and renders it. It does not create missions, modify files, trigger side effects, or write to any log. It is safe to run at any time, at any frequency, without affecting loop behavior.

## Frequency Guidance

Run on demand — there is no minimum or maximum cadence. Typical use is once per day before reviewing active work, or ad-hoc when investigating an issue.

## Example Invocation

```
/status
```

Expected runtime: under 10 seconds (file reads and formatting only, no LLM synthesis required beyond rendering the template).

## Related

- **`.claude/commands/status.md`** — the dispatchable command definition that this document describes
- **`.loop/strategy.md`** — strategy context surfaced in the Loop Health section
- **`.loop/iterations.jsonl`** — iteration log scanned for recent failures
- **`.loop/violations.jsonl`** — violation log scanned for 24-hour alerts
- **`references/agent-patterns/reporter-pattern.md`** — the reporter pattern that this command implements (read-only snapshot, no side effects)
