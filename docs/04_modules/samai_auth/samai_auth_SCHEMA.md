# Schema: samai_auth

> **Technical Truth** - Controllers, API endpoints, and token flow

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `samai_auth` |
| **Version** | 1.0.0 |
| **Total Models** | 0 (controller-only module) |
| **Total Controllers** | 1 |
| **API Endpoints** | 3 |

---

## Models

This module has no database models. Tokens are stored in-memory in a class variable.

---

## Controllers / API Endpoints

### SAMAIAuthController

**File:** `controllers/auth_controller.py`

| Route | Method | Auth | Type | Purpose |
|-------|--------|------|------|---------|
| `/samai_auth/generate_token` | POST | public | HTTP | Generate single-use auth token |
| `/samai_auth/login` | GET | public | HTTP | Auto-login using token |
| `/samai_auth/verify_token` | POST | public | JSON | Check if token is valid (debug) |

---

## Endpoint Details

### POST /samai_auth/generate_token

Generates a single-use authentication token after validating credentials.

**Request:**
```json
{
    "db": "mydb",
    "login": "admin",
    "password": "admin123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "token": "xYz123abc...",
    "login_url": "https://odoo.example.com/samai_auth/login?token=xYz123abc...",
    "expires_in": 300
}
```

**Response (Error):**
```json
{
    "success": false,
    "error": "Invalid credentials"
}
```

---

### GET /samai_auth/login

Auto-login using a previously generated token. Redirects to Odoo web interface on success.

**Query Parameters:**
- `token` (required) - The authentication token

**Success:** Redirects to `/web?db={database}`

**Errors:** Redirects to `/web/login?error={error_type}`
- `missing_token` - No token provided
- `invalid_token` - Token not found
- `token_expired` - Token past 5-minute expiration
- `token_already_used` - Token was already consumed
- `session_creation_failed` - Authentication failed

---

### POST /samai_auth/verify_token (JSON-RPC)

Debug endpoint to check token validity without consuming it.

**Request:**
```json
{
    "token": "xYz123abc..."
}
```

**Response:**
```json
{
    "valid": true,
    "exists": true,
    "used": false,
    "expired": false,
    "expires_in": 245.5
}
```

---

## Token Data Structure

Tokens are stored in `SAMAIAuthController._tokens` dictionary:

```python
{
    "xYz123abc...": {
        "db": "mydb",
        "login": "admin",
        "password": "admin123",  # Note: stored in memory for re-auth
        "uid": 2,
        "created_at": datetime(2025, 1, 26, 10, 30, 0),
        "expires_at": datetime(2025, 1, 26, 10, 35, 0),
        "used": False
    }
}
```

---

## Token Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────┐
│              SAM AI Installer                                │
└─────────────────────┬───────────────────────────────────────┘
                      │ POST /samai_auth/generate_token
                      │ {db, login, password}
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SAMAIAuthController                             │
│                                                              │
│  1. Validate credentials via session.authenticate()         │
│  2. Generate secure token (secrets.token_urlsafe)           │
│  3. Store token in _tokens dict (5 min expiry)              │
│  4. Return token + login_url                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ token + login_url returned
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SAM AI Installer                                │
│                                                              │
│  Opens browser to login_url                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │ GET /samai_auth/login?token=xyz
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SAMAIAuthController                             │
│                                                              │
│  1. Look up token in _tokens                                 │
│  2. Check not expired, not used                              │
│  3. Mark token as used                                       │
│  4. Authenticate session                                     │
│  5. Delete token                                             │
│  6. Redirect to /web                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              User logged into Odoo                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Considerations

### Token Security
- **Cryptographically secure:** Uses `secrets.token_urlsafe(32)` (256-bit)
- **Short-lived:** 5-minute expiration window
- **Single-use:** Token marked used before authentication attempt
- **Memory-only:** No database persistence (cleared on server restart)

### Authentication Flow
- Credentials validated via Odoo's native `session.authenticate()`
- Password stored temporarily in token data for re-authentication
- Token deleted after use (success or failure)

### Endpoint Security
- `csrf=False` required for external callers (installer)
- Credentials required for token generation (not truly "public")
- Token validation prevents replay attacks

---

## File Structure

```
samai_auth/
├── __init__.py
├── __manifest__.py
└── controllers/
    ├── __init__.py
    └── auth_controller.py    # All endpoints
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
