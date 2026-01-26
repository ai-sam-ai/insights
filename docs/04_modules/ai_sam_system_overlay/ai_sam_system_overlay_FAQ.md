# FAQ: ai_sam_system_overlay

> **DEPRECATED MODULE** - Answers redirect to sam_ui_theme

---

## About This Module

### What is ai_sam_system_overlay?

ai_sam_system_overlay **WAS** a module that provided system-wide overlays for SAM AI. It is now **DEPRECATED** - all functionality has been moved to `sam_ui_theme`.

**Key facts:**
- Technical name: `ai_sam_system_overlay`
- Version: 18.0.1.7.0
- Status: **DEPRECATED**
- Replacement: `sam_ui_theme` (v18.0.20.0.0+)

### Should I install ai_sam_system_overlay?

**No.** Install `sam_ui_theme` instead. This module only exists for migration purposes.

---

## Migration

### How do I migrate away from ai_sam_system_overlay?

1. Go to Apps
2. Find and uninstall `ai_sam_system_overlay`
3. Ensure `sam_ui_theme` is installed and at v18.0.20.0.0+
4. Upgrade `sam_ui_theme` if needed
5. Remove `ai_sam_system_overlay` folder from your addons path

### What happens to my overlays after migration?

Nothing changes visually. The same overlays will appear, just loaded from `sam_ui_theme` instead.

### Will my existing customizations break?

If you extended `ai_sam_system_overlay`:
- Update your module dependency to `sam_ui_theme`
- Update any file paths to point to the new locations in `sam_ui_theme`

---

## Support

### Where can I get help?

For questions about overlays, see the `sam_ui_theme` documentation.

For migration issues:
- **Email:** sam@sme.ec

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Module appears in Apps list | By design | Safe to ignore or uninstall |

---

*Last updated: 2025-01-26*
*This module is deprecated - use sam_ui_theme instead*
