# Task CBP-014 — Review & Update Claude Cheat Sheet

## Summary

Compare the current Cheat Sheet (section 13) and Power Usage (section 14) against the latest Claude Code reference (April 2026). Fix inaccuracies and add missing commands/features.

---

## Current State Audit

### Keyboard Shortcuts (19 listed) — Issues Found

| Current Entry | Issue | Fix |
|---|---|---|
| `Ctrl+J` → "Toggle task list" | Wrong shortcut | Change to `Ctrl+T` |
| `Ctrl+E` → "Toggle editor mode" | Inaccurate | Change to `Ctrl+G` or `Ctrl+X Ctrl+E` → "Open in external text editor" |
| `Ctrl+X` → "Toggle extended thinking" | Wrong shortcut | Change to `Option+T` (macOS) / `Alt+T` |
| `Ctrl+S` → "Stash current prompt" | Verify if still current | Verify or remove |
| `Ctrl+P` → "Paste image" | Correct but incomplete | Update to also list `Ctrl+V` / `Cmd+V` |

**Missing shortcuts to add:**
- `Ctrl+O` — Toggle transcript viewer
- `Ctrl+B` — Background running tasks
- `Option+P` / `Alt+P` — Switch model
- `Option+O` / `Alt+O` — Toggle fast mode
- `Ctrl+D` — Exit Claude Code
- `Space` (hold) — Push-to-talk voice dictation
- `\` + `Enter` — Quick multiline escape
- `Option+Enter` — Multiline input (macOS)

---

### Slash Commands (19 listed) — Issues Found

| Current Entry | Issue | Fix |
|---|---|---|
| `/history` | Not a current command | Replace with `/resume` — Resume session by ID/name |
| `/vim` | Removed in v2.1.92 | Remove; note `/config` → Editor mode |
| `/pr_comments` | Removed in v2.1.91 | Remove |
| `/keys` | Verify if still current | Verify or remove |

**Missing commands to add (high priority):**
- `/effort [low|medium|high|max|auto]` — Set model effort level
- `/fast [on|off]` — Toggle fast mode
- `/color [color|default]` — Set prompt-bar color
- `/plan [description]` — Enter plan mode with optional description
- `/loop [interval] <prompt>` — Run prompt on recurring interval
- `/schedule` — Create/manage cloud scheduled tasks
- `/context` — Visualize context usage with optimization tips
- `/diff` — Open interactive diff viewer
- `/tasks` — List and manage background tasks
- `/copy [N]` — Copy last response to clipboard
- `/resume [session]` — Resume conversation by ID/name
- `/rename [name]` — Rename session
- `/skills` — List available skills
- `/hooks` — View hook configurations
- `/plugin` — Manage plugins
- `/reload-plugins` — Reload plugins without restart
- `/release-notes` — View changelog
- `/stats` — Visualize daily usage and streaks
- `/voice` — Toggle push-to-talk voice dictation
- `/batch <instruction>` — Orchestrate large-scale changes (5-30 parallel agents)
- `/remote-control` — Enable remote control from claude.ai
- `/teleport` — Pull web session to terminal
- `/desktop` — Continue in Claude Code Desktop app
- `/mobile` — Show QR code for mobile app
- `/powerup` — Interactive feature lessons
- `/security-review` — Analyze pending changes for security issues

---

### CLI Launch Flags (15 listed) — Issues Found

| Current Entry | Issue | Fix |
|---|---|---|
| `claude -r` → "Start in isolated git worktree" | Wrong — `-r` is `--resume` | Change to `claude -w` → "Start in isolated git worktree" |
| `--conversation-mode plan` | Outdated flag name | Change to `--permission-mode plan` |
| `--budget` | Outdated flag name | Change to `--max-budget-usd` |

**Missing flags to add (high priority):**
- `--effort [low|medium|high|max]` — Set effort level
- `--resume` / `-r` — Resume specific session by ID/name
- `--name` / `-n` — Set session display name
- `--worktree` / `-w` — Start in git worktree
- `--tmux` — Create tmux session with worktree
- `--add-dir` — Add working directories
- `--remote` — Create web session on claude.ai
- `--teleport` — Resume web session in terminal
- `--system-prompt` — Replace entire system prompt
- `--append-system-prompt` — Append to default system prompt
- `--mcp-config` — Load MCP servers from JSON
- `--json-schema` — Get JSON output matching schema
- `--fallback-model` — Auto-fallback when overloaded
- `--chrome` / `--no-chrome` — Toggle Chrome browser integration
- `--agent` — Specify agent for session
- `--bare` — Minimal mode (skip auto-discovery)
- `--debug` — Enable debug logging
- `--fork-session` — Create new session ID when resuming
- `--permission-mode` — Start in specific permission mode

---

### Permission Modes (3 listed) — Missing

Currently lists: Normal, Auto-Accept, Plan

**Add:**
- **Accept Edits** — Auto-accepts file edits, still prompts for shell commands. Good middle ground.
- **Bypass Permissions** — Requires `--allow-dangerously-skip-permissions` flag. No prompts at all.

Update cycle description: `Shift+Tab` cycles default → acceptEdits → plan → auto → (bypassPermissions if enabled)

---

### Hooks (6 listed) — Issues Found

| Current Entry | Issue | Fix |
|---|---|---|
| `PreUserInput` | Renamed | Change to `UserPromptSubmit` |

**Missing hooks to add (26 total now, 20 missing):**
- `PostToolUseFailure` — After a tool call fails
- `PermissionRequest` — When permission is requested
- `PermissionDenied` — After auto mode denials
- `SubagentStart` / `SubagentStop` — Subagent lifecycle
- `TaskCreated` / `TaskCompleted` — Task lifecycle
- `TeammateIdle` — When a teammate agent is idle
- `StopFailure` — When stop fails
- `ConfigChange` — When config changes
- `CwdChanged` / `FileChanged` — File system events
- `WorktreeCreate` / `WorktreeRemove` — Worktree lifecycle
- `PreCompact` / `PostCompact` — Context compaction
- `Elicitation` / `ElicitationResult` — MCP elicitation
- `Notification` — Notification events
- `InstructionsLoaded` — When instructions are loaded

---

### Input Superpowers (6 listed) — Issues Found

| Current Entry | Issue | Fix |
|---|---|---|
| Multi-Dir: `claude -w src/ -w tests/` | `-w` is worktree, not multi-dir | Change to `claude --add-dir src/ --add-dir tests/` |

**Add:**
- `!` prefix — Run bash command directly from prompt
- `/` prefix — Command and skill autocomplete
- Voice input — Push-to-talk with Space bar (hold)

---

### File Structure Map — Issues Found

- `~/.claude/.mcprc` — verify if still current or replaced
- Missing `rules/` directory under project `.claude/`

---

## Implementation Plan

### Step 1 — Fix inaccuracies
Fix the 10 incorrect entries identified above (wrong shortcuts, removed commands, renamed flags).

### Step 2 — Add missing slash commands
Add ~26 new slash commands to the table. Group or reorganize if table gets too long (consider sub-tables by category).

### Step 3 — Add missing keyboard shortcuts
Add ~8 new shortcuts. Consider a macOS/Linux note for Option vs Alt keys.

### Step 4 — Add missing CLI flags
Add ~19 new flags. Consider grouping by category (session, model, permissions, system prompt, MCP, etc.).

### Step 5 — Update Permission Modes
Add Accept Edits and Bypass Permissions cards. Update cycle description.

### Step 6 — Update Hooks table
Rename PreUserInput → UserPromptSubmit. Add 20 new hook events. Consider grouping by category.

### Step 7 — Update Input Superpowers
Fix Multi-Dir card. Add `!` bash prefix, `/` autocomplete, voice input cards.

### Step 8 — Update File Structure Map
Verify and update both project and global file trees.

### Step 9 — Verify in browser
Open the file and confirm all tables render correctly, no overflow issues.
