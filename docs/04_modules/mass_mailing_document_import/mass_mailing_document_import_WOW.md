# Mass Mailing Document Import

## Turn Your Documents Into Beautiful Emails in Minutes

---

### The Problem You Know Too Well

You have a perfectly crafted newsletter in Word. Or a product announcement in Markdown. Now you need to turn it into an email campaign in Odoo. So you copy... paste... watch the formatting break... manually fix every heading... add inline styles... fight with tables... and an hour later, you're still not done.

**It doesn't have to be this way.**

---

### What If Your Documents Just... Worked?

Imagine uploading your Markdown or Word document and watching it transform into a professional email campaign. Instead of wrestling with HTML and CSS, you simply choose a template, add a call-to-action button, and click apply. And the best part? It handles all the email-client compatibility nightmares for you.

**That's Mass Mailing Document Import.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **One-Click Document Import** | Upload .md or .docx and get email-ready HTML instantly |
| **4 Professional Templates** | Basic, Modern, Colorful, Minimal - no design skills needed |
| **Smart CTA Builder** | 6 button styles, 3 sizes, positioned exactly where you want |
| **Email-Safe Output** | Table-based layouts and inline styles that work everywhere |
| **Live Preview** | See exactly what recipients will see before sending |

---

### How It Works (The Simple Version)

1. **Upload** - Drop your Markdown or Word document into the wizard
2. **Style** - Pick a template that matches your brand
3. **Add Action** - Configure your call-to-action button (optional)
4. **Apply** - Preview and send to your mailing in one click

**That's it.** No HTML editing. No broken formatting. Just results.

---

### Real Results

| Before | After |
|--------|-------|
| 30-60 minutes formatting each email | Under 2 minutes with the wizard |
| Broken tables in Outlook | Email-safe tables that render perfectly |
| Manual CTA button coding | Click, configure, done |
| "It looked different in preview" | WYSIWYG preview matches delivery |

---

### Who Is This For?

**Mass Mailing Document Import is perfect for:**

- Marketing teams who write content in Word or Markdown
- Newsletter creators tired of copy-paste formatting nightmares
- Anyone who wants professional emails without HTML knowledge

**This probably isn't for you if:**

- You enjoy hand-coding HTML email templates (we respect that)
- You don't use Odoo's Mass Mailing app
- Your content is already in Odoo's email builder

---

### Part of the SAM AI Ecosystem

Mass Mailing Document Import works standalone but shines with the SAM AI family:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **mass_mailing** | Odoo's email marketing core | Required - we extend it |
| **samai_python_dependencies** | Centralized Python library management | Handles markdown & python-docx |
| **mass_mailing_document_import** | **Document to email conversion** | **You are here** |
| **ai_sam_email_marketing** | AI-powered email optimization | Complementary - enhance your imported content |

**Together, they transform your content workflow.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** mass_mailing, web_editor, samai_python_dependencies
- **Python Libraries:** markdown, python-docx
- **Installation:** Via Odoo Apps menu
- **Documentation:** [Full technical docs](./mass_mailing_document_import_SCHEMA.md)

**Supported Formats:**
- Markdown (.md, .markdown) with tables, code blocks, lists
- Microsoft Word (.docx) with headings, formatting, tables
- Note: Legacy .doc format not supported

**Email Template Features:**
- Table-based layouts for maximum compatibility
- Inline CSS (email clients strip `<style>` tags)
- Mobile-responsive design
- Outlook-specific MSO tags included

</details>

---

### Frequently Asked Questions

**Q: How long does it take to import a document?**
A: Usually under 2 minutes from upload to applied mailing.

**Q: Do I need technical skills?**
A: No. The wizard guides you through each step visually.

**Q: What if my document has images?**
A: Text formatting and structure are preserved. For images in Word docs, we currently extract text content only (image support planned for future releases).

**Q: Can I customize the templates?**
A: The 4 built-in templates cover most needs. For custom templates, developers can add new ones via module extension.

---

### Ready to Transform Your Email Workflow?

Open any Mass Mailing in draft state and click the "Import Document" button. That's all it takes.

---

*Mass Mailing Document Import - Part of SAM AI by SME.ec*
*Version 18.0.1.0.0 | Odoo 18 Compatible | LGPL-3 License*
