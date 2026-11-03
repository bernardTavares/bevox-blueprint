# BEVOX — Q4 Corporate OKRs

This is the canonical statement of what BEVOX is trying to win this quarter. The CEO owns and maintains it; everything else cascades from it. It consumes `charter.md` (mission, model, unit-economics targets), `strategy.md` (the three-horizon sequencing), and each C-suite role spec under `docs/agents/`. It is deliberately **stage-honest**: we are post-PMF, designing for the 10–50 paying-customer leap — scrappy, metric-driven, no enterprise bloat. The numbers below are sized for that stage. There are no 1,000-customer targets here.

The whole quarter sits inside **Horizon 1** of the strategy: *make acquisition and onboarding repeatable*, with the first instrumented growth metrics. We do not run Horizon-2 plays (paid-channel scale-up, a second sales motion, hires-to-grow) before H1 is proven. Four disciplines bind every objective: **repeatable before scaled**, **list price holds (no discounting)**, **build for the ICP not the whale**, and **measure activation not vanity**.

## How to read this document

Each Objective is qualitative and inspirational. Under it sit quantitative **Key Results** (KRs), each with:

- an **owner** (a single C-suite role, accountable for the number),
- a **baseline** (where we are entering the quarter — `~` denotes an early/small-N estimate, honest about the fact that we are just standing up clean measurement),
- a **target** (where we commit to be by end of quarter), and
- a **cascade**: the owning role's own contributing KR, pulled from its role spec, that rolls up into the corporate KR.

Numbers cite the company unit-economics targets in `charter.md` and the post-PMF SaaS B2B benchmarks the role specs are grounded in (NRR > 110%, LTV:CAC > 3:1, CAC payback inside the < 12-month SaaS ceiling, gross margin > 75% on the subscription line). This file is the input the **weekly-okr-review** cron (a CEO duty) reads each week to score progress; KRs are written to be checkable against the growth-metrics instrumentation stood up in O2.

---

## Objective 1 — Reach the 10–50 customer leap with healthy retention

*Win net-new logos in the ICP without buying them with discounts, and prove the base we have does not leak. Growth that churns out the back door is not growth.*

This is the headline objective: it is the post-PMF leap itself. It is owned at the company level by the CEO (revenue growth is the single headline number) and defended operationally by the COO (retention motion) and CPO (the retention that retention metrics measure). The CFO owns the reported retention number and guards against the one thing that would quietly cap it — discounting.

### KR1.1 — Grow the paying-customer base by net-new logos
- **Owner:** CEO (revenue growth — MRR/ARR trajectory, the headline post-PMF number).
- **Baseline:** ~12 paying customers entering the quarter.
- **Target:** **20+ paying customers** by end of Q4 (a stage-appropriate step inside the 10–50 band, not a hockey-stick), with MRR growing in step.
- **Cascade:** CEO owns *revenue growth*; the net-new logos that drive it are won through the documented acquisition motion under O2 (CMO) and converted at list price (CFO). Two-plus of these wins must come through the *same* documented motion (the repeatability bar from `strategy.md`).

### KR1.2 — Hold Net Revenue Retention above the benchmark
- **Owner:** COO (owns the retention *motion*; CFO owns the reported number).
- **Baseline:** ~105% NRR (early, small-N).
- **Target:** **NRR ≥ 110%** (charter floor; goal > 110%), driven by seat adds and payment-volume growth within accounts — **never by discounting** (`strategy.md` pitfall: discounting structurally caps NRR).
- **Cascade:** COO contributes its **NRR / GRR** KPI — expansion via seat add + payment volume, with GRR as the floor proving the base isn't leaking. The CFO co-owns this as a reported number and signs off that expansion, not price-cutting, produced it.

