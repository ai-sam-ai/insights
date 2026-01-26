# Module: ai_sam_lead_generator

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_lead_generator` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_lead_generator` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_lead_generator\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_lead_generator\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-lead-generator |
| **Status** | Active (Development) |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_lead_generator is a Sales/CRM lead generation module that uses web scraping (via ScraperAPI) to find potential customers. It specifically targets companies using Odoo by scraping Google searches, forums (Reddit/StackOverflow), job boards, GitHub, and Odoo partner directories. Campaigns can be configured by AI through SAM chat, with lead scoring and qualification built-in.

**Note:** The `ai.scraped.lead` model is not yet implemented - leads are found but record creation is stubbed.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `mail` - Email threading
- `sales_team` - Sales team access groups

### Python Libraries Required
- `requests` - HTTP calls to ScraperAPI

### External Services
- **ScraperAPI** (https://scraperapi.com) - Web scraping API (required, paid service)

---

## For End Users (What Can This Do For Me?)

- **Find Odoo users automatically** - Discover companies running Odoo for upgrade/migration sales
- **Multi-source scraping** - Google search, forums, GitHub, job boards, Odoo partners
- **Lead scoring** - AI-powered qualification with hot/warm/cold classification
- **CRM integration** - Import qualified leads directly to Odoo CRM
- **Industry targeting** - Focus on specific industries

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | ai.lead.campaign, ai.lead.industry, ai.lead.source.config |
| Controllers | 0 | No REST endpoints |
| Views | 3 | Campaign, config views, menus |
| JS Files | 0 | None |
| Security Rules | 6 | Sales user + manager access |
| Lib Files | Multiple | Scraper classes in /lib folder |

**Key Files:**
- `models/ai_lead_campaign.py` - Campaign management and execution
- `models/ai_lead_source_config.py` - ScraperAPI configuration
- `models/ai_lead_industry.py` - Industry targeting
- `lib/google_search_scraper.py` - Google dorking for Odoo sites
- `lib/forum_scraper.py` - Reddit/StackOverflow scraping
- `lib/enhanced_scraper.py` - Comprehensive multi-source scraper

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: lead generation, finding customers, scraping, ScraperAPI, finding Odoo users
- User wants to: generate leads, find prospects, scrape websites, run campaigns
- User mentions: ai_sam_lead_generator, lead scraper, prospect finder

### Related Agents
- `/cto-developer` - For implementation or customization work
- `/mod_scrapper` - Specialist agent for this module

### Delegate To
- `/cto` - For architecture decisions about this module
- `/cto-developer` - For implementation work
- `/mod_scrapper` - For scraping configuration and troubleshooting

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/` (no specific doc yet)

### Related Modules
- `crm` (Odoo native) - Lead import target
- `sales_team` - Access control groups

---

## Known Gotchas (Painfully Learned)

1. **ai.scraped.lead model not implemented** - The lead records model is stubbed, records aren't created yet
2. **ScraperAPI required** - Module won't work without a valid ScraperAPI key
3. **Website enrichment requires CRM** - The enrichment campaign type needs CRM module installed
4. **Rate limiting critical** - ScraperAPI has limits; use request_delay and max_retries
5. **Manifest needs updating** - author/website don't match SAM AI standards

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (3 models)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation - four-file standard | CTO Module Docs Agent |
