# Schema: ai_sam_system_overlay

> **DEPRECATED MODULE** - See `sam_ui_theme` for current schema

---

## Deprecation Notice

**This module is DEPRECATED.** All functionality has been moved to `sam_ui_theme` (v18.0.20.0.0+).

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_system_overlay` |
| **Version** | 18.0.1.7.0 |
| **Status** | **DEPRECATED** |
| **Replacement** | `sam_ui_theme` |

---

## Models

**None.** This module only provided frontend assets (JS/CSS) and XML templates.

---

## Controllers

**None.**

---

## Former Functionality (Now in sam_ui_theme)

| Component | Description | New Location |
|-----------|-------------|--------------|
| System Overlay JS | Full-screen loading overlay | `sam_ui_theme/static/src/js/overlays/system_overlay.js` |
| BlockUI Patch | Override for Odoo's BlockUI | `sam_ui_theme/static/src/js/overlays/block_ui_patch.js` |
| System Overlay CSS | Styling for overlays | `sam_ui_theme/static/src/css/sam_system_overlay.css` |
| Splash Screen | Bootstrap splash on page load | `sam_ui_theme/views/webclient_templates.xml` |
| ir.module.module Override | Module install UI enhancements | `sam_ui_theme/models/ir_module.py` |

---

## Migration

See `ai_sam_system_overlay_META.md` for migration instructions.

For current overlay schema, see: `docs/04_modules/sam_ui_theme/sam_ui_theme_SCHEMA.md`

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Deprecation schema created | CTO Module Documentor |
