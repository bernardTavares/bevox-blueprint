# /standup command

## Purpose

The `/standup` command generates a concise async daily standup summary for the Bevox Blueprint leadership team. It reads live loop state (decisions, active missions, blockers) and produces a ≤300-word report ready for copy-paste into Slack, WhatsApp, or any async channel.

Designed for Bevox's async-first culture in the Brazilian market. Output uses bilingual labels (PT-BR / EN) so the same message works across mixed-language channels.

## Usage

```
/standup
/standup --team engineering
/standup --team product
/standup --team operations
```

The optional `--team <name>` argument filters the report to missions and decisions that reference the given team name. Omitting it produces an all-teams summary.

## Expected output

The command produces a structured report in three sections:

- **FEITO ONTEM / DONE** — missions completed in the last 24 hours and key decisions logged.
- **FAZENDO HOJE / DOING** — all currently active missions with priority and assignee.
- **BLOCKERS** — any `HUMAN_NEEDED.md` flag, stagnant missions (2+ failed attempts), or missions with `result: fail`.

Example:

```
Standup — 2026-05-22
Todos os times / All teams

FEITO ONTEM / DONE
- M-20260521-0900-fix-login: corrigido redirect guard (ok)
- Decisão: adotado pattern de merge-queue serial

FAZENDO HOJE / DOING
- M-20260522-1400-add-okrs [70]: adicionar OKRs Q3 (loop)
- M-20260522-2302-command-standup [70]: /standup command (loop)

BLOCKERS
Sem blockers / No blockers
```

## Data sources

All data is read live from `.loop/` in the target repository:

| Source | What is used |
|---|---|
| `.loop/decisions.md` | Last 24h decision entries |
| `.loop/iterations.jsonl` | Last 30 completed iterations (result, mission_id, notes) |
| `.loop/missions/active/*.md` | All active missions (id, title, priority, assignee) |
| `.loop/HUMAN_NEEDED.md` | Presence = blocker flagged |
| `.loop/strategy.md` | Current priorities (context only) |

No content is hardcoded — every line in the report reflects actual loop state at the time the command is run.

## Audience

- CEO, CTO, CPO, COO and department heads at Bevox.
- Async recipients on Slack #loop-updates or WhatsApp leadership group.
- Post once per business day, ideally triggered by the scheduled `nightly-reflect` cron or manually by any authorized team member.

## Limitations

- Report covers a 24-hour window. For longer retrospectives, use `/status` or read `decisions.md` directly.
- The `--team` filter is a substring match on mission body and `assignee` frontmatter; it may miss missions that reference the team indirectly.
- Maximum 8 active missions and 5 done items are shown to keep output concise; the full list is always available in `.loop/missions/`.
