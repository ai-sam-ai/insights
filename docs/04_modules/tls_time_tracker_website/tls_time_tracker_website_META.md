# Module: tls_time_tracker_website

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `tls_time_tracker_website` |
| **Version** | 1.21 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\tls_time_tracker_website` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\tls_time_tracker_website\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\tls_time_tracker_website\` |
| **Online URL** | https://sme.ec/documentation/modules/tls-time-tracker-website |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

TLS Time Tracker Website provides a public-facing portal at /job-tracker where employees can submit their time entries without logging into Odoo. Features include "Start My Day" and "End My Day" buttons for time capture, automatic email notifications to managers, daily team summary emails, and weekly individual hour reports via scheduled cron jobs. Includes an embedded training video.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo base
- `project` - Project management
- `tls_time_tracker` - Core time tracking functionality
- `web` - Web framework
- `website` - Website CMS

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Public website form for time entry at /job-tracker
- "Start My Day" button to capture start time
- "End My Day" button to capture end time
- Automatic email notification when time is submitted
- Daily team hours summary email to managers
- Weekly individual hours email to employees
- View your job records for selected date
- Embedded training video on how to use

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | tls.job.tracker (inherit), time.tracker.send.to |
| Controllers | 1 | Website controller with 4 routes |
| Views | 3 | Job website form, job tracker backend, menu |
| JS Files | 1 | Frontend form interactions |
| Security Rules | 1 | time.tracker.send.to access |
| Cron Jobs | 2 | Daily team email, weekly individual email |
| Email Templates | 1+ | Configurable email templates |

**Key Files:**
- `controller/controller.py` - Website routes for time submission
- `models/job_tracker.py` - Email sending methods (daily/weekly)
- `models/time_tracker_send.py` - Email recipient configuration
- `views/job_website.xml` - Public form template
- `data/cron.xml` - Scheduled jobs for emails
- `data/mail_template.xml` - Email templates

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: time tracker website, employee portal, time submission form
- User wants to: let employees submit time without login, send time emails
- User mentions: job-tracker, time tracker emails, daily team hours

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: tls_time_tracker

### Related Modules
- `tls_time_tracker` - Core time tracking (required)
- `website` - Odoo website framework
- `mail` - Email functionality

---

## Known Gotchas (Painfully Learned)

1. **Public Auth** - Routes use `auth="public"` so anyone can access /job-tracker
2. **sudo() Required** - Controller uses sudo() to create records as public user
3. **display_show Filter** - Only employees with display_show=True appear in dropdown
4. **tick Filter** - Only projects with tick=True appear in dropdown
5. **Email Config Required** - time.tracker.send.to must be configured for emails to send
6. **Two Email Configs** - individual=True for weekly employee emails, individual=False for daily manager emails

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
