# CBP-726: [Codex] Update `/model` and `/permissions` rows with inline argument syntax (rust-v0.164.0)

## Summary

Codex rust-v0.164.0 added inline argument support to `/model` and `/permissions`. Users can now set model, reasoning effort, speed, and permission profiles directly in the command without opening a picker. For example: `/model gpt-6.1-sol` or `/permissions suggest`.

## Assessment

The Cheat Sheet slash commands table at `src/pages/codex.html` has:
- Line 1000: `/model` — "Switch model and/or reasoning level mid-session" (no inline arg mention)
- Line 1008: `/permissions` — "Change approval mode mid-session" (no inline arg mention)

Both rows need updating to mention inline argument support. This is an update to existing rows.

## Plan

1. Read `src/pages/codex.html` around lines 1000 and 1008.
2. Update the `/model` row description to add inline argument support.
3. Update the `/permissions` row description to add inline argument support.

**`/model` row — change from:**
```
Switch model and/or reasoning level mid-session
```
**To:**
```
Switch model and/or reasoning level mid-session. Pass inline arguments to set model, reasoning effort, and speed directly — e.g. <code>/model gpt-6.1-sol</code> — without opening a picker. (inline args: rust-v0.164.0)
```

**`/permissions` row — change from:**
```
Change approval mode mid-session
```
**To:**
```
Change approval mode mid-session. Pass a profile name inline — e.g. <code>/permissions suggest</code> — to apply it immediately. (inline args: rust-v0.164.0)
```

## Acceptance Criteria

- `/model` row mentions inline argument syntax and cites rust-v0.164.0.
- `/permissions` row mentions inline argument syntax and cites rust-v0.164.0.
- Both rows still describe their primary function accurately.
