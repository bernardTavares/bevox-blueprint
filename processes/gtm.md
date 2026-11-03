# BEVOX — Go-To-Market Process

This document describes how BEVOX wins a customer: the end-to-end go-to-market motion from first contact to a live, paying, activated business handed off to onboarding. It is a process doc, not a strategy doc — it tells each role *what to do, in what order, who owns it, and what bar must be cleared* at each stage. It consumes `raci-matrix.md` (rows 3 *Pricing & packaging* and 4 *Product launch* — the GTM motion), `strategy.md` (Horizon 1: make acquisition repeatable), `docs/agents/cmo.md` (the channel mix, positioning, and CAC discipline), and `charter.md` (ICP, business model, unit-economics targets). Where this doc and `raci-matrix.md` disagree on accountability, **the matrix wins** and this doc is corrected.

It is deliberately **stage-honest**: BEVOX is post-PMF with 10–50 paying customers, run by a single human (Bernard) and a roster of agents. This is a scrappy inside-sales / self-serve motion for small-business deals, not an enterprise field-sales playbook. We do not build a sales org, a paid-channel machine, or a discount desk before the motion has earned it.

---

## The one non-negotiable: prove repeatability before scaling

Before any of the stage mechanics below matter, the single governing discipline of this process must be stated, because every other decision bends to it:

1. **Prove repeatable acquisition before scaling spend.** No paid-channel scale-up, no second sales motion, no hire-to-grow until at least **2 customers have been won through the *same* documented motion** (`references/industry-playbooks/saas-b2b.md:52-53`; `strategy.md` Horizon 1; `docs/agents/cmo.md:32-33,77`). Scaling spend on an unproven motion is the canonical SaaS killer. The repeatability bar is the gate on this entire process — until it is cleared, GTM is *founder-led / referral / Instagram-sourced inbound being instrumented and written down*, not "growth."
2. **No discounting to close.** List price holds. Promotional discounting trains the Brazilian SMB market to expect it and structurally caps Net Revenue Retention (`references/industry-playbooks/saas-b2b.md:52,55`; `docs/agents/cmo.md:34`). Value is communicated through the secretary paying for itself — one extra filled slot per week — never through a price cut. A deal that only closes on a discount is not a repeatable deal; it is a leak in the model.
3. **Build for the ICP, not the whale.** Every message, demo, and packaging decision serves the repeatable ICP (Brazilian appointment-based SMBs, 1–10 professionals), not a single loud prospect (`references/industry-playbooks/saas-b2b.md:56`).
4. **Measure activation, not vanity signups.** The motion is judged by activated AI secretaries handling real bookings, not by raw signups (`references/industry-playbooks/saas-b2b.md:57`). The funnel below ends at *activation handed to onboarding*, not at *signed*.

---

## ICP and where this motion plays

From `charter.md` and `docs/agents/cmo.md:12-14`:

- **Segment:** Brazilian SMBs with 1–10 professionals whose revenue depends on booked time slots.
- **Verticals (initial):** physiotherapy, pilates, sports studios, aesthetics/wellness, independent professionals (personal trainers, nutritionists, psychologists).
- **Decision-maker:** the owner-manager, usually also a practitioner. Low tolerance for software complexity; high tolerance for automation that works invisibly. This is a **single-stakeholder, fast-cycle SMB sale** — there is no procurement committee, no security questionnaire, no 6-month enterprise cycle. The deal is won in a conversation, not a process.
- **Channel reality:** this ICP lives on **WhatsApp and Instagram**. Clients book by DM or link, not a web form. Marketing that does not meet them there does not exist to them.
- **ACV band:** small-business deals in the roughly **R$1–10K ACV** range (`references/industry-playbooks/saas-b2b.md:43`). At this band the *only* viable economics come from an **inside-sales / self-serve motion** — low-touch, founder-or-secretary-led, no field reps, no SDR layer. The cost of the motion must fit inside a sub-3-month CAC payback (`charter.md`; `docs/agents/cmo.md:69`).

---

## Positioning carried into the funnel

The CMO owns the messaging house (`docs/agents/cmo.md:38,84` — CMO is **A/R** for positioning). Every stage of this funnel carries the same three claims; sales and demo language never invents its own:

