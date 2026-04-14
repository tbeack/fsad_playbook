# CBP-031 — Add Obsidian as a Memory Example (Karpathy-inspired)

## Source
Andrej Karpathy has publicly shared his workflow of using Obsidian as a personal knowledge vault that doubles as persistent context for LLMs — a markdown-first, human-readable memory layer that complements Claude's auto-memory.

## Summary
Introduce Obsidian as a concrete, real-world example of an external memory system that pairs well with Claude's `MEMORY.md` / `CLAUDE.md` layers. Reference Karpathy's approach of keeping a markdown knowledge vault as a long-lived, portable memory store that can be surfaced into AI sessions.

## Assessment
The playbook already covers Claude's built-in auto-memory (`~/.claude/projects/*/MEMORY.md`) and the "Let `MEMORY.md` accumulate" recommendation in the Configuration Cascade section (around line 2690). However, there's no mention of **external, human-curated memory systems** like Obsidian, Logseq, or similar markdown vaults — which many power users (Karpathy being the canonical example) use as a durable knowledge layer that feeds AI sessions.

**Location:** `fsad-playbook.html` — Claude Best Practices page, near the existing MEMORY.md coverage (lines ~2576, 2690–2692, 2726–2729). Best fit: add a callout or card adjacent to the "Let `MEMORY.md` accumulate" recommendation, or as a new sub-section on external memory systems.

## Plan

1. Locate the MEMORY.md recommendation card (line ~2690) and the anti-pattern callout (line ~2727).
2. Add a new callout (`callout-tip` style) titled something like **"External Memory: Obsidian & Markdown Vaults"** that:
   - Explains the pattern — a human-curated markdown vault as persistent context
   - References Andrej Karpathy's public workflow (Obsidian vault → fed into LLM sessions) as the canonical example
   - Notes the distinction from Claude's auto-memory: external vaults are **intentional, curated, and portable**; auto-memory is **passive and session-derived**
   - Suggests practical integration patterns — symlinking a vault subfolder into the repo, pasting relevant notes into context, or using an MCP server for Obsidian
3. Optionally add a small card to the "Recommendations" grid (line ~2668) titled **"Pair auto-memory with a curated vault"**.
4. Verify rendering in the browser — callout styling, dark/light theme parity, no layout regressions.
5. Update `README.md` version notes if appropriate.

## Acceptance Criteria
- [x] New callout or card added near existing MEMORY.md content on the Best Practices page
- [x] Obsidian is explicitly named as an example of an external markdown memory vault
- [x] Andrej Karpathy is referenced as the practitioner/inspiration for the pattern
- [x] Distinction between auto-memory (passive) and curated vault (intentional) is clear
- [x] At least one practical integration suggestion is provided (symlink, paste, MCP, etc.)
- [x] Renders cleanly in both dark and light modes with no layout regressions
- [x] Search indexes any new section heading correctly (if a new heading is added)
