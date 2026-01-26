# SAM AI Authentication

## One-Click Login for the SAM AI Installer

---

### The Problem You Know Too Well

The SAM AI installer needs to configure your Odoo instance. To do that, it needs to log in. But asking users to copy-paste session cookies or manually enter credentials into multiple prompts creates friction and security concerns.

**Installation should be seamless, not a security headache.**

---

### What If the Installer Could Just Log In?

Imagine the installer verifying your credentials once, then automatically opening your browser with a secure, single-use login link. No cookies to copy. No passwords transmitted in URLs. Just a cryptographically secure token that expires in 5 minutes.

**That's SAM AI Authentication.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Single-Use Tokens** | Each token works exactly once - no replay attacks |
| **5-Minute Expiry** | Tokens expire quickly, minimizing security window |
| **Memory-Only Storage** | No tokens saved to database - server restart clears all |
| **Seamless UX** | User clicks link → logged in → done |
| **Secure Generation** | 256-bit cryptographic tokens via Python secrets |

---

### How It Works (The Simple Version)

1. **Installer sends credentials** - POST to generate_token endpoint
2. **Server validates and generates token** - Returns secure login URL
3. **User clicks the link** - Browser opens with token parameter
4. **Auto-login completes** - Token consumed, session created, redirect to Odoo

**That's it.** The user just sees "Click to continue" and they're in.

---

### Who Is This For?

**SAM AI Authentication is for:**

- SAM AI Installer (the primary consumer)
- Automated deployment scripts needing Odoo session
- Any external tool requiring secure auto-login

**This probably isn't for you if:**

- You need persistent API tokens (use Odoo API keys instead)
- You want user-facing authentication (this is installer-focused)

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+ (uses new credential dict format)
- **Python:** 3.10+
- **Dependencies:** base, web
- **Token Generation:** `secrets.token_urlsafe(32)` (256-bit)
- **Expiration:** 5 minutes from generation
- **Storage:** In-memory class variable (not database)
- **Documentation:** [Full technical docs](samai_auth_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: What happens if the token expires?**
A: User is redirected to `/web/login?error=token_expired`. They need a new token from the installer.

**Q: Are passwords stored in the database?**
A: No. Passwords are only held in-memory for the 5-minute token lifetime, then discarded when token is deleted.

**Q: Can I use this for regular user login?**
A: Technically yes, but it's designed for automated/installer use. For human users, the standard login page is more appropriate.

---

*SAM AI Authentication - Part of SAM AI by SME.ec*
*Version 1.0.0 | Odoo 18 Compatible*
