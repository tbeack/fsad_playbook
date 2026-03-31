# FSAD Playbook Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-file FSAD Playbook HTML app with 10 content sections, dark/light theme, sidebar navigation, search, and no build system.

**Architecture:** Single `fsad-playbook.html` file with inline CSS + JS. Uses Tailwind CSS, Mermaid.js, Highlight.js via CDN. Dark theme by default with light toggle. CSS variables for theming. DM Serif Display + IBM Plex Sans/Mono fonts.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Mermaid.js (CDN), Highlight.js (CDN), Google Fonts (CDN), Vanilla JS

**Design Doc:** `docs/plans/2026-03-09-fsad-playbook-design.md`

---

## Task 1: HTML Shell + CSS Foundation + Theme System

**Files:**
- Create: `fsad-playbook.html`

**Step 1: Create the HTML shell with CDN imports, CSS variables, and empty section structure**

Create `fsad-playbook.html` with:
- DOCTYPE, head with meta charset/viewport
- Google Fonts: DM Serif Display, IBM Plex Sans (400/500/600), IBM Plex Mono (400/500)
- Tailwind CSS CDN
- Mermaid.js CDN (latest)
- Highlight.js CDN (latest, dark theme — `atom-one-dark`)
- CSS variables in `:root` for dark theme (from fsad-guide.html):
  ```css
  :root {
    --bg: #0a0e17;
    --bg-surface: #111827;
    --bg-elevated: #1a2234;
    --bg-card: #151d2e;
    --border: #1e2a3f;
    --border-accent: #2d3f5e;
    --text-primary: #e8ecf4;
    --text-secondary: #8b95a8;
    --text-muted: #5a6478;
    --accent-blue: #3b82f6;
    --accent-cyan: #06b6d4;
    --accent-emerald: #10b981;
    --accent-amber: #f59e0b;
    --accent-rose: #f43f5e;
    --accent-violet: #8b5cf6;
    --gradient-brand: linear-gradient(135deg, #3b82f6, #06b6d4);
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'IBM Plex Sans', -apple-system, sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
    --radius: 12px;
    --radius-lg: 20px;
    --shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  [data-theme="light"] {
    --bg: #f9fafb;
    --bg-surface: #f3f4f6;
    --bg-elevated: #e5e7eb;
    --bg-card: #ffffff;
    --border: #d1d5db;
    --border-accent: #9ca3af;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;
    --shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  ```
- Base styles: body using vars, font-family, heading styles, code blocks
- Sidebar layout: fixed left 260px, main content with margin-left
- Responsive: sidebar hidden on < 900px, hamburger button visible
- Component styles: `.card`, `.callout`, `.callout-tip`, `.callout-warning`, `.callout-best-practice`, `.step-card`, `.resource-link`, `.code-block`, `.copy-btn`
- 10 empty `<section>` elements with IDs: `overview`, `team-composition`, `getting-started`, `claude-setup`, `integrations`, `building-skills`, `best-practices`, `cheat-sheet`, `power-usage`, `open-source`
- Sidebar nav with links to all 10 sections
- Theme toggle button (sun/moon icon) in sidebar header
- Search input at top of sidebar
- Mobile hamburger button

**Step 2: Open in browser and verify**

