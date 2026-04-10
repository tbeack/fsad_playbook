## Changes in This Version

### v12 — 2026-04-10

**Claude Monitoring section (CBP-022)**
- Added new section 15 "Claude Monitoring" to Claude Best Practices page, between Power Usage and Open Source Frameworks
- Covers OpenTelemetry-based monitoring for tracking usage, costs, and tool activity across organizations
- **Quick Start** — copy-paste environment variable setup for enabling OTel export (OTLP, Prometheus, console)
- **Available Metrics** — reference table of all 8 exported metrics: cost, tokens, sessions, active time, LOC, commits, PRs, tool decisions
- **Events & Logs** — 5 structured event types (user_prompt, tool_result, api_request, api_error, tool_decision) with opt-in detail levels
- **Enterprise Configuration** — managed settings via MDM, multi-team segmentation with OTEL_RESOURCE_ATTRIBUTES, dynamic auth header scripts
- **Distributed Traces (Beta)** — setup guide with TRACEPARENT propagation and backend recommendations
- **Recommended Backends** — comparison table for metrics (Prometheus, Datadog), logs (Elasticsearch, Loki), and traces (Jaeger, Tempo)
- **Privacy & Security** — opt-in controls, redaction defaults, and content logging toggles
- **ROI Measurement Guide** — callout linking to Anthropic's official monitoring starter kit (github.com/anthropics/claude-code-monitoring-guide)
- Open Source Frameworks renumbered from section 15 to section 16
- Added sidebar nav entry and sectionToPageMap wiring for "monitoring"

### v11 — 2026-04-10

**Auto-update for Claude Code v2.1.98 (CBP-017 through CBP-021)**

**Monitor Tool collapsible in Power Usage (CBP-017)**
- Added new "Monitor Tool — Background Script Streaming" collapsible to Power Usage section (section 14)
- Explains `Monitor` as a built-in tool that streams stdout from background scripts started with `Bash(run_in_background: true)`
- Includes a practical example and three use-case bullets (CI pipelines, dev servers, pairing with Ctrl+B)

**`/agents` command added to Cheat Sheet (CBP-018)**
- Added `/agents` to the "Automation & agents" slash commands table in the Cheat Sheet
- Description reflects the new tabbed UI: Running tab (live subagents) + Library tab (browse/run agents)

**`--exclude-dynamic-system-prompt-sections` flag in Cheat Sheet (CBP-019)**
- Added new flag to the "Print / programmatic mode" CLI flags table
- Strips dynamic prompt sections to enable cross-user prompt cache sharing in scripted/CI workflows

**Subprocess Sandboxing collapsible in Power Usage (CBP-020)**
- Added new "Subprocess Sandboxing" collapsible to Power Usage section
- Documents `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` (PID namespace isolation on Linux) and `CLAUDE_CODE_SCRIPT_CAPS=N` (per-session script invocation limit)
- Includes a use-case callout for CI/CD and shared environments

**Vertex AI / Bedrock setup wizard callout in Integrations (CBP-021)**
- Added a tip callout at the top of the Integrations section (section 10)
- Notes the interactive login-screen wizard for configuring Amazon Bedrock and Google Vertex AI as model providers
- Guides users to "3rd-party platform" option in the Claude login screen

### v10 — 2026-04-09

