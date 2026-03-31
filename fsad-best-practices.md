# FSAD Best Practices

**Full Stack Agentic Development — Practical Implementation Guide**

> From zero to spec-driven development. Project setup, integrations, skills, cheat sheets, power usage, and open source frameworks for Claude Code.

---

## How to Get Started

### From Zero to Spec-Driven Development

Six steps to adopt FSAD on your next feature. Each step builds on the previous one.

#### Step 1: Start in Planning Mode

Use existing Figma mockups and PRDs as initial context. Feed Claude your existing documentation before writing new specs.

```bash
claude --conversation-mode plan
```

> **Tip:** Plan mode is read-only — Claude can analyze your codebase and help write specs without modifying any files.

#### Step 2: Create spec.md

Iterate with Claude until the spec covers everything needed to build. Include user stories, acceptance criteria, technical constraints, and UX decisions.

```markdown
# Feature: [Name]

## Problem Statement
What problem are we solving and for whom?

## User Stories
- As a [role], I want [action] so that [outcome]

## Technical Spec
- Data model, API contracts, performance requirements

## UX Decisions
- Component choices, interaction patterns, responsive behavior

## Acceptance Criteria
- [ ] Criterion 1 — testable, specific
- [ ] Criterion 2 — measurable outcome
```

#### Step 3: Build roadmap.md

Organize implementation into phases. Track what's done, what's next, and what's blocked.

```markdown
# Roadmap

## Phase 1: Foundation ✅
- [x] Database schema
- [x] API scaffolding

## Phase 2: Core Feature 🔄
- [x] Backend logic
- [ ] Frontend components
- [ ] Integration tests

## Phase 3: Polish
- [ ] Error handling
- [ ] Loading states
- [ ] Accessibility audit
```

#### Step 4: Build state.md

Track current project state for session resumption. What's been built, what decisions were made, current blockers.

```markdown
# Project State

## Current Phase: 2 — Core Feature
## Status: In Progress

## Completed
- Database schema with migrations
- REST API endpoints (CRUD)

## In Progress
- Frontend form components

## Key Decisions
- Chose Zustand over Redux for state management
- Using server-side validation only (no client dupe)

## Blockers
- Waiting on design review for mobile layout
```

#### Step 5: Break Into Phases

Each phase should fit within a context window. One phase = one focused area of work. If a phase feels too big, split it.

> **Tip:** Context window limits are real. A phase that tries to do too much will result in agents losing track of requirements. Keep phases focused and atomic.

#### Step 6: Create architecture.md

Describe overall architecture and tech stack. Include system diagram, data flow, and key dependencies.

```
Client (React) ──▶ API Gateway (Express) ──▶ Auth Service
                                           ──▶ Core Service ──▶ PostgreSQL
                                                             ──▶ Redis Cache
                                                             ──▶ Job Queue (Bull)
```

> **Best Practice:** The document-driven workflow means your specs, roadmap, and state files ARE your project management system. No separate tool needed. Everything is version-controlled, diffable, and readable by both humans and agents.

---

## Anatomy of a Claude Code Project

### Claude Needs 4 Things

The why, the map, the rules, the workflows. Structure is permanent; prompting is temporary.

> **Key Insight:** Prompting is temporary. Structure is permanent. A well-organized project gives Claude context automatically — every session, every agent, every teammate.

### Pillar 1: CLAUDE.md = Repo Memory

Contains WHY (purpose), WHAT (repo map), HOW (rules + commands). Claude reads this file automatically at the start of every session. Keep it short — if too long, the model misses important context.

```markdown
# CLAUDE.md

## Project Overview
E-commerce API — Node.js + PostgreSQL. Handles product catalog,
orders, and payments.

## Tech Stack
- Runtime: Node.js 20, TypeScript
- Database: PostgreSQL 15 + Prisma ORM
- Testing: Vitest, coverage > 80%

## Commands
- `npm run dev` — start dev server
- `npm test` — run tests
- `npm run lint` — lint + format

## Rules
- Never modify migration files after they've been applied
- All API endpoints require authentication middleware
- Use Zod for request validation, not manual checks
```

