# CBP-509 — Add Containment Escape auto-mode rule and `permissions.blockReadsOutsideWorkingDirectories`

## Summary
Claude Code v2.1.257 added two auto-mode/permission security features:
1. A **Containment Escape rule** to auto mode — cloud metadata-credential fetches, egress evasion, and cross-tenant reach are no longer auto-approved unless the environment marks them expected.
2. A **one-time prompt in auto mode before the first file read outside the working directories**, with an opt-in block via `permissions.blockReadsOutsideWorkingDirectories`.

## Assessment
`src/pages/practices.html` has a "Notable `settings.json` Keys" callout (lines 611-653, inside the config/guidelines area of the page) that already documents several auto-mode-related keys in chronological order by version: `settings.autoMode.hard_deny`, "Auto mode built-in safety blocks" (line 624, the closest existing analog — it documents other auto-mode safety guardrails that block risky actions regardless of deny rules), `autoMode.classifyAllShell`, "Auto mode reviews Monitor commands like Bash", `autoMode` settings location, `autoMode` classifier model for external sessions, and `disableAutoMode`. Neither the Containment Escape rule nor `permissions.blockReadsOutsideWorkingDirectories` is mentioned anywhere in the file. This is "update existing" — the callout is exactly the place these two new safety keys belong, both because of subject match (auto-mode/permission safety) and existing chronological-by-version convention.

## Plan
1. In `src/pages/practices.html`, in the "Notable `settings.json` Keys" callout `<ul>` (lines 615-652), add a new `<li>` after the last "Auto mode built-in safety blocks" (line 624) or near other auto-mode entries, for the Containment Escape rule:
   ```html
   <li style="margin-bottom:0.4rem;"><strong>Containment Escape rule</strong> — Auto mode no longer auto-approves cloud metadata-credential fetches, egress evasion, or cross-tenant reach unless the environment explicitly marks them expected. Applies alongside <code>settings.autoMode.hard_deny</code> and the other built-in safety blocks (v2.1.257).</li>
   ```
2. Add a second new `<li>` (appended after the current last item, line 652 — remember to move `margin-bottom:0;` to whichever `<li>` ends up last) for the read-outside-working-directories prompt:
   ```html
   <li style="margin-bottom:0.4rem;"><code>permissions.blockReadsOutsideWorkingDirectories</code> — Auto mode now shows a one-time prompt before the first file read outside your working directories. Set this key to <code>true</code> to block such reads outright instead of prompting (v2.1.257).</li>
   ```
3. Ensure only the final `<li>` in the list keeps `margin-bottom:0;` (currently the `spinnerTipsOverride` item, line 652) — if it's no longer last after insertion, give it `margin-bottom:0.4rem;` and move `margin-bottom:0;` to the new final item.

## Acceptance Criteria
- [ ] Containment Escape auto-mode rule documented in the Notable `settings.json` Keys callout with a v2.1.257 marker.
- [ ] `permissions.blockReadsOutsideWorkingDirectories` documented in the same callout with a v2.1.257 marker.
- [ ] List item margin styling remains consistent (only the true last `<li>` has `margin-bottom:0;`).
- [ ] `python3 scripts/build-source.py` runs clean after the edit.
