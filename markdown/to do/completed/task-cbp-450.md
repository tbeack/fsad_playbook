# CBP-450 — `/login`: keyless sign-in via Anthropic Console account

## Summary
Claude Code v2.1.243 added a keyless sign-in under `/login` → Anthropic Console: "Sign in with your Console account" (recommended), alongside creating an API key — so organizations that don't allow API keys can sign in without one.

## Assessment
The Cheat Sheet `/login` row (line 11093) is currently a bare one-liner: `Sign in to Anthropic account`. This is its first enrichment.

## Plan
1. In `fsad-playbook.html`, locate the `/login` Cheat Sheet row (line 11093):
   ```html
   <tr><td><code>/login</code></td><td>Sign in to Anthropic account</td></tr>
   ```
2. Replace with:
   ```html
   <tr><td><code>/login</code></td><td>Sign in to Anthropic account. As of v2.1.243, choosing Anthropic Console offers a keyless "Sign in with your Console account" option (recommended) alongside creating an API key — useful for organizations that don't allow API keys.</td></tr>
   ```

## Acceptance Criteria
- [ ] `/login` row documents the v2.1.243 keyless Console sign-in option.
- [ ] Row remains a single well-formed `<tr>`.
