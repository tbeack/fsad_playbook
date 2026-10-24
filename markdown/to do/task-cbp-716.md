# CBP-716: Monitor tool + plugin monitors + sleep-blocking now on Bedrock/Vertex/Foundry/telemetry-disabled (v2.1.310)

## Summary
Claude Code v2.1.310 adds the Monitor tool and plugin monitors on Amazon Bedrock, Google Vertex AI, and Foundry, and when telemetry or nonessential traffic is disabled — these configurations previously lacked them. Long foreground sleeps are now also blocked there, matching direct-API sessions. The Monitor Tool collapsible already tracks availability/behavior changes (v2.1.260 subagent timeout removal, v2.1.271 watch deadline) in the same style.

## Assessment
`src/pages/practices.html` lines 2680-2693, the "Monitor Tool — Background Script Streaming" collapsible, documents Monitor's behavior but says nothing about provider availability. The Bedrock/Vertex/Foundry/telemetry-disabled availability pattern is already used elsewhere in the doc (e.g. `/code-review` auto-trigger row, cross-session `SendMessage` row) for exactly this kind of platform-availability note.

## Plan
1. Open `src/pages/practices.html`.
2. Append one sentence to the existing paragraph in the Monitor Tool collapsible (after the v2.1.271 sentence) noting that as of v2.1.310, the Monitor tool, plugin monitors, and the long-foreground-sleep block are also available on Bedrock, Vertex, Foundry, and when telemetry or nonessential traffic is disabled.

## Acceptance Criteria
- Monitor Tool collapsible mentions the new provider availability.
- Version-tagged `(v2.1.310)`.
- Existing content and code example preserved.
