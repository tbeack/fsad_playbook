// DELIBERATELY VULNERABLE — sec-review-team fixture. Do not deploy.
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',           // VULN: hardcoded DB password
  database: 'app'
});

// VULN: missing auth middleware on /admin — anyone can list all users
app.get('/admin/users', (req, res) => {
  db.query('SELECT id, email, ssn FROM users', (err, rows) => {
    if (err) return res.status(500).send(err.message);  // VULN: leaks DB error to client
    res.json(rows);
  });
});

// VULN: SQL injection via string interpolation
app.get('/users/search', (req, res) => {
  const q = req.query.q;
  db.query(`SELECT * FROM users WHERE name LIKE '%${q}%'`, (err, rows) => {
    res.json(rows);
  });
});

// VULN: weak JWT verification — uses HS256 with hardcoded secret from config
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).end();
  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (e) {
    // VULN: swallowed error — any invalid token allows anonymous access
    next();
  }
}

app.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000);
