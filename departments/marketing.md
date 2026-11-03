# Department: Marketing

## C-suite Owner

**CMO** — owns demand generation, the acquisition motion, marketing-sourced pipeline, and positioning.

## Lead

**[Head of Marketing](../docs/agents/head-of-marketing.md)** — executes demand-generation campaigns, content strategy, and channel management under the CMO.

## IC Roles (Team)

| Role | Agent doc | Responsibility at 10–50 customers |
|---|---|---|
| Content Writer | [docs/agents/mkt-content-writer.md](../docs/agents/mkt-content-writer.md) | Portuguese-first content for WhatsApp/Instagram-native audience, SEO, nurture sequences |

## OKRs Owned

From `okrs/q4-corporate.md`:

- **KR2.1** — Prove a repeatable acquisition motion: one documented motion + ≥ 2 same-motion wins (Owner: CMO)
- **KR2.2** (contributing) — CAC payback ≤ 3 months: Marketing must keep GTM spend within the CFO-set CAC budget (Owner: CFO; CMO is R for spend discipline)
- **KR2.4** (contributing) — Pricing framing: CMO is **R** for willingness-to-pay positioning (Owner: CEO → CFO economics)

## Processes Owned

From `raci-matrix.md`:

- **GTM** (`processes/gtm.md`) — CMO is **R** for the go-to-market launch motion under CPO's product-launch accountability
- **Pricing & packaging** — CMO is **R** for framing/positioning

---

## New Marketing Agents (Wave 2)

The following 9 agents extend the marketing department's capability beyond the founding CMO + Head of Marketing + Content Writer team. They are organized into two sub-trees under the Head of Marketing, plus two horizontal IC roles.

### Content sub-tree (under Content Manager)

The Content Manager coordinates all content production and routes assets through the correct approval path. The existing Content Writer now reports to the Content Manager.

| Role | Agent files | Responsibility |
|---|---|---|
| **Content Manager** | [.claude/agents/mkt-content-manager.md](../.claude/agents/mkt-content-manager.md) · [docs/agents/mkt-content-manager.md](../docs/agents/mkt-content-manager.md) | Owns editorial calendar; coordinates mkt-content-writer, mkt-customer-story-writer, mkt-landing-page-agent, mkt-geo-agent; routes all assets for approval |
| **Customer Story Writer** | [.claude/agents/mkt-customer-story-writer.md](../.claude/agents/mkt-customer-story-writer.md) · [docs/agents/mkt-customer-story-writer.md](../docs/agents/mkt-customer-story-writer.md) | Turns real Bevox customers (physiotherapy, pilates, aesthetics) into three-format case studies. **Hard gate: halts before publication and waits for Bernard's written approval** (LGPD — real customer names). |
| **Landing Page Agent** | [.claude/agents/mkt-landing-page-agent.md](../.claude/agents/mkt-landing-page-agent.md) · [docs/agents/mkt-landing-page-agent.md](../docs/agents/mkt-landing-page-agent.md) | Writes conversion copy for per-vertical landing pages (example.com/fisioterapia, /pilates, /estetica). Pain points sourced from mkt-market-intelligence. |
| **GEO Agent** | [.claude/agents/mkt-geo-agent.md](../.claude/agents/mkt-geo-agent.md) · [docs/agents/mkt-geo-agent.md](../docs/agents/mkt-geo-agent.md) | Monitors and improves Bevox's presence in ChatGPT, Perplexity, and Gemini answers for Brazilian clinic-owner queries. Runs bi-weekly probes; issues content briefs to mkt-content-manager for gaps. |

### Paid media sub-tree (under Paid Media Agent)

The Paid Media Agent cannot activate any campaign until ≥3 Bernard-approved case studies are published. This gate is enforced by the Paid Media Agent before any campaign activation.

