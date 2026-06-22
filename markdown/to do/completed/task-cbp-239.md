# CBP-239 — Add glob pattern support in deny rule tool-name position (v2.1.166)

## Summary

Claude Code v2.1.166 added glob pattern support in the **tool-name position** of deny rules:
- `"*"` in the tool-name position denies **all tools**
- Allow rules reject non-MCP globs (only MCP tool patterns are valid in allow rules)
- Unknown tool names in deny rules now warn at startup instead of silently being ignored

## Assessment

**Config Cascade / Notable settings.json Keys section (lines ~8573–8586):** The playbook does not currently document glob patterns in permission rules (deny rules). The `settings.autoMode.hard_deny` bullet explains hard-deny rules but doesn't mention glob syntax in tool-name positions. This is new information that belongs in the permissions section or as a bullet in the Notable settings.json Keys callout.

The most natural home is an addition to the Notable settings.json Keys callout, as a note appended to the `settings.autoMode.hard_deny` bullet or as a standalone note, because this feature is about the `deny` array in `settings.json`.

Alternatively, look for an existing permissions / allow-deny rules section to add it. Let me check where the allow/deny rules are described:

The allow/deny rule format is documented in the Config Cascade collapsible section (around line 8573). There's also a permissions section. The glob syntax is a new capability for the `deny` field inside `settings.json` permissions.

**Decision:** Add a note inside the Notable settings.json Keys callout as a new bullet about glob pattern support in deny rules. This is self-contained and consistent with how other permission features are documented.

## Plan

1. **Edit Notable settings.json Keys callout** — add a new bullet at the end (replacing the current last bullet `settings.autoMode.hard_deny`):
   - The `settings.autoMode.hard_deny` bullet currently ends with `margin-bottom:0;` (it's the last item)
   - Add a new bullet after `settings.autoMode.hard_deny`, restoring its `margin-bottom:0.4rem;` and giving the new bullet `margin-bottom:0;`

   New bullet text:
   ```html
   <li style="margin-bottom:0;"><strong>Deny rule glob patterns</strong> — The tool-name position in <code>deny</code> rules now accepts glob patterns: <code>"*"</code> denies all tools. Allow rules reject non-MCP globs (only MCP tool name patterns are valid in allow rules). Unknown tool names in deny rules log a startup warning instead of being silently ignored.</li>
   ```

   And change `settings.autoMode.hard_deny` bullet's style from `margin-bottom:0;` to `margin-bottom:0.4rem;`.

## Acceptance Criteria

- A new bullet in the Notable settings.json Keys callout documents glob patterns in deny rules
- `settings.autoMode.hard_deny` bullet gets `margin-bottom:0.4rem;` (it's no longer the last item)
- No surrounding HTML is broken
- Content accurately describes: `"*"` denies all tools, allow rules reject non-MCP globs, unknown deny rule tool names warn at startup
