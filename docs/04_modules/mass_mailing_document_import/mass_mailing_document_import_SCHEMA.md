# Schema: mass_mailing_document_import

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `mass_mailing_document_import` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 3 (1 regular, 1 abstract, 1 inherited) |
| **Total Wizards** | 1 (TransientModel) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses Odoo's standard ORM) |

---

## Models

### mailing.cta.template (Regular Model)

**Purpose:** Stores call-to-action button templates with pre-defined styles and sizes for use in mass mailings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Template display name (translatable) |
| `sequence` | Integer | No | Order in selection lists (default: 10) |
| `active` | Boolean | No | Archive toggle (default: True) |
| `button_style` | Selection | Yes | Style: primary/secondary/success/warning/danger/info |
| `button_size` | Selection | Yes | Size: small/medium/large |
| `html_template` | Html | No | Custom HTML template with {button_text}, {button_url} placeholders |
| `preview_image` | Binary | No | Preview thumbnail (attachment) |

**Selection Options:**

`button_style`:
- `primary` - Primary (Bold) - Purple: #875A7B
- `secondary` - Secondary (Outline) - White with purple border
- `success` - Success (Green) - #28a745
- `warning` - Warning (Orange) - #fd7e14
- `danger` - Urgent (Red) - #dc3545
- `info` - Info (Blue) - #17a2b8

`button_size`:
- `small` - 8px/16px padding, 14px font
- `medium` - 12px/24px padding, 16px font
- `large` - 16px/32px padding, 18px font

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_get_button_html(button_text, button_url, style, size)` | Generate email-safe button HTML | HTML string |

---

### mailing.document.converter (Abstract Model)

**Purpose:** Provides document-to-HTML conversion utilities for Markdown and Word documents.

**No stored fields** - Abstract utility model

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `convert_to_html(file_content, filename)` | Main conversion entry point | dict: {html, success, error} |
| `_convert_markdown(raw_content)` | Convert Markdown bytes to HTML | dict: {html, success, error} |
| `_convert_docx(raw_content)` | Convert Word document bytes to HTML | dict: {html, success, error} |
| `_apply_email_styles(html_content)` | Apply inline CSS for email clients | HTML string |
| `wrap_in_email_template(content_html, template_html)` | Wrap content in email structure | HTML string |
| `_process_paragraph_runs(para)` | Process Word paragraph formatting | HTML string |
| `_process_docx_table(table)` | Convert Word table to HTML table | HTML string |
| `_escape_html(text)` | Escape HTML special characters | string |

**Supported File Formats:**
- `.md`, `.markdown` - Markdown files
- `.docx` - Microsoft Word 2007+ documents
- `.doc` - **NOT supported** (returns error with instructions)

**Markdown Extensions Used:**
- `markdown.extensions.tables` - Table support
- `markdown.extensions.fenced_code` - Code blocks
- `markdown.extensions.nl2br` - Newline to `<br>`
- `markdown.extensions.sane_lists` - Improved list handling

---

### mailing.mailing (Inherited Model)

**Purpose:** Extends the core mass mailing model to add document import action button.

**Inherits:** `mailing.mailing`

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_import_from_document()` | Open document import wizard | ir.actions.act_window |

**View Extension:**
- Adds "Import Document" button to mailing form header
- Button visible only in `draft` state
- Uses icon `fa-file-text-o`

---

## Wizards

### mailing.document.import.wizard (TransientModel)

**Purpose:** Multi-step wizard for importing documents into mass mailings with template selection and CTA configuration.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `step` | Selection | Yes | Current wizard step |
| `mass_mailing_id` | Many2one | Yes | Target mailing record |
| `document_file` | Binary | No | Uploaded document content |
| `document_filename` | Char | No | Original filename |
| `extracted_html` | Html | No | Converted HTML content |
| `use_template` | Boolean | No | Apply email template (default: True) |
| `template_selection` | Selection | No | Template style choice |
| `favorite_template_id` | Many2one | No | Saved template reference |
| `include_cta` | Boolean | No | Add CTA button (default: True) |
| `cta_text` | Char | No | Button text (default: "Learn More") |
| `cta_url` | Char | No | Button destination URL |
| `cta_style` | Selection | No | Button style (default: primary) |
| `cta_size` | Selection | No | Button size (default: medium) |
| `cta_position` | Selection | No | before/after content (default: after) |
| `preview_html` | Html | Computed | Final preview |
| `step_number` | Integer | Computed | Step 1-4 |
| `progress_percent` | Integer | Computed | Progress percentage |
| `can_go_next` | Boolean | Computed | Validation for next step |

**Wizard Steps:**

