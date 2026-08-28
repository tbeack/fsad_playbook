# CBP-488 — Extend `/loop` section with dynamic-mode platform availability

## Summary
Claude Code v2.1.248 changed `/loop`: self-paced dynamic mode and the no-prompt autonomous default are now always available, including on Bedrock/Vertex/Foundry.

## Assessment
The `/loop` collapsible in `src/pages/practices.html` (~line 2398-2428) has a "Monitor Loop Cost" callout tracking the most recent `/loop`-related update (v2.1.243 Loops usage breakdown). This platform-availability change is a good fit for a new callout alongside it, since it changes who can use dynamic/autonomous `/loop` mode rather than how to invoke it.

## Plan
1. In `src/pages/practices.html`, locate the `/loop` collapsible's callouts (~line 2423-2426, "Monitor Loop Cost").
2. Add a new callout after it, before the closing `</div></div>` of the collapsible:
   ```html
   <div class="callout callout-tip" style="margin-bottom:0;">
     <div class="callout-title">Available Everywhere</div>
     <p>Self-paced dynamic mode (no fixed interval — Claude paces itself) and the no-prompt autonomous default are now always available for <code>/loop</code>, including on Bedrock, Vertex, and Foundry (v2.1.248).</p>
   </div>
   ```
   (move `margin-bottom:0;` off the "Monitor Loop Cost" callout onto this new last callout).

## Acceptance Criteria
- [x] `/loop` dynamic-mode/autonomous-default Bedrock/Vertex/Foundry availability documented.
