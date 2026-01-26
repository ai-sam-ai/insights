# FAQ: mass_mailing_document_import

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Mass Mailing Document Import

### What is mass_mailing_document_import?

mass_mailing_document_import is a Marketing/Email Marketing module for Odoo 18 that enables importing Markdown and Word documents into mass mailings through a guided 4-step wizard. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `mass_mailing_document_import`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, Python 3.10+, mass_mailing, samai_python_dependencies
- License: LGPL-3

### What does mass_mailing_document_import do?

mass_mailing_document_import provides 4 key capabilities:

1. **Document Conversion** - Converts Markdown (.md) and Word (.docx) files to email-safe HTML
2. **Template Application** - Wraps content in professional email templates (4 styles available)
3. **CTA Builder** - Adds customizable call-to-action buttons with 6 styles and 3 sizes
4. **Preview System** - Shows exactly how the email will render before applying

### Who is mass_mailing_document_import for?

mass_mailing_document_import is designed for:
- Marketing teams who create content in Word or Markdown
- Newsletter managers who want faster content workflows
- Businesses using Odoo 18 Mass Mailing that need document-to-email conversion

---

## Installation & Setup

### How do I install mass_mailing_document_import?

1. Ensure Odoo 18.0+ is running with mass_mailing module installed
2. Install `samai_python_dependencies` module first (manages Python libraries)
3. Navigate to Apps menu
4. Search for "mass_mailing_document_import" (may need to update apps list)
5. Click Install
6. The "Import Document" button appears on mass mailing forms

### What are the dependencies for mass_mailing_document_import?

Odoo modules required:
- `mass_mailing` - Core email marketing functionality
- `web_editor` - HTML editing capabilities
- `samai_python_dependencies` - Python library management

Python libraries required (managed by samai_python_dependencies):
- `markdown>=3.0` - For Markdown parsing
- `python-docx>=0.8` - For Word document parsing

### How do I configure mass_mailing_document_import?

No special configuration needed after installation:
1. Go to Email Marketing > Mailings
2. Create or open a mailing in draft state
3. Click the "Import Document" button in the header
4. Follow the 4-step wizard

---

## Usage

### How do I import a Markdown file into a mailing?

To import a Markdown file:
1. Open a mailing in draft state
2. Click "Import Document" button
3. Upload your .md or .markdown file
4. Click Next to process and select a template
5. Optionally configure a call-to-action button
6. Preview and click "Apply to Mailing"

### How do I import a Word document?

To import a Word document:
1. Ensure your document is saved as .docx (not .doc)
2. Open a mailing in draft state
3. Click "Import Document" button
4. Upload your .docx file
5. Follow the wizard steps (template, CTA, preview)
6. Click "Apply to Mailing"

### How do I add a call-to-action button?

In Step 3 of the wizard:
1. Enable "Include CTA Button" toggle (on by default)
2. Enter button text (e.g., "Shop Now", "Learn More")
3. Enter the destination URL
4. Choose button style (Primary, Secondary, Success, Warning, Urgent, Info)
5. Select size (Small, Medium, Large)
6. Choose position (After Content or Before Content)
7. See live preview in the wizard

### Can I use my own email template?

The module includes 4 built-in templates:
- **Basic** - Clean white background, minimal styling
- **Modern** - Professional with purple gradient header
- **Colorful** - Eye-catching purple gradient background
- **Minimal** - Serif font, text-focused design

For custom templates, developers can extend the `_apply_template()` method in `document_import_wizard.py`.

### What document formats are supported?

**Supported:**
- `.md` - Markdown files
- `.markdown` - Markdown files (alternative extension)
- `.docx` - Microsoft Word 2007+ documents

