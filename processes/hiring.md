# BEVOX — Hiring Process

This is the single source of truth for how Bevox opens a role, sources, screens, interviews, decides, and onboards a human being. It is owned and run by the **CHRO** and derives directly from row 2 (Hiring) of `raci-matrix.md`. If this doc and the matrix ever disagree on who owns what, **the matrix wins** and this doc is corrected.

It is deliberately small. Bevox is post-PMF with 10–50 paying customers, a single human (Bernard), and a workforce that is overwhelmingly Claude Code agents. This process is for the **first 1–3 human hires** — the highest-stakes, lowest-frequency people decisions the company will make at this stage. It is not an enterprise recruiting funnel. There is no ATS, no req-approval committee, no nine-stage panel loop. When a two-or-three-person company makes a bad hire, that hire is a third of the team — so the process is light on bureaucracy and heavy on judgment exactly where judgment matters.

## When this process applies

This process governs **hiring a human**. It does **not** govern instantiating a new agent role — that is agent-role-catalog work the CHRO also owns, but it is governed by the catalog-hygiene discipline (naming, dedup, unambiguous owner), not by this hiring flow. The trigger for *this* document is: a function has a need that an agent cannot or should not absorb, and the answer is a person.

The default at Bevox is **agents first**. Before opening a human role, the honest question is: "Can this be done by an agent, or by sharpening an existing agent's mandate?" A human req is justified only when the answer is no — the work needs human judgment, presence, relationship, or accountability that the agent org cannot carry at this stage.

## Roles in this process (who is who)

Mapped from `raci-matrix.md` row 2 and `org-chart.md`:

- **CEO — Accountable (A).** Owns the *decision to open a role* and whether Bevox makes a given hire at all. Casts the go/no-go on the req as a capital and strategy call. One A, per the one-A-per-process rule.
- **CHRO — Responsible (R), and A for the process itself.** Runs the hiring process end to end: scopes the role with the hiring manager, sources, screens, coordinates the loop, runs the rubric, assembles the recommendation, drafts the offer, and owns CLT-vs-PJ classification and LGPD-for-people-data. Future delegate: **Head of People** (under CHRO) carries the operational R once instantiated; today the CHRO holds both.
- **Hiring manager — Consulted (C), and R for role-specific judgment.** The C-suite agent (or, later, dept lead) whose function the hire lands in. Owns the job description's substance, the technical/role bar, and the final thumbs-up/down on competence for the role. For an engineering hire this is the CTO; product, the CPO; finance, the CFO; GTM, the CMO; operations/CS, the COO. The CHRO partners with this role on the scorecard but does not pretend to set the technical bar itself.
- **Bernard — Consulted / Informed (C/I), and the human gate.** Informed throughout; consulted when a hire's compensation crosses the budget cap. **Every actual hire decision — and every fire decision — escalates to and is approved by Bernard.** The CHRO scopes, runs, and recommends; Bernard makes the call to bring a human into (or remove a human from) the company. This is the one human approval gate in an otherwise fully autonomous org.
- **CFO — Consulted (C).** The comp commitment hits runway and the burn model; the CFO signs off on affordability when a req has a real salary attached.

## The process, stage by stage

Six stages: **need definition → sourcing → screening → interview loop → offer → onboarding.** Each names its owner per the RACI above. A typical first-hire run should take days-to-weeks, not months — time-to-hire is a CHRO KPI, because slow hiring keeps Bernard the bottleneck on everything the hire was meant to absorb.

### Stage 1 — Need definition (open the role)

**Owner:** CEO is **A** (decision to open). CHRO **R** (writes it up). Hiring-manager C-suite agent **C** (defines the substance). CFO **C** (affordability). Bernard **I** (and **C** if comp will cross the cap).

