# Schema: sam_ai_accounts

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_accounts` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 4 (4 regular, 0 transient, 0 abstract) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses Odoo RPC) |

---

## Models

### sam.invoice.section (Invoice Section Definition)

**Purpose:** Maps customizable sections of the standard Odoo invoice template. Pre-populated via XML data files with XPath expressions targeting specific parts of `account.report_invoice_document`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name (translatable) |
| `technical_name` | Char | Yes | Unique identifier used in code |
| `sequence` | Integer | No | Display order (default: 10) |
| `description` | Text | No | What this section contains (translatable) |
| `xpath_target` | Char | No | XPath expression to locate in template |
| `parent_section_id` | Many2one | No | Parent section for nesting |
| `section_type` | Selection | No | container/block/table/column/field |
| `is_optional` | Boolean | No | Can be hidden entirely (default: False) |
| `is_moveable` | Boolean | No | Can be repositioned (default: False) |
| `is_styleable` | Boolean | No | Can apply styling (default: True) |
| `default_visible` | Boolean | No | Visible by default (default: True) |
| `model_field` | Char | No | Related account.move field |
| `child_ids` | One2many | No | Child sections (inverse of parent_section_id) |

**SQL Constraints:**
- `unique_technical_name` - UNIQUE(technical_name)

**Pre-populated Sections (data/invoice_sections.xml):**
- `header` - Main page container
- `addresses` - Customer address block
- `shipping_address`, `billing_address` - Address variants
- `document_title` - Invoice/Credit Note title
- `informations` - Invoice date, due date, reference
- `line_items` - Product/service table
- `col_description`, `col_quantity`, `col_price`, `col_discount`, `col_taxes`, `col_subtotal` - Table columns
- `tax_totals` - Subtotal, taxes, grand total
- `payment_terms` - Payment conditions
- `qr_code` - Payment QR code
- `notes` - Terms and conditions

---

### sam.invoice.section.field (Invoice Section Field)

**Purpose:** Fields available within invoice sections for customization. Maps to actual account.move fields and computed values.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `section_id` | Many2one | Yes | Parent section (cascade delete) |
| `name` | Char | Yes | Display name (translatable) |
| `technical_name` | Char | Yes | Field path on account.move |
| `sequence` | Integer | No | Display order (default: 10) |
| `field_type` | Selection | No | char/text/date/datetime/monetary/float/integer/boolean/many2one/html/binary |
| `widget` | Char | No | QWeb widget to use |
| `format_string` | Char | No | Python format or date format |
| `default_visible` | Boolean | No | Visible by default (default: True) |
| `default_css_class` | Char | No | Default CSS class |

---

### sam.invoice.template (Custom Invoice Template)

**Purpose:** Stores customizations to the standard Odoo invoice template. Each record represents a complete template configuration that generates an inherited QWeb view.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Template name (tracked) |
| `description` | Text | No | Optional description |
| `company_id` | Many2one | Yes | Associated company (default: current) |
| `is_default` | Boolean | No | Use for all invoices in company (tracked) |
| `is_active` | Boolean | No | Active status (default: True, tracked) |
| `customization_ids` | One2many | No | Template customizations (copied on duplicate) |
| `inherited_view_id` | Many2one | No | Generated ir.ui.view (readonly) |
| `state` | Selection | No | draft/applied/error (tracked) |
| `error_message` | Text | No | Error details (readonly) |
| `last_applied` | Datetime | No | Last successful apply (readonly) |

**SQL Constraints:**
- `unique_default_per_company` - EXCLUDE (company_id WITH =) WHERE (is_default = true)

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_apply_template()` | Generate and apply inherited QWeb view | Notification action |
| `action_revert_template()` | Remove inherited view, reset to standard | Notification action |
| `action_preview_invoice()` | Preview with sample invoice PDF | Report action |
| `action_open_visual_editor()` | Open drag-and-drop customizer | Client action |
| `action_export_xml()` | Export as XML file for backup | URL action (download) |
| `_build_inherited_arch()` | Build XML arch from customizations | XML string or None |
| `_get_invoice_template_base_view()` | Find correct base view (handles l10n) | ir.ui.view record |
| `get_default_template(company_id)` | Get default template for company | sam.invoice.template or empty |

**Relationships:**
- `company_id` -> `res.company` (Many2one)
- `customization_ids` -> `sam.invoice.template.customization` (One2many)
- `inherited_view_id` -> `ir.ui.view` (Many2one)

**Inherits:**
- `mail.thread` - Chatter tracking
- `mail.activity.mixin` - Activity scheduling

---

### sam.invoice.template.customization (Individual Customization)

