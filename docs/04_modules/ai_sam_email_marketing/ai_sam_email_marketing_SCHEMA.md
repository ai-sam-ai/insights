# Schema: ai_sam_email_marketing

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_email_marketing` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 3 + 1 inherit (ai.email.campaign, ai.email.template, ai.email.generation.request + mailing.mailing) |
| **Total Controllers** | 1 |
| **API Endpoints** | 3 (1 HTTP, 1 HTML, 1 JSON-RPC) |

---

## Models

### ai.email.campaign (Primary Model)

**Purpose:** Manages AI-powered email marketing campaigns with context for AI understanding.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Campaign name |
| `description` | Text | No | Campaign description and objectives |
| `campaign_type` | Selection | Yes | promotional, newsletter, announcement, educational, event, transactional, re_engagement, welcome, abandoned_cart, custom |
| `target_audience` | Text | No | Description of target audience |
| `tone` | Selection | No | professional, casual, urgent, educational, enthusiastic, empathetic |
| `campaign_goals` | Text | No | What should this campaign achieve |
| `ai_instructions` | Text | No | Additional instructions for AI |
| `brand_voice` | Text | No | Brand voice guidelines for AI |
| `template_ids` | One2many | No | Generated templates |
| `generation_request_ids` | One2many | No | History of AI requests |
| `mailing_ids` | One2many | No | Odoo mailings created from this campaign |
| `template_count` | Integer | No | Computed: template count |
| `generation_count` | Integer | No | Computed: generation count |
| `mailing_count` | Integer | No | Computed: mailing count |
| `state` | Selection | Yes | draft, generating, ready, sent, done, cancelled |
| `active` | Boolean | No | Active flag (default: True) |
| `company_id` | Many2one | No | Company |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_open_ai_builder()` | Open AI Email Builder interface | Client action |
| `action_view_templates()` | View generated templates | Window action |
| `action_view_mailings()` | View created mailings | Window action |
| `get_ai_context()` | Get campaign context for AI | dict |

**Relationships:**
- `template_ids` → `ai.email.template` (One2many)
- `generation_request_ids` → `ai.email.generation.request` (One2many)
- `mailing_ids` → `mailing.mailing` (One2many)

---

### ai.email.template

**Purpose:** Stores AI-generated email templates with versioning and conversion to Odoo mailings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `subject` | Char | Yes | Email subject line |
| `preheader` | Char | No | Preview text shown in inbox |
| `body_html` | Html | No | Email body in HTML |
| `body_text` | Text | No | Plain text version |
| `campaign_id` | Many2one | Yes | Parent campaign |
| `generation_request_id` | Many2one | No | AI request that generated this |
| `prompt_used` | Text | No | Prompt that generated this |
| `ai_model_used` | Char | No | AI model used (e.g., gpt-4) |
| `generation_metadata` | Text | No | JSON metadata (tokens, cost) |
| `version` | Integer | No | Version number (default: 1) |
| `is_latest` | Boolean | No | Is latest version (default: True) |
| `parent_template_id` | Many2one | No | Previous version |
| `child_template_ids` | One2many | No | Newer versions |
| `mailing_id` | Many2one | No | Created mailing |
| `state` | Selection | Yes | draft, generated, reviewed, approved, sent |
| `ai_confidence_score` | Float | No | AI confidence (0-1) |
| `user_rating` | Selection | No | 1-5 rating |
| `user_feedback` | Text | No | User feedback |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_create_mailing()` | Create Odoo mailing from template | Window action |
| `action_preview()` | Preview email template | URL action |
| `action_approve()` | Approve template | None |
| `get_generation_metadata_dict()` | Parse metadata JSON | dict |
| `create_new_version()` | Create new version with updates | ai.email.template |

**Relationships:**
- `campaign_id` → `ai.email.campaign` (Many2one)
- `generation_request_id` → `ai.email.generation.request` (Many2one)
- `parent_template_id` → `ai.email.template` (Many2one)
- `mailing_id` → `mailing.mailing` (Many2one)

---

### ai.email.generation.request

**Purpose:** Tracks AI generation requests for audit trail, chat history, and cost analytics.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `request_type` | Selection | Yes | generate, refine, file_upload |
| `prompt` | Text | No | User's natural language prompt |
| `uploaded_file_name` | Char | No | Uploaded file name |
| `uploaded_file_content` | Binary | No | File content |
| `uploaded_file_type` | Selection | No | json, html, markdown, text |
| `campaign_id` | Many2one | Yes | Parent campaign |
| `previous_template_id` | Many2one | No | Template being refined |
| `ai_response` | Text | No | Raw AI response |
| `generated_subject` | Char | No | AI-generated subject |
| `generated_preheader` | Char | No | AI-generated preheader |
| `generated_body_html` | Html | No | AI-generated HTML |
| `generated_body_text` | Text | No | AI-generated text |
| `result_template_id` | Many2one | No | Created template |
| `ai_model` | Char | No | Model used (gpt-4, claude-3) |
| `ai_provider` | Char | No | Provider (openai, anthropic) |
| `tokens_used` | Integer | No | Total tokens consumed |
| `tokens_prompt` | Integer | No | Prompt tokens |
| `tokens_completion` | Integer | No | Completion tokens |
| `estimated_cost` | Float | No | Estimated cost in USD |
| `request_time` | Datetime | No | When request was sent |
| `response_time` | Datetime | No | When response received |
| `duration_seconds` | Float | No | Computed: response time |
| `state` | Selection | Yes | pending, processing, completed, failed |
| `error_message` | Text | No | Error if failed |
| `user_accepted` | Boolean | No | User accepted content |
| `user_feedback` | Text | No | User feedback |
| `user_id` | Many2one | No | Requesting user |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_retry()` | Retry failed request | Window action |
| `create_template_from_response()` | Create template from AI response | ai.email.template |
| `parse_ai_response_json()` | Parse AI response as JSON | dict |
| `get_chat_message_format()` | Format for chat UI display | dict |

