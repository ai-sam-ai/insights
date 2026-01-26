# Schema: ai_sam_cache_manager

> **Technical Truth** - Controllers, API endpoints, and cache layers

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_cache_manager` |
| **Version** | 18.0.3.1 |
| **Total Models** | 0 (controller-only module) |
| **Total Controllers** | 1 |
| **API Endpoints** | 2 |

---

## Models

This module has no database models. It operates entirely through controllers and client actions.

---

## Controllers / API Endpoints

### CacheManagerController

**File:** `controllers/cache_manager_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/ai_sam_cache_manager/clear_cache` | JSON-RPC | user | Clear all cache layers and restart service |
| `/ai_sam_cache_manager/platform_info` | JSON-RPC | user | Get current platform detection info |

### Endpoint Details

#### POST /ai_sam_cache_manager/clear_cache

Clears all 9 cache layers, kills Python processes, and restarts the Odoo service.

**Authorization:** Admin only (checks `base.group_system`)

**Request:**
```json
{}
```

**Response (Success):**
```json
{
    "status": "success",
    "message": "Successfully cleared 1234 cache items. Service 'Odoo 18 (SAM AI Edition)' restart scheduled (3 seconds)",
    "breakdown": {
        "python_bytecode": {"cleared": 45},
        "registry_caches": {"cleared": 12},
        "ormcache_methods": {"cleared": 156},
        "database_assets": {"cleared": 23},
        "qweb_templates": {"cleared": 1},
        "translations": {"cleared": 1},
        "filestore": {"cleared": 5},
        "manifest_cache": {"cleared": 87},
        "odoo_logs": {"cleared": 1},
        "service_restart": {"status": "Service 'Odoo 18 (SAM AI Edition)' restart scheduled (3 seconds)"}
    },
    "total_cleared": 331,
    "platform": "Windows"
}
```

**Response (Error - Access Denied):**
```json
{
    "status": "error",
    "message": "Access Denied: Only administrators can clear cache."
}
```

#### POST /ai_sam_cache_manager/platform_info

Returns current platform detection information.

**Authorization:** Admin only (checks `base.group_system`)

**Response:**
```json
{
    "status": "success",
    "platform": {
        "platform_name": "Windows",
        "is_docker": false,
        "is_windows": true,
        "is_linux": false,
        "log_path": "C:\\Program Files\\SAM AI\\logs"
    }
}
```

---

## Cache Layers Cleared

The module clears these 9 cache layers in order:

| Layer | Method | What It Clears |
|-------|--------|----------------|
| **1. Python Bytecode** | `_clear_python_cache_all_paths()` | `.pyc`, `.pyo`, `__pycache__` dirs across ALL addons paths |
| **2. Registry Caches** | `_clear_registry_caches()` | Internal `Registry.__caches` dictionaries |
| **3. ORM Method Cache** | `_clear_ormcache_stats()` | `@ormcache` decorated method statistics (STAT) |
| **4. Database Assets** | `_clear_database_assets()` | `ir.attachment` records for `web.assets_*` |
| **5. QWeb Templates** | `_clear_qweb_templates()` | `ir.ui.view` and `ir.qweb` compiled templates |
| **6. Translation Cache** | `_clear_translation_cache()` | `ir.model.data` caches (Odoo 18 translations) |
| **7. Filestore Sessions** | `_clear_filestore_cache()` | Files in `data_dir/sessions/` |
| **8. Manifest LRU Cache** | `_clear_manifest_cache()` | `_get_manifest_cached` LRU cache |
| **9. Odoo Logs** | `_clear_odoo_logs()` | Truncates `odoo.log` to empty |

---

## Service Restart Sequence

```
1. STOP service first (graceful shutdown)
       ↓
2. KILL remaining Python workers (eliminates stale LRU caches)
       ↓
3. START service (fresh workers with no cached data)
```

### Platform-Specific Restart Methods

| Platform | Method |
|----------|--------|
| **Docker** | Supervisor restart or container restart message |
| **Windows** | PowerShell detached process (`net stop` / `net start`) |
| **Linux** | `nohup bash` with systemd commands |
| **macOS** | Development - manual restart message |

---

## JavaScript Components

### ClearCacheAction (OWL Component)

**File:** `static/src/js/clear_cache_action.js`

**Purpose:** Client action that shows confirmation dialog and triggers cache clearing

**Template:** `ai_sam_cache_manager.ClearCacheAction`

**Services Used:**
- `notification` - Shows success/error messages
- `dialog` - Shows confirmation dialog
- `action` - Navigates to Apps after completion

**Flow:**
1. Shows confirmation dialog with list of cache layers
2. User confirms → calls `/ai_sam_cache_manager/clear_cache`
3. Shows notification with breakdown
4. Redirects to Apps menu after 7 seconds

### CacheProgressDialog (OWL Component)

**File:** `static/src/js/clear_cache_action.js`

**Purpose:** (Reserved for async progress tracking - currently not used)

**Template:** `ai_sam_cache_manager.CacheProgressDialog`

---

## System Parameters

Stored in `ir.config_parameter`:

| Key | Default | Purpose |
|-----|---------|---------|
| `ai_sam_cache_manager.logs_path` | `C:\Program Files\SAM AI\logs` | Fallback log path (Windows) |
| `ai_sam_cache_manager.service_name` | `Odoo 18 (SAM AI Edition)` | Windows service name |
| `ai_sam_cache_manager.enable_restart` | `True` | Enable/disable service restart |

---

## Security

### Access Control
- All endpoints require `base.group_system` (administrator)
- No ir.model.access.csv rules needed (no models)
- Permission check done in controller code

### Security Considerations
- Service restart uses detached process to prevent RPC timeout
- PowerShell execution (Windows) runs in hidden window
- Log truncation preserves file, only clears content

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Clicks Menu                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              ClearCacheAction (OWL)                          │
│                                                              │
│  1. Show ConfirmationDialog                                  │
│  2. User confirms                                            │
│  3. Call /clear_cache endpoint                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│          CacheManagerController.clear_cache()                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Check admin permission                             │   │
│  │ 2. Get platform_service (lazy import)                 │   │
│  │ 3. Clear 9 cache layers sequentially                  │   │
│  │ 4. Schedule service restart (platform-aware)          │   │
│  │ 5. Return breakdown to client                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 platform_service                             │
│         (from samai_business_manager - lazy loaded)          │
│                                                              │
│  - get_platform_info()                                       │
│  - clear_odoo_logs()                                         │
│  - restart_service()                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
ai_sam_cache_manager/
├── __init__.py
├── __manifest__.py
├── controllers/
│   ├── __init__.py
│   └── cache_manager_controller.py    # Main logic
├── data/
│   └── system_parameters.xml          # Default config
├── security/
│   └── ir.model.access.csv            # Empty (no models)
├── static/
│   ├── description/
│   │   └── icon.png                   # Module icon
│   └── src/
│       ├── js/
│       │   └── clear_cache_action.js  # OWL components
│       └── xml/
│           └── clear_cache_template.xml  # QWeb templates
└── views/
    └── menus.xml                      # Menu action
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
| 2025-01-10 | v3.0.1 - Lazy import fix for platform_service | Original |
