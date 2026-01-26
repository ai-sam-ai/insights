# FAQ: ai_sam_workflows_base

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Workflows Base

### What is ai_sam_workflows_base?

ai_sam_workflows_base is a Productivity/Workflows module for Odoo 18 that provides the data persistence layer for SAM AI's visual workflow automation system. It stores workflow definitions in N8N-compatible JSON format, tracks execution history, and manages workflow templates.

**Key facts:**
- Technical name: `ai_sam_workflows_base`
- Current version: 18.0.1.8.0
- Requires: Odoo 18.0+, Python 3.10+
- Dependencies: base, mail, ai_sam_base
- License: LGPL-3

### What does ai_sam_workflows_base do?

ai_sam_workflows_base provides 5 core capabilities:

1. **Workflow Storage** - Stores workflow definitions in N8N-compatible JSON format with a single source of truth architecture
2. **Execution Tracking** - Records every workflow execution with timing, node outputs, and error details
3. **Node Type Registry** - Maintains 505+ pre-built N8N node types (Google, Microsoft, Slack, etc.)
4. **Template Management** - Enables saving, sharing, and reusing workflow templates across the organization
5. **Business Unit Organization** - Groups workflows by department for easier management and filtering

### Who is ai_sam_workflows_base for?

ai_sam_workflows_base is designed for:
- Developers building on SAM AI's workflow automation platform
- Technical teams integrating workflow automation into Odoo
- Businesses using Odoo 18 that require N8N-compatible workflow storage
- Teams that need audit trails and execution history for compliance

**Note:** End users typically interact with the companion `ai_sam_workflows` module which provides the visual interface.

---

## Installation & Setup

### How do I install ai_sam_workflows_base?

1. Ensure Odoo 18.0+ is running
2. Ensure `ai_sam_base` module is installed first
3. Navigate to Apps menu
4. Search for "SAM AI Workflows Base"
5. Click Install
6. The module creates sample business units automatically

### What are the dependencies for ai_sam_workflows_base?

ai_sam_workflows_base requires these Odoo modules:
- `base` - Core Odoo functionality
- `mail` - Required for mail.thread inheritance on canvas model
- `ai_sam_base` - Provides api_credentials, ai.branch, ai.conversation models

Python libraries required:
- None additional (uses standard library only)

### How do I configure ai_sam_workflows_base?

After installation, no configuration is required for basic use. Optional configuration:

1. **Business Units:** Settings > Workflows > Business Units - Add/modify departmental categories
2. **Node Types:** Technical > N8N Nodes - View available node types (505+ pre-loaded)
3. **Templates:** Workflows > Templates - Manage workflow templates

---

## Architecture & Design

### What is the "flatline architecture"?

Flatline architecture means the `json_definition` field on the `canvas` model is the **single source of truth** for all workflow data. There is no dual storage - the JSON IS the workflow.

**Why this matters:**
- No sync issues between UI and database
- N8N workflows import/export perfectly
- Simpler debugging (inspect one field, not multiple tables)
- Full workflow state captured in one place

### What is the difference between ai_sam_workflows_base and ai_sam_workflows?

| ai_sam_workflows_base | ai_sam_workflows |
|----------------------|------------------|
| Pure data layer (Python models only) | UI layer (views, JS, CSS, templates) |
| Stores workflow definitions | Displays visual canvas |
| Tracks execution history | Shows execution results |
| Manages templates and node registry | Provides node picker and configuration panels |
| No user interface | Beautiful user interface |

This follows the **Platform Skin Architecture** pattern - separating data (platform) from presentation (skin).

### Where is security defined?

All security rules (ir.model.access.csv) are defined in ai_sam_workflows_base, not in ai_sam_workflows. This ensures consistent access control regardless of which module is queried. Currently, all models have full access for base.group_user.

---

## Usage

### How do I create a workflow programmatically?

To create a workflow via Python:

