# Context Gathering & Assembly - Data Flow Diagram

> **Scope:** How SAM learns WHERE the user is and BUILDS the session context
> **Modules:** `ai_sam` (frontend), `ai_sam_base` (backend)
> **Last Updated:** 2026-01-26
> **Audit Status:** Current state documented - FRONTEND BROKEN

---

## What Is Context?

Context tells SAM:
- **Where** the user is in Odoo (which page, action, model)
- **What** they're looking at (record ID, view type)
- **What domain** this belongs to (CRM, Sales, Workflow, etc.)
- **What tools** to load for this location
- **What knowledge** applies to this area

Without this, SAM is blind - it has tools but doesn't know where to use them.

---

## Two-Phase Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTEXT: TWO PHASES                                   │
└─────────────────────────────────────────────────────────────────────────────┘

  PHASE 1: GATHERING (Frontend)          PHASE 2: ASSEMBLY (Backend)
  ─────────────────────────────          ──────────────────────────────

  Collect from Odoo JS services:         Build session context:
  - action_id                            - System prompt
  - model                                - Tools array
  - record_id                            - Domain knowledge
  - view_type                            - User/business context

  Send with every message                Runs on session start only
  (context_data JSON)                    (cached 30 minutes)
```

---

## Phase 1: Context Gathering (Frontend)

### Current State: BROKEN

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTEXT GATHERING - CURRENT STATE                         │
│                           (What Actually Happens)                            │
└─────────────────────────────────────────────────────────────────────────────┘

  USER OPENS CHAT                      WHAT GETS SENT
       │                                    │
       │  clicks SAM bubble                 │
       ▼                                    ▼
  ┌─────────────────┐              ┌─────────────────────────┐
  │  SamChatClient  │              │  context_data = {       │
  │                 │───────────────│    url: "https://..."  │  ← ONLY THIS!
  │  _buildFormData │              │  }                      │
  └─────────────────┘              └─────────────────────────┘
                                            │
                                            ▼
                                   ┌─────────────────────────┐
                                   │  Backend receives:      │
                                   │                         │
                                   │  model: NULL            │
                                   │  record_id: NULL        │
                                   │  action_id: NULL        │
                                   │  view_type: NULL        │
                                   │                         │
                                   │  → Falls back to        │
                                   │    "general" domain     │
                                   │  → No location-specific │
                                   │    tools loaded         │
                                   └─────────────────────────┘

  RESULT: SAM doesn't know where it is. Domain detection fails.
          System prompt says "You are in: General"
```

### Why Is It Broken?

1. **Context detection is DISABLED** in `sam_ai_chat_widget.js:208`:
   ```javascript
   // DISABLED: Automatic context detection moved to bubble click
   // this.detectContext();
   ```

2. **Even when enabled**, it parses URL strings instead of using Odoo's services

3. **Odoo JS services are available but not used:**
   - `action_service` has current action, model, record_id
   - `router` has URL state
   - `menu` has menu hierarchy

### Target State: WORKING

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTEXT GATHERING - TARGET STATE                          │
│                          (What Should Happen)                                │
└─────────────────────────────────────────────────────────────────────────────┘

  USER OPENS CHAT                      WHAT SHOULD GET SENT
       │                                    │
       │  clicks SAM bubble                 │
       ▼                                    ▼
  ┌─────────────────┐              ┌─────────────────────────┐
  │  SamChatClient  │              │  context_data = {       │
  │                 │              │    url: "https://...",  │
  │  gatherContext()│───────────────│    action_id: 848,     │
  │  (uses Odoo     │              │    action_name: "Apps", │
  │   JS services)  │              │    model: "ir.module",  │
  └─────────────────┘              │    record_id: null,     │
                                   │    view_type: "list",   │
                                   │    menu_id: 123,        │
                                   │  }                      │
                                   └─────────────────────────┘
                                            │
                                            ▼
                                   ┌─────────────────────────┐
                                   │  Backend receives:      │
                                   │                         │
                                   │  → Detects "apps"       │
                                   │    domain               │
                                   │  → Loads appropriate    │
                                   │    tools                │
                                   │  → System prompt says   │
                                   │    "You are in: Apps"   │
                                   └─────────────────────────┘

  RESULT: SAM knows exactly where it is. Correct domain detected.
          System prompt is location-aware. Tools match context.
