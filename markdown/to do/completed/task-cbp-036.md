# CBP-036 — Add prompt caching TTL env vars to Power Usage

## Summary
Claude Code v2.1.108 added two new environment variables for controlling prompt cache TTL:
- `ENABLE_PROMPT_CACHING_1H` — opt into 1-hour prompt cache TTL for API key, Bedrock, Vertex, and Foundry users
- `FORCE_PROMPT_CACHING_5M` — force 5-minute prompt cache TTL

These variables are not documented anywhere in the playbook. They matter for teams running Claude Code at scale with their own API keys who want to optimize cache hit rates and reduce costs.

## Assessment
- **Existing coverage**: `--exclude-dynamic-system-prompt-sections` flag (line 4622) mentions prompt cache sharing, but no env vars for TTL are documented.
- **Target location**: Add a new collapsible "Prompt Caching TTL" in the Power Usage section, after the "Subprocess Sandboxing" collapsible (after line 5214).

## Plan

1. Read `fsad-playbook.html` lines 5190–5220 to confirm position of Subprocess Sandboxing closing tags.
2. After the closing `</div>` of the Subprocess Sandboxing collapsible (before `</section>`), insert a new collapsible:

```html
<!-- Prompt Caching TTL -->
<div class="collapsible">
  <div class="collapsible-header">
    <h3>Prompt Caching TTL</h3>
    <span class="collapsible-chevron">&#9660;</span>
  </div>
  <div class="collapsible-body"><div class="collapsible-content">
    <p>Control the prompt cache time-to-live (TTL) for API key, Bedrock, Vertex, and Foundry users. By default Claude Code uses a 5-minute cache; opt into 1-hour caching to improve cache hit rates in long or recurring sessions.</p>
    <div class="table-wrap" style="margin-top:0.75rem;">
      <table class="styled-table">
        <thead><tr><th>Env Var</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td><code>ENABLE_PROMPT_CACHING_1H=1</code></td><td>Opt into 1-hour prompt cache TTL (API key, Bedrock, Vertex, Foundry). Improves hit rate for long sessions.</td></tr>
          <tr><td><code>FORCE_PROMPT_CACHING_5M=1</code></td><td>Force 5-minute TTL regardless of other settings.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="callout callout-tip" style="margin-top:0.75rem; margin-bottom:0;">
      <div class="callout-title">Cost Tip</div>
      <p>Use <code>ENABLE_PROMPT_CACHING_1H=1</code> for sessions that share a large system prompt across many requests — reduces repeated input token costs significantly.</p>
    </div>
  </div></div>
</div>
```

3. Mark task complete in todo.md.

## Acceptance Criteria
- A new "Prompt Caching TTL" collapsible appears in Power Usage.
- Both `ENABLE_PROMPT_CACHING_1H` and `FORCE_PROMPT_CACHING_5M` are documented with purpose.
- HTML pattern matches surrounding collapsibles.