> **Tip:** Use `/init` to auto-generate a starting CLAUDE.md from your existing project. Keep it under 100 lines.

### Pillar 2: .claude/skills/ = Reusable Expert Modes

Turn common workflows into skills: code review checklist, refactor playbook, release procedure, debugging flow. Provides consistency across sessions and teammates.

```markdown
---
name: code-review
description: Structured code review with security and quality checks
---

# Code Review

## Process
1. Check for security vulnerabilities (OWASP Top 10)
2. Verify error handling covers edge cases
3. Check test coverage for new code paths
4. Review naming conventions match project style
5. Verify no secrets or credentials in code

## Checklist
- [ ] No SQL injection vectors
- [ ] Input validation on all endpoints
- [ ] Tests cover happy path + error cases
- [ ] No console.log statements left behind
```

### Pillar 3: .claude/hooks/ = Guardrails

For deterministic actions: run formatter after edits, run tests on core changes, block unsafe directories. **Models forget. Hooks don't.**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "command": "npx prettier --write $file"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit",
        "command": "echo $file | grep -v 'node_modules\\|dist\\|.env'"
      }
    ]
  }
}
```

> **Important:** Hooks run shell commands automatically. Use them for formatting, linting, and safety checks — not for business logic.

### Pillar 4: docs/ = Progressive Context

Architecture overview, ADRs (engineering decisions), operational runbooks. Don't bloat prompts — put detailed docs in files Claude can read when needed.

```
docs/
├── architecture.md        # System design overview
├── adr/                   # Architecture Decision Records
│   ├── 001-use-prisma.md
│   ├── 002-auth-strategy.md
│   └── 003-caching-layer.md
├── runbooks/              # Operational procedures
│   ├── deploy.md
│   └── incident-response.md
└── api/                   # API documentation
    └── endpoints.md
```

Claude discovers and reads these files on demand when working in related areas. The key is *progressive* context — only loaded when relevant.

### Pillar 5: Local CLAUDE.md for Risky Modules

Place small CLAUDE.md files near sharp edges. Claude sees gotchas exactly when working in that directory.

```markdown
# src/auth/CLAUDE.md

## Critical: Authentication Module

- NEVER modify the JWT signing key rotation logic
- Token refresh uses sliding window — do not change to fixed expiry
- Rate limiting is per-IP, configured in middleware (not here)
- All changes to this module require security review
- Test with: `npm test -- --grep "auth"`
```

Good candidates: `src/auth/`, `src/billing/`, `src/persistence/`, `infra/`

### Project Structure Map

```
my-project/
├── CLAUDE.md                    # Repo memory (auto-loaded)
├── .claude/
│   ├── settings.json            # Project settings (committed to git)
│   ├── skills/                  # Reusable expert modes
│   │   ├── code-review.md
│   │   └── deploy.md
│   └── commands/                # Custom slash commands
│       └── test-suite.md
├── docs/                        # Progressive context
│   ├── architecture.md
│   └── adr/
├── src/
│   ├── auth/
│   │   └── CLAUDE.md            # Local guardrails
│   └── billing/
│       └── CLAUDE.md            # Local guardrails
└── spec.md                      # Feature specification
```

---

## Integrations

### Connect Claude to Your Tools via MCP

Model Context Protocol (MCP) is the universal adapter between AI models and your existing tools — databases, APIs, design tools, project management.

```
Claude Code ──▶ MCP Protocol ──▶ JIRA
                              ──▶ Figma
                              ──▶ Notion
                              ──▶ Azure DevOps
                              ──▶ Google Docs
