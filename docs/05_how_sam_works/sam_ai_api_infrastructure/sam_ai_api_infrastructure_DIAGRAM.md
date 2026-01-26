# SAM AI API Infrastructure - Data Flow Diagram

> **Scope:** Complete API infrastructure for ai_sam_base and ai_sam modules
> **Modules:** ai_sam_base, ai_sam
> **Last Updated:** 2025-01-25

---

## 1. High-Level Architecture Overview

```mermaid
flowchart TB
    subgraph Frontend["Frontend (Browser)"]
        UI[SAM Chat UI]
    end

    subgraph Controllers["HTTP Controllers (ai_sam_base/controllers/)"]
        CC[SamAIChatController]
    end

    subgraph API_Comm["API Communications Layer (ai_sam_base/api_communications/)"]
        SC[sam_chat.py<br/>SAMChat Class]
        SM[session_manager.py<br/>SessionManager]
        SP[system_prompt.py<br/>Context Builder]
        AS[api_services.py<br/>APIServices]
    end

    subgraph External["External AI Providers"]
        CLAUDE[Claude/Anthropic]
        OPENAI[OpenAI/GPT]
        OTHER[Other Providers]
    end

    subgraph Database["Odoo Database"]
        CONV[ai.conversation]
        MSG[ai.message]
        SVC[ai.service.provider]
    end

    UI -->|POST /sam_ai/chat/send| CC
    UI -->|POST /sam_ai/chat/send_streaming| CC
    CC --> SC
    SC --> SM
    SM --> SP
    SC --> AS
    AS --> CLAUDE
    AS --> OPENAI
    AS --> OTHER
    SC --> CONV
    SC --> MSG
    AS --> SVC

    classDef frontend fill:#4A90E2,stroke:#2C5F7F,color:#fff
    classDef controller fill:#F4C430,stroke:#B8941E,color:#000
    classDef api_comm fill:#48C78E,stroke:#2E8B57,color:#fff
    classDef external fill:#9B59B6,stroke:#7D3C98,color:#fff
    classDef database fill:#E74C3C,stroke:#C0392B,color:#fff

    class UI frontend
    class CC controller
    class SC,SM,SP,AS api_comm
    class CLAUDE,OPENAI,OTHER external
    class CONV,MSG,SVC database
```

---

## 2. Streaming Request Flow (Primary Path)

```mermaid
sequenceDiagram
    autonumber
    participant Client as Browser
    participant Ctrl as SamAIChatController
    participant SM as SessionManager
    participant SC as SAMChat
    participant SP as system_prompt.py
    participant AS as APIServices
    participant AI as AI Provider
    participant DB as Database

    Client->>+Ctrl: POST /sam_ai/chat/send_streaming
    Note over Ctrl: Parse kwargs, context_data

    Ctrl->>+SM: get_or_create_session(env, user_id, context_data)
    SM->>SM: _get_location_key(context_data)

    alt New Session
        SM->>+SP: SessionContextBuilder.build()
        SP->>SP: Build system_prompt
        SP->>SP: Build tools list
        SP-->>-SM: session_context
        SM->>SM: Cache session
    else Existing Session
        SM->>SM: Check state delta
        SM-->>SM: Resume with refresh
    end
    SM-->>-Ctrl: session_context

    Ctrl->>+SC: SAMChat(env, session_context)

    loop Streaming Chunks
        SC->>+AS: _call_ai_api_streaming()
        AS->>+AI: HTTP Request (stream=true)
        AI-->>-AS: SSE chunk
        AS-->>-SC: chunk
        SC-->>Ctrl: yield chunk
        Ctrl-->>Client: event: chunk
    end

    SC->>+DB: _persist_messages()
    DB-->>-SC: OK

    SC-->>-Ctrl: done
    Ctrl-->>-Client: event: done
```

---

## 3. Non-Streaming Request Flow

