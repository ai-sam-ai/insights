# ai_sam_lead_generator - Lead Generation

Web scraping and lead generation module providing ScraperAPI integration, contact extraction, and lead enrichment for automated sales prospecting.

## Core Capabilities

- **Web Scraping**: ScraperAPI-powered scraping for reliable data extraction across websites
- **Contact Extraction**: Intelligent parsing of contact information (emails, phones, social profiles)
- **Lead Enrichment**: Augment basic leads with company data, social profiles, and context
- **Batch Processing**: Handle large-scale lead generation with rate limiting and error recovery

## How It Works

The ai_sam_lead_generator module automates the prospecting phase of sales:

1. Define search criteria (industry, location, company size, keywords)
2. The module queries relevant sources and scrapes business listings
3. Contact information is extracted and validated
4. Leads are enriched with additional data points
5. Qualified leads are created in Odoo CRM for follow-up

The entire process runs asynchronously, allowing large batches to process without blocking other operations.

## Example Workflows

### Industry-Targeted Prospecting
Request leads for "IT consulting firms in Melbourne with 10-50 employees". The module scrapes business directories, extracts decision-maker contacts, and creates enriched leads in your CRM.

### Competitor Customer Mining
Provide competitor names or domains. The module identifies their customers through various sources and creates prospects for your sales team.

## Frequently Asked Questions

### How do I configure ScraperAPI?
Add your ScraperAPI key in the module settings. The module handles all API communication, rate limiting, and error handling automatically.

### What data sources are supported?
Business directories (Google Maps, Yelp, industry-specific), LinkedIn (with appropriate credentials), company websites, and custom sources via configuration.

### How is lead quality ensured?
Leads are validated for email deliverability, phone format, and company existence. Duplicate detection prevents existing contacts from being re-added. Quality scores are assigned based on data completeness.

### What are the rate limits?
Rate limits depend on your ScraperAPI plan. The module automatically throttles requests to stay within limits and queues excess requests for later processing.

## Related

- [ai_sam](./ai-sam.md) - Core module for chat-based lead requests
- [ai_sam_workflows](./ai-sam-workflows.md) - Automate post-generation workflows
- [Sales Agent](../agents/sales.md) - Complete sales automation guidance
- [Integration Guide](../guides/integration.md) - CRM integration details

---

*Canonical: https://sme.ec/insights/modules/ai-sam-lead-generator*
