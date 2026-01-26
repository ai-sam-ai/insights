# FAQ: RanD

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About R&D Project Export

### What is RanD?

RanD (Total Lifts Project) is a project management module that adds R&D project tracking and Excel export functionality for Odoo 18.

**Key facts:**
- Technical name: `RanD`
- Current version: 18.0.0.0
- Author: SME Business Solutions
- License: OPL-1

### What does RanD do?

RanD provides 2 capabilities:

1. **R&D Flag** - Adds "R and D Project" checkbox to projects
2. **Excel Export** - Exports R&D projects with financials to XLS

### Who is RanD for?

RanD is designed for:
- Companies tracking R&D projects separately
- Finance teams needing R&D financial reports
- Organizations claiming R&D tax credits

---

## Installation & Setup

### How do I install RanD?

1. Place module in Odoo addons folder
2. Navigate to Apps menu
3. Search for "Total lifts Project"
4. Click Install

### What are the dependencies for RanD?

RanD requires these Odoo modules:
- `project` - Project management
- `web` - Web client

### How do I configure RanD?

No configuration needed. After installation:
- "R and D Project" checkbox appears on project form
- Export button appears in project list view

---

## Usage

### How do I mark a project as R&D?

1. Open a project
2. Find "R and D Project" checkbox
3. Check it to mark as R&D

### How do I export R&D projects?

1. Go to Project > Projects (list view)
2. Click the R&D Export button
3. Excel file downloads automatically

### What's included in the export?

For each R&D project:
- Project name, creation date
- Purchases Bills with totals
- Purchases with vendor info
- Invoices with amounts

### Can I export specific projects?

The export includes ALL projects where "R and D Project" is checked. You cannot select specific ones - it exports all R&D projects.

---

## Troubleshooting

### Export button not showing

**Symptom:** No export button in project list

**Cause:** Button only shows on project.project list view

**Solution:**
1. Ensure you're in Project > Projects
2. Clear browser cache
3. Refresh page

### Export has empty sections

**Symptom:** Bills/Purchases/Invoices sections are empty

**Cause:** Custom fields for financial data may not exist

**Solution:**
- This module references custom fields from TLS configuration
- If those fields don't exist, sections appear empty
- Data still exports correctly for available fields

### Excel file won't open

**Symptom:** Downloaded file errors in Excel

**Cause:** Possibly too many rows or corrupted download

**Solution:**
1. Try again with stable connection
2. Note: Limit is 65,535 rows

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Requires custom TLS fields for full functionality | By design | Works with reduced data if fields missing |
| XLS format limit | By design | Keep R&D projects under 65k rows |

---

## Support

- **Author:** SME Business Solutions
- **Website:** www.successmadeeasier.com
- **For SAM AI deployments:** sam@sme.ec

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
