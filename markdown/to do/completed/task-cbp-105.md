# CBP-105 — Add guidance on the /sandbox command

## Source
Requested with reference to: https://code.claude.com/docs/en/sandboxing

## Summary
Claude Code has a `/sandbox` command that enables OS-level sandboxing for Bash commands using Seatbelt (macOS) or bubblewrap (Linux/WSL2). The Cheat Sheet has no row for it, and the existing Subprocess Sandboxing collapsible only documents env vars and `sandbox.network.deniedDomains` — it needs to be significantly expanded to reflect the full feature.

## Assessment
Two places need updates:

1. **Cheat Sheet — Configuration & setup table** (`fsad-playbook.html` ~line 6228): No `/sandbox` row exists. Should be added after `/less-permission-prompts` since both deal with security hardening.

2. **Subprocess Sandboxing collapsible** (`fsad-playbook.html` ~lines 6866–6900): Currently only documents subprocess env vars (`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `CLAUDE_CODE_SCRIPT_CAPS`, etc.) and `sandbox.network.deniedDomains`. Needs a proper intro that leads with `/sandbox` as the entrypoint, documents the two sandbox modes, expands the settings keys table, and adds a platform-support note.

**Location:** `fsad-playbook.html` — lines ~6228 (Cheat Sheet) and ~6866–6900 (Power Usage collapsible)

## Plan

1. **Add `/sandbox` row to the Cheat Sheet** — Insert after the `/less-permission-prompts` row in the "Configuration & setup" table:
   ```html
   <tr><td><code>/sandbox</code></td><td>Enable OS-level sandboxing for Bash subprocesses — choose <strong>Auto-allow</strong> mode (sandboxed commands run without approval prompts) or <strong>Regular permissions</strong> mode (standard flow, sandbox still enforces boundaries). macOS: built-in via Seatbelt. Linux / WSL2: requires <code>bubblewrap</code> and <code>socat</code>.</td></tr>
   ```

2. **Expand the Subprocess Sandboxing collapsible** — Replace its opening paragraph and tables with a richer version that:
   - Leads with a one-paragraph intro explaining what OS-level sandboxing does and that `/sandbox` is the command to enable it
   - Documents the two modes (Auto-allow vs Regular permissions)
   - Adds a settings keys table covering: `sandbox.enabled`, `sandbox.filesystem.allowWrite`, `sandbox.filesystem.denyRead`, `sandbox.filesystem.allowRead`, `sandbox.network.allowedDomains`, `sandbox.network.deniedDomains`, `sandbox.failIfUnavailable`, `allowUnsandboxedCommands`
   - Keeps the existing env vars table (CLAUDE_CODE_SUBPROCESS_ENV_SCRUB, etc.) in a separate subsection
   - Updates the Use Case callout to cover both the OS-level sandbox and the env vars

All criteria verified 2026-05-05 before commit.

## Acceptance Criteria
- [x] `/sandbox` row appears in the Cheat Sheet "Configuration & setup" table, between `/less-permission-prompts` and `/mcp`
- [x] `/sandbox` row description mentions Auto-allow mode, Regular permissions mode, macOS Seatbelt, and Linux bubblewrap/socat requirement
- [x] Subprocess Sandboxing collapsible opens with an intro that mentions `/sandbox` as the command to enable sandboxing
- [x] Sandbox modes (Auto-allow and Regular permissions) are documented in the collapsible
- [x] Settings keys table is expanded to include at minimum: `sandbox.enabled`, `sandbox.filesystem.allowWrite`, `sandbox.network.allowedDomains`, `sandbox.network.deniedDomains`, `sandbox.failIfUnavailable`
- [x] Existing env vars table is preserved
- [x] HTML remains valid; no regression to other sections
