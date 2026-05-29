# CBP-205 — Add Stdio MCP servers receive `CLAUDE_CODE_SESSION_ID` + `CLAUDECODE=1` note to Plugins section (v2.1.154)

## Summary

v2.1.154 added that stdio MCP server subprocesses now receive `CLAUDE_CODE_SESSION_ID` and `CLAUDECODE=1` in their environment. This is useful for MCP server authors who need to know which Claude Code session they're serving and to confirm they are running inside Claude Code.

## Assessment

**File:** `fsad-playbook.html`  
**Section:** The Plugins / MCP collapsible in Power Usage, or the Subprocess Sandboxing env vars section.

Best placement: The Subprocess Sandboxing hardening env vars table already documents several env vars injected into subprocesses. The `CLAUDE_CODE_SESSION_ID` is already in the hooks env vars table (line ~10162). But this is specifically about MCP stdio server subprocesses — it belongs as a note in the Plugins collapsible or as an addition to the CLAUDE_CODE_SESSION_ID hooks row.

The cleanest approach: Add a note to the existing `CLAUDE_CODE_SESSION_ID` hooks env vars row that it is also injected into stdio MCP server subprocess environments, alongside `CLAUDECODE=1`.

**Line:** ~10162 — `CLAUDE_CODE_SESSION_ID` row in "Environment variables available in hooks" table.

## Plan

1. Locate the `CLAUDE_CODE_SESSION_ID` row at ~line 10162.
2. Update the description to include: "...and into stdio MCP server subprocess environments. MCP servers also receive `CLAUDECODE=1` to confirm they are running inside Claude Code."
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The `CLAUDE_CODE_SESSION_ID` hooks env vars row notes it is also injected into stdio MCP server environments.
- `CLAUDECODE=1` is documented as an env var available in stdio MCP subprocesses.
