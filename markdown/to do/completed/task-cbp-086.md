# CBP-086: Document `hookSpecificOutput.updatedToolOutput` for PostToolUse hooks (all tools)

## Summary
In v2.1.121, PostToolUse hooks gained the ability to replace tool output for **all tools** via `hookSpecificOutput.updatedToolOutput`. Previously this was only supported for MCP tools. By returning this JSON key from a PostToolUse hook (exit 0), the hook can substitute the result Claude receives — useful for redacting sensitive output, normalizing formats, or injecting additional context.

## Assessment
The Hooks section's Exit Codes collapsible documented `hookSpecificOutput` for MCP tools only. The restriction was lifted in this release. The section needed a new code example showing the JSON structure and an explanatory paragraph noting the expansion to all tools.

## Plan
1. Read the Hooks Exit Codes collapsible in fsad-playbook.html
2. Add a paragraph and JSON code block demonstrating `hookSpecificOutput.updatedToolOutput`
3. Note that it applies to all tools (not just MCP) and list the use cases: redact, normalize, inject context

## Acceptance Criteria
- Exit Codes collapsible includes `hookSpecificOutput.updatedToolOutput` JSON example
- Explanatory text clarifies it works for all tools and describes the key use cases
- No other hooks content changed
