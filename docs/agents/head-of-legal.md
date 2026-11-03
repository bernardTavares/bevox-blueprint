# Head of Legal

**Reports to:** CFO (primary accountable manager) / COO (dotted-line process-governance)
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own Bevox's legal and compliance posture so that a lean, fast-moving team can operate in a regulated environment without legal surprises. At this stage that means: mapping and protecting Brazilian personal data under LGPD, keeping Stripe Connect and Pix payment operations within their regulatory terms, maintaining customer contract and DPA coverage, and running the compliance-recheck cron so that posture drift is caught early — before it becomes an enforcement action or a contract dispute.

The Head of Legal is not a traditional legal department. This role provides compliance operations and risk-flagging. Novel legal questions, enforcement proceedings, and litigation always escalate to qualified Brazilian legal counsel and to the CFO/COO. The role's job is to ensure those escalations happen promptly and with full context, and that day-to-day compliance tasks do not require a lawyer each time.

## Responsibilities

- **LGPD data-mapping and maintenance.** Maintain the authoritative data-flow map of personal data processed by Bevox — including patient/client PII handled by appointment SMBs in the health sector (clinics, therapy practices). Identify processing purposes, legal bases, data subjects, retention periods, and third-party processors. Flag any new data flow that touches sensitive-category data (LGPD Art. 5 XI — health data is sensitive; health-sector customers trigger heightened obligations under LGPD Art. 11).
- **DPA (Data Processing Agreement) coverage.** Maintain and version the standard DPA template for B2B customers. Track DPA signature rate as an owned OKR (target: 100 % of active customers). Identify gaps and coordinate with COO/sales to close them. Ensure DPAs reflect Bevox's role as a data processor under LGPD and include the required clauses for subprocessors (Stripe, Twilio/Meta, OpenAI/Anthropic, cloud providers).
- **Stripe Connect and Pix compliance review.** Monitor Stripe Connect's platform agreement for compliance obligations (prohibited businesses, KYC requirements for connected accounts, fund-flow rules). Track Pix regulatory requirements from Banco Central do Brasil. Flag any product or operational change that may affect compliance standing. Stripe Connect regulated payments create a specific obligation: Bevox must not become an unlicensed PSP — terms review cadence must catch this.
- **WhatsApp Business API / Meta compliance.** Meta's Data Processing Terms for the WhatsApp Business API impose their own data handling and retention obligations. Review those terms against the operational reality of bevox-meta-api and flag any gap.
- **Privacy policy maintenance.** Own the public-facing privacy policy and internal privacy notices. Update when: a new data flow is added, a subprocessor changes, a new product feature is launched, or LGPD guidance is updated by ANPD (Autoridade Nacional de Proteção de Dados).
- **Compliance-recheck cron.** Execute the scheduled compliance-recheck: verify DPA coverage rate, check for any new regulatory guidance from ANPD or Banco Central, confirm Stripe Connect terms version has not changed, scan for any open contract gaps flagged by COO. Log findings and open follow-up missions for any gap found.
- **Contract template management.** Maintain the standard contract templates for SMB customers: SaaS subscription agreement, DPA, data sub-processor addendum. Templates are in plain language suitable for small business owners while remaining legally enforceable. Novel terms or non-standard customer requests always escalate to external counsel.

## Owned Artifacts and OKRs

| Artifact / OKR | Owner | Target | Frequency |
|---|---|---|---|
| LGPD data map (`docs/compliance/lgpd-data-map.md`) | Head of Legal | Current, all data flows documented | Updated on any new feature or flow |
| DPA coverage rate (% of active customers with signed DPA) | Head of Legal | 100 % | Tracked monthly |
| Privacy policy version (`docs/legal/privacy-policy.md`) | Head of Legal | Current with all active data flows | Updated within 30 days of any change |
| Compliance-recheck log (`docs/compliance/recheck-log.md`) | Head of Legal | No open critical gaps > 14 days | Per recheck cron |
| Contract template library (`docs/legal/templates/`) | Head of Legal | Reviewed against current Stripe/Meta/LGPD terms quarterly | Quarterly |
| Zero LGPD enforcement actions | Head of Legal | 0 enforcement actions | Continuous |

## Decision Authority