Run: `open /Users/theobeack/Desktop/AI/claude_projects/claude_best_practices/fsad-playbook.html`
Expected: Dark themed page with sidebar, 10 empty sections, theme toggle works, responsive layout collapses sidebar on narrow viewport.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: create FSAD Playbook shell with theme system and sidebar layout"
```

---

## Task 2: JavaScript — Navigation, Theme Toggle, Search, Copy Buttons

**Files:**
- Modify: `fsad-playbook.html` (add `<script>` block at end of body)

**Step 1: Add all JavaScript functionality**

Add inline `<script>` at end of body with:

1. **Theme toggle** (~15 lines):
   - Toggle `data-theme` attribute on `<html>` between absent (dark) and "light"
   - Update Mermaid theme on toggle
   - Persist preference in localStorage
   - Update toggle button icon (sun ↔ moon)

2. **Sidebar scroll tracking** (~30 lines):
   - IntersectionObserver on all `<section>` elements
   - When section enters viewport, add `.active` class to corresponding nav link
   - Remove `.active` from other nav links

3. **Smooth scroll on nav click** (~10 lines):
   - Prevent default on sidebar nav links
   - `scrollIntoView({ behavior: 'smooth' })` to target section
   - On mobile, close sidebar after click

4. **Mobile hamburger toggle** (~10 lines):
   - Toggle `.sidebar-open` class on body
   - Close sidebar when clicking outside on mobile

5. **Collapsible sections** (~20 lines):
   - Click handler on `.collapsible-header` elements
   - Toggle `.collapsed` class, animate max-height
   - Rotate chevron indicator

6. **Copy button on code blocks** (~25 lines):
   - On DOMContentLoaded, find all `<pre><code>` blocks
   - Inject copy button into each
   - On click: `navigator.clipboard.writeText()`, show "Copied!" feedback for 2s

7. **Search** (~40 lines):
   - Input handler on search box
   - On each keystroke (debounced 300ms), search text content of all sections
   - Hide sections that don't match
   - Highlight matching text with `<mark>` element
   - Show "No results" message if nothing matches
   - Clear highlights and show all sections when search is cleared

8. **Mermaid + Highlight.js init** (~15 lines):
   - `mermaid.initialize({ startOnLoad: true, theme: 'dark' })`
   - `hljs.highlightAll()`
   - Re-init Mermaid on theme change

**Step 2: Verify in browser**

Open `fsad-playbook.html`:
- Click theme toggle → switches between dark/light
- Click sidebar links → smooth scrolls to sections
- Type in search → sections filter
- Resize browser → sidebar becomes hamburger

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add navigation, theme toggle, search, and copy buttons"
```

---

## Task 3: Section 1 — FSAD Overview

**Files:**
- Modify: `fsad-playbook.html` (fill Section 1 content)

**Step 1: Write Section 1 content**

Content source: `fsad-guide.html` Sections 01-02 + Notion page

Fill the `#overview` section with:

1. **Section header**: "01 — FSAD Overview" with subtitle "Full Stack Agentic Development: A spec-driven, agentic-first methodology"

2. **What is FSAD** — 4 info cards in 2x2 grid:
   - Spec-Driven, Not Code-Driven: "Markdown is the primary artifact. Code is a byproduct of well-written specs."
   - Cross-Functional Pods: "2-4 people (PM + UX + Engineer), no handoffs between roles."
   - Markdown as Common Language: "Lightweight, version-controlled, diff-friendly. Everyone reads and writes it."
   - Agent-Delegated Execution: "Multiple AI agents run in parallel, consuming specs and producing code."

3. **Three-Phase Agentic Workflow** — Mermaid flowchart:
   ```
   Phase 1: Foundation (Context & Rules)
   → Phase 2: Specification (Planning & Decomposition)
   → Phase 3: Implementation & Evaluation
   ```
   Each phase as a collapsible sub-section with details:
   - Phase 1: Define goals via PRDs, set constraints (coding styles, security), initialize environment
   - Phase 2: Task decomposition, context management across agents, tool mapping
   - Phase 3: Agentic execution, multi-agent coordination, reflect & refine, human-in-the-loop review

4. **5-Phase Workflow Detail** — styled workflow steps (from fsad-guide.html Section 02):
   - Intent & Discovery (PM + UX) → problem.md
   - Live Spec Session (PM + UX + Eng) → spec.md
   - Spec Validation (Eng + Agent) → plan.md + tasks/
   - Agent Execution (3× Agents) → code + tests
   - Human Review & Ship (Eng + UX + PM) → deploy

5. **Core Components** — 3 info cards:
   - MCP (Model Context Protocol): Universal adapter between AI models and databases/APIs
   - Versioned Prompts: `.prompt.md` files tracked in version control
   - Monitoring: Tracking agentic behavior, error logs, performance metrics

6. **External Resources** — 2 resource link cards:
   - MCP video: https://www.youtube.com/watch?v=C3FZL7hXj0Y
   - PRDs video: https://www.youtube.com/watch?v=goOZSXmrYQ4

