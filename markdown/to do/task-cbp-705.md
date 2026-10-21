# CBP-705 — Add `sandbox.allowNestedUserNamespaces` setting to sandbox settings table

## Summary

Claude Code v2.1.305 adds `sandbox.allowNestedUserNamespaces` so sandboxed commands on Linux can create user namespaces (needed for Chromium and rootless podman). The changelog is explicit that this lets sandboxed commands get around the sandbox's file protections — it's a weakening of isolation, not a neutral compatibility knob.

## Assessment

Not yet documented. `src/pages/practices.html` has a "Key `settings.json` keys" table for sandbox settings (around line 2703–2720) that documents `sandbox.filesystem.*`, `sandbox.network.*`, `sandbox.allowUnsandboxedCommands`, `sandbox.allowAppleEvents`, `sandbox.credentials`, etc. `sandbox.allowNestedUserNamespaces` belongs in this table, ordered near the other Linux-only sandbox escape-hatch settings.

## Plan

1. Open `src/pages/practices.html`.
2. In the sandbox settings table, after the `sandbox.allowUnsandboxedCommands` row (~line 2717), add:

```html
<tr><td><code>sandbox.allowNestedUserNamespaces</code></td><td>(Linux only) Set to <code>true</code> to let sandboxed commands create user namespaces — needed for Chromium and rootless podman. This gets around the sandbox's file protections, so only enable it when you trust the commands being sandboxed (v2.1.305).</td></tr>
```

3. Save the file.

## Acceptance Criteria

- The sandbox settings table documents `sandbox.allowNestedUserNamespaces`, including the security caveat that it bypasses file protections.
- No other rows are affected.
