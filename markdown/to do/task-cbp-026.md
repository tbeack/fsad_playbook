# CBP-026 — Create a New Subsection on Hooks

## Context

The playbook currently covers hooks in three fragmented places:
1. **Pillar 3** (~line 2419) — Brief "Guardrails" overview with a PostToolUse/PreToolUse example (6 lines of JSON)
2. **Cheat Sheet** (~line 3963) — Reference tables listing all 26 hook events across 4 categories
3. **Power Usage → "Hooks in Practice"** (~line 4208) — A collapsible with 3 small examples (auto-lint, read-before-edit, status line)

**What's missing:** A proper standalone subsection that teaches users *how* hooks work, *when* to use each hook type, the lifecycle flow, configuration structure, exit code semantics, matcher patterns, and practical recipes. The current coverage is surface-level — users can see *what* hooks exist but not *how to build with them*.

## Research Summary (from Anthropic Docs)

### Hook Types (4 types)
| Type | Description |
|------|-------------|
| `command` | Shell commands — receive JSON on stdin, return via exit codes + stdout |
| `http` | JSON POST to endpoints — headers support env var interpolation |
| `prompt` | Single-turn Claude evaluation — returns yes/no decisions |
| `agent` | Spawn subagent with tool access (Read, Grep, Glob) for complex checks |

### Hook Lifecycle (from docs — includes diagram)
```
SessionStart → [Per-turn loop] → UserPromptSubmit → [Agentic loop] →
PreToolUse → PermissionRequest → PostToolUse/PostToolUseFailure →
SubagentStart/Stop → TaskCreated/TaskCompleted → Stop/StopFailure →
TeammateIdle → PreCompact/PostCompact → SessionEnd
```

### Configuration Locations (by scope)
| Location | Scope |
|----------|-------|
| `~/.claude/settings.json` | All projects (local to machine) |
| `.claude/settings.json` | Single project (shareable, committed) |
| `.claude/settings.local.json` | Single project (gitignored) |
| Managed policy settings | Organization-wide (admin) |
| Plugin `hooks/hooks.json` | When plugin is enabled |
| Skill/Agent YAML frontmatter | While component is active |

### Exit Code Semantics (critical for users to understand)
| Exit Code | Behavior |
|-----------|----------|
| `0` | Success — stdout parsed for JSON output |
| `2` | **Blocking error** — blocks tool, rejects prompt, etc. |
| Any other | Non-blocking error — stderr shown, execution continues |

### Matcher Patterns
| Pattern | Evaluated As | Example |
|---------|-------------|---------|
| `"*"`, `""`, or omitted | Match all | Fires on every event |
| Letters/digits/`_`/`\|` only | Exact or pipe-separated list | `Bash` or `Edit\|Write` |
| Contains other chars | JavaScript regex | `^Notebook`, `mcp__.*` |

### Conditional `if` Field
Uses permission rule syntax to narrow triggers:
- `"Bash(git *)"` — only git commands
- `"Bash(rm *)"` — only rm commands
- `"Edit(*.ts)"` — only TypeScript edits
- `"Write(*.md)"` — only Markdown writes

### Key Environment Variables
| Variable | Description |
|----------|-------------|
| `CLAUDE_PROJECT_DIR` | Project root |
| `CLAUDE_PLUGIN_ROOT` | Plugin installation directory |
| `CLAUDE_PLUGIN_DATA` | Plugin persistent data directory |
| `CLAUDE_ENV_FILE` | File path for persisting env vars (SessionStart, CwdChanged, FileChanged) |

## Implementation Plan

### Create New Section: "Hooks Deep Dive" (section 14.5, after Power Usage)

**Or alternatively:** Expand the existing "Hooks in Practice" collapsible in Power Usage into a full standalone section. Given the depth of content, a **new section between Power Usage and Monitoring** is recommended.

### New Section Structure

#### Section Header
- Section number: `14.5` (between Power Usage 14 and Monitoring 15 — or renumber as needed)
- Section ID: `hooks-deep-dive`
- Title: "Hooks — Automation & Guardrails"
- Subtitle: "Automate workflows, enforce policies, and extend Claude Code with event-driven hooks"

#### Content Blocks (all inside the section)

