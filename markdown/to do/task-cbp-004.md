# Task CBP-004: Add Codex Best Practices Section

**Status:** Complete
**File:** `fsad-playbook - v7.html`
**Research:** `research-cbp-004.md`

## Objective

Add a comprehensive "Codex Best Practices" section to the Best Practices page, giving engineers a practical guide to OpenAI's Codex CLI — equivalent in depth to the existing Claude Code content. Frame it as a companion tool in the FSAD ecosystem, not a replacement.

## Plan

### Step 1 — Add sidebar nav item

**Location:** Line ~1221, after the "Building Skills" nav item

Insert:
```html
<a class="nav-sub-item" href="#practices/codex-best-practices" onclick="scrollToSection('codex-best-practices')">Codex CLI</a>
```

This places the Codex section between "Building Skills" and "Guidelines" in the sidebar.

---

### Step 2 — Insert section shell

**Location:** After line 2743 (`</section>` closing "Building Skills"), before line 2745 (`<hr class="divider">` before "Best Practices & Guidelines")

Insert a new `<hr class="divider">` + `<section id="codex-best-practices">` with:
- Section label: `11.5 — Codex CLI`
- Title: `Codex CLI Best Practices`
- Subtitle: `Getting productive with OpenAI's open-source coding agent alongside Claude Code`

Using `11.5` keeps it consistent with the `10.5` pattern used for "Code Review Agent" — avoids renumbering all subsequent sections.

---

### Step 3 — Intro paragraph + positioning callout

Add a brief intro (2-3 sentences) explaining what Codex is and why FSAD teams should know it. Follow with a callout:

```html
<div class="callout callout-tip">
  <div class="callout-title">Tool-Agnostic by Design</div>
  <p>FSAD is a methodology, not a tool. While this playbook focuses on Claude Code, the same principles apply to Codex, Gemini CLI, and other coding agents. This section helps teams that use Codex — either as their primary tool or alongside Claude Code.</p>
</div>
```

---

### Step 4 — Comparison table (Claude Code vs Codex)

Add a `.styled-table` with side-by-side comparison covering:

| Concept | Claude Code | Codex CLI |
|---------|------------|-----------|
| Project instructions | `CLAUDE.md` | `AGENTS.md` |
| Config directory | `~/.claude/` | `~/.codex/` |
| Config format | `settings.json` (JSON) | `config.toml` (TOML) |
| Default model | Claude Sonnet / Opus | gpt-5.4 / o4-mini |
| Approval modes | Default, Plan, Bypass | Auto, Read-only, Full Access |
| Sandbox | Per-tool permissions | read-only / workspace-write / full-access |
| MCP support | Client | Client + Server |
| IDE extensions | VS Code | VS Code, Cursor, Windsurf |
| Skills directory | `.claude/skills/` | `.agents/skills/` |
| Multi-agent | Subagents (Task tool) | Agent threads (max_threads config) |

---

### Step 5 — Getting Started steps (4 step cards)

Use `.step-card` pattern matching existing Getting Started section:

1. **Install Codex** — `npm install -g @openai/codex` or `brew install --cask codex`
2. **Authenticate** — ChatGPT account login (`codex` prompts on first run) or set `OPENAI_API_KEY`
3. **Create AGENTS.md** — Project instructions file at repo root (with code block example)
4. **First Run** — `codex "describe this project and suggest improvements"`

---

### Step 6 — AGENTS.md deep dive (collapsible)

Collapsible: **"AGENTS.md: Project Instructions"**

Content:
- Hierarchy diagram (4 levels: `~/.codex/AGENTS.override.md` → `~/.codex/AGENTS.md` → repo root `AGENTS.md` → CWD `AGENTS.md`)
- Example `AGENTS.md` in a code block (parallel to the example CLAUDE.md we added in CBP-002)
- Key differences from CLAUDE.md: override files, 32 KiB limit, `project_doc_max_bytes` config
- Callout tip: teams using both tools can maintain `CLAUDE.md` + `AGENTS.md` side by side with shared conventions

---

### Step 7 — Approval modes & sandbox (collapsible)

Collapsible: **"Approval Modes & Sandbox Security"**

