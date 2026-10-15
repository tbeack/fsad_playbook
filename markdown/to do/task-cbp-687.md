# CBP-687 — Add `prompt.change` mod hook note to mods section (v2.1.300)

## Summary
Claude Code v2.1.300 added the `prompt.change` mod hook, raised when the prompt box's text changes without a typed edit: a recalled history entry, a clear, an undo, or a plugin's fill.

## Assessment
The mods "What a Mod Is" section (src/pages/practices.html, near line 3702) mentions `tool.call` and `ui.render` as example events in code snippets, plus a note about `$.agent.spawn` (v2.1.289). There is no mention of `prompt.change`. This is a "New content needed" task.

## Plan
1. Read src/pages/practices.html around line 3702.
2. The paragraph at line 3702 reads: "To do anything outside its own code... a hook calls the mods API through `$`. Since v2.1.289, a hook can call `agent.spawn`..."
3. Append a new sentence at the end of that paragraph: "As of v2.1.300, the `prompt.change` event fires when the prompt box's text changes without a typed edit — a recalled history entry, a clear, an undo, or a plugin's fill — letting a mod react to those transitions."

## Acceptance Criteria
- The mods section mentions the `prompt.change` event.
- The placement is in the "What a Mod Is" collapsible, after the `$.agent.spawn` note.
- No other content is removed or broken.
