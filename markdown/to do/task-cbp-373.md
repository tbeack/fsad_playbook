# CBP-373 — [Claude] Document workflow fan-out prefix staggering in Dynamic Workflows

## Source
Claude Code v2.1.229

## Summary
v2.1.229 improved workflow fan-outs to stagger same-prefix sibling agents so subsequent agents read the cached prompt prefix instead of re-paying it. `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS=0` disables the staggering.

## Assessment
`fsad-playbook.html`, `#power-usage` → Dynamic Workflows collapsible (lines 11521–11558). This collapsible already documents fan-out behavior generally and has a "Trigger keyword" callout block that carries version-tagged behavior notes (v2.1.160, v2.1.178) in the same pattern used elsewhere in the file. No existing content mentions prompt-cache staggering for fanned-out sibling agents or the `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS` env var (confirmed no other references to "PREFIX_STAGGER" in the file). Genuine gap — add as a new paragraph inside the existing "Trigger keyword" callout, following the pattern of its second paragraph (which already carries a v2.1.178 behavior note).

## Plan

### Step 1 — Add a new paragraph inside the `callout-tip` block, after the existing two paragraphs (after line 11555, before the closing `</div>` at line 11556)
Current:
```html
        <div class="callout callout-tip" style="margin-top:0; margin-bottom:0;">
          <div class="callout-title">Trigger keyword: <code>ultracode</code></div>
          <p>Type the word <strong>ultracode</strong> in the prompt input (it highlights violet) to let Claude decide when to run a full dynamic workflow automatically. Press <kbd>Alt+W</kbd> or <kbd>Backspace</kbd> immediately after the keyword appears to dismiss an accidental trigger. To disable the keyword entirely, go to <code>/config</code> → <em>Workflow keyword trigger</em>. (v2.1.160)</p>
          <p style="margin-top:0.5rem;">The built-in <strong>workflow prompt keyword</strong> uses a purple shimmer highlight and only fires on explicit phrases like <strong>"run a workflow"</strong> or <strong>"workflow:"</strong> — casual mentions of "workflow" in conversation no longer trigger it, reducing accidental activations (v2.1.178).</p>
        </div>
```
Replace with:
```html
        <div class="callout callout-tip" style="margin-top:0; margin-bottom:0;">
          <div class="callout-title">Trigger keyword: <code>ultracode</code></div>
          <p>Type the word <strong>ultracode</strong> in the prompt input (it highlights violet) to let Claude decide when to run a full dynamic workflow automatically. Press <kbd>Alt+W</kbd> or <kbd>Backspace</kbd> immediately after the keyword appears to dismiss an accidental trigger. To disable the keyword entirely, go to <code>/config</code> → <em>Workflow keyword trigger</em>. (v2.1.160)</p>
          <p style="margin-top:0.5rem;">The built-in <strong>workflow prompt keyword</strong> uses a purple shimmer highlight and only fires on explicit phrases like <strong>"run a workflow"</strong> or <strong>"workflow:"</strong> — casual mentions of "workflow" in conversation no longer trigger it, reducing accidental activations (v2.1.178).</p>
          <p style="margin-top:0.5rem;">Fan-outs now <strong>stagger same-prefix sibling agents</strong> so later agents read the cached prompt prefix instead of re-paying it, cutting redundant token cost across large parallel dispatches. Set <code>CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS=0</code> to disable the staggering (v2.1.229).</p>
        </div>
```

## Acceptance Criteria
- New paragraph present inside the Dynamic Workflows "Trigger keyword" callout, after the existing v2.1.178 paragraph
- Describes: staggering of same-prefix sibling agents, cached prompt prefix reuse, and the `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS` env var (including that `=0` disables it)
- Version tag (v2.1.229) included
- No changes to surrounding markup structure
