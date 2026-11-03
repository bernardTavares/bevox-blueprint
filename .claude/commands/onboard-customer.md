---
description: Guide the Head of Customer Success through structured onboarding for a new Bevox customer — collects details, generates checklist, produces onboarding record stub and WhatsApp welcome template.
argument-hint: --customer "<name>"
---

You are running the Bevox customer onboarding workflow. Follow these steps exactly.

## Step 1 — Collect customer information

If the argument `--customer "<name>"` was passed, use that as `customer_name` and ask only for the remaining fields. Otherwise, ask for all six fields one at a time (or as a grouped form):

1. **Customer name** (legal or trade name of the business)
2. **Plan tier** — Starter, Growth, or Pro
3. **Primary contact name**
4. **WhatsApp number** (include country code, e.g. +55 11 98765-4321)
5. **Email** of primary contact
6. **Industry vertical** (e.g. Food & Beverage, Retail, Services, Healthcare, Education)

Derive `customer_slug` from the customer name: lowercase, replace spaces and special chars with hyphens, strip accents (e.g. "Padaria do Zé" → "padaria-do-ze").

## Step 2 — Output the onboarding checklist

Print the following checklist, marking all items as unchecked:

```
# Onboarding Checklist — {customer_name}

## Account Setup
- [ ] Bevox account created and credentials sent to {primary_contact}
- [ ] Billing configured for {plan_tier} plan
- [ ] Team seats assigned (operator + {primary_contact})

## WhatsApp Channel Configuration
- [ ] WhatsApp Business API key provisioned for {whatsapp}
- [ ] Opt-in flow reviewed and approved by customer
- [ ] Message templates submitted for Meta approval
- [ ] Test message exchange confirmed

## First Success Call
- [ ] Demo / kickoff call scheduled with {primary_contact}
- [ ] Agenda sent at least 24h in advance
- [ ] Call recorded and summary shared

## Success Metrics
- [ ] KPIs agreed with {primary_contact} (response rate, CSAT, resolution time)
- [ ] Baseline measured (if customer has prior data)
- [ ] 30/60/90-day review dates set

## Internal Setup
- [ ] Slack channel #cs-{customer_slug} created
- [ ] Head of Customer Success and AE added
- [ ] Onboarding record saved to docs/customers/{customer_slug}/onboarding.md
```

## Step 3 — Produce the onboarding record stub

Print the following filled template. Tell the operator: "Review the record below and save it to `docs/customers/{customer_slug}/onboarding.md`."

```markdown
# Onboarding Record — {customer_name}

- **Plan:** {plan_tier}
- **Primary contact:** {primary_contact}
- **WhatsApp:** {whatsapp}
- **Email:** {email}
- **Industry:** {industry_vertical}
- **Onboarding started:** {today's date}
- **Status:** In Progress

## Notes

<!-- Add call notes, blockers, and key decisions here -->

## Checklist status

<!-- Paste updated checklist here after each CS touchpoint -->
```

## Step 4 — Next steps for Head of Customer Success

Print this prioritised list:

1. Send WhatsApp welcome message (template below) within 24h of account creation.
2. Schedule kickoff call within 3 business days.
3. Confirm WhatsApp template approval status with the tech team.
4. Set a 7-day check-in reminder in your calendar.
5. Save the onboarding record to `docs/customers/{customer_slug}/onboarding.md`.

## Step 5 — WhatsApp welcome message template (Portuguese)

Print the following template:

---

**Modelo de mensagem de boas-vindas — WhatsApp**

> Olá, {primary_contact}! Tudo bem? 😊
>
> Aqui é [seu nome], do time de Customer Success da Bevox. Seja muito bem-vindo(a)!
>
> Estamos muito felizes em ter a {customer_name} como cliente. Nossa missão é garantir que vocês tirem o máximo proveito da plataforma desde o primeiro dia.
>
> Nos próximos dias vou entrar em contato para agendar nossa chamada de kickoff e apresentar tudo o que preparamos para vocês.
>
> Qualquer dúvida, pode chamar aqui mesmo no WhatsApp! 🚀
>
> Um abraço,
> [seu nome] — Bevox Customer Success

---

*Atenção: não inclua conteúdo promocional ou ofertas comerciais neste primeiro contato. O foco é acolhimento e próximos passos.*
