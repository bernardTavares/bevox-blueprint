const fs=require('fs');
const dir='departments';
const md=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.md')):[];
if(md.length<8){console.error('expected >=8 department docs, found '+md.length);process.exit(1)}
let fail=0;
for(const f of md){const t=fs.readFileSync(dir+'/'+f,'utf8');
  if(!/##\s*Lead/i.test(t)){console.error(f+': missing Lead');fail++}
  if(!/##\s*(IC|Individual Contributor|Roles|Team)/i.test(t)){console.error(f+': missing IC/Roles');fail++}}
if(fail)process.exit(1);
console.log('departments index OK: '+md.length+' docs');
