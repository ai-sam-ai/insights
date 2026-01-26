# Module: debug_mode_toggle

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `debug_mode_toggle` (folder: toggle_developer_mode) |
| **Version** | 18.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\debug_mode_toggle` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\debug_mode_toggle\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\debug_mode_toggle\` |
| **Online URL** | https://sme.ec/documentation/modules/debug-mode-toggle |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

debug_mode_toggle adds a clickable toggle icon to the Odoo navbar (top-right systray area) that enables or disables developer/debug mode with a single click. No more navigating to Settings or manually editing URLs - just click the toggle icon and the page refreshes with debug mode on or off.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo base
- `web` - Odoo web client

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Toggle debug mode with one click from any screen
- Visual indicator shows current debug state (green = on, white = off)
- No need to remember URL parameters or find Settings menu
- Works on desktop and mobile browsers
- Saves time for developers and functional consultants

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Pure frontend module |
| Controllers | 0 | None |
| Views | 1 | XML template extension |
| JS Files | 2 | custom.js (main), debug_mode_js.js |
| CSS Files | 1 | app.css for styling |

**Key Files:**
- `static/src/js/custom.js` - NavBar patch with toggle logic
- `static/src/xml/base.xml` - Systray icon template
- `static/src/css/app.css` - Toggle icon styling

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: debug mode, developer mode, debug toggle, enable debug
- User wants to: quickly enable developer mode, toggle debug mode
- User mentions: debug icon, systray debug, one-click debug

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Similar Module: `ts_debug_switch` (different implementation, same purpose)

### Related Modules
- `web` - Core web client this extends
- `ts_debug_switch` - Alternative debug toggle module (Techvaria)

---

## Known Gotchas (Painfully Learned)

1. **Technical Name Mismatch** - Folder is `debug_mode_toggle` but manifest references `toggle_developer_mode` in asset paths
2. **CSS Class Mismatch** - CSS uses `.o_debug_mode` classes but JS uses `.debug-on`/`.debug-off` - potential styling issues
3. **Page Refresh** - Toggling debug mode causes full page reload (by design, but may lose unsaved work)
4. **Similar Module Exists** - `ts_debug_switch` does the same thing - don't install both

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
