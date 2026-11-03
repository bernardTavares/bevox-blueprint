---
arch_version: 2
generated_at: 2026-07-01T12:43:00.000Z
objective_hash: 9d95b59f3e65cc688baf15390300bd650ebcc291d137805423300161613d52ef
status: active
phase_emitted: 4
mission_count_this_run: 14
cap: 20

# Diagnostic ground truth (verified 2026-07-01 pre-rerun):
#   Phases 1-3 complete and merged into target main (18 Phase-1 missions + backlog).
#   4 cron-agents (digester-okr, monitor-runway, monitor-churn, sensor-competitor)
#     were merged into claude-loop-template, NOT copied to target .claude/agents/ — created here.
#   10 mkt-* agents added manually to target outside the loop; EXIST — wired, never recreated.
#   5 marketing MCP servers configured in .claude/settings.json and documented in
#     docs/integrations/mcp-marketing.md — EXIST, referenced in cron declarations below.
#   docs/operations/ and .loop/state/ absent — operational state layer bootstrapped here.
#   Phase shift: loop moves from BUILD (constructing the blueprint) to OPERATE (running the company).

capabilities:
  - name: cron-agent-instantiation
    sensing: arch_v1 crons_to_create declared 4 cron-agents with agent_status NEEDS_BUILD; target .claude/agents/ confirmed missing all 4 (2026-07-01 ls); 10 mkt-* agents confirmed EXISTS in target
    decision: create 4 missing cron-agent files (dual-output .claude/agents/ + docs/agents/) so their crons become instantiable; detect and wire existing mkt-* agents directly into cron declarations without recreating any file
    actuation: 4 × dual-output agent missions; crons_to_create[] sets agent_status:EXISTS for all 9 new crons after agents are built
    memory: .claude/agents/<role>.md is the source of truth for scheduler dispatch; docs/agents/<role>.md is the prose mirror for human browsing
    escalation: none at creation time; each cron's runtime escalation is defined in its operating instructions and routes through decision-authority.md
    primary_kind: deliverable
    confidence: high
    source: architecture-backlog.md:26-31 (cron-agent build specs), .loop/strategy.md:7-18 (Phase-3 cron status RESOLVED but agents absent from target)

  - name: operational-state-layer
    sensing: docs/operations/ absent; .loop/backlog.md served construction-mode planning; operation mode requires a different working-memory structure (what ran, what escalated, what's pending human decision, cron health)
    decision: bootstrap docs/operations/ as the orchestrator's operational context — replacing backlog.md as the primary working-memory surface once all Phase-4 missions are delivered
    actuation: docs/operations/README.md + cron-run-log.md + escalations-pending.md + decisions-log.md + cron-health.md + escalation-protocol.md + marketing/ subfolder (3 files)
    memory: each cron writes its run outcome to cron-run-log.md; escalating crons write to escalations-pending.md; orchestrator reads docs/operations/ in operation mode
    escalation: none at bootstrap; individual cron escalation defined per agent + decision-authority.md
    primary_kind: deliverable
    confidence: high
    source: architecture.md:56-64 (continuous-operation capability, deferred to later phase), decision-authority.md (escalation protocol obligations)

  - name: marketing-operational-layer
    sensing: 10 mkt-* agents EXIST but no crons declared for any of them; mkt-campaign-manager has a GATED rule (>=3 published case studies) requiring a register in operational state; mkt-marketing-analytics is the weekly aggregator that produces the CMO + Bernard brief
    decision: declare 5 marketing crons (Thu intelligence sweep, biweekly GEO probe, Fri analytics rollup, Mon content ops, Mon campaign ops GATED); bootstrap docs/operations/marketing/ with the 3 state files agents need to read at each run
    actuation: 5 cron entries in crons_to_create[] + docs/operations/marketing/ (case-study-pipeline, campaign-state, content-calendar)
    memory: docs/operations/marketing/case-study-pipeline.md is the GATE register that mkt-campaign-manager reads before activating any campaign — must show >=3 published before any paid media runs
    escalation: mkt-market-intelligence routes expansion opportunities to CEO per decision-authority.md; mkt-campaign-manager routes threshold breaches to mkt-paid-media-agent; any campaign activation attempt before gate clears writes HUMAN_NEEDED.md
    primary_kind: deliverable
    confidence: high
    source: .claude/agents/mkt-campaign-manager.md (GATED rule + budget threshold), .claude/agents/mkt-market-intelligence.md (escalation path), docs/integrations/mcp-marketing.md (verified MCP config)

  - name: cross-department-cron-wiring
    sensing: 4 cross-dept crons declared in arch_v1 with agent_status NEEDS_BUILD; agents built in this phase → status changes to EXISTS; schedules from arch_v1 are correct, carry forward unchanged
    decision: re-declare all 4 with agent_status:EXISTS; update depends_on to reference Phase-4 agent-creation missions; confirm each cron writes its outcome to docs/operations/ on every run
    actuation: 4 cron entries in crons_to_create[] carrying forward arch_v1 schedules
    memory: cron-run-log.md records every tick; escalations-pending.md accumulates human-decision items until Bernard clears them
    escalation: digester-okr → CEO for KRs >15% off track; monitor-runway → CFO+CEO if runway <4 months (warning) or <2 months (critical, HUMAN_NEEDED.md); monitor-churn → Head of CS for at-risk accounts; sensor-competitor → CMO+mkt-market-intelligence immediately if competitor announces AI-secretary+WhatsApp+payments feature
    primary_kind: deliverable
    confidence: high
    source: architecture.md:118-125 (arch_v1 cron declarations with original schedules), decision-authority.md (role authority + escalation path per trigger)

agents_to_create:
  - {name: digester-okr,      model: sonnet, scope_paths: [.claude/agents/digester-okr.md, docs/agents/digester-okr.md],           phase: 4}
  - {name: monitor-runway,    model: sonnet, scope_paths: [.claude/agents/monitor-runway.md, docs/agents/monitor-runway.md],         phase: 4}
  - {name: monitor-churn,     model: sonnet, scope_paths: [.claude/agents/monitor-churn.md, docs/agents/monitor-churn.md],           phase: 4}
  - {name: sensor-competitor, model: sonnet, scope_paths: [.claude/agents/sensor-competitor.md, docs/agents/sensor-competitor.md],   phase: 4}

# Crons from arch_v1 that already exist and remain active unchanged:
#   code-validation (code-validator), improvement-hunting (improvement-hunter),
#   consistency-checker (improvement-hunter) — not re-declared here, no change.
crons_to_create:
  # Cross-department operational crons — carry-over from arch_v1; agents now built in Phase 4
  - {id: weekly-okr-review,  schedule: "5 9 * * 1",    role: digester-okr,      prompt_template: weekly-okr-review,           reason: "CEO duty: Mon 09:05 — digest OKR progress from okrs/q4-corporate.md, identify at-risk KRs, emit correction missions, write outcome to docs/operations/cron-run-log.md",   depends_on: [digester-okr-agent],      agent_status: EXISTS}
  - {id: runway-check,       schedule: "9 8 * * *",    role: monitor-runway,    prompt_template: runway-check,                reason: "CFO duty: 08:09 daily — read Stripe balance via stripe MCP + monthly burn from docs/finance/; compute runway months; write report; HUMAN_NEEDED.md if <4-month warning or <2-month critical", depends_on: [monitor-runway-agent],    agent_status: EXISTS}
  - {id: churn-risk-scan,    schedule: "31 7 * * *",   role: monitor-churn,     prompt_template: churn-risk-scan,             reason: "Head-of-CS duty: 07:31 daily — scan customer health signals, identify at-risk accounts, emit outreach missions, write summary to docs/operations/cron-run-log.md",   depends_on: [monitor-churn-agent],     agent_status: EXISTS}
  - {id: competitor-watch,   schedule: "29 9 * * 1,4", role: sensor-competitor, prompt_template: competitor-watch,            reason: "CMO duty: Mon+Thu 09:29 — scan Ninsaúde/iClinic/Doctoralia public signals, produce intelligence brief, route to CMO + mkt-market-intelligence; HUMAN_NEEDED.md on AI-secretary feature announcement", depends_on: [sensor-competitor-agent], agent_status: EXISTS}
  # Marketing operational crons — mkt-* agents EXIST (verified 2026-07-01)
  - {id: mkt-market-intelligence-weekly, schedule: "0 9 * * 4",    role: mkt-market-intelligence, prompt_template: mkt-market-intelligence-weekly, reason: "Thu 09:00 — competitor/search/community/LLM sweep → structured report to docs/marketing/intelligence/ → notify mkt-marketing-analytics", depends_on: [], agent_status: EXISTS}
  - {id: mkt-geo-probe-biweekly,         schedule: "0 10 1,15 * *", role: mkt-geo-agent,           prompt_template: mkt-geo-probe-biweekly,         reason: "1st+15th of month 10:00 — LLM presence probes (ChatGPT via openai MCP, Perplexity via perplexity MCP, Gemini manual) → geo-probe-log.md → notify mkt-content-manager", depends_on: [], agent_status: EXISTS}
  - {id: mkt-marketing-analytics-friday, schedule: "0 14 * * 5",   role: mkt-marketing-analytics, prompt_template: mkt-marketing-analytics-friday, reason: "Fri 14:00 — aggregate mkt-content-manager + mkt-campaign-manager + mkt-market-intelligence reports → consolidated report + Bernard brief (<=150 words, 3 bullets, Portuguese)", depends_on: [], agent_status: EXISTS}
  - {id: mkt-content-manager-weekly,     schedule: "0 8 * * 1",    role: mkt-content-manager,     prompt_template: mkt-content-manager-weekly,     reason: "Mon 08:00 — receive CMO brief for the week, read docs/operations/marketing/content-calendar.md, distribute content tasks to mkt-content-writer and mkt-customer-story-writer", depends_on: [], agent_status: EXISTS}
  - {id: mkt-campaign-manager-weekly,    schedule: "30 8 * * 1",   role: mkt-campaign-manager,    prompt_template: mkt-campaign-manager-weekly,    reason: "Mon 08:30 — read docs/operations/marketing/case-study-pipeline.md; if published_case_studies < 3 log noop and halt; else run active-campaign budget pacing + waste audit via meta-ads MCP", depends_on: [], agent_status: EXISTS}

deliverables_to_create:
  # Cron-agent dual-output pairs
  - {path: ".claude/agents/digester-okr.md + docs/agents/digester-okr.md",           kind: deliverable, owner_agent: ceo,                   depends_on: [], phase: 4}
  - {path: ".claude/agents/monitor-runway.md + docs/agents/monitor-runway.md",         kind: deliverable, owner_agent: cfo,                   depends_on: [], phase: 4}
  - {path: ".claude/agents/monitor-churn.md + docs/agents/monitor-churn.md",           kind: deliverable, owner_agent: head-of-customer-success, depends_on: [], phase: 4}
  - {path: ".claude/agents/sensor-competitor.md + docs/agents/sensor-competitor.md",   kind: deliverable, owner_agent: cmo,                   depends_on: [], phase: 4}
  # Operational state layer
  - {path: "docs/operations/README.md",              kind: deliverable, owner_agent: coo, depends_on: [],                         phase: 4}
  - {path: "docs/operations/cron-run-log.md",        kind: deliverable, owner_agent: coo, depends_on: [docs/operations/README.md], phase: 4}
  - {path: "docs/operations/escalations-pending.md", kind: deliverable, owner_agent: coo, depends_on: [docs/operations/README.md], phase: 4}
  - {path: "docs/operations/decisions-log.md",       kind: deliverable, owner_agent: coo, depends_on: [docs/operations/README.md], phase: 4}
  - {path: "docs/operations/cron-health.md",         kind: deliverable, owner_agent: coo, depends_on: [docs/operations/README.md], phase: 4}
  - {path: "docs/operations/escalation-protocol.md", kind: deliverable, owner_agent: coo, depends_on: [decision-authority.md],     phase: 4}
  # Marketing operational state
  - {path: "docs/operations/marketing/case-study-pipeline.md", kind: deliverable, owner_agent: mkt-content-manager,  depends_on: [], phase: 4}
  - {path: "docs/operations/marketing/campaign-state.md",      kind: deliverable, owner_agent: mkt-campaign-manager, depends_on: [], phase: 4}
  - {path: "docs/operations/marketing/content-calendar.md",    kind: deliverable, owner_agent: mkt-content-manager,  depends_on: [], phase: 4}
  # Phase advance
  - {path: ".loop/strategy.md",                      kind: deliverable, owner_agent: coo, depends_on: [all-phase-4-agents, docs/operations/README.md], phase: 4}

external_systems:
  - {name: Stripe Connect,  auth: "STRIPE_SECRET_KEY via stripe MCP",                                        source: "docs/integrations/mcp-integrations.md:section-1"}
  - {name: Meta Ads API,    auth: "META_ADS_ACCESS_TOKEN + META_ADS_ACCOUNT_ID via meta-ads MCP (custom)",   source: "docs/integrations/mcp-marketing.md:section-1"}
  - {name: SerpAPI,         auth: "SERPAPI_KEY via serpapi MCP",                                              source: "docs/integrations/mcp-marketing.md:section-2"}
  - {name: Reddit API,      auth: "REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET via reddit MCP",                  source: "docs/integrations/mcp-marketing.md:section-3"}
  - {name: OpenAI,          auth: "OPENAI_API_KEY via openai MCP (GEO probes only — not product stack)",     source: "docs/integrations/mcp-marketing.md:section-5"}
  - {name: Perplexity,      auth: "PERPLEXITY_API_KEY via perplexity MCP (GEO probes only)",                 source: "docs/integrations/mcp-marketing.md:section-5"}

open_questions:
  - {q: "bevox-site CMS platform not identified in charter.md or strategy.md — cms-site MCP is a placeholder; Bernard must confirm CMS before mkt-landing-page-agent can publish autonomously", owner: bernard, blocking: [cms-site MCP build, mkt-landing-page-agent autonomous publishing]}
