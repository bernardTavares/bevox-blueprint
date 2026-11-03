// Verify: org-chart.md reflects Phase-2 completion.
// (1) No department lead is still labelled "planned" / "Phase 1b/2" / "Phase 2" as
//     unbuilt, since all 8 leads + 10 IC agents now exist as files.
// (2) The IC layer is represented: at least 6 of the known IC roles are named.
// (3) The IC roles are no longer described as "not on this chart yet".
const fs = require('fs');
const path = require('path');
const fp = 'org-chart.md';
if (!fs.existsSync(fp)) { console.error('FAIL: missing org-chart.md'); process.exit(1); }
const txt = fs.readFileSync(fp, 'utf8');
const low = txt.toLowerCase();
const errs = [];
// (1) stale "planned" markers on leads
if (/\(planned\)/.test(low)) errs.push('still contains "(planned)" lead markers');
if (/phase 1b\/2|phase 2 creates them|not on this chart yet/.test(low)) {
  errs.push('still describes built roles as future-phase/not-yet-charted');
}
// (2) IC roster present (require >=6 of these to appear)
const ics = ['senior backend', 'ml/ai', 'mobile engineer', 'product designer',
  'content writer', 'account executive', 'support specialist', 'billing analyst',
  'data analyst', 'bdr'];
const found = ics.filter(r => low.includes(r));
if (found.length < 6) errs.push('IC layer underrepresented (found ' + found.length + ' of expected >=6: ' + found.join(', ') + ')');
if (errs.length) { console.error('FAIL:\n  ' + errs.join('\n  ')); process.exit(1); }
console.log('OK: org-chart reflects Phase-2 roster (' + found.length + ' IC roles charted)');
process.exit(0);
