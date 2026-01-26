# Schema: sam_ui_theme

> **Technical Truth** - Models, controllers, and theme architecture

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ui_theme` |
| **Version** | 18.0.21.0.0 |
| **Total Models** | 3 (1 regular, 2 extensions) |
| **Total Controllers** | 1 |
| **API Endpoints** | 2 |

---

## Models

### sam.theme.settings (Theme Settings)

**Purpose:** Store company-specific theme customization settings.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `company_id` | Many2one | Yes | Current company | Link to res.company |
| `active` | Boolean | No | True | Active flag |
| `primary_color` | Char | No | #4A90E2 | Main brand color |
| `secondary_color` | Char | No | #F4C430 | Accent/gold color |
| `accent_color` | Char | No | #FF5AC4 | Third accent color |
| `navbar_bg_color` | Char | No | #4A90E2 | Navbar background |
| `navbar_text_color` | Char | No | #FFFFFF | Navbar text color |
| `bling_color_1` | Char | No | #4A90E2 | Bling gradient color 1 |
| `bling_color_2` | Char | No | #F4C430 | Bling gradient color 2 |
| `bling_color_3` | Char | No | #FF5AC4 | Bling gradient color 3 |
| `bling_enabled` | Boolean | No | True | Show bling line |
| `font_display` | Selection | No | plus_jakarta | Heading font |
| `font_body` | Selection | No | dm_sans | Body text font |
| `button_radius` | Selection | No | 8 | Button corner radius |
| `card_radius` | Selection | No | 16 | Card corner radius |
| `card_side_color` | Char | No | #F4C430 | Kanban card left border |
| `theme_preset` | Selection | No | sam_default | Quick theme preset |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_theme_settings()` | Get settings for current company | Dict of settings |
| `_onchange_theme_preset()` | Apply preset colors when changed | None |

**SQL Constraints:**
- `company_unique` - One theme setting per company

---

### Theme Presets

| Preset | Primary | Secondary | Accent | Navbar |
|--------|---------|-----------|--------|--------|
| `sam_default` | #4A90E2 | #F4C430 | #FF5AC4 | #4A90E2 |
| `sam_dark` | #2D3748 | #F4C430 | #A25DDC | #1A202C |
| `sam_ocean` | #0077B6 | #00B4D8 | #90E0EF | #0077B6 |
| `sam_forest` | #2D6A4F | #52B788 | #95D5B2 | #1B4332 |
| `sam_sunset` | #E85D04 | #FAA307 | #FFBA08 | #D00000 |
| `sam_purple` | #7B2CBF | #E0AAFF | #C77DFF | #5A189A |

---

### Font Options

| Key | Display Name | CSS Family |
|-----|--------------|------------|
| `plus_jakarta` | Plus Jakarta Sans | 'Plus Jakarta Sans', system fonts... |
| `dm_sans` | DM Sans | 'DM Sans', system fonts... |
| `inter` | Inter | 'Inter', system fonts... |
| `roboto` | Roboto | 'Roboto', system fonts... |
| `system` | System Default | -apple-system, BlinkMacSystemFont... |

---

## Controllers / API Endpoints

### SamThemeController

**File:** `controllers/main.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ui_theme/dynamic.css` | HTTP GET | public | Generate dynamic CSS from settings |
| `/sam_ui_theme/settings` | JSON-RPC | user | Return theme settings as JSON |

### GET /sam_ui_theme/dynamic.css

Generates CSS with all theme variables based on current settings.

**Response Headers:**
- `Content-Type: text/css`
- `Cache-Control: public, max-age=300` (5 minute cache)

**Response:** Complete CSS file with:
- CSS custom properties (`:root` variables)
- Navbar styling
- Bling line styling
- Button styling
- Typography
- Card/panel styling
- Link colors
- Login page styling

### POST /sam_ui_theme/settings (JSON-RPC)

Returns current theme settings for JavaScript use.

**Response:**
```json
{
    "primary_color": "#4A90E2",
    "secondary_color": "#F4C430",
    "accent_color": "#FF5AC4",
    "navbar_bg_color": "#4A90E2",
    "navbar_text_color": "#FFFFFF",
    "bling_color_1": "#4A90E2",
    "bling_color_2": "#F4C430",
    "bling_color_3": "#FF5AC4",
    "bling_enabled": true,
    "font_display": "plus_jakarta",
    "font_body": "dm_sans",
    "button_radius": "8",
    "card_radius": "16",
    "card_side_color": "#F4C430"
}
```

---

## CSS Architecture

