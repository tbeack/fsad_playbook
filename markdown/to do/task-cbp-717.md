# CBP-717: Auto mode's outside-working-directory read prompt explains the shell-command tradeoff (v2.1.310)

## Summary
Claude Code v2.1.310 improves auto mode's one-time prompt shown before the first file read outside the working directories: it now tells the user that blocking those reads also makes shell commands ask for permission (since a Bash command could otherwise read outside the working directories without going through the file-read path). This is a wording/behavior clarification on the exact feature already documented via `permissions.blockReadsOutsideWorkingDirectories`.

## Assessment
`src/pages/practices.html` line 627 documents the `permissions.blockReadsOutsideWorkingDirectories` setting and the v2.1.257/v2.1.284 prompt changes in the Config Cascade settings.json callout list, in the same append-a-sentence style used for prior revisions of this exact bullet.

## Plan
1. Open `src/pages/practices.html`.
2. Append one sentence to the existing `permissions.blockReadsOutsideWorkingDirectories` bullet (line 627) noting that as of v2.1.310, the prompt also explains that blocking these reads makes shell commands ask for permission too.

## Acceptance Criteria
- The `permissions.blockReadsOutsideWorkingDirectories` bullet mentions the new prompt wording/behavior.
- Version-tagged `(v2.1.310)`.
- Existing v2.1.257/v2.1.284 sentences preserved.
