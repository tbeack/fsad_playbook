# CBP-047 — Add `/ultrareview`, `/less-permission-prompts`; update `/theme` with auto option

## Source
Claude Code v2.1.111 release notes.

## Summary
Three Cheat Sheet updates from v2.1.111:

1. **`/theme` update** — A new "Auto (match terminal)" option was added. The existing row says "dark / light" only.
2. **`/ultrareview`** — New cloud-based command that runs comprehensive parallel multi-agent code review. Invoke with no args for current branch, or `/ultrareview <PR#>` for a specific GitHub PR.
3. **`/less-permission-prompts`** — New built-in skill that scans transcripts for common read-only Bash/MCP calls and proposes an allowlist for `.claude/settings.json`.

## Assessment

### What exists
- **Line 4797:** `/theme` row — description says "Change color theme (dark / light)"
- **Line 4836:** `/team-onboarding` in Info & account table
- **No `/ultrareview` anywhere** in the playbook
- **No `/less-permission-prompts` anywhere** in the playbook

### Placement
- `/theme` — update in place at line 4797
- `/ultrareview` — best placed in the **Automation & agents** table (near `/agents`, `/ultraplan`). Check where that table is.
- `/less-permission-prompts` — best placed in the **Config & environment** table or a new row near `/setup-vertex`, `/setup-bedrock`, or the permissions section.

### Where to put `/ultrareview`
Looking at the cheat sheet structure, there's an automation table. `/ultrareview` is a cloud review command similar to `/ultraplan` (remote session). It fits in the **Info & account** or in a separate **Remote / cloud** sub-group. Given the playbook has `/team-onboarding` in Info & account, add `/ultrareview` there.

### Where to put `/less-permission-prompts`
This is a maintenance/config skill — fits best in the **Config & environment** table (near `/doctor`, `/config`, `/memory`).

## Plan

1. **Update `/theme` row (line 4797)**
   ```html
   <tr><td><code>/theme</code></td><td>Change color theme: <code>dark</code> | <code>light</code> | <code>auto</code> (match terminal)</td></tr>
   ```

2. **Add `/ultrareview` to Info & account table (after `/team-onboarding`, line 4836)**
   ```html
   <tr><td><code>/ultrareview</code> <code>[PR#]</code></td><td>Cloud-based parallel multi-agent code review — omit args for current branch, or pass a GitHub PR number</td></tr>
   ```

3. **Find the config/session table and add `/less-permission-prompts`**
   Locate the table containing `/config`, `/memory`, `/doctor` and add after `/doctor`:
   ```html
   <tr><td><code>/less-permission-prompts</code></td><td>Scan transcripts for common read-only Bash/MCP calls and propose an allowlist for <code>settings.json</code></td></tr>
   ```

## Acceptance Criteria
- [ ] `/theme` row mentions all three options: dark, light, auto
- [ ] `/ultrareview` appears in the Cheat Sheet Info & account table
- [ ] `/less-permission-prompts` appears in the appropriate Cheat Sheet table
- [ ] No broken HTML or styling regressions
- [ ] Both new commands are visible in browser search
