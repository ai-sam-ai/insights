# Schema: ai_sam_base

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_base` |
| **Version** | 18.0.2.53 |
| **Total Models** | 54 (47 regular, 3 abstract, 4 transient) |
| **Total Controllers** | 11 |
| **API Endpoints** | 77+ |

---

## Models

### Core Conversation Models

#### ai.conversation (Primary Model)

**Purpose:** Stores conversation threads between users and SAM AI

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Conversation title (auto-generated or user-defined) |
| `active` | Boolean | No | Inactive conversations are archived |
| `user_id` | Many2one | Yes | User who initiated this conversation |
| `company_id` | Many2one | No | Company context |
| `workspace_ids` | Many2many | No | Shared in workspaces |
| `context_model` | Char | No | Technical name of related model |
| `context_id` | Integer | No | ID of related record |
| `node_id` | Char | No | Workflow node ID for node-specific chats |
| `conversation_type` | Selection | No | general, help, debug, build, analysis, etc. |
| `business_domain` | Selection | No | sales, marketing, development, etc. |
| `subcategory_ids` | Many2many | No | AI-detected subcategories |
| `ai_message_ids` | One2many | No | Messages in thread |

**Inherits:** `mail.thread`, `mail.activity.mixin`

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `create_conversation()` | Create new conversation | ai.conversation |
| `add_message()` | Add message to thread | ai.message |
| `_compute_context_description()` | Generate context description | String |

---

#### ai.message

**Purpose:** Individual messages within conversations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `conversation_id` | Many2one | Yes | Parent conversation |
| `role` | Selection | Yes | 'user' or 'assistant' |
| `content` | Text | Yes | Message text |
| `timestamp` | Datetime | No | When message was sent |

---

### API Provider Models

#### api.service.provider

**Purpose:** Multi-service API orchestration for all external providers (Claude, OpenAI, Google, Azure, Slack, etc.)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Provider display name |
| `vendor_key` | Char | No | Unique key from node_metadata.json |
| `is_template` | Boolean | No | True = vendor template, False = user config |
| `template_id` | Many2one | No | Link to vendor template |
| `api_key` | Char | No | API credentials (encrypted) |
| `api_endpoint` | Char | No | API endpoint URL |
| `api_format` | Selection | No | openai, anthropic, google, custom |
| `auth_type` | Selection | No | api_key, oauth, jwt, basic, custom |
| `service_type` | Selection | No | Deprecated - use service_type_ids |
| `service_type_ids` | Many2many | No | Linked service types |
| `is_primary` | Boolean | No | Primary provider for service type |
| `priority` | Integer | No | Selection priority |
| `model_ids` | One2many | No | Available models |
| `max_context_tokens` | Integer | No | Context window size |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `call_api()` | Generic API call | dict |
| `get_active_provider()` | Get best provider for service | api.service.provider |
| `populate_from_template()` | Create config from template | api.service.provider |

---

#### ai.provider.model

**Purpose:** Individual AI models within providers (GPT-4, Claude Sonnet, etc.)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Model display name |
| `model_identifier` | Char | Yes | API model ID (e.g., "claude-sonnet-4") |
| `provider_id` | Many2one | Yes | Parent provider |
| `cost_per_1k_input` | Float | No | Input token cost |
| `cost_per_1k_output` | Float | No | Output token cost |
| `context_window` | Integer | No | Max tokens |
| `is_default` | Boolean | No | Default model for provider |

---

#### ai.service.type

**Purpose:** Master list of service types (chat, voice, image, etc.)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name |
| `technical_name` | Char | Yes | Technical identifier |
| `active` | Boolean | No | Is active |
| `vendor_key` | Char | No | Specific vendor (null = all vendors) |

---

### Brain & Intelligence Models

#### ai.service (Abstract Model)

**Purpose:** THE BRAIN - Central orchestrator for all AI operations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (Abstract - no stored fields) | | | |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `_get_default_provider_config()` | Get configured provider | ProviderConfigAdapter |
| `send_message()` | Send message to AI | dict |
| `stream_response()` | Stream AI response | generator |
| `_call_anthropic_api()` | Call Claude API | dict |
| `_call_openai_api()` | Call OpenAI API | dict |

---

#### ai.context.builder (Abstract Model)

**Purpose:** The "all-knowing brain" - builds comprehensive context about user's current location

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `build_context_prompt()` | Build full context prompt | String |
| `_get_system_overview()` | Get Odoo system overview | dict |
| `_get_record_context()` | Get context about specific record | dict |
| `_get_menu_context()` | Get menu information | dict |

---

#### ai.module.intelligence

**Purpose:** Module-specific training data for context awareness

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `module_name` | Char | Yes | Technical module name |
| `display_name` | Char | No | User-friendly name |
| `module_description` | Text | No | What the module does |
| `common_questions` | Json | No | FAQ array |
| `key_models` | Json | No | Important models |
| `business_context` | Text | No | Business use cases |

---

### User Personalization Models

#### sam.user.profile

**Purpose:** User relationship data and personalization

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | Many2one | Yes | Odoo user |
| `relationship_level` | Selection | No | stranger, acquaintance, colleague, friend, close_friend |
| `trust_score` | Integer | No | Trust level 0-100 |
| `personal_facts` | Json | No | What SAM knows about user |
| `memory_permission` | Selection | No | ask_always, auto_work, auto_all |
| `pending_memories` | Json | No | Facts waiting for approval |
| `approved_paths` | Json | No | Granted file paths |
| `common_tasks` | Json | No | Frequent tasks |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_or_create_profile()` | Get or create user profile | sam.user.profile |
| `get_user_context_for_sam()` | Get full user context | dict |
| `propose_memory()` | Propose new memory | bool |
| `learn_fact()` | Save approved fact | bool |

