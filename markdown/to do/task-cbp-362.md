# CBP-362 — [Codex] Update Amazon Bedrock collapsible: cached web search + remote conversation compaction

## Source
Codex CLI rust-v0.147.0

## Summary
rust-v0.147.0: "Enable cached web search and remote conversation compaction for Amazon Bedrock."

## Assessment
`fsad-playbook.html`, Power Usage → Amazon Bedrock collapsible, lines 14154–14173. Currently covers SigV4 signing, credential resolution (env vars, named profiles, `aws login` console-login credentials as of v0.130.0), and permission-profile pairing. No mention of web search caching or conversation compaction for Bedrock.

## Plan

### Step 1 — Append a sentence to the closing paragraph (line 14171)
```html
<p style="margin-top:0.75rem; font-size:0.88rem; color:var(--text-secondary);">AWS account state (available models, quota) is surfaced to app clients. Pairs well with permission profiles to restrict what Bedrock agents can touch. In addition to standard AWS credential env vars and named profiles, <code>aws login</code> console-login credentials (from <code>aws login</code> profiles) are supported for Bedrock auth as of v0.130.0. As of rust-v0.147.0, cached web search and remote conversation compaction are also enabled for Bedrock deployments, bringing them to parity with the default OpenAI-hosted setup.</p>
```

## Acceptance Criteria
- Amazon Bedrock collapsible documents cached web search support (rust-v0.147.0)
- Collapsible documents remote conversation compaction support (rust-v0.147.0)
- HTML is valid