### CSS Variable Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  sam_brand_variables.css (Static defaults)                   │
│  - Defines base CSS custom properties                        │
│  - Loaded FIRST in both frontend and backend                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  _primary_variables.scss (SCSS variables)                    │
│  - Uses "prepend" to load BEFORE other SCSS                  │
│  - Sets $o-brand-* variables                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  dynamic.css (Runtime generated)                             │
│  - Fetched from /sam_ui_theme/dynamic.css                    │
│  - Overrides :root variables with user settings              │
│  - Loaded by sam_theme_loader.esm.js                         │
└─────────────────────────────────────────────────────────────┘
```

### Key CSS Variables

| Variable | Default | Used For |
|----------|---------|----------|
| `--sam-blue-primary` | #4A90E2 | Primary brand color |
| `--sam-gold-sparkle` | #F4C430 | Secondary/gold color |
| `--sam-primary` | #4A90E2 | Legacy alias |
| `--sam-secondary` | #F4C430 | Legacy alias |
| `--sam-accent` | #FF5AC4 | Third color |
| `--sam-navbar-bg` | #4A90E2 | Navbar background |
| `--sam-navbar-text` | #FFFFFF | Navbar text |
| `--sam-bling-1/2/3` | varies | Bling gradient colors |
| `--sam-button-radius` | 8px | Button corners |
| `--sam-card-radius` | 16px | Card corners |
| `--sam-card-side-color` | #F4C430 | Kanban left border |

---

## JavaScript Components

### Theme Loader

**File:** `static/src/js/sam_theme_loader.esm.js`

**Purpose:** Dynamically load theme CSS from `/sam_ui_theme/dynamic.css`

**Behavior:**
1. On page load, creates `<link>` element
2. Points to `/sam_ui_theme/dynamic.css`
3. Appends to document head
4. CSS overrides take effect

### System Overlay

**File:** `static/src/js/overlays/system_overlay.js`

**Purpose:** Provides loading overlay during module upgrades and asset recompilation.

**Global:** `window.SamSystemOverlay`

### BlockUI Patch

**File:** `static/src/js/overlays/block_ui_patch.js`

**Purpose:** Patches Odoo's BlockUI to use SAM styling.

### Dialog Patch

**File:** `static/src/js/overlays/dialog_patch.js`

**Purpose:** Enhances modal/dialog styling for consistency.

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `sam.theme.settings` | base.group_system | ✅ | ✅ | ✅ | ✅ |
| `sam.theme.settings` | base.group_user | ✅ | ❌ | ❌ | ❌ |

**Note:** All users can read theme settings (needed for display), only admins can modify.

---

## Asset Load Order

### web.assets_backend

```
1. sam_brand_variables.css      ← Static CSS variables
2. sam_overlay_base.css         ← Shared overlay sizing
3. sam_system_overlay.css       ← Loading overlay styles
4. sam_modal_override.css       ← Dialog styling
5. sam_card_grid.scss           ← Card grid layout
6. sam_enhancements.scss        ← General enhancements
7. sam_apps_menu.scss           ← App menu overlay
8. XML templates
9. JS components
10. sam_theme_loader.esm.js     ← Fetches dynamic.css
11. Overlay JS files
```

### web._assets_primary_variables

```
1. _primary_variables.scss (prepend) ← MUST be first
```

---

## File Structure

```
sam_ui_theme/
├── __init__.py
├── __manifest__.py
├── controllers/
│   ├── __init__.py
│   └── main.py                        # Dynamic CSS endpoint
├── models/
│   ├── __init__.py
│   ├── ir_module.py                   # Module extension
│   ├── res_config_settings.py         # Settings integration
│   └── sam_theme_settings.py          # Main settings model
├── security/
│   └── ir.model.access.csv
├── static/
│   ├── description/
│   │   └── icon.png
│   └── src/
│       ├── components/
│       │   ├── apps_menu/
│       │   │   ├── sam_apps_menu.esm.js
│       │   │   ├── sam_apps_menu.scss
│       │   │   └── sam_apps_menu.xml
│       │   ├── apps_menu_item/
│       │   │   ├── sam_apps_menu_item.esm.js
│       │   │   └── sam_apps_menu_item.xml
│       │   └── sam_components_registry.esm.js
│       ├── css/
│       │   ├── sam_brand_variables.css
│       │   ├── sam_login.css
│       │   ├── sam_modal_override.css
│       │   ├── sam_overlay_base.css
│       │   └── sam_system_overlay.css
│       ├── js/
│       │   ├── overlays/
│       │   │   ├── block_ui_patch.js
│       │   │   ├── dialog_patch.js
│       │   │   └── system_overlay.js
│       │   ├── sam_theme_loader.esm.js
│       │   └── sam_theme_loader_frontend.js
│       └── scss/
│           ├── _primary_variables.scss
│           ├── sam_card_grid.scss
│           └── sam_enhancements.scss
└── views/
    ├── login_templates.xml
    ├── sam_theme_settings_views.xml
    └── webclient_templates.xml
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
