# Schema: google_docs

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `google_docs` |
| **Version** | 1.0.0 |
| **Total Models** | 2 (1 new, 1 inherit) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### google.docs (New Model)

**Purpose:** Stores Google OAuth token management methods

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (none) | - | - | Model has no stored fields |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `set_all_tokens(authorization_code)` | Exchanges auth code for tokens and stores them | None |
| `need_authorize()` | Checks if refresh token exists | Boolean |

**Method Details:**

#### set_all_tokens(authorization_code)
```python
@api.model
def set_all_tokens(self, authorization_code):
    all_token = self.env['google.service']._get_google_token_json(authorization_code, 'docs')
    self.env['ir.config_parameter'].set_param('google_docs_refresh_token', all_token.get('refresh_token'))
    self.env['ir.config_parameter'].set_param('google_docs_access_token', all_token.get('access_token'))
```
- Uses `google.service` from `google_account` module
- Stores tokens in system parameters

#### need_authorize()
```python
@api.model
def need_authorize(self):
    return self.env['ir.config_parameter'].get_param('google_docs_refresh_token') is False
```
- Returns True if no refresh token exists (needs auth)

---

### res.config.settings (Inherited)

**Purpose:** Adds Google Docs configuration fields to General Settings

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `google_docs_client_id` | Char | No | Google OAuth Client ID |
| `google_docs_client_secret` | Char | No | Google OAuth Client Secret |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `google_docs_authorize()` | Initiates OAuth flow | ir.actions.act_url |
| `set_values()` | Saves credentials to config params | None |
| `get_values()` | Loads credentials from config params | dict |

**Method Details:**

#### google_docs_authorize()
```python
def google_docs_authorize(self):
    return_url = request.httprequest.host_url + "web"
    url = self.env['google.service']._get_authorize_uri(
        return_url, 'docs',
        scope='https://www.googleapis.com/auth/drive'
    )
    return {'type': 'ir.actions.act_url', 'url': url, 'target': 'self'}
```
- Redirects user to Google OAuth consent screen
- Uses full Drive scope (not just Docs)

---

## Configuration Parameters

Stored in `ir.config_parameter`:

| Key | Purpose |
|-----|---------|
| `google_docs_client_id` | OAuth Client ID from Google Cloud Console |
| `google_docs_client_secret` | OAuth Client Secret |
| `google_docs_refresh_token` | Long-lived token for offline access |
| `google_docs_access_token` | Short-lived token for API calls |

---

## Controllers / API Endpoints

This module has no controllers. OAuth callback is handled by `google_account` module.

---

## View Modifications

### res.config.settings Form

**Inherits:** `base.res_config_settings_view_form`

**Location:** Inside "Integrations" block

**Adds:**
- "Google Docs" setting section with:
  - Client ID field
  - Client Secret field (password masked)
  - "Authorize Google Docs" button
  - Link to tutorial documentation

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `google.docs` | (everyone) | Yes | No | No | No |

**Note:** Model is read-only for all users. Configuration is done via res.config.settings which has its own access controls (typically admin only).

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│     res.config.settings         │
│                                 │
│  - google_docs_client_id        │
│  - google_docs_client_secret    │
│                                 │
│  google_docs_authorize()        │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│       google.service            │
│    (from google_account)        │
│                                 │
│  _get_authorize_uri()           │
│  _get_google_token_json()       │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│      ir.config_parameter        │
│                                 │
│  google_docs_client_id          │
│  google_docs_client_secret      │
│  google_docs_refresh_token      │
│  google_docs_access_token       │
└─────────────────────────────────┘
```

---

## OAuth Flow

1. Admin enters Client ID/Secret in Settings > General Settings > Integrations
2. Admin clicks "Authorize Google Docs"
3. User redirected to Google OAuth consent screen
4. User grants access to Google Drive
5. Google redirects back with authorization code
6. `set_all_tokens()` exchanges code for access/refresh tokens
7. Tokens stored in ir.config_parameter for future API calls

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `google_docs` | `google.docs` | Empty table (model has no fields) |
| `ir_config_parameter` | `ir.config_parameter` | Stores OAuth credentials and tokens |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
