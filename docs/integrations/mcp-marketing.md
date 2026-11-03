# MCP Integrations — Marketing Layer

This document describes the MCP server integrations used by Bevox marketing agents. It supplements the core integration document at `docs/integrations/mcp-integrations.md`, which covers Stripe, WhatsApp/Meta Cloud, Google Calendar, and Clerk.

---

## 1. Meta Ads API

**MCP server:** `meta-ads` (custom — to be built; see `docs/integrations/meta-ads-mcp-spec.md` when available)

### Agents

| Agent | Use case |
|---|---|
| mkt-campaign-manager | Weekly ops — reads campaign and ad-set performance; adjusts budgets within threshold; flags underperformers |
| mkt-ad-creative-strategist | Creative performance reads — queries CPL and CTR per creative to anchor A/B hypotheses in observed data |

### Key capabilities

- `meta_ads_get_campaigns` — list campaigns by account with status, budget, and objective
- `meta_ads_get_adsets` — list ad sets within a campaign with audience, placement, and spend data
- `meta_ads_get_campaign_insights` — fetch impressions, CPL, ROAS, CTR, and frequency for a given date range and breakdown
- `meta_ads_get_ad_creative_insights` — read performance per individual creative (used by mkt-ad-creative-strategist to ground A/B hypotheses in observed data)
- `meta_ads_update_adset_budget` — set the daily budget for an ad set (mkt-campaign-manager only, within its defined threshold)
- `meta_ads_pause_adset` — pause an underperforming ad set (requires confirmed escalation to mkt-paid-media-agent before use)
- `meta_ads_create_campaign` — create a new campaign with objective and budget (mkt-paid-media-agent use only; mkt-campaign-manager does not create campaigns)
- `meta_ads_create_adset` — create a new ad set within a campaign (mkt-paid-media-agent use only)
- `meta_ads_create_ad_creative` — submit a new creative variant for review (mkt-ad-creative-strategist use, pending mkt-paid-media-agent approval before activation)

### Authentication

```
META_ADS_ACCESS_TOKEN=<Meta Marketing API long-lived system user token>
META_ADS_ACCOUNT_ID=<numeric ad account ID — format: act_XXXXXXXXXX>
```

The access token must have `ads_management` and `ads_read` permissions granted on the Meta App. For production use, a **system user token** tied to the Bevox Business Manager is strongly preferred over a personal user token — system user tokens do not expire on personal account password changes and can be scoped precisely to the required ad account permissions.

### Bevox-specific notes

This MCP server is **distinct from `whatsapp-cloud`**, which handles only WhatsApp/Instagram messaging. The Meta Ads API is the Marketing API surface (`graph.facebook.com/v*/act_*/campaigns`, etc.) — a separate permission scope, separate token, and separate rate-limit budget. Both run under the same Meta App and Business Manager but are accessed independently.

**Budget authority is enforced at the agent level, not the API level.** The `meta-ads` MCP server will execute any budget call it receives. It is the `mkt-campaign-manager` agent's responsibility to apply the thresholds defined in its own spec (≤15% change, ≤R$300/day per ad set) before calling `meta_ads_update_adset_budget`.

Campaigns are organized by **ICP vertical** (`fisioterapia`, `pilates`, `estetica`, `studios`, `profissionais-autonomos`). Ad set names must include the vertical slug and creation date for traceability (e.g. `fisio-dor-aguda-2026-07`).

The GATED rule from `mkt-paid-media-agent` applies: **no campaign is activated until ≥3 published Bevox case studies exist.** Neither `mkt-campaign-manager` nor `mkt-ad-creative-strategist` may use `meta_ads_create_campaign` or activate ad sets before this gate is confirmed by mkt-paid-media-agent.

---

## 2. SerpAPI

