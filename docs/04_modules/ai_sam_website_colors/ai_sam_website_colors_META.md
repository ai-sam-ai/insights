# Module: ai_sam_website_colors

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_website_colors` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\ai_sam_website_colors` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\ai_sam_website_colors\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_website_colors\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-website-colors |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_website_colors is a simple theme module that sets SAM AI Blue (#4A90FF) as the default website primary color instead of Odoo's default purple. It registers SCSS files to override Odoo's color variables using the proper asset bundle system. No models, no controllers - just CSS variables.

---

## Dependencies

### Odoo Module Dependencies
- `website` - Website builder

### Python Libraries Required
- None

---

## For End Users (What Can This Do For Me?)

- **SAM AI Blue branding** - Primary color #4A90FF replaces Odoo purple automatically
- **Consistent color palette** - Five coordinated colors (Alpha through Epsilon)
- **Zero configuration** - Install and colors are applied

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | No models |
| Controllers | 0 | No controllers |
| Data Files | 1 | ir_asset.xml (asset registration) |
| SCSS Files | 2 | primary_variables.scss, secondary_variables.scss |

**Key Files:**
- `data/ir_asset.xml` - Registers SCSS files into Odoo asset bundles
- `static/src/scss/primary_variables.scss` - Primary color palette
- `static/src/scss/secondary_variables.scss` - Secondary utilities

---

## Color Palette

| Name | Variable | Hex | RGB | Purpose |
|------|----------|-----|-----|---------|
| Alpha | Primary | #4A90FF | 74, 144, 255 | SAM AI Blue |
| Beta | Secondary | #2D5AA0 | - | Deep Blue |
| Gamma | Accent | #6BB3FF | - | Light Blue |
| Delta | Neutral | #4A5568 | - | Slate Gray |
| Epsilon | Dark | #1A365D | - | Navy |

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: website colors, brand colors, SAM AI blue, theme colors
- User wants to: change primary color, understand color palette
- User mentions: purple removal, blue theme, #4A90FF

### Delegate To
- `/cto-developer` - For color palette changes

---

## Cross-References

### Related Modules
- `website` - Base website (depends on)
- `ai_sam_e_learning` - Uses same color scheme

---

## Known Gotchas (Painfully Learned)

1. **Asset bundle order matters** - Files are appended to bundles; Odoo's defaults load first, then our overrides

2. **Cache clearing required** - After changes, clear assets cache and browser cache

3. **No UI configuration** - Colors are hardcoded in SCSS; to change, edit the files directly

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