```

### JIRA MCP

Read, create, and update JIRA issues directly from Claude. Search issues, transition statuses, add comments, and manage sprints without leaving the terminal.

```json
// .claude/settings.json or ~/.claude/.mcprc
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-atlassian"],
      "env": {
        "ATLASSIAN_SITE_URL": "https://your-org.atlassian.net",
        "ATLASSIAN_USER_EMAIL": "your@email.com",
        "ATLASSIAN_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

**Example usage:** "Create a JIRA ticket for this bug in the AUTH project" or "Show me all in-progress tickets assigned to me"

### Figma MCP

Read Figma designs, extract component specs, colors, typography, and layout details. Implement designs with 1:1 visual fidelity directly from Figma files.

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

**Example usage:** "Implement the login page from this Figma file: [URL]" or "Extract the color palette from our design system"

### Notion MCP

Search, read, create, and update Notion pages and databases. Pull specs from Notion, sync task status, and create documentation.

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "your-notion-integration-token"
      }
    }
  }
}
```

**Example usage:** "Find the spec in Notion and implement the user stories" or "Create a Notion page documenting this API"

### Azure DevOps MCP

Manage work items, repos, and pipelines in Azure DevOps. Create and update work items, query boards, and trigger builds.

```json
{
  "mcpServers": {
    "azure-devops": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-azure-devops"],
      "env": {
        "ADO_ORG_URL": "https://dev.azure.com/your-org",
        "ADO_PAT": "your-personal-access-token"
      }
    }
  }
}
```

**Example usage:** "Create a work item for this feature in the Sprint 12 backlog" or "Show me the status of the deploy pipeline"

### Google Docs MCP

Read and write Google Docs. Pull requirements from shared docs, generate documentation, and sync content between your codebase and Google Workspace.

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-google-docs"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

**Example usage:** "Read the PRD from this Google Doc and create a spec.md" or "Write the API docs to our shared Google Doc"

> **Tip:** You can run multiple MCPs simultaneously. Claude auto-discovers available tools from all connected servers. Configure them in `~/.claude/.mcprc` for global access or `.claude/settings.json` for project-specific integrations.

---

## Building Your Own Skills

### Turn Repeatable Workflows into Reusable Expert Modes

Skills are markdown files that define specialized workflows. Claude loads them on demand via slash commands, providing consistency across sessions and team members.

**What are Skills?** Skills are markdown instructions stored in `.claude/skills/` that Claude follows when invoked. They turn tribal knowledge — code review checklists, deployment procedures, estimation frameworks — into repeatable, shareable workflows.

### Skill File Anatomy

```markdown
---
name: my-skill
description: What this skill does (shown in /help)
---

# Skill Name

## Overview
[What this skill accomplishes and when to use it]

## Process
[Step-by-step instructions Claude follows]

1. First, do this
2. Then, check that
3. Finally, verify this

## Checklist
- [ ] Step 1 complete
- [ ] Step 2 verified
- [ ] Output reviewed
```

**Scope:**

| Level | Path | Visibility |
|---|---|---|
| Project-Level | `.claude/skills/skill-name.md` | Committed to repo. Shared with team. |
| Global | `~/.claude/skills/skill-name.md` | Personal. Available across all projects. |

### Example: Documentation Skill

Auto-generates project documentation from codebase analysis.

```markdown
---
name: generate-docs
description: Generate project documentation from codebase
---

# Documentation Generator

## Process
1. Read CLAUDE.md and architecture docs
2. Scan src/ for all public APIs and exported functions
3. For each module:
   - Extract function signatures and types
   - Read inline comments and JSDoc
   - Generate usage examples
4. Create docs/api-reference.md with:
   - Module index
   - Function signatures with descriptions
   - Code examples
5. Verify all links resolve correctly
```

### Example: Story Point Estimation Skill

Estimates story points using Fibonacci scale based on complexity analysis.

```markdown
---
name: estimate
description: Estimate story points for tasks using Fibonacci scale
---

