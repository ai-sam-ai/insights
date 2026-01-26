# Module: ai_sam_base

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_base` |
| **Version** | 18.0.2.53 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\ai_sam_base` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\ai_sam_base\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_base\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-base |
| **Status** | Active |
| **Last Verified** | 2026-01-25 |

---

## Quick Summary

ai_sam_base is the **minimal foundation module** for SAM AI - the Strategic Automation Manager built into Odoo 18. It provides the pure data layer containing 54 Python models for AI conversations, multi-provider API orchestration (Claude, OpenAI, Google, Azure), token usage tracking, cost optimization, user personalization, and context intelligence. This module contains NO UI components - it is the "brain" that other modules build upon.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo framework
- `web` - Web client framework
- `mail` - Required for ai.conversation mail.thread inheritance

### Python Libraries Required
- `httpx` - Required for external_tools.py web search functionality
- `anthropic` - Anthropic Claude SDK (optional, enhances Claude integration)

---

## For End Users (What Can This Do For Me?)

- **AI Memory**: SAM remembers your conversations and learns your preferences over time
- **Multi-Provider AI**: Connect to Claude, OpenAI, Google, Azure and more from one interface
- **Cost Control**: Automatic tracking of AI usage and spending with budget management
- **Context Awareness**: SAM knows where you are in Odoo and provides relevant help
- **Privacy First**: Your data stays in your database, with permission controls for what SAM remembers

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 54 | 47 regular, 3 abstract, 4 transient (See _SCHEMA.md) |
| Controllers | 11 | 77+ HTTP endpoints for frontend integration |
| Views | 1 | res_config_settings_views.xml only |
| JS Files | 1 | populate_services_logger.js |
| Security Rules | 70 | ir.model.access.csv + ir_rules.xml |

**Key Files:**
- `models/ai_brain.py` - THE BRAIN: Central orchestrator (197KB)
- `models/api_service_provider.py` - Multi-API orchestration (167KB)
- `models/ai_conversation.py` - Conversation threads with context
- `models/sam_user_profile.py` - User personalization and memory
- `controllers/sam_ai_chat_controller.py` - Main chat API (87KB)

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: SAM AI, conversations, AI providers, API keys, tokens, memory, context
- User wants to: configure AI, add provider, check usage, understand SAM architecture
- User mentions: ai_sam_base, brain, provider, conversation, memory, context builder

### Related Agents
- `/mod_sam` - SAM Core Infrastructure Specialist (works with this module)
- `/cto-developer` - For implementing changes to this module
- `/sam_core_chat` - For SAM's communication experience layer

### Delegate To
- `/cto` - For architecture decisions about SAM AI infrastructure
- `/cto-developer` - For implementation work on this module
- `/cto-architect` - For planning new features
- `/sam` - For user-facing SAM conversations

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/sam_ai_brain/`
- Data Flows: `docs/06_data_flows/conversation_flow/`
- UI Module: `docs/04_modules/ai_sam/`

### Related Modules
- `ai_sam` - UI layer (views, templates, JS) - **depends on this**
- `ai_sam_workflows` - Workflow automation - **depends on this**
- `ai_sam_intelligence` - Agent registry and documentation - **depends on this**
- `mail` - Odoo mail thread - **this depends on**

---

## Known Gotchas (Painfully Learned)

1. **Database Deadlock on Environment Detection** - Fixed 2025-12-04: `sam.environment` singleton must be created via data XML, not hardcoded `id=1` in create(). See Issue #44.

2. **Model name preserved for compatibility** - `ai_brain.py` defines model `ai.service` (not `ai.brain`) for backward compatibility with existing code.

3. **Provider population on init()** - `api.service.provider.init()` auto-populates vendor templates from `node_metadata.json`. If templates missing, check VendorPopulationService.

4. **No UI in this module** - This is data layer ONLY. All views/templates/menus are in `ai_sam` module. Don't add views here.

5. **post_init_hook required** - Vendor population MUST fire from ai_sam_base (not ai_sam) so it runs on upgrade.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.2.53)
- [x] Dependencies list is current (base, web, mail)
- [x] Model count matches reality (54 models)
- [x] Controller count matches reality (11 controllers)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2026-01-25 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-25 | Quality upgrade: manifest fixed, index.html updated, SCHEMA expanded to all 54 models | CTO Module Docs Agent |
| 2026-01-25 | Initial creation (four-file standard) | CTO Module Docs Agent |
