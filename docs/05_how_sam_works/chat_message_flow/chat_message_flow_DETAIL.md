# Chat Message Flow - Detailed Walkthrough

> **Purpose:** Step-by-step explanation of data flow from user input to AI response
> **Prerequisite:** Review [chat_message_flow_DIAGRAM.md](./chat_message_flow_DIAGRAM.md) first

---

## Overview

When a user types a message in the SAM AI chat widget, the system assembles rich context about their current location, business, and conversation history BEFORE sending to the AI provider. This document traces every step and shows exactly what context is built.

---

## Step-by-Step

### Step 1: User Input (Frontend)

**What happens:**
User types a message and clicks send (or presses Enter).

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam\static\src\js\sam_chat_vanilla_v2.js`

**Data collected:**
```javascript
// From sam_chat_client.js
const contextToSend = { ...this.context };
if (!contextToSend.url && typeof window !== 'undefined') {
    contextToSend.url = window.location.href;
}
formData.append('message', userMessage);
formData.append('conversation_id', conversationId);
formData.append('context_data', JSON.stringify(contextToSend));
```

**Context data includes:**
| Field | Source | Example |
|-------|--------|---------|
| `url` | `window.location.href` | `/web#action=123&model=crm.lead&id=45` |
| `model` | Odoo action context | `crm.lead` |
| `record_id` | Current record | `45` |
| `canvas_id` | Workflow editor | `12` |
| `node_id` | Workflow node editing | `node_abc123` |
| `action_id` | Odoo action | `123` |

---

### Step 2: HTTP Request

**What happens:**
Frontend sends POST request with FormData to streaming endpoint.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam\static\src\js\sam_chat_client.js:94-105`

**Request:**
```javascript
const response = await fetch('/sam_ai/chat/send_streaming', {
    method: 'POST',
    credentials: 'include',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
});
```

**Alternative endpoint:** `/sam_ai/chat/send` (non-streaming JSON)

---

### Step 3: Controller Receives Request

**What happens:**
Python controller validates request and extracts parameters.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\controllers\sam_ai_chat_controller.py:133-180`

**Controller method:**
```python
@http.route('/sam_ai/chat/send_streaming', type='http', auth='user', methods=['POST'], csrf=False)
def send_message_streaming(self, **kwargs):
    message = kwargs.get('message', '')
    conversation_id = kwargs.get('conversation_id')
    context_data_str = kwargs.get('context_data', '{}')
    context_data = json.loads(context_data_str)
```

**Parsed from context_data:**
- `node_id` - If editing a workflow node
- `record_id` - Current record being viewed
- `canvas_id` or `workflow_id` - If in workflow mode
- `model` - Odoo model name
- `url` - Full page URL for domain detection

---

### Step 4: Gather Context (Phase 0 - Activity Streaming)

**What happens:**
System gathers contextual data (files, memories, workflow) while streaming activity updates to frontend.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\chat_input.py:71-180`

**Context structure built:**
```python
def gather_context(self, context_data, user_message=None):
    context = {
        'raw_data': context_data,
        'files': [],
        'folder_content': None,
        'node': None,
        'workflow': None,
        'user_prefs': {},
        'mode': 'default',
        'memories': [],
    }
```

**Activities streamed to frontend:**
| Activity | Meaning | SSE Event |
|----------|---------|-----------|
| `reading_folder` | Loading context files | `event: activity` |
| `searching_memory` | Semantic search for past conversations | `event: activity` |
| `loading_workflow` | Loading workflow definition | `event: activity` |
| `permission_required` | File permission needed | `event: activity` |

**Frontend sees:**
```
event: activity
data: {"type": "activity", "activity": "searching_memory", "message": "Searching memories..."}
```

---

### Step 5: Session Context Building (THE CRITICAL STEP)

**What happens:**
If this is a NEW location, the system builds complete context. If same location, uses cached session.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\session_manager.py:41-128`

**Entry point:**
```python
session = SessionManager.get_or_create_session(env, user_id, context_data)
```

**Session caching logic:**
- Same user + same location = reuse existing session
- Different location = build new session context
- Session expires on location change

---

### Step 6: Context Assembly (SessionContextBuilder)

**What happens:**
This is where ALL the context is assembled before sending to AI provider.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\session_context.py:47-625`

#### 6a. Location Detection

**Code:** `location_insights.py:105-200`

```python
def get_location_insights(env, context_data):
    domain_key, domain_config = _detect_domain(context_data)
    return {
        'domain': domain_key,
        'domain_name': domain_config['name'],
        'primary_model': domain_config['primary_model'],
        'related_models': domain_config['related_models'],
        'tools': domain_config['tools'],
        'knowledge': domain_config['knowledge'],
    }
