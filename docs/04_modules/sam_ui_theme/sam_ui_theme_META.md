# Module: sam_ui_theme

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ui_theme` |
| **Version** | 18.0.21.0.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\sam_ui_theme` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\sam_ui_theme\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ui_theme\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ui-theme |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

sam_ui_theme is the SAM AI branded backend theme for Odoo 18. It provides customizable colors (primary, secondary, accent), animated bling line on the app menu, modern UI styling, theme presets (SAM Default, Dark, Ocean, Forest, Sunset, Purple), typography options, and consolidated system overlays/modal styling. Settings are company-specific and stored in the database, with dynamic CSS generated at runtime.

---

## Dependencies

### Odoo Module Dependencies
- `web` - Odoo web framework
- `bus` - Long polling for real-time updates

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- **Brand your Odoo** - Match your company colors throughout the interface
- **Quick presets** - Choose from 6 beautiful theme presets instantly
- **Animated effects** - Eye-catching bling line on the app menu
- **Modern look** - Clean, professional styling on buttons, cards, and forms
- **Consistent modals** - All popups and dialogs have unified styling
- **Custom fonts** - Choose from Plus Jakarta Sans, DM Sans, Inter, or Roboto

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | sam.theme.settings, res.config.settings extension, ir.module extension |
| Controllers | 1 | 2 endpoints (dynamic CSS, settings JSON) |
| Views | 3 | Theme settings, webclient templates, login templates |
| JS Files | 6 | Theme loader, overlay system, components |
| SCSS Files | 4 | Primary variables, enhancements, card grid, apps menu |
| CSS Files | 4 | Brand variables, overlay base, system overlay, modal override |

**Key Files:**
- `models/sam_theme_settings.py` - Theme settings model and presets
- `controllers/main.py` - Dynamic CSS generation endpoint
- `static/src/scss/_primary_variables.scss` - SCSS variable overrides
- `static/src/js/sam_theme_loader.esm.js` - Client-side theme loader
- `static/src/js/overlays/system_overlay.js` - Loading overlay system

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: theme, colors, styling, branding, bling, navbar color
- User wants to: change colors, customize theme, apply preset, brand Odoo
- User mentions: sam_ui_theme, theme settings, primary color, bling line

### Related Agents
- `/sam_chat` - For UI polish related to chat (uses theme variables)
- `/cto-developer` - For implementation changes
- `/sam_core_chat` - For SAM's visual identity

### Delegate To
- `/cto-developer` - For CSS/SCSS modifications
- `/cto-architect` - For theme architecture decisions
- `/cmo` - For brand color recommendations

---

## Cross-References

### Related Documentation
- Consolidated from: `ai_sam_system_overlay` (overlays/modals now in this module)

### Related Modules
- `ai_sam` - Uses theme variables for chat interface
- `ai_sam_ui` - Uses theme styling for public chat widget
- `ai_sam_base` - Core module (styling consistency)

---

## Known Gotchas (Painfully Learned)

1. **Primary variables MUST load first** - The `_primary_variables.scss` uses `prepend` in assets to load before all other SCSS. If load order breaks, colors don't work.

2. **Dynamic CSS is cached** - The `/sam_ui_theme/dynamic.css` endpoint caches for 5 minutes. After changing settings, wait or hard-refresh to see changes.

3. **Company-specific settings** - Each company can have different theme settings. The `company_unique` constraint ensures only one setting per company.

4. **Bling line in apps menu only** - The animated gradient appears only when the fullscreen app menu overlay is open, not in the navbar.

5. **Login page styling separate** - Login page uses `web.assets_frontend` while backend uses `web.assets_backend`. Both need the theme loader.

6. **Modal sizing consolidated** - All modals/dialogs are styled to 90% width/height with 16px border-radius. This came from ai_sam_system_overlay consolidation.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.21.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (3)
- [x] Controller count matches reality (1)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
