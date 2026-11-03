# whatsapp-health-probe skill

## What it does

The `whatsapp-health-probe` skill connects to Bevox's WhatsApp Business channels via the `whatsapp-cloud` MCP server and checks three health dimensions: phone number registration status, message template approval status, and message delivery rates. It returns structured JSON plus a one-line health summary. When any dimension falls below acceptable thresholds, it emits a `kind: deliverable` fix mission so the responsible role agent can act.

The skill is triggered by the CMO agent, Head of Marketing, Head of Customer Success, and the `churn-risk-scan` cron. It is especially critical for Bevox because WhatsApp is the primary customer communication channel — onboarding, notifications, and retention messages all flow through it.

## Why it exists

WhatsApp Business channels can be degraded in ways that are not immediately obvious from the product UI:
- A phone number can be `FLAGGED` or `RESTRICTED` by Meta due to spam-rate policy violations, blocking all outbound messages silently.
- Templates are subject to approval workflows; a template in `REJECTED` state causes the corresponding automated message to fail at send time.
- Delivery rates can decline due to carrier issues, opt-outs, or message formatting problems.

Without automated health checks, these issues surface only through customer complaints or churn signals — too late for the Brazilian SMB market where onboarding speed is a competitive differentiator.

## WhatsApp Business API health dimensions

### 1. Phone number status

The registered phone number has a lifecycle status returned by the Meta Cloud API:

| Status | Meaning | Action required |
|--------|---------|-----------------|
| `CONNECTED` | Healthy — messages can be sent | None |
| `FLAGGED` | Quality rating dropped below threshold — messages may be throttled | Review recent message content and opt-out rates; appeal via Meta Business Suite |
| `RESTRICTED` | Sending is partially or fully blocked | Immediate appeal; review policy violations |
| `BANNED` | Account suspended | Contact Meta support; may require new number |
| `DELETED` | Phone number removed from account | Re-register via Meta Business Suite |

Any status other than `CONNECTED` triggers a `critical` alert.

### 2. Message template approval status

All WhatsApp Business messages sent outside of 24-hour customer-initiated windows must use pre-approved templates. Templates have their own lifecycle:

| Status | Meaning | Action required |
|--------|---------|-----------------|
| `APPROVED` | Ready to send | None |
| `PENDING` | Under Meta review | Wait (typically 24–48h) |
| `REJECTED` | Declined by Meta | Revise template content; resubmit |
| `PENDING_DELETION` | Scheduled for removal | Archive or resubmit under a new name |
| `PAUSED` | Temporarily disabled due to low quality | Improve message content; resume via dashboard |

The skill flags `REJECTED` templates as `high` severity and `PENDING_DELETION` as `medium` severity. For Bevox, Portuguese-language templates are especially sensitive — rejection often stems from missing opt-in language or overly promotional phrasing.

### 3. Message delivery rate

Delivery rate is computed as `delivered / sent` over the last 24 hours. It reflects:
- Carrier network health
- Recipient device reachability
- Opt-out rates (opted-out users appear as undelivered)
- Template formatting issues causing silent drops

Default alert threshold: **85%**. Below this level, a meaningful fraction of Bevox customers are not receiving time-sensitive messages (onboarding steps, alerts, renewal reminders).

## Alert conditions and severity

| Condition | Severity | Default action |
|-----------|----------|----------------|
| Phone status != CONNECTED | critical | Emit fix mission; notify CMO + Head of Customer Success |
| Template REJECTED | high | Emit fix mission; notify Head of Marketing |
| Template PENDING_DELETION | medium | Emit fix mission; notify Head of Marketing |
| Delivery rate < 85% | high | Emit fix mission; notify CMO + Head of Customer Success |
| Delivery rate < 70% | critical | Emit fix mission with escalation flag |

## MCP integration

The skill uses the `whatsapp-cloud` MCP server registered in `.claude/settings.json`. Three MCP tools are called:

### `getPhoneNumberStatus`

Returns the registration and quality status of the phone number.

```json
Request:  { "phone_number_id": "123456789" }
Response: { "id": "123456789", "status": "CONNECTED", "quality_rating": "GREEN", "display_phone_number": "+55 11 9..." }
```

