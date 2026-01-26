# Schema: sam_ai_odoo_modules

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_odoo_modules` |
| **Version** | 18.0.2.0.0 |
| **Total Models** | 2 (1 extension, 1 new) |
| **Total Services** | 1 (AbstractModel) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses Odoo's standard module actions) |

---

## Models

### ir.module.module (Extended)

**Purpose:** Extends native Odoo module model to support remote/downloadable modules

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `is_remote` | Boolean | No | True if module is available remotely but not downloaded |
| `source_type` | Selection | No | native / odoo_community / odoo_enterprise / oca / samai / third_party / custom |
| `github_org` | Char | No | GitHub organization (e.g., "OCA") |
| `github_repo` | Char | No | Repository name (e.g., "web") |
| `github_branch` | Char | No | Branch to pull from (default: "18.0") |
| `github_path` | Char | No | Path within repo to module |
| `github_url` | Char | Computed | Full GitHub URL |
| `github_token_required` | Boolean | No | True if private repo |
| `remote_state` | Selection | No | available / downloading / downloaded / error |
| `remote_state_message` | Text | No | Error/status message for remote operations |
| `repository_id` | Many2one | No | Link to source repository |
| `download_count` | Integer | No | Times downloaded |
| `last_downloaded` | Datetime | No | When last downloaded |
| `last_remote_sync` | Datetime | No | When info last synced |
| `local_source_path` | Char | No | Path for local filesystem repos |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `button_immediate_install()` | Override - downloads remote modules first | Super result |
| `button_install()` | Override - downloads remote modules first | Super result |
| `_action_download()` | Internal download method | Boolean |
| `action_download()` | Public download action (UI button) | Notification |
| `action_download_and_install()` | One-click download + install | Install action |
| `action_view_on_github()` | Open module on GitHub | URL action |
| `action_reset_remote_state()` | Reset state after error | None |
| `create_or_update_remote_module()` | Upsert remote module record | Record |
| `sync_remote_modules_state()` | Check if remote modules exist on disk | Boolean |
| `cleanup_orphaned_remote_modules()` | Remove orphaned remote records | Boolean |

---

### module.catalog.repository

**Purpose:** Stores repository configurations for module discovery

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Repository name (e.g., "SAM AI Core") |
| `sequence` | Integer | No | Display order |
| `active` | Boolean | Yes | Is repository active |
| `repository_type` | Selection | Yes | github_public / github_private / local_filesystem |
| `github_org` | Char | No | GitHub organization |
| `github_repo` | Char | No | Repository name |
| `github_branch` | Char | No | Branch (default: "18.0") |
| `github_token` | Char | No | Personal access token for private repos |
| `is_private` | Boolean | No | Is private repository |
| `local_path` | Char | No | Absolute path for local filesystem repos |
| `source_type` | Selection | Yes | Default source type for discovered modules |
| `default_license` | Selection | No | Default license (LGPL-3, OEEL-1, etc.) |
| `last_scan` | Datetime | No | When last scanned |
| `last_scan_result` | Text | No | Result message from last scan |
| `module_count` | Integer | Computed | Modules found from this repo |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_scan_repository()` | Scan repo for Odoo modules | Notification |
| `_process_discovered_modules()` | Create/update ir.module.module records | Tuple (created, updated, errors) |
| `_scan_local_filesystem()` | Scan local path for modules | Notification |
| `action_scan_all_repositories()` | Scan all active repos | Notification |
| `action_test_connection()` | Test repo accessibility | Notification |
| `action_view_modules()` | Open filtered Apps list | Window action |

---

### github.download.service (AbstractModel)

**Purpose:** Service model for GitHub operations (download, scan)

| Method | Purpose | Returns |
|--------|---------|---------|
| `download_module_to_addons()` | Download module from GitHub to addons | Dict {success, error} |
| `copy_local_module_to_addons()` | Copy local module to addons | Dict {success, error} |
| `scan_repository()` | Scan GitHub repo for modules | Dict {success, modules, error} |
| `scan_local_path()` | Scan local path for modules | Dict {success, modules, error} |
| `validate_github_url()` | Test if GitHub repo is accessible | Dict {valid, error} |

