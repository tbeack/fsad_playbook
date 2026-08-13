# CLAUDE.md

## Project Overview

FSAD Playbook — a single-file interactive HTML guide documenting Full Stack Agentic Development best practices. Shared with engineering teams to accelerate Claude Code and Codex CLI adoption.

## Tech Stack

- **HTML5** — Single-file application (`fsad-playbook.html`)
- **Custom CSS** — Dark/light theme with purple/violet accent palette, Inter + IBM Plex Mono fonts
- **CSS Variables** — Full theming via `:root` custom properties with `prefers-color-scheme` auto-detection
- **Mermaid.js** — Flowcharts and diagrams
- **Highlight.js** — Code syntax highlighting
- **Vanilla JavaScript** — Navigation, search, collapsibles, scroll spy, theme toggle (no framework)

## Project Structure

```
/fsad_playbook
├── fsad-playbook.html        # Current version (v8, single self-contained file)
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

The app has **5 pages** toggled via `display: none/block`:
- **FSAD** (`page-fsad`) — Methodology overview, workflow, comparisons
- **Pod Compositions** (`page-pods`) — Team structures, pod explorer, anti-patterns
- **Claude Best Practices** (`page-practices`) — Getting started, project anatomy, integrations, skills, guidelines, cheat sheet
- **Codex Best Practices** (`page-codex`) — Equivalent coverage for OpenAI's Codex CLI
- **KPIs to Measure Impact** (`page-kpis`) — Metrics framework for measuring FSAD adoption

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
# Open the current version
open "fsad-playbook.html"

# Build the self-contained dist artifact (inlines fonts + playgrounds)
python3 scripts/build-dist.py
```

All edits happen directly in `fsad-playbook.html`. The file is versioned internally (title tag) and tracked in `README.md`.

### Build + Commit requirement

**Always run the build script before committing.** This applies to every `/fsd:ship` and `/fsd:do-task` run:

1. Make all edits to `fsad-playbook.html` (and any other source files).
2. Run `python3 scripts/build-dist.py` — this writes `dist/fsad-playbook.html`.
3. Stage **both** the source and `dist/` in the same commit: `git add fsad-playbook.html dist/`.
4. Commit and push as normal.

`dist/fsad-playbook.html` is the fully self-contained build artifact (fonts and playgrounds inlined). It must always be in sync with the source and included in every release commit.

### Version bump checklist

When cutting a new version, update **all three** of these locations in `fsad-playbook.html` — they must always agree:

1. **`<title>` tag** (line ~6) — `FSAD — Full Stack Agentic Development (vX.XX.X)`
2. **Sidebar brand badge** (search for `sidebar-brand`) — `· vX.XX.X` inside the `<a>` tag
3. **In-app changelog modal** (search for `changelogModal`) — add a new `<section>` block above the previous latest version, matching the format:
   ```html
   <section>
     <h3>vX.XX.X <span class="changelog-date">· YYYY-MM-DD</span></h3>
     <p><strong>Summary sentence.</strong> Detail sentences.</p>
   </section>
   ```

Grep to verify all three are in sync before committing:
```bash
grep -n 'sidebar-brand\|<title>' fsad-playbook.html | grep -v "^[0-9]*:.*<!--"
```

## Auto-Update Workflow (`/cbp-update`)

The `/cbp-update` skill (`~/.claude/skills/cbp-update`) spawns the `playbook-updater` agent, which opens **and merges** its own PR at the end of Phase 7 (`gh pr merge --merge --delete-branch`) with no human review step in between. This is expected, approved behavior for this repo — do not flag it as a security concern or propose gating it behind manual approval unless explicitly asked to change it.

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
