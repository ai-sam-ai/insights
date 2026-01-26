# Schema: debug_mode_toggle

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `debug_mode_toggle` |
| **Version** | 18.0 |
| **Total Models** | 0 (pure frontend module) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

This module has no models. It is a pure frontend JavaScript/CSS module.

---

## Frontend Components

### JavaScript: NavBar Patch

**File:** `static/src/js/custom.js`

**Purpose:** Patches the Odoo NavBar component to add debug toggle functionality

**Patch Details:**

```javascript
patch(NavBar.prototype, {
    setup() { ... },
    toggleDebugMode() { ... },
    get debugIcon() { ... },
    get debugIconClass() { ... }
})
```

| Property/Method | Type | Purpose |
|-----------------|------|---------|
| `toggleDebugMode()` | Method | Toggles ?debug=1 URL parameter and reloads page |
| `debugIcon` | Getter | Returns 'fa-toggle-on' or 'fa-toggle-off' based on current state |
| `debugIconClass` | Getter | Returns full CSS class string for the icon |

**Toggle Logic:**
```javascript
toggleDebugMode() {
    const url = new URL(window.location.href);
    if (url.searchParams.get('debug') === '1') {
        url.searchParams.delete('debug');
    } else {
        url.searchParams.set('debug', '1');
    }
    window.location.href = url.toString();
}
```

### XML Template: Systray Icon

**File:** `static/src/xml/base.xml`
**Template:** `web.NavBarCustom`
**Inherits:** `web.NavBar`

**Changes:**
- Replaces the systray menu div
- Adds clickable icon before systray items
- Icon uses Font Awesome toggle classes

```xml
<i t-att-class="debugIconClass"
   t-on-click="toggleDebugMode"
   style="cursor: pointer;"/>
```

### CSS Styling

**File:** `static/src/css/app.css`

| Class | Purpose |
|-------|---------|
| `.o_debug_mode.o_debug_on` | Green color (#28a745) when debug active |
| `.o_debug_mode.o_debug_off` | White color (#ffffff) when debug inactive |

**Note:** There's a mismatch between CSS classes (`.o_debug_mode`) and JS classes (`.debug-on`/`.debug-off`). The actual styling may not apply correctly.

---

## Asset Registration

**In manifest (web.assets_backend):**
```python
'assets': {
    'web.assets_backend': [
        'toggle_developer_mode/static/src/css/app.css',
        'toggle_developer_mode/static/src/js/custom.js',
        'toggle_developer_mode/static/src/xml/base.xml',
    ],
},
```

**Note:** Asset paths reference `toggle_developer_mode` but folder is `debug_mode_toggle`.

---

## URL Parameter Behavior

| URL State | Debug Mode | Icon |
|-----------|------------|------|
| No debug param | Off | fa-toggle-off |
| `?debug=1` | On | fa-toggle-on |
| `?debug=assets` | Treated as off* | fa-toggle-off |

*The code specifically checks for `debug=1`, not other debug modes.

---

## Controllers / API Endpoints

This module has no controllers or API endpoints.

---

## Security Rules

No security rules - pure frontend functionality. Any user who can access the web client can see and use the toggle.

---

## Database Tables

No database tables - no data stored.

---

## Integration Points

| Odoo Component | How It's Modified |
|----------------|-------------------|
| NavBar | Patched with toggle methods |
| Systray area | Icon added before other systray items |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
