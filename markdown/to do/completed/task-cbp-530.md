# CBP-530 — Extend Dangerous-`rm` Safety Prompt Coverage

## Source
Claude Code v2.1.261

## Summary
v2.1.261 improves the dangerous-`rm` safety prompt to also catch `rm -rf` on positional parameters (e.g. `rm -rf "$1"`) and inside double-quoted `sh -c` scripts.

## Assessment
`src/pages/practices.html` Subprocess Sandboxing section paragraph already documents the v2.1.246 malformed `&&`/`||` approval-gap fix in the same sentence-chain style. Extends that paragraph. Update existing.

## Plan
1. Locate the Subprocess Sandboxing paragraph ending in "...skip the intended approval flow."
2. Append a sentence noting the v2.1.261 `rm -rf` positional-parameter and quoted `sh -c` coverage.

## Acceptance Criteria
- Paragraph mentions the extended `rm -rf` detection with v2.1.261 attribution
- HTML is valid
