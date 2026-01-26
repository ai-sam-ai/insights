# Schema: ai_invoice_processor

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_invoice_processor` |
| **Version** | 18.0.1.0.1 |
| **Total Models** | 4 regular + 1 transient inherit |
| **Standalone Classes** | 1 (EmailInvoiceMonitor - not an Odoo model) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses scheduled actions) |
| **Note** | Security file has 2 orphan rules for non-existent models |

---

## Models

### ai.invoice.config (Primary Model)

**Purpose:** Stores configuration for AI invoice processing including OpenAI API settings, email server credentials, and processing preferences.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Configuration name |
| `active` | Boolean | No | Enable/disable this config |
| `openai_api_key` | Char | Yes | OpenAI API key for GPT-4 Vision |
| `openai_model` | Selection | Yes | Model: gpt-4o, gpt-4-vision-preview, gpt-4 |
| `max_tokens` | Integer | No | Maximum tokens for AI response (default: 2000) |
| `temperature` | Float | No | AI creativity 0.0-1.0 (default: 0.1) |
| `openai_timeout` | Integer | No | API timeout in seconds (default: 60) |
| `email_server` | Char | Yes | IMAP server address (default: imap.gmail.com) |
| `email_port` | Integer | No | IMAP port (default: 993) |
| `email_username` | Char | Yes | Email login username |
| `email_password` | Char | Yes | Email password/app password |
| `email_folder` | Char | No | Folder to monitor (default: INBOX) |
| `email_processed_folder` | Char | No | Move processed emails here |
| `use_ssl` | Boolean | No | Use SSL connection (default: True) |
| `auto_process` | Boolean | No | Enable automatic processing |
| `confidence_threshold` | Float | No | Minimum confidence score (0-1, default: 0.8) |
| `check_interval` | Integer | No | Check interval in minutes (default: 15) |
| `max_daily_api_calls` | Integer | No | Daily API call limit (default: 1000) |
| `default_expense_account_id` | Many2one | No | Default expense account |
| `default_currency_id` | Many2one | No | Default currency |
| `auto_create_suppliers` | Boolean | No | Auto-create new suppliers (default: True) |
| `auto_validate_invoices` | Boolean | No | Auto-validate invoices (default: False) |
| `attach_original_pdf` | Boolean | No | Attach PDF to invoice (default: True) |
| `extract_line_items` | Boolean | No | Extract individual line items (default: True) |
| `min_line_items` | Integer | No | Minimum line items required (default: 1) |
| `require_vat_number` | Boolean | No | Require VAT number extraction |
| `fallback_to_ocr` | Boolean | No | Use OCR if AI fails (default: True) |
| `email_filter_keywords` | Text | No | Keywords to filter emails |
| `excluded_senders` | Text | No | Email addresses to exclude |
| `custom_ai_prompt` | Text | No | Custom instructions for AI |
| `total_processed` | Integer | No | Statistics: total processed (readonly) |
| `successful_extractions` | Integer | No | Statistics: successful (readonly) |
| `failed_extractions` | Integer | No | Statistics: failed (readonly) |
| `total_api_cost` | Float | No | Total API cost in $ (readonly) |
| `last_processing_date` | Datetime | No | Last processing timestamp (readonly) |
| `processing_log_ids` | One2many | No | Related processing logs |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `test_openai_connection()` | Test OpenAI API connectivity | Notification action |
| `test_email_connection()` | Test IMAP email connection | Notification action |
| `update_statistics()` | Update processing stats | None |
| `get_active_config()` | Get first active config | ai.invoice.config record |
| `cron_reset_daily_stats()` | Reset daily counters, cleanup old logs | None |
| `cron_health_check()` | Check API and config health | None |

**Relationships:**
- `default_expense_account_id` → `account.account` (Many2one)
- `default_currency_id` → `res.currency` (Many2one)
- `processing_log_ids` → `ai.processing.log` (One2many)

---

### ai.processing.log

**Purpose:** Tracks each invoice processing attempt with status, extracted data, errors, and created records.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `config_id` | Many2one | Yes | Parent configuration |
| `email_subject` | Char | No | Email subject line |
| `email_sender` | Char | No | Sender email address |
| `pdf_filename` | Char | No | PDF attachment filename |
| `received_date` | Datetime | No | Email received date |
| `status` | Selection | No | processing / success / failed |
| `supplier_name` | Char | No | Extracted supplier name |
| `invoice_number` | Char | No | Extracted invoice number |
| `invoice_total` | Float | No | Extracted total amount |
| `processing_time` | Float | No | Processing duration in seconds |
| `api_cost` | Float | No | API cost for this extraction |
| `confidence_score` | Float | No | AI confidence score |
| `extracted_data` | Text | No | Raw JSON extracted data |
| `error_message` | Text | No | Error details if failed |
| `created_invoice_id` | Many2one | No | Created Odoo invoice |
| `supplier_id` | Many2one | No | Matched/created supplier |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `reprocess_invoice()` | Retry failed extraction | Notification action |

**Relationships:**
- `config_id` → `ai.invoice.config` (Many2one)
- `created_invoice_id` → `account.move` (Many2one)
- `supplier_id` → `res.partner` (Many2one)

---

### invoice.extractor

**Purpose:** AI-powered invoice data extraction engine using GPT-4 Vision. Handles universal extraction without supplier-specific templates.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (no stored fields) | - | - | Utility model with methods only |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `extract_invoice_data(pdf_content, supplier_id)` | Universal AI extraction | dict of invoice data |
| `create_supplier_invoice(extracted_data, pdf_attachment)` | Create Odoo invoice | account.move record |
| `_extract_with_gpt4_vision()` | GPT-4 Vision extraction | dict or None |
| `_extract_with_ocr_llm()` | Fallback OCR + LLM | dict or None |
| `_pdf_to_image()` | Convert PDF to base64 image | string |
| `_build_universal_prompt()` | Generate AI extraction prompt | string |
| `_standardize_extracted_data()` | Normalize extracted data | dict |
| `_find_or_create_supplier()` | Match or create partner | res.partner record |

---

### supplier.invoice.processor

**Purpose:** Main orchestrator that ties email monitoring and invoice creation together. Called by scheduled actions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (no stored fields) | - | - | Utility model with methods only |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `process_email_invoices()` | Main processing loop (called by cron) | None |
| `cron_manual_test()` | Manual test runner | bool |
| `_fetch_invoice_emails()` | Get emails with PDF attachments | list of dicts |

---

## Scheduled Actions (Cron Jobs)

| Name | Model | Method | Interval | Active |
|------|-------|--------|----------|--------|
| AI Invoice Email Monitor | supplier.invoice.processor | process_email_invoices() | 15 minutes | Yes |
| AI Invoice Daily Stats Reset | ai.invoice.config | cron_reset_daily_stats() | 1 day | Yes |
| AI Invoice System Health Check | ai.invoice.config | cron_health_check() | 1 hour | No |
| AI Invoice Manual Test | supplier.invoice.processor | cron_manual_test() | 1 day | No |

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│   ai.invoice.config         │
│                             │
│  - name                     │
│  - openai_api_key           │
│  - email_server/credentials │
│  - processing settings      │
│  - statistics               │
└──────────┬──────────────────┘
           │
           │ One2many (processing_log_ids)
           ▼
┌─────────────────────────────┐
│   ai.processing.log         │
│                             │
│  - config_id (M2O)          │◄────────────────┐
│  - email_subject            │                 │
│  - status                   │                 │
│  - extracted_data (JSON)    │                 │
│  - error_message            │                 │
└──────────┬──────────────────┘                 │
           │                                    │
           │ Many2one                           │
           ▼                                    │
┌─────────────────────────────┐    ┌───────────┴───────┐
│   account.move              │    │   res.partner     │
│   (Odoo Invoice)            │    │   (Supplier)      │
│                             │    │                   │
│  - created_invoice_id       │    │  - supplier_id    │
└─────────────────────────────┘    └───────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.invoice.config` | account.group_account_user | Yes | No | No | No |
| `ai.invoice.config` | account.group_account_manager | Yes | Yes | Yes | Yes |
| `ai.invoice.config` | base.group_system | Yes | Yes | Yes | Yes |
| `ai.processing.log` | account.group_account_user | Yes | No | No | No |
| `ai.processing.log` | account.group_account_manager | Yes | Yes | Yes | Yes |
| `ai.processing.log` | base.group_system | Yes | Yes | Yes | Yes |
| `invoice.extractor` | base.group_system | Yes | Yes | Yes | Yes |
| `supplier.invoice.processor` | base.group_system | Yes | Yes | Yes | Yes |
| `invoice.ai.processor` | base.group_system | Yes | Yes | Yes | Yes |
| `ai.configuration` | base.group_system | Yes | Yes | Yes | Yes |

