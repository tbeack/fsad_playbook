# CBP-634: Add `n:<text>` filter to `claude agents` row in cheat sheet (v2.1.287)

## Summary

Claude Code v2.1.287 added an `n:<text>` filter to the agents view. The filter matches session names and tasks. Collapsed sections show matches when the filter is active. Pressing Enter opens the first match.

## Assessment

The `claude agents` row in the Session & Resume cheat sheet (`src/pages/practices.html`, around line 1998) is long and detailed but does not mention the `n:<text>` filter. This is an update to existing content.

## Plan

1. Open `src/pages/practices.html`.
2. Find the `claude agents` table row (search for the string `claude agents`).
3. Append a sentence to the end of the existing `<td>` cell content describing the `n:<text>` filter.

### Text to append (before the closing `</td>` of the `claude agents` row):

` As of v2.1.287, type <code>n:&lt;text&gt;</code> in the agents view to filter sessions by name or task — collapsed sections show matches, and Enter opens the first result.`

## Acceptance Criteria

- The `claude agents` row includes a mention of the `n:<text>` filter.
- The version tag `v2.1.287` appears in the new text.
- No other rows are changed.
