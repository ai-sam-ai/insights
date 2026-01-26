# Schema: github_app

> **Technical Truth** - Models, fields, and git operations

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `github_app` |
| **Version** | 18.0.3.0.0 |
| **Total Models** | 4 (2 regular, 2 transient) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### git.hub.account (GitHub Account)

**Purpose:** Stores GitHub credentials and default settings. Multiple repositories can reference one account.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Friendly account name (e.g., "SMEBusinessSupport") |
| `username` | Char | Yes | GitHub username |
| `email` | Char | No | Email associated with account |
| `pat` | Char | Yes | Personal Access Token for authentication |
| `default_base_path` | Char | Yes | Default directory for repos (e.g., "/opt/odoo18/odoo_gh/") |
| `active` | Boolean | No | Active flag (default: True) |
| `config_file_path` | Char | No | Path to Odoo config file (default: "/etc/odoo18.conf") |
| `config_file_content` | Text | No | Loaded config file content |
| `repo_ids` | One2many | - | Related repositories |
| `repo_count` | Integer | - | Computed count of repos |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_view_repositories()` | Open list of repos for this account | Window action |
| `action_test_connection()` | Test PAT via GitHub API | Notification |
| `action_load_config()` | Load config file into text field | Notification |
| `action_save_config()` | Save text field back to config file | Notification |
| `action_sync_addons_path()` | Sync addons_path with enabled repos | Notification |

**SQL Constraints:**
- `unique_name` - Account name must be unique
- `unique_username` - GitHub username must be unique

---

### git.hub (GitHub Repository)

**Purpose:** Stores repository configuration and handles git operations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `account_id` | Many2one | Yes | Link to git.hub.account |
| `active` | Boolean | No | Active flag (default: True) |
| `url` | Char | Yes | Repository URL (HTTPS or SSH) |
| `branch` | Char | No | Branch name (default: "main") |
| `directory_name` | Char | No | Folder name (auto-computed from URL) |
| `directory` | Char | - | Full path (computed: base_path + directory_name) |
| `custom_base_path` | Char | No | Override base path for this repo only |
| `path_enabled` | Boolean | No | Include in addons_path (default: True) |
| `display_name` | Char | - | Computed: "[Account] repo (branch)" |
| `repo_name` | Char | - | Computed from URL |
| `account_name` | Char | - | Related field from account |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `git_secure_pull()` | Clone or pull repository | Notification |
| `git_push_to_remote()` | Stage, commit, and push changes | Notification |

**SQL Constraints:**
- `uniq_account_url_branch` - Same repo/branch can't exist twice per account

**Relationships:**
- `account_id` → `git.hub.account` (Many2one)

---

### git.hub.app (Transient - Pull Wizard)

**Purpose:** Wizard for triggering git pull operations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `git_hub_id` | Many2one | Yes | Repository to operate on |
| `pat` | Char | No | Optional PAT override for this operation |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_git()` | Execute git_secure_pull on selected repo | Notification |

---

### version.check (Transient - Version Check)

**Purpose:** Compare installed vs latest module versions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `module_name` | Text | - | Computed list of outdated modules |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `upgrade_module()` | Upgrade all outdated modules | None |
| `check_version()` | Recompute module list | Action |

---

## Git Operations Flow

### Clone Operation

```
git_secure_pull() called on new repo
         │
         ├── Check: .git directory exists?
         │         NO
         │          │
         ▼          ▼
    ┌─────────────────────────────────────┐
    │  Clone repository                    │
    │                                      │
    │  1. Get PAT from account            │
    │  2. Build secure URL with PAT       │
    │  3. Repo.clone_from(secure_url)     │
    │  4. Restore clean URL (no PAT)      │
    └─────────────────────────────────────┘
```

### Pull Operation

```
git_secure_pull() called on existing repo
         │
         ├── Check: .git directory exists?
         │         YES
         │          │
         ▼          ▼
    ┌─────────────────────────────────────┐
    │  Pull latest changes                 │
    │                                      │
    │  1. Checkout branch                  │
    │  2. Try simple pull                  │
    │     └── If auth fails on HTTPS:     │
    │         a. Get PAT from account     │
    │         b. Set secure URL           │
    │         c. Pull with credentials    │
    │         d. Restore clean URL        │
    └─────────────────────────────────────┘
```

### Push Operation

```
git_push_to_remote() called
         │
         ▼
    ┌─────────────────────────────────────┐
    │  Push changes                        │
    │                                      │
    │  1. Checkout branch                  │
    │  2. git add -A                       │
    │  3. Check if dirty                   │
    │     └── If clean: return "skipped"  │
    │  4. Commit with auto-message        │
    │  5. Try push                         │
    │     └── If auth fails on HTTPS:     │
    │         a. Set secure URL           │
    │         b. Push with credentials    │
    │         c. Restore clean URL        │
    └─────────────────────────────────────┘
```

---

## Security Model

### Access Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `git.hub.account` | All users | ✅ | ✅ | ✅ | ✅ |
| `git.hub` | All users | ✅ | ✅ | ✅ | ✅ |
| `git.hub.app` | All users | ✅ | ✅ | ✅ | ✅ |
| `version.check` | All users | ✅ | ✅ | ✅ | ✅ |

**Note:** No group restriction means all users can manage repos. Consider adding admin-only restriction in production.

### Credential Security

- PAT stored in `git.hub.account.pat` field (encrypted at rest by Odoo)
- PAT **never** written to `.git/config`
- Secure URL used only in-memory during operations
- Clean URL restored immediately after git operations

---

## Config File Management

### Addons Path Sync Flow

```
action_sync_addons_path()
         │
         ▼
    ┌─────────────────────────────────────┐
    │  1. Load config if not loaded       │
    │  2. Parse current addons_path       │
    │  3. Get enabled repo paths          │
    │  4. Keep non-repo paths             │
    │  5. Build new addons_path           │
    │  6. Update config_file_content      │
    │  7. User clicks "Save Config"       │
    └─────────────────────────────────────┘
```

### Backup Strategy

Before saving config:
```
/etc/odoo18.conf.backup.20250126_143052
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `git_hub_account` | `git.hub.account` | GitHub account credentials |
| `git_hub` | `git.hub` | Repository configurations |

---

## File Structure

```
github_app/
├── __init__.py
├── __manifest__.py
├── controllers/
│   └── __init__.py                    # Empty
├── lib/
│   └── git/                           # Bundled GitPython library
│       ├── __init__.py
│       ├── cmd.py
│       ├── compat.py
│       ├── config.py
│       ├── db.py
│       ├── diff.py
│       ├── exc.py
│       ├── index/
│       ├── objects/
│       ├── refs/
│       └── ...
├── models/
│   ├── __init__.py
│   ├── github_account.py              # Account model
│   ├── github_view_settings.py        # Repository model
│   ├── github_view_app.py             # Pull wizard
│   └── version_check.py               # Version comparison
├── security/
│   ├── ir.model.access.csv
│   └── partner_touch_security.xml
└── views/
    ├── github_view_settings.xml
    ├── github_account_views.xml
    ├── github_view_apps.xml
    └── version_check.xml
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
