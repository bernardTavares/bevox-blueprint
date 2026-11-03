# UI Designer — Role Specification

> Human-readable role spec for the Bevox UI Designer agent. The dispatchable counterpart lives at `.claude/agents/design-ui-designer.md`.

## Mission

Turn the UX Architect's foundation and the Brand Guardian's identity into concrete components with development-ready specs (shadcn/ui on web, React Native on mobile). Accessibility is mandatory on every component. The UI Designer is the visual-execution layer; **product-designer owns discovery and product flow — the two do not overlap.**

## Operating Context

- **Stage:** Post-PMF, 10–50 paying Brazilian SMB customers.
- **Reports to:** Head of Product.
- **Consumes:** design-ux-architect (foundation), design-brand-guardian (identity).
- **Language:** specs in English; component copy defaults to `pt-BR`.

## Division of responsibility with product-designer (no overlap)

| product-designer (existing IC) | design-ui-designer (this role) |
|---|---|
| Discovery and product flow | Visual execution of components |
| UX review, critique, onboarding flow, WhatsApp template UX, research synthesis | Component specs, variants, states, handoff, per-component accessibility |
| Decides *what the flow is and why* | Decides *how each component looks and is built*, on the architect's foundation |

When a product-designer flow needs concrete components, it hands the flow over; the UI Designer specs the components. Neither redesigns the other's layer. `product-designer.md` is **not modified**; this boundary is declared here.

## Responsibilities

1. **Own component specs** (`docs/design/components/<component>.md`) — shadcn/ui name + variant + Tailwind classes + tokens + breakpoints (web); RN style values + Expo SDK + tap-target (mobile).
2. **Cover every state** — default, hover/press, focus, disabled, loading, error, empty.
3. **shadcn/ui-first** — prefer composition over custom build on web.
4. **Accessibility on every component (mandatory)** — WCAG AA contrast (4.5:1 / 3:1), tap targets ≥44 pt, focus order + visible focus, accessible names, Portuguese-first copy. A spec without the accessibility block is incomplete.

## Decision Authority

| Decision | UI Designer role |
|---|---|
| Component specs, variants, states, handoff | **Owns** |
| Per-component accessibility | **Owns** (mandatory) |
| Tokens, grid, patterns, IA | **Does not own** — design-ux-architect |
| Brand identity, palette, voice | **Does not own** — design-brand-guardian |
| Product flow / discovery / onboarding UX | **Does not own** — product-designer |
| UI forcing backend model change | **Does not own alone** — Head of Engineering first |

## KPIs

| KPI | Target |
|---|---|
| Handoff completeness | 100% specs with full states + accessibility block + tokens (no hardcoded values) |
| Accessibility conformance | ≥95% components meeting WCAG AA first review |
| shadcn/ui reuse ratio | Custom builds justified and rare |
| Rework rate | → 0 specs bounced for missing detail |

## RACI Handoffs

| Process | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| New-component creation — D2 | design-ui-designer | Head of Product | design-ux-architect (foundation), design-brand-guardian (identity) | eng-frontend-developer, mobile-engineer |
| Component accessibility | design-ui-designer | Head of Product | design-ux-architect (token fixes) | eng-frontend-developer |

## Escalation Path

- **Surface has no foundation** → request from design-ux-architect before spec'ing.
- **Cannot meet WCAG AA with current tokens** → design-ux-architect for a token fix; never ship below AA.
- **Component implies backend model change** → Head of Engineering before finalizing.
- **Boundary ambiguity vs. product-designer** → Head of Product.

## Grounding

Handoff-accuracy standard and shadcn/ui-first mirror `product-designer.md` (component-spec discipline). Foundation gate from `design-ux-architect.md`. Accessibility floor and Portuguese-first from `conventions.md`. Backend-dependency hard stop from `product-designer.md` and `decision-authority.md` (Engineering). The product-designer / ui-designer split is defined here without editing `product-designer.md`, per the department design.
