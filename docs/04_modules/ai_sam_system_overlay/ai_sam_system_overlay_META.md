# Module: ai_sam_system_overlay

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## DEPRECATION NOTICE

**This module is DEPRECATED as of v18.0.20.0.0 of `sam_ui_theme`.**

All functionality has been moved to `sam_ui_theme`. Do NOT install this module on new systems.

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_system_overlay` |
| **Version** | 18.0.1.7.0 |
| **Source Path** | `D:\github_repos\21_samai_docker_container\101-samai-docker\samai-modules\01_user_experience\ai_sam_system_overlay` |
| **Manifest** | (see source path)/__manifest__.py |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_system_overlay\` |
| **Status** | **DEPRECATED** |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_system_overlay **WAS** the module that provided system-wide overlays (splash screen, BlockUI patch, loading indicators) for SAM AI. **All this functionality has been consolidated into `sam_ui_theme` (v18.0.20.0.0+).**

This module now exists only as a migration stub that depends on `sam_ui_theme` to ensure smooth upgrades.

---

## Migration Path

### Where The Code Went

| Old Location (ai_sam_system_overlay) | New Location (sam_ui_theme) |
|--------------------------------------|-----------------------------|
| Bootstrap splash screen | `sam_ui_theme/views/webclient_templates.xml` |
| System overlay JS | `sam_ui_theme/static/src/js/overlays/system_overlay.js` |
| BlockUI patch | `sam_ui_theme/static/src/js/overlays/block_ui_patch.js` |
| System overlay CSS | `sam_ui_theme/static/src/css/sam_system_overlay.css` |
| ir.module.module override | `sam_ui_theme/models/ir_module.py` |

### Migration Steps

1. Uninstall `ai_sam_system_overlay`
2. Upgrade `sam_ui_theme` to v18.0.20.0.0+
3. Delete this module from your addons path

---

## Dependencies

### Odoo Module Dependencies
- `sam_ui_theme` - The module that now contains all the functionality

### Python Libraries Required
- None

---

## For End Users

**Do not use this module.** Use `sam_ui_theme` instead.

---

## For Developers

**Do not extend or depend on this module.** It will be removed in a future release.

If you have code that depends on `ai_sam_system_overlay`:
1. Update your dependency to `sam_ui_theme`
2. Update any imports/references to point to the new locations

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: system overlay, splash screen, BlockUI
- **REDIRECT TO:** `sam_ui_theme` documentation

### Delegate To
- All questions about overlays → `sam_ui_theme` docs

---

## Cross-References

### Related Modules
- `sam_ui_theme` - **The replacement module** - all overlay functionality is now here

---

## Known Gotchas

1. **Do not install** - This module is deprecated
2. **Migration required** - If you have it installed, uninstall and use sam_ui_theme
3. **Will be removed** - Future releases will delete this module entirely

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Deprecation status documented
- [x] Migration path documented
- [x] Cross-reference to replacement module

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Deprecation documentation created | CTO Module Documentor |
| 2025-XX-XX | Module deprecated, functionality moved to sam_ui_theme | SAM AI Team |
