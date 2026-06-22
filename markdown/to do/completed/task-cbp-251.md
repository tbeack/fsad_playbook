# CBP-251: Add `wheelScrollAccelerationEnabled` to Notable settings.json Keys callout

## Summary
Claude Code v2.1.174 added the `wheelScrollAccelerationEnabled` setting. Set this to `false` to disable mouse-wheel scroll acceleration in fullscreen mode. This is useful for users who find the default scroll acceleration behavior disorienting when navigating long outputs in Claude Code's fullscreen TUI.

## Assessment
The Notable settings.json Keys callout is at line ~8573–8589 in `fsad-playbook.html`. The current list will end with `enforceAvailableModels` after CBP-250 is applied.

The `wheelScrollAccelerationEnabled` setting is NOT present anywhere in the playbook. New entry required.

## Plan
1. Read the Notable settings.json Keys callout after CBP-250 is applied.
2. The `enforceAvailableModels` entry will be the last item (margin-bottom:0).
3. Insert a new `<li>` for `wheelScrollAccelerationEnabled` after `disableBundledSkills` but before `enforceAvailableModels` (since it is a display/UX setting rather than an enterprise security setting, it fits better near other display settings).

Actually, for consistency, insert immediately before `enforceAvailableModels` (which will be the last item). Change `enforceAvailableModels` margin to `margin-bottom:0.4rem` and make the new entry `margin-bottom:0`.

New list item to insert before `enforceAvailableModels`:
```html
<li style="margin-bottom:0.4rem;"><code>wheelScrollAccelerationEnabled</code> — Set <code>false</code> to disable mouse-wheel scroll acceleration in fullscreen mode. Default is <code>true</code>. Useful if the default acceleration feels too fast when scrolling long outputs (v2.1.174).</li>
```

And update `enforceAvailableModels` to remain `margin-bottom:0`.

## Acceptance Criteria
- The Notable settings.json Keys callout contains a bullet for `wheelScrollAccelerationEnabled`.
- The description accurately reflects: disables scroll acceleration in fullscreen mode, default is true.
- All other list items remain unchanged.
- Spacing is consistent: `wheelScrollAccelerationEnabled` has `margin-bottom:0.4rem`, `enforceAvailableModels` has `margin-bottom:0`.
