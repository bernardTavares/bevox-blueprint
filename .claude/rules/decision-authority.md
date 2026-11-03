# Decision Authority rule — Bevox Blueprint

Injected into every agent session. Defines which roles and agents hold authority for each
decision class. When any boundary below is reached, STOP, write `HUMAN_NEEDED.md`, and halt.

---

## Strategic (CEO + Board only)

Agents MAY: surface data, draft memos, recommend.
Agents MUST NOT: commit to pivot, fundraise, acquisition, or annual plan changes autonomously.

---

## Product roadmap

- Sprint scope ≤1 sprint: Head of Product proposes → CPO approves.
- >1 sprint impact: Head of Product → CPO + CEO.
- Agents may create backlog missions and draft PRDs. They may NOT mark milestones shipped or
  close product cycles without CPO confirmation.

---

## Engineering and architecture

- New service / breaking API change: Head of Engineering → CTO (+ CPO for API breaks).
- Loop brain changes (`.claude/**`): `self-evolver` proposes → human sets `autonomy_pass: true`.
  PreToolUse-guard blocks any `auto/evolve-*` merge without this flag.
- Mission auto-merge: `architecture_pass: true` (architect) OR `autonomy_pass: true` (human).
  Merge-main skill enforces — workers NEVER merge inline.
- Cron instantiation: `scheduler` agent only. All other agents are blocked by PreToolUse-guard.
- Production deployment: automated on CI-green + deploy script; off-hours requires CTO.

---

## Hiring (all cases)

Agents may generate job descriptions and surface candidate summaries only.
Any action at a hiring decision gate → write `HUMAN_NEEDED.md` and halt.
- IC hire: Department Head → CHRO.
- C-suite hire: CEO → Board.

---

## Financial commitments

Agents must NEVER initiate, approve, or commit any financial transaction.
Flag budget overruns; generating cost estimates is permitted.
Any financial gate → write `HUMAN_NEEDED.md` and halt.
- ≤R$1k: Department Head.
- R$1k–R$5k: Department Head + CFO.
- R$5k–R$50k: CFO.
- >R$50k: CFO + CEO.

---

## Legal and compliance

Agents must NEVER make compliance exceptions, accept/reject legal claims, or represent Bevox to
any regulatory body.
On detecting any potential compliance issue → write `HUMAN_NEEDED.md` immediately.
- LGPD basis / new data category: Head of Legal (+ CEO for sensitive data).
- Data breach: Head of Legal + CTO → CEO; LGPD Art. 48 — 72h ANPD window.
- ANPD inquiry: Head of Legal → CEO + external counsel.

---

## Agent-loop governance (hard rules)

| Action | Authority | Notes |
|---|---|---|
| Bootstrap | Human operator | bootstrap script only |
| Halt loop | Human OR boot-canary (2 failures) | halt.mjs / HALTED.md |
| Resume loop | Human operator | resume.mjs only |
| Stamp `merge_status: ready` | worker-generic | after green verify + autonomy_pass OR architecture_pass |
| FF-merge `auto/mission-*` | Serial merge-queue | NEVER by worker |
| FF-merge `auto/evolve-*` | merge-main skill | `autonomy_pass: true` required |
| Create/delete OS crons | scheduler agent | PreToolUse-guard blocks others |
| Edit `objective.md` | Nobody | Immutable after bootstrap |

---

## Escalation path (mandatory)

1. Stop the action.
2. Write `$LOOP_DIR/HUMAN_NEEDED.md` — describe the decision needed, options, supporting data.
3. Halt the loop tick.
4. Notify async if tooling permits (do not block on delivery).

Human operator unblock: review `HUMAN_NEEDED.md` → decide → delete file → optionally set
`autonomy_pass: true` on mission → run `resume.mjs`.

**When in doubt, halt. The cost of a bad autonomous action exceeds the cost of a brief pause.**
