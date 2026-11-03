# Compliance rule — LGPD + Pix / Stripe Connect guardrails

Injected into every agent session operating on the Bevox target repo.
When in doubt about any item below, stop and ping the Head of Legal before proceeding.

---

## Section 1 — LGPD guardrails (Lei 13.709/2018)

**Do not log, commit, or expose Brazilian PII in plaintext.** PII includes but is not limited to:
- CPF (Cadastro de Pessoas Físicas) and CNPJ numbers
- RG (Registro Geral) and other government-issued identifiers
- Full names combined with contact details (phone, e-mail, address) in log output
- Patient names, appointment context, or any health-related data processed on behalf of health-sector customers (clinics, therapy practices)
- Biometric data of any kind

**Sensitive data — heightened obligations (LGPD Art. 11 — health sector).**
Bevox's appointment customers include health-sector businesses. Any data that contains health context (diagnosis, treatment purpose, medical appointment type) is sensitive personal data under Art. 11. Rules:
- Sensitive data may only be stored in designated, encrypted columns. Do not add columns or tables for health data outside the approved schema without CTO + Head of Legal sign-off.
- Do not expand the type of health information the AI-secretary collects without an explicit LGPD-basis review approved by Head of Legal before shipping.
- Data minimization applies: collect only what is necessary to book the appointment.

**New data collection requires Legal review before shipping.**
Any code change that introduces a new data collection point (new field, new API parameter that captures user data, new log statement that may contain PII) must be flagged to the Head of Legal before the PR is merged. Open a note in the PR description: `Legal review needed: new data collection — [describe what is collected]`.

**pgvector / embeddings are personal data.**
Embeddings derived from personal data (conversation logs, appointment context) are personal data under LGPD because they may allow re-identification. Apply the same deletion and retention obligations to the embedding store (`pgvector` tables) as to the raw source text. Do not create new embedding pipelines for sensitive data without Head of Legal review.

**Data subject requests (DSR).**
Any LGPD data subject request received (right of access, correction, deletion, portability) must be escalated to Head of Legal AND COO within 72 hours. Do not fulfill DSRs ad hoc in code without Legal-approved process.

---

## Section 2 — Payment compliance (Stripe Connect + Pix)

**Stripe Connect — never log or expose:**
- Card numbers or any PAN fragment
- Webhook signing secrets (`STRIPE_WEBHOOK_SECRET` or equivalents)
- Connected account tokens, `access_token`, or `refresh_token` from OAuth flows
- `application_fee` split configuration in end-user-visible output

**Stripe API calls are restricted to the designated billing service.**
Do not make ad-hoc Stripe API calls (`stripe.charges.create`, `stripe.payouts.*`, `stripe.accounts.*`, etc.) outside the designated billing service module. New Stripe API usage requires CTO review.

**Pix — never log or expose:**
- Chaves Pix (CPF, CNPJ, e-mail, phone, or random key) in application logs accessible to non-finance roles
- Pix transaction IDs (`txid`) or end-to-end IDs (`endToEndId`) in plaintext logs
- QR-code payload strings that encode payment data

**Bevox is not a payment institution.**
Do not implement any feature that would cause Bevox to hold, settle, or route funds directly outside the Stripe Connect flow. Any product idea that involves direct fund custody or peer-to-peer Pix transfers must be escalated to Head of Legal + CFO before any code is written.

---

## Section 3 — WhatsApp / Meta Business API

**Do not cache message content beyond session.**
Conversation logs from the WhatsApp Business API must not be retained beyond the session scope without an explicit retention policy approved by Head of Legal. Do not write conversation bodies to long-lived storage (database tables, log files, analytics pipelines) without Legal sign-off.

**Minimum PII in webhook payloads.**
Meta webhook payloads may contain user phone numbers and display names. Do not forward, log, or re-process these fields beyond what is strictly necessary to route the conversation. Strip or pseudonymize before writing to analytics or monitoring systems.

**WhatsApp Business Profile changes require CMO + Legal notification.**
Any change to the Bevox WhatsApp Business Profile (display name, category, description, website, profile picture) must be flagged to the CMO and Head of Legal before submission to Meta. Profile changes may affect Meta's compliance review.

---

## Section 4 — Secrets denylist (additive to template)

The following patterns are **forbidden** in committed files, log output, and environment variable values that are echoed or printed. These are in addition to the template-level secrets rule.

| Pattern | Reason |
|---|---|
| `*stripe*secret*`, `*stripe*key*` | Stripe API and webhook secrets |
| `*pix*key*`, `*chave*pix*` | Pix chave identifiers |
| `LGPD_*`, `*lgpd*token*` | Internal LGPD processing tokens |
| `cpf_*`, `*_cpf`, `cpf:` | CPF field names likely containing PII |
| `cnpj_*`, `*_cnpj`, `cnpj:` | CNPJ field names likely containing PII |
| `*webhook_secret*` | Any webhook secret regardless of provider |
| `*access_token*` (in Stripe context) | Stripe Connect OAuth tokens |

If a file or diff matches any of the above, abort the commit and notify the developer. Do not bypass with `--no-verify`.

---

## Section 5 — Escalation

| Trigger | Escalate to | SLA |
|---|---|---|
| Any LGPD compliance doubt before merging | Head of Legal | Before merge |
| New data collection point | Head of Legal | Before merge |
| New health-sector data flow or column | Head of Legal + CTO | Before merge |
| LGPD data subject request received | Head of Legal + COO | Within 72 h |
| Possible data breach or unauthorized access to PII | Head of Legal + COO + CTO | Immediately (LGPD Art. 48 — 72-hour ANPD notification window) |
| Contact from ANPD (enforcement, audit, inquiry) | Head of Legal + CFO + external Brazilian legal counsel | Immediately |
| Stripe Connect terms version change detected | Head of Legal + CFO | Within 48 h |
| Pix regulatory update from Banco Central | Head of Legal | Within 48 h |
| WhatsApp Business Profile change | CMO + Head of Legal | Before submission |
| Any code change that may make Bevox an unlicensed PSP | Head of Legal + CFO + external counsel | Immediately — do not ship |

**When in doubt, halt and escalate.** The cost of a compliance breach (ANPD enforcement, Stripe platform suspension, Meta policy violation) is higher than the cost of a brief delay.
