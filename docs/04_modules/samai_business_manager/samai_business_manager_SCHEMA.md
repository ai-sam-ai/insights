# samai_business_manager - Technical Schema

> **Technical Truth File** - Exact specifications, no interpretation

---

## Module Identification

```
Technical Name: samai_business_manager
Version: 18.0.4.0.0
Category: SAM AI/Business Units
License: LGPL-3
Application: True
Sequence: 1
```

---

## Dependencies

```python
'depends': [
    'base',
    'web',
]
```

---

## Models

### 1. samai.business.unit
**File:** `models/business_unit.py`

| Field | Type | Description |
|-------|------|-------------|
| name | Char | Business Unit name (required) |
| technical_name | Char | Technical identifier |
| sequence | Integer | Display order |
| is_enabled | Boolean | Visibility control |
| icon | Char | Menu icon class |
| description | Text | Business Unit description |
| menu_ids | One2many | Claimed menus |
| user_ids | Many2many | Assigned users |
| default_action_id | Many2one | Default landing action |

### 2. samai.business.unit.menu
**File:** `models/business_unit_menu.py`

| Field | Type | Description |
|-------|------|-------------|
| business_unit_id | Many2one | Parent Business Unit |
| menu_id | Many2one | Claimed ir.ui.menu |
| sequence | Integer | Display order |
| original_parent_id | Many2one | Original menu parent (for restoration) |

### 3. samai.business.unit.custom.menu
**File:** `models/custom_menu.py`

| Field | Type | Description |
|-------|------|-------------|
| name | Char | Custom menu name |
| business_unit_id | Many2one | Parent Business Unit |
| menu_id | Many2one | Generated ir.ui.menu |
| variant_ids | One2many | Contact variants |

### 4. samai.business.unit.contact.variant
**File:** `models/custom_menu.py`

| Field | Type | Description |
|-------|------|-------------|
| name | Char | Variant name (e.g., "Leads") |
| custom_menu_id | Many2one | Parent Custom Menu |
| domain | Char | Filter domain |
| action_id | Many2one | Generated window action |

### 5. ir.ui.menu (Extension)
**File:** `models/ir_ui_menu.py`

| Method | Purpose |
|--------|---------|
| _load_menus_blacklist() | Override to hide disabled Business Unit menus |

---

## Wizards

### samai.business.system.builder
**File:** `wizard/system_builder.py`

| Field | Type | Description |
|-------|------|-------------|
| business_unit_ids | Many2many | Units to enable |
| mode | Selection | 'enable' or 'disable' |

| Method | Purpose |
|--------|---------|
| action_apply() | Apply enable/disable changes |

---

## Security

### Groups
- `group_business_unit_user` - Read-only access to Business Units
- `group_business_unit_admin` - Full access to manage Business Units

### Access Rules (ir.model.access.csv)

| Model | User Access | Admin Access |
|-------|-------------|--------------|
| samai.business.unit | Read | Full |
| samai.business.unit.menu | Read | Full |
| samai.business.unit.custom.menu | Read | Full |
| samai.business.unit.contact.variant | Read | Full |
| samai.business.system.builder | None | Full (base.group_system) |

---

## Platform Service

**File:** `utils/platform_service.py`

### Enums

```python
class PlatformType(Enum):
    DOCKER = "docker"
    WINDOWS = "windows"
    LINUX = "linux"
    MACOS = "macos"
    UNKNOWN = "unknown"
```

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `get_platform_type()` | None | PlatformType | Detect current platform |
| `get_log_path(env=None)` | Optional env | Path | Platform-appropriate log directory |
| `restart_service(env=None)` | Optional env | Tuple[bool, str] | Restart Odoo service |
| `kill_odoo_processes()` | None | Tuple[int, List[str]] | Kill stale Odoo workers |
| `clear_odoo_logs(env=None)` | Optional env | int | Clear log files, return count |
| `is_docker()` | None | bool | Quick Docker detection |
| `get_data_dir(env=None)` | Optional env | Path | Odoo data directory |

### Platform Detection Logic

```
1. Check /.dockerenv file exists → DOCKER
2. Check platform.system() == 'Windows' → WINDOWS
3. Check platform.system() == 'Darwin' → MACOS
4. Check platform.system() == 'Linux' → LINUX
5. Fallback → UNKNOWN
```

---

## Assets

### web.assets_backend

```python
'web.assets_backend': [
    'samai_business_manager/static/src/css/system_builder_modal.css',
    'samai_business_manager/static/src/components/business_unit_selector/business_unit_selector.xml',
    'samai_business_manager/static/src/components/business_unit_selector/business_unit_selector.js',
]
```

---

## Data Files

| File | Purpose |
|------|---------|
| `data/business_units.xml` | Default Business Units (Sales, Accounting, HR, etc.) |
| `data/menu_claims.xml` | Initial menu → Business Unit assignments |
| `data/custom_menus.xml` | Contact variant templates |
| `security/security.xml` | Security groups definition |

---

## Hooks

### post_init_hook

**File:** `__init__.py`

```python
def post_init_hook(cr, registry):
    # Initialize default Business Units and menu claims
    # Called after module installation
```

---

## Views

| View | Type | Model |
|------|------|-------|
| business_unit_tree | Tree | samai.business.unit |
| business_unit_form | Form | samai.business.unit |
| business_unit_kanban | Kanban | samai.business.unit |
| business_unit_menu_tree | Tree | samai.business.unit.menu |
| system_builder_form | Form | samai.business.system.builder |
| business_dashboard | QWeb | N/A (client action) |

---

## Architecture Notes

### v4.0 Consolidation
- Merged `samai_business_management` into this module
- Single source of truth for Business Unit navigation

### v3.0 Menu Visibility
- Uses `_load_menus_blacklist()` standard extension
- Menus hidden until Business Unit enabled
- No phantom menus in app switcher

### v2.0 Navigation Change
- Removed parallel dropdown navigation (systray switcher)
- All navigation via native ir.ui.menu
- Scales to 10K+ users

---

## Usage Examples

### Import Platform Service
```python
from odoo.addons.samai_business_manager.utils import platform_service

# Detect platform
platform = platform_service.get_platform_type()

# Get log path
log_path = platform_service.get_log_path()

# Restart service
success, message = platform_service.restart_service()
```

### Enable Business Unit Programmatically
```python
unit = env['samai.business.unit'].search([('technical_name', '=', 'sales')])
unit.is_enabled = True
env['ir.ui.menu'].clear_caches()  # Refresh menu blacklist
```

---

**Last Updated:** 2025-01-26
**Verified Against:** __manifest__.py, security/ir.model.access.csv, models/*.py
