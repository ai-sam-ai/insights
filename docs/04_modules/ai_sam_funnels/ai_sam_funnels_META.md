# Module: ai_sam_funnels

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_funnels` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\ai_sam_funnels` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\ai_sam_funnels\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_funnels\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-funnels |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_funnels is a sales funnel builder module for Odoo 18 that adds a FUNNELS tab to the website builder with 41 drag-and-drop funnel snippets and 6 complete funnel templates. It provides native CRM and mailing list integration, conversion tracking with UTM support, quiz funnel capabilities, and SAM AI-powered copy generation. Users can build complete sales funnels (opt-in, lead magnet, webinar, quiz, product launch) without writing code.

---

## Dependencies

### Odoo Module Dependencies
- `website` - Website builder integration
- `crm` - Lead creation and CRM team assignment
- `mass_mailing` - Mailing list subscriber management
- `utm` - UTM tracking for source/medium/campaign
- `ai_sam_base` - Required for Sales Agent chat widget (SAM AI brain)

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- **Build sales funnels visually** - Drag-and-drop 38 conversion-optimized snippets into pages
- **Capture leads automatically** - Forms create CRM leads and add subscribers to mailing lists
- **Track conversions** - See page views, form submissions, and conversion rates per funnel
- **Use proven templates** - Start with 6 ready-made funnel templates (opt-in, webinar, quiz, etc.)
- **Let SAM write your copy** - AI-powered copywriting for headlines, benefits, and CTAs

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 6 | 5 regular + 1 abstract (See _SCHEMA.md) |
| Controllers | 4 | Form, tracking, SAM API, quiz endpoints |
| Views | 10+ | Form, tree, dashboard, menu views |
| Snippets | 41 | XML templates + SCSS + JS |
| Wizards | 1 | Funnel generator from template |
| Security Rules | 11 | ir.model.access.csv |

**Key Files:**
- `models/funnel_definition.py` - Core funnel model with CRM/mailing integration
- `models/funnel_page.py` - Page definitions with analytics
- `models/sam_funnel_context.py` - SAM AI context and recommendations
- `controllers/funnel_form_controller.py` - Form submission with lead/subscriber creation
- `controllers/sam_funnel_api.py` - API for SAM to create funnels programmatically
- `controllers/quiz_controller.py` - Quiz submission and result calculation
- `wizards/funnel_generator_wizard.py` - Template-based funnel generation

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: funnels, landing pages, squeeze pages, opt-in forms, lead magnets
- User wants to: build a funnel, create landing page, capture leads, track conversions
- User mentions: conversion rate, email capture, webinar signup, quiz funnel
- User says: "help me sell", "build a sales page", "collect emails"

### Related Agents
- `/sam` - Can use this module to build funnels via conversation
- `/cto-developer` - For implementation changes to funnel code
- `/cmo` - For funnel strategy and copywriting guidance

### Delegate To
- `/cto-architect` - For major architectural changes to funnel system
- `/cto-developer` - For code implementation and bug fixes
- `/cmo` - For funnel strategy, copywriting templates, conversion optimization

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/website_integration/`
- Data Flows: `docs/06_data_flows/lead_capture/`

### Related Modules
- `website` - Base website functionality (depends on)
- `crm` - Lead management (depends on)
- `mass_mailing` - Email subscriber lists (depends on)
- `utm` - Traffic source tracking (depends on)
- `ai_sam` - SAM AI chat integration (optional, for copy generation)
- `ai_sam_base` - SAM brain for context (required for chat widget)

---

## Known Gotchas (Painfully Learned)

1. **Template rendering fallback** - If Qweb template rendering fails, wizard uses fallback HTML. Check logs for "Error rendering snippet" warnings.

2. **Mailing list vs CRM integration** - Form `integration` attribute controls whether leads go to CRM only (`crm`), mailing list only (`mailing`), or both (`both`). Default is `crm`.

3. **Quiz result types** - Default quiz scoring uses simple letter counting (a, b, c, d). Custom result configs require `quiz_result_config` JSON field on funnel.definition (not yet in model fields).

4. **Page URL conflicts** - `page_url` must be unique. If wizard creates page with duplicate URL, website.page creation will fail.

5. **Snippet CSS specificity** - Each snippet has its own SCSS file in `static/src/snippets/{name}/000.scss`. Odoo compiles these into frontend bundle.

6. **SAM funnel knowledge file** - `data/sam_funnel_knowledge.xml` is NOT loaded via manifest because it depends on `ai_sam.sam_agent_definition`. Must be loaded manually after ai_sam installation.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (6)
- [x] Controller count matches reality (4)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Docs Reviewer (enhanced to 10/10)

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
