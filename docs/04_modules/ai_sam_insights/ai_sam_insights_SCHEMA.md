# Schema: ai_sam_insights

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_insights` |
| **Version** | 18.0.1.0 |
| **Total Models** | 6 (5 regular, 1 transient-like) |
| **Total Controllers** | 0 |
| **API Endpoints** | 2 (URL actions for reports) |

---

## Models

### insights.scan (Primary Model)

**Purpose:** Stores ecosystem scan configurations and results

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `display_name` | Char | Computed | Scan date + score display |
| `scan_date` | Datetime | Yes | When scan was run |
| `state` | Selection | Yes | draft / running / completed / failed |
| `base_path` | Char | No | Root directory to scan |
| `module_filter` | Char | No | Comma-separated module names to include |
| `include_registry` | Boolean | No | Query Odoo runtime registry |
| `use_default_settings` | Boolean | Yes | Pull config from Settings |
| `health_score` | Integer | No | 0-100 ecosystem health score |
| `health_status` | Char | No | Human-readable status |
| `duration_seconds` | Float | No | How long scan took |
| `files_scanned` | Integer | No | Total files analyzed |
| `models_found` | Integer | No | Python models discovered |
| `views_found` | Integer | No | XML views discovered |
| `actions_found` | Integer | No | Actions discovered |
| `js_files_found` | Integer | No | JS files discovered |
| `css_files_found` | Integer | No | CSS files discovered |
| `critical_count` | Integer | No | Critical issues found |
| `warning_count` | Integer | No | Warnings found |
| `info_count` | Integer | No | Info findings |
| `findings_new` | Integer | No | New findings this scan |
| `findings_recurring` | Integer | No | Recurring findings |
| `report_json` | Text | No | Full report as JSON |
| `full_results_json` | Text | No | Detailed results JSON |
| `error_message` | Text | No | Error if scan failed |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_run_scan()` | Execute ecosystem scan | Boolean |
| `action_view_report()` | Open HTML report viewer | URL action |
| `action_export_json()` | Download results as JSON | URL action |
| `action_run_quick_scan()` | Run quick SAM AI scan | Window action |
| `get_latest_health_score()` | Get most recent score | Dict |

**Relationships:**
- `finding_ids` → `insights.finding` (One2many)
- `relationship_ids` → `insights.relationship` (One2many)

---

### insights.finding

**Purpose:** Individual findings from ecosystem scans with deduplication

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fingerprint` | Char | No | Unique identifier for deduplication |
| `scan_id` | Many2one | No | Most recent scan that detected this |
| `first_seen_scan_id` | Many2one | No | Scan where first detected |
| `first_seen_date` | Datetime | No | When first detected |
| `last_seen_date` | Datetime | No | When last detected |
| `occurrence_count` | Integer | Yes | Times detected across scans |
| `status` | Selection | Yes | new / acknowledged / in_progress / resolved / wont_fix / false_positive |
| `severity` | Selection | Yes | critical / warning / info / recommendation |
| `severity_order` | Integer | Computed | For sorting (1=critical, 4=recommendation) |
| `category` | Selection | No | duplicate / orphan / dangling / commented_code / etc. |
| `finding_type` | Char | No | Specific type within category |
| `title` | Char | No | For recommendations |
| `description` | Text | No | Detailed description |
| `priority` | Selection | No | critical / high / medium / low |
| `effort` | Selection | No | low / medium / high |
| `impact` | Char | No | Impact description |
| `details_json` | Text | No | Raw finding details |
| `file_path` | Char | Computed | Extracted from details |
| `model_name` | Char | Computed | Extracted from details |
| `xml_id` | Char | Computed | Extracted from details |
| `is_resolved` | Boolean | Computed | True if status is resolved/wont_fix/false_positive |
| `resolved_date` | Datetime | No | When resolved |
| `resolved_by` | Many2one | No | User who resolved |
| `resolution_note` | Text | No | Resolution details |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_mark_resolved()` | Mark finding as resolved | None |
| `action_acknowledge()` | Acknowledge finding | None |
| `action_wont_fix()` | Mark as won't fix | None |
| `action_false_positive()` | Mark as false positive | None |
| `find_or_create()` | Upsert finding by fingerprint | Record |
| `_generate_fingerprint()` | Create unique fingerprint | String |

**SQL Constraints:**
- `fingerprint_unique` - Fingerprint must be unique

---

### insights.relationship

