# CBP-566 — Add session-forking note to Remote Control collapsible (v2.1.273)

**Source:** Claude Code v2.1.273  
**Tag:** [Claude]

## Summary
v2.1.273 adds the ability to fork a session started with `claude --remote-control` or `/remote-control` from the Claude app. The fork runs as a background session on your computer — useful for spinning off a parallel investigation without interrupting the main Remote Control session.

## Assessment
The Remote Control & Cross-Device collapsible in `src/pages/practices.html` ends its bullet list at line 2529 (`v2.1.271` fast mode note). The new capability should be added as the next bullet (line 2530, before `</ul>`).

## Plan
1. Open `src/pages/practices.html`
2. Find the last bullet at line 2529:
   ```
   <li>Fast mode now works in Claude Code Remote sessions...
   ```
3. Insert a new `<li>` after it (before `</ul>`):
   ```html
   <li>Sessions started with <code>claude --remote-control</code> or <code>/remote-control</code> can now be forked from the Claude app — the fork runs as a background session on your local machine, letting you branch off an investigation without interrupting the main session (v2.1.273)</li>
   ```
4. Mark CBP-566 complete in todo.md

## Acceptance Criteria
- The new bullet appears after the v2.1.271 fast-mode bullet in the Remote Control list
- The note mentions both `claude --remote-control` and `/remote-control` entry points
- Build passes without errors
