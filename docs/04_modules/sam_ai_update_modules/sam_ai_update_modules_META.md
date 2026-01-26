# Module: sam_ai_update_modules

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_update_modules` |
| **Version** | 18.0.1.8 |
| **Source Path** | `D:\github_repos\21_samai_docker_container\101-samai-docker\samai-modules\01_user_experience\sam_ai_update_modules` |
| **Manifest** | (see source path)/__manifest__.py |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_update_modules\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-update-modules |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

sam_ai_update_modules provides a **batch module upgrade queue** for Odoo 18. Configure up to 20 modules, click "Activate Upgrade", and all modules upgrade in a single server restart with a beautiful gold-star progress overlay. No more upgrading modules one-by-one. Queue it, run it, done.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `web`
- `sam_ui_theme` - For consistent overlay styling

### Python Libraries Required
- None additional

---

## For End Users (What Can This Do For Me?)

- **Batch upgrades** - Queue up to 20 modules and upgrade them all at once
- **One-click activation** - Click "Activate Upgrade" and walk away
- **Beautiful progress UI** - Gold star overlay shows upgrade status
- **Survives restarts** - Queue state persists via localStorage and database
- **Auto-reset** - After completion, queue resets for next cycle
- **No more one-by-one** - Stop clicking "Upgrade" on each module individually

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 1 | `sam.upgrade.queue` |
| Controllers | 0 | Uses JSON-RPC for status |
| Views | 2 | Queue list, menus |
| JS Files | 3 | Early load, overlay, action handler |
| CSS Files | 1 | Overlay styling |
| Security Rules | 1 | Admin only |

**Key Files:**
- `models/sam_upgrade_queue.py` - Queue model and upgrade logic
- `static/src/js/upgrade_overlay.js` - Full-screen progress overlay
- `static/src/js/upgrade_early_load.js` - Dark background on page load (prevents flash)
- `static/src/js/upgrade_action.js` - Action handler integration

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: batch upgrade, upgrade queue, module updates, one-click upgrade
- User wants to: upgrade multiple modules, batch update, queue modules for upgrade
- User mentions: upgrade overlay, gold star, upgrade all modules

### Related Agents
- `/docker` - For container upgrades
- `/cto-developer` - For implementation work

### Delegate To
- `/cto` - For architecture decisions about upgrade processes
- `/sam_ui_theme` agent - For overlay styling questions

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/` (module upgrade flow)

### Related Modules
- `sam_ui_theme` - Provides base overlay styling
- `sam_ai_odoo_modules` - Installs modules that can then be queued for upgrade
- `base` - Core Odoo module system

---

## Known Gotchas (Painfully Learned)

1. **Admin only** - Only users with `base.group_system` can manage the queue
2. **post_load hook** - Module uses `post_load_hook` for early initialization
3. **localStorage persistence** - Overlay state stored in browser localStorage
4. **Registry reload in Odoo 18** - `button_immediate_upgrade()` does in-process reload (no server restart)
5. **Auto-reset** - Queue auto-resets to pending after 5 seconds (for next upgrade cycle)
6. **Commit before restart** - State is committed before triggering upgrade to ensure persistence

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (1 model)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation | CTO Module Documentor |
