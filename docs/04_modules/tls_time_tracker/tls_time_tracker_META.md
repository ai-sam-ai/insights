# Module: tls_time_tracker

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `tls_time_tracker` |
| **Version** | 1.2 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\tls_time_tracker` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\tls_time_tracker\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\tls_time_tracker\` |
| **Online URL** | https://sme.ec/documentation/modules/tls-time-tracker |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

TLS Time Tracker is a comprehensive time tracking system for Total Lifting Solutions manufacturing. It tracks employee hours against projects by pay week, calculates labor costs, and provides detailed reports. Features include activity-based tracking (GL structures, crane work, maintenance), automatic pay week calculation based on adjusted dates, and project-level time summaries with cost breakdowns.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo base
- `hr` - Human Resources for employees
- `project` - Project management
- `base_setup` - Base setup
- `tls_projects` - TLS project customizations
- `hr_timesheet` - Timesheet functionality
- `sme_project_stages` - Project stages

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Track employee hours against projects by activity
- Automatic pay week calculation from date
- Define labor cost rates and calculate total costs
- View time summaries per project
- Activity-specific tracking (GL structure, crane work, installation)
- Pay week management for payroll integration
- Print time tracker reports per project
- Employee status tracking (Current/Past)

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 10 | tls.time.tracker, tls.job.tracker, tls.pay.week, project.activities, project.types (inherit), hr.employee (inherit), project.project (inherit), project.time.line, project.job.time.line, project.activity.time.line, account.labor |
| Controllers | 0 | None |
| Views | 7 | Job tracker, activities, pay weeks, HR, project, project types, account |
| JS Files | 1 | Report view customization |
| Security Rules | 8 | Full access for all models |
| Reports | 1 | Time tracker report |

**Key Files:**
- `models/tracker.py` - Main time tracker model
- `models/job_tracker.py` - Job-specific tracking
- `models/project_project.py` - Project extensions with time lines
- `models/job_project_activities.py` - Activity definitions
- `models/pay_weeks.py` - Pay week management
- `models/account.py` - Labor cost configuration
- `report/tracker_report.xml` - PDF report template

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: time tracking, labor costs, pay weeks, project hours
- User wants to: track employee time, calculate labor costs, generate timesheet reports
- User mentions: TLS time tracker, time lines, project activities, GL structure

### Related Agents
- `/cto-developer` - For customization or bug fixes
- `/mod_sam` - For SAM AI integration

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (TLS custom module)

### Related Modules
- `tls_projects` - Project customizations
- `tls_time_tracker_website` - Website portal for time tracking
- `hr_timesheet` - Standard Odoo timesheets
- `project` - Core project management

---

## Known Gotchas (Painfully Learned)

1. **Pay Week Calculation** - Uses date minus 3 days, then ISO week number
2. **Multiple Time Line Models** - project.time.line is deprecated, use project.job.time.line
3. **Activity-Specific Fields** - Many GL and crane-related fields for manufacturing
4. **Labor Cost Default** - Defaults to 80.0 if no account.labor record exists
5. **Heavy Dependencies** - Requires tls_projects and sme_project_stages modules
6. **No Group Security** - All models have full public access

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
