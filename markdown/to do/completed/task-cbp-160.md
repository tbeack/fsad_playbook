# CBP-160: [Codex] Bedrock auth supports `aws login` console-login profiles

## Source
Codex CLI v0.130.0 — Bedrock auth can now use AWS console-login credentials from `aws login` profiles.

## Summary
Update the Amazon Bedrock collapsible in Codex Power Usage (`#codex-power-usage`) to mention that in addition to standard AWS credential env vars and named profiles, `aws login` console-login credentials now work for Bedrock auth.

## Assessment
- Line ~9357-9363: Existing Bedrock collapsible shows `profile = "my-aws-profile"` and env var examples
- No mention of `aws login` console-login flow
- Update needed: add a note that `aws login` profiles (AWS console-login credentials) are supported

## Plan
1. Locate the Amazon Bedrock collapsible paragraph at line ~9363
2. Update the trailing explanatory sentence to mention `aws login` profile support

## Acceptance Criteria
- The Amazon Bedrock collapsible mentions `aws login` profile credentials are supported in addition to standard profile/env var auth