### KR1.3 — Keep logo churn low as the base grows
- **Owner:** COO (retention motion; CSAT and cost-to-serve as the leading indicators).
- **Baseline:** ~3% monthly logo churn (early estimate).
- **Target:** **Monthly logo churn ≤ 2%** (annualized GRR floor that proves the base is durable as customers are added), with **CSAT ≥ 90%** and the support-response SLA met.
- **Cascade:** COO contributes **CSAT / support SLA** and **cost-to-serve** — the early-warning metrics that a service cycle is healthy and autonomy isn't stalling. Rising cost-to-serve is the canary that margin (O2) is about to erode.

### KR1.4 — Protect retention at the product level
- **Owner:** CPO (cohort retention — the durability of PMF).
- **Baseline:** first cohort retention curve being measured for the first time this quarter.
- **Target:** **Cohort logo + revenue retention improving cohort-over-cohort**, with the most recent cohort retaining better than the prior one.
- **Cascade:** CPO contributes its **cohort retention** KPI — logo + revenue retention by cohort — the product-side proof that what we sell stays sold. This is the retention that KR1.2/KR1.3 measure in aggregate.

---

## Objective 2 — Build a repeatable, efficient GTM engine

*Be able to win a customer the same way twice — at a cost the unit economics carry. A motion that works once is luck; a motion that repeats is a business. This is the gate for every Horizon-2 growth investment.*

This objective is the strategic core of Horizon 1. It is owned on the demand side by the CMO (the acquisition-motion play, pipeline, CAC) and on the economics side by the CFO (CAC payback, margin, the pricing/packaging decision). No paid-channel scale-up and no second sales motion until the motion here demonstrably repeats (`strategy.md`: do not scale GTM before acquisition is repeatable).

### KR2.1 — Prove a single, documented, repeatable acquisition motion
- **Owner:** CMO (owns the acquisition-motion play, the document, and the repeatability bar).
- **Baseline:** founder-led / referral / Instagram-sourced inbound working, but **not written down** and not yet proven repeatable.
- **Target:** **One acquisition motion documented**, and **≥ 2 net-new customers won through that same motion** within the quarter (the repeatability gate from `strategy.md`), with marketing-sourced pipeline growing and MQL→SQL conversion rising.
- **Cascade:** CMO contributes its **marketing-sourced pipeline** KPI — the volume and quality of qualified opportunities, the proof the motion produces demand rather than impressions. This is the gate: until it clears, no Horizon-2 spend.

### KR2.2 — Acquire demand at a price the economics carry
- **Owner:** CFO (owns the CAC budget, LTV:CAC and the CAC-payback bars).
- **Baseline:** CAC payback being measured cleanly for the first time this quarter.
- **Target:** **CAC payback ≤ 3 months** (charter target), with the **< 12-month SaaS ceiling treated as a hard-fail line**, and **LTV:CAC ≥ 3:1** (SaaS B2B benchmark) as the channel-quality check.
- **Cascade:** CFO contributes its **CAC payback** and **LTV:CAC** KPIs; CMO is responsible for GTM spend staying *within* the CAC budget the CFO sets. The CFO's pricing/packaging economics sign-off (KR2.4) is what keeps payback inside the bar.

### KR2.3 — Compress and raise activation (the real north star)
- **Owner:** CPO (owns the definition of "activated" and the time-to-value target).
- **Baseline:** ~50% of new customers activated; time-to-value being instrumented this quarter.
- **Target:** **Activation rate ≥ 70%** of new customers (activation = the AI secretary autonomously handling the live booking cycle for a real business), with **time-to-value (TTV) trending down** quarter-over-quarter.
- **Cascade:** CPO contributes its **activation rate** and **time-to-value (TTV)** KPIs — the single best leading indicator of retention and the proof onboarding compresses time-to-value. We track activation, not vanity signups (`strategy.md`). The COO co-owns the *cycle time* to onboard/activate that makes this number move.

