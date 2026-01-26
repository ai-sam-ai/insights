# FAQ: ai_sam_base

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Base

### What is ai_sam_base?

ai_sam_base is the foundational module for SAM AI (Strategic Automation Manager) built for Odoo 18. It provides the core data layer including AI conversation storage, multi-provider API orchestration, token tracking, cost optimization, and user personalization. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_base`
- Current version: 18.0.2.53
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does ai_sam_base do?

ai_sam_base provides 5 core capabilities:

1. **Conversation Management** - Store and retrieve AI conversations with full context awareness
2. **Multi-Provider API Orchestration** - Connect to Claude, OpenAI, Google, Azure and more from one unified interface
3. **Token & Cost Tracking** - Track every API call, token usage, and associated costs
4. **User Personalization** - Store user preferences, memory permissions, and relationship data
5. **Context Intelligence** - Build comprehensive context about user's current location in Odoo

### Who is ai_sam_base for?

ai_sam_base is designed for:
- Odoo 18 users who want AI assistance integrated into their business system
- Developers building AI-powered Odoo applications
- Businesses using Odoo 18 that require a unified AI backend

### What's the difference between ai_sam_base and ai_sam?

**ai_sam_base** is the data layer - it contains all Python models, business logic, and API controllers. It has NO user interface.

**ai_sam** is the UI layer - it contains views, templates, JavaScript, CSS, and menus. It depends on ai_sam_base.

This separation (Platform Skin Architecture) allows:
- Independent testing of business logic
- UI reskinning without touching Python
- Clearer debugging (model vs. UI issues)

---

## Installation & Setup

### How do I install ai_sam_base?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "SAM AI Base"
4. Click Install
5. Configure at least one API provider (Settings > SAM AI Configuration)

### What are the dependencies for ai_sam_base?

ai_sam_base requires these Odoo modules:
- `base` - Core Odoo framework
- `web` - Web client framework
- `mail` - Required for conversation thread inheritance

Python libraries required:
- `httpx` - Required for web search functionality

Optional Python libraries:
- `anthropic` - Enhances Claude API integration (SDK features)

### How do I configure ai_sam_base?

After installation:
1. Go to Settings > SAM AI Configuration
2. Click "Add Provider" to add an AI service (Claude, OpenAI, etc.)
3. Enter your API key
4. Select service types (chat, voice, image, etc.)
5. Save and test the connection

### How do I add an API provider?

1. Go to Settings > SAM AI Configuration
2. Click "Add Provider"
3. Select vendor from templates (e.g., Anthropic Claude)
4. Choose authentication type (usually API Key)
5. Enter your API key
6. Select service type (chat)
7. Save

The provider is now available for SAM to use.

---

## Usage

### How do I start a conversation with SAM?

Once ai_sam (the UI module) is installed:
1. Click the SAM AI chat icon (bottom right of any Odoo page)
2. Type your message
3. SAM responds using your configured AI provider

### How does SAM know my context?

ai_sam_base includes `ai.context.builder` which automatically detects:
- Current Odoo menu/module
- Active record (if any)
- User's company and permissions
- Related data and relationships

This context is passed to the AI, so SAM understands what you're working on.

### Can I use multiple AI providers?

Yes. ai_sam_base supports multiple providers simultaneously. You can:
- Configure different providers for different service types (Claude for chat, Whisper for voice)
- Set a primary provider for each service type
- Let the cost optimizer automatically select the best provider

### How does memory permission work?

ai_sam_base includes three memory permission levels:
- **ask_always** (default) - SAM asks before remembering anything
- **auto_work** - SAM automatically remembers work-related facts
- **auto_all** - SAM automatically remembers everything

You control what SAM remembers about you.

---

## Troubleshooting

### Why is SAM not responding?

**Symptom:** Message sent but no response

**Cause:** Usually API provider not configured or API key invalid

**Solution:**
1. Go to Settings > SAM AI Configuration
2. Check that you have at least one active provider
3. Verify the API key is valid (test connection)
4. Check Odoo logs for API errors

### Why is "Provider not configured" appearing?

**Symptom:** Error message "No active chat provider configured with API key"

**Cause:** No active provider with chat service type and valid API key

**Solution:**
1. Go to Settings > SAM AI Configuration
2. Ensure at least one provider has:
   - `Active` checkbox checked
   - `chat` service type linked
   - Valid API key entered

### Why are conversations not loading?

**Symptom:** Chat interface shows "No conversations found"

**Cause:** User filter not applied correctly or database access issue

**Solution:**
1. Clear browser cache
2. Restart Odoo server
3. Check that current user has conversations (`ai.conversation` records with `user_id` = current user)

### ai_sam_base is not working after upgrade. What do I do?

After upgrading Odoo or ai_sam_base:
1. Clear browser cache
2. Restart Odoo server
3. Upgrade module: Apps > ai_sam_base > Upgrade
4. If issues persist, check logs at `/var/log/odoo/odoo.log`

### Why am I getting database deadlock errors?

**Symptom:** UI hangs when loading SAM for first time

**Cause:** `sam.environment` singleton not created (Issue #44, fixed 2025-12-04)

**Solution:**
1. This should be auto-fixed in version 18.0.2.0+
2. If persists, run: `self.env['sam.environment'].get_current_environment()`
3. The singleton is now created via `data/sam_environment_data.xml` on install

---

## Comparisons

### How does ai_sam_base compare to standalone AI tools (ChatGPT, Claude.ai)?

| Feature | ai_sam_base | ChatGPT/Claude.ai |
|---------|-------------|-------------------|
| Odoo Integration | Native - knows your data | None - copy/paste required |
| Memory | Persistent - remembers across sessions | Session-only (mostly) |
| Multi-Provider | Yes - use any AI from one interface | Locked to one provider |
| Cost Tracking | Automatic per-conversation | Manual/separate billing |
| Data Location | Your database | Their servers |
| Context Awareness | Automatic Odoo context | Manual context sharing |

### Why choose ai_sam_base over other Odoo AI modules?

ai_sam_base is unique because:
- **Multi-provider support** - Not locked to one AI vendor
- **Full memory system** - User personalization and learning
- **Cost optimization** - Automatic provider selection based on cost/performance
- **Platform Skin Architecture** - Clean separation of data and UI
- **77+ API endpoints** - Comprehensive REST API for custom integrations

---

## Integration

### Does ai_sam_base work with ai_sam_workflows?

Yes. When ai_sam_workflows is installed:
- Conversations can be linked to workflow nodes
- SAM can discuss specific nodes contextually
- Workflow execution data is stored in ai_sam_base models

### Does ai_sam_base work with ai_sam_intelligence?

Yes. ai_sam_intelligence adds:
- Agent registry (multiple specialized AI agents)
- Documentation intelligence
- Enhanced context awareness

All agent data is stored in ai_sam_base models.

### Can I use ai_sam_base with external services?

Yes. ai_sam_base integrates with:
- **AI Providers:** Claude, OpenAI, Google Gemini, Azure OpenAI
- **Voice:** Whisper (transcription)
- **Vector DBs:** ChromaDB (memory search)
- **Graph DBs:** Apache AGE (relationship graphs)
- **External APIs:** Any REST API via api.service.provider

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database. ai_sam_base does not send data to external servers except when calling AI APIs (which you configure). Conversation content is sent to your chosen AI provider for processing.

### Can I export my data from ai_sam_base?

Yes. You can export data via:
- Odoo's built-in export (list views > Export)
- API endpoints: `/sam_ai/chat/conversations`
- Direct database queries

### How do I delete my data?

To remove all ai_sam_base data:
1. Delete conversations: Settings > SAM AI > Conversations > Delete
2. Delete user profile: Automatic on user deletion
3. Uninstalling the module will DELETE all related data

### Does SAM share my data with third parties?

Only when you explicitly configure it. Conversation content is sent to the AI provider you choose (Anthropic, OpenAI, etc.) for processing. No other data sharing occurs.

---

## Pricing & Licensing

### Is ai_sam_base free?

ai_sam_base is licensed under LGPL-3. This means:
- Free to use and modify
- Must share modifications under same license
- Can be used in commercial products

### Do I need a SAM AI subscription?

No subscription required for ai_sam_base itself. However, you need:
- API keys from your chosen AI providers (paid separately)
- Odoo 18.0+ (Community or Enterprise)

### What are the AI API costs?

Costs depend on your chosen provider(s):
- **Claude:** ~$3-15 per million tokens
- **OpenAI:** ~$5-60 per million tokens
- **Google:** ~$0.50-7 per million tokens

ai_sam_base tracks all costs automatically in `ai.token.usage`.

---

## Support

### Where can I get help with ai_sam_base?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-base
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.2.53)
   - Odoo version
   - Steps to reproduce
   - Error messages (if any)
   - Relevant log entries

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Environment deadlock on first load | Fixed in 18.0.2.0+ | Upgrade module |
| Vendor templates not populating | Fixed in 18.0.2.50+ | Run `/sam_ai/services/populate` endpoint |
| OAuth callback on some providers | Open | Use API key auth instead |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.2.53 | 2026-01-19 | Removed samai_python_dependencies, use external_dependencies |
| 18.0.2.50 | 2025-12-27 | Fixed duplicate vendor registrations |
| 18.0.2.0 | 2025-12-04 | Fixed environment deadlock (Issue #44) |
| 18.0.1.0 | 2025-11-28 | Platform Skin Architecture - split from ai_brain |

---

*Last updated: 2026-01-25*
*Part of SAM AI by SME.ec*
