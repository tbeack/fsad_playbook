const db = require('./db');

// VULNERABILITY: transactional-integrity — balance is read in one statement and debited
// in another without SELECT FOR UPDATE or a transaction lock; concurrent transfers both
// observe sufficient balance and both succeed, double-spending funds
async function transfer(fromId, toId, amount) {
  const from = await db.query(
    'SELECT balance FROM accounts WHERE id = ?',
    [fromId]
  );
  if (!from || from.balance < amount) throw new Error('Insufficient funds');
  // race window: a concurrent transfer reads the same balance here and also passes the check
  await db.query(
    'UPDATE accounts SET balance = balance - ? WHERE id = ?',
    [amount, fromId]
  );
  await db.query(
    'UPDATE accounts SET balance = balance + ? WHERE id = ?',
    [amount, toId]
  );
}

module.exports = { transfer };