### KR2.4 — Lock pricing & packaging at a defensible economics
- **Owner:** CFO (owns the pricing *economics* and sign-off; CPO owns packaging *structure*, CEO owns the decision).
- **Baseline:** per-seat price and PSP fee split not yet locked as a deliberate, written decision.
- **Target:** **Pricing/packaging decision locked and logged in `okrs/` and the relevant `processes/` doc**, clearing the CFO's bars: **gross margin > 75% on the subscription line**, **CAC payback ≤ 3 months**, and **support for NRR > 110%**. **List price holds — discounting is off the table.**
- **Cascade:** CFO contributes its **gross margin (subscription)** and pricing-economics sign-off; CMO recommends willingness-to-pay framing; CPO owns the tier structure; CEO casts the deciding vote. This is the Horizon-1 pricing bet from `strategy.md`, made deliberate.

---

## Objective 3 — Deepen product autonomy and the platform foundation

*Make the AI secretary carry more of the work with less human intervention, and keep the platform it runs on reliable and cheap enough to scale. Autonomy is simultaneously the moat, the margin, and the reason customers stay.*

This objective protects the long-term defensibility while keeping the lights on this quarter. It is owned on the product side by the CPO (autonomy, feature adoption, TTV) and on the platform side by the CTO (reliability, infra cost). It connects to gross margin: if autonomy stalls, every new customer adds operator load and margin erodes (`strategy.md`). The CHRO's KR sits here because the company's only way to deepen capability at this stage — beyond the agents themselves — is to be *ready* to make the right first hire when a proven bottleneck appears.

### KR3.1 — Raise the AI-secretary autonomy level
- **Owner:** CPO (product autonomy and feature adoption); COO co-owns via cost-to-serve as the inverse signal.
- **Baseline:** ~60% of booking-cycle actions handled by the AI secretary without a human operator.
- **Target:** **≥ 75% of booking-cycle actions** (availability → booking → confirmation → reschedule → billing nudge → follow-up) handled autonomously, with **cost-to-serve per active account trending down** as confirmation.
- **Cascade:** CPO contributes **feature adoption** (whether shipped autonomy features actually get used); COO contributes **cost-to-serve** — the early-warning metric that autonomy is or isn't compounding. Rising autonomy with falling cost-to-serve is what keeps gross margin (KR2.4) above the bar.