```

---

## Phase 2: Context Assembly (Backend)

Once the backend receives `context_data`, it builds the session context.

### Assembly Steps

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTEXT ASSEMBLY - BACKEND STEPS                          │
└─────────────────────────────────────────────────────────────────────────────┘

  INPUT: context_data                    OUTPUT: session_context
  ───────────────────                    ───────────────────────
  {                                      {
    url, action_id, model,                 system_prompt: "...",
    record_id, view_type                   tools: [...],
  }                                        conversation_history: [],
                                           location: {...}
       │                                 }
       │                                       ▲
       ▼                                       │
  ┌────────────────────────────────────────────┴──────────────────────────────┐
  │                                                                            │
  │   STEP 1: LOCATION DETECTION                                               │
  │   ─────────────────────────                                                │
  │   ┌─────────────┐     ┌──────────────────────────────────────────────┐    │
  │   │ context_data│────>│  LocationInsights._detect_domain()           │    │
  │   └─────────────┘     │                                              │    │
  │                       │  Priority:                                   │    │
  │                       │  1. Context flags (canvas_id, crm_lead_id)   │    │
  │                       │  2. Model name match (crm.lead → crm)        │    │
  │                       │  3. URL patterns (/crm/, /sale/)             │    │
  │                       │  4. Fallback → "general"                     │    │
  │                       └──────────────────────────────────────────────┘    │
  │                                      │                                     │
  │                                      ▼                                     │
  │                       ┌──────────────────────────────────────────────┐    │
  │                       │  Domain: "crm"                               │    │
  │                       │  Domain Name: "CRM Pipeline"                 │    │
  │                       │  Primary Model: "crm.lead"                   │    │
  │                       │  Domain Tools: [crm_update_stage, ...]       │    │
  │                       │  Domain Knowledge: "CRM context text..."     │    │
  │                       └──────────────────────────────────────────────┘    │
  │                                                                            │
  │   STEP 2: SAM IDENTITY                                                     │
  │   ────────────────────                                                     │
  │   ┌──────────────────────────────────────────────────────────────────┐    │
  │   │  Load SAM user from database                                     │    │
  │   │  Load personality from config file                               │    │
  │   │  Get SAM permissions from groups                                 │    │
  │   └──────────────────────────────────────────────────────────────────┘    │
  │                                                                            │
  │   STEP 3: BUSINESS CONTEXT                                                 │
  │   ────────────────────────                                                 │
  │   ┌──────────────────────────────────────────────────────────────────┐    │
  │   │  Company Name: "Acme Corp"                                       │    │
  │   │  Business Description: "We are a B2B SaaS..."                    │    │
  │   │  Currency: "USD"                                                 │    │
  │   └──────────────────────────────────────────────────────────────────┘    │
  │                                                                            │
  │   STEP 4: USER INFO                                                        │
  │   ─────────────────                                                        │
  │   ┌──────────────────────────────────────────────────────────────────┐    │
  │   │  User Name: "John Smith"                                         │    │
  │   │  User Email: "john@acme.com"                                     │    │
  │   │  User Company: "Acme Corp"                                       │    │
  │   └──────────────────────────────────────────────────────────────────┘    │
  │                                                                            │
  │   STEP 5: COLLECT TOOLS                                                    │
  │   ─────────────────────                                                    │
  │   ┌──────────────────────────────────────────────────────────────────┐    │
  │   │  Core CRUD Tools:  odoo_read, odoo_search, odoo_create,          │    │
  │   │                    odoo_write                                    │    │
  │   │  Chat Tools:       memory_recall                                 │    │
  │   │  Location Tools:   (from domain, e.g., canvas_get_nodes)         │    │
  │   │                                                                  │    │
  │   │  Combined: 10-20 tools                                           │    │
  │   └──────────────────────────────────────────────────────────────────┘    │
  │                                                                            │
  │   STEP 6: BUILD SYSTEM PROMPT                                              │
  │   ───────────────────────────                                              │
  │   ┌──────────────────────────────────────────────────────────────────┐    │
  │   │  # CURRENT LOCATION           (100-200 tokens)                   │    │
  │   │  URL, Area, Model, Record ID                                     │    │
  │   │                                                                  │    │
  │   │  # Who You Are                (500-1000 tokens)                  │    │
  │   │  SAM identity + personality                                      │    │
  │   │                                                                  │    │
  │   │  # Business Context           (200-500 tokens)                   │    │
  │   │  Company + description                                           │    │
  │   │                                                                  │    │
  │   │  # Domain Knowledge           (300-800 tokens)                   │    │
  │   │  Location-specific context                                       │    │
  │   │                                                                  │    │
  │   │  # User Context               (50-100 tokens)                    │    │
  │   │  Current user info                                               │    │
  │   │                                                                  │    │
  │   │  # Your Capabilities          (500-1500 tokens)                  │    │
  │   │  Tools + instructions                                            │    │
  │   │                                                                  │    │
  │   │  TOTAL: ~1650-4100 tokens                                        │    │
  │   └──────────────────────────────────────────────────────────────────┘    │
  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘
```

