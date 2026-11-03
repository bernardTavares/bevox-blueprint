# Decision Authority — Bevox Blueprint

This document defines which roles and agents hold authority to make which classes of decisions.
It is the authoritative reference for escalation paths and approval gates across the organization
and the autonomous agent loop.

Roles are referenced by title only — never by individual name. When the role is vacant, authority
escalates one level up the reporting chain until a human approves or the action is blocked.

---

## 1. Strategic decisions

Decisions that affect company direction, business model, funding, or market positioning.

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| Strategic pivot / new market | CEO | Board | Agents may surface data; they never decide |
| Fundraising round (any size) | CEO + CFO | Board | Term sheet negotiation requires Board authorization |
| Major acquisition or partnership | CEO | Board | Defined as deal value > R$500k or equity component |
| Annual operating plan | CEO + CFO | Board | Q-level revisions: CEO only |
| Company-wide OKR changes | CPO + CEO | CEO | Mid-cycle: CEO approval required |

**Agent constraint.** Agents may produce analyses, draft memos, and surface recommendations, but
they must write `HUMAN_NEEDED.md` and halt before taking any action that would commit the company
to a strategic decision. No autonomous action is permitted in this category.

---

## 2. Product roadmap

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| Quarterly roadmap | CPO | CEO | Published at start of each quarter |
| Sprint scope (≤1 sprint impact) | Head of Product | CPO | No CEO gate required |
| Feature addition or removal (>1 sprint impact) | Head of Product | CPO + CEO | Must update OKRs if applicable |
| Public beta / GA launch | CPO | CEO | Marketing alignment required (CMO notified) |
| Feature sunset / deprecation | Head of Product | CPO | Customer Success notified 30 days prior |
| Pricing change | CPO + CFO | CEO | Head of Sales notified before announcement |

**Agent constraint.** Agents may open draft PRDs, create backlog missions, and flag gaps. They may
not mark a feature `status: shipped` or close a product milestone without CPO confirmation.

---

## 3. Engineering and architecture

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| New service / major component | Head of Engineering | CTO | ADR required |
| Breaking API change | Head of Engineering | CTO + CPO | Versioning plan required |
| Third-party service integration | Head of Engineering | CTO | Security review if data-handling |
| Loop brain changes (`.claude/**`) | self-evolver agent | Human (`autonomy_pass: true`) | PreToolUse-guard blocks auto-merge without flag |
| Agent mission auto-merge | architect (architecture_pass) OR human (autonomy_pass) | — | merge-main skill enforces; no inline merges |
| Cron instantiation | scheduler agent | — | Budget-gated; no other agent may call schtasks/crontab |
| Production deployment | Head of Engineering | CTO (off-hours) / auto (CI green + deploy script) | Rollback requires CTO approval |
| Database schema migration | Head of Engineering | CTO | Must pass review for PII fields (Head of Legal if LGPD-impacted) |

**Agent constraint.** Any architectural decision outside the agent's declared `scope_paths` requires
the agent to write `HUMAN_NEEDED.md` and halt. The agent must not self-approve changes to
`.claude/rules/`, `.claude/hooks/`, or `.claude/agents/` unless the mission kind is `self-evolve`
with `autonomy_pass: true`.

---

## 4. Hiring and people decisions

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| Open new IC role | Department Head | CPO (product) / CTO (eng) / CEO (other) | Budget pre-check by CFO |
| Hire IC candidate | Department Head | CHRO + Department Head | Offer letter: CHRO signs |
| Hire Manager / Senior Manager | Department Head | CHRO + CEO | |
| Hire VP or Head-of | CEO | CEO + Board (if new function) | CHRO executes |
| Hire C-suite | CEO | Board | CHRO facilitates; Board approves |
| Performance improvement plan | CHRO | Department Head + CHRO | Legal review if near termination |
| Termination | CHRO | Department Head + CHRO | Legal review required (CLT obligations) |
| Compensation adjustment | Department Head | CHRO + CFO | Band changes require CEO approval |
| Equity grant | CFO | CEO + Board | Cap table impact reviewed |

**Agent constraint.** Agents may generate job descriptions and surface candidate summaries, but must
never send offers, reject candidates, or initiate terminations. Any hiring workflow reaching a
decision gate must halt and write `HUMAN_NEEDED.md`.

---

## 5. Financial commitments

| Decision | Approves | Notes |
|---|---|---|
| Expense ≤ R$1k | Department Head | Within pre-approved budget line |
| Expense R$1k–R$5k | Department Head + CFO | CFO may delegate to Head of Finance |
| Expense R$5k–R$50k | CFO | CEO notified |
| Expense > R$50k | CFO + CEO | Board notified if > R$200k |
| New vendor contract (any value) | CFO | Legal review for >R$10k or multi-year |
| SaaS subscription (annual) | CFO | Head of Finance may approve ≤ R$2k/yr |
| Cloud budget overrun > 20% | Head of Engineering | CFO notified; CTO approves remediation |

