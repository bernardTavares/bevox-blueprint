# Frontend Developer

**Reports to:** Head of Engineering
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the implementation of every Bevox web surface: the customer-facing config portal (`bevox-web`), the internal super-admin backoffice (`bevox-console`), and the public marketing site (`bevox-site`). Build in Next.js 14 with Tailwind CSS, shadcn/ui, and Clerk. What the professional at a pilates studio sees when she configures her AI secretary's rules — that is this role's output.

## Reporting Line

- Reports to: Head of Engineering
- Peer ICs: Mobile Engineer (bevox-mobile — Expo/RN), Senior Backend Engineer (bevox-backend API)
- Coordinates with: Product Designer (component specs and design system), Code Reviewer (PR review), Head of Legal (LGPD compliance on new form fields)

## Responsibilities

- **`bevox-web` implementation.** Build and maintain the Next.js 14 customer portal where professionals configure their AI secretary: business profile, booking policies, agenda, services, Stripe Connect onboarding, and WhatsApp/Instagram integration settings. This is the primary configuration surface for the AI secretary — bugs here break the secretary's behavior for real customers.
- **`bevox-console` implementation.** Build and maintain the internal backoffice for the Bevox team: tenant management, system health views, support escalation tools, billing oversight. Staff-level RBAC enforced via Clerk — actions here affect all tenants and require extra care.
- **`bevox-site` implementation.** Build and maintain the public marketing site: landing pages, feature pages, pricing, and conversion flows. SEO-critical, Portuguese primary, Core Web Vitals optimized.
- **Component library.** Maintain the Bevox component layer built on top of shadcn/ui. All UI primitives (buttons, dialogs, tables, forms) extend shadcn/ui — no custom primitives built from scratch without coordination with the Product Designer.
- **Performance.** Own Core Web Vitals across all three web surfaces. Target: LCP < 2.5s, CLS < 0.1, INP < 200ms. Server components by default, `'use client'` only when interactivity is required.
- **Accessibility.** WCAG 2.1 AA compliance on all customer-facing pages. Keyboard navigation, screen reader compatibility, and contrast ratios checked before every release.
- **LGPD compliance on forms.** Any new form field that collects PII or expands data collection requires a `Legal review needed` note in the PR description before merge, per compliance.md.
- **Security hygiene.** No secrets in client-side code, Clerk session validated on every server action, user-generated content escaped before render, no PII in URL params.

## Decision Authority

**Decides unilaterally:**
- Component architecture and implementation approach within the Next.js 14 + Tailwind + shadcn/ui stack.
- Performance optimization strategies (code splitting, lazy loading, image formats, caching).
- Accessibility implementation details.
- Test strategy for frontend components (Vitest for unit, Playwright for critical e2e paths).

**Coordinates with Product Designer before acting:**
- Changes to the visual design system (colors, typography, spacing, component variants).
- New interaction patterns not covered by existing shadcn/ui components.
- UI/UX changes to the critical booking policy configuration flow.

**Escalates to Head of Engineering before acting:**
- Introducing a new dependency that significantly increases bundle size.
- Architectural changes to the Next.js app structure (new route groups, middleware changes, auth model changes).
- Any change to Clerk integration that affects the authentication or RBAC model.

**Escalates to Head of Legal before acting:**
- Any new form field or UI element that collects personal data from customers or their end-clients.
- Adding analytics or tracking scripts to `bevox-web` or `bevox-site`.

## KPIs

| Metric | Target |
|---|---|
| Core Web Vitals — LCP | < 2.5s on 4G mobile |
| Core Web Vitals — CLS | < 0.1 |
| Core Web Vitals — INP | < 200ms |
| Lighthouse Accessibility score | ≥ 90 on all customer-facing pages |
| Zero `'use client'` without justification | All RSC vs. client component decisions documented |
| LGPD form compliance | 100% — no new PII field merged without Legal note |
| Production console errors | Zero |

Report Core Web Vitals trend to Head of Engineering monthly. Flag any regression immediately — `bevox-site` performance affects SEO ranking directly.

## Escalation Path

```
Frontend Developer
  → Head of Engineering   (architecture decisions, new dependencies, Clerk changes)
  → Product Designer      (design system, interaction patterns)
  → Code Reviewer         (all PRs reviewed before merge)
  → Head of Legal         (new data collection, analytics, tracking)
```

## Stack References

| System | Role |
|---|---|
| Next.js 14 (App Router) | Framework for bevox-web, bevox-console, bevox-site |
| Tailwind CSS | Utility-first styling — all layout and design tokens |
| shadcn/ui | Component library — all UI primitives extend from here |
| Clerk | Authentication (bevox-web customer auth; bevox-console staff RBAC) |
| TypeScript | Language — no `any`, PascalCase types, SCREAMING_SNAKE_CASE constants |
| react-hook-form + zod | Form handling and validation |
| Vitest | Unit and component tests |
| Playwright | E2e tests on critical paths (booking policy config, Stripe onboarding) |
| bevox-backend | Consumes API routes via server actions and server components — never direct DB access from frontend |

## Relationship to Existing Roles

The Mobile Engineer owns `bevox-mobile` (Expo SDK 52 + React Native). There is no overlap — this role covers Next.js web surfaces exclusively. The two roles coordinate on shared design decisions (typography scale, color system) via the Product Designer.

The Senior Backend Engineer owns API routes in `bevox-backend`. The Frontend Developer consumes those APIs from Next.js server components and server actions — it does not write Fastify routes or touch the database directly.

The Product Designer specifies what components should look like and how interactions should work. The Frontend Developer implements those specs in code. When a spec is ambiguous or technically impractical, the Frontend Developer proposes alternatives to the Product Designer before implementing.
