# ai_sam_workflows - Ways of Working

> **Four-File Standard:** [META](ai_sam_workflows_META.md) | [SCHEMA](ai_sam_workflows_SCHEMA.md) | WOW | [FAQ](ai_sam_workflows_FAQ.md)

## User Workflows

### 1. Create a New Workflow

**Navigation:** SAM AI > Workflows > Definitions

1. Click **Create** to open new workflow form
2. Enter workflow name and description
3. Select business unit (optional)
4. Click **Open Canvas** to enter visual editor
5. Add nodes from the sidebar (1,500+ available)
6. Connect nodes by dragging between ports
7. Configure each node's parameters
8. Save workflow

**Keyboard Shortcuts:**
- `Delete` - Remove selected node
- `Ctrl+S` - Save workflow
- `Ctrl+Z` - Undo
- Mouse wheel - Zoom in/out
- Click+drag background - Pan canvas

### 2. Import N8N Workflow

**Navigation:** SAM AI > Workflows > Import

1. Export workflow from N8N cloud (JSON format)
2. Navigate to import wizard
3. Upload JSON file or paste content
4. Review workflow preview
5. Click **Import** to create workflow
6. Edit as needed in canvas

### 3. Paste & Render (Theatrical Assembly)

**Most Impressive Feature!**

1. Copy N8N workflow JSON to clipboard
2. Open workflow canvas
3. Use **Paste & Render** action
4. SAM analyzes workflow structure
5. Theater system animates node placement:
   - Small workflows: Instant paste
   - Medium workflows: Progressive reveal
   - Large/complex workflows: Theatrical assembly
6. Workflow rendered in optimal 4-column layout

**Strategy Selection:**
| Workflow Size | Strategy | Description |
|--------------|----------|-------------|
| < 5 nodes | `instant` | Immediate placement |
| 5-15 nodes | `progressive` | Sequential reveal |
| 15+ nodes or complex | `theatrical` | Animated assembly with narration |

### 4. Add Nodes to Canvas

**Method 1: Node Search**
1. Click **Add Node** button
2. Search from 1,500+ available nodes
3. Browse by category (CRM, Marketing, etc.)
4. Click to add to canvas

**Method 2: Right-click Context Menu**
1. Right-click on canvas background
2. Select from quick-add menu
3. Node appears at cursor position

**Method 3: Drag from Sidebar**
1. Open node catalog sidebar
2. Drag node type onto canvas
3. Position and release

### 5. Create Connections

1. Hover over node to reveal port dots
2. Click and drag from output port (right side)
3. Drag to input port of target node (left side)
4. Connection snaps when close
5. Bezier curve draws automatically

**Multi-input Nodes:**
- Merge, Aggregate nodes support multiple inputs
- Add input ports with **+** button
- Remove with **-** button

### 6. Execute Workflow

**Navigation:** SAM AI > Workflows > Executions

1. Open saved workflow
2. Click **Execute** button
3. Monitor execution status
4. View node-by-node results
5. Debug failures with execution logs

### 7. Manage Business Units

**Navigation:** Configuration > Business Units

1. Create units (Sales, Marketing, Operations)
2. Assign workflows to units
3. Filter workflows by unit
4. Control team access

### 8. Configure API Credentials

**Navigation:** Configuration > API Credentials

1. Click **Create** for new credential
2. Select service type (Gmail, Slack, etc.)
3. Enter API keys/tokens (encrypted storage)
4. Test connection
5. Assign credentials to workflow nodes

## Development Guidelines

### Adding New Node Types

**Step 1: Create vendor directory**
```bash
mkdir static/src/n8n/n8n_nodes/MyVendor
```

**Step 2: Add node implementation**
```javascript
// static/src/n8n/n8n_nodes/MyVendor/MyNode.node.js
module.exports = {
    description: {
        displayName: 'My Node',
        name: 'myNode',
        icon: 'file:mynode.svg',
        group: ['transform'],
        version: 1,
        description: 'My custom node description',
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // Node parameters
        ]
    }
};
```

**Step 3: Register in node registry**
```javascript
// Update n8n/nodes/node_type_registry.js
// Add to appropriate category
```

### Modifying Canvas System

**File:** `static/src/n8n/canvas/canvas_manager.js`

```javascript
// Key sections:
// Line ~100: Zoom Configuration
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3.0;

// Line ~300: Pan/Drag Handling
handlePan(event) { /* ... */ }

// Line ~500: Node Selection
selectNode(nodeId) { /* ... */ }

// Line ~800: Canvas Rendering
render() { /* ... */ }
```