- **Against generic chatbots:** "Não é um chatbot que responde. É uma secretária que resolve." Bevox closes the full cycle — availability → booking → confirmation → reschedule → billing → follow-up — and charges the card (`docs/agents/cmo.md:21`; `charter.md:30-31`).
- **Against clinic software** (Ninsaúde, iClinic, Doctoralia): "Sem sistema para aprender. A secretária já sabe o que fazer." Bevox replaces the receptionist rather than sitting behind one (`docs/agents/cmo.md:22`; `charter.md:33-34`).
- **The wedge — unified calendar + conversation + payments:** three previously separate tools (scheduling, WhatsApp/Instagram messaging, Stripe Connect with Pix + card) in one programmable flow run by a single AI secretary (`docs/agents/cmo.md:23`; `charter.md:36-37`).
- **Proof, not adjectives.** Positioning is sold by the secretary doing a real booking end-to-end on WhatsApp with Pix settling — not with feature lists (`docs/agents/cmo.md:24`). The product *is* the demo.

The channel motion is **WhatsApp-native and Instagram-native, Portuguese-first, vertical-specific** (`docs/agents/cmo.md:27-34`): Instagram is the top of funnel (organic + the owner's audience + targeted DM-to-link); WhatsApp is the conversion and demo surface where the prospect experiences the secretary in the exact channel they will run their business in. Messaging runs as **separate vertical tracks** — physiotherapy (no-shows), pilates (class/credit management), aesthetics/wellness (rebooking + aftercare) — because a physio clinic and a pilates studio do not respond to the same ad (`docs/agents/cmo.md:31`).

---

## The funnel: stages, owners, and exit bars

The motion is a small number of stages, each with **exactly one accountable owner** (consistent with `raci-matrix.md`: pricing row → CEO **A**, CMO framing **R**; product-launch / GTM row → CPO **A** for the launch, CMO **R** for the GTM motion; close → Sales, which ladders up under the CMO at this stage per `org-chart.md` and `raci-matrix.md:28`). Each stage has an **exit bar** — a deal does not advance until it is met. No stage may be skipped to make a number look better.

> **Owner note (stage honesty):** Today, "Sales" and "Marketing" both ladder up to the **CMO** (`raci-matrix.md:28`). The CMO is **A** for marketing-sourced pipeline and lead quality; **Sales** is the **A** for *working and closing* the qualified lead (`docs/agents/cmo.md:55,86`). A dedicated Head of Marketing/Sales is a planned Phase 1b/2 role; until it exists, the CMO carries that R. The funnel below names the *function* (Marketing / Sales) so it stays correct as the org grows.

### Stage 0 — Demand generation (lead generation)
- **Accountable:** CMO (`raci-matrix.md` row 4, CMO **R** for GTM; `docs/agents/cmo.md:41`).
- **What happens:** WhatsApp/Instagram-native, Portuguese-first, vertical-targeted content and the founder-led / referral / Instagram-sourced inbound motion generate first contact. Instagram organic + the owner's audience + targeted DM-to-link at the top; the prospect is invited into a WhatsApp conversation.
- **No paid scale-up here** until the repeatability gate is cleared (see above).
- **Exit bar → Lead:** a real owner-manager in the ICP has started a WhatsApp/Instagram conversation or clicked through a vertical-specific DM-to-link. Captured with vertical tag and source.

### Stage 1 — Qualification (MQL → SQL)
- **Accountable for the marketing-qualified bar:** CMO (owns the MQL definition; `docs/agents/cmo.md:55,86`). **Accountable for working/qualifying into a sales-qualified opportunity:** Sales.
- **What happens:** confirm ICP fit on three axes before spending demo effort — (a) **vertical fit** (physio / pilates / aesthetics / adjacent appointment-based SMB), (b) **scale fit** (1–10 professionals, revenue tied to booked slots), (c) **channel fit** (already runs the business on WhatsApp/Instagram). Disqualify whales and out-of-ICP prospects here, not later — building the demo around a non-ICP prospect corrupts the repeatable motion (`references/industry-playbooks/saas-b2b.md:56`).
- **MQL → SQL handoff with SLA:** when Marketing marks a lead MQL, **Sales responds within 1 business hour** during operating hours (WhatsApp is a fast channel; a slow reply loses an SMB owner who is between clients). The qualification criteria and response-time SLA are **agreed jointly by CMO and Sales and reviewed on conversion data**; Sales feedback on lead quality is binding input to Marketing's channel decisions (`docs/agents/cmo.md:55,86`).
- **Exit bar → SQL:** ICP fit confirmed on all three axes, decision-maker (owner-manager) identified and engaged, and a demo/trial of the live booking cycle scheduled.

### Stage 2 — Demo / trial
- **Accountable:** Sales (working the opportunity); CPO **C** on product readiness for the demo path (`raci-matrix.md` row 4).
- **What happens:** the prospect experiences the AI secretary doing a real booking end-to-end **on WhatsApp** — availability → booking → confirmation → reschedule → billing (Pix settling) → follow-up — for *their* vertical. This is "the product is the demo" (`docs/agents/cmo.md:30,24`). No slide decks; the secretary itself is the proof. The trial is configured against the prospect's real services and availability so they see their own business running through it.
- **Pricing surfaces here, not before** (see "Where pricing/packaging sits" below). Value is anchored to one extra filled slot per week, never to a discount.
- **Exit bar → Opportunity ready to close:** prospect has seen the full cycle work on their vertical, understands the per-professional + PSP-fee model, and has no open blocker except the decision.

### Stage 3 — Close
- **Accountable:** Sales (the close), within the list price the **CEO** owns and the **CFO** signed off (`raci-matrix.md` row 3 — pricing **A** = CEO; CFO **R** economics/list price).
- **What happens:** the deal is closed at list price. **No discounting** as a closing lever (`references/industry-playbooks/saas-b2b.md:55`; `docs/agents/cmo.md:34`). If a prospect will only close on a discount, that is a signal about fit or value communication — fix the message or accept the no, do not cut price. Per-professional subscription tier and the Stripe Connect PSP fee split are agreed; Stripe Connect Express subaccount onboarding is initiated.
- **Exit bar → Won (lead → activation handoff begins):** signed at list price; first seat(s) and Connect Express subaccount provisioned; handoff packet (vertical, services, availability rules, confirmation/reschedule policy, pricing) prepared for onboarding.

### Stage 4 — Handoff to onboarding / activation
- **Accountable:** COO (customer success / onboarding owns activation; `raci-matrix.md` row 7 R = COO; `processes/customer-success.md` carries onboarding/activation). CPO **C** on activation / time-to-value.
- **What happens:** the won customer is handed to onboarding with the full configuration packet captured during demo/trial, so onboarding starts from real data rather than a blank slate. The GTM motion's job is done **only when the secretary is activated** — autonomously handling the live booking cycle for a real business (`strategy.md` H1 activation definition; `references/industry-playbooks/saas-b2b.md:57`). A signed-but-not-activated customer is a GTM failure, not a win.
- **Exit bar (the true end of the funnel):** AI secretary live and autonomously handling bookings; customer counted as **activated**, not merely signed.

---

## Where pricing/packaging sits in the funnel

Pricing is **introduced at the demo/trial stage** (Stage 2) and **agreed at close** (Stage 3) — never used as a top-of-funnel hook and never as a discount lever. The packaging shown to the market is the one decided in `raci-matrix.md` row 3 and grounded in `charter.md`:

- **Per-professional SaaS subscription:** a monthly recurring fee per active professional seat, anchored to the value of one fully booked day — the secretary pays for itself if it fills one extra slot per week (`charter.md:60-62`).
- **PSP transaction fee via Stripe Connect:** a small fee on top of Stripe's network cost for each Pix or card payment processed; the split routes automatically to the business's Connect Express subaccount and Bevox's platform account at settlement (`charter.md:63-64`).

**Ownership of the price the market sees** (per `raci-matrix.md` row 3): the **CEO is A** (final word on price); the **CPO is R** for the packaging *model/structure* (tiers, seat vs. usage, what's bundled vs. metered); the **CFO is R** for the *economics and list price* (unit economics, margin sign-off); the **CMO is R** for *framing/positioning* (willingness-to-pay input and how value is communicated) and owns the price narrative once set (`docs/agents/cmo.md:57,87`). Expansion comes from seat adds and growing payment volume — **not** discounting — which is what protects NRR (`charter.md:66-68`).

---

## RACI summary for this process

Consistent with `raci-matrix.md` (rows 3 and 4); names the *function* so it stays correct as planned leads instantiate.

| Funnel stage | Accountable (A) | Responsible (R) | Consulted (C) | Informed (I) |
|---|---|---|---|---|
| Demand generation | CMO | Marketing (CMO) | CPO (vertical proof) | CEO |
| Qualification (MQL→SQL) | CMO (MQL bar) / Sales (SQL) | Marketing + Sales | — | CPO |
| Demo / trial | Sales | Sales | CPO (product readiness), CMO (message) | CEO |
| Close | Sales | Sales | CFO (list-price/economics), CEO (price authority) | COO |
| Pricing & packaging (model) | **CEO** (price) | CPO (structure) + CFO (economics) + CMO (framing) | CTO (infra cost) | COO |
| Handoff → activation | COO | COO (onboarding) | CPO (TTV) | CMO, Sales |

> One **A** per row. Where two functions appear in a single cell (MQL vs. SQL), they are two distinct sub-decisions with distinct owners, not two A's on the same decision — the one-A rule holds.

---

## Anti-pitfalls baked into this process

These are the failure modes this process exists to prevent (`references/industry-playbooks/saas-b2b.md:52-57`; `strategy.md`; `docs/agents/cmo.md:33-34,77-80`):

- **Premature GTM scaling.** No paid-channel scale-up and no second motion until 2+ wins through the *same* documented motion. The repeatability gate sits in front of every growth dollar (`references/industry-playbooks/saas-b2b.md:53`).
- **Discounting to close.** Off the table at every stage. List price holds; value is communicated through the secretary paying for itself (`references/industry-playbooks/saas-b2b.md:55`).
- **Building for the whale.** Disqualify out-of-ICP prospects at Stage 1; never bend the demo, message, or packaging toward a single loud prospect (`references/industry-playbooks/saas-b2b.md:56`).
- **Counting vanity signups.** The funnel ends at *activation*, not at *signed*. A signed customer whose secretary is not live is not a win (`references/industry-playbooks/saas-b2b.md:57`).
- **CAC outrunning the band.** The motion stays inside an inside-sales / self-serve cost structure that clears a ≤ 3-month CAC payback for R$1–10K ACV deals (`references/industry-playbooks/saas-b2b.md:43`; `charter.md`; `docs/agents/cmo.md:69`). A channel or campaign that cannot clear that bar is refused (`docs/agents/cmo.md:78`).
- **Slow handoffs.** The MQL→SQL SLA (1 business-hour response) and the win→onboarding handoff packet exist so prospects do not stall between functions; WhatsApp is a fast channel and a slow reply loses the deal.

---

## Maintenance

This doc is downstream of `raci-matrix.md`; it must never assign accountability that contradicts it. Two triggers force an update *before* the change takes effect: (1) a planned lead is instantiated (Head of Marketing/Sales under CMO, Head of Customer Success under COO) — move the R to the new lead and record it; (2) the pricing/packaging model changes in `raci-matrix.md` row 3 — re-derive the "Where pricing sits" section. The CMO owns keeping the demand-side mechanics current; the CEO keeps the whole picture coherent across `charter.md`, `strategy.md`, `org-chart.md`, `raci-matrix.md`, and the `processes/` docs.

---

*Grounding:* funnel ownership and the pricing/launch RACI from `raci-matrix.md` (rows 3 and 4) and `org-chart.md`; ICP, business model, and unit-economics targets from `charter.md`; channel mix, positioning, vertical-specific Portuguese-first motion, lead-quality/SLA, and CAC discipline from `docs/agents/cmo.md` (esp. lines 12-14, 21-24, 27-34, 38, 41, 55, 57, 69, 77-80, 84-87); Horizon-1 "make acquisition repeatable / measure activation" sequencing from `strategy.md`. The four governing disciplines — prove repeatable before scaling spend, list price holds, build for the ICP not the whale, measure activation not vanity — and the SMB inside-sales / self-serve, R$1–10K ACV stage-sizing are grounded in the SaaS B2B playbook (`references/industry-playbooks/saas-b2b.md:43,52-57`) and the canonical CMO role template (`references/corporate-roles/cmo.md:37-43`).