---

## Full Flow - Frontend to Backend

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTEXT FLOW - WHEN IT RUNS                          │
└─────────────────────────────────────────────────────────────────────────────┘

  TRIGGER                    FRONTEND                      BACKEND
     │                          │                             │
     │  User opens chat         │                             │
     │  (clicks bubble)         │                             │
     │─────────────────────────>│                             │
     │                          │                             │
     │                          │  1. Gather context          │
     │                          │     from Odoo services      │
     │                          │─────┐                       │
     │                          │     │ action_service        │
     │                          │     │ router                │
     │                          │     │ menu                  │
     │                          │<────┘                       │
     │                          │                             │
     │  User sends message      │                             │
     │─────────────────────────>│                             │
     │                          │                             │
     │                          │  2. POST /send_streaming    │
     │                          │     with context_data       │
     │                          │────────────────────────────>│
     │                          │                             │
     │                          │                             │  3. SessionManager
     │                          │                             │     get_or_create_session()
     │                          │                             │─────┐
     │                          │                             │     │
     │                          │                             │     │ NEW SESSION?
     │                          │                             │     │ → Run assembly steps 1-6
     │                          │                             │     │ → Cache result
     │                          │                             │     │
     │                          │                             │     │ EXISTING SESSION?
     │                          │                             │     │ → Return from cache
     │                          │                             │     │ → Check for state delta
     │                          │                             │<────┘
     │                          │                             │
     │                          │                             │  Session cached for 30 min
     │                          │                             │  Same location = same session
     │                          │                             │
     ▼                          ▼                             ▼
```

---

## Session Location Key

The backend generates a **location key** to identify sessions:

| Context Data | Location Key | Example |
|--------------|--------------|---------|
| `canvas_id: 35` | `canvas:35` | Workflow builder |
| `model: crm.lead, record_id: 142` | `crm.lead:142` | Specific lead |
| `model: sale.order` (no record) | `sale.order:list` | Order list view |
| `action_id: 848` | `action:848` | Apps page |
| `url: /odoo/discuss` | `page:odoo/discuss` | Discuss page |
| (nothing) | `general` | Fallback |

**Same location key = same session (conversation continues)**
**Different location key = new session**

---

## What Context Data Fields Mean

| Field | Source | Used For |
|-------|--------|----------|
| `url` | `window.location.href` | Fallback location detection |
| `action_id` | Odoo action_service | Session key, action lookup |
| `action_name` | Odoo action_service | System prompt |
| `model` | Odoo action_service | Domain detection |
| `record_id` | Odoo action_service | Session key, record context |
| `view_type` | Odoo action_service | System prompt |
| `menu_id` | Odoo menu service | Menu hierarchy |
| `canvas_id` | Frontend state | Workflow detection |
| `node_id` | Frontend state | Workflow node chat |

---

## Domain Detection Priority

When backend receives context_data, it detects domain in this order:

```
1. CONTEXT FLAGS (highest priority)
   ├── canvas_id present?        → domain: "workflow"
   ├── workflow_id present?      → domain: "workflow"
   ├── crm_lead_id present?      → domain: "crm"
   ├── sale_order_id present?    → domain: "sales"
   └── stock_picking_id present? → domain: "inventory"

