# Schema: tls_time_tracker_website

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `tls_time_tracker_website` |
| **Version** | 1.21 |
| **Total Models** | 2 (1 new, 1 inherit) |
| **Total Controllers** | 1 |
| **API Endpoints** | 4 |

---

## Models

### tls.job.tracker (Inherited)

**Purpose:** Extends job tracker with datetime fields and email sending

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `start_time` | Datetime | No | Day start timestamp |
| `end_time` | Datetime | No | Day end timestamp |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `send_weekly_individual_hours()` | Send weekly hours to each employee | True |
| `send_daily_team_hours_email()` | Send daily summary to managers | True |

---

### time.tracker.send.to (New Model)

**Purpose:** Configuration for email notifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | No | Config name (default "Company's Profile") |
| `user_ids` | Many2many | No | Recipients (res.users) |
| `email_template_id` | Many2one | No | Email template to use |
| `individual` | Boolean | No | True=weekly individual, False=daily team |
| `email_subject` | Char | No | Related: template subject |
| `email_body` | Html | No | Related: template body |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `save_template_changes()` | Save edited template content | notification action |

---

## Controllers / API Endpoints

### CustomReportController

**Route:** `/job-tracker`
**Method:** HTTP GET
**Auth:** Public
**Purpose:** Display the time entry form

**Returns:** Website page with:
- Projects (filtered by tick=True)
- Activities (all project.activities)
- Employees (filtered by display_show=True)
- Project/activity type mappings as JSON

---

**Route:** `/submit_job_tracker`
**Method:** HTTP POST
**Auth:** Public
**Purpose:** Create time entry from form submission

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `teammember_field` | int | Employee ID |
| `project_field` | int | Project ID |
| `activity` | int | Activity ID |
| `date_field` | date | Entry date |
| `hours` | float | Hours worked |
| `today_start_time` | string | Start time text |
| `today_finish_time` | string | Finish time text |
| `start_day_time` | datetime | ISO start timestamp |
| `end_day_time` | datetime | ISO end timestamp |
| `description` | string | Entry description |

**Response:** Redirect to /thank-you

---

**Route:** `/thank-you`
**Method:** HTTP GET
**Auth:** Public
**Purpose:** Confirmation page after submission

**Returns:** Thank you page with link back to form

---

**Route:** `/get_person_jobs`
**Method:** JSON POST
**Auth:** Public
**CSRF:** Disabled
**Purpose:** Fetch time entries for employee

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `person_id` | int | Employee ID |
| `selected_date` | date | Optional date filter |

**Returns:** JSON array of job entries:
```json
[
  {"date": "2025-01-26", "hours": 8.0, "activity": "Project Name"}
]
```

---

## Frontend Components

### JavaScript

**File:** `static/src/js/job_tracker.js`

**Features:**
- "Start My Day" button handler (captures timestamp)
- "End My Day" button handler (captures timestamp)
- Activity filtering based on project type
- Load person's job records via JSON endpoint

---

## Email System

### Daily Team Email

**Cron:** Runs daily
**Config:** time.tracker.send.to with individual=False
**Recipients:** user_ids in config

**Content includes:**
- Each employee's hours for today
- Whether they updated entries yesterday

### Weekly Individual Email

**Cron:** Runs weekly
**Config:** time.tracker.send.to with individual=True
**Recipients:** Each employee with display_show=True

**Content includes:**
- Employee's hours for each day of the week
- Total hours for the week

---

## Security Rules

### Access Rights

| Model | Group | Permissions |
|-------|-------|-------------|
| time.tracker.send.to | All | Full (CRUD) |

**Note:** Public access for website controllers via sudo().

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│         /job-tracker (Website)          │
│                                         │
│  Employee selects:                      │
│  - Project (tick=True filter)           │
│  - Activity (filtered by project type)  │
│  - Team member (display_show filter)    │
│  - Start/End times                      │
│  - Hours and description                │
└───────────────┬─────────────────────────┘
                │ POST /submit_job_tracker
                ▼
┌─────────────────────────────────────────┐
│      tls.job.tracker.create()           │
│      (via sudo())                       │
│                                         │
│  Creates time entry                     │
│  Sends instant email notification       │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│       time.tracker.send.to              │
│                                         │
│  user_ids ─────────────────────────────────► Email recipients
│  email_template_id ────────────────────────► Mail template
│  individual ───────────────────────────────► Daily vs Weekly
└─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│       Scheduled Cron Jobs               │
│                                         │
│  Daily: send_daily_team_hours_email()   │
│  Weekly: send_weekly_individual_hours() │
└─────────────────────────────────────────┘
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `time_tracker_send_to` | `time.tracker.send.to` | Email config |
| `time_tracker_send_to_res_users_rel` | M2M | Config to users |

---

## Website Templates

| Template ID | Purpose |
|-------------|---------|
| `tls_time_tracker_website.website_job_tracker` | Main entry form |
| `tls_time_tracker_website.thank_you_page` | Confirmation page |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
