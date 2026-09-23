# CBP-595 — Add GPT-6 Sol and Luna to model table (rust-v0.156.1)

## Summary

In rust-v0.156.1, Codex added GPT-6 Sol and GPT-6 Luna to the model picker. The rate-limit switch prompt now recommends GPT-6 Luna.

## Assessment

The Multi-Provider Models table in `src/pages/codex.html` (line 1351) has an OpenAI row that lists `gpt-5.5` and `codex-mini-latest`. GPT-6 Sol and Luna are not present.

The OpenAI row on line 1351 needs to be updated to include the new models.

## Plan

### Edit — Update OpenAI row in Multi-Provider Models table (line 1351)

Replace:
```
<tr><td>OpenAI</td><td><code>gpt-5.5</code>, <code>codex-mini-latest</code></td><td>Default — uses <code>OPENAI_API_KEY</code></td></tr>
```
With:
```
<tr><td>OpenAI</td><td><code>gpt-5.5</code>, <code>codex-mini-latest</code>, <code>gpt-6-sol</code>, <code>gpt-6-luna</code></td><td>Default — uses <code>OPENAI_API_KEY</code>. As of rust-v0.156.1, GPT-6 Sol and Luna are available from the model picker; the rate-limit switch prompt recommends GPT-6 Luna.</td></tr>
```

## Acceptance Criteria

- The OpenAI row in the Multi-Provider Models table includes `gpt-6-sol` and `gpt-6-luna`.
- There is a note about the rate-limit switch prompt recommending GPT-6 Luna.
- The note references rust-v0.156.1.
