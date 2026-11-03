// Verify: .claude/settings.json registers the WhatsApp/Meta MCP server documented in
// docs/integrations/mcp-integrations.md, and the Stripe server args match the doc.
// RED until settings.json includes a whatsapp MCP entry; GREEN once aligned.
const fs = require('fs');
const sPath = '.claude/settings.json';
const dPath = 'docs/integrations/mcp-integrations.md';
if (!fs.existsSync(sPath)) { console.error('FAIL: settings.json missing'); process.exit(2); }
if (!fs.existsSync(dPath)) { console.error('FAIL: mcp-integrations doc missing'); process.exit(2); }
const raw = fs.readFileSync(sPath, 'utf8');
let cfg;
try { cfg = JSON.parse(raw); } catch (e) { console.error('FAIL: settings.json is not valid JSON: ' + e.message); process.exit(1); }
const servers = cfg.mcpServers || {};
const names = Object.keys(servers);
// The doc documents WhatsApp/Meta as the PRIMARY channel; settings must register it.
const hasWhatsapp = names.some((n) => /whats|meta/i.test(n));
if (!hasWhatsapp) {
  console.error('FAIL: settings.json mcpServers has no WhatsApp/Meta server; documented as primary channel. Servers: ' + names.join(', '));
  process.exit(1);
}
// The Stripe server, if present, should reference the agent-toolkit package the doc recommends.
if (servers.stripe) {
  const args = JSON.stringify(servers.stripe.args || []);
  if (!/agent-toolkit/.test(args)) {
    console.error('FAIL: stripe MCP args do not match documented @stripe/agent-toolkit; got ' + args);
    process.exit(1);
  }
}
console.log('OK: settings.json registers WhatsApp/Meta MCP and stripe args align with docs');