# Story Point Estimation

## Scale
- 1: Trivial change, single file, < 30 min
- 2: Small change, 2-3 files, < 2 hours
- 3: Moderate, multiple files, half day
- 5: Significant, cross-module, full day
- 8: Large, architectural impact, 2-3 days
- 13: Epic-sized, needs decomposition

## Process
1. Read the task/story description
2. Identify affected files and modules
3. Assess: complexity, unknowns, dependencies, risk
4. Compare to reference stories if available
5. Provide estimate with reasoning:
   - Complexity factors
   - Risk factors
   - Suggested decomposition if > 8 points
```

### Example: Epic to Stories Skill

Breaks down epics into implementable user stories with acceptance criteria.

```markdown
---
name: epic-to-stories
description: Break down epics into implementable user stories
---

# Epic Decomposition

## Process
1. Read the epic description and acceptance criteria
2. Identify distinct user capabilities needed
3. For each capability, create a story:
   - Title: "As a [role], I can [action]"
   - Description: What and why
   - Acceptance criteria: Testable, specific
   - Dependencies: Which stories must complete first
4. Order stories by dependency graph
5. Flag stories that need design input
6. Estimate each story using Fibonacci scale

## Output Format
For each story:
### Story [N]: [Title]
**As a** [role] **I can** [action] **so that** [value]
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
**Dependencies:** [Story refs]
**Estimate:** [points]
```

### Example: Code Review Skill

Structured code review with security, performance, and style checks.

```markdown
---
name: code-review
description: Structured code review for PRs
---

# Code Review

## Security (Critical — block merge if failed)
- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities
- [ ] No secrets/credentials in code
- [ ] Input validation on all external boundaries
- [ ] Auth checks on all protected routes

## Logic
- [ ] Edge cases handled
- [ ] Error handling is appropriate (not swallowed)
- [ ] No race conditions in async code
- [ ] Data validation matches schema

## Quality
- [ ] Tests cover new code paths
- [ ] No dead code introduced
- [ ] Naming follows project conventions
- [ ] No unnecessary complexity

