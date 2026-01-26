# FAQ: sam_ai_accounts

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Accounts

### What is sam_ai_accounts?

sam_ai_accounts is an Accounting bridge module for Odoo 18 that provides visual, code-free invoice PDF customization. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `sam_ai_accounts`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, Python 3.10+, account module, sam_ai_customization module
- License: LGPL-3

### What does sam_ai_accounts do?

sam_ai_accounts provides 5 main capabilities:

1. **Visual Invoice Editor** - Drag-and-drop interface to customize invoice PDFs without coding
2. **Section Management** - Show/hide/style 40+ pre-mapped invoice sections (header, addresses, line items, totals, etc.)
3. **Multiple Templates** - Create and switch between different invoice designs per company
4. **QWeb Generation** - Automatically generates proper XPath-based inherited views
5. **Safe Experimentation** - Instant revert to standard Odoo invoice layout

### Who is sam_ai_accounts for?

sam_ai_accounts is designed for:
- Business owners who want professional branded invoices without technical knowledge
- Accountants and finance teams who need to customize invoice layouts
- Multi-company organizations requiring different invoice designs per entity
- Businesses using Odoo 18 Accounting that want visual template control

---

## Installation & Setup

### How do I install sam_ai_accounts?

1. Ensure Odoo 18.0+ is running with the `account` module installed
2. Install `sam_ai_customization` module first (dependency)
3. Navigate to Apps menu
4. Search for "sam_ai_accounts" or "Invoice Customizer"
5. Click Install
6. Go to Accounting > Configuration > Settings to access the customizer

### What are the dependencies for sam_ai_accounts?

sam_ai_accounts requires these Odoo modules:
- `account` - Odoo's core Accounting module (provides invoice templates)
- `sam_ai_customization` - SAM AI View Customizer (provides visual editing framework)

Python libraries required:
- `lxml` - Already included with standard Odoo installation

### How do I configure sam_ai_accounts?

After installation:
1. Go to Accounting > Configuration > Settings
2. Scroll to "Invoice PDF Customization" section
3. Click "Customize Invoice PDF" to create your first template
4. Or click "Manage Templates" to see all templates

---

## Usage

### How do I customize my invoice layout?

To customize your invoice:
1. Go to Accounting > Configuration > Settings
2. Click "Customize Invoice PDF" button
3. Use the visual editor to select and modify sections
4. Click "Apply Template" when done
5. Preview with "Preview PDF" to see results

### How do I hide a section on my invoice?

To hide an invoice section:
1. Open the template (Accounting > Settings > Manage Templates)
2. In the Customizations tab, click "Add a line"
3. Select the section you want to hide
4. Set "Customization Type" to "Hide Section"
5. Click "Apply Template"

### How do I change the styling of invoice elements?

To change styling:
1. Open your template and add a new customization
2. Select the section to style
3. Set "Customization Type" to "Change Style"
4. Enter CSS classes in "CSS Classes" field (e.g., `text-center bold`)
5. Or enter inline styles in "CSS Style" field (e.g., `color: #333; font-size: 14px;`)
6. Apply the template

### Can I add custom content to my invoice?

Yes! sam_ai_accounts supports adding custom content:

1. Add a customization with type "Add Before" or "Add After"
2. Enter your HTML content in the "HTML Content" field
3. For advanced users: Use the "QWeb Content" field for dynamic content with Odoo variables

Example HTML content:
```html
<div class="text-center" style="margin-top: 20px;">
    <strong>Thank you for your business!</strong>
</div>
```

### How do I create multiple invoice templates?

To create multiple templates:
1. Go to Accounting > Configuration > Invoice Templates
2. Click "Create"
3. Name your template (e.g., "Premium Invoice", "Simple Invoice")
4. Add customizations as needed
5. To switch templates, set `is_default` on the desired template

### Can I preview my template before applying?

Yes! Every template has a "Preview PDF" button that:
1. Finds a sample invoice from your company
2. Applies the template temporarily
3. Generates and displays the PDF
4. Lets you verify changes before committing

---

## Troubleshooting

### Why are my customizations not showing on invoices?

**Symptom:** You saved customizations but invoices still look standard

**Cause:** Template not applied or wrong template selected

**Solution:**
1. Open your template and check the "Status" field - it should say "Applied"
2. If "Draft", click "Apply Template" button
3. Verify the template is marked as "Default" for your company
4. Clear browser cache and regenerate the invoice PDF

### Why does the XPath error appear when applying?

**Symptom:** Error message about XPath expression when applying template

