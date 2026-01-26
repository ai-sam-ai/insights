# Schema: sam_ai_customization

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_customization` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 6 (5 new, 0 inherit) |
| **Total Controllers** | 0 |
| **Frontend Components** | 8 JS files, 6 XML templates |

---

## Models

### sam.view.customizer (New Model)

**Purpose:** Master record tracking all customizations for a specific base view

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `display_name` | Char | No | Computed: "Model - view_type (view_name)" |
| `base_view_id` | Many2one | Yes | The original view being customized |
| `model_id` | Many2one | Yes | The model this view belongs to |
| `model_name` | Char | No | Related model name |
| `view_type` | Selection | No | Related from base_view_id |
| `inherited_view_id` | Many2one | No | Generated inherited view |
| `customization_ids` | One2many | No | Individual customization records |
| `customization_count` | Integer | No | Computed count |
| `state` | Selection | Yes | draft/applied/error |
| `error_message` | Text | No | Error details if state=error |
| `company_id` | Many2one | No | Company scope |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `get_or_create_for_view(view_id, model_name)` | Find or create customizer | sam.view.customizer record |
| `apply_customizations()` | Generate and apply inherited view | dict with success flag |
| `_build_inherited_arch()` | Build XML arch from customizations | string (XML) |
| `_validate_arch(arch)` | Validate XPath expressions | bool |
| `revert()` | Remove inherited view | dict with success flag |
| `export_xml()` | Export as XML for backup | dict with name and xml |
| `apply_batch_customizations(view_id, model_name, changes)` | Apply from frontend | dict |

**SQL Constraints:**
- `unique_base_view_company` - One customization set per view per company

---

### sam.view.customization (New Model)

**Purpose:** Individual customization record (add/remove/move field, etc.)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customizer_id` | Many2one | Yes | Parent customizer |
| `sequence` | Integer | No | Order of application |
| `operation` | Selection | Yes | add_field/remove_field/move_field/add_group/add_separator |
| `field_id` | Many2one | No | Field reference |
| `field_name` | Char | No | Technical field name |
| `model_id` | Many2one | No | Related from customizer |
| `target_type` | Selection | No | field/group/sheet/notebook/page/form/tree/kanban |
| `target_field_name` | Char | No | Target field for positioning |
| `target_group_string` | Char | No | Target group string attribute |
| `target_xpath` | Char | No | Custom XPath (advanced) |
| `position` | Selection | Yes | before/after/inside/replace/attributes |
| `field_widget` | Char | No | Display widget |
| `field_attrs` | Text | No | Additional attributes (JSON) |
| `field_options` | Text | No | Widget options (JSON) |
| `field_invisible` | Char | No | Invisible condition |
| `field_readonly` | Char | No | Readonly condition |
| `field_required` | Char | No | Required condition |
| `group_string` | Char | No | Group label |
| `group_colspan` | Integer | No | Group colspan |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_build_xpath_element()` | Build XPath XML element | lxml.Element |
| `_get_target_xpath()` | Get XPath expression for target | string |
| `get_widget_suggestions(field_type)` | Get widget options for field type | list of tuples |

---

### sam.report.template (New Model)

**Purpose:** Master template for visual PDF report design

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Template display name |
| `technical_name` | Char | No | Computed: sam_report_{name} |
| `description` | Text | No | Internal notes |
| `model_id` | Many2one | Yes | Target model for report |
| `model_name` | Char | No | Related model name |
| `paper_format_id` | Many2one | No | Paper size/margins |
| `orientation` | Selection | Yes | portrait/landscape |
| `page_width` | Integer | No | Width in pixels (default 794) |
| `page_height` | Integer | No | Height in pixels (default 1123) |
| `margin_top` | Integer | No | Top margin (default 40) |
| `margin_bottom` | Integer | No | Bottom margin (default 40) |
| `margin_left` | Integer | No | Left margin (default 40) |
| `margin_right` | Integer | No | Right margin (default 40) |
| `header_height` | Integer | No | Header section height (default 120) |
| `footer_height` | Integer | No | Footer section height (default 60) |
| `element_ids` | One2many | No | Report elements |
| `element_count` | Integer | No | Computed count |
| `default_style_id` | Many2one | No | Default style preset |
| `qweb_view_id` | Many2one | No | Generated QWeb template |
| `report_action_id` | Many2one | No | Generated report action |
| `state` | Selection | Yes | draft/active/archived |
| `is_default` | Boolean | No | Default for model |
| `replace_standard` | Boolean | No | Replace Odoo standard report |
| `company_id` | Many2one | No | Company scope |
| `last_generated` | Datetime | No | Last generation timestamp |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_generate_report()` | Generate QWeb and report action | notification action |
| `_generate_qweb_template()` | Build QWeb XML from elements | string (XML) |
| `action_preview_pdf()` | Generate preview with sample data | report action |
| `action_open_visual_builder()` | Open drag-drop editor | client action |
| `action_duplicate_template()` | Copy template | window action |
| `export_as_json()` | Export for backup | JSON string |

**Inherits:** mail.thread, mail.activity.mixin

---

### sam.report.element (New Model)

