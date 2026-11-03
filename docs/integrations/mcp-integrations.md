# MCP Integrations — Bevox Blueprint

This document describes how Bevox role-agents connect to external systems via MCP (Model Context Protocol) tools. Each integration lists the agents that use it, the MCP server reference, key capabilities exposed, authentication pattern, and Bevox-specific notes.

---

## 1. Stripe Connect

**MCP server:** `stripe` (official [Stripe MCP server](https://github.com/stripe/agent-toolkit))

### Agents

| Agent | Use case |
|---|---|
| CFO | Runway check — reads balance and recent charges to project burn rate |
| Head of Finance | Reconciliation — lists payouts against internal ledger |
| Head of Legal | Compliance recheck — lists disputes for LGPD/PCI audit trail |

### Key capabilities

- `stripe_list_charges` — retrieve recent charge history with filters
- `stripe_list_payouts` — enumerate payout batches to connected SMB accounts
- `stripe_get_balance` — fetch available and pending balance
- `stripe_list_disputes` — surface open disputes for legal review

### Authentication

```
STRIPE_SECRET_KEY=sk_live_...
```

Set this variable via operator settings injection (see [Operator Setup](#operator-setup)). Never commit the key.

### Bevox-specific notes

Bevox operates as a Stripe Connect platform. Marketplace payouts flow from the Bevox platform account to connected SMB customer accounts. The CFO and Head of Finance agents distinguish between platform balance (`/v1/balance`) and connected account payouts (`/v1/payouts` with `Stripe-Account` header). The Head of Legal agent uses dispute data for periodic LGPD/PCI compliance reporting.

---

## 2. WhatsApp / Meta Cloud API

**MCP server:** `whatsapp-cloud` (custom — to be built in Phase 3; see `docs/integrations/whatsapp-mcp-spec.md` when available)

### Agents

| Agent | Use case |
|---|---|
| CMO | Content publishing — broadcasts campaign messages via approved templates |
| Head of Marketing | Campaign tracking — retrieves message status and delivery metrics |
| Head of Customer Success | Onboarding messages — sends welcome and check-in messages to new SMB customers |
| `whatsapp-health-probe` skill | Liveness probe — sends a test message to a canary number to verify the channel is operational |

### Key capabilities

- `whatsapp_send_message` — send a template or free-form message to a WhatsApp number
- `whatsapp_get_message_status` — poll delivery/read receipts for a message id
- `whatsapp_list_templates` — enumerate approved message templates with language codes

### Authentication

```
WHATSAPP_TOKEN=<Meta Cloud API bearer token>
WHATSAPP_PHONE_NUMBER_ID=<numeric phone number id from Meta developer console>
```

### Bevox-specific notes

WhatsApp is the primary customer communication channel for Bevox's SMB customers. All outbound templates must be pre-approved by Meta and must exist in **Portuguese (pt_BR)** as the default language. The CMO agent selects templates by `name` and `language.code`; it never sends free-form messages outside the 24-hour service window. The `whatsapp-health-probe` skill fires on `SessionStart` to confirm channel availability before any agent attempts a send.

---

## 3. Instagram / Meta Graph API (Messaging)

**MCP server:** `whatsapp-cloud` (shared — Instagram Messaging is exposed through the same Meta Cloud API infrastructure as WhatsApp; see section 2)

### Agents

| Agent | Use case |
|---|---|
| CMO | Campaign messaging — sends promotional DMs to opted-in followers via approved flows |
| Head of Marketing | Instagram content engagement — monitors DM inbound from campaign CTAs, tracks reply metrics |
| Head of Customer Success | Onboarding follow-up — sends welcome DMs to SMB customers who engage via Instagram |
| Support Specialist | L2 support — handles customer support tickets arriving as Instagram DMs |

### Key capabilities

- `instagram_send_message` — send a text or media message to an Instagram user who has messaged the business within the 24-hour window
- `instagram_get_messages` — list recent DM conversations for the connected Instagram Business account
- `instagram_get_message_status` — poll delivery/read status for a sent message

### Authentication

Instagram Messaging shares the Meta Cloud API credentials with WhatsApp (section 2). The same bearer token and app configuration grant access to both channels:

```
WHATSAPP_TOKEN=<Meta Cloud API bearer token — also covers Instagram Messaging>
INSTAGRAM_BUSINESS_ACCOUNT_ID=<numeric Instagram Business account id from Meta developer console>
```

`WHATSAPP_TOKEN` is reused because both WhatsApp and Instagram Messaging are accessed through the unified Meta Graph API (`graph.facebook.com/v*`). `INSTAGRAM_BUSINESS_ACCOUNT_ID` identifies the specific Instagram Business account connected to the Meta app.

### Bevox-specific notes

Instagram is the **secondary customer communication channel** alongside WhatsApp (the primary channel). Both channels are served by `bevox-meta-api` and share Meta Cloud API infrastructure, credentials, and rate-limit budgets. Key constraints:

- **24-hour messaging window.** Like WhatsApp, Instagram Messaging restricts business-initiated messages to a 24-hour window after the user's last message. Outside this window, the business cannot initiate contact. Agents must check message recency before attempting a send.
- **No template messaging.** Unlike WhatsApp, Instagram does not support pre-approved message templates for re-engagement outside the 24-hour window. Outbound campaigns must rely on other channels (WhatsApp templates, email) to re-engage lapsed Instagram conversations.
- **Language.** All customer-facing messages default to **Portuguese (pt_BR)**, consistent with the WhatsApp channel.
- **Channel ground truth.** Instagram's role as a core customer channel is established in the project README ("unifies calendar + conversation (WhatsApp/Instagram) + payments"), charter, and strategy documents.

---

## 4. Google Calendar

**MCP server:** `google-calendar` (community MCP — [mcp-google-calendar](https://github.com/nspilman/mcp-google-calendar) or equivalent)

### Agents

| Agent | Use case |
|---|---|
| CEO | Weekly OKR review scheduling — creates and updates recurring review events |
| Head of Sales | Pipeline review cadence — lists upcoming pipeline syncs and reschedules conflicts |
| Head of Customer Success | Onboarding call scheduling — creates onboarding calls for new SMB customers |

### Key capabilities

- `calendar_create_event` — create an event on the service account's calendar or a shared team calendar
- `calendar_list_events` — list events within a time range (used for conflict detection)
- `calendar_update_event` — update time, attendees, or description of an existing event

### Authentication

Google Calendar access uses a **service account** with domain-wide delegation enabled in Google Workspace Admin.

```
GOOGLE_SERVICE_ACCOUNT_KEY=/run/secrets/google-sa.json
```

The JSON key file path is injected at runtime; the file must not be committed to source control. The service account must have the `https://www.googleapis.com/auth/calendar` OAuth scope and be granted delegation for the calendars it needs to write.

### Bevox-specific notes

All scheduling cadences (OKR review, pipeline sync, onboarding calls) target a shared Bevox Google Workspace calendar. The service account impersonates the calendar owner using the `sub` claim in the JWT. Agents must always `calendar_list_events` before `calendar_create_event` to detect conflicts; overlapping events within the same 30-minute window should be reported to the operator rather than silently overwritten.

---

## 5. Clerk

**MCP server:** `clerk` (official [Clerk MCP server](https://clerk.com/docs/integrations/mcp))

### Agents

| Agent | Use case |
|---|---|
| CTO | Auth audit — reviews recent sign-in activity and session counts |
| Head of Engineering | Access control reviews — lists users by role/org membership |
| Head of Legal | Access audit for LGPD — enumerates active sessions; supports right-to-erasure verification |

### Key capabilities

- `clerk_list_users` — paginated user list with filter by email, org, or metadata field
- `clerk_get_user` — fetch a single user record including metadata and external accounts
- `clerk_list_sessions` — enumerate active sessions for a user or across the application
- `clerk_revoke_session` — terminate a session on behalf of the operator (used in incident response)

### Authentication

```
CLERK_SECRET_KEY=sk_live_...
```

### Bevox-specific notes

Clerk is the authentication layer for the Bevox application. Head of Legal uses `clerk_list_users` and `clerk_list_sessions` to produce LGPD access reports and verify that deleted users have no residual active sessions. CTO uses `clerk_list_sessions` for anomaly detection (e.g., sessions from unexpected geolocations). Org membership fields map to Bevox tenant IDs for multi-tenant access control reviews.

---

## Operator Setup

This section is copy-paste ready. All environment variables referenced above must be injected via operator settings — never hardcoded in source files or committed to git.

### 1. Register MCP servers in `.claude/settings.json`

Add an `mcpServers` block to your project's `.claude/settings.json`:

```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/agent-toolkit"],
      "env": {
        "STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"
      }
    },
    "whatsapp-cloud": {
      "command": "node",
      "args": ["${PROJECT_ROOT}/mcp-servers/whatsapp-cloud/index.js"],
      "env": {
        "WHATSAPP_TOKEN": "${WHATSAPP_TOKEN}",
        "WHATSAPP_PHONE_NUMBER_ID": "${WHATSAPP_PHONE_NUMBER_ID}",
        "INSTAGRAM_BUSINESS_ACCOUNT_ID": "${INSTAGRAM_BUSINESS_ACCOUNT_ID}"
      }
    },
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "mcp-google-calendar"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "${GOOGLE_SERVICE_ACCOUNT_KEY}"
      }
    },
    "clerk": {
      "command": "npx",
      "args": ["-y", "@clerk/mcp-server"],
      "env": {
        "CLERK_SECRET_KEY": "${CLERK_SECRET_KEY}"
      }
    }
  }
}
```

### 2. Environment variable injection

**Local development:** Create a `.env.local` file (gitignored) at the project root:

```
STRIPE_SECRET_KEY=sk_test_...
WHATSAPP_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
GOOGLE_SERVICE_ACCOUNT_KEY=/path/to/dev-sa.json
CLERK_SECRET_KEY=sk_test_...
```

Load it before starting Claude Code: `source .env.local` (Unix) or use a dotenv loader in your shell profile.

**Production / CI:** Inject secrets via your secrets manager (e.g., AWS Secrets Manager, GitHub Actions secrets, Doppler). Map each secret to the corresponding environment variable name above. The `${VAR}` substitution in `mcpServers[].env` is resolved by Claude Code at session start.

### 3. Secret hygiene checklist

- `.env`, `.env.*`, `*.json` key files — add to `.gitignore` before first commit.
- Rotate `sk_live_*` keys immediately if they appear in any git diff.
- Use test-mode keys (`sk_test_*`, sandbox Clerk apps) in development; production keys only in production environments.
- Service account JSON files: store the path in `GOOGLE_SERVICE_ACCOUNT_KEY`, mount via Docker secret or symlink from a secrets volume — never copy into the repo.

---

## Quick reference

| Integration | MCP server | Key env var(s) | Primary agents |
|---|---|---|---|
| Stripe Connect | `stripe` | `STRIPE_SECRET_KEY` | CFO, Head of Finance, Head of Legal |
| WhatsApp Cloud | `whatsapp-cloud` | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` | CMO, Head of Marketing, Head of Customer Success |
| Instagram Messaging | `whatsapp-cloud` (shared) | `WHATSAPP_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID` | CMO, Head of Marketing, Head of Customer Success, Support Specialist |
| Google Calendar | `google-calendar` | `GOOGLE_SERVICE_ACCOUNT_KEY` | CEO, Head of Sales, Head of Customer Success |
| Clerk | `clerk` | `CLERK_SECRET_KEY` | CTO, Head of Engineering, Head of Legal |
| Meta Ads API | `meta-ads` | `META_ADS_ACCESS_TOKEN`, `META_ADS_ACCOUNT_ID` | mkt-campaign-manager, mkt-ad-creative-strategist — see [mcp-marketing.md](mcp-marketing.md) |
| SerpAPI | `serpapi` | `SERPAPI_KEY` | mkt-market-intelligence — see [mcp-marketing.md](mcp-marketing.md) |
| Reddit API | `reddit` | `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | mkt-market-intelligence — see [mcp-marketing.md](mcp-marketing.md) |
| CMS / Site API | `cms-site` | `CMS_API_KEY`, `CMS_SITE_ID` | mkt-landing-page-agent — see [mcp-marketing.md](mcp-marketing.md) |
| OpenAI (GEO probe) | `openai` | `OPENAI_API_KEY` | mkt-geo-agent, mkt-market-intelligence — see [mcp-marketing.md](mcp-marketing.md) |
| Perplexity (GEO probe) | `perplexity` | `PERPLEXITY_API_KEY` | mkt-geo-agent, mkt-market-intelligence — see [mcp-marketing.md](mcp-marketing.md) |