---

#### sam.user.settings

**Purpose:** User-specific SAM settings

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | Many2one | Yes | Odoo user |
| `preferred_provider_id` | Many2one | No | Preferred AI provider |
| `default_model_id` | Many2one | No | Preferred model |
| `temperature` | Float | No | Response creativity |
| `max_tokens` | Integer | No | Response length limit |

---

### Cost & Usage Models

#### ai.token.usage

**Purpose:** Track every API call and token consumption

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `conversation_id` | Many2one | No | Related conversation |
| `provider_id` | Many2one | No | Which provider was used |
| `model_id` | Many2one | No | Which model was used |
| `input_tokens` | Integer | No | Input token count |
| `output_tokens` | Integer | No | Output token count |
| `total_cost` | Float | No | Calculated cost |
| `timestamp` | Datetime | No | When API call was made |

---

#### ai.cost.optimizer

**Purpose:** Automatic provider recommendation based on cost/performance

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `recommend_provider()` | Get best provider for task | api.service.provider |
| `calculate_cost()` | Calculate cost estimate | float |
| `compare_providers()` | Compare all providers | list |

---

#### ai.cost.budget

**Purpose:** Budget management system

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Budget name |
| `user_id` | Many2one | No | User budget (null = company) |
| `monthly_limit` | Float | No | Monthly spending limit |
| `current_spend` | Float | No | Current month spend |
| `alert_threshold` | Float | No | Alert at this percentage |

---

### Agent Ecosystem Models

#### ai.agent.registry (ai.agent.definition)

**Purpose:** Agent registry - defines available AI agents

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Agent name |
| `technical_name` | Char | Yes | Unique identifier |
| `system_prompt` | Text | No | Agent's instructions |
| `capabilities` | Json | No | What agent can do |
| `knowledge_ids` | One2many | No | Agent's training data |

---

#### ai.agent.knowledge

**Purpose:** Agent training data chunks

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agent_id` | Many2one | Yes | Parent agent |
| `content` | Text | Yes | Knowledge content |
| `category` | Char | No | Knowledge category |
| `priority` | Integer | No | Importance ranking |

---

#### ai.agent.execution

**Purpose:** Agent execution audit trail

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agent_id` | Many2one | Yes | Which agent ran |
| `conversation_id` | Many2one | No | Related conversation |
| `input_data` | Json | No | Input to agent |
| `output_data` | Json | No | Output from agent |
| `execution_time` | Float | No | Time taken (seconds) |
| `status` | Selection | No | success, error, timeout |

---

### Environment & Mode Models

#### sam.environment

**Purpose:** Environment detection singleton

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Environment name |
| `environment_type` | Selection | Yes | development, staging, production |
| `is_current` | Boolean | No | Is current environment |

---

#### sam.mode.context

