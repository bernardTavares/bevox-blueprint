# Billing & Payment-Incident Response Runbook

This runbook governs how BEVOX detects, triages, communicates, resolves, and reconciles **billing and payment incidents** on the Stripe Connect flow. It is derived from `raci-matrix.md` — specifically **Row 5 (Incident response)** and **Row 7 (Billing & PSP operations)** — and it inherits the one-A-per-process discipline from that matrix. Where this doc and `raci-matrix.md` disagree on who is accountable, **the matrix wins** and this doc is corrected.

A billing incident is any event where money moved incorrectly, did not move when it should have, or moved with the wrong attribution: a failed Pix or card charge, a fee-split discrepancy, a Connect Express subaccount problem, a refund or chargeback dispute, or a delayed payout. The defining test is simple — **if a number does not reconcile, it is an incident** (`docs/agents/cfo.md` responsibility 3: "Numbers that do not reconcile are treated as incidents").

This is a post-PMF runbook for 10–50 paying customers operated by a single human (Bernard) and a roster of agents. It is sized for that stage: scrappy, fast, and stage-honest. The department leads named below (Head of Finance, Head of Customer Success, Head of Engineering, Head of Legal) are **Phase 1b/2 planned** per `org-chart.md` — until they exist, their C-suite parent carries both the A and the R. We do not invent on-call rotations or PagerDuty schedules we do not yet have; the "responder" today is the relevant C-suite agent.

## Ground truth: how money moves at BEVOX

BEVOX runs a **dual revenue model** on **Stripe Connect** with BEVOX as the platform (`objective.md:10` — "SaaS per-professional subscription + PSP transaction fee via Stripe Connect (Pix + card, Connect Express subaccounts, automatic Bevox-fee split)"; `references/corporate-roles/cfo.md:37-43`, the canonical CFO revenue-model and authority block):

- **Subscription line.** A per-professional SaaS seat billed monthly to the business. High-margin, predictable MRR. Recognized over the service period.
- **PSP / payment line.** For each Pix or card payment the business collects from its end client, funds route to the business's **Connect Express subaccount** and BEVOX's platform account **simultaneously at settlement** via an automatic **application-fee split** (`application_fee`). **Pix** (instant, zero-cost to the end client) is the primary rail; **card** is secondary. Recognized at transaction.

The two failure surfaces this creates:

1. **BEVOX-as-customer-of-the-business** — the subscription charge BEVOX bills the business (a normal SaaS dunning problem).
2. **BEVOX-as-platform** — the payments the business's *own clients* make, which BEVOX processes and skims a fee from. A failure here breaks the customer's revenue, not just ours, so it is higher-severity by default.

## Roles and ownership (per `raci-matrix.md`)

Billing incidents sit at the intersection of two matrix rows, so they carry **two accountable owners across two dimensions**, resolved to satisfy the one-A rule:

| Dimension | Accountable (A) | Responsible (R) | Consulted (C) | Informed (I) |
|---|---|---|---|---|
| **Technical money-movement integrity** (Stripe Connect webhooks, fee-split correctness in code, subaccount integrity) | **CTO** — incident commander (Row 5) | CTO + engineering agents | CFO if money/PSP impacted | CEO; Bernard for Sev1/breach |
| **Billing economics & reconciliation** (the money is *correct*, refunds/chargebacks/disputes, the ledger reconciles) | **CFO** (Row 7) | COO (billing-incident handling/ops); CTO (technical fix) | CPO (pricing model); Legal (disputes) | CEO |

In plain terms, holding the one-A rule:

- The **CTO is the incident commander** for the technical event — they hold the authority to roll back a deploy, disable a feature, replay a webhook, or take the AI secretary off autonomous mode (`docs/agents/cto.md` decision authority: "incident commander with authority to roll back, disable features, or take the AI secretary off autonomous mode"; `raci-matrix.md` Row 5).
- The **CFO is accountable for the money being right** — fee-split correctness, reconciliation, refund/chargeback economics, and the final sign-off that the books reconcile after resolution (`raci-matrix.md` Row 7: "CFO — money in/out, Stripe Connect economics, fee-split correctness, reconciliation").
- The **COO carries the R for customer-facing comms and billing-incident operations** — the day-to-day "did the customer get charged correctly, and if not, how do we fix it and tell them" (`raci-matrix.md` Row 5, Row 7).
- The **CTO + engineering agents carry the R for technical mitigation.**
- **Legal is Consulted** on disputes (chargeback representment, regulatory exposure, LGPD).
- **CPO is Consulted** on the pricing model when the discrepancy is a packaging/billing-logic question, not a code bug.
- **Bernard is Informed** routinely and is the **escalation target** for any Sev1, any breach, any irreversible or large-value financial action, and anything that crosses a spend cap (`docs/agents/cfo.md` decision authority: escalates "any **irreversible financial commitment**"; `raci-matrix.md`: Bernard is "the escalation target for the three gated decisions: irreversible, legal/regulatory, and over-the-spend-cap").

