# Schema: ai_sam_creatives

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_creatives` |
| **Version** | 18.0.1.0.1 |
| **Total Models** | 0 (Platform Skin - UI only) |
| **Total Controllers** | 1 |
| **API Endpoints** | 4 (JSON-RPC) |

---

## Architecture: Platform Skin

This module follows the **Platform Skin Architecture**:
- **UI Layer Only** - Views, JS, CSS, controllers
- **No Data Models** - All models live in `ai_brain`
- **Safe Uninstall** - Removing this module preserves all data

---

## Models

### None (Platform Skin)

This module contains no models. It uses models from parent modules:

**From ai_brain:**
- `creatives.landing.card` - Landing page project cards
- `canvas` - Core canvas model

**From ai_sam:**
- `canvas.platform` - Platform registry
- `ai.conversation` - AI conversation tracking
- `ai.service` - AI message handling

---

## Controllers / API Endpoints

### CreativesController

**File:** `controllers/creatives_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/creatives/create_conversation` | JSON-RPC | user | Create new AI conversation for canvas |
| `/creatives/get_conversations` | JSON-RPC | user | Get all conversations for a canvas |
| `/creatives/get_conversation_messages` | JSON-RPC | user | Get messages in a conversation |
| `/creatives/send_message` | JSON-RPC | user | Send message to AI and get response |

---

## Request/Response Examples

### POST /creatives/create_conversation

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "canvas_id": 42,
        "context_model": "canvas",
        "context_id": 42
    }
}
```

**Response:**
```json
{
    "success": true,
    "conversation_id": 123
}
```

---

### POST /creatives/get_conversations

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "canvas_id": 42
    }
}
```

**Response:**
```json
{
    "success": true,
    "conversations": [
        {
            "id": 123,
            "title": "Content brainstorm",
            "last_message": "Here are some ideas for your campaign...",
            "date": "2025-01-26T10:30:00"
        }
    ]
}
```

---

### POST /creatives/get_conversation_messages

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "conversation_id": 123
    }
}
```

**Response:**
```json
{
    "success": true,
    "messages": [
        {
            "role": "user",
            "content": "Help me create a marketing campaign",
            "metadata": {
                "tokens": 0,
                "cost": 0.0,
                "response_time_ms": 0
            }
        },
        {
            "role": "assistant",
            "content": "I'd be happy to help! Let's start with...",
            "metadata": {
                "tokens": 150,
                "cost": 0.0,
                "response_time_ms": 1200
            }
        }
    ]
}
```

---

### POST /creatives/send_message

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "conversation_id": 123,
        "message": "Create a tagline for my product",
        "canvas_id": 42
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Here are some tagline options for your product...",
    "metadata": {
        "tokens_used": 200,
        "response_time_ms": 1500
    }
}
```

---

## Platform Registration

**File:** `data/creatives_platform.xml`

Registers the Creatives platform in `canvas.platform`:

| Field | Value |
|-------|-------|
| `name` | SAM Creative Platform |
| `technical_name` | creatives |
| `renderer_class` | CreativesNodeRenderer |
| `renderer_module` | preloaded |
| `icon` | fa-magic |
| `sequence` | 10 |

---

## JavaScript Components

### creatives_node_renderer.js
Custom node rendering for creative content types (text, image, video, audio blocks).

### creatives_sidebar.js
Sidebar panel with creative tools and asset library.

### creatives_toolbar.js
Toolbar with formatting options and node creation buttons.

### creatives_multimedia.js
Rich media handling (image upload, video embed, audio player).

### creatives_ai_chat_panel.js
Chat panel for conversing with SAM about content creation.

---

## CSS Styles

### creatives_canvas_styles.css
Platform-specific styling for:
- Node appearances
- Sidebar/toolbar layouts
- Chat panel styling
- Multimedia player controls

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `creatives.landing.card` | base.group_user | Yes | Yes | Yes | Yes |

**Note:** This rule references model in `ai_brain` module.

---

## Data Relationships Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    ai_brain (Data Layer)                 │
│  ┌─────────────────────┐    ┌─────────────────────────┐ │
│  │ creatives.landing   │    │       canvas            │ │
│  │      .card          │    │                         │ │
│  └─────────────────────┘    └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   ai_sam (Framework Layer)               │
│  ┌─────────────────────┐    ┌─────────────────────────┐ │
│  │  canvas.platform    │    │    ai.conversation      │ │
│  │                     │    │    ai.service           │ │
│  └─────────────────────┘    └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              ai_sam_creatives (UI Layer)                 │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Controller  │  │ JS Renderer │  │ Views/CSS       │  │
│  │ (4 routes)  │  │ (5 files)   │  │ (2 XML + CSS)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Views

### creatives_canvas_ui.xml
Main canvas view with creatives-specific layout and panels.

### creatives_landing_kanban.xml
Kanban view for project cards on the landing page.

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
