# Schema: ai_sam_workflows_base

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_workflows_base` |
| **Version** | 18.0.1.8.0 |
| **Total Models** | 20 (18 regular, 1 transient, 1 abstract) |
| **Total Controllers** | 1 |
| **API Endpoints** | 3 (vendor/service hierarchy) |

---

## Models

### canvas (Primary Model)

**Purpose:** N8N-compatible workflow definition storage. The `json_definition` field is the SINGLE SOURCE OF TRUTH for all workflow data.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Workflow name (max 200 chars) |
| `description` | Text | No | Workflow description |
| `active` | Boolean | Yes | Active flag (default: True) |
| `branch_type` | Char | No | Technical name of branch type (default: 'workflow') |
| `branch_id` | Many2one | No | Computed reference to ai.branch |
| `canvas_type` | Selection | No | node_based / freeform / grid / timeline / board |
| `business_unit_id` | Many2one | No | Reference to workflow.business.unit |
| `workflow_type` | Selection | Yes | n8n_workflow / business_process / automation / integration / trigger_based |
| `json_definition` | Text | No | **SOURCE OF TRUTH** - Complete N8N-compatible JSON |
| `nodes_cache_valid` | Boolean | No | Cache sync status (auto-managed) |
| `nodes_cache_timestamp` | Datetime | No | When cache was last rebuilt |
| `generated_python_code` | Text | No | Auto-generated Python code (readonly) |
| `generated_javascript_code` | Text | No | Auto-generated JavaScript code (readonly) |
| `execution_mode` | Selection | Yes | manual / trigger / scheduled / webhook |
| `cron_expression` | Char | No | Cron expression for scheduled workflows |
| `next_execution` | Datetime | No | Next scheduled execution (readonly) |
| `webhook_url` | Char | No | Webhook URL (readonly) |
| `webhook_method` | Selection | No | GET / POST / PUT / DELETE |
| `canvas_settings` | Text | No | Visual canvas configuration JSON |
| `template_id` | Many2one | No | Reference to workflow.template |
| `node_count` | Integer | No | Computed from json_definition |
| `total_executions` | Integer | No | Computed from execution_ids |
| `successful_executions` | Integer | No | Computed from execution_ids |
| `failed_executions` | Integer | No | Computed from execution_ids |
| `last_execution_date` | Datetime | No | Computed from execution_ids |
| `visibility` | Selection | Yes | private / team / company / public |
| `team_ids` | Many2many | No | Team members (res.users) |
| `color` | Integer | No | Color index for visual identification |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `save_canvas_state(workflow_id, canvas_state)` | Save canvas JSON to database | bool |
| `load_canvas_state(workflow_id)` | Load canvas JSON from database | dict or False |
| `update_workflow_name(workflow_id, new_name)` | Update workflow name | bool |
| `get_n8n_node_metadata()` | Load N8N nodes from JSON file | list |
| `get_content_node_metadata()` | Load SAM content nodes | list |
| `get_agent_node_metadata()` | Load AI agent nodes | list |
| `action_execute_workflow()` | Execute workflow manually | action dict |
| `action_generate_code()` | Generate Python/JS from JSON | None |
| `action_save_as_template()` | Save workflow as template | action dict |
| `action_import_n8n_workflow()` | Show N8N import wizard | action dict |
| `write_sam_debug_log(log_data)` | Write debug logs to file | bool |

**Relationships:**
- `execution_ids` -> `executions` (One2many)
- `template_id` -> `workflow.template` (Many2one)
- `business_unit_id` -> `workflow.business.unit` (Many2one)
- `branch_id` -> `ai.branch` (Many2one, computed)
- `team_ids` -> `res.users` (Many2many)

---

### executions

**Purpose:** Workflow execution tracking and logging

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | No | Computed: "{canvas.name} - {timestamp}" |
| `canvas_id` | Many2one | Yes | Parent workflow |
| `state` | Selection | Yes | pending / running / completed / failed / cancelled |
| `start_time` | Datetime | No | Execution start time |
| `end_time` | Datetime | No | Execution end time |
| `duration` | Float | No | Duration in seconds (computed) |
| `trigger_type` | Selection | Yes | manual / webhook / schedule / database / api |
| `triggered_by` | Many2one | No | User who triggered (res.users) |
| `trigger_data` | Text | No | JSON data that triggered the workflow |
| `input_data` | Text | No | Initial workflow input (JSON) |
| `output_data` | Text | No | Final workflow output (JSON) |
| `node_executions` | Text | No | JSON log of individual node executions |
| `error_message` | Text | No | Error details if failed |
| `error_node_id` | Char | No | ID of the failed node |
| `nodes_executed` | Integer | No | Number of nodes executed |
| `nodes_total` | Integer | No | Total nodes in workflow (computed) |
| `node_output_ids` | One2many | No | Node outputs with JSON/Human/Binary formats |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_start_execution()` | Start workflow execution | None |
| `action_cancel_execution()` | Cancel running execution | None |
| `action_retry_execution()` | Retry failed execution | action dict |
| `_execute_workflow()` | Internal: Execute the workflow | None |
| `_execute_nodes()` | Internal: Execute workflow nodes | None |
| `_execute_single_node()` | Internal: Execute individual node | dict |