| Role | Agent files | Responsibility |
|---|---|---|
| **Paid Media Agent** | [.claude/agents/mkt-paid-media-agent.md](../.claude/agents/mkt-paid-media-agent.md) · [docs/agents/mkt-paid-media-agent.md](../docs/agents/mkt-paid-media-agent.md) | Orchestrates Instagram/Meta Ads by vertical. Owns campaign structure, creative briefs to mkt-ad-creative-strategist, budget allocation proposals to Head of Marketing. **Gate: ≥3 published case studies to activate first campaign; ≥5 for second vertical.** |
| **Ad Creative Strategist** | [.claude/agents/mkt-ad-creative-strategist.md](../.claude/agents/mkt-ad-creative-strategist.md) · [docs/agents/mkt-ad-creative-strategist.md](../docs/agents/mkt-ad-creative-strategist.md) | Creates ad creative variants per vertical with explicit A/B hypotheses (pain angle / outcome angle / social proof angle). Outcome variants require a published case study. |
| **Campaign Manager** | [.claude/agents/mkt-campaign-manager.md](../.claude/agents/mkt-campaign-manager.md) · [docs/agents/mkt-campaign-manager.md](../docs/agents/mkt-campaign-manager.md) | Weekly ops: adjusts budget within threshold (≤15% / R$300/day unilateral); identifies waste; escalates above threshold to Paid Media Agent. Produces Friday ops report. |

### Horizontal IC roles (report directly to Head of Marketing)

| Role | Agent files | Responsibility |
|---|---|---|
| **Marketing Analytics** | [.claude/agents/mkt-marketing-analytics.md](../.claude/agents/mkt-marketing-analytics.md) · [docs/agents/mkt-marketing-analytics.md](../docs/agents/mkt-marketing-analytics.md) | Weekly aggregator (NOT product analytics — that is data-analyst). Collects reports from mkt-content-manager, mkt-paid-media-agent, and mkt-market-intelligence every Friday; produces single consolidated document for CMO; sends ≤150-word brief to Bernard. |
| **Market Intelligence** | [.claude/agents/mkt-market-intelligence.md](../.claude/agents/mkt-market-intelligence.md) · [docs/agents/mkt-market-intelligence.md](../docs/agents/mkt-market-intelligence.md) | Monitors Ninsaúde, iClinic, Doctoralia, vertical search volume, Brazilian SMB communities, and LLM presence weekly. On detecting a significant expansion opportunity (new vertical or technology licensing), builds structured opportunity report and routes to CEO — **never decides, only surfaces**. |

### Key cross-agent rules

1. **Case-study publication gate:** Customer Story Writer halts before any publish → writes `HUMAN_NEEDED.md` → waits for Bernard's written approval. This applies to every channel (Instagram, portfolio, sales deck, external share).

2. **Paid media activation gate:** Paid Media Agent reads `docs/marketing/case-studies/` and confirms ≥3 published (Bernard-approved) case studies before activating the first campaign. ≥5 for second vertical. No workarounds.

3. **Campaign budget authority ladder:** Campaign Manager: ≤15% / R$300/day (unilateral) → Paid Media Agent: >R$300/day or >15% → Head of Marketing: >R$1k/day → CMO → Bernard (configured cap).

4. **Expansion opportunity path:** Market Intelligence detects signal → builds structured report → writes `HUMAN_NEEDED.md` → Tasks the CEO agent. The Head of Marketing and CMO are informed but do not own the expansion decision.

5. **Analytics scope boundary:** Marketing Analytics handles marketing performance reporting. data-analyst.md handles product analytics (activation, TTV, WAU/MAU, Postgres queries). These two must not overlap.

6. **Visual-asset handoff to Design:** For visual assets (Instagram Reels/posts, LinkedIn, site narratives), mkt-content-manager briefs **design-visual-storyteller** (design department, under Head of Product) and remains the **acceptance owner** of the final delivery — the asset serves the editorial calendar. Design returns the asset after its own gates: design-brand-guardian (brand audit) and, for any human representation, design-inclusive-visuals (mandatory review; a human image without it is blocked). This handoff is codified in `raci-matrix.md` D3/D4 and detailed in `departments/design.md`.
