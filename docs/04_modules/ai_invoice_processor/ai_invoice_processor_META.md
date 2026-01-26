# Module: ai_invoice_processor

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_invoice_processor` |
| **Version** | 18.0.1.0.1 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_invoice_processor` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_invoice_processor\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_invoice_processor\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-invoice-processor |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_invoice_processor provides automated invoice data extraction using OpenAI GPT-4 Vision for Odoo. It monitors email inboxes for PDF invoice attachments, uses AI to extract vendor information, line items, and totals without requiring supplier-specific templates, then automatically creates supplier invoices in Odoo. This eliminates manual data entry and works universally with ANY invoice format.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `account`
- `mail`
- `base_automation`

### Python Libraries Required
- `requests` - HTTP calls to OpenAI API
- `pdf2image` - Convert PDF pages to images for GPT-4 Vision
- `xmlrpc` - XML-RPC communication (standalone mode)
- `imaplib` - Email inbox monitoring (built-in)
- `Pillow` - Image processing (required by pdf2image)

---

## For End Users (What Can This Do For Me?)

- **Eliminate manual invoice data entry** - AI reads invoices and enters data automatically
- **Works with ANY supplier** - No templates needed, adapts to any invoice format
- **Email automation** - Monitors your inbox and processes invoices as they arrive
- **Auto-create suppliers** - New vendors are automatically added to your system
- **98.5% cost reduction** - Compared to manual processing

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 4 | ai.invoice.config, ai.processing.log, invoice.extractor, supplier.invoice.processor |
| Model Inherits | 1 | res.config.settings (transient) |
| Standalone Classes | 1 | EmailInvoiceMonitor (email_monitor_processor.py - not an Odoo model) |
| Controllers | 0 | No REST endpoints |
| Views | 2 | Configuration form/tree, menu |
| JS Files | 0 | None |
| Security Rules | 10 | ir.model.access.csv (includes 2 orphan rules for non-existent models) |
| Scheduled Actions | 4 | Email monitor, stats reset, health check, manual test |

**Key Files:**
- `models/ai_invoice_config.py` - Configuration model (ai.invoice.config, ai.processing.log) + res.config.settings
- `models/universal_invoice_extractor.py` - AI extraction engine (invoice.extractor, supplier.invoice.processor)
- `models/email_monitor_processor.py` - Standalone Python class for email monitoring (NOT an Odoo model)
- `models/xmlrpc_integration.py` - XML-RPC integration for external Odoo
- `models/odoo13_integration.py` - Odoo 13 specific integration features
- `data/scheduled_actions.xml` - Cron jobs for automation

**Note:** Security file contains rules for `invoice.ai.processor` and `ai.configuration` which are orphaned (models don't exist in code).

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: invoice processing, invoice extraction, AI invoice, automated invoices, supplier invoices
- User wants to: process invoices automatically, extract data from PDFs, automate accounts payable
- User mentions: GPT-4 Vision, invoice OCR, email invoice monitoring, supplier bills

### Related Agents
- `/cto-developer` - For implementation or customization work
- `/cto` - For architecture decisions about invoice processing

### Delegate To
- `/cto` - For architecture decisions about this module
- `/cto-developer` - For implementation work
- `/cto-auditor` - For quality review of changes

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/` (no specific doc yet)
- Parent Module: None (standalone accounting tool)

### Related Modules
- `account` (Odoo core) - Creates account.move records
- `mail` - Email thread tracking on config records

---

## Known Gotchas (Painfully Learned)

1. **PDF to Image Requires Poppler** - pdf2image needs Poppler installed on the server (`apt install poppler-utils` on Linux)
2. **OpenAI API Costs** - GPT-4 Vision is expensive; monitor `total_api_cost` field
3. **IMAP App Passwords** - Gmail requires app-specific passwords, not regular passwords
4. **Temperature Setting** - Keep at 0.1 for consistent extraction; higher values cause inconsistent results
5. **Manifest author/website incorrect** - Currently shows "Your Company Name" instead of SAM AI standards (needs fixing)
6. **Orphan security rules** - `invoice.ai.processor` and `ai.configuration` in ir.model.access.csv don't exist in code
7. **Pillow dependency** - Required by pdf2image but not listed in manifest external_dependencies

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.1)
- [x] Dependencies list is current
- [x] Model count matches reality (4 models + 1 inherit + 1 standalone class)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented
- [x] Orphan security rules identified

**Last Verification:** 2025-01-26 by CTO Module Docs Review Agent (10/10)

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation - four-file standard | CTO Module Docs Agent |
