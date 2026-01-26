# Schema: ai_sam_funnels

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_funnels` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 6 (5 regular, 1 abstract) |
| **Total Controllers** | 4 |
| **API Endpoints** | 14 |
| **Wizards** | 1 |

---

## Models

### funnel.definition (Primary Model)

**Purpose:** Core sales funnel definition with pages, CRM integration, and analytics

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Funnel name (tracked) |
| `description` | Text | No | Funnel description |
| `funnel_type` | Selection | No | Type: opt_in, lead_magnet, quiz, eoi, product_launch, webinar, custom |
| `page_ids` | One2many | No | Related funnel pages |
| `page_count` | Integer | No | Computed page count (stored) |
| `template_id` | Many2one | No | Source template |
| `crm_team_id` | Many2one | No | CRM sales team for leads |
| `default_tag_ids` | Many2many | No | CRM tags for leads |
| `mailing_list_id` | Many2one | No | Mailing list for subscribers |
| `total_views` | Integer | No | Computed total page views (stored) |
| `total_conversions` | Integer | No | Computed form submissions (stored) |
| `conversion_rate` | Float | No | Computed conversion percentage (stored) |
| `state` | Selection | Yes | Status: draft, active, paused, archived |
| `ai_generated_copy` | Boolean | No | Flag for AI-generated content |
| `company_id` | Many2one | No | Company (multi-company support) |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_activate()` | Set state to active | None |
| `action_pause()` | Set state to paused | None |
| `action_archive()` | Set state to archived | None |
| `action_draft()` | Set state to draft | None |
| `_compute_page_count()` | Count pages | Updates page_count |
| `_compute_analytics()` | Aggregate page analytics | Updates views/conversions/rate |

**Inherits:** mail.thread, mail.activity.mixin

---

### funnel.page

**Purpose:** Individual pages within a funnel with analytics tracking

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Page name |
| `funnel_id` | Many2one | Yes | Parent funnel (cascade delete) |
| `sequence` | Integer | No | Page order |
| `page_type` | Selection | No | Type: squeeze, lead_magnet, sales, order, upsell, thank_you, quiz_intro, quiz_questions, quiz_gate, quiz_results, webinar_registration, webinar_confirmation, webinar_replay, custom |
| `website_page_id` | Many2one | No | Linked website.page |
| `page_url` | Char | No | URL slug |
| `full_url` | Char | No | Computed full URL |
| `snippet_config` | Text | No | JSON snippet configuration |
| `next_page_id` | Many2one | No | Next page in flow |
| `redirect_url` | Char | No | External redirect URL |
| `view_count` | Integer | No | Page views |
| `unique_visitors` | Integer | No | Unique visitor count |
| `form_submissions` | Integer | No | Form submission count |
| `conversion_rate` | Float | No | Computed conversion rate |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_full_url()` | Build complete URL | Updates full_url |
| `_compute_conversion_rate()` | Calculate form/view ratio | Updates conversion_rate |

---

### funnel.template

**Purpose:** Reusable funnel templates with page structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Template name |
| `description` | Text | No | Template description |
| `funnel_type` | Selection | Yes | Funnel type |
| `template_structure` | Text | No | JSON page structure |
| `thumbnail` | Binary | No | Preview image |
| `preview_url` | Char | No | Live preview URL |
| `usage_count` | Integer | No | Times this template used |
| `visibility` | Selection | No | private, company, public |
| `author_id` | Many2one | No | Template creator |
| `company_id` | Many2one | No | Company owner |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_create_funnel_from_template()` | Create funnel from template | Action to new funnel form |

**Template Structure JSON:**
```json
{
  "pages": [
    {
      "name": "Landing Page",
      "page_type": "squeeze",
      "url_slug": "landing",
      "redirect_to_next": true,
      "snippets": [
        {"type": "hero_full", "config": {"headline": "..."}},
        {"type": "opt_in_form", "config": {"button_text": "..."}}
      ]
    }
  ]
}
```

---

### funnel.snippet

**Purpose:** Snippet definitions with metadata for builder

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name |
| `technical_name` | Char | Yes | Internal reference |
| `sequence` | Integer | No | Sort order |
| `category` | Selection | Yes | Category: complete_funnel, hero, problem_story, solution_benefits, social_proof, offers_pricing, cta_forms, quiz, urgency_trust, utility |
| `template_xml_id` | Char | No | Qweb template reference |
| `field_schema` | Text | No | JSON field definitions |
| `thumbnail` | Binary | No | Preview image |
| `description` | Text | No | Snippet description |
| `copywriting_hints` | Text | No | SAM AI copy guidance |
| `active` | Boolean | No | Active flag |

---

### funnel.conversion