---

### nodes

**Purpose:** Canvas nodes with execution logic (N8N compatible)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `node_id` | Char | Yes | Unique identifier (e.g., node_1) |
| `name` | Char | Yes | Node display name |
| `type` | Char | No | Type name (e.g., gmail, slack) |
| `sequence` | Integer | No | Display order |
| `canvas_id` | Many2one | Yes | Parent canvas |
| `workflow_node_type_id` | Many2one | No | Node type from n8n.simple.node registry |
| `effective_node_type` | Char | No | Computed: workflow_node_type_id or type |
| `credential_id` | Many2one | No | API credential for this node |
| `identity_id` | Many2one | No | Identity to use (e.g., which email to send from) |
| `previous_node_id` | Many2one | No | Previous node in sequence |
| `folder_file_link` | Char | No | Local folder/file path for knowledge source |
| `parameters` | Text | No | JSON configuration for node behavior |
| `x_cord` | Float | No | X coordinate position |
| `y_cord` | Float | No | Y coordinate position |
| `active` | Boolean | No | Active flag |
| `disabled` | Boolean | No | Disabled flag (skipped during execution) |
| `retry_on_failure` | Boolean | No | Enable retry on failure |
| `max_retries` | Integer | No | Maximum retry attempts |
| `retry_interval` | Integer | No | Retry interval in seconds |
| `continue_on_fail` | Boolean | No | Continue workflow on node failure |
| `input_connections` | Text | No | JSON array of input connections |
| `output_connections` | Text | No | JSON array of output connections |
| `notes` | Text | No | Node documentation |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `execute_node(input_data)` | Execute this node | dict |
| `get_knowledge_context()` | Aggregate knowledge from incoming nodes | str |
| `get_incoming_nodes()` | Get all feeding nodes | recordset |
| `get_parameters_dict()` | Get parameters as dictionary | dict |
| `set_parameters_dict(params)` | Set parameters from dictionary | None |

---

### workflow.connection

**Purpose:** Edges/connections between nodes defining data flow paths

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `canvas_id` | Many2one | Yes | Parent canvas |
| `source_node_id` | Many2one | Yes | Source node |
| `target_node_id` | Many2one | Yes | Target node |
| `source_handle` | Char | No | Output handle name (default: 'main') |
| `target_handle` | Char | No | Input handle name (default: 'main') |
| `sequence` | Integer | No | Connection order |
| `display_name` | Char | No | Computed: "SourceNode -> TargetNode" |
| `field_mapping_ids` | One2many | No | Field mappings for this connection |
| `mapped_field_count` | Integer | No | Computed: successful mappings count |
| `unmapped_required_count` | Integer | No | Computed: required fields not mapped |
| `mapping_status` | Selection | No | complete / partial / empty / error |
| `line_style` | Selection | No | solid / dashed / dotted |
| `line_color` | Char | No | Hex color code |
| `active` | Boolean | No | Active flag |
| `notes` | Text | No | Connection notes |

---

### workflow.field.mapping

**Purpose:** Field mappings between source and target nodes on connections

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `connection_id` | Many2one | Yes | Parent connection |
| `canvas_id` | Many2one | No | Canvas (related from connection) |
| `source_node_id` | Many2one | No | Source node (related) |
| `target_node_id` | Many2one | No | Target node (related) |
| `source_field` | Char | Yes | Source field name |
| `target_field` | Char | Yes | Target field name |
| `sequence` | Integer | No | Display order |
| `transform_type` | Selection | Yes | direct / rename / transform / expression / constant |
| `transform_expression` | Text | No | JS expression for transformation |
| `constant_value` | Text | No | Fixed value for constant type |
| `is_auto_mapped` | Boolean | No | Auto-generated by system |
| `auto_map_confidence` | Float | No | Confidence score (0.0-1.0) |
| `auto_map_reason` | Selection | No | exact_match / standard_mapping / fuzzy_match / type_match / user_defined |
| `mapping_status` | Selection | No | valid / type_mismatch / missing_source / missing_target / transform_error |
| `status_message` | Char | No | Detailed status message |
| `target_is_required` | Boolean | No | Computed: target field required |
| `target_field_type` | Char | No | Computed: expected target type |

