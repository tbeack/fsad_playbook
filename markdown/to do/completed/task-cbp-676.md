# CBP-676 — Update `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` default to 4,096 (v2.1.296)

## Summary
Claude Code v2.1.296 changelog: "Changed the default limit on MCP tool descriptions sent up front and on MCP server instructions from 2,048 to 4,096 characters". The existing entry in the playbook still says "2,048-character cap" as the default.

## Assessment
`src/pages/practices.html` line 2749 contains:
```
<tr><td><code>CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH</code></td><td>Changes the 2,048-character cap on MCP tool descriptions and server instructions. The cap applies to every MCP server in the session. Increase if your MCP tools have long descriptions that are truncated; decrease in memory-constrained environments. Set to an integer (e.g. <code>4096</code>). (v2.1.280) As of v2.1.295, descriptions loaded through tool search are cut at 16,384 characters instead of 2,048 by default.</td></tr>
```

The default cap changed from 2,048 to 4,096 in v2.1.296. The text must reflect the new default. Update "2,048-character cap" to "4,096-character cap" and add the v2.1.296 version note. Also update the example from `<code>4096</code>` to a more useful value since 4,096 is now the default.

## Plan
1. In `src/pages/practices.html`, line 2749, replace the existing `<td>` description text to say the default is now 4,096 and cite v2.1.296:
   - Change "Changes the 2,048-character cap" → "Changes the default 4,096-character cap"
   - Change the example from `(e.g. <code>4096</code>)` to `(e.g. <code>8192</code>)`
   - Add a note: "Default changed from 2,048 to 4,096 in v2.1.296."

New text:
```
Changes the default 4,096-character cap on MCP tool descriptions and server instructions. The cap applies to every MCP server in the session. Increase if your MCP tools have long descriptions that are truncated; decrease in memory-constrained environments. Set to an integer (e.g. <code>8192</code>). (v2.1.280) Default changed from 2,048 to 4,096 in v2.1.296. As of v2.1.295, descriptions loaded through tool search are cut at 16,384 characters instead of the default by default.
```

## Acceptance Criteria
- The entry says "4,096-character cap" as the default.
- The v2.1.296 change note is present.
- The prior v2.1.295 tool-search note is preserved.
