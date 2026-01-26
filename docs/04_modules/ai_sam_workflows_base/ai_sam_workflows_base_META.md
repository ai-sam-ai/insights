# Module: ai_sam_workflows_base

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_workflows_base` |
| **Version** | 18.0.1.8.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_workflows_base` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_workflows_base\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_workflows_base\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-workflows-base |
| **Status** | Active |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

ai_sam_workflows_base is the pure data layer for SAM AI's visual workflow automation system. It provides N8N-compatible workflow definitions, execution tracking, node types registry, and field mapping infrastructure. Following the Platform Skin Architecture, this module contains ONLY Python models and data - all UI components live in the companion ai_sam_workflows module.

**Architecture Philosophy:** Single source of truth via `json_definition` field (flatline architecture). The JSON stored in canvas records IS the workflow - no dual storage, no sync issues.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `mail` - Required for mail.thread inheritance on canvas model
- `ai_sam_base` - Core SAM AI foundation (api_credentials, ai.branch, ai.conversation)

### Python Libraries Required
- None additional (uses standard library: json, logging, os, re, datetime)

---

## For End Users (What Can This Do For Me?)

- **Visual Workflow Building** - Create automated business processes using drag-and-drop nodes
- **N8N Compatibility** - Import/export workflows in industry-standard N8N JSON format
- **Workflow Templates** - Save successful workflows as reusable templates for your team
- **Execution Tracking** - See exactly what happened when each workflow runs, including timing and errors
- **Business Unit Organization** - Organize workflows by department (Sales, Marketing, Operations, etc.)

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 20 | Core workflow + N8N integration + data flow |
| Controllers | 1 | vendor_service_controller.py (vendor/service API) |
| Views | 0 | Pure data layer - views in ai_sam_workflows |
| JS Files | 0 | Pure data layer - JS in ai_sam_workflows |
| Security Rules | 23 | ir.model.access.csv (base.group_user full access) |

**Key Files:**
- `models/canvas.py` - Core workflow definition (N8N-compatible, json_definition is source of truth)
- `models/executions.py` - Workflow execution tracking and logging
- `models/nodes.py` - Canvas nodes with execution logic and knowledge aggregation
- `models/workflow_connection.py` - Edges between nodes (visible data flow)
- `models/workflow_field_mapping.py` - Field mappings on connections
- `models/n8n_simple_nodes.py` - Denormalized N8N node type registry (505+ nodes)
- `models/workflow_template.py` - Reusable workflow templates with marketplace support
- `models/canvas_history.py` - Undo/redo support for canvas operations
- `controllers/vendor_service_controller.py` - Hierarchical vendor/service API for node picker

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: workflows, canvas, n8n, workflow automation, workflow templates, business processes
- User wants to: create workflow, import n8n workflow, execute workflow, track execution, save template
- User mentions: canvas, nodes, connections, field mapping, execution log, business unit
- User references: flatline architecture, json_definition, nodes cache, workflow engine

### Related Agents
- `/mod_workflows` - Renamed to `/sam_workflow_base` for this module
- `/sam_workflow` - For ai_sam_workflows UI module work
- `/cto-developer` - For implementation in this module
- `/n8n` - For N8N workflow expertise and integration

### Delegate To
- `/cto` - For architecture decisions about workflow system
- `/cto-developer` - For implementation work in this module
- `/sam_workflow` - For UI layer work (views, JS, CSS)
- `/n8n` - For N8N-specific questions and workflow building

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/workflow_system/`
- Data Flows: `docs/06_data_flows/workflow_execution/`
- UI Module: `docs/04_modules/ai_sam_workflows/`

### Related Modules
- `ai_sam_base` - Provides api_credentials, ai.branch, ai.conversation models
- `ai_sam_workflows` - UI layer (views, templates, static assets) - depends on this module
- `ai_sam_workflows_templates` - Extended template functionality (optional)

---

## Known Gotchas (Painfully Learned)

1. **Flatline Architecture** - `json_definition` is the SINGLE source of truth. The deprecated `nodes` table exists for legacy support but should not be used for new development. Never dual-store workflow data.

2. **Cache Invalidation** - When `json_definition` is modified, `nodes_cache_valid` is automatically set to False. The `rebuild_nodes_cache()` method was DEPRECATED in Phase 1 (2025-10-31).

3. **Node Type References** - The `workflow_types` model was REMOVED in flatline migration. Use the `workflow_type` Selection field on canvas instead. Old code referencing `workflow_type_id` (Many2one) will cause RPC errors.

4. **Node Metadata Location** - N8N node metadata lives in `ai_sam/static/src/vendor_library/_registry/node_metadata.json` (195 types). Content nodes are in `ai_sam_workflows/static/src/nodes/_content_nodes_registry/`. Agent nodes are in `ai_sam_workflows/static/src/nodes/_agent_nodes_registry/`.

5. **Security in Base Module** - All security rules (ir.model.access.csv) are defined in THIS module, not in ai_sam_workflows. Both modules share the same access rights.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.8.0)
- [x] Dependencies list is current (base, mail, ai_sam_base)
- [x] Model count matches reality (20 models)
- [x] Controller count matches reality (1 controller)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2026-01-26 by Claude

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial creation with four-file standard | Claude |
| 2026-01-19 | Recovered workflow.template model | SAM AI |
| 2025-12-21 | Added canvas_history for undo/redo | SAM AI |
| 2025-12-20 | Phase 4: Node registry simplification | SAM AI |
| 2025-10-31 | Phase 1: Flatline data source migration | SAM AI |
