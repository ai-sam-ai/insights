# Schema: sam_ai_page_builder

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `sam_ai_page_builder` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 3 |
| **Total Controllers** | 1 |
| **Client Actions** | 1 |

---

## Models

### sam.ai.page (Primary)

**Purpose:** Store AI-generated pages with HTML, CSS, JS and prompt history

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Page name |
| `description` | Text | No | Page purpose description |
| `page_html` | Text | No | Generated HTML content |
| `page_css` | Text | No | Generated CSS styles |
| `page_js` | Text | No | Generated JavaScript |
| `ai_prompt_history` | Text | No | JSON-encoded prompt/response history |
| `state` | Selection | Yes | draft / generated / published |
| `active` | Boolean | No | Archive flag |
| `prompt_count` | Integer | No | Computed: number of prompts |
| `has_content` | Boolean | No | Computed: has any generated content |
| `workflow_node_id` | Char | No | Linked workflow node ID |
| `workflow_id` | Integer | No | Linked workflow ID |
| `conversation_id` | Many2one | No | AI conversation for context |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `generate_with_ai()` | Generate page from description | dict with success, page_id, html/css/js |
| `refine_with_ai()` | Refine existing page | dict with success, page_id, html/css/js |
| `add_prompt_to_history()` | Log prompt/response pair | True |
| `get_prompt_history()` | Get history as list | list of dicts |
| `clear_prompt_history()` | Clear all history | True |
| `action_generate()` | Open page builder UI | Client action |
| `action_set_draft/generated/published()` | Set state | None |
| `_get_or_create_conversation()` | Get conversation for AI context | ai.conversation |
| `_build_generation_prompt()` | Build AI prompt | str |
| `_build_refinement_prompt()` | Build refinement prompt | str |
| `_parse_ai_generated_content()` | Extract HTML/CSS/JS from response | dict |

---

### page_builder_tools

**Purpose:** AI tools for page generation and refinement

*Provides tool definitions for the AI service to call when generating pages.*

---

### website_publisher

**Purpose:** Publish sam.ai.page to Odoo website

*Handles creating website.page and ir.ui.view records from generated content.*

---

## API Endpoints

### sam_ai_page_controller.py

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai_page/generate` | POST | user | Generate page from description |
| `/sam_ai_page/refine` | POST | user | Refine existing page |
| `/sam_ai_page/publish` | POST | user | Publish to website |
| `/sam_ai_page/get` | GET | user | Get page content |

---

## Page Types

| Type | Description |
|------|-------------|
| `landing` | Landing page |
| `sales` | Sales page |
| `product` | Product page |
| `about` | About page |
| `contact` | Contact page |
| `documentation` | Documentation page |
| `custom` | Custom page |

---

## Page States

| State | Description |
|-------|-------------|
| `draft` | Initial state, no content |
| `generated` | AI has generated content |
| `published` | Published to website |

---

## Prompt History Format

```json
[
  {
    "type": "prompt",
    "content": "Create a landing page for...",
    "timestamp": "2025-01-26T10:00:00",
    "user_id": 2,
    "user_name": "Admin"
  },
  {
    "type": "response",
    "content": {
      "html": "<section>...</section>",
      "css": ".hero { ... }",
      "js": ""
    },
    "timestamp": "2025-01-26T10:00:05"
  }
]
```

---

## Frontend Components

### Client Action: sam_ai_page_builder

Split-pane interface with:
- **Left panel:** Chat interface for AI interaction
- **Right panel:** Live preview of generated page

### Components

| Component | Purpose |
|-----------|---------|
| `split_layout` | Resizable split-pane container |
| `chat_panel` | Chat UI for prompts and responses |
| `page_builder_panel` | Preview iframe with controls |

### Services

| Service | Purpose |
|---------|---------|
| `ai_page_service` | Frontend AI service calling backend |

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `sam.ai.page` | base.group_user | Yes | Yes | Yes | Yes |

---

## AI Integration

### Generation Flow

1. User enters description in chat panel
2. Frontend calls `/sam_ai_page/generate`
3. Backend calls `generate_with_ai()` method
4. Method creates/gets ai.conversation
5. Sends prompt to AI service with page builder system prompt
6. Parses response for HTML/CSS/JS code blocks
7. Saves to sam.ai.page record
8. Returns content to frontend for preview

### Refinement Flow

1. User requests change (e.g., "Make header bigger")
2. Frontend calls `/sam_ai_page/refine` with current content
3. Backend sends refinement prompt with current HTML/CSS
4. AI returns updated content
5. Saves and displays updated preview

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