**Step 2: Verify in browser**

Open file, scroll to Section 1. Verify: cards render, Mermaid diagram renders, collapsible sections work, resource links display.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 1 — FSAD Overview with workflow diagram"
```

---

## Task 4: Section 2 — Team Composition & Roles

**Files:**
- Modify: `fsad-playbook.html` (fill Section 2 content)

**Step 1: Write Section 2 content**

Content source: `fsad-pod-compositions.html`

Fill the `#team-composition` section with:

1. **Section header**: "02 — Team Composition & Roles" with subtitle "Pod configurations that work"

2. **Pod Overview Stats** — 4 stat cards in a row:
   - 6 pod configurations
   - 2-4 humans per pod
   - N agents per pod
   - 1 shared spec.md

3. **6 Pod Configurations** — each as a collapsible card with:
   - Pod name + size badge
   - Definition paragraph
   - Role responsibilities (table or list)
   - "When to Use" list
   - Key artifacts list

   Pods:
   - **The Triad (Config A)**: 3 humans (PM + UX + Eng + N agents). Default pod. Full spectrum coverage.
   - **The Builder Duo (Config B)**: 2 humans (PM + Eng + N agents). Leanest pod. API/backend focus.
   - **The Experience Pod (Config C)**: 3 humans (UX + FE Eng + BE Eng + N agents). Design-led. UI-is-the-product.
   - **The Full Stack Pod (Config D)**: 4 humans (PM + UX + Lead Eng + Specialist Eng + N agents). Max size. Cross-cutting features.
   - **The Platform Pod (Config E)**: 2 humans (Arch Eng + Reliability Eng + N agents). Pure engineering. Infrastructure.
   - **The Discovery Pod (Config F)**: 3 humans (PM + UX + Eng + Research Agents). Hypothesis-driven. Find the right feature.

4. **Pod Selection Matrix** — table with columns: Work Type, Recommended Pod, Size, Why
   Include all 10 work type rows from the source content.

5. **Anti-Patterns** — 6 callout-warning cards:
   - The Solo Hero, The Oversized Pod, The Handoff Pod, The Agent-Only Pod, The Part-Time Pod, The Duplicate Pod
   Each with problem + solution.

6. **Closing principle** quote: "The right pod is the smallest group of humans who can make complete decisions about a feature without external dependencies..."

**Step 2: Verify in browser**

Check: pod cards expand/collapse, selection matrix table renders, anti-pattern cards display.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 2 — Team Composition with 6 pod configs"
```

---

## Task 5: Section 3 — How to Get Started

**Files:**
- Modify: `fsad-playbook.html` (fill Section 3 content)

**Step 1: Write Section 3 content**

Content source: Notion page

Fill the `#getting-started` section with:

1. **Section header**: "03 — How to Get Started" with subtitle "From zero to spec-driven development"

2. **6 Step Cards** — numbered steps, each as a card:

   **Step 1: Start in Planning Mode**
   - Use existing Figma mockups and PRDs as initial context
   - Feed Claude your existing documentation before writing new specs
   - Code example: `claude --conversation-mode plan`

   **Step 2: Create spec.md**
   - Iterate with Claude until the spec covers everything needed to build
   - Include: user stories, acceptance criteria, technical constraints, UX decisions
   - Code example showing spec.md structure:
     ```markdown
     # Feature: [Name]
     ## Problem Statement
     ## User Stories
     ## Technical Spec
     ## UX Decisions
     ## Acceptance Criteria
     ```

   **Step 3: Build roadmap.md**
   - Organize implementation into phases
   - Track what's done, what's next
   - Code example showing roadmap structure

   **Step 4: Build state.md**
   - Track current project state for session resumption
   - What's been built, what decisions were made, current blockers
   - Code example showing state.md structure

   **Step 5: Break Into Phases**
   - Each phase should fit within a context window
   - One phase = one focused area of work
   - Callout-tip: "If a phase feels too big, split it. Context window limits are real."

   **Step 6: Create architecture.md**
   - Describe overall architecture and tech stack
   - Include: system diagram, data flow, key dependencies
   - Mermaid diagram example showing a typical architecture

