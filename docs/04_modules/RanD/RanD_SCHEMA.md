# Schema: RanD

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `RanD` |
| **Version** | 18.0.0.0 |
| **Total Models** | 1 (inherits project.project) |
| **Total Controllers** | 1 |
| **API Endpoints** | 1 |

---

## Models

### project.project (Inherited)

**Purpose:** Adds R&D project flag

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `x_RandD` | Boolean | No | Mark project as R&D project |

---

## Controllers / API Endpoints

### ExcelProjectExportView

**Route:** `/web/exportProject/xls_view`
**Method:** HTTP GET
**Auth:** User (logged in required)
**CSRF:** Disabled

**Purpose:** Exports R&D projects to Excel XLS format

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `data` | JSON string | Contains model, headers, rows |
| `token` | string | Optional file download token |

**Response:** Excel file download (.xls)

**Export Logic:**
1. Searches all projects where `x_RandD = True`
2. For each project, exports:
   - Project name, create date, job_custom
   - Purchases Bills section with totals
   - Purchases section with vendor info
   - Invoices section with dates and amounts

---

## Frontend Components

### ListController Patch

**File:** `static/src/js/web_export_view.js`

**Purpose:** Adds R&D export button to project list view

| Property/Method | Purpose |
|-----------------|---------|
| `isRandDExportAvailable` | Returns true only for project.project model |
| `onRandDExportXls(ev)` | Triggers download of R&D projects export |

**Template:** `static/src/xml/web_export_view_template.xml`

---

## Excel Export Structure

**Sheet Name:** "Sheet 1"

**Columns:**
| Column | Content |
|--------|---------|
| A | Section labels (Total, etc.) |
| B | Project Name / Name / Ref |
| C | Create Date / Total / Vendor |
| D | Job Custom / Amount Due / Total |

**Sections per Project:**
1. **Project Header** (green background)
   - Name, Create Date, Job Custom
2. **Purchases Bills** (yellow header, brown columns)
   - Name, Total, Amount Due
3. **Purchases** (yellow header, brown columns)
   - Ref, Vendor, Total
4. **Invoices** (yellow header, brown columns)
   - Invoice, Invoice Date, Total, Amount Due

**Styling:**
- `style_green` - Project header row
- `style_yellow` - Section headers
- `style_brown` - Column headers
- `base_style` - Data rows
- `base_style_bold` - Totals

---

## Data Dependencies

The export references fields that may require additional modules:

| Field | Model | Notes |
|-------|-------|-------|
| `account_vendor_id1` | project.project | Custom field - vendor bills |
| `account_inv_id1` | project.project | Custom field - invoices |
| `purchase_project_ids` | project.project | Custom field - purchases |
| `job_custom` | project.project | Custom field |

If these fields don't exist, export gracefully handles with empty values.

---

## Security Rules

No custom security rules. Uses inherited project.project permissions.

Controller requires authenticated user (`auth="user"`).

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `project_project` | `project.project` | Extended with x_RandD boolean |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
