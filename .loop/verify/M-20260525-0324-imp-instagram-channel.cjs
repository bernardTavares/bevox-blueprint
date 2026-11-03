// Verify: Instagram (a core customer channel named in README/charter/strategy) is
// documented in docs/integrations/mcp-integrations.md. RED until a section exists.
const fs = require('fs');
const dPath = 'docs/integrations/mcp-integrations.md';
if (!fs.existsSync(dPath)) { console.error('FAIL: mcp-integrations doc missing'); process.exit(2); }
const body = fs.readFileSync(dPath, 'utf8');
// Confirm Instagram is treated as a real channel in the org (sanity: it is in README).
if (fs.existsSync('README.md') && !/instagram/i.test(fs.readFileSync('README.md', 'utf8'))) {
  console.error('FAIL: README no longer references Instagram (premise changed)');
  process.exit(2);
}
const hits = (body.match(/instagram/gi) || []).length;
if (hits < 2) {
  console.error('FAIL: Instagram channel under-documented in mcp-integrations.md (hits=' + hits + ', need >=2)');
  process.exit(1);
}
// Require an actual section heading for Instagram, not just an inline mention.
if (!/^#{1,4}.*instagram/im.test(body)) {
  console.error('FAIL: no Instagram section heading in mcp-integrations.md');
  process.exit(1);
}
console.log('OK: Instagram channel documented with a dedicated section');
