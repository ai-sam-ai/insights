# Module: odoo_mobile_timesheet

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `odoo_mobile_timesheet` |
| **Version** | 1.8 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\odoo_mobile_timesheet` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\odoo_mobile_timesheet\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\odoo_mobile_timesheet\` |
| **Online URL** | https://sme.ec/documentation/modules/odoo-mobile-timesheet |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

odoo_mobile_timesheet is a commercial module from Probuse that provides a mobile-friendly web portal for employees to enter, view, edit, and delete timesheets from any device. It extends the standard Odoo timesheet functionality with work types, start/end times, and billable/paid tracking, all accessible through a responsive website portal.

---

## Dependencies

### Odoo Module Dependencies
- `website` - Odoo website framework
- `hr_timesheet` - Odoo timesheet base
- `analytic` - Analytic accounting
- `portal` - Customer portal
- `project` - Project management

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Enter timesheets from your phone or tablet while on the job
- Track start time, end time, and duration for each entry
- Categorize work with customizable work types
- Mark entries as billable or paid
- View and edit past timesheet entries by date
- Access timesheet history through the portal

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 4 | timesheet.work.type (new), account.analytic.line (inherit), project.project (inherit), project.task (inherit) |
| Controllers | 1 | Portal controller with 8 routes |
| Views | 5 | Portal templates + backend views |
| JS Files | 1 | website_portal.js |
| Security Rules | 3 | Work type access by group |

**Key Files:**
- `models/timesheet_work_type.py` - Work type master data
- `models/timesheet_line.py` - Analytic line extensions
- `controllers/main.py` - All portal routes
- `views/website_portal_templates.xml` - Mobile-friendly forms

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: mobile timesheet, portal timesheet, employee time entry
- User wants to: enter timesheets on mobile, track work types, manage billable hours
- User mentions: timesheet portal, mobile time tracking, probuse timesheet

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto` - For architecture decisions about timesheet integrations
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (third-party Probuse module)

### Related Modules
- `hr_timesheet` - Core timesheet module this extends
- `project` - Project/task selection for timesheet entries
- `tls_time_tracker` - TLS custom time tracker (different module)

---

## Known Gotchas (Painfully Learned)

1. **Proprietary License** - This is a paid module (OPL-1) from Probuse, not open source
2. **Sudo Everywhere** - Controllers use sudo() extensively - security relies on route-level checks
3. **Route Naming** - Routes changed from /my/timesheets to /my/employee/timesheets and custom paths
4. **Time Format** - Expects HH:MM format for duration/times - parse errors if format differs
5. **Portal vs Internal** - Designed for portal users but also works for internal users

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
