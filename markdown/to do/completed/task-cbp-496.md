# CBP-496 — [Codex] Document extension MCP tool-result inspection/modification

## Source
Codex CLI rust-v0.151.0 release notes: "Extensions can now inspect or replace MCP tool results before they reach the model." (#41202)

## Summary
Codex extensions gained the ability to inspect or replace the results of MCP tool calls before the model sees them — useful for redacting sensitive output, reformatting responses, or injecting context ahead of the model consuming a tool result. Document this as a new dated note in the Codex Best Practices → Integrations section, next to the CBP-495 grace-period note.

## Assessment
`src/pages/codex.html`, `#codex-integrations` section (lines 338–556) does not yet mention any extension-level MCP tool-result hook/interception capability — this is a genuine gap. The section already documents MCP capability evolution as a running series of dated paragraphs (see CBP-495 assessment for the existing pattern at lines 353–359). `update-existing` verdict: add a new dated paragraph in the same style, directly after the CBP-495 addition so the two rust-v0.151.0 MCP notes sit together.

## Plan
1. Open `src/pages/codex.html` (apply after the CBP-495 edit has landed in the same file).
2. Immediately after the new CBP-495 paragraph (configurable MCP discovery grace period, rust-v0.151.0) and before the `step-card` block, insert:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Extensions can inspect/modify MCP tool results (rust-v0.151.0):</strong> Codex extensions can now inspect or replace the results of MCP tool calls before they reach the model — useful for redacting sensitive output, reformatting responses, or injecting additional context ahead of the model seeing a tool result.</p>
   ```
3. Run `python3 scripts/build-source.py` then `python3 scripts/build-dist.py` after all three CBP-495/496/497 edits are applied (batched together in this run).

## Acceptance Criteria
- [ ] New paragraph present in `#codex-integrations`, immediately following the CBP-495 paragraph, before the "Add an MCP Server" step-card.
- [ ] Version tag `rust-v0.151.0` present and accurate.
- [ ] Matches existing paragraph styling (`font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;`, `<strong>` version-label prefix).
- [ ] `build-source.py` and `build-dist.py` both run cleanly after all edits for this run land, with `build-dist.py` logging "Injected PLAYBOOK_EMBEDDINGS".
