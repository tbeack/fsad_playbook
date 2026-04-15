## Changes in This Version

### v23 — 2026-04-15

**Claude Code v2.1.109 auto-update (CBP-034–CBP-037)**

Automated playbook sync for Claude Code releases v2.1.108 and v2.1.109.

- **CBP-034 — `/recap` command added to Cheat Sheet.** New session/context table row for `/recap`, introduced in v2.1.108. Describes the use case (returning to a long-running session), notes it is configurable in `/config`, and documents the `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` fallback for telemetry-disabled setups.
- **CBP-035 — `/undo` consolidated as alias for `/rewind`.** As of v2.1.108, `/undo` is an alias for `/rewind`, not a separate command. Removed the standalone `/undo` row; updated the `/rewind` row to list both `/undo` and `/checkpoint` as aliases.
- **CBP-036 — Prompt Caching TTL collapsible added to Power Usage.** New collapsible in the Claude Power Usage section documents `ENABLE_PROMPT_CACHING_1H=1` (opt into 1-hour TTL for API key / Bedrock / Vertex / Foundry users) and `FORCE_PROMPT_CACHING_5M=1` (force 5-minute TTL). Includes a cost tip for large shared system prompts.
- **CBP-037 — Skills "Programmatic" card updated for built-in Skill tool discovery.** As of v2.1.108, Claude itself can discover and invoke built-in slash commands (`/init`, `/review`, `/security-review`) via the Skill tool — not just subagents and API integrations. Updated card text to reflect this.

### v22 — 2026-04-14

**New Workflows page (CBP-033)**

Added a top-level `Workflows` section to the left nav, positioned between *Pod Compositions* and *Claude Best Practices*. This gives teams getting started a dedicated home for concrete, end-to-end walkthroughs of the skills and rituals an FSAD pod uses day-to-day — not methodology, not best-practice bullets, but *"here is exactly how this skill runs."*

- **First example: Project Initialize-Context Skill.** A 4-step deep-dive into `/project:initialize-context` — Discover (Step 0), Explore (Step 1–2), Draft (Step 3–7), Write (Step 8–9). Each step is a clickable tab revealing paired detail cards: the mechanics on the left, the conceptual payoff (classification as conforms / supplements / overrides, the accept-edit-redo loop, incremental re-runs) on the right. Content sourced from team reference screenshots in `markdown/examples/`, restyled in the playbook's existing typographic and card language — not embedded as images. Terminology aligned to FSAD vocabulary (project / pod) rather than the source screenshots' internal terms (squad / legion).
- **Second example: Project Create-Spec Skill.** A 4-step deep-dive into `/project:create-spec` — Setup (Step 0), Mode (Step 1), Drafting (Step 2–8), Write (Step 9). Setup loads the full pod/project context chain before drafting begins. Mode forks between *brain dump* (paste meeting notes, Slack threads, Gong snippets) and *guided* (step-by-step questions for user analytics, customer feedback, competitive signals, success criteria). Drafting walks the guided-mode section list (Problem · Competitive Lens · Use Cases · Architecture · Preconditions · Acceptance Criteria · Future Scope) through a `looks good` / `edit` / `redo` review loop. Write assembles the spec, emits to `pod/dir/specs/feature-name.md`, regenerates the pod roadmap, and generates next steps. Transcribed from screenshots with three renames applied (`/product:generate-spec` → `/project:create-spec`, `legion` → `project`, `squad` → `pod`) and one line of meta-commentary ("This is the part that can't be Sherlocked…") deliberately omitted as inappropriate for a methodology document.
- **Copy polish pass.** Dropped the internal-team-specific enumerations and jargon during final review: `(AI / IDMS / Platform)` removed from *Pick project*, `with YAML frontmatter` removed from *Assembles full spec*, `from frontmatter` removed from *Regenerates pod roadmap*, `Prints` → `Generates` on the next-steps bullet, and the tab-label word *Phase* renamed to *Step* across all 8 tabs in both skills.
- **Closing pull-section generalized** to cover both skills — "Two markdown files. An entire pod operating system." — replacing the single-skill version shipped in Phase 1.
- **New CSS module: `.wf-*`.** Tab group (`.wf-tabs`, `.wf-tab` with stacked mono label + title), step panels (`.wf-panel`), card grid (`.wf-grid`, `.wf-card` with `.wf-card-label`, chip row, mono code blocks, footnote variant). Mobile breakpoint collapses tabs to 2 columns and cards to 1 column at ≤780px.
- **New JS: `switchWorkflow(wfId)`.** Parallel to `switchPod()` — toggles `.active` across tabs and panels.
- **Router + nav plumbing.** `sectionToPageMap` extended with `workflows-hero`, `project-initialize-context`, and `project-create-spec`; `pageTitles` gains `workflows: 'Workflows'`; nav group added between Pods and Practices with two sub-items; scroll-spy picks up the new section anchors automatically via the existing `IntersectionObserver` pipeline.

