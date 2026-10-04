# CBP-629 — Add GPT-6.1 Sol to Amazon Bedrock Mantle/Runtime catalogs

## Summary
rust-v0.159.1 added GPT-6.1 Sol as the default model in the bundled catalog and Amazon Bedrock Mantle and Runtime catalogs. This replaces GPT-6 Sol/Luna as the primary default in these catalogs.

## Assessment
Two places need updating in `src/pages/codex.html`:

1. The Amazon Bedrock table row (around line 1358): currently shows `gpt-5.6`, `gpt-6-astra`, `gpt-6-sol`, `gpt-6-luna`. GPT-6.1 Sol should be added.
2. The Amazon Bedrock description paragraph (around line 1435): ends with "GPT-6 Sol and GPT-6 Luna are also available on Amazon Bedrock." A sentence about GPT-6.1 Sol as the new default should be appended.

## Plan
1. Read `src/pages/codex.html` around lines 1355–1362 (Bedrock table row).
2. Update the Amazon Bedrock table cell to add `gpt-6.1-sol` and note rust-v0.159.1:
   - Change: `gpt-5.6`, `gpt-6-astra`, `gpt-6-sol`, `gpt-6-luna`
   - To: `gpt-5.6`, `gpt-6-astra`, `gpt-6-sol`, `gpt-6-luna`, `gpt-6.1-sol`
   - Also update the Configuration column note to add "; GPT-6.1 Sol added as default in Mantle/Runtime catalogs in rust-v0.159.1"

3. Read around line 1435 (Bedrock description paragraph).
4. Append to the end of the Bedrock description: " As of rust-v0.159.1, **GPT-6.1 Sol** is the new bundled default model in the Mantle and Runtime catalogs."

5. Mark CBP-629 complete in `todo.md`.

## Acceptance Criteria
- The Amazon Bedrock table row includes `gpt-6.1-sol` in its example models cell.
- The Bedrock description paragraph ends with the GPT-6.1 Sol note.
- No other rows or paragraphs are changed.
