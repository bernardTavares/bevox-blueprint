# BEVOX — RACI Matrix

This matrix is the single source of truth for **who owns what** across BEVOX's seven key processes. It consumes `org-chart.md` (the role roster and reporting lines) and `charter.md` (stage and operating principle), and it is the dependency root for every document under `processes/`. When a process doc needs to know "who is accountable, who does the work, who is consulted, who is merely told," the answer lives here first.

## What RACI means here

| Letter | Meaning | Rule at BEVOX |
|---|---|---|
| **R** — Responsible | Does the work, end to end | One or more roles. The agent(s) that actually execute. |
| **A** — Accountable | Owns the outcome; the single neck on the line | **Exactly one per process.** Casts the final call and answers for the result. |
| **C** — Consulted | Two-way input before the decision lands | Opinion is sought; can shape the outcome but does not own it. |
| **I** — Informed | One-way notification after the fact | Told the result; no veto, no required input. |

Two structural rules hold across the whole matrix:

1. **Exactly one A per process.** If two roles think they are accountable, the process is broken — escalate to the CEO, who is the standing tie-breaker (`ceo.md` — Cross-VP dispute: CEO is the single, final tie-breaker).
2. **Stage honesty.** This matrix is sized for BEVOX *as it is*: post-PMF, 10–50 paying customers, a single human (Bernard) and a roster of agents. The department leads (Head of Engineering, Head of Customer Success, Head of Finance, Head of Legal, etc.) are **Phase 1b/2 planned** per the org chart — they appear in the matrix as the *delegate* who will carry the R once they exist, but **today their C-suite parent holds both the A and the R**. We do not invent accountability for roles that have not been instantiated yet.

## Roles in scope (columns)

From `org-chart.md`:

- **Bernard** — the single human / owner. Talks only to the CEO. Appears as **C** (consulted) or **I** (informed) on almost everything, and is the escalation target for the three gated decisions: irreversible, legal/regulatory, and over-the-spend-cap.
- **CEO** — owns the company outcome and is Bernard's single interface.
- **CTO** — codebase, platform reliability, security, LGPD technical controls, incident command.
- **CPO** — what we build and why; roadmap, pricing/packaging *model*.
- **CFO** — money in/out, unit economics, runway, and (with Head of Legal beneath it) legal/compliance risk.
- **CMO** — demand generation and revenue motion (Marketing + Sales ladder up here at this stage).
- **COO** — the company runs day to day: customer success, delivery, billing operations, process discipline.
- **CHRO** — the agent org itself and the first 1–3 human hires.
- **Dept leads (planned)** — Head of Engineering, Head of Product, Head of Marketing/Sales, Head of Customer Success, Head of Finance, Head of Legal, Head of People. Shown in the per-process detail as the future R-holder; **not yet instantiated**, so their C-suite parent currently carries the R.
- **Marketing Wave 2 roles** — Content Manager, Customer Story Writer, Landing Page Agent, GEO Agent, Paid Media Agent, Ad Creative Strategist, Campaign Manager, Marketing Analytics, Market Intelligence. These nine roles extend the marketing department under the Head of Marketing. Their RACI handoffs are defined in the Marketing operations sub-section below.
- **Finance fin- roles** — Financial Analyst, FP&A Manager, Tax Strategist, Accounts Payable Manager, Accounts Receivable Manager (under the CFO); Treasury Manager, Financial Controller (under the Head of Finance). These seven roles extend the finance department. Their RACI handoffs are defined in the Finance operations sub-section below.
- **Design design- roles** — UX Architect, UX Researcher, UI Designer, Brand Guardian, Visual Storyteller, Image Prompt Engineer, Inclusive Visuals, Persona Walkthrough. These eight roles form the design department under the Head of Product (Brand Guardian carries a consult line to the CMO; Visual Storyteller a dotted line to the Content Manager; Image Prompt Engineer reports to the Visual Storyteller). Their RACI handoffs are defined in the Design operations sub-section below.

## The matrix

Rows = the seven key processes. Columns = the roles. **A** = exactly one per row.

