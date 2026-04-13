# Task CBP-004 Expansion: Codex Page Parity + KPIs Page

**Status:** Not started
**File:** `fsad-playbook - v7.html`

## Objective

1. Expand the Codex Best Practices page to mirror the Claude Best Practices structure (Project Anatomy through Power Usage), adapting all content to Codex equivalents.
2. Move the KPIs section out of Claude Best Practices into its own top-level page (Page 5) in the main navigation.

---

## Part A: Move KPIs to Its Own Page

### What changes

**Remove** the `fsad-metrics` section (~lines 2870-2925) from inside `page-practices`.

**Create** a new `<div class="page" id="page-kpis">` after `page-codex` closes, containing:
- Hero with badge, title "KPIs to Measure <em>Impact</em>", subtitle
- The existing KPIs section content (moved, not rewritten)
- Footer

**Sidebar:** Replace the "KPIs" nav-sub-item inside the practices group with a new nav-group (Group 5):
```
◆ KPIs to Measure Impact
  └ Overview
  └ Metrics
```

**JS updates:**
- `sectionToPageMap`: move `'fsad-metrics': 'practices'` → `'fsad-metrics': 'kpis'`, add `'kpis-hero': 'kpis'`
- `pageTitles`: add `kpis: 'KPIs to Measure Impact'`

---

## Part B: Expand Codex Page — Section-by-Section Plan

The Claude Best Practices page has these sections (08–15). The Codex page currently has only "01 — Getting Started". Below is the Codex equivalent for each remaining Claude section.

### Existing (already built)
| # | Claude Section | Codex Section | Status |
|---|---------------|---------------|--------|
| 08 | Getting Started | 01 — Getting Started | Done |

### New sections to add

#### 02 — Anatomy of a Codex Project
**Mirrors:** Claude section 09 — "Anatomy of a Claude Code Project"

Codex equivalent pillars:
- **Pillar 1: AGENTS.md = Repo Memory** — Same concept as CLAUDE.md. Show example AGENTS.md with project overview, tech stack, conventions, commands. Tip about hierarchy (4-level merge).
- **Example: A Production AGENTS.md** — Collapsible with a real-world example (adapt the Claude example to AGENTS.md format).
- **Pillar 2: .agents/skills/ = Reusable Expert Modes** — Codex skills use `SKILL.md` files inside `.agents/skills/`. Show skill file anatomy with frontmatter.
- **Pillar 3: Shell Tool MCP = Guardrails** — Codex uses `.rules` files via the Shell Tool MCP to allow/prompt/forbid specific commands. Show `.rules` file example.
- **Pillar 4: docs/ = Progressive Context** — Same concept — Codex reads docs on demand. Identical pattern.
- **Pillar 5: Local AGENTS.md for Risky Modules** — Same pattern as local CLAUDE.md. Show example `src/auth/AGENTS.md`.
- **Project Structure Map** — Code block showing the Codex project tree (`AGENTS.md`, `.codex/`, `.agents/skills/`, `docs/`, etc.)

**Sidebar nav item:** `Project Anatomy`

#### 03 — Integrations (MCP)
**Mirrors:** Claude section 10 — "Integrations"

Content:
- Intro showing Codex MCP flow diagram (same tools, TOML config format)
- Collapsibles for each integration, each showing the **TOML** config instead of JSON:
  - JIRA MCP (TOML config)
  - Figma MCP (TOML config)
  - Notion MCP (TOML config)
  - Azure DevOps MCP (TOML config)
  - Google Docs MCP (TOML config)
- Tip callout: "Same servers, different config format. TOML in `config.toml` vs JSON in `settings.json`."
- Note: Codex can also act as an MCP server (`codex mcp-server`)

**Sidebar nav item:** `Integrations (MCP)`

#### 04 — Code Review
**Mirrors:** Claude section 10.5 — "Code Review Agent"

Content:
- `/review` slash command — Codex's built-in code review that analyzes diffs without modifying code
- How to use: `codex` then `/review`, or review on a specific PR
- Comparison to Claude's multi-agent code review approach
- Callout: Codex review is single-agent by default vs Claude's multi-agent fleet

**Sidebar nav item:** `Code Review`

#### 05 — Building Skills
**Mirrors:** Claude section 11 — "Building Your Own Skills"

Content:
- Codex skills live in `.agents/skills/` with a `SKILL.md` file plus optional scripts, references, and assets
- Skill file anatomy — `SKILL.md` frontmatter + instructions (similar structure to Claude skills but different directory)
- Example skills (adapt Claude examples to Codex format):
  - Code review skill
  - Deployment skill
  - Estimation skill
- Creating skills: Codex uses `/init` or manual creation
- Tip: Skills can include shell scripts and reference files alongside the markdown

**Sidebar nav item:** `Building Skills`

#### 06 — Best Practices & Guidelines
**Mirrors:** Claude section 12 — "Best Practices & Guidelines"

Content (adapted for Codex):
- **Prompting** card grid:
  - Be specific about what, not how
  - Provide business context
  - Use `@` file references (Tab key for fuzzy search)
  - Use `/plan` mode first for complex tasks