2. MODEL NAME
   ├── crm.lead, crm.*           → domain: "crm"
   ├── sale.order, sale.*        → domain: "sales"
   ├── stock.*, product.*        → domain: "inventory"
   └── calendar.*                → domain: "calendar"

3. URL PATTERNS
   ├── /canvas/, /workflow/      → domain: "workflow"
   ├── /crm/                     → domain: "crm"
   ├── /sale/                    → domain: "sales"
   └── /stock/                   → domain: "inventory"

4. FALLBACK
   └── No match                  → domain: "general"
```

---

## Code References

| Component | File | Line | Status |
|-----------|------|------|--------|
| SamChatClient._buildFormData | `ai_sam/static/src/js/chat/sam_chat_client.js` | 134 | Sends context |
| Context detection (DISABLED) | `ai_sam/static/src/js/sam_ai_chat_widget.js` | 208 | **BROKEN** |
| SessionManager.get_or_create_session | `ai_sam_base/api_communications/session_manager.py` | 64 | Works |
| SessionManager._get_location_key | `ai_sam_base/api_communications/session_manager.py` | 151 | Works |
| SessionContextBuilder.build | `ai_sam_base/api_communications/session_context.py` | 70 | Works |
| Location domain detection | `ai_sam_base/api_communications/location_insights.py` | 234 | Works (if data present) |
| Core tools definition | `ai_sam_base/api_communications/core_tools.py` | 41 | Works |
| Chat tools definition | `ai_sam_base/api_communications/chat_tools.py` | 20 | Works |

---

## Implementation Layers

### Layer 1: Frontend Context Extraction (40-50% improvement)
Extract from Odoo JS services on chat open:
```javascript
const action = this.env.services.action.currentAction;
context_data = {
    url: window.location.href,
    action_id: action?.id,
    action_name: action?.name,
    model: action?.res_model,
    record_id: action?.res_id,
    view_type: action?.view_type,
}
```

### Layer 2: Backend Enrichment (+10% improvement)
If `action_id` present but no `action_name`, lookup in `ir.actions.act_window`:
```python
action = env['ir.actions.act_window'].browse(action_id)
action_name = action.name
```

### Layer 3: Domain Knowledge Registry (+15-20% improvement)
Store learned knowledge per action/model for retrieval on session start.

### Layer 4: Train Knowledge Persistence (+5-10% improvement)
Wire "Save Knowledge" button to persist to the registry.

---

## The Fragmentation Problem

### Multiple Entry Points - Inconsistent Context

SAM chat is currently accessible through MULTIPLE entry points, each handling context differently:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ENTRY POINT FRAGMENTATION                               │
│                                                                              │
│                   Current state: Each path does its own thing               │
└─────────────────────────────────────────────────────────────────────────────┘

  ENTRY POINT 1: Chat Bubble (Main UI)
  ────────────────────────────────────
  File: ai_sam/static/src/js/sam_ai_chat_widget.js

  User clicks bubble → SamChatVanilla → SamChatClient → API

  Context handling:
  ┌───────────────────────────────────────────────────────────────────┐
  │  Line 208: // DISABLED: Automatic context detection               │
  │            // this.detectContext();                               │
  │                                                                   │
  │  Line 886-894: Chat bubble click handler                          │
  │  - Does NOT call detectContext()                                  │
  │  - Only passes URL to SamChatVanilla                              │
  │                                                                   │
  │  Result: context_data = { url: "..." }  ← ONLY URL, nothing else  │
  └───────────────────────────────────────────────────────────────────┘


  ENTRY POINT 2: Workflow Node Chat
  ──────────────────────────────────
  File: ai_sam_workflows/static/src/js/canvas/overlay_manager.js
  Line: 2210

  User clicks node chat icon → overlay_manager → SamChatVanilla → API

  Context handling:
  ┌───────────────────────────────────────────────────────────────────┐
  │  Builds context LOCALLY within overlay_manager:                   │
  │                                                                   │
  │  {                                                                │
  │    model: 'workflow.node',                                        │
  │    record_id: nodeId,                                             │
  │    node_id: nodeId,                                               │
  │    node_name: nodeName,                                           │
  │    folder_file_link: effectiveFolderLink,                         │
  │    workflow_id: window.CANVAS_ID,                                 │
  │    is_node_chat: true                                             │
  │  }                                                                │
  │                                                                   │
  │  Result: Rich context, but unique to this one entry point         │
  └───────────────────────────────────────────────────────────────────┘


  ENTRY POINT 3: Direct API Calls
  ────────────────────────────────
  Files: ai_sam_base/controllers/sam_ai_chat_controller.py

  Any code can POST to /sam_ai/chat/send_streaming

  Context handling:
  ┌───────────────────────────────────────────────────────────────────┐
  │  Whatever context_data the caller sends, that's what you get     │
  │                                                                   │
  │  No validation                                                    │
  │  No enrichment                                                    │
  │  No standardization                                               │
  │                                                                   │
  │  Result: Depends entirely on caller implementation               │
  └───────────────────────────────────────────────────────────────────┘


  WHY THIS IS A PROBLEM:
  ─────────────────────────────────────────────────────────────────────

  1. Same user, different entry → different experience
     - Chat bubble: SAM is blind (no context)
     - Node chat: SAM knows workflow (rich context)

  2. Fixes are scattered
     - Fix chat bubble → node chat unchanged
     - Fix node chat → bubble still broken

  3. New entry points repeat mistakes
     - Developer adds chat somewhere new
     - Has to figure out context gathering themselves
     - Probably does it differently

  4. Testing is fragmented
     - "Chat works" means different things
     - Which entry point? What context?
```

