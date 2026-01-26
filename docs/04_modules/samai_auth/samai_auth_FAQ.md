# FAQ: samai_auth

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Authentication

### What is samai_auth?

samai_auth is an authentication utility module for Odoo 18 that provides secure token-based auto-login for the SAM AI installer. It generates single-use tokens that allow automated login without exposing credentials.

**Key facts:**
- Technical name: `samai_auth`
- Current version: 1.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does samai_auth do?

samai_auth provides 3 main capabilities:

1. **Token Generation** - Creates cryptographically secure, single-use login tokens
2. **Auto-Login** - Authenticates users via token URL without manual login
3. **Token Verification** - Debug endpoint to check token validity

### Who is samai_auth for?

samai_auth is designed for:
- SAM AI Installer (primary use case)
- Automated deployment tools
- Any system needing programmatic Odoo login

---

## Installation & Setup

### How do I install samai_auth?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "samai_auth" or "SAM AI Authentication"
4. Click Install
5. No configuration needed - endpoints are immediately available

### What are the dependencies for samai_auth?

samai_auth requires these Odoo modules:
- `base` - Odoo core
- `web` - Session handling

Python libraries required:
- None additional (uses standard library)

---

## Usage

### How do I generate an authentication token?

To generate a token, POST to the generate_token endpoint:

```bash
curl -X POST https://your-odoo.com/samai_auth/generate_token \
  -H "Content-Type: application/json" \
  -d '{"db": "mydb", "login": "admin", "password": "secret"}'
```

Response:
```json
{
    "success": true,
    "token": "abc123...",
    "login_url": "https://your-odoo.com/samai_auth/login?token=abc123...",
    "expires_in": 300
}
```

### How do I use the token to log in?

Simply open the `login_url` in a browser. The user will be automatically logged in and redirected to `/web`.

### How long is a token valid?

Tokens are valid for 5 minutes (300 seconds) from generation. After that, they expire and cannot be used.

### Can a token be used more than once?

No. Tokens are single-use. Once consumed (even if login fails), the token cannot be reused. A new token must be generated.

---

## Troubleshooting

### Why is my token showing "invalid_token"?

**Symptom:** Redirect to `/web/login?error=invalid_token`

**Causes:**
1. Token was never generated (typo in URL)
2. Token already used
3. Server restarted (clears all tokens)

**Solution:** Generate a new token from the installer.

### Why is my token showing "token_expired"?

**Symptom:** Redirect to `/web/login?error=token_expired`

**Cause:** More than 5 minutes passed since token generation

**Solution:** Generate a new token and use it immediately.

### Why is authentication failing?

**Symptom:** `session_creation_failed` error

**Causes:**
1. Incorrect credentials in token generation
2. User account locked or disabled
3. Database connection issue

**Solution:**
1. Verify credentials work via normal login
2. Check Odoo logs for authentication errors
3. Ensure database is accessible

### Tokens disappear after server restart

**Expected behavior.** Tokens are stored in-memory only. Server restart clears all pending tokens. Generate new tokens after restart.

---

## Security

### Are passwords stored in the database?

No. Passwords are stored in-memory only, as part of the token data structure. When the token is deleted (after use or expiration), the password is discarded.

### Is this secure for production use?

Yes, with caveats:
- **Secure:** Tokens are cryptographically strong (256-bit)
- **Secure:** Tokens expire in 5 minutes
- **Secure:** Single-use prevents replay attacks
- **Consider:** CSRF is disabled on endpoints (required for external callers)
- **Consider:** Password stored briefly in memory

### Can someone intercept the token?

If using HTTPS (recommended), the token is encrypted in transit. If using HTTP, the token could be intercepted. Always use HTTPS in production.

### Why is CSRF disabled on the endpoints?

CSRF protection is disabled (`csrf=False`) because:
1. Endpoints are called by external tools (installer)
2. External tools can't provide Odoo CSRF tokens
3. Security is maintained by credential validation

---

## Comparisons

### How does samai_auth compare to Odoo API keys?

| Feature | samai_auth | Odoo API Keys |
|---------|-----------|---------------|
| Purpose | One-time auto-login | Persistent API access |
| Lifetime | 5 minutes | Until revoked |
| Use Count | Single-use | Unlimited |
| Creates Session | Yes | No (API only) |
| Storage | Memory | Database |

### Why not use session cookies directly?

Session cookies are:
- Tied to browser/client
- Difficult to generate programmatically
- May require complex cookie handling

samai_auth tokens are:
- Simple URL parameter
- Easy to generate and use
- Work across clients

---

## Integration

### Can I use samai_auth from Python?

Yes:

```python
import requests

# Generate token
response = requests.post(
    'https://your-odoo.com/samai_auth/generate_token',
    json={'db': 'mydb', 'login': 'admin', 'password': 'secret'}
)
data = response.json()

if data['success']:
    print(f"Login URL: {data['login_url']}")
```

### Can I use samai_auth from JavaScript?

Yes:

```javascript
const response = await fetch('/samai_auth/generate_token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({db: 'mydb', login: 'admin', password: 'secret'})
});
const data = await response.json();

if (data.success) {
    window.location.href = data.login_url;
}
```

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Tokens lost on server restart | By Design | Regenerate tokens after restart |
| No database persistence | By Design | Use in memory for security |
| 5-minute expiry too short | By Design | Regenerate if expired |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01 | Initial release for SAM AI installer |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