**Purpose:** Mode-specific context and Power Prompts

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Mode name |
| `mode_key` | Char | Yes | Technical identifier |
| `system_prompt` | Text | No | Mode-specific prompt |
| `context_data` | Json | No | Additional context |

---

#### ai.mode.registry

**Purpose:** Auto-discovery mode registry for SAM environments

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Mode name |
| `technical_name` | Char | Yes | Mode identifier |
| `description` | Text | No | Mode description |
| `is_active` | Boolean | No | Is mode active |

---

### Tools Models

#### canvas.tools

**Purpose:** Canvas Agent Tools (read, write, navigate)

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `canvas_read()` | Read canvas/node data | dict |
| `canvas_write()` | Write to canvas | dict |
| `canvas_navigate()` | Navigate canvas | dict |

---

#### external.tools

**Purpose:** External service tools (Google, Tavily, etc.)

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `web_search()` | Search the web | dict |
| `fetch_url()` | Fetch URL content | dict |

---

#### odoo.tools

**Purpose:** SAM's business intelligence layer

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `query_records()` | Query Odoo records | list |
| `lookup_record()` | Lookup single record | dict |
| `aggregate_data()` | Aggregate statistics | dict |

---

### Additional Models (Complete Index)

The following models complete the 54-model count. Details above cover the primary models; this index ensures all are documented.

#### Knowledge & Memory Models

| Model | Type | Purpose |
|-------|------|---------|
| `ai.knowledge.domain` | Regular | Knowledge graph hubs (Development, Marketing, Support) |
| `ai.knowledge.subcategory` | Regular | AI-detected topic clusters within domains |
| `ai.memory.config` | Regular (Singleton) | Graph/vector memory system configuration |
| `ai.memory.search.log` | Regular | Analytics for memory search performance |

#### Configuration & Platform Models

| Model | Type | Purpose |
|-------|------|---------|
| `ai.workspace` | Regular | Team collaboration spaces for sharing conversations |
| `canvas.platform` | Regular | Platform renderer registration for universal canvas |
| `ai.branch` | Regular | Canvas type definitions (workflow, mindmap, etc.) |
| `ai.access.gate` | Regular | Permission control for file/folder access |
| `api.provider.identity` | Regular | Separates API access from identities (who sends/receives) |
| `sam.voice` | Regular | SAM voice/personality guardrail layer |
| `sam.personality` | Regular | SAM character DNA & conversational rules |

#### Cost & Analytics Models

| Model | Type | Purpose |
|-------|------|---------|
| `ai.provider.benchmark` | Regular | Performance benchmarking across providers |
| `ai.service.cost.comparison` | Regular (SQL View) | Dashboard view for cross-provider cost comparison |

#### Import & Sync Models (Transient)

| Model | Type | Purpose |
|-------|------|---------|
| `ai.conversation.import` | Regular | Wizard for importing conversations from ZIP/JSON |
| `ai.conversation.history.importer` | Transient | Import conversation history (Claude, ChatGPT) |
| `ai.memory.import.wizard` | Transient | Restore memory backups from XLSX |
| `ai.memory.uninstall.wizard` | Transient | Safe uninstall with optional backup |
| `ai.workspace.add.conversations.wizard` | Transient | Add conversations to workspace |

#### MCP & Communication Models

| Model | Type | Purpose |
|-------|------|---------|
| `sam.mcp.server.config` | Regular | MCP server script configuration |
| `sam.mcp.feature` | Regular | MCP feature flags |
| `mcp.server.generator` | Abstract | Generates MCP server scripts |

#### Abstract Service Models

| Model | Type | Purpose |
|-------|------|---------|
| `ai.context.analyzer` | Abstract | Detects context shifts for session management |
| `ai.location.introspector` | Abstract | Schema-driven platform discovery |
| `ai.vector.service` | Abstract | ChromaDB semantic search integration |
| `ai.graph.service` | Abstract | Apache AGE graph database integration |
| `ai.document.extractor` | Abstract | AI-powered document extraction engine |

#### Legacy & Utility Models

| Model | Type | Purpose |
|-------|------|---------|
| `api_credentials` | Regular | N8N-style API credential storage (legacy) |
| `settings` | Regular | Workflow settings storage |

#### Odoo Extension Models