## Output
Provide: ✅ Approve, 🔄 Request Changes, or 🚫 Block
With specific line-level feedback for each issue.
```

> **Best Practice:** Start with one skill for your most repeated workflow. Add more as patterns emerge. A team of 3-4 engineers typically needs 5-8 shared skills to cover their common workflows.

---

## Best Practices & Guidelines

### Lessons from Real-World FSAD Adoption

> **Background Context Matters:** Avoid over-emphasis on technical capabilities. Insufficient business context hurts initial coding sessions. A holistic approach beyond engineering-only specifications yields best results. Include background details, business context, problems to be solved, and design systems.

### Prompting

**Be Specific About What, Not How** — Tell Claude what outcome you want, not the implementation steps. Let the agent choose the approach based on codebase context.

**Provide Business Context** — Include business requirements, constraints, and existing patterns. "We need a user preferences API because mobile users complain about notification noise" is better than "add a PATCH endpoint."

**Use @ References** — Point Claude at specific files with `@filename`. This ensures the right context is loaded and prevents the agent from searching in the wrong places.

**Use Plan Mode First** — For complex features, start with `--conversation-mode plan`. Let Claude analyze and propose before making changes. Review the plan, then execute.

### Project Structure

**Keep CLAUDE.md Concise** — Under 100 lines. If it's too long, Claude may miss critical rules. Move detailed docs to `docs/` for progressive loading.

**Use Local CLAUDE.md Files** — Place module-specific rules near the code they protect. `src/auth/CLAUDE.md` gets loaded when Claude works in that directory.

**Organize docs/ for Progressive Context** — Architecture overview, ADRs, and runbooks in `docs/`. Claude reads them when relevant, not every session.

**Version Control Your Prompts** — Specs, skills, and configuration are code. Commit them. Review changes in PRs. Roll back if something breaks.

### Workflow

**Use /clear Between Tasks** — Reset context between unrelated tasks. Stale context from a previous task can mislead agents on the current one.

**Use /compact When Context Gets Large** — Compress conversation history to free up context window space for the current task. Especially useful in long sessions.

**Commit Frequently** — Small, atomic changes. Each commit should represent one logical unit of work. Makes it easy to revert if an agent goes off track.

**Review Agent Output Before Shipping** — Agents produce consistent code from specs, but they can hallucinate or over-interpret. Human review is non-negotiable.

### Common Pitfalls

🚫 **Jumping Straight to Code** — Without a spec, agents guess at requirements. The result is wasted cycles and code that doesn't match what was needed.

🚫 **Technical Specs Without Business Context** — "Add a PATCH endpoint" tells the agent what to build but not why. Missing context leads to wrong trade-offs.

🚫 **Not Using Plan Mode** — For complex features, jumping straight to implementation means no opportunity to catch misunderstandings before they become code.

🚫 **Ignoring Context Window Limits** — Overloading a session with too many files or too large a scope causes the agent to lose track of requirements mid-task.

🚫 **Not Reviewing Agent Code** — Agents are powerful but non-deterministic. Code that passes tests can still have logic errors, security gaps, or architectural drift.

🚫 **Bloated CLAUDE.md** — Stuffing every rule into CLAUDE.md defeats the purpose. Keep it focused on high-level rules; use docs/ and local CLAUDE.md for details.

---

## Claude Cheat Sheet

### Everything You Need in One Place

### Keyboard Shortcuts

| Key | Action |
|---|---|
| `Enter` | Send message / submit |
| `Esc` | Interrupt / stop generation |
| `Esc` `Esc` | Open recent items (go back in conversation or history) |
| `Shift+Tab` | Cycle permission mode: Normal → Auto-Accept → Plan |
| `Ctrl+L` | Clear screen |
| `Ctrl+C` | Cancel current operation (hard stop) |
| `Ctrl+R` | Search command history |
| `Ctrl+J` | Toggle task list |
| `Tab` | Accept autocomplete suggestion |
| `Ctrl+E` | Toggle editor mode (multi-line editing) |
| `Ctrl+X` | Toggle extended thinking mode |
| `Ctrl+S` | Stash current prompt (save for later) |
| `Ctrl+P` | Paste image (screenshots, diagrams) |
| `↑` / `↓` | Navigate through command history |
| `Ctrl+A` / `Ctrl+E` | Jump to start / end of line |
| `Ctrl+W` | Delete word backward |
| `Ctrl+K` | Delete from cursor to end of line |
| `Ctrl+Z` | Undo last action |

### Slash Commands

| Command | Description |
|---|---|
| `/history` | View conversation history (fresh start) |
| `/compact [focus]` | Compress context to save tokens. Optional: tell it what to keep. |
| `/undo` | Undo last action |
| `/export` | Export conversation to file or clipboard |
| `/cost` | Show session cost & token usage |
| `/usage` | Show usage & rate info |
| `/model` | Open settings panel (Sonnet / Opus / Haiku) |
| `/permissions` | View & edit permissions |
| `/vim` | Toggle vim mode for input |
| `/terminal-setup` | Setup Shift+Enter for multi-line input |
| `/theme` | Toggle theme (dark/light) |
| `/doctor` | Environment diagnostics & health check |
| `/mcp` | Manage MCP servers |
| `/keys` | Manage API keys |
| `/memory` | View auto-memory files |
| `/init` | Create CLAUDE.md for your project |
| `/pr_comments` | View GitHub PR feedback |
| `/install-github-app` | Setup automated PR reviews |
| `/logout` | Sign out |

### CLI Launch Flags

| Flag | Description |
|---|---|
| `claude` | Start interactive session |
| `claude "query"` | Start with an initial prompt |
| `claude -p "query"` | Print mode — answer & exit (for scripting) |
| `--output-format json` | JSON output (details by name or ID) |
| `claude -r` | Start in isolated git worktree |
| `--model` | Select specific model |
| `--continue` / `-c` | Resume last conversation |
| `--conversation-mode plan` | Start in plan mode (read-only) |
| `--budget` | Limit conversation budget ($) |
| `--max-turns` | Limit number of turns |
| `--allowedTools` | Whitelist specific tools |
| `--disallowedTools` | Blacklist specific tools |
| `--output-format stream-json` | Streaming JSON output |
| `--verbose` | Show detailed logging |

### Permission Modes

| Mode | Behavior |
|---|---|
| **Normal** | Claude asks permission for every tool use. Safest mode. Good for unfamiliar codebases. |
| **Auto-Accept** | No prompts. Fastest execution. Use when you trust the agent and want maximum speed. |
| **Plan Mode** | Read-only. Claude ONLY reads & plans. Won't write or edit files. Perfect for spec creation and analysis. |

Cycle between modes: `Shift+Tab` — Normal → Auto-Accept → Plan → Normal

### Hooks — Event Automation

| Hook | When It Fires |
|---|---|
| `PreToolUse` | Before EVERY Claude tool use — check models, audit changes |
| `PostToolUse` | After EVERY tool use — lint, format, auto-fix |
| `PreUserInput` | Before your message is processed |
| `Stop` | When Claude finishes its complete response |
| `SessionStart` | When a session begins |
| `SessionEnd` | When a session ends |

### Input Superpowers

**@mention** — Type `@` to reference files & folders. Claude includes file contents.

**#prefix** — Type `#` for available commands (like `#fix-bug`).

