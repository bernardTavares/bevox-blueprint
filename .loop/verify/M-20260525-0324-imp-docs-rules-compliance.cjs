// Verify: docs/rules/compliance.md exists as a human-readable mirror of .claude/rules/compliance.md.
// RED until the worker creates the mirror; GREEN once present and non-trivial.
const fs = require('fs');
const path = 'docs/rules/compliance.md';
const src = '.claude/rules/compliance.md';
if (!fs.existsSync(src)) {
  console.error('FAIL: source .claude/rules/compliance.md missing (unexpected)');
  process.exit(2);
}
if (!fs.existsSync(path)) {
  console.error('FAIL: docs/rules/compliance.md does not exist (doc-mirror drift)');
  process.exit(1);
}
const body = fs.readFileSync(path, 'utf8');
if (body.trim().length < 400) {
  console.error('FAIL: docs/rules/compliance.md is too short to be a real mirror (<400 chars)');
  process.exit(1);
}
// Must mention the core compliance domains so it is a genuine mirror, not a stub.
const required = [/lgpd/i, /pix|stripe/i, /whatsapp|meta/i];
const missing = required.filter((re) => !re.test(body));
if (missing.length) {
  console.error('FAIL: docs/rules/compliance.md missing core topics: ' + missing.map(String).join(', '));
  process.exit(1);
}
console.log('OK: docs/rules/compliance.md present and mirrors core compliance domains');
