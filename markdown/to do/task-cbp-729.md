# CBP-729: [Codex] Update Amazon Bedrock collapsible — setup wizard enabled by default (rust-v0.164.0)

## Summary

Codex rust-v0.164.0 enabled the Amazon Bedrock setup wizard by default, with API key entry grouped alongside other AWS sign-in methods when credentials are detected. Previously the wizard required opting in.

## Assessment

The Amazon Bedrock collapsible at `src/pages/codex.html` line 1451 ends with "As of rust-v0.159.1, GPT-6.1 Sol is the new default model in the Mantle and Runtime catalogs." The setup wizard being enabled by default is a user-facing change that simplifies Bedrock onboarding — it belongs at the end of this paragraph as an additional "As of rust-v0.164.0" note.

## Plan

1. Read `src/pages/codex.html` line 1451 for the Amazon Bedrock collapsible body paragraph.
2. Append a sentence about the setup wizard being enabled by default.

**Append to the end of the paragraph at line 1451 (before the closing `</p>`):**
```
 As of rust-v0.164.0, the <strong>Bedrock setup wizard is enabled by default</strong> — Codex surfaces it automatically when AWS credentials are detected, with API key entry grouped alongside other AWS sign-in methods for a consistent onboarding flow.
```

## Acceptance Criteria

- The Amazon Bedrock collapsible mentions the setup wizard being enabled by default.
- The change cites rust-v0.164.0.
- The existing paragraph text is preserved.