```mermaid
sequenceDiagram
    autonumber
    participant Client as Browser
    participant Ctrl as SamAIChatController
    participant PCM as process_chat_message()
    participant SM as SessionManager
    participant SC as SAMChat
    participant AS as APIServices
    participant AI as AI Provider

    Client->>+Ctrl: POST /sam_ai/chat/send
    Note over Ctrl: JSON request body

    Ctrl->>+PCM: process_chat_message(env, message, user_id, context_data)

    PCM->>+SM: get_or_create_session()
    SM-->>-PCM: session_context

    PCM->>+SC: SAMChat(env, session_context)
    SC->>SC: Add user message to history

    SC->>+AS: _call_ai_api()
    AS->>+AI: HTTP Request
    AI-->>-AS: Full response
    AS-->>-SC: response

    opt Tool Calls Present
        loop Until no more tools
            SC->>SC: _execute_tools()
            SC->>AS: _call_ai_api(tool_results)
            AS->>AI: Continue with results
            AI-->>AS: response
            AS-->>SC: response
        end
    end

    SC->>SC: _persist_messages()
    SC-->>-PCM: result

    PCM->>SM: update_session_activity()
    PCM->>SM: add_message_to_history()
    PCM-->>-Ctrl: result

    Ctrl-->>-Client: JSON response
```

---

## 4. Session Management Flow

```mermaid
stateDiagram-v2
    [*] --> CheckCache: get_or_create_session()

    CheckCache --> Expired: Session exists but TTL exceeded
    CheckCache --> Resume: Session exists and valid
    CheckCache --> Create: No session found

    Expired --> Create: Clear expired session

    Create --> BuildContext: _create_session()
    BuildContext --> CacheSession: SessionContextBuilder.build()
    CacheSession --> [*]: Return new session

    Resume --> CheckState: _resume_session()
    CheckState --> InjectDelta: State changed
    CheckState --> ReturnSession: State unchanged
    InjectDelta --> ReturnSession: Add pending_context_refresh
    ReturnSession --> [*]: Return existing session

    note right of BuildContext
        - Build system_prompt (ONCE)
        - Build tools list
        - Snapshot location state
    end note

    note right of InjectDelta
        Delta injection when:
        - Canvas/workflow modified
        - CRM lead stage changed
        - Record updated
    end note
```

---

## 5. API Provider Selection Flow

```mermaid
flowchart TD
    Start[APIServices.send()] --> GetFormat{Get API Format}

    GetFormat -->|config.api_format| UseConfig[Use config value]
    GetFormat -->|Not set| UseLookup[Lookup in API_FORMAT_MAP]

    UseConfig --> FormatDecision{API Format?}
    UseLookup --> FormatDecision

    FormatDecision -->|anthropic| Anthropic[_call_anthropic_api]
    FormatDecision -->|openai| OpenAI[_call_openai_api]
    FormatDecision -->|unknown| FallbackOAI[Fallback to OpenAI format]

    Anthropic --> Delegate1[Delegate to ai.service._call_claude_api]
    OpenAI --> Delegate2[Delegate to ai.service._call_openai_api]
    FallbackOAI --> Delegate2

    Delegate1 --> Response[Return Response]
    Delegate2 --> Response

    subgraph Supported["OpenAI-Compatible Providers"]
        P1[Azure OpenAI]
        P2[OpenRouter]
        P3[Together AI]
        P4[Groq]
        P5[DeepSeek]
        P6[Ollama/Local]
    end

    classDef entry fill:#4A90E2,stroke:#2C5F7F,color:#fff
    classDef decision fill:#F4C430,stroke:#B8941E,color:#000
    classDef anthropic fill:#D946EF,stroke:#A855F7,color:#fff
    classDef openai fill:#48C78E,stroke:#2E8B57,color:#fff

    class Start entry
    class GetFormat,FormatDecision decision
    class Anthropic,Delegate1 anthropic
    class OpenAI,Delegate2,FallbackOAI openai
```

---

## 6. Tool Execution Flow

