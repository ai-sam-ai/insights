# FAQ: tls_time_tracker

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is TLS Time Tracker?
A comprehensive time tracking module for manufacturing projects that tracks employee hours by activity, calculates labor costs, and provides project-level summaries.

### What does TLS stand for?
Total Lifting Solutions - the manufacturing company this module was developed for.

### What's the difference between tls.time.tracker and tls.job.tracker?
- `tls.time.tracker` - Original model with manufacturing-specific activity fields
- `tls.job.tracker` - Newer model that links to project.activities for better organization

### Which model should I use?
Use `tls.job.tracker` for new time entries. It has better integration with activities and projects.

---

## Time Entry Questions

### How do I log time?
1. Go to Time Tracker menu
2. Create new Job Tracker entry
3. Select employee, project, activity
4. Enter hours and date
5. Save - pay week calculates automatically

### How is the pay week calculated?
The formula is: ISO week number of (date minus 3 days). This shifts the week boundary to align with payroll periods.

Example: If you enter January 5th, the system subtracts 3 days (January 2nd) and gets that week number.

### What activities can I track?
Manufacturing-specific activities including:
- GL work: Structure, Platform, Electrics, Doors, Installation
- Crane work: Posts, Arm, Runways, Assembly, Installation
- Support: Travel, Clean Up, Maintenance, Courier, Lunch

### Can I track multiple projects in one day?
Yes, create separate time entries for each project/activity combination.

---

## Labor Cost Questions

### How are labor costs calculated?
`Cost = Hours × Labor Rate`

Default labor rate is $80/hour.

### Where do I configure the labor rate?
Go to Account > Labor Cost. Create or edit the account.labor record to set your hourly rate.

### Can I have different rates for different employees?
The current implementation uses a single global rate. Different employee rates would require customization.

### Where do I see total project costs?
Open any project and view the "Total Labor Cost" field. This sums all time entries linked to that project.

---

## Project Integration Questions

### How do I see time entries on a project?
Open the project form. The `project_time_job_lines` One2many field shows all related time entries.

### What does "Load Time From View" do?
The `action_load_time_form_view()` button searches for all job tracker entries for this project and creates project.job.time.line records from them.

### What is the Activity Time Lines section?
A summary view showing total hours and costs grouped by activity type for that project.

### How do I print a time tracker report?
On the project form, click the "Print TLS Tracker" button. This generates a PDF report.

---

## Pay Week Questions

### What is tls.pay.week used for?
Defines pay week periods with start and end dates. Useful for payroll reference.

### Can I customize pay week dates?
Yes, create records in tls.pay.week with custom start_date and end_date for each week number.

### Why does my pay week show "ABS"?
ABS appears when no date is entered. It means the pay week couldn't be calculated.

---

## Employee Questions

### What does status_emp (Current/Past) do?
Tracks whether an employee is currently active or has left. Useful for filtering in reports.

### What are payroleweek, start_date, end_date on employees?
These are synced from time entries when using the onchange_teammember_field method. They track the employee's current pay period context.

---

## Troubleshooting

### Time entries not showing on project
1. Ensure the project_field is correctly set on the time entry
2. Run "Load Time From View" to sync entries
3. Check that project.job.time.line records were created

### Labor cost showing 0
1. Check that hours are entered
2. Verify labor_cost rate is set (should default to 80.0)
3. Check account.labor has a record with cost value

### Pay week calculation seems wrong
Remember the calculation uses date - 3 days. If your payroll week starts on a different day, the calculation may need adjustment.

### Report not printing
1. Ensure the report template exists (tls_time_tracker.time_tracker_report)
2. Check for JavaScript console errors
3. Verify wkhtmltopdf is installed

---

## Integration Questions

### Does this work with Odoo timesheets?
This is a parallel system to Odoo's hr_timesheet. It adds manufacturing-specific tracking on top.

### Is there a website portal?
Yes, see the tls_time_tracker_website module for employee self-service time entry.

### Can I export time data?
Use Odoo's standard export functionality or create custom reports/exports.

---

## Search Keywords

tls_time_tracker, time tracking, labor cost, pay week, project hours, employee timesheet, manufacturing time, GL structure, crane assembly, activity tracking, job tracker, total lifts, payroll week

---

## Related Documentation

- [META - Module Overview](tls_time_tracker_META.md)
- [SCHEMA - Technical Reference](tls_time_tracker_SCHEMA.md)
- [WOW - Feature Highlights](tls_time_tracker_WOW.md)
