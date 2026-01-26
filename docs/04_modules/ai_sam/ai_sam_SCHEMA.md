# Schema: ai_sam

> **Technical Truth** - UI Components, Views, JavaScript, and Assets

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam` |
| **Version** | 18.0.7.14 |
| **Architecture** | Platform Skin (UI-only) |
| **Total Models** | 0 (all in ai_sam_base) |
| **Total Controllers** | 0 (all in ai_sam_base) |
| **View XML Files** | 20 (15 main + 5 memory) |
| **JavaScript Files** | 25 |
| **CSS Files** | 10 |
| **Vendor Icon Directories** | 206 |
| **Total Files** | 629 |

---

## UI Architecture

### Platform Skin Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    ai_sam (UI Layer)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐│
│  │  Views  │  │   JS    │  │   CSS   │  │  Static Assets  ││
│  │ 20 XML  │  │  25     │  │   10    │  │  206 vendors    ││
│  └────┬────┘  └────┬────┘  └────┬────┘  └────────┬────────┘│
└───────┼────────────┼───────────┼────────────────┼──────────┘
        │            │           │                │
        ▼            ▼           ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                 ai_sam_base (Data Layer)                    │
│  ┌─────────┐  ┌─────────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Models  │  │ Controllers │  │ Services │  │  Security │ │
│  │   43    │  │  10 (67 ep) │  │  Claude  │  │   ACLs    │ │
│  └─────────┘  └─────────────┘  └──────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Views (20 XML Files)

### Main Views (15 Files)

| View File | Models Referenced | View Types | Purpose |
|-----------|-------------------|------------|---------|
| `api_service_provider_views.xml` | api.service.provider | form (8 tabs), tree, kanban | 8-tab progressive disclosure for API configuration |
| `sam_ai_chat_v2_action.xml` | N/A (client action) | Client action | Main chat interface launcher |
| `ai_memory_dashboard_simple.xml` | N/A (client action) | Client action | Memory statistics dashboard |
| `mcp_server_config_views.xml` | sam.mcp.server.config | form, tree | MCP server generation interface |
| `sam_mode_context_view.xml` | sam.mode.context | form, tree | Hierarchical AI agents (Power Prompts) |
| `ai_service_cost_comparison_views.xml` | ai.service.cost.comparison | pivot, graph, tree, form | Cost intelligence analysis |
| `ai_workspace_views.xml` | ai.workspace | form, tree, kanban | Team collaboration workspace |
| `ai_provider_model_views.xml` | ai.provider.model | form, tree | AI model configuration |
| `sam_user_settings_view.xml` | sam.user.settings | form | User preferences |
| `sam_api_settings_views.xml` | res.config.settings | form | API configuration in Settings |
| `ai_mode_registry_views.xml` | ai.mode.registry | form, tree | Mode auto-discovery system |
| `canvas_container.xml` | N/A (template) | QWeb template | Canvas container template |
| `api_oauth_templates.xml` | N/A (template) | QWeb template | OAuth flow templates |

### Memory Views (5 Files in views/memory/)

| View File | Models Referenced | View Types | Purpose |
|-----------|-------------------|------------|---------|
| `memory_configuration_consolidated.xml` | ai.memory.config | form | Memory system configuration |
| `memory_import_wizards_consolidated.xml` | ai.memory.import.wizard | form | Memory import wizards |
| `memory_graph_tests_consolidated.xml` | N/A (template) | QWeb template | Graph testing interface |
| `ai_conversation_reader_views.xml` | ai.conversation | kanban, tree, form | Conversation browsing |
| `memory_graph_simple.xml` | N/A (template) | QWeb template | Vis.js graph visualization |

### Menu Structure

**File:** `views/sam_ai_menus_consolidated.xml` (Single Source of Truth)

```
SAM AI (Root Menu)
├── Chat
│   ├── New Conversation
│   └── Conversation History
├── Memory
│   ├── Dashboard
│   ├── Vectors (ChromaDB)
│   ├── Graph (Apache AGE)
│   │   ├── Entities
│   │   ├── Connections
│   │   └── Access Logs
│   └── Memory Settings
├── Workflows
│   ├── Canvas
│   ├── Executions
│   └── Templates
├── Configuration
│   ├── API Providers (203 vendors)
│   ├── AI Services
│   ├── AI Models
│   ├── Credentials (encrypted)
│   ├── Power Prompts (Hierarchical Agents)
│   ├── MCP Servers
│   └── Workspaces
└── Reports
    ├── Cost Analysis
    ├── Usage Statistics
    └── Conversation Reader
