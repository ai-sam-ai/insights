# Schema: sam_ai_access_manager

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_access_manager` |
| **Version** | 18.0.1.2.0 |
| **Total Models** | 3 (2 new, 1 inherit) |
| **Total Controllers** | 0 |
| **Wizards** | 1 |

---

## Models

### sam.business.unit (New Model)

**Purpose:** Department/team grouping with pre-configured access groups

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Business unit name (e.g., Sales, Accounts) |
| `code` | Char | No | Short code (e.g., SALES, PM) |
| `sequence` | Integer | No | Display order (default: 10) |
| `active` | Boolean | No | Active flag (default: True) |
| `description` | Text | No | Purpose and access level description |
| `color` | Integer | No | Color index for kanban |
| `group_ids` | Many2many | No | Odoo groups this unit grants |
| `common_permission_ids` | Many2many | No | Human-readable permissions |
| `user_ids` | Many2many | No | Users in this unit |
| `user_count` | Integer | No | Computed user count |
| `is_super_user` | Boolean | No | Inherits all permissions |
| `parent_id` | Many2one | No | Parent unit for inheritance |
| `child_ids` | One2many | No | Child units |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_get_all_groups()` | Gets all groups including from parents and permissions | res.groups recordset |
| `_get_protected_group_ids()` | Gets IDs of groups that must never be removed | set |
| `action_apply_to_users()` | Applies groups to all users in unit | notification action |
| `action_remove_groups_from_users()` | Removes unit's groups from users | notification action |
| `action_open_apply_wizard()` | Opens confirmation wizard | window action |

**Protected Groups:**
- `base.group_user` - Internal User
- `base.group_portal` - Portal User
- `base.group_public` - Public User

---

### sam.common.permission (New Model)

**Purpose:** Human-readable permission definitions (Import, Export, Debug)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Permission name |
| `code` | Char | No | Short code |
| `description` | Text | No | What this permission allows |
| `group_ids` | Many2many | No | Odoo groups this permission grants |

---

### res.users (Inherited)

**Purpose:** Extends users with business unit assignment and access summary

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `business_unit_ids` | Many2many | No | Business units user belongs to |
| `access_summary` | Html | No | Computed summary of user's access |
| `can_import_export` | Boolean | No | Computed/inverse: import/export permission |
| `can_import` | Boolean | No | Alias for can_import_export |
| `can_export` | Boolean | No | Alias for can_import_export |
| `has_debug_mode` | Boolean | No | Computed/inverse: debug mode access |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_common_permissions()` | Computes permission booleans from groups | None |
| `_compute_access_summary()` | Generates HTML summary | None |
| `action_sync_from_business_units()` | Syncs all groups from assigned units | notification action |
| `action_view_all_groups()` | Opens list of user's groups | window action |

---

## Wizards

### sam.apply.groups.wizard

**Purpose:** Confirmation dialog before bulk permission changes

| Field | Type | Description |
|-------|------|-------------|
| `business_unit_id` | Many2one | The business unit to apply |
| `user_count` | Integer | Number of users affected |
| `group_count` | Integer | Number of groups to apply |
| `preview_html` | Html | Preview of what will happen |

**Methods:**
- `action_confirm()` - Executes the group application

---

## Security Rules

### Groups

| Group XML ID | Name | Implied By |
|--------------|------|------------|
| `group_access_manager_user` | Access Manager User | - |
| `group_access_manager_manager` | Access Manager Manager | User |
| `group_access_manager_admin` | Access Manager Admin | Manager |

### Access Rights

| Model | User | Manager | Admin |
|-------|------|---------|-------|
| sam.business.unit | Read | Read/Write/Create | Full |
| sam.common.permission | Read | Read | Full |
| sam.apply.groups.wizard | - | Full | Full |

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│      sam.business.unit          │
│                                 │
│  name: "Sales"                  │
│  group_ids ─────────────────────┼──► res.groups (Sales groups)
│  common_permission_ids ─────────┼──► sam.common.permission
│  user_ids ──────────────────────┼──► res.users
│  parent_id ─────────────────────┼──► sam.business.unit (parent)
│  is_super_user                  │
└──────────────┬──────────────────┘
               │
               │ action_apply_to_users()
               ▼
┌─────────────────────────────────┐
│         res.users               │
│                                 │
│  business_unit_ids ◄────────────┤
│  groups_id ◄────────────────────┤ (groups applied)
│  access_summary (computed)      │
│  can_import_export (computed)   │
│  has_debug_mode (computed)      │
└─────────────────────────────────┘
```

---

## Default Data

**File:** `data/common_permissions.xml`

Pre-configured common permissions (Import/Export, Debug Mode, etc.)

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `sam_business_unit` | `sam.business.unit` | Business unit records |
| `sam_common_permission` | `sam.common.permission` | Permission definitions |
| `business_unit_group_rel` | M2M | Unit to groups relation |
| `business_unit_permission_rel` | M2M | Unit to permissions relation |
| `business_unit_user_rel` | M2M | Unit to users relation |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
