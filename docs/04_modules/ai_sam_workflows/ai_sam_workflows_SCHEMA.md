# ai_sam_workflows - Technical Schema

> **Four-File Standard:** [META](ai_sam_workflows_META.md) | SCHEMA | [WOW](ai_sam_workflows_WOW.md) | [FAQ](ai_sam_workflows_FAQ.md)

## Architecture Overview

This module follows **Platform Skin Architecture** - it provides UI-only components with NO data models. All workflow data models reside in `ai_sam_workflows_base`.

```
+------------------------------------------+
|         ai_sam_workflows (UI Layer)       |
|  - Views (17 XML files)                   |
|  - Controllers (5 Python files)           |
|  - JavaScript (19+ core files)            |
|  - CSS/SCSS (7 files)                     |
+------------------------------------------+
                    |
                    | uses models from
                    v
+------------------------------------------+
|      ai_sam_workflows_base (Data Layer)   |
|  - 15 workflow data models                |
|  - Security rules (ACL)                   |
|  - Business logic                         |
+------------------------------------------+
```

## Data Models

**IMPORTANT:** This module contains NO data models. All workflow-related models are in `ai_sam_workflows_base`:

| Model | Technical Name | Location |
|-------|---------------|----------|
| Workflow Definition | `workflow.definition` | ai_sam_workflows_base |
| Workflow Execution | `workflow.execution` | ai_sam_workflows_base |
| Workflow Template | `workflow.template` | ai_sam_workflows_base |
| Business Unit | `workflow.business.unit` | ai_sam_workflows_base |
| API Credential | `workflow.api.credential` | ai_sam_workflows_base |
| Canvas | `canvas` | ai_sam |
| Canvas Nodes | `canvas.nodes` | ai_sam |

## Controllers

### 1. branch_api.py (5,581 bytes)
REST API for branch type selection.

```python
# Endpoints:
GET /canvas/api/branches/available
# Returns: List of available branch/canvas types
```

### 2. transition_control.py (59,290 bytes)
Canvas bridge controller - largest controller file.

```python
# Endpoints:
GET /canvas/<workflow_id>/nodes
# Serves Odoo canvas view with hierarchical manager

POST /canvas/<workflow_id>/nodes/save
# Saves canvas nodes to database
```

### 3. workflow_orchestrator.py (17,487 bytes)
SAM The Wiring Assistant - intelligent workflow analysis.

```python
# Endpoints:
POST /canvas/workflow/analyze
# Input: workflow_json (N8N workflow structure)
# Returns: Orchestration plan with rendering instructions
#   - strategy: 'instant' | 'progressive' | 'theatrical'
#   - complexity: node_count, connection_count, metrics
#   - sequences: optimal node creation order
#   - insights: workflow analysis
#   - narration: theatrical commentary
```

### 4. node_type_mapper.py (7,812 bytes)
Bidirectional mapping between N8N type strings and database IDs.

```python
# Static method:
NodeTypeMapper.get_node_type_id(n8n_type)
# Converts "n8n-nodes-base.httpRequest" -> database integer ID
```

### 5. documentation_controller.py (12,029 bytes)
Documentation system controller.

## JavaScript Architecture

### Core Canvas System

| File | Lines | Purpose |
|------|-------|---------|
| `canvas_manager.js` | 1,187 | Infinite canvas with pan, zoom (0.1x-3.0x) |
| `node_manager.js` | 2,831 | Node lifecycle, rendering, CRUD |
| `node_type_registry.js` | 3,656 | Central registry (442 node types) |
| `node_style_manager.js` | ~500 | Node styling (base + type-specific) |
| `group_to_visual_map.js` | ~200 | Group to visual mapping |

### Connection System

| File | Lines | Purpose |
|------|-------|---------|
| `connection_system.js` | 1,348 | Interactive Bezier connections |
| `connection_manager.js` | ~600 | Base connection infrastructure |

### Theater System

| File | Lines | Purpose |
|------|-------|---------|
| `theater_director.js` | 590 | Theatrical workflow assembly |
| `workflow_analyzer.js` | - | Client-side workflow analysis |

### Services

| File | Purpose |
|------|---------|
| `icon_service.js` | Centralized icon management |
| `WorkflowParser.js` | N8N JSON workflow parsing |
| `port_config_manager.js` | Data-driven port configuration |
| `multi_input_manager.js` | Multi-input node port management |
| `odoo_services_bridge.js` | Odoo services to vanilla JS bridge |

### Vue Components

| Component | Purpose |
|-----------|---------|
| `WorkflowCanvas.vue` | Main canvas component |
| `NodeSearchModal.vue` | Add Node dialog (1,500+ nodes) |
| `MultiInputControls.vue` | Multi-input controls for Merge nodes |

### Utilities (n8n/utils/)

| File | Purpose |
|------|---------|
| `coordinate_utils.js` | Screen/canvas coordinate transforms |
| `graph_utils.js` | Graph algorithms (topological sort) |
| `svg_path_utils.js` | SVG bezier path generation |
| `index.js` | Unified N8NUtils namespace |

