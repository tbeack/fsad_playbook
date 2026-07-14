# CBP-303: Add `vimInsertModeRemaps` setting to Notable settings.json Keys callout (v2.1.208)

## Summary

Claude Code v2.1.208 added a new `vimInsertModeRemaps` settings key. It allows users in vim mode to map two-key insert-mode sequences like `jj` to Escape. This is a quality-of-life improvement for vim users.

## Assessment

Not documented anywhere in the playbook. Should be added to the Notable settings.json Keys callout in the Config Cascade section.

After CBP-302's changes, the callout's last bullet will be `axScreenReader` (with `margin-bottom:0`). This task adds `vimInsertModeRemaps` after that — meaning `axScreenReader` needs its margin bumped to `0.4rem` and `vimInsertModeRemaps` gets `margin-bottom:0`.

However, since CBP-302 and CBP-303 both touch this section, the execution order matters. We'll execute CBP-302 first, then CBP-303 appends after the `axScreenReader` bullet.

## Plan

### Step 1: Change `axScreenReader` bullet margin to `0.4rem`

The `axScreenReader` bullet (added by CBP-302) has `margin-bottom:0;` — change to `margin-bottom:0.4rem;`.

### Step 2: Add `vimInsertModeRemaps` as the new last bullet

```html
<li style="margin-bottom:0;"><code>vimInsertModeRemaps</code> — Map two-key insert-mode sequences to special keys in vim mode. Example: <code>{"vimInsertModeRemaps": {"jj": "Escape"}}</code> lets you exit insert mode by typing <code>jj</code> quickly — a common vim muscle-memory shortcut (v2.1.208).</li>
```

## Acceptance Criteria

- [ ] `vimInsertModeRemaps` bullet appears after `axScreenReader` in the Notable settings.json Keys callout
- [ ] `axScreenReader` bullet has `margin-bottom:0.4rem` after this change
- [ ] `vimInsertModeRemaps` bullet has `margin-bottom:0`
- [ ] HTML renders correctly
