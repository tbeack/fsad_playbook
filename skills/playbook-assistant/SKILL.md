---
description: Answer "how do I…" questions about FSAD strategies and practices using only the content already in the FSAD Playbook — no external knowledge. Retrieves the relevant section(s) from a bundled offline index and cites each answer back to a real in-app section anchor. Use when a teammate asks how the playbook recommends handling something (pod sizing, hooks, code review, KPIs, Codex setup, etc.) instead of re-deriving an answer from general Claude Code knowledge.
argument-hint: `<question>`
---

# fsad-harness:playbook-assistant — FSAD Playbook Q&A

Answer a "how do I…" or "what does the playbook say about…" question using **only** the content in the FSAD Playbook, and cite the section(s) the answer came from. Never answer from general Claude Code/Codex knowledge as if it were playbook content — if the playbook doesn't cover it, say so.

## How this works

This skill ships with `index/playbook-index.jsonl` — an offline, pre-extracted copy of every section and collapsible in `fsad-playbook.html` (one JSON object per line: `sectionId`, `title`, `label`, `page`, `anchor`, `text`). It works fully offline; the consumer's repo does not need a copy of `fsad-playbook.html` itself. There is no vector DB or embedding step — the retrieval is keyword search over the index, and Claude does the actual "semantic" reasoning by reading the matched text.

## Step 1 — Resolve the question

`<question>` is the free-text question. If empty, ask: "What would you like to know about the FSAD Playbook?"

## Step 2 — Search the index

Run `Grep` against `index/playbook-index.jsonl` (resolve the path relative to this `SKILL.md` file's own directory) for keywords pulled from the question. Since it's JSONL, each match is one self-contained chunk — no need to parse the whole file.

- Start with the most distinctive nouns/verbs in the question (e.g. "pod size 3 person" → try `pod`, `sizing`, `3-person` separately — `grep -i` with `-E` alternation works well: `grep -iE "pod|sizing"`).
- If the first pass returns nothing, retry with broader or synonymous terms before giving up (e.g. "hooks for security review" with no hits on "security review" → try "sec-review", "hook", "PreToolUse").
- Collect the 1–3 best-matching lines. Parse each as JSON to get `title`, `label`, `page`, `anchor`, `text`.

## Step 3 — Answer from the retrieved text only

Read the matched `text` field(s) and compose an answer grounded **only** in that content. For each section used, cite it as:

> see *{title}* — `{anchor}`

and tell the user to open that anchor in their local `fsad-playbook.html` (or `dist/fsad-playbook.html`) — e.g. "open `fsad-playbook.html#practices/hooks-deep-dive`". Do not fabricate a hosted URL; only reference the anchor fragment unless the user has told you where their copy of the playbook is deployed.

If no chunk is a real match for the question, say explicitly that the playbook doesn't appear to cover it, and suggest the nearest topic you did find instead of guessing an answer.

## Step 4 — Staleness check (only if `fsad-playbook.html` is present in this repo)

If the current working directory has a top-level `fsad-playbook.html`, compare its `<title>` version against `playbook_version` in `index/meta.json`. If they differ, mention once that the bundled index may be out of date with the local playbook and suggest regenerating it (`python3 scripts/build-assistant-index.py` in the FSAD Playbook repo, then reinstalling this plugin). Skip this step entirely when no local `fsad-playbook.html` exists — that's the normal case for a consumer repo.

## Conventions to honour

- Never answer as if playbook content when it wasn't found in the index — that's how this skill earns trust over a plain LLM guess.
- Keep citations concrete: a title and an anchor, not a vague "see the practices page."
- This skill is read-only — it never edits any file.
