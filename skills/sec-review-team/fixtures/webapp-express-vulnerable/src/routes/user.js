// DELIBERATELY VULNERABLE — sec-review-team fixture. Do not deploy.
const express = require('express');
const router = express.Router();

// VULN: XSS — user-provided name rendered via innerHTML in server-generated HTML
router.get('/profile', (req, res) => {
  const name = req.query.name;
  res.send(`<html><body><div id="p"></div><script>document.getElementById('p').innerHTML = '${name}';</script></body></html>`);
});

// VULN: open redirect — unvalidated redirect target
router.get('/redirect', (req, res) => {
  res.redirect(req.query.to);
});

// VULN: path traversal — unchecked user input reaches fs.readFile
const fs = require('fs');
router.get('/download', (req, res) => {
  const file = req.query.file;
  fs.readFile(`/var/uploads/${file}`, (err, data) => {
    if (err) return res.status(404).end();
    res.send(data);
  });
});

module.exports = router;