**Purpose:** Represents a single XPath modification to the invoice template. Multiple customizations combine to form a complete template.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `template_id` | Many2one | Yes | Parent template (cascade delete) |
| `sequence` | Integer | No | Application order (default: 10) |
| `section_id` | Many2one | No | Invoice section being customized |
| `customization_type` | Selection | Yes | hide/show/style/content/move/add_before/add_after/replace/add_attribute |
| `xpath_expr` | Char | No | XPath expression (auto-filled from section) |
| `position` | Selection | No | inside/before/after/replace/attributes |
| `css_class` | Char | No | CSS classes to add |
| `css_style` | Text | No | Inline CSS properties |
| `content_html` | Html | No | HTML content to insert |
| `content_qweb` | Text | No | QWeb template content (advanced) |
| `condition` | Char | No | Python expression for conditional display |
| `preview_text` | Char | No | Computed preview description |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_build_xpath_element()` | Generate XPath XML element | lxml.etree.Element or None |
| `_get_position()` | Map customization_type to XPath position | Position string |
| `_onchange_section_id()` | Auto-fill XPath from section | None |
| `_compute_preview_text()` | Generate human-readable description | None |

---

## Extended Models

### res.config.settings (Settings Extension)

**Purpose:** Add invoice customization options to Accounting settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoice_template_id` | Many2one | No | Current invoice template (related to company) |
| `has_invoice_template` | Boolean | No | Computed: template exists |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_customize_invoice()` | Open visual editor (creates template if needed) | Client action |
| `action_open_invoice_templates()` | Open template list | Window action |
| `action_preview_invoice_template()` | Preview current template | Report action |
| `action_reset_invoice_template()` | Revert to standard layout | Notification action |

---

### res.company (Company Extension)

**Purpose:** Store company-specific invoice template reference.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoice_template_id` | Many2one | No | Custom invoice PDF template |

---

## Data Relationships Diagram

```
┌─────────────────────────────────┐
│       res.company               │
│                                 │
│  - invoice_template_id (M2O) ───┼──────────┐
└─────────────────────────────────┘          │
                                             │
┌─────────────────────────────────┐          │
│    sam.invoice.template         │◄─────────┘
│                                 │
│  - name                         │
│  - company_id (M2O)             │
│  - is_default                   │
│  - state                        │
│  - inherited_view_id (M2O) ─────┼─────► ir.ui.view
│  - customization_ids (O2M) ─────┼──────────┐
└─────────────────────────────────┘          │
                                             │
┌─────────────────────────────────┐          │
│ sam.invoice.template.           │◄─────────┘
│     customization               │
│                                 │
│  - template_id (M2O)            │
│  - section_id (M2O) ────────────┼──────────┐
│  - customization_type           │          │
│  - xpath_expr                   │          │
│  - css_class / css_style        │          │
│  - content_html / content_qweb  │          │
└─────────────────────────────────┘          │
                                             │
┌─────────────────────────────────┐          │
│    sam.invoice.section          │◄─────────┘
│                                 │
│  - name                         │
│  - technical_name               │
│  - xpath_target                 │
│  - section_type                 │
│  - parent_section_id (M2O) ─────┼─── (self-referential)
│  - child_ids (O2M) ─────────────┼─── (inverse)
└──────────┬──────────────────────┘
           │
           │ One2many
           ▼
┌─────────────────────────────────┐
│  sam.invoice.section.field      │
│                                 │
│  - section_id (M2O)             │
│  - technical_name               │
│  - field_type                   │
│  - widget                       │
└─────────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `sam.invoice.section` | account.group_account_invoice | Yes | No | No | No |
| `sam.invoice.section` | account.group_account_manager | Yes | Yes | Yes | Yes |
| `sam.invoice.section.field` | account.group_account_invoice | Yes | No | No | No |
| `sam.invoice.section.field` | account.group_account_manager | Yes | Yes | Yes | Yes |
| `sam.invoice.template` | account.group_account_invoice | Yes | No | No | No |
| `sam.invoice.template` | account.group_account_manager | Yes | Yes | Yes | Yes |
| `sam.invoice.template.customization` | account.group_account_invoice | Yes | No | No | No |
| `sam.invoice.template.customization` | account.group_account_manager | Yes | Yes | Yes | Yes |

**Access Summary:**
- **Invoice Users** (group_account_invoice): Read-only access to all models
- **Account Managers** (group_account_manager): Full CRUD access

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `sam_invoice_section` | `sam.invoice.section` | Invoice section definitions |
| `sam_invoice_section_field` | `sam.invoice.section.field` | Section field mappings |
| `sam_invoice_template` | `sam.invoice.template` | Custom invoice templates |
| `sam_invoice_template_customization` | `sam.invoice.template.customization` | Individual customizations |

---

## Views Defined

| View ID | Model | Type | Purpose |
|---------|-------|------|---------|
| `view_invoice_template_list` | sam.invoice.template | list | Template list with status badges |
| `view_invoice_template_form` | sam.invoice.template | form | Template editing with customizations |
| `view_invoice_template_search` | sam.invoice.template | search | Filter by active/default/applied |
| `view_invoice_section_list` | sam.invoice.section | list | Section list with sequence handle |
| `view_invoice_customization_list` | sam.invoice.template.customization | list | Customization list |
| `view_invoice_customization_form` | sam.invoice.template.customization | form | Customization editing with tabs |
| `view_account_config_settings_invoice_template` | res.config.settings | form | Settings panel extension |

---

## Client Actions

| Action ID | Tag | Purpose |
|-----------|-----|---------|
| `action_invoice_customizer` | `sam_invoice_customizer` | Visual drag-and-drop editor |

---

## Menu Items

| Menu ID | Name | Parent | Access Group |
|---------|------|--------|--------------|
| `menu_invoice_customization` | Invoice Templates | account.menu_finance_configuration | account.group_account_manager |
| `menu_invoice_sections` | Invoice Sections | account.menu_finance_configuration | base.group_system |

---

## Assets

### web.assets_backend

| File | Purpose |
|------|---------|
| `static/src/scss/invoice_customizer.scss` | Visual editor styling |
| `static/src/js/invoice_customizer.js` | Drag-and-drop editor logic |
| `static/src/xml/invoice_customizer.xml` | OWL component templates |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | Claude Code |