**Purpose:** Maps relationships between ecosystem components

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scan_id` | Many2one | Yes | Parent scan |
| `relationship_type` | Selection | Yes | model_trace / inheritance / field_relation / view_inheritance / dependency |
| `source_type` | Selection | No | model / view / action / menu / module |
| `source_name` | Char | No | Source component name |
| `source_file` | Char | No | Source file path |
| `target_type` | Selection | No | Target component type |
| `target_name` | Char | No | Target component name |
| `target_file` | Char | No | Target file path |
| `is_complete` | Boolean | No | Is trace complete? |
| `details_json` | Text | No | Additional details |

---

### insights.scan.settings

**Purpose:** Singleton for default scan configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Default: "Default Scan Settings" |
| `default_scan_path` | Char | No | Root directory for scans |
| `include_registry` | Boolean | Yes | Include registry scan by default |
| `module_ids` | One2many | No | Discovered modules |
| `total_modules` | Integer | Computed | Count of discovered modules |
| `selected_modules` | Integer | Computed | Count of selected modules |
| `last_path_scan` | Datetime | No | When path was last scanned |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_settings()` | Get or create singleton | Record |
| `action_scan_path()` | Discover modules in path | Notification |
| `action_select_all()` | Select all modules | Boolean |
| `action_deselect_all()` | Deselect all modules | Boolean |
| `action_select_sam_modules()` | Select ai_sam* modules | Boolean |
| `get_selected_module_filter()` | Get comma-separated selected names | String |

---

### insights.scan.module

**Purpose:** Individual module discovered during path scan

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `settings_id` | Many2one | Yes | Parent settings |
| `name` | Char | No | Display name |
| `technical_name` | Char | Yes | Module technical name |
| `path` | Char | No | Absolute path to module |
| `version` | Char | No | Module version |
| `summary` | Char | No | Module summary |
| `author` | Char | No | Module author |
| `category` | Char | No | Module category |
| `installable` | Boolean | Yes | Is module installable |
| `selected` | Boolean | Yes | Include in scans |

---

### insights.docs.sync.settings

**Purpose:** Configuration for documentation synchronization between code and docs repository

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Settings name (singleton) |
| `docs_repo_path` | Char | No | Absolute path to documentation repository |
| `modules_docs_path` | Char | No | Relative path within docs repo for module docs (e.g., `docs/04_modules`) |
| `auto_sync_enabled` | Boolean | Yes | Enable automatic sync after scans |
| `sync_on_scan_complete` | Boolean | Yes | Trigger sync when scan completes |
| `last_sync_date` | Datetime | No | When last sync occurred |
| `last_sync_result` | Text | No | Result message from last sync |
| `sync_meta_files` | Boolean | Yes | Sync META.md files |
| `sync_schema_files` | Boolean | Yes | Sync SCHEMA.md files |
| `create_missing_folders` | Boolean | Yes | Auto-create module doc folders if missing |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_settings()` | Get or create singleton | Record |
| `action_sync_now()` | Manually trigger documentation sync | Notification |
| `action_test_paths()` | Verify configured paths exist | Notification |

---

## URL Actions (Pseudo-Endpoints)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/insights/report/<int:id>` | GET | user | View HTML report for scan |
| `/insights/export/<int:id>` | GET | user | Download JSON export of scan |

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│   insights.scan         │
│                         │
│  - base_path            │
│  - health_score         │
│  - state                │
└──────────┬──────────────┘
           │
           │ One2many
           ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  insights.finding       │     │  insights.relationship  │
│                         │     │                         │
│  - fingerprint (unique) │     │  - relationship_type    │
│  - severity             │     │  - source_name          │
│  - category             │     │  - target_name          │
│  - status               │     │  - is_complete          │
└─────────────────────────┘     └─────────────────────────┘

┌─────────────────────────┐
│  insights.scan.settings │ (Singleton)
│                         │
│  - default_scan_path    │
│  - include_registry     │
└──────────┬──────────────┘
           │
           │ One2many
           ▼
┌─────────────────────────┐
│  insights.scan.module   │
│                         │
│  - technical_name       │
│  - selected             │
└─────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `insights.scan` | base.group_user | Yes | Yes | Yes | Yes |
| `insights.finding` | base.group_user | Yes | Yes | Yes | Yes |
| `insights.relationship` | base.group_user | Yes | Yes | Yes | Yes |
| `insights.scan.settings` | base.group_user | Yes | Yes | Yes | Yes |
| `insights.scan.module` | base.group_user | Yes | Yes | Yes | Yes |
| `insights.docs.sync.settings` | base.group_user | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `insights_scan` | `insights.scan` | Scan records and results |
| `insights_finding` | `insights.finding` | Individual findings with fingerprints |
| `insights_relationship` | `insights.relationship` | Component relationships |
| `insights_scan_settings` | `insights.scan.settings` | Default configuration (singleton) |
| `insights_scan_module` | `insights.scan.module` | Discovered modules for selection |
| `insights_docs_sync_settings` | `insights.docs.sync.settings` | Doc sync configuration |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
