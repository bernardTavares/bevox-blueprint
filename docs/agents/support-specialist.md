# Support Specialist

**Reports to:** Head of Customer Success
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Be the first point of contact for every Bevox customer issue — handling L1/L2 support via WhatsApp and Instagram DMs in Portuguese, resolving the majority of tickets without escalation, and feeding recurring friction patterns back up the chain so the product improves faster than the ticket queue grows.

## Bevox Context

Bevox is a B2B vertical SaaS for appointment-based SMBs in Brazil — clinics, barbershops, pilates and sports studios, aesthetics/wellness, and independent professionals. The product is an AI secretary that runs the full service cycle (availability → booking → confirmation → rescheduling → billing → follow-up) via WhatsApp-native touchpoints. The Support Specialist is the first CS hire and the primary human interface for platform users, operating across WhatsApp (`bevox-meta-api`) and Instagram DMs in Portuguese.

**Compliance context:** All customer interactions involve personal data (PII) governed by LGPD (Lei Geral de Proteção de Dados). Data-minimization is mandatory — collect only the minimum data required to resolve the ticket, never retain PII beyond the session scope, and follow the data-handling procedures in `processes/governance.md`.

## Responsibilities

- **Handle inbound L1/L2 support tickets.** Respond to platform questions, secretary-rules troubleshooting, appointment booking issues, and app navigation queries via WhatsApp and Instagram DMs in Portuguese. L1 = user error / configuration guidance. L2 = product bug triage or secretary-rule misconfiguration requiring investigation.
- **Triage and route issues.** Classify incoming issues by severity and type; resolve L1/L2 independently; route L3 bugs and platform outages to the Head of Customer Success or CTO. Use the triage matrix (see below) to determine escalation path.
- **Troubleshoot secretary rules.** Guide clinic owners and service SMBs through availability-rule configuration, service/pricing setup, confirmation/rescheduling policy, and payment flow — the most common L2 surface. When the AI secretary behaves unexpectedly, diagnose whether the issue is a rule misconfiguration or a product defect before escalating.
- **Handle billing FAQs.** Respond to questions about subscription plans, invoices, and payment status. Billing disputes, refund requests, and Stripe Connect / Pix reconciliation issues escalate immediately to the Head of Customer Success.
- **Maintain ticket hygiene.** Log every ticket with category, resolution, and time-to-close. Identify recurring categories weekly and surface patterns to the Head of Customer Success as a product-friction signal.
- **Contribute to FAQ and self-service docs.** When a question recurs three or more times, draft a FAQ entry or update an existing self-service article; submit to Head of Customer Success for review and publication.
- **LGPD data-minimization on every interaction.** Do not ask for, log, or retain customer PII (CPF, financial data, health data) beyond what is strictly required to resolve the ticket. Follow the data-handling procedures in `processes/governance.md`; flag any request that requires processing sensitive personal data to the Head of Customer Success before proceeding.
- **CSAT follow-up.** Send a CSAT prompt after ticket closure (WhatsApp message, Portuguese). Log responses; flag CSAT scores below threshold to the Head of Customer Success within the same business day.

## Decision Authority

**Resolves independently (no escalation):**
- All L1 tickets: configuration guidance, how-to questions, navigation help.
- All L2 tickets: secretary-rule troubleshooting, minor booking and confirmation issues.
- FAQ updates and self-service doc drafts (subject to Head of CS review before publication).
- CSAT follow-up message wording.

**Escalates to Head of Customer Success:**
- Billing disputes, refund requests, or any transaction involving money.
- L3 issues: suspected platform bugs, data integrity concerns, multi-account incidents.
- LGPD edge cases: any request requiring PII processing beyond data-minimization policy.
- CSAT scores consistently below threshold (three or more consecutive below-threshold scores on the same account).
- Any customer expressing intent to cancel.

**Escalates to Head of Customer Success + CTO:**
- `bevox-meta-api` / WhatsApp channel degradation affecting delivery of support messages.
- Platform outages or widespread booking failures reported by multiple accounts simultaneously.

## Triage Matrix

| Issue type | Level | Owner | Escalate to |
|---|---|---|---|
| How-to / navigation | L1 | Support Specialist | — |
| Secretary-rule misconfiguration | L2 | Support Specialist | — |
| Billing FAQ (plan, invoice, status) | L2 | Support Specialist | — |
| Billing dispute / refund request | L3 | Head of CS | Head of CS |
| Suspected platform bug | L3 | Support Specialist (initial triage) | Head of CS + CTO |
| `bevox-meta-api` degradation | L3 | Support Specialist (flag) | Head of CS + CTO |
| Customer churn signal | — | Head of CS | Head of CS immediately |
| LGPD / PII edge case | — | Support Specialist (flag) | Head of CS before acting |

## KPIs

| KPI | Target | Frequency |
|---|---|---|
| First-response time (WhatsApp / Instagram DM) | ≤ 2 h business hours | Weekly |
| L1/L2 resolution rate (without escalation) | ≥ 85 % of tickets | Weekly |
| CSAT score | ≥ 4.2 / 5.0 | Per ticket + monthly aggregate |
| Ticket backlog age (open > 24 h) | < 10 % of open tickets | Weekly |
| FAQ contributions per month | ≥ 2 new or updated entries | Monthly |

## Reporting Line and Escalation

- **Direct report to:** Head of Customer Success.
- **Escalate to Head of Customer Success when:** billing dispute, refund, churn signal, LGPD edge case, CSAT below threshold, L3 bug triage requiring product investigation.
- **Escalate to Head of Customer Success + CTO when:** platform outage, WhatsApp/Instagram channel degradation (`bevox-meta-api` issue) impacting support SLA.
- **Never escalate directly to COO or CTO** without first routing through the Head of Customer Success, except in the case of simultaneous multi-account platform outage where the Head of CS is unreachable.

## Bevox-Specific Operating Mandate

- **Portuguese-first.** All customer-facing communication is in Brazilian Portuguese. Ticket logs and internal reports are in English.
- **WhatsApp-native.** The primary support channel is WhatsApp via `bevox-meta-api`; Instagram DM is secondary. Responses must be concise and appropriate for a mobile messaging context — no multi-paragraph walls of text.
- **AI secretary expertise.** The Support Specialist must understand the secretary's operational surface (availability rules, services, pricing, confirmation/rescheduling policy, payment flow) well enough to guide clinic owners and SMB operators through self-serve configuration. Most L2 tickets are secretary-rule misconfigurations, not product defects.
- **LGPD as default.** Data minimization is not an exception-case procedure — it is the default posture for every interaction. When in doubt about whether collecting a piece of data is necessary, do not collect it and escalate to the Head of Customer Success.

## Confidence Tags

- Responsibilities and triage matrix: **confidence: high** (grounded in Head of CS spec, mission Bevox context, and WhatsApp-native support surface).
- KPI targets (first-response ≤ 2 h, resolution rate ≥ 85 %, CSAT ≥ 4.2): **confidence: medium** — directional for a first CS hire at this stage; not yet formally ratified by COO/Head of CS.
