# Schema: ai_sam_website_management

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_website_management` |
| **Version** | 18.0.1.2.0 |
| **Total Models** | 1 (transient, inherited) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### website.page.properties (Inherited Transient)

**Purpose:** Expose header_visible and footer_visible fields in Page Properties dialog

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `header_visible` | Boolean | No | Show/hide header on this page (related to target_model_id.header_visible) |
| `footer_visible` | Boolean | No | Show/hide footer on this page (related to target_model_id.footer_visible) |

**Note:** These fields already exist on `website.page`. This model just exposes them in the Page Properties wizard UI.

---

## JavaScript Patch

### website_custom_menus_patch.js

**Purpose:** Fix "Cannot read properties of undefined (reading metadata)" error

**Problem:** `websiteCustomMenus.addCustomMenus()` assumes `website.currentWebsite` always exists, but it can be undefined in backend context (outside website editor).

**Solution:** Add null checks before accessing `currentWebsite.metadata`.

**Location:** web.assets_backend bundle

---

## Views

### website_page_views.xml

Extends the Page Properties form to include:
- "Show Header" checkbox
- "Show Footer" checkbox

### snippets.xml

Any snippet-related view extensions.

---

## Files

| Path | Purpose |
|------|---------|
| `models/website_page_properties.py` | Expose header/footer fields |
| `views/website_page_views.xml` | UI for header/footer toggle |
| `views/snippets.xml` | Snippet extensions |
| `static/src/services/website_custom_menus_patch.js` | Backend JS fix |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
