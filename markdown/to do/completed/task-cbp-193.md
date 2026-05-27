# CBP-193 — Update SessionStart hook description + fallback-model flag description

## Summary
Claude Code v2.1.152 made two related updates:

1. `SessionStart` hooks can now return `reloadSkills: true` in their JSON output to re-scan skill directories, making skills installed by the hook available in the same session.
2. `SessionStart` hooks can now set the session title via `hookSpecificOutput.sessionTitle` on startup and resume.
3. `--fallback-model` now applies to interactive sessions too (not just print mode) — when the primary model is not found, Claude switches to the fallback for the rest of the session.

## Assessment

**SessionStart hook row** (line 6610):
Current: `<tr><td><code>SessionStart</code></td><td>When a session begins</td></tr>`
Needs: mention of `reloadSkills: true` output and `sessionTitle` capability.

**`--fallback-model` CLI flag row** (line 6522):
Current: `<tr><td><code>--fallback-model</code></td><td>Auto-fallback model when overloaded (print mode)</td></tr>`
Needs: "(print mode)" removed/updated — now works for interactive sessions too when primary model not found.

The existing note at line 6269 in the power usage code block also says "# Auto-fallback in print mode when overloaded" — this should be updated.

## Plan
1. Update line 6610 (SessionStart hook row):
   ```html
   <tr><td><code>SessionStart</code></td><td>When a session begins or resumes. Return <code>reloadSkills: true</code> in JSON output to re-scan skill directories (skills installed by the hook become available immediately). Set session title via <code>hookSpecificOutput.sessionTitle</code>.</td></tr>
   ```

2. Update line 6522 (`--fallback-model` flag row):
   ```html
   <tr><td><code>--fallback-model</code></td><td>Switch to this model for the rest of the session when the primary model is not found (interactive and print mode)</td></tr>
   ```

3. Update line 6268 comment in the power usage code block from:
   `# Auto-fallback in print mode when overloaded`
   to:
   `# Auto-fallback when primary model not found (interactive + print mode)`

## Acceptance Criteria
- `SessionStart` row mentions `reloadSkills: true` and `sessionTitle`
- `--fallback-model` description no longer says "print mode" exclusively
- Power usage code block comment updated
