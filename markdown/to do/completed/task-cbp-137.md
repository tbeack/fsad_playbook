# CBP-137 — Add `allowManagedHooksOnly` to Notable settings.json Keys (v2.1.140)

## Summary

Claude Code v2.1.140 fixed a bug where `/goal` silently hung when either `disableAllHooks` or `allowManagedHooksOnly` was set in settings. The fix now shows a clear message. The release note confirms `allowManagedHooksOnly` is a real user-facing settings key, but it is not yet documented in the playbook. `disableAllHooks` is already in the Notable settings.json Keys callout and referenced in the Hooks section; `allowManagedHooksOnly` should sit beside it.

## Assessment

**Existing coverage:** `disableAllHooks` is documented at line 3810 of `fsad-playbook.html` inside the Notable `settings.json` Keys callout (inside `page-practices`, Config Cascade section). `allowManagedHooksOnly` does not appear anywhere in the file.

**What needs to change:** Add a new `<li>` for `allowManagedHooksOnly` directly after the `disableAllHooks` list item in the Notable settings.json Keys callout.

## Plan

1. Read lines 3803–3815 to confirm the exact text of the `disableAllHooks` `<li>`.
2. Insert a new `<li>` for `allowManagedHooksOnly` immediately after the `disableAllHooks` item.

**Text to insert (after the `disableAllHooks` line):**
```html
        <li style="margin-bottom:0.4rem;"><code>allowManagedHooksOnly</code> — When set to <code>true</code>, only hooks distributed via managed settings (MDM/org policy) are allowed to run; user-defined hooks in project and user <code>settings.json</code> are blocked. Useful for enterprise environments that want to control hook execution centrally.</li>
```

## Acceptance Criteria
- `allowManagedHooksOnly` appears in the Notable settings.json Keys callout immediately after `disableAllHooks`
- Description explains the enterprise use case (managed/MDM hooks only; user hooks blocked)
- No styling regressions — list items remain consistent