```python
canvas = self.env['canvas'].create({
    'name': 'My Workflow',
    'description': 'Automated process',
    'execution_mode': 'manual',
    'workflow_type': 'automation',
    'json_definition': json.dumps({
        "nodes": [],
        "connections": {},
        "settings": {}
    })
})
```

### How do I save canvas state from JavaScript?

The canvas model provides RPC methods for frontend integration:

```javascript
// Save canvas state
await this.env.services.rpc('/web/dataset/call_kw', {
    model: 'canvas',
    method: 'save_canvas_state',
    args: [workflowId, canvasStateObject],
    kwargs: {}
});

// Load canvas state
const state = await this.env.services.rpc('/web/dataset/call_kw', {
    model: 'canvas',
    method: 'load_canvas_state',
    args: [workflowId],
    kwargs: {}
});
```

### How do I import an N8N workflow?

To import an N8N workflow as a template:

```python
# From Python
template = self.env['workflow.template'].import_n8n_workflow(
    n8n_data=n8n_json_string,
    template_name='My Imported Workflow'
)

# Then create a workflow from the template
template.action_create_workflow()
```

### How do I execute a workflow?

```python
canvas = self.env['canvas'].browse(workflow_id)
canvas.action_execute_workflow()  # Creates execution record and starts execution
```

### Can I access execution history?

Yes. Each workflow has execution records:

```python
canvas = self.env['canvas'].browse(workflow_id)

# Get all executions
executions = canvas.execution_ids

# Get successful executions
successful = executions.filtered(lambda e: e.state == 'completed')

# Get failed executions with errors
failed = executions.filtered(lambda e: e.state == 'failed')
for exec in failed:
    print(f"Error: {exec.error_message}")
    print(f"Failed node: {exec.error_node_id}")
```

---

## Troubleshooting

### Why is my workflow not executing?

**Symptom:** Clicking execute does nothing or shows an error

**Causes and Solutions:**

1. **Workflow is inactive:** Check `canvas.active = True`
2. **No json_definition:** Ensure the workflow has nodes defined
3. **No starting node:** The workflow needs a trigger node or node with no inputs

```python
# Debug
canvas = self.env['canvas'].browse(workflow_id)
print(f"Active: {canvas.active}")
print(f"JSON: {bool(canvas.json_definition)}")
if canvas.json_definition:
    data = json.loads(canvas.json_definition)
    print(f"Nodes: {len(data.get('nodes', []))}")
```

### Why is nodes_cache_valid always False?

**Symptom:** The `nodes_cache_valid` field is always False

**Cause:** This is expected in the flatline architecture. The cache system was deprecated in Phase 1 (2025-10-31). The field exists for backward compatibility but is no longer actively managed.

**Solution:** Ignore this field. Use `json_definition` directly as the source of truth.

### Why am I getting "workflow_types object has no attribute 'id'"?

**Symptom:** RPC error when accessing workflow type

**Cause:** Legacy code referencing the deprecated `workflow_type_id` Many2one field

**Solution:** Use the `workflow_type` Selection field instead:

```python
# OLD (broken)
workflow.workflow_type_id.name  # ERROR

# NEW (correct)
workflow.workflow_type  # Returns 'n8n_workflow', 'automation', etc.
```

### How do I debug node execution?

To debug what's happening during workflow execution:

```python
# Check execution log
execution = self.env['executions'].browse(execution_id)
print(f"State: {execution.state}")
print(f"Duration: {execution.duration}s")
print(f"Nodes executed: {execution.nodes_executed}/{execution.nodes_total}")

# Parse node execution details
if execution.node_executions:
    node_log = json.loads(execution.node_executions)
    for entry in node_log:
        print(f"Node: {entry['node_name']} ({entry['node_type']})")
        print(f"  Input: {entry['input_data']}")
        print(f"  Output: {entry['output_data']}")
```

---

## Integration

### Does ai_sam_workflows_base work with N8N?