```

**Domain detection rules:**
| Domain | URL Patterns | Models |
|--------|--------------|--------|
| `workflow` | `/canvas/`, `/workflow/` | `canvas` |
| `crm` | `/crm/` | `crm.lead`, `crm.stage` |
| `sales` | `/sale/` | `sale.order`, `sale.order.line` |
| `inventory` | `/stock/` | `stock.picking`, `stock.move` |
| `accounting` | `/account/` | `account.move`, `account.payment` |

#### 6b. SAM Identity

**Code:** `session_context.py:201-208`

```python
identity = {
    'name': 'SAM',
    'personality': self._load_personality_file(),  # From config file
    'permissions': self._get_sam_permissions(),
    'user_id': self.sam_user.id
}
```

#### 6c. Business Context

**Code:** `session_context.py:210-224`

```python
business = {
    'company_name': company.name,
    'company_id': company.id,
    'business_description': company.sam_business_context,  # User-configured
    'currency': company.currency_id.name
}
```

#### 6d. Tools Collection

**Code:** `session_context.py:245-272`

```python
tools = list(CORE_TOOLS)      # CRUD tools from core_tools.py
tools.extend(CHAT_TOOLS)       # Memory tools from chat_tools.py
tools.extend(location_tools)   # Location-specific tools
```

**Core tools (always available):**
| Tool | Purpose |
|------|---------|
| `odoo_read` | Read records by ID |
| `odoo_search` | Search records with domain |
| `odoo_create` | Create new records |
| `odoo_write` | Update records |
| `memory_recall` | Search past conversations |

#### 6e. System Prompt Assembly

**Code:** `session_context.py:278-431`

**Order of sections in system_prompt:**

```markdown
# CURRENT LOCATION
**URL:** `/web#action=123&model=crm.lead&id=45`
**Area:** CRM
**Odoo Model:** `crm.lead`
**Record ID:** 45

# Who You Are
You are **SAM** (Smart Assistant Manager), an AI assistant integrated into Odoo.
[personality content]

# Business Context
You work for **Acme Corp**.
[business description]

# CRM Knowledge
[Domain-specific context about CRM]

# User Context
You are currently assisting **John Smith**.

# Your Capabilities
You have tools to interact with this Odoo system.

**CRITICAL INSTRUCTION:** When the user asks about data, records, counts,
or information in Odoo, you MUST use your tools to query the database.

Available tools (use them!):
- `odoo_search`: Search for records...
- `odoo_read`: Read specific record details...
- `odoo_create`: Create new records...
- `odoo_write`: Update existing records...
- `memory_recall`: Search past conversations...
```

**Final session context returned:**
```python
{
    'system_prompt': system_prompt,      # 3000-5000+ tokens
    'tools': tools,                      # 10-20 tools
    'session_id': session_id,
    'location': location,
    'user': user_info,
    'expires_on_location_change': True,
    'context_data': context_data,
}
```

---

### Step 7: SAMChat Processing

**What happens:**
SAMChat takes the pre-built session context and processes the user message.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\sam_chat.py:56-244`

```python
class SAMChat:
    def __init__(self, env, session_context):
        self.env = env
        self.session = session_context
        self.system_prompt = session_context.get('system_prompt')  # Pre-built!
        self.tools = session_context.get('tools')                  # Pre-built!
        self.messages = session_context.get('conversation_history', [])

    def process_message_streaming(self, user_message, conversation_id=None):
        # Add user message to history
        self.messages.append({
            'role': 'user',
            'content': user_message
        })

        # Call AI API with pre-built context
        for chunk in self._call_ai_api_streaming():
            yield chunk
```

---

### Step 8: AI Provider API Call

**What happens:**
System sends the assembled context to the AI provider (Anthropic, OpenAI, etc).

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\sam_chat.py:281-338`

**What gets sent:**
```python
{
    'system_prompt': '[3000-5000 tokens of assembled context]',
    'messages': [
        {'role': 'user', 'content': 'previous message 1'},
        {'role': 'assistant', 'content': 'previous response 1'},
        {'role': 'user', 'content': 'current user message'},
    ],
    'tools': [
        {
            'name': 'odoo_search',
            'description': 'Search Odoo records...',
            'input_schema': {...}
        },
        # ... 10-20 more tools
    ],
    'model': 'claude-opus-4-5-20251101',  # or gpt-4o, etc.
}
```

**API routing:**
```python
# api_services.py:161-168
def send(self, messages, config, system_prompt=None, tools=None):
    api_format = self._get_api_format(config)  # 'anthropic' or 'openai'

    if api_format == 'anthropic':
        return self._call_anthropic_api(...)
    elif api_format == 'openai':
        return self._call_openai_api(...)