```

---

## JavaScript Architecture (25 Files)

### Asset Registration

All JavaScript files are registered in `__manifest__.py` under `assets['web.assets_backend']`.

### Core Chat Interface

**File:** `static/src/js/sam_chat_vanilla_v2.js` (9,056 lines)

| Component | Lines | Purpose |
|-----------|-------|---------|
| State Management | ~100 | Proxy-based reactive state |
| Message Rendering | ~500 | Markdown, syntax highlighting |
| Streaming Handler | ~300 | SSE real-time response |
| Memory Integration | ~400 | ChromaDB + Apache AGE queries |
| Tab Management | ~200 | Multi-conversation tabs |
| Token Counter | ~150 | Usage estimation |
| Attachment Handler | ~200 | File upload support |

**Reactive State Pattern:**
```javascript
const chatState = new Proxy({
    conversations: [],
    activeConversationId: null,
    isStreaming: false,
    tokenCount: 0
}, {
    set(target, property, value) {
        target[property] = value;
        STATE_TO_DOM_MAP[property]?.forEach(updater => updater(value));
        return true;
    }
});
```

### Canvas Framework (4 Files in static/src/core/)

| File | Purpose | Key Functions |
|------|---------|---------------|
| `canvas_engine.js` | Rendering engine | `render()`, `drawNode()`, `drawConnection()` |
| `canvas_sizer.js` | Coordinate transforms | `worldToScreen()`, `screenToWorld()`, `zoom()` |
| `node_manager.js` | Node CRUD operations | `addNode()`, `removeNode()`, `updateNode()` |
| `platform_loader.js` | Platform adapters | `loadOdooPlatform()`, `loadN8NPlatform()` |

### Configuration Files (3 Files in static/src/config/)

| File | Purpose | Note |
|------|---------|------|
| `sam_config.js` | Global configuration | Moved to backend assets (2026-01-02) |
| `sam_logger.js` | Frontend logging | Moved to backend assets (2026-01-02) |
| `sam_chat_overlay.js` | Overlay system | Moved to backend assets (2026-01-02) |

### Chat UI Components (static/src/chat_ui/)

| File | Purpose |
|------|---------|
| `sam_chat_bubble.js` | Floating chat bubble launcher |
| `sam_chat_vanilla_v2_action.xml` | QWeb template for chat |

### Widgets and Utilities

| File | Purpose |
|------|---------|
| `static/src/js/sam_ai_chat_widget.js` | Chat widget component |
| `static/src/js/sam_ai_token_counter.js` | Token counting display |
| `static/src/js/sam_ai_artifacts_manager.js` | Artifact management |
| `static/src/js/shared/sam_menu_sidebar.js` | Sidebar menu component |

### Memory System JS (static/src/js/memory/)

| File | Purpose |
|------|---------|
| `memory_graph_renderer.js` | Vis.js graph rendering |
| `memory_graph_renderer_debug.js` | Debug version |
| `memory_sidebar.js` | Memory sidebar component |

### Workflow UI Components (static/src/js/workflows/)

| File | Purpose |
|------|---------|
| `field_chip_renderer.js` | Field chip rendering |
| `field_mapper_panel.js` | Field mapping UI |
| `output_tabs_controller.js` | Output tab management |
| `workflows.scss` | Workflow styling |

### OWL Components (static/src/components/)

| Component | Files | Purpose |
|-----------|-------|---------|
| `sam_debug_toggle` | .js, .css, .xml | Debug mode toggle |
| `sam_code_mode_button` | .js, .xml | Code mode button |
| `sam_permission_handler` | .js, .scss, .xml | Permission handling UI |

---

## CSS Architecture (10 Files)

### Brand Variables

**File:** `static/src/css/sam_brand_variables.css`

```css
:root {
    --sam-primary: #714B67;      /* Purple */
    --sam-secondary: #9B7EAC;    /* Light purple */
    --sam-accent: #4A90E2;       /* Blue accent */
    --sam-success: #28A745;      /* Green */
    --sam-danger: #DC3545;       /* Red */
    --sam-warning: #FFC107;      /* Yellow */
}
```

**Note:** Synced with `sam_ui_theme/_primary_variables.scss` and `colour_guide.html`.

### CSS Files

| File | Purpose |
|------|---------|
| `sam_brand_variables.css` | Brand color variables |
| `sam_ai_chat_interface.css` | Main chat styling |
| `sam_ai_chat_widget.css` | Widget styling |
| `sam_ai_token_counter.css` | Token counter styling |
| `canvas_base.css` | Canvas framework styling |
| `sam_split_handle.css` | Split panel handles |
| `chat_interaction.css` | Chat interaction states |
| `compact_messages.css` | Compact message layout |
| `platform_sidebar.css` | Platform sidebar styling |

---

## Static Assets

### Vendor Library Structure

**Path:** `static/src/vendor_library/`

```
vendor_library/
├── _registry/
│   ├── api_providers.json    # 203 provider metadata entries
│   └── svg_icons.json        # 301 SVG icon mappings
├── anthropic/
│   └── claude.svg
├── openai/
│   └── openai.svg
├── google/
│   └── gemini.svg
└── ... (203 more provider directories)
```

### Module Description Assets

**Path:** `static/description/`

| File | Purpose |
|------|---------|
| `icon.png` | Module icon |
| `index.html` | Odoo Apps description page |
| `Sam.png` | SAM branding image |
| `sam_chat_flow_*.png/svg/mmd` | Architecture diagrams |

---

## Security Rules (20 Rules)

**File:** `security/ir.model.access.csv`

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| sam.user.settings | base.group_user | Yes | Yes | Yes | Yes |
| sam.mode.context | base.group_user | Yes | No | No | No |
| sam.mode.context | base.group_system | Yes | Yes | Yes | Yes |
| ai.workspace.add.conversations.wizard | base.group_user | Yes | Yes | Yes | Yes |
| sam.mcp.server.config | base.group_user | Yes | Yes | Yes | Yes |
| sam.mcp.feature | base.group_user | Yes | Yes | Yes | Yes |
| canvas.platform | base.group_user | Yes | Yes | Yes | Yes |
| ai.workspace | base.group_user | Yes | Yes | Yes | Yes |
| ai.service.cost.comparison | base.group_user | Yes | No | No | No |
| ai.memory.config | base.group_user | Yes | Yes | Yes | No |
| ai.conversation.import | base.group_user | Yes | Yes | Yes | Yes |
| ai.extractor.plugin | base.group_user | Yes | Yes | Yes | Yes |
| ai.memory.import.wizard | base.group_user | Yes | Yes | Yes | Yes |
| ai.memory.uninstall.wizard | base.group_user | Yes | Yes | Yes | Yes |
| ai.conversation.history.importer | base.group_user | Yes | Yes | Yes | Yes |
| ai.conversation.tag | base.group_user | Yes | Yes | Yes | Yes |

**Note:** All model definitions are in `ai_sam_base`. These are UI-related access rules only.

---

## Data Files

### Mode Context Data

**File:** `data/sam_mode_context_data.xml`

Pre-configured SAM mode contexts for different use cases.

### Memory Graph Platform

**File:** `data/memory/memory_graph_platform.xml`

Canvas platform configuration for memory graph visualization.

### Cleanup Data

**File:** `data/cleanup_orphaned_memory_menus.xml`

Cleanup script for orphaned menu items (runs after menu creation).

---

## Hooks (Only Python File)

**File:** `hooks.py`

| Hook | Trigger | Purpose |
|------|---------|---------|
| `post_init_hook` | Module install | Refresh Mode Registry (scan .md files) |
| `post_update_hook` | Module upgrade | Refresh Mode Registry (pick up new .md files) |

**Note:** This is the ONLY Python file in ai_sam. All other Python code is in ai_sam_base.

---

## Prompts Directory

**Path:** `prompts/`

Contains `.md` prompt files scanned by Mode Registry during install/upgrade.

| Subdirectory | Purpose |
|--------------|---------|
| `modes/` | Mode-specific prompts |
| `global/` | Global context prompts |

---

## Integration Points

### With ai_sam_base

| Integration | Method | Endpoint/Model |
|-------------|--------|----------------|
| Chat messages | JSON-RPC | `ai.conversation.message` |
| Memory search | HTTP POST | `/sam_ai/memory/search` |
| API providers | JSON-RPC | `api.service.provider` |
| Cost tracking | JSON-RPC | `ai.service.cost.comparison` |
| MCP generation | HTTP POST | `/sam_ai/mcp/generate` |

### With External Services

| Service | Integration | Handler |
|---------|-------------|---------|
| Claude API | HTTP (via ai_sam_base) | `sam_chat_vanilla_v2.js` |
| ChromaDB | HTTP (via ai_sam_base) | `memory_graph_renderer.js` |
| Apache AGE | SQL (via ai_sam_base) | `memory_graph_renderer.js` |
| N8N | JSON export | `canvas_engine.js` |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-25 | Initial SCHEMA documentation | CTO Module Docs Agent |
| 2026-01-02 | Config/logger/overlay moved to backend assets | Developer |
| 2025-12-04 | Chat bubble and token counter re-enabled | Developer |
| 2025-11-30 | Platform Skin Architecture implemented | Developer |
