# CBP-138 — Document plugin default folder conflict warning in Plugins collapsible (v2.1.140)

## Summary

Claude Code v2.1.140 added a warning: when `plugin.json` explicitly sets a key that corresponds to a default component folder (e.g., setting `"commands": "my-cmds/"` causes the default `commands/` folder to be silently ignored), Claude Code now warns the author. The warning is visible in `/doctor`, `claude plugin list`, and `/plugin`.

This is actionable guidance for plugin authors: if you configure a `plugin.json` key that matches a default folder name, the default folder is bypassed — intentionally or not — and you will now see a warning to confirm the intent.

## Assessment

**Existing coverage:** The Plugins collapsible (`id="power-usage--plugins"`, lines 6812–6856) covers install/uninstall, `--plugin-dir`, `--plugin-url`, the reserved `workspace` MCP name, and `alwaysLoad`. It does not mention the default component folder override warning.

**What needs to change:** Add a note to the bullet list in the Plugins collapsible (after the `workspace` reserved name item) explaining this new warning.

## Plan

1. Read lines 6836–6856 to confirm the exact structure of the bullet list.
2. Append a new `<li>` after the `workspace` reserved name item with guidance on the default folder override warning.

**Text to insert (after the `workspace` reserved name `<li>`):**
```html
          <li><strong>Default folder override warning:</strong> if <code>plugin.json</code> explicitly sets a key (e.g. <code>"commands"</code>) that matches a default component folder, that default folder is silently skipped. Claude Code v2.1.140 now warns when this happens — visible in <code>/doctor</code>, <code>claude plugin list</code>, and <code>/plugin</code>. If you see the warning and the override is intentional, no action is needed.</li>
```

## Acceptance Criteria
- The new bullet appears in the Plugins collapsible list after the `workspace` reserved name item
- Text clearly explains: (a) what triggers the warning, (b) where the warning appears, (c) what to do if it's intentional
- Styling matches existing `<li>` items in the same list