**Purpose:** Track all funnel events (views, submissions, clicks, quiz)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `funnel_id` | Many2one | Yes | Parent funnel |
| `page_id` | Many2one | Yes | Page where event occurred |
| `visitor_id` | Char | No | Cookie-based visitor ID |
| `partner_id` | Many2one | No | Linked contact |
| `event_type` | Selection | Yes | Event: page_view, form_submit, cta_click, quiz_start, quiz_complete, purchase |
| `timestamp` | Datetime | No | Event time (auto) |
| `session_data` | Text | No | JSON session data |
| `user_agent` | Char | No | Browser user agent |
| `ip_address` | Char | No | Client IP |
| `utm_source` | Char | No | UTM source |
| `utm_medium` | Char | No | UTM medium |
| `utm_campaign` | Char | No | UTM campaign |
| `utm_term` | Char | No | UTM term |
| `utm_content` | Char | No | UTM content |
| `lead_id` | Many2one | No | Created CRM lead |

---

### sam.funnel.context (Abstract Model)

**Purpose:** Provide funnel context and recommendations to SAM AI

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| N/A | Abstract | N/A | No stored fields |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `get_funnel_context()` | Get full context for SAM | dict with types, categories, endpoints |
| `_get_snippet_categories()` | Get organized snippet library | dict of category: [snippets] |
| `detect_funnel_intent()` | Check if message is funnel-related | bool |
| `get_recommended_funnel_type()` | Recommend funnel based on context | dict with type, name, reason |
| `get_snippet_suggestions()` | Get snippets for page type | list of snippet names |
| `get_copy_fields_for_snippet()` | Get fields needing copy | dict of field: description |

---

### funnel.generator.wizard (Transient)

