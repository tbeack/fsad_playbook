# CBP-642: Add Ctrl+C draft recovery to keyboard shortcuts table

## Summary

Claude Code v2.1.288 added draft recovery after Ctrl+C. Pressing Up on an empty prompt restores the cleared draft, including pasted text and images. This is distinct from the existing Up/Down command history navigation.

## Assessment

The keyboard shortcuts table in `src/pages/practices.html` has:
- Line 1848: `<kbd>Ctrl+C</kbd>` row: "Cancel current operation (hard stop)"
- Line 1862: `<kbd>↑</kbd> / <kbd>↓</kbd>` row: "Navigate through command history"

The draft recovery behavior belongs as an additional note on the Ctrl+C row (line 1848), since it describes what happens after Ctrl+C.

## Plan

1. Read `src/pages/practices.html` around lines 1846–1864 to confirm row text.
2. In the `<kbd>Ctrl+C</kbd>` row, change the `<td>` description from:

   ```
   Cancel current operation (hard stop)
   ```

   to:

   ```
   Cancel current operation (hard stop). As of v2.1.288, pressing <kbd>↑</kbd> on the empty prompt after a Ctrl+C cancellation restores the cleared draft, including pasted text and images.
   ```

## Acceptance Criteria

- The Ctrl+C row notes the Up-arrow draft recovery behavior.
- The description still begins with "Cancel current operation (hard stop)".
- No other rows are changed.
