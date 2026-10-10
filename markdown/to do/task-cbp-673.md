# CBP-673 — Update Sonnet 5.5 cache read price ($0.20 → $0.10/MTok)

## Summary
Claude Code v2.1.296 changelog: "Updated `/cost`, the status line, `--max-budget-usd` and the SDK's cost figures to price Sonnet 5.5 cache reads at $0.10 per million tokens (was $0.20)".

## Assessment
The playbook mentions $0.20/Mtok cache reads for Sonnet 5.5 in three places in `src/pages/practices.html`:
1. Line 1586 — model comparison table row: `<td>$2 / $10, $0.20/Mtok cache reads</td>` (Sonnet 5.5 column)
2. Line 1604 — model alias row for `sonnet`: "$2/$10 per MTok, $0.20/Mtok cache reads"
3. Line 1679 — model news item: "$2/$10 per MTok, $0.20/Mtok cache reads"

All three need to change $0.20 to $0.10. Opus 5.5 stays at $0.20.

## Plan
1. In `src/pages/practices.html`, line 1586: change `$2 / $10, $0.20/Mtok cache reads` to `$2 / $10, $0.10/Mtok cache reads` (Sonnet 5.5 column only — do not change Opus 5.5).
2. In `src/pages/practices.html`, line 1604: change `$0.20/Mtok cache reads` to `$0.10/Mtok cache reads` in the `sonnet` alias row.
3. In `src/pages/practices.html`, line 1679: change `$0.20/Mtok cache reads` to `$0.10/Mtok cache reads` in the model news item for Sonnet 5.5.

## Acceptance Criteria
- The model table shows $0.10/Mtok for Sonnet 5.5 cache reads.
- Opus 5.5 still shows $0.20/Mtok.
- The `sonnet` alias description shows $0.10/Mtok.
- The model news item for Sonnet 5.5 shows $0.10/Mtok.
