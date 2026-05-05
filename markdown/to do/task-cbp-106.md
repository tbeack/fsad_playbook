# CBP-106 — Update the cbp_auto_updater_agent to include Codex changes

## Summary
The `cbp_auto_updater_agent` (defined in `markdown/agents/auto_update_agent.md`) currently only tracks Claude Code CLI releases and updates the Claude Best Practices page. The playbook also has a full Codex Best Practices page (`page-codex`) that needs to stay current with OpenAI's Codex CLI releases. This task extends the agent to also monitor `openai/codex` releases, assess changelog relevance to the Codex sections, create CBP tasks for Codex changes, apply them to the Codex page, and track the Codex version in state.json.

## Assessment
The agent file lives at `markdown/agents/auto_update_agent.md`. It has 7 phases: Fetch Updates, Gather Release Details, Assess Playbook Impact, Create Tasks, Execute Tasks, Update Version & Changelog, Branch/Commit/PR. All 7 phases are Claude-Code-only today. The companion skill at `~/.claude/skills/cbp-update/SKILL.md` passes a prompt to the agent that also only mentions Claude Code.

State file (`markdown/updates/state.json`) currently stores:
```json
{ "lastVersion": "v2.1.128", "lastChecked": "2026-05-05" }
```
It has no Codex version field.

The Codex Best Practices page (`page-codex`) covers 9 subsections (Overview, Getting Started, Project Anatomy, Integrations/MCP, Code Review, Building Skills, Guidelines, Hooks, Cheat Sheet, Power Usage), all under IDs prefixed `codex-*`.

HTML patterns in the Codex page mirror the Claude page (same `<table class="styled-table">`, `<details>` collapsibles, `<kbd>` for shortcuts, `<code>` for commands) — so Phase 5 patterns need a Codex-specific mapping.

**Location:**
- `markdown/agents/auto_update_agent.md` — primary change target
- `~/.claude/skills/cbp-update/SKILL.md` — update prompt to mention Codex
- `markdown/updates/state.json` — add `lastCodexVersion` field

## Plan

### 1. Update state.json — add Codex version field
Add `lastCodexVersion` to `markdown/updates/state.json` with an initial value of `"v0.0.0"` (agent will detect it as a new version on first run and assess from scratch, capped at 5 tasks). Also add `lastCodexChecked` alongside `lastChecked`.

Final shape:
```json
{
  "lastVersion": "v2.1.128",
  "lastChecked": "2026-05-05",
  "lastCodexVersion": "v0.0.0",
  "lastCodexChecked": "2026-05-05"
}
```

### 2. Rewrite `markdown/agents/auto_update_agent.md` — extend all 7 phases

**Phase 1 — Fetch Updates:**
- Keep existing Claude Code check (GitHub API: `anthropics/claude-code`)
- Add Codex check: `curl -s "https://api.github.com/repos/openai/codex/releases/latest"` — extract version tag into `codexVersion`
- Read `lastCodexVersion` from state.json
- New stop condition: both versions unchanged → "No Updates (Claude Code and Codex)", stop
- If either is new: continue

**Phase 2 — Gather Release Details:**
- Keep Claude Code CHANGELOG fetch
- Add Codex CHANGELOG fetch: `curl -s "https://raw.githubusercontent.com/openai/codex/main/CHANGELOG.md"`
- If 404: try `https://raw.githubusercontent.com/openai/codex/main/CHANGELOG.md` (same, but note agent should grep for the file path in the release assets as fallback)
- Extract Codex changes between `codexVersion` and `lastCodexVersion`
- Daily report (`markdown/updates/YYYY-MM-DD.md`) gets a new "Codex Changes" section alongside "New Features / Changed / Fixed" for Claude Code

