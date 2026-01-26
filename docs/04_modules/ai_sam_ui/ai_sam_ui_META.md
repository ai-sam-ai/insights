# Module: ai_sam_ui

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_ui` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\ai_sam_ui` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\ai_sam_ui\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_ui\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-ui |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_ui is a private, internal-use chat interface module for Better Business Builders. It provides a public-facing SAM AI chat widget (no login required) that can be embedded on any website page via drag-and-drop snippet. Features Claude-style UI design, automatic agent switching, memory-powered responses, and session continuity. Routes through the ai_sam orchestrator for intelligent conversations.

---

## Dependencies

### Odoo Module Dependencies
- `website` - Website framework for snippets and public pages
- `ai_sam` - SAM AI orchestrator (routes /sam/public/chat/send)
- `ai_sam_base` - Core AI models (ai.conversation, ai.message)

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- **Public chat widget** - Website visitors can chat with SAM without logging in
- **Drag-and-drop placement** - Add SAM chat to any page via website builder
- **Session memory** - Conversations continue across page refreshes
- **Smart agent switching** - Automatically routes to specialist agents based on questions
- **Beautiful interface** - Claude-inspired design that looks professional

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Uses ai_sam_base models |
| Controllers | 0 | Routes through ai_sam |
| Views | 2 | Snippet template, public page template |
| JS Files | 1 | Public widget (OWL legacy) |
| SCSS Files | 1 | Claude-style theming |
| Security Rules | 2 | Public read access to conversation/message |

**Key Files:**
- `static/src/snippets/s_sam_chat/000.js` - Public chat widget logic
- `static/src/snippets/s_sam_chat/000.scss` - Claude-style UI styles
- `views/snippets.xml` - Website builder snippet registration
- `views/public_chat_templates.xml` - Standalone chat page template

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: public chat, website chat, visitor chat, no-login chat
- User wants to: add chat to website, embed SAM, public-facing AI
- User mentions: ai_sam_ui, website snippet, public widget, Claude-style

### Related Agents
- `/sam_chat` - For chat experience polish and UI improvements
- `/sam_core_chat` - For SAM's communication behavior
- `/cto-developer` - For implementation work

### Delegate To
- `/sam_chat` - For UI/UX improvements to the chat widget
- `/cto-developer` - For code changes
- `/cto-architect` - For architectural decisions about public vs private chat

---

## Cross-References

### Related Documentation
- Parent Module: `docs/04_modules/ai_sam/` (orchestrator)
- Core Module: `docs/04_modules/ai_sam_base/` (models)

### Related Modules
- `ai_sam` - Orchestrator that handles `/sam/public/chat/send` endpoint
- `ai_sam_base` - Provides ai.conversation and ai.message models
- `ai_sam_website` - Future white-label/community version (planned)

---

## Known Gotchas (Painfully Learned)

1. **Public auth required** - Security rules grant `base.group_public` read access to ai.conversation and ai.message. Without this, public users can't read their own conversations.

2. **Session persistence** - Uses localStorage to store `sam_public_session_id`. If localStorage is blocked, sessions don't persist across page refreshes.

3. **Routes through ai_sam** - This module does NOT have its own controller. It calls `/sam/public/chat/send` which is defined in ai_sam module. If ai_sam isn't installed, nothing works.

4. **Snippet registration** - The snippet appears under "Custom" group in website builder. Users need to scroll or search to find it.

5. **SCSS compilation** - Uses `web.assets_frontend` for styles. If SCSS compilation fails, the widget looks broken (no styles).

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (0 - uses ai_sam_base)
- [x] Controller count matches reality (0 - routes through ai_sam)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
