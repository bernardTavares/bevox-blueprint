@echo off
set CLAUDE_LOOP_INSTANCE=bevox-blueprint
set CLAUDE_LOOP_TARGET=<workspace>\bevox-blueprint
set CLAUDE_LOOP_CRON_ID=orchestrator-tick
cd /d "<workspace>\claude-loop-template"
node "<workspace>\claude-loop-template\scripts\lib\drain.mjs" --target "<workspace>\bevox-blueprint" --slug bevox-blueprint >> "<workspace>\bevox-blueprint\.loop\cron-logs\orchestrator-tick.log" 2>&1