- **Project Structure** card grid:
  - Keep AGENTS.md focused and under 32 KiB
  - Use `.agents/skills/` for repeatable workflows
  - Put detailed docs in `docs/` for progressive context
  - Use local AGENTS.md for sensitive modules
- **Anti-patterns** — common mistakes:
  - Over-permissive sandbox (`danger-full-access` outside containers)
  - Bloated AGENTS.md
  - Ignoring the session resume feature
  - Not using `/compact` to manage context

**Sidebar nav item:** `Guidelines`

#### 07 — Codex Cheat Sheet
**Mirrors:** Claude section 13 — "Claude Cheat Sheet"

Content — tables adapted from the existing Codex collapsible (Commands & Keyboard Shortcuts), but expanded to match cheat sheet depth:
- **Keyboard Shortcuts** table (already researched)
- **Slash Commands** table (already researched)
- **CLI Flags** table (already researched)
- **Configuration Reference** table — key `config.toml` settings:
  - `model`, `approval_policy`, `sandbox_mode`, `project_doc_max_bytes`
  - `[agents]` section (max_threads, max_depth)
  - `[mcp_servers]` section
- **Environment Variables** table — `OPENAI_API_KEY`, `CODEX_DISABLE_PROJECT_DOC`, `CODEX_CA_CERTIFICATE`

**Sidebar nav item:** `Cheat Sheet`

#### 08 — Codex Power Usage
**Mirrors:** Claude section 14 — "Claude Power Usage"

Content — collapsibles for advanced features:
- **Multi-Agent Workflows** — Agent threads, roles (default/worker/explorer/monitor), CSV batch processing. Already written in the current collapsible — expand with more detail.
- **Conversation Forking** — `/fork` clones conversation to new thread. Useful for exploring alternatives without losing context.
- **Session Management** — `codex resume` with session picker, `--last` flag, `--ephemeral` for throwaway sessions.
- **CI/CD Integration** — `codex exec` for headless mode, `--json` for machine output, `--output-schema` for structured responses, `--quiet` for scripting.
- **Multi-Provider Models** — Configuring Azure, Ollama, Gemini, Mistral, DeepSeek, xAI, Groq, OpenRouter as model backends.
- **Codex Cloud** — `codex cloud` for remote execution, web interface at chatgpt.com/codex.

**Sidebar nav item:** `Power Usage`

---

## Implementation Order

1. **Part A** — Move KPIs to own page (small, surgical)
2. **Section 02** — Project Anatomy (largest section, sets the foundation)
3. **Section 03** — Integrations (adapt JSON→TOML configs)
4. **Section 04** — Code Review (small section)
5. **Section 05** — Building Skills (adapt skill format)
6. **Section 06** — Guidelines (card grids, mostly new text)
7. **Section 07** — Cheat Sheet (tables, expand existing content)
8. **Section 08** — Power Usage (collapsibles, mostly new text)

After each section, remove the corresponding collapsible from the existing "Getting Started" section if it duplicates content (e.g., the Commands & Shortcuts and Multi-Agent collapsibles will move to their own sections).

## Final Codex Page Sidebar Structure

```
◈ Codex Best Practices
  ├ Overview
  ├ Getting Started
  ├ Project Anatomy
  ├ Integrations (MCP)
  ├ Code Review
  ├ Building Skills
  ├ Guidelines
  ├ Cheat Sheet
  └ Power Usage
```

## Final Main Navigation

```
◆ Full Stack Agentic Development
◇ Pod Compositions
◇ Claude Best Practices
◈ Codex Best Practices
◆ KPIs to Measure Impact
```

## JS Updates Summary

**sectionToPageMap additions:**
```javascript
'codex-project-anatomy': 'codex',
'codex-integrations': 'codex',
'codex-code-review': 'codex',
'codex-building-skills': 'codex',
'codex-guidelines': 'codex',
'codex-cheat-sheet': 'codex',
'codex-power-usage': 'codex',
'kpis-hero': 'kpis',
'fsad-metrics': 'kpis'  // moved from 'practices'
```

**pageTitles addition:**
```javascript
kpis: 'KPIs to Measure Impact'
```

## Estimated Size

- Part A (KPIs move): ~20 lines changed
- Sections 02-08: ~800-1000 lines of new HTML total
- Heaviest sections: Project Anatomy (~200 lines), Cheat Sheet (~150 lines), Power Usage (~150 lines)

## Verification

1. Open file in browser
2. Confirm 5 pages in sidebar: FSAD, Pods, Claude Best Practices, Codex Best Practices, KPIs
3. Navigate to each Codex section via sidebar — all render correctly
4. Confirm KPIs page loads independently with its own hero
5. Confirm all collapsibles open/close, code blocks have copy buttons
6. Confirm scroll spy and page indicator work for all new sections
7. Confirm search indexes content from all new sections
8. Confirm no regressions on Claude Best Practices page (KPIs removed cleanly)
