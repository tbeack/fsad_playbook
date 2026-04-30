const express = require('express');
const app = express();

// VULNERABILITY: CORS wildcard with credentials allowed — any origin can make credentialed requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// VULNERABILITY: no Content-Security-Policy header set anywhere in this app
// VULNERABILITY: no X-Frame-Options header set anywhere in this app

app.post('/login', (req, res) => {
  // VULNERABILITY: session cookie has httpOnly: false and secure: false; no SameSite
  res.cookie('session', 'tok123', { httpOnly: false, secure: false });
  res.json({ ok: true });
});

app.listen(3000);
