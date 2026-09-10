# CBP-532: Update `/commands` card text with slash command list behavior (v2.1.265)

## Summary
Claude Code v2.1.265 improved slash command completion typed mid-prompt: matches now show in a list (Tab opens the list outside fullscreen mode) instead of a single inline suggestion. A plugin skill is now also findable by its bare name (without the `plugin:` namespace prefix). This is a meaningful UX improvement for users who type slash commands mid-sentence.

## Assessment
The current `/commands` card in the Prompt Tips section (around lines 2184–2186 of `src/pages/practices.html`) reads:
```html
<div class="card">
  <h3>/commands</h3>
  <p>Type <code>/</code> for slash command and skill autocomplete.</p>
</div>
```
This is accurate but misses the list-display behavior and bare-name plugin skill lookup. Adding this detail helps users know they can scroll through completions and find plugin skills without the full namespace.

**Action:** Update the `/commands` card description.

## Plan
1. Find the `/commands` card around line 2184 in `src/pages/practices.html`
2. Update the paragraph from:
   `Type <code>/</code> for slash command and skill autocomplete.`
   to:
   `Type <code>/</code> for slash command and skill autocomplete — matches show as a scrollable list (Tab opens the list outside fullscreen). Plugin skills are findable by bare name without the <code>plugin:</code> prefix (v2.1.265).`

## Acceptance Criteria
- Card text mentions the list display and Tab behavior
- Card text mentions bare-name plugin skill lookup
- Version attribution (v2.1.265) is included
- HTML formatting is consistent with surrounding cards
