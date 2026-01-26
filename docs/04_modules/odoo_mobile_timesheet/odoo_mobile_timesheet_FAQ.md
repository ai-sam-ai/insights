# FAQ: odoo_mobile_timesheet

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Mobile Timesheet

### What is odoo_mobile_timesheet?

odoo_mobile_timesheet is a Human Resources module that provides a mobile-friendly web portal for employees to enter and manage timesheets from any device.

**Key facts:**
- Technical name: `odoo_mobile_timesheet`
- Current version: 1.8
- Author: Probuse Consulting Service Pvt. Ltd.
- Price: EUR 109.00
- License: OPL-1 (Proprietary)

### What does odoo_mobile_timesheet do?

odoo_mobile_timesheet provides 5 capabilities:

1. **Mobile Portal** - Responsive web interface for timesheet entry
2. **Time Tracking** - Start time, end time, and duration fields
3. **Work Types** - Categorize work for better reporting
4. **Billing Flags** - Mark entries as billable and/or paid
5. **CRUD Operations** - Create, read, update, delete timesheet entries

### Who is odoo_mobile_timesheet for?

odoo_mobile_timesheet is designed for:
- Field workers tracking time on-site
- Consultants logging billable hours at client locations
- Remote employees without desktop access
- Any organization needing mobile time tracking

---

## Installation & Setup

### How do I install odoo_mobile_timesheet?

1. Purchase the module from Odoo Apps Store (EUR 109.00)
2. Upload to your Odoo addons folder
3. Navigate to Apps menu
4. Search for "Mobile Timesheet Odoo"
5. Click Install
6. Portal routes become available automatically

### What are the dependencies for odoo_mobile_timesheet?

odoo_mobile_timesheet requires these Odoo modules:
- `website` - Odoo website framework
- `hr_timesheet` - Core timesheet functionality
- `analytic` - Analytic accounting
- `portal` - Customer portal
- `project` - Project management

Python libraries required:
- None additional

### How do I configure work types?

After installation:
1. Go to Timesheets > Configuration > Work Types (or similar menu)
2. Add work type codes and names
3. Work types appear in the portal dropdown

---

## Usage

### How do I access the mobile timesheet portal?

To access the portal:
1. Log in to Odoo (as portal or internal user)
2. Go to My Account / Portal
3. Click on Timesheets or navigate to `/my/employee/timesheets`
4. The interface works on mobile browsers

### How do I add a timesheet entry?

To add a timesheet entry:
1. Navigate to `/my/add_timesheet` or click Add Timesheet
2. Select project and task
3. Enter date, duration (HH:MM format), start/end time
4. Select work type if applicable
5. Check billable/paid as needed
6. Enter description
7. Click Save

### What time format is expected?

Times must be entered as HH:MM (24-hour format):
- "08:30" = 8:30 AM
- "14:45" = 2:45 PM
- Duration "02:30" = 2 hours 30 minutes

### Can I edit past timesheet entries?

Yes. Navigate to the timesheet list, click on an entry to edit:
1. Go to `/my/employee/timesheets`
2. Select a date to view entries
3. Click on the entry you want to edit
4. Modify fields
5. Save changes

### Can I delete timesheet entries?

Yes. Each entry has a delete option:
1. View the timesheet entry
2. Click Delete
3. Entry is permanently removed

---

## Troubleshooting

### "Not Allowed" error when accessing portal

**Symptom:** You see a "Not Allowed" message

**Cause:** User doesn't have required group membership

**Solution:**
1. User needs one of: Portal user, Internal user, or Timesheet user group
2. Admin should check user's groups in Settings > Users
3. Add appropriate group membership

### Time entry fails with parse error

**Symptom:** Error when saving timesheet

**Cause:** Time entered in wrong format

**Solution:**
1. Enter time as HH:MM (e.g., "08:30" not "8:30 AM")
2. Use 24-hour format
3. Duration must also be HH:MM format

### Projects/Tasks not showing in dropdown

**Symptom:** Empty dropdown for project or task

**Cause:** Projects/tasks are marked as closed

**Solution:**
1. Module only shows projects where `is_close = False`
2. Module only shows tasks in stages where `is_close = False`
3. Reopen projects/tasks or check stage configuration

### Timesheet entries not appearing in backend

**Symptom:** Entries created in portal don't show in Timesheets app

**Cause:** User ID mismatch or filtering

**Solution:**
1. Entries are created for the logged-in user
2. Check backend timesheet filters
3. Remove any default filters to see all entries

---

## Comparisons

### How does this compare to Odoo's native timesheet portal?

| Feature | odoo_mobile_timesheet | Native Portal |
|---------|----------------------|---------------|
| Mobile-optimized | Yes | Basic |
| Start/End time | Yes | No |
| Work types | Yes | No |
| Billable flag | Yes | Limited |
| Delete entries | Yes | Limited |
| Price | EUR 109 | Included |

### Why use this over the standard Odoo app?

Mobile Timesheet provides:
- More detailed time tracking (start/end times)
- Work type categorization
- Better mobile interface
- More control over entries

---

## Integration

### Does odoo_mobile_timesheet work with hr_timesheet?

Yes. Entries are stored in `account.analytic.line` which is the same model used by standard Odoo timesheets. Data flows to all timesheet reports.

### Does it work with project billing?

Yes. The `is_billable` field can be used for billing workflows. Entries link to projects and tasks normally.

### Can I use this with the Odoo mobile app?

This module provides a web portal, not a native app. It works in mobile browsers alongside or instead of the Odoo mobile app's timesheet features.

---

## Data & Privacy

### Where is my timesheet data stored?

Data is stored in the standard `account_analytic_line` table in your Odoo PostgreSQL database. Additional fields (start_time, end_time, work_type_id, is_billable, is_paid) are added to this table.

### Can I export timesheet data?

Yes. Use standard Odoo export functionality:
1. Go to Timesheets in backend
2. Select entries
3. Action > Export

---

## Pricing & Licensing

### How much does odoo_mobile_timesheet cost?

EUR 109.00 (one-time purchase from Odoo Apps Store)

### What license is this module?

OPL-1 (Odoo Proprietary License). This means:
- You may not redistribute the module
- You may modify for your own use
- Source code access is provided

### Is there a free trial?

Check Probuse website for live test URL or demo options.

---

## Support

### Where can I get help with odoo_mobile_timesheet?

- **Author:** Probuse Consulting Service Pvt. Ltd.
- **Website:** www.probuse.com
- **Support:** contact@probuse.com
- **Live Demo:** Check manifest for current test URL

### How do I report a bug?

Contact Probuse support with:
- Odoo version
- Module version
- Steps to reproduce
- Screenshots if applicable

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Sudo() security pattern | By design | Controller-level access checks |
| Route naming inconsistencies | Open | Use documented routes |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.8 | Unknown | Current version |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
