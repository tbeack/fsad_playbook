# CBP-048 — Add Model comparison chart with guidance on best practice combinations

## Source
Research compiled in [`markdown/research/Anthropic_model_comparison.md`](../research/Anthropic_model_comparison.md) from Anthropic's official docs (Models overview, Pricing, Choosing a model, Claude Code model configuration) as of April 17, 2026.

## Summary
The playbook's current "Model & Effort Control" collapsible (Power Usage, lines 5165–5222) has an outdated 3-bullet model list that names **Opus 4.6** as the top tier and never mentions Opus 4.7, model aliases, `opusplan`, pricing, or recommended permutations. With Opus 4.7 becoming the default for Enterprise PAYG + Anthropic API on **April 23, 2026**, this section needs a proper comparison chart and best-practice combination guidance.

Scope: upgrade the existing "Model & Effort Control" collapsible in place — replace the stale bullet list with a comparison table, add an alias/routing table with `opusplan` featured, add a permutation-patterns table for common coding workloads, and add a cost-optimization callout. Keep the existing effort content (default-changed-to-medium callout, adaptive thinking table) intact — those are still accurate and were shipped in CBP-024/CBP-046.

## Assessment

### What exists
- **Lines 5165–5222** — "Model & Effort Control" collapsible inside Power Usage
- **Lines 5173–5177** — 3-bullet list naming Haiku 4.5, Sonnet 4.6, **Opus 4.6** (stale — Opus 4.7 shipped April 16, 2026)
- **Lines 5178–5195** — Code block with `claude --model opus`, effort commands, `/fast`, `--fallback-model`
- **Lines 5197–5200** — "Effort Default Changed to Medium" callout (keep — accurate, CBP-024)
- **Lines 5202–5219** — Adaptive thinking & effort table + `budget_tokens` deprecation callout (keep — accurate, CBP-025/CBP-046)

### What's missing
- No Opus 4.7 mention anywhere in this collapsible
- No pricing, context window, or max-output data
- No model alias documentation (`default`, `best`, `sonnet`, `haiku`, `opus[1m]`, `sonnet[1m]`, **`opusplan`**)
- No workload-to-model permutation guidance (the "how to combine models" part of the task title)
- No mention of subagent routing (`CLAUDE_CODE_SUBAGENT_MODEL=haiku`)
- No key dates (April 23 default switch, June 15 deprecations, Opus 4.7 tokenizer 35% caveat)
- The stale bullet list still cites Opus 4.6 as the complex-architecture tier

### Where to put it
Rewrite the top half of the existing collapsible (lines 5172–5196 — intro paragraph, bullet list, and code block). Everything from the "Effort Default Changed to Medium" callout downward stays untouched. This keeps a single cohesive "Model & Effort Control" section rather than splitting model guidance into a new collapsible far from effort guidance.

## Plan

### Step 1 — Replace the 3-bullet list (lines 5172–5177) with a model comparison table

Drop the opening paragraph + bullet list. Replace with a short lead-in paragraph and a comparison table with the three current-tier models.

```html
<p>Match model capability to task complexity. Claude Code auto-selects a sensible default, but the best coding results in 2026 come from combining all three tiers — not picking one for everything.</p>

<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1rem; margin-bottom:0.5rem;"><strong>Current model lineup</strong></p>
<div class="table-wrap">
  <table class="styled-table">
    <thead>
      <tr>
        <th>Capability</th>
        <th>Opus 4.7</th>
        <th>Sonnet 4.6</th>
        <th>Haiku 4.5</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Positioning</td><td>Frontier reasoning + agentic coding</td><td>Balanced daily driver</td><td>Fast, near-frontier</td></tr>
      <tr><td>API ID</td><td><code>claude-opus-4-7</code></td><td><code>claude-sonnet-4-6</code></td><td><code>claude-haiku-4-5</code></td></tr>
      <tr><td>Input / Output (per MTok)</td><td>$5 / $25</td><td>$3 / $15</td><td>$1 / $5</td></tr>
      <tr><td>Context window</td><td>1M tokens</td><td>1M tokens</td><td>200K tokens</td></tr>
      <tr><td>Max output</td><td>128K</td><td>64K</td><td>64K</td></tr>
      <tr><td>Adaptive thinking</td><td>Yes (default <code>xhigh</code>)</td><td>Yes</td><td>No (extended thinking only)</td></tr>
      <tr><td>Relative latency</td><td>Moderate</td><td>Fast</td><td>Fastest</td></tr>
      <tr><td>Best for</td><td>Long-horizon agentic coding, large refactors, architecture, RCA</td><td>80%+ of day-to-day coding, tests, tool use</td><td>Sub-agent work, batch reviews, mechanical edits</td></tr>
    </tbody>
  </table>
</div>
```

### Step 2 — Add a "Claude Code model aliases" table directly under the comparison table

