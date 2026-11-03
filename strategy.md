# BEVOX Strategy — Three Horizons for the Post-PMF Leap

This document sequences how BEVOX gets from a handful of early customers to a durable 10–50 customer base and beyond. It consumes `charter.md` (mission, positioning, business model) and is grounded in the SaaS B2B playbook (`references/industry-playbooks/saas-b2b.md`). It is deliberately stage-honest: we are post-PMF and scrappy, not Series B. The horizons below are sequential bets, not parallel tracks — each one earns the right to fund the next. **Do not run H2 plays before H1 is proven.**

The single most important strategic discipline encoded here comes straight from the playbook's "Common pitfalls" (`saas-b2b.md:52-57`):

1. **Do not scale GTM before acquisition is repeatable** — no second sales motion, no paid-channel scale-up, no hires-to-grow until we can predictably win a customer the same way twice (`saas-b2b.md:53`).
2. **Do not discount to close** — discounting trains the Brazilian SMB market to expect it and structurally caps Net Revenue Retention (`saas-b2b.md:55`).
3. **Do not build for one whale** — every roadmap item must serve the repeatable ICP (appointment-based SMBs, 1–10 professionals), not a single loud customer (`saas-b2b.md:56`).
4. **Track activation, not vanity signups** — our north-star metric is "AI secretary handling real bookings autonomously," not raw signups (`saas-b2b.md:57`).

---

## Horizon 1 — Now to next quarter: Make acquisition and onboarding repeatable

**Where we are:** post-PMF, designing for the 10–50 paying-customer leap. We have a product that works and proof that the AI secretary delivers value. We do **not** yet have a machine that wins and onboards customers the same way every time.

### Objective
Reach a state where any new customer in our ICP — Brazilian appointment-based SMBs (physiotherapy, pilates, sports studios, aesthetics/wellness, independent professionals), 1–10 professionals, heavy WhatsApp + Instagram users — can be acquired through one known motion and brought to **activation** without heroics. Activation = the AI secretary autonomously handling the live booking cycle (availability → booking → confirmation → reschedule → billing → follow-up) for a real business.

### Key bets
- **One acquisition motion, written down.** Pick the single channel that is already working (most likely founder-led / referral / Instagram-sourced inbound for this ICP) and document it as a repeatable play before touching anything else. This is the gate for every H2 growth investment (`saas-b2b.md:53`).
- **Onboarding as a product, not a service.** The bottleneck for an AI-secretary product is teaching it the business's rules. Build a structured onboarding that captures availability rules, services, pricing, and confirmation/reschedule policy fast — and feeds the RAG layer (Postgres 16 + pgvector). Time-to-activation is the metric to compress.
- **Pricing & packaging decision (this horizon).** Lock the per-professional SaaS subscription tiers and the Stripe Connect PSP transaction-fee split. Decide what is included per seat vs. usage-based. Make this a deliberate, defensible decision now — list price holds, discounting is off the table (`saas-b2b.md:55`). Packaging must map to the ICP's willingness to pay, not to enterprise price ladders.
- **Instrument the first growth metrics.** Stand up clean measurement of NRR, logo and revenue churn, and CAC. Wire activation tracking into the harness/OTel telemetry so "is the secretary actually doing the job" is a number, not an anecdote (`saas-b2b.md:57`).

### Leading metrics
- **Time-to-activation** (signup → AI secretary autonomously handling bookings) — trending down.
- **Activation rate** of new customers (the real north star, not signups).
- **Acquisition repeatability**: 2+ customers won through the *same* documented motion.
- **CAC** baseline established; **CAC payback** target <12 months (`saas-b2b.md:22`).
- Early **logo churn** and **revenue churn** instrumented (even if N is small).

### Risks / pitfalls to avoid
- **Premature GTM scaling.** Do not hire sales or pour money into paid channels before the motion repeats — this is the canonical SaaS killer (`saas-b2b.md:53`).
- **Discounting to land logos.** Tempting at low volume; it permanently damages NRR and trains the market (`saas-b2b.md:55`).
- **Confusing PMF with repeatability.** The product working ≠ the business compounding. H1 is about the *motion*, not the product.
- **Vanity onboarding.** Counting signups or "businesses created" instead of activated AI secretaries (`saas-b2b.md:57`).

---

## Horizon 2 — 2 to 4 quarters out: Scale autonomy, expand the wedge, add the first few people

**Precondition:** H1 is proven — acquisition repeats, onboarding is productized, pricing is locked, and the growth metrics are real. Only then.

### Objective
Turn a repeatable motion into a growing book of 10–50 customers by (a) deepening the AI secretary's autonomy so it carries more of the workload with less human intervention, (b) expanding into adjacent verticals/segments within the appointment-based SMB world, and (c) making the first 1–3 hires that remove the founder as the single point of execution. Begin lightweight process discipline.

### Key bets
- **AI-secretary autonomy as the growth lever.** The product's defensibility and its margin both come from the secretary getting *more* autonomous as it learns each business. Invest in the harness (declarative skills, RAG over pgvector, BullMQ job orchestration) so the secretary handles more of confirmation, rescheduling, billing nudges, and follow-up without an operator. Autonomy improvements compound across every customer — the opposite of building for one whale (`saas-b2b.md:56`).
- **Vertical/segment expansion — disciplined.** Move into the next-closest adjacent vertical (e.g. from physio to broader wellness/aesthetics) only where the same onboarding and the same secretary skills transfer. Expansion must reuse the H1 motion, not invent a new one. Watch for the trap of bespoke features for one new vertical's loudest customer (`saas-b2b.md:56`).
- **First 1–3 hires.** Per the playbook's stage progression, the earliest org investments are R&D and GTM (`saas-b2b.md:27-29`). For BEVOX — a single-human, agent-operated company — these are likely a customer-success/onboarding owner (protect activation and NRR as volume grows) and/or an engineer to harden the harness. Right-size: no "VP of VPs," no roles that only earn a seat at 1000 customers.
- **Process discipline begins.** Introduce the minimum viable process: a written onboarding runbook, a billing-incident playbook (Stripe Connect failures, Pix reconciliation), and a weekly metrics review (NRR, churn, CAC, activation). Process serves throughput, not bureaucracy — keep it scrappy.

