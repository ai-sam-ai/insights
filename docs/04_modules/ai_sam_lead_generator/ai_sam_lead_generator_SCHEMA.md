# Schema: ai_sam_lead_generator

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_lead_generator` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 3 + 1 inherit (ai.lead.campaign, ai.lead.industry, ai.lead.source.config + res.config.settings) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 (uses Odoo RPC) |

---

## Models

### ai.lead.campaign (Primary Model)

**Purpose:** Manages lead generation campaigns with scraping configuration and execution.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Campaign name |
| `description` | Text | No | Campaign description |
| `campaign_type` | Selection | Yes | google_search, forum_scraping, industry_specific, website_enrichment, comprehensive |
| `target_industries` | Many2many | No | Industries to target |
| `target_countries` | Many2many | No | Geographic targeting |
| `search_queries` | Text | No | Custom Google search queries |
| `max_results_per_query` | Integer | No | Max results per query (default: 20) |
| `min_lead_score` | Integer | No | Minimum score to import (default: 50) |
| `focus_on_odoo_users` | Boolean | No | Only find Odoo users (default: True) |
| `target_odoo_versions` | Char | No | Comma-separated versions to target |
| `state` | Selection | Yes | draft, running, completed, failed, cancelled |
| `total_leads_found` | Integer | No | Computed: total leads |
| `hot_leads_count` | Integer | No | Computed: hot leads |
| `warm_leads_count` | Integer | No | Computed: warm leads |
| `imported_to_crm_count` | Integer | No | Computed: imported leads |
| `started_at` | Datetime | No | Execution start time |
| `completed_at` | Datetime | No | Execution end time |
| `error_message` | Text | No | Error if failed |
| `execution_log` | Text | No | Execution log |
| `api_key` | Char | No | ScraperAPI key |
| `ai_configured` | Boolean | No | Configured via SAM AI |
| `ai_configuration` | Text | No | AI configuration JSON |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_configure_with_ai()` | Open SAM AI wizard | Window action |
| `action_run_campaign()` | Execute the campaign | Window action |
| `action_view_leads()` | View scraped leads | Window action |
| `action_import_to_crm()` | Import leads to CRM | Notification |
| `_run_google_search()` | Execute Google search | None |
| `_run_forum_scraping()` | Execute forum scraping | None |
| `_run_industry_search()` | Execute industry search | None |
| `_run_comprehensive()` | Execute all sources | None |

**Relationships:**
- `target_industries` → `ai.lead.industry` (Many2many)
- `target_countries` → `res.country` (Many2many)

---

### ai.lead.industry

**Purpose:** Industry categories for targeted lead generation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Industry name |
| `code` | Char | Yes | Industry code |
| `description` | Text | No | Description |

---

### ai.lead.source.config