**Not Supported:**
- `.doc` - Legacy Word format (save as .docx first)
- `.txt` - Plain text
- `.pdf` - PDF documents
- `.html` - HTML files (use Odoo's native editor instead)

---

## Troubleshooting

### Why is my document not converting?

**Symptom:** Error message "Failed to process document" or conversion fails

**Possible Causes:**
1. Unsupported file format
2. Missing Python libraries
3. File encoding issues

**Solutions:**
1. Verify file is .md, .markdown, or .docx format
2. Check that samai_python_dependencies is installed and configured
3. For Markdown, save file with UTF-8 encoding
4. For Word, ensure file opens correctly in Microsoft Word first

### Why don't I see the "Import Document" button?

**Symptom:** Button not visible on mailing form

**Causes:**
- Module not installed
- Mailing not in draft state
- User lacks permissions

**Solutions:**
1. Verify module is installed in Apps
2. Ensure mailing state is "Draft" (not Sent, Scheduled, etc.)
3. Confirm user has mass_mailing_user group membership

### Why does my formatting look wrong?

**Symptom:** Converted content doesn't match original document

**Cause:** Email HTML has strict limitations compared to web HTML

**Solutions:**
1. Use standard headings (H1, H2, H3) in your document
2. Keep tables simple (complex nested tables may not convert perfectly)
3. Use standard formatting (bold, italic, underline)
4. Preview in the wizard before applying
5. Some advanced Word features (text boxes, shapes) won't convert

### Why is my .doc file not working?

**Symptom:** Error "Legacy .doc format not supported"

**Cause:** The python-docx library only supports .docx (Office Open XML) format

**Solution:**
1. Open the document in Microsoft Word
2. Save As > Choose "Word Document (.docx)"
3. Upload the .docx version

### The module is not working after upgrade. What do I do?

After upgrading Odoo or mass_mailing_document_import:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart Odoo server
3. Upgrade module: Apps > mass_mailing_document_import > Upgrade
4. If using pip, reinstall Python dependencies: `pip install markdown python-docx`
5. Check Odoo logs for specific error messages

---

## Comparisons

### How does this compare to copy-pasting into Odoo's editor?

| Feature | Document Import | Copy-Paste |
|---------|-----------------|------------|
| Formatting preserved | Yes (converted properly) | Often breaks |
| Email-safe HTML | Automatic | Manual fixes needed |
| Tables | Converted to email tables | Usually breaks |
| CTA buttons | Built-in builder | Manual HTML |
| Time required | 2 minutes | 30-60 minutes |

### Why choose this over writing directly in Odoo?

mass_mailing_document_import is ideal when:
- Content already exists in Word or Markdown
- Multiple people collaborate on content (before import)
- You prefer writing in your favorite editor
- You have a library of existing documents to repurpose

Odoo's native editor is better when:
- Starting from scratch in Odoo
- Using drag-and-drop building blocks
- Heavy use of Odoo's mailing templates

---

## Integration

### Does mass_mailing_document_import work with ai_sam_email_marketing?

Yes. These modules are complementary:
- Document Import brings your content into the mailing
- SAM Email Marketing can then optimize subject lines, analyze engagement, etc.

Install both for a complete email workflow.

### Can I use this with external services?

mass_mailing_document_import is standalone and doesn't require external services. All conversion happens locally using Python libraries.

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database:
- Uploaded documents are processed in memory and not stored
- Converted HTML is stored in the mailing record (`body_html`, `body_arch`)
- CTA templates are stored in `mailing_cta_template` table

No data is sent to external servers.

### Can I export my converted content?

Yes. After applying to a mailing:
- View HTML in the email builder
- Export mailings via Odoo's standard export
- Access via API: `mailing.mailing` model's `body_html` field

### How do I delete my data?

To remove document import data:
1. Delete the mailing record (removes converted content)
2. CTA templates persist and can be deleted via Settings if you have admin rights
3. Uninstalling the module removes CTA templates but preserves mailing content

---

## Pricing & Licensing

### Is mass_mailing_document_import free?

Yes. mass_mailing_document_import is licensed under LGPL-3, which means:
- Free to use
- Free to modify
- Can be used in commercial Odoo deployments
- Source code available

### Do I need a SAM AI subscription?

No. This module works standalone with just Odoo 18 and the samai_python_dependencies module.

---

## Support

### Where can I get help with mass_mailing_document_import?

- **Documentation:** https://sme.ec/documentation/modules/mass-mailing-document-import
- **Email:** sam@sme.ec
- **Chat:** Ask SAM in your Odoo instance (if ai_sam module installed)

### How do I report a bug?

1. Check Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - Steps to reproduce
   - Error messages from Odoo logs
   - Sample document if possible (redacted)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Images in Word docs not extracted | Open | Upload images separately to Odoo |
| Complex nested tables may simplify | Open | Use simpler table structures |
| RTL languages need testing | Open | Contact support for RTL needs |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2025-01-15 | Initial release with 4-step wizard, 4 templates, CTA builder |

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
