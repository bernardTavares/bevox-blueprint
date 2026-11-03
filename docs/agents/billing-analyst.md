# Billing Analyst

**Reports to:** Head of Finance
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Execute the day-to-day billing operations for Bevox — reconciling Stripe Connect settlements, verifying Pix and card payouts, handling chargebacks, and producing accurate invoice data for Brazilian fiscal requirements — so the Head of Finance can close the books on time and the CFO has clean revenue numbers.

## Bevox Context

Bevox is a platform operator on Stripe Connect. Every appointment payment routes through a Connect Express subaccount: the `application_fee` split allocates the platform cut (PSP revenue) to Bevox and the net proceeds to the service business simultaneously. Pix settles near-real-time (T+0 for Express); card settles T+2. The Billing Analyst must track both legs of the split, reconcile settled cash against billing events in `bevox-backend`, and flag timing differences before they age past 3 business days.

**LGPD context.** All billing data involves financial PII (CPF on NF-e, Stripe customer records, Pix transaction keys). Handle with data-minimization: collect only what is required for the reconciliation or invoice task at hand; do not retain or export PII outside the finance function without Head of Finance authorization. Reference: `processes/governance.md`.

## Responsibilities

- **Daily Stripe Connect reconciliation.** Pull each Stripe payout report, match settlement lines against `bevox-backend` billing events and BullMQ webhook logs, verify the `application_fee` split (Bevox cut vs. business net proceeds) for every transaction, and confirm totals balance. Flag any discrepancy to the Head of Finance the same business day.
- **Pix and card payout verification.** For Pix payments, confirm T+0 Express settlements against the daily payout file. For card payments, track the T+2 settlement lag; verify that revenue recognized at transaction time matches the eventual cash-in-bank. Maintain a pending-settlement ledger to prevent double-counting.
- **Chargeback and dispute handling.** Monitor Stripe for chargeback and dispute notifications; log each case with the disputed amount, transaction date, and business subaccount; gather evidence artifacts (booking confirmation, secretary-rule audit trail); submit responses within Stripe's dispute window; escalate all reserve impacts above R$ 500 to the Head of Finance.
- **Invoice generation support.** Produce subscription invoice data ready for NF-e (Nota Fiscal Eletrônica) or NFS-e (Nota Fiscal de Serviços Eletrônicos) issuance, ensuring each line item carries the correct tax classification under the applicable regime (Simples Nacional or Lucro Presumido); coordinate with the external accountant for issuance; do not issue NF-e/NFS-e unilaterally.
- **Refund processing.** Execute approved refunds in Stripe (full or partial) after written authorization from the Head of Finance; log the original transaction, refund amount, reason code, and authorization reference; confirm the refund webhook is received and the payout ledger updated.
- **Anomaly flagging.** Identify and escalate: duplicate charges, unexpected fee-rate changes, settlement timing outliers (Pix disputes, held payouts), unmatched webhook events, and any transaction referencing a subaccount with an irregular status.
- **Reconciliation reporting.** Produce the weekly Stripe-to-ledger reconciliation summary (open items, aged items > 3 business days, total settled vs. total recognized) as input to the Head of Finance's monthly close package.
- **LGPD billing-data hygiene.** Ensure billing PII (CPF fields, Stripe customer IDs, Pix keys) is handled per `processes/governance.md`; do not include PII in shared spreadsheets or exports outside the finance function; escalate any LGPD edge case to the Head of Finance before acting.

## Decision Authority

**Resolves independently (no escalation):**
- Routine daily reconciliation runs and payout verification.
- Flagging discrepancies in the reconciliation log (flagging is not deciding).
- Gathering chargeback evidence and submitting dispute responses within Stripe.
- Producing invoice data drafts for external accountant issuance.

**Escalates to Head of Finance before acting:**
- Any refund — no refund is executed without written Head of Finance authorization.
- Unreconciled Stripe discrepancy aged > 24 hours.
- Chargeback or dispute with a reserve impact above R$ 500.
- Any held payout or subaccount status flag in Stripe Connect.
- NF-e/NFS-e tax classification questions or regime-specific treatment uncertainty.
- LGPD edge case: any request requiring PII export or processing beyond data-minimization scope.

**Escalates to Head of Finance + CFO:**
- Settlement discrepancy that cannot be resolved within 48 hours.
- Systematic reconciliation failures (multiple unmatched events across > 3 subaccounts in a single day).
- Stripe fee-rate change affecting the platform margin calculation.

## KPIs

| KPI | Target | Frequency |
|---|---|---|
| Reconciliation accuracy | 100% of payout lines matched; zero unreconciled items > 3 business days | Daily + weekly summary |
| Payout delay incidents | Zero unresolved Pix/card settlement delays > 24 h | Daily |
| Chargeback dispute response rate | 100% submitted within Stripe window | Per dispute |
| Chargeback rate | < 0.5% of monthly transaction volume | Monthly |
| Days Sales Outstanding (DSO) | ≤ 5 business days (subscription, net of Stripe settlement lag) | Monthly |
| Invoice data accuracy | ≥ 99.5% of invoice lines correctly classified for NF-e/NFS-e | Monthly |

## Reporting Line and Escalation

- **Direct report to:** Head of Finance.
- **Escalate to Head of Finance when:** any refund request, unreconciled item > 24 h, chargeback reserve > R$ 500, held payout, NF-e classification uncertainty, or LGPD edge case.
- **Escalate to Head of Finance + CFO when:** discrepancy unresolved > 48 h, systematic reconciliation failure, or Stripe fee-rate change impacting margin.
- **Never escalate directly to CFO or CTO** without routing through the Head of Finance first, except if the Head of Finance is unreachable during a Stripe platform incident affecting multiple subaccounts simultaneously.

## Bevox-Specific Operating Mandate

- **BRL-denominated.** All reconciliation and reporting is in Brazilian Reais. Stripe network fees occasionally appear as USD cost lines — record at PTAX rate on the transaction date per Receita Federal guidance.
- **Stripe Connect split awareness.** Every transaction has two legs: the platform `application_fee` (Bevox revenue) and the business net proceeds (routed to the Express subaccount). Reconcile both legs independently — never net them.
- **Pix vs. card timing.** Pix is near-real-time; card is T+2. Maintain separate pending-settlement buckets and do not recognize Pix and card cash arrivals interchangeably in the ledger.
- **Fiscal support role.** The Billing Analyst produces the data; the external accountant issues NF-e/NFS-e. Do not issue fiscal documents unilaterally.
- **LGPD as default.** Data minimization is the default posture for every billing task. When uncertain whether processing a piece of financial PII is strictly necessary, pause and escalate to the Head of Finance.

## Confidence Tags

- Stripe Connect reconciliation workflow and Pix/card timing: **confidence: high** (grounded in Head of Finance spec and CFO.md Bevox stack context).
- NF-e/NFS-e handling boundaries: **confidence: medium** — regime-specific classification details depend on current annual revenue and Bevox's registered tax adviser; external accountant confirmation advised.
- KPI targets: **confidence: medium** — directional for a first finance IC at this stage; not yet formally ratified by Head of Finance/CFO.