**Purpose:** Stores ScraperAPI settings and data source configurations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Configuration name |
| `active` | Boolean | No | Active flag (only one can be active) |
| `scraperapi_key` | Char | Yes | ScraperAPI key |
| `scraperapi_base_url` | Char | Yes | API base URL (default: http://api.scraperapi.com) |
| `concurrent_requests` | Integer | No | Max concurrent requests (default: 10) |
| `request_delay` | Float | No | Delay between requests (default: 2.0) |
| `max_retries` | Integer | No | Max retries (default: 3) |
| `timeout` | Integer | No | Request timeout (default: 30) |
| `enable_linkedin` | Boolean | No | Enable LinkedIn (default: False) |
| `enable_github` | Boolean | No | Enable GitHub (default: True) |
| `enable_odoo_partners` | Boolean | No | Enable Odoo partners (default: True) |
| `enable_job_boards` | Boolean | No | Enable job boards (default: True) |
| `enable_forums` | Boolean | No | Enable forums (default: True) |
| `enable_google_search` | Boolean | No | Enable Google search (default: True) |
| `default_max_results` | Integer | No | Default max results (default: 20) |
| `default_min_score` | Integer | No | Default min score (default: 50) |
| `total_requests_this_month` | Integer | No | Usage tracking (readonly) |
| `api_credits_used` | Integer | No | Credits used (readonly) |
| `last_reset_date` | Date | No | Last counter reset (readonly) |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_test_api_connection()` | Test ScraperAPI | Notification |
| `action_reset_usage_counters()` | Reset monthly counters | Notification |
| `action_view_scraperapi_dashboard()` | Open ScraperAPI dashboard | URL action |
| `get_active_config()` | Get active config | ai.lead.source.config |
| `increment_usage()` | Increment usage counters | None |

---

### res.config.settings (Inherited)

**Purpose:** Add Lead Generator settings to Odoo Settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lead_gen_scraperapi_key` | Char | No | ScraperAPI key (config param) |
| `lead_gen_default_max_results` | Integer | No | Default max results |
| `lead_gen_default_min_score` | Integer | No | Default min score |

---

## Campaign Types

| Type | Code | Description |
|------|------|-------------|
| Google Search | `google_search` | Find Odoo websites via Google dorking |
| Forum Scraping | `forum_scraping` | Scrape Reddit, StackOverflow for Odoo discussions |
| Industry Specific | `industry_specific` | Target specific industries |
| Website Enrichment | `website_enrichment` | Enrich existing leads with Odoo detection |
| Comprehensive | `comprehensive` | Run all sources combined |

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│   ai.lead.campaign          │
│                             │
│  - name                     │
│  - campaign_type            │
│  - state                    │
│  - target_industries (M2M)  │────┐
│  - target_countries (M2M)   │    │
│  - api_key                  │    │
└─────────────────────────────┘    │
                                   │
                                   ▼
┌─────────────────────────────┐    ┌─────────────────────────────┐
│   ai.lead.industry          │    │       res.country           │
│                             │    │       (Odoo native)         │
│  - name                     │    │                             │
│  - code                     │    └─────────────────────────────┘
│  - description              │
└─────────────────────────────┘

┌─────────────────────────────┐
│   ai.lead.source.config     │
│                             │
│  - scraperapi_key           │
│  - enable_* toggles         │
│  - usage tracking           │
└─────────────────────────────┘

┌─────────────────────────────┐
│   ai.scraped.lead           │
│   (NOT YET IMPLEMENTED)     │
│                             │
│  - campaign_id              │
│  - name                     │
│  - website                  │
│  - odoo_detected            │
│  - lead_score               │
│  - lead_status              │
└─────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.lead.campaign` | sales_team.group_sale_salesman | Yes | Yes | Yes | No |
| `ai.lead.campaign` | sales_team.group_sale_manager | Yes | Yes | Yes | Yes |
| `ai.lead.industry` | sales_team.group_sale_salesman | Yes | No | No | No |
| `ai.lead.industry` | sales_team.group_sale_manager | Yes | Yes | Yes | Yes |
| `ai.lead.source.config` | sales_team.group_sale_salesman | Yes | No | No | No |
| `ai.lead.source.config` | sales_team.group_sale_manager | Yes | Yes | Yes | Yes |

---

## Scraper Library Classes

### GoogleSearchScraper (`lib/google_search_scraper.py`)
Performs Google dorking to find Odoo websites.

**Key Methods:**
- `scrape_all_queries()` - Run all predefined queries
- `scrape_industry_specific()` - Search by industry

### ForumScraper (`lib/forum_scraper.py`)
Scrapes forums for Odoo discussions and opportunities.

**Key Methods:**
- `scrape_all_opportunities()` - Find Odoo-related discussions

### EnhancedOdooLeadScraper (`lib/enhanced_scraper.py`)
Comprehensive multi-source scraper.

**Key Methods:**
- `run_complete_scraping()` - Execute all sources

---

## Configuration Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `lead_generator.scraperapi_key` | Empty | ScraperAPI key |
| `lead_generator.default_max_results` | 20 | Results per query |
| `lead_generator.default_min_score` | 50 | Minimum lead score |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
