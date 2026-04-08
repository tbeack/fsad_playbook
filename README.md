# FSAD Playbook — Full Stack Agentic Development

A comprehensive, interactive single-page guide that documents best practices for adopting Claude Code, Codex CLI, and agentic development workflows. Built as a shareable HTML artifact for engineering teams transitioning to AI-augmented development.

## What's Inside

- **FSAD Methodology** — spec-driven, agentic-first development where small cross-functional pods use markdown as a common language to direct teams of AI agents
- **Pod Compositions** — team structures and role definitions for different project types
- **Claude Best Practices** — getting started guides, project anatomy, CLAUDE.md configuration, integrations (MCP), code review agents, custom skills, cheat sheet, and power usage
- **Codex Best Practices** — equivalent coverage for OpenAI's Codex CLI: AGENTS.md setup, TOML-based MCP config, approval modes, sandbox security, multi-agent workflows, and more
- **KPIs to Measure Impact** — metrics framework for measuring FSAD adoption, productivity, and ROI
- **Interactive UI** — 5-page navigation, collapsible sections, searchable content, code blocks with copy buttons, dark/light/auto theme toggle

## Tech Stack

- HTML5 single-page application
- Inter + IBM Plex Mono fonts
- Custom CSS (dark/light/auto theme, purple/violet accent palette, CSS custom properties)
- Mermaid.js for flowcharts and diagrams
- Highlight.js for code syntax highlighting
- Vanilla JavaScript (no framework)

## Usage

Open the latest version directly in a browser:

```bash
open "fsad-playbook.html"
```

Or serve locally for development:

```bash
python -m http.server 8000
```

## Version

| Field | Value |
|-------|-------|
| **Current version** | v8 |
| **Date updated** | 2026-04-08 |
| **File** | `fsad-playbook.html` |

---

## Changes in This Version

### v8 — 2026-04-08

**Security Review sub-section (CBP-008)**
- Added new section 10.6 "Security Review" to the Claude Best Practices page, between Code Review Agent and Building Skills
- Introduces a reusable multi-agent security review team pattern: 6 specialists (auth/authz, input validation, secrets/crypto, dependency/supply chain, silent failures, data exposure) spawned in parallel, each writing findings to its own file, consolidated by a lead agent into a single report
- Full verbatim team prompt embedded as a copy-pasteable markdown code block with `<PATH>` and scope placeholders
- "How to Adapt" callout explains how to swap specialists for different stacks (static sites, IaC repos, etc.)
- Added corresponding sidebar nav entry

### v8 — 2026-03-31

