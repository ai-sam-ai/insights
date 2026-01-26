# FAQ: ai_sam_creatives

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Creatives

### What is ai_sam_creatives?

ai_sam_creatives is a Productivity module for Odoo 18 that provides a multimedia content creation experience on an infinite canvas. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_creatives`
- Current version: 18.0.1.0.1
- Requires: Odoo 18.0+, ai_brain, ai_sam
- License: LGPL-3
- Architecture: Platform Skin (UI only)

### What does ai_sam_creatives do?

ai_sam_creatives provides 4 key capabilities:

1. **Multimedia Canvas** - Visual workspace for text, images, video, and audio content
2. **AI Chat Integration** - Conversation panel to brainstorm with SAM directly on your canvas
3. **Custom Node Rendering** - Specialized rendering for creative content types
4. **Project Management** - Kanban landing page for organizing creative projects

### Who is ai_sam_creatives for?

ai_sam_creatives is designed for:
- Content creators building multimedia campaigns
- Marketing teams working on visual content
- Creative professionals who think visually
- Anyone wanting AI assistance in creative work

---

## Installation & Setup

### How do I install ai_sam_creatives?

1. Ensure Odoo 18.0+ is running
2. Install required modules first: `ai_brain`, `ai_sam`
3. Navigate to Apps menu
4. Search for "SAM AI Creatives"
5. Click Install
6. Access via the Creatives menu

### What are the dependencies for ai_sam_creatives?

ai_sam_creatives requires these Odoo modules:
- `ai_brain` - Data layer with canvas models
- `ai_sam` - Canvas framework and AI services

Python libraries required:
- None additional (uses parent module dependencies)

### How do I configure ai_sam_creatives?

After installation:
1. The module is ready to use immediately
2. Creatives platform is auto-registered in canvas.platform
3. Access via the Creatives landing page
4. AI chat uses the ai_sam configuration

---

## Usage

### How do I create a new creative project?

To create a new project:
1. Go to Creatives landing page
2. Click "Create" or the + button
3. Give your project a name
4. Start adding content nodes to the canvas

### How do I add multimedia content?

To add content to your canvas:
1. Open a creative project
2. Use the toolbar to add nodes (text, image, video, audio)
3. Drag and drop to position
4. Connect nodes to show relationships

### How do I chat with SAM on the canvas?

To use AI chat:
1. Open the chat panel (usually on the right side)
2. Type your message or question
3. SAM responds with ideas and suggestions
4. Continue the conversation to refine content

### Can I use the canvas without AI?

Yes. The canvas works perfectly for visual organization without using AI features. The chat panel is optional.

---

## Troubleshooting

### Why can't I see the Creatives menu?

**Symptom:** Creatives option doesn't appear in menus

**Possible Causes and Solutions:**
1. **Module not installed** - Check Apps > ai_sam_creatives is installed
2. **Dependencies missing** - Ensure ai_brain and ai_sam are installed
3. **User permissions** - Check user has access to the module

### Why isn't the AI chat responding?

**Symptom:** Chat panel doesn't respond to messages

**Possible Causes and Solutions:**
1. **AI service not configured** - Check ai_sam module has API key configured
2. **No conversation created** - Try starting a new conversation
3. **Network issue** - Check browser console for errors

### My content disappeared after module update?

**Answer:** This should NOT happen. ai_sam_creatives is a Platform Skin - it contains no data. All content is stored in ai_brain.

If content appears missing:
1. Check ai_brain module is still installed
2. Check the canvas records directly in Odoo
3. Your data should be intact

---

## Comparisons

### How does ai_sam_creatives compare to other canvas tools?

| Feature | ai_sam_creatives | Other Canvas Apps |
|---------|------------------|-------------------|
| Multimedia Support | Images, video, audio, text | Varies |
| AI Integration | Built-in SAM chat | Usually separate |
| Odoo Integration | Native | Requires connectors |
| Data Safety | Platform Skin architecture | Varies |
| Collaboration | Shared via Odoo | Varies |

### Why choose ai_sam_creatives over standalone tools?

ai_sam_creatives provides:
- **Odoo integration** - Content lives with your business data
- **AI built-in** - No switching apps to brainstorm
- **Safe architecture** - Updates don't risk your data
- **Ecosystem benefits** - Works with other SAM AI modules

---

## Integration

### Does ai_sam_creatives work with ai_sam_socializer?

Yes. Both modules are Platform Skins on the same foundation:
- Create content in Creatives
- Publish to social media with Socializer
- Same canvas data, different specialized interfaces

### Can I export content from Creatives?

Export options:
- Screenshots of canvas (browser feature)
- Individual node content can be copied
- Future: Direct export features planned

---

## Data & Privacy

### Where is my creative content stored?

All content is stored in the Odoo PostgreSQL database via the ai_brain module. ai_sam_creatives is UI-only and does not store data itself.

### Is my content safe if I uninstall ai_sam_creatives?

Yes. Because ai_sam_creatives is a Platform Skin:
- Uninstalling removes only the UI
- All canvas data remains in ai_brain
- Reinstalling restores full access

### Does AI chat send my content externally?

When you use AI chat:
- Messages are sent to the configured AI provider (e.g., OpenAI)
- This is handled by the ai_sam module
- Check ai_sam settings for AI provider configuration

---

## Pricing & Licensing

### Is ai_sam_creatives free?

ai_sam_creatives is licensed under LGPL-3. The module itself is free to use and modify.

**Costs to consider:**
- AI chat features require an AI API subscription (via ai_sam)
- Hosting and server costs

### Do I need all SAM AI modules?

No. You need:
- `ai_brain` (required) - Data layer
- `ai_sam` (required) - Framework
- `ai_sam_creatives` (this module)

Other SAM AI modules are optional enhancements.

---

## Support

### Where can I get help with ai_sam_creatives?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-creatives
- **Email:** sam@sme.ec
- **Chat:** Ask SAM in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.1)
   - Odoo version
   - Steps to reproduce
   - Browser console errors (if any)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Chat panel may need refresh after long idle | Open | Refresh browser |
| Large canvas may slow on older browsers | Known | Use modern browser |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.1 | 2024-11 | Platform Skin architecture implementation |
| 18.0.1.0.0 | 2024-10 | Initial release |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
