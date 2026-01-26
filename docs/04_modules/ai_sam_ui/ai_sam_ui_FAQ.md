# FAQ: ai_sam_ui

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About AI SAM UI

### What is ai_sam_ui?

ai_sam_ui is a website chat interface module for Odoo 18 that provides a public-facing SAM AI chat widget. It allows website visitors to interact with SAM AI without logging in. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_ui`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does ai_sam_ui do?

ai_sam_ui provides 4 main capabilities:

1. **Public Chat Widget** - A drag-and-drop snippet that adds AI chat to any website page
2. **No-Login Access** - Visitors can chat without creating an account
3. **Session Continuity** - Conversations persist across page refreshes
4. **Claude-Style UI** - Professional, modern chat interface design

### Who is ai_sam_ui for?

ai_sam_ui is designed for:
- Businesses wanting to add AI chat to their public website
- Teams that need 24/7 visitor assistance
- Odoo website users who want intelligent chat without custom development

---

## Installation & Setup

### How do I install ai_sam_ui?

1. Ensure Odoo 18.0+ is running with website module
2. Ensure `ai_sam` and `ai_sam_base` are installed first
3. Navigate to Apps menu
4. Search for "ai_sam_ui" or "AI SAM UI"
5. Click Install
6. Go to Website > Edit to add the snippet

### What are the dependencies for ai_sam_ui?

ai_sam_ui requires these Odoo modules:
- `website` - Odoo's website builder and snippet system
- `ai_sam` - SAM AI orchestrator (provides /sam/public/chat/send endpoint)
- `ai_sam_base` - Core models for conversations and messages

Python libraries required:
- None additional

### How do I add the chat widget to my website?

After installation:
1. Go to Website > Edit any page
2. Click "Blocks" in the left sidebar
3. Scroll to "Custom" section or search "SAM"
4. Drag "SAM AI Chat" snippet to your page
5. Click Save
6. Visitors can now chat!

---

## Usage

### How do visitors start a conversation?

Visitors simply:
1. Navigate to a page with the SAM chat widget
2. Type a message in the input field
3. Press Enter or click Send
4. SAM responds within seconds

No login, no account creation, no friction.

### Does the chat remember previous conversations?

Yes, within the same browser. ai_sam_ui stores a session ID in localStorage. When visitors return:
- Same browser = conversation continues
- Different browser = new conversation
- Cleared cookies/storage = new conversation

### Can SAM switch to different specialist agents?

Yes. When ai_sam_ui sends a message to `/sam/public/chat/send`, the orchestrator can:
- Detect the topic
- Route to appropriate specialist agent
- Show a notification: "Switched to [Agent Name] for specialized help"

This happens automatically based on the conversation content.

---

## Troubleshooting

### Why is the chat widget not appearing?

**Symptom:** You added the snippet but visitors don't see the chat widget

**Cause:** Possible reasons:
1. Page not published
2. SCSS compilation failed
3. JavaScript error

**Solution:**
1. Verify the page is published (not in edit mode)
2. Clear cache (`/cto-developer` or cache manager)
3. Check browser console for JavaScript errors
4. Verify ai_sam module is installed (provides the endpoint)

### Why are messages failing to send?

**Symptom:** User types message but nothing happens or shows error

**Cause:** The `/sam/public/chat/send` endpoint might be unavailable

**Solution:**
1. Verify `ai_sam` module is installed and upgraded
2. Check Odoo logs for errors
3. Verify the endpoint exists: visit `/sam/public/chat/send` directly
4. Clear browser cache and try again

### Why does the session reset every time?

**Symptom:** Visitor's conversation doesn't continue after page refresh

**Cause:** localStorage might be blocked or cleared

**Solution:**
1. Check if browser blocks localStorage (private/incognito mode)
2. Check for browser extensions blocking storage
3. Verify the domain hasn't changed (localStorage is domain-specific)
4. Try a different browser to isolate the issue

### The styling looks broken - no colors, weird layout

**Symptom:** Chat widget appears but looks unstyled

**Cause:** SCSS assets not loading

**Solution:**
1. Clear Odoo cache (Settings > Technical > Clear Cache)
2. Upgrade the module: Apps > ai_sam_ui > Upgrade
3. Hard refresh browser: Ctrl+Shift+R
4. Check browser console for CSS loading errors

---

## Comparisons

### How does ai_sam_ui compare to standard Odoo Live Chat?

| Feature | ai_sam_ui | Odoo Live Chat |
|---------|-----------|----------------|
| AI-Powered | Yes (SAM AI) | No (human agents) |
| 24/7 Availability | Yes | Requires human staffing |
| No Login Required | Yes | Yes |
| Memory/Context | Yes (session-based) | No |
| Agent Switching | Automatic | Manual transfer |
| Setup Complexity | Drag-and-drop | Requires operator config |

### Why choose ai_sam_ui over a third-party chatbot?

ai_sam_ui advantages:
- Native Odoo integration (no external APIs)
- Uses your existing SAM AI ecosystem
- Data stays in your database
- No per-message costs
- Automatic specialist routing

---

## Integration

### Does ai_sam_ui work with the backend SAM chat (ai_sam)?

Yes. Both use the same underlying infrastructure:
- Same conversation models (ai_sam_base)
- Same orchestrator (ai_sam)
- Same memory system

The difference is:
- `ai_sam` = Backend users (logged in)
- `ai_sam_ui` = Website visitors (public)

### Can I use ai_sam_ui on multiple pages?

Yes. Add the snippet to as many pages as you want. Each page will:
- Use the same session ID (localStorage)
- Continue the same conversation
- Share the same styling

---

## Data & Privacy

### Where is visitor data stored?

All data is stored in your Odoo PostgreSQL database:
- `ai.conversation` - Conversation records
- `ai.message` - Individual messages

No data is sent to external servers unless you've configured external AI providers.

### What visitor data is collected?

ai_sam_ui collects:
- Messages sent by the visitor
- Session ID (randomly generated, stored in browser)
- Timestamp of messages

It does NOT collect:
- Personal information (unless visitor provides it in chat)
- Email addresses
- Browser fingerprints
- IP addresses (unless Odoo's standard logging captures them)

### How do I delete visitor conversation data?

To delete conversation data:
1. Go to Settings > Technical > Database Structure > ai.conversation
2. Search/filter for the conversations to delete
3. Select and delete

Or via API:
```python
conversations = env['ai.conversation'].search([('source', '=', 'public')])
conversations.unlink()
```

---

## Pricing & Licensing

### Is ai_sam_ui free?

Yes. ai_sam_ui is licensed under LGPL-3. You can use it, modify it, and distribute it freely.

### Do I need a SAM AI subscription?

No subscription required. The module works with your existing Odoo and SAM AI installation.

---

## Support

### Where can I get help with ai_sam_ui?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-ui
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo backend

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - Browser and version
   - Steps to reproduce
   - Browser console errors (if any)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Session lost in incognito mode | By Design | localStorage not available in private browsing |
| Snippet not in alphabetical order | Minor | Search "SAM" in snippet panel |
| No dark mode | Planned | CSS customization available |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2025-01 | Initial release with Claude-style UI |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
