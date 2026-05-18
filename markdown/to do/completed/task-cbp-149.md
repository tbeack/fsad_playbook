# CBP-149 — Document root-level SKILL.md plugin surfacing in Plugins collapsible

## Summary

Claude Code v2.1.142: plugins that have a root-level `SKILL.md` and **no** `skills/` subdirectory are now automatically surfaced as a skill. Previously, plugins needed a `skills/` directory for their skills to be discovered.

## Assessment

The Plugins collapsible (starting at **line 6812**) documents plugin structure but does not mention this root-level `SKILL.md` shortcut. The Skills section describes `SKILL.md` as a directory structure under `.claude/skills/` — not applicable here.

The relevant content to update is the Plugins collapsible bullet list (lines 6838–6844). Currently it reads:
- "Plugins add skills invokable via `/skill-name`"
- "Executables under `bin/` are invokable as bare commands"
- "Plugin marketplace for discovery and one-click install"
- (plus two warning bullets)

## Plan

Add a new bullet after "Plugin marketplace for discovery and one-click install" describing the root-level SKILL.md shortcut:

```html
<li><strong>Root-level skill shortcut:</strong> a plugin with a top-level <code>SKILL.md</code> and no <code>skills/</code> subdirectory is automatically surfaced as a skill — no directory structure required for single-skill plugins.</li>
```

Insert after line 6841 (after the "Plugin marketplace" bullet, before the "Reserved MCP server name" warning).

## Acceptance Criteria

- The Plugins collapsible bullet list includes the root-level `SKILL.md` shortcut note
- The existing bullets are unchanged
- The new bullet is styled consistently with existing `<li>` entries
