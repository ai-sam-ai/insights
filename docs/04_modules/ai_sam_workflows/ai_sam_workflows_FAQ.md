# ai_sam_workflows - Frequently Asked Questions

> **Four-File Standard:** [META](ai_sam_workflows_META.md) | [SCHEMA](ai_sam_workflows_SCHEMA.md) | [WOW](ai_sam_workflows_WOW.md) | FAQ

## General Questions

### What is ai_sam_workflows?

ai_sam_workflows is the UI layer for SAM AI's N8N-compatible workflow automation platform. It provides the visual interface for building, editing, and managing workflows with 1,500+ service connectors.

### What is Platform Skin Architecture?

Platform Skin Architecture separates UI from data:
- **ai_sam_workflows** = UI Layer (views, JS, CSS, controllers)
- **ai_sam_workflows_base** = Data Layer (models, security, logic)

This design means you can uninstall the UI without losing workflow data.

### Will I lose my workflows if I uninstall this module?

**No.** All workflow data lives in ai_sam_workflows_base. Uninstalling ai_sam_workflows only removes the UI. Reinstalling restores full access to existing workflows.

### What are the module dependencies?

```
ai_sam_workflows
    |
    +---> ai_sam_workflows_base (workflow models)
    +---> ai_sam (canvas framework)
    +---> ai_sam_base (core foundation)
```

Install in reverse order: ai_sam_base first, ai_sam_workflows last.

## Installation & Setup

### Workflows not appearing in menu

**Problem:** Workflow menu items are missing or not accessible.

**Solutions:**
1. Verify module is installed: Settings > Apps > search "SAM AI Workflows"
2. Check platform registration: Settings > Technical > Canvas Platforms
3. Verify user has workflow permissions
4. Clear browser cache and refresh

### Canvas shows blank/empty

**Problem:** Canvas area is completely blank.

**Solutions:**
1. Check browser console for JavaScript errors (F12)
2. Verify JavaScript assets loaded (Network tab, filter .js)
3. Check for 404 errors on asset files
4. Try hard refresh: Ctrl+Shift+R

### Nodes not appearing in search

**Problem:** Node search shows empty results.

**Solutions:**
1. Check N8N node library: Settings > Technical > N8N Simple Nodes
2. Should have 306+ nodes listed
3. If empty, upgrade module to trigger post_init_hook
4. Check node_type_registry.js loaded correctly

## Canvas Operations

### Cannot zoom in/out

**Problem:** Mouse wheel doesn't zoom canvas.

**Solutions:**
1. Ensure cursor is over canvas area
2. Check zoom limits (0.1x min, 3.0x max)
3. Verify canvas_manager.js loaded
4. Try keyboard shortcuts: Ctrl++ / Ctrl+-

### Nodes won't move

**Problem:** Dragging nodes doesn't work.

**Solutions:**
1. Ensure node is selected first (click on it)
2. Check node_manager.js loaded
3. Verify no JavaScript errors in console
4. Try selecting a different node

### Connections won't draw

**Problem:** Cannot create connections between nodes.

**Solutions:**
1. Drag from output port (right) to input port (left)
2. Ensure port dots are visible (hover over node)
3. Verify connection_system.js loaded
4. Check browser console for errors

### Paste & Render not working

**Problem:** Pasting N8N JSON doesn't render workflow.

**Solutions:**
1. Verify JSON is valid N8N export format
2. Check workflow_orchestrator.py endpoint is accessible
3. Look for errors in browser console
4. Try smaller workflow first to test

## N8N Import/Export

### Import fails with error

**Problem:** N8N JSON import wizard shows errors.

**Solutions:**
1. Verify JSON format matches N8N cloud export
2. Check all node types exist in registry
3. Review error message for specific field
4. Try importing a simpler workflow first

### Node types not mapping correctly

**Problem:** Imported nodes show as "Unknown" type.

**Solutions:**
1. Check node_type_mapper.py for type conversion
2. Verify N8N type string format (e.g., "n8n-nodes-base.httpRequest")
3. Add missing types to node_type_registry.js
4. Check for typos in N8N JSON

### Connections missing after import

**Problem:** Nodes import but connections are lost.

**Solutions:**
1. Verify connections array in JSON
2. Check node IDs match between nodes and connections
3. Review WorkflowParser.js for parsing logic
4. Check browser console for connection errors

## Performance

### Canvas is slow with many nodes

**Problem:** Performance degrades with 50+ nodes.

**Solutions:**
1. Use 'instant' paste strategy for large workflows
2. Disable animations in settings
3. Reduce zoom level
4. Check for memory leaks in console

### Page takes long to load

**Problem:** Workflow page loads slowly.

**Solutions:**
1. Verify assets are minified in production
2. Enable browser caching
3. Check for excessive console logging
4. Reduce number of workflows in list view

## Development

### How do I add a new node type?

1. Create directory: `static/src/n8n/n8n_nodes/MyVendor/`
2. Add node definition: `MyNode.node.js`
3. Register in `node_type_registry.js`
4. Upgrade module

See [WOW documentation](ai_sam_workflows_WOW.md#adding-new-node-types) for full details.

### How do I modify the canvas zoom limits?

Edit `static/src/n8n/canvas/canvas_manager.js`:
```javascript
const MIN_ZOOM = 0.1;  // Change this
const MAX_ZOOM = 3.0;  // Change this
```

### How do I add a new controller endpoint?

1. Create or edit file in `controllers/`
2. Define route with `@http.route` decorator
3. Import in `controllers/__init__.py`
4. Upgrade module

### Where should I add new models?

**Never add models to ai_sam_workflows.**

This is a Platform Skin module. Add models to ai_sam_workflows_base instead.

## Troubleshooting

### Error: "Canvas not found"

**Cause:** Workflow ID doesn't exist or user lacks access.

**Solutions:**
1. Verify workflow exists in database
2. Check user has read permission
3. Ensure ai_sam_workflows_base is installed

### Error: "Node type not found"

**Cause:** N8N type string not in registry.

**Solutions:**
1. Check node_type_registry.js for type
2. Add type to appropriate category
3. Verify type string format

### Error: "Connection refused"

**Cause:** Controller endpoint not accessible.

**Solutions:**
1. Verify controller file is imported
2. Check route decorator syntax
3. Ensure module is upgraded after changes
4. Check Odoo logs for errors

### JavaScript "undefined" errors

**Cause:** Asset loading order incorrect.

**Solutions:**
1. Check __manifest__.py assets section
2. Ensure dependencies load first
3. Verify no circular imports
4. Check network tab for failed loads

## Support & Resources

### Where can I get help?

- **Documentation:** This file + README.md
- **GitHub:** https://github.com/sme-ec/ai_sam
- **Email:** sam@sme.ec

### How do I report a bug?

1. Check this FAQ first
2. Reproduce issue consistently
3. Capture browser console errors
4. Create GitHub issue with:
   - Odoo version
   - Module version
   - Steps to reproduce
   - Error messages

### Where is the API documentation?

See `API_DOCUMENTATION.yaml` in module root for OpenAPI specification.

### Where are the architecture diagrams?

See `ARCHITECTURE.mermaid` in module root for visual diagrams.

---
*Last Updated: 2026-01-26*
*Documentation Standard: Four-File (META/SCHEMA/WOW/FAQ)*
