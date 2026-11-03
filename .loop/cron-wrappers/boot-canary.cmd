@echo off
set CLAUDE_LOOP_INSTANCE=bevox-blueprint
set CLAUDE_LOOP_TARGET=<workspace>\bevox-blueprint
set CLAUDE_LOOP_CRON_ID=boot-canary
cd /d "<workspace>\claude-loop-template"
claude --print --dangerously-skip-permissions "@<workspace>\bevox-blueprint\.loop\cron-prompts\boot-canary.md" >> "<workspace>\bevox-blueprint\.loop\cron-logs\boot-canary.log" 2>&1
