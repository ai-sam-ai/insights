# SAM AI API Infrastructure - Detailed Walkthrough

> **Purpose:** Step-by-step explanation of data flow through SAM AI's API infrastructure
> **Prerequisite:** Review [sam_ai_api_infrastructure_DIAGRAM.md](./sam_ai_api_infrastructure_DIAGRAM.md) first

---

## Overview

The SAM AI API infrastructure handles all communication between the frontend chat UI and AI providers (Claude, OpenAI, etc.). It follows a **v2 Architecture** (consolidated December 2025) with two core principles:

1. **WHAT SAM KNOWS** - Built once per session (`system_prompt.py`)
2. **HOW SAM TALKS** - Processed for every message (`sam_chat.py`)

---

## Architecture Layers

| Layer | Location | Purpose |
|-------|----------|---------|
| **HTTP Controllers** | `ai_sam_base/controllers/` | Receive HTTP requests, route to processing |
| **API Communications** | `ai_sam_base/api_communications/` | Core business logic, session management, AI calls |
| **Models** | `ai_sam_base/models/` | Database persistence (ai.conversation, ai.message) |
| **External** | AI Provider APIs | Claude, OpenAI, etc. |

---

## Step-by-Step: Streaming Request

### Step 1: HTTP Request Arrives

**What happens:**
Browser sends a POST request with user message to the streaming endpoint.

**Code location:**
`ai_sam_base/controllers/sam_ai_chat_controller.py:L133-L199`

**Route:**
```python
@http.route('/sam_ai/chat/send_streaming', type='http', auth='user', methods=['POST'], csrf=False)
def send_message_streaming(self, **kwargs):
```

**Data transformation:**
- Input: `kwargs` containing `message`, `conversation_id`, `context_data` (JSON string), `environment` (JSON string)
- Output: Parameters parsed and ready for processing

---

### Step 2: Context Parsing

**What happens:**
The controller parses `context_data` to determine the user's location in Odoo (which model, record, canvas, etc.).

**Code location:**
`ai_sam_base/controllers/sam_ai_chat_controller.py:L76-L102`

**Context types identified:**
- **Canvas/Workflow context:** `canvas_id` or `workflow_id` present
- **Node context:** `node_id` present (specific workflow node)
- **Record context:** `model` + `record_id` present
- **General context:** No specific location

**Data transformation:**
- Input: Raw `context_data` dict
- Output: `parsed_context` with standardized fields

---

### Step 3: Session Management

**What happens:**
`SessionManager` retrieves existing session or creates new one. Sessions are keyed by `user_id:location_key`.

**Code location:**
`ai_sam_base/api_communications/session_manager.py:L63-L88`

**Location key examples:**
- `canvas:35` - Workflow canvas ID 35
- `crm.lead:142` - CRM lead record 142
- `sale.order:list` - Sales order list view
- `general` - No specific location

**Session lifecycle:**
1. Check cache for `{user_id}:{location_key}`
2. If exists and not expired (30 min TTL), resume
3. If expired or new, create fresh session

**Data transformation:**
- Input: `env`, `user_id`, `context_data`
- Output: `session_context` dict containing:
  - `system_prompt`: Full prompt built for this location
  - `tools`: List of available tools
  - `location`: Domain and context info
  - `user`: User information
  - `conversation_history`: Message history

---

### Step 4: Session Context Build (New Session)

**What happens:**
If new session, `SessionContextBuilder` builds the complete session context including system prompt and tools.

**Code location:**
`ai_sam_base/api_communications/session_context.py` (via `session_manager.py:L208-L236`)

**System prompt includes:**
- SAM's personality and capabilities
- Current location context (what Odoo page/record user is viewing)
- Available tools for this context
- User preferences and history

**Data transformation:**
- Input: `env`, `user_id`, `context_data`
- Output: Full `session_context` with everything SAM needs

---

### Step 5: SAMChat Initialization

**What happens:**
`SAMChat` class is instantiated with the session context. This is the main orchestrator for message processing.

**Code location:**
`ai_sam_base/api_communications/sam_chat.py:L56-L86`

```python
class SAMChat:
    def __init__(self, env, session_context):
        self.env = env
        self.session = session_context
        self.system_prompt = session_context.get('system_prompt', '')
        self.tools = session_context.get('tools', [])
        self.sam_user = env.ref('ai_sam_base.sam_user', raise_if_not_found=False)
        self.messages = session_context.get('conversation_history', [])
```

---

### Step 6: Streaming Message Processing

**What happens:**
`SAMChat.process_message_streaming()` handles the actual message flow with streaming responses.

**Code location:**
`ai_sam_base/api_communications/sam_chat.py:L145-L245`

**Flow:**
1. Add user message to conversation history
2. Yield `{'type': 'status', 'status': 'thinking'}`
3. Call AI API with streaming
4. For each chunk:
   - If `content`: Yield to frontend
   - If `tool_call`: Execute tool, continue conversation
   - If `error`: Yield error and return
5. Persist messages to database
6. Yield `{'type': 'done'}`

---

### Step 7: AI API Call (Streaming)

**What happens:**
`APIServices` makes the actual HTTP call to the AI provider with streaming enabled.

