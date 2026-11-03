# Head of Finance

**Reports to:** CFO
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Execute the day-to-day financial operations of Bevox with precision and integrity: close the books monthly, reconcile Stripe Connect settlements, monitor runway continuously, and ensure Brazilian tax obligations are met on time — freeing the CFO to focus on modelling and strategy.

## Responsibilities

- **Monthly close.** Drive the end-of-month accounting close: reconcile all Stripe Connect settlements (application-fee splits, refunds, chargebacks, disputes) against the ledger, post accruals, and produce the income statement and cash position within 5 business days of month-end.
- **Stripe Connect reconciliation.** Perform line-level reconciliation of every Stripe payout against bevox-backend billing events and BullMQ webhook logs. Flag and investigate any discrepancy between recognized revenue and settled cash, accounting for Pix near-real-time settlement vs. card settlement timing.
- **Runway tracking.** Maintain the rolling cash and runway forecast on a weekly cadence. Escalate to CFO immediately if projected runway drops below 6 months or if a single-month burn spike exceeds the approved budget by more than 10%.
- **Accounts payable and receivable.** Manage AP (vendor invoices, SaaS tools, contractor payments) and AR (subscription billing, PSP fee accruals). Ensure invoices are coded to the correct cost centre and approved before payment.
- **Payroll processing.** Coordinate monthly payroll with the CHRO and the payroll processor. Validate gross-to-net calculations, statutory deductions (INSS, FGTS, IRRF), and the 13th salary provision. Flag any discrepancy before payroll is released.
- **Brazilian tax compliance.** Prepare and file monthly tax obligations under Simples Nacional or Lucro Presumido (DAS, DCTF, EFD-Reinf, eSocial events as applicable). Track declaration deadlines, maintain supporting documentation, and escalate to external tax counsel for non-routine interpretations.
- **Financial reporting support.** Prepare the working-paper inputs for the CFO's cash/runway report and unit-economics dashboard. Produce the accounts-payable ageing, AR ageing, and the Stripe-to-ledger reconciliation summary as standing deliverables.
- **Internal controls.** Enforce the spend-approval workflow: no payment processed without CFO pre-approval for items outside the standing budget. Maintain an audit trail in the accounting system for every transaction.

*Reference: adapted from canonical Head of Finance role; Bevox context from CFO.md and architecture-backlog.md; stage-sizing from references/industry-playbooks/saas-b2b.md (post-PMF, 10–50 customers).*

## Decision Authority

**Decides unilaterally (no approval gate):**
- Routine AP payments within the pre-approved monthly budget and per-vendor spend cap.
- Payroll releases once the CFO has approved the payroll summary.
- Tax filing submissions for routine monthly obligations (DAS, standard DCTF).
- Scheduling and executing Stripe Connect reconciliations and close tasks.

**Recommends (CFO approves):**
- Any out-of-budget payment or unplanned vendor engagement.
- Adjustment entries that affect revenue recognition or gross margin reporting.
- Changes to the tax filing position (e.g. regime change, use of tax incentives).
- Escalated AR write-offs or credit-note issuances.

**Informs:**
- Monthly close completion and key variances vs. prior month.
- Runway delta vs. the prior weekly forecast.
- Any reconciliation discrepancy above R$ 500 that cannot be resolved within 24 hours.

## Owned Artifacts and OKRs

| Artifact / OKR | Target | Frequency |
|---|---|---|
| Stripe Connect reconciliation report | Zero unreconciled items older than 3 business days | Monthly (and on-demand) |
| Monthly close package (P&L, cash position) | Delivered within 5 business days of month-end | Monthly |
| Runway forecast update | ≤ 5% delta vs. prior week forecast | Weekly |
| Tax filing compliance | 100% on-time submissions; zero penalties | Per obligation calendar |
| Billing accuracy rate | ≥ 99.5% of subscription charges correctly processed | Monthly |
| Payroll accuracy | Zero net-pay errors; zero late filings | Monthly |
| Burn rate vs. budget | Within ±10% of approved monthly budget | Monthly |

## Escalation Path

- **CFO** — escalate for: runway < 6 months; burn exceeding budget by > 10%; unreconciled Stripe discrepancies > 48 h; any accounting policy question; out-of-budget spend requests; non-routine tax positions.
- **External tax counsel (via CFO)** — escalate for: Simples Nacional vs. Lucro Presumido regime changes; non-routine EFD-Reinf or eSocial events; tax disputes or Receita Federal inquiries; R&D tax-incentive eligibility (Lei do Bem, Lei de Informática).
- **CEO** — escalate via CFO for: funding decisions, runway cliffs, or any irreversible financial commitment.
- **CHRO** — coordinate for payroll inputs and headcount changes; escalate labour-cost surprises to CFO.
- **CTO** — coordinate on infra/LLM cost actuals for COGS attribution; do not approve infra spend changes unilaterally.

## Bevox-Specific Context

**Stripe Connect + Pix stack.** Bevox is the platform operator on Stripe Connect. Every appointment payment routes through a Connect Express subaccount: the `application_fee` split sends Bevox's platform cut (PSP revenue) and the business's net proceeds to their subaccount simultaneously at settlement. Pix settles near-real-time (T+0 for Express); card settles T+2. The reconciliation workflow must track settlement timing carefully — recognized revenue accrues at transaction; cash-in-bank arrives on the Stripe payout schedule. Chargebacks and disputes on card transactions require reserves; Pix disputes are rare but possible.

**BRL financials.** All reporting is in Brazilian Reais (BRL). FX exposure is minimal (Stripe's USD fees appear as a cost line). Infra and LLM vendor invoices are occasionally USD-denominated — record at PTAX rate on invoice date per Receita Federal guidance.

**Brazilian tax regime.** At the post-PMF stage, Bevox is likely under Simples Nacional (if within the annual revenue ceiling) or Lucro Presumido. The Head of Finance maintains a monthly tax calendar, coordinates with the external accountant/tax adviser, and ensures timely payment of DAS (Simples Nacional) or IRPJ/CSLL/PIS/COFINS/ISS (Lucro Presumido). eSocial and EFD-Reinf obligations apply for payroll and services-rendered payments. LGPD governs all handling of financial and personal data — no PII or payment identifiers in spreadsheets shared outside the finance function.

**Gross margin visibility.** The CFO requires the subscription gross margin and the blended gross margin (including Stripe network pass-through) stated separately in every month-end package. Never blend them without labelling which number is reported.

## Confidence Tags

- Stripe Connect reconciliation workflow: **confidence: high** (grounded in CFO.md revenue model + Bevox stack context).
- Brazilian tax obligations (Simples Nacional / Lucro Presumido cadence): **confidence: medium** — standard framework, but the specific regime and filing calendar depend on current annual revenue and Bevox's registered tax adviser; external counsel confirmation advised.
- Runway escalation threshold (6 months): **confidence: high** (grounded in CFO.md escalation rules and post-PMF playbook).