| Model | Type | Purpose |
|-------|------|---------|
| `res.company` | Extension | Adds `sam_business_context` field |
| `res.config.settings` | Extension | SAM AI configuration in system settings |

---

### Model Count Summary

| Category | Count |
|----------|-------|
| Regular Models | 47 |
| Abstract Models | 7 |
| Transient Models | 4 |
| Odoo Extensions | 2 |
| **Total** | **54+** |

---

## Controllers / API Endpoints

### Main Chat Interface
**Controller:** `controllers/sam_ai_chat_controller.py` (87KB)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/chat/send` | POST | user | Send message to SAM |
| `/sam_ai/chat/send_streaming` | POST | user | Send message with streaming response |
| `/sam_ai/voice/transcribe` | POST | user | Transcribe voice to text |
| `/sam_ai/chat/conversations` | POST | user | Get user's conversation list |
| `/sam_ai/chat/new` | POST | user | Create new conversation |
| `/sam_ai/chat/delete` | POST | user | Delete conversation |
| `/sam_ai/chat/history` | POST | user | Get conversation history |

### Canvas Controller
**Controller:** `controllers/canvas_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/canvas/read` | POST | user | Read canvas data |
| `/sam_ai/canvas/nodes` | POST | user | Get canvas nodes |
| `/sam_ai/canvas/update` | POST | user | Update canvas |

### Session Controller
**Controller:** `controllers/sam_session_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/session/init` | POST | user | Initialize SAM session |
| `/sam_ai/session/context` | POST | user | Get current context |
| `/sam_ai/session/preferences` | POST | user | Get/set user preferences |

### Menu Context Controller
**Controller:** `controllers/menu_context_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/menu/context` | POST | user | Get menu context |
| `/sam_ai/menu/modules` | POST | user | Get installed modules |

### Vendor Registry Controller
**Controller:** `controllers/vendor_registry_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/vendors/list` | GET | user | List available vendors |
| `/sam_ai/vendors/templates` | GET | user | Get vendor templates |

### Service Populator Controller
**Controller:** `controllers/service_populator_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/services/populate` | POST | user | Populate service templates |

### OAuth Controller
**Controller:** `controllers/api_oauth_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/oauth/authorize` | GET | public | Start OAuth flow |
| `/sam_ai/oauth/callback` | GET | public | OAuth callback |
| `/sam_ai/oauth/token` | POST | user | Token exchange |

### Memory Graph Controller
**Controller:** `controllers/memory/memory_graph_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/memory/graph` | POST | user | Get memory graph data |
| `/sam_ai/memory/search` | POST | user | Search memories |

### Developer Mode Controller
**Controller:** `controllers/sam_developer_mode.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/dev/logs` | GET | user | Get development logs |
| `/sam_ai/dev/debug` | POST | user | Debug endpoint |

### Debug System Prompt Controller
**Controller:** `controllers/debug_system_prompt_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/debug/system_prompt` | POST | user | View composed system prompt |

### MCP Download Controller
**Controller:** `controllers/mcp_download_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai/mcp/download` | GET | user | Download MCP server files |

---

## Data Relationships Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SAM AI BASE ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐      ┌─────────────────────┐
│   res.users         │      │   res.company       │
│                     │      │                     │
│  - Standard Odoo    │      │  - Company context  │
└──────────┬──────────┘      └──────────┬──────────┘
           │                            │
           │ Many2one                   │ Many2one
           ▼                            ▼
┌──────────────────────────────────────────────────┐
│               ai.conversation                     │
│                                                   │
│  - name                                           │
│  - user_id (M2O) ◄─────────────────────────────┐ │
│  - company_id (M2O)                            │ │
│  - context_model / context_id                  │ │
│  - conversation_type                           │ │
│  - business_domain                             │ │
│  - ai_message_ids (O2M) ─────────────────────┐ │ │
│  - workspace_ids (M2M) ──────────────────┐   │ │ │
└──────────────────────────────────────────┼───┼─┼─┘
                                           │   │ │
           ┌───────────────────────────────┘   │ │
           ▼                                   │ │
┌─────────────────────┐                        │ │
│   ai.workspace      │                        │ │
│                     │                        │ │
│  - Team sharing     │                        │ │
└─────────────────────┘                        │ │
                                               │ │
           ┌───────────────────────────────────┘ │
           ▼                                     │
┌─────────────────────┐                          │
│   ai.message        │                          │
│                     │                          │
│  - conversation_id  │◄─────────────────────────┘
│  - role (user/asst) │
│  - content          │
│  - timestamp        │
└─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      PROVIDER ECOSYSTEM                                  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐      ┌─────────────────────┐
│  ai.service.type    │◄────►│ api.service.provider│
│                     │ M2M  │                     │
│  - chat, voice, etc │      │  - vendor_key       │
└─────────────────────┘      │  - api_key          │
                             │  - api_format       │
                             │  - is_template      │
                             │  - model_ids (O2M)──┼─────┐
                             └─────────────────────┘     │
                                                         │
                             ┌───────────────────────────┘
                             ▼
                    ┌─────────────────────┐
                    │  ai.provider.model  │
                    │                     │
                    │  - model_identifier │
                    │  - cost_per_1k_*    │
                    │  - context_window   │
                    └─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      USER PERSONALIZATION                                │
└─────────────────────────────────────────────────────────────────────────┘

res.users ──────┬──────────────────────────────────────────────────┐
                │                                                   │
                │ Many2one                                          │ Many2one
                ▼                                                   ▼
┌─────────────────────┐                              ┌─────────────────────┐
│  sam.user.profile   │                              │  sam.user.settings  │
│                     │                              │                     │
│  - relationship_lvl │                              │  - preferred_model  │
│  - trust_score      │                              │  - temperature      │
│  - personal_facts   │                              │  - max_tokens       │
│  - memory_permission│                              └─────────────────────┘
│  - pending_memories │
└─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      COST TRACKING                                       │
└─────────────────────────────────────────────────────────────────────────┘

ai.conversation ────────┐
                        │ Many2one
                        ▼
               ┌─────────────────────┐
               │   ai.token.usage    │
               │                     │
               │  - input_tokens     │
               │  - output_tokens    │
               │  - total_cost       │◄──── ai.cost.budget (budget limits)
               │  - provider_id      │
               │  - model_id         │
               └─────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.conversation` | base.group_user | ✅ | ✅ | ✅ | ✅ |
