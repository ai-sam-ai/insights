# Module: web_responsive

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `web_responsive` |
| **Version** | 18.0.1.0.3 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\web_responsive` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\web_responsive\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\web_responsive\` |
| **Online URL** | https://github.com/OCA/web/tree/18.0/web_responsive |
| **Status** | Production/Stable |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

Web Responsive is an OCA community module that adds comprehensive responsive design to Odoo's backend interface. Features include fullscreen app menu with search, sticky headers/footers in list views, sticky statusbar in forms, bigger checkboxes, mobile-optimized controls, improved keyboard shortcuts (Alt+Shift+NUM), and side-by-side document viewer with chatter. User preferences for search type (Canonical/Fuse/Command Palette) and theme (Milk/Community).

---

## Dependencies

### Odoo Module Dependencies
- `web` - Odoo web framework
- `web_tour` - Web tour functionality
- `mail` - Chatter/messaging

### Python Libraries Required
- None additional

### Excludes
- `web_enterprise` - Incompatible with Enterprise web client

---

## For End Users (What Can This Do For Me?)

- Fullscreen app menu with quick search
- Sticky headers and footers in list views
- Sticky statusbar in form views
- Bigger, easier-to-click checkboxes
- Mobile-friendly control panel with icons
- Better keyboard shortcuts (Alt+Shift+NUM)
- Side-by-side document viewer with chatter
- Color-coded composer (public vs internal message)
- Redirect to dashboard after login option
- Choose app menu search type and theme

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | res.users (inherit), ir.http (inherit) |
| Controllers | 0 | None |
| Views | 1 | res.users preferences |
| JS Files | 15+ | OWL components for menu, search, chatter, forms |
| SCSS Files | 4 | Responsive styles, variables |
| Tests | 2 | App menu tests |

**Key Files:**
- `models/res_users.py` - User preferences for search/theme
- `models/ir_http.py` - Session info extension
- `static/src/components/` - OWL components directory
- `static/src/legacy/scss/` - Responsive SCSS styles

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: responsive design, mobile Odoo, app menu search
- User wants to: improve mobile experience, change keyboard shortcuts
- User mentions: web_responsive, OCA responsive, fullscreen menu

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (OCA community module)

### Related Modules
- `web` - Core web framework
- `mail` - Chatter functionality
- `web_enterprise` - Incompatible, excluded

---

## Known Gotchas (Painfully Learned)

1. **Excludes web_enterprise** - Cannot be installed with Odoo Enterprise web module
2. **Keyboard Shortcuts Changed** - Uses Alt+Shift+NUM instead of Alt+NUM
3. **Fuse.js Included** - Bundles fuse.basic.min.js for fuzzy search
4. **User Preferences** - Each user can configure search type and theme
5. **is_redirect_home** - Computed from action_id, resets if home action is set
6. **Sequence 1** - Loads early in module sequence

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