> **The split, stated once:** CFO owns the money, COO owns the customer-facing operation, CTO owns the code path. Three R's, one A per dimension. (`raci-matrix.md` process-to-doc note for `processes/billing-incidents.md`.)

The **future delegates** (Phase 1b/2): **Head of Finance** carries reconciliation/reporting R under the CFO; **Head of Customer Success** carries billing-incident comms R under the COO; **Head of Engineering** carries mitigation R under the CTO; **Head of Legal** carries dispute R under the CFO. Until instantiated, each C-suite parent holds the R directly.

## Severity levels

Severity drives speed, who is paged, and when Bernard is woken. Classify on **detection** and re-classify as facts change.

| Sev | Definition | Examples | First response | Escalation |
|---|---|---|---|---|
| **Sev1** | Money is moving wrongly *at scale* or *irreversibly*, or the payment rail is down for customers. Customer revenue is blocked or a financial-data breach is suspected. | Fee-split applying the wrong `application_fee` across many transactions; Pix settlements not reaching Connect subaccounts; double-charging end clients; suspected exposure of billing/PII or card data; payouts globally frozen. | Immediate. CTO assumes incident command now. | **Bernard informed immediately** (Sev1 + any breach). CEO Consulted. Legal Consulted if breach/dispute. |
| **Sev2** | Money is wrong for a *bounded* set, recoverable, but actively harming a customer or BEVOX revenue. | A single business's Connect Express subaccount stuck in `restricted`; a fee-split discrepancy on one merchant's transactions; a batch of failed card charges; a delayed payout for one account. | Within the working hour. CTO/CFO own per dimension; COO opens customer comms. | CEO Informed. Bernard Informed in the daily roll-up unless it escalates. |
| **Sev3** | Minor, no active customer harm, recoverable with no urgency. | A one-off failed Pix charge that auto-retried successfully; a reconciliation variance under the materiality threshold; a single dunning email bounce. | Same/next business day. Handled by the owning R as routine ops. | Logged; surfaced in the weekly reconciliation review. |

**Irreversible or large-value financial actions are escalated to Bernard regardless of Sev** — issuing a refund above the CFO-set value threshold, writing off a disputed amount, force-releasing a held payout, or any new banking/PSP commitment (`docs/agents/cfo.md`: escalate "any **irreversible financial commitment** … recording the recommendation, then waiting only where the commitment is irreversible"). The agents record the recommended action and **wait for sign-off where the action is irreversible**; on everything reversible and within cap, they act.

## The response flow

Every billing incident moves through six phases: **Detect → Triage → Customer comms → Mitigate/Resolve → Escalate (if gated) → Post-incident reconciliation.** Customer comms runs in parallel with mitigation, not after it.

### 1. Detect

Detection comes from three sources, in order of how we want to catch things (earliest is best):

- **Automated reconciliation & alerting (preferred).** OpenTelemetry instrumentation in `bevox-harness`/`bevox-backend` plus the CFO's reconciliation pass: every Stripe Connect settlement (application-fee split, refunds, chargebacks, disputes) is reconciled against the ledger; a variance over the materiality threshold raises an incident automatically (`docs/agents/cfo.md` responsibility 3; `docs/agents/cto.md` responsibility 5: "detection (OTel + alerting)"). Stripe **webhook events** are the live feed — `charge.failed`, `payment_intent.payment_failed`, `charge.dispute.created`, `payout.failed`, `account.updated` (subaccount capability changes), `application_fee.refunded`.
- **Stripe Dashboard / API signals.** Failed-charge rate, dispute rate, payout status, and Connect Express account health (`charges_enabled`, `payouts_enabled`, `requirements.currently_due`).
- **Customer report.** The business tells us (via the AI secretary, support, or the owner panel) that a client was charged twice, a payment "didn't go through," or a payout is late. Any inbound that touches money is logged as at least Sev3 until triaged.