### v21 — 2026-04-14

**Distinctive voice — Phase 6 of CBP-032 (final critique-driven phase)**

The v20 critique returned a clear pass with zero Priority Issues but noted the playbook was *correct and quiet* rather than *correct and distinctive*. Phase 6 answers that by committing to three identity moves — and then retires the critique pipeline.

- **`.pullquote` component introduced.** CSS spec: Source Serif 4 italic at `clamp(1.2rem, 2.5vw, 1.45rem)` against a 2px `--accent-blue` left border, 640px max-width, optional mono attribution line beneath. Three placements, each sourced from existing copy:
  - `#overview` (FSAD page): _"Models forget. Hooks don't."_
  - `#workflow` (FSAD page): _"Spec-driven, not code-driven. Structure is permanent; prompting is temporary."_
  - `#practices/config-cascade`: _"Org and project `.claude/` live in git. Only `~/.claude/` stays local."_
- **`.kpi-card` rhythm.** Replaced the two cited Code Review metrics (`84%` coverage and `<1%` false-positive rate) with a small-multiples treatment: mono label, Source Serif 4 figure, prose context sentence, mono citation line. Sparklines intentionally omitted — real time-series data wasn't available, and Phase 6's plan explicitly forbids fabricated charts.
- **Serif italic in section subtitles.** Added `.section-subtitle em` and `.hero p em` to the `--font-hero` family. Propagates the hero's typographic personality across ~25 subtitle instances without touching h2/h3 or body type. Spot-checked on FSAD, Pods, Practices, Codex, and KPIs hero + section subtitles.
- **Critique-pipeline retirement.** This is the fifth and final critique-driven phase of CBP-032. The five-pass arc (v17 → v18 → v19 → v20 → v21) drove the playbook from "AI-generated on sight" to "distinctive voice." Future UX work is sourced from external engineering-director feedback, captured in `markdown/research/external_feedback_v21.md` (seeded empty, ready for reviewer notes).

### v20 — 2026-04-14

**Residual polish — Phase 5 of CBP-032**

Driven by the fourth-pass critique in `markdown/research/UX_critique_v19.md`, which returned a clear pass but flagged 5 non-blocking residuals. Phase 5 closes them.