**Cause:** The XPath target doesn't match current Odoo template structure (can happen after Odoo updates or with localizations)

**Solution:**
1. Check if you're using a country-specific localization (l10n_xx module)
2. The module should auto-detect localizations, but verify by checking logs
3. If custom XPath was entered, verify it against `account.report_invoice_document` template
4. Contact support with the exact error message

### Template applied but invoice looks unchanged?

**Symptom:** Template shows "Applied" status but PDF is unchanged

**Cause:** Localized template override not detected

**Solution:**
1. Check Odoo logs for "Using base view:" message
2. If using l10n_xx localization, ensure module version is 18.0.1.0.0+
3. Try creating a new template from scratch
4. Verify no conflicting inherited views exist in ir.ui.view

### How do I completely reset to standard invoice?

To fully reset:
1. Open your template
2. Click "Revert to Standard" button
3. Confirm the action
4. The generated view is deleted and state returns to "Draft"
5. Invoices now use standard Odoo layout

---

## Comparisons

### How does sam_ai_accounts compare to editing QWeb templates directly?

| Feature | sam_ai_accounts | Direct QWeb Editing |
|---------|-----------------|---------------------|
| Learning curve | 5 minutes | Hours/days |
| Risk of breaking | None (safe sandbox) | High |
| Revert capability | One click | Manual restore |
| Required skills | Basic clicking | XML, XPath, QWeb |
| Template management | Visual UI | File management |
| Version control | Built-in states | External Git |

### Why choose sam_ai_accounts over Odoo Studio?

sam_ai_accounts is specifically designed for invoice PDF customization:

- Focused on invoice reports (Studio is general-purpose)
- Pre-mapped 40+ invoice sections with correct XPath
- Handles l10n localization templates automatically
- Lighter weight and faster for this specific use case
- Part of SAM AI ecosystem with future AI-powered features

---

## Integration

### Does sam_ai_accounts work with localized invoice templates (l10n_xx)?

Yes! As of version 18.0.1.0.0, sam_ai_accounts automatically:

1. Detects country-specific localization modules (l10n_au, l10n_de, etc.)
2. Finds PRIMARY mode views that override the standard template
3. Inherits from the localized template instead of base
4. All customizations appear correctly on localized invoices

### Can I use sam_ai_accounts with ai_sam_qrcodes?

Yes. When ai_sam_qrcodes is installed:
- QR code sections become available in the section list
- You can position and style QR codes using the visual editor
- Both modules work together seamlessly

### Does this affect invoice emails or just PDFs?

sam_ai_accounts customizes the **PDF report template** specifically:
- Print invoice PDF - Yes, customized
- Download invoice - Yes, customized
- Email attachment PDF - Yes, customized
- Invoice preview in Odoo - Not affected (uses form view)

---

## Data & Privacy

### Where is my template data stored?

All data is stored in your Odoo PostgreSQL database:
- Templates: `sam_invoice_template` table
- Customizations: `sam_invoice_template_customization` table
- Generated views: `ir_ui_view` table

No data is sent to external servers.

### Can I export/backup my templates?

Yes. Each template has an "Export XML" button that:
1. Generates standard Odoo XML data file
2. Includes the generated QWeb view
3. Can be imported into another Odoo instance
4. Useful for backup or migration

### What happens to my templates if I uninstall the module?

When uninstalling sam_ai_accounts:
- Template records are deleted
- Generated views are deleted
- Invoices revert to standard Odoo layout
- Company settings field is removed
- Data cannot be recovered after uninstall

---

## Pricing & Licensing

### Is sam_ai_accounts free?

sam_ai_accounts is licensed under LGPL-3 (GNU Lesser General Public License v3). This means:
- Free to use for any purpose
- Free to modify and distribute
- Modifications must be shared under same license
- No warranty provided

### Do I need additional SAM AI modules?

Required dependency:
- `sam_ai_customization` - Must be installed (also LGPL-3)

Optional enhancements:
- `ai_sam_qrcodes` - Adds payment QR code support

---

## Support

### Where can I get help with sam_ai_accounts?

- **Documentation:** https://sme.ec/documentation/modules/sam-ai-accounts
- **Email:** sam@sme.ec
- **Technical:** anthony@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance (if ai_sam installed)

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - l10n_xx localization if installed
   - Steps to reproduce
   - Error messages from Odoo logs
   - Screenshot if visual issue

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Some advanced XPath patterns may not work with all localizations | Open | Use simpler section-based customizations |
| Visual editor may timeout on very complex templates | Open | Break into multiple simpler templates |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2025 | Initial release with visual editor, section mapping, l10n support |

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
