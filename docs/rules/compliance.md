# Compliance — Bevox Blueprint

This document is the human-readable compliance guide for Bevox operators and stakeholders.
It summarizes the guardrails enforced by the machine-readable rule at
`.claude/rules/compliance.md`, which remains the authoritative source of truth for agent
sessions. When this guide and the machine-readable rule diverge, the machine-readable rule
governs.

---

## 1. LGPD guardrails (Lei 13.709/2018)

Bevox processes personal data of Brazilian data subjects. All agents and operators must
comply with the Lei Geral de Protecao de Dados (LGPD).

### PII handling

Brazilian PII must never appear in plaintext in logs, commits, or user-visible output.
Protected identifiers include CPF, CNPJ, RG, full name combined with contact details,
and biometric data.

### Health-sector sensitive data (Art. 11)

Bevox serves appointment-based health businesses (physiotherapy, pilates, clinics). Any
data carrying health context (diagnosis, treatment purpose, medical appointment type) is
sensitive personal data under LGPD Art. 11. Sensitive data may only be stored in
designated, encrypted columns within the approved schema. Expanding the health data
collected by the AI secretary requires a formal LGPD-basis review approved by the Head of
Legal before shipping.

### Data minimization

Collect only the minimum data necessary to book and manage the appointment. Do not add new
data collection points (fields, API parameters, log statements capturing PII) without
flagging the change to the Head of Legal before the PR is merged.

### Embeddings are personal data

Embeddings derived from personal data (conversation logs, appointment context) stored in
pgvector are personal data under LGPD because they may allow re-identification. Deletion
and retention obligations apply equally to embeddings and raw source text. New embedding
pipelines for sensitive data require Head of Legal review.

### Data subject requests (DSR)

Any LGPD data subject request (access, correction, deletion, portability) must be
escalated to the Head of Legal and COO within 72 hours. DSRs must not be fulfilled ad hoc
in code without a Legal-approved process.

---

## 2. Payment compliance (Stripe Connect + Pix)

### Stripe Connect

Bevox uses Stripe Connect (Express sub-accounts) with automatic fee splits. The following
must never be logged or exposed:

- Card numbers or PAN fragments
- Webhook signing secrets
- Connected-account OAuth tokens (`access_token`, `refresh_token`)
- `application_fee` split configuration in end-user-visible output

All Stripe API calls must be routed through the designated billing service module. Ad-hoc
Stripe API usage requires CTO review.

### Pix

Pix payment data must be handled with equivalent care:

- Chaves Pix (CPF, CNPJ, e-mail, phone, random key) must not appear in application logs
  accessible to non-finance roles.
- Pix transaction IDs (`txid`) and end-to-end IDs (`endToEndId`) must not appear in
  plaintext logs.
- QR-code payload strings encoding payment data must not be logged.

### Bevox is not a payment institution

Bevox must never hold, settle, or route funds directly outside the Stripe Connect flow.
Any product idea involving direct fund custody or peer-to-peer Pix transfers must be
escalated to the Head of Legal and CFO before any code is written.

---

## 3. WhatsApp / Meta Business API

### Message content retention

Conversation logs from the WhatsApp Business API must not be retained beyond session scope
without an explicit retention policy approved by the Head of Legal. Writing conversation
bodies to long-lived storage (database tables, log files, analytics pipelines) requires
Legal sign-off.

### Minimum PII in webhook payloads

Meta webhook payloads may contain user phone numbers and display names. These fields must
not be forwarded, logged, or re-processed beyond what is strictly necessary to route the
conversation. Strip or pseudonymize before writing to analytics or monitoring systems.

### WhatsApp Business Profile changes

Any change to the Bevox WhatsApp Business Profile (display name, category, description,
website, profile picture) must be flagged to the CMO and Head of Legal before submission
to Meta.

---

## 4. Secrets denylist (additive to template)

The following patterns are forbidden in committed files, log output, and echoed environment
variable values. These extend the template-level secrets rule.

| Pattern | Reason |
|---|---|
| `*stripe*secret*`, `*stripe*key*` | Stripe API and webhook secrets |
| `*pix*key*`, `*chave*pix*` | Pix chave identifiers |
| `LGPD_*`, `*lgpd*token*` | Internal LGPD processing tokens |
| `cpf_*`, `*_cpf`, `cpf:` | CPF field names likely containing PII |
| `cnpj_*`, `*_cnpj`, `cnpj:` | CNPJ field names likely containing PII |
| `*webhook_secret*` | Webhook secrets (any provider) |
| `*access_token*` (Stripe context) | Stripe Connect OAuth tokens |

A denylist match aborts the commit and notifies the developer. The `--no-verify` bypass is
never permitted.

---

## 5. Escalation matrix

| Trigger | Escalate to | SLA |
|---|---|---|
| LGPD compliance doubt before merge | Head of Legal | Before merge |
| New data collection point | Head of Legal | Before merge |
| New health-sector data flow or column | Head of Legal + CTO | Before merge |
| LGPD data subject request received | Head of Legal + COO | Within 72 h |
| Possible data breach or unauthorized PII access | Head of Legal + COO + CTO | Immediately (Art. 48 — 72 h ANPD window) |
| Contact from ANPD (enforcement, audit, inquiry) | Head of Legal + CFO + external counsel | Immediately |
| Stripe Connect terms version change | Head of Legal + CFO | Within 48 h |
| Pix regulatory update from Banco Central | Head of Legal | Within 48 h |
| WhatsApp Business Profile change | CMO + Head of Legal | Before submission |
| Code change that may make Bevox an unlicensed PSP | Head of Legal + CFO + external counsel | Immediately — do not ship |

**When in doubt, halt and escalate.** The cost of a compliance breach (ANPD enforcement,
Stripe platform suspension, Meta policy violation) is higher than the cost of a brief
delay.

---

## Reference

The machine-readable rule enforced during agent sessions is at
`.claude/rules/compliance.md`. This guide mirrors its intent in operator-facing prose. If
any discrepancy is found, update this document to match the machine-readable rule and flag
the drift to the Head of Legal.