---

### mailing.mailing (Inherited)

**Purpose:** Extends Odoo's mailing model with AI campaign link.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ai_campaign_id` | Many2one | No | Link to AI campaign |
| `ai_template_id` | Many2one | No | Link to AI template |

---

## Controllers / API Endpoints

### AIEmailController

**File:** `controllers/ai_email_controller.py`

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/ai_email_marketing/upload` | HTTP POST | user | Upload file for AI parsing |
| `/ai_email_marketing/preview/<int:template_id>` | HTTP GET | user | Preview email template |
| `/ai_email_marketing/generate` | JSON-RPC | user | Generate email content via AI |

---

## Request/Response Examples

### POST /ai_email_marketing/upload

**Request (multipart/form-data):**
```
campaign_id: 42
file: (binary file content)
```

**Response:**
```json
{
    "success": true,
    "request_id": 123,
    "file_name": "newsletter.md",
    "file_type": "markdown"
}
```

---

### GET /ai_email_marketing/preview/123

**Response:** HTML page with rendered email preview in container.

---

### POST /ai_email_marketing/generate (JSON-RPC)

**Request:**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "campaign_id": 42,
        "prompt": "Create a promotional email for our summer sale with 30% off all items",
        "request_type": "generate",
        "previous_template_id": null
    }
}
```

**Response:**
```json
{
    "success": true,
    "request_id": 456
}
```

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│   ai.email.campaign         │
│                             │
│  - name                     │
│  - campaign_type            │
│  - target_audience          │
│  - tone                     │
│  - state                    │
└──────────┬──────────────────┘
           │
           │ One2many
           ├───────────────────────────────┐
           ▼                               ▼
┌─────────────────────────┐    ┌─────────────────────────────┐
│   ai.email.template     │    │ ai.email.generation.request │
│                         │    │                             │
│  - subject              │◄───│  - result_template_id       │
│  - preheader            │    │  - prompt                   │
│  - body_html            │    │  - request_type             │
│  - version              │    │  - tokens_used              │
│  - is_latest            │    │  - state                    │
│  - parent_template_id   │    └─────────────────────────────┘
└──────────┬──────────────┘
           │
           │ Creates
           ▼
┌─────────────────────────┐
│   mailing.mailing       │
│   (Odoo Native)         │
│                         │
│  - ai_campaign_id       │
│  - ai_template_id       │
└─────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.email.campaign` | base.group_user | Yes | Yes | Yes | Yes |
| `ai.email.campaign` | base.group_public | Yes | No | No | No |
| `ai.email.template` | base.group_user | Yes | Yes | Yes | Yes |
| `ai.email.template` | base.group_public | Yes | No | No | No |
| `ai.email.generation.request` | base.group_user | Yes | Yes | Yes | Yes |
| `ai.email.generation.request` | base.group_public | Yes | No | No | No |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `ai_email_campaign` | `ai.email.campaign` | Campaign storage |
| `ai_email_template` | `ai.email.template` | Generated templates |
| `ai_email_generation_request` | `ai.email.generation.request` | AI request tracking |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
