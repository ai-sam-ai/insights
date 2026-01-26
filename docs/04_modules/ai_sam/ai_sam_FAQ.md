# FAQ: ai_sam

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI

### What is ai_sam?

ai_sam is the **UI Platform Skin** module for SAM AI - a comprehensive AI-powered interface for Odoo 18. It provides the chat interface, memory dashboard, workflow canvas, and all visual components for interacting with AI inside Odoo.

**Key facts:**
- Technical name: `ai_sam`
- Current version: 18.0.7.14
- Requires: Odoo 18.0+, ai_sam_base module
- License: LGPL-3
- Architecture: UI-only (Platform Skin pattern)

### What does ai_sam do?

ai_sam provides the complete user interface for SAM AI:

1. **Chat Interface** - Multi-tab AI conversations with streaming responses, memory integration, and markdown rendering
2. **Memory Dashboard** - Visualize AI knowledge as a graph, search past conversations, manage team access
3. **Workflow Canvas** - Drag-and-drop visual automation builder (N8N-compatible)
4. **API Provider Management** - Configure 206+ AI providers with 8-tab wizard
5. **Cost Intelligence** - Track AI spending per model, user, and conversation
6. **MCP Server Generation** - Create standalone servers for Claude Desktop integration

### Who is ai_sam for?

ai_sam is designed for:
- Business owners who want AI that understands their Odoo data
- Teams who need to share AI conversations and insights
- Operations managers automating workflows without code
- Finance teams tracking and controlling AI spending
- Anyone using Odoo 18 who wants integrated AI capabilities

### What's the difference between ai_sam and ai_sam_base?

| Module | Purpose | Contains |
|--------|---------|----------|
| **ai_sam** (this module) | UI layer | Views, JavaScript, CSS, static assets |
| **ai_sam_base** | Data layer | Python models, controllers, business logic |

This separation follows the **Platform Skin Architecture** - you can update the UI without touching business logic, and vice versa.

---

## Installation & Setup

### How do I install ai_sam?

1. Ensure Odoo 18.0+ is running
2. Install required modules **in order**:
   - `ai_sam_base` (data layer) - FIRST
   - `sam_ui_theme` (brand styling)
   - `ai_sam_cache_manager` (caching)
   - `ai_sam` (UI layer) - LAST
3. Navigate to Apps menu, search for "SAM AI UI"
4. Click Install
5. Configure at least one API provider (SAM AI > Configuration > API Providers)

### What are the dependencies for ai_sam?

**Required Odoo modules:**
- `base` - Odoo core
- `web` - Web framework
- `ai_sam_base` - Data layer (43 models, 67 endpoints)
- `sam_ui_theme` - Brand CSS variables
- `ai_sam_cache_manager` - Caching infrastructure

**Python libraries:**
- None additional (ai_sam is UI-only)
- All Python dependencies handled by ai_sam_base

**External services (via ai_sam_base):**
- ChromaDB - Vector database for semantic search
- PostgreSQL with Apache AGE - Graph database for relationships

### How do I configure an API provider?

After installation:
1. Go to SAM AI > Configuration > API Providers
2. Click "Create"
3. Complete the 8-tab wizard:
   - **General:** Name, provider type, status
   - **Authentication:** API key (encrypted storage)
   - **Models:** Select available AI models
   - **Endpoints:** Configure base URL
   - **Rate Limits:** Set request throttling
   - **Cost:** Enter pricing (tokens per million)
   - **Advanced:** Timeouts, retries, headers
   - **Testing:** Test connection
4. Click "Save"

### Why do I need to install modules in a specific order?

The SAM AI ecosystem has dependencies:
- `ai_sam_base` defines all models and controllers
- `sam_ui_theme` provides CSS variables used by ai_sam
- `ai_sam_cache_manager` provides caching infrastructure
- `ai_sam` depends on all of the above

Installing out of order will fail with missing dependency errors.

---

## Usage

### How do I start a chat conversation?

Two ways to start chatting:

1. **Chat Bubble:** Click the floating SAM bubble in the bottom-right corner
2. **Menu:** Navigate to SAM AI > Chat > New Conversation

Then simply type your message and press Enter or click Send.

### How do I use multiple conversation tabs?

1. Open the chat interface
2. Click the "+" button to create a new tab
3. Each tab maintains its own conversation context
4. Switch between tabs by clicking them
5. Close tabs with the "x" button (conversation is saved)

### How do I search my chat history?

1. Navigate to SAM AI > Chat > Conversation History
2. Use the search bar for keyword search
3. Or go to SAM AI > Memory > Dashboard for semantic search
4. The memory system searches by meaning, not just exact words