Yes! The module uses N8N-compatible JSON format for workflow definitions. You can:
- Import N8N workflows directly
- Export workflows to N8N format
- Use the same node type structure as N8N

The 505+ node types in the registry match N8N's node types exactly.

### How do I integrate external services?

External services are integrated via the `api_credentials` model from `ai_sam_base`:

1. Create credential record with API keys/OAuth tokens
2. Assign credential to workflow nodes via `credential_id` field
3. Execution engine uses credentials automatically

Supported credential types include: OpenAI, OAuth 2.0, HTTP Basic Auth, Slack, Telegram, GitHub, Notion, and many more.

### Can I create custom node types?

Yes. Custom node executors can be registered by external modules:

1. Create node type entry in `n8n.simple.node` with:
   - `executor_type = 'odoo_native'`
   - `executor_class = 'your_module.your_executor'`

2. Create executor model inheriting `nodes.executor.mixin`:

```python
class MyExecutor(models.AbstractModel):
    _name = 'my_module.my_executor'
    _inherit = 'nodes.executor.mixin'

    def execute(self, node, params, input_data):
        # Your execution logic
        return {'status': 'success', 'data': {...}}
```

---

## Data & Privacy

### Where is my workflow data stored?

All workflow data is stored in your Odoo PostgreSQL database:
- `canvas` table: Workflow definitions (json_definition field)
- `executions` table: Execution history
- `workflow_template` table: Saved templates

No data is sent to external servers unless you explicitly configure external integrations.

### Can I export my workflows?

Yes. Workflows can be exported via:
- Template export: `template.action_export_template()` - Downloads JSON file
- Direct JSON access: `canvas.json_definition` - Copy the N8N-compatible JSON
- API: Query canvas records and extract json_definition field

### How do I delete workflow data?

To remove specific workflow data:
```python
# Delete a workflow and its executions
canvas = self.env['canvas'].browse(workflow_id)
canvas.unlink()  # Cascades to delete executions
```

Uninstalling the module will **keep** the database tables. To fully remove, manually drop the tables after uninstall.

---

## Performance

### How many workflows can the system handle?

The module is designed for production use with:
- No practical limit on workflow count
- Efficient JSON storage (no dual tables)
- Indexed lookups on canvas, executions, node types

Performance tips:
- Use business units to organize large numbers of workflows
- Regularly clean up old execution records
- Use `canvas.history.cleanup_old_history()` to manage undo history

### How do I optimize execution performance?

1. **Minimize node count:** Combine simple operations where possible
2. **Use appropriate triggers:** Webhook > Schedule > Manual for real-time needs
3. **Clean execution history:** Old execution records slow down statistics computation
4. **Index custom fields:** If extending the model, add indexes for frequently queried fields

---

## Support

### Where can I get help with ai_sam_workflows_base?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-workflows-base
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance
- **Technical docs:** See ai_sam_workflows_base_SCHEMA.md in this folder

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.8.0)
   - Odoo version
   - Steps to reproduce
   - Error messages (check Odoo logs)
   - Relevant json_definition content (sanitized)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| `nodes_cache_valid` always False | By Design | Ignore - flatline architecture uses json_definition only |
| `workflow_type_id` reference errors | Fixed in 1.0.2 | Use `workflow_type` Selection field instead |
| Large json_definition slow to load | Open | Consider chunked loading for 1000+ node workflows |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.8.0 | 2026-01-19 | Recovered workflow.template model + canvas.template_id field |
| 18.0.1.7.0 | 2025-12-21 | Added canvas.history for undo/redo support |
| 18.0.1.6.0 | 2025-12-20 | Phase 4: Node registry simplification (n8n.simple.node) |
| 18.0.1.5.0 | 2025-12-14 | Phase 2-3: Data flow models (connections, field mappings) |
| 18.0.1.0.2 | 2025-11-01 | Phase 1: Flatline data source migration |

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
