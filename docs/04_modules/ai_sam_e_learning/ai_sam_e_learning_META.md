# Module: ai_sam_e_learning

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_e_learning` |
| **Version** | 18.0.1.1.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\ai_sam_e_learning` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\ai_sam_e_learning\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_e_learning\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-e-learning |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_e_learning enhances Odoo's eLearning module (website_slides) with SAM AI customizations. It provides settings for fullscreen mode control, custom header colors, full-width layouts, and menu categories that create custom filtered course URLs like `/learn/sam-docs`. This module is for branding and UX improvements to Odoo eLearning, not a standalone LMS.

---

## Dependencies

### Odoo Module Dependencies
- `website_slides` - Odoo's native eLearning module (required)
- `website` - Website builder integration

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- **Disable fullscreen auto-launch** - Stay in sidebar view when clicking lessons instead of forced fullscreen
- **Custom header colors** - Replace Odoo purple with SAM AI blue or any custom color
- **Menu categories** - Create custom filtered views like `/learn/sam-docs` with specific tags/courses
- **Full-width layouts** - Use full browser width instead of default container width

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | res.config.settings (inherit), elearning.menu.category (new) |
| Controllers | 0 | Uses website_slides controllers |
| Views | 3 | Settings view, menu category view, template overrides |
| JS Files | 1 | slides_disable_fullscreen.js |
| Security Rules | 2 | ir.model.access.csv for menu.category (user read-only, manager full access) |

**Key Files:**
- `models/res_config_settings.py` - eLearning settings (fullscreen, colors, categories)
- `models/elearning_menu_category.py` - Custom URL routes with filtering
- `static/src/js/slides_disable_fullscreen.js` - Frontend behavior override

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: elearning settings, course categories, header colors, fullscreen mode
- User wants to: customize eLearning, create filtered course views, change eLearning colors
- User mentions: /learn URL, course filtering, slides settings, LMS customization

### Related Agents
- `/cto-developer` - For implementation changes
- `/sam_chat` - If this affects SAM AI learning portal UX

### Delegate To
- `/cto-architect` - For major architectural changes
- `/cto-developer` - For code implementation

---

## Cross-References

### Related Modules
- `website_slides` - Odoo's native eLearning (extends)
- `ai_sam_website_colors` - Website color theming (complementary)
- `ai_sam_members` - Member portal integration

---

## Known Gotchas (Painfully Learned)

1. **Menu categories require upgrade** - After creating menu categories, module upgrade may be needed for routes to work

2. **Color injection timing** - Header color CSS is injected dynamically; browser cache may show old colors

3. **Fullscreen setting is global** - Applies to all users, not per-user preference

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (2)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid

**Last Verification:** 2025-01-26 by CTO Module Docs Reviewer (enhanced to 10/10)

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