**1. Introduction paragraph**
- What hooks are (user-defined shell commands/HTTP/prompts/agents that fire at lifecycle points)
- The core principle: "Models forget. Hooks don't."
- Link to the Anthropic docs image showing the hook lifecycle diagram

**2. Lifecycle Diagram (reuse from Anthropic docs)**
- Include the hook lifecycle flow image from https://code.claude.com/docs/en/hooks
- Alt text describing the flow
- Caption: "Hook lifecycle — events fire at each stage of Claude Code's execution"

**3. Four Hook Types (styled table or cards)**
- `command` — Shell commands, JSON stdin, exit codes
- `http` — POST to endpoints, header interpolation
- `prompt` — Single-turn LLM evaluation
- `agent` — Subagent with Read/Grep/Glob tools
- Include a small code example for each type

**4. Configuration (collapsible)**
- Where to put hooks (6 locations by scope)
- Settings.json structure with annotated example
- Matcher patterns table
- The `if` field for conditional hooks
- Environment variables available in hook scripts

**5. Exit Codes & Decision Control (collapsible)**
- Exit code 0/2/other semantics
- Which events can block (table)
- The `permissionDecision` options: allow/deny/ask/defer
- Precedence when multiple hooks fire: deny > defer > ask > allow

**6. Practical Recipes (collapsible — expand existing "Hooks in Practice")**
- **Security:** Block destructive commands (`rm -rf`, force push)
- **Quality:** Auto-lint/format after edits, run tests on core file changes
- **Observability:** Log all tool calls, MCP operation monitoring
- **Environment:** Auto-setup via SessionStart (nvm, direnv)
- **Workflow:** Read-before-edit reminder, custom status line
- **Policy:** Prompt-based security review before Bash execution

**7. Best Practices (callout box)**
- Keep hooks fast (especially SessionStart)
- Use exit 2 to enforce (exit 1 is non-blocking!)
- Test with `--debug` flag
- Use `if` field to narrow trigger conditions
- Use `async: true` for fire-and-forget operations
- Reference scripts via `$CLAUDE_PROJECT_DIR`

### Sidebar Nav Update
Add nav entry between "Power Usage" and "Monitoring":
```html
<a class="nav-sub-item" href="#practices/hooks-deep-dive" onclick="scrollToSection('hooks-deep-dive')">Hooks</a>
```

### Section-to-Page Map Update
Add `'hooks-deep-dive': 'practices'` to the `sectionToPageMap` object in JavaScript.

### Cross-References
- Update **Pillar 3** callout to link to the new section: "See the Hooks Deep Dive section for comprehensive guidance"
- Update **"Hooks in Practice"** collapsible in Power Usage — either:
  - **Option A:** Remove it and point to the new section (avoid duplication)
  - **Option B:** Keep as a quick-reference with a "See Hooks section for more" link
- Cheat Sheet hook tables remain as-is (they serve as quick reference)

### Image from Anthropic Docs
- The lifecycle diagram from https://code.claude.com/docs/en/hooks should be referenced or recreated
- If embedding as `<img>`, use the Anthropic docs CDN URL or recreate as an inline SVG/Mermaid diagram
- **Recommended:** Recreate as a Mermaid flowchart (consistent with existing playbook patterns, no external dependency)

## Files to Modify

1. **`fsad-playbook.html`** — Primary changes:
   - Add sidebar nav item (~line 1586)
   - Add `sectionToPageMap` entry in JS
   - Add new `<section id="hooks-deep-dive">` between Power Usage and Monitoring
   - Update Pillar 3 cross-reference (~line 2445)
   - Update or remove "Hooks in Practice" collapsible (~line 4208)

## Verification

- [x] Open `fsad-playbook.html` in browser
- [x] Sidebar shows "Hooks" nav item between "Power Usage" and "Monitoring"
- [x] Click "Hooks" in sidebar — navigates to new section
- [x] All collapsibles in the new section expand/collapse correctly
- [x] Code blocks render with syntax highlighting
- [x] Used ASCII flow diagram (not Mermaid) — renders correctly
- [x] Scroll spy highlights "Hooks" when scrolled into view
- [x] Search finds content in the new section
- [x] Pillar 3 cross-reference links correctly
- [x] No duplicate content between new section and existing hooks coverage
