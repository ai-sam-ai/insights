# Schema: tls_time_tracker

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `tls_time_tracker` |
| **Version** | 1.2 |
| **Total Models** | 10 (7 new, 3 inherit) |
| **Total Controllers** | 0 |
| **Reports** | 1 |

---

## Models

### tls.time.tracker (New Model)

**Purpose:** Main time tracking record with manufacturing-specific activity fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Selection | No | Pay week (1-52) |
| `main_name` | Char | No | Display name "Pay Week X" |
| `main_name2` | Char | No | Computed display name |
| `activity` | Char | No | Activity description |
| `date_field` | Date | No | Start date |
| `end_date` | Date | No | End date |
| `day_field` | Char | No | Day name |
| `project_field` | Many2one | No | Link to project |
| `teammember_field` | Many2one | No | Link to employee |
| `hours` | Float | No | Number of hours |
| `tick` | Boolean | No | Allow to print |
| `computed_pay_week` | Char | No | Computed pay week number |
| `gl_structure` | Char | No | GL Structure hours |
| `gl_platform` | Char | No | GL Platform hours |
| `gl_counter_weight` | Char | No | GL Counter weight hours |
| `gl_electrics` | Char | No | GL Electrics hours |
| `gl_doors` | Char | No | GL Doors hours |
| `gl_pre_assembly` | Char | No | GL Pre Assembly hours |
| `gl_installation` | Char | No | GL Installation hours |
| `crane_posts_column` | Char | No | Crane Posts/Column hours |
| `crane_arm` | Char | No | Crane Arm hours |
| `crane_runways` | Char | No | Crane Runways hours |
| `crane_assembly` | Char | No | Crane Assembly hours |
| `crane_installation` | Char | No | Crane Installation hours |
| `improvements` | Char | No | Improvements hours |
| `clean_up` | Char | No | Clean Up hours |
| `courier` | Char | No | Courier hours |
| `lunch` | Char | No | Lunch hours |
| `travel` | Char | No | Travel hours |
| `maintenance` | Char | No | Maintenance hours |
| `production_status` | Char | No | Production status |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_pay_week()` | Calculate pay week from date - 3 days | None |
| `onchange_teammember_field()` | Sync dates to employee | None |

---

### tls.job.tracker (New Model)

**Purpose:** Job-specific time entry with activity link

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Text | No | Comments |
| `title` | Char | No | Entry title |
| `email` | Char | No | Email reference |
| `descrip` | Char | No | Description |
| `activity` | Many2one | No | Link to project.activities |
| `date_field` | Date | No | Start date (default today) |
| `end_date` | Date | No | End date (default today) |
| `day_field` | Char | No | Day name |
| `project_field` | Many2one | No | Link to project |
| `project_activity` | Char | No | Project activity code |
| `teammember_field` | Many2one | No | Link to employee |
| `hours` | Float | No | Number of hours |
| `week` | Selection | No | Pay week (1-52) |
| `computed_pay_week` | Char | No | Computed pay week |
| `today_start_time` | Char | No | Start time |
| `today_finish_time` | Char | No | Finish time |

---

### tls.pay.week (New Model)

**Purpose:** Pay week definition with date ranges

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Selection | Yes | Pay week number (1-52) |
| `start_date` | Date | No | Week start date |
| `end_date` | Date | No | Week end date |

---

### project.activities (New Model)

**Purpose:** Activity definitions for project work

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | No | Activity name |
| `project_types` | Many2one | No | Link to project types |
| `date_field` | Date | No | Start date |
| `end_date` | Date | No | End date |
| `day_field` | Char | No | Day name |
| `production_status` | Char | No | Production status |
| (plus all GL and crane fields) | Char | No | Activity-specific tracking |

---

### project.job.time.line (New Model)

**Purpose:** Project-level time entry with labor cost calculation

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | No | Entry name |
| `time_tracker` | Many2one | No | Link to tls.job.tracker |
| `project_id` | Many2one | No | Link to project |
| `activity` | Many2one | No | Link to activity |
| `date_field` | Date | No | Entry date |
| `teammember_field` | Many2one | No | Link to employee |
| `hours` | Float | No | Hours worked |
| `week` | Selection | No | Pay week |
| `labor_cost` | Float | No | Hourly rate (default 80.0) |
| `cost_of_labor` | Float | No | Computed: hours * rate |
| `activity_total_cost` | Float | No | Computed total for activity |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_labor_cost()` | Calculate cost = hours * rate | None |
| `_compute_activity_total_cost()` | Sum costs per activity | None |

