const db = require('./db');
const crypto = require('crypto');

// VULNERABILITY: session-fixation-race — the session row is written to the DB before
// the user's active status is confirmed; a race between session creation and a concurrent
// account-deactivation leaves an orphaned authenticated session in the DB
async function createSession(userId) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  // session written BEFORE the active-check below completes
  await db.query(
    'INSERT INTO sessions (id, user_id, created_at) VALUES (?, ?, NOW())',
    [sessionId, userId]
  );
  const user = await db.query(
    'SELECT active FROM users WHERE id = ?',
    [userId]
  );
  if (!user || !user.active) {
    // deactivation can arrive between the INSERT above and this DELETE;
    // if the DELETE races and loses, the session row persists as authenticated
    await db.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
    throw new Error('User account is deactivated');
  }
  return sessionId;
}

module.exports = { createSession };