**Method Examples:**

#### download_module_to_addons()
```python
# Request
result = self.env['github.download.service'].download_module_to_addons(
    github_org='OCA',
    github_repo='web',
    github_branch='18.0',
    module_path='web_responsive',
    github_token=None  # Only needed for private repos
)

# Response (success)
{'success': True, 'path': '/mnt/extra-addons/web_responsive'}

# Response (failure)
{'success': False, 'error': 'HTTP 404: Repository not found'}
```

#### scan_repository()
```python
# Request
result = self.env['github.download.service'].scan_repository(
    github_org='OCA',
    github_repo='web',
    github_branch='18.0',
    github_token=None
)

# Response (success)
{
    'success': True,
    'modules': [
        {'name': 'web_responsive', 'path': 'web_responsive', 'version': '18.0.1.0.0'},
        {'name': 'web_dialog_size', 'path': 'web_dialog_size', 'version': '18.0.1.0.0'}
    ]
}

# Response (failure)
{'success': False, 'modules': [], 'error': 'Rate limit exceeded'}
```

#### validate_github_url()
```python
# Request
result = self.env['github.download.service'].validate_github_url(
    github_org='OCA',
    github_repo='web',
    github_branch='18.0',
    github_token=None
)

# Response (valid)
{'valid': True}

# Response (invalid)
{'valid': False, 'error': 'Branch 18.0 not found'}
```

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│  module.catalog.repository  │
│                             │
│  - name                     │
│  - repository_type          │
│  - github_org/repo/branch   │
│  - local_path               │
└──────────────┬──────────────┘
               │
               │ One2many (implicit via repository_id)
               ▼
┌─────────────────────────────┐
│   ir.module.module          │
│   (Extended)                │
│                             │
│  - is_remote                │
│  - source_type              │
│  - remote_state             │
│  - github_* fields          │
│  - repository_id (M2O)      │
└─────────────────────────────┘
               │
               │ Uses
               ▼
┌─────────────────────────────┐
│  github.download.service    │
│  (AbstractModel)            │
│                             │
│  - download_module_to_addons│
│  - scan_repository          │
│  - validate_github_url      │
└─────────────────────────────┘
```

---

## Workflow: Download to Install

```
1. User adds Repository
   └─→ module.catalog.repository.create()

2. User clicks "Scan Repository"
   └─→ action_scan_repository()
       └─→ github.download.service.scan_repository()
       └─→ _process_discovered_modules()
           └─→ ir.module.module.create_or_update_remote_module()
               (creates records with is_remote=True, remote_state='available')

3. User finds module in Apps, clicks "Install"
   └─→ button_immediate_install() [overridden]
       └─→ if is_remote: _action_download()
           └─→ github.download.service.download_module_to_addons()
           └─→ is_remote = False, remote_state = 'downloaded'
           └─→ ir.module.module.update_list()
       └─→ super().button_immediate_install()

4. Module installs normally via Odoo's standard mechanism
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `module.catalog.repository` | base.group_user | Yes | No | No | No |
| `module.catalog.repository` | base.group_system | Yes | Yes | Yes | Yes |

Note: ir.module.module uses Odoo's built-in security (admin only for state changes).

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `ir_module_module` | `ir.module.module` | Extended with remote source fields |
| `module_catalog_repository` | `module.catalog.repository` | Repository configurations |

---

## Selection Field Values

### source_type (ir.module.module)
- `native` - Native Odoo
- `odoo_community` - Odoo Community
- `odoo_enterprise` - Odoo Enterprise
- `oca` - OCA (Odoo Community Association)
- `samai` - SAM AI Modules
- `third_party` - Third Party
- `custom` - Custom/Private

### remote_state (ir.module.module)
- `available` - Available for Download
- `downloading` - Downloading...
- `downloaded` - Downloaded
- `error` - Download Error

### repository_type (module.catalog.repository)
- `github_public` - GitHub (Public)
- `github_private` - GitHub (Private)
- `local_filesystem` - Local Filesystem

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
