#!/bin/sh
# SessionStart.sh — inject Bevox Blueprint company state into each Claude Code session
# POSIX sh only. Read-only: no writes, no network calls, no secrets.

# ---------------------------------------------------------------------------
# Halt-check preamble
# ---------------------------------------------------------------------------
if [ -f "${LOOP_DIR}/.loop/HALTED.md" ]; then
  echo "[halted] Loop is halted — all autonomous actions disabled."
  exit 0
fi

# Derive LOOP_DIR from CLAUDE_LOOP_TARGET if set, otherwise from script location
_ROOT="${CLAUDE_LOOP_TARGET:-}"
if [ -z "$_ROOT" ]; then
  # Best-effort: walk up from script location to find .loop/
  _SCRIPT_DIR="$(cd "$(dirname "$0")" 2>/dev/null && pwd)"
  _ROOT="$(cd "$_SCRIPT_DIR/../.." 2>/dev/null && pwd)"
fi
_LOOP="${_ROOT}/.loop"

# Re-check halt with resolved path
if [ -f "${_LOOP}/HALTED.md" ]; then
  echo "[halted] Loop is halted — all autonomous actions disabled."
  exit 0
fi

# ---------------------------------------------------------------------------
# Company state summary
# ---------------------------------------------------------------------------
echo "## Bevox Blueprint — Session Context"
echo ""

# Current date (UTC)
echo "**Date (UTC):** $(date -u '+%Y-%m-%d %H:%M')"

# Instance slug + loop dir
_SLUG="${CLAUDE_LOOP_INSTANCE:-unknown}"
echo "**Instance:** ${_SLUG}  |  **Loop dir:** ${_LOOP}"
echo ""

# Recent decisions (last 5 lines)
_DECISIONS="${_LOOP}/decisions.md"
if [ -f "$_DECISIONS" ]; then
  echo "**Recent decisions (last 5 lines of decisions.md):**"
  tail -5 "$_DECISIONS" | sed 's/^/  /'
else
  echo "**Recent decisions:** decisions.md absent"
fi
echo ""

# Active mission count
_ACTIVE_DIR="${_LOOP}/missions/active"
if [ -d "$_ACTIVE_DIR" ]; then
  _COUNT=$(find "$_ACTIVE_DIR" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  echo "**Active missions:** ${_COUNT}"
else
  echo "**Active missions:** active/ dir absent"
fi

# OKR status (first H2 + top 3 KR lines)
_OKR="${_ROOT}/docs/okrs/q4-corporate.md"
if [ -f "$_OKR" ]; then
  echo ""
  echo "**OKR status (q4-corporate.md):**"
  # Extract first H2 header
  _H2=$(grep -m 1 '^## ' "$_OKR" 2>/dev/null || echo "(no H2 found)")
  echo "  ${_H2}"
  # Top 3 KR lines (lines starting with KR or "- KR" or "**KR")
  grep -m 3 -i 'KR' "$_OKR" 2>/dev/null | sed 's/^/  /' || true
else
  echo ""
  echo "**OKR status:** OKR file absent (docs/okrs/q4-corporate.md)"
fi

# Strategy headline (first non-blank line after "# Strategy")
_STRATEGY="${_LOOP}/strategy.md"
if [ -f "$_STRATEGY" ]; then
  echo ""
  echo "**Strategy headline:**"
  # Print first non-blank line that follows a "# Strategy" header
  awk '/^# Strategy/{found=1; next} found && /[^[:space:]]/{print "  " $0; exit}' "$_STRATEGY"
else
  echo ""
  echo "**Strategy headline:** strategy.md absent"
fi

echo ""
echo "---"
