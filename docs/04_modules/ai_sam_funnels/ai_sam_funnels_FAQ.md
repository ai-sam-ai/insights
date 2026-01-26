# FAQ: ai_sam_funnels

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Funnels

### What is ai_sam_funnels?

ai_sam_funnels is a sales funnel builder module for Odoo 18 that adds a complete funnel creation system to your website builder. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_funnels`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3
- Dependencies: website, crm, mass_mailing, utm

### What does ai_sam_funnels do?

ai_sam_funnels provides 4 main capabilities:

1. **Visual Funnel Builder** - 41 drag-and-drop snippets for building landing pages, sales pages, and opt-in forms in the Odoo website builder

2. **Funnel Templates** - 6 ready-made funnel structures (opt-in, lead magnet, webinar, quiz, product launch, expression of interest)

3. **Lead Capture Automation** - Forms automatically create CRM leads and add subscribers to mailing lists with full UTM tracking

4. **Quiz Funnels** - Interactive quiz functionality with email gates and personalized results

### Who is ai_sam_funnels for?

ai_sam_funnels is designed for:
- Business owners who want to build sales funnels without external tools
- Marketing teams who need their funnel data inside Odoo CRM
- Course creators and coaches running launches and promotions
- Anyone using Odoo 18 who wants integrated funnel capabilities

---

## Installation & Setup

### How do I install ai_sam_funnels?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "SAM AI Funnels" or "ai_sam_funnels"
4. Click Install
5. The module will install with website, crm, mass_mailing, and utm dependencies

### What are the dependencies for ai_sam_funnels?

ai_sam_funnels requires these Odoo modules:
- `website` - Provides the page builder and website functionality
- `crm` - Lead creation and sales team integration
- `mass_mailing` - Mailing list and subscriber management
- `utm` - UTM parameter tracking for campaigns
- `ai_sam_base` - Required for Sales Agent chat widget (SAM AI brain)

Python libraries required:
- None additional (uses base Odoo Python libraries)

### How do I configure ai_sam_funnels?

After installation:
1. Go to Website > Funnels
2. Click "Create" to start a new funnel or use the wizard to create from template
3. Configure CRM team and mailing list assignments
4. Build pages using the website builder with funnel snippets

---

## Usage

### How do I create a new funnel?

To create a new funnel:
1. Go to Website > Funnels
2. Click "Create"
3. Enter a name and select the funnel type
4. Optionally select a CRM team, lead tags, and mailing list
5. Save the funnel definition
6. Add pages using "Add Page" or via the wizard

### How do I create a funnel from a template?

To create a funnel from a template:
1. Go to Website > Funnels
2. Click "Create from Template" (wizard)
3. Select a template (opt-in, lead magnet, webinar, quiz, etc.)
4. Configure name, URL prefix, CRM team, and mailing list
5. Click "Generate Funnel"
6. The wizard creates all pages with the template structure

### How do I add funnel snippets to a page?

To add funnel snippets:
1. Navigate to your funnel page in the website builder
2. Look for the "Funnels" snippet category
3. Drag and drop snippets like:
   - Hero sections (minimal, full, video)
   - Opt-in forms
   - Benefits stacks
   - Testimonials
   - Countdown timers
   - Price reveals
   - Quiz elements
4. Customize content inline

### Can I track conversions on my funnels?

Yes. ai_sam_funnels automatically tracks:
- **Page views** - Every visit to a funnel page
- **Form submissions** - Every completed form
- **CTA clicks** - Click events on call-to-action buttons
- **Quiz starts/completions** - Quiz funnel engagement

View analytics in the funnel dashboard or on individual funnel records.

### How do quiz funnels work?

Quiz funnels follow this flow:
1. **Quiz Intro** - Invites user to take the quiz
2. **Quiz Questions** - Multiple choice questions with progress bar
3. **Quiz Gate** - Email capture before showing results
4. **Quiz Results** - Personalized result based on answers

The quiz controller calculates results based on answer patterns and creates a lead with the quiz data.

---

## CRM & Mailing Integration

### Do form submissions create CRM leads automatically?

Yes. Every form submission:
1. Creates or updates a res.partner contact
2. Creates a crm.lead linked to the contact
3. Assigns the lead to the funnel's CRM team
4. Applies any configured lead tags
5. Records full UTM tracking data

### How do I add subscribers to a mailing list?

Configure the mailing list on the funnel definition:
1. Open your funnel record
2. Select a "Mailing List" in the integration section
3. All form submissions will add subscribers to that list

Forms can be configured to:
- Add to CRM only (`integration="crm"`)
- Add to mailing list only (`integration="mailing"`)
- Add to both (`integration="both"`)

### How does UTM tracking work?

ai_sam_funnels captures UTM parameters automatically:
- `utm_source` - Traffic source (facebook, google, email)
- `utm_medium` - Marketing medium (cpc, social, newsletter)
- `utm_campaign` - Campaign name
- `utm_term` - Keyword (for paid search)
- `utm_content` - Ad or link identifier

UTM data is stored on:
- The funnel.conversion event record
- The CRM lead description
- utm.source, utm.medium, utm.campaign records are auto-created

---

## Troubleshooting

### Why are my funnel pages not appearing?

**Symptom:** Created funnel pages but can't see them on the website

**Cause:** Website pages are created unpublished by default

**Solution:**
1. Go to Website > Pages
2. Find your funnel page
3. Click "Publish" or toggle the "Published" checkbox
4. Or publish from the website builder

### Why are form submissions not creating leads?

**Symptom:** Form submits successfully but no lead appears in CRM

**Cause:** Form missing required data attributes or integration not configured

**Solution:**
1. Check that funnel has a CRM team or mailing list configured
2. Verify form has `data-funnel-id` and `data-page-id` attributes
3. Check Odoo logs for form submission errors
4. Ensure form action points to `/funnel/form/submit`

### Why is my countdown timer showing 00:00:00?

**Symptom:** Countdown timer displays zeros

**Cause:** End date not configured or already passed

**Solution:**
1. Edit the countdown snippet
2. Set the `data-end-date` attribute to a future ISO date
3. Example: `data-end-date="2025-02-15T23:59:59"`

### Funnel module not working after upgrade. What do I do?

After upgrading Odoo or ai_sam_funnels:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart Odoo server
3. Upgrade module: Apps > ai_sam_funnels > Upgrade
4. If issues persist, check logs at `/var/log/odoo/odoo.log`

---

## Comparisons

### How does ai_sam_funnels compare to ClickFunnels?

| Feature | ai_sam_funnels | ClickFunnels |
|---------|----------------|--------------|
| Monthly Cost | $0 (included) | $147-297/month |
| CRM Integration | Native Odoo CRM | Requires Zapier/API |
| Email Marketing | Native Odoo Mass Mailing | Separate tool needed |
| Funnel Templates | 6 included | 100+ templates |
| Custom Snippets | 38 funnel-specific | Many page elements |
| AI Copywriting | SAM AI integration | No built-in AI |
| Data Ownership | Your Odoo database | ClickFunnels servers |
| Odoo Integration | Native | None |

### Why choose ai_sam_funnels over building pages manually?

ai_sam_funnels adds:
- Pre-built funnel snippet library optimized for conversions
- Automatic lead and subscriber creation
- Funnel analytics and conversion tracking
- Quiz funnel functionality
- SAM AI copy generation
- Template-based funnel creation

---

## Integration

### Does ai_sam_funnels work with ai_sam (chat)?

Yes. When both modules are installed:
- SAM can recommend funnel types based on your goals
- SAM can generate copy for funnel snippets
- SAM can create funnels programmatically via the API
- SAM learns from your funnel performance over time

### Can I use ai_sam_funnels with external email services?

ai_sam_funnels integrates with Odoo's mass_mailing module natively. For external services:
- Export mailing contacts via API
- Set up webhook integrations
- Use Odoo's email marketing connectors

---

## Data & Privacy

### Where is my funnel data stored?

All data is stored in your Odoo PostgreSQL database:
- Funnel definitions in `funnel_definition` table
- Pages in `funnel_page` table
- Conversion events in `funnel_conversion` table
- Leads in `crm_lead` table
- Contacts in `res_partner` table

No data is sent to external servers.

### Can I export my funnel data?

Yes. You can export data via:
- Odoo's built-in export (list views > Export)
- API endpoints for programmatic access
- Direct database queries

### How do I delete funnel data?

To remove funnel data:
1. Archive or delete funnels from Website > Funnels
2. Delete associated leads from CRM if needed
3. Uninstalling the module preserves the data (can reinstall later)
4. To fully remove: delete records before uninstalling

---

## Pricing & Licensing

### Is ai_sam_funnels free?

ai_sam_funnels is licensed under LGPL-3. This means:
- Free to use for any purpose
- Free to modify and distribute
- No per-user or per-funnel fees
- Part of the SAM AI ecosystem

### Do I need a SAM AI subscription?

No subscription required for core funnel functionality. SAM AI integration (ai_sam module) enhances the experience with AI copywriting but is optional.

---

## Support

### Where can I get help with ai_sam_funnels?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-funnels
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance (if ai_sam installed)

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - Steps to reproduce
   - Error messages from logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| SAM knowledge file not auto-loaded | By design | Load manually after ai_sam install |
| Quiz result config field not in model | Open | Use session-based result config |
| Duplicate URL causes page creation error | Open | Use unique URL slugs |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2025-01 | Initial release with 41 snippets (including SAM chat widget), 6 templates, quiz funnels |

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
