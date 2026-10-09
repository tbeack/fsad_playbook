# CBP-670 — [Claude] Update `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` — tool-search cap is now 16,384 (v2.1.295)

## Summary
Claude Code v2.1.295 changed the cap applied to MCP tool descriptions loaded through tool search from 2,048 to 16,384 characters. The existing env var row says "2,048-character cap" as the default — this is now stale for tool-search paths.

## Assessment
`CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` is documented at practices.html line 2748. The text says "Changes the 2,048-character cap on MCP tool descriptions and server instructions." The changelog specifies: "MCP tool descriptions the model loads through tool search to be cut at 16,384 characters instead of 2,048." This affects only descriptions loaded through tool search; the env var still controls the cap.

Do not change the global default claim without knowing the full scope. Add one "As of v2.1.295" sentence that names the tool-search path specifically.

## Plan
1. Read `src/pages/practices.html` line 2748 to confirm exact text.
2. Append one sentence: "As of v2.1.295, descriptions loaded through tool search are cut at 16,384 characters by default instead of 2,048; the env var overrides this limit."

## Edit
Append to the end of the `<td>` content (before `</td>`):
` As of v2.1.295, descriptions loaded through tool search are cut at 16,384 characters instead of 2,048 by default.`

## Acceptance Criteria
- The text "16,384" appears in the env var row.
- The scope is correctly attributed to tool-search-loaded descriptions.
- The original row text is preserved.
