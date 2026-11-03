# BEVOX — Customer Success Process

This is the canonical, written description of how a BEVOX account is run from the moment the sale closes to renewal and expansion. It is the place every customer-facing action looks first. It consumes `raci-matrix.md` (Row 7 — Billing & PSP operations — plus the onboarding/activation inputs from Row 4, Product launch), `docs/agents/coo.md` (the COO's customer-lifecycle mandate), `strategy.md` (the Horizon-1/Horizon-2 onboarding-and-retention bets), and `charter.md` (business model, ICP, WhatsApp/Instagram + Stripe Connect/Pix rails). Where this doc and `raci-matrix.md` disagree on who is accountable, **the matrix wins** and this doc is corrected.

For an AI-secretary product, "customer success" has one defining meaning: the AI secretary reaching and holding **higher autonomy** for the business. Every stage below is in service of that — onboarding teaches the secretary the business's rules; activation is the secretary autonomously running the live booking cycle; ongoing success is autonomy rising while cost-to-serve falls; churn risk is autonomy stalling or reversing. Success is not "the customer logged in"; it is "the AI secretary is doing the receptionist's job, and doing more of it each month."

## Stage honesty

This process is sized for BEVOX **as it is**: post-PMF, scaling toward 10–50 paying customers, operated by a single human (Bernard) and a roster of agents (`charter.md` — Stage-honest speed). It is deliberately light-touch. There is no ticketing tier system, no enterprise success-plan template, no quarterly business reviews per account. The discipline here is the *minimum viable* operating cadence that protects activation and retention as customers are added without adding chaos (`docs/agents/coo.md` — Stage-honest process). When the customer count and the team grow, this process grows with them — but not before.

All customer communication is **Portuguese-first** and lives where the customer's customers already are: **WhatsApp and Instagram**, via `bevox-meta-api`, with the in-app dashboard as the secondary surface for the owner-manager (`charter.md` — Brazilian context, not translated software; Client-first simplicity). We do not push customers to email or a web portal for routine touchpoints.

## Ownership (from `raci-matrix.md`)

| Concern | Accountable (A) | Responsible (R) | Consulted (C) | Informed (I) |
|---|---|---|---|---|
| Customer lifecycle ops (onboarding → success → renewal) | **COO** | COO today; **Head of Customer Success** once instantiated (Phase 1b/2) | CPO (onboarding friction → discovery) | CEO |
| This process doc | **COO** (author) | COO | CPO, CFO | CEO |
| Retention / NRR / GRR — the *motion* | **COO** | COO; Head of CS (future) | CPO (autonomy/feature impact) | CEO |
| Retention / NRR / GRR — the *reported number* | **CFO** | Head of Finance (future) | COO | CEO |
| Billing experience inside the lifecycle | **CFO** (money) | CTO (Stripe Connect code path), COO (billing-incident ops) | CPO (pricing model) | CEO |
| WhatsApp/Instagram channel health (service level) | **COO** | CTO + `bevox-meta-api` (integration layer) | — | CEO |

Two stage-honest rules, straight from the matrix:

1. **Exactly one A per concern.** The COO is the single accountable owner of the customer-lifecycle motion today. The **Head of Customer Success** is a *planned* Phase 1b/2 role (`raci-matrix.md` — stage honesty); it appears below as the future R-holder and the named owner of the churn-risk duty, but **today the COO carries both the A and the R**. We do not invent accountability for a role that has not been instantiated.
2. **Money vs. motion split.** The COO owns the *retention motion*; the **CFO owns the reported NRR/GRR number** and the billing economics (`docs/agents/coo.md` — Churn/NRR/GRR: COO owns the motion, CFO owns the reported number). This doc owns the motion and defers the math to `processes/billing-incidents.md` and the CFO's reporting.

---

## Stage 1 — Onboarding: the AI secretary learns the business's rules

**Goal:** capture everything the AI secretary needs to operate the business, fast, and feed it into the RAG layer (Postgres 16 + pgvector) so the secretary can reason over it. Onboarding is treated as a **product, not a service** — a structured capture flow, not a bespoke consulting engagement (`strategy.md`, H1 — Onboarding as a product, not a service).

**Owner:** COO accountable; Head of CS responsible once it exists. CPO consulted — onboarding friction is a primary discovery signal back to the roadmap.

**What gets captured (the secretary's rule set):**
- **Availability rules** — working hours per professional, slot durations, buffers, blackout dates, multi-professional/resource constraints.
- **Services & pricing** — the service menu, durations, prices, and which services map to which professional.
- **Confirmation / reschedule / cancellation policy** — how far ahead reminders fire, the reschedule window, no-show and cancellation rules, deposit/charge policy.
- **Payment setup** — Stripe Connect Express subaccount onboarding for the business (so funds route correctly at settlement), Pix as primary rail, card as secondary (`charter.md` — Business model).
- **Channel connection** — verified WhatsApp and Instagram presence wired through `bevox-meta-api`, so the secretary can transact in the channels the clients already use.
- **Voice & tone** — Portuguese-first, matched to the business's style, so the secretary sounds like the business, not a generic bot.

**Definition of done for onboarding:** the secretary has a complete, validated rule set in the RAG layer, the Stripe Connect subaccount is live, and at least one channel (WhatsApp) is connected and verified. Onboarding is **not** "done" because a form was submitted — it is done when the secretary *can* run a live booking end to end. The leading metric is **time-to-activation** (signup → first autonomous booking cycle), and the COO drives it **down** (`strategy.md`, H1 leading metrics).

## Stage 2 — Activation / time-to-value

**Goal:** the AI secretary autonomously handles the **live booking cycle** for a real business: availability → booking → confirmation → reschedule → billing → follow-up (`strategy.md`, H1 — activation definition; `docs/agents/coo.md` — drive the secretary to activation).

**Owner:** COO accountable; CPO consulted (activation friction is the shared north-star metric with the CPO).

**Activation is the real north star — not signups, not "businesses created"** (`strategy.md`, H1 — Track activation, not vanity signups). A customer is activated when the secretary has autonomously handled at least one full booking cycle in production for a live client, including taking a Pix or card payment through Stripe Connect.

**Time-to-value touchpoints (WhatsApp/Instagram-native, Portuguese-first):**
- A "your secretary is live" confirmation to the owner-manager once the first real booking flows through, in-channel.
- A first-week check-in: is the secretary handling bookings the way the business expects? Capture any rule corrections and feed them straight back into the RAG layer.
- A daily revenue + booking report to the owner-manager (the Owner/Manager persona expects this — `charter.md`, Four Personas), delivered in-app and surfaced via the channel.

**Activation gate to "ongoing success":** the secretary is handling the booking cycle without per-booking human intervention, and the owner-manager has seen at least one daily report reflecting real activity.

## Stage 3 — Ongoing success: autonomy rises, cost-to-serve falls

**Goal:** keep the account healthy and push the **autonomy ratio** up — the share of booking-cycle actions the secretary handles without a human operator (`strategy.md`, H2 — Autonomy ratio). Rising autonomy is what makes gross margin hold at SMB ACVs; stalling autonomy is the margin-erosion early warning (`docs/agents/coo.md` — cost-to-serve).

**Owner:** COO accountable; Head of CS responsible once it exists.

**The operating cadence (light-touch, post-PMF):**
- **Weekly business review** across the book: NRR, GRR, churn, support SLA, cost-to-serve, activation rate, autonomy ratio (`docs/agents/coo.md` — operating cadence). This is a portfolio review, **not** a per-account QBR.
- **Support SLA** on WhatsApp/Instagram and in-app: the COO owns the response-time SLA; the CTO is responsible for the technical fix when an exception requires code. Exceptions the secretary escalates go to the human operator / receptionist persona, who is meant to do *less* over time as autonomy increases (`charter.md`, Four Personas).
- **Channel health** as a product-level concern: if WhatsApp/Instagram degrade, the product degrades. The COO owns the service-level outcome; CTO + `bevox-meta-api` own the integration layer (`docs/agents/coo.md` — own WhatsApp/Instagram operational health).

**Health signals tracked per account** (these feed the churn-risk scan in Stage 4):
- **Autonomy ratio** — trending down is the strongest leading churn signal for an AI-secretary product. If a human is increasingly doing what the secretary should, the value is leaking.
- **Booking volume through the secretary** — falling volume means the business is routing around BEVOX.
- **Payment success rate** (Pix/card via Stripe Connect) — repeated failures erode trust fast.
- **Support-exception rate and cost-to-serve** — rising load per account signals friction the customer feels.
- **CSAT** and **response-SLA breaches** — the leading indicator of service-cycle health (`docs/agents/coo.md` — KPIs).
- **Owner engagement** — is the owner-manager still reading the daily report / acting on it?

## Stage 4 — Churn-risk handling

**Goal:** catch at-risk accounts **early**, before the renewal conversation, and intervene. This is the duty that feeds the **churn-risk-scan cron**, owned by the **Head of Customer Success** once that role exists; **until then the COO runs it** (`raci-matrix.md` — stage honesty; `docs/agents/coo.md` — catch at-risk accounts early).

**Churn-risk thresholds (the signals that flip an account to at-risk and feed the cron):**

| Signal | At-risk threshold (stage-honest, tune as N grows) |
|---|---|
| Autonomy ratio | Declining 2+ consecutive weeks, or human-in-the-loop on >40% of booking cycles |
| Booking volume through the secretary | Down >30% week-over-week with no seasonal cause |
| Payment success rate | Below 90%, or 2+ failed settlements in a billing cycle |
| Support-exception rate / cost-to-serve | Cost-to-serve rising while booking volume is flat or falling |
| CSAT / SLA | CSAT below target, or repeated response-SLA breaches |
| Owner engagement | No dashboard/report engagement for 14+ days |
| Payment / dunning | Subscription payment failure entering dunning (handoff to `processes/billing-incidents.md`) |

When the scan flips an account to at-risk, the owner (COO today; Head of CS later) runs the intervention:
1. **Diagnose** — which signal tripped, and is it product friction (route to CPO as discovery), a billing problem (route to `processes/billing-incidents.md`), or a usage/fit problem?
2. **Reach out in-channel** — a Portuguese-first WhatsApp touch to the owner-manager, not an email blast. Offer to re-tune the secretary's rules or fix the broken flow.
3. **Re-onboard the gap** — if autonomy is stalling because the rule set is stale, capture the missing rules and re-feed the RAG layer. Most autonomy decay is a rules problem, not a product problem.
4. **Escalate** — billing/PSP failures to the billing-incident playbook; product gaps to the CPO as a discovery signal (`docs/agents/coo.md` — feed onboarding friction back to the CPO).
5. **Record the outcome** so the weekly business review sees the at-risk trend, not just point-in-time snapshots.

**Discounting is not a churn-save tool.** We do not discount to retain an account — it permanently caps NRR and trains the Brazilian SMB market to expect it (`strategy.md` — Do not discount to close). The save is always "make the secretary work better / do more," never "charge less."

## Stage 5 — Renewals & expansion

**Goal:** renew the base (defend **GRR**) and expand within accounts (drive **NRR** above 100%) — **without discounting** (`strategy.md`, H2 — NRR via expansion, not discounting).

**Owner:** COO owns the renewal/expansion motion; CFO owns the reported NRR/GRR number (`docs/agents/coo.md` — Retention / NRR / GRR).

**Expansion is the NRR engine, and it is structural to the BEVOX model:**
- **Seat add** — each new professional at the business is a new per-professional subscription seat (`charter.md` — per-professional SaaS subscription). A growing business adds seats; that is expansion.
- **Payment-volume growth** — as the secretary handles more bookings and more payments flow through Stripe Connect, the PSP transaction-fee revenue grows with the account (`charter.md` — PSP transaction fee). More autonomy → more volume → more expansion revenue, with no discounting required.

**Renewal motion (light-touch):**
- Renewals run quietly off the subscription billing cycle; a healthy, activated, high-autonomy account renews by default. The renewal conversation is the *exception*, triggered by a churn-risk signal, not a calendar ritual.
- Watch for expansion triggers in the weekly review: accounts adding professionals, accounts whose booking/payment volume is climbing — these are the seat-add and volume-expansion opportunities.
- Surface expansion in-channel and in the daily report (the owner-manager already sees revenue there), never via a discount-led upsell.

## Outcome metrics

The COO reviews these every cadence cycle; they are the vital signs of whether customer success is working (`charter.md` — Measurable trust; `docs/agents/coo.md` — KPIs owned):

| Metric | Target (post-PMF, stage-honest) | Who owns |
|---|---|---|
| **NRR** (Net Revenue Retention) | **≥ 110% at 12 months**, driven by seat add + payment-volume growth (not discounting); H2 stretch toward >130% best-in-class | COO (motion) / CFO (number) |
| **GRR** (Gross Revenue Retention) | The floor that proves the base is not leaking — keep logo and revenue churn low even at small N | COO (motion) / CFO (number) |
| **CSAT** | Above target on WhatsApp/Instagram + in-app | COO |
| **Autonomy ratio** | Rising — the AI-secretary north star for success | COO (shared with CPO) |
| **Time-to-activation** | Trending down | COO |
| **Activation rate** | The real north star, not signups | COO (shared with CPO) |
| **Cost-to-serve per active account** | Falling as autonomy rises (margin early-warning) | COO |
| **Cycle time** (onboard/activate, resolve) | Compressing | COO |

NRR/GRR targets are grounded in `charter.md` (Business model — NRR ≥ 110% at 12 months) and the SaaS B2B retention benchmark (`references/industry-playbooks/saas-b2b.md:17-24` — NRR > 110% target, best-in-class > 130%; LTV:CAC > 3:1; gross margin > 75%). The COO's accountability for the lifecycle and the NRR/GRR/CSAT/cost-to-serve KPI set is grounded in the canonical COO role spec (`references/corporate-roles/coo.md:28-43`).

## Handoffs to adjacent processes

- **Billing failures, dunning, Stripe Connect / Pix reconciliation** → `processes/billing-incidents.md` (CFO accountable for the money; CTO for the code path; COO for the billing-incident ops). A churn-risk payment signal hands off here.
- **Operational / Sev-graded incidents** (channel outage, secretary malfunction) → `processes/billing-incidents.md` incident handling (CTO incident commander; COO customer comms — `raci-matrix.md` Row 5).
- **Onboarding friction & product gaps** → fed to the **CPO** as discovery signal for `processes/product-strategy.md`.
- **Pricing/packaging questions raised in renewals** → the COO is **consulted** on cost-to-serve; pricing is owned by CEO/CPO/CFO via `processes/gtm.md`.

---

*Grounding:* lifecycle stages, ownership, and KPIs from `docs/agents/coo.md` (the COO's customer-lifecycle mandate and KPI set) and `raci-matrix.md` (Row 7 + Row 4; COO accountable, Head of CS as the future R-holder, CFO owns the reported number). Onboarding-as-product, activation-as-north-star, autonomy-as-growth-lever, and no-discounting disciplines from `strategy.md` (H1/H2). Business model (per-professional subscription + PSP fee), ICP, personas, WhatsApp/Instagram + Stripe Connect/Pix rails, Portuguese-first, and stage honesty (post-PMF, 10–50 customers, single human) from `charter.md`. NRR benchmark and unit-economics targets cite `references/industry-playbooks/saas-b2b.md:17-24`; the COO role/KPI canon cites `references/corporate-roles/coo.md:28-43`.
