# CBP-436: Extend `/usage` cheat-sheet row — cost estimates include 1.1x US-only-inference premium for data-residency workspaces

## Source
Claude Code v2.1.239 CHANGELOG.md entry: "Cost estimates (`/cost`, status line, `--max-budget-usd`) now include the 1.1× US-only-inference premium for data-residency workspaces"

## Summary
For data-residency workspaces (where inference is constrained to US-only infrastructure), cost estimates shown via `/cost`, the status line, and enforced by `--max-budget-usd` now factor in a 1.1x pricing premium, so the displayed/enforced numbers reflect what will actually be billed rather than understating it.

## Assessment
Checked the `/usage` Cheat Sheet row (~line 11003, which documents `/cost` as a typing-shortcut into the unified `/usage` dashboard) and the `--max-budget-usd` CLI flag row (~line 11155). Neither mentions data-residency workspace pricing or any premium multiplier. Searched the whole file for "data-residency"/"data residency" — the only two hits are about self-hosted-runner infrastructure and Codex's Bedrock support, unrelated to cost-estimate accuracy. This is a genuinely new, if narrow, billing-accuracy detail with no existing coverage — relevant to any team on a data-residency plan tracking spend via `/cost`/status line/`--max-budget-usd`.

## Plan
1. In `fsad-playbook.html`, locate the `/usage` row (~line 11003) in the Cheat Sheet's Session/context/history (or equivalent) Slash Commands table.
2. Append a new sentence to the existing `<td>` description, before the closing `</td></tr>`:
   ```html
   As of v2.1.239, cost estimates shown via <code>/cost</code>, the status line, and enforced by <code>--max-budget-usd</code> include the 1.1&times; US-only-inference premium that applies to data-residency workspaces, so the figures reflect actual billed cost.
   ```

## Acceptance Criteria
- [ ] The `/usage` row gains a new sentence about the data-residency cost premium, citing v2.1.239.
- [ ] Existing `/usage` row content (v2.1.149, v2.1.236 clauses) remains intact.
- [ ] Table row HTML remains valid.
