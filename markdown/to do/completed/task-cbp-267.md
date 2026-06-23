# CBP-267 — Add `respondToBashCommands` to Notable settings.json Keys callout

## Summary

Claude Code v2.1.186 changed the behavior of `!` (bang) bash commands: they now trigger Claude to respond to the output automatically. Previously, `!` commands were context-only — they injected output but Claude didn't reply. The new default is more interactive, but it can be reverted by setting `"respondToBashCommands": false` in settings.json. This is a notable behavior change that affects how users run one-off shell commands mid-session.

## Assessment

The Notable settings.json Keys callout (lines 8575–8597) does not currently mention `respondToBashCommands`. The last item in the list is `attribution.sessionUrl` at line 8595. A new list item should be added at the end (before the closing `</ul>` at line 8596).

## Plan

1. Read `fsad-playbook.html` lines 8590–8597 to confirm the exact list structure.
2. Add a new `<li>` for `respondToBashCommands` after the `attribution.sessionUrl` item (line 8595), before the closing `</ul>` tag.
3. Content: `<code>respondToBashCommands</code> — Set <code>false</code> to keep <code>!</code> bash commands context-only (v2.1.186 default is <code>true</code>: Claude automatically responds to the output of <code>!</code> commands). Useful when you want to inject shell output into context without prompting a reply.`
4. Mark task complete in `todo.md`.

## Acceptance Criteria

- `respondToBashCommands` is listed in the Notable settings.json Keys callout.
- Description explains the v2.1.186 default behavior change and how to revert it.
- No other content changed.
