# CBP-604 [Codex] Update Amazon Bedrock row + collapsible for GPT-6 Sol and Luna (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 adds GPT-6 Sol and Luna to the Amazon Bedrock provider. The OpenAI row in the Multi-Provider Models table already lists `gpt-6-sol` and `gpt-6-luna` (from CBP-595). The Amazon Bedrock row and the Amazon Bedrock collapsible section need updating to reflect these new models.

## Assessment

**Multi-Provider Models table — Amazon Bedrock row** (`src/pages/codex.html`, line ~1356):
```
<tr><td>Amazon Bedrock</td><td><code>gpt-5.6</code>, <code>gpt-6-astra</code>, hosted foundation models</td><td>Built-in provider — AWS profile + region (rust-v0.148.0); GPT-6-Astra on Mantle/Runtime routes (rust-v0.153.3)</td></tr>
```
Needs `gpt-6-sol` and `gpt-6-luna` added to the models cell and a note added to the description cell.

**Amazon Bedrock collapsible** (`src/pages/codex.html`, line ~1433):
The trailing `<p>` that lists per-version Bedrock updates needs a new sentence about GPT-6 Sol and Luna arriving in rust-v0.157.0.

## Plan

1. Read `src/pages/codex.html` lines 1350–1360 (Bedrock table row).
2. Edit the Amazon Bedrock row models cell: append `<code>gpt-6-sol</code>, <code>gpt-6-luna</code>` after `gpt-6-astra`.
3. Edit the Amazon Bedrock row description cell: append "; GPT-6 Sol and Luna added via Bedrock in rust-v0.157.0".
4. Read `src/pages/codex.html` lines 1428–1438 (Bedrock collapsible body paragraph).
5. Append a sentence to the trailing `<p style="margin-top:0.75rem; font-size:0.88rem; ...">` paragraph: "As of rust-v0.157.0, <strong>GPT-6 Sol and Luna</strong> are also available on Amazon Bedrock."

## Acceptance Criteria

- The Amazon Bedrock row in the Multi-Provider Models table lists `gpt-6-sol` and `gpt-6-luna`.
- The Amazon Bedrock collapsible body mentions GPT-6 Sol and Luna with rust-v0.157.0 version tag.
- No HTML is broken; the build succeeds.
