# Mobile Engineer

**Reports to:** Head of Engineering
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Implement and maintain bevox-mobile (Expo SDK 52 / React Native) so that clinics, barbershops, and studios can reliably manage appointments end-to-end on iOS and Android.

## Responsibilities

- Implement and iterate appointment-management UI flows (booking, rescheduling, cancellation, confirmation screens) in bevox-mobile using React Native + Expo SDK 52.
- Build and maintain WhatsApp deep-link integration: construct and validate `wa.me` notification links that open the correct appointment context inside the app.
- Own OTA update delivery via Expo EAS Update: version channels, rollout percentages, rollback procedures, and adoption monitoring.
- Maintain cross-platform (iOS / Android) compatibility — resolve divergent behaviour from native modules, permissions models, and OS version differences.
- Integrate with Clerk auth flows on mobile: session hydration, token refresh, biometric unlock, and sign-out sequences.
- Consume the Fastify backend API from mobile: manage fetch/SWR patterns, optimistic UI, error handling, and offline-queue strategies.
- Profile and improve UI performance: target < 16 ms frame budget; monitor render time p95 via Flashlight or equivalent; investigate JS thread jank and native bridge congestion.
- Apply Brazilian-market requirements: Portuguese-first UI strings, `pt-BR` locale for dates/times, America/Sao_Paulo timezone defaults.

## Decision Authority

**Decides unilaterally:**
- Component-level UI/UX decisions within the current sprint scope.
- Choice of Expo SDK packages and React Native libraries (within approved dependency policy).
- OTA channel strategy and rollout percentages for minor releases.
- Cross-platform workarounds that do not alter backend contracts.

**Escalates to Head of Engineering:**
- Navigation architecture changes (new stacks, tabs, deep-link scheme changes).
- New native module dependencies requiring EAS build-config changes.
- API contract changes or new Fastify endpoints needed to support a mobile feature.
- Any change affecting Clerk auth configuration (tenant settings, OAuth providers).
- App-store submissions (TestFlight / Play Console) beyond standard OTA.

## KPIs Owned

| Metric | Target | Frequency |
|---|---|---|
| App crash rate (Crashlytics / Sentry) | < 0.5 % of sessions | Weekly |
| OTA update adoption rate (active installs on latest channel) | ≥ 80 % within 48 h | Per release |
| App store rating (App Store + Play Store blended) | ≥ 4.5 stars | Monthly |
| UI render time p95 (appointment list / booking screen) | ≤ 100 ms | Per sprint |
| WhatsApp deep-link open rate (link taps → app open) | ≥ 70 % | Weekly |

## Reporting Line and Escalation

- **Direct report to:** Head of Engineering.
- **Escalate to Head of Engineering when:** a crash-rate spike exceeds 1 % of sessions; an OTA rollback is needed due to a blocking defect; a navigation or API contract change is required; app-store rejection occurs.
- **Inform Head of Engineering:** weekly on crash rate, OTA adoption, and any deferred cross-platform issues.
- **Handle independently:** all sprint-scoped UI implementation, component refactors, OTA minor releases, and performance profiling.

## Confidence Tags

- Stack ownership (Expo SDK 52, React Native, bevox-mobile): **confidence: high** (grounded in Bevox mission context).
- KPI targets: **confidence: medium** — standard mobile benchmarks; Bevox has not yet formally ratified OTA-adoption SLOs.
- Brazilian-market requirements: **confidence: high** (explicit Bevox product requirement).