3. **Callout-best-practice**: "The document-driven workflow means your specs, roadmap, and state files ARE your project management system. No separate tool needed."

**Step 2: Verify in browser**

Check: step cards render with numbers, code blocks have syntax highlighting, Mermaid diagram renders.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 3 — How to Get Started with step-by-step guide"
```

---

## Task 6: Section 4 — Claude Setup (Anatomy of a Claude Code Project)

**Files:**
- Modify: `fsad-playbook.html` (fill Section 4 content)

**Step 1: Write Section 4 content**

Content source: Notion page

Fill the `#claude-setup` section with:

1. **Section header**: "04 — Anatomy of a Claude Code Project" with subtitle "Claude needs 4 things: the why, the map, the rules, the workflows"

2. **Key insight callout**: "Prompting is temporary. Structure is permanent."

3. **5 Pillar Cards** — each as a detailed card with code examples:

   **Pillar 1: CLAUDE.md = Repo Memory**
   - Purpose: Contains WHY (purpose), WHAT (repo map), HOW (rules + commands)
   - Keep it short — if too long, the model misses important context
   - Code example of a well-structured CLAUDE.md (~15 lines)
   - Callout-tip: "Use `/init` to auto-generate a starting CLAUDE.md"

   **Pillar 2: .claude/skills/ = Reusable Expert Modes**
   - Turn common workflows into skills: code review checklist, refactor playbook, release procedure, debugging flow
   - Provides consistency across sessions and teammates
   - Code example of a skill file structure

   **Pillar 3: .claude/hooks/ = Guardrails**
   - For deterministic actions: run formatter after edits, run tests on core changes, block unsafe directories
   - "Models forget. Hooks don't."
   - Code example of hooks configuration:
     ```json
     {
       "hooks": {
         "PostToolUse": [{
           "matcher": "Edit",
           "command": "npx prettier --write $file"
         }]
       }
     }
     ```

   **Pillar 4: docs/ = Progressive Context**
   - Architecture overview, ADRs (engineering decisions), operational runbooks
   - Don't bloat prompts — put detailed docs in files Claude can read when needed
   - Example file tree

   **Pillar 5: Local CLAUDE.md for Risky Modules**
   - Place small CLAUDE.md files near sharp edges
   - Examples: `src/auth/CLAUDE.md`, `src/persistence/CLAUDE.md`, `infra/CLAUDE.md`
   - Claude sees gotchas exactly when working in that directory
   - Code example of a local CLAUDE.md for an auth module

4. **File structure diagram** — visual tree showing where each pillar lives in a project

**Step 2: Verify in browser**

Check: pillar cards render with code examples, code blocks have highlighting.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 4 — Claude Setup with 5 pillars"
```

---

## Task 7: Section 5 — Integrations

**Files:**
- Modify: `fsad-playbook.html` (fill Section 5 content)

**Step 1: Research current MCP setup instructions**

Use web search to find current installation/configuration steps for each MCP server. Check Claude Code docs for the latest MCP setup patterns.

**Step 2: Write Section 5 content**

Fill the `#integrations` section with:

1. **Section header**: "05 — Integrations" with subtitle "Connect Claude to your existing tools via MCP"

2. **What is MCP** — brief explainer card with Mermaid diagram showing Claude ↔ MCP ↔ Tools

3. **5 Integration Guides** — each as a collapsible card:

   **JIRA MCP**
   - What it does: Read/create/update JIRA issues from Claude
   - Installation: npm/npx command
   - Configuration: settings.json snippet
   - Example usage: "Create a JIRA ticket for this bug"

   **Figma MCP**
   - What it does: Read Figma designs, extract component specs
   - Installation steps
   - Configuration snippet
   - Example usage: "Implement this Figma component"

   **Notion MCP**
   - What it does: Search/read/create Notion pages and databases
   - Installation steps
   - Configuration snippet
   - Example usage: "Find the spec in Notion and implement it"

   **Azure DevOps MCP**
   - What it does: Work items, repos, pipelines
   - Installation steps
   - Configuration snippet
   - Example usage

   **Google Docs MCP**
   - What it does: Read/write Google Docs
   - Installation steps
   - Configuration snippet
   - Example usage

