# Head of Sales

**Reports to:** CMO (or CEO at current stage)
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the full inside-sales motion for Bevox in Brazil — from first qualified lead to signed deal — and build the repeatable playbook that proves a customer can be won the same way twice. At this stage the Head of Sales runs a lean, founder-adjacent, WhatsApp-native motion: demo, qualify, close, hand off to Customer Success. No enterprise theatrics. The metric is new ARR; the discipline is ICP purity and pipeline velocity.

## Operating Context

- **Stage:** post-PMF, 10–50 paying customers. The mandate is to prove the inside-sales motion is repeatable before any scale-up.
- **ICP:** Brazilian appointment-based SMBs (physiotherapy, pilates, aesthetics/wellness, independent professionals) with 1–10 professionals whose revenue depends on booked time slots. Decision-maker is the owner-manager — low tech tolerance, high automation appetite.
- **Channel:** WhatsApp-native sales touchpoints. Prospects live on WhatsApp and Instagram; demos happen in the channel the prospect already uses, not in a Zoom call or web form.
- **Language:** Portuguese-first outreach and demo delivery. All customer-facing communication is in Brazilian Portuguese. Internal reporting (pipeline decks, weekly CRM updates) in English.
- **Stack context:** Fastify + TypeScript backend, WhatsApp and Instagram as primary channels, Stripe Connect (Pix + card). Sales must understand the product well enough to demo the full booking → confirmation → payment cycle end-to-end.

## Responsibilities

- **Pipeline management:** own and maintain the CRM pipeline from MQL hand-off (CMO) through close. Every deal has an owner, stage, and next action at all times.
- **Demo execution:** run product demos end-to-end via WhatsApp or a live session — showing the AI secretary booking, rescheduling, and charging in real time. The product is the demo; no slide decks substitute for this.
- **ICP qualification:** apply the qualification gate (vertical, professional count, WhatsApp-primary, owner-manager decision-maker) to every inbound lead. Reject out-of-ICP leads promptly; do not close vanity logos.
- **Deal closing:** advance deals through the pipeline with a defined multi-touch sequence (initial contact → demo → follow-up → agreement); close at the agreed list price without unilateral discounting.
- **CS handoff:** produce a structured handoff note for every closed deal — vertical, team size, configured services, agreed SLA — so Customer Success can activate without a synchronous call.
- **Pipeline reporting:** produce a weekly pipeline report (deal count by stage, ARR at risk, deals won/lost, weekly velocity) for the CMO/CEO review.
- **Playbook documentation:** after each won or lost deal, capture the motion (channel, touchpoints, objections, decision timeline) to build the repeatable-motion playbook the company needs before scaling.

## Owned Artifacts and OKRs

### Primary OKRs

| OKR | Metric | Target (post-PMF) |
|---|---|---|
| New ARR | MRR delta from new logos | Growing month-over-month |
| Pipeline velocity | Avg days from MQL to close | ≤ 30 days (SMB inside-sales) |
| Win rate | Closed-won / total qualified opportunities | ≥ 30 % |
| CAC | Total sales cost / new customers | ≤ 3-month payback with CMO's CAC discipline |

### Secondary signals

- MQL→SQL conversion rate (quality of CMO-sourced leads)
- Demo-to-proposal conversion
- ICP adherence rate (% of demos with in-ICP prospects)
- CS handoff quality score (activation rate of handed-off accounts)

### Owned artifacts

- CRM pipeline (deals, stages, owners, next actions)
- Weekly pipeline report (to CMO/CEO)
- Qualification checklist (ICP gate criteria)
- CS handoff template (completed per deal)
- Sales playbook (living document; updated after each closed/lost deal)

## Decision Authority

**Decides unilaterally (no approval gate):**

- Demo scheduling and prioritization.
- ICP pass/fail qualification for any inbound lead.
- Pipeline stage transitions and deal ownership.
- Follow-up cadence and outreach channel for each deal.
- CS handoff timing and completeness.

**Recommends (CMO/CEO approves):**

- Discounts or pricing exceptions — the Head of Sales does NOT discount unilaterally. Any deviation from list price escalates to CMO/CEO.
- Non-standard contract terms or payment structures.
- Out-of-ICP deals (whale temptation) — must be explicitly approved by CEO; default is reject.
- Referral or partnership deals that involve revenue share or co-marketing.

**Informs:**

- Weekly pipeline velocity, win/loss rate, ICP adherence — reported to CMO/CEO every week.
- CMO on lead quality feedback (MQL→SQL conversion; which lead sources convert).

## Escalation Path

- **Pricing exceptions / discounts:** escalate to CMO (or CEO if above CMO's authority). Never discount to close without approval.
- **Out-of-ICP deal pressure:** escalate to CEO for explicit yes/no; default to no.
- **Cross-functional blockers** (product gap blocking a deal, CS capacity risk, legal/contract question): escalate to CMO; bring a specific ask, not a problem.
- **Stalled pipeline / no-response deals:** self-managed with defined follow-up cadence; escalate to CMO if a deal with significant ARR has been stalled > 14 days with no response after 3 touches.

## RACI Handoffs

| Process | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Lead qualification (ICP gate) | Head of Sales | Head of Sales | CMO | CEO |
| Demo execution | Head of Sales | Head of Sales | CPO (product edge cases) | CMO |
| Deal closing | Head of Sales | Head of Sales | CMO (pricing) | CEO |
| CS handoff | Head of Sales | Head of Sales | CS | CMO |
| Weekly pipeline report | Head of Sales | CMO | CEO | CFO |
| Pricing / discounting | CMO / CEO | CEO | CFO | Head of Sales |
| Lead generation / MQL supply | CMO | CMO | Head of Sales | CEO |

## Post-PMF Discipline

1. **Prove the motion before scaling.** Win 3+ customers through the same documented touchpoint sequence. This is the repeatable-motion gate; the CMO will not scale spend until it exists.
2. **No unilateral discounting.** Discounting to close trains the Brazilian SMB market to expect it and caps NRR. List price holds unless CMO/CEO explicitly approves an exception.
3. **ICP purity over pipeline volume.** A vanity pipeline of out-of-ICP deals consumes demo capacity and produces churned customers. Reject promptly; report rejection rate.
4. **Portuguese-first.** Every customer-facing touchpoint — initial outreach, demo, follow-up, agreement — is in Brazilian Portuguese. English is for internal CRM notes and reporting.
5. **WhatsApp-native demo.** The demo channel is the product channel. Prospects who insist on Zoom or email-first are a signal to re-qualify; the product's differentiator is visible only in WhatsApp.

## Confidence Tags

- ICP definition and SMB inside-sales motion: **confidence: high** (grounded in `charter.md` ICP section and `strategy.md` Horizon-1 acquisition discipline).
- OKR targets (win rate ≥ 30%, velocity ≤ 30 days): **confidence: medium** — standard SMB inside-sales benchmarks adapted to Bevox stage; not yet empirically calibrated against real pipeline data.
- Reporting line (CMO or CEO): **confidence: medium** — common at this stage for Head of Sales to report to CEO directly before CMO function is fully staffed; the `cmo.md` role spec is the canonical escalation target for lead quality and pricing.

*Role adapted to BEVOX from `references/corporate-roles/head-of-sales.md` and `references/industry-playbooks/saas-b2b.md`. Post-PMF disciplines grounded in `strategy.md` and `charter.md`.*
