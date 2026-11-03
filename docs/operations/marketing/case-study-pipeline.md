# Case Study Pipeline — Gate Register

This file is the single source of truth for the published-case-studies count. The `mkt-campaign-manager-weekly` cron reads the `published_case_studies` field on every Monday tick. If `published_case_studies < 3`, the cron logs `result=noop` and halts — no paid campaign activation occurs until this gate clears.

**Gate rule (from mkt-paid-media-agent):** Paid campaigns are active only after ≥3 published Bevox case studies exist.

---

## Gate status

```
published_case_studies: 0
gate_cleared: false
gate_cleared_date: —
```

---

## Pipeline

| Customer | Vertical | Stage | Owner | Approval | Published |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

**Stages:** `identified` → `interview-scheduled` → `draft-written` → `bernard-approved` → `published`

---

## Update instructions

`mkt-customer-story-writer` moves a customer through stages as work progresses. When a case study reaches `published` and receives a `bernard-approved` marker, update `published_case_studies` by +1 and check whether `gate_cleared` should flip to `true`.

Bernard approval is required before any case study is counted as `published` — a draft without the `bernard-approved` marker does not count toward the gate.

When `published_case_studies` reaches 3, update:
```
published_case_studies: 3
gate_cleared: true
gate_cleared_date: YYYY-MM-DD
```

The next `mkt-campaign-manager-weekly` tick will detect `gate_cleared: true` and proceed with campaign ops instead of logging noop.