---

### res.config.settings (Transient - Inherits)

**Purpose:** Adds quick setup fields to Odoo Settings for AI Invoice configuration.

**File:** `models/ai_invoice_config.py`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ai_invoice_openai_key` | Char | No | Quick setup: OpenAI API Key |
| `ai_invoice_email` | Char | No | Quick setup: Invoice email address |
| `ai_invoice_email_password` | Char | No | Quick setup: Email password |
| `ai_invoice_auto_process` | Boolean | No | Quick setup: Enable auto processing |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_values()` | Load values from active ai.invoice.config | dict |
| `set_values()` | Save values to ai.invoice.config (creates if needed) | None |

---

### EmailInvoiceMonitor (Standalone Python Class - NOT an Odoo Model)

**Purpose:** Standalone email monitoring daemon that runs outside Odoo's ORM. Monitors inbox and creates invoices via XML-RPC.

**File:** `models/email_monitor_processor.py`

| Method | Purpose | Returns |
|--------|---------|---------|
| `__init__(config)` | Initialize with config dict | None |
| `monitor_inbox()` | Main loop - monitors inbox continuously | Never (loops forever) |
| `_process_new_emails()` | Check and process new emails | None |
| `_process_single_email()` | Process one email message | None |
| `_extract_invoice_data()` | Extract via GPT-4 Vision | dict or None |
| `_create_odoo_invoice()` | Create invoice via XML-RPC | invoice_id or None |
| `_find_or_create_supplier()` | Find/create partner via XML-RPC | partner_id or None |
| `_pdf_to_image()` | Convert PDF to base64 JPEG | string or None |

