# CBP-741: Add network email-exfil check to Privacy & Security list (v2.1.317)

## Summary
Claude Code v2.1.317 added a check that asks before a web or shell tool call sends your account email address to the network.

## Assessment
`src/pages/practices.html`'s Monitoring → Privacy & Security collapsible (~line 4043-4060) already has a bullet "Email included with OAuth" noting that `user.email` is sent to Anthropic's own telemetry when authenticated via OAuth. This new check is the complementary protection — it guards against a tool call sending that same address to an arbitrary third party — so it belongs right next to that existing bullet.

## Plan
1. Open `src/pages/practices.html`.
2. In the Privacy & Security list, after the "Email included with OAuth" `<li>`, insert:
   ```html
   <li><strong>Network email check (v2.1.317)</strong> &mdash; Claude Code now asks before a web or shell tool call would send your account email address to the network (e.g. in a URL, header, or request body), so an automated client identifying itself with your address needs a conscious approval instead of happening silently</li>
   ```
3. No other files require changes for this task.

## Acceptance Criteria
- The Privacy & Security list documents the new pre-send email check alongside the existing OAuth-email bullet.
- HTML is valid (no unclosed tags).
