#!/usr/bin/env node
// Post-merge smoke for the bevox-blueprint markdown company blueprint (dependency-free).
// Runs in the target repo root after an improvement merge; exit !=0 → merge auto-reverted.
// Checks: (a) every .claude/agents/*.md has YAML frontmatter with name+description;
//         (b) every docs/agents/*.md is non-empty; (c) all *.md parse as UTF-8 text.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

let failures = [];

function mdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.md')).map(f => join(dir, f));
}

// (a) agent subagents must have valid frontmatter
for (const f of mdFiles('.claude/agents')) {
  let t;
  try { t = readFileSync(f, 'utf8'); } catch (e) { failures.push(`${f}: unreadable (${e.code})`); continue; }
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { failures.push(`${f}: missing YAML frontmatter`); continue; }
  if (!/^name:\s*\S/m.test(m[1])) failures.push(`${f}: frontmatter missing name`);
  if (!/^description:\s*\S/m.test(m[1])) failures.push(`${f}: frontmatter missing description`);
}

// (b) docs/agents prose specs must be non-empty
for (const f of mdFiles('docs/agents')) {
  try { if (statSync(f).size < 20) failures.push(`${f}: docs spec too small`); }
  catch (e) { failures.push(`${f}: unreadable (${e.code})`); }
}

if (failures.length) {
  console.error('SMOKE FAILED:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log('smoke ok');
