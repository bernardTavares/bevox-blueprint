const fs=require('fs');
// Integration gap: 6 skills exist under .claude/skills/ but NO agent body names any of
// them, so they are undispatchable (an agent must reference a skill by name to invoke it).
// Red->green: today zero skill names appear in any .claude/agents/*.md body.
// Skill dir names are kebab-case (no regex metacharacters), so a plain substring test is safe.
const skillsDir='.claude/skills';
const skills=fs.readdirSync(skillsDir).filter(d=>{try{return fs.statSync(skillsDir+'/'+d).isDirectory()}catch{return false}});
if(skills.length<6){console.error('expected >=6 skills, found '+skills.length);process.exit(1)}
const agentsDir='.claude/agents';
const agents=fs.readdirSync(agentsDir).filter(f=>f.endsWith('.md'));
const bodies=agents.map(f=>fs.readFileSync(agentsDir+'/'+f,'utf8').toLowerCase());
let unwired=[];
for(const s of skills){
  const needle=s.toLowerCase();
  if(!bodies.some(b=>b.includes(needle)))unwired.push(s);
}
if(unwired.length){console.error('skills not referenced by any agent: '+unwired.join(', '));process.exit(1)}
console.log('all '+skills.length+' skills wired into at least one agent');
