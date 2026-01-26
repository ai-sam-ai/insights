# Module: ai_sam

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam` |
| **Display Name** | SAM AI UI |
| **Version** | 18.0.7.14 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\ai_sam` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\ai_sam\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam |
| **Status** | Active |
| **Architecture** | Platform Skin (UI-only layer) |
| **Last Verified** | 2026-01-25 |

---

## Quick Summary

`ai_sam` is the **UI Platform Skin** for SAM AI - the comprehensive AI-powered interface for Odoo 18. Following the Platform Skin Architecture, this module contains **NO Python business logic** (all models/controllers are in `ai_sam_base`) and focuses exclusively on delivering an exceptional user experience through views, JavaScript, CSS, and static assets.

**Key distinction:** This is a UI-only module with 629 files including 18 view XMLs, 18+ JavaScript files (9,056 lines in chat alone), 8 CSS files, and 203 API vendor icon directories.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo core
- `web` - Web framework
- `ai_sam_base` - Data layer (43 models, 67 endpoints) **REQUIRED**
- `sam_ui_theme` - Brand variables CSS (loaded first)
- `ai_sam_cache_manager` - Caching infrastructure

### Python Libraries Required
- None additional (UI-only module)
- All Python dependencies handled by `ai_sam_base`

---

## For End Users (What Can This Do For Me?)

- **Chat with AI directly in Odoo** - Multi-tab conversations with streaming responses, memory context, and markdown rendering
- **Visualize your AI's memory** - See graph connections between conversations, entities, and knowledge with vis.js
- **Build visual workflows** - Drag-and-drop canvas for creating N8N-compatible automation workflows
- **Manage 203+ AI providers** - Configure Claude, OpenAI, Google, and 200+ other providers with encrypted API keys
- **Track AI costs** - Per-model, per-user cost intelligence with budget alerts and optimization recommendations

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | UI-only (all in ai_sam_base) |
| Controllers | 0 | UI-only (all in ai_sam_base) |
| Views | 20 | 15 main + 5 memory views |
| JS Files | 25 | 9,056 lines in chat, Canvas Framework, widgets |
| CSS Files | 10 | SAM AI brand (Blue #4A90E2, Gold #F4C430) |
| Security Rules | 20 | UI-related access rules |
| Vendor Icons | 206 | API provider directories |

**Key Files:**
- `static/src/js/sam_chat_vanilla_v2.js` - Main chat interface (9,056 lines, Vanilla JS)
- `static/src/core/canvas_engine.js` - Canvas rendering engine
- `static/src/core/platform_loader.js` - Platform-specific adapters
- `views/sam_ai_menus_consolidated.xml` - Single source of truth for all menus
- `views/api_service_provider_views.xml` - 8-tab API configuration wizard
- `hooks.py` - Mode registry refresh (only Python in module)

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: SAM chat interface, chat bubble, chat UI, conversation tabs
- User asks about: memory dashboard, graph visualization, vis.js
- User asks about: canvas, workflow builder, N8N canvas
- User asks about: API provider icons, vendor library, provider configuration UI
- User asks about: token counter, cost display, chat widgets
- User mentions: ai_sam views, ai_sam JavaScript, ai_sam CSS

### Related Agents
- `/sam_chat` - Specialist for chat UI/JS/CSS polish
- `/sam_core_chat` - SAM's complete communication experience
- `/mod_sam` - Core infrastructure specialist (includes ai_sam_base)

### Delegate To
- `/cto-developer` - For JavaScript/CSS implementation work
- `/cto-architect` - For architecture decisions about UI patterns
- `/mod_sam` - For questions about ai_sam_base models/controllers
- `/mod_workflows` - For workflow canvas functionality

### Critical Architecture Note
**ai_sam is UI-ONLY.** All Python code (models, controllers, services) is in `ai_sam_base`. If an agent needs to modify business logic, they must work in ai_sam_base, not here.

---

## Cross-References

### Data Flow Diagrams
- **Chat Message Flow:** `docs/05_how_sam_works/chat_message_flow/` - Complete flow from user input to AI response (sequence + context assembly diagrams)
- **API Infrastructure:** `docs/05_how_sam_works/sam_ai_api_infrastructure/` - HTTP controllers, session management, AI provider routing, tool execution (7 Mermaid diagrams)

### Related Documentation
- How SAM Works: `docs/05_how_sam_works/`
- Data Layer: `docs/04_modules/ai_sam_base/`
- Workflows: `docs/04_modules/ai_sam_workflows/`

### Related Modules
- `ai_sam_base` - **REQUIRED** - Data layer with 43 models, 67 HTTP endpoints
- `sam_ui_theme` - **REQUIRED** - Brand CSS variables (loaded first)
- `ai_sam_cache_manager` - **REQUIRED** - Caching infrastructure
- `ai_sam_workflows` - Optional - Extended workflow automation features

### Module Relationship Diagram
```
ai_sam_base (Python: models, controllers, services)
     ↑
     │ depends
     │
ai_sam (UI: views, JS, CSS, assets)  ← YOU ARE HERE
     ↑
     │ depends
     │
[Branch modules: ai_creatives, ai_odoo_blogger, etc.]
```

---

## Known Gotchas (Painfully Learned)

1. **No Python allowed** - This is a UI-only module. If you add models/controllers here, you're violating the Platform Skin Architecture. Use ai_sam_base instead.

2. **sam_config.js moved to backend assets** - As of 2026-01-02, `sam_config.js`, `sam_logger.js`, and `sam_chat_overlay.js` were moved from `web.assets_web` to `web.assets_backend` because they use Odoo backend imports (`@web/core/network/rpc`) that break on public website pages (broke website_slides).

3. **Vanilla JS, not OWL** - The chat interface uses Proxy-based vanilla JavaScript (9,056 lines), NOT OWL framework. This was a deliberate decision for simplicity and maintainability. Don't convert to OWL.

4. **Menu consolidation** - All menus are in `sam_ai_menus_consolidated.xml` (single source of truth since 2025-10-25). Don't create menus elsewhere.

5. **Hooks.py exception** - The only Python file is `hooks.py` for post-init/update hooks to refresh Mode Registry. This is necessary because .md prompt files live in ai_sam (installed AFTER ai_sam_base).

6. **Brand variables in sam_ui_theme** - CSS brand variables (#714B67 purple) come from `sam_ui_theme` module which must load FIRST. Don't duplicate brand variables here.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.7.14)
- [x] Dependencies list is current
- [x] Model count matches reality (0 - UI only)
- [x] Controller count matches reality (0 - UI only)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant
- [x] Manifest author/maintainer updated to standards

**Last Verification:** 2026-01-25 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Added data flow cross-references (chat_message_flow, api_infrastructure) | SAM Architect |
| 2026-01-25 | Initial four-file documentation standard | CTO Module Docs Agent |
| 2026-01-02 | Moved config/logger/overlay to backend assets | Developer |
| 2025-12-27 | Refactored hooks.py - vendor population to ai_sam_base | Developer |
| 2025-11-30 | Platform Skin Architecture - all Python moved to ai_sam_base | Developer |
| 2025-10-25 | Menu consolidation - single source of truth | Developer |
