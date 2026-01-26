# FAQ: sam_ai_page_builder

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Page Builder

### What is sam_ai_page_builder?

An AI-powered page builder for Odoo 18 that generates web pages from natural language descriptions using Claude AI.

**Key facts:**
- Technical name: `sam_ai_page_builder`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, ai_sam_base, ai_sam
- License: LGPL-3

### How is this different from ai_sam_funnels?

| Feature | sam_ai_page_builder | ai_sam_funnels |
|---------|---------------------|----------------|
| Approach | AI generates code | Drag-and-drop snippets |
| Input | Natural language | Visual selection |
| Output | Custom HTML/CSS/JS | Pre-built components |
| Best for | Unique pages | Sales funnels |
| Speed | Fast for custom | Fast for standard |

### Does this replace the Odoo website builder?

No. SAM AI Page Builder is for generating initial pages quickly. For fine-tuning, you can still use Odoo's website builder after publishing.

---

## Installation & Setup

### How do I install?

1. Ensure ai_sam and ai_sam_base are installed
2. Go to Apps
3. Search "SAM AI Page Builder"
4. Click Install

### What dependencies are required?

- `ai_sam` - SAM AI chat interface
- `ai_sam_base` - Claude API integration
- `website` - Page publishing
- `sam_ui_theme` - UI theming

---

## Usage

### How do I create a page?

1. Go to SAM AI > Page Builder
2. Click Create
3. Enter a page name
4. Type your description in the chat panel
5. Watch the preview appear
6. Refine with follow-up requests
7. Click Publish when ready

### What can I ask the AI to create?

Any type of web page:
- Landing pages
- Sales pages
- About pages
- Contact pages
- Documentation
- Custom pages

### How do I refine a page?

Just type your change request:
- "Make the header bigger"
- "Change the primary color to blue"
- "Add a testimonial section"
- "Make it more minimal"

The AI will update the page while preserving your previous work.

### How do I publish a page?

1. Generate and refine until satisfied
2. Click the Publish button
3. Page is created in Odoo website
4. Edit URL and settings as needed

---

## Troubleshooting

### Why isn't the AI responding?

Check:
1. ai_sam_base is installed and configured
2. Claude API key is set in System Parameters
3. Check Odoo logs for API errors

### Why does my page look different after publishing?

Published pages use your website's CSS. The preview shows isolated styles. Some adjustments may be needed in the website builder.

### Why is the preview empty?

The AI response must include code blocks (```html, ```css). If the AI responds conversationally without code, ask: "Please generate the HTML code for this page."

---

## Technical

### What AI model does this use?

Claude AI via the `ai_sam_base` module. Each page gets its own `ai.conversation` record for context continuity across refinements.

### How is context preserved between prompts?

1. Each page has a linked `conversation_id`
2. All prompts and responses are stored in `ai_prompt_history`
3. Refinement prompts include current HTML/CSS for context
4. AI "remembers" the conversation within a page

### What HTML/CSS limitations exist?

Generated content should be:
- Body content only (no `<html>`, `<head>`, `<body>` wrapper tags)
- Self-contained (styles use scoped classes, not global overrides)
- Responsive (generated CSS includes media queries when needed)

### Can I edit the generated code manually?

Yes. The `page_html`, `page_css`, and `page_js` fields are editable. You can:
1. Refine via AI chat
2. Edit fields directly in form view
3. Edit in website builder after publishing

---

## Workflow Integration

### Can I link pages to workflows?

Yes. Pages have `workflow_node_id` and `workflow_id` fields for N8N workflow integration. This allows:
- AI to generate pages as part of automated workflows
- Tracking which workflow triggered page generation

### What states does a page go through?

| State | Description |
|-------|-------------|
| `draft` | Initial state, no content generated |
| `generated` | AI has created content |
| `published` | Live on Odoo website |

---

## Support

- **Documentation:** https://sme.ec/documentation/modules/sam-ai-page-builder
- **Email:** sam@sme.ec

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