### How do I view the memory graph?

1. Navigate to SAM AI > Memory > Dashboard
2. Click "View Graph" button
3. The vis.js visualization shows:
   - **Nodes:** Entities (people, topics, concepts)
   - **Edges:** Relationships between entities
4. Click any node to see details and connected memories

### How do I configure cost tracking?

Cost tracking is automatic once you configure pricing:
1. Go to SAM AI > Configuration > API Providers
2. Edit your provider
3. In the "Cost" tab, enter:
   - Input token cost per million
   - Output token cost per million
4. View costs at SAM AI > Reports > Cost Analysis

### Can I use ai_sam with multiple AI providers?

Yes! You can configure unlimited providers:
- Add Claude, OpenAI, Google, and 200+ others
- Each provider has separate API keys and settings
- Switch between providers per conversation
- Cost tracking works across all providers

---

## Troubleshooting

### Why is the chat interface not loading?

**Symptom:** Blank screen or loading spinner that never completes

**Common causes:**
1. **Missing ai_sam_base:** The data layer must be installed first
2. **No API provider configured:** Configure at least one provider
3. **JavaScript error:** Check browser console (F12 > Console)
4. **Cache issue:** Clear browser cache and reload

**Solution:**
1. Verify ai_sam_base is installed: Apps > search "ai_sam_base"
2. Check API providers: SAM AI > Configuration > API Providers
3. Clear browser cache: Ctrl+Shift+Delete
4. If issues persist, check Odoo logs for errors

### Why are my AI responses slow or not streaming?

**Symptom:** Long delay before response, or response appears all at once

**Causes:**
1. **Network proxy blocking SSE:** Streaming uses Server-Sent Events
2. **API provider rate limiting:** Check your provider's limits
3. **Large context window:** Too much history being sent

**Solutions:**
1. Check if nginx/reverse proxy allows SSE (needs `proxy_buffering off`)
2. Reduce rate limit settings in provider configuration
3. Start a new conversation to reduce context size

### Why is the memory graph not showing data?

**Symptom:** Empty graph or "No data" message

**Causes:**
1. **No conversations yet:** Memory builds from chat history
2. **ChromaDB not running:** Vector database required
3. **Apache AGE not installed:** Graph extension required

**Solutions:**
1. Have some conversations first - memory populates automatically
2. Verify ChromaDB: `curl http://localhost:8000/api/v1/heartbeat`
3. Check Apache AGE: `SELECT * FROM ag_catalog.ag_graph;` in PostgreSQL

### Why can't I see the chat bubble?

**Symptom:** No floating bubble in bottom-right corner

**Causes:**
1. **Bubble disabled in settings:** Check user preferences
2. **CSS conflict:** Another module overriding styles
3. **JavaScript error:** Check browser console

**Solutions:**
1. Go to SAM AI > Configuration > User Settings > Enable chat bubble
2. Check for CSS conflicts in browser DevTools
3. Clear cache and reload

### Why are my API keys not working?

**Symptom:** "Authentication failed" or "Invalid API key" errors

**Causes:**
1. **Incorrect key:** Copy-paste error
2. **Key expired:** Provider revoked the key
3. **Wrong endpoint:** Base URL misconfigured

**Solutions:**
1. Re-enter the API key carefully (copy from provider dashboard)
2. Generate a new key from your provider's console
3. Verify base URL matches provider documentation
4. Use the "Testing" tab to validate connection

---

## Comparisons

### How does ai_sam compare to using ChatGPT directly?

| Feature | ai_sam | ChatGPT |
|---------|--------|---------|
| Odoo Integration | Native - sees your data | None - manual copy/paste |
| Memory | Persistent across sessions | Limited, resets |
| Multi-Provider | 203 providers | OpenAI only |
| Cost Tracking | Per-model, per-user | Basic usage page |
| Team Sharing | Workspaces and roles | Team plans (separate) |
| Self-Hosted | Yes, full control | No, cloud only |
| Business Context | Knows your Odoo data | Requires explanation |

### How does ai_sam compare to other Odoo AI modules?

| Feature | ai_sam | Generic Odoo AI |
|---------|--------|-----------------|
| Memory System | Dual DB (Vector + Graph) | Usually none |
| Visual Workflows | N8N-compatible canvas | Rarely available |
| Provider Support | 203 vendors | 1-3 vendors |
| Cost Intelligence | Full tracking | Usually none |
| UI Quality | 9,056 lines of polished JS | Basic interfaces |
| Architecture | Platform Skin (maintainable) | Monolithic |