**Purpose:** Individual element on report canvas

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `template_id` | Many2one | Yes | Parent template |
| `name` | Char | No | Element name |
| `element_type` | Selection | Yes | text/field/image/table/line/rectangle/barcode/page_number |
| `section` | Selection | Yes | header/body/footer |
| `position_x` | Integer | No | X position in pixels |
| `position_y` | Integer | No | Y position in pixels |
| `width` | Integer | No | Width in pixels |
| `height` | Integer | No | Height in pixels |
| `z_index` | Integer | No | Layer order |
| `content` | Text | No | Static text content |
| `field_id` | Many2one | No | Dynamic field reference |
| `field_name` | Char | No | Technical field name |
| `field_expression` | Char | No | Custom expression (e.g., partner_id.name) |
| `field_widget` | Char | No | Display widget |
| `field_format` | Char | No | Format string |
| `image_source` | Selection | No | field/static/company_logo |
| `image_field_name` | Char | No | Image field path |
| `image_fit` | Selection | No | contain/cover/stretch |
| `table_source_field` | Char | No | One2many field for table |
| `table_columns` | Text | No | Column definitions (JSON) |
| `table_show_header` | Boolean | No | Show header row |
| `table_show_totals` | Boolean | No | Show totals row |
| `barcode_type` | Selection | No | Code128/Code39/EAN13/QR/etc. |
| `barcode_value_field` | Char | No | Field for barcode value |
| `line_direction` | Selection | No | horizontal/vertical |
| `line_thickness` | Integer | No | Line thickness |
| `line_style` | Selection | No | solid/dashed/dotted |
| `style_id` | Many2one | No | Style preset |
| `inline_styles` | Text | No | Custom CSS (JSON) |
| `font_size` | Integer | No | Font size |
| `font_weight` | Selection | No | normal/bold |
| `text_align` | Selection | No | left/center/right |
| `text_color` | Char | No | Text color |
| `background_color` | Char | No | Background color |
| `border_color` | Char | No | Border color |
| `border_width` | Integer | No | Border width |
| `border_radius` | Integer | No | Border radius |
| `visible_condition` | Char | No | Python visibility expression |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_generate_qweb_element()` | Generate QWeb XML | lxml.Element |
| `_get_computed_styles()` | Compute final CSS | string |

---

### sam.report.style (New Model)

**Purpose:** Reusable style presets for report elements

Referenced in security but model details not provided. Likely contains:
- Style name
- CSS properties (font, colors, borders, etc.)
- Category/type

---

### sam.field.creator (New Model)

**Purpose:** Create custom fields (x_*) on models

Referenced in security but model details not provided. Likely contains:
- Target model
- Field name, type, label
- Field options

---

## Security Rules

### Groups

| Group XML ID | Name | Implied By |
|--------------|------|------------|
| `group_view_customizer_user` | User | - |
| `group_view_customizer_manager` | Manager | User |
| `group_view_customizer_admin` | Administrator | Manager |

### Access Rights

| Model | User | Manager | Admin |
|-------|------|---------|-------|
| sam.view.customizer | Read | Read/Write/Create | Full |
| sam.view.customization | Read | Read/Write/Create | Full |
| sam.field.creator | - | Read/Write/Create | Full |
| sam.report.template | Read | Read/Write/Create | Full |
| sam.report.element | Read | Read/Write/Create | Full |
| sam.report.style | Read | Read/Write/Create | Full |
| ir.ui.view | Read/Write/Create | - | - |
| ir.model.fields | - | Read/Create | - |
| ir.model | Read | - | - |

---

## Frontend Components

### JavaScript Services

| File | Purpose |
|------|---------|
| `view_customizer_service.js` | View customization service |
| `systray_item.js` | Systray toggle for customizer |
| `field_item.js` | Draggable field component |
| `sidebar.js` | Available fields sidebar |
| `new_field_dialog.js` | Create new field dialog |
| `customization_manager.js` | Main customization manager |
| `report_service.js` | Report builder service |
| `report_builder.js` | Visual report editor |

### XML Templates

| File | Purpose |
|------|---------|
| `systray.xml` | Systray icon template |
| `sidebar.xml` | Fields sidebar template |
| `field_item.xml` | Field item template |
| `new_field_dialog.xml` | New field dialog template |
| `manager.xml` | Manager panel template |
| `report_builder.xml` | Report builder template |

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│        sam.view.customizer              │
│                                         │
│  base_view_id ─────────────────────────────► ir.ui.view (base)
│  model_id ─────────────────────────────────► ir.model
│  inherited_view_id ────────────────────────► ir.ui.view (generated)
│  customization_ids ────────────────────────► sam.view.customization
│                                         │
│  apply_customizations() ───────┐        │
│                                │        │
└────────────────────────────────┼────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────┐
│       sam.view.customization            │
│                                         │
│  _build_xpath_element() ───────────────────► XPath XML
│  operation: add/remove/move             │
│  field_name, target_field_name          │
│  position: before/after/inside          │
└─────────────────────────────────────────┘


┌─────────────────────────────────────────┐
│        sam.report.template              │
│                                         │
│  model_id ─────────────────────────────────► ir.model
│  element_ids ──────────────────────────────► sam.report.element
│  qweb_view_id ─────────────────────────────► ir.ui.view (QWeb)
│  report_action_id ─────────────────────────► ir.actions.report
│                                         │
│  action_generate_report() ─────┐        │
│                                │        │
└────────────────────────────────┼────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────┐
│        sam.report.element               │
│                                         │
│  _generate_qweb_element() ─────────────────► QWeb XML nodes
│  element_type: text/field/table/image   │
│  position_x, position_y, width, height  │
│  section: header/body/footer            │
└─────────────────────────────────────────┘
```

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `sam_view_customizer` | `sam.view.customizer` | View customization master records |
| `sam_view_customization` | `sam.view.customization` | Individual customization operations |
| `sam_field_creator` | `sam.field.creator` | Custom field creation records |
| `sam_report_template` | `sam.report.template` | Report template designs |
| `sam_report_element` | `sam.report.element` | Report canvas elements |
| `sam_report_style` | `sam.report.style` | Reusable style presets |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
