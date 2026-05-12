# CBP-133 — Add hook `args: string[]` exec form to Hooks Deep Dive

## Summary
Claude Code v2.1.139 added a new `args: string[]` field for `command`-type hooks. When specified, it spawns the command directly without a shell (exec form), so path placeholders and special characters never need quoting. This is an important ergonomic improvement for hook authors who use `$CLAUDE_PROJECT_DIR` and similar env vars in their hook commands.

## Assessment
**Does this content exist in the playbook?**

- The Hooks Deep Dive section "Five Hook Types" collapsible (around line 7095–7150) covers `command`, `http`, `prompt`, `agent`, and `mcp_tool` hook types
- The command hook example at line 7115 shows: `"command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/lint.sh"` — with the awkward quoting needed for shell form
- There is NO mention of an exec form or `args` array field for hooks anywhere in the playbook
- The Best Practices callout at line 7449 says: "Reference scripts via `$CLAUDE_PROJECT_DIR` — always quote for paths with spaces" — the exec form changes this guidance

**What needs to change:**
1. Add an "Exec form" code example to the Five Hook Types command hook section showing the `args` array syntax
2. Update the best practices tip about quoting to note the exec form alternative

## Plan
1. Read lines 7110–7160 to see the exact command hook example and surrounding context
2. After the existing command hook JSON example, add a note about the exec form with a code example:
   ```json
   {
     "type": "command",
     "command": "/path/to/hook.sh",
     "args": ["--flag", "$CLAUDE_PROJECT_DIR"]
   }
   ```
3. Add a brief explanation: "The `args` array spawns the command directly without a shell — path placeholders and special characters never need quoting."
4. Update the tip at line 7449 to mention exec form as the preferred solution for paths with spaces

## Acceptance Criteria
- `args: string[]` exec form is documented with a code example in the Five Hook Types collapsible
- The quoting tip is updated to reflect that exec form is the recommended approach for complex paths
- No existing content is broken or removed
