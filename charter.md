# BEVOX — Company Charter

## Mission

Bevox exists to make the appointment economy in Brazil radically simpler. We give small service businesses — physiotherapy clinics, pilates studios, sports facilities, aesthetics and wellness professionals — a single operating system that transforms how they book, communicate, and get paid. Our AI secretary learns each business's rules and becomes progressively autonomous, so professionals spend time with clients, not on admin.

## Vision

A world where every independent professional in Brazil runs their business through a single conversation: the client books, confirms, pays, and reschedules without a human receptionist. Bevox is the infrastructure that makes that possible.

## Values

**Total autonomy, bounded by structure.**
Agents execute everything end-to-end. The only limits are the safeguards we choose to keep — kill switches (HALTED.md), spend caps, hardened-file deny rules — not human gatekeeping on every step.

**Stage-honest speed.**
We are post-PMF with 10–50 paying customers. We make decisions at that scale — scrappy, metric-driven, no enterprise bloat. We do not build for 1,000 customers today.

**Client-first simplicity.**
Every interface — mobile, WhatsApp, Instagram — should require zero onboarding from the end client. If they need instructions, we have failed.

**Brazilian context, not translated software.**
Pix is the primary payment rail. WhatsApp is the primary channel. LGPD is the regulatory constraint. Portuguese is the first language. We are not a US SaaS product with a Portuguese flag stuck on it.

**Measurable trust.**
NRR, activation rate, churn, and CAC payback period are not vanity metrics — they are the company's vital signs. Every role owns at least one.

## Positioning

### We are NOT a generic chatbot
Generic chatbots answer questions. Bevox closes the full service cycle: it books the appointment, sends the reminder, handles the reschedule request, charges the card, and follows up after the session. The AI does the work; the chatbot just talks.

### We are NOT clinic software
Clinic management platforms (Ninsaúde, iClinic, Doctoralia) assume a trained receptionist sits between the software and the client. Bevox replaces that receptionist — the AI secretary IS the operator. There is no thick desktop UI to learn. The business owner manages their operation through the same conversational interface the client uses.

### We ARE an operating system for appointment-based businesses
Bevox unifies three previously separate tools — scheduling, messaging (WhatsApp + Instagram), and payments (Stripe Connect, Pix + card) — into one programmable flow. The AI secretary is the single agent that orchestrates all three on behalf of the business.

## Ideal Customer Profile (ICP)

**Segment:** Brazilian SMBs with 1–10 professionals whose revenue depends on booked time slots.

**Verticals (initial):** physiotherapy, pilates, sports studios, aesthetics, wellness, independent professionals (personal trainers, nutritionists, psychologists).

**Channel behavior:** heavy WhatsApp + Instagram users; clients expect to book via DM or link, not a web form.

**Decision-maker:** the owner-manager who is also often a practitioner. Low tolerance for software complexity; high tolerance for automation that works invisibly.

### Four Personas

| Persona | Relation to Bevox |
|---|---|
| **Owner / Manager** | Configures the AI secretary; reviews dashboards; receives daily revenue + booking reports |
| **Attending Professional** | Sees their schedule in the mobile app; receives confirmation of bookings and payments without touching the booking flow |
| **Human Operator / Receptionist** | (If present) handles exceptions escalated by the AI; transitions out of routine tasks as autonomy increases |
| **AI Secretary** | The primary operator: holds the booking rules, runs the confirmation + payment flow, handles rescheduling, triggers follow-up sequences |

## Business Model

**Per-professional SaaS subscription**
Monthly recurring fee charged per active professional seat. Price anchored to the value of one fully booked day (the secretary pays for itself if it fills one extra slot per week).

**PSP transaction fee via Stripe Connect**
Bevox operates as a platform on Stripe Connect (Express subaccounts). For each payment processed — Pix or card — Bevox charges a small fee on top of Stripe's network cost. The fee split is automatic: funds route to the business's Connect Express subaccount and Bevox's platform account simultaneously at settlement.

**Unit economics target (post-PMF)**
- CAC payback: ≤ 3 months
- Net Revenue Retention (NRR): ≥ 110% at 12 months (expansion via seat add + payment volume growth)
- Gross margin: ≥ 70% (SaaS subscription component; blended lower due to PSP pass-through)

**Brazilian payment rails**
Pix (instant, zero-cost to client) is the primary rail for consumer-facing payments. Card (credit, via Stripe) is secondary. Both settle to Stripe Connect Express subaccounts. LGPD governs all data handling; no personal data leaves Brazilian jurisdiction without explicit consent.

## Operating Principle

BEVOX is operated by a single human, Bernard Tavares. Every department and role is a Claude Code agent with full autonomy to execute its mandate end-to-end. Bernard delegates; agents execute. The template's structural safeguards (HALTED.md kill switch, budget caps, hardened-file deny rules, Stop.sh template-remote whitelist) are the only operational limits. There are no human approval gates on routine execution.
