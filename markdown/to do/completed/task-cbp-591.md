# CBP-591 — Update voice conversations: now on by default (rust-v0.156.0)

## Summary

In rust-v0.156.0, Codex voice conversations are enabled by default. Users no longer need `/experimental` to enable them. New additions: F8 toggle key, `/voice settings` picker to choose a voice, and bundled audio runtimes for Linux and Windows.

## Assessment

Two locations in `src/pages/codex.html` need updating:

1. **Cheat Sheet `/voice` row (line 1006):** Currently says "Start an experimental voice conversation ... enable first via `/experimental`". Must remove the experimental qualifier and update to reflect: available by default, F8 toggle, `/voice settings` for voice picker.

2. **Voice Conversations collapsible (lines 1193–1201):** Currently opens with "Codex supports **experimental voice conversations** — enable the feature with `/experimental`". Must update to: voice is on by default, describe F8 toggle, `/voice settings` picker, and note the bundled Linux/Windows audio runtimes.

## Plan

### Edit 1 — Cheat Sheet `/voice` row (line 1006)

Replace:
```
Start an experimental voice conversation with live transcripts and microphone controls; enable first via <code>/experimental</code> (rust-v0.155.0)
```
With:
```
Start a voice conversation with live transcripts and microphone controls. Voice is enabled by default as of rust-v0.156.0 — no opt-in needed. Press <kbd>F8</kbd> to toggle the microphone, or use <code>/voice settings</code> to pick a different voice. Bundled audio runtimes are included for Linux and Windows.
```

### Edit 2 — Voice Conversations collapsible (lines 1193–1201)

Replace the `<p>` opening and the code block:
```
As of rust-v0.155.0, Codex supports <strong>experimental voice conversations</strong> — enable the feature with <code>/experimental</code>, then start one with <code>/voice</code>. Voice sessions show a live, on-screen transcript as you speak, with a mute shortcut and a recording-activity indicator in the composer. Available on supported builds.
```
With:
```
As of rust-v0.156.0, voice conversations are <strong>enabled by default</strong> — no opt-in or <code>/experimental</code> flag needed. Start a voice session with <code>/voice</code> and see a live transcript as you speak. Press <kbd>F8</kbd> to toggle the microphone. Use <code>/voice settings</code> to choose your preferred voice. Bundled audio runtimes are included for Linux and Windows.
```

Also update the code block to remove the `/experimental` step:
Replace:
```
<span class="cm"># Turn on the experimental voice feature</span>
/experimental

<span class="cm"># Start a voice conversation</span>
/voice
```
With:
```
<span class="cm"># Start a voice conversation (enabled by default)</span>
/voice

<span class="cm"># Choose a voice</span>
/voice settings
```

And update the footer note to remove "Early-stage feature":
Replace:
```
Early-stage feature — expect the controls and transcript styling to keep evolving across releases.
```
With:
```
Press <kbd>F8</kbd> from any session to toggle voice without opening a new session.
```

## Acceptance Criteria

- The `/voice` cheat sheet row no longer says "experimental" or "enable first via /experimental".
- The Voice Conversations collapsible no longer says "experimental voice conversations".
- F8 toggle and `/voice settings` are documented.
- Linux/Windows bundled runtime note is present.
