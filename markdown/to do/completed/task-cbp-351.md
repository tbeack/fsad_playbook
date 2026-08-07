# CBP-351 — [Claude] Add `archive` plugin source to Plugins collapsible

## Source
Claude Code v2.1.224

## Summary
v2.1.224 added an `archive` plugin source: install plugins from a zip over HTTPS without git or npm, with optional SHA-256 pinning.

## Assessment
`fsad-playbook.html`, Power Usage → Plugins collapsible, lines 11624–11684. The code block already shows `--plugin-dir ./my-plugin.zip` (session-local, from CBP-101) and `--plugin-url` (session-only, from CBP-110), but there's no persistent "install from an archive as a named plugin source" concept documented anywhere.

## Plan

### Step 1 — Add a new bullet to the list (after the "Auto-load from `.claude/skills/`" bullet at line 11659)
```html
<li><strong>Archive plugin source:</strong> install a plugin persistently from a zip over HTTPS — no git or npm required. Add an <code>archive</code>-type source to your plugin config pointing at the zip URL; optionally pin it with a SHA-256 hash for integrity verification (v2.1.224). Unlike <code>--plugin-url</code> (session-only, above), this registers the plugin as a normal persistent source.</li>
```

## Acceptance Criteria
- Plugins collapsible documents the `archive` plugin source (zip over HTTPS, optional SHA-256 pinning, v2.1.224)
- Bullet distinguishes it from the existing session-only `--plugin-url` flag
- HTML is valid
