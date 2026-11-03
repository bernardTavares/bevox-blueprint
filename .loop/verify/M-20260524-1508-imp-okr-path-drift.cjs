const fs=require('fs');
// The canonical OKR file lives at okrs/q4-corporate.md (top-level, per the objective output contract),
// NOT docs/okrs/. The okr-review command + okr-rollup skill referenced the wrong path.
// Red->green: today these files contain "docs/okrs/" and the path does not resolve.
if(!fs.existsSync('okrs/q4-corporate.md')){console.error('canonical OKR file okrs/q4-corporate.md missing');process.exit(1)}
if(fs.existsSync('docs/okrs')){console.error('docs/okrs/ should not exist (OKRs live at okrs/)');process.exit(1)}
const files=[
  'docs/commands/okr-review.md',
  '.claude/commands/okr-review.md',
  '.claude/skills/okr-rollup/SKILL.md',
];
let fail=0;
for(const f of files){
  if(!fs.existsSync(f)){console.error('missing file: '+f);fail++;continue}
  const t=fs.readFileSync(f,'utf8');
  if(/docs\/okrs\//.test(t)){console.error(f+': still references docs/okrs/ (should be okrs/)');fail++}
  if(!/(^|[^a-z/])okrs\/q4-corporate\.md/m.test(t)){console.error(f+': no reference to the real okrs/q4-corporate.md path');fail++}
}
if(fail)process.exit(1);
console.log('okr path drift fixed: all '+files.length+' files point at okrs/q4-corporate.md');
