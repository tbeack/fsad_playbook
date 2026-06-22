# CBP-263 — Cheat Sheet: `/config --help` flag (v2.1.183)

## Summary

Claude Code v2.1.183 added `/config --help` to list all available shorthand keys for `/config key=value`. The `/config` row in the Cheat Sheet was last updated in CBP-258 to document the `key=value` inline syntax (v2.1.181). Now we need to add `--help` as a sub-command.

## Assessment

The `/config` Cheat Sheet row is at line 9832:
```
<tr><td><code>/config</code> <code>[key=value]</code></td><td>Open settings interface — or set any setting inline: <code>/config thinking=false</code>, <code>/config model=sonnet</code>. Changes persist to <code>~/.claude/settings.json</code> and participate in the config cascade. Works in interactive, <code>-p</code>, and Remote Control (alias: <code>/settings</code>) (v2.1.181)</td></tr>
```

The `--help` flag is not mentioned. We need to update the row to include it.

## Plan

1. Edit the `/config` Cheat Sheet row at line 9832 in `/Users/theobeack/Repo/fsad_playbook/fsad-playbook.html`.
2. Update the `<td>` cell to add mention of `/config --help` and update the version reference to v2.1.183.

Updated row:
```html
<tr><td><code>/config</code> <code>[key=value]</code></td><td>Open settings interface — or set any setting inline: <code>/config thinking=false</code>, <code>/config model=sonnet</code>. Run <code>/config --help</code> to list all available shorthand keys. Changes persist to <code>~/.claude/settings.json</code> and participate in the config cascade. Works in interactive, <code>-p</code>, and Remote Control (alias: <code>/settings</code>) (v2.1.183)</td></tr>
```

## Acceptance Criteria

- `/config --help` is mentioned in the Cheat Sheet `/config` row
- Version reference updated from v2.1.181 to v2.1.183
- The rest of the row content is preserved accurately
- HTML is valid