4. **Callout-tip**: "You can run multiple MCPs simultaneously. Claude auto-discovers available tools from all connected servers."

**Step 3: Verify in browser**

Check: collapsible integration cards work, code blocks render.

**Step 4: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 5 — Integrations with 5 MCP guides"
```

---

## Task 8: Section 6 — Building Your Own Skills

**Files:**
- Modify: `fsad-playbook.html` (fill Section 6 content)

**Step 1: Write Section 6 content**

Fill the `#building-skills` section with:

1. **Section header**: "06 — Building Your Own Skills" with subtitle "Turn repeatable workflows into reusable expert modes"

2. **What are Skills** — explainer card:
   - Skills are markdown files that define specialized workflows
   - Claude loads them on demand via slash commands
   - They provide consistency across sessions and team members

3. **Skill File Anatomy** — code example of a complete skill file:
   ```markdown
   ---
   name: my-skill
   description: What this skill does
   ---
   # Skill Name
   ## Overview
   [What this skill accomplishes]
   ## Process
   [Step-by-step instructions Claude follows]
   ## Checklist
   - [ ] Step 1
   - [ ] Step 2
   ```

4. **Where to Put Skills**:
   - Project-level: `.claude/skills/skill-name.md`
   - Global: `~/.claude/skills/skill-name.md`

5. **Example Skills** — each as a collapsible card with full skill file content:

   **Documentation Skill**
   - Auto-generates project documentation from codebase
   - Skill file example

   **Story Point Estimation Skill**
   - Estimates story points using Fibonacci scale
   - Analyzes complexity, dependencies, risk
   - Skill file example

   **Epic to Stories Skill**
   - Breaks down epics into implementable user stories
   - Skill file example

   **Code Review Skill**
   - Structured code review with security, performance, and style checks
   - Skill file example

6. **Callout-best-practice**: "Start with one skill for your most repeated workflow. Add more as patterns emerge."

**Step 2: Verify in browser**

Check: skill examples render with syntax highlighting.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 6 — Building Your Own Skills with examples"
```

---

## Task 9: Section 7 — Best Practices & Guidelines

**Files:**
- Modify: `fsad-playbook.html` (fill Section 7 content)

**Step 1: Write Section 7 content**

Content source: Notion page + existing app sections

Fill the `#best-practices` section with:

1. **Section header**: "07 — Best Practices & Guidelines" with subtitle "Lessons learned from real-world FSAD adoption"

2. **Background Context Matters** — callout-best-practice:
   - Avoid over-emphasis on technical capabilities
   - Insufficient business context hurts initial Claude coding sessions
   - A holistic approach beyond engineering-only specifications yields best results
   - Including background details, business context, problems to be solved, and design system is critical

3. **Best Practices Grid** — cards organized by category:

   **Prompting**
   - Be specific about what you want, not how to do it
   - Provide context: business requirements, constraints, existing patterns
   - Use @ references to point Claude at specific files
   - Use plan mode first for complex features

   **Project Structure**
   - Keep CLAUDE.md concise — under 100 lines
   - Use local CLAUDE.md files for module-specific rules
   - Organize docs/ for progressive context loading
   - Version control your prompts and specs

   **Workflow**
   - Use `/clear` between unrelated tasks
   - Use `/compact` when context gets large
   - Commit frequently — small, atomic changes
   - Review agent output before shipping

   **Common Pitfalls** — callout-warning cards:
   - Jumping straight to code without a spec
   - Providing only technical specs without business context
   - Not using plan mode for complex features
   - Ignoring context window limits
   - Not reviewing agent-generated code

4. **FSAD vs Traditional Agile** — comparison table (from fsad-guide.html):
   - Dimensions: Source of Truth, Team Structure, Planning Cadence, Design Process, Code Generation, Cycle Time, Knowledge Retention, QA, Role of Engineers, Scalability

**Step 2: Verify in browser**

Check: cards render, comparison table is readable.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 7 — Best Practices with comparison table"
```

---

## Task 10: Section 8 — Claude Cheat Sheet (Interactive HTML)

**Files:**
- Modify: `fsad-playbook.html` (fill Section 8 content)

**Step 1: Write Section 8 content**

Content source: Extracted text from Claude Cheat Sheet.jpeg

Fill the `#cheat-sheet` section with:

