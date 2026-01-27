# Getting Started with SAM AI

> Get SAM AI up and running in your Odoo 18 environment.

## Prerequisites

- Odoo 18 (Community or Enterprise)
- PostgreSQL 15+
- Python 3.10+
- N8N instance (for workflow automation)
- API keys for your LLM provider (Claude recommended)

## Installation

### 1. Clone the SAM AI modules

```bash
git clone https://github.com/AI-SAM-AI/modules.git /path/to/addons/samai
```

### 2. Update Odoo configuration

Add the SAM AI addons path to your odoo.conf:

```ini
addons_path = /path/to/addons,/path/to/addons/samai
```

### 3. Install core modules

In Odoo, navigate to Apps and install:

1. `ai_brain` - Core intelligence (install first)
2. `ai_sam` - Chat interface and orchestration
3. `ai_sam_memory` - Conversation persistence
4. `ai_sam_intelligence` - Agent registry

### 4. Configure LLM provider

Navigate to Settings > SAM AI > Configuration:

- Select your LLM provider (Claude, OpenAI, Ollama)
- Enter your API credentials
- Test the connection

### 5. Install optional modules

Based on your needs:

- `ai_sam_workflows` - For process automation (requires N8N)
- `ai_sam_lead_generator` - For sales prospecting (requires ScraperAPI)

## First Steps

### Say hello to SAM

Click the SAM icon in the Odoo systray. Type "Hello" and SAM will respond. You're now connected.

### Try a simple task

Ask SAM to help with something in Odoo:
- "What customers have outstanding invoices?"
- "Show me today's sales orders"
- "Create a new contact for John Smith at Acme Corp"

### Set up your first automation (optional)

If you installed ai_sam_workflows:

1. Configure N8N connection in Settings
2. Create a simple workflow in N8N
3. Link it to an Odoo trigger
4. Test the automation

## Troubleshooting

### SAM isn't responding
- Check LLM provider configuration and API key
- Verify network connectivity to the LLM provider
- Check Odoo logs for error messages

### Workflows not triggering
- Verify N8N connection in module settings
- Check workflow is published (not draft)
- Confirm trigger conditions match

### Memory not persisting
- Ensure ai_sam_memory module is installed
- Check database permissions
- Verify session storage configuration

## Next Steps

- [Choose your persona guide](../agents/index.md) - Role-specific quick starts
- [Explore modules](../modules/index.md) - Deep dive on capabilities
- [Architecture overview](./architecture.md) - Understand the system design

---

*Canonical: https://sme.ec/insights/guides/getting-started*
