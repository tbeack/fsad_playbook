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

## Project Structure

```
/fsad_playbook
├── src/                      # SOURCE OF TRUTH — edit here
│   ├── playbook.tmpl.html    # Document scaffolding (head, sidebar, overlays) + @include/@asset directives
│   ├── styles.css            # All CSS
│   ├── pages/                # One partial per top-level page div (10 pages)
│   ├── partials/             # changelog-modal.html
│   ├── js/                   # App JS fragments (order fixed by the template)
│   ├── vendor/               # minisearch.min.js (verbatim)
│   ├── assets/               # Decoded PNG diagram assets (dark/light pairs)
│   └── .build-stamp          # Divergence guard written by build-source.py
├── scripts/
│   ├── build-source.py       # src/* → fsad-playbook.html (byte-exact assembly)
│   └── build-dist.py         # fsad-playbook.html → dist/fsad-playbook.html (never modify)
├── fsad-playbook.html        # GENERATED intermediate (gitignored — do not edit directly)
├── dist/fsad-playbook.html   # Committed self-contained artifact (deploy + offline sharing)
├── CLAUDE.md                 # This file
├── README.md                 # Project readme with version history
├── .gitignore                # Git config
├── LICENSE                   # Project license
├── todo.md                   # Task tracking with CBP-### identifiers
├── feedback.md               # Stakeholder feedback (JZ, etc.)
├── example_claude.md         # Example CLAUDE.md embedded in the app
├── delete.md                 # Cleanup tracking (gitignored)
├── skills/                   # Installable Claude Code skills (fsd: plugin namespace)
├── markdown/                 # Local reference docs (gitignored)
│   ├── design/               # Design plans, UX reviews, specs
│   ├── research/             # Research notes
│   └── to do/                # Completed task plans
├── .claude/                  # Claude Code config (gitignored)
├── .planning/                # GSD planning state (gitignored)
├── .remember/                # Session memory (gitignored)
└── .worktrees/               # Git worktrees (gitignored)
```

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

When cutting a new version, update **all three** of these locations in `src/` — they must always agree:

1. **`<title>` tag** — `src/playbook.tmpl.html` head (line ~6) — `FSAD — Full Stack Agentic Development (vX.XX.X)`
2. **Sidebar brand badge** — `src/playbook.tmpl.html` shell (search for `sidebar-brand`, line ~25) — `· vX.XX.X` inside the `<a>` tag
3. **In-app changelog modal** — `src/partials/changelog-modal.html` — add a new `<section>` block above the previous latest version. For a multi-task auto-update run, follow the intro `<p>` with a `<ul>` — one `<li>` per CBP task, description sourced from that task's own `## Summary` section — so the "What's new this week" widget can render one card per task instead of falling back to a single bundle card:
   ```html
   <section>
     <h3>vX.XX.X <span class="changelog-date">· YYYY-MM-DD</span></h3>
     <p><strong>Summary sentence.</strong> Detail sentences.</p>
     <ul>
       <li><strong>CBP-### — [Claude|Codex] Short title.</strong> 1–2 sentence description, sourced from the task file's Summary.</li>
       <li><strong>CBP-### — [Claude|Codex] Short title.</strong> 1–2 sentence description, sourced from the task file's Summary.</li>
     </ul>
   </section>
   ```
   A single-task version (no bundle) may keep just the intro `<p>` with no `<ul>`.

Grep to verify the two template locations are in sync before committing (then eyeball the newest `<h3>` in `src/partials/changelog-modal.html`):
```bash
grep -n 'sidebar-brand\|<title>' src/playbook.tmpl.html | grep -v "^[0-9]*:.*<!--"
```

## Auto-Update Workflow (`/cbp-update`)

The `/cbp-update` skill (`~/.claude/skills/cbp-update`) spawns the `playbook-updater` agent, which opens **and merges** its own PR at the end of Phase 7 (`gh pr merge --merge --delete-branch`) with no human review step in between. This is expected, approved behavior for this repo — do not flag it as a security concern or propose gating it behind manual approval unless explicitly asked to change it.

Since the Option E refactor (CBP-472), the updater edits the `src/` tree (`src/pages/practices.html`, `src/pages/codex.html`, `src/partials/changelog-modal.html`, `src/playbook.tmpl.html` head) and runs `build-source.py` before `build-dist.py` — it never edits the generated `fsad-playbook.html` directly, and aborts if `src/` is absent on the checked-out branch.

## Research > Plan > Implement

**Never jump straight to coding.** Always:
1. **Research** — Explore the file, understand existing patterns and styles
2. **Plan** — Write a task plan and verify with the user
3. **Implement** — Execute the plan, then verify in browser

## Working Together

- Clarity over cleverness — the simple solution is usually correct
- Match existing patterns — check how similar UI elements are already built before adding new ones
- When stuck: stop, step back, simplify, ask
- Ask clarifying questions if unclear on a concept or requirement
