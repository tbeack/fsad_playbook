# CBP-719: Typed `ultrathink` keyword raises effort mid-turn (v2.1.311)

## Summary
Claude Code v2.1.311 changes how the `ultrathink` keyword behaves when typed in the interactive terminal: on Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1 through Anthropic's API, typing `ultrathink` now runs that turn at `xhigh` effort — and if typed while Claude is already working on a turn, it raises the *rest* of that turn's effort instead of only applying to the next turn. The same version also makes the `ultrathink` rainbow highlight appear only where the keyword can actually raise effort (not when it's quoted or part of a file path), avoiding a misleading visual cue.

## Assessment
`src/pages/practices.html` section 12.5 "Model & Effort" (`id="model-effort"`, starting ~line 1581) documents `/effort` levels and the effort code block (~line 1652-1659) but has no mention of the `ultrathink` keyword shortcut at all — the only other `ultrathink` reference in the page (line 1484) is about including the word in skill *content*, which is a distinct mechanism. This is a gap worth filling now that the behavior is meaningfully more useful (mid-turn effort raise).

## Plan
1. Open `src/pages/practices.html`.
2. In the effort code block (~line 1652-1659), add a line after the `/effort` examples:
   ```
   # Type "ultrathink" directly in the prompt to run that turn at xhigh — works mid-turn too,
   # raising the rest of the current turn's effort (Opus 5.5 / Sonnet 5.5 / Haiku 5.5 / Fable 5.1, Anthropic API) (v2.1.311)
   ```
3. Add a short sentence below the code block (near the existing Adaptive Thinking / effort-lever prose) noting the rainbow highlight now only appears where the keyword can actually raise effort — not when quoted or part of a file path (v2.1.311).

## Acceptance Criteria
- The Model & Effort section documents the `ultrathink` keyword shortcut, including the mid-turn raise behavior and which models/surface it applies to.
- Notes the rainbow-highlight precision fix.
- Version-tagged `(v2.1.311)`.
