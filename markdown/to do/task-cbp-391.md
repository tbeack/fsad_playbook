# CBP-391 — Document the `spellcheck` setting

## Source
Claude Code v2.1.235

## Summary
v2.1.235 added an optional `spellcheck` setting that underlines misspelled words in the prompt input as you type, using an installed `aspell`, `hunspell`, or `ispell` binary.

## Assessment
No coverage. Grep for `spellcheck`/`aspell`/`hunspell`/`ispell` across `fsad-playbook.html` returns only the app's own `spellcheck="false"` attribute on the search input (line 2189) — unrelated. The canonical home for a new settings.json key is the "Notable settings.json Keys" `<ul>` in the config-cascade section, which ends at line 9765 with the `dialogExpiry` entry.

## Plan
1. In `fsad-playbook.html`, change line 9765's `style="margin-bottom:0;"` to `style="margin-bottom:0.4rem;"` so it is no longer the last item.
2. Insert a new final `<li style="margin-bottom:0;">` after it documenting `spellcheck`: what it does, that it requires an installed `aspell`/`hunspell`/`ispell` binary, and the `(v2.1.235)` version tag.
3. Match the existing entry format exactly: `<code>key</code> — Description (vX.Y.Z).`

## Acceptance Criteria
- [ ] `spellcheck` appears as a new `<li>` in the Notable settings.json Keys list
- [ ] The three spell-checker backends are named
- [ ] Version tag `(v2.1.235)` present
- [ ] Only one `<li>` in the list carries `margin-bottom:0`