| Step | Value | Description | Validation |
|------|-------|-------------|------------|
| 1 | `upload` | Upload MD or DOCX file | document_file required |
| 2 | `template` | Select email template style | extracted_html exists |
| 3 | `cta` | Configure call-to-action | CTA fields if include_cta |
| 4 | `preview` | Review and apply | Always valid |

**Selection Options:**

`template_selection`:
- `basic` - Basic - Clean & Simple
- `modern` - Modern - Professional (with gradient header)
- `colorful` - Colorful - Eye-catching (purple gradient background)
- `minimal` - Minimal - Text-focused (serif font)

`cta_position`:
- `after` - After Content (default)
- `before` - Before Content

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_next()` | Advance to next step | ir.actions.act_window |
| `action_back()` | Return to previous step | ir.actions.act_window |
| `action_apply()` | Apply content to mailing | ir.actions.client (notification) |
| `action_cancel()` | Close wizard | ir.actions.act_window_close |
| `_process_upload()` | Convert uploaded document | ir.actions.act_window |
| `_generate_cta_html()` | Build CTA button HTML | HTML string |
| `_apply_template(content)` | Wrap content in template | HTML string |
| `_get_basic_template()` | Basic email template | HTML string |
| `_get_modern_template()` | Modern email template | HTML string |
| `_get_colorful_template()` | Colorful email template | HTML string |
| `_get_minimal_template()` | Minimal email template | HTML string |
| `_reopen_wizard()` | Refresh wizard view | ir.actions.act_window |

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│     mailing.mailing         │
│     (mass_mailing)          │
│                             │
│  - body_arch (updated)      │
│  - body_html (updated)      │
│  - state                    │
└──────────────┬──────────────┘
               │
               │ Opens wizard (action)
               ▼
┌─────────────────────────────┐
│ mailing.document.import     │
│        .wizard              │
│                             │
│  - mass_mailing_id (M2O) ◄──┤
│  - document_file            │
│  - extracted_html           │
│  - template_selection       │
│  - cta_* fields             │
│  - preview_html (computed)  │
└──────────────┬──────────────┘
               │
               │ Uses for CTA
               ▼
┌─────────────────────────────┐
│   mailing.cta.template      │
│                             │
│  - name                     │
│  - button_style             │
│  - button_size              │
│  - html_template            │
└──────────────┬──────────────┘
               │
               │ Conversion utility
               ▼
┌─────────────────────────────┐
│ mailing.document.converter  │
│      (Abstract Model)       │
│                             │
│  - convert_to_html()        │
│  - _convert_markdown()      │
│  - _convert_docx()          │
│  - _apply_email_styles()    │
└─────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `mailing.document.import.wizard` | mass_mailing.group_mass_mailing_user | Yes | Yes | Yes | Yes |
| `mailing.cta.template` | mass_mailing.group_mass_mailing_user | Yes | No | No | No |
| `mailing.cta.template` | base.group_system | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `mailing_cta_template` | `mailing.cta.template` | Stores CTA button style configurations |
| (TransientModel) | `mailing.document.import.wizard` | Temporary wizard data (auto-cleaned) |
| (Abstract) | `mailing.document.converter` | No table - utility methods only |

---

## Pre-defined Data Records

| XML ID | Model | Name | Style | Size |
|--------|-------|------|-------|------|
| `cta_template_primary` | mailing.cta.template | Primary Button | primary | medium |
| `cta_template_secondary` | mailing.cta.template | Secondary Button | secondary | medium |
| `cta_template_success` | mailing.cta.template | Success Button | success | medium |
| `cta_template_warning` | mailing.cta.template | Warning Button | warning | medium |
| `cta_template_danger` | mailing.cta.template | Urgent Button | danger | large |
| `cta_template_info` | mailing.cta.template | Info Button | info | medium |

---

## Views

| XML ID | Type | Model | Description |
|--------|------|-------|-------------|
| `view_mailing_document_import_wizard_form` | form | mailing.document.import.wizard | Multi-step wizard with progress bar |
| `view_mailing_mailing_form_inherit_document_import` | form (inherit) | mailing.mailing | Adds Import Document button |
| `view_mailing_mailing_form_inherit_document_import_2` | form (inherit) | mailing.mailing | Alternate form extension |

---

## Actions

| XML ID | Type | Target | Description |
|--------|------|--------|-------------|
| `action_mailing_document_import_wizard` | ir.actions.act_window | new (modal) | Open document import wizard |

---

## Assets

| Bundle | File | Purpose |
|--------|------|---------|
| `web.assets_backend` | `static/src/scss/document_import.scss` | Wizard styling |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | Claude Agent |
