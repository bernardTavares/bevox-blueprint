// Verify: conventions rule documents an agent-frontmatter standard that defines the
// canonical model: values and required frontmatter fields, so model-id drift cannot
// recur. Both .claude/rules/conventions.md and docs/rules/conventions.md must carry it.
const fs = require('fs');
const targets = ['.claude/rules/conventions.md', 'docs/rules/conventions.md'];
const errs = [];
for (const fp of targets) {
  if (!fs.existsSync(fp)) { errs.push('missing ' + fp); continue; }
  const txt = fs.readFileSync(fp, 'utf8');
  const low = txt.toLowerCase();
  // must have a frontmatter standard section
  if (!/frontmatter/.test(low)) { errs.push(fp + ': no frontmatter section'); continue; }
  // must name the canonical model ids
  if (!low.includes('claude-opus-4-5')) errs.push(fp + ': canonical opus id not documented');
  if (!low.includes('claude-sonnet-4-5')) errs.push(fp + ': canonical sonnet id not documented');
  // must enumerate the required fields
  const reqFields = ['name', 'description', 'tools', 'model'];
  const missing = reqFields.filter(k => !new RegExp('\b' + k + '\b').test(low));
  if (missing.length) errs.push(fp + ': required fields not listed: ' + missing.join(','));
}
if (errs.length) { console.error('FAIL:\n  ' + errs.join('\n  ')); process.exit(1); }
console.log('OK: agent-frontmatter standard documented in both conventions files');
process.exit(0);
