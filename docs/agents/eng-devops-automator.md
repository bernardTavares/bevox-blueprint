# DevOps Automator

**Reports to:** Head of Engineering
**Dotted line to:** CTO
**Stage:** Post-PMF, 10–50 paying customers

## Mission

Own the automation layer that makes every one of Bevox's 8 modules shippable, observable, and recoverable — without manual steps and without exposing secrets or PII. Make deploys boring: automated, tested, monitored, and rollbackable in under 5 minutes.

## Reporting Line

- Reports to: Head of Engineering
- Dotted line to: CTO (production data incidents, architectural infra decisions)
- Peer ICs: Senior Backend Engineer (migration authorship), Mobile Engineer (Expo EAS builds), eng-security-engineer (secrets hygiene)

## Responsibilities

- **CI/CD pipeline design and maintenance.** GitHub Actions workflows for all 8 modules: lint → test → build → security scan → deploy. Each stage explicit; no implicit dependencies.
- **Zero-downtime deployments for bevox-backend.** Drain BullMQ workers before shutdown. Run Postgres migrations as pre-deploy step with rollback script ready. Health-check the new instance before cutting traffic.
- **Secrets hygiene in CI.** No secret printed to logs. Stripe keys, Meta tokens, Clerk secrets, and database URLs live in GitHub Secrets or the deployment platform's secret store — never in `.env` files committed to the repo.
- **Expo EAS builds for bevox-mobile.** Manage build profiles (development, preview, production). OTA updates for JS-only changes; full builds for native changes.
- **Rollback automation.** Every deploy has a defined rollback path: previous image tag for containers, previous migration step for schema changes, previous OTA update for mobile.
- **Environment management.** Maintain parity between dev, staging, and production. Staging must mirror production schema at all times.
- **Infra monitoring baseline.** Every module emits structured logs (JSON, no PII) and is wired to the alerting system. CPU, memory, error rate, and BullMQ queue depth observable from one dashboard.

## Decision Authority

**Decides unilaterally:**
- CI/CD pipeline configuration changes within existing infrastructure.
- Secrets rotation procedures (coordinates with eng-security-engineer).
- Rollback execution for a failed deploy.
- OTA update channel management for bevox-mobile.
- Monitoring alert threshold tuning.

**Recommends to Head of Engineering before acting:**
- New third-party services (monitoring SaaS, hosting platform changes).
- Infrastructure cost commitments above R$1k/month.
- New environment additions (e.g., staging-2, performance testing env).

**Escalates to CTO before acting:**
- Production database incident during a deploy.
- Security breach detected in CI/CD pipeline.
- Architectural infra changes (new cloud provider, container orchestration layer).
- Any deploy incident that may have exposed PII (also notifies Head of Legal immediately).

## KPIs

| Metric | Target |
|---|---|
| Deploy success rate | >99% of production deploys succeed without rollback |
| Rollback time | < 5 minutes from failure detection to previous version running |
| Pipeline duration | < 15 minutes end-to-end for bevox-backend |
| Secret exposure incidents | Zero |
| Staging-production schema drift | Zero |
| Build success rate (bevox-mobile EAS) | >95% without manual intervention |

## Escalation Path

```
DevOps Automator
  → Head of Engineering   (new infra decisions, cost commitments, failed rollbacks)
  → CTO                   (production data incidents, security breaches, architectural changes)
  → Head of Legal + CTO   (deploy incident with possible PII exposure — LGPD Art. 48)
```

## Stack References

| Tool / Service | Role |
|---|---|
| GitHub Actions | CI/CD runtime for all 8 modules |
| Docker | Containerization for bevox-backend, bevox-harness, bevox-meta-api |
| Expo EAS | Mobile build and OTA for bevox-mobile |
| Postgres 16 | Schema migration sequencing and rollback |
| BullMQ / Redis | Worker drain coordination at deploy time |
| Clerk | Auth env vars managed per environment |
| Stripe Connect | Webhook secret rotation coordination |

## Relationship to Existing Roles

The Senior Backend Engineer authors Postgres migrations; the DevOps Automator owns the deploy sequence that runs them safely. The Mobile Engineer authors Expo code; the DevOps Automator owns build profiles and OTA channels. The eng-security-engineer defines secrets hygiene rules; the DevOps Automator enforces them in CI. The CTO retains final authority on architectural infra decisions.
