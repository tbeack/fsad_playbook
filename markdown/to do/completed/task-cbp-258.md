# CBP-258 — Update `/config` Cheat Sheet row: add `key=value` inline syntax (v2.1.181)

## Summary
Claude Code v2.1.181 added `/config key=value` syntax that lets users set any setting directly from the prompt (e.g. `/config thinking=false`). This works in interactive mode, `-p` (print mode), and Remote Control. Previously, `/config` only opened the settings interface.

## Assessment
The `/config` row exists at line 9832 of `fsad-playbook.html` in the "Config & customization" slash commands table (the table starting at line 9829). The current description only says "Open settings interface — changes persist to `~/.claude/settings.json` and participate in the config cascade (alias: `/settings`)". It does not mention the inline `key=value` syntax. This needs to be updated.

## Plan
1. Edit line 9832 in `fsad-playbook.html`
2. Change the description to include the new `key=value` syntax, showing an example.

**Current:**
```html
<tr><td><code>/config</code></td><td>Open settings interface — changes persist to <code>~/.claude/settings.json</code> and participate in the config cascade (alias: <code>/settings</code>)</td></tr>
```

**New:**
```html
<tr><td><code>/config</code> <code>[key=value]</code></td><td>Open settings interface — or set any setting inline: <code>/config thinking=false</code>, <code>/config model=sonnet</code>. Changes persist to <code>~/.claude/settings.json</code> and participate in the config cascade. Works in interactive, <code>-p</code>, and Remote Control (alias: <code>/settings</code>) (v2.1.181)</td></tr>
```

## Acceptance Criteria
- `/config` row in Cheat Sheet shows the `[key=value]` optional parameter syntax
- The description includes at least one inline usage example
- The row still references the settings interface behavior and `~/. claude/settings.json`
