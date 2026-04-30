// DELIBERATELY VULNERABLE — sec-review-team fixture. Do not deploy.
module.exports = {
  // VULN: hardcoded JWT secret
  JWT_SECRET: 'admin123',

  // VULN: hardcoded API key
  STRIPE_API_KEY: 'sk_test_placeholder_not_real_but_looks_real',

  // VULN: weak session secret
  SESSION_SECRET: 'changeme',
};
