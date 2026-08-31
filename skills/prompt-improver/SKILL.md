---
name: prompt-improver
description: Rewrites a draft prompt intended for Claude into a stronger, more reliable one, applying Anthropic's own prompt engineering techniques (specificity, role/system framing, XML-tag structure, examples/multishot, chain-of-thought cues, explicit output formatting, prompt chaining for complex tasks). Use this skill whenever the user pastes a prompt, system prompt, skill instruction, or agent/subagent prompt and asks to improve, strengthen, tighten, fix, optimize, or rewrite it, or asks things like "how do I phrase this better," "why isn't this prompt working," "make this more reliable," or "can you clean this up" — even if they never say "prompt engineering." Also use it proactively when the user is iterating on a system prompt, skill, or agent persona and it is under-specified or clearly causing inconsistent behavior.
---

# Prompt Improver

## What this skill does

Takes a prompt the user has drafted — a one-off task prompt, a system prompt, a skill or subagent instruction, a reusable template with variables — and rewrites it to be clearer, more specific, and more likely to produce the result the user actually wants from Claude. The output is the improved prompt itself, ready to paste and use. Don't wrap it in an explanation of what changed and why unless the user asks for that; they asked for a better prompt, not a lecture on prompt engineering. A short one-line note is fine if something about the original was ambiguous enough that you had to make a judgment call, but keep it to that.

## Before rewriting: read the prompt like Claude will read it

Read the draft the way the model reading it cold would — not the way the user, who has all the context in their head, reads it. Most weak prompts aren't wrong, they're just relying on context that lives in the user's head and never made it onto the page. Your job is to find that gap and close it, not to add ceremony for its own sake.

Figure out what kind of prompt this is, because it changes what "better" means:

- **A one-off task prompt** ("summarize this," "write me an email about X") — the fix is usually about specificity and output shape, not structure.
- **A system prompt or persona** (defines how an assistant should behave across many turns) — the fix is usually about role clarity, consistent behavioral rules, and handling the edge cases that come up over many conversations, not just the happy path.
- **A skill, agent, or subagent instruction** — the fix is usually about making the procedure unambiguous to an agent executing it with no back-and-forth: what triggers it, what steps to take in what order, what "done" looks like.
- **A reusable template with variables** (e.g. `{{DOCUMENT}}`, `{topic}`) — preserve every placeholder exactly as written, including its exact syntax. Never rename, reformat, or fill in a placeholder.

## The diagnostic pass

Before touching the wording, check the draft against these. Not every prompt needs every fix — see "Proportionality" below.

1. **Task clarity.** Is it obvious, from the prompt alone, what Claude is being asked to produce? Vague verbs ("help with," "look at," "deal with") without a concrete deliverable are the most common failure. State the actual task and the concrete output.
2. **Missing context Claude needs but doesn't have.** Audience, purpose, constraints, prior decisions, why this task matters — anything the user would tell a new hire before handing them this task, but forgot to write down.
3. **Role framing.** For system prompts or personas, does giving Claude an explicit role/persona sharpen its behavior (a specific expertise, a specific relationship to the user) or would it just be decoration? Add it only when it changes what the model should actually do.
4. **Output format.** Does the prompt say what shape the answer should take — length, structure, format (prose vs. list vs. table vs. code), tone? If the user clearly cares about this (or the task implies it, like "write a report"), make it explicit rather than leaving Claude to guess.
5. **Examples (multishot).** For tasks where the desired pattern is easier to show than to describe — a specific style, a specific classification boundary, an exact format — add one or two concrete input/output examples if the user supplied any hint of what "right" looks like, or note where an example would help if they didn't. Don't invent examples that constrain the task in ways the user never asked for.
6. **Room to think.** For tasks that involve real reasoning, multi-step analysis, or weighing tradeoffs, does the prompt let Claude work through it, or does the phrasing push straight to a final answer with no room to reason first? Adding a line like "work through your reasoning before giving the final answer" often fixes accuracy problems that read like the model being unreliable.
7. **Structure for anything long or multi-part.** If the prompt mixes instructions with reference material, long documents, or several distinct pieces of context, is it a wall of undifferentiated text? Use XML tags to separate instructions from data (`<document>`, `<instructions>`, `<examples>`) so nothing gets lost or mistaken for something else. Skip this for a short, single-purpose prompt — tags around two sentences add noise, not clarity.
8. **Instruction order for long context.** If the prompt includes a large document or dataset alongside a question about it, is the question buried before the material or lost inside it? Put long reference material first and the actual instruction/question last, right where the model will read it right before answering.
9. **Positive framing.** Are the constraints phrased only as prohibitions ("don't be too formal," "don't just list features")? A prohibition tells the model what to avoid, not what to do instead, and models often satisfy it in some other unwanted way. Add the positive counterpart — what to do instead — wherever a "don't" appears without one.
10. **Buried lede.** Is the actual instruction sitting in the middle of a paragraph of preamble, or split across several sentences that each add a partial constraint? Pull the core ask to somewhere unmissable — first or last — and let supporting detail surround it.
11. **Scope for chaining.** If the task is really several distinct jobs bolted into one prompt (e.g. "research this, then write it up, then critique your own writeup"), consider whether the user would be better served by a prompt that produces one clean intermediate result at a time, and say so as a suggestion — but don't fragment a prompt that's genuinely one coherent task.
12. **Conflicts and redundancy.** Do any two instructions contradict each other, or does the same instruction appear three different ways? Resolve conflicts in favor of what the user most clearly wants; cut the redundancy.

Read `references/best_practices.md` for the fuller version of each technique with worked examples — worth a look whenever a prompt doesn't fit neatly into the checklist above, or when you want a concrete before/after to model the rewrite on.

## Proportionality — the most important judgment call

A two-sentence prompt that's already clear does not need XML tags, a persona, a five-point output spec, and a chain-of-thought instruction bolted onto it. That's not improvement, it's inflation, and it makes the prompt harder to read and maintain than the problem it started with. Match the weight of the rewrite to the weight of the task and to what's actually broken:

- If the draft is already clear and well-scoped, make the minimal edit that closes the real gap (or none at all) — don't manufacture structure to look thorough.
- If the draft is vague or underspecified, add exactly the missing pieces the diagnostic pass surfaced, no more.
- If the draft is long, high-stakes, or reused often (a system prompt, a skill, an agent instruction), it earns more structural investment — clear sections, explicit edge-case handling, examples — because it will be read by a model with no chance to ask a follow-up question, over and over again.

When a prompt is genuinely ambiguous in a way that changes the rewrite (the user's intent could reasonably go two different directions), don't stall on a clarifying question — pick the more likely reading, write the prompt to be flexible enough to cover the plausible alternative, and say in one line what assumption you made. The user asked for an improved prompt, not a conversation.

## Preserve what belongs to the user

Keep the user's actual goal, tone, and any domain-specific requirements intact. "Improve" means more effective at getting what they want, not "generic" or "more formal" or "more verbose." If the original has a distinctive voice (a system prompt written in first person for a specific persona, a casual internal tool prompt), keep that voice while fixing the structural problems. Never add scope the user didn't ask for — extra constraints, extra output sections, extra caveats — just because it seems like generically "good practice."

## Output

Give back the improved prompt as the primary content of your reply, formatted so it can be copied straight out (a fenced code block for anything with structure, tags, or multiple lines; plain text is fine for a short single-line prompt). No preamble, no "Here's the improved version," no bullet list of changes — unless the user's request implies they want the reasoning too (e.g. they asked "what's wrong with this prompt" rather than "improve this prompt"), in which case give the rewrite first and the explanation after.
