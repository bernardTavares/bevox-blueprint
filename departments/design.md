# Department: Design

## C-suite Owner

**CPO** — owns what we build and why; the design department serves activation, time-to-value, and cohort retention through the quality of every Bevox surface and every customer-facing asset.

## Lead

**[Head of Product](../docs/agents/head-of-product.md)** — all design agents report here (with two consult/dotted lines noted below). Design sits under Product: the "customer" of design is the Bevox product itself (bevox-mobile, bevox-web, bevox-site, bevox-console) plus the marketing department (Instagram assets, per-vertical landing pages, campaign materials).

## Mission

Give every Bevox surface and every customer-facing asset a single, coherent, accessible, on-brand design language, built on one technical foundation and produced through gates that protect brand identity and authentic Brazilian representation. Design is not an external agency serving clients — it serves the Bevox product and the marketing function. The end user is a Brazilian clinic/studio owner: mobile-first, WhatsApp/Instagram-native, Portuguese-first, low tolerance for complexity. **Right-sized for post-PMF (10–50 customers) — no design-ops bloat.**

## Existing IC (already in the Product department)

**[Product Designer](../docs/agents/product-designer.md)** — owns discovery and product flow (UX review, critique, onboarding-flow design, WhatsApp template UX, research synthesis). The new design agents integrate with it without overlap; the split with design-ui-designer is defined explicitly (discovery/flow vs. visual-component execution). `product-designer.md` is unchanged.

## Design Agents (new)

Eight agents under the Head of Product, organized as a foundation-first pipeline with three continuous review gates.

### Foundation and product surfaces

| Role | Agent files | Responsibility |
|---|---|---|
| **UX Architect** | [.claude/agents/design-ux-architect.md](../.claude/agents/design-ux-architect.md) · [docs/agents/design-ux-architect.md](../docs/agents/design-ux-architect.md) | Technical design foundation: design system, tokens, grid, component patterns, IA (Tailwind+shadcn/ui web; Expo/RN mobile). **No design agent ships a final asset before the foundation exists.** Token/grid changes require a Head of Engineering consult (code impact). |
| **UX Researcher** | [.claude/agents/design-ux-researcher.md](../.claude/agents/design-ux-researcher.md) · [docs/agents/design-ux-researcher.md](../docs/agents/design-ux-researcher.md) | User research against the four Bevox personas (owner/manager, attending professional, human operator, AI secretary). Delivers personas, journeys, prioritized recs. Feeds design agents and routes marketing-relevant pain to mkt-market-intelligence. |
| **UI Designer** | [.claude/agents/design-ui-designer.md](../.claude/agents/design-ui-designer.md) · [docs/agents/design-ui-designer.md](../docs/agents/design-ui-designer.md) | Turns foundation + brand into concrete components with dev-ready specs (shadcn/ui web; RN mobile). **Accessibility mandatory on every component.** Split with product-designer: product-designer = discovery/flow; ui-designer = visual-component execution. |

### Storytelling and generated imagery

| Role | Agent files | Responsibility |
|---|---|---|
| **Visual Storyteller** | [.claude/agents/design-visual-storyteller.md](../.claude/agents/design-visual-storyteller.md) · [docs/agents/design-visual-storyteller.md](../docs/agents/design-visual-storyteller.md) | Turns features/results into visual narratives for Bevox channels (Instagram Reels/posts, LinkedIn, site). Primary interface with marketing: receives briefs from mkt-content-manager, returns assets. **Dotted line to mkt-content-manager.** |
| **Image Prompt Engineer** | [.claude/agents/design-image-prompt-engineer.md](../.claude/agents/design-image-prompt-engineer.md) · [docs/agents/design-image-prompt-engineer.md](../docs/agents/design-image-prompt-engineer.md) | Structured prompts for AI image generation; holds visual consistency across a campaign. **Every human-representation prompt passes design-inclusive-visuals before generation.** Reports to design-visual-storyteller. |

### Continuous review gates (horizontal)

| Role | Agent files | Responsibility |
|---|---|---|
| **Brand Guardian** | [.claude/agents/design-brand-guardian.md](../.claude/agents/design-brand-guardian.md) · [docs/agents/design-brand-guardian.md](../docs/agents/design-brand-guardian.md) | Guards palette, typography, voice/tone (competent human secretary, never a robot; Portuguese-first). **Audits all design and marketing output; may veto any asset from any department that violates identity — veto logged in `docs/operations/decisions-log.md`.** Consult line to CMO for brand-in-marketing. |
| **Inclusive Visuals** | [.claude/agents/design-inclusive-visuals.md](../.claude/agents/design-inclusive-visuals.md) · [docs/agents/design-inclusive-visuals.md](../docs/agents/design-inclusive-visuals.md) | Mandatory review of any image with human representation before approval/generation; 7-point checklist; Brazilian-diversity context. **Hard rule: a human image without this review is BLOCKED.** |
| **Persona Walkthrough** | [.claude/agents/design-persona-walkthrough.md](../.claude/agents/design-persona-walkthrough.md) · [docs/agents/design-persona-walkthrough.md](../docs/agents/design-persona-walkthrough.md) | Simulates the four personas navigating interfaces, surfacing friction analytics misses. Complementary to ux-researcher (real data vs. deep simulation). **Called on every new/changed interface.** |

