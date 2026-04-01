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
```

All edits happen directly in `fsad-playbook.html`. The file is versioned internally (title tag) and tracked in `README.md`.

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
