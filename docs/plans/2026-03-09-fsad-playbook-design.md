# FSAD Playbook — Design Document

**Date:** 2026-03-09
**Status:** Approved
**Approach:** Clean Rewrite (Approach A)

## Overview

Complete rebuild of the Claude Best Practices app into the **FSAD (Full Stack Agentic Development) Playbook** — a single-page HTML app serving as a comprehensive guide for teams adopting spec-driven agentic development.

**Target audience:** Product managers, UX designers, software engineers, architects, DevOps engineers, CTOs, CPOs, and engineering/product leadership.

**Key change:** Remove all example management features (add/edit/delete/import/export). Simplify to a static, distributable single HTML file with 10 content sections covering the full FSAD methodology.

## Architecture

### File Structure

Single file: `fsad-playbook.html` (~100-150KB)

No build system. No `sections/`, `components/`, or `dist/` directories. Edit the HTML file directly.

### Tech Stack

| Technology | Purpose | Source |
|-----------|---------|--------|
| HTML5 | Structure | Inline |
| Tailwind CSS | Layout utilities | CDN |
| Custom CSS | Brand styling | Inline `<style>` |
| DM Serif Display | Heading font | Google Fonts CDN |
| IBM Plex Sans | Body font | Google Fonts CDN |
| IBM Plex Mono | Code font | Google Fonts CDN |
| Mermaid.js | Workflow diagrams | CDN |
| Highlight.js | Code syntax highlighting | CDN |
| Vanilla JavaScript | UI interactions | Inline `<script>` |

### JavaScript Features (~350-400 lines)

1. **Sidebar navigation** — scroll tracking with active section highlighting, click-to-scroll
2. **Collapsible sections** — toggle sub-sections with smooth animation (progressive disclosure)
3. **Copy button** — on code blocks, copies to clipboard with visual feedback
4. **Search/filter** — text search across all section content with result highlighting
5. **Dark/light toggle** — theme switcher (dark by default)
6. **Mobile hamburger** — toggle sidebar visibility on small screens
7. **Mermaid init** — initialize diagrams on page load with theme-appropriate config
8. **Highlight.js init** — syntax highlighting on code blocks

### Removed Features

- ExampleStorage (localStorage)
- Add/Edit/Delete example modals
- Import/Export functionality
- Search & filter for examples
- Category tabs and tag filters
- Success toasts
- All form handling

## Visual Design

### Theme: Dark (default) with Light Toggle

**Dark mode:**
- Background: deep dark gradient (`#0f0f1a` to `#1a1a2e`)
- Cards/surfaces: `#1e1e30` with subtle border
- Primary text: `#e8e6e3`
- Headings: white/near-white
- Accent: electric blue/teal for highlights, links, active states
- Code blocks: slightly darker than background with colored syntax

**Light mode:**
- Background: warm off-white
- Cards: white with subtle shadow
- Text: dark
- Same accent colors adjusted for contrast

### Typography

- **Headings:** DM Serif Display (serif, editorial feel)
- **Body:** IBM Plex Sans (clean, readable)
- **Code:** IBM Plex Mono (monospace)

### Layout

- Fixed sticky sidebar (left, ~250px) with all 10 sections
- Main content area scrolls vertically
- Sections separated by subtle dividers
- Collapsible sub-sections for progressive disclosure
- Responsive: sidebar collapses to hamburger menu on mobile

### UI Components

- **Info cards** — key concepts with icon + title + description
- **Code blocks** — dark theme with copy button and language label
- **Mermaid diagrams** — workflow/architecture visualizations
- **Callout boxes** — tips (blue border), warnings (amber), best practices (green)
- **Resource links** — styled external link cards with title + description
- **Step cards** — numbered steps for guides (Sections 3, 5, 6)
- **Framework cards** — for Section 10, showing name + description + link

## Content Architecture

### Section 1: FSAD Overview

**Source:** `fsad-guide.html` + Notion page
**Content:**
- What is Full Stack Agentic Development
- Three-Phase Agentic Workflow (Mermaid diagram):
  - Phase 1: Foundation (Context & Rules) — goals via PRDs, constraints, environment
  - Phase 2: Specification (Planning & Decomposition) — task decomposition, context management, tool mapping
  - Phase 3: Implementation & Evaluation — agentic execution, multi-agent coordination, human-in-the-loop
- Core Components: MCP, Versioned Prompts (.prompt.md), Monitoring

**External resources:**
- MCP video: https://www.youtube.com/watch?v=C3FZL7hXj0Y
- PRDs video: https://www.youtube.com/watch?v=goOZSXmrYQ4

### Section 2: Team Composition & Roles

**Source:** `fsad-pod-compositions.html` + Notion page
**Content:**
- Pod composition models
- Role definitions and responsibilities
- Team sizing guidance
- How roles interact with AI agents

### Section 3: How to Get Started