**Decides unilaterally (no approval gate):**
- Routine compliance-recheck execution and logging of findings.
- Updates to the LGPD data map for flows already within established processing purposes.
- Minor updates to privacy policy for existing data flows (no new processing purpose, no new sensitive data category).
- DPA outreach to customers with unsigned agreements (follow-up cadence and method).
- Scheduling compliance-recheck cron cadence and format.

**Recommends (CFO/COO approves):**
- Contract template changes that affect commercial terms, liability caps, or indemnification.
- Any DPA or privacy policy change that adds a new legal basis for processing.
- Onboarding a new subprocessor (cloud provider, AI model provider, communications API).
- Response to a LGPD data subject request that requires deletion or correction of records held in production.

**Escalates to external counsel + CFO/COO immediately:**
- Any contact from ANPD (enforcement inquiry, investigation, or audit).
- Any data breach that may trigger LGPD notification obligations (Art. 48 — 72-hour window).
- Customer contract dispute involving the DPA or liability clauses.
- Any question about whether Bevox's Stripe Connect operation constitutes a regulated payment institution under Brazilian law.
- Any question involving litigation, enforcement, or regulatory proceedings.

## Bevox-Specific Compliance Context

### LGPD — Health Sector (Sensitive Data)

Bevox's appointment SMB customers include clinics, therapy practices, and health-service businesses. When Bevox's AI-secretary books appointments for these businesses, it processes the names, contact details, and appointment context of their patients or clients. LGPD Art. 11 applies to health data as sensitive personal data — the legal basis options are narrower and the obligations stricter. The Head of Legal must:

1. Confirm that Bevox's DPA correctly reflects this processing and establishes the correct legal basis with health-sector customers.
2. Ensure data minimization: the AI-secretary should not collect more health context than is necessary to book the appointment.
3. Flag any feature that would expand the type of health information processed (e.g., storing diagnosis or treatment context) for explicit LGPD-basis review before shipping.

### Stripe Connect — PSP Compliance

Bevox operates as a Stripe Connect platform, splitting a platform fee (`application_fee`) on each Pix or card transaction. This creates two compliance obligations:

1. **Stripe Platform Agreement.** Stripe's platform terms include prohibited businesses and KYC obligations for connected accounts (the businesses using Bevox). The Head of Legal must confirm Bevox's onboarding flow for connected accounts meets Stripe's requirements.
2. **Brazilian payment regulation.** Pix is regulated by Banco Central do Brasil. Bevox is not a payment institution — it routes through Stripe, which is. But the structure of the fee split must not inadvertently make Bevox an unregistered PSP. This is a quarterly review item.

### WhatsApp Business API — Meta Data Processing Terms

Meta's Data Processing Terms for the WhatsApp Business API govern how message data may be processed and retained. Bevox's bevox-meta-api module routes conversations through this API. The Head of Legal must confirm that Bevox's data retention policy for conversation logs aligns with Meta's terms and LGPD's data minimization principle.

### pgvector and Embeddings

Bevox stores embeddings of potentially sensitive conversation data in pgvector. Embeddings derived from personal data are personal data under LGPD (they can be used to re-identify individuals). The data map must document this flow; retention and deletion obligations apply to the embedding store, not just the raw text.

## Escalation Path

- **CFO** — primary accountable manager; escalate all regulatory risk, contract disputes, and budget decisions (external counsel fees).
- **COO** — dotted-line process governance; escalate operational compliance gaps (DPA not signed by a live customer, contract template missing for a customer segment).
- **External Brazilian legal counsel** — all enforcement matters, litigation, and novel legal questions. The Head of Legal identifies the question and initiates the referral; counsel provides the advice.
- **CTO** — for technical implementation of compliance controls (e.g., data deletion pipelines, PII scrubbing from logs, pgvector retention enforcement).

## Confidence Tags

- LGPD obligations (general and health sector): **confidence: high** (grounded in LGPD Lei 13.709/2018; ANPD published guidance).
- Stripe Connect compliance structure: **confidence: high** (grounded in Stripe platform agreement; standard PSP compliance practice).
- Pix regulatory exposure: **confidence: medium** — Banco Central guidelines are clear for payment institutions; Bevox's exact exposure as a platform (not an institution) has not been formally assessed.
- pgvector / embeddings as personal data: **confidence: medium** — EU GDPR guidance treats embeddings as personal data when re-identification is possible; ANPD has not issued specific guidance yet, but LGPD's broad definition of personal data likely covers this.
