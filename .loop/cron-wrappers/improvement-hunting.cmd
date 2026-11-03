@echo off
set CLAUDE_LOOP_INSTANCE=bevox-blueprint
set CLAUDE_LOOP_TARGET=<workspace>\bevox-blueprint
set CLAUDE_LOOP_CRON_ID=improvement-hunting
cd /d "<workspace>\claude-loop-template"
claude --print --dangerously-skip-permissions "@<workspace>\bevox-blueprint\.loop\cron-prompts\improvement-hunting.md" >> "<workspace>\bevox-blueprint\.loop\cron-logs\improvement-hunting.log" 2>&1
