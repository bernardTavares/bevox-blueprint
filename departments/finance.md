# Department: Finance

## C-suite Owner

**CFO** — owns money in/out, unit economics, runway, pricing economics, and legal/compliance risk.

## Lead

**[Head of Finance](../docs/agents/head-of-finance.md)** — Stripe Connect reconciliation, billing-incident reporting, and financial cadence under the CFO.

## IC Roles (Team)

| Role | Agent doc | Responsibility at 10–50 customers |
|---|---|---|
| Billing Analyst | [docs/agents/billing-analyst.md](../docs/agents/billing-analyst.md) | Stripe Connect reconciliation, fee-split verification, billing discrepancy resolution |
| Financial Analyst | [docs/agents/fin-financial-analyst.md](../docs/agents/fin-financial-analyst.md) | Impact analysis and base/upside/downside scenario modelling per financial request, checked against the CFO's bars |
| FP&A Manager | [docs/agents/fin-fp-and-a-manager.md](../docs/agents/fin-fp-and-a-manager.md) | Annual financial plan, budget-availability checkpoint per request, variance root-cause and rolling forecast |
| Tax Strategist | [docs/agents/fin-tax-strategist.md](../docs/agents/fin-tax-strategist.md) | Tax-implication parecer per flagged request; regime-threshold monitoring and fiscal-credit inventory (Simples/Lucro Presumido) |
| Accounts Payable Manager | [docs/agents/fin-accounts-payable-manager.md](../docs/agents/fin-accounts-payable-manager.md) | Vendor invoice validation, payment execution within terms, duplicate and banking-change fraud checks |
| Accounts Receivable Manager | [docs/agents/fin-accounts-receivable-manager.md](../docs/agents/fin-accounts-receivable-manager.md) | Invoice issuance, escalating collections cadence, credit-risk pareceres |
| Treasury Manager | [docs/agents/fin-treasury-manager.md](../docs/agents/fin-treasury-manager.md) | Daily cash snapshot, rolling 13-week projection, cash confirmation per request; feeds the weekly Runway Check (under Head of Finance) |
| Financial Controller | [docs/agents/fin-financial-controller.md](../docs/agents/fin-financial-controller.md) | Per-transaction ledger booking with approval-reference verification; audit-ready book between closes (under Head of Finance) |

## Finance request pipeline (fin- roles)

Every financial request flows through a fixed advisory pipeline before the CFO decides. No agent in the pipeline approves, rejects, or commits — every verdict is advisory, and the financial gates in `decision-authority.md` (agents never initiate or commit transactions; `HUMAN_NEEDED.md` at every financial gate) still apply on top.

1. **fin-financial-analyst** — impact parecer (scenarios vs. runway, margin, CAC bars), in parallel with **fin-tax-strategist** when the request has a tax component.
2. **fin-fp-and-a-manager** — budget-availability checkpoint (fits fully / partially / does not fit).
3. **fin-treasury-manager** — cash confirmation on the expected payment date (confirmed / timing risk / not confirmed).
4. **CFO** — approve / reject / escalate.
5. **fin-accounts-payable-manager** or **fin-accounts-receivable-manager** — execution (payment or invoice), in coordination with treasury timing.
6. **fin-financial-controller** — books the transaction with its approval reference; the ledger feeds the Head of Finance's Monthly Close.

Reporting lines: Financial Analyst, FP&A Manager, Tax Strategist, AP Manager, and AR Manager report to the **CFO**; Treasury Manager and Financial Controller report to the **Head of Finance** (daily-granularity roles feeding the Head of Finance's existing Runway Check and Monthly Close).

## OKRs Owned

From `okrs/q4-corporate.md`:

- **KR2.2** — CAC payback ≤ 3 months, LTV:CAC ≥ 3:1 (Owner: CFO)
- **KR2.4** — Pricing locked: gross margin > 75% on subscription, supports NRR > 110% (Owner: CFO)
- **KR3.4** (co-owns) — Infrastructure efficiency: CFO co-owns the LLM/inference spend cap (Owner: CTO)

## Processes Owned

From `raci-matrix.md`:

- **Billing & PSP operations** (`processes/billing-incidents.md`) — CFO is **A** for money in/out, Stripe Connect economics, fee-split correctness
- **Compliance & governance** (`processes/governance.md`) — CFO is **A** for compliance/legal risk (via Head of Legal)
- **Pricing & packaging** — CFO is **R** for economics and list-price sign-off (CEO is **A**)
