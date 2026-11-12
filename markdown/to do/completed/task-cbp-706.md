# CBP-706 — `sandbox.allowNestedUserNamespaces` new config

## Summary
Claude Code v2.1.305 added `sandbox.allowNestedUserNamespaces`. When set to `true`, sandboxed commands on Linux can create user namespaces. This allows tools such as Chromium and rootless podman to run inside the sandbox.

## Assessment
The playbook has a sandbox settings table in `src/pages/practices.html` (around lines 2706-2719). The table ends with `sandbox.credentials`. The new `sandbox.allowNestedUserNamespaces` is Linux-only and belongs near `sandbox.bwrapPath` and `sandbox.socatPath`, which are also Linux/WSL only (lines 2715-2716). Insert it after `sandbox.socatPath`.

## Plan
1. Open `src/pages/practices.html`.
2. Find the row for `sandbox.socatPath` (line 2716).
3. Insert a new `<tr>` row directly after it.

**Row to insert (after sandbox.socatPath row):**
```html
<tr><td><code>sandbox.allowNestedUserNamespaces</code></td><td>(Linux only) Set to <code>true</code> to allow sandboxed commands to create user namespaces — required by Chromium and rootless podman. The sandbox's file protections remain in effect; only user namespace creation is unlocked (v2.1.305).</td></tr>
```

## Acceptance Criteria
- The new row appears after `sandbox.socatPath` in the sandbox settings table.
- The description notes the Linux-only constraint and the use cases.
- The playbook builds without error.
