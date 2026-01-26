# Chat Entry Point Architecture

> **Source of Truth** for how SAM Chat UI behaves in different contexts

**Created:** 2026-01-26
**Source File:** `ai_sam/static/src/config/sam_config.js`

---

## Overview

The Entry Point System controls **what UI elements appear** when SAM chat opens from different locations. This ensures consistent, context-appropriate experiences.

**Key Principle:** The chat bubble is NOT a "quick help" widget - it's a **full contextual chat experience** that knows where it was triggered from.

---

## The 4 Entry Points

| Entry Point | Constant | Description |
|-------------|----------|-------------|
| **Menu Chat** | `CHAT_ENTRY_POINT.MENU_CHAT` | SAM AI > Chat With Sam menu |
| **Chat Bubble** | `CHAT_ENTRY_POINT.CHAT_BUBBLE` | Floating chat bubble (anywhere in Odoo) |
| **Canvas Chat** | `CHAT_ENTRY_POINT.CANVAS_CHAT` | Canvas AI Builder workflows |
| **Node Chat** | `CHAT_ENTRY_POINT.NODE_CHAT` | Workflow node-specific chat |

---

## Entry Point Rules Matrix

### UI Configuration

| Entry Point | showTabBar | showToolbar | showModeSelector | showArtifacts | showMemorySidebar |
|-------------|------------|-------------|------------------|---------------|-------------------|
| **MENU_CHAT** | YES | YES | YES | YES | NO |
| **CHAT_BUBBLE** | YES | YES | YES | YES | YES |
| **CANVAS_CHAT** | YES | YES | NO | YES | NO |
| **NODE_CHAT** | NO | NO | NO | YES | NO |

### Features Available

| Entry Point | multiTab | sessionHistory | modeSwitch | artifacts | fileAccess | voiceInput | exportChat |
|-------------|----------|----------------|------------|-----------|------------|------------|------------|
| **MENU_CHAT** | YES | YES | YES | YES | YES | YES | YES |
| **CHAT_BUBBLE** | YES | YES | YES | YES | NO | YES | YES |
| **CANVAS_CHAT** | YES | YES | NO | YES | YES | YES | YES |
| **NODE_CHAT** | NO | YES | NO | YES | NO | YES | NO |

### Context Awareness

| Entry Point | knowsCurrentUrl | knowsCurrentModel | knowsCurrentRecord | persistsAcrossNavigation |
|-------------|-----------------|-------------------|--------------------|-----------------------------|
| **MENU_CHAT** | NO | NO | NO | YES |
| **CHAT_BUBBLE** | YES | YES | YES | NO |
| **CANVAS_CHAT** | NO | NO | NO | YES |
| **NODE_CHAT** | NO | NO | NO | YES |

---

## Entry Point Detection Logic

The system auto-detects which entry point to use based on context data:

```javascript
detectChatEntryPoint(contextData) {
    // Priority order (highest to lowest):

    // 1. NODE_CHAT - Has node_id AND is_node_chat flag
    if (contextData.node_id && contextData.is_node_chat) {
        return CHAT_ENTRY_POINT.NODE_CHAT;
    }

    // 2. CANVAS_CHAT - Has workflow context
    if (contextData.is_workflow_chat && (contextData.canvas_id || contextData.workflow_id)) {
        return CHAT_ENTRY_POINT.CANVAS_CHAT;
    }

    // 3. CHAT_BUBBLE - Has URL/action/model context
    if (contextData.url || contextData.action || contextData.model) {
        return CHAT_ENTRY_POINT.CHAT_BUBBLE;
    }

    // 4. MENU_CHAT - Default fallback
    return CHAT_ENTRY_POINT.MENU_CHAT;
}
```

---

## Detailed Entry Point Specifications

### 1. MENU_CHAT (Full Page Chat)

**Trigger:** SAM AI > Chat With Sam menu item

**Use Case:** General-purpose AI assistance, not tied to specific context

**UI Characteristics:**
- Full page experience (not overlay)
- All tabs and toolbar visible
- Mode selector available (General, CRM, etc.)
- No memory sidebar (full-page chat space)
- Resizable

**Session Isolation:** None - general sessions

---

### 2. CHAT_BUBBLE (Contextual Overlay)

**Trigger:** Clicking SAM bubble anywhere in Odoo

**Use Case:** Context-aware help while working on any Odoo screen

**UI Characteristics:**
- Floating overlay (not full page)
- All tabs and toolbar visible
- Mode selector available
- Memory sidebar with module icons
- Resizable, draggable

**Context Awareness:**
- Knows current URL
- Knows current Odoo model/action
- Knows current record ID
- Context resets on navigation

**Session Isolation:** None - but context-aware

---

### 3. CANVAS_CHAT (Workflow Builder)

**Trigger:** Chat within Canvas AI Builder

**Use Case:** Building and editing workflows

**UI Characteristics:**
- Embedded in canvas (right sidebar)
- Tabs visible for multiple conversations
- Full toolbar
- No mode selector (fixed to workflow mode)
- Artifacts panel for canvas elements
- No memory sidebar (canvas UI provides context)

