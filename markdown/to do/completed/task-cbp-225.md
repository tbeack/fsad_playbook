# CBP-225 — Update Remote Control collapsible: footer pill (not startup message) (v2.1.162)

## Summary

Claude Code v2.1.162 changed how Remote Control is surfaced in the UI. Previously it appeared as a startup message. Now it shows as a persistent footer pill (with a link to the session) instead of disappearing into the startup scroll. This makes it easier to access the remote session link at any time.

## Assessment

**Does this content exist in the playbook?**
Yes — the Remote Control & Cross-Device collapsible exists at line 10212–10236. The current description says "Control your terminal Claude session from the web, or move sessions between devices seamlessly." There is no mention of the footer pill behavior.

**What needs to change:**
Add a bullet point to the Remote Control collapsible's bullet list noting that when remote control is enabled, it appears as a persistent footer pill (with a link to the session) for easy access during the session.

## Plan

1. Read lines 10212–10236 of `fsad-playbook.html` to confirm the collapsible content.
2. Add a `<li>` to the bullet list inside the collapsible: `When enabled, Remote Control appears as a persistent footer pill with a direct link to the session — accessible at any time without scrolling back through startup messages (v2.1.162).`
3. Mark task complete in `todo.md`.

## Acceptance Criteria

- The Remote Control collapsible includes a note about the persistent footer pill behavior.
- Bullet list structure is preserved.
- HTML is valid.