Surface the aliases developers actually type at the CLI. Feature `opusplan` prominently.

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1.25rem; margin-bottom:0.5rem;"><strong>Claude Code model aliases</strong></p>
<div class="table-wrap">
  <table class="styled-table">
    <thead><tr><th>Alias</th><th>Resolves to</th><th>When to use</th></tr></thead>
    <tbody>
      <tr><td><code>default</code></td><td>Tier-dependent (Max / Team Premium → Opus 4.7; Pro / Team Std / Enterprise / API → Sonnet 4.6; Bedrock / Vertex / Foundry → Sonnet 4.5)</td><td>Daily driver if unsure</td></tr>
      <tr><td><code>best</code> / <code>opus</code></td><td>Latest Opus (4.7 on API; 4.6 on Bedrock / Vertex / Foundry)</td><td>Complex reasoning, architecture, gnarly bugs</td></tr>
      <tr><td><code>sonnet</code></td><td>Latest Sonnet (4.6 on API; 4.5 on Bedrock / Vertex / Foundry)</td><td>80%+ of coding tasks</td></tr>
      <tr><td><code>haiku</code></td><td>Latest Haiku</td><td>Cheap sub-agent / background work</td></tr>
      <tr><td><code>opus[1m]</code> / <code>sonnet[1m]</code></td><td>1M context variant</td><td>Long-session work across large codebases</td></tr>
      <tr><td><strong><code>opusplan</code></strong></td><td>Opus during plan mode → Sonnet during execution</td><td><strong>Recommended default for non-trivial feature work</strong> — ~40% cheaper than pure Opus</td></tr>
    </tbody>
  </table>
</div>
```

### Step 3 — Replace the existing code block (lines 5178–5196) with a slimmed version

Keep the effort commands and CLI flag examples but update the top comment to feature `opusplan`. The `/effort` block stays — it's still accurate after CBP-046.

```html
<div class="code-block" style="margin-top:1.25rem;">
  <pre><code class="language-bash"><span class="cm"># Recommended: let Opus plan, Sonnet execute</span>
<span class="kw">claude</span> <span class="val">--model</span> opusplan

<span class="cm"># Force a specific model mid-session</span>
/model opus         <span class="cm"># Switch to latest Opus</span>
/model sonnet       <span class="cm"># Switch to latest Sonnet</span>
/model haiku        <span class="cm"># Switch to latest Haiku</span>
/model opus[1m]     <span class="cm"># 1M context variant for large codebases</span>

<span class="cm"># Route sub-agents to Haiku (single biggest cost lever after opusplan)</span>
<span class="kw">export</span> CLAUDE_CODE_SUBAGENT_MODEL=haiku

<span class="cm"># Set effort level (controls reasoning depth)</span>
/effort max          <span class="cm"># Maximum reasoning — complex agentic tasks</span>
/effort xhigh        <span class="cm"># Opus 4.7 only — between high and max</span>
/effort high         <span class="cm"># Deep thinking — difficult coding problems</span>
/effort medium       <span class="cm"># Balanced (default) — speed + quality</span>
/effort low          <span class="cm"># Quick responses — simple tasks, subagents</span>
/effort              <span class="cm"># No args: opens interactive slider (arrow keys + Enter)</span>
<span class="kw">claude</span> <span class="val">--effort</span> max   <span class="cm"># Set via CLI flag</span>

<span class="cm"># Toggle fast mode (same model, faster output)</span>
/fast on

<span class="cm"># Auto-fallback in print mode when overloaded</span>
<span class="kw">claude</span> <span class="val">-p</span> <span class="val">--fallback-model</span> sonnet <span class="str">"query"</span></code></pre>
</div>
```

### Step 4 — Add a "Permutation patterns by workload" table after the new code block

This is the "best practice combinations" half of the task title — it tells readers *how* to mix the three tiers.

```html
<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:1.25rem; margin-bottom:0.5rem;"><strong>Best-practice combinations by workload</strong></p>
<div class="table-wrap">
  <table class="styled-table">
    <thead><tr><th>Workload</th><th>Plan</th><th>Execute</th><th>Sub-agents</th></tr></thead>
    <tbody>
      <tr><td>Greenfield feature, multi-file</td><td>Opus 4.7 (<code>xhigh</code>)</td><td>Sonnet 4.6</td><td>Haiku 4.5</td></tr>
      <tr><td>Targeted bug fix (known file)</td><td>Sonnet 4.6</td><td>Sonnet 4.6</td><td>Haiku 4.5</td></tr>
      <tr><td>Architectural refactor (10+ files)</td><td>Opus 4.7 (<code>max</code>, one-shot)</td><td>Opus 4.7 or Sonnet 4.6</td><td>Haiku 4.5</td></tr>
      <tr><td>Boilerplate / rename / formatting</td><td>—</td><td>Haiku 4.5</td><td>—</td></tr>
      <tr><td>High-volume code review / lint triage</td><td>—</td><td>Haiku 4.5 (Batch API)</td><td>—</td></tr>
      <tr><td>Long-session monorepo exploration</td><td>Opus 4.7 <code>[1m]</code> or Sonnet <code>[1m]</code></td><td>Sonnet 4.6 <code>[1m]</code></td><td>Haiku 4.5</td></tr>
      <tr><td>Production incident / RCA</td><td>Opus 4.7 (<code>max</code>)</td><td>Opus 4.7</td><td>Sonnet 4.6</td></tr>
    </tbody>
  </table>
