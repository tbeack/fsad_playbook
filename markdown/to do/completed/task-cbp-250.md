# CBP-250: Add `enforceAvailableModels` to Notable settings.json Keys callout

## Summary
Claude Code v2.1.175 added the `enforceAvailableModels` managed setting. When enabled by an org administrator:
- The `availableModels` allowlist also constrains the Default model — if Default would resolve to a disallowed model, it falls back to the first allowed model.
- User or project settings can no longer widen (override) a managed `availableModels` list.

This is an enterprise/org policy setting that belongs in the Notable settings.json Keys callout alongside similar enterprise controls like `allowManagedHooksOnly` and `requiredMinimumVersion`/`requiredMaximumVersion`.

## Assessment
The Notable settings.json Keys callout is at line ~8573–8589 in `fsad-playbook.html`. The current list ends with:
```html
<li style="margin-bottom:0;"><code>disableBundledSkills</code> — ...</li>
```

The `enforceAvailableModels` setting is NOT present anywhere in the playbook. New entry required.

## Plan
1. Read the Notable settings.json Keys callout (lines ~8573–8589).
2. Insert a new `<li>` after the `disableBundledSkills` entry (currently the last item).
3. Change `margin-bottom:0` on `disableBundledSkills` to `margin-bottom:0.4rem` to maintain consistent spacing.
4. The new entry should have `margin-bottom:0` (last item).

New list item:
```html
<li style="margin-bottom:0;"><code>enforceAvailableModels</code> — Enterprise managed setting. When enabled, the <code>availableModels</code> allowlist also constrains the Default model — a Default that would resolve to a disallowed model falls back to the first allowed model. User or project settings can no longer widen a managed <code>availableModels</code> list. Set via org/MDM managed settings only (v2.1.175).</li>
```

## Acceptance Criteria
- The Notable settings.json Keys callout contains a bullet for `enforceAvailableModels`.
- The description accurately reflects: constrains Default model + blocks user/project widening of the allowlist.
- All other list items remain unchanged.
- Spacing is consistent with surrounding items.
