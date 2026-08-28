# CBP-484 — Document `--restricted` / `CLAUDE_CODE_RESTRICTED=1`

## Summary
Claude Code v2.1.248 added `--restricted` (or `CLAUDE_CODE_RESTRICTED=1`): removes the built-in tools that run commands or code and `WebFetch` (unless named in `--tools`), keeps file tools inside the working directory, refuses `bypassPermissions`, and ignores user, project and local settings files.

## Assessment
The Subprocess Sandboxing collapsible's "Hardening env vars (shared environments & CI/CD)" table in `src/pages/practices.html` (~line 2755-2794) is the established home for CLI/env-var flags that harden Claude Code for shared or unattended environments (e.g. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `DISABLE_UPDATES`). `--restricted` is the strongest such flag yet — a full lockdown mode — so it belongs as a new row there rather than a new collapsible.

## Plan
1. In `src/pages/practices.html`, locate the hardening env vars table body (~line 2760, first row `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1`).
2. Insert a new row near the top of that table (it's the broadest lockdown flag):
   ```html
   <tr><td><code>--restricted</code> / <code>CLAUDE_CODE_RESTRICTED=1</code></td><td>Full lockdown mode: removes the built-in tools that run commands or code and <code>WebFetch</code> (unless explicitly named in <code>--tools</code>), keeps file tools confined to the working directory, refuses <code>bypassPermissions</code>, and ignores user, project, and local settings files. Use for untrusted or high-risk automated contexts where no code execution or arbitrary network egress should be possible (v2.1.248).</td></tr>
   ```

## Acceptance Criteria
- [x] `--restricted` / `CLAUDE_CODE_RESTRICTED=1` documented as a new row in the Subprocess Sandboxing hardening env vars table.
