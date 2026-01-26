# Data Flow Review Brief: Chat Message Flow

> **Copy this entire document to provide context for `/cto-dataflow-review`**

---

## Original Request

**User asked:**
> "Today I am asking for the chat flow, so when a user types into the input form, what are the various steps we take and python files do we go through. I believe the front end starts here `D:\github_repos\04_samai_user_experience\ai_sam` yet the data would or could be here also `D:\github_repos\04_samai_user_experience\ai_sam_base`. With the human interaction, I am desiring to be able to read the various context steps we are building before we send to API provider."

**Key requirements:**
1. Trace the complete chat flow from user input to AI response
2. Identify all Python files involved
3. Document the context assembly steps BEFORE sending to API provider
4. Cover both `ai_sam` (frontend) and `ai_sam_base` (backend)

---

## Source Directories Analyzed

| Directory | Purpose |
|-----------|---------|
| `D:\github_repos\04_samai_user_experience\ai_sam` | Frontend - Chat widget, JS client |
| `D:\github_repos\04_samai_user_experience\ai_sam_base` | Backend - Controllers, context building, API calls |

---

## Documentation Created

### Files Created

| File | Location | Content |
|------|----------|---------|
| `chat_message_flow_DIAGRAM.md` | `docs/06_data_flows/chat_message_flow/` | Mermaid sequence diagram of complete flow |
| `chat_message_flow_DETAIL.md` | `docs/06_data_flows/chat_message_flow/` | Step-by-step walkthrough with code locations |
| `context_assembly_flow_DIAGRAM.md` | `docs/06_data_flows/context_assembly_flow/` | Detailed breakdown of context building before API call |

### Full Paths
```
D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\06_data_flows\
├── chat_message_flow\
│   ├── chat_message_flow_DIAGRAM.md
│   ├── chat_message_flow_DETAIL.md
│   └── REVIEW_BRIEF.md (this file)
└── context_assembly_flow\
    └── context_assembly_flow_DIAGRAM.md
```

---

## Flow Summary (11 Steps Documented)

| Step | Component | File | Purpose |
|------|-----------|------|---------|
| 1 | Frontend Entry | `ai_sam/static/src/js/sam_chat_vanilla_v2.js` | User types message |
| 2 | HTTP Request | `ai_sam/static/src/js/sam_chat_client.js` | POST to `/sam_ai/chat/send_streaming` |
| 3 | Controller | `ai_sam_base/controllers/sam_ai_chat_controller.py` | Receive & parse request |
| 4 | Gather Context | `ai_sam_base/api_communications/chat_input.py` | Files, memories, workflow |
| 5 | Session Manager | `ai_sam_base/api_communications/session_manager.py` | Cache or create session |
| 6 | Context Builder | `ai_sam_base/api_communications/session_context.py` | **Build system_prompt** |
| 7 | Location Detection | `ai_sam_base/api_communications/location_insights.py` | Domain detection |
| 8 | SAMChat | `ai_sam_base/api_communications/sam_chat.py` | Process message |
| 9 | API Services | `ai_sam_base/api_communications/api_services.py` | Call AI provider |
| 10 | Tool Execution | `ai_sam_base/api_communications/sam_chat.py` | Execute odoo_search, etc. |
| 11 | Stream Response | `sam_ai_chat_controller.py` + `sam_chat_client.js` | SSE back to frontend |

---

## Context Assembly Steps (User's Key Interest)

The user specifically wanted to understand "the various context steps we are building before we send to API provider."

**Context is assembled in `session_context.py` in this order:**

1. **Location Detection** - Parse URL/model → determine domain (CRM, Sales, Workflow, etc.)
2. **Location Insights** - Load domain-specific knowledge text and tools
3. **SAM Identity** - Load personality file, permissions, SAM user
4. **Business Context** - Company name, business description, currency
5. **User Info** - Current user name, email, company
6. **Tools Collection** - Core CRUD tools + chat tools + location-specific tools
7. **System Prompt Assembly** - Combine all sections into 3000-5000 token prompt

**System prompt sections (in order):**
```
# CURRENT LOCATION
# Who You Are
# Business Context
# [Domain] Knowledge
# User Context
# Your Capabilities
```

**Key finding:** Context is built ONCE per location, then cached for subsequent messages.

---

## Diagrams Included

### 1. Complete Flow Sequence Diagram
- Shows all 11 steps from user input to response
- Includes tool execution loop
- Shows SSE streaming events

### 2. Context Assembly Flow Diagram
- Flowchart showing what data feeds into context
- Sequence diagram of context building order
- Token breakdown by section

### 3. Cross-Module Data Flow
- Shows data movement between `ai_sam` and `ai_sam_base`
- Subgraphs for frontend vs backend

---

## Review Checklist for `/cto-dataflow-review`

Please verify:

- [ ] Mermaid diagrams render correctly
- [ ] All file paths are accurate and exist
- [ ] Line number references are correct
- [ ] Context assembly order matches actual code
- [ ] No missing steps in the flow
- [ ] Token estimates are reasonable
- [ ] Cross-references between docs work
- [ ] Color coding follows standards
- [ ] Both DIAGRAM.md and DETAIL.md are consistent

---

## Notes for Reviewer

1. **No existing SCHEMA.md** was found for these modules - diagrams were created by exploring actual source code
2. **Session caching** is a key architectural feature - context built once per location
3. **SSE streaming** is used for real-time response delivery
4. **Tool execution** can loop multiple times before final response

---

## To Run Review

```
/cto-dataflow-review chat_message_flow
```

Or for the context assembly specifically:
```
/cto-dataflow-review context_assembly_flow
```
