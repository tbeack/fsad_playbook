# CBP-172: [Codex] Update Codex Plugins collapsible — marketplace CLI + version-aware sharing (v0.131.0)

## Source
Codex CLI v0.131.0

## Summary
Codex v0.131.0 added:
- Plugin marketplace CLI commands (install, update, share with version awareness)
- Version-aware sharing with share checkout and clearer shared-workspace buckets
- Default-enabled plugin hooks

## Assessment
The Codex Plugins collapsible at line 9469 ends with the note about v0.130.0 plugin details showing bundled hooks. Add a v0.131.0 bullet noting the new marketplace CLI commands, version-aware sharing, and default-enabled plugin hooks.

## Plan
1. Read lines 9462–9475 in `fsad-playbook.html`.
2. Append a new bullet or extend the existing paragraph after the v0.130.0 note:

**Text to add:**
`As of v0.131.0, plugin workflows gained marketplace CLI commands (<code>codex plugin share</code>, version-aware publish/checkout), and plugin hooks are default-enabled on install.`

## Acceptance Criteria
- Codex Plugins collapsible mentions v0.131.0 marketplace CLI commands and version-aware sharing
- Plugin hooks default-enabled behavior is noted
