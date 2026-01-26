# FAQ: ai_invoice_processor

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About AI Invoice Processor

### What is ai_invoice_processor?

ai_invoice_processor is an Accounting module for Odoo 18 that automatically extracts data from supplier invoice PDFs using OpenAI GPT-4 Vision and creates supplier invoices in Odoo. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_invoice_processor`
- Current version: 18.0.1.0.1
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does ai_invoice_processor do?

ai_invoice_processor provides 4 key capabilities:

1. **AI-Powered Data Extraction** - Uses GPT-4 Vision to read invoice images and extract vendor name, invoice number, dates, line items, and totals
2. **Email Inbox Monitoring** - Automatically checks configured email inbox for new invoices with PDF attachments
3. **Universal Format Support** - Works with ANY invoice layout without requiring supplier-specific templates
4. **Automated Invoice Creation** - Creates supplier invoices in Odoo with matched vendors and attached PDFs

### Who is ai_invoice_processor for?

ai_invoice_processor is designed for:
- Accounts payable teams processing 30+ invoices monthly
- Businesses tired of maintaining supplier-specific templates
- Organizations wanting to reduce manual data entry costs
- Odoo users seeking AI-powered automation

---

## Installation & Setup

### How do I install ai_invoice_processor?

1. Ensure Odoo 18.0+ is running
2. Install system dependency: `apt install poppler-utils` (Linux) or install Poppler (Windows)
3. Navigate to Apps menu
4. Search for "AI Invoice Processor"
5. Click Install
6. Go to Accounting > Configuration > AI Invoice Config
7. Create a new configuration with your OpenAI API key and email settings

### What are the dependencies for ai_invoice_processor?

ai_invoice_processor requires these Odoo modules:
- `base` - Odoo core
- `account` - Accounting for invoice creation
- `mail` - Email threading
- `base_automation` - Scheduled actions

Python libraries required:
- `requests` - API communication
- `pdf2image>=1.16.0` - PDF to image conversion
- `Pillow>=9.0.0` - Image processing

System dependencies:
- Poppler (poppler-utils on Linux) - Required by pdf2image

### How do I configure ai_invoice_processor?

After installation:
1. Go to Accounting > Configuration > AI Invoice Config
2. Create new configuration:
   - Enter a name (e.g., "Production Config")
   - Add your OpenAI API key
   - Configure email server (IMAP host, port, username, password)
   - Set processing preferences (confidence threshold, auto-create suppliers)
3. Click "Test OpenAI Connection" to verify API key
4. Click "Test Email Connection" to verify email settings
5. Enable "Auto Process" to start automation

---

## Usage

### How do I process an invoice manually?

To manually trigger invoice processing:
1. Ensure emails with PDF invoices are in the monitored inbox
2. Go to Settings > Technical > Scheduled Actions
3. Find "AI Invoice Email Monitor"
4. Click "Run Manually"
5. Check Accounting > Vendors > Bills for created invoices

### How do I check processing history?

To view processing logs:
1. Go to Accounting > Configuration > AI Invoice Config
2. Open your configuration
3. Click "Processing Logs" smart button
4. View status, extracted data, errors for each attempt

### Can I reprocess a failed invoice?

Yes. To reprocess a failed invoice:
1. Go to the Processing Logs
2. Find the failed record
3. Click "Reprocess Invoice" button
4. The system will retry extraction

### How do I exclude certain senders or emails?

To filter which emails are processed:
1. Go to AI Invoice Config
2. In "Email Filter Keywords" field, enter keywords that must appear (comma-separated)
3. In "Excluded Senders" field, enter email addresses to ignore
4. Only matching emails with PDF attachments will be processed

---

## Troubleshooting

### Why are invoices not being processed?

**Symptom:** Emails arrive but no invoices are created

**Possible Causes and Solutions:**
1. **Scheduled action disabled** - Check Settings > Scheduled Actions > AI Invoice Email Monitor is active
2. **No active config** - Ensure you have an active AI Invoice Config
3. **Email connection failed** - Run "Test Email Connection" to verify credentials
4. **No PDF attachments** - Module only processes emails with .pdf attachments
5. **Filter keywords not matching** - Check if email subject matches filter keywords

### Why is extraction failing?

**Symptom:** Processing log shows "failed" status

**Possible Causes and Solutions:**
1. **OpenAI API key invalid** - Verify API key with "Test OpenAI Connection"
2. **API rate limit** - Check `max_daily_api_calls` setting
3. **PDF conversion failed** - Ensure Poppler is installed on server
4. **Image quality too low** - Original PDF may be too blurry/small
5. **Unusual invoice format** - Some handwritten or very unusual formats may need manual entry

### Why are vendors not being matched?

**Symptom:** New vendors created instead of matching existing

**Cause:** AI extracts vendor name differently than stored in Odoo

**Solution:**
1. Check extracted vendor name in processing log
2. Ensure vendor has VAT number (more reliable matching)
3. Consider standardizing vendor names in Odoo

### Module not working after upgrade. What do I do?

After upgrading Odoo or ai_invoice_processor:
1. Clear browser cache
2. Restart Odoo server
3. Upgrade module: Apps > AI Invoice Processor > Upgrade
4. Verify Poppler is still installed
5. Check scheduled actions are still enabled
6. If issues persist, check Odoo logs for errors

---

## Comparisons

### How does ai_invoice_processor compare to Odoo Digitize?

| Feature | ai_invoice_processor | Odoo Digitize |
|---------|---------------------|---------------|
| AI Model | GPT-4 Vision | Odoo's OCR engine |
| Template-free | Yes | Requires templates |
| Email automation | Built-in | Separate setup |
| Cost | Pay per use (OpenAI) | Enterprise subscription |
| Odoo Integration | Native | Native |
| Learning/Adaptation | Instant (no training) | Improves with use |

### Why choose ai_invoice_processor over manual entry?

ai_invoice_processor provides:
- **Time savings:** 10-30 minutes saved per invoice
- **Accuracy:** Eliminates transcription errors
- **Scalability:** Process hundreds of invoices without hiring
- **Consistency:** Same quality 24/7

---

## Integration

### Does ai_invoice_processor work with other SAM AI modules?

ai_invoice_processor is standalone but can work with:
- `ai_sam` - Chat interface to trigger processing manually
- Future integrations planned for analytics and reporting

### Can I use ai_invoice_processor with external email services?

Yes. ai_invoice_processor supports any IMAP-compatible email service:
- Gmail (use App Password)
- Microsoft 365
- Yahoo
- Custom IMAP servers

Configure server address, port, and SSL settings in the config.

---

## Data & Privacy

### Where is my data stored?

All invoice data is stored in your Odoo PostgreSQL database. PDF attachments are stored as Odoo attachments linked to invoices.

**Data sent to OpenAI:**
- Invoice PDF image (for extraction)
- OpenAI does not store images after processing per their API policy

### Can I export my data from ai_invoice_processor?

Yes. You can export data via:
- Odoo's built-in export (list views > Export)
- Processing logs export (CSV/Excel)
- Standard Odoo API

### How do I delete processing history?

Processing logs older than 30 days are automatically deleted by the daily cron job.

To manually delete:
1. Go to Processing Logs
2. Select records to delete
3. Action > Delete

---

## Pricing & Licensing

### Is ai_invoice_processor free?

ai_invoice_processor is licensed under LGPL-3. The module itself is free to use and modify.

**Costs to consider:**
- OpenAI API usage (~$0.01-0.05 per invoice)
- Server resources for PDF processing

### Do I need an OpenAI subscription?

Yes. You need an OpenAI API account with:
- Access to GPT-4 Vision (gpt-4o model)
- Sufficient API credits
- API key configured in the module

---

## Support

### Where can I get help with ai_invoice_processor?

- **Documentation:** https://sme.ec/documentation/modules/ai-invoice-processor
- **Email:** sam@sme.ec
- **Issues:** Contact anthony@sme.ec

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.1)
   - Odoo version
   - Steps to reproduce
   - Error messages from Odoo log
   - Sample invoice (if possible, redacted)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Multi-page invoices only process first page | Open | Ensure totals/summary on first page, or pre-merge pages using PDF tools |
| Gmail requires App Password | By Design | Generate App Password in Google Account > Security > 2-Step Verification > App passwords |
| Very low quality PDFs fail extraction | Open | Request higher quality from supplier, or use higher DPI scan |
| Orphan security rules | Known | `invoice.ai.processor` and `ai.configuration` in security file don't exist in code - can be removed |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.1 | 2024-12 | Updated to GPT-4o model, improved logging |
| 18.0.1.0.0 | 2024-11 | Initial release |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
*Reviewed: 2025-01-26 by CTO Module Docs Review Agent (10/10)*