**Source:** Notion page
**Content:** Step-by-step guide:
1. Start in planning mode using existing Figma and PRDs as context
2. Create `spec.md` — iterate until comprehensive
3. Build `roadmap.md` — organize and track implementation
4. Build `state.md` — track current project state for session resumption
5. Break implementation into phases to manage context window
6. Create `architecture.md` — overall architecture and tech stack

### Section 4: Claude Setup ("Anatomy of a Claude Code Project")

**Source:** Notion page
**Content:** 5 structural pillars:
1. **CLAUDE.md = Repo Memory** — purpose (WHY), repo map (WHAT), rules + commands (HOW). Keep it short.
2. **.claude/skills/ = Reusable Expert Modes** — code review, refactor playbook, release procedure, debugging flow
3. **.claude/hooks/ = Guardrails** — formatter after edits, tests on core changes, block unsafe directories. "Models forget. Hooks don't."
4. **docs/ = Progressive Context** — architecture, ADRs, runbooks. Don't bloat prompts.
5. **Local CLAUDE.md for risky modules** — `src/auth/CLAUDE.md`, `src/persistence/CLAUDE.md`, `infra/CLAUDE.md`

Key insight: "Prompting is temporary. Structure is permanent."

### Section 5: Integrations

**Source:** Notion headers + new step-by-step content
**Content:** Setup guides for:
- JIRA MCP
- Figma MCP
- Notion MCP
- Azure DevOps (ADO) MCP
- Google Docs MCP

Each guide: what it does, installation, configuration, example usage.

### Section 6: Building Your Own Skills

**Source:** Notion headers + new step-by-step content
**Content:**
- What are skills and why build custom ones
- Skill file structure and anatomy
- Example skills:
  - JIRA/ADO/Confluence/Notion integration skills
  - Project documentation skill
  - Epic to Story documentation skill
  - Story Point Estimation skill
  - Updating Stories skill

### Section 7: Best Practices & Guidelines

**Source:** Notion page + relevant content from current app sections
**Content:**
- Background context matters — business context, not just technical specs
- Holistic approach beyond engineering-only specifications
- Including design systems, problems to be solved
- Common pitfalls and how to avoid them
- Prompting guidelines for effective Claude usage

### Section 8: Claude Cheat Sheet

**Source:** Recreated from Claude Cheat Sheet.jpeg as interactive HTML
**Content:**
- Keyboard shortcuts table
- Essential commands reference
- Quick tips and tricks
- Searchable, interactive format

### Section 9: Claude Power Usage

**Source:** Notion page
**Content:**
- **Agent Teams** — link to https://code.claude.com/docs/en/agent-teams
- **Work Trees** — parallel isolated workspaces
- **Model Auto Selection** — choosing the right model
- **Hooks** — context window monitoring
- **Claude Session Logs** — reviewing past sessions
- **/insights** — local HTML report analyzing 30-day coding sessions, workflow friction, prompting feedback
- **/loop** — built-in scheduler for recurring tasks (e.g., `/loop 30m check if tests pass`)
- Scheduled tasks link: https://claudefa.st/blog/guide/development/scheduled-tasks

### Section 10: Open Source Frameworks

**Source:** Research + Notion embeds
**Content:** Framework cards for community meta-frameworks:
1. **SuperClaude Framework** — meta-programming config, 30+ commands, cognitive personas
2. **Claude Forge** — "oh-my-zsh for Claude Code", 11 agents, 40 commands, 15 skills, 15 hooks
3. **Ruflo** — agent orchestration, multi-agent swarms, enterprise architecture
4. **Agents (wshobson)** — 112 agents, 16 orchestrators, 146 skills, 79 tools
5. **Claudekit** — CLI toolkit, checkpointing, code quality hooks, 20+ subagents
6. **Claude Code Hooks Mastery** — reference implementation for hooks, meta-agent pattern
7. **Awesome Claude Code** — curated directory of the entire ecosystem

*Note: These are best-guess matches for the 7 Notion embeds. Confirm against the Notion page.*

## Content Sources

| Source | Used In |
|--------|---------|
| `fsad-guide.html` (52KB) | Section 1 foundation |
| `fsad-pod-compositions.html` (53KB) | Section 2 foundation |
| Notion "FSAD Playbook" page | Sections 1-10 structure and content |
| Current app sections 1-9 | Section 7 (selective), Section 8 (cheat sheet data) |
| Claude Cheat Sheet.jpeg | Section 8 (recreated as HTML) |
| Web research | Section 10 (framework details) |

## Success Criteria

1. Single HTML file opens in any browser with no server required
2. All 10 sections have complete, substantive content
3. Dark/light theme toggle works
4. Search finds content across all sections
5. Sidebar navigation tracks scroll position
6. All Mermaid diagrams render correctly
7. Code blocks have syntax highlighting and copy buttons
8. Responsive on mobile (sidebar becomes hamburger menu)
9. File size under 200KB
10. No JavaScript errors in console