**Light mode + auto theme detection (CBP-007)**
- Added full light mode theme with darker/more saturated purple accents for contrast on white backgrounds
- Auto-detects OS preference via `prefers-color-scheme` media query — no manual setup needed
- Theme toggle button (top-right) cycles Auto → Light → Dark with sun/moon/auto icons
- User preference persists in `localStorage` across sessions; auto mode follows OS changes
- Extracted ~70 hardcoded rgba/hex color values into named CSS variables for full theme support
- Light mode palette: white/light gray backgrounds, dark text, deeper purple (#5b3fd4) accents
- All 5 pages, search overlay, collapsibles, code blocks, tables, and pod explorer are themed

### v7 — 2026-03-16

**Codex Best Practices page (CBP-004)**
- Added "Codex Best Practices" as a standalone 4th page with 8 sections mirroring the Claude Best Practices structure
- Sections: Getting Started, Project Anatomy (AGENTS.md pillars, .rules guardrails, .agents/skills/), Integrations (MCP with TOML configs), Code Review (/review command), Building Skills (SKILL.md directory format), Guidelines (prompting, anti-patterns), Cheat Sheet (shortcuts, commands, flags, config reference, env vars), Power Usage (multi-agent, forking, sessions, CI/CD, multi-provider models, Codex Cloud)
- 10-row comparison table (Claude Code vs Codex CLI)
- "Running Both Tools" cross-tool callout for dual-tool teams

**KPIs to Measure Impact page**
- Moved KPIs section from Claude Best Practices into its own standalone 5th page
- 6 highest-priority metrics: token consumption, monthly epics/tickets, story points, PRs/commits, maintenance vs. new dev, $ spend by tool
- 3 additional metrics: AI tools WAU, lines of code produced, AI commits vs. acceptance rates

**Page rename: "Best Practices" → "Claude Best Practices"**
- Renamed across sidebar, hero title, footer, and JS pageTitles to scope it as Claude-specific
- All IDs and hash routes preserved for backward compatibility

**App now has 5 pages:** FSAD, Pod Compositions, Claude Best Practices, Codex Best Practices, KPIs to Measure Impact

**MCP integration overhaul (both Claude and Codex pages)**
- Added step-by-step setup guide for Claude's `/plugin` command (4 steps: open browser, install, OAuth, verify with `/mcp`)
- Added step-by-step setup guide for Codex's `codex mcp add` command (4 steps: add server, OAuth login, verify, manage)
- Each Codex integration now shows both CLI command (`codex mcp add`) and `config.toml` format
- Best-practice callouts: plugin vs. manual config (Claude), CLI vs. config file (Codex)
- Updated all 5 integrations to use current official configs:
  - **Jira**: Atlassian hosted endpoint (`mcp.atlassian.com/v1/mcp`) with OAuth plugin — replaces self-hosted `npx` with PAT
  - **Figma**: Figma hosted endpoint (`mcp.figma.com/mcp`) with OAuth plugin — replaces self-hosted `npx` with API token
  - **Notion**: Notion hosted endpoint (`mcp.notion.com/mcp`) with OAuth plugin — replaces self-hosted `npx` with API key
  - **Azure DevOps**: Microsoft's official `@azure-devops/mcp` package with browser OAuth — replaces community package with PAT
  - **Google**: Split into Google Cloud MCP (official hosted endpoints like `bigquery.googleapis.com/mcp` via `gcloud`) and Google Workspace MCP (community `taylorwilsdon/google_workspace_mcp` for Docs/Sheets/Drive) — replaces fake `@anthropic/mcp-server-google-docs` package

**UI polish**
- Standardized sidebar nav icons to use consistent filled diamond (`◆`) across all 5 page groups

**Sidebar scroll spy fix for Best Practices page (CBP-006)**
- Lowered IntersectionObserver threshold from `0.3` to `0.1` so long sections trigger reliably
- Added `reinitSectionObserver()` that unobserves all sections and re-observes only the active page's sections on every page switch
- Called from `switchPage()` after the page becomes visible, forcing the observer to recalculate intersection ratios

**Skill Creator step-by-step guide (CBP-003)**
- Added "Creating Skills with the Skill Creator" subsection to Building Skills section
- 5 step cards: run `/skill-creator`, describe the workflow, iterate on the draft, save and test, share with team
- Includes tip about feeding existing runbooks/wiki pages as input
- Project-level vs global skills cards for sharing guidance

**Example CLAUDE.md in Getting Started (CBP-002)**
- Added a collapsible "Example: A Production CLAUDE.md" block at the end of the Getting Started section (Best Practices page)
- Contains a real-world CLAUDE.md covering workflow orchestration (plan mode, subagent strategy, self-improvement loop, verification, elegance, autonomous bug fixing), task management, and core principles
- Uses existing collapsible pattern with syntax-highlighted markdown code block and copy button

### v6 — 2026-03-12

**UI overhaul — ClickUp Brain-inspired dark theme**
- Darkened backgrounds from navy-dark to near-black (`#08080c`, `#0f0f14`, `#111115`)
- Shifted accent palette from blue/cyan to purple/violet (`#7c5cfc`, `#a78bfa`)
- Swapped display and body fonts to Inter with bold 800-weight headings and tight letter-spacing
- Enlarged hero radial glow (900px purple gradient)
- Softened card borders to transparent white (`rgba(255,255,255,0.06)`), added purple glow on hover
- Darkened sidebar background (`#0b0b10`)
- Bumped border-radius from 12px/20px to 14px/22px
- Updated all hover/active states from blue to purple tints

**Collapsible dropdown fix**
- Fixed dropdown sections showing a preview of the first sentence when collapsed
- Added `overflow: hidden` on `.collapsible-body`
- Added `visibility: hidden`/`visible` toggle on `.collapsible-content` for clean open/close

**New section: Code Review Agent (10.5)**
- Added "Code Review Agent" section between Integrations and Building Skills
- Covers multi-agent architecture diagram (parallel detection, verification, ranking)
- 4-step setup guide (enable, install GitHub App, choose trigger, create REVIEW.md)
- Example REVIEW.md with always-check, style, and skip rules
- Severity marker reference table (red/yellow/purple)
- Alternative setups: GitHub Actions (self-hosted) and local custom subagents
- When-to-use guidance cards and pro tips
- Added corresponding sidebar nav item

**Fuchsia border styling on cards and code blocks**
- Applied hot fuchsia (`rgba(255,0,200,0.4)`) borders to all card types, code blocks, collapsible headers, step cards, role cards, meta boxes, timeline rows, proscons, framework cards, resource links, and workflow container
- Subtle fuchsia glow on rest (`box-shadow: 0 0 12px`), intensified on hover (`0.65` opacity, `24px` glow)
- Matches the ClickUp Brain card outline aesthetic from the reference image

**Sidebar flow-node navigation**
- Replaced plain text sub-items in the sidebar with blue-bordered flow node rectangles (`rgba(100,160,255,0.3)` border, `#0d0d14` fill, 10px border-radius)
- Added vertical connector lines with dot midpoints between each node via CSS pseudo-elements
- Active node gets brighter border + glow; connectors light up near active section
- Widened sidebar from 260px to 290px to accommodate node styling
- Removed the separate flow rail lane (160px column between sidebar and content) — navigation now lives entirely in the sidebar

**Navigation bug fix**
- Added `'code-review': 'practices'` to `sectionToPageMap` — fixed clicking "Code Review Agent" jumping to Overview instead of the correct section

### v5 (baseline)

- Initial version carried forward with paginated navigation, search overlay, progress bar, and collapsible sections
