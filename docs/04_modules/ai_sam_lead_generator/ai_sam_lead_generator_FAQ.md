# FAQ: ai_sam_lead_generator

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Lead Generator

### What is ai_sam_lead_generator?

ai_sam_lead_generator is a Sales/CRM module for Odoo 18 that automates lead generation using web scraping via ScraperAPI. It specifically targets companies using Odoo. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_lead_generator`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, ScraperAPI subscription
- License: LGPL-3

### What does ai_sam_lead_generator do?

ai_sam_lead_generator provides 5 key capabilities:

1. **Google Dorking** - Find Odoo-powered websites using advanced search queries
2. **Forum Scraping** - Discover Odoo discussions on Reddit, StackOverflow
3. **Job Board Intelligence** - Find companies hiring Odoo developers
4. **Version Detection** - Identify Odoo version for upgrade targeting
5. **CRM Integration** - Import qualified leads to Odoo CRM

### Who is ai_sam_lead_generator for?

ai_sam_lead_generator is designed for:
- Odoo partners looking for new clients
- Consultants seeking implementation projects
- Sales teams targeting Odoo ecosystem
- Developers finding customization opportunities

---

## Installation & Setup

### How do I install ai_sam_lead_generator?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "SAM AI Lead Generator"
4. Click Install
5. Go to Settings > Lead Generator Configuration
6. Enter your ScraperAPI key

### What are the dependencies for ai_sam_lead_generator?

ai_sam_lead_generator requires these Odoo modules:
- `base` - Odoo core
- `mail` - Email threading
- `sales_team` - Access control groups

Python libraries required:
- `requests` - HTTP calls

External services required:
- **ScraperAPI** (https://scraperapi.com) - Paid web scraping service

### How do I get a ScraperAPI key?

To get a ScraperAPI key:
1. Go to https://www.scraperapi.com
2. Sign up for an account
3. Choose a plan (free tier available for testing)
4. Copy your API key from the dashboard
5. Paste it in Odoo Settings > Lead Generator Configuration

---

## Usage

### How do I create a lead generation campaign?

To create a campaign:
1. Go to Lead Generator > Campaigns
2. Click Create
3. Enter campaign name
4. Select campaign type (Google Search, Forum Scraping, etc.)
5. Optional: Select target industries and countries
6. Enter your ScraperAPI key
7. Set max results and minimum lead score
8. Click "Run Campaign"

### What campaign types are available?

Available campaign types:

| Type | What It Does |
|------|--------------|
| **Google Search** | Find Odoo websites via Google dorking |
| **Forum Scraping** | Scrape Reddit, StackOverflow for Odoo discussions |
| **Industry Specific** | Target specific industries |
| **Website Enrichment** | Enrich existing leads with Odoo detection |
| **Comprehensive** | Run all sources combined |

### How do I target specific Odoo versions?

To target specific versions:
1. In campaign settings, find "Target Odoo Versions"
2. Enter comma-separated versions: `11,12,13`
3. Only leads with matching versions will be included
4. Use this to find upgrade opportunities

### How do I import leads to CRM?

To import leads to CRM:
1. View campaign results
2. Review lead scores and status
3. Click "Import to CRM" button
4. Only hot/warm leads are imported by default
5. Leads appear in CRM > Leads

---

## Troubleshooting

### Why is my campaign failing?

**Symptom:** Campaign shows "Failed" status

**Possible Causes and Solutions:**
1. **No API key** - Enter ScraperAPI key in campaign or config
2. **Invalid API key** - Test connection in configuration
3. **API credits exhausted** - Check ScraperAPI dashboard
4. **Rate limiting** - Increase request_delay in config
5. **Network issues** - Check Odoo server connectivity

### Why am I getting no results?

**Symptom:** Campaign completes but finds no leads

**Possible Causes:**
1. **Too restrictive filters** - Lower min_lead_score
2. **Narrow targeting** - Broaden industries/countries
3. **No matching sites** - Try different campaign type
4. **Odoo detection issues** - Some sites block scraping

### Why aren't leads being created?

**Answer:** The `ai.scraped.lead` model is not yet implemented. The scraping works, but lead records aren't created. Check `execution_log` to see what was found.

This is a known limitation being addressed in future versions.

### API connection test fails. What do I do?

**Symptom:** "Test API Connection" button shows error

**Solutions:**
1. Verify API key is correct
2. Check ScraperAPI account status
3. Ensure Odoo server has internet access
4. Try different base URL if provided by ScraperAPI

---

## Comparisons

### How does this compare to manual prospecting?

| Feature | ai_sam_lead_generator | Manual Prospecting |
|---------|----------------------|-------------------|
| Time per lead | Seconds | 15-30 minutes |
| Odoo detection | Automatic | Manual verification |
| Lead scoring | AI-powered | Subjective |
| Scale | Hundreds per campaign | Limited by time |
| Consistency | 100% | Variable |

### Why use ScraperAPI instead of direct scraping?

ScraperAPI provides:
- **Proxy rotation** - Avoid IP blocks
- **CAPTCHA handling** - Automatic solving
- **Rate limiting** - Prevents bans
- **Reliability** - Professional infrastructure

Direct scraping would get blocked quickly.

---

## Integration

### Does this work with Odoo CRM?

Yes. Qualified leads can be imported directly to CRM:
- Creates crm.lead records
- Preserves Odoo version info
- Includes confidence scores
- Links back to campaign

CRM module is optional but recommended.

### Can I configure campaigns with SAM AI?

Yes. The module includes a SAM AI wizard:
1. Click "Configure with AI" on a campaign
2. Describe what you're looking for in chat
3. SAM sets campaign parameters
4. Review and run

Requires ai_sam module to be installed.

---

## Data & Privacy

### What data is collected?

Collected data includes:
- Company names and websites
- Odoo version detection
- Contact information (if public)
- Discussion context from forums

All data comes from publicly available sources.

### Is web scraping legal?

Yes, with conditions:
- We scrape public data only
- Respect robots.txt (ScraperAPI handles this)
- Rate limiting prevents server overload
- No private/protected data accessed

Always ensure compliance with local regulations.

### Where is scraped data stored?

All data is stored in your Odoo PostgreSQL database. Nothing is sent to external servers except:
- Scraping requests to ScraperAPI
- The target URLs being scraped

---

## Pricing & Licensing

### Is ai_sam_lead_generator free?

The module itself is licensed under LGPL-3 and free to use.

**Costs to consider:**
- ScraperAPI subscription (required)
  - Free tier: 1,000 credits/month
  - Paid plans: Starting at $29/month
- Each scrape request uses credits

### How many credits does scraping use?

Credit usage varies by source:
- Simple pages: 1 credit
- JavaScript rendering: 5 credits
- Residential proxy: 10 credits

Check ScraperAPI pricing for details.

---

## Support

### Where can I get help with ai_sam_lead_generator?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-lead-generator
- **Email:** sam@sme.ec
- **Specialist Agent:** `/mod_scrapper`

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0.0)
   - Odoo version
   - Campaign configuration
   - execution_log content
   - Error messages

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| ai.scraped.lead model not implemented | In Progress | Check execution_log for results |
| Website enrichment requires CRM | By Design | Install CRM module |
| Manifest author/website non-standard | Open | Manual fix needed |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.0 | 2024-11 | Initial release with core scraping |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
