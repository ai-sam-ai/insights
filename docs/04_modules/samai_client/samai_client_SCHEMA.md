# samai_client - Technical Schema

> **Technical Truth File** - Exact specifications, no interpretation

---

## Module Identification

```
Technical Name: samai_client
Version: 18.0.1.1.0
Category: SAM AI/SaaS
License: LGPL-3
Application: True
```

---

## Dependencies

```python
'depends': [
    'base',
    'web',
]
'external_dependencies': {
    'python': ['requests'],
}
```

---

## Models

### 1. samai.client.config
**File:** `models/samai_config.py`

| Field | Type | Description |
|-------|------|-------------|
| name | Char | Fixed: 'SAM AI Host Connection' |
| host_url | Char | Host server URL |
| api_token | Char | API authentication token |
| connected | Boolean | Connection status (readonly) |
| tier_name | Char | Subscription tier (readonly) |
| client_name | Char | Client identifier (readonly) |
| last_check | Datetime | Last update check (readonly) |
| available_modules | Integer | Modules in catalog (readonly) |
| updates_available | Integer | Pending updates count (readonly) |
| pending_updates | Text | JSON of available updates (readonly) |
| restart_pending | Boolean | True when restart needed (readonly) |

**Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `get_config()` | None | Record | Get/create singleton config |
| `action_test_connection()` | None | Notification | Test host connection |
| `action_view_catalog()` | None | Notification | Show available modules |
| `action_check_updates()` | None | Notification | Check for updates |
| `action_apply_updates()` | None | Notification | Download and extract updates |
| `action_request_restart()` | None | Notification | Request container restart |
| `action_save_to_params()` | None | Notification | Save to ir.config_parameter |
| `_cron_check_updates()` | None | None | Cron: scheduled update check |

### 2. samai.module.rev
**File:** `models/samai_module_rev.py`

| Field | Type | Description |
|-------|------|-------------|
| technical_name | Char | Module technical name (required, indexed, unique) |
| community_rev | Integer | Last known community revision from host |
| last_updated | Datetime | Timestamp of last update |

**Methods:**

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `get_installed_revs()` | None | Dict | Get {name: rev} for all tracked modules |
| `update_rev(technical_name, community_rev)` | str, int | None | Update or create revision record |

**SQL Constraints:**
- `unique_technical_name` - One record per module

---

## Security

### Access Rules (ir.model.access.csv)

| ID | Model | Group | Read | Write | Create | Delete |
|----|-------|-------|------|-------|--------|--------|
| access_samai_client_config_user | samai.client.config | base.group_user | 1 | 0 | 0 | 0 |
| access_samai_client_config_admin | samai.client.config | base.group_system | 1 | 1 | 1 | 1 |
| access_samai_module_rev_user | samai.module.rev | base.group_user | 1 | 0 | 0 | 0 |
| access_samai_module_rev_admin | samai.module.rev | base.group_system | 1 | 1 | 1 | 1 |

---

## API Endpoints (Called by this module)

This module CALLS the following endpoints on the HOST:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/samai/catalog` | POST | Get available modules |
| `/api/samai/check_updates` | POST | Check for updates |
| `/api/samai/download/{id}` | GET | Download module ZIP |
| `/api/samai/request_restart` | POST | Request container restart |

### Request Format

```json
{
    "token": "samai_xxxx_xxxx_xxxx_xxxx",
    "installed": {"module_name": "version"},
    "installed_revs": {"module_name": rev_number}
}
```

### Response Format (check_updates)

```json
{
    "success": true,
    "updates": [
        {
            "id": 123,
            "technical_name": "ai_sam_intelligence",
            "installed_version": "18.0.1.0",
            "available_version": "18.0.1.1",
            "installed_rev": 1,
            "available_rev": 2
        }
    ]
}
```

---

## System Parameters

| Parameter | Description |
|-----------|-------------|
| `samai.host_url` | Host URL (set during provisioning) |
| `samai.api_token` | API token (set during provisioning) |

---

## Cron Jobs

### SAM AI Update Check

**File:** `data/cron_data.xml`

| Property | Value |
|----------|-------|
| Interval | Daily (or as configured) |
| Model | samai.client.config |
| Method | _cron_check_updates |
| User | Administrator |

**Behavior:**
- Checks for available updates
- Stores results in `updates_available` and `pending_updates`
- Does NOT auto-apply (user must click button)

---

## Assets

### web.assets_backend

```python
'web.assets_backend': [
    'samai_client/static/src/scss/update_systray.scss',
    'samai_client/static/src/js/update_systray.js',
    'samai_client/static/src/xml/update_systray.xml',
]
```

### Systray Widget

**File:** `static/src/js/update_systray.js`

OWL component that displays update notification badge in systray when `updates_available > 0`.

---

## Update Flow

```
1. Cron or user triggers check_updates()
   ↓
2. Get installed SAM AI modules (sam%, ai_sam%, samai%)
   ↓
3. Get installed community_revs from samai.module.rev
   ↓
4. POST to host /api/samai/check_updates
   ↓
5. Host compares versions AND community_revs
   ↓
6. Store results: updates_available, pending_updates
   ↓
7. User clicks "Apply Updates"
   ↓
8. Download each update ZIP from /api/samai/download/{id}
   ↓
9. Extract to /mnt/extra-addons (or first writable path)
   ↓
10. Update samai.module.rev with new community_rev
    ↓
11. Set restart_pending = True
    ↓
12. User clicks "Request Restart"
    ↓
13. POST to host /api/samai/request_restart
    ↓
14. Container restarts, modules upgraded
```

---

## Module Detection Logic

SAM AI modules are identified by:

```python
[
    ('state', '=', 'installed'),
    '|', '|', '|',
    ('name', 'like', 'sam%'),
    ('name', 'like', 'ai_sam%'),
    ('name', 'like', 'samai%'),
    ('author', 'ilike', 'SME%'),
]
```

---

## Addons Path Selection

Priority order for extracting updates:
1. Path containing `extra-addons` (client's writable space)
2. First writable path from `odoo.tools.config['addons_path']`

Write test performed before selection.

---

**Last Updated:** 2025-01-26
**Verified Against:** __manifest__.py, security/ir.model.access.csv, models/*.py
