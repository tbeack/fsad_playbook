# CBP-702 — Add `/claude-api managed-agents-secure`

## Summary

Claude Code v2.1.304 adds `/claude-api managed-agents-secure`, which compares a Managed Agents agent's settings with Anthropic's published security guide, without changing anything.

## Assessment

Not yet documented. The `/claude-api` subcommand rows live in `src/pages/practices.html`; `managed-agents-onboard` is the most recently added sibling, at line ~1894. Add the new row directly after it.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `/claude-api managed-agents-onboard` row (line ~1894).
3. Insert a new `<tr>` row immediately after it:

```html
<tr><td><code>/claude-api managed-agents-secure</code></td><td>Compare a Managed Agents agent's settings against Anthropic's published security guide, without changing anything (v2.1.304).</td></tr>
```

4. Save the file.

## Acceptance Criteria

- The row appears immediately after `/claude-api managed-agents-onboard` in the slash commands table.
- The row makes clear this is a read-only comparison.