**Purpose:** Wizard to create funnel from template with configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `template_id` | Many2one | Yes | Source template |
| `template_description` | Text | No | Related template description |
| `name` | Char | Yes | New funnel name |
| `url_prefix` | Char | No | URL prefix for pages |
| `crm_team_id` | Many2one | No | CRM team assignment |
| `default_tag_ids` | Many2many | No | CRM tags |
| `mailing_list_id` | Many2one | No | Mailing list |
| `page_preview` | Text | No | Computed preview of pages |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_generate_funnel()` | Create funnel from template | Action to funnel form |
| `_create_funnel_page()` | Create single page | funnel.page record |
| `_create_website_page()` | Create website.page with HTML | website.page record |
| `_generate_page_html()` | Build HTML from snippets | HTML string |

---

## Controllers / API Endpoints

### Form Submission Controller (`funnel_form_controller.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/funnel/form/submit` | POST | public | Handle form submission (HTTP redirect) |
| `/funnel/form/submit/ajax` | POST | public | Handle form submission (JSON response) |

### Tracking Controller (`funnel_form_controller.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/funnel/track/pageview` | POST | public | Track page view event |
| `/funnel/track/cta` | POST | public | Track CTA click event |

### Health Controller (`funnel_controller.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/funnel/health` | JSON | public | Health check endpoint |

### SAM AI API Controller (`sam_funnel_api.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/sam_ai_funnels/create` | POST | user | Create complete funnel from SAM spec |
| `/sam_ai_funnels/generate_copy` | POST | user | Generate snippet copy with AI |
| `/sam_ai_funnels/get_available_templates` | GET | user | List available templates |
| `/sam_ai_funnels/get_snippet_library` | GET | user | Get full snippet library |

### Quiz Controller (`quiz_controller.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/funnel/quiz/submit` | POST | public | Submit quiz answers and get result |
| `/funnel/quiz/track_start` | POST | public | Track quiz start event |
| `/funnel/quiz/get_result_config` | POST | public | Get custom result configuration |
| `/funnel/quiz/save_progress` | POST | public | Save quiz progress to session |
| `/funnel/quiz/get_progress` | POST | public | Retrieve saved quiz progress |

---

## Request/Response Examples

### POST /sam_ai_funnels/create

**Request:**
```json
{
  "funnel_spec": {
    "name": "Q1 Webinar Funnel",
    "funnel_type": "webinar",
    "crm_team_id": 2,
    "mailing_list_id": 3,
    "pages": [
      {
        "name": "Registration",
        "page_type": "webinar_registration",
        "url_slug": "webinar-jan-2025",
        "snippets": [
          {
            "type": "hero_full",
            "content": {
              "headline": "Free Live Training",
              "subheadline": "Learn how to grow your business",
              "cta_text": "Save My Seat"
            }
          }
        ]
      }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "funnel_id": 42,
  "funnel_url": "/webinar-jan-2025",
  "pages": [
    {"name": "Registration", "url": "/webinar-jan-2025", "page_id": 101}
  ]
}
```

### POST /funnel/form/submit/ajax

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "integration": "both",
  "funnel_id": 42,
  "page_id": 101,
  "redirect_url": "/thank-you",
  "utm_source": "facebook",
  "utm_campaign": "webinar-launch"
}
```

**Response:**
```json
{
  "success": true,
  "redirect_url": "/thank-you",
  "lead_id": 1234,
  "partner_id": 567
}
```

### POST /funnel/quiz/submit

**Request:**
```json
{
  "funnel_id": 10,
  "page_id": 55,
  "answers": [
    {"question_id": "1", "answer_value": "a"},
    {"question_id": "2", "answer_value": "b"},
    {"question_id": "3", "answer_value": "a"}
  ],
  "email": "quiz@example.com",
  "name": "Quiz Taker"
}
```

**Response:**
```json
{
  "success": true,
  "result_type": "achiever",
  "result_headline": "You are an Achiever!",
  "result_description": "You thrive on goals and results...",
  "redirect_url": "/your-results?type=achiever&name=Quiz%20Taker"
}
```

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│   funnel.definition     │
│                         │
│  - name                 │
│  - funnel_type          │
│  - state                │
│  - crm_team_id ─────────┼──────► crm.team
│  - mailing_list_id ─────┼──────► mailing.list
│  - template_id ─────────┼──────► funnel.template
└──────────┬──────────────┘
           │
           │ One2many (page_ids)
           ▼
┌─────────────────────────┐
│     funnel.page         │
│                         │
│  - funnel_id (M2O) ◄────┼──────┐
│  - page_type            │      │
│  - website_page_id ─────┼──────► website.page
│  - next_page_id ────────┼──────┘ (self-reference)
└──────────┬──────────────┘
           │
           │ One2many (implicit via conversion)
           ▼
┌─────────────────────────┐
│   funnel.conversion     │
│                         │
│  - funnel_id (M2O) ─────┼──────► funnel.definition
│  - page_id (M2O) ───────┼──────► funnel.page
│  - partner_id ──────────┼──────► res.partner
│  - lead_id ─────────────┼──────► crm.lead
│  - event_type           │
│  - utm_* fields         │
└─────────────────────────┘

┌─────────────────────────┐
│    funnel.template      │
│                         │
│  - template_structure   │ (JSON with page specs)
│  - funnel_type          │
│  - usage_count          │
└─────────────────────────┘

┌─────────────────────────┐
│    funnel.snippet       │
│                         │
│  - technical_name       │
│  - category             │
│  - copywriting_hints    │
└─────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `funnel.definition` | base.group_user | Yes | Yes | Yes | No |
| `funnel.definition` | base.group_system | Yes | Yes | Yes | Yes |
| `funnel.page` | base.group_user | Yes | Yes | Yes | No |
| `funnel.page` | base.group_system | Yes | Yes | Yes | Yes |
| `funnel.template` | base.group_user | Yes | Yes | Yes | No |
| `funnel.template` | base.group_system | Yes | Yes | Yes | Yes |
| `funnel.snippet` | base.group_user | Yes | No | No | No |
| `funnel.snippet` | base.group_system | Yes | Yes | Yes | Yes |
| `funnel.conversion` | base.group_user | Yes | No | No | No |
| `funnel.conversion` | base.group_system | Yes | Yes | Yes | Yes |
| `funnel.generator.wizard` | base.group_user | Yes | Yes | Yes | No |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `funnel_definition` | `funnel.definition` | Core funnel records |
| `funnel_page` | `funnel.page` | Funnel page records |
| `funnel_template` | `funnel.template` | Reusable templates |
| `funnel_snippet` | `funnel.snippet` | Snippet definitions |
| `funnel_conversion` | `funnel.conversion` | Event tracking data |

---

## Snippet Categories

| Category | Count | Snippets |
|----------|-------|----------|
| **Hero Sections** | 3 | hero_minimal, hero_full, hero_video |
| **Problem & Story** | 4 | problem_agitation, story_bridge, before_after, solution_reveal |
| **Solution & Benefits** | 3 | benefits_stack, features_grid, how_it_works |
| **Social Proof** | 6 | testimonial_single, testimonial_grid, testimonial_video, trust_badges, case_study_preview, stats_bar |
| **Offers & Pricing** | 5 | offer_breakdown, bonus_stack, price_reveal, pricing_table, guarantee, risk_reversal |
| **CTAs & Forms** | 5 | opt_in_form, cta_inline, cta_button_block, final_cta, ps_section |
| **Quiz Elements** | 5 | quiz_intro, quiz_question, quiz_progress, quiz_gate, quiz_results |
| **Urgency & Trust** | 3 | countdown_timer, urgency_bar, objection_handler |
| **Utility** | 5 | video_embed, spacer, divider_styled, image_text_split, bullet_list |
| **SAM AI** | 1 | sam_chat_widget (Sales Agent chat embed) |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
| 2025-01-26 | Enhanced to 10/10: Added sam_chat_widget snippet, corrected counts | CTO Module Docs Reviewer |
