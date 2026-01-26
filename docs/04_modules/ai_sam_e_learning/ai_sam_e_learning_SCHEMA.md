# Schema: ai_sam_e_learning

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_e_learning` |
| **Version** | 18.0.1.1.0 |
| **Total Models** | 2 (1 inherited, 1 new) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses website_slides routes) |

---

## Models

### res.config.settings (Inherited)

**Purpose:** Add eLearning-specific settings to Website > Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `elearning_disable_fullscreen` | Boolean | No | Disable auto-fullscreen on lesson click (config_parameter) |
| `elearning_header_color` | Char | No | Custom header background color (default: #4A90FF) |
| `elearning_enable_menu_categories` | Boolean | No | Enable custom menu category feature |
| `elearning_full_width` | Boolean | No | Use full browser width for eLearning pages |

**Config Parameters:**
- `ai_sam_e_learning.disable_fullscreen`
- `ai_sam_e_learning.header_color`
- `ai_sam_e_learning.enable_menu_categories`
- `ai_sam_e_learning.full_width`

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_upgrade_elearning_module()` | Trigger module upgrade to apply changes | Reload action |

---

### elearning.menu.category (New Model)

**Purpose:** Define custom URL routes with filtered course views

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name (e.g., "SAM Docs") |
| `slug` | Char | Yes | URL-friendly slug (e.g., "sam-docs" for /learn/sam-docs) |
| `sequence` | Integer | No | Display order (default: 10) |
| `active` | Boolean | No | Active flag (default: True) |
| `tag_ids` | Many2many | No | Filter by slide.channel.tag |
| `channel_ids` | Many2many | No | Filter by specific slide.channel courses |
| `banner_title` | Char | No | Custom title in banner |
| `banner_color` | Char | No | Custom banner color (e.g., #875A7B) |
| `description` | Html | No | Category description |
| `create_website_menu` | Boolean | No | Auto-create website.menu item (default: True) |
| `website_menu_id` | Many2one | No | Created website.menu (readonly) |
| `parent_menu_id` | Many2one | No | Parent menu item |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `_create_website_menu()` | Create website menu item | None |
| `_update_website_menu()` | Update existing menu item | None |
| `_onchange_name()` | Auto-generate slug from name | None |

**SQL Constraints:**
- `slug_unique` - URL slug must be unique

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│ elearning.menu.category │
│                         │
│  - name                 │
│  - slug                 │
│  - tag_ids ─────────────┼──────► slide.channel.tag
│  - channel_ids ─────────┼──────► slide.channel
│  - website_menu_id ─────┼──────► website.menu
│  - parent_menu_id ──────┼──────► website.menu
└─────────────────────────┘
```

---

## Frontend Assets

### web.assets_frontend

| File | Purpose |
|------|---------|
| `slides_disable_fullscreen.js` | Override fullscreen behavior based on config setting |

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `elearning.menu.category` | base.group_user | Yes | No | No | No |
| `elearning.menu.category` | website_slides.group_website_slides_manager | Yes | Yes | Yes | Yes |

---

## Settings Menu Path

**Website > Configuration > eLearning**

- Disable Fullscreen Mode
- Header Background Color
- Enable Menu Categories
- Full Page Width

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
| 2025-01-26 | Enhanced to 10/10: Corrected security rules | CTO Module Docs Reviewer |
