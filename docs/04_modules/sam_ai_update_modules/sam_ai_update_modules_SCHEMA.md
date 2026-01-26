# Schema: sam_ai_update_modules

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_update_modules` |
| **Version** | 18.0.1.8 |
| **Total Models** | 1 |
| **Total Controllers** | 0 |
| **API Endpoints** | 2 (JSON-RPC methods) |

---

## Models

### sam.upgrade.queue

**Purpose:** Stores modules queued for batch upgrade with state tracking

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Computed | "[position] module_name" display |
| `module_id` | Many2one | Yes | Link to ir.module.module (installed only) |
| `module_name` | Char | Related | Technical name from module_id |
| `position` | Integer | Yes | Queue order (1-20) |
| `state` | Selection | Yes | pending / upgrading / done / error / skipped |
| `started_at` | Datetime | No | When upgrade started |
| `completed_at` | Datetime | No | When upgrade finished |
| `error_message` | Text | No | Error details if failed |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `start_upgrade_queue()` | Start batch upgrade process | Notification |
| `action_reset_to_pending()` | Reset selected items | Notification |
| `action_skip()` | Skip selected items | None |
| `action_reset_all()` | Reset ALL queue items | Notification |
| `action_open_queue()` | Open queue management view | Window action |
| `get_queue_status()` | Get status summary (for UI) | Dict |
| `ping()` | Lightweight server check | Dict |
| `_register_hook()` | Post-load hook for upgrade completion | None |

**Constraints:**
- `_check_position` - Position must be 1-20
- `_check_unique_module` - Same module cannot be in queue twice

---

## JSON-RPC Endpoints

These are model methods callable via JSON-RPC:

### get_queue_status

**Purpose:** Get current queue status for UI updates

**Call:**
```python
self.env['sam.upgrade.queue'].get_queue_status()
```

**Response:**
```json
{
    "total": 5,
    "pending": 2,
    "upgrading": 1,
    "done": 2,
    "error": 0,
    "skipped": 0,
    "current_modules": ["ai_sam", "ai_sam_base"],
    "done_modules": ["sam_ui_theme", "base"],
    "modules": [
        {"name": "ai_sam", "state": "upgrading", "position": 1},
        {"name": "ai_sam_base", "state": "upgrading", "position": 2}
    ]
}
```

### ping

**Purpose:** Check if server is up (used by overlay to detect restart completion)

**Call:**
```python
self.env['sam.upgrade.queue'].ping()
```

**Response:**
```json
{
    "status": "ok",
    "timestamp": "2025-01-26 10:00:00"
}
```

---

## Upgrade Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Actions                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1. Configure modules (positions 1-20)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  sam.upgrade.queue records (state='pending')                     │
│                                                                  │
│  [1] ai_sam       pending                                        │
│  [2] ai_sam_base  pending                                        │
│  [3] sam_ui_theme pending                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 2. Click "Activate Upgrade"
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  start_upgrade_queue()                                           │
│                                                                  │
│  - Mark all as 'upgrading'                                       │
│  - Commit to database                                            │
│  - Call module.button_upgrade() for each                         │
│  - Call first_module.button_immediate_upgrade()                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 3. Odoo performs in-process upgrade
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Registry reloads with update_module=True                        │
│                                                                  │
│  JS Overlay shows progress via get_queue_status() polling        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 4. Upgrade completes
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Mark all as 'done'                                              │
│  Wait 5 seconds (for UI to show green checkmarks)                │
│  Auto-reset to 'pending' for next cycle                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Assets

### JavaScript Files

| File | Bundle | Purpose |
|------|--------|---------|
| `upgrade_early_load.js` | web.assets_frontend, web.assets_backend | Dark background on page load to prevent white flash |
| `upgrade_overlay.js` | web.assets_backend | Full-screen gold star progress overlay |
| `upgrade_action.js` | web.assets_backend | Action handler integration |

### CSS Files

| File | Bundle | Purpose |
|------|--------|---------|
| `upgrade_overlay.css` | web.assets_backend | Overlay styling (gold stars, progress) |

### Asset Loading Order

```python
'assets': {
    'web.assets_frontend': [
        ('before', 'web/static/src/core/browser/browser.js',
         'sam_ai_update_modules/static/src/js/upgrade_early_load.js'),
    ],
    'web.assets_backend': [
        'sam_ai_update_modules/static/src/css/upgrade_overlay.css',
        ('before', 'web/static/src/core/browser/browser.js',
         'sam_ai_update_modules/static/src/js/upgrade_early_load.js'),
        'sam_ai_update_modules/static/src/js/upgrade_overlay.js',
        'sam_ai_update_modules/static/src/js/upgrade_action.js',
    ],
},
```

Note: `upgrade_early_load.js` loads BEFORE Odoo's browser.js for instant dark background.

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `sam.upgrade.queue` | base.group_system | Yes | Yes | Yes | Yes |

Note: Only administrators can manage the upgrade queue.

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `sam_upgrade_queue` | `sam.upgrade.queue` | Queue items with state tracking |

---

## Selection Field Values

### state (sam.upgrade.queue)
- `pending` - Waiting to be upgraded
- `upgrading` - Currently being upgraded
- `done` - Upgrade completed successfully
- `error` - Upgrade failed with error
- `skipped` - User skipped this module

---

## Hooks

### post_load Hook

The module defines a `post_load_hook` in `__manifest__.py`:

```python
'post_load': 'post_load_hook',
```

This initializes early-stage functionality before the registry is fully loaded.

### _register_hook

The model's `_register_hook()` method runs after registry load on EVERY server start. It marks any 'upgrading' items as 'done' (because if server started, upgrade succeeded).

---

## localStorage Keys

The overlay uses browser localStorage to persist state across page refreshes:

| Key | Purpose |
|-----|---------|
| `sam_upgrade_active` | Is upgrade in progress? |
| `sam_upgrade_start_time` | When upgrade started |
| `sam_upgrade_modules` | List of modules being upgraded |

**Example localStorage Values:**

```javascript
// When upgrade starts
localStorage.setItem('sam_upgrade_active', 'true');
localStorage.setItem('sam_upgrade_start_time', '2025-01-26T10:30:00.000Z');
localStorage.setItem('sam_upgrade_modules', JSON.stringify([
    'ai_sam',
    'ai_sam_base',
    'sam_ui_theme'
]));

// Reading values in overlay JS
const isActive = localStorage.getItem('sam_upgrade_active') === 'true';
const startTime = new Date(localStorage.getItem('sam_upgrade_start_time'));
const modules = JSON.parse(localStorage.getItem('sam_upgrade_modules') || '[]');

// When upgrade completes (auto-cleared)
localStorage.removeItem('sam_upgrade_active');
localStorage.removeItem('sam_upgrade_start_time');
localStorage.removeItem('sam_upgrade_modules');
```

**Overlay Behavior:**
1. On page load, JS checks `sam_upgrade_active`
2. If `true`, overlay displays immediately (before Odoo loads)
3. Overlay polls `get_queue_status()` to update progress
4. When all modules show `done`, overlay clears localStorage and allows continue

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