---

### project.activity.time.line (New Model)

**Purpose:** Activity summary per project

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Many2one | No | Link to activity |
| `total_hours` | Float | No | Computed total hours |
| `labor_cost` | Float | No | Computed labor rate |
| `total_labor_cost` | Float | No | Computed total cost |
| `project_id` | Many2one | No | Link to project |

---

### project.time.line (New Model - Deprecated)

**Purpose:** Legacy time line model (no longer used)

Contains similar fields to project.job.time.line but without labor cost calculations.

---

### account.labor (New Model)

**Purpose:** Labor cost configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | No | Title (default "Labor Cost") |
| `cost` | Float | No | Hourly cost rate (default 80.0) |

---

### project.project (Inherited)

**Purpose:** Extends projects with time tracking capabilities

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `project_time_lines` | One2many | No | Legacy time lines |
| `project_time_job_lines` | One2many | No | Job time lines |
| `total_hours` | Float | No | Computed total hours |
| `total_labor_cost` | Float | No | Computed total labor cost |
| `tick` | Boolean | No | Show in timesheet |
| `activity_time_lines` | One2many | No | Activity summaries |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `print_tls_tracker()` | Print time tracker report | report action |
| `action_load_time_form_view()` | Load time entries from job tracker | None |
| `update_activity_time_lines()` | Recalculate activity summaries | None |

---

### hr.employee (Inherited)

**Purpose:** Extends employees with pay tracking fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status_emp` | Selection | No | Current/Past employee status |
| `payroleweek` | Selection | No | Current pay week |
| `start_date` | Date | No | Period start date |
| `end_date` | Date | No | Period end date |

---

### project.types (Inherited)

**Purpose:** Extends project types with activity link

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pro_activity_id` | One2many | No | Link to project activities |

---

## Security Rules

### Access Rights

| Model | Group | Permissions |
|-------|-------|-------------|
| tls.time.tracker | All | Full (CRUD) |
| tls.pay.week | All | Full (CRUD) |
| project.time.line | All | Full (CRUD) |
| project.activities | All | Full (CRUD) |
| tls.job.tracker | All | Full (CRUD) |
| project.job.time.line | All | Full (CRUD) |
| account.labor | All | Full (CRUD) |
| project.activity.time.line | All | Full (CRUD) |

**Note:** No group restrictions - all models have public full access.

---

## Pay Week Calculation

The pay week is calculated as:
```python
adjusted_date = date_field - timedelta(days=3)
pay_week = adjusted_date.isocalendar()[1]
```

This shifts the week boundary by 3 days to align with the payroll period.

---

## Data Flow Diagram

```
┌─────────────────────────────────────┐
│         tls.job.tracker             │
│                                     │
│  activity ─────────────────────────────► project.activities
│  project_field ────────────────────────► project.project
│  teammember_field ─────────────────────► hr.employee
└───────────────┬─────────────────────┘
                │ action_load_time_form_view()
                ▼
┌─────────────────────────────────────┐
│      project.job.time.line          │
│                                     │
│  project_id ───────────────────────────► project.project
│  activity ─────────────────────────────► project.activities
│  labor_cost ◄──────────────────────────── account.labor
│  cost_of_labor = hours * labor_cost │
└───────────────┬─────────────────────┘
                │ update_activity_time_lines()
                ▼
┌─────────────────────────────────────┐
│    project.activity.time.line       │
│                                     │
│  name ─────────────────────────────────► project.activities
│  total_hours (aggregated)           │
│  total_labor_cost (aggregated)      │
└─────────────────────────────────────┘
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `tls_time_tracker` | `tls.time.tracker` | Main time entries |
| `tls_job_tracker` | `tls.job.tracker` | Job-specific entries |
| `tls_pay_week` | `tls.pay.week` | Pay week definitions |
| `project_activities` | `project.activities` | Activity definitions |
| `project_time_line` | `project.time.line` | Legacy time lines |
| `project_job_time_line` | `project.job.time.line` | Job time lines |
| `project_activity_time_line` | `project.activity.time.line` | Activity summaries |
| `account_labor` | `account.labor` | Labor cost config |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
