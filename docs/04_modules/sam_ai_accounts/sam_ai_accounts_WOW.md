# SAM AI Accounts - Invoice Customizer

## Your Invoices, Your Way - No Code Required

---

### The Problem You Know Too Well

Every time a customer asks "Can you change how our invoice looks?", you feel that sinking feeling. You know what they want is simple - move the logo, add a footer, change some colors. But in Odoo, that means diving into QWeb templates, XPath expressions, and XML inheritance. You either spend hours learning the technical side, or pay a developer for what should be a 5-minute job.

**Your brand deserves better. Your time deserves better.**

---

### What If Designing Invoices Was as Easy as Drag-and-Drop?

Imagine opening a visual editor, clicking on the parts of your invoice you want to change, and simply dragging them where you want. Want to hide the shipping address? Click and toggle. Need custom styling for your totals? Pick colors from a palette. Want to add your payment QR code? Just enable the section.

**That's SAM AI Accounts - Invoice Customizer.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Visual Drag-and-Drop Editor** | Design invoices like you're using PowerPoint, not programming |
| **40+ Customizable Sections** | Every part of your invoice is a building block you control |
| **Multiple Templates Per Company** | Different designs for different purposes - quotes, invoices, credit notes |
| **One-Click Revert** | Experimented too much? Return to standard Odoo layout instantly |
| **Live Preview** | See changes immediately with your real invoice data |
| **Export Templates** | Backup your designs or migrate between Odoo instances |

---

### How It Works (The Simple Version)

1. **Open the Customizer** - Go to Accounting > Settings > Customize Invoice PDF
2. **Point and Click** - Select any section of the invoice to modify it
3. **Style and Arrange** - Use the visual tools to change colors, fonts, visibility, and position
4. **Preview and Apply** - See your changes on a real invoice, then save

**That's it.** No XML editing. No code deployment. No developer tickets.

---

### Real Results

| Before | After |
|--------|-------|
| 4-8 hours to customize invoice layout | 15 minutes in the visual editor |
| Required technical developer | Any team member can do it |
| Afraid to experiment (might break things) | Safe sandbox with instant revert |
| One invoice design forever | Multiple templates for different needs |
| Paid $200-500 per customization | Unlimited changes, included |

---

### Who Is This For?

**SAM AI Accounts is perfect for:**

- Business owners who want branded invoices without technical hassle
- Accountants tired of asking IT for simple formatting changes
- Multi-company organizations needing different invoice designs per entity
- Anyone who's ever said "I just want to move the logo!"

**This probably isn't for you if:**

- You enjoy writing XPath expressions for fun (we won't judge)
- You need invoice customizations that require completely new data fields
- You're not using Odoo Accounting module

---

### Part of the SAM AI Ecosystem

SAM AI Accounts doesn't work alone. It's one piece of an intelligent business system:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **sam_ai_customization** | The foundation - visual editing framework | Powers the drag-and-drop interface |
| **account** | Odoo's core accounting | Provides the invoice template we customize |
| **sam_ai_accounts** | **Visual invoice PDF designer** | **You are here** |
| **ai_sam_qrcodes** | Payment QR codes | Adds QR code section to invoice customizer |

**Together, they make your business documents look as professional as your business is.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** account, sam_ai_customization
- **Installation:** Via Odoo Apps menu
- **License:** LGPL-3

**How it really works:**
1. Maps all sections of `account.report_invoice_document` to `sam.invoice.section` records
2. Visual editor creates `sam.invoice.template.customization` records
3. On "Apply", generates inherited QWeb view using XPath expressions
4. Generated view stored in `ir.ui.view` with mode='extension'
5. Automatically detects localized templates (l10n_xx modules) and inherits correctly

**Documentation:** [Full technical docs](sam_ai_accounts_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: How long does it take to set up?**
A: Install the module, go to Accounting Settings, click "Customize Invoice PDF" - you're ready in under 2 minutes.

**Q: Do I need technical skills?**
A: If you can use a word processor, you can use the Invoice Customizer. Zero coding required.

**Q: What if I break something?**
A: You can't! Every template has a "Revert to Standard" button that instantly restores the original Odoo invoice layout.

**Q: Can I have different invoices for different customers?**
A: You can create multiple templates per company. Switching between them is one click.

**Q: Does this work with my country's localized invoice format?**
A: Yes! The module automatically detects l10n_xx localizations and inherits from the correct template.

---

### Ready to Make Your Invoices Yours?

Stop settling for generic invoices. Stop paying for simple changes. Stop waiting for developer availability.

**Take control of your invoice design today.**

[Get Started in Accounting Settings] | [See the Visual Editor] | [Ask SAM for Help]

---

*SAM AI Accounts - Invoice Customizer - Part of SAM AI by SME.ec*
*Version 18.0.1.0.0 | Odoo 18 Compatible | LGPL-3 License*