**Paste Images** — `Ctrl+P` or paste screenshots, diagrams, error messages directly.

**Pipe Input** — `cat error.log | claude "fix this"` — pipe stdout directly to Claude.

**Multi-Dir** — `claude -w src/ -w tests/` — work across multiple directories.

**Background** — `Ctrl+Z` sends a task to background so you can start another.

### File Structure Map

```
PROJECT (.claude/)                  GLOBAL (~/.claude/)
├── CLAUDE.md         # Project     ├── CLAUDE.md         # Global memory
├── settings.json     # Shared      ├── settings.json     # Personal
├── commands/         # Slash cmds   ├── skills/           # Personal skills
├── skills/           # Expert modes ├── todos/            # Task management
└── agents/           # Sub-agents   ├── .mcprc            # MCP server configs
                                     └── keybindings.json  # Custom keybindings
```

### Quick Reference — Most Used Combos

| Action | Command |
|---|---|
| Start project | `cd project && claude` |
| Continue where I left off | `claude -c` |
| Quick question, no session | `claude -p "how do I..."` |
| Review & fix this file | `claude "review @file.ts"` |
| Explore error | `cat error.log \| claude -p "fix"` |
| Parallel sessions | `claude -r` (each gets own worktree) |
| Force model | `claude --model opus` |
| Scriptable automation | `claude -p --output-format json "task"` |

---

## Claude Power Usage

### Advanced Features for Power Users

### Agent Teams

Multiple Claude instances collaborating on the same codebase. Each agent works independently with its own context, but they share the same repo and can coordinate through files.

- Frontend + backend agents working in parallel
- Writer + reviewer pattern: one implements, another reviews
- Research agent gathers context while implementation agent builds

📎 [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)

### Work Trees

Isolated git worktrees for parallel work. Each agent gets its own branch and working directory. Changes merge back when complete.

```bash
# Start Claude in a new worktree
claude -r feature-name

# Each worktree is a full repo checkout
# Agents can work simultaneously without conflicts
# Changes are merged back via standard git merge/PR
```

> **Tip:** Worktrees are automatically cleaned up when the agent completes with no changes. If changes were made, the worktree path and branch are returned.

### Model Auto Selection

