# CBP-613: Update `permissions.blockReadsOutsideWorkingDirectories` bullet — new "ask again next time" prompt answer (v2.1.284)

## Summary

v2.1.284 added a "Yes, but ask again next time" answer to auto mode's prompt before a read outside the working directories, so you can allow that one read and still be asked about later ones.

## Assessment

- `src/pages/practices.html`'s Notable settings.json Keys list has a `permissions.blockReadsOutsideWorkingDirectories` bullet (~line 626) documenting the v2.1.257 one-time prompt this new answer refines. Append the v2.1.284 change to the same bullet rather than adding a new one, since it's a direct refinement of the same prompt.

## Plan

1. In `src/pages/practices.html`, append to the end of the `permissions.blockReadsOutsideWorkingDirectories` bullet (~line 626):
   ` As of v2.1.284, the prompt also offers a "Yes, but ask again next time" answer — allow this one read while still being asked about later reads outside the working directories, instead of only a durable "Yes" or "No."`

## Acceptance Criteria

- The `permissions.blockReadsOutsideWorkingDirectories` bullet documents the new "ask again next time" answer, version-tagged v2.1.284.