**Code location:**
`ai_sam_base/api_communications/api_services.py:L116-L168`

**Provider routing:**
1. Determine API format from config (`anthropic` or `openai`)
2. Route to appropriate handler:
   - `_call_anthropic_api()` for Claude
   - `_call_openai_api()` for OpenAI-compatible providers

**Data transformation:**
- Input: `messages`, `config`, `system_prompt`, `tools`
- Output: Stream of response chunks

---

### Step 8: Tool Execution (If Needed)

**What happens:**
If the AI requests tool calls, `SAMChat._execute_single_tool()` routes to the appropriate executor.

**Code location:**
`ai_sam_base/api_communications/sam_chat.py:L445-L501`
(Also: `_execute_tools()` at L437-L443)

**Tool types:**
| Tool | Executor | Purpose |
|------|----------|---------|
| `odoo_read` | `core_tools.py` | Read records by ID |
| `odoo_search` | `core_tools.py` | Search records by domain |
| `odoo_create` | `core_tools.py` | Create new record |
| `odoo_write` | `core_tools.py` | Update existing records |
| `memory_recall` | `chat_tools.py` | Search past conversations |

**Important:** Core tools execute as **SAM user** for proper audit trail.

---

### Step 9: Message Persistence

**What happens:**
User and assistant messages are saved to `ai.conversation` and `ai.message` models.

**Code location:**
`ai_sam_base/api_communications/sam_chat.py:L507-L533`

```python
def _persist_messages(self, conversation_id, user_message, assistant_message):
    """Save messages to ai.conversation/ai.message."""
    try:
        Message = self.env['ai.message']
        message_env = Message.with_user(self.sam_user) if self.sam_user else Message

        # User message
        message_env.create({
            'conversation_id': conversation_id,
            'role': 'user',
            'content': user_message,
        })

        # Assistant message
        message_env.create({
            'conversation_id': conversation_id,
            'role': 'assistant',
            'content': assistant_message,
        })
    except Exception as e:
        _logger.warning(f"[SAM-CHAT] Failed to persist messages: {e}")
```

---

### Step 10: SSE Response to Frontend

**What happens:**
The controller yields Server-Sent Events (SSE) to the browser for real-time streaming.

**Code location:**
`ai_sam_base/controllers/sam_ai_chat_controller.py:L186-L250` (event_stream generator)

**Event types:**
| Event | Data | Purpose |
|-------|------|---------|
| `status` | `{status, progress}` | Progress updates |
| `chunk` | `{text}` | Response text chunk |
| `activity` | `{activity, message}` | Tool execution status |
| `done` | `{success, conversation_id}` | Completion signal |
| `error` | `{error}` | Error information |

---

## Error Handling

| Error | Cause | Handling |
|-------|-------|----------|
| Session expired | TTL exceeded (30 min) | Create new session |
| Tool execution failed | Invalid model/params | Return error in tool result, AI handles gracefully |
| AI API error | Network/provider issue | Yield error event, log exception |
| Database cursor closed | Transaction issue | Use context managers with new cursors |

---

## Performance Considerations

### Session Caching
- Sessions cached in-memory (class variable `_sessions`)
- TTL of 30 minutes prevents stale context
- Could be Redis-backed for multi-process scaling

### Streaming
- Uses Server-Sent Events (SSE) for real-time updates
- Each database operation uses fresh cursor to avoid "cursor already closed" errors
- Transaction cleanup in `finally` block handles client disconnections

### Tool Execution
- Core tools execute as SAM user for consistent audit trail
- Tool results included in conversation context for AI to process
- Loop continues until AI stops requesting tools

---

## Key Files Reference

| File | Location | Purpose | Key Classes/Functions |
|------|----------|---------|----------------------|
| `sam_ai_chat_controller.py` | `controllers/` | HTTP endpoints | `send_message()`, `send_message_streaming()` |
| `sam_chat.py` | `api_communications/` | Message orchestration | `SAMChat`, `process_chat_message()`, `process_chat_message_streaming()` |
| `session_manager.py` | `api_communications/` | Session lifecycle | `SessionManager`, `get_or_create_session()` |
| `session_context.py` | `api_communications/` | Context builder | `SessionContextBuilder` |
| `system_prompt.py` | `api_communications/` | Prompt building | `build_session_context()` |
| `api_services.py` | `api_communications/` | AI provider calls | `APIServices`, `send()`, `send_streaming()` |
| `core_tools.py` | `api_communications/` | CRUD tool execution | `execute_core_tool()`, `CORE_TOOLS` |
| `chat_tools.py` | `api_communications/` | Memory tool execution | `execute_chat_tool()` |
| `location_insights.py` | `api_communications/` | Location analysis | Location-specific context building |
| `ai_conversation.py` | `models/` | Conversation model | `ai.conversation` |
| `ai_message.py` | `models/` | Message model | `ai.message` |

---

## Related Flows

- [Conversation Flow](../chat/) - Chat message handling
- [Canvas/Workflow Flow](../canvas/) - Workflow canvas context
- [API Communications Architecture](../api_communications/) - V2 architecture details
