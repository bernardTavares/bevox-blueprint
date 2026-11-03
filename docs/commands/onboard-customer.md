# /onboard-customer — Command Documentation

## Purpose

The `/onboard-customer` slash command guides the Head of Customer Success (and operators) through a structured onboarding checklist for a new Bevox customer. It collects key customer details, walks through the mandatory setup steps, and produces a ready-to-save onboarding record stub for `docs/customers/<customer-slug>/onboarding.md`.

## Who runs this

Primarily the **Head of Customer Success** agent (see `docs/agents/head-of-customer-success.md`). Any operator with access to the Blueprint workspace may also invoke it.

## Required inputs

The command will prompt for the following (or accept `--customer <name>` as a shortcut for the name field):

| Field | Description | Example |
|---|---|---|
| `customer_name` | Legal or trade name of the business | Padaria do Zé |
| `plan_tier` | Subscribed plan | Starter / Growth / Pro |
| `primary_contact` | Full name of the main point of contact | Maria Oliveira |
| `whatsapp` | WhatsApp business number (with country code) | +55 11 98765-4321 |
| `email` | Primary contact email | maria@padaria.com.br |
| `industry_vertical` | Business segment | Food & Beverage |

## Step-by-step flow

1. **Collect inputs** — operator fills in the six fields above (prompted interactively or passed via arguments).
2. **Generate onboarding checklist** — the command outputs a structured checklist covering:
   - Account setup (credentials, billing, team seats)
   - WhatsApp channel configuration (API key, opt-in flow, template approval)
   - First demo / success call scheduled
   - Success metrics agreed and documented
   - Slack / internal comms channel created
3. **Produce onboarding record stub** — a filled-in Markdown template for `docs/customers/<customer-slug>/onboarding.md` is printed. The operator reviews it and saves it manually (or delegates to a subagent).
4. **List next steps** — a short prioritised action list for the Head of Customer Success is displayed.
5. **WhatsApp welcome template** — a Portuguese-language message template ready to send via the Bevox platform is shown.

## Expected outputs

- Printed onboarding checklist (console / chat)
- `docs/customers/<customer-slug>/onboarding.md` record stub (text output — operator saves)
- Next-steps list for CS
- WhatsApp welcome message template in Portuguese

## Example invocation

```
/onboard-customer
```

or with a pre-filled name:

```
/onboard-customer --customer "Padaria do Zé"
```

## Notes

- The command does **not** auto-write files; it produces output the operator reviews first.
- The `customer-slug` is derived automatically: lowercase, hyphens, ASCII only (e.g. `padaria-do-ze`).
- For bulk onboarding sessions, run once per customer.
- Template messages must comply with WhatsApp Business Policy — do not include promotional language in the first contact.
