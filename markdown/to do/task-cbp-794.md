# CBP-794: [Codex] Add GPT-6.2 Sol and Astra to bundled model catalog (rust-v0.171.0)

## Summary
Codex rust-v0.171.0 added GPT-6.2 Sol and GPT-6.2 Astra to the model catalogs, with GPT-6.2 Sol as the new default selection.

## Assessment
`src/pages/codex.html`'s provider table OpenAI row (~line 1395) lists the bundled model catalog (`gpt-6.1-sol`, `gpt-6.1-terra`, etc.) and tracks each catalog addition/default change by version. It needs the GPT-6.2 models added and the new default noted.

## Plan
1. Open `src/pages/codex.html`.
2. In the OpenAI provider row, add `gpt-6.2-sol` and `gpt-6.2-astra` to the model list, and append after the existing rust-v0.165.0 sentence:
   ```
   GPT-6.2 Sol and GPT-6.2 Astra added to the bundled model catalog, with GPT-6.2 Sol as the new default model (rust-v0.171.0).
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The OpenAI provider row's model list includes `gpt-6.2-sol` and `gpt-6.2-astra`.
- The row notes GPT-6.2 Sol is now the default model (rust-v0.171.0).
- HTML is valid (no unclosed tags).

## Status
Implemented.
