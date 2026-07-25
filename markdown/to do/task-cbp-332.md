# CBP-332 — Add `sandbox.network.strictAllowlist` to sandbox settings table

**Source:** Claude Code v2.1.219
**Date:** 2026-07-25

## Summary

Claude Code v2.1.219 added `sandbox.network.strictAllowlist` — a setting that denies all network connections to non-allowlisted hosts for sandboxed commands without prompting. This is a stricter enforcement mode for `sandbox.network.allowedDomains`.

## Assessment

**Does this content exist in the playbook? Where?**

The sandbox settings table (around lines 10878–10892) has:
- `sandbox.network.allowedDomains` (line 10884) — mentions `allowManagedDomainsOnly: true` for blocking unapproved domains
- `sandbox.network.deniedDomains` (line 10885)

`sandbox.network.strictAllowlist` is not in the playbook. It's distinct from `allowManagedDomainsOnly` because it applies specifically to sandboxed commands and denies silently without prompting.

**What needs to change:**
Add a new row after `sandbox.network.deniedDomains` for `sandbox.network.strictAllowlist`.

## Plan

### Step 1: Locate the insertion point
After the `sandbox.network.deniedDomains` row at line 10885.

### Step 2: Insert new row
```html
<tr><td><code>sandbox.network.strictAllowlist</code></td><td>Set to <code>true</code> to silently deny all network connections from sandboxed commands to non-allowlisted hosts — no permission prompt is shown. Stricter than the default <code>allowManagedDomainsOnly</code> behavior; use in high-security environments or CI where unexpected network access should fail hard rather than pause for input (v2.1.219).</td></tr>
```

## Acceptance Criteria
- New `sandbox.network.strictAllowlist` row appears after `sandbox.network.deniedDomains` in the sandbox table
- Description clearly distinguishes it from `allowManagedDomainsOnly: true`
- HTML is valid and follows the existing `<tr><td><code>...</code></td><td>...</td></tr>` pattern
