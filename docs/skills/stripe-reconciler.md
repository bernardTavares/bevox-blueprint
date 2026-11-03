# stripe-reconciler

## Purpose

The `stripe-reconciler` skill reconciles Stripe Connect payout data against Bevox Blueprint's expected revenue. It covers both revenue streams: per-seat SaaS subscription fees (MRR) and the PSP marketplace fee split (Pix + card transactions). The skill is invoked by the CFO agent, the Head of Finance agent, and the `runway-check` cron for burn-rate validation.

---

## Stripe Connect topology

Bevox operates as a **Stripe Connect platform** using Express subaccounts for each SMB customer. The revenue model has two components:

| Stream | Description |
|---|---|
| Per-seat SaaS MRR | Recurring subscription charged to each SMB customer based on seat count |
| PSP fee share | Bevox takes a platform fee on every Pix and card transaction processed through the Connect subaccount |

### Payout flow

```
Customer payment (Pix or card)
    → Stripe charges the end-consumer
    → Platform fee deducted by Stripe and routed to Bevox platform account
    → Net amount paid out to SMB Connect subaccount (Express)
```

All amounts are in BRL. Currency conversion is out of scope; the skill outputs BRL-only figures.

---

## Reconciliation logic

The skill computes the following aggregates for a given period:

| Field | Derivation |
|---|---|
| `total_collected_brl` | Sum of all successful charges on Connect subaccounts + SaaS subscription charges |
| `total_payouts_brl` | Sum of all payouts to SMB subaccounts during the period |
| `bevox_fee_brl` | Sum of platform fees retained by Bevox (application fees) |
| `pix_volume` | Count + sum of Pix transactions |
| `card_volume` | Count + sum of card transactions |
| `refunds_brl` | Total refunded amount |
| `disputes_pending` | Count of open chargebacks / disputes |
| `variance_pct` | `(total_collected_brl - expected_mrr_brl) / expected_mrr_brl * 100` if `expected_mrr_brl` supplied |

### Alert conditions

The skill raises an `alert: true` flag and populates the `alerts[]` array when any of the following are true:

- `variance_pct` exceeds ±5% of expected MRR
- `disputes_pending` > 0
- Any payout has `status: failed`
- `refunds_brl / total_collected_brl` > 3% (refund rate threshold)

---

## Data sources

### MCP path (preferred)

When the `stripe` MCP server is available, the skill documents the following calls:

```
stripe.listPayouts(period)     → payout records for the platform account
stripe.listCharges(period)     → charge records across all subaccounts
stripe.getBalance()            → current available + pending balance snapshot
```

The MCP server must be configured with `STRIPE_SECRET_KEY` (see operator setup).

### Local-export fallback

If the MCP server is unavailable, the operator can supply a pre-fetched Stripe export file via the `stripe_data_path` input. The file must be a JSON export of the relevant Stripe objects (charges, payouts, application fees) for the target period. Format expected:

```json
{
  "charges": [...],
  "payouts": [...],
  "application_fees": [...]
}
```

If neither MCP nor local export is available, the skill returns `{ "error": "stripe-data-required" }` with setup instructions.

---

## MCP integration notes

The `stripe` MCP server is declared in `docs/integrations/mcp-servers.md`. To enable:

1. Add `STRIPE_SECRET_KEY` to the operator's environment (never hardcode).
2. Register the `stripe` MCP server in the target Claude Code settings.
3. Verify connectivity with a test `stripe.getBalance()` call before running a full reconciliation.

Restricted-key scopes required: `read:charges`, `read:payouts`, `read:application_fees`, `read:balance`.

---

## LGPD / Privacy constraint

This skill operates on **aggregate financial data only**. It must not log, persist, or surface:

- Customer names or CPF/CNPJ identifiers
- Individual transaction-level personal data
- Cardholder details

All outputs are aggregate totals. Stripe charge IDs may appear in error diagnostics but are not PII under LGPD. If a dispute record would surface customer identity, redact before returning.

---

## Operator setup

1. Set `STRIPE_SECRET_KEY` in your Claude Code environment (restricted key, read-only scopes).
2. Ensure the `stripe` MCP server is registered and authenticated.
3. Optionally configure `expected_mrr_brl` in your Finance agent prompt or pass it at invocation time.
4. For offline/audit mode, export Stripe data via the Stripe Dashboard or CLI and pass the file path as `stripe_data_path`.

---

## Invocation examples

```
/stripe-reconciler period=2026-05-01/2026-05-31 expected_mrr_brl=45000
/stripe-reconciler period=2026-05-01/2026-05-31 stripe_data_path=/tmp/stripe-may-2026.json
/stripe-reconciler period=2026-04-01/2026-04-30
```

---

## Output

### JSON

```json
{
  "period": "2026-05-01/2026-05-31",
  "total_collected_brl": 47230.50,
  "total_payouts_brl": 41800.00,
  "bevox_fee_brl": 5430.50,
  "pix_volume": { "count": 812, "sum_brl": 29100.00 },
  "card_volume": { "count": 203, "sum_brl": 18130.50 },
  "refunds_brl": 420.00,
  "disputes_pending": 1,
  "variance_pct": 4.96,
  "alert": true,
  "alerts": ["disputes_pending > 0"]
}
```

### Markdown table

```
| Metric               | Value         |
|----------------------|---------------|
| Period               | May 2026      |
| Total collected      | R$ 47,230.50  |
| Total payouts        | R$ 41,800.00  |
| Bevox fee            | R$  5,430.50  |
| Pix volume (tx)      | 812           |
| Card volume (tx)     | 203           |
| Refunds              | R$    420.00  |
| Pending disputes     | 1             |
| Variance vs MRR      | +4.96%        |
| Alert                | YES           |
```
