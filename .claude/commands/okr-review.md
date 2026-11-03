---
description: Trigger a structured OKR review — reads live OKRs, assesses progress, flags at-risk Key Results, and produces a board-ready executive summary.
argument-hint: (no arguments needed)
---

You are running the Bevox Blueprint `/okr-review` command. Follow every step below in order. Do not skip steps or use hardcoded data.

## Step 1 — Load OKR source

Read the file `okrs/q4-corporate.md`. Extract every Objective and its Key Results. For each KR capture:
- KR ID (e.g. KR1.1)
- KR name / description
- Owner (C-suite role)
- Baseline value
- Target value

## Step 2 — Load recent decisions for context

Read `.loop/decisions.md`. Extract the 10 most recent entries (by date). Use these to identify any recent events that may affect KR progress (pivots, blockers, wins, missed milestones).

## Step 3 — Assess each KR

For every KR, determine its current status using the information available (decisions log, any data files present, reasonable inference from the decisions context). Assign one of:
- **Green** — on track; current trajectory reaches target by end of quarter
- **Yellow** — at risk; trajectory is lagging or a blocker has emerged
- **Red** — off-track; significant gap exists and intervention is needed

If current data is unavailable for a KR, mark it **Unknown** and note what data is missing.

## Step 4 — Build the OKR Progress Table

Output a markdown table with columns: **Objective | Key Result | Target | Current | Status | Owner**

Use emoji indicators in the Status column:
- Green → ✅
- Yellow → 🟡
- Red → 🔴
- Unknown → ⚪

Example row:
| O1 — Healthy retention | KR1.1 Net-new logos | 20+ customers | ~12 baseline | 🟡 Yellow | CEO |

## Step 5 — Flag at-risk KRs with recommended actions

For each KR with status Yellow or Red, output a block:

```
### [KR ID] — [KR Name]
**Status:** [Red | Yellow]
**Owner:** [Role]
**Gap:** [1–2 sentences describing the gap between current trajectory and target]
**Recommended Actions:**
1. [Specific, actionable recommendation tied to Bevox's ICP/stage]
2. [Second recommendation if applicable]
3. [Third recommendation if applicable — omit if only 1–2 are warranted]
```

Keep recommendations concrete. Cite `charter.md` unit-economics anchors (NRR > 110 %, LTV:CAC > 3:1, CAC payback < 12 months, gross margin > 75 %) where relevant. Do not recommend discounting — list price holds per strategy.

## Step 6 — Executive Summary

Write a ≤500-word executive summary in plain, professional English. Structure:

1. **Quarter Health (2–3 sentences):** Overall signal — are we on track to hit the quarter's headline objectives?
2. **On-Track Highlights (2–4 bullets):** Top wins and KRs trending Green.
3. **At-Risk Items (2–4 bullets):** Top risks, each with the owning role and one-line recommended action.
4. **Closing Signal (1 sentence):** Either "On track to close Q4 as planned" or a clear escalation flag (e.g. "O2 acquisition motion requires CEO attention this week").

The summary must be suitable for async delivery to a board or investor — no internal jargon, no vanity metrics, no hedging without data.

---

Output all sections in order: Progress Table → At-Risk Blocks → Executive Summary. Use markdown headers to separate sections.