| Process | Bernard | CEO | CTO | CPO | CFO | CMO | COO | CHRO |
|---|---|---|---|---|---|---|---|---|
| **1. Strategy & OKRs** | I (final escalation) | **A** / R | C | C | C | C | C | C |
| **2. Hiring (open a role / first 1–3 humans)** | C / I (spend cap) | **A** | C | C | C | C | C | R |
| **3. Pricing & packaging** | I | **A** | C (cost/feasibility) | R (model) | R (economics, list price) | R (framing) | I | — |
| **4. Product launch** | I | C (go/no-go on company tradeoffs) | R (build, ship-safety veto) | **A** / R | C (margin impact) | R (GTM) | C (delivery/CS readiness) | I |
| **5. Incident response** | I (Sev1 + legal/breach) | I (C for Sev1) | **A** / R (incident commander) | I | C (if money/PSP impacted) | I | R (customer comms) | I |
| **6. Compliance & governance (LGPD)** | C / I (legal escalation) | I | R (technical controls) | I | **A** (via Head of Legal) | I | R (process/audit cadence) | C (agent-org governance) |
| **7. Billing & PSP operations** | I | I | R (Stripe Connect integrity, webhooks) | C (pricing model) | **A** | I | R (billing-incident handling) | — |

> "—" means the role has no defined RACI part in that process at the current stage. It is neither consulted nor informed by default; if that changes, the matrix changes first.

## Per-process detail and the seed it came from

Each process below names the **A** (single owner), the **R** executors, the consult/inform list, the **future delegate** that will carry the R once Phase 1b/2 leads exist, and the **process doc** it drives. The assignments are seeded from each role spec's "RACI handoffs" section, adapted to BEVOX's stage.

### 1. Strategy & OKRs
- **A:** CEO. **R:** CEO. **C:** all C-suite. **I:** Bernard (and the final escalation).
- *Seed:* `ceo.md` — "Strategy / OKRs: CEO is **A** and **R**; all C-suite are **C**; Bernard is **I** and the final escalation."
- *Drives doc:* **`processes/product-strategy.md`** — the cascade from company OKRs into product/strategy execution.

### 2. Hiring
- **A:** CEO owns the *decision to open a role* (and whether to make the first 1–3 human hires). **R:** CHRO runs the process end to end. **C:** the C-suite role whose function the hire lands in; **C/I:** Bernard, because human-hire spend can cross the budget cap → escalate.
- *Seed:* `ceo.md` — "Hiring: CEO **A** for the decision to open a role; CHRO **R** for running the process; Bernard **C/I**." CHRO owns the agent roster and first human hires per `org-chart.md`.
- *Future delegate:* **Head of People** (under CHRO) carries the R once instantiated; **today the CHRO holds both the decision-execution R and the operational mechanics.**
- *Drives doc:* **`processes/hiring.md`**.

