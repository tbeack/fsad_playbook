# CBP-489 — Extend `/usage-credits` Cheat Sheet row

## Summary
Claude Code v2.1.248 added `/usage-credits` support for Enterprise organizations billed through AWS Marketplace, self-serve Enterprise, and Enterprise trials, so members can request a higher usage limit from their admin.

## Assessment
`/usage-credits` already has a Cheat Sheet row in `src/pages/practices.html` (~line 1887): "View usage credits balance (alias: `/extra-usage`). Added in v2.1.144." This is a direct capability extension of that same command for a wider set of Enterprise billing arrangements — append a sentence to the existing row.

## Plan
1. In `src/pages/practices.html`, locate the `/usage-credits` Cheat Sheet row (~line 1887).
2. Append a sentence:
   ```html
   <tr><td><code>/usage-credits</code></td><td>View usage credits balance (alias: <code>/extra-usage</code>). Added in v2.1.144. As of v2.1.248, members of Enterprise organizations billed through AWS Marketplace, self-serve Enterprise, and Enterprise trials can use it to request a higher usage limit from their admin.</td></tr>
   ```

## Acceptance Criteria
- [x] `/usage-credits` Cheat Sheet row extended with the v2.1.248 Enterprise higher-limit-request capability.
