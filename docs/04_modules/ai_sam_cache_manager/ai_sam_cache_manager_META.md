# Module: ai_sam_cache_manager

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_cache_manager` |
| **Version** | 18.0.3.1 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\ai_sam_cache_manager` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\ai_sam_cache_manager\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_cache_manager\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-cache-manager |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_cache_manager is a cross-platform developer utility that provides comprehensive cache clearing across ALL 9 Odoo cache layers plus Python process cleanup, log clearing, and automatic service restart. It auto-detects the hosting environment (Docker, Windows, Linux, macOS) and uses platform-appropriate methods for cache clearing and service management. Features a real-time progress UI showing exactly what's being cleared.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `web` - Web framework (for JS actions and UI)
- `samai_business_manager` - Platform service utilities (lazy-loaded)

### Python Libraries Required
- None additional (uses base Odoo libraries: shutil, pathlib, subprocess)

---

## For End Users (What Can This Do For Me?)

- **Instant cache clearing** - One click clears ALL cache layers (no more manual hunting)
- **CSS/JS not updating?** - This fixes it by clearing database asset cache
- **Module upgrade not working?** - Clears manifest LRU cache that blocks version updates
- **Works everywhere** - Auto-detects Docker, Windows, Linux - no configuration needed
- **Safe restart** - Properly stops processes before restarting to prevent stale cache issues

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Controller-only module |
| Controllers | 1 | 2 JSON endpoints |
| Views | 1 | Menu action only |
| JS Files | 1 | OWL component with Dialog |
| Security Rules | 0 | Admin-only via code check |

**Key Files:**
- `controllers/cache_manager_controller.py` - Main clearing logic and platform detection
- `static/src/js/clear_cache_action.js` - OWL UI with progress dialog
- `static/src/xml/clear_cache_template.xml` - QWeb templates for dialog
- `data/system_parameters.xml` - Default config parameters

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: cache, clearing cache, CSS not updating, JS not working, module upgrade stuck
- User wants to: clear cache, restart Odoo, fix asset issues, resolve version mismatch
- User mentions: stale cache, old version showing, styles not applying, cache manager

### Related Agents
- `/cto-developer` - For implementing fixes to this module
- `/docker-debug` - For cache issues in Docker environments
- `/session-start` - Often recommends cache clear after upgrades

### Delegate To
- `/cto` - For architecture decisions about cache strategies
- `/cto-developer` - For bug fixes or enhancements
- `/docker` - For Docker-specific cache path issues

---

## Cross-References

### Related Documentation
- Parent Module: `docs/04_modules/samai_business_manager/` (provides platform_service)

### Related Modules
- `samai_business_manager` - Provides `platform_service` for cross-platform detection
- `ai_sam_base` - Core infrastructure (often cleared together)

---

## Known Gotchas (Painfully Learned)

1. **Lazy import of platform_service** - platform_service is imported lazily to avoid circular import errors during module loading. If samai_business_manager isn't upgraded, fallback methods are used.

2. **Service restart timing** - The restart is scheduled with a 3-second delay to allow the HTTP response to return before the server stops. Users see success message before disconnect.

3. **Windows PowerShell execution** - On Windows, uses detached PowerShell process for service restart. Requires PowerShell execution policy to allow scripts.

4. **Docker supervisor vs container restart** - In Docker, if supervisor isn't available, the module returns a message asking for manual container restart.

5. **Manifest LRU cache is critical** - The `_get_manifest_cached` cache MUST be cleared for module version updates to take effect. Many developers miss this.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.3.1)
- [x] Dependencies list is current
- [x] Model count matches reality (0)
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
