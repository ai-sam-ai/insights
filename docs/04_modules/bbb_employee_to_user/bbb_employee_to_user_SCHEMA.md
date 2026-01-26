# Schema: bbb_employee_to_user

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `bbb_employee_to_user` |
| **Version** | 18.0.0.0 |
| **Total Models** | 2 (both inherit existing models) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### hr.employee (Inherited)

**Purpose:** Extends employee model with user creation capabilities

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `is_user` | Boolean | No | Flag indicating employee has linked user account |
| `user_archived` | Boolean | No | Flag indicating user link was archived |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `link_to_user()` | Creates new res.users record from employee data | None (writes to self) |
| `archive_user_link()` | Deactivates linked user and partner | None (writes to self) |
| `active_user_link()` | Reactivates previously archived user link | None (writes to self) |

**Method Details:**

#### link_to_user()
Creates a new user with:
- `login` = employee's `work_email`
- `name` = employee's `name`
- `image_1920` = employee's photo
- `is_employee` = True
- `employee_id` = current employee ID

Also updates employee's `address_id` and `user_id` if not set.

#### archive_user_link()
- Finds user linked to employee via `employee_id`
- Sets user `active = False`
- Sets user's partner `active = False`
- Clears employee's `address_id` and `user_id` if they match

#### active_user_link()
- Finds archived user via related partner
- Sets user `active = True`
- Sets partner `active = True`
- Restores employee's `address_id` and `user_id` links

---

### res.users (Inherited)

**Purpose:** Extends user model with employee tracking fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `employee_id` | Many2one | No | Link to hr.employee record |
| `is_employee` | Boolean | No | Flag indicating user was created from employee |

**Relationships:**
- `employee_id` → `hr.employee` (Many2one)

---

## Controllers / API Endpoints

This module has no controllers or API endpoints. All functionality is triggered via form buttons.

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│     hr.employee         │
│                         │
│  - is_user (Boolean)    │
│  - user_archived (Bool) │
│  - user_id (M2O) ───────┼──────┐
│  - address_id (M2O) ────┼──┐   │
└─────────────────────────┘  │   │
                             │   │
                             ▼   ▼
┌─────────────────────────┐  ┌─────────────────────────┐
│    res.partner          │  │      res.users          │
│                         │  │                         │
│  (linked via            │  │  - employee_id (M2O) ───┼───► hr.employee
│   address_id)           │  │  - is_employee (Bool)   │
│                         │◄─┼─ partner_id (M2O)       │
└─────────────────────────┘  └─────────────────────────┘
```

---

## Security Rules

This module does not define its own security rules. Access is controlled by inherited permissions from:
- `hr` module - for hr.employee access
- `base` module - for res.users access

Typical access:
| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `hr.employee` | hr.group_hr_user | Yes | Yes | Yes | No |
| `res.users` | base.group_system | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `hr_employee` | `hr.employee` | Extended with is_user, user_archived fields |
| `res_users` | `res.users` | Extended with employee_id, is_employee fields |

---

## View Modifications

### hr.employee Form View

**Inherits:** `hr.view_employee_form`

**Adds buttons to header:**
- "Link to a user" - visible when `is_user=False` and `user_archived=False`
- "Archive user" - visible when `is_user=True`
- "Active user" - visible when `user_archived=True`

**Adds hidden fields:**
- `is_user` (invisible)
- `user_archived` (invisible)

### res.users Form View

**Inherits:** `base.view_users_form`

**Adds before notebook:**
- `is_employee` field (readonly)
- `employee_id` field (readonly, visible only when is_employee=True)

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
