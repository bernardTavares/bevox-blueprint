# BEVOX — Product Strategy Process

This document describes how BEVOX decides **what to build, in what order, and how to know it worked**: the end-to-end product-strategy loop from discovery through measurement. It is a process doc, not a strategy doc — it tells each role *what to do, in what order, who owns it, and what bar must be cleared* at each stage. The strategy itself (the three horizons) lives in `strategy.md`; this doc is the repeatable machine that turns that strategy into shipped, adopted product.

It consumes `raci-matrix.md` (row 1 *Strategy & OKRs* and row 4 *Product launch* — the two rows that drive this doc per the matrix's process-to-doc map), `strategy.md` (the horizon sequencing this loop executes against), `okrs/` (the company OKRs the roadmap cascades from), `docs/agents/cpo.md` (the CPO mandate — roadmap ownership, prioritization, autonomy levels, activation/TTV thesis; cited as `references/corporate-roles/cpo.md:16-43`), and `charter.md` (stage, ICP, business model). It is grounded in the SaaS B2B playbook's "Common pitfalls" (`references/industry-playbooks/saas-b2b.md:52-57`). Where this doc and `raci-matrix.md` disagree on accountability, **the matrix wins** and this doc is corrected.

It is deliberately **stage-honest**: BEVOX is post-PMF with 10–50 paying customers, run by a single human (Bernard) and a roster of agents. This is a tight, founder-scale prioritization loop, not a multi-squad product org. The Head of Product is a **planned Phase 2 role** (`raci-matrix.md:31,72`); until it is instantiated, the **CPO carries both the A and the execution R** for this process.

---

## The one non-negotiable: do not build for one whale

Before any stage mechanic matters, the single governing discipline of this process must be stated, because every prioritization call bends to it:

**Every roadmap item must serve the repeatable ICP — Brazilian appointment-based SMBs, 1–10 professionals — not a single loud customer** (`references/industry-playbooks/saas-b2b.md:56`; `strategy.md:9`; `docs/agents/cpo.md:43-47,56-57`). A feature that only one large account wants is not strategy; it is a leak. The prioritization framework below exists precisely to make whale-pull lose to ICP-impact on the merits, in writing. A "yes" to one whale's bespoke request is a "no" to every other customer's compounding value — and it corrupts the data/RAG moat that depends on skills transferring across the whole book (`strategy.md:50-51,66,94`).

Three more disciplines from the playbook ride alongside it through the whole loop: **measure activation, not vanity signups** (`references/industry-playbooks/saas-b2b.md:57`) — the loop ends at adoption, never at shipped; **list price holds, no discounting** — packaging decisions never reach for a discount lever (`references/industry-playbooks/saas-b2b.md:55`); and **sequence, don't parallelize** — do not run a horizon's bets before the prior horizon is proven (`strategy.md:3`).

---

## What this process owns (and what it does not)

Per `docs/agents/cpo.md:40-59` and `raci-matrix.md` row 4, this process owns:

- The **single prioritized roadmap** and its ordering (`docs/agents/cpo.md:40-42`).
- The **prioritization decision** for any feature, fix, or bet competing for engineering capacity, plus the published rationale (`docs/agents/cpo.md:43-45`).
- **Feature-kill / sunset** decisions — protecting focus is as important as choosing what to build (`docs/agents/cpo.md:46-47`).
- The **definition of "activated"** and the time-to-value (TTV) targets that the roadmap is judged against (`docs/agents/cpo.md:51-52,70-71`).
- The **autonomy-level definitions** and the criteria to advance the AI secretary from suggest → assist → act-with-confirmation → autonomous (`docs/agents/cpo.md:53-55,104-106`).
- The **packaging model/structure** (per-professional subscription + PSP fee, what's bundled vs. metered vs. gated by autonomy level) — but **not** the list price or unit-economics sign-off, which are the CFO's, nor framing, which is the CMO's (`docs/agents/cpo.md:48-50,96-100`; `raci-matrix.md:41,65`).

It does **not** own: technical feasibility, architecture, or effort estimates (→ CTO, deferred to); final list prices and unit-economics sign-off (→ CFO); go-to-market positioning and the launch motion (→ CMO, and `processes/gtm.md`); or company-level strategy and capital allocation (→ CEO, deferred to) (`docs/agents/cpo.md:72-77`). The **launch execution** itself — taking a built feature to market — is handed to `processes/gtm.md`; this process ends where measurement begins and feeds the next discovery cycle.

---

## The loop: stages, owners, and exit bars

The product-strategy loop is six stages run as a continuous cycle. Each stage has **exactly one accountable owner** and an **exit bar** — work does not advance until the bar is met. No stage may be skipped to make a roadmap look fuller.

```
discovery → prioritization → quarterly roadmap → build → launch → measure
   ^                                                                  |
   └──────────────────── feeds next discovery ────────────────────────┘
```

### Stage 1 — Discovery (customer + usage signals)

- **Accountable:** CPO (`raci-matrix.md` row 1/4; `docs/agents/cpo.md:56-57`).
- **What happens:** the CPO runs structured discovery across the **four personas** the product serves — owner/manager, attending professional, human operator (receptionist), and the AI secretary itself (`docs/agents/cpo.md:36`) — and fuses two signal streams:
  - **Customer signals (qualitative):** discovery conversations, the COO/Customer-Success channel (the CPO's *richest* discovery source for onboarding friction feeding the activation/TTV thesis — `docs/agents/cpo.md:120-121`), sales-loss reasons via the CMO, and support themes.
  - **Usage signals (quantitative):** activation rate, time-to-value, WAU/MAU stickiness, feature adoption, cohort retention, and the **autonomy ratio** — the share of booking-cycle actions the secretary handles without a human operator (`strategy.md:57`; `docs/agents/cpo.md:83-92`). At BEVOX's stage these are read from harness/OTel telemetry (`strategy.md:25`).
- **Validate before building**, especially *which verticals to deepen next* (`docs/agents/cpo.md:56-57`). Discovery is where whale-pull is filtered out: a request that does not generalize across the ICP is logged and challenged here, not carried forward (`references/industry-playbooks/saas-b2b.md:56`).
- **Exit bar → a validated problem:** a crisp problem statement tied to one or more of activation, retention, autonomy, or defensibility, with the persona(s) it serves named and the customer **and** usage evidence attached. A problem with no signal does not enter prioritization.

> **Forward link — the usage-analytics-digest.** The usage-signal half of discovery is, today, the CPO reading telemetry directly. In Phase 2 this becomes a standing **usage-analytics-digest** — a recurring, instrumented read of activation/adoption/retention/autonomy-ratio signals — owned by the **Head of Product** under the CPO's accountability (`docs/agents/cpo.md:122-123`; `raci-matrix.md:31,72`). The digest is the institutionalized feedback edge of this loop (measure → discovery). It is named here so the loop stays correct as that role instantiates; until it does, the CPO produces the digest.

### Stage 2 — Prioritization (RICE)

- **Accountable:** CPO (`docs/agents/cpo.md:43-45,64-65`; `raci-matrix.md` row 4 A = CPO).
- **What happens:** validated problems compete for finite engineering capacity through an **explicit, published framework** so disputes resolve on evidence, not volume (`docs/agents/cpo.md:43-45`). BEVOX uses **RICE**, adapted to the CPO's stated lens of *impact on activation/retention × confidence × effort, with strategic-bet carve-outs* (`docs/agents/cpo.md:43-45`):
  - **Reach** — how many ICP customers (and which personas) the item touches across the *book*, not one account. This is the structural guard against the whale: a one-customer item scores near-zero on Reach by construction (`references/industry-playbooks/saas-b2b.md:56`).
  - **Impact** — the effect on the north-star metrics: activation, time-to-value, retention, and the autonomy ratio. Items that compress TTV or raise autonomy score highest (`docs/agents/cpo.md:51-55,83-92`).
  - **Confidence** — how strong the discovery evidence is; thin-signal items are discounted, not promoted on enthusiasm.
  - **Effort** — supplied by the **CTO**, who is *deferred to* on feasibility and effort across the stack (Fastify backend, Postgres 16 + pgvector for RAG, Redis + BullMQ for the AI job queue) (`docs/agents/cpo.md:73,113-116`; `raci-matrix.md:42`). The CPO never invents an estimate.
  - **Strategic-bet carve-out** — a small reserved slice for defensibility bets (e.g. RAG/retrieval-quality investment, autonomy infrastructure) whose payoff is durability, not next-quarter activation (`docs/agents/cpo.md:44`; `strategy.md:80`). These are deliberately *not* forced to win on short-term RICE.
- **Feature-kill happens here too.** Items that no longer move activation, retention, or defensibility are sunset, with the rationale published — protecting focus is part of the job (`docs/agents/cpo.md:46-47`).
- **Exit bar → a ranked, rationale-backed backlog:** every candidate scored, the ordering published, kill decisions recorded. A dispute over ranking is resolved on the published evidence; only a *company-level* tradeoff escalates to the CEO (`docs/agents/cpo.md:72-77`; `raci-matrix.md:39`).

### Stage 3 — Quarterly roadmap

- **Accountable:** CPO (`docs/agents/cpo.md:40-42,63-64`). The roadmap is the CPO's owned artifact (`raci-matrix.md:103` — strategy cascades CEO → CPO).
- **What happens:** the ranked backlog is committed into a **single quarterly roadmap** that cascades directly from company OKRs (`okrs/`) and the active strategy horizon (`strategy.md`) (`raci-matrix.md` row 1, "the cascade from company OKRs into product/strategy execution" — `raci-matrix.md:56`). The roadmap reconciles competing pulls from sales, support, and engineering into **one ordered list** (`docs/agents/cpo.md:40-42`).
- **Consulted before the roadmap locks:**
  - **CTO** — feasibility and sequencing on the stack (Fastify / pgvector / BullMQ), and the "unsafe to ship" veto right that the launch stage will enforce (`docs/agents/cpo.md:113-116`; `raci-matrix.md:42`).
  - **CMO** — positioning, so packaging and roadmap shifts that change the pitch are flagged early; the CMO is *Informed* of roadmap shifts that change the GTM message (`docs/agents/cpo.md:117,71`; `raci-matrix.md:42`).
  - **CFO** — margin/economics impact of roadmap items, especially anything touching the packaging model (`docs/agents/cpo.md:118-119`; `raci-matrix.md:42`).
  - **CEO** — *consulted* on the roadmap and *deferred to* on company-level strategy and capital allocation; the CEO is the standing tie-breaker (`docs/agents/cpo.md:74-77,109-111`; `raci-matrix.md:16,39`).
- **Bevox-specific roadmap spine.** The post-PMF roadmap is organized around two strategic axes the CPO owns (`docs/agents/cpo.md:94-106`):
  1. **Increasing AI-secretary autonomy levels post rule-learning.** The roadmap sequences the secretary's graduation — **suggest → assist → act-with-confirmation → autonomous** — gated by RAG confidence over each business's learned rules and per-vertical risk tolerance (`docs/agents/cpo.md:53-55,104-106`). Autonomy is the growth lever *and* the margin lever: it compounds across every customer, the opposite of building for one whale (`strategy.md:50,57`). Roadmap items that raise the autonomy ratio outrank items that merely add surface area.
  2. **Vertical expansion decisions.** Which vertical to deepen next — among physiotherapy, pilates, sports studios, aesthetics/wellness, and independent professionals — is a roadmap call made on **activation/retention signal and CAC efficiency, not opportunism** (`docs/agents/cpo.md:101-103`). Expansion is admitted only where the *same onboarding and the same secretary skills transfer* (`strategy.md:51`); a vertical that requires bespoke skills for one loud prospect is refused (`references/industry-playbooks/saas-b2b.md:56`).
- **Exit bar → a committed quarterly roadmap:** an ordered, OKR-linked plan; each item carries a problem statement, target metric (which of activation/adoption/retention/autonomy it moves), and CTO effort estimate; consult sign-offs captured; nothing committed that contradicts the active horizon's gate (`strategy.md:3,44,74`).

### Stage 4 — Build (spec, not code)

- **Accountable:** CTO for the *build* (`raci-matrix.md` row 4 R = CTO for build + ship-safety veto). The CPO is **A on product direction**; the CTO owns the *how* and the effort (`docs/agents/cpo.md:113-116`; `raci-matrix.md:42,71`).
- **What happens:** the CPO **writes the spec, not the code** — handing engineering a crisp problem statement, acceptance criteria, and success metrics, never an implementation (`docs/agents/cpo.md:58-59,123`). The CTO and engineering agents build against that spec on the stack (Fastify, Postgres 16 + pgvector, Redis + BullMQ); the CTO holds the **"unsafe to ship" veto** as the only override of the roadmap order (`raci-matrix.md:42,71`).
- **Exit bar → built and ship-safe:** the feature meets its written acceptance criteria, the success metric is instrumented *before* launch (you cannot measure adoption you did not wire up), and the CTO has cleared ship-safety. Instrumentation-at-build is what makes Stage 6 possible.

### Stage 5 — Launch

- **Accountable:** CPO for the launch decision (`raci-matrix.md` row 4 A = CPO); **CMO R** for the go-to-market motion (`raci-matrix.md:42,70`).
- **What happens:** this stage **hands execution to `processes/gtm.md`** — the GTM doc owns the funnel and the launch motion. The product-strategy loop's role here is the go/no-go and the handoff: confirm the feature is built, ship-safe, instrumented, and that positioning is ready (CMO), then release. **Consulted:** CEO on company-level go/no-go tradeoffs only, CFO on margin impact, COO on delivery/customer-success readiness (`raci-matrix.md:42,70`). **Informed:** Bernard, CHRO.
- **Pricing/packaging never launches with a discount.** If launch touches the packaging model, the structure ships at list price; framing is the CMO's, list price and economics are the CFO's (`references/industry-playbooks/saas-b2b.md:55`; `docs/agents/cpo.md:48-50,96-100`; `raci-matrix.md:41`).
- **Exit bar → launched:** feature live to the targeted ICP segment, GTM motion engaged per `processes/gtm.md`, adoption tracking active. Launch is *not* the finish line — a shipped feature nobody adopts is a failure, not a win (`references/industry-playbooks/saas-b2b.md:57`).

### Stage 6 — Measure (activation / adoption / retention)

- **Accountable:** CPO (`docs/agents/cpo.md:79-92` — the CPO owns the product KPIs).
- **What happens:** the launched item is judged against the metrics instrumented at build, on the CPO's owned KPI set (`docs/agents/cpo.md:83-92`):
  - **Activation rate** — the single best leading indicator of retention; did the feature help more new customers reach value? (rising every cohort).
  - **Feature adoption** — did the shipped feature actually get *used*? This is the direct validation (or refutation) of the Stage-2 prioritization call (≥ the adoption threshold set per launch).
  - **Retention** — cohort logo + revenue retention; the durability of PMF (improving by cohort).
  - **Time-to-value, WAU/MAU stickiness, and the autonomy ratio** as supporting signals (`docs/agents/cpo.md:85-92`; `strategy.md:57`).
- **The verdict feeds back.** A feature that misses its adoption/activation threshold is a **kill or rework candidate** in the next prioritization cycle — measurement is what gives feature-kill its evidence (`docs/agents/cpo.md:46-47`). The measured signals are exactly the inputs that re-enter Stage 1 discovery as the **usage-analytics-digest** (`docs/agents/cpo.md:122-123`).
- **Exit bar → loop closes:** outcome recorded against the target metric; the result published; the digest updated and routed back into discovery. The loop is continuous — Stage 6 *is* the front door of the next Stage 1.

---

## RACI summary for this process

Consistent with `raci-matrix.md` (row 1 *Strategy & OKRs* and row 4 *Product launch*); names the *function* so it stays correct as planned leads instantiate. The CPO is the single **A** for the product-strategy loop end to end; the CEO is **A** for the company strategy/OKRs this loop cascades *from* (`raci-matrix.md:39,42,103`).

| Loop stage | Accountable (A) | Responsible (R) | Consulted (C) | Informed (I) |
|---|---|---|---|---|
| Discovery | CPO | CPO (future: Head of Product) | COO/CS (friction signal), CMO (loss reasons) | CEO |
| Prioritization (RICE) | CPO | CPO | CTO (effort/feasibility) | CEO |
| Quarterly roadmap | CPO | CPO | CTO (feasibility), CMO (positioning), CFO (margin), CEO (company tradeoffs) | Bernard, CHRO |
| Build | CTO (build + ship veto) | CTO + engineering agents | CPO (spec/acceptance) | CEO |
| Launch | CPO | CMO (GTM motion via `processes/gtm.md`) | CEO (go/no-go), CFO (margin), COO (CS readiness) | Bernard, CHRO |
| Measure | CPO | CPO (future: Head of Product, via usage-analytics-digest) | CFO (economics signal), COO (CS signal) | CEO, CMO |

> One **A** per row. Where the CTO is A for *build* and the CPO is A for *product direction*, these are two distinct decisions (the *how* vs. the *what/order*), not two A's on one decision — the one-A rule holds (`raci-matrix.md:10,16`).

---

## Where pricing/packaging sits in this loop

The CPO owns the packaging **model/structure** as a product decision that surfaces in prioritization and roadmap (what's bundled vs. metered vs. gated by autonomy level — `docs/agents/cpo.md:48-50,96-100`). It is **not** decided alone: the **CFO is R** for economics and list price (and accountable for margins), the **CMO is R** for framing, and the **CEO is A** for the final price (`raci-matrix.md:41,65`; `docs/agents/cpo.md:48-50,72-77`). The mechanics of how pricing reaches the market live in `processes/gtm.md`, not here; this loop only decides the *structure* and which autonomy levels are bundled vs. gated. Expansion revenue comes from seat adds and rising payment volume as autonomy grows — **never** from discounting (`references/industry-playbooks/saas-b2b.md:55`; `strategy.md:56`).

---

## Anti-pitfalls baked into this process

These are the failure modes this loop exists to prevent (`references/industry-playbooks/saas-b2b.md:52-57`; `strategy.md:5-10`; `docs/agents/cpo.md:43-47`):

- **Building for the whale.** The RICE **Reach** dimension scores one-account requests near-zero by construction; discovery filters non-generalizing pulls before they enter the backlog (`references/industry-playbooks/saas-b2b.md:56`).
- **Counting vanity signups / shipped-equals-done.** The loop ends at *measured adoption/activation/retention*, not at launch. A shipped feature nobody uses is a kill candidate, not a win (`references/industry-playbooks/saas-b2b.md:57`).
- **Prioritizing by volume, not evidence.** RICE is explicit and published; the loudest internal voice does not win — the highest-scoring, best-evidenced item does (`docs/agents/cpo.md:43-45`).
- **CPO writing the code.** The CPO writes specs, acceptance criteria, and success metrics; the CTO owns the *how* and the effort estimate. Mixing the two corrupts both accountability and the estimate (`docs/agents/cpo.md:58-59,73`).
- **Vertical sprawl.** Expansion is admitted only where onboarding and secretary skills transfer; bespoke verticals for one prospect multiply support cost and dilute the moat (`strategy.md:51,65`; `references/industry-playbooks/saas-b2b.md:56`).
- **Autonomy stall / human-in-the-loop creep.** If the autonomy ratio does not rise, every new customer adds operator load and gross margin degrades — so autonomy-raising items are prioritized as the growth-and-margin lever, not deferred (`strategy.md:50,67`; `docs/agents/cpo.md:53-55`).
- **Discounting via packaging.** The packaging model never reaches for a discount lever; list price holds and value is communicated through the secretary paying for itself (`references/industry-playbooks/saas-b2b.md:55`).
- **Running a horizon's bets early.** The roadmap obeys `strategy.md` gating — H2 autonomy/expansion bets do not enter the roadmap before H1 (repeatable acquisition + activation) is proven (`strategy.md:3,44`).

---

## Maintenance

This doc is downstream of `raci-matrix.md` (rows 1 and 4); it must never assign accountability that contradicts it. Two triggers force an update *before* the change takes effect:

1. **A planned lead is instantiated.** When the **Head of Product** (under the CPO) is created, move the execution R for discovery, spec/delivery coordination, and the **usage-analytics-digest** from the CPO to the Head of Product, keeping the A with the CPO, and record it here (`raci-matrix.md:31,72`; `docs/agents/cpo.md:122-123`).
2. **The strategy or OKRs shift.** When `strategy.md` advances a horizon or `okrs/` changes, re-derive the roadmap spine (autonomy sequencing, vertical-expansion criteria) so the loop stays cascaded from current company strategy (`raci-matrix.md:56,110`).

The CPO owns keeping this loop current; the CEO keeps the whole picture coherent across `charter.md`, `strategy.md`, `org-chart.md`, `raci-matrix.md`, `okrs/`, and the `processes/` docs (`raci-matrix.md:110`). If this doc and `raci-matrix.md` disagree, **the matrix wins** and this doc is corrected (`raci-matrix.md:115`).

---

*Grounding:* roadmap ownership, prioritization mandate, the suggest→assist→act-with-confirmation→autonomous autonomy ladder, the activation/TTV thesis, the four personas, feature-kill, spec-not-code, the owned KPI set, and the post-PMF agenda (pricing model, vertical-deepening, autonomy) from the CPO role spec (`references/corporate-roles/cpo.md:16-43`, as instantiated in `docs/agents/cpo.md`); the row-1/row-4 accountability and the process-to-doc mapping from `raci-matrix.md` (esp. lines 39, 42, 56, 103, 115); horizon sequencing, the autonomy-as-growth-lever and vertical-transfer disciplines, and activation instrumentation from `strategy.md`; stage (post-PMF, 10–50 customers), ICP, business model, and the single-human operating principle from `charter.md`; the company OKRs the roadmap cascades from in `okrs/`; the launch motion handed to `processes/gtm.md`. The four governing disciplines — build for the ICP not the whale, measure activation not vanity, list price holds, sequence don't parallelize — are grounded in the SaaS B2B playbook's common pitfalls (`references/industry-playbooks/saas-b2b.md:52-57`, esp. `:56` "do not build for one whale").
