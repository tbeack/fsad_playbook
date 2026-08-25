# CBP-440 — Subprocess Sandboxing: Bash prompt no longer lists allowed hosts

## Summary
Claude Code v2.1.243 changed the sandboxed Bash tool prompt to no longer list allowed network hosts up front — Claude now simply attempts a request (and you approve new hosts as they come up) instead of the tool prompt assuming any unlisted host is blocked.

## Assessment
The Power Usage → "Subprocess Sandboxing" collapsible (`#power-usage--subprocess-sandboxing`, lines 11822+) documents `sandbox.network.allowedDomains` at line ~11851 and already notes that "hosts approved interactively with 'Yes' during a session are remembered for the rest of that session" (v2.1.191). This change is a behavioral refinement to that same approval flow — the underlying prompt no longer pre-enumerates allowed hosts — and should be folded into that row.

## Plan
1. In `fsad-playbook.html`, locate the `sandbox.network.allowedDomains` row inside `#power-usage--subprocess-sandboxing` (line ~11851):
   ```html
   <tr><td><code>sandbox.network.allowedDomains</code></td><td>Allowlist of domains Bash subprocesses may reach. New domain requests trigger a permission prompt; use <code>allowManagedDomainsOnly: true</code> to block unapproved domains automatically. As of v2.1.191, hosts approved interactively with "Yes" during a session are remembered for the rest of that session — no re-prompting on subsequent connections to the same host.</td></tr>
   ```
2. Append a sentence to the end of that cell's `<td>` content:
   ```html
    As of v2.1.243, the sandboxed Bash tool prompt no longer pre-lists the full set of allowed hosts — Claude simply attempts a request and you approve new hosts as they come up, rather than assuming an unlisted host is blocked.
   ```

## Acceptance Criteria
- [ ] `sandbox.network.allowedDomains` row updated with the v2.1.243 behavior change.
- [ ] No other row duplicates this note.
- [ ] HTML structure (single `<tr><td>...</td><td>...</td></tr>`) remains valid — no unclosed tags.