```

---

### Step 9: Tool Execution (If Requested)

**What happens:**
If AI requests tool execution (e.g., `odoo_search`), system executes and returns results.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\api_communications\sam_chat.py:445-487`

```python
def _execute_single_tool(self, tool_call):
    tool_name = tool_call.get('name')
    params = tool_call.get('input', {})

    if tool_name in get_core_tool_names():
        result = execute_core_tool(self.env, self.sam_user, tool_name, params)
    elif tool_name in get_chat_tool_names():
        result = execute_chat_tool(self.env, tool_name, params)

    return {'tool_call_id': id, 'result': result, 'success': True}
```

**Example `odoo_search` execution:**
```python
# core_tools.py:624-643
def _execute_search(Model, params):
    domain = params.get('domain', [])
    fields = params.get('fields', [])
    limit = min(params.get('limit', 50), 500)

    records = Model.search(domain, limit=limit)
    return {'records': records.read(fields), 'count': len(records)}
```

---

### Step 10: Stream Response to Frontend

**What happens:**
Response is streamed back via Server-Sent Events.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam_base\controllers\sam_ai_chat_controller.py:448-540`

**SSE events sent:**
```python
# Status
yield f"event: status\ndata: {json.dumps({'status': 'Thinking...', 'progress': 50})}\n\n"

# Activity
yield f"event: activity\ndata: {json.dumps({'activity': 'executing_tool', 'tool': 'odoo_search'})}\n\n"

# Text chunks
yield f"event: chunk\ndata: {json.dumps({'text': 'Hello, how can I'})}\n\n"

# Tool results
yield f"event: tool_result\ndata: {json.dumps({'tool': 'odoo_search', 'success': True})}\n\n"

# Done
yield f"event: done\ndata: {json.dumps({'conversation_id': 123})}\n\n"
```

---

### Step 11: Frontend Displays Response

**What happens:**
Frontend parses SSE stream and updates UI in real-time.

**Code location:**
`D:\github_repos\04_samai_user_experience\ai_sam\static\src\js\sam_chat_client.js:158-317`

```javascript
_processEvent(eventType, data) {
    switch (eventType) {
        case 'activity':
            this.onActivity(data.activity, data.params);  // Update activity indicator
            break;
        case 'chunk':
            this.onToken(data.text);  // Append text to message bubble
            fullResponse += data.text;
            break;
        case 'tool_result':
            // Tool executed successfully
            break;
        case 'done':
            this.onDone(result);  // Finalize message
            break;
    }
}
```

---

## Error Handling

| Error | Cause | Handling |
|-------|-------|----------|
| `401 Unauthorized` | User not logged in | Redirect to login |
| `Session Expired` | Session timed out | Build new session |
| `Tool Execution Failed` | Database error, permissions | Return error in tool_result |
| `API Provider Error` | Rate limit, timeout | Retry with backoff |
| `Stream Interrupted` | Network issue | Frontend shows reconnect option |

---

## Performance Considerations

1. **Session Caching:** Context built ONCE per location, reused for all messages
2. **Streaming:** Response streamed in real-time, not buffered
3. **Tool Limits:** `odoo_search` limited to 500 records max
4. **Token Optimization:** System prompt ~3000-5000 tokens, conversation history managed

---

## Key Files Reference

| Component | File | Key Lines |
|-----------|------|-----------|
| Frontend Entry | `sam_chat_vanilla_v2.js` | 1-150 |
| SSE Client | `sam_chat_client.js` | 24-377 |
| Controller | `sam_ai_chat_controller.py` | 133-540 |
| Session Manager | `session_manager.py` | 41-128 |
| Context Builder | `session_context.py` | 47-625 |
| Location Detection | `location_insights.py` | 105-200 |
| Chat Processing | `sam_chat.py` | 56-1000 |
| API Services | `api_services.py` | 91-340 |
| Core Tools | `core_tools.py` | 41-644 |

---

## Related Flows

- [Context Assembly Flow](../context_assembly_flow/context_assembly_flow_DIAGRAM.md) - Detailed breakdown of context building