| `ai.conversation` | ai_sam_base.group_sam_system | ✅ | ✅ | ✅ | ❌ |
| `ai.message` | base.group_user | ✅ | ✅ | ✅ | ✅ |
| `api.service.provider` | base.group_user | ✅ | ✅ | ✅ | ✅ |
| `ai.provider.model` | base.group_user | ✅ | ✅ | ✅ | ✅ |
| `ai.service.type` | base.group_user | ✅ | ❌ | ❌ | ❌ |
| `ai.service.type` | base.group_system | ✅ | ✅ | ✅ | ✅ |
| `ai.token.usage` | base.group_user | ✅ | ✅ | ✅ | ❌ |
| `sam.user.profile` | base.group_user | ✅ | ✅ | ✅ | ❌ |
| `sam.user.settings` | base.group_user | ✅ | ✅ | ✅ | ✅ |
| `ai.agent.registry` | base.group_user | ✅ | ✅ | ✅ | ❌ |

**Record Rules:** Company-based isolation via `ir_rules.xml` (BYOK pattern)

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `ai_conversation` | `ai.conversation` | Conversation threads |
| `ai_message` | `ai.message` | Individual messages |
| `api_service_provider` | `api.service.provider` | Provider configurations |
| `ai_provider_model` | `ai.provider.model` | Available AI models |
| `ai_service_type` | `ai.service.type` | Service type master |
| `ai_token_usage` | `ai.token.usage` | Token consumption log |
| `sam_user_profile` | `sam.user.profile` | User personalization |
| `sam_user_settings` | `sam.user.settings` | User preferences |
| `ai_agent_registry` | `ai.agent.registry` | Agent definitions |
| `ai_agent_knowledge` | `ai.agent.knowledge` | Agent training data |
| `ai_cost_budget` | `ai.cost.budget` | Spending budgets |
| `sam_environment` | `sam.environment` | Environment singleton |
| `ai_mode_registry` | `ai.mode.registry` | SAM modes |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-25 | Expanded to document all 54 models (complete index added) | CTO Module Docs Agent |
| 2026-01-25 | Initial schema documentation (four-file standard) | CTO Module Docs Agent |
