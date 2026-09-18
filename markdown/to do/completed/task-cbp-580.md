# CBP-580: Update Amazon Bedrock coverage — command-sourced AWS credentials (rust-v0.155.0)

## Source
Codex CLI rust-v0.155.0 release notes: "Amazon Bedrock can now obtain AWS credentials from configured commands, with caching, expiration-based refresh, and authentication recovery." (#44028)

## Summary
Beyond static AWS profiles/env vars, Codex's Bedrock provider can now run a configured command to obtain AWS credentials, caching the result and refreshing it automatically as it nears expiration, with recovery if authentication fails.

## Assessment
`src/pages/codex.html` `#codex-power-usage` has an "Amazon Bedrock" collapsible (~line 1396-1410) documenting AWS SigV4 signing, profile/env credential resolution, `aws login` console-login support, and the built-in-provider history. `#codex-cheat-sheet` also has an `AWS_PROFILE` / `AWS_REGION` Environment Variables row (~line 1088). Command-sourced credentials are a new credential-resolution path for the same already-documented provider — **update-existing**.

## Plan
1. Open `src/pages/codex.html`.
2. Extend the "Amazon Bedrock" collapsible paragraph (~line 1410) with a sentence: as of rust-v0.155.0, Bedrock can also obtain AWS credentials by running a configured command, with the result cached and refreshed automatically as it nears expiration, plus recovery if authentication fails — useful for teams whose AWS credentials come from an internal vending tool rather than a static profile.
3. Mark CBP-580 complete in `markdown/to do/todo.md`.

## Acceptance Criteria
- The "Amazon Bedrock" collapsible mentions command-sourced AWS credentials with caching/refresh/recovery, tagged `rust-v0.155.0`.
- `python3 scripts/build-source.py` completes without error after the edit.
