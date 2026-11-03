// Verify: every .claude/agents/*.md model: value is from the canonical allowlist
// and NO agent uses a bare/non-canonical model id (e.g. "opus", "claude-opus-4-5").
// Canonical set must be consistent across the roster. Red before normalization,
// green after. cwd-relative so it runs in worker worktree and merge-queue repo root.
const fs = require('fs');
const path = require('path');
const dir = path.join('.claude', 'agents');
if (!fs.existsSync(dir)) { console.error('FAIL: missing ' + dir); process.exit(1); }
// Canonical allowlist: full versioned ids only. Bare aliases like "opus"/"sonnet"
// and mismatched legacy ids are NOT allowed.
const CANON = new Set(['claude-opus-4-5', 'claude-sonnet-4-5']);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
if (files.length === 0) { console.error('FAIL: no agent files'); process.exit(1); }
const bad = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = txt.match(/^model:\s*(.+?)\s*$/m);
  if (!m) { bad.push(f + ' (no model: field)'); continue; }
  const val = m[1].trim().replace(/^["']|["']$/g, '');
  if (!CANON.has(val)) bad.push(f + ' -> ' + val);
}
if (bad.length) {
  console.error('FAIL: non-canonical model ids:\n  ' + bad.join('\n  '));
  process.exit(1);
}
console.log('OK: all ' + files.length + ' agents use canonical model ids');
process.exit(0);
