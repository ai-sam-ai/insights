# Module: RanD

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `RanD` |
| **Version** | 18.0.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\RanD` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\RanD\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\RanD\` |
| **Online URL** | https://sme.ec/documentation/modules/rand |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

RanD (Total Lifts Project) is a custom module that adds an "R and D Project" flag to projects and provides an Excel export feature for R&D projects. It exports project data including purchases, vendor bills, and invoices to an XLS file for reporting purposes. Originally developed for Total Lifts to track R&D project financials.

---

## Dependencies

### Odoo Module Dependencies
- `project` - Odoo project management
- `web` - Odoo web client

### Python Libraries Required
- `xlwt` - Excel writing (included in Odoo via odoo.tools.misc)

---

## For End Users (What Can This Do For Me?)

- Mark projects as "R and D" for special tracking
- Export R&D projects to Excel with one click
- See project financials including bills, purchases, and invoices
- Generate reports for R&D tax credit documentation

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 1 | project.project (inherit) |
| Controllers | 1 | Excel export endpoint |
| Views | 2 | Project form, list button |
| JS Files | 1 | List controller patch for export button |
| Security Rules | 0 | Uses inherited permissions |

**Key Files:**
- `models/rand_project.py` - Adds x_RandD boolean field
- `controllers/controllers.py` - XLS export endpoint
- `static/src/js/web_export_view.js` - Export button in list view

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: R&D projects, project export, Total Lifts
- User wants to: export project data, track R&D projects
- User mentions: RanD module, R and D, project Excel export

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (TLS custom module)

### Related Modules
- `project` - Core project module this extends
- `tls_biz` - Other TLS custom modules

---

## Known Gotchas (Painfully Learned)

1. **Custom Fields Referenced** - Export references `account_vendor_id1`, `account_inv_id1`, `purchase_project_ids`, `job_custom` - these may require other modules
2. **XLS Limitation** - Export limited to 65,535 rows (Excel 97-2003 format)
3. **Only R&D Projects** - Export only includes projects where `x_RandD = True`
4. **Button Only on project.project** - Export button only appears in project list view

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality
- [x] Controller count matches reality
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation | CTO Module Docs Agent |
