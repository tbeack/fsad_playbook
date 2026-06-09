# CBP-240 — Add `--safe-mode` flag + `CLAUDE_CODE_SAFE_MODE` env var

## Summary
Claude Code v2.1.169 added a `--safe-mode` launch flag (and corresponding `CLAUDE_CODE_SAFE_MODE` environment variable) that starts Claude Code with all customizations disabled: CLAUDE.md files, plugins, skills, hooks, and MCP servers are all skipped. This is designed for troubleshooting sessions where custom configurations may be causing issues.

## Assessment
- **`--safe-mode` flag:** Not mentioned anywhere in the playbook. Should be added to the CLI Launch Flags section under "System prompt & config" table (around line 9941–9958 in fsad-playbook.html).
- **`CLAUDE_CODE_SAFE_MODE`:** Not mentioned. Should be added to the Notable settings.json Keys callout (around line 8573–8588) as an env var note, OR noted alongside the flag. Best fit: add a bullet to the Notable settings.json Keys callout for the env var, and add the CLI flag row to the "System prompt & config" table.

## Plan

### Step 1 — Add `--safe-mode` to CLI Launch Flags "System prompt & config" table
Location: line ~9954 in fsad-playbook.html, in the "System prompt & config" tbody.
Insert a new row after the `--bare` row (line 9954):
```html
<tr><td><code>--safe-mode</code></td><td>Start with all customizations disabled (CLAUDE.md, plugins, skills, hooks, MCP servers) — useful for troubleshooting. Env var equivalent: <code>CLAUDE_CODE_SAFE_MODE=1</code>.</td></tr>
```

### Step 2 — Add `disableBundledSkills` bullet to Notable settings.json Keys callout
(This is handled in CBP-242 — the `CLAUDE_CODE_SAFE_MODE` env var is noted inline in the CLI flag row, sufficient coverage.)

## Acceptance Criteria
- `--safe-mode` appears in the CLI Launch Flags "System prompt & config" table in the Cheat Sheet
- The description mentions CLAUDE.md, plugins, skills, hooks, MCP servers disabled
- `CLAUDE_CODE_SAFE_MODE=1` env var equivalent is noted in the description
- No duplicate content added