### `listMessageTemplates`

Returns all templates associated with the phone number's Business Account.

```json
Request:  { "phone_number_id": "123456789" }
Response: {
  "data": [
    { "id": "...", "name": "onboarding_welcome_pt", "status": "APPROVED", "language": "pt_BR" },
    { "id": "...", "name": "renewal_reminder_pt", "status": "REJECTED", "language": "pt_BR" }
  ]
}
```

### `getMessageAnalytics`

Returns sent/delivered/read counts for a time window.

```json
Request:  {
  "phone_number_id": "123456789",
  "start": "2026-05-21T10:00:00Z",
  "end": "2026-05-22T10:00:00Z",
  "granularity": "DAY"
}
Response: {
  "data": [{ "sent": 1420, "delivered": 1305, "read": 887 }],
  "meta": { "period": "day" }
}
```

## Operator setup

### Prerequisites

1. A Meta Business account with a verified WhatsApp Business App.
2. A system user token with `whatsapp_business_management` and `whatsapp_business_messaging` permissions.
3. The `whatsapp-cloud` MCP server installed and registered in `settings.json`.

### Environment variables

Set these in the deployment environment (never in committed files):

```
WHATSAPP_TOKEN=<Meta Cloud API system user token>
WHATSAPP_PHONE_NUMBER_ID=<numeric phone number ID from Meta Business Suite>
```

For local development, add to a `.env` file (gitignored by the secrets denylist). For the loop's cron wrapper, inject via `cron-wrappers/<cron-id>.env.sh` (also gitignored).

### MCP server registration

Ensure `settings.json` contains an entry for `whatsapp-cloud`:

```json
{
  "mcpServers": {
    "whatsapp-cloud": {
      "command": "npx",
      "args": ["-y", "@bevox/whatsapp-cloud-mcp"],
      "env": {
        "WHATSAPP_TOKEN": "${WHATSAPP_TOKEN}"
      }
    }
  }
}
```

See `docs/integrations/whatsapp.md` for full MCP server setup and Meta App configuration.

### Graceful degradation when MCP is unavailable

If the MCP server cannot be reached (no token, network failure, server not installed), the skill returns:

```json
{ "error": "whatsapp-mcp-unavailable", "reason": "<specific cause>" }
```

It does **not** emit a fix mission in this case — the unavailability may itself be a setup issue rather than a channel health problem. The operator should resolve MCP connectivity before relying on this skill in automated crons.

## Usage examples

### On-demand check (interactive session)

Open the Bevox Blueprint repo in Claude Code and invoke:

```
Task("whatsapp-health-probe", "Check WhatsApp channel health")
```

The skill returns the JSON health object and prints the one-line summary.

### With custom threshold

```
Task("whatsapp-health-probe", "check_delivery_rate: true, alert_threshold_delivery_pct: 90")
```

### From the churn-risk-scan cron

The cron agent passes no overrides; the skill uses env-var defaults. If `healthy: false`, the skill automatically proposes a fix mission in `$LOOP_DIR/missions/propose/`.

## Output example

```json
{
  "phone_status": "CONNECTED",
  "templates": {
    "approved": 14,
    "pending_deletion": 0,
    "rejected": 1,
    "rejected_names": ["renewal_reminder_pt"]
  },
  "delivery_rate_pct": 88.7,
  "alerts": [
    {
      "dimension": "template_rejected",
      "count": 1,
      "names": ["renewal_reminder_pt"],
      "severity": "high"
    }
  ],
  "healthy": false,
  "meta": {
    "phone_number_id": "123456789",
    "checked_at": "2026-05-22T10:00:00Z",
    "check_templates": true,
    "check_delivery_rate": true,
    "alert_threshold_delivery_pct": 85
  }
}
```

Markdown summary:

```
WhatsApp health: DEGRADED — 1 alert: template_rejected (renewal_reminder_pt)
```

## Skill definition

`.claude/skills/whatsapp-health-probe/SKILL.md`

## Architecture reference

`architecture-backlog.md` Phase 3 — skills section; `docs/integrations/whatsapp.md` (MCP setup)
