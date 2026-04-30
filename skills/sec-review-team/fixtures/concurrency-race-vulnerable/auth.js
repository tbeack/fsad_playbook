const db = require('./db');

// VULNERABILITY: rate-limit-race — count is read then incremented in two separate statements;
// concurrent requests both observe count < MAX before either write, bypassing the limit
async function checkRateLimit(userId) {
  const row = await db.query('SELECT count FROM rate_limits WHERE user_id = ?', [userId]);
  const count = row ? row.count : 0;
  if (count >= 5) return false;
  // race window: another request reads the same count here before this UPDATE lands
  await db.query(
    'UPDATE rate_limits SET count = count + 1 WHERE user_id = ?',
    [userId]
  );
  return true;
}

// VULNERABILITY: toctou-auth-check — token is validated and user.active checked, then a session
// is written in a separate non-atomic step; a concurrent logout (deactivating the user) can
// invalidate the token between the SELECT and the INSERT, issuing a session to a deactivated account
async function login(token) {
  const user = await db.query(
    'SELECT id, active FROM users WHERE token = ? AND active = 1',
    [token]
  );
  if (!user) throw new Error('Invalid token');
  // gap: concurrent deactivation of this user lands here before the INSERT
  await db.query(
    'INSERT INTO sessions (user_id, created_at) VALUES (?, NOW())',
    [user.id]
  );
  return user.id;
}

module.exports = { checkRateLimit, login };
