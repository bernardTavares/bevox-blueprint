---
name: bevox-knowledge-read
description: Blueprint-local, read-only lookup into the canonical Bevox source of truth (the bevox-knowledge repo — PRDs, ADRs, architecture, roadmap, releases, specs). Use when an agent needs the authoritative answer about Bevox products, modules, architecture, decisions, or roadmap — including the current status/progress of each Bevox project (per-project roadmaps + the cross-project delivery-tracker + release notes) — and must ground its answer in canonical docs with citations instead of this blueprint's possibly-stale inline copies. NOT the canonical write-side skill — that is `bevox-knowledge-contribute` (writes drafts to the SoT). This skill never writes anything, and is not for general web research.
---

## Purpose

Give Bevox Blueprint agents a single, read-only way to answer questions from the
**canonical source of truth**: the `<org>/bevox-knowledge` repository. That repo
holds the accepted PRDs, ADRs, architecture, specs, roadmap, releases, feedback, and metrics
for the whole Bevox ecosystem (ADR-005 declares it the SoT; ADR-010 defines the canonical
folder layout).

The primary use in this blueprint is to **understand the current status and progress of each
Bevox project** — by reading the per-project roadmaps (`40_roadmap/<project>/`), the cross-project
**delivery tracker** (`40_roadmap/_shared/delivery-tracker.yml` — the SoT of epic/wave execution
status), and release notes (`50_releases/<project>/`) — rather than guessing from this blueprint's
inline copies.

This skill retrieves the relevant canonical document(s) for a query and returns an answer
**grounded only in what it read, with citations** (repo, path, ref). It never invents facts and
never claims canonical status for content it did not retrieve.

This skill is **read-only**. It never writes, commits, pushes, or merges anything in
`bevox-knowledge`. When this blueprint's inline docs disagree with the SoT, **the SoT wins**.

## Relationship to the canonical skills (read this first)

- **`bevox-knowledge-contribute`** is the *canonical, write-side* skill (defined in
  `bevox-knowledge/35_specs/_shared/2026-05-07-bevox-knowledge-contribute-skill-v1.md`,
  amended by ADR-014). It writes drafts to the SoT via `draft/*` branches and approval. It is the
  thing the Bevox canon means by "the bevox-knowledge skill".
- **This skill (`bevox-knowledge-read`)** is a *blueprint-local convenience* for the read side.
  The canon assigns dynamic read access to OpenClaw, not to a skill (the contribute spec lists
  "read-side" as out of scope). This blueprint repo is not OpenClaw and has no such reader, so this
  skill fills that gap **locally** — it is not a canonical artifact and must not be confused with
  `bevox-knowledge-contribute`.

## Access model (hybrid — local clone first, gh API fallback)

The SoT is read through whichever surface is canonical-fresh:

1. **Local clone (fast path).** If `clone_path` is a git repo, run a throttled
   `git -C <clone_path> fetch --quiet origin` (skip if `FETCH_HEAD` is younger than ~5 min).
   Then check `git -C <clone_path> rev-list --count HEAD..origin/main` (behind count) and
   `git -C <clone_path> status --porcelain` (dirty?). If the clone is not behind `origin/main`
   and clean, read from it (the native Read/Grep/Glob tools, or `git show`, `git grep`). Set
   `source: "local-clone"`, `freshness: "fresh"`.
2. **gh API (canonical fallback).** If there is no clone, the clone is **behind** origin, dirty,
   or the fetch failed, read canonical content over the GitHub API pinned to `main` instead:
   `gh api repos/<org>/bevox-knowledge/contents/<path>?ref=main -H "Accept: application/vnd.github.raw"`.
   Set `source: "gh-api"`. Mark `freshness: "stale-behind"` if a behind clone was the reason,
   else `"fresh"`.
3. If neither surface works (no clone **and** `gh` is unauthenticated / lacks access to the
   private repo), return the `knowledge-access-unavailable` error.

Never serve content from a clone known to be behind origin without saying so — drift is a bug.

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string (required) | — | The topic or question to answer from canonical knowledge. |
| `project` | string | *(none)* | Narrow to one canonical project subfolder. The set varies by folder and is still migrating — common values: `_shared`, `bevox-backend`, `bevox-console`, `bevox-direct`, `bevox-harness`, `bevox-meta-api`, `bevox-mobile`, `bevox-site`, `bevox-web`, `openclaw`, `company-os`, `mission-control`, `vox`, `bevox-knowledge`. Confirm by listing the target folder rather than assuming. |
| `doc_type` | string (enum) | *(none)* | Narrow to one artifact class: `inbox`, `prd`, `architecture`, `adr`, `spec`, `roadmap`, `release`, `feedback`, `metrics`. |
| `ref` | string | `main` | Git ref to read. `main` = accepted/canonical. A `draft/*` ref is allowed but its results are labeled non-canonical (`canonical: false`). |
| `clone_path` | string | `<home>\bevox-knowledge` | Local clone used for the fast path. Falls back to gh API if absent/stale. |
| `max_docs` | integer | `5` | Cap on the number of source documents read and cited. |

## Canonical layout (ADR-010)

Each canonical doc-type folder contains the per-project subfolders listed under `project` above.
`doc_type` maps to the numbered folder prefix:

| `doc_type` | Folder |
|---|---|
| `inbox` | `00_inbox/` |
| `prd` | `10_prd/` |
| `architecture` | `20_architecture/` |
| `adr` | `30_adr/` |
| `spec` | `35_specs/` |
| `roadmap` | `40_roadmap/` |
| `release` | `50_releases/` |
| `feedback` | `60_customer-feedback/` |
| `metrics` | `70_metrics/` |

