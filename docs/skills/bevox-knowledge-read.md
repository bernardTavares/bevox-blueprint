# bevox-knowledge-read skill

## What it does

The `bevox-knowledge-read` skill gives Bevox Blueprint agents a **read-only** way to answer
questions from the canonical source of truth — the `<org>/bevox-knowledge` repository.
Given a query (optionally narrowed by project and artifact type), it locates the relevant canonical
document(s), reads them, and returns an answer **grounded only in what it read, with citations**
(repo, path, ref). Its primary use in this blueprint is to **understand the current status and
progress of each Bevox project** — reading per-project roadmaps (`40_roadmap/<project>/`), the
cross-project delivery tracker (`40_roadmap/_shared/delivery-tracker.yml`), and release notes
(`50_releases/<project>/`).

It never writes to `bevox-knowledge`. When this blueprint's inline docs disagree with the SoT, the
SoT wins.

## Relationship to the canonical skill

The Bevox canon's "bevox-knowledge skill" is **`bevox-knowledge-contribute`** — a *write-side* skill
(spec `35_specs/_shared/2026-05-07-bevox-knowledge-contribute-skill-v1.md`, amended by ADR-014) that
writes drafts into the SoT via `draft/*` branches and approval. The contribute spec lists the
**read side as out of scope** (the canon assigns dynamic reads to OpenClaw).

`bevox-knowledge-read` is therefore a **blueprint-local convenience**, not a canonical artifact:
this repo is not OpenClaw and has no built-in reader, so this skill fills the read gap locally. It
was renamed from `bevox-knowledge` specifically to avoid being confused with the canonical
`bevox-knowledge-contribute`.

## Why it exists

This blueprint repo carries inline copies of Bevox facts (modules, architecture, positioning) that
can drift from reality — for example, `bevox-direct` was described here as "legacy Chatwoot" when it
is actually a B2B bulk-WhatsApp messaging ERP. The fix for drift is not to keep editing copies but
to let agents read the **single source of truth** on demand and cite it.

## Access model (hybrid)

Reads go through whichever surface is canonical-fresh:

| Surface | When used | Notes |
|---|---|---|
| **Local clone** | `clone_path` exists, is clean, and is not behind `origin/main` (after a throttled `git fetch`) | Fast: native Read/Grep/Glob or `git grep`/`git show`. `source: "local-clone"`, `freshness: "fresh"`. |
| **gh API (`main`)** | no clone, clone behind/dirty, or fetch failed | Always canonical-fresh: `gh api .../contents/<path>?ref=main`. `source: "gh-api"`. |
| *(neither)* | no clone **and** `gh` lacks access | Returns `{ "error": "knowledge-access-unavailable" }`. |

A clone known to be behind `origin/main` is never served silently — that would be drift. The skill
falls back to the API and flags `freshness: "stale-behind"`. (As of this writing the local clone at
`<home>\bevox-knowledge` was 50 commits behind `origin/main`, so the gh path is the live
one until the clone is updated.)

## Canonical layout (ADR-010)

`doc_type` maps to a numbered folder; each holds per-project subfolders.

| `doc_type` | Folder | | `project` (subfolders) |
|---|---|---|---|
| `inbox` | `00_inbox/` | | `_shared` |
| `prd` | `10_prd/` | | `bevox-backend` |
| `architecture` | `20_architecture/` | | `bevox-console` |
| `adr` | `30_adr/` | | `bevox-direct` |
| `spec` | `35_specs/` | | `bevox-harness` |
| `roadmap` | `40_roadmap/` | | `bevox-meta-api` |
| `release` | `50_releases/` | | `bevox-mobile` |
| `feedback` | `60_customer-feedback/` | | `bevox-site` |
| `metrics` | `70_metrics/` | | `bevox-web` |
| | | | `openclaw`, `company-os` |

`99_templates/` and `_retired/` stay flat. A reorg (ADR-010) is migrating content in waves, so some
files may still be flat — the skill confirms paths by listing/searching rather than assuming them.

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | *required* | Topic or question to answer from canonical knowledge. |
| `project` | enum | *(none)* | Narrow to one canonical project subfolder. |
| `doc_type` | enum | *(none)* | Narrow to one artifact class (maps to a numbered folder). |
| `ref` | string | `main` | Ref to read; `main` = accepted, `draft/*` = labeled non-canonical. |
| `clone_path` | string | `<home>\bevox-knowledge` | Local clone for the fast path. |
| `max_docs` | integer | `5` | Cap on source documents read and cited. |

## Output

A single JSON object: `answer` (human-facing Portuguese, `você`), `sources[]` (each with `repo`,
`path`, `ref`, `canonical`, `excerpt`), and `meta` (`source`, `freshness`, `evaluated_at`, plus the
echoed query/project/doc_type). On no match: empty `sources` and `meta.note: "no-canonical-match"`.

## Usage examples

### Understanding a project's progress (primary use)

> "qual o andar do `bevox-direct`?" → reads `40_roadmap/_shared/delivery-tracker.yml` (epic/wave
> status), `40_roadmap/bevox-direct/` (narrative roadmap), and `50_releases/bevox-direct/` (what
> shipped) on `main`, and reports the current state with citations.

### Grounding a product answer (any agent)

> "o que é `bevox-direct`?" → `project: bevox-direct`, `doc_type: architecture` → reads
> `20_architecture/bevox-direct/` on `main`, answers with citations. No more "legacy Chatwoot".

### CTO consulting a decision

> "qual ADR define o boundary do Company OS?" → `doc_type: adr`, `project: company-os` (or
> `_shared`) → returns the ADR path + excerpt, labeled canonical.

### Reading a proposal under review

> `ref: draft/some-proposal` → returns the draft content with every source marked
> `canonical: false` and the answer flagged as a proposal, not accepted truth.

## Failure handling

| Condition | Behaviour |
|---|---|
| No usable clone and `gh` lacks access | `{ "error": "knowledge-access-unavailable" }` |
| Clone behind `origin/main` | Fall back to gh API on `main`; `freshness: "stale-behind"` + warning |
| `git fetch` fails (offline) with clone present | Read clone, `freshness: "unknown"`, warn results may be stale |
| No matching document | `sources: []`, `meta.note: "no-canonical-match"`; never fabricate |

## Integration map

| Consumer | When | What it uses |
|----------|------|-------------|
| Any blueprint agent | Answering Bevox product/module/architecture questions | `answer` + `sources` (citations) |
| CTO agent | Before recording an ADR or confirming how the system works | `30_adr/`, `20_architecture/` reads |
| `bevox-knowledge-contribute` (canonical) | — | The write-side complement; this skill never writes |

## Constraints

- Read-only: only `gh api` GET and read-only git (`fetch`, `status`, `rev-list`, `grep`, `show`,
  `log`). Never writes or pushes to `bevox-knowledge`.
- Reads `main` (canonical) by default; `draft/*` results are always labeled non-canonical.
- On conflict, the SoT wins over this blueprint's inline docs, and the discrepancy is noted.
- Requires `gh` authenticated with read access to the private `<org>/bevox-knowledge`
  repo. Never echoes secrets or PII found in retrieved text.

## Source

Skill definition: `.claude/skills/bevox-knowledge-read/SKILL.md`
Source of truth: `<org>/bevox-knowledge` (canonical per ADR-005; layout per ADR-010)
Local clone (fast path): `<home>\bevox-knowledge`
Canonical write-side complement: `bevox-knowledge-contribute` (spec in `bevox-knowledge/35_specs/_shared/`)