- **Final decorative violet ported.** The remaining ~12 inline-style uses of `rgba(139,92,246,…)` across overview-card icon backgrounds, timeline segments, legend dots, timeline center-gradient, Pod Sizing Matrix config-tags, power-usage plugin badges, and sidebar-nav hover tints all ported to `rgba(111,111,181,…)`. The document no longer contains any references to the original violet hex.
- **Typography identity assigned.** New `--font-hero` token bound to Source Serif 4 (imported via Google Fonts), applied exclusively to `.hero h1`. Adds a classical methodology-doc voice to the landing headline without disrupting the Inter rhythm elsewhere. Adjusted hero h1 weight (800 → 600), size (clamp max +0.2rem), and letter-spacing to suit the serif.
- **Advantages rebalanced.** `.adv-list` converted from a 2-column grid to a single-column flex stack capped at 680px max-width. Slightly larger body type and looser line-height (1.7). Six claims now read as prose punctuation rather than a feature matrix.
- **KPI metric inline styles extracted.** `#page-kpis` percentages (`84%`, `<1%`) migrated from `style="color:var(--accent-emerald)"` to semantic `.kpi-metric kpi-metric--positive` classes. New `--warning` variant added for future use.
- **Codex accent-cyan consolidated.** All `style="color:var(--accent-cyan)"` inline link attributes swept to `style="color:var(--accent-blue)"` — removes forward-compat risk from the alias collision documented in Phase 4.
- **Orphan CSS/JS deleted.** Removed `.hero-stats`, `.hero-stat`, `.hero-stat .number`, and `.hero-stat .label` rules (retired in Phase 1). Removed the mobile media query entries for the same selectors. Removed `.adv-card` from the two JS `IntersectionObserver` selector lists where it no longer corresponds to any element.

### v19 — 2026-04-14

**UX overhaul gap-close — Phase 4 of CBP-032**

Driven by the third-pass critique in `markdown/research/UX_critique_v18.md`, which flagged three remaining AI-tell zones and two new code-smells introduced during v18.

- **Advantages grid retired.** `#advantages` was a 6-card grid with rhetorical metrics (`10× / 0 / ∞ / 1 / 3× / All`) and rotating accent colors per card (cyan/amber/violet/emerald/rose/blue). Replaced with a plain prose list (`.adv-list` + `.adv-item`); claims kept, decoration dropped.
- **Gradient top-bars removed.** `.adv-card::before` gradient stripes (6 `nth-child` rules covering `--gradient-brand`, `--gradient-warm`, `--gradient-cool`, and three hand-rolled linear-gradients) deleted.
- **Callout tokens retuned.** `--callout-tip-bg`, `--callout-tip-border`, `--hero-badge-border`, `--search-result-hover`, `--table-row-hover` ported from the old violet (`rgba(124,92,252,…)` dark / `rgba(91,63,212,…)` light) onto the desaturated indigo (`rgba(111,111,181,…)` / `rgba(85,85,160,…)`) across all three `:root` contexts.
- **Dead tokens deleted.** The `--nav-node-*` and `--nav-connector-*` blocks (13 tokens × 3 `:root` contexts = 39 lines) were unused after the v18 sidebar rewrite. Removed.
- **Inline accent styles extracted.** Hero-badge `style="color: var(--accent-*); border-color: ..."` attributes on all three pages neutralised to use the token-driven `.hero-badge` class. Pod-principle bullets flattened to a single muted background. Timeline h4 inline colors moved to `.timeline-heading--traditional` / `.timeline-heading--fsad` semantic classes.
- **Alias duplication.** `--accent-cyan` and `--accent-violet` both now explicitly alias `--accent-blue` (`#6f6fb5` dark / `#5555a0` light) — documented as legacy aliases in CSS comments.
- **Light-theme accent bump.** `--accent-blue` raised from `#4a4a8a` to `#5555a0` for better interactive readability in bright environments.
- **CSS cleanups.** Removed the redundant `@media (prefers-reduced-motion: reduce) .hero::before { display: none !important; }` rule (already suppressed at root via `--hero-glow: none`). Scoped the `!important` off `.changelog-foot`.
- **Version bump + changelog entry** added to the in-app modal.

### v18 — 2026-04-14

**Major UX overhaul — reclaim the playbook as a senior methodology document (CBP-032)**

Grounded in `markdown/research/UX_critique.md`, which flagged the v17 surface as generic "AI-SaaS-dark-mode-with-purple-glow." Content stayed; the visual envelope was rebuilt across three phases.

