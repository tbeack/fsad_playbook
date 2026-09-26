# CBP-605: Update `--system-prompt-file`/`--append-system-prompt-file` rows — combinable with text forms (v2.1.283)

## Summary

v2.1.283 changed `--system-prompt`/`--append-system-prompt` to accept their text and `-file` forms together in the same invocation, instead of being mutually exclusive: the file's text is used first, followed by the command-line text.

## Assessment

- `src/pages/practices.html` already has a "System prompt & config" table (~line 2074) documenting `--system-prompt-file` and `--append-system-prompt-file` (added in CBP-600, v2.1.281). This is a direct behavior refinement of those same flags, so the existing rows are the right place for the update rather than a new row.

## Plan

1. In `src/pages/practices.html`, append a clause to the `--system-prompt-file <path>` row (~line 2081):

```
As of v2.1.283, can be combined with `--system-prompt` in the same invocation: the file's text comes first, followed by the command-line text.
```

2. Append the equivalent clause to the `--append-system-prompt-file <path>` row (~line 2082), referencing `--append-system-prompt` instead.

## Acceptance Criteria

- Both file-based system-prompt flag rows note that they can now be combined with their text-based counterparts, version-tagged v2.1.283.