### Why use ai_sam instead of building my own integration?

ai_sam provides:
- **629 files** of production-ready code
- **203 provider integrations** pre-built
- **Dual memory system** (ChromaDB + Apache AGE)
- **Cost tracking** and budget alerts
- **Team collaboration** features
- **Continuous updates** from SME.ec

Building this yourself would take months of development time.

---

## Integration

### Does ai_sam work with ai_sam_workflows?

Yes! When both modules are installed:
- Visual workflow canvas appears in SAM AI > Workflows
- Workflows can include AI nodes that use SAM AI
- Execution logs visible in the UI
- N8N-compatible JSON export/import

### Can I use ai_sam with Claude Desktop via MCP?

Yes! ai_sam includes MCP Server Generation:
1. Go to SAM AI > Configuration > MCP Servers
2. Create a new server config
3. Select which Odoo models to expose
4. Generate the server script
5. Deploy and configure Claude Desktop to connect

This allows Claude Desktop to directly query your Odoo data.

### Does ai_sam integrate with other Odoo modules?

ai_sam provides AI capabilities for any Odoo module through ai_sam_base. Common integrations:
- **CRM:** AI-powered lead analysis
- **Sales:** Quote recommendations
- **Inventory:** Demand forecasting
- **HR:** Resume screening

The memory system automatically learns from all Odoo data you discuss.

---

## Data & Privacy

### Where is my data stored?

All data is stored in:
- **PostgreSQL:** Your Odoo database (conversations, settings)
- **ChromaDB:** Vector embeddings for semantic search
- **Apache AGE:** Graph relationships in PostgreSQL

Data stays on your infrastructure. No data is sent to external servers unless you explicitly configure an AI provider, and then only the messages you send are transmitted.

### Can I export my data from ai_sam?

Yes. You can export data via:
- Odoo's built-in export (list views > Export)
- Memory Dashboard > Export button
- Direct database access (PostgreSQL)
- API endpoints in ai_sam_base

### How do I delete my AI memory?

1. Navigate to SAM AI > Memory > Dashboard
2. Select memories to delete
3. Click "Delete Selected"

Or for complete removal:
1. Go to SAM AI > Memory > Settings
2. Click "Clear All Memory"
3. Confirm deletion

**Note:** Uninstalling the module does NOT delete the data. Use the clear function first.

### Are my API keys secure?

Yes. API keys are:
- Encrypted before storage in database
- Never logged or exposed in UI
- Transmitted only to the respective provider
- Accessible only to authorized users (security rules)

---

## Pricing & Licensing

### Is ai_sam free?

ai_sam is licensed under **LGPL-3**, which means:
- Free to use and modify
- Free for commercial use
- Must share modifications under same license
- No warranty provided

### Do I need to pay for AI providers?

Yes. ai_sam connects to external AI providers (Claude, OpenAI, Google, etc.) which have their own pricing. ai_sam helps you:
- Track costs in real-time
- Compare provider pricing
- Set budget alerts
- Choose cost-effective models

### Is there a SAM AI subscription?

Check with SME.ec for enterprise support options:
- Email: sam@sme.ec
- Website: sme.ec

---

## Support

### Where can I get help with ai_sam?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam
- **Email:** sam@sme.ec
- **In-App:** Ask SAM directly - it knows about itself!
- **Technical Docs:** See ai_sam_SCHEMA.md for developer details

### How do I report a bug?

1. Check Known Issues below first
2. Email anthony@sme.ec with:
   - ai_sam version (from Apps > ai_sam)
   - Odoo version
   - Steps to reproduce
   - Browser console errors (if any)
   - Odoo server logs (if relevant)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Config JS breaks website_slides | Fixed in 18.0.7.14 | Upgrade to latest version |
| Chat bubble z-index conflicts | Known | Adjust z-index in custom CSS |
| Memory graph slow with >10k nodes | Known | Use filters to limit display |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.7.14 | 2026-01-02 | Fix: Move config/logger/overlay to backend assets (website_slides compatibility) |
| 18.0.7.x | 2025-12-04 | Re-enabled chat bubble and token counter widgets |
| 18.0.7.x | 2025-11-30 | Platform Skin Architecture - Python moved to ai_sam_base |
| 18.0.7.x | 2025-10-25 | Menu consolidation - single source of truth |
| 18.0.7.x | 2025-10-24 | Memory system merged from ai_sam_memory |

---

*Last updated: 2026-01-25*
*Part of SAM AI by SME.ec*