```mermaid
sequenceDiagram
    autonumber
    participant SC as SAMChat
    participant TE as Tool Executor
    participant CT as core_tools.py
    participant CHT as chat_tools.py
    participant Model as Odoo Model
    participant VDB as Vector DB

    SC->>SC: Response contains tool_calls

    loop For each tool_call
        SC->>+TE: _execute_single_tool(tool_call)

        alt Core CRUD Tool
            TE->>+CT: execute_core_tool(env, sam_user, tool_name, params)
            CT->>CT: Switch to SAM user context

            alt odoo_read
                CT->>+Model: browse(ids).read(fields)
                Model-->>-CT: records
            else odoo_search
                CT->>+Model: search(domain).read(fields)
                Model-->>-CT: records
            else odoo_create
                CT->>+Model: create(values)
                Model-->>-CT: record
            else odoo_write
                CT->>+Model: browse(ids).write(values)
                Model-->>-CT: True
            end
            CT-->>-TE: result

        else Chat Tool (memory_recall)
            TE->>+CHT: execute_chat_tool(env, tool_name, params)
            CHT->>+VDB: semantic_search(query)
            VDB-->>-CHT: matching conversations
            CHT-->>-TE: result

        else Location Tool
            TE->>TE: _execute_location_tool()
            Note over TE: Canvas/workflow specific
        end

        TE-->>-SC: tool_result
    end

    SC->>SC: Continue with tool_results
```

---

## 7. File-to-Component Mapping

```mermaid
flowchart LR
    subgraph Controllers["controllers/"]
        C1[sam_ai_chat_controller.py]
        C2[sam_session_controller.py]
        C3[canvas_controller.py]
        C4[vendor_registry_controller.py]
        C5[api_oauth_controller.py]
    end

    subgraph API_Comm["api_communications/"]
        A1[sam_chat.py<br/>HOW SAM TALKS]
        A2[system_prompt.py<br/>WHAT SAM KNOWS]
        A3[session_manager.py<br/>Session Lifecycle]
        A4[api_services.py<br/>AI Provider Calls]
        A5[chat_input.py<br/>Context Building]
        A6[chat_output.py<br/>Response Formatting]
        A7[memory.py<br/>Vector Search]
        A8[core_tools.py<br/>CRUD Executors]
        A9[chat_tools.py<br/>Memory Tools]
        A10[session_context.py<br/>Context Builder]
        A11[conversation.py<br/>Conversation Utils]
        A12[location_insights.py<br/>Location Analysis]
    end

    C1 --> A1
    C1 --> A3
    A1 --> A2
    A1 --> A4
    A1 --> A8
    A1 --> A9
    A3 --> A10
    A3 --> A5
    A4 --> A7
    A10 --> A12

    classDef controller fill:#F4C430,stroke:#B8941E,color:#000
    classDef core fill:#4A90E2,stroke:#2C5F7F,color:#fff
    classDef infra fill:#48C78E,stroke:#2E8B57,color:#fff

    class C1,C2,C3,C4,C5 controller
    class A1,A2 core
    class A3,A4,A5,A6,A7,A8,A9,A10,A11,A12 infra
```

---

## Quick Summary

1. **Entry:** HTTP requests arrive at `SamAIChatController` via `/sam_ai/chat/send` or `/sam_ai/chat/send_streaming`
2. **Session:** `SessionManager` handles session lifecycle with Resume + Refresh pattern
3. **Processing:** `SAMChat` orchestrates message processing, tool execution, and persistence
4. **AI Calls:** `APIServices` routes to appropriate AI provider (Claude, OpenAI, etc.)
5. **Output:** Streaming (SSE events) or JSON response back to frontend

---

## Related Documentation

- [ai_sam_base Module](../../04_modules/ai_sam_base/) - Core SAM AI module
- [ai_sam Module](../../04_modules/ai_sam/) - SAM UI/UX module
- [API Communications Architecture](../api_communications/) - V2 architecture details
- [Detailed Walkthrough](./sam_ai_api_infrastructure_DETAIL.md) - Step-by-step explanation
