# CBP-101 — Update Plugins collapsible: --plugin-dir accepts .zip archives

## Summary
In Claude Code v2.1.128, `--plugin-dir` now accepts `.zip` plugin archives in addition to directories. This is useful for distributing plugins as single files.

## Assessment
The Plugins collapsible in Power Usage has a code block at line ~6773:
```
claude --plugin-dir ./my-plugins
```
The comment above says "Load plugins from a custom directory". This needs updating to mention zip archives are also accepted.

There is also the `/plugin` Cheat Sheet row which could benefit from a note.

## Plan
1. Read lines 6770–6775 of `fsad-playbook.html`
2. Update the comment on the `--plugin-dir` code line from "# Load plugins from a custom directory" to "# Load plugins from a directory or .zip archive"
3. Optionally add a second example line showing a zip: `claude --plugin-dir ./my-plugin.zip`

## Acceptance Criteria
- `--plugin-dir` code block mentions `.zip` archives
- HTML remains valid