### Leading metrics
- **NRR trending toward >110%** (best-in-class >130%) driven by expansion within accounts (more professionals/seats), not by discounting (`saas-b2b.md:21`).
- **Autonomy ratio**: share of booking-cycle actions the AI secretary handles without a human operator — rising.
- **Net new logos per quarter** through the documented motion.
- **CAC payback holding <12 months** as volume grows (`saas-b2b.md:22`); **LTV:CAC >3:1** (`saas-b2b.md:23`).
- **Gross margin trending >75%** — autonomy is what makes this true at SMB ACVs (`saas-b2b.md:24`).
- **Churn** kept low as the customer count climbs.

### Risks / pitfalls to avoid
- **Scaling the team ahead of the metrics.** Hire to remove a *proven* bottleneck, not to chase growth (`saas-b2b.md:53`).
- **Vertical sprawl.** Entering verticals where onboarding and secretary skills don't transfer multiplies support cost and dilutes the moat.
- **Whale capture.** A single large customer pulling the roadmap toward bespoke features (`saas-b2b.md:56`).
- **Margin erosion via human-in-the-loop creep.** If autonomy stalls, every new customer adds operator load and gross margin degrades — defeating the model.
- **Discount drift** as deals get bigger or stickier — still off the table (`saas-b2b.md:55`).

---

## Horizon 3 — 4+ quarters out: Defensibility, platform, and channel lock-in

**Precondition:** A growing, retained 10–50 customer base with healthy unit economics and rising autonomy. H3 is about turning a good product into a hard-to-displace platform.

### Objective
Build durable defensibility so competitors and generic chatbots can't easily replicate BEVOX, and open the platform so growth compounds beyond what the core team can hand-build. Per the playbook, the mature corporate objective is "ship platform extensibility" (`saas-b2b.md:40`).

### Key bets
- **Data / RAG moat.** Every business BEVOX onboards deepens the corpus the AI secretary reasons over (Postgres 16 + pgvector). The accumulated, business-specific knowledge — availability rules, reschedule patterns, conversation history, billing behavior — becomes a compounding asset that a new entrant cannot cold-start. Make this moat explicit: invest in the data model and retrieval quality as a strategic asset, not just a feature.
- **Channel lock-in via the conversation layer.** BEVOX lives where the customer's customers already are: WhatsApp and Instagram, through `bevox-meta-api`. Owning the conversation channel (verified WhatsApp/Instagram presence, Meta integration depth) creates switching cost — the SMB's bookings, confirmations, and payment flows all run through a channel BEVOX operates. Extend toward true multi-channel coverage so the SMB's entire demand funnel is mediated by BEVOX.
- **Platform / extensibility.** Open the system so value can be added without core-team effort: integrations (Google Calendar, payment rails beyond the core flow), and an extensibility surface for the harness's declarative skills so new verticals' rules can be configured rather than coded. The playbook frames this as the long-horizon corporate bet — API adoption, integrations live, partner-sourced contribution (`saas-b2b.md:40`).
- **Compliance as a moat, not a cost.** At scale with Brazilian SMB and end-consumer data, LGPD compliance and trustworthy payment handling (Stripe Connect, Pix) become a credible barrier to fly-by-night competitors. Treat data governance as part of defensibility (`saas-b2b.md:33-34`).

### Leading metrics
- **NRR sustained >115%+**, increasingly from platform expansion (more channels, more seats, more usage) (`saas-b2b.md:38`).
- **Integrations live** and **share of activity flowing through BEVOX-owned channels** (channel lock-in depth) (`saas-b2b.md:40`).
- **RAG corpus depth / retrieval quality** as a tracked strategic asset.
- **Multi-channel coverage** of the customer's booking demand.
- Continued **gross margin >75%** and **LTV:CAC >3:1** at higher volume (`saas-b2b.md:23-24`).

### Risks / pitfalls to avoid
- **Platform before density.** Opening an extensibility surface before there's a retained customer base produces an empty platform — sequence after H2 succeeds.
- **One-whale platform design.** Building integrations or extensibility for a single large account rather than the ICP (`saas-b2b.md:56`).
- **Channel concentration risk.** Deep reliance on WhatsApp/Instagram via Meta is also a dependency — monitor Meta policy/API risk and keep optionality even while leaning into lock-in.
- **Compliance debt.** Deferring LGPD/data-governance discipline until forced is far costlier than building it in as the moat compounds (`saas-b2b.md:33`).

---

## Sequencing summary

| Horizon | Window | Objective | Gate to next horizon |
|---|---|---|---|
| **H1** | now → next quarter | Repeatable acquisition + productized onboarding; pricing locked; NRR/churn/CAC instrumented | Acquisition motion repeats; activation measured |
| **H2** | 2–4 quarters | Scale AI-secretary autonomy; disciplined vertical/segment expansion; first 1–3 hires; process discipline begins | Healthy NRR/CAC at 10–50 customers; rising autonomy ratio |
| **H3** | 4+ quarters | Data/RAG moat, channel lock-in, platform extensibility, compliance-as-moat | — |

Every horizon obeys the same four disciplines: repeatable before scaled, list price holds, build for the ICP not the whale, and measure activation not vanity (`saas-b2b.md:52-57`).
