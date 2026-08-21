# CBP-418 — [Claude] Document self-hosted-runner `--defer-shutdown-max-min` and proxy-auth flags

## Source
Claude Code v2.1.238 release notes:
- Added `claude self-hosted-runner --defer-shutdown-max-min <minutes>`: on SIGTERM, keep serving attached sessions, park what is left after that many minutes, then exit.
- Added `claude self-hosted-runner --proxy-authorization-command` / `--proxy-authorization-file` for egress proxies that require a freshly issued `Proxy-Authorization` header on every connection.

## Summary
Two new CLI flags for `claude self-hosted-runner` shipped in v2.1.238: `--defer-shutdown-max-min` for graceful SIGTERM draining, and `--proxy-authorization-command`/`--proxy-authorization-file` for egress proxies needing freshly minted auth headers. The Self-Hosted Runner collapsible in Power Usage (`fsad-playbook.html`, `id="power-usage--self-hosted-runner"`, ~line 11612) documents runner registration and gating but has no content on shutdown behavior or proxy authentication.

## Assessment
Content does not exist. The collapsible's only code block is `claude self-hosted-runner` (registration). No mention of SIGTERM/shutdown or proxy auth flags anywhere in this subsection.

## Plan
1. In `fsad-playbook.html`, locate `id="power-usage--self-hosted-runner"` (~line 11612-11625).
2. Add a new `<p>` sentence after the existing intro paragraph (line 11618) or extend the code block (line 11619-11622) with two more example commands:
   - `claude self-hosted-runner --defer-shutdown-max-min 10` with a comment explaining graceful draining on SIGTERM.
   - `claude self-hosted-runner --proxy-authorization-command "..."` / `--proxy-authorization-file path` with a comment explaining freshly-minted `Proxy-Authorization` headers for egress proxies.
3. Follow the existing pattern in this file of versioned inline notes, e.g. `(v2.1.238)`.
4. Keep additions concise — 2-4 lines total added.

## Acceptance Criteria
- [ ] `--defer-shutdown-max-min` documented with its SIGTERM-drain behavior and `(v2.1.238)` tag.
- [ ] `--proxy-authorization-command` / `--proxy-authorization-file` documented with their purpose and `(v2.1.238)` tag.
- [ ] No existing content in the Self-Hosted Runner collapsible removed or broken.
- [ ] HTML structure (code-block, tags) remains valid.
