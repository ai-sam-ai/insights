# Chat Message Flow - Data Flow Diagram

> **Scope:** Complete flow from user input to AI provider response
> **Modules:** `ai_sam` (frontend), `ai_sam_base` (backend)
> **Last Updated:** 2026-01-26
> **Audit Status:** Verified against code - 10/10 accuracy

---

## Visual Diagram - Complete Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              CHAT MESSAGE FLOW - SEQUENCE                                │
└─────────────────────────────────────────────────────────────────────────────────────────┘

  USER             FRONTEND              CONTROLLER            SESSION            AI PROVIDER
   │            (SamChatClient)      (SamAIChatController)    (Manager)          (Claude/etc)
   │                  │                      │                   │                   │
   │  1. Type msg     │                      │                   │                   │
   │  & click Send    │                      │                   │                   │
   │─────────────────>│                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │  2. POST             │                   │                   │
   │                  │  /sam_ai/chat/       │                   │                   │
   │                  │  send_streaming      │                   │                   │
   │                  │  (FormData:          │                   │                   │
   │                  │   message,           │                   │                   │
   │                  │   context_data,      │                   │                   │
   │                  │   conversation_id)   │                   │                   │
   │                  │─────────────────────>│                   │                   │
   │                  │                      │                   │                   │
   │                  │  3. SSE: status      │                   │                   │
   │                  │  "Starting..."       │                   │                   │
   │                  │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│                   │                   │
   │                  │                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │    ╔════════════════════════════════╗    │                   │
   │                  │    ║  PHASE 1: SESSION CONTEXT      ║    │                   │
   │                  │    ║  (SessionManager +             ║    │                   │
   │                  │    ║   SessionContextBuilder)       ║    │                   │
   │                  │    ╚════════════════════════════════╝    │                   │
   │                  │                      │                   │                   │
   │                  │                      │  4. get_or_      │                   │
   │                  │                      │  create_session  │                   │
   │                  │                      │──────────────────>│                   │
   │                  │                      │                   │                   │
   │                  │                      │   ┌───────────────────────────────┐   │
   │                  │                      │   │  IF NEW SESSION:              │   │
   │                  │                      │   │  SessionContextBuilder.build()│   │
   │                  │                      │   │                               │   │
   │                  │                      │   │  1. Location detection        │   │
   │                  │                      │   │     (domain, model, canvas)   │   │
   │                  │                      │   │  2. SAM identity/personality  │   │
   │                  │                      │   │  3. Business context          │   │
   │                  │                      │   │     (company, description)    │   │
   │                  │                      │   │  4. User info (name, email)   │   │
   │                  │                      │   │  5. Collect tools             │   │
   │                  │                      │   │     (CRUD + chat + location)  │   │
   │                  │                      │   │  6. Build system_prompt       │   │
   │                  │                      │   │     (~3000 tokens)            │   │
   │                  │                      │   │                               │   │
   │                  │                      │   │  IF EXISTING SESSION:         │   │
   │                  │                      │   │  Resume with conversation     │   │
   │                  │                      │   │  history intact               │   │
   │                  │                      │   └───────────────────────────────┘   │
   │                  │                      │                   │                   │
   │                  │                      │  5. session_ctx   │                   │
   │                  │                      │  (system_prompt,  │                   │
   │                  │                      │   tools, history) │                   │
   │                  │                      │<──────────────────│                   │
   │                  │                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │    ╔════════════════════════════════╗    │                   │
   │                  │    ║  PHASE 2: CHAT PROCESSING      ║    │                   │
   │                  │    ║  (SAMChat + APIServices)       ║    │                   │
   │                  │    ╚════════════════════════════════╝    │                   │
   │                  │                      │                   │                   │
   │                  │                      │  6. SAMChat.      │                   │
   │                  │                      │  process_message  │                   │
   │                  │                      │  _streaming()     │                   │
   │                  │                      │─────┐             │                   │
   │                  │                      │     │             │                   │
   │                  │                      │<────┘             │                   │
   │                  │                      │                   │                   │
   │                  │                      │  7. APIServices   │                   │
   │                  │                      │  .send_streaming  │                   │
   │                  │                      │  (system_prompt,  │                   │
   │                  │                      │   messages,       │                   │
   │                  │                      │   tools)          │                   │
   │                  │                      │──────────────────────────────────────>│
   │                  │                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │                      │    ┌─────────────────────────────┐    │
   │                  │                      │    │  STREAMING LOOP:            │    │
   │                  │                      │    │                             │    │
   │                  │  8. SSE: chunk       │    │  ┌─────────────────────┐    │    │
   │  Display text    │  {text: "..."}      │    │  │ Response chunks    │<───│────│
   │<─ ─ ─ ─ ─ ─ ─ ─ ─│<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│<───┤  └─────────────────────┘    │    │
   │                  │                      │    │                             │    │
   │                  │  9. SSE: chunk       │    │  ┌─────────────────────┐    │    │
   │  Append text     │  {text: "..."}      │    │  │ More chunks...     │<───│────│
   │<─ ─ ─ ─ ─ ─ ─ ─ ─│<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│<───┤  └─────────────────────┘    │    │
   │                  │                      │    │                             │    │
   │                  │                      │    └─────────────────────────────┘    │
   │                  │                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │    ╔════════════════════════════════╗    │                   │
   │                  │    ║  OPTIONAL: TOOL EXECUTION      ║    │                   │
   │                  │    ╚════════════════════════════════╝    │                   │
   │                  │                      │                   │                   │
   │                  │                      │  10. tool_use     │                   │
   │                  │                      │  (odoo_search,    │                   │
   │                  │                      │   odoo_create,    │                   │
   │                  │                      │   etc.)           │                   │
   │                  │                      │<──────────────────────────────────────│
   │                  │                      │                   │                   │
   │                  │                      │  Execute via      │                   │
   │                  │                      │  SAMChat.         │                   │
   │                  │                      │  _execute_tool()  │                   │
   │                  │                      │─────┐             │                   │
   │                  │                      │     │             │                   │
   │                  │                      │<────┘             │                   │
   │                  │                      │                   │                   │
   │                  │  11. SSE: activity   │                   │                   │
   │                  │  {activity:          │                   │                   │
   │                  │   "searching..."}    │                   │                   │
   │                  │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│                   │                   │
   │                  │                      │                   │                   │
   │                  │                      │  12. Continue     │                   │
   │                  │                      │  with tool_result │                   │
   │                  │                      │──────────────────────────────────────>│
   │                  │                      │                   │                   │
   │                  │                      │                   │                   │
   │                  │    ╔════════════════════════════════╗    │                   │
   │                  │    ║  COMPLETION                    ║    │                   │
   │                  │    ╚════════════════════════════════╝    │                   │
   │                  │                      │                   │                   │
   │                  │                      │  Save to          │                   │
   │                  │                      │  conversation     │                   │
   │                  │                      │  history          │                   │
   │                  │                      │─────┐             │                   │
   │                  │                      │     │             │                   │
   │                  │                      │<────┘             │                   │
   │                  │                      │                   │                   │
   │                  │  13. SSE: done       │                   │                   │
   │  Show complete   │  {conversation_id,   │                   │                   │
   │  message         │   success: true}     │                   │                   │
   │<─ ─ ─ ─ ─ ─ ─ ─ ─│<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│                   │                   │
   │                  │                      │                   │                   │
   ▼                  ▼                      ▼                   ▼                   ▼
