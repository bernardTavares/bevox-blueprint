@echo off
set CLAUDE_LOOP_INSTANCE=bevox-blueprint
set CLAUDE_LOOP_TARGET=<workspace>\bevox-blueprint
set CLAUDE_LOOP_CRON_ID=code-validation
cd /d "<workspace>\claude-loop-template"
claude --print --dangerously-skip-permissions "@<workspace>\bevox-blueprint\.loop\cron-prompts\code-validation.md" >> "<workspace>\bevox-blueprint\.loop\cron-logs\code-validation.log" 2>&1
