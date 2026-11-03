// Verify: agent specs that enumerate Bevox product modules must CITE the canonical
// reference (docs/modules.md or the bevox-knowledge SoT) rather than silently
// re-listing modules in their own words (the drift docs/modules.md was created to
// stop; SoT-reconciliation-audit recommendation #1). RED today: many agents inline
// module lists and only CLAUDE.md cites docs/modules.md.
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('docs/modules.md')) {
  console.error('FAIL: docs/modules.md (canonical module reference) missing — premise changed');
  process.exit(2);
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const rel = (f) => path.relative('.', f).split(path.sep).join('/');

// An "enumeration" = a file that names >=3 distinct bevox-* product modules.
const MODULES = [
  'bevox-backend', 'bevox-harness', 'bevox-web', 'bevox-mobile',
  'bevox-console', 'bevox-meta-api', 'bevox-direct', 'bevox-site',
];
const CITES = /(docs\/modules\.md|bevox-knowledge|bevox-knowledge-read|canonical\s+module|m[oó]dulo[s]?\s+can[oô]nic|ADR-011|ADR-002)/i;

const files = [...walk('docs/agents'), ...walk('.claude/agents')];
if (files.length === 0) { console.error('FAIL: no agent files found (premise changed)'); process.exit(2); }

const offenders = [];
for (const f of files) {
  const body = fs.readFileSync(f, 'utf8');
  const distinct = MODULES.filter((m) => body.includes(m)).length;
  if (distinct < 3) continue; // not enumerating the module set
  if (!CITES.test(body)) offenders.push(rel(f) + ' (lists ' + distinct + ' modules, no canonical citation)');
}

if (offenders.length) {
  console.error('FAIL: ' + offenders.length + ' agent file(s) enumerate Bevox modules without citing docs/modules.md or the SoT:');
  offenders.forEach((o) => console.error('  - ' + o));
  process.exit(1);
}
console.log('OK: every agent that enumerates Bevox modules cites the canonical reference');
