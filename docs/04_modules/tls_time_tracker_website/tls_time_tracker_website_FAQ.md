# FAQ: tls_time_tracker_website

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is TLS Time Tracker Website?
A public-facing web portal that allows employees to submit time entries without logging into Odoo. Includes automatic email notifications.

### What's the URL for the time entry form?
`/job-tracker` - e.g., `https://yoursite.com/job-tracker`

### Do employees need an Odoo login?
No, the form uses public authentication. Anyone with the URL can access it.

### Is this secure?
The form is public - anyone with the URL can submit entries. Consider network restrictions if needed.

---

## Form Usage Questions

### What do the Start/End Day buttons do?
- **Start My Day:** Captures the current timestamp and stores it in a hidden field
- **End My Day:** Captures the current timestamp when they finish

These times are stored in the `start_time` and `end_time` datetime fields.

### Why don't I see all projects?
Only projects with `tick=True` (Show In Timesheet checkbox) appear in the dropdown.

### Why don't I see all employees?
Only employees with `display_show=True` appear. Set this field on hr.employee records.

### Why don't I see all activities?
Activities are filtered by project type. Select a project first to see matching activities.

### What happens after I submit?
1. Time entry is created in tls.job.tracker
2. Email notification sent to configured managers
3. Redirected to /thank-you confirmation page

### Is there a training video?
Yes, an embedded Vimeo video is on the form page showing how to use the tracker.

---

## Email Questions

### How do I configure email recipients?
1. Go to Time Tracker menu > Time Tracker Send To
2. Create a record
3. Add users to receive emails
4. Select an email template

### What's the difference between individual=True and False?
- `individual=False` - Daily team summary sent to managers
- `individual=True` - Weekly report sent to each employee

### When are emails sent?
Configured via cron jobs in data/cron.xml. Check scheduled actions for timing.

### How do I customize the email template?
1. Go to Time Tracker Send To config
2. Edit the email_subject and email_body fields
3. Click "Save Template Changes"

### Why aren't emails being sent?
1. Check time.tracker.send.to has user_ids configured
2. Verify email_template_id is selected
3. Check Odoo email configuration (outgoing mail server)
4. Verify cron jobs are enabled

---

## Technical Questions

### How does the form submit data?
POST to `/submit_job_tracker` with form data. Controller creates tls.job.tracker record using sudo().

### What's the /get_person_jobs endpoint for?
JSON endpoint that returns a person's job entries for displaying "Job Hour Records" section on the form.

### Why sudo() everywhere?
Public users don't have Odoo permissions. sudo() runs operations as superuser to create records.

### How do I add more fields to the form?
1. Add field to tls.job.tracker model
2. Add field to views/job_website.xml template
3. Update controller to read and save the field

---

## Troubleshooting

### Form not loading
1. Check website module is installed
2. Verify tls_time_tracker is installed
3. Check browser console for JavaScript errors

### Submissions not saving
1. Check Odoo server logs for errors
2. Verify all required fields are filled
3. Check that project/employee IDs are valid

### Employee not appearing in dropdown
Set `display_show=True` on the hr.employee record.

### Project not appearing in dropdown
Set `tick=True` (Show In Timesheet) on the project.project record.

### Emails not sending
1. Verify time.tracker.send.to configuration
2. Check email template is selected
3. Test Odoo outgoing email server
4. Check cron job status in Scheduled Actions

### "Job Hour Records" showing nothing
1. Submit some time entries first
2. Select the employee in the dropdown
3. Check browser console for JSON errors

---

## Integration Questions

### Can I restrict access by IP?
Not built-in. Use web server configuration (nginx/Apache) to restrict access.

### Can I add authentication?
You would need to change auth="public" to auth="user" in the controller, but this defeats the purpose of easy access.

### How does this relate to tls_time_tracker?
This module extends tls_time_tracker with:
- Website form
- Email notifications
- Datetime fields (start_time, end_time)

---

## Search Keywords

tls_time_tracker_website, job tracker, time entry form, public timesheet, employee portal, time submission, /job-tracker, start my day, end my day, email notifications, daily summary, weekly report, manufacturing time entry

---

## Related Documentation

- [META - Module Overview](tls_time_tracker_website_META.md)
- [SCHEMA - Technical Reference](tls_time_tracker_website_SCHEMA.md)
- [WOW - Feature Highlights](tls_time_tracker_website_WOW.md)
- [tls_time_tracker](../tls_time_tracker/tls_time_tracker_META.md) - Core module