1. **Section header**: "08 — Claude Cheat Sheet" with subtitle "Everything you need in one place"

2. **Keyboard Shortcuts** — styled table:
   All shortcuts from the cheat sheet: Enter, Esc, Esc Esc, Shift+Tab, Ctrl+L, Ctrl+C, Ctrl+R, Ctrl+J, Tab, Ctrl+E, Ctrl+X, Ctrl+S, Ctrl+P, arrows, Ctrl+A/E, Ctrl+F/B, Ctrl+W, Ctrl+K, Ctrl+Z

3. **Slash Commands** — styled table:
   /history, /compact, /undo, /export, /cost, /usage, /model, /permissions, /vim, /terminal-setup, /theme, /doctor, /mcp, /keys, /memory, /init, /pr_comments, /install-github-app, /logout

4. **CLI Launch Flags** — styled table:
   claude, claude "query", claude -p, --output-format json, claude -r, --model, --continue/-c, --conversation-mode plan, --budget, --max-turns, --allowedTools, --disallowedTools, --output-format stream-json, --verbose

5. **Permission Modes** — 3 info cards:
   - Normal: Prompts for each tool use
   - Auto-Accept: No prompts, fastest
   - Plan Mode: Read-only, no writes
   - Cycle: Shift+Tab

6. **Hooks Reference** — styled table:
   PreToolUse, PostToolUse, PreUserInput, Stop, SessionStart, SessionEnd
   Each with "When it Fires" description

7. **Input Superpowers** — styled list:
   @mention, #prefix, Paste Images, Pipe Input, Multi-dir, config examples

8. **File Structure Map** — two-column layout:
   - Project level: CLAUDE.md, settings.json, commands/, agents/
   - Global level: ~/.claude/CLAUDE.md, settings.json, todos/, .mcprc, keybindings.json

9. **Quick Reference Combos** — compact table of most-used combos

**Step 2: Verify in browser**

Check: all tables render, keyboard shortcut styling looks good, search works within this section.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 8 — Interactive Claude Cheat Sheet"
```

---

## Task 11: Section 9 — Claude Power Usage

**Files:**
- Modify: `fsad-playbook.html` (fill Section 9 content)

**Step 1: Write Section 9 content**

Content source: Notion page

Fill the `#power-usage` section with:

1. **Section header**: "09 — Claude Power Usage" with subtitle "Advanced features for power users"

2. **Feature Cards** — each as a collapsible card:

   **Agent Teams**
   - Multiple Claude instances collaborating on the same codebase
   - Use cases: frontend + backend agents, writer + reviewer
   - Resource link: https://code.claude.com/docs/en/agent-teams

   **Work Trees**
   - Isolated git worktrees for parallel work
   - Each agent gets its own branch/worktree
   - Code example: `claude -r feature-name`
   - Changes merge back when complete

   **Model Auto Selection**
   - Claude picks the right model for the task
   - Sonnet for routine, Opus for complex reasoning
   - How to configure model preferences

   **Hooks for Context Monitoring**
   - Show context window usage in status line
   - Auto-compact when approaching limits
   - Code example of a context monitoring hook

   **Session Logs**
   - Review what Claude did in past sessions
   - Location: `~/.claude/logs/`
   - Useful for auditing and learning

   **/insights**
   - Generates local HTML report: `~/.claude/usage-data/report.html`
   - Analyzes last 30 days of coding sessions
   - Identifies workflow friction, recurring patterns
   - Actionable feedback on prompting
   - Code example: just type `/insights` in Claude

   **/loop — Built-in Scheduler**
   - Run commands on a recurring basis
   - Usage: `/loop [interval] [prompt]`
   - Examples:
     - `/loop 1h check for new Git issues`
     - `/loop 30m check if the codebase passes all tests, if not, fix it`
   - Session-scoped (terminal must stay active)
   - For persistence: use GitHub Actions or scheduled tasks
   - Resource link: https://claudefa.st/blog/guide/development/scheduled-tasks

