const fs=require('fs');
// Dual-output drift: .claude/commands/status.md exists but has no human-readable
// docs/commands/status.md counterpart. The other 3 commands (okr-review, standup,
// onboard-customer) all have both. Red->green: docs/commands/status.md is absent today.
const claudeCmd='.claude/commands/status.md';
const docCmd='docs/commands/status.md';
if(!fs.existsSync(claudeCmd)){console.error('precondition: '+claudeCmd+' should exist');process.exit(1)}
if(!fs.existsSync(docCmd)){console.error('missing human-readable counterpart: '+docCmd);process.exit(1)}
const t=fs.readFileSync(docCmd,'utf8');
if(t.trim().length<400){console.error(docCmd+': too thin to be a real doc');process.exit(1)}
// Must document what the command reads / produces, not be a stub.
if(!/status|loop|metric/i.test(t)){console.error(docCmd+': does not describe the status command');process.exit(1)}
// Every .claude/commands/*.md must now have a docs/commands/*.md sibling.
const claudeCmds=fs.readdirSync('.claude/commands').filter(f=>f.endsWith('.md'));
let missing=claudeCmds.filter(f=>!fs.existsSync('docs/commands/'+f));
if(missing.length){console.error('commands without docs counterpart: '+missing.join(', '));process.exit(1)}
console.log('status command doc present; all '+claudeCmds.length+' commands have docs counterparts');
