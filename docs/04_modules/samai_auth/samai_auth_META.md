# Module: samai_auth

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `samai_auth` |
| **Version** | 1.0.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\samai_auth` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\samai_auth\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\samai_auth\` |
| **Online URL** | https://sme.ec/documentation/modules/samai-auth |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

samai_auth provides secure token-based auto-login for the SAM AI installer. It generates single-use authentication tokens that expire after 5 minutes, allowing the installer to create an authenticated session without requiring the user to manually log in. Tokens are stored in-memory (not database) and are automatically cleaned up when expired.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `web` - Web framework for session handling

### Python Libraries Required
- None additional (uses standard library: secrets, datetime, json)

---

## For End Users (What Can This Do For Me?)

- **Seamless installer login** - SAM AI installer can automatically log you in
- **Secure tokens** - Tokens are single-use and expire in 5 minutes
- **No stored credentials** - Tokens stored in-memory only, not in database

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Controller-only module |
| Controllers | 1 | 3 HTTP endpoints |
| Views | 0 | No UI |
| JS Files | 0 | None |
| Security Rules | 0 | Public endpoints with credential validation |

**Key Files:**
- `controllers/auth_controller.py` - Token generation and login endpoints

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: auto-login, installer authentication, token login
- User wants to: understand how SAM AI installer authenticates
- User mentions: samai_auth, authentication token, installer login

### Related Agents
- `/cto-developer` - For implementation changes

### Delegate To
- `/cto` - For security architecture decisions
- `/cto-developer` - For code changes

---

## Cross-References

### Related Documentation
- None specific (standalone utility module)

### Related Modules
- SAM AI Installer (external) - Uses these endpoints for auto-login

---

## Known Gotchas (Painfully Learned)

1. **In-memory token storage** - Tokens are stored in a class variable, not database. Server restart clears all tokens.

2. **5-minute expiration** - Tokens expire quickly for security. Installer must use token immediately.

3. **Single-use tokens** - Once a token is used, it's marked and cannot be reused. Even if login fails, token is consumed.

4. **Odoo 18 authentication** - Uses new credential dict format: `{'login': x, 'password': y, 'type': 'password'}` instead of separate parameters.

5. **CSRF disabled** - Endpoints have `csrf=False` to allow external callers (installer). Only safe because we validate credentials.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (1.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (0)
- [x] Controller count matches reality (1)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
