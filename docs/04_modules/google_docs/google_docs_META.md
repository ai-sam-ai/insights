# Module: google_docs

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `google_docs` |
| **Version** | 1.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\google_docs` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\google_docs\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\google_docs\` |
| **Online URL** | https://sme.ec/documentation/modules/google-docs |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

google_docs is a minimal Google OAuth integration module that provides configuration settings for connecting Odoo to Google's API. It stores Google OAuth client credentials and handles the authorization flow to obtain access/refresh tokens for Google Drive API access. This appears to be a foundation module for Google Docs/Drive integration features.

---

## Dependencies

### Odoo Module Dependencies
- `google_account` - Odoo's Google account integration base

### Python Libraries Required
- `requests` - HTTP requests (standard in Odoo)
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Configure Google OAuth credentials in Odoo Settings
- Authorize Odoo to access Google Drive on your behalf
- Foundation for Google Docs/Drive integrations
- Stores tokens securely in Odoo's config parameters

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | google.docs (new), res.config.settings (inherit) |
| Controllers | 0 | None |
| Views | 1 | Settings form extension |
| JS Files | 0 | None |
| Security Rules | 1 | Read-only access to google.docs |

**Key Files:**
- `models/google_docs.py` - Token management methods
- `models/res_config_settings.py` - Settings fields and auth flow
- `views/google_docs_settings_views.xml` - Settings UI in General Settings

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: Google Docs integration, Google Drive, OAuth setup
- User wants to: connect Odoo to Google, authorize Google access
- User mentions: google_docs module, Google credentials, Drive API

### Related Agents
- `/cto-developer` - For customization or bug fixes
- `/cto` - For integration architecture decisions

### Delegate To
- `/cto` - For architecture decisions about Google integrations
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (third-party module)

### Related Modules
- `google_account` - Required dependency - Odoo's Google OAuth base
- `google_calendar` - Similar Google integration (different service)

---

## Known Gotchas (Painfully Learned)

1. **Field Label Mismatch** - Fields are labeled "Google Ads Client ID" but used for Drive - confusing UI text
2. **Drive Scope** - Uses `https://www.googleapis.com/auth/drive` scope - full Drive access, not just Docs
3. **Minimal Functionality** - This is mostly a settings/auth module - actual Docs features not included
4. **Token Storage** - Tokens stored in ir.config_parameter - shared across company/users
5. **Old Tutorial Link** - Links to Odoo 13.0 documentation which may be outdated

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality
- [x] Controller count matches reality
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation | CTO Module Docs Agent |