</div>
```

### Step 5 — Add a "Cost optimization" tip callout after the permutation table (before the existing "Effort Default Changed to Medium" callout)

```html
<div class="callout callout-tip" style="margin-top:1rem; margin-bottom:0;">
  <div class="callout-title">Cost Optimization Checklist</div>
  <ul style="padding-left:1.25rem; margin:0.5rem 0 0 0; line-height:1.8;">
    <li>Default to <code>opusplan</code> for coding — ~40% cheaper than pure Opus.</li>
    <li>Route sub-agents to Haiku via <code>CLAUDE_CODE_SUBAGENT_MODEL=haiku</code>.</li>
    <li>Enable prompt caching — cache hits are 10% of base input (up to 90% off on repeated system prompts, CLAUDE.md, large docs).</li>
    <li>Use the Batch API for any non-interactive job — 50% off input and output; stacks with caching.</li>
    <li>Pin effort to <code>medium</code> on cost-sensitive Sonnet workflows; raise only where needed.</li>
    <li>Budget for up to <strong>35% more tokens</strong> when migrating from Opus 4.6 → 4.7 (new tokenizer).</li>
  </ul>
</div>
```

### Step 6 — Add a "Key dates" warning callout for April 23 default switch + retirements

Place this directly below the cost-optimization callout so readers see migration deadlines alongside the model chart. This callout is time-sensitive and can be removed / condensed once the dates pass — flag that in the comment.

```html
<div class="callout callout-warning" style="margin-top:0.75rem; margin-bottom:0;">
  <div class="callout-title">Key Dates (Apr 2026)</div>
  <ul style="padding-left:1.25rem; margin:0.5rem 0 0 0; line-height:1.8;">
    <li><strong>April 23, 2026</strong> — Default model for Enterprise PAYG + Anthropic API switches to Opus 4.7.</li>
    <li><strong>June 15, 2026</strong> — Sonnet 4 (<code>claude-sonnet-4-20250514</code>) and Opus 4 (<code>claude-opus-4-20250514</code>) retire. Migrate to Sonnet 4.6 and Opus 4.7.</li>
    <li>On Bedrock / Vertex / Foundry, pin model versions explicitly (<code>ANTHROPIC_DEFAULT_OPUS_MODEL</code>, etc.) — alias targets move under you.</li>
  </ul>
</div>
```

### Step 7 — Verify search index picks up the new terms

After the edit, confirm these strings appear in the playbook's in-app search index (search data is built from section content — if auto-indexed, no action; if manually indexed, add keywords): `opusplan`, `Opus 4.7`, `model aliases`, `subagent model`, `CLAUDE_CODE_SUBAGENT_MODEL`, `Batch API`. CBP-044 previously updated the search index — confirm the same pattern applies here.

### Step 8 — Browser smoke test
- Open `fsad-playbook.html`
- Navigate to Claude Best Practices → Power Usage → Model & Effort Control
- Expand the collapsible; confirm the new tables render cleanly in both light and dark themes
- Check that `styled-table` + `table-wrap` containers don't overflow on narrow widths
- Confirm the existing Adaptive-thinking table + deprecation callout still render correctly (shouldn't have been touched)
- Search for `opusplan` — confirm the section is found

## Acceptance Criteria
- [x] Stale "Opus 4.6 for complex architecture" bullet list removed
- [x] New model comparison table (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) renders with correct pricing, context window, and best-for rows
- [x] Model alias table includes `opusplan` with the 40%-cheaper note
- [x] Code block features `claude --model opusplan` as the first (recommended) command and includes `CLAUDE_CODE_SUBAGENT_MODEL=haiku`
- [x] Permutation-by-workload table renders with all 7 rows
- [x] Cost optimization checklist callout is present
- [x] Key dates warning callout lists Apr 23 default switch, Jun 15 retirements, and Bedrock/Vertex pinning advice
- [x] Existing "Effort Default Changed to Medium" callout and adaptive-thinking table remain unchanged
- [x] No broken HTML or styling regressions in light or dark theme
- [x] Search returns results for `opusplan`, `Opus 4.7`, `subagent model`

## Out of Scope
- Rewriting the "Effort Default Changed to Medium" callout (CBP-024, still accurate)
- Rewriting the adaptive thinking table (CBP-025 / CBP-046, still accurate)
- Adding a full pricing matrix with cache-write / batch columns — too dense for a power-usage collapsible; the simplified I/O-per-MTok row is enough. If requested later, add as a separate task.
- Adding individual example-workflow walk-throughs (Examples A–E in the research doc) — those are better suited to a future dedicated "Model Routing Patterns" section if demand arises.
