# Module: samai_business_manager

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `samai_business_manager` |
| **Version** | 18.0.4.0.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\samai_business_manager` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\samai_business_manager\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\samai_business_manager\` |
| **Online URL** | https://sme.ec/documentation/modules/samai-business-manager |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

samai_business_manager is the foundation module for SAM AI's Business Unit navigation system. It provides "3 Clicks to Workplace" navigation philosophy: click Business Unit → see department dashboard → take action. Features include Business Unit models with visibility control, menu claiming/reorganization via ir.ui.menu, System Builder wizard for enabling/disabling units, and a centralized Platform Detection Service for cross-platform compatibility across Docker, Windows, Linux, and macOS.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `web` - Web framework for OWL components

### Python Libraries Required
- None additional (uses standard library: subprocess, pathlib, shutil, platform)

---

## For End Users (What Can This Do For Me?)

- **Organize your business** - Group related apps (Sales, Accounting, HR) into logical Business Units
- **Simplify navigation** - Only see the apps relevant to your department, no clutter
- **One-click dashboards** - Each Business Unit has its own command center with quick actions
- **System Builder** - Admins can enable/disable Business Units with a simple wizard
- **Custom menus** - Create specialized contact views (Leads, Customers) per Business Unit

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 5 | Business Unit, Menu, Custom Menu, Contact Variant, ir.ui.menu extension |
| Wizards | 1 | System Builder for enabling/disabling units |
| Controllers | 0 | No HTTP endpoints |
| Views | 8 | Business Unit, Menu, Dashboard, System Builder |
| Security Rules | 11 | User (read-only) and Admin (full) per model |
| OWL Components | 1 | business_unit_selector widget |

**Key Files:**
- `models/business_unit.py` - Core Business Unit model with is_enabled visibility
- `models/business_unit_menu.py` - Menu claiming and reorganization
- `models/custom_menu.py` - Custom Menu containers and Contact Variants
- `models/ir_ui_menu.py` - _load_menus_blacklist() override for visibility filtering
- `wizard/system_builder.py` - Enable/disable Business Units wizard
- `utils/platform_service.py` - Cross-platform detection utility (Docker, Windows, Linux, macOS)

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: Business Units, menu organization, navigation, department setup
- User wants to: organize menus, enable/disable features, set up departments
- User mentions: System Builder, menu visibility, "3 clicks to workplace"
- Technical queries about: platform detection, cross-platform compatibility, service restart

### Related Agents
- `/cto-developer` - For implementing fixes to this module
- `/docker-debug` - For platform detection issues in Docker
- `/cto-architect` - For Business Unit architecture decisions

### Delegate To
- `/cto` - For strategic decisions about Business Unit organization
- `/cto-developer` - For bug fixes or enhancements
- `/docker` - For Docker-specific platform service issues

---

## Cross-References

### Related Documentation
- Uses: None (foundational module)
- Used by: `ai_sam_cache_manager` (imports platform_service)

### Related Modules
- `ai_sam_cache_manager` - Uses platform_service for cross-platform cache clearing
- `ai_sam_base` - Core SAM AI infrastructure

---

## Known Gotchas (Painfully Learned)

1. **Menu blacklist override** - Uses `_load_menus_blacklist()` standard Odoo extension point. If menus still appear after disabling a Business Unit, check if another module is overriding this method without calling super().

2. **post_init_hook required** - Module uses post_init_hook to set up initial Business Units. If fresh install shows no units, check hook execution logs.

3. **Platform service imports** - Other modules should import lazily: `from odoo.addons.samai_business_manager.utils import platform_service`. Importing at module level can cause circular imports.

4. **v4.0 consolidation** - Previously split across samai_business_manager and samai_business_management. All functionality is now in this single module. Remove old samai_business_management if present.

5. **Sequence=1 importance** - This module has sequence=1 to load before other SAM AI modules. Changing this can break menu organization.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.4.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (5 models + 1 wizard)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
