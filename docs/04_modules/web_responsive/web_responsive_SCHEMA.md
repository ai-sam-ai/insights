# Schema: web_responsive

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `web_responsive` |
| **Version** | 18.0.1.0.3 |
| **Total Models** | 2 (0 new, 2 inherit) |
| **Total Controllers** | 0 |
| **Frontend Components** | 15+ JS files |
| **Development Status** | Production/Stable |

---

## Models

### res.users (Inherited)

**Purpose:** User preferences for app menu search and theme

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `apps_menu_search_type` | Selection | Yes | canonical/fuse/command_palette |
| `apps_menu_theme` | Selection | Yes | milk/community |
| `is_redirect_home` | Boolean | No | Redirect to dashboard after login |

**Selection Options - Search Type:**
- `canonical` - Standard search
- `fuse` - Fuzzy search using Fuse.js
- `command_palette` - Command palette style search

**Selection Options - Theme:**
- `milk` - Milk theme (light)
- `community` - Community theme

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_redirect_home()` | Set is_redirect_home=False if action_id set | None |

---

### ir.http (Inherited)

**Purpose:** Add user preferences to session info

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `session_info()` | Add apps_menu config to session | dict |

**Session Info Addition:**
```python
{
    "apps_menu": {
        "search_type": user.apps_menu_search_type,
        "theme": user.apps_menu_theme,
    },
}
```

---

## Frontend Components

### Apps Menu Components

| Component Path | Purpose |
|----------------|---------|
| `components/apps_menu/*` | Fullscreen app menu |
| `components/apps_menu_item/*` | Individual menu items |
| `components/apps_menu_tools.esm.js` | Menu utilities |

### Search Components

| Component Path | Purpose |
|----------------|---------|
| `components/menu_canonical_searchbar/*` | Standard search |
| `components/menu_fuse_searchbar/*` | Fuzzy search with Fuse.js |
| `components/menu_odoo_searchbar/*` | Odoo-style search |
| `components/menu_searchbar/*` | Base searchbar |

### Other Components

| Component Path | Purpose |
|----------------|---------|
| `components/hotkey/*` | Keyboard shortcuts |
| `components/file_viewer/*` | Side-by-side document viewer |
| `components/chatter/*` | Chatter improvements |
| `components/control_panel/*` | Mobile control panel |
| `components/command_palette/*` | Command palette search |
| `views/form/*` | Form view enhancements |

---

## SCSS Styles

| File | Purpose |
|------|---------|
| `legacy/scss/primary_variable.scss` | CSS variable overrides |
| `legacy/scss/form_variable.scss` | Form-specific variables |
| `legacy/scss/web_responsive.scss` | Main responsive styles |
| `legacy/scss/big_boxes.scss` | Larger checkboxes |
| `legacy/scss/list_sticky_header.scss` | Sticky headers/footers |

---

## JavaScript Files

### Legacy JS

| File | Purpose |
|------|---------|
| `legacy/js/web_responsive.esm.js` | Core responsive behaviors |

### XML Templates

| File | Purpose |
|------|---------|
| `legacy/xml/form_buttons.xml` | Mobile form buttons |
| `legacy/xml/custom_favorite_item.xml` | Favorite menu customization |

### Libraries

| File | Purpose |
|------|---------|
| `lib/fuse/fuse.basic.min.js` | Fuzzy search library |

---

## Keyboard Shortcuts

Changed from standard Odoo to avoid Firefox conflicts:

| Action | Shortcut |
|--------|----------|
| Navigate apps | Arrow keys |
| Choose app | Enter |
| Close menu | Esc |
| Save | Alt + S |
| App access | Alt + Shift + [NUM] |

---

## Asset Bundles

### web._assets_primary_variables
- form_variable.scss
- primary_variable.scss

### web.assets_backend
- All component JS/SCSS/XML files
- Fuse.js library

### web.assets_clickbot
- clickbot.esm.js

### web.qunit_suite_tests
- apps_menu_tests.esm.js
- apps_menu_search_tests.esm.js

---

## Data Flow Diagram

```
┌─────────────────────────────────────┐
│           res.users                 │
│                                     │
│  apps_menu_search_type ─────────────┼──► Session Info
│  apps_menu_theme ───────────────────┼──► Session Info
│  is_redirect_home ──────────────────┼──► Login redirect logic
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│           ir.http                   │
│                                     │
│  session_info() adds:               │
│  - apps_menu.search_type            │
│  - apps_menu.theme                  │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│       Frontend Components           │
│                                     │
│  Read session.apps_menu config      │
│  Apply search type and theme        │
│  Render responsive interface        │
└─────────────────────────────────────┘
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `res_users` | `res.users` | Extended with app menu preferences |

---

## Translations

The module includes i18n folder with translations for:
- Menu labels
- Setting descriptions
- User-facing strings

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
