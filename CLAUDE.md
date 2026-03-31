# CLAUDE.md

## Project Overview

FSAD Playbook — a single-file interactive HTML guide documenting Full Stack Agentic Development best practices. Shared with engineering teams to accelerate Claude Code adoption.

## Tech Stack

- **HTML5** — Single-file application (`fsad-playbook - v6.html`)
- **Custom CSS** — Dark theme, purple/violet accent palette, Inter + IBM Plex Mono fonts
- **Mermaid.js** — Flowcharts and diagrams
- **Highlight.js** — Code syntax highlighting
- **Vanilla JavaScript** — Navigation, search, collapsibles, scroll spy (no framework)

## Project Structure

```
/claude_best_practices
├── fsad-playbook - v6.html   # Current version (single self-contained file)
├── fsad-playbook - v5.html   # Previous version (backup)
├── CLAUDE.md                 # This file
├── todo.md                   # Task tracking with CBP-### identifiers
├── task-cbp-###.md           # Detailed plans for specific tasks
├── feedback.md               # Stakeholder feedback (JZ, etc.)
├── example_claude.md         # Example CLAUDE.md for embedding in the app
├── README.md                 # Project readme
├── dist/bundle.html          # Legacy bundled output
├── sections/                 # Legacy modular sections (not actively used)
├── components/               # Legacy header, nav, footer (not actively used)
├── css/styles.css            # Legacy shared styles
└── js/app.js                 # Legacy shared JS
```

## App Architecture (v6)

The app has **3 pages** toggled via `display: none/block`:
- **FSAD** (`page-fsad`) — Methodology overview, workflow, comparisons
- **Pod Compositions** (`page-pods`) — Team structures, pod explorer, anti-patterns
- **Best Practices** (`page-practices`) — Getting started, project anatomy, integrations, skills, guidelines, cheat sheet

Key JS systems:
- **Router** — Hash-based (`#page/section`), `switchPage()` handles page transitions
- **Scroll Spy** — `IntersectionObserver` (`sectionObserver`) updates sidebar + indicator pills
- **Search** — Full-text search overlay with keyboard navigation
- **Collapsibles** — CSS grid animation with `visibility` toggle

## Task Management

All tasks live in `todo.md` with unique identifiers (`CBP-001`, `CBP-002`, etc.).
Detailed plans go in separate `task-cbp-###.md` files linked from `todo.md`.

When picking up a task:
1. Read `todo.md` to identify the next open item
2. Read its `task-cbp-###.md` plan if one exists
3. Implement following the plan
4. Mark complete in `todo.md`
5. Update `README.md` with what changed

## Development Workflow

```bash
# Open the current version
open "fsad-playbook - v6.html"
```

All edits happen directly in `fsad-playbook - v6.html`. When making a new version:
1. Copy current file to `fsad-playbook - v7.html` (or next version)
2. Make changes in the new file
3. Update `README.md` version table

## Research → Plan → Implement

**Never jump straight to coding.** Always:
1. **Research** — Explore the file, understand existing patterns and styles
2. **Plan** — Write a task plan (`task-cbp-###.md`) and verify with the user
3. **Implement** — Execute the plan, then verify in browser

## Working Together

- Clarity over cleverness — the simple solution is usually correct
- Match existing patterns — check how similar UI elements are already built before adding new ones
- When stuck: stop, step back, simplify, ask
- Ask clarifying questions if unclear on a concept or requirement
