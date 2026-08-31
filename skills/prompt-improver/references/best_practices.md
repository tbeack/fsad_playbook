# Prompt engineering best practices — worked examples

Expands each item in `SKILL.md`'s diagnostic pass with a concrete before/after. Use these as a model for the shape of a fix, not as templates to copy verbatim — the right fix always depends on what the specific draft is missing.

## 1. Task clarity

**Before:** "Help with this customer email."

**After:** "Write a reply to this customer email that acknowledges their frustration, confirms the refund has been processed, and gives a delivery estimate for the replacement item. Keep it under 150 words."

The fix names the concrete deliverable (a reply email) and the three things it must accomplish, instead of leaving "help" to be interpreted.

## 2. Missing context

**Before:** "Summarize this report for the team."

**After:** "Summarize this quarterly sales report for the engineering team, who don't track revenue metrics day-to-day. Focus on what changed since last quarter and any implications for product priorities — skip line-item financial detail they won't act on."

The fix supplies the audience and the purpose (what the summary is *for*), which changes what counts as a good summary.

## 3. Role framing

**Before (system prompt):** "You are a helpful assistant that answers coding questions."

**After:** "You are a senior backend engineer reviewing code for a team that ships to production daily. Prioritize correctness and failure modes over style; flag anything that could cause a data-loss or security incident before commenting on naming or formatting."

The role only earns its place here because it changes prioritization (safety over style), not because "senior engineer" sounds more impressive than "helpful assistant."

**When to skip this:** a one-off prompt like "translate this paragraph to French" gains nothing from a persona — adding one is decoration, not improvement.

## 4. Output format

**Before:** "What are the pros and cons of switching to microservices?"

**After:** "What are the pros and cons of switching to microservices? Answer as two short bulleted lists (Pros / Cons), 3–5 items each, one sentence per item."

Vague open questions default to unpredictable length and structure; naming the shape removes that variance.

## 5. Examples (multishot)

**Before:** "Classify these support tickets by urgency."

**After:**
```
Classify each support ticket as urgent, normal, or low priority.

<example>
Ticket: "Site is down for all users, losing revenue every minute."
Classification: urgent
</example>
<example>
Ticket: "Would like a minor UI tweak when you have time, no rush."
Classification: low priority
</example>

Now classify:
<ticket>{{TICKET_TEXT}}</ticket>
```

Two examples pin down where the classification boundary actually sits — "would like... no rush" vs. "losing revenue" — far more precisely than describing the categories in the abstract.

## 6. Room to think

**Before:** "Is this SQL query going to perform well at scale? Answer yes or no."

**After:** "Is this SQL query going to perform well at scale? Work through the query's execution plan step by step — index usage, join order, row estimates — before giving your final yes/no verdict."

Forcing a snap verdict on a genuinely analytical question produces guesses dressed as answers; explicit room to reason first produces answers actually grounded in the reasoning.

## 7. Structure for anything long or multi-part

**Before:** A prompt that pastes a 2,000-word contract directly into the instructions paragraph, followed by "what are the termination clauses and are there any auto-renewal traps?"

**After:**
```
<contract>
{{CONTRACT_TEXT}}
</contract>

<instructions>
Identify every termination clause in the contract above, and flag any
auto-renewal terms that could trap the counterparty into renewing without
active consent.
</instructions>
```

Separating data from instruction with tags stops the model from treating stray contract language as part of the instructions (or vice versa).

**When to skip this:** a two-sentence prompt with no embedded document doesn't need tags — they'd just be visual noise around content that was already unambiguous.

## 8. Instruction order for long context

**Before:** "Given everything in this 50-page onboarding doc <doc>...</doc>, what's the process for requesting time off?"

**After:**
```
<doc>
{{50_PAGE_ONBOARDING_DOC}}
</doc>

What's the process for requesting time off, according to the document above?
```

Putting the question after the long document, not before it, means the model reads the actual ask right before it has to answer — instead of holding the question in mind across 50 pages of unrelated material.

## 9. Positive framing

**Before:** "Don't write a generic, corporate-sounding response."

**After:** "Write in a direct, conversational tone — like a knowledgeable colleague explaining something, not a press release. Avoid corporate phrases like 'we value your business' or 'per our policy.'"

The prohibition alone ("don't sound corporate") leaves infinite room for a different kind of bad answer; naming the tone that's actually wanted narrows it to what's intended.

## 10. Buried lede

**Before:** "So we've been getting a lot of questions lately, and I was thinking it might be useful if, when a user asks about pricing, you could maybe also mention the annual discount, but only if they haven't already brought up cost as an objection, and try to keep it natural."

**After:** "When a user asks about pricing, mention the annual discount — unless they've already raised cost as an objection, in which case don't add another cost-related pitch. Keep the mention natural, not a hard sell."

The actual instruction (what to do when pricing comes up) was buried mid-paragraph behind throat-clearing ("so," "I was thinking," "it might be useful"); pulling it to the front makes it impossible to miss.

## 11. Scope for chaining

**Before:** A single prompt asking Claude to "research our top 3 competitors, write a positioning doc comparing us to them, and then critique your own positioning doc for weak claims" in one pass.

**After:** Three prompts run in sequence — (1) research and summarize each competitor's positioning, (2) draft the comparison doc from that research, (3) critique the draft for weak or unsupported claims — with each step's output feeding the next as a fresh, focused task.

Bolting research, drafting, and self-critique into one instruction pressures the model to rush all three; splitting them gives each step a clean, checkable output before the next one builds on it.

**When to skip this:** a task that's genuinely one coherent step (e.g. "translate this and format it as a table") shouldn't be artificially fragmented into a multi-step chain — that just adds overhead without a corresponding gain in output quality.

## 12. Conflicts and redundancy

**Before:** A system prompt that says in one paragraph "always ask clarifying questions before proceeding" and, three paragraphs later, "never ask the user questions — infer intent and proceed directly."

**After:** Pick the one that matches what the user actually wants (usually resolvable by re-reading surrounding context for which behavior the rest of the prompt assumes), state it once, and delete the contradictory instruction entirely rather than leaving both for the model to arbitrate at runtime.

Contradictory instructions don't average out to a sensible middle ground — they produce inconsistent behavior, because which instruction "wins" becomes effectively random across runs.
