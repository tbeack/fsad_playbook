# CBP-165: [Codex] Add ChatGPT mobile app connection to Power Usage

## Source
OpenAI developers.openai.com/codex/changelog — 2026-05-14 entry: "Work with Codex from ChatGPT mobile app by connecting to Mac running Codex app — remote connections feature for mobile setup"

## Summary
Users can now connect to Codex from the ChatGPT mobile app when a Mac is running the Codex desktop app. This enables mobile-driven workflows — e.g., reviewing progress, submitting prompts, or checking results while away from the desk. Relevant for teams doing multi-day goals or long-running background work.

## Assessment
No mobile connection content exists in `#codex-power-usage`. The "Codex Cloud" collapsible (line 9458) covers cloud/remote execution but not the mobile connection feature specifically. A brief note should be added — either as a new collapsible or as a paragraph in the Codex Cloud collapsible, since both relate to remote/distributed access patterns.

## Plan
1. Read the Codex Cloud collapsible (lines 9458–9475).
2. Add mobile connection content to the Codex Cloud collapsible body as an additional paragraph with a short code block or steps showing how to connect from mobile:
   - Run Codex desktop app on Mac
   - Open ChatGPT mobile app and connect to Mac session
   - Note: requires Mac running Codex app + same account

## Acceptance Criteria
- Codex Power Usage section documents the ChatGPT mobile → Codex Mac connection feature
- Covers setup requirements (Mac Codex app + same ChatGPT account)
- Content fits naturally in the existing Codex Cloud collapsible