## Views Structure

### Load Order (Critical)

1. **FIRST:** `transition_control.xml` - Defines core actions
2. **MIDDLE:** All other view files
3. **LAST:** `workflow_menus.xml` - Menu structure

### View Categories

#### Core Workflow Views
- `workflow_definition_views.xml` - Workflow CRUD
- `workflow_execution_views.xml` - Execution tracking
- `business_unit_views.xml` - Business unit management

#### Canvas & Node Views
- `canvas_page_views.xml` - Main canvas page layout
- `canvas_ui.xml` - Canvas user interface
- `canvas_node_views.xml` - Node rendering
- `workflow_canvas_paste_views.xml` - Paste & Render

#### N8N System Views
- `n8n_import_wizard_views.xml` - JSON import wizard
- `n8n_node_types_views.xml` - Node types registry
- `n8n_simple_nodes_views.xml` - Simplified catalog
- `n8n_dynamic_menu_views.xml` - Dynamic menu
- `n8n_filesystem_views.xml` - Filesystem discovery

#### Configuration Views
- `settings_views.xml` - General settings
- `credential_views.xml` - API credential management
- `odoo_environment.xml` - Environment config

## CSS Architecture

| File | Purpose |
|------|---------|
| `nodes.css` | N8N node styling (base + types) |
| `canvas_manager_styles.css` | Canvas styling |
| `branch_selector.css` | Branch UI styling |
| `branch_dropdown.css` | Branch dropdown component |
| `node_chat_ui.css` | Node chat interface |
| `n8n_node_details.css` | Node detail panels |
| `canvas_styles.scss` | SCSS canvas styles |

### CSS Variables

```css
:root {
    --n8n-node-background: #ffffff;
    --n8n-node-border: #ccc;
    --n8n-node-selected: #ff6d5a;
    --n8n-connection-color: #8b8b8b;
    --n8n-port-color: #8b8b8b;
}
```

## Node Type Registry

The `node_type_registry.js` contains 442 registered node types organized into groups:

### Major Categories

| Category | Examples |
|----------|----------|
| **Communication** | Discord, Slack, Telegram, Email, Teams |
| **CRM** | Salesforce, HubSpot, Pipedrive, Copper |
| **Project Management** | Asana, Jira, Trello, Notion, Monday |
| **E-commerce** | Shopify, WooCommerce, Magento |
| **Cloud Storage** | AWS S3, Google Drive, Dropbox, Box |
| **Databases** | MySQL, Postgres, MongoDB, Redis |
| **AI/LLM** | OpenAI, MistralAI, Perplexity |
| **Utilities** | Transform, Merge, Filter, If, Switch |

## Data Flow Diagram

```
+----------------+     +------------------+     +------------------+
|   User Action  | --> |  Vue Component   | --> |  Canvas Manager  |
|  (click, drag) |     |  WorkflowCanvas  |     |   (JS core)      |
+----------------+     +------------------+     +------------------+
                                                        |
                                                        v
+----------------+     +------------------+     +------------------+
|    Database    | <-- |   Controller     | <-- |  Node Manager    |
| (workflows_base)|    | transition_ctrl  |     |   (JS core)      |
+----------------+     +------------------+     +------------------+
```

## Platform Registration

Registered in `data/automator_platform.xml`:

```xml
<record id="canvas_platform_automator" model="canvas.platform">
    <field name="name">SAM Automator Platform</field>
    <field name="technical_name">automator</field>
    <field name="renderer_class">AutomatorRenderer</field>
    <field name="icon_class">fa-project-diagram</field>
    <field name="sequence">30</field>
    <field name="active">True</field>
</record>
```

## Security

This module has no security rules - it's a Platform Skin with no models. All access control is defined in `ai_sam_workflows_base`:

```
ai_sam_workflows/security/ir.model.access.csv
# Empty file - no models to secure
```

## Asset Loading Order

```python
# __manifest__.py assets configuration
'assets': {
    'web.assets_backend': [
        # 1. Node Type Registry (FIRST)
        'ai_sam_workflows/static/src/n8n/nodes/node_type_registry.js',

        # 2. Services (dependencies for other modules)
        'ai_sam_workflows/static/src/services/icon_service.js',

        # 3. Utilities
        'ai_sam_workflows/static/src/n8n/utils/*.js',

        # 4. Canvas System
        'ai_sam_workflows/static/src/n8n/canvas/canvas_manager.js',
        'ai_sam_workflows/static/src/n8n/nodes/*.js',
        'ai_sam_workflows/static/src/n8n/lines/*.js',

        # 5. Theater System
        'ai_sam_workflows/static/src/n8n/theater/*.js',

        # 6. Vue Components
        'ai_sam_workflows/static/src/components/*.vue',

        # 7. Styles (LAST)
        'ai_sam_workflows/static/src/css/*.css',
    ],
}
```

---
*Last Updated: 2026-01-26*
*Documentation Standard: Four-File (META/SCHEMA/WOW/FAQ)*
