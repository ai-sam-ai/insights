# Google Docs Integration

## Connect Odoo to Google - The First Step

---

### The Problem You Know Too Well

You want Odoo to work with Google Drive. Maybe you need to attach Google Docs to records, or sync files, or use Drive storage. But before any of that can happen, you need OAuth credentials configured. And that setup? It's scattered, confusing, and easy to get wrong.

**You need a clean starting point.**

---

### What This Module Does

This is a foundation module. It doesn't give you flashy Google Docs features yet - it gives you the connection. Configure your Google OAuth credentials in one place, authorize once, and you're ready for Google integrations.

**Think of it as plugging in the cable before turning on the TV.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Centralized Settings** | OAuth credentials in General Settings |
| **One-Click Auth** | Button to start Google authorization |
| **Secure Storage** | Tokens stored safely in Odoo |
| **Drive API Ready** | Full Google Drive scope enabled |

---

### How It Works (The Simple Version)

1. **Get credentials** - Create OAuth app in Google Cloud Console
2. **Enter in Odoo** - Settings > General Settings > Integrations > Google Docs
3. **Click Authorize** - Sign in with Google, grant access
4. **Done** - Odoo can now talk to Google Drive

**That's the connection established.** Future modules can use these tokens.

---

### Real Results

| Before | After |
|--------|-------|
| Manual token management | Automatic token storage |
| Multiple config locations | One settings page |
| Complex OAuth setup | Click a button |

---

### Who Is This For?

**Google Docs Integration is for:**

- Admins setting up Google Drive integration
- Developers building on Google APIs
- Companies wanting Odoo-Google connectivity

**This probably isn't for you if:**

- You want end-user Google Docs features (this is just auth setup)
- You don't use Google Workspace
- You need immediate document editing features

---

### What This Module Does NOT Do

To be clear:
- Does NOT display Google Docs in Odoo
- Does NOT sync files automatically
- Does NOT attach documents to records
- Does NOT create/edit documents

This is the **authentication foundation**. Features come from modules that build on this.

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** Odoo 18 compatible
- **Author:** Vuente
- **Dependencies:** google_account (Odoo core)
- **License:** LGPL-3
- **OAuth Scope:** https://www.googleapis.com/auth/drive (full Drive access)
- **Documentation:** [Full technical docs](google_docs_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Where do I get Client ID and Secret?**
A: Google Cloud Console > APIs & Services > Credentials > Create OAuth Client ID

**Q: What Google APIs does this enable?**
A: Google Drive API (full access scope)

**Q: Can I use this for Google Sheets/Slides?**
A: The Drive scope allows access to all Drive content including Sheets and Slides

---

### Setup Guide

1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a project (or select existing)
3. Enable Google Drive API
4. Create OAuth 2.0 credentials
5. Copy Client ID and Secret to Odoo Settings
6. Click Authorize and sign in with Google

---

*Google Docs Integration - A Vuente Module*
*Version 1.0.0 | Odoo 18 Compatible*
