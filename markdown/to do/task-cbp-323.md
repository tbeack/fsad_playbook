# CBP-323 — [Codex] Update Multi-Agent Workflows section for stabilized V2 (rust-v0.145.0)

## Summary

Codex rust-v0.145.0 stabilized the opt-in multi-agent V2 experience. Key changes:
- Multi-agent V2 is now stable (was experimental in earlier versions)
- Sub-agent models are now configurable per agent
- Reasoning levels are configurable per sub-agent
- Concurrency settings work reliably
- Agent roles are restored (default, worker, explorer, monitor)
- Improved agent navigation

## Assessment

The existing Multi-Agent Workflows collapsible (starting at line 12824) documents the `[agents]` config block with `max_threads`, `max_depth`, `job_max_runtime_seconds`, built-in roles, and batch processing. It also covers token budgets (v0.142.0).

The section currently says "Codex supports experimental multi-agent threads" but the V2 experience is now stable. The section should be updated to:
1. Remove "experimental" from the opening sentence
2. Add a note about configurable sub-agent models and reasoning levels
3. Mention that improved agent navigation was added in v0.145.0

## Plan

### Step 1: Update the opening sentence

At line 12831, change:
`<p>Codex supports experimental multi-agent threads with configurable concurrency and specialized roles.</p>`

To:
`<p>Codex supports multi-agent threads with configurable concurrency and specialized roles. The V2 multi-agent experience (opt-in) is now stable as of <strong>v0.145.0</strong>, with configurable per-agent models and reasoning levels.</p>`

### Step 2: Add configurable models/reasoning config snippet

After the existing `[agents]` code block (after line 12837, before the `<p style="margin-top:1rem;"><strong>Built-in roles:</strong></p>`), add a note about per-sub-agent model and reasoning configuration:

```html
<p style="margin-top:1rem;"><strong>Per-sub-agent model and reasoning (v0.145.0):</strong> Configure different models and reasoning effort levels for each sub-agent role in <code>config.toml</code>:</p>
<div class="code-block" style="margin-top:0.5rem;">
  <pre><code><span class="cm"># ~/.codex/config.toml</span>
<span class="kw">[agents]</span>
<span class="val">max_threads</span> = 6
<span class="val">max_depth</span> = 1

<span class="cm"># Configurable per-role model and reasoning level</span>
<span class="kw">[agents.worker]</span>
<span class="val">model</span> = <span class="str">"gpt-5.5"</span>
<span class="val">reasoning</span> = <span class="str">"medium"</span>

<span class="kw">[agents.explorer]</span>
<span class="val">model</span> = <span class="str">"gpt-5.5"</span>
<span class="val">reasoning</span> = <span class="str">"low"</span></code></pre>
</div>
```

## Acceptance Criteria

- [ ] Opening sentence no longer says "experimental" for the multi-agent feature
- [ ] V2 stabilization is noted with version tag v0.145.0
- [ ] Per-sub-agent model and reasoning configuration is documented
- [ ] No HTML structure or styling is broken