1. The owning C-suite agent surfaces a need that an agent cannot absorb and proposes a human role to the CHRO.
2. The CHRO pressure-tests it against "agents first": is this genuinely human work, or unsharpened agent scope? If an agent can do it, no req is opened — the gap goes back to the agent-role catalog instead.
3. If it is real, the CHRO + hiring manager write a **one-page role brief**: the outcome the hire owns (not a task list), the 3–5 competencies that actually predict success, the comp band and level (from the CHRO's comp/levelling framework, CFO consulted on runway impact), and the proposed **employment structure (CLT vs PJ — see below)**.
4. The CHRO takes the brief to the **CEO for the open/no-go decision**. The CEO owns this as a capital-and-strategy call. If the comp crosses the budget cap, Bernard is consulted before the role opens.
5. Output: an opened role with a written brief and a **scorecard** — the rubric the loop will score against. The scorecard is set *before* any candidate is seen, so the bar is fixed in advance, not reverse-engineered to fit whoever shows up.

### Stage 2 — Sourcing

**Owner:** CHRO **R**. Hiring manager **C** (warm intros, where this kind of person lives).

1. Sourcing is **lightweight and direct** — no agency, no job-board spray. At 10–50 customers the best first hires usually come from the founder's and C-suite's networks, targeted outreach, and Brazilian professional channels (LinkedIn, vertical communities, referrals).
2. The CHRO runs outbound against the scorecard's competencies; the hiring manager supplies warm intros and signal on where strong candidates for this specific role congregate.
3. **LGPD from the first contact.** Candidate CVs, profiles, and notes are personal data the moment they enter the pipeline. The CHRO collects only what the decision needs, records the lawful basis for processing candidate data, and does not retain rejected candidates' data beyond its lawful purpose. People-data follows the same discipline Bevox applies to customer data (coordinated with the COO/CTO owners of company-wide LGPD posture).
4. Output: a small, high-signal shortlist — quality over volume. A tiny team interviewing twenty people is a process failure, not diligence.

### Stage 3 — Screening

**Owner:** CHRO **R**. Hiring manager **C** (sanity-check on role fit before investing loop time).

1. A short screening conversation (CHRO-led) confirms baseline fit against the scorecard: motivation, comp expectations vs. band, availability, and the deal-breakers (location/remote, CLT-vs-PJ willingness, language).
2. The hiring manager does a quick competence sanity-check on the most promising candidates before the full loop is scheduled — cheap signal before expensive time.
3. Candidates clearly outside the band or the bar are declined here, promptly and respectfully (and their data handled per LGPD).
4. Output: 2–4 candidates worth a full loop.

### Stage 4 — Interview loop

**Owner:** CHRO **R** (coordinates, scores process/values). Hiring manager **R** for the competence verdict (**C** in matrix terms — consulted on the hire, responsible for the technical bar).

1. Keep the loop **small and deliberate**: typically a competence/role deep-dive run by the hiring-manager agent, a values/working-style conversation run by the CHRO, and — for a hire who will work closely with Bernard or own a company-critical surface — a conversation with Bernard. Three touchpoints, not nine.
2. Everyone scores **against the pre-set scorecard**, independently, before discussing — so the rubric drives the verdict, not the loudest opinion or the first impression.
3. The CHRO assembles the scores into a single written recommendation: hire / no-hire, the evidence per competency, the proposed comp and employment structure, and any risks (including misclassification risk if PJ).
4. Output: a decision-ready recommendation package.

### Stage 5 — Offer

**Owner:** CHRO **R** (drafts, runs offer mechanics). CEO **A** (the hire is the CEO's accountable call within the opened req). **Bernard — final approver on the actual hire.** CFO **C** (final affordability check).

1. The CHRO brings the recommendation to the decision. Because **hiring a human is the one human gate**, the actual yes/no escalates to **Bernard for approval** — the CEO owns the req and the company-level call, but a person does not join Bevox without Bernard's sign-off. If comp is over the budget cap, that approval is explicit.
2. On approval, the CHRO drafts and extends the offer: comp (from band/level), start date, and the **employment structure — CLT or PJ — chosen deliberately and documented** (see below).
3. The CHRO runs negotiation within the pre-approved band. A push beyond the band re-opens the CEO decision (and Bernard, if it crosses the cap) — the band is not silently broken.
4. Output: a signed offer (offer-acceptance rate is a CHRO KPI — a low rate means the band, level, or pitch is mis-set), and the **employment contract** appropriate to the chosen structure, with candidate data handled per LGPD.

### Stage 6 — Onboarding

**Owner:** CHRO **R** (future delegate: Head of People). Hiring manager **C** (role-specific ramp).

1. At this stage **onboarding *is* the retention strategy** — there is no HR safety net, so the first 30/60/90 days are deliberate, not improvised. A bad onboarding of one person at a three-person company is a company-level risk.
2. Day-one essentials: signed contract on file, access provisioned within the org's structural safeguards (least privilege, no exposure to hardened files or the kill switch beyond what the role needs), and a named first-week owner (the hiring manager).
3. **30/60/90 plan:** explicit, written expectations and a clear definition of "productive in this role," with regular feedback from day one. The CHRO runs the small human performance loop — clear expectations, honest read on whether it's working — and surfaces any concern to Bernard *early* rather than late.
4. Output: a hire who is integrated and productive; ramp time (offer → productive) tracked as a secondary CHRO signal.

## CLT vs PJ — the Brazilian employment decision

Every Bevox hire is one of two structures, **chosen deliberately per role and documented** in the role brief and contract. This is a real, consequential legal choice, not a default.

- **CLT (registered employee).** Full Brazilian labor protections and meaningful encargos: FGTS, 13º salário, paid vacation + 1/3, INSS. Predictable and protective, but more expensive and more rigid. The right structure when the role is core, ongoing, full-time, and integrated into the company's day-to-day command — i.e. it *is* employment in substance.
- **PJ / contractor.** The person invoices Bevox as their own legal entity (CNPJ). Cheaper and more flexible, but carries real **misclassification (pejotização) risk**: treating a PJ like a de-facto employee — fixed hours, exclusivity, subordination, integration into the chain of command — can be re-characterized as a disguised CLT relationship and create labor liability. The CHRO does not use PJ to dodge encargos for what is structurally an employee.

The CHRO **owns this classification (A/R)**, chooses per role on the substance of the relationship (not on cost convenience), documents the rationale, and **escalates genuine legal exposure to Bernard**, who is accountable for accepting legal risk. Contracts and arrangements are recorded with this process doc.

## LGPD for candidate and employee data

Candidate CVs, interview notes, scorecards, salary data, and employee records are **personal data under LGPD**, governed exactly as customer data is. Through the whole pipeline the CHRO:

- keeps a clear **lawful basis** for processing candidate and employee data;
- **minimizes** what is collected and **retains** it only as long as its lawful purpose requires (rejected-candidate data is not hoarded);
- ensures people-data does not leak outside its lawful purpose, coordinating with the COO/CTO who own company-wide LGPD posture so people-data follows the same rules as customer data; and
- treats any people-data incident as an LGPD incident — escalated to Bernard as legal exposure.

## Escalation and the one human gate

Bevox runs on total agent autonomy bounded only by structural safeguards. Hiring carries the **single human approval gate** in the company:

- **Open a role:** CEO decides (Accountable). Bernard consulted if comp crosses the budget cap.
- **Hire a human:** **escalates to Bernard for final approval.** The CHRO recommends; the CEO owns the req; Bernard makes the call. No person joins without it.
- **Fire a human:** the CHRO runs the performance process and recommendation; **Bernard is Accountable for the decision to part with a human.** Concerns are surfaced early, not late.
- **Comp over the budget cap:** Bernard consulted/approves explicitly before the offer.
- **Genuine legal exposure** (unresolvable misclassification risk, a people-data LGPD incident): escalates to Bernard, who is accountable for accepting legal risk.

Everything else in this process the CHRO decides and executes autonomously, recording outcomes here or in the relevant `processes/` / `okrs/` doc.

---

*Grounding:* ownership and RACI from `raci-matrix.md` row 2 (Hiring) — CEO **A** for opening a role, CHRO **R** for running the process and **A** for the process itself, hiring-manager C-suite **C**, Bernard **C/I** plus the human gate; reporting lines and the planned Head of People delegate from `org-chart.md`; stage (post-PMF, 10–50 customers), the single-human operating principle, and the Brazilian context (CLT vs PJ, LGPD, agents-first) from `charter.md`. Process responsibilities, the CLT-vs-PJ and LGPD-for-people-data discipline, the agents-first default, onboarding-as-retention, the KPI set (time-to-hire, offer-acceptance, regrettable attrition, eNPS), and the hire/fire human-gate handoff are from `docs/agents/chro.md` (Core Responsibilities, Decision Authority, RACI Handoffs, and Brazilian Employment Context), seeded from the canonical CHRO role template at `references/corporate-roles/chro.md:37-43` (hiring handoff: CHRO recommends, CEO owns the capital call, Bernard is the final human approver).*