Claude picks the right model for the task. Sonnet for routine operations (file reads, simple edits). Opus for complex reasoning (architecture, debugging, multi-step plans).

- **Haiku:** Quick lookups, simple questions, file navigation
- **Sonnet:** Standard coding, refactoring, test writing
- **Opus:** Complex architecture, debugging, multi-file changes

Force a specific model with `--model opus` or `--model sonnet` when you know the task complexity.

### Hooks for Context Monitoring

Show context window usage in the status line. Auto-compact when approaching limits.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "command": "echo 'Context: ~$(du -sh ~/.claude/context 2>/dev/null | cut -f1)'"
      }
    ]
  }
}
```

### Session Logs

Review what Claude did in past sessions. Useful for auditing agent behavior and learning from successful patterns.

- Location: `~/.claude/logs/`
- Each session is logged with timestamps
- Includes tool calls, file changes, and conversation flow
- Useful for debugging "what did the agent do while I was away?"

### /insights — Workflow Analysis

Generates a local HTML report analyzing your last 30 days of coding sessions.

- Report location: `~/.claude/usage-data/report.html`
- Identifies workflow friction and recurring patterns
- Actionable feedback on prompting effectiveness
- Tracks which tools and models you use most

```bash
# Just type in Claude:
/insights

# Opens a local HTML report in your browser
```

### /loop — Built-in Scheduler

Run commands on a recurring basis. Session-scoped — terminal must stay active.

```bash
# Check for new issues every hour
/loop 1h check for new Git issues and triage them

# Run tests every 30 minutes and fix failures
/loop 30m check if the codebase passes all tests, if not, fix it

# Monitor deployment status
/loop 15m check the deploy pipeline status and notify me of failures
```

> **For Persistence:** Session-scoped loops stop when the terminal closes. For persistent scheduling, use GitHub Actions, cron jobs, or [scheduled tasks](https://claudefa.st/blog/guide/development/scheduled-tasks).

---

## Open Source Frameworks

### Community Meta-Frameworks for Claude Code

These open source projects use combinations of hooks, skills, commands, agents, and workflow orchestration to extend Claude Code's capabilities.

| Framework | Description | Highlights |
|---|---|---|
| [SuperClaude](https://github.com/nicobailey/superclaude) | Meta-programming config framework. Turns Claude Code into an opinionated development platform. | 30+ commands, cognitive personas |
| [Claude Forge](https://github.com/anthropics/claude-forge) | "oh-my-zsh for Claude Code." Comprehensive extension framework with a 6-layer security model. | 11 agents, 40 commands, 15 skills, 15 hooks |
| [Ruflo](https://github.com/ruflo/ruflo) | Agent orchestration platform. Multi-agent swarms, distributed intelligence, and RAG integration. | Multi-agent swarms, RAG integration |
| [Agents (wshobson)](https://github.com/wshobson/agents) | The largest collection of Claude Code extensions. Massive library organized into plugins. | 112 agents, 16 orchestrators, 146 skills, 79 tools |
| [Claudekit](https://github.com/anthropics/claudekit) | CLI toolkit focused on developer experience. Auto-save checkpointing and quality hooks. | 20+ subagents, checkpointing, quality hooks |
| [Claude Code Hooks Mastery](https://github.com/anthropics/claude-code-hooks-mastery) | Reference implementation for hooks. Meta-agent pattern and team-based validation. | Meta-agent pattern, hook reference |
| [Awesome Claude Code](https://github.com/anthropics/awesome-claude-code) | Curated directory of the entire Claude Code ecosystem. | Curated directory, ecosystem overview |

> **Tip:** Start with Awesome Claude Code to explore the ecosystem, then pick a framework that matches your team's needs. You don't need all of them — most teams benefit from 1-2 frameworks plus custom skills.

---

*Full Stack Agentic Development — spec-driven, agentic-first, markdown-native.*
