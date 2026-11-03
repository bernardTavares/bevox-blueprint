---
description: Generate a concise async daily standup summary from loop state — Done / Doing / Blockers in ≤300 words.
argument-hint: "[--team <engineering|product|operations|...>]"
---

You are generating a daily async standup summary for the Bevox Blueprint leadership team.

## Step 1 — Read loop state

Determine the loop directory. Default path: `.loop/` relative to the current working directory (or `$CLAUDE_LOOP_TARGET/.loop/` if the env var is set).

Read the following files (use Read tool, skip silently if file is absent):

1. `.loop/decisions.md` — last 24h entries. Lines are prefixed with an ISO timestamp; filter to entries where the timestamp is within the past 24 hours (today or yesterday UTC). If no timestamps are parseable, take the last 20 lines.
2. `.loop/iterations.jsonl` — tail last 30 lines. Parse each JSON object; extract `mission_id`, `result`, `completed_at`, `notes` fields.
3. `.loop/missions/active/*.md` — all active mission files. For each, read frontmatter fields: `id`, `status`, `priority`, `attempts`, `assignee` (if present). Read the first H2 heading line as the mission title.
4. `.loop/HUMAN_NEEDED.md` — existence check only (present = blocker exists).
5. `.loop/missions/active/*.md` — check for any with frontmatter `result: fail` or `attempts >= 2`.
6. `.loop/strategy.md` — first 10 lines for context on current priorities.

If argument `--team <name>` was provided, filter active missions and decisions to those referencing that team name (case-insensitive substring match on mission body or `assignee` frontmatter).

## Step 2 — Compose the standup

Write a standup report in the following structure. Keep total output ≤ 300 words. Use bilingual labels (PT-BR / EN).

```
🗓️ Standup — <YYYY-MM-DD>
[--team <name> | Todos os times / All teams]

✅ FEITO ONTEM / DONE
- <completed mission id>: <one-line summary> (<result: ok|fail>)
- <key decision from decisions.md in one line>
(list up to 5 items; if nothing completed in 24h, write "Nada concluído.")

🔄 FAZENDO HOJE / DOING
- <active mission id> [<priority>]: <mission title> (<assignee or "loop">)
(list all active missions, up to 8; if none, write "Sem missões ativas.")

🚨 BLOCKERS
- HUMAN_NEEDED: loop aguardando revisão humana / awaiting human review  ← only if HUMAN_NEEDED.md exists
- <mission id>: falhou após <attempts> tentativas / failed after <attempts> attempts  ← for each fail/stagnant mission
(if no blockers, write "Sem blockers 🟢 / No blockers 🟢")
```

Do not add any text outside this structure. Do not invent content — only report what you actually read. If a file was absent, skip that section's data source silently.

## Step 3 — Output

Print the standup report directly. It is ready for copy-paste into Slack, WhatsApp, or any async channel.