**Context Awareness:**
- Knows entire canvas state
- Knows all nodes in workflow
- Persists with canvas

**Session Isolation:** By `canvas_id` or `workflow_id`

---

### 4. NODE_CHAT (Node-Specific)

**Trigger:** Chat icon on a specific workflow node

**Use Case:** Configuring or getting help with a specific node

**UI Characteristics:**
- Popup near node
- Single conversation (no tabs)
- Minimal toolbar
- No mode selector (fixed to node type)
- Compact, focused
- Fixed size (not resizable)

**Context Awareness:**
- Knows node configuration
- Knows connected nodes
- Persists with node

**Session Isolation:** By `node_id`

---

## JavaScript API

### Getting Entry Point Rules

```javascript
// Get rules for a specific entry point
const rules = SamEntryPoints.getEntryPointRules(CHAT_ENTRY_POINT.CHAT_BUBBLE);

// Access UI config
const showTabs = rules.ui.showTabBar;  // true
const showToolbar = rules.ui.showToolbar;  // true

// Access features
const canExport = rules.features.exportChat;  // true
```

### Detecting Entry Point

```javascript
// Auto-detect from context
const contextData = {
    url: window.location.href,
    action: 123,
    model: 'crm.lead'
};
const entryPoint = SamEntryPoints.detectChatEntryPoint(contextData);
// Returns: CHAT_ENTRY_POINT.CHAT_BUBBLE
```

### Checking UI Elements

```javascript
// Check if specific UI element should show
const showModeSelector = SamEntryPoints.shouldShowUI(entryPoint, 'showModeSelector');

// Check if feature is available
const hasMultiTab = SamEntryPoints.hasFeature(entryPoint, 'multiTab');
```

### Session Isolation

```javascript
// Get isolation parameters for session filtering
const isolation = SamEntryPoints.getSessionIsolationParams(entryPoint, contextData);
// Returns: { node_id: null, canvas_id: null } for CHAT_BUBBLE
// Returns: { node_id: 123, canvas_id: null } for NODE_CHAT
```

---

## Global Access

The entry point system is exposed globally for vanilla JS compatibility:

```javascript
window.SamEntryPoints = {
    // Constants
    CHAT_ENTRY_POINT,
    ENTRY_POINT_RULES,

    // Functions
    detectChatEntryPoint,
    getEntryPointRules,
    getSessionIsolationParams,
    hasFeature,
    getUIConfig,
    shouldShowUI,

    // Environment
    loadEnvironmentConfig,
    getAvailableTools,
    hasCapability,
    getSamMode,
    isLocalDev,
    isFullMode,

    // Config
    SAM_CONFIG
};
```

---

## How Chat Renders Based on Entry Point

In `sam_chat_vanilla_v2.js`, the entry point rules control rendering:

```javascript
// During initialization
this.entryPoint = detectChatEntryPoint(this.state.contextData);
this.entryPointRules = getEntryPointRules(this.entryPoint);
const uiConfig = this.entryPointRules.ui;

// Set visibility flags
this.showModeSelector = uiConfig.showModeSelector !== false;
this.showTabBar = uiConfig.showTabBar !== false;
this.showToolbar = uiConfig.showToolbar !== false;
this.hideSidebar = !uiConfig.showMemorySidebar;

// Then in renderHeader()
${this.showTabBar ? `
    <div class="conversation-tabs">
        ${this.state.conversations.map(conv => this.renderConversationTab(conv)).join('')}
        <button class="new-conversation-btn">+</button>
    </div>
` : ''}
```

---

## Relationship to Other Docs

| Document | Purpose | Relationship |
|----------|---------|--------------|
| `chat_ui_styles_design.md` | Visual style concepts (sidebar/popup/modal) | **Superseded** by Entry Point system |
| `chat_bubble_usage.md` | SAMChatBubble component API | Uses Entry Points for click behavior |
| `ai_sam_SCHEMA.md` | Technical file inventory | Lists sam_config.js |

**Note:** The `chat_ui_styles_design.md` was an earlier design concept. The Entry Point system is the **actual implementation** that controls UI behavior.

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Created documentation | SAM Architect |
| 2026-01-26 | CHAT_BUBBLE updated: showTabBar=true, showToolbar=true | Developer |
| 2025-12-31 | Entry Point system created | Developer |

---

## Quick Reference

**To modify entry point behavior:**

1. Edit `ai_sam/static/src/config/sam_config.js`
2. Find `ENTRY_POINT_RULES[CHAT_ENTRY_POINT.XXX]`
3. Modify `ui`, `features`, or `context` settings
4. Refresh browser (no Odoo restart needed - JS only)

**To add a new entry point:**

1. Add constant to `CHAT_ENTRY_POINT` enum
2. Add full rules block to `ENTRY_POINT_RULES`
3. Update `detectChatEntryPoint()` with detection logic
4. Update this documentation
