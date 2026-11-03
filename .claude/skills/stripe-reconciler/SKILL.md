---
name: stripe-reconciler
description: Reconcile Stripe Connect payout data against Bevox revenue expectations (SaaS subscription MRR + PSP fee split) for a given period, flagging discrepancies and pending disputes for Finance and CFO review.
---

# stripe-reconciler

## Inputs

| Parameter | Type | Required | Description |
|---|---|---|---|
| `period` | string | yes | ISO date range `YYYY-MM-DD/YYYY-MM-DD` (e.g. `2026-05-01/2026-05-31`) |
| `expected_mrr_brl` | number | no | Expected MRR in BRL for variance calculation; omit to skip variance check |
| `stripe_data_path` | string | no | Path to pre-fetched Stripe export JSON (charges + payouts + application_fees); use when MCP unavailable |

## Process

### Step 1 — Acquire data

If `stripe_data_path` is provided:
- Read the local JSON file; expect keys `charges[]`, `payouts[]`, `application_fees[]`.
- Filter all records to the requested `period`.

If `stripe_data_path` is NOT provided:
- Use the `stripe` MCP server with the following calls:
  - `stripe.listPayouts({ created: { gte: period_start, lte: period_end } })` → payout records
  - `stripe.listCharges({ created: { gte: period_start, lte: period_end } })` → charge records
  - `stripe.getBalance()` → snapshot of current available + pending balance
- If the MCP server is unreachable, emit `{ "error": "stripe-data-required" }` with MCP setup instructions (see failure modes) and stop.

### Step 2 — Aggregate

Compute from the filtered dataset:

| Field | Derivation |
|---|---|
| `total_collected_brl` | Sum of `amount` on all charges with `status: succeeded` |
| `total_payouts_brl` | Sum of `amount` on all payouts with `status: paid` |
| `bevox_fee_brl` | Sum of `amount` on all application_fee records |
| `pix_volume` | `{ count, sum_brl }` for charges with `payment_method_details.type: pix` |
| `card_volume` | `{ count, sum_brl }` for charges with `payment_method_details.type: card` |
| `refunds_brl` | Sum of `amount_refunded` across all charges |
| `disputes_pending` | Count of charges with open dispute objects |

All monetary values in BRL. Stripe amounts are in centavos (integer); divide by 100 for BRL display.

### Step 3 — Variance check

If `expected_mrr_brl` is provided:
```
variance_pct = (total_collected_brl - expected_mrr_brl) / expected_mrr_brl * 100
```
Flag `alert: true` if `abs(variance_pct) > 5`.

### Step 4 — Alert evaluation

Raise `alert: true` and add entries to `alerts[]` for any of:

- `abs(variance_pct) > 5` → `"variance exceeds 5% threshold: <variance_pct>%"`
- `disputes_pending > 0` → `"disputes_pending > 0: <n> open dispute(s)"`
- Any payout with `status: failed` present in dataset → `"failed payout(s) detected"`
- `refunds_brl / total_collected_brl > 0.03` → `"refund rate exceeds 3%"`

### Step 5 — Output

Emit the structured JSON result followed by a markdown reconciliation table (see output schema below).

## Output schema

```json
{
  "period": "<period>",
  "total_collected_brl": 0.00,
  "total_payouts_brl": 0.00,
  "bevox_fee_brl": 0.00,
  "pix_volume": { "count": 0, "sum_brl": 0.00 },
  "card_volume": { "count": 0, "sum_brl": 0.00 },
  "refunds_brl": 0.00,
  "disputes_pending": 0,
  "variance_pct": null,
  "alert": false,
  "alerts": []
}
```

Followed by:

```markdown
| Metric           | Value |
|------------------|-------|
| Period           | ...   |
| Total collected  | R$ .. |
| Total payouts    | R$ .. |
| Bevox fee        | R$ .. |
| Pix volume (tx)  | ...   |
| Card volume (tx) | ...   |
| Refunds          | R$ .. |
| Pending disputes | ...   |
| Variance vs MRR  | ...   |
| Alert            | YES/NO|
```

## Failure modes

| Condition | Behaviour |
|---|---|
| Stripe MCP unavailable AND no `stripe_data_path` | Return `{ "error": "stripe-data-required", "instructions": "Configure the stripe MCP server with STRIPE_SECRET_KEY, or supply a local export via stripe_data_path." }` |
| `stripe_data_path` file not found | Return `{ "error": "file-not-found", "path": "<stripe_data_path>" }` |
| `stripe_data_path` missing required keys | Return `{ "error": "invalid-export-format", "expected_keys": ["charges", "payouts", "application_fees"] }` |
| Currency other than BRL detected | Note in output: `"currency_note": "BRL-only output; non-BRL records skipped"` |
| `period` format invalid | Return `{ "error": "invalid-period", "expected_format": "YYYY-MM-DD/YYYY-MM-DD" }` |

## Security and privacy constraints

- `STRIPE_SECRET_KEY` must be injected via environment variable. Never hardcode.
- Restricted-key scopes required: `read:charges`, `read:payouts`, `read:application_fees`, `read:balance`.
- LGPD compliance: do not log, persist, or surface customer names, CPF/CNPJ, or cardholder data. Output aggregate totals only.
- If a dispute record exposes customer identity, redact before returning.

## Invocation examples

```
/stripe-reconciler period=2026-05-01/2026-05-31 expected_mrr_brl=45000
/stripe-reconciler period=2026-05-01/2026-05-31 stripe_data_path=/tmp/stripe-may-2026.json
/stripe-reconciler period=2026-04-01/2026-04-30
```
