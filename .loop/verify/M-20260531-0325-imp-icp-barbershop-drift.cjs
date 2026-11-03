// Verify: ICP drift fixed. "barbershop/barbearia" must NOT appear as a default
// vertical in any agent spec unless that file ALSO flags it as an explicit
// GTM-expansion decision (the SoT/charter ICP does not include barbershops).
// RED today: 16 agent files name barbershops as a core vertical with no caveat.
const fs = require('fs');
const path = require('path');

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

// Premise guard: the canonical ICP in charter.md must still exclude barbershops.
if (!fs.existsSync('charter.md')) { console.error('FAIL: charter.md missing (premise changed)'); process.exit(2); }
const charter = fs.readFileSync('charter.md', 'utf8');
if (/barber/i.test(charter)) {
  console.error('FAIL: charter.md now itself lists barbershops — ICP decision changed; revisit this mission');
  process.exit(2);
}

const files = [...walk('docs/agents'), ...walk('.claude/agents')];
if (files.length === 0) { console.error('FAIL: no agent files found (premise changed)'); process.exit(2); }

const offenders = [];
for (const f of files) {
  const body = fs.readFileSync(f, 'utf8');
  if (!/barber/i.test(body)) continue; // clean — no barbershop mention at all
  // Allowed ONLY if the file explicitly frames barbershops as an expansion /
  // non-default GTM decision.
  const caveat = /(expansion|expans[aã]o|not\s+(in\s+)?(the\s+)?core\s+ICP|fora\s+do\s+ICP|GTM\s+decision|decis[aã]o\s+de\s+GTM|non[- ]canonical|future\s+vertical|vertical\s+futur)/i.test(body);
  if (!caveat) offenders.push(rel(f));
}

if (offenders.length) {
  console.error('FAIL: ' + offenders.length + ' agent file(s) name barbershops as a default ICP vertical without an explicit expansion/GTM caveat:');
  offenders.forEach((o) => console.error('  - ' + o));
  process.exit(1);
}
console.log('OK: no agent treats barbershops as a canonical default ICP vertical without a GTM-expansion caveat');
