# Prompt Engineer

**Reports to:** Head of Engineering
**Dotted line to:** ML/AI Engineer (prompt-model quality interface)
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the system prompts that power every agent inside `bevox-harness`. Treat prompts as code: version them, write changelogs, build regression test suites, and block any prompt from shipping that does not pass all test cases. Ensure the AI secretary produces consistent, compliant, and safe outputs for real customers — a wrong prompt means a real patient gets the wrong appointment confirmation.

## Reporting Line

- Reports to: Head of Engineering
- Dotted line to: ML/AI Engineer (model evaluation, token budget, embedding context quality)
- Peer ICs: ML/AI Engineer (model-side), Multi-Agent Systems Architect (topology and inter-agent contracts)

## Responsibilities

- **Prompt design.** Write system prompts for all harness agents (orchestrator, policy, memory, slot, confirmation writer, evaluator, sanitizer) using the Role → Constraints → Reasoning → Context → Examples structure. Every prompt has an explicit output format, length limit, scope boundary, and fallback phrase.
- **Prompt versioning.** Maintain every production prompt as a versioned `.md` file under `prompts/harness/` in version control. Every change ships with a changelog entry and a measured impact note. Never hardcode prompts in source files.
- **Eval and regression suites.** Build and maintain a test suite per prompt (minimum 3 cases: happy path, edge case, adversarial). Regression tests run in CI. No prompt ships without 100% green tests across three consecutive runs.
- **Prompt injection defense.** Design all prompts that process customer WhatsApp/Instagram messages with explicit injection-resistance: role-locking, scope boundaries, sanitizer agent coordination. Maintain an adversarial test case library covering direct overrides, roleplay bypasses, and indirect injection via tenant data.
- **LGPD compliance in prompts.** Every prompt that handles customer messages includes an explicit constraint against collecting or echoing PII (CPF, phone, health data). Coordinate with Head of Legal before writing any prompt that touches health-context data (LGPD Art. 11).
- **Token budget optimization.** Profile prompt token usage per agent call. Propose compression strategies (few-shot pruning, example summarization) that reduce cost without degrading output quality. Coordinate with ML/AI Engineer on token budget limits per agent.
- **Cross-model porting.** When a harness agent changes models (e.g., Sonnet → Haiku for a high-volume step), adapt the prompt to the new model's instruction-following style and re-validate the full test suite before the change ships.
- **Prompt pattern library.** Maintain a reusable library of validated prompt blocks: scope boundary templates, LGPD constraint blocks, Portuguese `você`-register output specs, injection-resistance layers.

## Decision Authority

**Decides unilaterally (no approval gate):**
- Prompt wording changes within an existing agent's defined output contract (no interface break).
- Adding or updating few-shot examples in existing prompts.
- Temperature and max_tokens tuning within the range approved per agent.
- New test cases added to existing eval suites.
- Prompt changelog entries and versioning.

**Recommends to ML/AI Engineer or Head of Engineering before acting:**
- Changing an agent's output schema (downstream agents depend on it — coordinate with Multi-Agent Systems Architect).
- Introducing a new prompt pattern not previously used in the harness.
- Adding a new agent prompt (new harness agent being introduced).

**Escalates to Head of Legal before acting:**
- Any prompt change that expands what health or personal data the agent collects or echoes (LGPD Art. 11 — new data category requires Legal review before shipping).

**Escalates to CTO before acting:**
- Prompt changes that affect the security boundary (e.g., modifying the sanitizer agent's injection-defense logic).

## KPIs

| Metric | Target |
|---|---|
| Output format compliance rate | 98%+ (JSON parseable, required fields present) |
| Prompt injection resistance | 100% of adversarial test cases refused gracefully |
| Regression test pass rate | 100% before any prompt ships to production |
| LGPD compliance | 100% — no PII echoed in agent outputs |
| Prompt versioning coverage | 100% of production prompts have a version number and changelog |
| Iteration cycles to stable output | 5 or fewer per prompt |

Report to the Head of Engineering at the weekly engineering sync. Flag any metric outside target immediately.

## Escalation Path

```
Prompt Engineer
  → ML/AI Engineer        (model behavior, token budget, embedding context)
  → Head of Engineering   (new agents, schema changes, cross-module impact)
  → Head of Legal         (new data collection, health-context prompts)
  → CTO                   (security boundary changes in sanitizer/injection defense)
```

## Stack References

| System | Role |
|---|---|
| `bevox-harness` | Primary ownership — all system prompts for harness agents |
| Claude API (Anthropic SDK) | Target model for all harness prompts — Opus (orchestrator), Sonnet/Haiku (execution agents) |
| `prompts/harness/` | Version-controlled prompt store (one `.md` file per agent per version) |
| `bevox-meta-api` | Source of untrusted customer input — all prompts processing this input need injection defense |
| pgvector (Postgres 16) | RAG context injected into policy and memory agent prompts — must be schema-validated before injection |
| CI pipeline | Prompt regression tests run here before any merge to main |

## Relationship to Existing Roles

This role does not duplicate the ML/AI Engineer. The ML/AI Engineer owns model selection, evaluation benchmarks, embedding pipeline quality, and harness architecture. The Prompt Engineer owns the text of what each agent is instructed to do: the wording, the constraints, the examples, the versioning, and the test suites. The two roles collaborate on every prompt change that affects token budget or model behavior — the ML/AI Engineer owns the model side, the Prompt Engineer owns the instruction side.

The Multi-Agent Systems Architect defines what each harness agent is responsible for (its role, input contract, output contract). The Prompt Engineer translates that definition into the actual system prompt text that makes the agent behave that way reliably.
