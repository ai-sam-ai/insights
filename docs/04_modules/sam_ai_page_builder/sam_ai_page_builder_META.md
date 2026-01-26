# Module: sam_ai_page_builder

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_page_builder` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\sam_ai_page_builder` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\sam_ai_page_builder\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_page_builder\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-page-builder |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

sam_ai_page_builder is an AI-powered page builder embedded in the Odoo backend. Users describe what they want in natural language, and Claude AI generates complete web pages (HTML, CSS, JavaScript). Features a split-pane interface with chat panel on the left and live preview on the right. Supports page generation, refinement, and publishing to Odoo website. Uses ai_sam_base for Claude API integration.

---

## Dependencies

### Odoo Module Dependencies
- `base`, `web` - Core Odoo
- `website` - For publishing pages
- `sam_ui_theme` - UI theming variables
- `ai_sam` - SAM chat/overlay UI variables
- `ai_sam_base` - AI Brain service (Claude API integration)

### Python Libraries Required
- None additional (uses ai_sam_base for Claude API)

---

## For End Users (What Can This Do For Me?)

- **Natural language page creation** - Describe your page, AI generates it
- **Live preview** - See your page as it's being built
- **Iterative refinement** - "Make the header bigger", "Change the color to blue"
- **Multiple page types** - Landing pages, sales pages, documentation, contact forms
- **Publish to website** - Generate in backend, publish to Odoo website
- **Prompt history** - Track all AI interactions for each page

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | sam.ai.page, page_builder_tools, website_publisher |
| Controllers | 1 | sam_ai_page_controller.py |
| Views | 2 | Form view, menu |
| JS Components | 4 | split_layout, chat_panel, page_builder_panel, ai_page_service |
| CSS | 1 | page_builder.css |

**Key Files:**
- `models/sam_ai_page.py` - Page storage with HTML/CSS/JS and prompt history
- `models/page_builder_tools.py` - AI tools for page generation
- `models/website_publisher.py` - Publish to Odoo website
- `static/src/services/ai_page_service.js` - Frontend AI service
- `static/src/views/ai_page_builder_action.js` - Client action handler

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: AI page builder, generate page, create landing page with AI
- User wants to: build pages with AI, generate HTML from description
- User mentions: page builder, AI website, describe and generate

### Related Agents
- `/sam` - SAM AI chat integration
- `/cto-developer` - For implementation changes

### Delegate To
- `/cto-architect` - For architectural changes
- `/cto-developer` - For code implementation

---

## Cross-References

### Related Modules
- `ai_sam_base` - AI Brain service (required)
- `ai_sam` - SAM chat integration (required)
- `website` - Page publishing (required)
- `ai_sam_funnels` - Alternative approach (drag-drop snippets)

---

## Known Gotchas (Painfully Learned)

1. **Conversation per page** - Each page gets its own ai.conversation for context continuity

2. **Content parsing** - AI responses must use code blocks (```html, ```css, ```javascript) for proper extraction

3. **Body content only** - Generated HTML should be body content (no <html>, <head>, <body> tags)

4. **Workflow integration** - Pages can be linked to workflow nodes via workflow_node_id and workflow_id fields

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (3)
- [x] Quick summary accurately describes module

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