```

---

## SSE Event Types

| Event | Data | Purpose |
|-------|------|---------|
| `status` | `{status: string, progress: number}` | Progress updates ("Starting...", 0%) |
| `activity` | `{activity: string, params: object}` | Tool feedback ("searching...", "reading...") |
| `chunk` | `{text: string}` | Streaming response text |
| `permission_required` | `{permission_request: object}` | File access permission request |
| `done` | `{conversation_id, success: bool}` | Stream complete |
| `error` | `{error: string}` | Error occurred |

---

## Quick Summary

1. **Entry:** User types message in chat widget, JS collects page context (URL, model, record_id)
2. **Session Phase:** SessionManager checks for existing session or builds new via SessionContextBuilder
3. **Process Phase:** SAMChat sends assembled context + conversation history to AI provider via APIServices
4. **Output:** Streaming response with optional tool execution, streamed back via Server-Sent Events

---

## Context Data Flow (What Gets Assembled)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                           CONTEXT ASSEMBLY - DATA FLOW                                   │
└─────────────────────────────────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────┐
  │    FRONTEND (SamChatClient)           │
  │                                       │
  │   URL ─────────────┐                  │
  │   model/record_id ─┼──> context_data  │
  │   canvas_id/node ──┘                  │
  │   conversation_id ────────────────────│──> (for resuming)
  │                                       │
  └───────────────────┬───────────────────┘
                      │
                      ▼
  ┌───────────────────────────────────────┐
  │    CONTROLLER PARSING                 │
  │    (SamAIChatController)              │
  │                                       │
  │   context_data ──┬──> node_id?        │
  │                  ├──> canvas_id?      │
  │                  ├──> record_id?      │
  │                  └──> model?          │
  │                                       │
  │   Determines: workflow node,          │
  │   canvas-level, or record context     │
  │                                       │
  └───────────────────┬───────────────────┘
                      │
                      ▼
  ┌───────────────────────────────────────────────────────────────────────────────┐
  │                     SESSION CONTEXT BUILD                                      │
  │                     (SessionContextBuilder.build())                            │
  │                                                                               │
  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
  │   │    LOCATION     │    │  SAM IDENTITY   │    │ BUSINESS CONTEXT│          │
  │   │                 │    │                 │    │                 │          │
  │   │  Domain:        │    │  Personality    │    │  Company Name   │          │
  │   │  - workflow     │    │  Permissions    │    │  Business Desc  │          │
  │   │  - crm          │    │  (from sam_user)│    │                 │          │
  │   │  - sales        │    └────────┬────────┘    └────────┬────────┘          │
  │   │  - canvas       │             │                      │                   │
  │   │  - general      │             │                      │                   │
  │   │                 │             │                      │                   │
  │   │  Domain Tools   │             │                      │                   │
  │   │  Domain Context │             │                      │                   │
  │   └────────┬────────┘             │                      │                   │
  │            │                      │                      │                   │
  │            │         ┌────────────┴──────────────────────┘                   │
  │            │         │                                                       │
  │            ▼         ▼                                                       │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │                      SYSTEM PROMPT (~3000 tokens)                    │   │
  │   │                                                                     │   │
  │   │   "You are SAM, an AI assistant for {company}..."                   │   │
  │   │   + Domain knowledge + User info + Capabilities                     │   │
  │   │                                                                     │   │
  │   └─────────────────────────────────────────────────────────────────────┘   │
  │                                                                               │
  │   ┌─────────────────────────────────────────────────────────────────────┐   │
  │   │                         TOOLS ARRAY                                  │   │
  │   │                                                                     │   │
  │   │   Core CRUD Tools ──┐  odoo_search, odoo_create,                    │   │
  │   │   Chat Tools ───────┼──> odoo_update, odoo_delete,                  │   │
  │   │   Location Tools ───┘   send_message, get_context, ...              │   │
  │   │                                                                     │   │
  │   └─────────────────────────────────────────────────────────────────────┘   │
  │                                                                               │
  └───────────────────────────────────────────────────────────────────────────────┘
                      │
                      ▼
  ┌───────────────────────────────────────┐
  │    TO AI PROVIDER (APIServices)       │
  │                                       │
  │   system_prompt ──────┐               │
  │   tools array ────────┼──> API Call   │
  │   conversation history┘    (Anthropic │
  │                            or OpenAI  │
  │                            format)    │
  │                                       │
  └───────────────────────────────────────┘
```

---

## Code References

| Component | File | Line |
|-----------|------|------|
| SamChatClient (frontend) | `ai_sam/static/src/js/chat/sam_chat_client.js` | Class at line 24 |
| Endpoint `/sam_ai/chat/send_streaming` | `ai_sam_base/controllers/sam_ai_chat_controller.py` | Line 133 |
| SessionManager | `ai_sam_base/api_communications/session_manager.py` | Class at line 41 |
| SessionContextBuilder | `ai_sam_base/api_communications/session_context.py` | Class at line 47 |
| SAMChat | `ai_sam_base/api_communications/sam_chat.py` | Class at line 56 |
| APIServices | `ai_sam_base/api_communications/api_services.py` | Class definition |
| ChatInput (gather_context) | `ai_sam_base/api_communications/chat_input.py` | Line 71 |

---

## Related Documentation

- [ai_sam Module](../../04_modules/ai_sam/) - Frontend chat widget
- [ai_sam_base Module](../../04_modules/ai_sam_base/) - Backend processing
- [Detailed Walkthrough](./chat_message_flow_DETAIL.md)
