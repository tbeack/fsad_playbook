// VULNERABILITY: pii-in-analytics-payload — full email address and real name sent to
// Segment without pseudonymisation or hashing; violates GDPR Art. 25 data-minimisation
// and exposes PII to third-party analytics vendor without explicit lawful basis logged
function trackLogin(user) {
  window.analytics.identify(user.id, {
    email: user.email,        // PII: email address — should be hashed or omitted
    name: user.fullName,      // PII: full name
    plan: user.plan,
  });
  window.analytics.track('User Logged In', {
    userId: user.id,
    email: user.email,        // PII repeated in event payload
    timestamp: new Date().toISOString(),
  });
}

// VULNERABILITY: client-storage-pii — email, full name, and auth token stored in
// localStorage; any script on the page (including third-party analytics) can read them,
// and they persist indefinitely with no expiry
function persistSession(user, token) {
  localStorage.setItem('user_email', user.email);
  localStorage.setItem('user_name', user.fullName);
  localStorage.setItem('auth_token', token);
}

function getSession() {
  return {
    email: localStorage.getItem('user_email'),
    name: localStorage.getItem('user_name'),
    token: localStorage.getItem('auth_token'),
  };
}