**Usage:** Run as standalone script or import the class.

---

### Orphan Security Rules (Models Don't Exist)

The following models are defined in `ir.model.access.csv` but **do not exist in the codebase**:

| Model | Status | Recommendation |
|-------|--------|----------------|
| `invoice.ai.processor` | Orphan - no code | Remove from security file |
| `ai.configuration` | Orphan - no code | Remove from security file |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `ai_invoice_config` | `ai.invoice.config` | Configuration storage |
| `ai_processing_log` | `ai.processing.log` | Processing history |

---

## External API Integration

### OpenAI GPT-4 Vision API

**Endpoint:** `https://api.openai.com/v1/chat/completions`

**Request:**
```json
{
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "<extraction prompt>"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:image/jpeg;base64,<image_data>"
                    }
                }
            ]
        }
    ],
    "max_tokens": 2000,
    "temperature": 0.1
}
```

**Response (extracted data):**
```json
{
    "vendor_name": "ACME Corp",
    "vendor_vat": "US123456789",
    "invoice_number": "INV-2025-001",
    "invoice_date": "2025-01-15",
    "due_date": "2025-02-15",
    "currency": "USD",
    "total_amount": 1500.00,
    "total_untaxed": 1250.00,
    "total_tax": 250.00,
    "line_items": [
        {
            "description": "Consulting Services",
            "quantity": 10,
            "unit_price": 125.00,
            "total": 1250.00
        }
    ]
}
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
| 2025-01-26 | Corrected model count, documented res.config.settings inherit, EmailInvoiceMonitor standalone class, identified orphan security rules | CTO Module Docs Review Agent (10/10) |
