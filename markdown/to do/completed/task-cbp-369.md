# CBP-369 — [Claude] Add Remote Control bullet for direct photo handling

## Source
Claude Code v2.1.225

## Summary
v2.1.225 improved Remote Control: photos attached from the Claude app are now shown to Claude directly instead of being read from disk with a separate tool call.

## Assessment
`fsad-playbook.html`, `#power-usage--remote-control` collapsible (lines ~11560–11588). The existing `<ul>` (lines ~11578–11583) documents `/desktop`, `/mobile`, bridge session display, and the footer pill, but has no mention of image/photo attachment handling at all. This is a genuine content gap — a concrete new capability with no existing bullet to update, so it's a new list item within the existing collapsible (not a whole new section).

## Plan

### Step 1 — Add a bullet to the existing `<ul>` in `#power-usage--remote-control` (after line 11582, before `</ul>` at line 11583)
Current closing of the list:
```html
          <li>When enabled, Remote Control appears as a persistent footer pill with a direct link to the session — accessible at any time without scrolling back through startup messages (v2.1.162)</li>
        </ul>
```
Replace with:
```html
          <li>When enabled, Remote Control appears as a persistent footer pill with a direct link to the session — accessible at any time without scrolling back through startup messages (v2.1.162)</li>
          <li>Photos attached from the Claude mobile app are shown to Claude directly, instead of being read from disk via a separate tool call — faster and more reliable for mobile-initiated sessions (v2.1.225)</li>
        </ul>
```

## Acceptance Criteria
- New bullet present in `#power-usage--remote-control`'s existing `<ul>`, matching the style/tone of sibling bullets
- Version tag (v2.1.225) included
- No changes to surrounding markup structure
