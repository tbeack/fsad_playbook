# CBP-750 — Add local image attachment preview to keyboard shortcuts (rust-v0.167.0)

## Summary
In Codex rust-v0.167.0, Codex supports previewing local image attachments while composing on supported terminals. Viewed local images appear as clickable paths in the transcript. This is a new user-facing feature worth documenting in the keyboard shortcuts / cheat sheet.

## Assessment
No existing row covers image attachment preview in `src/pages/codex.html`. The keyboard shortcuts table is around lines 964–980. After the `<kbd>f</kbd>` fork row (line 975) and `<kbd>k</kbd>` keep-warning row (line 976), a new row can be appended to this group.

Since this is a composing feature (not a keyboard shortcut per se), the best location is a new row in the keyboard shortcuts table describing the image attachment behavior. The Tab/@-mention row (line 970) documents another composer feature there.

## Plan
1. Open `src/pages/codex.html`.
2. Add a new row after the `<kbd>k</kbd>` row (line 976) in the keyboard shortcuts table.

New row:
```html
<tr><td>Image attach</td><td>Paste or drag a local image into the composer to preview it inline (supported terminals only); viewed image paths appear as clickable links in the transcript (rust-v0.167.0)</td></tr>
```

## Acceptance Criteria
- A new row documents local image attachment preview in the keyboard shortcuts table.
- Version tag rust-v0.167.0 is included.
- Row is after the `<kbd>k</kbd>` row.
- No other rows are affected.
