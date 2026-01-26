# Module: sam_ai_accounts

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_accounts` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\sam_ai_accounts` |
| **Manifest** | `D:\github_repos\06_samai_extras\sam_ai_accounts\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_accounts\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-accounts |
| **Status** | Active |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

sam_ai_accounts is a bridge module that connects SAM AI View Customizer with Odoo Accounting to provide visual, code-free invoice PDF customization. It enables users to modify the standard Odoo invoice template using a drag-and-drop editor, eliminating the need for QWeb/XML knowledge while generating proper XPath-based inherited views.

---

## Dependencies

### Odoo Module Dependencies
- `account` - Core Odoo Accounting (provides invoice templates and reporting)
- `sam_ai_customization` - SAM AI View Customizer (provides visual editing framework)

### Python Libraries Required
- `lxml` - XML/XPath manipulation (included with Odoo)
- No additional external dependencies

---

## For End Users (What Can This Do For Me?)

- **Customize invoice PDFs visually** - No coding required, use drag-and-drop to modify layout
- **Professional invoice branding** - Add your company's style without hiring a developer
- **Multiple templates** - Create different invoice designs for different purposes
- **Safe experimentation** - Revert to standard Odoo template anytime with one click
- **Real-time preview** - See changes immediately with actual invoice data

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 4 | sam.invoice.section, sam.invoice.section.field, sam.invoice.template, sam.invoice.template.customization |
| Controllers | 0 | Uses model methods via RPC |
| Views | 9 | list, form, search for templates/sections, config settings extension |
| JS Files | 1 | invoice_customizer.js (visual editor) |
| Security Rules | 8 | 4 models x 2 access levels (user/manager) |

**Key Files:**
- `models/invoice_template.py` - Main template model with QWeb generation logic
- `models/invoice_section.py` - Maps customizable invoice areas with XPath targets
- `models/res_config_settings.py` - Settings integration and company field
- `static/src/js/invoice_customizer.js` - Visual drag-and-drop editor
- `data/invoice_sections.xml` - Pre-populated invoice section definitions
- `data/invoice_sections_extended.xml` - Extended sections for Odoo 18

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: invoice customization, invoice PDF, invoice template, invoice layout, invoice styling
- User wants to: customize invoice, modify invoice PDF, add logo to invoice, change invoice design
- User mentions: invoice sections, QWeb invoice, account.report_invoice_document, invoice XPath
- User references: sam_ai_accounts, invoice customizer, invoice editor

### Related Agents
- `/cto-developer` - For implementation work and bug fixes
- `/mod_sam` - For core infrastructure questions
- `/sam_ai_customization` - For the underlying view customization framework

### Delegate To
- `/cto` - For architecture decisions about invoice customization approach
- `/cto-developer` - For XPath debugging or QWeb issues
- `/qa-guardian` - For pre-commit validation of changes

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/odoo_qweb_inheritance/`
- Data Flows: `docs/06_data_flows/invoice_pdf_generation/`
- Parent Module: `docs/04_modules/sam_ai_customization/`

### Related Modules
- `sam_ai_customization` - **Required** - Provides the visual editing framework
- `account` - **Required** - Core Odoo accounting with invoice templates
- `ai_sam_qrcodes` - **Optional** - Adds QR code sections to invoices

---

## Known Gotchas (Painfully Learned)

1. **Localized invoice templates** - Country-specific accounting modules (l10n_xx) create PRIMARY mode views that branch off from the standard template. The module now detects these and inherits from the localized view instead of the base template. Without this, customizations appear to do nothing.

2. **XPath expression precision** - XPath expressions must exactly match the Odoo 18 template structure. The `hasclass()` function is critical for targeting Bootstrap-styled elements. Template structure changes between Odoo versions.

3. **Style vs Attribute customizations** - CSS styles require the `attributes` position type. The `_build_xpath_element()` method handles this mapping, but manual customizations must use correct position values.

4. **One default per company** - SQL EXCLUDE constraint enforces single default template per company. Setting `is_default=True` automatically unsets previous defaults via `_check_single_default()` constraint.

5. **View generation timing** - Generated views are stored in `ir.ui.view` with mode='extension'. They are only applied after `action_apply_template()` is called - draft templates don't affect invoice output.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (4 models)
- [x] Controller count matches reality (0 controllers)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2026-01-26 by Claude Code

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial creation of four-file documentation standard | Claude Code |
