# CBP-614 [Codex] Update Amazon Bedrock row + collapsible for GPT-6 Sol and Luna (rust-v0.157.0)

## Summary

Codex rust-v0.157.0 adds GPT-6 Sol and Luna to the Amazon Bedrock provider. The OpenAI row in the Multi-Provider Models table already lists `gpt-6-sol` and `gpt-6-luna` (from CBP-595). The Amazon Bedrock row and the Amazon Bedrock collapsible section needed updating to reflect these new models.

## Assessment

**Multi-Provider Models table — Amazon Bedrock row** — needed `gpt-6-sol` and `gpt-6-luna` added to the models cell and a note in the description cell.

**Amazon Bedrock collapsible** — needed a new sentence about GPT-6 Sol and Luna arriving in rust-v0.157.0.

## Plan

1. Edit the Amazon Bedrock row models cell: append `<code>gpt-6-sol</code>, <code>gpt-6-luna</code>` after `gpt-6-astra`.
2. Edit the Amazon Bedrock row description cell: append "; GPT-6 Sol and Luna added in rust-v0.157.0".
3. Append a sentence to the trailing paragraph in the Bedrock collapsible body: "As of rust-v0.157.0, **GPT-6 Sol and GPT-6 Luna** are also available on Amazon Bedrock."

## Acceptance Criteria

- The Amazon Bedrock row in the Multi-Provider Models table lists `gpt-6-sol` and `gpt-6-luna`.
- The Amazon Bedrock collapsible body mentions GPT-6 Sol and Luna with rust-v0.157.0 version tag.
- No HTML is broken; the build succeeds.
