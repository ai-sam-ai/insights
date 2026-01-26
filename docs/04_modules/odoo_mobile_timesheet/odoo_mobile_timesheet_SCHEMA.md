# Schema: odoo_mobile_timesheet

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `odoo_mobile_timesheet` |
| **Version** | 1.8 |
| **Total Models** | 4 (1 new, 3 inherit) |
| **Total Controllers** | 1 (8 routes) |
| **Portal Routes** | 8 |

---

## Models

### timesheet.work.type (New Model)

**Purpose:** Master data for categorizing timesheet entries by type of work

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | Char | Yes | Unique work type code |
| `name` | Char | Yes | Work type display name |

**Constraints:**
- `code` must be unique (SQL constraint)

---

### account.analytic.line (Inherited)

**Purpose:** Extends timesheet lines with time tracking and billing fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `start_time` | Float | No | Start time of work (hours as decimal) |
| `end_time` | Float | No | End time of work (hours as decimal) |
| `work_type_id` | Many2one | No | Reference to timesheet.work.type |
| `is_billable` | Boolean | No | Mark entry as billable |
| `is_paid` | Boolean | No | Mark entry as paid |

**Relationships:**
- `work_type_id` → `timesheet.work.type` (Many2one)

---

### project.project (Inherited)

**Purpose:** Adds fields for filtering open projects in portal

Referenced in controller for showing only open projects (`is_close = False`)

---

### project.task (Inherited)

**Purpose:** Adds fields for filtering open tasks in portal

Referenced in controller for showing only open tasks (via `stage_id.is_close`)

---

## Controllers / Portal Routes

### CustomerPortal (Inherited)

**Base:** `odoo.addons.portal.controllers.portal.CustomerPortal`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/my/employee/timesheets` | GET | user | List timesheets with date filter |
| `/my/employee/timesheets/page/<int:page>` | GET | user | Paginated timesheet list |
| `/my/add_timesheet` | GET | user | Show add timesheet form |
| `/my/create_new_timesheet` | GET | user | Process new timesheet creation |
| `/my/employee/timesheet/<int:timesheet>` | GET | user | Edit specific timesheet |
| `/my/update_timesheet` | GET | user | Process timesheet update |
| `/my/timesheet/delete/<int:timesheet>` | GET | user | Delete timesheet entry |
| `/odoo_timesheet_portal_user_employee/select_timesheet` | GET | user | Main timesheet selection page |

---

## Route Details

### GET /my/employee/timesheets

**Purpose:** Display list of timesheets for current user filtered by date

**Parameters:**
- `page` (int): Pagination page number
- `sortby` (string): Sort field (date or project)
- `start_date` (string): Date filter YYYY-MM-DD

**Access:** Portal users, Internal users, or Timesheet users

### GET /my/add_timesheet

**Purpose:** Display form to add new timesheet entry

**Parameters:**
- `project` (int): Pre-selected project ID
- `task` (int): Pre-selected task ID
- `duration` (string): Pre-filled duration HH:MM
- `start_time` (string): Pre-filled start time HH:MM
- `end_time` (string): Pre-filled end time HH:MM
- `timesheet_date` (string): Pre-filled date

**Returns:** Form with open projects, open tasks, work types

### POST /my/create_new_timesheet

**Purpose:** Create new timesheet entry from form data

**Parameters:**
- `project_id` (int): Project ID
- `task_id` (int): Task ID
- `work_type` (int): Work type ID
- `start_time` (string): Start time HH:MM
- `end_time` (string): End time HH:MM
- `is_billable` (string): "on" if checked
- `is_paid` (string): "on" if checked
- `description` (string): Work description
- `quantity` (string): Duration HH:MM
- `start_date` (string): Date YYYY-MM-DD

**Returns:** Redirect to timesheet list

### GET /my/timesheet/delete/<int:timesheet>

**Purpose:** Delete a timesheet entry

**Parameters:**
- `timesheet` (int): Timesheet line ID

**Returns:** Redirect to timesheet list

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│    Portal User (Mobile/Web)     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│    CustomerPortal Controller    │
│                                 │
│  /my/add_timesheet              │
│  /my/create_new_timesheet       │
│  /my/employee/timesheet/{id}    │
│  /my/update_timesheet           │
│  /my/timesheet/delete/{id}      │
└──────────────┬──────────────────┘
               │ sudo()
               ▼
┌─────────────────────────────────┐
│    account.analytic.line        │
│                                 │
│  + start_time                   │
│  + end_time                     │
│  + work_type_id ────────────────┼──► timesheet.work.type
│  + is_billable                  │
│  + is_paid                      │
│                                 │
│  - project_id ──────────────────┼──► project.project
│  - task_id ─────────────────────┼──► project.task
└─────────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `timesheet.work.type` | base.group_user | Yes | No | No | No |
| `timesheet.work.type` | hr.group_hr_user | Yes | Yes | Yes | Yes |
| `timesheet.work.type` | hr_timesheet.group_hr_timesheet_user | Yes | Yes | Yes | Yes |

**Note:** Controller routes perform additional group checks for portal/user access.

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `timesheet_work_type` | `timesheet.work.type` | Work type master data |
| `account_analytic_line` | `account.analytic.line` | Extended with new fields |

---

## Default Data

**File:** `data/work_type_data.xml`

Pre-configured work types (check file for specific values).

---

## Frontend Assets

**web.assets_frontend:**
- `odoo_mobile_timesheet/static/src/js/website_portal.js`

---

## Time Conversion Logic

Times are stored as float (decimal hours) but entered as HH:MM strings.

**Conversion formula:**
```python
# HH:MM string to float
time_delta = datetime.strptime(time_string, '%H:%M') - datetime.strptime('0:0', '%H:%M')
float_hours = time_delta.total_seconds() / 3600.00
```

**Example:**
- "08:30" → 8.5
- "14:45" → 14.75

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
