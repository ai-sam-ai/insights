# Module: ai_sam_email_marketing

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_email_marketing` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_email_marketing` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_email_marketing\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_email_marketing\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-email-marketing |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_email_marketing provides AI-powered email campaign creation integrated with Odoo's native Email Marketing (mass_mailing). It features a chat-based interface for iterative email generation, file upload support (JSON/HTML/Markdown), template versioning with history, and direct integration to create Odoo mailings. The module tracks AI generation requests with full cost and performance analytics.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `mail` - Email threading
- `mass_mailing` - Odoo Email Marketing campaigns
- `ai_sam` - SAM AI core framework

### Python Libraries Required
- None additional (uses base Odoo + ai_sam dependencies)

---

## For End Users (What Can This Do For Me?)

- **Chat-based email creation** - Describe what you want, AI generates the email
- **Iterative refinement** - Keep chatting until the email is perfect
- **File upload support** - Upload JSON, HTML, or Markdown to convert to emails
- **Template history** - Track all versions and iterations
- **Direct to Odoo mailing** - One click to create a ready-to-send campaign

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | ai.email.campaign, ai.email.template, ai.email.generation.request |
| Controllers | 1 | ai_email_controller.py (3 routes) |
| Views | 4 | Campaign, template, generation request views, menus |
| JS Files | 0 | Assets commented out in manifest |
| Security Rules | 6 | User + public access for all models |

**Key Files:**
- `models/ai_email_campaign.py` - Campaign management with AI context
- `models/ai_email_template.py` - Generated templates with versioning
- `models/ai_email_generation_request.py` - AI request tracking/analytics
- `models/mailing_mailing_inherit.py` - Extends Odoo mailing
- `controllers/ai_email_controller.py` - Upload and preview routes

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: email marketing, AI emails, email campaigns, email templates, mass mailing
- User wants to: create email campaigns, generate marketing emails, AI-write emails
- User mentions: ai_sam_email_marketing, email generation, newsletter creation

### Related Agents
- `/cto-developer` - For implementation or customization work
- `/cmo` - For marketing strategy questions

### Delegate To
- `/cto` - For architecture decisions about this module
- `/cto-developer` - For implementation work
- `/cmo` - For marketing campaign strategy

---

## Cross-References

### Related Documentation
- Parent Module: `docs/04_modules/ai_sam/` (AI framework)
- Related: `docs/04_modules/mass_mailing/` (Odoo native)

### Related Modules
- `ai_sam` - Provides AI services and conversation handling
- `mass_mailing` - Odoo's email marketing (extended by this module)
- `mass_mailing_document_import` - Related document import functionality

---

## Known Gotchas (Painfully Learned)

1. **JS assets are commented out** - The chat UI components exist but are disabled in manifest
2. **Manifest needs updating** - author/website don't match SAM AI standards
3. **AI service stub** - Uses stub AI service for development (plug-and-play design)
4. **Versioning auto-marks previous** - Creating a new template marks all previous as `is_latest=False`

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (3 models + 1 inherit)
- [x] Controller count matches reality (1 controller, 3 routes)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation - four-file standard | CTO Module Docs Agent |