---

### workflow.template

**Purpose:** Reusable workflow templates with marketplace support

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Template name |
| `description` | Text | No | Template description |
| `workflow_type` | Selection | Yes | n8n_workflow / business_process / automation / integration / trigger_based |
| `json_definition` | Text | Yes | Template workflow JSON |
| `preview_image` | Image | No | Visual preview |
| `documentation` | Html | No | Template documentation |
| `category` | Selection | Yes | crm / marketing / project / hr / finance / inventory / integration / automation / reporting / custom |
| `tag_ids` | Many2many | No | Template tags |
| `author_id` | Many2one | Yes | Author (res.users) |
| `visibility` | Selection | Yes | private / team / company / public / marketplace |
| `usage_count` | Integer | No | Usage count (readonly) |
| `last_used` | Datetime | No | Last used timestamp (readonly) |
| `is_validated` | Boolean | No | Template validated flag |
| `validation_notes` | Text | No | Validation notes |
| `workflow_ids` | One2many | No | Workflows created from this template |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_create_workflow()` | Create workflow from template | action dict |
| `action_validate_template()` | Validate template structure | None |
| `action_publish_to_marketplace()` | Publish to marketplace | None |
| `import_n8n_workflow(n8n_data, name)` | Import N8N workflow as template | template record |
| `get_marketplace_templates()` | Get public validated templates | recordset |

---

### workflow.business.unit

**Purpose:** Business unit organization for workflow filtering

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Business unit name |
| `code` | Char | No | Short code (e.g., "SALES") |
| `description` | Text | No | Description |
| `sequence` | Integer | No | Display order |
| `active` | Boolean | No | Active flag |
| `color` | Integer | No | Color index |
| `canvas_ids` | One2many | No | Workflows in this unit |
| `canvas_count` | Integer | No | Computed workflow count |

**Pre-loaded Data:**
- SALES - Sales Department
- MKT - Marketing
- OPS - Operations
- FIN - Finance & Accounting
- HR - Human Resources
- IT - Information Technology

---

### canvas.history

**Purpose:** Undo/redo support for canvas operations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `canvas_id` | Many2one | Yes | Parent canvas |
| `action_type` | Selection | Yes | add_node / remove_node / update_node / add_connection / remove_connection / move_node / create_workflow / bulk_edit |
| `previous_state` | Text | No | Complete canvas JSON before action |
| `action_data` | Text | No | Details of action (JSON) |
| `performed_by` | Selection | No | user / sam |
| `user_id` | Many2one | No | User who triggered action |
| `is_undone` | Boolean | No | True if action was undone |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `undo()` | Restore previous state | dict |
| `redo()` | Re-mark as not undone | dict |
| `get_canvas_history(canvas_id, limit, include_undone)` | Get history entries | list |
| `cleanup_old_history(canvas_id, keep_entries)` | Cleanup old entries | None |

---

### n8n.simple.node

**Purpose:** Denormalized N8N node type registry (505+ entries)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `node_id` | Char | Yes | N8N node identifier (e.g., n8n-nodes-base.gmail) |
| `display_name` | Char | Yes | Human-readable name (e.g., Gmail) |
| `description` | Text | No | Node description |
| `supplier` | Char | Yes | Supplier name (e.g., Google, Slack) |
| `service` | Char | No | Service name for nested structure (e.g., Gmail under Google) |
| `supplier_name_rel` | Many2one | No | Computed relation to n8n.simple.supplier |
| `is_trigger` | Boolean | Yes | TRUE if filename contains "Trigger" |
| `node_type` | Selection | No | Computed: Action / Trigger |
| `categories` | Char | No | Comma-separated categories |
| `subcategories` | Text | No | JSON subcategories |
| `alias` | Char | No | Comma-separated search aliases |
| `is_core_nodes` | Boolean | No | Computed: Core Nodes category |
| `is_ai_nodes` | Boolean | No | Computed: AI category |
| `is_hitl_nodes` | Boolean | No | Computed: HITL category |
| `is_whitelisted` | Boolean | No | Computed: has whitelisted category |
| `ui_placement` | Char | No | Computed: where node appears in N8N UI |
| `ui_placement_key` | Char | No | Computed: N8N internal key |
| `search_text` | Text | No | Computed: combined searchable text |
| `operation_count` | Integer | No | Number of operations |
| `resource_count` | Integer | No | Number of resources |
| `resources_json` | Text | No | Pre-extracted operations (JSON) |
| `raw_json` | Text | No | Full .node.json content |
| `file_path` | Char | No | Relative path from n8n_nodes |
| `description_files` | Text | No | List of Description.js files |

---

### n8n.simple.supplier

**Purpose:** Supplier/vendor table for node grouping

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Supplier name (unique) |
| `has_services` | Boolean | No | TRUE for nested structure (e.g., Google) |
| `action_count` | Integer | No | Computed action count |
| `trigger_count` | Integer | No | Computed trigger count |
| `total_nodes` | Integer | No | Computed total nodes |
| `node_ids` | One2many | No | Nodes for this supplier |

---

## Additional Models (Brief)

| Model | Purpose |
|-------|---------|
| `workflow.template.tag` | Tags for workflow templates |
| `workflow.n8n.import.wizard` | Transient: N8N import wizard |
| `workflow.field.schema` | Node I/O schema for visible data flow |
| `workflow.standard.field` | SAM's 40 universal fields |
| `workflow.node.output` | JSON + Human output per node execution |
| `workflow.node.binary` | Binary file outputs from nodes |
| `n8n.node.category` | Node category registry for UI grouping |
| `node_types` | Legacy node type registry |
| `dynamic.menus` | N8N dynamic menu generator |
| `n8n.menu.debug` | Debug helper for N8N menus |
| `ai.automator.config` | Automator system configuration |
| `n8n.simple.extractor` | Transient: Node extractor wizard |
| `nodes.executor.mixin` | Abstract: External module executor mixin |

---

## Controllers / API Endpoints

### REST Endpoints

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/workflow/vendors` | POST | user | Get unique vendors for overlay display (~320 vendors from 505 nodes) |
| `/api/workflow/vendors/<key>/services` | POST | user | Get services for a vendor |
| `/api/workflow/vendors/<key>/services/<service>/nodes` | POST | user | Get nodes for vendor/service |

