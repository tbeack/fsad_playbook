# CBP-286 — Clarify hook matcher behavior for hyphenated identifiers

## Summary
Claude Code v2.1.195 fixed a bug where hook matchers with hyphenated identifiers (e.g. `"code-reviewer"`, `"mcp__brave-search"`) would accidentally substring-match against tool names. They now exact-match. As a result, to match all tools from a hyphenated MCP server, users must use a regex wildcard: `"mcp__brave-search__.*"`.

This behavior change affects anyone writing hooks for:
- Agent types with hyphens (e.g. `"code-reviewer"`, `"epic-planner"`)
- MCP servers with hyphens in their name (e.g. `"mcp__brave-search"`, `"mcp__my-server"`)

## Assessment
The Matcher patterns table in the Hooks Deep Dive — Configuration section (lines 10972–10982) has three rows:
1. `"*"`, `""`, or omitted → Match all
2. Letters, digits, `_`, `|` only → Exact or pipe-separated list
3. Contains other characters → JavaScript regex (example: `^Notebook`, `mcp__.*`)

The current row 2 says "Letters, digits, `_`, `|` only" — implying hyphenated identifiers fall into the regex row. But the behavior is nuanced: while hyphenated strings ARE treated as regex (because `-` is "other characters"), they now exact-match the literal string rather than substring-matching. The key user-facing guidance is: use `mcp__brave-search__.*` (not `mcp__brave-search`) to match all tools from a hyphenated MCP server.

The fix is to update row 3 to add a note about hyphenated identifiers, and add an example showing the wildcard pattern for hyphenated MCP servers.

**Action:** Update existing — modify row 3 of the matcher patterns table and add `mcp__brave-search__.*` as an example.

## Plan
1. Read `fsad-playbook.html` lines 10972–10982 to confirm exact current text.
2. Update the third `<tr>` in the matcher patterns table:
   - Change the `Example` column from `<code>^Notebook</code>, <code>mcp__.*</code>` to `<code>^Notebook</code>, <code>mcp__.*</code>, <code>mcp__brave-search__.*</code>`
   - After the table closing `</table></div>`, add a note callout or inline paragraph clarifying the hyphenated-identifier behavior.
3. Add a short note below the table (using an existing `<p style="font-size:0.85rem; ...">` pattern):
   ```html
   <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;"><strong>Hyphenated identifiers</strong> (e.g. <code>code-reviewer</code>, <code>mcp__brave-search</code>) contain <code>-</code> so they are treated as regex and now <strong>exact-match</strong> the literal name. To match <em>all</em> tools from a hyphenated MCP server, append <code>__.*</code>: <code>"mcp__brave-search__.*"</code> (v2.1.195).</p>
   ```
4. Mark task complete in `todo.md`.

## Acceptance Criteria
- The matcher table example column for the regex row includes `mcp__brave-search__.*`.
- A note below the table explains that hyphenated identifiers exact-match and shows the `__.*` wildcard pattern.
- No other rows or surrounding content is disturbed.
- Version tag `(v2.1.195)` appears in the note.
