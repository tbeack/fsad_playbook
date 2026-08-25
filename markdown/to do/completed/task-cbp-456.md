# CBP-456 — Playbook assistant skill (research + recommended approach)

## Source

`markdown/to do/todo.md` — Theo's own backlog entry, no external stakeholder request.

## Summary

Explore how to ship a "playbook assistant" as an installable Claude Code skill: something a team drops into their repo (via the existing `fsd:` plugin) that answers "how do I …" questions by drawing only on the content already inside `fsad-playbook.html`, with citations back to the source section. Deliverable is both a written recommendation (the research the todo item asks for) and a working first-cut skill implementing it.

## Assessment

`fsad-playbook.html` is a single 30 MB self-contained file (16,640 lines — the size comes mostly from inlined fonts, per `scripts/build-dist.py`). It already has real infrastructure worth reusing rather than re-inventing:

- **`scripts/build-embeddings.py`** (stdlib-only Python, `fsad-playbook.html:15488` documents it in-app) parses the HTML and extracts one chunk per `<section id="…">` and per `.collapsible` inside it: `{id, sectionId, title, label, text}`, text capped at 2000 chars. Running it today against the current file produces **281 chunks / 281 KB** (`dist/embeddings.json`), ~60K tokens of raw text total — small enough to ship, too large to dump whole into one prompt every time.
- That JSON is injected into the dist build as `PLAYBOOK_EMBEDDINGS` and consumed client-side by `buildSearchIndex()` / `semanticSearch()` (`fsad-playbook.html:16047-16169`) — a MiniSearch keyword layer plus a Transformers.js (`Xenova/all-MiniLM-L6-v2`) embedding layer that runs *in the browser*. Neither is reusable as-is for a Claude Code skill: the output format is one giant minified single-line JSON (bad for `Grep`/`Read`-based retrieval), and the embedding model is loaded via a browser `import()` from a CDN, not something a skill's static instructions can invoke.
- `sectionToPageMap` (`fsad-playbook.html:15756`) maps every `sectionId` to its top-level page (`fsad`/`pods`/`practices`/`codex`/`kpis`/…) — needed to build a real in-app anchor (`#{page}/{sectionId}`) for citations.
- The repo already has a working distribution mechanism for exactly this kind of thing: `skills/` (the `fsd:` plugin namespace), each with a `SKILL.md` a consumer repo gets by installing the plugin (see `skills/do-task/SKILL.md`, `skills/ac/SKILL.md` for the existing pattern/frontmatter style). A new skill fits there with no new distribution mechanism needed.
- No RAG/vector-DB/network dependency is warranted: the "assistant" is Claude itself reasoning over playbook text it's handed, not a separate retrieval model — the existing semantic-search JS layer solves a different problem (matching in a dumb browser with no LLM available) and isn't the pattern to copy for an agentic skill.

**Location:** new skill at `skills/playbook-assistant/`; new index-generation script alongside `scripts/build-embeddings.py`; recommendation doc under `markdown/design/` (per this repo's directory convention for design/spec docs).

## Plan

1. **Extend the index pipeline.** Add `scripts/build-assistant-index.py`, importing `extract_chunks()` from `scripts/build-embeddings.py` (no duplicated parsing logic). For each chunk, resolve its `page` by parsing the `sectionToPageMap` object literal out of `fsad-playbook.html` (regex + manual key/value split — it's JS object syntax, not JSON, so `json.loads` won't work directly). Emit `skills/playbook-assistant/index/playbook-index.jsonl` — **one JSON object per line** (`sectionId`, `title`, `label`, `page`, `anchor` = `#{page}/{sectionId}`, `text`), not the single-line minified array the browser build uses — so Claude's `Grep` tool can match individual chunks instead of the whole file being one match. Also emit `skills/playbook-assistant/index/meta.json` with `{playbook_version, generated_at, chunk_count}` (version read from the `<title>` tag) so the skill can flag a stale index if it ever ships out of sync with a locally-present `fsad-playbook.html`.
2. **Write `skills/playbook-assistant/SKILL.md`.** Frontmatter matching sibling skills (`description`, `argument-hint: <question>`). Instructions for Claude: take the user's question → `Grep` `index/playbook-index.jsonl` for keyword variants (retry with synonyms/broader terms if the first pass finds nothing) → read the 1–3 best-matching lines → answer **only** from that text, citing each source as its `title` plus `anchor` (e.g. "see *Hooks Deep Dive* — `#practices/hooks-deep-dive`") and telling the user to open that anchor in their local `fsad-playbook.html`/`dist/fsad-playbook.html`. If nothing matches, say so explicitly and suggest the nearest topic instead of guessing — never answer from general Claude Code knowledge as if it were playbook content.
3. **Wire regeneration into the existing build step.** Update `scripts/build-dist.py` to also invoke `scripts/build-assistant-index.py` alongside its existing `build-embeddings.py` call, so the skill's index is regenerated every time the mandatory pre-commit build (`python3 scripts/build-dist.py`, per this repo's `CLAUDE.md`) runs — it can never silently drift from the shipped playbook content.
4. **Generate the index once now** against the current `fsad-playbook.html` (v3.2.45) and commit it under `skills/playbook-assistant/index/`.
5. **Update `README.md`**'s "Skills (`fsd:` plugin namespace)" list with a one-line entry for the new skill, matching the existing list format.
6. **Validate manually** by invoking the skill (or walking its instructions by hand) against at least two realistic questions spanning different pages, e.g. "how do I set up hooks for a security review" and "what pod size is recommended for a 3-person team" — confirm each answer cites the correct section(s) and contains no fabricated content.
7. **Write the recommendation doc** at `markdown/design/playbook-assistant-plan.md`: problem statement, alternatives considered (client-side embeddings/RAG reuse vs. full-file grep vs. build-time chunk index — and why the chunk-index approach won), the chosen architecture (index format + SKILL.md answering procedure), the distribution mechanism (`fsd:` plugin, no new install path needed), and the maintenance plan (regeneration tied into `build-dist.py`). This doc is the "research the most effective approach" deliverable the todo entry asks for; the skill itself is the prototype proving it out.
8. No version bump: this adds a new skill and a doc, it does not change `fsad-playbook.html`'s content, so the version-bump checklist (title tag / sidebar badge / changelog modal) doesn't apply.

## Acceptance Criteria

All criteria verified 2026-08-25

- [x] `markdown/design/playbook-assistant-plan.md` exists and covers: problem statement, alternatives considered, recommended architecture, distribution mechanism, and maintenance/staleness plan
- [x] `skills/playbook-assistant/SKILL.md` exists, follows the `fsd:` plugin frontmatter/style conventions used by sibling skills (e.g. `skills/ac/SKILL.md`)
- [x] `scripts/build-assistant-index.py` exists, reuses `extract_chunks()` from `scripts/build-embeddings.py` rather than re-parsing the HTML independently, and produces `skills/playbook-assistant/index/playbook-index.jsonl` (one JSON object per line) plus `index/meta.json`
- [x] The committed `playbook-index.jsonl` is regenerated against the current `fsad-playbook.html` (not stale from an earlier draft)
- [x] `scripts/build-dist.py` also invokes the new index script, and running `python3 scripts/build-dist.py` still succeeds end-to-end
- [x] Manually exercising the skill against at least 2 distinct "how do I" questions returns answers that cite the correct section(s) by title + anchor, with no content not traceable to the index
- [x] `README.md`'s `fsd:` plugin skills list includes the new skill

## Implementation Notes

Deliverable scope decided with Theo up front (2026-08-25): doc + working prototype, not doc-only and not a playbook content section. See AskUserQuestion answer in session transcript.