### Modifying Node System

**File:** `static/src/n8n/nodes/node_manager.js`

```javascript
// Key methods:
createNode(type, position) { }
deleteNode(nodeId) { }
updateNodeParameters(nodeId, params) { }
renderNode(node) { }
```

### Adding New Views

**Step 1: Create view XML**
```xml
<!-- views/my_new_view.xml -->
<odoo>
    <record id="view_my_model_form" model="ir.ui.view">
        <field name="name">my.model.form</field>
        <field name="model">my.model</field>
        <field name="arch" type="xml">
            <form>
                <sheet>
                    <group>
                        <field name="name"/>
                    </group>
                </sheet>
            </form>
        </field>
    </record>
</odoo>
```

**Step 2: Add to manifest**
```python
# __manifest__.py
'data': [
    # ... existing views ...
    'views/my_new_view.xml',
],
```

**Step 3: Update module**

### CSS Customization

**Brand Colors:**
```css
:root {
    --n8n-node-background: #ffffff;
    --n8n-node-border: #ccc;
    --n8n-node-selected: #ff6d5a;
    --n8n-connection-color: #8b8b8b;
}
```

## Testing Procedures

### Manual Testing Checklist

**Canvas Operations:**
- [ ] Pan canvas (drag background)
- [ ] Zoom in/out (mouse wheel)
- [ ] Zoom limits respected (0.1x - 3.0x)
- [ ] Node selection
- [ ] Multi-select nodes

**Node Operations:**
- [ ] Add node from sidebar
- [ ] Delete node (Delete key)
- [ ] Move node (drag)
- [ ] Edit node parameters (double-click)
- [ ] Node search (1,500+ nodes)

**Connections:**
- [ ] Create connection (drag port to port)
- [ ] Delete connection
- [ ] Bezier curve rendering
- [ ] Connection validation

**N8N Import:**
- [ ] Import valid N8N JSON
- [ ] Handle invalid JSON gracefully
- [ ] Node type mapping correct
- [ ] Connections recreated

**Workflow Management:**
- [ ] Create workflow
- [ ] Save workflow
- [ ] Load workflow
- [ ] Delete workflow

### Browser Console Testing

```javascript
// Test canvas manager
console.log(canvasManager);
canvasManager.zoomIn();
canvasManager.zoomOut();

// Test node manager
nodeManager.createNode('n8n-nodes-base.httpRequest', {x: 100, y: 100});
nodeManager.getNodes();

// Test workflow parser
const workflow = WorkflowParser.parse(jsonString);
console.log(workflow);
```

## Best Practices

### Platform Skin Architecture

**DO:**
- Keep all UI code in this module
- Access models from ai_sam_workflows_base
- Use controllers for HTTP endpoints
- Follow asset loading order

**DON'T:**
- Add data models to this module
- Define security rules here
- Create business logic here
- Bypass the data layer

### JavaScript Development

**DO:**
- Register components in registries
- Use Odoo services bridge for Odoo access
- Follow N8N styling conventions
- Test in browser console first

**DON'T:**
- Bypass the canvas manager
- Modify nodes directly
- Skip the connection system
- Ignore zoom/pan state

### View Development

**DO:**
- Follow XML load order
- Define actions before menus
- Use proper view inheritance
- Test with different screen sizes

**DON'T:**
- Reference undefined actions
- Create circular dependencies
- Skip view priority settings
- Ignore Odoo 18 conventions

## Deployment Checklist

### Pre-deployment

1. **Dependencies installed in order:**
   - ai_sam_base
   - ai_sam
   - ai_sam_workflows_base
   - ai_sam_workflows

2. **Platform registration verified:**
   - Settings > Technical > Canvas Platforms
   - "SAM Automator Platform" active

3. **N8N node library populated:**
   - Settings > Technical > N8N Simple Nodes
   - 306+ nodes visible

### Production Configuration

1. **Database Optimization**
   - [ ] Indexes on workflow tables
   - [ ] Business units configured
   - [ ] Node library populated

2. **Security**
   - [ ] API credentials encrypted
   - [ ] User permissions configured
   - [ ] Business unit access control

3. **Performance**
   - [ ] JavaScript assets minified
   - [ ] CSS assets minified
   - [ ] Browser caching enabled

4. **Monitoring**
   - [ ] Error logging enabled
   - [ ] Execution tracking active

---
*Last Updated: 2026-01-26*
*Documentation Standard: Four-File (META/SCHEMA/WOW/FAQ)*
