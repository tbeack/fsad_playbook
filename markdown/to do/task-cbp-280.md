# CBP-280 — Update sandbox network allowed-domains row: hosts now remembered for session (v2.1.191)

## Summary

Claude Code v2.1.191 improved the sandbox network permission dialog: when you allow a host by answering "Yes" to a sandbox network prompt, that host is now remembered for the rest of the session — previously you would be re-prompted on every connection to the same host.

## Assessment

Current `sandbox.network.allowedDomains` row (line 10691 of `fsad-playbook.html`):
```
<tr><td><code>sandbox.network.allowedDomains</code></td><td>Allowlist of domains Bash subprocesses may reach. New domain requests trigger a permission prompt; use <code>allowManagedDomainsOnly: true</code> to block unapproved domains automatically.</td></tr>
```

Content exists but is missing the session-memory improvement. Adding a note here helps users understand that interactive domain approvals stick for the whole session.

## Plan

Update the `sandbox.network.allowedDomains` row description to mention that hosts allowed interactively are now session-persistent.

**New text for the `<td>`:**
```
Allowlist of domains Bash subprocesses may reach. New domain requests trigger a permission prompt; use <code>allowManagedDomainsOnly: true</code> to block unapproved domains automatically. As of v2.1.191, hosts approved interactively with "Yes" during a session are remembered for the rest of that session — no re-prompting on subsequent connections to the same host.
```

**File:** `fsad-playbook.html`, line 10691
**Pattern:** Edit the `<td>` content of the `sandbox.network.allowedDomains` row in the sandbox settings table.

## Acceptance Criteria

- [ ] `sandbox.network.allowedDomains` row mentions session-persistent interactive approvals
- [ ] Version attribution (v2.1.191) is included
- [ ] No HTML structure broken
