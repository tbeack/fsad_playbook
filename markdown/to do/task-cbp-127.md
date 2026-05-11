# CBP-127 — Add `sandbox.bwrapPath` and `sandbox.socatPath` to Subprocess Sandboxing settings table (v2.1.133)

## Summary

Claude Code v2.1.133 added two new managed settings for Linux/WSL sandboxing:
- `sandbox.bwrapPath` — custom path to the bubblewrap (`bwrap`) binary
- `sandbox.socatPath` — custom path to the socat binary

These are needed when `bwrap` or `socat` are installed in non-standard locations (e.g. sysadmin-managed systems, corporate Linux images, container base images). Without them, sandbox startup fails if the default PATH lookup doesn't find these binaries.

## Assessment

The Subprocess Sandboxing settings table is at approximately lines 6920–6947 of `fsad-playbook.html`. It currently lists sandbox settings including `sandbox.filesystem.allowWrite`, `sandbox.filesystem.denyRead`, `sandbox.network.allowedDomains`, `sandbox.network.deniedDomains`, `sandbox.failIfUnavailable`, and `sandbox.allowUnsandboxedCommands`.

`sandbox.bwrapPath` and `sandbox.socatPath` are **not in this table**. They are Linux/WSL-specific settings relevant to teams running Claude Code in enterprise Linux environments.

## Plan

1. Read lines 6920–6948 of `fsad-playbook.html` to confirm exact table structure.
2. Add two rows for `sandbox.bwrapPath` and `sandbox.socatPath` after `sandbox.failIfUnavailable` and before `sandbox.allowUnsandboxedCommands` (or at end of table).
3. Add a "(Linux/WSL only)" note to descriptions.

## Acceptance Criteria

- [ ] `sandbox.bwrapPath` row appears in the Subprocess Sandboxing settings table
- [ ] `sandbox.socatPath` row appears in the Subprocess Sandboxing settings table
- [ ] Both rows note they are Linux/WSL specific
- [ ] Both rows explain the purpose (custom binary path for non-standard installations)
- [ ] Styling matches existing table rows
- [ ] No existing rows are changed or removed
