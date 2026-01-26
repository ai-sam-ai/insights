# Schema: tls_biz

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `tls_biz` |
| **Version** | 18.0.0.0 |
| **Total Models** | 3 (0 new, 3 inherit) |
| **Total Controllers** | 0 |
| **Views** | 3 |

---

## Models

### crm.lead (Inherited)

**Purpose:** Adds Google Drive folder link and payment term to CRM leads

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `google_folder` | Char | No | Client/Supplier Google Drive folder path/URL |
| `payment_term` | Many2one | No | Payment term (links to account.payment.term) |

---

### res.partner (Inherited)

**Purpose:** Adds Google Drive folder and Google Maps links to contacts

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `google_folder` | Char | No | Client/Supplier Google Drive folder path/URL |
| `google_map` | Char | No | Google Maps URL for location |

---

### project.project (Inherited)

**Purpose:** Adds Google Drive folder link to projects

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `google_folder` | Char | No | Client/Supplier Google Drive folder path/URL |

---

## Views

### CRM Lead Form (google_folder_crm_case_form_view_leads_custom)

**Inherits:** `crm.crm_lead_view_form`
**Position:** After `phone` field

**Added Elements:**
- Label "Client/Supplier Folder" with hardcoded path prefix
- `google_folder` field with URL widget (inline)
- `payment_term` field

**Note:** Includes static text showing the Google Drive path structure:
"This PC/Google Drive (G:)/Shared drives/Sales, and Operations/Total Lifting Solutions/"

---

### Partner Form (google_folder_view_partner_form_custom)

**Inherits:** `base.view_partner_form`
**Position:** After `vat` field

**Added Elements:**
- `google_folder` field with URL widget
- `google_map` field with URL widget

---

### Project Form (google_folder_project_form_view)

**Inherits:** `project.edit_project`
**Position:** After `partner_id` field

**Added Elements:**
- `google_folder` field with URL widget

---

## Security Rules

No custom security rules. Uses inherited permissions from:
- `crm` module for leads
- `base` module for partners
- `project` module for projects

---

## Data Flow Diagram

```
┌─────────────────────────────────────┐
│           crm.lead                  │
│                                     │
│  google_folder ─────────────────────┼──► Google Drive URL
│  payment_term ──────────────────────┼──► account.payment.term
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          res.partner                │
│                                     │
│  google_folder ─────────────────────┼──► Google Drive URL
│  google_map ────────────────────────┼──► Google Maps URL
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        project.project              │
│                                     │
│  google_folder ─────────────────────┼──► Google Drive URL
└─────────────────────────────────────┘
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `crm_lead` | `crm.lead` | Extended with google_folder, payment_term |
| `res_partner` | `res.partner` | Extended with google_folder, google_map |
| `project_project` | `project.project` | Extended with google_folder |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