**Phase 1 — Quiet the surface**
- Desaturated the primary accent by ~40% (`#7c5cfc`/`#a78bfa` → muted indigo `#6f6fb5`/`#9595c5`; light-theme equivalents also softened)
- Halved every `--accent-glow-*` opacity; removed `--hero-glow` radial halo in dark, light, and auto-detect themes
- Killed gradient-text on the hero `<h1>` and stat numbers
- Replaced the fake hero metric cards (`2–4 / 10× / .md / ∞`) with three thesis sentences: _"Humans write markdown specs. Agents write the code." / "Structure is permanent; prompting is temporary." / "Models forget. Hooks don't."_
- Removed `backdrop-filter: blur(12px)` from the page indicator (kept only on the sidebar modal backdrop)
- Extended `prefers-reduced-motion` to also suppress the hero decorative pseudo-element

**Phase 2 — Hierarchy, semantic colors, sidebar**
- Documented a 3-tier visual hierarchy contract in CSS (prose quiet / callouts structured / diagrams rare)
- Documented a semantic color contract: indigo = primary nav, emerald = positive, amber = warning, rose = anti-pattern, pink = retired
- Retired the pink decorative card border palette (`rgba(255,0,200,...)`) in favor of neutral greys across all themes
- Converted the sidebar from node-graph pills + connector lines to a plain docs-tree with a 2px left-border active state
- Retired the page-indicator pills row (sidebar is now the sole section nav); breadcrumb row retained
- Demoted the gradient step-number badge to a flat neutral background

**Phase 3 — Typography, consistency, polish**
- Removed the unused `DM Serif Display` Google Fonts import (dead code)
- Theme toggle reduced from 3 states (auto/light/dark) to 2 states (light/dark); first load follows OS preference
- Version badge (`· v18`) is now a clickable link targeting the changelog
- Added a legend above the Hub depth dots explaining the light/medium/deep scale
- Topic-footer prev/next visually differentiated: back is a muted text link, next is an accent-weighted link

### v17 — 2026-04-14

**Claude Best Practices — Hub + Topic views restructure**
- Restructured the 13-section flat Claude Best Practices page into a two-level experience: a Hub landing view with five topic cards, plus focused topic views that render one cluster at a time
- Five clusters: Foundations, Integrations & Review, Skills & Hooks, Operations, Reference
- Added breadcrumb (`Claude / <topic>`) in the page indicator and prev/next topic-footer navigation inside each topic view
- Reworked the sidebar practices group from 13 flat items into a two-level topic → section accordion; topic headers route to the topic view, nested sections open the view and scroll to the section
- Scroll-spy and indicator pills scoped to the currently visible topic view only; hash routing supports `#practices`, `#practices/<topic>`, and legacy `#practices/<section>` links (which now resolve to the containing topic)
- Prepared for an optional Persona Tracks navigation layer (Phase 2) without requiring further structural changes

### v16 — 2026-04-14

**External memory vaults — Obsidian & Karpathy pattern (CBP-031)**
- Added a new "External Memory: Obsidian & Markdown Vaults" tip callout to the Claude Best Practices page, adjacent to the existing `MEMORY.md` recommendations
- Framed the distinction between Claude's passive auto-memory and intentional, human-curated markdown vaults (Obsidian, Logseq, plain `notes/`)
- Referenced Andrej Karpathy's workflow as the canonical example — a long-lived vault that outlives any single model or IDE
- Listed four practical integration patterns: symlinking a vault subfolder into the repo, pasting curated notes at session start, wiring an Obsidian/Reflect/Notion MCP server for read/write access, and treating the vault as source-of-truth above churn-prone `MEMORY.md`

### v15 — 2026-04-14

**Claude Code v2.1.107 auto-update (CBP-027 through CBP-030)**

**Skill description cap updated (CBP-027)**
- Updated `description` field in Building Skills frontmatter reference table: cap raised from 250 to 1,536 characters (per Claude Code v2.1.105)
- Added note that a startup warning is shown when descriptions are truncated

