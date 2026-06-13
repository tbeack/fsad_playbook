# CBP-254: Add `awsCredentialExport` Bedrock credential caching note to Notable settings.json Keys callout

## Summary
Claude Code v2.1.176 improved Bedrock credential caching: credentials obtained from `awsCredentialExport` are now cached until their `Expiration` field (from the AWS credentials response) instead of a fixed 1-hour TTL. This is significant for teams using custom credential vending (e.g., AWS STS `AssumeRole` with short-lived tokens) who previously hit unnecessary re-auth cycles.

## Assessment
`awsCredentialExport` does not appear in `fsad-playbook.html` at all. The Notable settings.json Keys callout (lines 8573–8593) is the canonical place to document new settings keys. It should be added as a new `<li>` bullet there, following the pattern of other Bedrock-specific entries. The current last item (`footerLinksRegexes`) has `margin-bottom:0;` and must be updated to `margin-bottom:0.4rem;` when the new item becomes the last.

## Plan
1. Read lines 8589–8594 of `fsad-playbook.html` to confirm exact insertion point.
2. Change `footerLinksRegexes` from `margin-bottom:0;` to `margin-bottom:0.4rem;`.
3. Add a new `<li>` as the last item with `margin-bottom:0;`:
   ```html
   <li style="margin-bottom:0;"><code>awsCredentialExport</code> — Amazon Bedrock only. Path to a script or command that vends short-lived AWS credentials (e.g. via STS <code>AssumeRole</code>). Credentials returned by the script are now cached until their <code>Expiration</code> field rather than a fixed 1-hour TTL — reducing unnecessary re-auth cycles for tokens with longer lifetimes (v2.1.176).</li>
   ```

## Acceptance Criteria
- `awsCredentialExport` appears in the Notable settings.json Keys `<ul>` list as the last item.
- Description mentions Bedrock-only scope, the credential vending purpose, and the caching-until-Expiration improvement.
- The `(v2.1.176)` version tag is included.
- `footerLinksRegexes` is updated to `margin-bottom:0.4rem;` (no longer the last item).
- No other content is changed.
