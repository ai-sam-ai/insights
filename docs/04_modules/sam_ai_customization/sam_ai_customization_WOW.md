# SAM AI Customization Suite

## Customize Odoo Without Code

---

### The Problem You Know Too Well

Your team needs a field added to a form. Maybe the sales team wants to see "preferred contact method" on the partner view. Or finance needs an extra column in the invoice list.

Right now, that means: Find a developer. Explain what you want. Wait. Test. Deploy. Repeat for every tiny change.

**Customization shouldn't require a developer for every field.**

---

### What If Anyone Could Customize Views?

Imagine clicking a button in the navbar, seeing all available fields in a sidebar, and simply dragging one into exactly where you want it. No code. No deployment. Just drag, drop, preview, save.

Need a new field that doesn't exist? Create it right there. x_custom_field, done.

**That's View Customizer.**

---

### The WOW Factor - View Customizer

| What You Get | Why It Matters |
|--------------|----------------|
| **Drag-and-Drop Fields** | Add existing fields to any view in seconds |
| **Create Custom Fields** | Build x_* fields without technical knowledge |
| **Undo/Redo** | Make mistakes? Just undo. Experiment freely. |
| **Preview Before Apply** | See changes before they go live |
| **Export as XML** | Backup customizations, migrate between databases |
| **Three-Tier Security** | Users add fields, Managers create fields, Admins delete |

---

### How View Customizer Works

1. **Click the systray icon** - Opens the customization sidebar
2. **Browse available fields** - See every field on the model
3. **Drag into position** - Drop after, before, or inside any element
4. **Preview changes** - See exactly what it will look like
5. **Apply when ready** - One click makes it live

**That's it.** No XML. No inheritance views. No module updates.

---

### The Second WOW Factor - Report Builder

But wait, there's more. What about PDF reports?

Invoice layouts. Quote designs. Custom reports for management. Usually these require:
- QWeb template knowledge
- XML editing
- wkhtmltopdf debugging
- Multiple deploy cycles

**Report Builder changes everything.**

---

### Visual Report Design

| What You Get | Why It Matters |
|--------------|----------------|
| **Drag-and-Drop Canvas** | Position elements visually on the page |
| **Dynamic Fields** | Pull data from any model field |
| **Tables for Line Items** | Invoice lines, order lines - automatic iteration |
| **Images & Logos** | Company logo, product images, static graphics |
| **Barcodes & QR Codes** | Code128, EAN13, QR - just pick the field |
| **Page Numbers** | Automatic page x of y |
| **Style Presets** | Consistent look across reports |

---

### How Report Builder Works

1. **Create a new template** - Name it, pick the target model
2. **Open Visual Builder** - Full-screen canvas editor
3. **Drag elements onto canvas** - Text, fields, images, tables
4. **Position and style** - Move, resize, color, border
5. **Generate Report** - Creates QWeb template automatically
6. **Preview with real data** - See actual PDF output

**QWeb generated for you.** Professional reports without template coding.

---

### Who Is This For?

**SAM AI Customization Suite is perfect for:**

- Business analysts who know what fields they need
- Managers who want quick view changes
- Finance teams needing custom invoice layouts
- Anyone tired of waiting for developers

**This probably isn't for you if:**

- You prefer writing XML by hand
- You enjoy debugging QWeb templates
- You think customization should be hard

---

### Real Example: Adding a Field

**Before SAM AI Customization:**
1. Create module directory
2. Write __manifest__.py
3. Create view inheritance XML
4. Write xpath expression
5. Test locally
6. Deploy to server
7. Upgrade module
8. Test again
9. Fix the typo in your xpath
10. Redeploy

**After SAM AI Customization:**
1. Click systray icon
2. Drag field to position
3. Click Apply

**Time saved: Hours become seconds.**

---

### Real Example: Custom Invoice Layout

**Before Report Builder:**
1. Find Odoo's invoice template
2. Understand QWeb syntax
3. Create inherited template
4. Position elements with CSS guesswork
5. Test PDF output
6. Adjust, redeploy, repeat
7. Debug wkhtmltopdf rendering

**After Report Builder:**
1. Create template, select account.move
2. Drag company logo to header
3. Add customer address field
4. Add invoice lines table
5. Position total fields
6. Click Generate
7. Preview PDF

**Designer-quality reports without designers.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0
- **Author:** SAM AI
- **License:** LGPL-3
- **Dependencies:** web, base, mail
- **Architecture:** Generates ir.ui.view (inherited) and ir.actions.report

**View Customizer generates:**
- XPath-based inherited views
- Validates expressions before apply
- Priority 99 ensures last-apply

**Report Builder generates:**
- QWeb templates with external_layout
- ir.actions.report for PDF output
- Supports all wkhtmltopdf features

**Documentation:** [Full technical docs](sam_ai_customization_SCHEMA.md)

</details>

---

*SAM AI Customization Suite - A SAM AI Module*
*Version 18.0.1.0.0 | Odoo 18 Compatible*
