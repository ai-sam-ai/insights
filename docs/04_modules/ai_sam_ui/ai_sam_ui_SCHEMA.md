# Schema: ai_sam_ui

> **Technical Truth** - Components, templates, and public widget architecture

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_ui` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 0 (uses ai_sam_base models) |
| **Total Controllers** | 0 (routes through ai_sam) |
| **Website Snippets** | 1 |
| **JS Widgets** | 1 |

---

## Models

This module has no database models. It uses models from `ai_sam_base`:
- `ai.conversation` - Conversation records
- `ai.message` - Message records

---

## Controllers / API Endpoints

This module has no controllers. It routes through `ai_sam` module:

| Route | Module | Auth | Purpose |
|-------|--------|------|---------|
| `/sam/public/chat/send` | `ai_sam` | public | Send message and get AI response |

---

## Website Snippet: s_sam_chat

### Registration

**File:** `views/snippets.xml`

**Builder Location:** Custom snippets group

**Keywords:** chat, ai, assistant, sam, chatbot, support, help, conversation, bot, artificial intelligence

### Template Structure

```xml
<section class="s_sam_chat pt-4 pb-4">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="sam-chat-widget" data-mode="public" data-theme="claude-style">
                    <!-- Header -->
                    <div class="sam-chat-header">...</div>
                    <!-- Messages Container -->
                    <div class="sam-chat-messages">...</div>
                    <!-- Input -->
                    <div class="sam-chat-input">...</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## JavaScript Widget: SAMPublicChat

**File:** `static/src/snippets/s_sam_chat/000.js`

**Type:** Legacy Public Widget (publicWidget.Widget)

**Selector:** `.sam-chat-widget[data-mode="public"]`

### Widget Properties

| Property | Type | Description |
|----------|------|-------------|
| `messages` | Array | Local message history |
| `sessionId` | String | Current session ID from localStorage |

### Events

| Event | Selector | Handler |
|-------|----------|---------|
| click | `#samPublicChatSend` | `_onSendClick` |
| keypress | `#samPublicChatInput` | `_onInputKeypress` |

### Methods

| Method | Purpose |
|--------|---------|
| `start()` | Initialize widget, show welcome message |
| `_sendMessage()` | Send message to `/sam/public/chat/send` |
| `_addMessage(role, content, isSystem)` | Render message in chat |
| `_showTypingIndicator()` | Show "SAM is thinking..." animation |
| `_hideTypingIndicator()` | Remove typing indicator |
| `_showAgentSwitch(agentName)` | Display agent switch notification |
| `_markdownToHtml(text)` | Basic markdown to HTML conversion |
| `_saveSessionToStorage(sessionId)` | Save to localStorage |
| `_getSessionFromStorage()` | Load from localStorage |

### Message Flow

```
User Input
    │
    ▼
_sendMessage()
    │
    ├── Clear input
    ├── _addMessage('user', message)
    ├── _showTypingIndicator()
    │
    ▼
RPC: /sam/public/chat/send
    │
    ▼
Response received
    │
    ├── _hideTypingIndicator()
    ├── Save sessionId to localStorage
    ├── _showAgentSwitch() (if agent changed)
    └── _addMessage('assistant', response)
```

---

## Styles: Claude-Style Theme

**File:** `static/src/snippets/s_sam_chat/000.scss`

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.sam-chat-widget` | Main container with shadow and rounded corners |
| `.sam-chat-header` | Purple gradient header with title |
| `.sam-chat-messages` | Scrollable message container |
| `.sam-message` | Individual message bubble |
| `.sam-message.user` | User message (right-aligned, purple) |
| `.sam-message.assistant` | AI message (left-aligned, white) |
| `.sam-message.system` | System notification (centered, yellow) |
| `.typing-indicator` | Bouncing dots animation |
| `.sam-chat-input` | Input area with send button |

### Color Scheme

| Element | Color |
|---------|-------|
| Primary gradient | `#667eea → #764ba2` |
| User messages | Purple gradient (same as primary) |
| AI messages | White with border |
| System messages | Yellow gradient (`#fef3c7 → #fde68a`) |
| Input border | `#667eea` |
| Timestamps | `#9ca3af` |

### Responsive Breakpoints

- `max-width: 768px` - Full-width messages (95%), no border radius

---

## Security Rules

**File:** `security/ir.model.access.csv`

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.conversation` | base.group_public | ✅ | ❌ | ❌ | ❌ |
| `ai.message` | base.group_public | ✅ | ❌ | ❌ | ❌ |

**Purpose:** Allows public (non-logged-in) users to read conversation and message data for their own sessions.

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Website Visitor                               │
│                  (Not logged in)                                │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Types message
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              SAMPublicChat Widget (ai_sam_ui)                    │
│                                                                  │
│  localStorage: sam_public_session_id                             │
└─────────────────────┬───────────────────────────────────────────┘
                      │ RPC call
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│         /sam/public/chat/send (ai_sam module)                    │
│                                                                  │
│  - Creates/retrieves conversation                                │
│  - Routes to appropriate agent                                   │
│  - Returns response with memory context                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Uses models
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              ai_sam_base models                                  │
│                                                                  │
│  ai.conversation ←→ ai.message                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
ai_sam_ui/
├── __init__.py
├── __manifest__.py
├── controllers/
│   └── __init__.py                    # Empty (no controllers)
├── data/
│   └── ir_actions_data.xml            # Action definitions
├── security/
│   └── ir.model.access.csv            # Public access rules
├── static/
│   ├── description/
│   │   └── icon.png                   # Module icon
│   └── src/
│       ├── img/
│       │   └── snippet_sam_chat.svg   # Snippet thumbnail
│       └── snippets/
│           └── s_sam_chat/
│               ├── 000.js             # Widget logic
│               └── 000.scss           # Claude-style CSS
└── views/
    ├── snippets.xml                   # Snippet registration
    └── public_chat_templates.xml      # Standalone page template
```

---

## Assets Registration

**In manifest:**
```python
'assets': {
    'web.assets_frontend': [
        'ai_sam_ui/static/src/snippets/s_sam_chat/000.scss',
        'ai_sam_ui/static/src/snippets/s_sam_chat/000.js',
    ],
},
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
