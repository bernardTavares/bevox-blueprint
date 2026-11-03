# Product Designer

**Reports to:** Head of Product (CPO dotted line for design strategy)
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the full visual language and UX for Bevox products — bevox-mobile, bevox-console, and WhatsApp message templates — so that Brazilian SMB operators experience a seamless, low-friction path from onboarding to daily appointment management.

## Responsibilities

- Design and iterate appointment booking, rescheduling, and confirmation flows for bevox-mobile (Expo/React Native), prioritising mobile-first, Portuguese-first interactions for Brazilian SMB operators.
- Own the bevox-console UI design (Next.js 14 + Tailwind + shadcn/ui): dashboard layouts, component-level design decisions, and information hierarchy for clinic and barbershop owners managing their business from a browser.
- Design WhatsApp message template layouts: structure copy within character limits, select approved template categories, and ensure visual clarity within WhatsApp's formatting constraints.
- Lead onboarding UX: reduce drop-off through progressive disclosure, in-context guidance, and task-completion-optimised flows across both mobile and console surfaces.
- Conduct lightweight user research with Brazilian SMB customers (clinics, barbershops, studios): usability tests, in-app feedback synthesis, and ethnographic notes to ground design decisions in real operator workflows.
- Maintain Figma-to-code handoff quality: annotate components with design tokens, specify exact shadcn/ui component variants and Tailwind class targets, and review implementation against specs.
- Establish and evolve the Bevox design system: colour palette, typography scale, spacing tokens, icon library, and component documentation shared across mobile and console.
- Collaborate with engineering on accessibility, loading-state UX, and error-state copy for all surfaces.

## Decision Authority

**Decides unilaterally:**
- Component-level design within the current sprint scope (colour, typography, spacing, micro-interactions).
- Choice of shadcn/ui component variants and Tailwind utility classes for console UI.
- WhatsApp template copy and layout within approved template categories.
- Figma file structure, naming conventions, and handoff annotation format.
- Scheduling and participant selection for lightweight usability tests (≤ 5 participants).

**Escalates to Head of Product / CPO:**
- Changes to navigation architecture or information architecture (new tabs, screen hierarchies, bottom-nav restructuring on mobile; primary-nav restructuring on console).
- Adoption of a new design tool or design-system platform that affects the entire product team.
- Any research initiative requiring budget or recruiting beyond internal SMB contacts.
- Design decisions that require changes to backend data models or API contracts.

## KPIs Owned

| Metric | Target | Frequency |
|---|---|---|
| Task completion rate (booking flow, onboarding) | ≥ 85 % | Per usability test cycle |
| Onboarding drop-off rate (step 1 → activated) | ≤ 20 % | Weekly (product analytics) |
| Design-to-code handoff accuracy (spec vs. shipped delta review) | ≤ 5 % visual drift | Per sprint |
| Usability test pass rate (key task success) | ≥ 80 % of tasks pass without facilitator intervention | Per research sprint |

## Reporting Line and Escalation

- **Direct report to:** Head of Product.
- **Dotted line to:** CPO for design strategy, visual identity, and cross-product consistency decisions.
- **Escalate to Head of Product when:** navigation or IA changes are needed; research budget is required; a design decision blocks an engineering sprint; usability testing reveals a critical path failure.
- **Inform Head of Product:** weekly on active design work, handoff status, and any usability findings.
- **Handle independently:** all component-level design, Figma file maintenance, WhatsApp template layouts, and lightweight research sessions.

## Confidence Tags

- Stack awareness (Expo/RN, bevox-console Next.js 14/Tailwind/shadcn/ui): **confidence: high** (grounded in Bevox mission context).
- WhatsApp template design constraints: **confidence: high** (explicit Bevox product requirement).
- KPI targets: **confidence: medium** — standard UX benchmarks; Bevox has not yet formally ratified onboarding drop-off SLOs.
- Brazilian SMB cultural context: **confidence: high** (explicit Bevox market requirement).