## Workflow

The department runs a foundation-first pipeline. No stage skips the one before it:

```
briefing → research (ux-researcher) → brand (brand-guardian) → architecture (ux-architect)
        → UI (ui-designer) → storytelling (visual-storyteller) → image gen (image-prompt-engineer)
        → inclusive review (inclusive-visuals)
```

- **Product-surface work** flows research → architecture (foundation) → UI, walked by persona-walkthrough, audited by brand-guardian.
- **Marketing-asset work** enters via mkt-content-manager → visual-storyteller → (image-prompt-engineer → inclusive-visuals for people) → brand-guardian audit → returned to mkt-content-manager (acceptance owner).

## Three continuous review agents (always-on gates)

1. **Brand Guardian audits everything.** No visual asset — from any design or marketing agent — is approved without a brand audit. It may veto any violating asset company-wide; every veto is logged in `docs/operations/decisions-log.md`.
2. **Persona Walkthrough evaluates every interface.** Any new or changed interface gets a simulated walkthrough of the four personas before it is considered done.
3. **Inclusive Visuals reviews every image with people.** Any human representation passes the 7-point checklist before generation (for AI imagery, the *prompt* is reviewed pre-generation) and before approval. A human image without this review is blocked — no exception.

## Cross-agent rules

1. **Foundation gate:** no design agent ships a final asset for a surface before design-ux-architect has established that surface's foundation in `docs/design/`. (design-ui-designer, design-visual-storyteller, product-designer all depend on it.)
2. **Design-system → engineering consult:** design-ux-architect changes to tokens or grid require a Head of Engineering consult (code impact) before finalizing — RACI D1.
3. **Brand veto (company-wide):** design-brand-guardian may veto any asset from any department that violates the identity; veto recorded in `docs/operations/decisions-log.md`. Brand-vs-performance tensions in marketing → guardian consults CMO.
4. **Inclusive-visuals block (hard):** any image with human representation without design-inclusive-visuals review is BLOCKED — pre-generation for AI imagery, pre-approval for any asset. Internal equivalent of the mkt-customer-story-writer HUMAN_NEEDED gate.
5. **Marketing-asset handoff:** mkt-content-manager → design-visual-storyteller for visual assets; design returns to mkt-content-manager as the acceptance owner of the final delivery (RACI D3).
6. **product-designer / design-ui-designer split:** product-designer owns discovery and product flow; design-ui-designer owns visual-component execution. No overlap; `product-designer.md` unchanged.
7. **Real-customer imagery:** never source or generate a real customer's likeness; customer stories run through the Bernard-approved mkt-customer-story-writer case-study gate.

## OKRs Contributed To

From `okrs/q4-corporate.md` (Product department owns these; design contributes through surface quality):

- **KR2.3** — Activation rate ≥ 70%, time-to-value trending down (design reduces onboarding/UI friction).
- **KR1.4** — Cohort retention improving cohort-over-cohort (design quality and clarity aid retention).

## Processes Owned

Design operations are codified in `raci-matrix.md` as sub-processes **D1–D5**:

- **D1** Design-system change (tokens/grid) — A: Head of Product; Head of Engineering consulted (code impact).
- **D2** New-component creation — A: Head of Product; brand-guardian + ux-architect consulted.
- **D3** Marketing-asset production — A: Head of Product; mkt-content-manager is acceptance owner of final delivery.
- **D4** Image generation with humans — A: Head of Product; design-inclusive-visuals review is mandatory.
- **D5** Interface review — A: Head of Product; design-persona-walkthrough runs on every new/changed interface.

## Deferred (not created)

- **Whimsy Injector** — **deferred.** Low priority in the original mapping and not justified at post-PMF, 10–50 customers (right-sizing per `.loop/objective.md` and `charter.md` stage-honest speed). Micro-delight polish does not earn a dedicated agent seat at this stage; revisit when the customer base and surface count grow. If needed before then, it is absorbed as a lightweight concern of design-ui-designer, not a standalone role.

---

*Grounding:* department serves Product (CPO → Head of Product per `org-chart.md`); the four personas, ICP, and Brazilian/Portuguese-first context from `charter.md`; stage discipline and right-sizing (Whimsy Injector deferred) from `charter.md` (stage-honest speed) and `.loop/objective.md`. Continuous-gate model and D1–D5 accountability from `raci-matrix.md`. Marketing handoff from `departments/marketing.md`. Foundation-first, brand-veto, and inclusive-block hard rules codified in the respective agent specs.
