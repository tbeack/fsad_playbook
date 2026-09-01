# CBP-503 — [Codex] Document per-MCP-tool `output_token_limit`

## Source
Codex CLI rust-v0.152.0 release notes: "Individual MCP tools support an `output_token_limit` setting, with consistent truncation across session resumes." (New Features, #41421)

## Summary
MCP tools can now be configured with a per-tool `output_token_limit`, and truncation behavior is now consistent across session resumes (previously a resumed session could re-expand or re-truncate differently). Document as a new dated paragraph in the Integrations section, following the established pattern of one bolded, dated capability note per release (see the rust-v0.148.0 through rust-v0.151.0 notes already there).

## Assessment
`src/pages/codex.html`, `#codex-integrations` section (lines 338–420-ish). The existing dated-paragraph series ends with the rust-v0.151.0 "Extensions can inspect or replace MCP tool results" paragraph (added by CBP-496). No existing mention of `output_token_limit` or per-tool output truncation config anywhere in the file. Gap confirmed — `update-existing` (extends the same running series, new-section-shaped content but slotted into an existing pattern).

## Plan
1. Open `src/pages/codex.html`.
2. Immediately after the CBP-496 paragraph (rust-v0.151.0, "Extensions can inspect or replace MCP tool results...") and before the `step-card` block for "Add an MCP Server", insert:
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;"><strong>Per-tool output token limits (rust-v0.152.0):</strong> Individual MCP tools now support an <code>output_token_limit</code> setting in <code>~/.codex/config.toml</code>, capping how many tokens a single tool result can return. Truncation behavior is now consistent across session resumes, so a resumed thread won't re-truncate a previously-returned result differently than the original session did.</p>
   ```
3. Run `python3 scripts/build-source.py` after all this run's edits land.

## Acceptance Criteria
- [ ] New paragraph present in `#codex-integrations`, positioned after the CBP-496 (rust-v0.151.0) paragraph and before the "Add an MCP Server" step-card.
- [ ] Mentions `output_token_limit`, per-tool scope, and resume-consistency, tagged `rust-v0.152.0`.
- [ ] Matches existing paragraph styling (`font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem;`, `<strong>` version-label prefix).
- [ ] `build-source.py` runs cleanly after all edits for this run land.