---

## The Solution: Unified SamContextGatherer

### Design Goal

ONE gatherer class that ALL entry points use. Consistent context, everywhere.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      UNIFIED CONTEXT GATHERING                               │
│                                                                              │
│                   Target state: Single source of truth                       │
└─────────────────────────────────────────────────────────────────────────────┘

  BEFORE (Fragmented):
  ─────────────────────

  Entry Point 1 ──> [Own context logic] ──> SamChatClient ──> API
  Entry Point 2 ──> [Own context logic] ──> SamChatClient ──> API
  Entry Point 3 ──> [Own context logic] ──> SamChatClient ──> API

                        ↓ ↓ ↓

  AFTER (Unified):
  ────────────────

  Entry Point 1 ──┐
  Entry Point 2 ──┼──> SamContextGatherer.gather() ──> SamChatClient ──> API
  Entry Point 3 ──┘          │
                             │
                             ▼
                    Consistent context_data
                    {
                      url, action_id, model,
                      record_id, view_type,
                      canvas_id, node_id,
                      ...
                    }
```

---

### SamContextGatherer - Class Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      SamContextGatherer                                      │
│                                                                              │
│  Purpose: Single class responsible for gathering ALL context data           │
│  Location: ai_sam/static/src/js/context/sam_context_gatherer.js (new)       │
└─────────────────────────────────────────────────────────────────────────────┘

  class SamContextGatherer {

      constructor(env) {
          this.env = env;  // Odoo environment with services
      }

      /**
       * Main entry point - gather all context for current location
       * @param {Object} overrides - Optional overrides (e.g., node_id for workflow)
       * @returns {Object} Unified context_data
       */
      gather(overrides = {}) {
          const context = {
              ...this._gatherFromOdooServices(),
              ...this._gatherFromURL(),
              ...this._gatherFromPageState(),
              ...overrides,  // Caller-specific additions (like node_id)
          };

          return this._normalize(context);
      }

      /**
       * Layer 1: Extract from Odoo JS services (primary source)
       */
      _gatherFromOdooServices() {
          const action = this.env?.services?.action?.currentAction;

          if (!action) return {};

          return {
              action_id: action.id,
              action_name: action.name || action.display_name,
              model: action.res_model,
              record_id: action.res_id,
              view_type: action.view_type || this._getCurrentViewType(),
          };
      }

      /**
       * Layer 2: Extract from URL (fallback)
       */
      _gatherFromURL() {
          return {
              url: window.location.href,
              // Parse action-XXX from URL if not in services
              url_action_id: this._parseActionFromURL(),
          };
      }

      /**
       * Layer 3: Extract from page state (widgets, globals)
       */
      _gatherFromPageState() {
          return {
              // Workflow canvas
              canvas_id: window.CANVAS_ID || null,
              // Any other global state
          };
      }

      /**
       * Normalize and validate context data
       */
      _normalize(context) {
          // Ensure action_id is number or null
          if (context.action_id) {
              context.action_id = parseInt(context.action_id, 10) || null;
          }

          // Prefer services action_id over URL-parsed one
          if (!context.action_id && context.url_action_id) {
              context.action_id = context.url_action_id;
          }
          delete context.url_action_id;

          // Remove null/undefined values for cleaner payload
          return Object.fromEntries(
              Object.entries(context).filter(([_, v]) => v != null)
          );
      }

      _getCurrentViewType() { ... }
      _parseActionFromURL() { ... }
  }

  export { SamContextGatherer };
```

