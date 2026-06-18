# CBP-259 — Add `sandbox.allowAppleEvents` to sandbox settings table (v2.1.181)

## Summary
Claude Code v2.1.181 added `sandbox.allowAppleEvents` — an opt-in setting that lets sandboxed commands send Apple Events on macOS. This was added alongside adding the Apple Events entitlement (which fixed `open`, `osascript`, and browser-based auth flows failing with error -600 on macOS).

## Assessment
The sandbox settings table exists at lines 10593–10604 in `fsad-playbook.html`. The last row is `sandbox.allowUnsandboxedCommands` at line 10602. The new `sandbox.allowAppleEvents` key is not present. This is a macOS-specific setting that belongs in this table.

## Plan
1. Edit `fsad-playbook.html` after line 10602
2. Add a new `<tr>` for `sandbox.allowAppleEvents` after `sandbox.allowUnsandboxedCommands` (just before `</tbody>` at line 10603)

**New row to insert:**
```html
<tr><td><code>sandbox.allowAppleEvents</code></td><td>(macOS only) Set to <code>true</code> to allow sandboxed commands to send Apple Events — enables <code>open</code>, <code>osascript</code>, and browser-based auth flows that rely on Apple Events (v2.1.181)</td></tr>
```

## Acceptance Criteria
- `sandbox.allowAppleEvents` row appears in the sandbox settings table
- Description explains it is macOS-only and enables Apple Events from sandboxed commands
- Examples include `open`, `osascript`, or browser auth flows as use cases