### 3. Pricing & packaging
- **A:** CEO (final word on price). **R (split):** CPO owns the packaging *model/structure* (per-professional subscription + PSP fee, tiers, what's bundled vs. metered); CFO owns the *economics and list price* (margins, unit economics sign-off); CMO owns *framing/positioning*. **C:** CTO on infra cost.
- *Seed:* `ceo.md` — "Pricing/packaging: CEO **A**; CFO + CMO + CPO **R/C**." `cpo.md` — "CPO owns packaging *structure*, CFO owns the math … list prices with CFO, framing with CMO." `cto.md` — CTO advises on cost.
- *Drives doc:* contributes to **`processes/gtm.md`** (how pricing reaches market) and is referenced by `processes/product-strategy.md`.

### 4. Product launch
- **A:** CPO. **R:** CPO (decision), CTO (build + the "unsafe to ship" veto), CMO (the GTM launch motion). **C:** CEO (priority and go/no-go on *company-level* tradeoffs only), CFO (margin impact), COO (delivery + customer-success readiness). **I:** Bernard, CHRO.
- *Seed:* `ceo.md` — "Product launch: CPO **A/R**; CEO **C** (priority + go/no-go on company-level tradeoffs)." `cto.md` — "CPO Responsible/Accountable for the roadmap, CTO Consulted … veto only on 'unsafe to ship.'" `cpo.md` — CPO is the A on product direction.
- *Future delegate:* **Head of Product** (under CPO) and **Head of Engineering** (under CTO) carry execution R in Phase 2.
- *Drives doc:* **`processes/gtm.md`** (launch + go-to-market) with inputs from `processes/product-strategy.md`.

### 5. Incident response
- **A:** CTO — incident commander, with authority to roll back, disable features, or take the AI secretary off autonomous mode. **R:** CTO + engineering agents (mitigation); COO/CS (customer communication). **C:** CEO for Sev1 (and decides only company-level tradeoffs, e.g. pause a launch, public statement); CFO if money/PSP movement is impacted. **I:** CEO (routine), Bernard for Sev1 or any breach (the legal escalation), all others.
- *Seed:* `cto.md` — "Incident response: CTO is **A** (incident commander), engineering agents **R**, CEO **I** (and **C** for Sev1), CS/Support **I** for customer comms." `ceo.md` — "Incident: COO/CTO **A/R**; CEO **I** unless a company-level tradeoff is required." Resolved to a single **A = CTO** (technical command); COO carries the **R** for customer comms rather than a second A, satisfying the one-A rule.
- *Future delegate:* **Head of Engineering** (mitigation R) and **Head of Customer Success** (comms R).
- *Drives doc:* **`processes/billing-incidents.md`** (which covers incident handling, including payment incidents — see process 7).

### 6. Compliance & governance (LGPD)
- **A:** **CFO** — accountable for compliance/legal risk at this stage, exercised through the **Head of Legal**, who reports primarily to the CFO (`org-chart.md`: "LGPD compliance, contracts, payment-regulation risk all sit close to finance"). **R:** CTO for the *technical* controls that make compliance real (lawful-basis enforcement, data minimization, retention/deletion, breach response, tenant isolation, PCI-scope minimization); COO for the *process/audit cadence* and governance discipline. **C:** CHRO on agent-org governance; Bernard on legal escalation. **I:** CEO.
- *Seed:* `cto.md` — "Legal/People (Head of Legal): Consulted on LGPD interpretation … CTO is **Responsible** for the technical controls"; "Compliance & governance: CTO **Responsible** for technical and security controls; the governance process defines the audit cadence." `org-chart.md` — Head of Legal sits under CFO (A) with a dotted line to COO (process oversight, hence COO's R).
- *Why A = CFO (not Head of Legal):* the Head of Legal is a **planned** Phase 1b/2 role (`org-chart.md`). Until it exists, accountability rolls up to its C-suite parent, the **CFO**. When the Head of Legal agent lands, it carries the day-to-day R; the A may then sit with the Head of Legal under CFO oversight — at which point this matrix is updated.
- *Drives doc:* **`processes/governance.md`** (compliance, LGPD, audit cadence). `cto.md` explicitly points the governance audit cadence at `processes/governance.md`.

### 7. Billing & PSP operations
- **A:** **CFO** — money in/out, Stripe Connect economics, fee-split correctness, reconciliation. **R:** CTO for the *technical* integrity of money movement (Stripe Connect webhook signature verification, Connect Express onboarding integrity, fee-split correctness in code); COO for *billing-incident handling and operations* (the day-to-day "did the customer get charged correctly, and if not, how do we fix it"). **C:** CPO on the pricing model that drives what gets billed. **I:** CEO.
- *Seed:* `cto.md` — CTO owns "security of money-movement: Stripe Connect webhook signature verification, Connect Express onboarding integrity, fee-split correctness." `charter.md` — revenue flows through Stripe Connect (subscription + PSP fee split); unit economics live with the CFO. COO owns "billing operations" per `org-chart.md`.
- *Future delegate:* **Head of Finance** (under CFO) carries reconciliation/reporting R; **Head of Customer Success** (under COO) carries billing-incident comms.
- *Drives doc:* **`processes/billing-incidents.md`** and **`processes/customer-success.md`** (billing experience as part of the customer lifecycle).

## Process-to-doc map (dependency root)

This matrix is the dependency root for the six `processes/` docs. The mapping below tells each downstream doc which process row(s) drive it:

| Process doc | Driven by matrix row(s) | Accountable (A) |
|---|---|---|
| `processes/hiring.md` | Row 2 (Hiring) | CEO (decision) → CHRO (executes; future: Head of People) |
| `processes/customer-success.md` | Row 7 (Billing & PSP ops) + onboarding/activation inputs from Row 4 | COO (CS ops); CPO consulted on activation/TTV |
| `processes/billing-incidents.md` | Row 5 (Incident response) + Row 7 (Billing & PSP ops) | CTO (incident command) + CFO (billing economics) |
| `processes/gtm.md` | Row 3 (Pricing) + Row 4 (Product launch) | CEO (pricing) → CMO/CPO execute launch & GTM |
| `processes/product-strategy.md` | Row 1 (Strategy & OKRs) + Row 4 (Product launch) | CEO (strategy) → CPO (product direction) |
| `processes/governance.md` | Row 6 (Compliance & governance) | CFO (via Head of Legal) + CTO (technical controls) + COO (audit cadence) |

> Note: `processes/billing-incidents.md` and `processes/customer-success.md` both touch Row 7; the split is **CFO owns the money, COO owns the customer-facing operation, CTO owns the code path.** Three R's, one A (CFO) — the one-A rule holds.

## Marketing operations sub-processes (Wave 2 roles)

The seven high-level processes above operate at the C-suite level. The following sub-processes cover the marketing department's internal operations introduced with the Wave 2 marketing agents. The one-A-per-process rule holds throughout.

### M1. Content production and editorial calendar

- **A:** Content Manager. **R:** Content Manager (calendar, brief assignment); mkt-content-writer, mkt-customer-story-writer, mkt-landing-page-agent, mkt-geo-agent (asset production). **C:** Head of Marketing (calendar review, channel alignment). **I:** CMO, mkt-paid-media-agent (landing-page availability).
- *Drives:* `docs/marketing/editorial-calendar.md`

### M2. Case study publication

- **A:** Bernard (final gate — LGPD-sensitive; real customer names require human approval). **R:** mkt-customer-story-writer (draft); Content Manager (pipeline and routing); Head of Marketing (sign-off before escalation). **C:** Head of Legal (if health-related outcome data is involved per LGPD Art. 11). **I:** CMO, mkt-paid-media-agent (social proof availability for ad creative).
- *Hard rule:* mkt-customer-story-writer writes `HUMAN_NEEDED.md` and halts before any publication. Bernard's written approval is required. No agent may bypass this gate.
- *Drives:* `docs/marketing/case-studies/`

### M3. Paid campaign activation

- **A:** Head of Marketing (budget approval and channel strategy). **R:** mkt-paid-media-agent (gate check, campaign structure, activation decision); mkt-ad-creative-strategist (creative variants); mkt-campaign-manager (weekly ops). **C:** CMO (channel mix and spend envelope); CFO (budget above R$1k/day change). **I:** Bernard (via mkt-marketing-analytics Friday brief; and if spend approaches configured cap).
- *Gate:* mkt-paid-media-agent must confirm ≥3 published case studies in `docs/marketing/case-studies/` before activating any campaign. ≥5 for a second vertical. No activation without this check.
- *Budget authority ladder:*
  - ≤15% / R$300/day per ad set: mkt-campaign-manager (unilateral)
  - >15% or >R$300/day: mkt-paid-media-agent
  - >R$1k/day: Head of Marketing
  - Spend approaching configured cap: CMO → Bernard
- *Drives:* `docs/marketing/paid-media/`

### M4. Weekly marketing performance report

- **A:** Head of Marketing. **R:** mkt-marketing-analytics (aggregation, synthesis, Bernard brief); mkt-campaign-manager (paid media weekly report — Friday input); mkt-market-intelligence (intelligence report — Thursday input); content-manager (content update). **C:** CMO (receives consolidated report). **I:** Bernard (receives ≤150-word brief every Friday).
- *Cadence:* mkt-market-intelligence delivers Thursday; mkt-campaign-manager delivers Friday; mkt-marketing-analytics aggregates Friday and sends Bernard brief.
- *Scope boundary:* mkt-marketing-analytics does NOT run SQL on the product database — that is data-analyst territory. Marketing Analytics owns marketing-side aggregation only.
- *Drives:* `docs/marketing/reports/weekly-YYYY-MM-DD.md`

### M5. Competitive intelligence and LLM presence monitoring

- **A:** Head of Marketing. **R:** mkt-market-intelligence (competitor tracking, community signals, LLM presence digest); mkt-geo-agent (bi-weekly LLM probe execution, gap classification, GEO content briefs). **C:** CMO (on significant competitive signals). **I:** mkt-marketing-analytics (weekly rollup), content-manager (GEO content briefs).
- *Expansion signal exception:* when mkt-market-intelligence detects a significant expansion opportunity (new ICP vertical or technology licensing), the A shifts: **CEO** becomes **A** for the decision. mkt-market-intelligence builds a structured opportunity report and routes to CEO via Task per `decision-authority.md`. Head of Marketing and CMO are **I**; they do not own expansion decisions.
- *Drives:* `docs/marketing/intelligence/`

## Finance operations sub-processes (fin- roles)

The following sub-processes cover the finance department's internal operations introduced with the fin- agents. The one-A-per-process rule holds throughout, and the financial gates in `decision-authority.md` apply on top: no fin- agent initiates, approves, or commits any financial transaction — every financial decision gate writes `HUMAN_NEEDED.md` and halts.

### F1. Financial request pipeline (analysis → budget → cash → decision)

- **A:** CFO. **R:** fin-financial-analyst (impact parecer, base/upside/downside vs. CFO bars); fin-tax-strategist (tax-implication parecer, in parallel, when flagged); fin-fp-and-a-manager (budget-availability checkpoint); fin-treasury-manager (cash confirmation on the expected payment date). **C:** Head of Finance (data consistency). **I:** the requesting department head.
- *Hard rule:* every verdict in the pipeline is advisory. The CFO decides; amounts above the CFO's authority follow the financial-commitment ladder in `decision-authority.md` (>R$50k: CFO + CEO).

### F2. Payment execution and ledger booking

- **A:** CFO. **R:** fin-accounts-payable-manager (invoice validation, payment execution within agreed terms); fin-financial-controller (per-transaction ledger booking with approval reference). **C:** fin-treasury-manager (timing vs. the 13-week projection). **I:** Head of Finance (monthly close consumes the ledger).
- *Hard rule:* vendor banking-detail changes require out-of-band verification before payment. No transaction is booked without a traceable approval reference — the controller pauses and reports instead.

### F3. Receivables and collections

- **A:** CFO. **R:** fin-accounts-receivable-manager (invoice issuance, collections cadence, credit-risk parecer). **C:** Billing Analyst (reconciled settlement data — never re-derived); Head of Legal (legal-escalation rung). **I:** fin-treasury-manager (receivables forecast), Head of Finance.
- *Hard rule:* legal action requires CFO and Head of Legal sign-off. Strategic/key accounts require CFO notification before the cadence advances a rung.

### F4. Cash monitoring and runway

- **A:** CFO. **R:** fin-treasury-manager (daily snapshot, rolling 13-week projection, burn/runway calculation); Head of Finance (weekly Runway Check synthesis — existing workflow, fed by the Treasury Manager, never duplicated). **C:** fin-fp-and-a-manager (forecast alignment). **I:** CEO (via CFO if runway approaches the floor); Bernard (via `monitor-runway` / `HUMAN_NEEDED.md` at the 4-month warning and 2-month critical thresholds).
- *Hard rule:* runway below the 6-month safety floor escalates directly to the CFO; Pix (T+0) and card (T+2) settlements are never blended into a single cash figure.

## Design operations sub-processes (design- roles)

The following sub-processes cover the design department's internal operations. The design department sits under Product (CPO → Head of Product), so the Head of Product holds the A for each; the one-A-per-process rule holds throughout. Three hard gates apply on top: the design-system → engineering consult (D1), the mandatory inclusive-visuals review of any human image (D4), and the company-wide brand veto (any Dn) recorded in `docs/operations/decisions-log.md`.

### D1. Design-system change (tokens, grid)

- **A:** Head of Product. **R:** design-ux-architect (design-system, token, grid, pattern, IA changes). **C:** **Head of Engineering** (code impact — Tailwind config, RN theme, shared component library), design-brand-guardian (brand values encoded in tokens). **I:** product-designer, design-ui-designer.
- *Hard rule:* a token or grid change is not finalized without the Head of Engineering consult; the decision is logged in `docs/design/decisions.md`. IA changes that force a backend model change escalate to Head of Engineering before proceeding.
- *Drives:* `docs/design/design-system.md`, `docs/design/tokens.md`, `docs/design/grid.md`

### D2. New-component creation

- **A:** Head of Product. **R:** design-ui-designer (dev-ready spec: shadcn/ui variant + Tailwind + tokens + breakpoints on web; RN style + tap-target on mobile; full state coverage; mandatory accessibility block). **C:** design-ux-architect (foundation/pattern conformance), design-brand-guardian (identity audit). **I:** eng-frontend-developer, mobile-engineer.
- *Hard rules:* no component before the surface's foundation exists (foundation gate); accessibility (WCAG AA, tap targets ≥44 pt, focus, accessible names, Portuguese-first) is mandatory on every component; product-designer owns discovery/flow, design-ui-designer owns visual-component execution — no overlap.
- *Drives:* `docs/design/components/`

### D3. Marketing-asset production

- **A:** Head of Product. **Acceptance owner of the final delivery:** mkt-content-manager — it defines the briefing and accepts the asset into the editorial calendar; the asset serves its calendar. (The one-A-per-process rule keeps a single A at Head of Product; mkt-content-manager's acceptance authority is recorded here rather than as a second A.) **R:** design-visual-storyteller (narrative, storyboard, asset) + design-image-prompt-engineer (generated imagery). **C:** design-brand-guardian (brand audit), mkt-content-manager (briefing + delivery acceptance). **I:** CMO.
- *Flow:* mkt-content-manager brief → design-visual-storyteller → (design-image-prompt-engineer → design-inclusive-visuals if the asset contains people) → design-brand-guardian audit → returned to mkt-content-manager for acceptance.
- *Hard rule:* assets using a real customer result require an already Bernard-approved, published case study (mkt-customer-story-writer M2 gate); no customer identity is sourced or published directly by design.
- *Drives:* `docs/design/storytelling/`, feeds `docs/operations/marketing/content-calendar.md`

### D4. Image generation with humans

- **A:** Head of Product. **R:** design-image-prompt-engineer (structured prompt, campaign consistency) + **design-inclusive-visuals (mandatory review)**. **C:** design-brand-guardian (visual identity). **I:** design-visual-storyteller.
- *Hard gate:* any image containing human representation without design-inclusive-visuals review is **BLOCKED** — the prompt is reviewed against the 7-point checklist **before generation** (bias prevention upstream), and the asset is reviewed before approval. No velocity override. This is the design department's internal equivalent of the mkt-customer-story-writer HUMAN_NEEDED publication gate. A documented exception to a checklist point requires Head of Product approval.
- *Drives:* `docs/design/image-prompts/`, `docs/design/inclusive-review/`

### D5. Interface review

- **A:** Head of Product. **R:** design-persona-walkthrough (simulated deep walk of the four personas on every new/changed interface; friction log with severity + fix). **C:** design-ux-researcher (real-data validation of surfaced hypotheses), product-designer (flow fixes). **I:** Head of Engineering.
- *Trigger:* every new or changed interface gets a walkthrough before it is considered done. Blockers on a critical activation path escalate to Head of Product immediately.
- *Boundary:* design-persona-walkthrough simulates (hypotheses); design-ux-researcher validates with real data — no overlap, mutual feed.
- *Drives:* `docs/design/walkthroughs/`

### Design-wide gate — Brand veto

Independent of D1–D5: design-brand-guardian may veto any asset from any department (design or marketing) that violates the Bevox identity. Every veto is recorded in `docs/operations/decisions-log.md` in the standard decision-log format. Brand-vs-performance tensions in marketing route to a CMO consult before the call is finalized.

> **Maintenance note:** The seven original processes in this matrix cover C-suite-level accountability. The five marketing sub-processes (M1–M5), four finance sub-processes (F1–F4), and five design sub-processes (D1–D5) define accountability within their departments. They are consistent with the top-level matrix: CMO holds the A for overall marketing (processes 3 and 4), CFO holds the A for money in/out (process 7), and CPO holds the A for what is built (process 4) — the design department sits under Product, so the Head of Product carries the A for D1–D5, delegating R to the design- agents (with the Head of Engineering consulted on design-system code impact and the mkt-content-manager as acceptance owner on marketing assets).

## Maintenance

The CEO keeps this matrix consistent with `org-chart.md`, `charter.md`, `strategy.md`, and `okrs/` (`ceo.md` — "Keep the org coherent … org-chart, RACI, charter, strategy, and OKRs do not drift apart"). Two triggers force an update to this file *before* the change takes effect:

1. **A new role is instantiated** — when a planned department lead (Head of Legal, Head of Finance, Head of Engineering, etc.) is created, move the R (and possibly the A, under C-suite oversight) from the C-suite parent to the new lead, and record it here.
2. **An accountability dispute** — if two roles believe they hold the A for a process, the CEO breaks the tie, the resolution is recorded here, and the one-A rule is restored.

No process doc may assign accountability that contradicts this matrix. If a `processes/` doc and this matrix disagree, **this matrix wins** and the process doc is corrected.

---

*Grounding:* roles, reporting lines, and the planned-vs-instantiated distinction from `org-chart.md`; stage (post-PMF, 10–50 customers), LGPD/Stripe-Connect context, and the single-human operating principle from `charter.md`. RACI rows seeded from the "RACI handoffs" sections of `docs/agents/ceo.md`, `docs/agents/cto.md`, and `docs/agents/cpo.md`; the CFO/CMO/COO/CHRO assignments are derived from their mandates as defined in `org-chart.md` (their dedicated role specs land in a later wave). One-A-per-process and stage-honest, no-premature-accountability discipline follow `charter.md` (Stage-honest speed) and `org-chart.md` (structure trails customer count).
