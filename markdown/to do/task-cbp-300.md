# CBP-300 — Add hook security note: ${user_config.*} rejected in shell-form hooks

## Summary
Claude Code v2.1.207 rejected `${user_config.*}` substitutions in shell-form hook commands as a shell-injection security fix. Plugin hooks that need to access plugin configuration values must use exec form (`args` array) or read values via `$CLAUDE_PLUGIN_OPTION_<KEY>` environment variables in the hook script.

## Assessment
The Hooks section (around lines 10874–10892) already documents shell-form vs exec-form hooks with a note at line 10892 recommending exec form for paths/args with spaces or env vars. This note should be extended with the security context: shell-form hooks cannot use `${user_config.*}` for plugin config access — use exec form + `$CLAUDE_PLUGIN_OPTION_<KEY>` instead.

## Plan
1. Read line 10892 to confirm the current exec form note text
2. Extend the note to add: In shell-form hooks, `${user_config.*}` is rejected (shell injection fix, v2.1.207). To access plugin configuration values in a hook, use exec form and read the value via `$CLAUDE_PLUGIN_OPTION_<KEY>` in your hook script.

## Acceptance Criteria
- The exec form note at line 10892 mentions the security reason (shell injection prevention)
- Mentions `$CLAUDE_PLUGIN_OPTION_<KEY>` as the alternative for plugin config access
- References v2.1.207