**Phase 3 — Assess Playbook Impact:**
- Keep Claude Code assessment (searches Claude Best Practices sections)
- Add Codex assessment: for each Codex change, search `fsad-playbook.html` within `page-codex` sections for relevant keywords
- Determine per-change: New section needed / Update existing / No action
- Combined cap: max 5 Claude Code tasks + 5 Codex tasks = 10 total per run (existing guardrail says max 10)

**Phase 4 — Create Tasks:**
- Keep same CBP-### numbering (single sequence, not separate)
- Task descriptions for Codex changes are prefixed with `[Codex]` to distinguish them from `[Claude Code]` changes
- Task files include a "Source" line noting "Codex CLI vX.Y.Z"

**Phase 5 — Execute Tasks:**
- Keep existing Claude Code HTML patterns (for `page-practices` sections)
- Add Codex HTML patterns for `page-codex` sections:
  - Slash commands: same `<tr><td><code>/cmd</code></td>…</tr>` in Codex Cheat Sheet tables (`#codex-cheat-sheet`)
  - Keyboard shortcuts: `<tr><td><kbd>Key</kbd></td>…</tr>` in Codex Cheat Sheet
  - Hooks: add to Codex Hooks section (`#codex-hooks`) hook tables
  - CLI flags: add to Codex Getting Started section (`#codex-best-practices`)
  - New features: add collapsible in Codex Power Usage section (`#codex-power-usage`)
  - Skills changes: update Codex Building Skills section (`#codex-building-skills`)
- Mark each Codex task complete in todo.md after execution (same `- [ ]` → `- [x]` pattern)

**Phase 6 — Update Version & Changelog:**
- No change to version bump logic — bump once if any tasks (Claude Code or Codex) were executed
- CHANGELOG entry groups all executed tasks together by CBP number, with `[Codex]` prefix visible in the task titles

**Phase 7 — Branch, Commit & PR:**
- Branch naming:
  - Only Claude Code updates: `auto-update/claude-code-vX.Y.Z-YYYY-MM-DD` (unchanged)
  - Only Codex updates: `auto-update/codex-vX.Y.Z-YYYY-MM-DD`
  - Both: `auto-update/combined-YYYY-MM-DD`
- `git add` staging: add `markdown/updates/state.json` (covers both version fields)
- PR title and body updated to mention both tools when both have changes
- State.json update step: write both `lastCodexVersion` and `lastCodexChecked` alongside the Claude Code fields

### 3. Update `~/.claude/skills/cbp-update/SKILL.md` — extend prompt
- Change the numbered prompt steps to say "Check for the latest Claude Code CLI and Codex CLI releases"
- Update the "After the agent completes" report section to include Codex version tracking

All criteria verified 2026-05-05 before commit.

## Acceptance Criteria
- [x] `markdown/updates/state.json` has `lastCodexVersion` and `lastCodexChecked` fields added
- [x] `markdown/agents/auto_update_agent.md` Phase 1 fetches both Claude Code and Codex releases; stops only if both are unchanged
- [x] Phase 2 fetches Codex CHANGELOG and populates a "Codex Changes" section in the daily report
- [x] Phase 3 assesses Codex changes against `page-codex` sections
- [x] Phase 4 creates Codex tasks with `[Codex]` prefix in the description
- [x] Phase 5 documents Codex-specific HTML section IDs and patterns (mirroring the Claude Code pattern table but for `codex-*` IDs)
- [x] Phase 7 uses `auto-update/codex-vX.Y.Z-YYYY-MM-DD` or `auto-update/combined-YYYY-MM-DD` branch names when Codex changes are present
- [x] Phase 7 updates `lastCodexVersion` and `lastCodexChecked` in state.json on every run
- [x] `~/.claude/skills/cbp-update/SKILL.md` prompt mentions both Claude Code and Codex monitoring
- [x] `~/.claude/skills/cbp-update/SKILL.md` "After the agent completes" section lists Codex version tracked
- [x] No regressions to the existing Claude Code update flow (all existing phases still handle Claude Code as before)