**Agent constraint.** Agents must not initiate, approve, or commit any financial transaction.
Generating cost estimates and flagging budget overruns is permitted. Any action requiring a
financial approval must halt and write `HUMAN_NEEDED.md`.

---

## 6. Customer and commercial decisions

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| Standard contract (within pricing) | Head of Sales | Head of Sales | Template contract only |
| Custom contract terms | Head of Sales | CEO | Legal review if non-standard indemnity or SLA |
| Discount > 20% | Head of Sales | CPO + CFO | |
| Enterprise deal > R$50k ARR | Head of Sales | CEO | |
| Customer termination / churn response | Head of Customer Success | COO | CEO notified for strategic accounts |
| Public case study / logo use | CMO | Customer (written consent) + CEO | |
| Refund > R$1k | Head of Customer Success | COO + CFO | |

---

## 7. Legal and compliance decisions

| Decision | Proposes | Approves | Notes |
|---|---|---|---|
| LGPD data processing basis | Head of Legal | Head of Legal + CTO | No data collection without basis |
| New data category (sensitive) | Head of Legal | Head of Legal + CEO | Art. 11 applies; Board notified |
| Privacy policy change | Head of Legal | CEO | Published ≥ 15 days notice |
| Regulatory compliance exception | Head of Legal | Head of Legal + CFO | Time-boxed only; never permanent |
| ANPD inquiry response | Head of Legal | CEO | External counsel engaged automatically |
| Data breach response | Head of Legal + CTO | CEO | LGPD Art. 48: 72h ANPD window |
| Litigation / legal dispute | Head of Legal | CEO + Board (if material) | |

**Agent constraint.** Agents must never make compliance exceptions, accept or reject legal claims,
or represent the company to any regulatory body. On detecting a potential compliance issue, the
agent must write `HUMAN_NEEDED.md` immediately.

---

## 8. Agent-loop governance

| Decision | Who holds authority | Notes |
|---|---|---|
| Bootstrap a new loop instance | Human operator | `scripts/bootstrap.{sh,ps1}` only |
| Halt the loop | Human operator OR boot-canary on 2 consecutive failures | `halt.mjs` or `HALTED.md` |
| Resume the loop | Human operator | `resume.mjs`; explicit unblock required |
| Promote mission to active | Orchestrator (auto) or Human (manual override) | R9 auto-promotion for architect-pass missions |
| Stamp `merge_status: ready` | Worker-generic (after green verify + auth check) | autonomy_pass or architecture_pass required |
| FF-merge `auto/mission-*` to main | Serial merge-queue (drain) | Never inline; never by worker |
| FF-merge `auto/evolve-*` to main | merge-main skill | `autonomy_pass: true` required in mission frontmatter |
| Create / delete OS cron entries | Scheduler agent | PreToolUse-guard blocks all other agents |
| Edit `.claude/rules/`, `.claude/hooks/` | Self-evolver on `auto/evolve-*` | hardened files blocked even for self-evolver |
| Edit `objective.md` | Nobody (immutable after bootstrap) | chmod 444; deny permission in settings.json |
| Write `HALTED.md` | halt.mjs / resume.mjs / budget.mjs only | Settings deny blocks agents |

---

## 9. Escalation path

When any agent or role reaches the boundary of their authority, the required escalation steps are:

1. **Stop the action.** Do not proceed beyond the decision boundary.
2. **Write `$LOOP_DIR/HUMAN_NEEDED.md`** with a concise description of the decision required, the
   options identified, and any supporting data already gathered.
3. **Halt the loop tick.** The orchestrator will detect `HUMAN_NEEDED.md` on the next tick and
   pause autonomous operation.
4. **Notify asynchronously** if tooling permits (e.g., Slack notification via CMO/COO on-call
   rotation) — but do not block on notification delivery.

**Human operators** who need to unblock a halted loop must: review `HUMAN_NEEDED.md`, make the
decision, delete the file, and optionally set `autonomy_pass: true` on the relevant mission before
running `resume.mjs`.

---

## 10. Principles

- **Minimum authority.** Each role and each agent acts only within its declared scope. Overreach is
  a process failure, not initiative.
- **No role is vacant silently.** If a required approver is unavailable, authority escalates —
  it does not default to "proceed anyway."
- **Agents recommend; humans decide** on anything outside the agent's pre-authorized scope.
- **Traceability.** Every decision that crosses an approval gate must be logged (mission frontmatter,
  `decisions.md`, or a dated entry in the relevant doc) with the approver role and date.
- **When in doubt, halt.** The cost of a bad autonomous action exceeds the cost of a brief pause.
