# CBP-528 — Document GPT-6-Astra on Amazon Bedrock in Codex Best Practices

## Summary
Codex rust-v0.153.3 added GPT-6-Astra to the Amazon Bedrock model picker for Mantle and Runtime global/US routes. In rust-v0.153.4, Astra was made the default model in the bundled model picker when no model is explicitly configured, and async-question guidance was updated to qualify tool availability.

## Assessment
Not mentioned in the playbook. Two locations need updating in `src/pages/codex.html`:
1. Line 1301 — the provider table row for "Amazon Bedrock" currently lists `gpt-5.6` and foundation models. GPT-6-Astra should be added.
2. Line 1378 — the Bedrock collapsible prose mentions routing `gpt-5.6` through Bedrock. A note about GPT-6-Astra on Bedrock and it being the bundled default should be appended.

## Plan
1. Edit `src/pages/codex.html`
2. Update line 1301: add `gpt-6-astra` to the Amazon Bedrock example models cell
3. Append to line 1378 (Bedrock prose): note GPT-6-Astra availability on Bedrock routes and that it is now the bundled default

## Changes

### Line 1301 — provider table
Replace the Amazon Bedrock example models from `gpt-5.6, hosted foundation models` to include `gpt-6-astra`.

### Line 1378 — Bedrock prose (append to existing paragraph)
Add: "As of rust-v0.153.3, <strong>GPT-6-Astra</strong> is available on Amazon Bedrock via the Mantle and Runtime global/US routes. As of rust-v0.153.4, Astra is the bundled default model when no model is explicitly configured."

## Acceptance Criteria
- Provider table shows GPT-6-Astra for Amazon Bedrock
- Bedrock prose mentions GPT-6-Astra availability and default status
- Version tags rust-v0.153.3 and rust-v0.153.4 present
