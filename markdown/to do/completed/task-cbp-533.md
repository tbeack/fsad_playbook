# CBP-533: Document 1 GB tool-result disk cap

## Source
Claude Code CHANGELOG.md v2.1.265: "Added 1 GB cap on tool results saved disk; in-conversation preview says saved file truncated"

## Summary
Tool results that get saved to disk (e.g. large Bash/background-task output beyond the inline `bashOutputMaxChars`/`taskOutputMaxChars` thresholds) are now capped at 1 GB total. When the cap is hit, the in-conversation preview tells you the saved file was truncated, rather than silently growing without bound.

## Assessment
`src/pages/practices.html` documents `bashOutputMaxChars` / `taskOutputMaxChars` as a Notable settings.json Key (~line 656) — "Raise how much Bash command output ... and background-task output ... Claude receives inline before the rest is saved to a file; maximum is 128 000 characters each." This describes the inline threshold but says nothing about a ceiling on the saved-to-disk file itself. The new 1 GB cap is a related but distinct new fact — **update existing** (add adjacent to the existing bullet, same list).

## Plan
1. Open `src/pages/practices.html`, locate the `bashOutputMaxChars` / `taskOutputMaxChars` bullet in the Notable settings.json Keys list (~line 656).
2. Append a sentence (or a new adjacent `<li>`) noting the 1 GB total cap on saved-to-disk tool-result files and that the preview reports truncation when hit, version-tagged `(v2.1.265)`. Example addition to the existing bullet:
   `Files saved to disk this way (and other large tool results saved to disk) are capped at 1 GB total; the in-conversation preview says the file was truncated once the cap is hit (v2.1.265).`
3. Keep the existing 128,000-character inline-threshold description unchanged — this is additive, not a correction.

## Acceptance Criteria
- [ ] `src/pages/practices.html` Notable settings.json Keys list documents the 1 GB disk cap on saved tool-result files, version-tagged `(v2.1.265)`
- [ ] Existing `bashOutputMaxChars`/`taskOutputMaxChars` inline-threshold text remains intact
- [ ] `python3 scripts/build-source.py` runs clean after the edit
