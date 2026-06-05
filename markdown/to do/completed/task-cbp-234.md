# CBP-234 — Add requiredMinimumVersion/requiredMaximumVersion to Notable settings.json Keys callout (v2.1.163)

## Summary

Claude Code v2.1.163 added two new managed settings keys: `requiredMinimumVersion` and `requiredMaximumVersion`. When set via org/MDM managed settings, Claude Code refuses to start if its installed version is outside the allowed range and directs the user to install an approved version. This is an enterprise policy feature for controlling which Claude Code versions run in an organization.

## Assessment

**Does this content exist in the playbook?**

- Lines 8454–8466: The Notable settings.json Keys callout lists: `prUrlTemplate`, `otelHeadersHelper`, `disableAllHooks`, `allowManagedHooksOnly`, `skillOverrides`, `settings.autoMode.hard_deny`
- There is no mention of `requiredMinimumVersion` or `requiredMaximumVersion`

**What needs to change:** Add a new list item to the Notable settings.json Keys callout for both keys together (they work as a pair). Insert after the `allowManagedHooksOnly` entry (line 8462) since it's also an enterprise/managed-settings control.

## Plan

### Step 1: Add new list item after `allowManagedHooksOnly` (after line 8462)

The current last item in the `<ul>` before `settings.autoMode.hard_deny` is `allowManagedHooksOnly` at line 8462. We insert the new bullet after it (before `skillOverrides`):

Current sequence ending at line 8464:
```html
        <li style="margin-bottom:0.4rem;"><code>allowManagedHooksOnly</code> — When set to <code>true</code>, only hooks distributed via managed settings (MDM/org policy) are allowed to run; user-defined hooks in project and user <code>settings.json</code> are blocked. Useful for enterprise environments that want to control hook execution centrally.</li>
        <li style="margin-bottom:0.4rem;"><code>skillOverrides</code> — Control per-skill model visibility: ...
```

New — insert between `allowManagedHooksOnly` and `skillOverrides`:
```html
        <li style="margin-bottom:0.4rem;"><code>requiredMinimumVersion</code> / <code>requiredMaximumVersion</code> — Set via org managed settings to enforce a version range. Claude Code refuses to start if the installed version falls outside the range and directs the user to an approved version. Useful for enterprise compliance and rollout control.</li>
```

## Acceptance Criteria

- The Notable settings.json Keys callout contains a bullet for `requiredMinimumVersion` / `requiredMaximumVersion`
- The bullet appears logically after `allowManagedHooksOnly` (enterprise/managed-settings grouping)
- All existing bullets are preserved
- Formatting matches sibling `<li>` items
