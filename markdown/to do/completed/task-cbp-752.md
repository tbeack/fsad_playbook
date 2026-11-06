# CBP-752 — [Codex] Expand patch details during approval prompt

## Summary
Codex rust-v0.167.0 lets users expand patch details directly in the transcript while an approval prompt is open. Previously, users had to close the prompt to inspect the full diff. Now they can review the exact changes inline before deciding to approve or deny.

## Assessment
The playbook's Permission Profiles collapsible in `src/pages/codex.html` covers the approval model with callouts for fail-closed paths and terminal input approval. The terminal input approval callout is at lines 1427-1430. A new callout after the terminal input approval callout is the right location for this UX improvement.

## Plan
1. Open `src/pages/codex.html`.
2. Find the terminal input approval callout close tag `</div>` (after line 1429 `<p>...</p>`).
3. Insert a new `<div class="callout callout-tip">` after it.
4. Title: `Expand patch details during approval (rust-v0.167.0)`
5. Body: `While an approval prompt is open, expand patch details directly in the transcript to review the exact diff before approving or denying. No need to close the prompt to inspect changes.`

## Acceptance Criteria
- A callout appears in the Permission Profiles collapsible after the terminal input approval callout.
- The callout title includes `rust-v0.167.0`.
- No HTML tags are unclosed.
- The callout structure matches surrounding callout-tip divs.
