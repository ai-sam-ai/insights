# Module: ai_sam_website_management

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_website_management` |
| **Version** | 18.0.1.2.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\ai_sam_website_management` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\ai_sam_website_management\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_website_management\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-website-management |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_website_management provides fixes and enhancements for Odoo's website management. Main feature: exposes per-page header/footer visibility controls in the Page Properties dialog. Also patches a JavaScript bug in websiteCustomMenus service that caused "Cannot read properties of undefined" errors in backend context.

---

## Dependencies

### Odoo Module Dependencies
- `website` - Website builder

### Python Libraries Required
- None

---

## For End Users (What Can This Do For Me?)

- **Per-page header control** - Hide the header on specific pages only (not site-wide)
- **Per-page footer control** - Hide the footer on specific pages only
- **Bug fix** - Prevents JavaScript errors when accessing navbar dropdowns in backend

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 1 | website.page.properties (inherit/transient) |
| Controllers | 0 | No controllers |
| Views | 2 | website_page_views.xml, snippets.xml |
| JS Files | 1 | website_custom_menus_patch.js |

**Key Files:**
- `models/website_page_properties.py` - Exposes header_visible/footer_visible in Page Properties
- `static/src/services/website_custom_menus_patch.js` - Null check fix for backend context

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: hide header, hide footer, page properties, per-page settings
- User wants to: remove header from landing page, hide navigation on specific page
- User mentions: header_visible, footer_visible, page properties bug

### Delegate To
- `/cto-developer` - For additional website fixes

---

## Cross-References

### Related Modules
- `website` - Base website (depends on)
- `ai_sam_funnels` - Funnel pages often need hidden headers

---

## Known Gotchas (Painfully Learned)

1. **Fields already exist** - header_visible and footer_visible exist on website.page but weren't exposed in the UI. This module just surfaces them.

2. **Backend JS context** - The patch fixes issues when website.currentWebsite is undefined in backend (non-website editor) context.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Quick summary accurately describes module

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