On detection, the responder opens an **incident record** (timestamped log: what, when, blast radius, suspected cause, Sev). This log is the spine of the eventual post-mortem.

> **LGPD guardrail at detection.** The incident log and any alert payload must **not** contain raw card data (BEVOX is never in PCI scope — no raw card data touches BEVOX systems per `docs/agents/cto.md` responsibility 3) and must minimize billing/PII: reference Stripe object IDs (`pi_…`, `ch_…`, `acct_…`, `dp_…`), not CPF/CNPJ, card numbers, or full personal records, in logs and the AI harness context (`docs/agents/cfo.md` responsibility 7; `objective.md:65` Brazilian context — LGPD).

### 2. Triage

The CTO (technical) and CFO (economic) classify the incident along two questions:

1. **Is this a code/integration failure or a money-correctness failure?** A failed webhook signature or a broken fee-split *calculation* is a CTO-led technical incident. A *correct* split that lands the customer in a worse economic position, or a reconciliation variance with healthy code, is a CFO-led economic incident. Most real incidents are both — assign the A per dimension and proceed.
2. **What is the blast radius?** One transaction, one merchant, or systemic across all merchants? This sets the Sev and whether the AI secretary's autonomous money-actions should be paused (CTO authority).

Triage names: the **incident commander** (CTO for the technical event), the **money owner** (CFO), the **comms owner** (COO), and whether **Legal** and **Bernard** are in the loop yet. If the AI secretary is taking any automated money or messaging action that could compound the incident, the CTO **takes it off autonomous mode for the affected scope** before anything else (`docs/agents/cto.md` decision authority).

### 3. Customer communication (Portuguese-first)

Comms is owned by the **COO (R)** and runs **in parallel** with mitigation. The principle: the business owner hears it from us before they hear it from their client.

