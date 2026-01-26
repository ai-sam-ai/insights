# FAQ: ai_sam_email_marketing

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Email Marketing

### What is ai_sam_email_marketing?

ai_sam_email_marketing is a Marketing/Email Marketing module for Odoo 18 that provides AI-powered email campaign creation through a chat-based interface. It integrates with Odoo's native mass_mailing system. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_email_marketing`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, mail, mass_mailing, ai_sam
- License: LGPL-3

### What does ai_sam_email_marketing do?

ai_sam_email_marketing provides 5 key capabilities:

1. **Chat-Based Email Generation** - Describe what you want in natural language, AI generates the email
2. **Iterative Refinement** - Keep chatting to refine subject, body, and tone until perfect
3. **File Upload Parsing** - Upload JSON, HTML, or Markdown files to convert into emails
4. **Template Versioning** - Every iteration is saved with full version history
5. **Direct Odoo Integration** - One-click conversion to mass_mailing campaigns

### Who is ai_sam_email_marketing for?

ai_sam_email_marketing is designed for:
- Marketing teams creating email campaigns
- Small businesses without copywriting staff
- Anyone using Odoo Email Marketing who wants AI assistance
- Teams needing faster campaign turnaround

---

## Installation & Setup

### How do I install ai_sam_email_marketing?

1. Ensure Odoo 18.0+ is running
2. Install required modules: `mail`, `mass_mailing`, `ai_sam`
3. Navigate to Apps menu
4. Search for "SAM AI Email Marketing"
5. Click Install
6. Access via Email Marketing menu

### What are the dependencies for ai_sam_email_marketing?

ai_sam_email_marketing requires these Odoo modules:
- `base` - Odoo core
- `mail` - Email threading
- `mass_mailing` - Odoo Email Marketing
- `ai_sam` - SAM AI framework

Python libraries required:
- None additional (uses ai_sam for AI services)

### How do I configure ai_sam_email_marketing?

After installation:
1. Configure AI provider in ai_sam module settings
2. Go to Email Marketing > AI Campaigns
3. Create a new campaign
4. Set campaign context (type, audience, tone, goals)
5. Start chatting with SAM to generate content

---

## Usage

### How do I create an AI email campaign?

To create a campaign:
1. Go to Email Marketing > AI Campaigns
2. Click Create
3. Enter campaign name and details
4. Set campaign type, target audience, and tone
5. Optionally add brand voice guidelines and AI instructions
6. Click "Open AI Builder" to start generating

### How do I generate email content?

To generate content:
1. Open an AI campaign
2. Click "Open AI Builder" or use the chat interface
3. Type a prompt like "Create a promotional email for our 30% off summer sale"
4. Review the generated subject, preheader, and body
5. Continue chatting to refine: "Make it shorter" or "Add more urgency"

### How do I upload a file for conversion?

To upload a file:
1. In the AI Builder, click "Upload File"
2. Select a JSON, HTML, Markdown, or text file
3. The system parses the file and creates an email template
4. Review and refine as needed

### How do I create an Odoo mailing from a template?

To create a mailing:
1. View your generated templates
2. Find the version you want to use
3. Click "Create Mailing"
4. An Odoo mass_mailing record is created with all content
5. Add recipients and send as usual

---

## Troubleshooting

### Why isn't AI generating content?

**Symptom:** Chat returns no content or errors

**Possible Causes and Solutions:**
1. **AI not configured** - Check ai_sam module has API key configured
2. **Request failed** - Check generation request state for error message
3. **Network issue** - Check Odoo logs for API errors

### Why does generation take a long time?

**Symptom:** AI responses are slow

**Possible Causes:**
1. **Large prompt** - Complex requests take longer
2. **API rate limits** - Provider may be throttling
3. **Model selection** - Some models are slower than others

**Solution:** Check `duration_seconds` on generation requests to identify patterns.

### Why are my template versions disappearing?

**Answer:** They're not! When you create a new template, previous versions are marked as `is_latest=False`. All versions are preserved and viewable.

To see all versions:
1. Go to the campaign's templates
2. Filter for "Is Latest = False" to see older versions
3. Each template has a "Previous Version" link

### Generated email looks different than expected?

**Symptom:** HTML rendering doesn't match preview

**Cause:** Email client rendering varies

**Solution:**
1. Use the preview endpoint to see rendered version
2. Test with actual email clients before sending
3. Stick to simple, email-safe HTML

---

## Comparisons

### How does ai_sam_email_marketing compare to standalone AI writers?

| Feature | ai_sam_email_marketing | Standalone AI Writers |
|---------|------------------------|----------------------|
| Odoo Integration | Native | Requires copy/paste |
| Email Context | Understands email marketing | Generic writing |
| Template Management | Built-in versioning | Manual tracking |
| Campaign Workflow | Full campaign support | Text only |
| Cost Tracking | Per-request analytics | Usually none |

### Why use this instead of just prompting ChatGPT?

ai_sam_email_marketing provides:
- **Context retention** - Campaign goals, audience, brand voice remembered
- **Direct integration** - No copy-paste into Odoo
- **Version history** - Every iteration saved
- **Analytics** - Token and cost tracking
- **Team workflow** - Multiple users, shared campaigns

---

## Integration

### Does ai_sam_email_marketing work with Odoo's built-in templates?

Yes. Generated mailings work with Odoo's template system:
- Use existing themes
- Apply to generated content
- Mix and match as needed

### Can I use my own AI provider?

Yes, through the ai_sam module:
- Configure OpenAI, Anthropic, or custom providers
- The email marketing module is LLM-agnostic
- Switch providers without changing campaigns

### Does it integrate with CRM?

Generated mailings inherit all mass_mailing functionality:
- Send to mailing lists
- Target CRM contacts
- Use segmentation filters
- Track opens and clicks

---

## Data & Privacy

### Where is my campaign data stored?

All data is stored in your Odoo PostgreSQL database:
- Campaigns in `ai_email_campaign` table
- Templates in `ai_email_template` table
- Requests in `ai_email_generation_request` table

### What data is sent to AI providers?

When generating content:
- Your prompt text
- Campaign context (if you included it)
- Previous content (if refining)

**Note:** Your mailing list data is NOT sent to AI.

### Can I export generation history?

Yes. Generation requests can be exported via:
- Odoo's built-in export
- Direct database access
- API queries

---

## Pricing & Licensing

### Is ai_sam_email_marketing free?

The module itself is licensed under LGPL-3 and free to use.

**Costs to consider:**
- AI API usage (charged by your provider)
- Tracked per-request in the module

### How much does AI generation cost?

Costs depend on your AI provider. The module tracks:
- `tokens_prompt` - Input tokens
- `tokens_completion` - Output tokens
- `estimated_cost` - Calculated cost per request

Typical email generation: $0.01-0.05 per generation (varies by model).

---

## Support

### Where can I get help with ai_sam_email_marketing?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-email-marketing
- **Email:** sam@sme.ec
- **Chat:** Ask SAM in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - Steps to reproduce
   - Generation request ID (if applicable)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| JS chat UI commented out in manifest | By Design | Use form-based generation |
| Manifest author/website non-standard | Open | Manual fix needed |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2024-11 | Initial release |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
