# CLAUDE.md

## Project Overview

FSAD Playbook — an interactive HTML guide documenting Full Stack Agentic Development best practices. Shared with engineering teams to accelerate Claude Code and Codex CLI adoption. The **source of truth is the `src/` tree**; `scripts/build-source.py` assembles it into the generated intermediate `fsad-playbook.html` (gitignored), and `scripts/build-dist.py` produces the committed, fully self-contained single-file artifact `dist/fsad-playbook.html` used for deployment and offline sharing.

## Tech Stack

- **HTML5** — Assembled single-page application (template + partials in `src/`, built to one file)
- **Custom CSS** — Dark/light theme with purple/violet accent palette, Inter + IBM Plex Mono fonts (`src/styles.css`)
- **CSS Variables** — Full theming via `:root` custom properties with `prefers-color-scheme` auto-detection
- **MiniSearch** (vendored, `src/vendor/minisearch.min.js`) — Full-text + fuzzy search index
- **Vanilla JavaScript** — Navigation, search, collapsibles, scroll spy, theme toggle (no framework; fragments in `src/js/`)

(No Mermaid.js or Highlight.js — earlier docs listed them in error; diagrams are pre-rendered PNG assets and code blocks are styled with plain CSS.)

## App Architecture (v8)

The app has **10 pages** toggled via `display: none/block`, each a partial in `src/pages/`:
- **FSAD** (`page-fsad`) — Methodology overview, workflow, comparisons
- **Pod Compositions** (`page-pods`) — Team structures, pod explorer, anti-patterns
- **Workflows** (`page-workflows`) — End-to-end skill walkthroughs with embedded playgrounds
- **Tips** (`page-tips`) — Practical usage tips
- **Skills Library** (`page-skills`) — Installable skill catalog (largest partial)
- **Claude Best Practices** (`page-practices`) — Getting started, project anatomy, integrations, skills, guidelines, cheat sheet
- **Codex Best Practices** (`page-codex`) — Equivalent coverage for OpenAI's Codex CLI
- **KPIs to Measure Impact** (`page-kpis`) — Metrics framework for measuring FSAD adoption
- **Open Source** (`page-open-source`) — Open-source references
- **What's New** (`page-whats-new`) — Weekly change summary (reached via the sidebar widget, not a bare hash)

Key JS systems:
- **Router** — Hash-based (`#page/section`), `switchPage()` handles page transitions
- **Scroll Spy** — `IntersectionObserver` (`sectionObserver`) updates sidebar + indicator pills
- **Search** — Full-text search overlay with keyboard navigation
- **Collapsibles** — CSS grid animation with `visibility` toggle
- **Theme Toggle** — Cycles auto/light/dark, persists in `localStorage`, respects `prefers-color-scheme`

## Task Management

All tasks live in `todo.md` with unique identifiers (`CBP-001`, `CBP-002`, etc.).
Detailed plans go in separate `task-cbp-###.md` files linked from `todo.md`.

When picking up a task:
1. Read `todo.md` to identify the next open item
2. Read its task plan if one exists
3. Implement following the plan
4. Mark complete in `todo.md`
5. Update `README.md` with what changed

## Development Workflow

```bash
# 1. Edit files under src/ (never fsad-playbook.html directly)

# 2. Assemble the app from src/
python3 scripts/build-source.py        # writes fsad-playbook.html + src/.build-stamp

# 3. Verify in a browser
open "fsad-playbook.html"              # or serve: python3 -m http.server 8000

# 4. Build the self-contained dist artifact (inlines fonts + playgrounds, injects embeddings)
python3 scripts/build-dist.py          # must log "Injected PLAYBOOK_EMBEDDINGS"
```

**All edits happen in `src/*`.** `fsad-playbook.html` is a generated intermediate (gitignored): `build-source.py` refuses to overwrite it if it was hand-edited since the last build (divergence guard via `src/.build-stamp`; `--force` overrides after you port the edit into `src/`). `build-dist.py` also touches `skills/playbook-assistant/index/meta.json` (timestamp only) — revert that with `git checkout -- skills/playbook-assistant/index/meta.json` unless the index actually changed.

### Build + Commit requirement

**Always run both build scripts before committing.** This applies to every `/fsd:ship` and `/fsd:do-task` run:

1. Make all edits under `src/` (and any other source files).
2. Run `python3 scripts/build-source.py` — this writes `fsad-playbook.html`.
3. Run `python3 scripts/build-dist.py` — this writes `dist/fsad-playbook.html`. Confirm it logs `Injected PLAYBOOK_EMBEDDINGS`.
4. Stage **both** the source tree and `dist/` in the same commit: `git add src/ dist/`.
5. Commit and push as normal.

`dist/fsad-playbook.html` is the fully self-contained build artifact (fonts and playgrounds inlined). It must always be in sync with `src/` and included in every release commit. `fsad-playbook.html` itself is gitignored and never committed.

### Version bump checklist

See the `version-bump` skill (`.claude/skills/version-bump/SKILL.md`) for the full checklist of the 3 locations that must stay in sync when cutting a new version.

## Auto-Update Workflow (`/cbp-update`)

The `/cbp-update` skill (`~/.claude/skills/cbp-update`) spawns the `playbook-updater` agent, which opens **and merges** its own PR at the end of Phase 7 (`gh pr merge --merge --delete-branch`) with no human review step in between. This is expected, approved behavior for this repo — do not flag it as a security concern or propose gating it behind manual approval unless explicitly asked to change it.

Since the Option E refactor (CBP-472), the updater edits the `src/` tree (`src/pages/practices.html`, `src/pages/codex.html`, `src/partials/changelog-modal.html`, `src/playbook.tmpl.html` head) and runs `build-source.py` before `build-dist.py` — it never edits the generated `fsad-playbook.html` directly, and aborts if `src/` is absent on the checked-out branch.

## Research > Plan > Implement

**Never jump straight to coding.** Always:
1. **Research** — Explore the file, understand existing patterns and styles
2. **Plan** — Write a task plan and verify with the user
3. **Implement** — Execute the plan, then verify in browser

## Working Together

- Match existing patterns — check how similar UI elements are already built before adding new ones