Content:
- Table of 3 approval modes with descriptions and use cases
- Table of 3 sandbox policies with platform notes (macOS Seatbelt, Linux Docker)
- Recommendation matrix: which combination to use for different scenarios (exploration, feature dev, CI/CD)
- Warning callout about `danger-full-access` (only use in containers)

---

### Step 8 — Commands & shortcuts cheat sheet (collapsible)

Collapsible: **"Commands & Keyboard Shortcuts"**

Content:
- CLI commands table (`codex`, `codex exec`, `codex resume`, `codex mcp`, etc.)
- Key flags table (`--model`, `--sandbox`, `--approval-mode`, `--quiet`, `--json`, `-i`)
- Keyboard shortcuts table (Ctrl+C, Ctrl+L, Ctrl+G, Esc×2, Tab)
- Slash commands table (`/plan`, `/review`, `/fork`, `/compact`, `/diff`, `/agent`, `/mcp`)

---

### Step 9 — MCP integration (collapsible)

Collapsible: **"MCP Integration"**

Content:
- TOML config example for adding an MCP server
- Note about Codex as MCP server (`codex mcp-server`) — unique capability
- Comparison to Claude Code's JSON-based MCP config
- Tip callout: same MCP servers work with both tools

---

### Step 10 — Multi-agent workflows (collapsible)

Collapsible: **"Multi-Agent & Parallel Execution"**

Content:
- Config snippet (`[agents]` table in `config.toml`)
- Built-in roles: default, worker, explorer, monitor
- CSV batch processing pattern
- Comparison to Claude Code's subagent/Task approach

---

### Step 11 — Cross-tool workflow callout

Close the section with a best-practice callout:

```html
<div class="callout callout-best-practice">
  <div class="callout-title">Running Both Tools</div>
  <p>Many FSAD teams use both Claude Code and Codex. Keep a CLAUDE.md and AGENTS.md in your repo with shared conventions. Use each tool's strengths: Claude Code for Anthropic model quality, Codex for OpenAI model access and multi-provider flexibility. The FSAD workflow — spec → plan → implement → review — works identically regardless of which agent executes.</p>
</div>
```

---

### Step 12 — Verify

- Open `fsad-playbook - v7.html` in browser
- Navigate to Best Practices → Codex CLI (sidebar)
- Confirm section renders with correct label, title, subtitle
- Confirm comparison table is readable and responsive
- Confirm all 4 step cards render with step numbers
- Confirm all 5 collapsibles open/close with animation
- Confirm code blocks have syntax highlighting and copy buttons
- Confirm callouts render correctly (tip, warning, best-practice)
- Confirm scroll spy updates sidebar when scrolling through the section
- Confirm page indicator pill appears for "Codex CLI"
- Confirm search finds content within the new section
- Confirm no regressions in surrounding sections (Building Skills, Guidelines)

## Estimated Size

~350-450 lines of HTML. Comparable to "Code Review Agent" (lines 2277-2476, ~200 lines) + "Building Skills" (lines 2477-2743, ~266 lines) combined, given the breadth of content.

## Files Modified

- `fsad-playbook - v7.html` — sidebar nav + new section HTML

## No CSS Changes Needed

All content uses existing component patterns: `.styled-table`, `.step-card`, `.collapsible`, `.callout`, `.code-block`, `.section-label`, `.section-title`.

## Acceptance Criteria

- [x] Codex Best Practices is a standalone page (not a child of Claude Best Practices)
- [x] 8 sections mirroring Claude BP structure: Getting Started, Project Anatomy, Integrations, Code Review, Building Skills, Guidelines, Cheat Sheet, Power Usage
- [x] Comparison table with 10 rows comparing Claude Code vs Codex
- [x] 4 step cards for getting started
- [x] AGENTS.md collapsible with hierarchy, example, and dual-tool tip
- [x] Tool-agnostic positioning callout at top
- [x] Cross-tool workflow callout at bottom
- [x] Sidebar nav group with 9 items (Overview + 8 sections)
- [x] All section IDs registered in sectionToPageMap
- [x] pageTitles includes codex entry
- [x] KPIs moved to standalone Page 5 with its own hero and nav group
- [x] "Best Practices" renamed to "Claude Best Practices" across sidebar, hero, footer, and JS
- [x] All div tags balanced across all pages
- [x] All section tags balanced (30 open, 30 close)
- [x] No regressions in surrounding sections
