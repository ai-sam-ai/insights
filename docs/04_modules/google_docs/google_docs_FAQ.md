# FAQ: google_docs

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Google Docs Integration

### What is google_docs?

google_docs is a Tools module for Odoo that provides OAuth configuration for connecting Odoo to Google Drive/Docs APIs.

**Key facts:**
- Technical name: `google_docs`
- Current version: 1.0.0
- Author: Vuente
- Requires: Odoo 18+, google_account module
- License: LGPL-3

### What does google_docs do?

google_docs provides 2 capabilities:

1. **OAuth Configuration** - Settings UI for Google Client ID and Secret
2. **Authorization Flow** - One-click button to initiate Google OAuth and store tokens

### What does google_docs NOT do?

This module does NOT:
- Display Google Docs content in Odoo
- Automatically sync files
- Attach documents to records
- Create or edit Google documents

It is an authentication foundation only.

### Who is google_docs for?

google_docs is designed for:
- System admins setting up Google integrations
- Developers building Google API features
- Companies connecting Odoo to Google Workspace

---

## Installation & Setup

### How do I install google_docs?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "Google Docs"
4. Click Install
5. Go to Settings > General Settings > Integrations to configure

### What are the dependencies for google_docs?

google_docs requires this Odoo module:
- `google_account` - Odoo's built-in Google OAuth base

Python libraries required:
- `requests` (included in Odoo)

### How do I configure google_docs?

After installation:
1. Go to Google Cloud Console (console.cloud.google.com)
2. Create or select a project
3. Enable Google Drive API
4. Go to Credentials > Create OAuth 2.0 Client ID
5. Select "Web application"
6. Add your Odoo URL to authorized redirect URIs
7. Copy Client ID and Client Secret
8. In Odoo: Settings > General Settings > Integrations > Google Docs
9. Enter Client ID and Client Secret
10. Click "Authorize Google Docs"
11. Sign in with Google and grant access

---

## Usage

### How do I authorize Google access?

To authorize:
1. Go to Settings > General Settings
2. Scroll to Integrations section
3. Find "Google Docs" setting
4. Enter your Client ID and Client Secret
5. Click "Authorize Google Docs"
6. You'll be redirected to Google
7. Sign in and grant permission
8. You'll be redirected back to Odoo

### How do I know if authorization succeeded?

Currently the module doesn't show a clear success indicator. To verify:
1. Enable developer mode
2. Go to Settings > Technical > Parameters > System Parameters
3. Look for `google_docs_refresh_token`
4. If it exists and has a value, authorization succeeded

### Do I need to re-authorize?

Typically no. The refresh token allows Odoo to get new access tokens automatically. You may need to re-authorize if:
- You revoked access in Google Account settings
- The refresh token expired (rare)
- You changed Google credentials

---

## Troubleshooting

### Authorization fails or redirects to error

**Symptom:** After clicking authorize, you get an error from Google

**Cause:** Incorrect OAuth setup in Google Cloud Console

**Solution:**
1. Verify OAuth Client ID type is "Web application"
2. Add your exact Odoo URL to "Authorized redirect URIs"
3. Ensure Google Drive API is enabled for your project
4. Check that consent screen is configured

### "Access Denied" error from Google

**Symptom:** Google shows "Access Denied" after sign-in

**Cause:** OAuth app not verified or user not authorized

**Solution:**
1. For testing: Add your Google account as a test user in OAuth consent screen
2. For production: Submit app for Google verification
3. Ensure the signing-in user has appropriate Google account permissions

### Settings don't save

**Symptom:** Client ID/Secret disappear after saving

**Cause:** Permissions issue or configuration error

**Solution:**
1. Ensure you're logged in as admin
2. Check for JavaScript errors in browser console
3. Verify google_account module is properly installed

### Tutorial link goes to old documentation

**Symptom:** Help link shows Odoo 13.0 documentation

**Cause:** Hardcoded link to older Odoo version docs

**Solution:**
1. The general OAuth setup process is similar across versions
2. For current docs, search "Odoo Google integration" on Odoo's website

---

## Comparisons

### How does this compare to google_drive module?

| Feature | google_docs | google_drive |
|---------|-------------|--------------|
| OAuth config | Yes | Yes |
| Attach files to records | No | Yes |
| Template mapping | No | Yes |
| Primary purpose | Foundation auth | Full Drive integration |

### Why use this if google_drive exists?

This module may be:
- A simpler alternative for basic auth needs
- A foundation for custom Google integrations
- Used by other modules requiring Drive API access

---

## Integration

### Does google_docs work with other Google modules?

The tokens stored can potentially be used by other modules that need Google Drive API access. However, this depends on how those modules are implemented.

### Can I use the tokens for custom API calls?

Yes. Access the tokens from system parameters:
```python
access_token = self.env['ir.config_parameter'].get_param('google_docs_access_token')
refresh_token = self.env['ir.config_parameter'].get_param('google_docs_refresh_token')
```

Note: Access tokens expire. Use the refresh token to get new access tokens.

---

## Data & Privacy

### Where are my Google credentials stored?

Credentials and tokens are stored in `ir.config_parameter` (System Parameters):
- `google_docs_client_id`
- `google_docs_client_secret`
- `google_docs_access_token`
- `google_docs_refresh_token`

### Is my data sent to external servers?

- Client ID/Secret go to Google for OAuth
- Tokens are stored in your Odoo database
- No data is sent to the module author

### What Google permissions does this request?

The module requests `https://www.googleapis.com/auth/drive` scope, which grants:
- See, edit, create, and delete all of your Google Drive files
- This is full Drive access - be aware of the permissions you're granting

---

## Pricing & Licensing

### Is google_docs free?

Yes. This module is licensed under LGPL-3.

### Do I need to pay Google?

Google Drive API has usage quotas:
- Free tier is generous for most uses
- High-volume usage may require billing enabled
- Check Google Cloud Console for current quota limits

---

## Support

### Where can I get help with google_docs?

- **Author:** Vuente
- **For SAM AI deployments:** sam@sme.ec

### How do I report a bug?

Contact the module author or SAM AI support with:
- Odoo version
- Module version
- Steps to reproduce
- Error messages

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Field labeled "Google Ads" instead of "Docs" | Open | Cosmetic only, functionality works |
| Old tutorial link (v13.0) | Open | Search for current Odoo docs |
| No success indicator after auth | Open | Check system parameters manually |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Unknown | Initial release |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
