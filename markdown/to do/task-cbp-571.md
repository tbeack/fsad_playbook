# CBP-571 — Add send-now key binding to Keyboard Shortcuts table (v2.1.275)

**Source:** Claude Code v2.1.275
**Tag:** [Claude]

## Summary
v2.1.275 adds a send-now key (`ctrl+enter`, or `ctrl+x ctrl+s`) that interrupts the current turn and sends all queued messages at once; sent and queued messages show in gray until the model receives them.

## Assessment
The Keyboard Shortcuts table (`src/pages/practices.html`) documents every send/interrupt-related key (Enter, Esc, Esc Esc). This new binding belongs right after the `Enter` row since it's an alternate send behavior.

## Plan
1. Open `src/pages/practices.html`
2. Insert a new row directly after the `Enter` row, before the `Esc` row
3. Row content: `Ctrl+Enter` / `Ctrl+X` `Ctrl+S` — send-now: interrupts the current turn and sends all queued messages at once; sent and queued messages show in gray until Claude receives them (v2.1.275)
4. Mark CBP-571 complete in `markdown/to do/todo.md`

## Acceptance Criteria
- Keyboard Shortcuts table includes the send-now binding
- Build passes without errors
