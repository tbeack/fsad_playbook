# CBP-812: [Codex] Per-tool approval reviewers for connected app tools (rust-v0.172.0)

## Summary
Codex rust-v0.172.0 added per-tool approval reviewers: you can set an approval reviewer for individual connected app tools in `config.toml`.

## Assessment
`src/pages/codex.html`'s Permission Profiles section (~line 1423) covers approval-mode configuration and automatic-review defaults (rust-v0.146.1) but not per-tool reviewer assignment for connected app tools.

## Plan
1. Open `src/pages/codex.html`.
2. Append to the Permission Profiles intro paragraph, after the rust-v0.146.1 sentence:
   ```
   As of rust-v0.172.0, you can also set a dedicated approval reviewer for individual connected app tools directly in config.toml, independent of the profile's overall approval mode.
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Permission Profiles paragraph documents per-tool approval reviewers for connected app tools.
- HTML is valid (no unclosed tags).

## Status
Implemented.
