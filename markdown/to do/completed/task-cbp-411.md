# CBP-411: Update `denyRead` row with macOS wildcard precedence hardening

## Source
Claude Code v2.1.236 changelog: "Sandbox: on macOS, wildcard read-deny rules (e.g. `**/.env`) now take precedence inside allowed read regions, cover matched directories' contents, and can't be bypassed by renaming the denied file."

## Summary
A security hardening change to macOS subprocess sandboxing: wildcard `denyRead` rules (like `**/.env`) now win even inside `allowRead` regions, apply recursively to matched directories, and can't be defeated by renaming the denied file.

## Assessment
Does content exist? Partial — the `sandbox.filesystem.denyRead` and `sandbox.filesystem.allowRead` rows exist in the Subprocess Sandboxing hardening table (Power Usage section, lines ~11826-11827) but say nothing about wildcard precedence, directory-content coverage, or the anti-rename-bypass behavior. This is a meaningful security-relevant clarification that changes how engineers should reason about the interaction between `denyRead` and `allowRead`.

## Plan
1. Open `fsad-playbook.html`, locate the Power Usage → Subprocess Sandboxing hardening table, specifically the `sandbox.filesystem.denyRead` row (currently line 11826).
2. Append a sentence to that row's description:
   `As of v2.1.236 (macOS), wildcard denyRead rules (e.g. **/.env) take precedence even inside an allowRead region, cover the contents of matched directories, and can't be bypassed by renaming the denied file.`
3. Keep the `allowRead` row (line 11827) as-is, or optionally add a short cross-reference sentence noting the same precedence behavior — prefer editing only the `denyRead` row to keep the change minimal and avoid duplicate wording.

## Acceptance Criteria
- [ ] The `sandbox.filesystem.denyRead` row documents the macOS wildcard precedence, directory-content coverage, and anti-rename-bypass behavior.
- [ ] Version v2.1.236 and macOS scope are both called out.
- [ ] Table row structure (`<tr><td>...</td><td>...</td></tr>`) remains valid.