**Building Skills overhaul (CBP-016)**
- Rewrote the Building Skills section (section 11) to reflect the current directory-based skills system
- Updated all file paths from flat `skill-name.md` to directory format `skill-name/SKILL.md`
- Rewrote Skill File Anatomy with side-by-side directory structure and comprehensive frontmatter example
- Added collapsible Frontmatter Reference table covering all 12+ fields (`argument-hint`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort`, `context`, `agent`, `hooks`, `paths`)
- Added third skill level card: Plugin Skills with namespace explanation and priority order
- Added Skill Invocation sub-section with 3 cards (Manual, Automatic, Programmatic) and auto-invocation tip
- Added Advanced Skill Patterns collapsible (shell injection, context fork, tool pre-approval, extended thinking, supporting files)
- Added Skills vs Commands vs Agents comparison table
- Updated example skills with advanced frontmatter (`argument-hint`, `allowed-tools`, `disable-model-invocation`)
- Updated Skill Creator: `/help`→`/skills`, added `/reload-plugins`, fixed paths to directory format

**Power Usage overhaul (CBP-015)**
- Rewrote and expanded the Power Usage section (section 14) from 7 to 13 collapsibles
- **Fixed inaccuracies:** Worktree flag `-r`→`-w`, replaced fabricated hooks example with real-world patterns (auto-lint, read-before-edit, status line), updated model names to Opus 4.6/Sonnet 4.6/Haiku 4.5
- **Enhanced existing:** Agent Teams (added teammate spawning, tmux mode, named agents), Work Trees (added `--tmux`, lifecycle hooks), Model section renamed to "Model & Effort Control" (added `/effort`, `/fast`, `--fallback-model`), Hooks renamed to "Hooks in Practice" (3 real examples), Session Logs (added `/export`, transcript viewer), /loop (added `/schedule` for persistence)
- **6 new collapsibles:** Remote Control & Cross-Device (`/remote-control`, `/teleport`, `/desktop`, `/mobile`), Chrome Integration (`--chrome`), Batch Operations (`/batch` with parallel agents), Plugins (`/plugin`, marketplace), Voice Input (push-to-talk, 20+ languages), Context Management (`/context`, `/compact`)

**Cheat Sheet overhaul (CBP-014)**
- Rewrote the entire Cheat Sheet section (section 13) with current Claude Code reference
- **Keyboard Shortcuts:** Fixed 4 wrong shortcuts (`Ctrl+J`→`Ctrl+T`, `Ctrl+X`→`Option+T`, etc.), added 8 new (`Ctrl+O`, `Ctrl+B`, `Option+P`, `Option+O`, voice push-to-talk, multiline keys)
- **Slash Commands:** Removed 3 deprecated (`/vim`, `/pr_comments`, `/history`), added ~26 new commands organized into 6 categories (session, model, automation, config, cross-device, info). Now covers `/effort`, `/fast`, `/loop`, `/schedule`, `/batch`, `/remote-control`, `/teleport`, `/voice`, `/context`, `/diff`, and more
- **CLI Flags:** Fixed 3 incorrect flags (`-r`→`-w` for worktree, `--budget`→`--max-budget-usd`, `--conversation-mode`→`--permission-mode`), added ~14 new flags organized into 5 categories. Now covers `--effort`, `--system-prompt`, `--mcp-config`, `--json-schema`, `--remote`, `--agent`, `--bare`
- **Permission Modes:** Expanded from 3 to 5 modes — added Accept Edits and Bypass Permissions, updated cycle description
- **Hooks:** Expanded from 6 to 26 hook events organized into 4 categories. Renamed `PreUserInput`→`UserPromptSubmit`, added agent/task hooks, environment hooks, context hooks, MCP elicitation hooks
- **Input Superpowers:** Fixed Multi-Dir (`-w`→`--add-dir`), added `!bash` prefix, `/commands` autocomplete, and Voice cards. Updated paste image shortcut
- **File Structure Map:** Added `rules/` to project tree, added `commands/` and `plugins/` to global tree, removed outdated `.mcprc`
- **Quick Reference Combos:** Fixed worktree command, added 4 new combos (resume session, effort level, remote control, voice)

**OpenSpec framework reference (CBP-012)**
- Added OpenSpec to the "Open Source Frameworks" section on the Claude Best Practices page
- OpenSpec is a lightweight, spec-driven development framework that helps AI coding assistants and humans align on requirements before writing code
- Links to https://github.com/Fission-AI/OpenSpec

### v9 — 2026-04-08

**Config Cascade sub-section (CBP-011)**
- Added new section "09.5 — The Claude Configuration Cascade" to Claude Best Practices, directly after Project Anatomy
- Covers project `.claude/` layer (CLAUDE.md, settings.json, rules/, commands/, skills/, agents/) and user `~/.claude/` layer (global CLAUDE.md, auto-memory, personal commands/skills)
- Explains cascading rules, precedence order (system → user → project), and path-scoped rules via the `paths:` field
- Two file-tree examples: single-project layout and a generic multi-project org cascade (org → product → developer layers)
- 8 team recommendations and 6 anti-patterns
- Codex cross-reference callout linking to the Codex Best Practices page equivalent (`AGENTS.md`, `.rules/`, `.agents/skills/`)
- Added sidebar nav entry and `sectionToPageMap` wiring to prevent CBP-009-class regressions

### v8 — 2026-04-08

**Sidebar search redesign (CBP-010)**
- Replaced the full-screen search overlay with a permanent inline search bar in the left sidebar, under the "Methodology Guide" header
- Results render as a popover anchored to the input, overlaying only the sidebar nav (main content stays visible)
- Selecting a result clears the input, dismisses the popover, and routes to the target section
- Dismissal: `Esc`, outside click, or clearing the input
- Keyboard: `/` or `Cmd/Ctrl+K` focuses the input; `↑ ↓` navigate results; `Enter` selects
- Removed the old full-screen overlay markup, CSS, and `toggleSearch` / `handleSearch` / `trapSearchFocus` functions

**Search navigation fix for Security Review (CBP-009)**
- Added `'security-review': 'practices'` to `sectionToPageMap` so search results for the new section route to Claude Best Practices instead of falling through to the FSAD page

**Security Review sub-section (CBP-008)**
- Added new section 10.6 "Security Review" to the Claude Best Practices page, between Code Review Agent and Building Skills
- Introduces a reusable multi-agent security review team pattern: 6 specialists (auth/authz, input validation, secrets/crypto, dependency/supply chain, silent failures, data exposure) spawned in parallel, each writing findings to its own file, consolidated by a lead agent into a single report
- Full verbatim team prompt embedded as a copy-pasteable markdown code block with `<PATH>` and scope placeholders
- "How to Adapt" callout explains how to swap specialists for different stacks (static sites, IaC repos, etc.)
- Added corresponding sidebar nav entry

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
