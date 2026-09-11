# CBP-552: Document `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` in Power Usage → Dynamic Workflows collapsible

## Source
Claude Code v2.1.269 changelog: "Added `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` (1–256) to raise the Workflow tool's per-run concurrent agent limit for inference-bound fan-outs."

## Summary
New env var to raise the Workflow tool's per-run concurrent-agent ceiling (range 1–256), aimed at inference-bound fan-outs. The Dynamic Workflows collapsible already documents related tuning knobs for this same subsystem (`CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS`, the `ultracode` trigger keyword).

## Assessment
Not documented. `src/pages/practices.html`'s `power-usage--dynamic-workflows` collapsible (~line 2453–2492) ends with a paragraph about prefix staggering (line 2487, `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS`). A new paragraph after it is the natural fit.

## Plan
1. Open `src/pages/practices.html`, locate the paragraph at line ~2487 ending `...to disable the staggering (v2.1.229).</p>`.
2. Immediately after that `</p>`, insert:
   ```html
   <p style="margin-top:0.5rem;">Raise the per-run concurrent-agent ceiling with <code>CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS</code> (accepts 1–256) — useful for inference-bound fan-outs where individual agents spend most of their time waiting on the model rather than on local compute (v2.1.269).</p>
   ```

## Acceptance Criteria
- [ ] New paragraph documents the env var, its 1–256 range, and the inference-bound-fan-out use case.
- [ ] Cites v2.1.269.
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
