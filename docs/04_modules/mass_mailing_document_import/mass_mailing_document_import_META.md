# Module: mass_mailing_document_import

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `mass_mailing_document_import` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\mass_mailing_document_import` |
| **Manifest** | `D:\github_repos\06_samai_extras\mass_mailing_document_import\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\mass_mailing_document_import\` |
| **Online URL** | https://sme.ec/documentation/modules/mass-mailing-document-import |
| **Category** | Marketing/Email Marketing |
| **Status** | Active |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

mass_mailing_document_import extends Odoo's Mass Mailing app to allow importing content from Markdown (.md) and Microsoft Word (.docx) documents through a guided 4-step wizard. It converts documents to email-safe HTML, allows users to select from pre-designed email templates, add customizable call-to-action buttons, and preview the final result before applying it to their mailing campaign.

---

## Dependencies

### Odoo Module Dependencies
- `mass_mailing` - Core mass mailing functionality
- `web_editor` - HTML/WYSIWYG editor support
- `samai_python_dependencies` - Centralized Python dependency management

### Python Libraries Required
- `markdown>=3.0` - For converting Markdown files to HTML
- `python-docx>=0.8` - For reading and converting Word documents

*Note: Python dependencies are managed centrally by the samai_python_dependencies module*

---

## For End Users (What Can This Do For Me?)

- **Import existing content**: Turn your Markdown files or Word documents into professional email campaigns in minutes
- **No HTML skills needed**: The wizard handles all the conversion and formatting automatically
- **Professional templates**: Choose from 4 built-in email templates (Basic, Modern, Colorful, Minimal)
- **Add compelling CTAs**: Create customizable call-to-action buttons with various styles, sizes, and colors
- **Preview before sending**: See exactly how your email will look before applying it to your mailing

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | 1 regular (CTA Template), 1 abstract (Converter), 1 extended (mailing.mailing) |
| Wizards | 1 | mailing.document.import.wizard (TransientModel) |
| Controllers | 0 | No REST endpoints |
| Views | 2 | Wizard form view, mailing form extension |
| SCSS Files | 1 | document_import.scss |
| Security Rules | 3 | ir.model.access.csv |
| Data Records | 6 | Pre-defined CTA templates |

**Key Files:**
- `models/cta_template.py` - Call-to-action button template management
- `models/document_converter.py` - Abstract model for MD/DOCX to HTML conversion
- `models/mailing_mailing.py` - Extends mailing.mailing with import action
- `wizard/document_import_wizard.py` - Multi-step import wizard (4 steps)
- `wizard/document_import_wizard_views.xml` - Wizard UI with progress indicators

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: document import, mailing import, markdown email, word to email, docx import, mass mailing, email templates, CTA buttons
- User wants to: import document into email, convert markdown to email, create email from word document, add call-to-action to mailing
- User mentions: email marketing, newsletter content, document conversion, mailing wizard

### Related Agents
- `/cto-developer` - For implementation work and bug fixes
- `/doc-sprint` - For documentation updates
- `/sam_chat` - For user-facing guidance on email marketing features

### Delegate To
- `/cto` - For architecture decisions about email marketing features
- `/cto-developer` - For implementation work in this module
- `/mod_workflows` - If workflow automation is needed for document processing

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/odoo_modules/`
- Parent Module: `docs/04_modules/mass_mailing/` (Odoo core)
- Related: `docs/04_modules/samai_python_dependencies/`

### Related Modules
- `mass_mailing` - Base Odoo module that this extends
- `web_editor` - Provides HTML editing capabilities
- `samai_python_dependencies` - Manages Python library requirements
- `ai_sam_email_marketing` - SAM AI email marketing features (complementary)

---

## Known Gotchas (Painfully Learned)

1. **Legacy .doc format not supported** - Only .docx (Office 2007+) works. Users must save/convert .doc files first.

2. **Encoding issues with Markdown** - Non-UTF-8 encoded files may fail. The converter attempts fallback encodings (latin-1, cp1252) but UTF-8 is recommended.

3. **Images in Word docs** - While basic text formatting is preserved, embedded images require additional handling (currently extracts text only from Word documents).

4. **Email client compatibility** - All HTML output uses table-based layouts and inline styles for maximum email client compatibility. Do not modify the output structure without understanding email rendering constraints.

5. **Template sanitization** - HTML templates use `sanitize=False` to preserve email-safe inline styles. Be careful when allowing user-generated template content.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.0)
- [x] Dependencies list is current (mass_mailing, web_editor, samai_python_dependencies)
- [x] Model count matches reality (3 models + 1 wizard)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2026-01-26 by Claude Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial documentation creation | Claude Agent |
