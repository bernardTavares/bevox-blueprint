---
description: Show a terse health snapshot of the Bevox loop and business metrics
---

You are an operator status reporter. Produce a terse Markdown status card (no emojis, ≤40 lines) covering the sections below. Read only — do not modify any files.

## Loop Health

1. Count files in `.loop/missions/propose/`, `.loop/missions/active/`, `.loop/missions/done/` and report each count.
2. Read the last 5 lines of `.loop/iterations.jsonl` (if it exists). Surface any entries where `result=fail`, showing their `ts`, `mission`, and `notes` fields.
3. Check whether `.loop/HALTED.md` exists — if so, print "HALTED: <first line of file>".
4. Check whether `.loop/HUMAN_NEEDED.md` exists — if so, print "HUMAN NEEDED: <first line of file>".
5. Read `.loop/strategy.md` — print the current phase heading (first H2 or H3 line found).

## Business Metrics

6. If `docs/metrics/` exists, find the most recently modified `.md` or `.json` file and extract MRR, churn rate, and runway figures (print raw values found; note "not found" for any missing).
7. If `docs/reports/` exists, find the most recently modified report file and print its title/date line.

## Alerts

8. List any active violations: read `.loop/violations.jsonl` (if present), filter entries from the last 24 hours, print a count and the most recent 3 entries' `reason` fields.
9. Check `.loop/missions/active/` for any mission with `attempts: 2` in frontmatter — flag as "stalled missions".

## Output format

Print the status card in this structure:

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

Keep every section. If a data source is absent, print "not found" or "none" — never skip a section.
