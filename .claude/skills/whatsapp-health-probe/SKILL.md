---
name: whatsapp-health-probe
description: Probe Bevox's WhatsApp Business channel health — template approval status, delivery rate, phone number registration — and emit a fix mission when any dimension is degraded.
tools: Read, Write, Glob, Grep, Bash
model: sonnet
---

## Purpose

Check the health of Bevox's WhatsApp Business channels via the `whatsapp-cloud` MCP server and surface degradation to the CMO, Head of Marketing, and Head of Customer Success agents. Returns structured JSON plus a one-line markdown summary. If any alert condition is detected, emits a `kind: deliverable` fix mission targeting the responsible role agent.

This skill is **read-only against the repo** — it never writes deliverable files. It may append a mission file to `$LOOP_DIR/missions/propose/` when alerts are found.

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `phone_number_id` | string | `$WHATSAPP_PHONE_NUMBER_ID` | Meta-assigned phone number ID to probe. Falls back to env var. |
| `check_templates` | bool | `true` | Whether to verify template approval status via `listMessageTemplates`. |
| `check_delivery_rate` | bool | `true` | Whether to assess last-24h delivery/read rates via `getMessageAnalytics`. |
| `alert_threshold_delivery_pct` | number | `85` | Minimum acceptable delivery rate (%). Flag if below. |

## Process

### 1. Resolve credentials

Read `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` from environment. If `phone_number_id` input is provided, use it instead of the env var. If `WHATSAPP_TOKEN` is absent, return `{ "error": "whatsapp-mcp-unavailable", "reason": "WHATSAPP_TOKEN not set" }` with setup instructions (see Failure modes).

### 2. Check phone number status

Call MCP tool: `whatsapp-cloud / getPhoneNumberStatus`

```json
{ "phone_number_id": "<resolved_id>" }
```

Expected response field: `status` — one of `CONNECTED | FLAGGED | BANNED | RESTRICTED | DELETED`.

- `CONNECTED` → healthy
- Any other value → push `{ "dimension": "phone_status", "value": "<status>", "severity": "critical" }` to `alerts[]`

### 3. Check template approval status (if `check_templates: true`)

Call MCP tool: `whatsapp-cloud / listMessageTemplates`

```json
{ "phone_number_id": "<resolved_id>" }
```

Tally each template by its `status` field:
- `APPROVED` → increment `approved`
- `PENDING_DELETION` → increment `pending_deletion`
- `REJECTED` → increment `rejected`, add template name to `rejected_names[]`

If `rejected > 0` → push `{ "dimension": "template_rejected", "count": <n>, "names": [...], "severity": "high" }` to `alerts[]`.

If `pending_deletion > 0` → push `{ "dimension": "template_pending_deletion", "count": <n>, "severity": "medium" }` to `alerts[]`.

### 4. Check delivery rate (if `check_delivery_rate: true`)

Call MCP tool: `whatsapp-cloud / getMessageAnalytics`

```json
{
  "phone_number_id": "<resolved_id>",
  "start": "<ISO-8601 24h ago>",
  "end": "<ISO-8601 now>",
  "granularity": "DAY"
}
```

Compute: `delivery_rate_pct = round(delivered / sent * 100, 1)` where `sent > 0`.

If `sent == 0` → set `delivery_rate_pct: null` and note in `warnings[]`.

If `delivery_rate_pct < alert_threshold_delivery_pct` → push `{ "dimension": "delivery_rate", "value": <pct>, "threshold": <threshold>, "severity": "high" }` to `alerts[]`.

### 5. Determine overall health

`healthy = (alerts.length == 0)`

### 6. Emit fix mission if alerts present

If `alerts.length > 0` and the skill is running inside the loop (i.e. `LOOP_DIR` is set):