### JSON-RPC Methods

| Model | Method | Purpose |
|-------|--------|---------|
| `canvas` | `save_canvas_state` | Save canvas JSON to database |
| `canvas` | `load_canvas_state` | Load canvas JSON from database |
| `canvas` | `update_workflow_name` | Update workflow name |
| `canvas` | `get_n8n_node_metadata` | Get N8N nodes from JSON file |
| `canvas` | `get_content_node_metadata` | Get SAM content nodes |
| `canvas` | `get_agent_node_metadata` | Get AI agent nodes |
| `canvas` | `write_sam_debug_log` | Write debug logs to file |
| `workflow.business.unit` | `get_all_for_filter` | Get business units for dropdown |
| `canvas.history` | `get_canvas_history` | Get history for a canvas |
| `workflow.template` | `import_n8n_workflow` | Import N8N as template |
| `workflow.template` | `get_marketplace_templates` | Get public templates |

---

## Request/Response Examples

### POST /api/workflow/vendors

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "search": "google",
        "limit": 50,
        "offset": 0
    }
}
```

**Response:**
```json
{
    "vendors": [
        {
            "key": "Google",
            "name": "Google",
            "node_count": 28,
            "service_count": 20,
            "icon": "https://...",
            "has_services": true
        }
    ],
    "total": 1
}
```

### RPC: canvas.save_canvas_state

**Request:**
```python
self.env['canvas'].save_canvas_state(workflow_id=42, canvas_state={
    "nodes": [
        {"id": "node-1", "type": "n8n-nodes-base.start", "position": [250, 300]}
    ],
    "connections": {},
    "settings": {}
})
```

**Response:**
```python
True  # Success
```

---

## Data Relationships Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        canvas                                │
│  - json_definition (SOURCE OF TRUTH)                        │
│  - business_unit_id -> workflow.business.unit               │
│  - template_id -> workflow.template                         │
│  - execution_ids <- executions                              │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           │ One2many           │ Many2one           │ Many2one
           ▼                    ▼                    ▼
┌──────────────────┐   ┌────────────────────┐  ┌─────────────────────┐
│   executions     │   │ workflow.business  │  │  workflow.template  │
│                  │   │      .unit         │  │                     │
│ - canvas_id (FK) │   │                    │  │ - json_definition   │
│ - state          │   │ - code (SALES)     │  │ - visibility        │
│ - node_outputs   │   │ - canvas_ids       │  │ - usage_count       │
└──────────────────┘   └────────────────────┘  └─────────────────────┘
           │
           │ One2many
           ▼
┌──────────────────────┐
│  workflow.node.output│
│                      │
│ - execution_id (FK)  │
│ - node_id            │
│ - json_output        │
│ - human_output       │
└──────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         nodes                                │
│  - canvas_id -> canvas                                      │
│  - workflow_node_type_id -> n8n.simple.node                 │
│  - credential_id -> api_credentials                         │
└─────────────────────────────────────────────────────────────┘
           │
           │ Many2one/One2many
           ▼
┌──────────────────────┐        ┌──────────────────────────────┐
│ workflow.connection  │        │      n8n.simple.node         │
│                      │        │                              │
│ - source_node_id     │        │ - supplier (Google, Slack)   │
│ - target_node_id     │        │ - service (Gmail, Drive)     │
│ - field_mapping_ids  │        │ - is_trigger                 │
└──────────────────────┘        │ - supplier_name_rel          │
           │                    └──────────────────────────────┘
           │ One2many                      │
           ▼                               │ Many2one
┌──────────────────────────┐               ▼
│ workflow.field.mapping   │     ┌──────────────────────────────┐
│                          │     │    n8n.simple.supplier       │
│ - source_field           │     │                              │
│ - target_field           │     │ - has_services               │
│ - transform_type         │     │ - node_ids                   │
│ - mapping_status         │     └──────────────────────────────┘
└──────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `canvas` | base.group_user | Yes | Yes | Yes | Yes |
| `executions` | base.group_user | Yes | Yes | Yes | Yes |
| `nodes` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.connection` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.field.mapping` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.template` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.template.tag` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.business.unit` | base.group_user | Yes | Yes | Yes | Yes |
| `canvas.history` | base.group_user | Yes | Yes | Yes | Yes |
| `n8n.simple.node` | base.group_user | Yes | Yes | Yes | Yes |
| `n8n.simple.supplier` | base.group_user | Yes | Yes | Yes | Yes |
| `n8n.simple.extractor` | base.group_user | Yes | Yes | Yes | Yes |
| `ai.automator.config` | base.group_user | Yes | Yes | Yes | Yes |
| `dynamic.menus` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.n8n.import.wizard` | base.group_user | Yes | Yes | Yes | Yes |
| `n8n.menu.debug` | base.group_user | Yes | Yes | Yes | Yes |
| `n8n.node.category` | base.group_user | Yes | Yes | Yes | Yes |
| `node_types` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.standard.field` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.field.schema` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.node.output` | base.group_user | Yes | Yes | Yes | Yes |
| `workflow.node.binary` | base.group_user | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `canvas` | `canvas` | Workflow definitions |
| `executions` | `executions` | Execution logs |
| `nodes` | `nodes` | Canvas nodes |
| `workflow_connection` | `workflow.connection` | Node connections |
| `workflow_field_mapping` | `workflow.field.mapping` | Field mappings |
| `workflow_template` | `workflow.template` | Workflow templates |
| `workflow_template_tag` | `workflow.template.tag` | Template tags |
| `workflow_business_unit` | `workflow.business.unit` | Business units |
| `canvas_history` | `canvas.history` | Canvas edit history |
| `n8n_simple_node` | `n8n.simple.node` | N8N node registry |
| `n8n_simple_supplier` | `n8n.simple.supplier` | N8N suppliers |

---

## Indexes and Performance

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| `canvas` | Primary | `id` | Primary key |
| `nodes` | `nodes_canvas_id_idx` | `canvas_id` | Fast node lookup by workflow |
| `executions` | `executions_canvas_id_idx` | `canvas_id` | Fast execution lookup |
| `n8n_simple_node` | `n8n_simple_node_supplier_idx` | `supplier` | Vendor grouping |
| `n8n_simple_node` | `n8n_simple_node_type_idx` | `is_trigger` | Trigger/Action filtering |
| `workflow_connection` | Composite | `canvas_id, source_node_id` | Connection lookup |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | Claude |
| 2026-01-19 | Recovered workflow.template model | SAM AI |
| 2025-12-21 | Added canvas.history model | SAM AI |
| 2025-12-20 | Phase 4: n8n.simple.node registry | SAM AI |
| 2025-10-31 | Phase 1: Flatline architecture migration | SAM AI |