**Step 2: Verify in browser**

Check: feature cards expand/collapse, resource links render.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 9 — Claude Power Usage"
```

---

## Task 12: Section 10 — Open Source Frameworks

**Files:**
- Modify: `fsad-playbook.html` (fill Section 10 content)

**Step 1: Write Section 10 content**

Fill the `#open-source` section with:

1. **Section header**: "10 — Open Source Frameworks" with subtitle "Community meta-frameworks for Claude Code"

2. **Intro paragraph**: "These open source projects use combinations of hooks, skills, commands, agents, and workflow orchestration to extend Claude Code's capabilities."

3. **7 Framework Cards** — each as a styled card with:
   - Name + GitHub link
   - One-line description
   - Key stats (agents, commands, skills, hooks counts where available)
   - "What it provides" bullet list

   Cards:
   - **SuperClaude Framework** — Meta-programming config framework. 30+ specialized commands, cognitive personas, behavioral instruction injection.
   - **Claude Forge** — "oh-my-zsh for Claude Code." 11 agents, 40 commands, 15 skills, 15 hooks, 6-layer security.
   - **Ruflo** — Agent orchestration platform. Multi-agent swarms, distributed intelligence, RAG integration.
   - **Agents (wshobson)** — 112 agents, 16 orchestrators, 146 skills, 79 tools in 72 plugins.
   - **Claudekit** — CLI toolkit. Auto-save checkpointing, code quality hooks, 20+ specialized subagents.
   - **Claude Code Hooks Mastery** — Reference implementation for hooks. Meta-agent pattern, team-based validation.
   - **Awesome Claude Code** — Curated directory of the entire Claude Code ecosystem.

4. **Callout-tip**: "Start with Awesome Claude Code to explore the ecosystem, then pick a framework that matches your team's needs."

**Step 2: Verify in browser**

Check: framework cards render with links.

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add Section 10 — Open Source Frameworks"
```

---

## Task 13: Final Polish — FSAD vs Agile Section, Scroll Animations, Final Verification

**Files:**
- Modify: `fsad-playbook.html`

**Step 1: Add scroll animations**

Add IntersectionObserver-based fade-in animations to cards:
- Initial state: `opacity: 0; transform: translateY(20px)`
- On scroll into view: animate to `opacity: 1; transform: translateY(0)`
- Stagger delays for cards in the same row
- CSS: `.animate-in { animation: fadeInUp 0.5s ease forwards; }`

**Step 2: Final verification checklist**

Open `fsad-playbook.html` in browser and verify all 10 success criteria:

1. [ ] Opens in browser with no server (file:// protocol)
2. [ ] All 10 sections have substantive content
3. [ ] Dark/light theme toggle works
4. [ ] Search finds content across sections
5. [ ] Sidebar highlights active section on scroll
6. [ ] Mermaid diagrams render
7. [ ] Code blocks have syntax highlighting + copy buttons
8. [ ] Responsive: sidebar collapses on narrow viewport
9. [ ] File size check: `ls -lh fsad-playbook.html` (target: < 200KB)
10. [ ] No console errors (open browser dev tools)

**Step 3: Commit**

```bash
git add fsad-playbook.html
git commit -m "feat: add scroll animations and final polish"
```

---

## Task 14: Clean Up Legacy Files

**Files:**
- Remove from active use (do NOT delete — user may want to keep as reference)

**Step 1: Verify the new playbook is complete and working**

Run final check: open `fsad-playbook.html`, verify all sections.

**Step 2: Update CLAUDE.md**

Update the project's CLAUDE.md to reflect the new single-file architecture:
- Remove references to sections/, components/, dist/, build.sh
- Point to fsad-playbook.html as the main file
- Update development commands (no build needed)
- Update project description

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for single-file FSAD Playbook architecture"
```

---

## Execution Notes

- **Tasks 1-2** must run sequentially (shell then JS)
- **Tasks 3-12** (content sections) can run in parallel — they're independent section fills
- **Task 13** depends on all content tasks being complete
- **Task 14** is final cleanup

**Estimated total:** ~3,000-4,000 lines of HTML in single file
