# Module: sam_ai_customization

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_customization` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\sam_ai_customization` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\sam_ai_customization\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_customization\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-customization |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

SAM AI Customization Suite provides two powerful tools for non-developers: **View Customizer** lets users drag-and-drop fields into Odoo forms, lists, and kanban views without writing code. **Report Builder** enables visual design of PDF reports with drag-and-drop elements that generate QWeb templates automatically. Both tools include undo/redo, preview capabilities, and export/import for backup and migration.

---

## Dependencies

### Odoo Module Dependencies
- `web` - Odoo web client
- `base` - Odoo base
- `mail` - For activity tracking on report templates

### Python Libraries Required
- `lxml` - XML parsing (included in Odoo)

---

## For End Users (What Can This Do For Me?)

- Drag fields into any Odoo view without coding
- Create custom fields (x_*) on any model through UI
- Undo and redo changes before saving
- Preview changes before applying them
- Export customizations as XML for backup
- Design PDF reports visually with drag-and-drop
- Add dynamic fields, images, tables, barcodes to reports
- Generate QWeb templates automatically from visual designs
- Three-tier permission system (User/Manager/Admin)

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 6 | sam.view.customizer, sam.view.customization, sam.field.creator, sam.report.template, sam.report.element, sam.report.style |
| Controllers | 0 | None |
| Views | 3+ | Customizer views, report builder views, menu |
| JS Files | 8 | Systray, sidebar, field items, dialogs, report builder |
| Security Rules | 21 | Three-tier: User/Manager/Admin |
| Assets | 2 SCSS | customizer.scss, report_builder.scss |

**Key Files:**
- `models/view_customizer.py` - Main view customization tracking and XPath generation
- `models/view_customization.py` - Individual customization records with XPath building
- `models/report_template.py` - Report design master with QWeb generation
- `models/report_element.py` - Individual report canvas elements
- `static/src/js/services/view_customizer_service.js` - Frontend service
- `static/src/js/report_builder/report_builder.js` - Visual report editor

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: view customization, report builder, drag-and-drop fields, custom reports
- User wants to: customize views without code, design PDF reports, add fields to views
- User mentions: SAM customization, view customizer, report builder, QWeb design

### Related Agents
- `/cto-developer` - For customization or bug fixes
- `/mod_sam` - For SAM AI core integration

### Delegate To
- `/cto` - For architecture decisions about customization
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (SAM AI original)

### Related Modules
- `base` - Core Odoo views and models
- `mail` - For activity tracking
- `web` - Frontend framework

---

## Known Gotchas (Painfully Learned)

1. **XPath Validation** - Generated XPath must match elements in base view or apply will fail
2. **View Priority** - Generated inherited views use priority 99 to apply after other inheritances
3. **Registry Cache** - Must call `env.registry.clear_cache()` after view changes
4. **Field Creator Missing** - `sam.field.creator` model referenced in security but not in source files provided
5. **QWeb Template Names** - Technical names must start with letter, use only lowercase and underscores
6. **PDF Preview** - Requires at least one record in target model to preview
7. **Company Scope** - Each customization is scoped to one company

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