---

### Integration Points

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      HOW EACH ENTRY POINT USES IT                            │
└─────────────────────────────────────────────────────────────────────────────┘

  ENTRY POINT 1: Chat Bubble (sam_ai_chat_widget.js)
  ──────────────────────────────────────────────────

  BEFORE:
    _onBubbleClick() {
        const contextData = { url: window.location.href };  // ← Minimal
        this.chatVanilla = new SamChatVanilla(this.el, options, contextData);
    }

  AFTER:
    _onBubbleClick() {
        const gatherer = new SamContextGatherer(this.env);
        const contextData = gatherer.gather();  // ← Rich, consistent
        this.chatVanilla = new SamChatVanilla(this.el, options, contextData);
    }


  ENTRY POINT 2: Workflow Node (overlay_manager.js)
  ─────────────────────────────────────────────────

  BEFORE:
    openNodeChat(nodeId, nodeName) {
        const contextData = {
            model: 'workflow.node',
            record_id: nodeId,
            // ... manually built
        };
        new SamChatVanilla(container, options, contextData);
    }

  AFTER:
    openNodeChat(nodeId, nodeName) {
        const gatherer = new SamContextGatherer(this.env);
        const contextData = gatherer.gather({
            // Node-specific overrides
            model: 'workflow.node',
            record_id: nodeId,
            node_id: nodeId,
            node_name: nodeName,
            is_node_chat: true,
        });
        new SamChatVanilla(container, options, contextData);
    }


  BENEFIT: Node chat ADDS to base context, doesn't replace it
  ─────────────────────────────────────────────────────────────
  Result context includes:
  - Base: action_id, url, model (from gatherer)
  - Node: node_id, node_name, is_node_chat (from overrides)

  Backend gets complete picture.
```

---

### Implementation Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      IMPLEMENTATION STEPS                                    │
└─────────────────────────────────────────────────────────────────────────────┘

  [ ] 1. Create SamContextGatherer class
         File: ai_sam/static/src/js/context/sam_context_gatherer.js
         - _gatherFromOdooServices()
         - _gatherFromURL()
         - _gatherFromPageState()
         - _normalize()

  [ ] 2. Update Chat Bubble entry point
         File: ai_sam/static/src/js/sam_ai_chat_widget.js
         - Import SamContextGatherer
         - Replace manual context with gatherer.gather()
         - Remove disabled detectContext() method

  [ ] 3. Update Workflow Node entry point
         File: ai_sam_workflows/static/src/js/canvas/overlay_manager.js
         - Import SamContextGatherer
         - Use gatherer.gather() with node overrides

  [ ] 4. Add to module manifest
         File: ai_sam/__manifest__.py
         - Add new JS file to assets

  [ ] 5. Test all entry points
         - Chat bubble on various pages (CRM, Sales, Apps)
         - Workflow node chat
         - Verify context_data in network requests

  [ ] 6. Backend verification
         - Confirm SessionManager receives richer context
         - Confirm domain detection improves
         - Confirm system prompt reflects location
```

---

## Related Documentation

- [Chat Message Flow](../chat_message_flow/chat_message_flow_DIAGRAM.md) - Overall chat architecture
