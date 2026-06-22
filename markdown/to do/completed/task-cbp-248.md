# CBP-248: Add `model` attribute to claude_code.lines_of_code.count OTEL metric row

## Summary
Claude Code v2.1.172 added a `model` attribute to the `claude_code.lines_of_code.count` OTEL metric. This enables slicing lines-of-code output by model, useful for cost attribution and understanding model productivity differences.

## Assessment
The OTEL metrics table row at line 11483 reads:
`<tr><td><code>claude_code.lines_of_code.count</code></td><td>Lines added or removed</td><td>count</td></tr>`

This is a 3-column table (metric, description, unit). There's no attributes column shown, but the other rows like `claude_code.token.usage` and `claude_code.tool` do note attributes in the description or a 4th column. Looking at the table structure, this appears to be a 3-column table without a dedicated attributes column.

The description should be updated to note the `model` attribute: "Lines added or removed, broken down by `model` attribute".

**Location:** Line 11483.

## Plan
1. Read the exact table structure around line 11479-11487.
2. Update the `claude_code.lines_of_code.count` row description to mention the `model` attribute.

## Acceptance Criteria
- The `claude_code.lines_of_code.count` row mentions the `model` attribute.
- Table structure is preserved.