### KR3.2 — Keep time-to-value short via product, not heroics
- **Owner:** CPO (time-to-value; activation's north-star input).
- **Baseline:** ~10 days median sign-up → first AI-handled real booking.
- **Target:** **Median time-to-value ≤ 5 days**, achieved by productizing onboarding (structured capture of availability rules, services, pricing, confirmation/reschedule policy feeding the RAG layer) — onboarding as a product, not a service (`strategy.md`).
- **Cascade:** CPO contributes its **time-to-value (TTV)** KPI — days from sign-up to first AI-handled real booking. This is the same lever as KR2.3 viewed from the product side; the COO's onboarding **cycle time** is the operational twin.

### KR3.3 — Keep the platform reliable as the base grows
- **Owner:** CTO (reliability — change failure rate, MTTR, Sev1/Sev2 incidents).
- **Baseline:** measuring DORA-style metrics cleanly this quarter; occasional Sev2s.
- **Target:** **Change failure rate < 15%**, **MTTR < 1 hour for Sev1/Sev2**, **zero Sev1** and Sev2s contained and reviewed — reliability that holds while customers are added (`bevox-meta-api` channel health included, co-owned with COO).
- **Cascade:** CTO contributes its **change failure rate**, **MTTR**, and **Sev1/Sev2** KPIs. Channel degradation on WhatsApp/Instagram is treated as a product-level incident, jointly owned with the COO's channel-health SLA.

### KR3.4 — Keep infrastructure efficient as autonomy scales
- **Owner:** CTO (infra cost as % of revenue, with LLM/inference spend the watch item); CFO co-owns the budget cap.
- **Baseline:** infra + AI/inference spend being tracked as a share of revenue for the first time this quarter.
- **Target:** **Infra cost as % of revenue trending down**, with **LLM/inference spend held within the CFO-set cap** even as autonomy (and therefore inference load) rises.
- **Cascade:** CTO contributes its **infra cost as % of revenue** KPI; the CFO co-owns the spend cap on infra/LLM. This is the discipline that lets autonomy (KR3.1) grow without eroding the gross margin O2 protects.

### KR3.5 — Be hire-ready for the first proven bottleneck
- **Owner:** CHRO (hiring readiness — process in place, time-to-hire, agent-catalog hygiene).
- **Baseline:** `processes/hiring.md` not yet authored; agent-role catalog not yet audited for duplicate/ambiguous ownership.
- **Target:** **`processes/hiring.md` authored and current** (lightweight: sourcing → interview → decide → offer), **time-to-hire scoped to ≤ 30 days** for a future req, and **zero duplicate/ambiguous-owner agent roles** in the catalog — so that *when* a proven bottleneck appears (per Horizon 2, likely a customer-success/onboarding owner or a harness engineer), the company can act without Bernard becoming the bottleneck.
- **Cascade:** CHRO contributes its **time-to-hire** and **agent-catalog hygiene** KPIs, plus **eNPS** as the leading indicator that the operating model (agent + future-human) is sustainable. Per `strategy.md`, no hire is *made* this quarter unless it removes a *proven* bottleneck — readiness, not headcount, is the Q4 commitment. CEO owns the call to actually open any role; Bernard is the final approver on any human hire.

---

## Cascade summary

| Corporate KR | Owner | Owner's contributing KPI(s) | Stage target |
|---|---|---|---|
| 1.1 Net-new logos | CEO | Revenue growth (MRR/ARR) | ~12 → 20+ customers |
| 1.2 NRR | COO | NRR / GRR | ≥ 110% |
| 1.3 Logo churn / service health | COO | CSAT, cost-to-serve | churn ≤ 2%/mo; CSAT ≥ 90% |
| 1.4 Cohort retention | CPO | Cohort retention | improving cohort-over-cohort |
| 2.1 Repeatable acquisition motion | CMO | Marketing-sourced pipeline | motion documented; ≥ 2 same-motion wins |
| 2.2 Efficient acquisition | CFO | CAC payback, LTV:CAC | payback ≤ 3mo (< 12mo hard fail); LTV:CAC ≥ 3:1 |
| 2.3 Activation | CPO | Activation rate, TTV | activation ≥ 70%; TTV down |
| 2.4 Pricing locked | CFO | Gross margin (subscription), pricing sign-off | locked; margin > 75%; supports NRR > 110% |
| 3.1 Autonomy level | CPO / COO | Feature adoption, cost-to-serve | ≥ 75% actions autonomous |
| 3.2 Time-to-value | CPO | TTV | median ≤ 5 days |
| 3.3 Platform reliability | CTO | Change failure rate, MTTR, Sev1/2 | CFR < 15%; MTTR < 1h; zero Sev1 |
| 3.4 Infra efficiency | CTO / CFO | Infra cost as % of revenue | trending down; LLM spend within cap |
| 3.5 Hire readiness | CHRO | Time-to-hire, catalog hygiene, eNPS | hiring.md authored; TTH ≤ 30d; zero dup roles |

## Review cadence

These OKRs feed the **weekly-okr-review** cron, a CEO duty. Each week the CEO scores every KR against its instrumentation (stood up under O2), flags any KR at risk, and arbitrates cross-functional tradeoffs (e.g. if pushing autonomy in O3 threatens reliability, or if CAC pressure in O2 tempts a discount that would breach O1's NRR). The COO owns the operating cadence (weekly business review, OKR check-ins) that makes these land; **OKR completion** — the share of committed KRs actually delivered — is itself a COO KPI. End-of-quarter, the CEO grades each Objective and carries forward only what still serves the next horizon. The gate to any Horizon-2 play remains O2: acquisition must demonstrably repeat first.
