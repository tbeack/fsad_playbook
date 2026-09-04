# CBP-519 — Note `!` Bash-Mode Escape Under Strict Sandbox

## Source
Claude Code v2.1.260

## Summary
v2.1.260 changes commands typed at the `!` bash-mode prompt to run outside the sandbox even when strict sandbox mode (`sandbox.allowUnsandboxedCommands: false`) is on — like typing into your own terminal.

## Assessment
`src/pages/practices.html` line 2767 documents `sandbox.allowUnsandboxedCommands` as "All commands must be sandboxed or listed in `excludedCommands`". That is now inaccurate for user-typed `!` commands. Update existing.

## Plan
1. Read line 2767.
2. Append: "Exception: commands you type yourself at the <code>!</code> bash-mode prompt run outside the sandbox even in strict mode, like typing into your own terminal (v2.1.260)."

## Acceptance Criteria
- Sandbox row mentions the `!` bash-mode exception with v2.1.260 attribution
- HTML is valid
