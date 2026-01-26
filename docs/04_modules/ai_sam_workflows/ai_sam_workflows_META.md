# ai_sam_workflows - Module Metadata

> **Four-File Standard:** META | [SCHEMA](ai_sam_workflows_SCHEMA.md) | [WOW](ai_sam_workflows_WOW.md) | [FAQ](ai_sam_workflows_FAQ.md)

## Module Identity

| Property | Value |
|----------|-------|
| **Technical Name** | `ai_sam_workflows` |
| **Display Name** | SAM AI Workflows UI |
| **Version** | 18.0.2.38.1 |
| **Category** | Productivity/AI |
| **License** | LGPL-3 |
| **Author** | Anthony Gardiner - Odoo Consulting & Claude AI |
| **Website** | https://sme.ec |

## Architecture Classification

| Aspect | Classification |
|--------|----------------|
| **Pattern** | Platform Skin (UI Layer Only) |
| **Data Models** | NONE - All models in ai_sam_workflows_base |
| **Uninstall Safety** | Safe - No data deletion |
| **Application** | False (Extension module) |

## Module Summary

N8N Workflow Platform Skin - UI Layer Only. This module provides the complete visual interface for SAM AI's N8N-compatible workflow automation platform. Following Platform Skin Architecture, it contains all presentation logic (views, JavaScript, CSS, controllers) while delegating data persistence to ai_sam_workflows_base.

## Dependencies

```
ai_sam_workflows (this module)
    |
    +---> ai_sam_workflows_base (data models, business logic)
    |         |
    +---> ai_sam (canvas framework, vendor library)
    |         |
    +---> ai_sam_base (core AI foundation)
```

### Direct Dependencies

| Module | Purpose |
|--------|---------|
| `ai_sam_workflows_base` | Workflow data models (15 models) |
| `ai_sam` | Canvas framework + platform registry |
| `ai_sam_base` | Core SAM AI foundation (43 models) |

## Module Statistics

| Category | Count | Description |
|----------|-------|-------------|
| **Views (XML)** | 17 | Workflow management, canvas, N8N system |
| **Controllers** | 5 | HTTP endpoints (3 routes) |
| **JavaScript Files** | 19+ core | Canvas, nodes, connections, theater |
| **CSS/SCSS Files** | 7 | N8N-style rendering |
| **Node Types** | 442 | Registered in type registry |
| **Service Connectors** | 1,500+ | N8N node library |

## Key Features

1. **Visual Workflow Canvas**
   - Infinite canvas with zoom (0.1x - 3.0x) and pan
   - Professional N8N-style node rendering
   - Bezier curve connections between nodes
   - Drag-and-drop workflow building

2. **1,500+ Service Connectors**
   - 306 vendor node types (Gmail, Slack, HubSpot, etc.)
   - CRM, Marketing, E-commerce integrations
   - AI/LLM nodes (OpenAI, MistralAI)
   - Database connectors (MySQL, Postgres, MongoDB)

3. **SAM Theater System**
   - Theatrical workflow assembly experience
   - Animated node creation and placement
   - Intelligent workflow analysis

4. **N8N Compatibility**
   - JSON import/export with N8N cloud workflows
   - Paste & Render feature
   - Full N8N node schema support

## File Structure

```
ai_sam_workflows/
+-- __init__.py              # Post-install/update hooks
+-- __manifest__.py          # Module definition
+-- README.md                # Comprehensive documentation
+-- controllers/             # 5 Python controllers
|   +-- branch_api.py        # Branch type selection API
|   +-- documentation_controller.py
|   +-- node_type_mapper.py  # N8N type mapping
|   +-- transition_control.py # Canvas bridge (59KB)
|   +-- workflow_orchestrator.py # SAM Wiring Assistant
+-- data/                    # Seed data files
|   +-- automator_platform.xml
+-- views/                   # 17 XML view files
|   +-- transition_control.xml   # LOAD FIRST
|   +-- workflow_definition_views.xml
|   +-- workflow_execution_views.xml
|   +-- canvas_page_views.xml
|   +-- canvas_ui.xml
|   +-- n8n_*.xml            # N8N system views
|   +-- workflow_menus.xml   # LOAD LAST
+-- static/
    +-- src/
        +-- n8n/             # Core N8N system
        |   +-- canvas/      # Canvas manager (pan, zoom)
        |   +-- nodes/       # Node management
        |   +-- lines/       # Connection system
        |   +-- theater/     # Theatrical assembly
        |   +-- overlays/    # Overlay management
        |   +-- utils/       # Utility functions
        +-- components/      # Vue components
        +-- services/        # Service modules
        +-- css/             # Stylesheets
```

## HTTP Endpoints

| Route | Method | Purpose |
|-------|--------|---------|
| `/canvas/api/branches/available` | GET | Get available branch/canvas types |
| `/canvas/<workflow_id>/nodes` | GET | Serve canvas with hierarchical manager |
| `/canvas/workflow/analyze` | POST | Analyze N8N workflow & generate plan |

## Installation

```bash
# Install in order:
# 1. ai_sam_base
# 2. ai_sam
# 3. ai_sam_workflows_base
# 4. ai_sam_workflows (this module)

# Verify installation:
# Settings -> Technical -> Canvas Platforms
# Should see: "SAM Automator Platform"
```

## Migration History

| Date | Phase | Change |
|------|-------|--------|
| 2025-10-11 | Phase 3 | Extracted from ai_sam core |
| 2025-10-12 | Phase 3 Correction | Models moved to ai_sam_workflows_base |
| 2025-10-30 | Vendor Migration | Icons moved to ai_sam core |
| 2025-11-27 | Phase 4 | Clean Platform Skin Architecture |

## Related Documentation

- [ai_sam_workflows_base](../ai_sam_workflows_base/) - Data layer (15 models)
- [ai_sam](../ai_sam/) - Canvas framework
- [ai_sam_base](../ai_sam_base/) - Core foundation (43 models)

---
*Last Updated: 2026-01-26*
*Documentation Standard: Four-File (META/SCHEMA/WOW/FAQ)*
