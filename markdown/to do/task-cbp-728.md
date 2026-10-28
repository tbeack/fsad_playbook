# CBP-728: [Codex] Add GPT-6.1 Terra to model catalogs table (rust-v0.165.0)

## Summary

Codex rust-v0.165.0 added GPT-6.1 Terra to the model catalogs. The release note confirms it was backported to the bundled catalog. The model extends the GPT-6.1 family alongside GPT-6.1 Sol.

## Assessment

The Multi-Provider Models table at `src/pages/codex.html` line 1368 lists OpenAI models:
`gpt-5.5`, `codex-mini-latest`, `gpt-6-sol`, `gpt-6-luna`, `gpt-6.1-sol`

GPT-6.1 Terra is missing. It needs to be added to the OpenAI row's model list. The release confirms it was backported via PR #57337 to the bundled catalog, so it is available in the default OpenAI provider. Also check if the Amazon Bedrock row needs updating — the release notes do not explicitly mention Terra on Bedrock, only the bundled catalog, so add it only to the OpenAI row.

## Plan

1. Read `src/pages/codex.html` line 1368.
2. Add `gpt-6.1-terra` to the OpenAI row's model list.
3. Append a note about GPT-6.1 Terra to the configuration description.

**OpenAI row — change example models cell from:**
```
<code>gpt-5.5</code>, <code>codex-mini-latest</code>, <code>gpt-6-sol</code>, <code>gpt-6-luna</code>, <code>gpt-6.1-sol</code>
```
**To:**
```
<code>gpt-5.5</code>, <code>codex-mini-latest</code>, <code>gpt-6-sol</code>, <code>gpt-6-luna</code>, <code>gpt-6.1-sol</code>, <code>gpt-6.1-terra</code>
```

**Configuration cell — append after existing text:**
```
 GPT-6.1 Terra added to the bundled model catalog (rust-v0.165.0).
```

## Acceptance Criteria

- `gpt-6.1-terra` appears in the OpenAI row's example models list.
- The configuration cell notes GPT-6.1 Terra's addition with version reference.
- No other rows are changed.