Write a new mission file to `$LOOP_DIR/missions/propose/M-<YYYYMMDD-HHMM>-fix-whatsapp-channel-health.md` with:
- `kind: deliverable`
- `priority: 80`
- `scope_paths: [docs/integrations/whatsapp.md]`
- Body: structured alert summary, recommended actions per dimension (template re-submission, phone number appeal, carrier investigation)

### 7. Return output

Return structured JSON (see Output section) plus a one-line markdown health summary.

## Output

```json
{
  "phone_status": "CONNECTED",
  "templates": {
    "approved": 12,
    "pending_deletion": 1,
    "rejected": 0,
    "rejected_names": []
  },
  "delivery_rate_pct": 91.3,
  "alerts": [],
  "healthy": true,
  "meta": {
    "phone_number_id": "123456789",
    "checked_at": "2026-05-22T10:00:00Z",
    "check_templates": true,
    "check_delivery_rate": true,
    "alert_threshold_delivery_pct": 85
  }
}
```

Markdown summary line (appended after JSON):

```
WhatsApp health: HEALTHY — phone CONNECTED, 12 templates approved, delivery 91.3% (threshold 85%)
```

Or, when degraded:

```
WhatsApp health: DEGRADED — 2 alerts: template_rejected (3 templates), delivery_rate 71.2% < 85%
```

## Failure modes

| Condition | Behaviour |
|-----------|-----------|
| `WHATSAPP_TOKEN` not set | Return `{ "error": "whatsapp-mcp-unavailable", "reason": "WHATSAPP_TOKEN not set" }`. Print setup instructions: set `WHATSAPP_TOKEN` (Meta Cloud API system user token) and `WHATSAPP_PHONE_NUMBER_ID` in the target repo's env. |
| MCP server unreachable (network / timeout) | Return `{ "error": "whatsapp-mcp-unavailable", "reason": "MCP connection failed" }`. Do not emit a fix mission. Log to `warnings[]`. |
| `getPhoneNumberStatus` returns unexpected schema | Log `{ "dimension": "phone_status", "reason": "unexpected-schema" }` to `warnings[]`; skip dimension; set `phone_status: null`. |
| `listMessageTemplates` returns empty (no templates) | Set all template counters to 0; append `{ "reason": "no-templates-returned" }` to `warnings[]`. |
| `getMessageAnalytics` returns `sent: 0` | Set `delivery_rate_pct: null`; note `{ "reason": "no-messages-sent-in-window" }` in `warnings[]`. Do not trigger delivery alert. |
| Partial data (one MCP call succeeds, another fails) | Report available dimensions; set failed dimensions to `null`; list gaps in `warnings[]`. Mark `healthy: false` only for confirmed alert conditions. |

## Auth and secrets

- `WHATSAPP_TOKEN` — Meta Cloud API system user token with `whatsapp_business_management` and `whatsapp_business_messaging` permissions. **Never hardcode.** Injected via env var in the loop's cron wrapper or the operator's `.env` file (which is in the secrets denylist and never committed).
- `WHATSAPP_PHONE_NUMBER_ID` — the numeric ID shown in the Meta Business Suite for the registered phone number. Also injected via env.

## Integration points

| Consumer | When | Notes |
|----------|------|-------|
| CMO agent | Competitor-watch context; channel parity check | Invokes skill to confirm Bevox channels are healthy before reporting competitive positioning |
| Head of Marketing agent | Campaign launch pre-flight | Verifies templates are APPROVED before sending broadcast |
| Head of Customer Success agent | Onboarding health check | Ensures WhatsApp notifications reach new customers |
| `churn-risk-scan` cron | Scheduled (hourly or daily) | Automated probe; emits fix mission on degradation |

## MCP server reference

Server name (as registered in `settings.json`): `whatsapp-cloud`

Tools used:
- `getPhoneNumberStatus` — returns phone number registration and quality rating
- `listMessageTemplates` — returns all templates with their approval status
- `getMessageAnalytics` — returns sent/delivered/read counts for a time window

See `docs/integrations/whatsapp.md` for MCP server setup, Meta App configuration, and webhook registration steps.