**PreCompact hook blocking documented (CBP-028)**
- Updated exit code 2 description in Exit Codes & Decision Control to include "blocks compaction" as a possible effect
- Added new "PreCompact blocking" table in Exit Codes & Decision Control collapsible showing both blocking methods: exit code 2 (with stderr reason) and JSON `{"decision":"block"}` output

**`/proactive` alias added (CBP-029)**
- Cheat Sheet automation table: added "Alias: `/proactive`" to the `/loop` row
- `/loop — Built-in Scheduler` collapsible header: appended `(alias: /proactive)` subtitle

**`monitors` manifest key added (CBP-030)**
- Added `monitors` row to Skills frontmatter reference table: array type, describes background monitor definitions that auto-arm at session start or skill invoke

### v14 — 2026-04-13

**Effort level guidance update (CBP-024)**
- Updated all 5 effort references across the playbook to reflect Anthropic's change: default effort is now `medium` (was `high`)
- Power Usage → Model & Effort Control: expanded code block to show all 4 levels with descriptions, added "Effort Default Changed to Medium" tip callout with Boris Cherny's guidance on using `/effort max` for complex agentic work
- Cheat Sheet: updated `/effort` slash command, `--effort` CLI flag, and Quick Reference table to show `medium` as default
- Skill frontmatter `effort` field: added note that it overrides session default (medium)

**Adaptive thinking & budget_tokens deprecation guidance (CBP-025)**
- Added "Adaptive thinking & effort" block to Model & Effort Control collapsible in Power Usage
- Effort/thinking behavior table showing how each level controls thinking depth (max → always thinks with no constraints, low → skips thinking for speed)
- Added `Option+T` / `Alt+T` keyboard shortcut reference for toggling extended thinking
- Added "budget_tokens Is Deprecated" warning callout: manual `budget_tokens` is deprecated on Opus 4.6 and Sonnet 4.6, use adaptive thinking with `effort` instead

**Hooks Deep Dive section (CBP-026)**
- Added new standalone section 15 "Hooks — Automation & Guardrails" to Claude Best Practices, between Power Usage and Monitoring
- **Hook Lifecycle** — ASCII flow diagram showing all 26 events from SessionStart through the agentic loop to SessionEnd
- **Four Hook Types** — comparison table and code examples for all 4 types: `command` (shell), `http` (POST endpoints), `prompt` (LLM evaluation), `agent` (subagent with tools)
- **Configuration** — 6 scope locations (user/project/local/managed/plugin/skill), settings.json structure, matcher patterns table, conditional `if` field syntax, environment variables reference
- **Exit Codes & Decision Control** — exit 0/2/other semantics with warning about exit 2 being the only blocking code, PreToolUse permission decisions (allow/deny/ask/defer) with precedence rules
- **Practical Recipes** — 6 real-world examples: block destructive commands (security), auto-lint after edits (quality), read-before-edit reminder (workflow), prompt-based security review (policy), SessionStart environment setup, MCP operation logging (observability)
- **Hook Best Practices** — 8 guidelines including performance, testing with `--debug`, async hooks, and `/hooks` viewer
- Replaced "Hooks in Practice" collapsible in Power Usage with a short summary pointing to the new section
- Updated Pillar 3 (Project Anatomy) with cross-reference link to the new Hooks section
- Added sidebar nav entry and sectionToPageMap wiring for `hooks-deep-dive`
- Renumbered Monitoring to section 16, Open Source Frameworks to section 17

**Search system improvement**
- Increased section text capture from 300 to 2000 characters for broader search coverage
- Added collapsible-level indexing: each collapsible header now gets its own search entry (up to 3000 chars), so users can find content like "adaptive thinking" or "budget_tokens" that lives deep within sections

### v13 — 2026-04-10

**Phase 3 rename (CBP-023)**
- Renamed Phase 3 from "Spec Validation" to "Implementation Planning" in the FSAD workflow diagram
- Updated both the phase card title and the detail panel heading

**Task tracking cleanup**
- Extracted CBP-006 bug details from `todo.md` into its own `task-cbp-006.md` file, matching the convention used by all other tasks

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
