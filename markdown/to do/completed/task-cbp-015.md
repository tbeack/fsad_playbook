# Task CBP-015 — Review & Update Power Usage Section

## Summary

Audit the "Power Usage" section (section 14, lines 3975–4130) for gaps, inaccuracies, and missing features. Then update to reflect the current Claude Code capabilities as of April 2026.

---

## Current State — 7 Collapsibles

| # | Topic | Assessment |
|---|---|---|
| 1 | **Agent Teams** | Shallow — only 3 bullet points and a link. Missing: how to spawn teammates (`claude --worktree`), `--tmux` flag, `--teammate-mode` options (in-process/tmux), named agents via `@mention`, team leader inheritance of model/permissions, TeammateIdle hook. |
| 2 | **Work Trees** | **Bug:** Code example uses `claude -r feature-name` — wrong flag. `-r` is `--resume`, should be `claude -w feature-name`. Missing: `--tmux` for tmux-paired worktrees, WorktreeCreate/WorktreeRemove hooks. |
| 3 | **Model Auto Selection** | Outdated model descriptions. Missing: `/effort` command (low/medium/high/max/auto), `/fast` toggle, `--fallback-model` for print mode, model version names (Opus 4.6, Sonnet 4.6, Haiku 4.5). |
| 4 | **Hooks for Context Monitoring** | **Inaccurate example** — `du -sh ~/.claude/context` is not a real path. The hook example is fabricated. Should show a real-world hook pattern (e.g., statusLine config, auto-lint on PostToolUse, read-before-edit pattern). Missing: conditional `if` field for hook filtering, the 26 hook events now available. |
| 5 | **Session Logs** | Minor — `~/.claude/logs/` path needs verification. Missing: `/export` command for conversation export, transcript viewer (`Ctrl+O`). |
| 6 | **/insights** | Mostly accurate. Minor: verify report path. |
| 7 | **/loop** | Accurate. Could mention `/schedule` for persistent cloud-based scheduling as a companion feature. |

---

## Gaps — Missing Features (Not Covered)

These major Claude Code power features have no coverage at all:

| Feature | Description | Priority |
|---|---|---|
| **Remote Control** | Control terminal Claude from claude.ai web. `/remote-control`, `--remote`, `/teleport`. Bridge sessions show local git info. | High |
| **Chrome Integration** | `--chrome` flag enables browser automation. Claude can interact with web pages. | High |
| **Scheduled Tasks** | `/schedule` for persistent cloud-based cron scheduling (beyond session-scoped `/loop`). | High |
| **Batch Operations** | `/batch` for orchestrating 5–30 parallel agents for large-scale codebase changes. | High |
| **Voice Input** | `/voice` toggle, push-to-talk with Space bar, 20+ language support. | Medium |
| **Cross-Device** | `/desktop` (continue in desktop app), `/mobile` (QR for mobile app), `/teleport` (web→terminal). | Medium |
| **Effort Levels** | `/effort` command and `--effort` flag for controlling model reasoning depth. | Medium |
| **Plugins** | `/plugin` for managing extensions, `/reload-plugins`, plugin marketplace. | Medium |
| **Context Management** | `/context` for visualizing token usage with optimization suggestions. `/compact` focus mode. | Medium |
| **Status Line** | `statusLine` config in settings.json for custom status bar (command type). | Low |
| **MCP Elicitation** | Interactive mid-task input dialogs via MCP. | Low |

---

## Issues to Fix

1. **Work Trees code block** — Change `claude -r feature-name` to `claude -w feature-name`
2. **Hooks example** — Replace fabricated `du -sh ~/.claude/context` with a real-world hook example
3. **Model section** — Add effort levels, fast mode, current model names
4. **Agent Teams** — Expand with practical setup steps, tmux mode, named agents

---

## Implementation Plan

### Step 1: Fix existing inaccuracies
- Fix worktree flag `-r` → `-w` in code block
- Replace fake hooks example with real-world patterns (e.g., auto-lint, read-before-edit)
- Update model names and add effort/fast mode info

### Step 2: Enhance existing collapsibles
- **Agent Teams:** Add teammate spawning via `--worktree`, tmux mode, named agents, leader inheritance, practical example
- **Work Trees:** Fix command, add `--tmux` flag, mention WorktreeCreate/Remove hooks
- **Model Auto Selection:** Rename to "Model & Effort Control", add `/effort`, `/fast`, `--fallback-model`, current model versions
- **Hooks for Context Monitoring:** Rename to "Hooks in Practice", show 2-3 real hook examples (auto-lint, security check, status line)
- **Session Logs:** Add `/export`, transcript viewer (`Ctrl+O`)
- **/loop:** Add mention of `/schedule` for persistent scheduling

### Step 3: Add new collapsibles for missing features
- **Remote Control & Cross-Device** — `/remote-control`, `/teleport`, `/desktop`, `/mobile`, `--remote`
- **Chrome Integration** — `--chrome` flag, browser automation use cases
- **Batch Operations** — `/batch` for large-scale parallel agent orchestration
- **Plugins** — `/plugin`, `/reload-plugins`, marketplace, plugin directory structure
- **Voice Input** — `/voice`, push-to-talk, language support
- **Context Management** — `/context` visualization, compaction strategies, `/compact` with focus

### Step 4: Update section subtitle
Update subtitle to reflect new coverage: "Agent teams, worktrees, remote control, batch operations, voice, plugins, and more."

### Step 5: Verify in browser
Open and confirm all collapsibles render correctly, code blocks are formatted, no overflow.
