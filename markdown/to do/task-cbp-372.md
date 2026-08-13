# CBP-372 — [Claude] Add `command` plugin marketplace source type to Plugins collapsible

## Source
Claude Code v2.1.229

## Summary
v2.1.229 added plugin marketplace `command` sources: a local command (e.g. run by an IDE) prints the plugin directory, which is re-resolved each session and applied without a restart. A `mode: "link"` config uses that resolved directory in place, rather than copying it.

## Assessment
`fsad-playbook.html`, `#power-usage` → Plugins collapsible (lines 11652–11714). The bullet list already documents the `archive` plugin source type (v2.1.224, line 11689) directly above the general "Plugins add skills invokable via `/skill-name`" bullet — this is the established pattern for documenting new plugin *source* types. There is no existing mention of `command`-type sources or `mode: "link"` anywhere in this collapsible (confirmed no other references to "command source" or "mode: link" in the file). Genuine gap — add a new bullet in the same list, following the `archive` bullet's format.

## Plan

### Step 1 — Add a new bullet immediately after the "Archive plugin source" bullet (line 11689)
Current:
```html
          <li><strong>Archive plugin source:</strong> install a plugin persistently from a zip over HTTPS — no git or npm required. Add an <code>archive</code>-type source to your plugin config pointing at the zip URL; optionally pin it with a SHA-256 hash for integrity verification (v2.1.224). Unlike <code>--plugin-url</code> (session-only, above), this registers the plugin as a normal persistent source.</li>
          <li>Plugins add skills invokable via <code>/skill-name</code></li>
```
Replace with:
```html
          <li><strong>Archive plugin source:</strong> install a plugin persistently from a zip over HTTPS — no git or npm required. Add an <code>archive</code>-type source to your plugin config pointing at the zip URL; optionally pin it with a SHA-256 hash for integrity verification (v2.1.224). Unlike <code>--plugin-url</code> (session-only, above), this registers the plugin as a normal persistent source.</li>
          <li><strong>Command plugin source:</strong> add a <code>command</code>-type source that runs a local command (e.g. one supplied by an IDE) to print the plugin directory. The directory is re-resolved every session and applied without a restart, so it stays in sync with whatever the command reports. Set <code>"mode": "link"</code> to use the resolved directory in place rather than copying it (v2.1.229).</li>
          <li>Plugins add skills invokable via <code>/skill-name</code></li>
```

## Acceptance Criteria
- New bullet present in the Plugins collapsible bullet list, directly below the "Archive plugin source" bullet
- Describes: local command prints plugin directory, re-resolved each session, applied without restart, and the `mode: "link"` option
- Version tag (v2.1.229) included
- No changes to surrounding markup structure
