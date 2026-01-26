# Module: ts_debug_switch

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ts_debug_switch` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\ts_debug_switch` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\ts_debug_switch\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ts_debug_switch\` |
| **Online URL** | https://techvaria.com |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

Quick Debug Switch by Techvaria adds a toggle button to the Odoo systray that lets users instantly enable or disable Debug Mode (Developer Mode) without navigating through settings or modifying URLs. Green toggle-on icon when debug is active, gray toggle-off when inactive. Access controlled by security group.

---

## Dependencies

### Odoo Module Dependencies
- `web` - Odoo web framework

### Python Libraries Required
- None additional (pure JavaScript/OWL component)

---

## For End Users (What Can This Do For Me?)

- One-click toggle for Debug Mode in systray
- Visual indicator (green = on, gray = off)
- No more URL editing (?debug=1)
- No more navigating Settings > Developer Mode
- Security group controls who sees the toggle

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | No backend models |
| Controllers | 0 | None |
| Views | 0 | None |
| JS Files | 1 | OWL component for systray |
| Security Rules | 1 | group_debug_switch_access |

**Key Files:**
- `static/src/core/debug/debug_switch.js` - OWL component
- `static/src/core/debug/debug_switch.xml` - Component template
- `security/security.xml` - Security group definition

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: debug mode, developer mode toggle, systray button
- User wants to: quickly enable/disable debug mode
- User mentions: ts_debug_switch, quick debug, techvaria debug

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (third-party Techvaria module)

### Related Modules
- `debug_mode_toggle` - Similar functionality (different implementation)
- `web` - Odoo web framework

---

## Known Gotchas (Painfully Learned)

1. **Group Assignment** - Default assigns to base.group_user (all internal users)
2. **Page Reload** - Toggling debug mode forces a page reload
3. **Similar to debug_mode_toggle** - May conflict if both installed
4. **OPL-1 License** - Commercial license (proprietary)

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
