-- DELIBERATELY VULNERABLE fixture. Do not deploy.
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS notes (
  id    TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body  TEXT NOT NULL
);