**MCP server:** `serpapi` (community — [`serpapi-mcp`](https://www.npmjs.com/package/serpapi-mcp) or equivalent)

### Agents

| Agent | Use case |
|---|---|
| mkt-market-intelligence | Weekly search volume tracking — measures demand signal for primary Bevox verticals and ICP queries in Portuguese |

### Key capabilities

- `serpapi_search` — execute a Google Search query and return organic results, related searches, and search metadata; supports `hl` (language) and `gl` (country) parameters
- `serpapi_google_trends` — query Google Trends data for one or more keywords; returns interest-over-time and regional breakdown
- `serpapi_related_queries` — surface rising and top related queries for a seed keyword; used to expand the ICP keyword set over time

### Authentication

```
SERPAPI_KEY=<SerpAPI API key>
```

### Bevox-specific notes

All queries must be issued with `hl=pt` (Portuguese) and `gl=BR` (Brazil) to ensure results reflect the Brazilian market. The mkt-market-intelligence agent tracks the following seed queries per weekly cycle:

- `"sistema de agendamento para [vertical]"` — sizing demand for scheduling software
- `"secretária virtual para [vertical]"` — direct ICP query for the AI secretary concept
- `"[vertical] WhatsApp agendamento"` — channel-specific demand signal
- `"[vertical] confirmação consulta automática"` — automation-aware demand signal

**Google Trends fallback.** At project inception, if the SerpAPI budget is not yet approved, `mkt-market-intelligence` may use the `serpapi_google_trends` endpoint in read-only mode (lower cost tier) or document manual Google Trends observations as free-text in the weekly report. The SerpAPI key is the **primary source** once available, due to its structured historical data and JSON output that feeds directly into the report format.

Trend comparisons across competitors (Ninsaúde, iClinic, Doctoralia) must be run as multi-term queries to normalize against a shared baseline, not as separate queries compared post-hoc.

---

## 3. Reddit API

**MCP server:** `reddit` (community — [`mcp-server-reddit`](https://www.npmjs.com/package/mcp-server-reddit) or equivalent)

### Agents

| Agent | Use case |
|---|---|
| mkt-market-intelligence | Community signal monitoring — surfaces pain points, competitor complaints, and emerging operational patterns from Brazilian SMB owner communities |

### Key capabilities

- `reddit_search_posts` — search posts across all of Reddit by keyword; supports `sort` (relevance, new, top) and `time` (week, month) filters
- `reddit_list_subreddit_posts` — list recent posts from a specific subreddit; used for recurring monitoring of target communities
- `reddit_get_post_comments` — retrieve top comments on a post; surfaces pain-point detail and competitor mentions in context

### Authentication

```
REDDIT_CLIENT_ID=<Reddit App client ID>
REDDIT_CLIENT_SECRET=<Reddit App client secret>
```

The Reddit App must be registered as a **script** or **read-only** type at `reddit.com/prefs/apps`. No user OAuth is required for public content; the client credentials grant is sufficient for all read operations.

### Bevox-specific notes

**Read-only, public content only.** No Bevox agent may post, comment, upvote, or otherwise interact with Reddit content without explicit approval from Bernard. The `reddit` MCP server is configured solely for intelligence gathering on public discussions. Any attempt to engage as Bevox on Reddit must be treated as a brand and legal decision requiring CMO + Head of Legal sign-off.

**Target communities.** The agent monitors general Brazilian entrepreneur communities (e.g. `r/empreendedorismo`, `r/brasil`) and any subreddits where health-sector SMB owners discuss operations. English-language subreddits (`r/physio`, `r/pilates`) may also surface relevant ICP pain language. Brazilian SMB owners are more active on Facebook Groups and WhatsApp communities than on Reddit — Reddit signals are a qualitative supplement, not the primary source.

**Volume expectation.** Expect low post volume in Portuguese on Reddit. If a weekly scan returns zero relevant results, document that as "signal absent" in the weekly report rather than treating it as an error. The `serpapi` MCP (section 2) is the higher-signal source for search intent.

---

## 4. CMS / Site API

**MCP server:** `cms-site` (placeholder — CMS for `bevox-site` not identified in project charter or strategy; see Bevox-specific notes)

### Agents

| Agent | Use case |
|---|---|
| mkt-landing-page-agent | Page publishing — creates and updates per-vertical landing pages after Head of Marketing copy approval |

### Key capabilities

- `cms_get_page` — fetch an existing page by path; used for duplicate detection before creating a new page
- `cms_create_page` — create a new page at a specified URL path (e.g. `/fisioterapia`); must be preceded by `cms_get_page` to verify the path is free
- `cms_update_page_content` — update the content of an existing page without changing its URL or metadata
- `cms_publish_page` — publish a draft page to production; may only be called after Head of Marketing approval marker is present in the copy draft

### Authentication

```
CMS_API_KEY=<CMS platform API key>
CMS_SITE_ID=<site or project identifier on the CMS platform>
```

**PLACEHOLDER — Bernard must fill in before this MCP server can be built or configured:**

The CMS platform used for `bevox-site` is not documented in `charter.md` or `strategy.md`. Before proceeding, Bernard must confirm the CMS (e.g. Webflow, Contentful, Sanity, custom Next.js with a CMS adapter) and then:

1. Update this document with the actual MCP server package name or build reference.
2. Update `.claude/settings.json` with the correct `command`, `args`, and any additional env vars required by the platform.
3. Update the `mkt-landing-page-agent` spec if the publishing flow differs from the capability list above.

Until the CMS is confirmed, `mkt-landing-page-agent` produces copy drafts only — publishing remains a manual engineering action.

### Bevox-specific notes

**Publishing gate.** `cms_publish_page` may only be called after the copy draft has been reviewed and approved by the Head of Marketing. `mkt-landing-page-agent` must verify an approval marker in `docs/marketing/landing-pages/<vertical>/copy-draft.md` (e.g. a `Status: APPROVED — Head of Marketing` line) before invoking this tool. This gate is enforced by the agent, not by the MCP server.

**Duplicate detection is mandatory.** Before calling `cms_create_page`, the agent must call `cms_get_page` to verify the path does not already exist. If the page exists, the agent must call `cms_update_page_content` instead. Silently overwriting an existing production page without checking is a content-loss risk.

**URL convention.** Target paths follow the pattern `/[vertical]` (e.g. `/fisioterapia`, `/pilates`, `/estetica`, `/studios`, `/profissionais-autonomos`). The exact path is decided by the Head of Marketing; `mkt-landing-page-agent` must not choose paths autonomously.

---

## 5. LLM Probe APIs (OpenAI + Perplexity)

**MCP servers:** `openai` (community — [`mcp-server-openai`](https://www.npmjs.com/package/mcp-server-openai) or equivalent) and `perplexity` (community — [`perplexity-mcp`](https://www.npmjs.com/package/perplexity-mcp) or equivalent)

### Agents

| Agent | Use case |
|---|---|
| mkt-geo-agent | GEO probes — runs the canonical query set against ChatGPT and Perplexity to audit Bevox's presence in LLM-generated answers |
| mkt-market-intelligence | Ad-hoc LLM presence checks — verifies Bevox representation for specific signals without waiting for the mkt-geo-agent bi-weekly cycle |

### Key capabilities

**`openai` server:**
- `openai_chat_completion` — submit a prompt to a GPT model and receive a completion; used to probe queries like "qual sistema usar na minha clínica de fisioterapia?" and parse the response for Bevox mentions and competitor references

**`perplexity` server:**
- `perplexity_search` — submit a search query to Perplexity and receive a cited, synthesized answer; exposes a `citations` field in the response so the geo-agent can identify which content sources Perplexity is reading when it answers ICP queries

### Authentication

```
OPENAI_API_KEY=<OpenAI API key>
PERPLEXITY_API_KEY=<Perplexity API key>
```

### Bevox-specific notes

**These integrations are read-only intelligence tools, not product integrations.** Bevox does not use OpenAI or Perplexity in its product stack — the AI secretary runs on Claude via `bevox-harness`. The `openai` and `perplexity` MCP servers exist solely to probe competitor LLMs for GEO presence intelligence.

**Probe query hygiene.** Queries must be issued in natural language, in Portuguese, exactly as a Brazilian clinic owner would type them — not as structured API payloads with leading hints. Injecting "Bevox" or "secretária de IA" into the probe query would contaminate the result. Canonical probe queries are maintained by `mkt-geo-agent` in `docs/marketing/geo/probe-queries.md`.

**Response parsing protocol.** After each completion, the agent must:
1. Check if "Bevox" (case-insensitive) appears in the response body.
2. Check if any confirmed competitor name (Ninsaúde, iClinic, Doctoralia) appears.
3. For `perplexity_search`, parse the `citations` array to identify which URLs Perplexity cited — these are high-value pages for GEO content investment.
4. Log the full result (date, LLM, query, response summary, mentions found) to `docs/marketing/intelligence/geo-probe-log.md`.

**Model pinning.** Use `gpt-4o` for OpenAI probes and the current default model for Perplexity probes. Pinned model versions should be reviewed by mkt-geo-agent when major new model releases are detected, since the ICP's experience may shift accordingly.

**Ownership.** `mkt-geo-agent` owns the bi-weekly structured probe cycle. `mkt-market-intelligence` may run ad-hoc single-query checks to verify a specific signal; it must not duplicate the full probe set. Both agents log to the same `geo-probe-log.md` file, prefixed with their agent name.

---

## Marketing MCP Operator Setup

All environment variables for marketing MCP servers must be injected via operator settings — never hardcoded or committed to source control.

### Environment variables to add to `.env.local`

```
META_ADS_ACCESS_TOKEN=...
META_ADS_ACCOUNT_ID=act_...
SERPAPI_KEY=...
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
CMS_API_KEY=...            # placeholder — fill after CMS is confirmed with Bernard (see section 4)
CMS_SITE_ID=...            # placeholder — fill after CMS is confirmed with Bernard (see section 4)
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
```

For `META_ADS_ACCESS_TOKEN`, generate a **system user token** from the Bevox Business Manager (`business.facebook.com` > Business Settings > System Users). Do not use a personal user access token — system user tokens are not tied to personal account passwords and will not break on rotation.

For `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET`, register a **script-type** Reddit App at `reddit.com/prefs/apps`. A redirect URI is not required for read-only client-credentials access.

Refer to the [Operator Setup section in `docs/integrations/mcp-integrations.md`](mcp-integrations.md#operator-setup) for the general pattern on `.gitignore` configuration, secret hygiene checklist, and CI injection via secrets manager.

---

## Quick reference

| Integration | MCP server | Key env var(s) | Primary agents |
|---|---|---|---|
| Meta Ads API | `meta-ads` | `META_ADS_ACCESS_TOKEN`, `META_ADS_ACCOUNT_ID` | mkt-campaign-manager, mkt-ad-creative-strategist |
| SerpAPI | `serpapi` | `SERPAPI_KEY` | mkt-market-intelligence |
| Reddit API | `reddit` | `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | mkt-market-intelligence |
| CMS / Site API | `cms-site` | `CMS_API_KEY`, `CMS_SITE_ID` | mkt-landing-page-agent |
| OpenAI (GEO probe) | `openai` | `OPENAI_API_KEY` | mkt-geo-agent, mkt-market-intelligence |
| Perplexity (GEO probe) | `perplexity` | `PERPLEXITY_API_KEY` | mkt-geo-agent, mkt-market-intelligence |
