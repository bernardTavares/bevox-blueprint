// Verify: the company-os-liaison agent (added in the 2026-05-29/30 SoT reconciliation
// and wired into org-chart.md) must also be wired into raci-matrix.md, which is the
// stated single source of truth for "who owns what" and explicitly consumes org-chart.
// RED today: liaison appears in org-chart but has ZERO presence in raci-matrix.
const fs = require('fs');

// Premise guard: the agent must still exist and still be in the org chart.
if (!fs.existsSync('docs/agents/company-os-liaison.md')) {
  console.error('FAIL: docs/agents/company-os-liaison.md missing — premise changed');
  process.exit(2);
}
if (!fs.existsSync('org-chart.md')) { console.error('FAIL: org-chart.md missing'); process.exit(2); }
const org = fs.readFileSync('org-chart.md', 'utf8');
if (!/liaison/i.test(org)) {
  console.error('FAIL: company-os-liaison no longer in org-chart.md — premise changed');
  process.exit(2);
}

if (!fs.existsSync('raci-matrix.md')) { console.error('FAIL: raci-matrix.md missing'); process.exit(2); }
const raci = fs.readFileSync('raci-matrix.md', 'utf8');

// The liaison must be named in the RACI matrix (as a role in scope and/or a
// participant in at least one process row — e.g. governance/incident reporting).
if (!/liaison|company[- ]os[- ]liaison|company.os.liaison/i.test(raci)) {
  console.error('FAIL: raci-matrix.md does not reference the company-os-liaison agent that org-chart.md and docs/agents/ define');
  process.exit(1);
}
console.log('OK: company-os-liaison is wired into raci-matrix.md');