Exceptions that stay flat (no per-project subfolders): `99_templates/`, `_retired/`. A reorg
(ADR-010, approved 2026-04-24) is migrating content into this layout in waves — **some files may
still be flat during the transition**, so always confirm a path by listing/searching rather than
assuming it, and prefer `git grep` / content search over hard-coded paths.

### Project status / progress (primary use)

To answer "how is project X doing / what's its current state?", read, in order:

1. **`40_roadmap/_shared/delivery-tracker.yml`** — the canonical execution-status SoT: epics
   (`E0`…`EN`) and their waves, with `wave.status` ∈ `delivered | in_progress | not_started |
   parked | blocked | partial`; epic status is **derived** from its waves. It also carries a
   `product_modules:` view of per-module delivery visibility.
2. **`40_roadmap/<project>/`** — the narrative roadmap for that project (current state, wave in
   progress, next waves, backlog, risks/blockers).
3. **`50_releases/<project>/`** — what actually shipped.

Report status from these canonical sources and cite them; never infer progress from this
blueprint's inline docs. (`delivery-tracker.yml` is YAML — parse it; the others are markdown.)

## Process

1. **Resolve the access surface** per the access model above; record `source` and `freshness`.
2. **Scope the search.** If `doc_type` is set, restrict to its folder prefix; if `project` is set,
   restrict to that subfolder. With neither, search across all canonical folders. Because the
   reorg may leave files flat, always include a repo-wide fallback search.
3. **Locate candidates.**
   - Local clone: `git -C <clone_path> grep -il "<terms>" <ref> -- <scope-globs>` (or the Grep
     tool over `clone_path`), ranking by folder relevance and title match.
   - gh API: list candidate folders with
     `gh api repos/<org>/bevox-knowledge/contents/<folder>?ref=<ref> --jq '.[].path'`,
     and/or `gh search code "<terms>" --repo <org>/bevox-knowledge` (note: code search
     indexing on private repos can lag; treat misses as inconclusive, not as absence).
4. **Read** the top `max_docs` most relevant documents (local read or raw gh fetch).
5. **Synthesize** an answer grounded **only** in the retrieved text. Cite every claim to a source
   (`repo path @ref`). Distinguish accepted (`main`) from proposal (`draft/*`) content. If nothing
   relevant is found, return empty `sources` with `no-canonical-match` — do **not** fabricate or
   fall back to this blueprint's inline docs as if they were canonical.
6. **Never mutate** the SoT. No `git add/commit/push/merge/rebase`, no `gh api` writes. Canonical
   writes are the job of `bevox-knowledge-contribute`, not this skill.

## Output

A single JSON object. `answer` is human-facing Portuguese (`você` register); the rest is structured
for programmatic consumers.

```json
{
  "answer": "bevox-direct é o ERP B2B de disparo de mensagens em massa para WhatsApp ...",
  "sources": [
    {
      "repo": "<org>/bevox-knowledge",
      "path": "20_architecture/bevox-direct/system-map/00-README.md",
      "ref": "main",
      "canonical": true,
      "excerpt": "bevox-direct — ERP B2B de disparo em massa via WhatsApp ..."
    }
  ],
  "meta": {
    "query": "o que é bevox-direct",
    "project": "bevox-direct",
    "doc_type": "architecture",
    "source": "gh-api",
    "freshness": "fresh",
    "evaluated_at": "2026-05-29T00:00:00Z"
  }
}
```

When nothing matches:

```json
{ "answer": "Não encontrei conteúdo canônico para essa consulta.", "sources": [], "meta": { "note": "no-canonical-match" } }
```

## Failure modes

| Condition | Behaviour |
|-----------|-----------|
| No usable clone **and** `gh` unauthenticated / no repo access | Return `{ "error": "knowledge-access-unavailable" }` |
| Local clone is **behind** `origin/main` | Fall back to gh API on `main`; set `meta.freshness: "stale-behind"` and add a `warnings[]` note |
| `git fetch` fails (offline) with a clone present | Read the clone but set `meta.freshness: "unknown"` and warn that results may be stale; recommend gh API |
| No document matches the query | `sources: []`, `meta.note: "no-canonical-match"`; never fabricate |
| `ref` is a `draft/*` branch | Proceed, but every source is `canonical: false` and the answer is labeled a proposal |

## Integration points

- **Any blueprint agent** (CTO, support-specialist, head-of-product, data-analyst, etc.) — invoke
  to ground an answer about Bevox products/modules/architecture/decisions in the SoT with
  citations, instead of trusting this blueprint's inline copies. Example: "o que é `bevox-direct`?"
  resolves from `20_architecture/bevox-direct/` rather than a possibly-stale module list.
- **CTO agent** — consult ADRs (`30_adr/`) and architecture (`20_architecture/`) before recording
  an ADR or answering "is this how the system actually works?".
- **`bevox-knowledge-contribute` (canonical, write-side)** — the complement of this skill: when a
  *write* to the SoT is needed (new PRD/ADR/spec), that is its job, not this one.

## Constraints

- **Read-only.** Only `gh api` GET calls and read-only git (`fetch`, `status`, `rev-list`, `grep`,
  `show`, `log`). Never `add`/`commit`/`push`/`merge`/`rebase`/`reset`, never `gh` writes.
- **Canonical by default.** Read `main` unless `ref` overrides it; always label `draft/*` results
  as non-canonical proposals.
- **SoT wins.** On any conflict between this blueprint's inline docs and `bevox-knowledge`, the
  answer follows `bevox-knowledge` and notes the discrepancy.
- **Auth dependency.** Requires `gh` authenticated with read access to the private
  `<org>/bevox-knowledge` repo (today: the `bevox-ai` account, `repo` scope).
- **No secrets/PII in output.** Per the compliance rule, never echo tokens, keys, or personal data
  that may appear in retrieved text; cite the location instead.
