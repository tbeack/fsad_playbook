# CBP-638 — Add `--max-findings <n>|all` to `/code-review` cheat sheet row

## Summary
Claude Code v2.1.288 added `--max-findings <n>|all` to the `/code-review` command. This flag controls how many findings the review reports. Pass a number to cap it, or `all` to remove the usual limit. The choice is reused for subsequent reviews until `--max-findings default` resets it.

## Assessment
The `/code-review` row in `src/pages/practices.html` at line 1996 documents `--comment` and `--fix` flags but does not mention `--max-findings`. This is new content that practitioners will find useful when they want full coverage reviews or want to limit noise.

## Plan
1. Open `src/pages/practices.html`.
2. Locate line 1996 — the `/code-review` row.
3. Append the following sentence to the end of the `<td>` content, just before `</td>`:
   ` As of v2.1.288, pass <code>--max-findings &lt;n&gt;|all</code> to report more or fewer findings than the default limit; the choice is reused until you pass <code>--max-findings default</code> to reset it.`

## Acceptance Criteria
- The `/code-review` row now mentions `--max-findings`.
- The HTML is valid and the sentence fits the existing style.
- `python3 scripts/build-source.py` runs without error.