- **Language: Portuguese first.** All customer-facing incident comms are written in Brazilian Portuguese, plain and non-technical (`objective.md:65` — "Portuguese-first customer comms"; charter: "Brazilian context, not translated software"). The end client (the business's customer) never receives BEVOX-branded incident comms — we speak to the **business**, the business speaks to its client. We give the business owner the words to relay if their client was affected.
- **Channel.** The owner's primary channel — WhatsApp and/or the owner panel — matching how they already use BEVOX. Not a corporate status page no Brazilian SMB will check.
- **Cadence.** Sev1: acknowledge within the first response window, then update on a fixed interval until resolved. Sev2: acknowledge same business hour, update at resolution. Sev3: notify at resolution if the customer was aware; otherwise log only.
- **Content.** What happened in their terms ("um pagamento via Pix do seu cliente não foi processado"), what we are doing, what (if anything) they need to do, and when they will hear next. Never speculate on cause before triage confirms it; never promise a refund the CFO has not approved.
- **What we never put in comms.** Other customers' data, raw payment details, internal blame, or unverified root cause.

### 4. Mitigate & resolve — by incident type

Mitigation is owned by **CTO + engineering (technical R)** and **COO (operational R)**, with the **CFO** signing off any money movement. Below are the playbooks per the incident types this runbook must cover.

#### a. Failed Pix charge

- **Pix is instant and near-zero-cost to the end client and is the primary rail** (`docs/agents/cfo.md` BR context; `references/corporate-roles/cfo.md:37-43`). A failed Pix is usually a not-completed payment (client abandoned, QR/copy-paste code expired, or a `payment_intent` that never reached `succeeded`), not a reversal.
- **Mitigate:** confirm the `payment_intent` state in Stripe; if expired/incomplete, re-issue the Pix charge (new QR / copy-e-cola) to the end client through the AI secretary's normal collection flow. Do **not** assume the money arrived — Pix settlement timing must be respected; recognized revenue ≠ cash-in-bank (`docs/agents/cfo.md` responsibility 2: "Account for **Pix settlement timing** … so that on-paper revenue and actual cash-in-bank are never confused").
- **Resolve:** charge reaches `succeeded` and settles to the merchant's Connect Express subaccount with the correct `application_fee`. Confirm the split landed before closing.

#### b. Failed card charge

- Usually issuer decline, expired card, or insufficient funds. For the **subscription** line (BEVOX billing the business), this is a dunning problem; for the **PSP** line (the business's client paying), it is a collection retry.
- **Mitigate (subscription):** standard Stripe dunning — smart retries on the schedule, owner notified in Portuguese to update the card. Do not suspend the business's service on a single failure; follow the dunning ladder before any access change (that is a customer-success decision, COO-owned).
- **Mitigate (PSP):** offer the end client the **Pix** fallback (the primary rail) when a card declines — Pix is instant and zero-cost to them.
- **Resolve:** successful charge + correct settlement, or a documented agreed alternative.

#### c. Fee-split discrepancy

- The `application_fee` (BEVOX's cut) was wrong, missing, or doubled — the highest-trust-risk class because it means we either short-changed the merchant or over-took our fee.
- **Triage:** is the discrepancy in the **code** (fee-split calculation/`application_fee` logic — CTO-owned per `docs/agents/cto.md` responsibility 3 and `raci-matrix.md` Row 7) or in the **pricing model** (the fee level itself is mis-specified — CPO Consulted, CFO accountable)?
- **Mitigate:** the CTO stops the bleeding first — if a code bug is mis-splitting across live transactions, **disable the affected flow or roll back the deploy** before more transactions process (CTO incident-command authority). Quantify the affected transaction set.
- **Resolve:** correct the code/config; the **CFO** computes and approves the make-good (refund the over-take to the merchant, or invoice/credit the shortfall) and confirms each corrected transaction reconciles. Any make-good above the CFO's value threshold escalates to Bernard.

#### d. Connect Express subaccount issue

- A merchant's Connect Express subaccount is in `restricted`, `pending`, or has `requirements.currently_due` (KYC/onboarding gaps), so `charges_enabled` or `payouts_enabled` is false — the business cannot collect or cannot get paid.
- **Mitigate:** identify the missing requirement from `account.requirements`; the COO drives the business owner (Portuguese-first) to supply the missing KYC/verification through the onboarding flow. The CTO owns the **onboarding integrity** of the Connect Express flow (`docs/agents/cto.md` responsibility 3: "Connect Express onboarding integrity") and verifies no integration bug is blocking the capability.
- **Resolve:** subaccount returns to `charges_enabled` + `payouts_enabled`; backlogged payments retried.

#### e. Refund / chargeback

- **Refund:** initiated by the business (or BEVOX on a confirmed error). The refund of a Connect-split payment also reverses BEVOX's `application_fee` proportionally (`application_fee.refunded`) — the CFO must account for the fee reversal, not just the principal (`docs/agents/cfo.md` responsibility 3: reconciliation of "refunds, chargebacks, disputes"). Refunds above the CFO value threshold or any disputed/contested refund escalate to Bernard.
- **Chargeback (`charge.dispute.created`):** the end client's bank is clawing back a card payment. This carries a deadline and a financial liability on the platform.
  - **Legal is Consulted** on representment and exposure (`raci-matrix.md` Row 5 detail and process-to-doc note: "Legal for disputes").
  - The COO/CS gathers evidence (booking record, confirmation, service delivered) for representment; the CFO accounts for the disputed amount and any fee implications; the CTO confirms the underlying charge/webhook trail is intact.
  - Track dispute rate as a KPI signal — a rising chargeback rate is itself an incident trend.
- **Resolve:** refund settled and reconciled (principal + fee reversal), or dispute represented/accepted with the financial outcome booked.

#### f. Payout delay

- Funds collected but not reaching the merchant's bank on schedule — Stripe payout schedule, a held balance, or a `payout.failed` (bad bank details on the subaccount).
- **Mitigate:** distinguish **expected settlement timing** (Pix/Stripe payout cadence — not an incident, a comms/education item the CFO models per `docs/agents/cfo.md` responsibility 2) from a **genuine failure** (`payout.failed`, balance held by Stripe risk). For a genuine failure, the CTO/CFO work the Stripe-side cause; the COO sets expectations with the owner in Portuguese.
- **Resolve:** payout completes to the subaccount's bank; if it required force-releasing a held payout (large-value/irreversible), Bernard signs off first.

### 5. Escalation path

Escalate **up the matrix**, not sideways:

1. **Within the agent roster.** Technical → CTO (incident commander). Money correctness → CFO. Customer impact/comms → COO. Disputes/regulatory → Legal (Consulted). Pricing-model questions → CPO (Consulted).
2. **CEO** — Consulted on **Sev1** and any incident requiring a company-level tradeoff (pausing a launch, a public statement, a policy change). Informed on Sev2/Sev3 in the roll-up (`raci-matrix.md` Row 5).
3. **Bernard** — Informed immediately for **any Sev1, any suspected breach, any irreversible financial action, any large-value action above the CFO threshold, and anything that breaches a spend cap** (`docs/agents/cfo.md` decision authority; `raci-matrix.md` — Bernard is the gated-decision escalation target). Agents record the recommended action and wait only where the action is irreversible; everything reversible and in-cap, they execute.

The loop's structural safeguards (HALTED.md kill switch, budget caps, hardened-file deny rules, the Stop-remote whitelist) are the only hard limits on agent action (`charter.md` Operating Principle; `objective.md:14`).

### 6. Post-incident reconciliation & post-mortem

No billing incident is closed until **the books reconcile** and a **blameless review** is written.

- **Reconciliation (CFO-accountable, the closing gate).** Re-run the Stripe Connect ↔ ledger reconciliation for the affected scope: every corrected transaction, refund (principal + `application_fee` reversal), chargeback outcome, and payout must tie out. Confirm subscription revenue is recognized over the period and PSP fees at transaction (`docs/agents/cfo.md` responsibility 3). The CFO signs off that the variance is zero (or within materiality and explained). **Reconciliation sign-off is what closes a billing incident** — not "the code is fixed."
- **Blameless post-mortem (CTO-owned for the technical event).** Within the MTTR/review window, write the post-incident review: timeline, detection latency, root cause, blast radius, customer impact, what we did, and the fixes — code, monitoring, and process — that prevent recurrence (`docs/agents/cto.md` responsibility 5: "the blameless post-incident review"). Blameless: we fix systems, not assign fault.
- **Feed the loop back.** File the durable fixes: an ADR if the incident exposed an architectural gap in the money path (CTO); a new or tightened reconciliation/alert rule so detection moves earlier (CFO); a comms-template or process update (COO); a pricing/packaging clarification (CPO) if the root cause was model ambiguity rather than code. Record outcomes that affect numbers in the financial model.
- **LGPD at close.** Confirm no billing/PII or payment data leaked into logs, alerts, comms, or the AI harness context during the incident; if a breach is confirmed or suspected, it is a Sev1 with Bernard informed and Legal Consulted, and the LGPD breach-response path in `processes/governance.md` is followed (`docs/agents/cto.md` responsibility 3 — breach response; `docs/agents/cfo.md` responsibility 7).

## KPI signals this runbook moves

A billing-incident process is healthy when these trend the right way (owners per their specs):

- **MTTR < 1 hour for Sev1/Sev2** and **trend to zero Sev1** (`docs/agents/cto.md` KPIs).
- **Reconciliation variance = zero** (or within materiality, explained) every cycle (`docs/agents/cfo.md` responsibility 3).
- **Chargeback / dispute rate** low and falling.
- **DSO** accurate to real Pix/card settlement timing — recognized revenue never confused with cash-in-bank (`docs/agents/cfo.md` KPI: DSO).
- **No payment/PII in logs or harness context** — zero LGPD findings from incident handling (`docs/agents/cfo.md` responsibility 7; `docs/agents/cto.md` responsibility 3).

## Grounding

RACI ownership and the two-row (incident + billing/PSP) derivation from `raci-matrix.md` (Rows 5 and 7, and the `processes/billing-incidents.md` process-to-doc note). Incident-command authority, detection/triage/post-mortem mechanics, Stripe Connect webhook/fee-split/PCI-scope controls, and the LGPD breach path from `docs/agents/cto.md`. Billing economics, reconciliation, refund/chargeback/fee-reversal accounting, Pix settlement timing, the escalation-to-Bernard gate on irreversible/large-value actions, and the LGPD financial-data policy from `docs/agents/cfo.md` and the canonical CFO template (`references/corporate-roles/cfo.md:37-43`). Dual revenue model and Stripe Connect ground truth (Pix + card, Connect Express subaccounts, automatic Bevox-fee split) from `objective.md:10` and `charter.md` (Business Model). Stage-honesty (post-PMF, 10–50 customers, single human, planned-vs-instantiated leads) and the structural-safeguard limits from `charter.md` and `org-chart.md`. Portuguese-first comms and the Brazilian payment/regulatory context from `objective.md:65` and `charter.md` (Values — Brazilian context).
