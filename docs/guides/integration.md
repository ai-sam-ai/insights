# Integration Guide

> Connect SAM AI with external systems and services.

## Overview

SAM AI integrates with external systems through multiple mechanisms:
- **N8N Workflows**: Visual automation connecting hundreds of services
- **Direct API**: JSON-RPC endpoints for custom integrations
- **Webhooks**: Event-driven notifications to external systems
- **Odoo Connectors**: Native Odoo integration modules

## N8N Integration

### Setup

1. Deploy N8N (Docker recommended):
```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

2. Configure connection in Odoo:
   - Settings > SAM AI > Workflows
   - Enter N8N URL and credentials
   - Test connection

### Creating Integrations

Use N8N's visual builder to connect services:

1. **Slack notifications**: Send SAM AI events to Slack channels
2. **Google Sheets sync**: Export leads to spreadsheets
3. **Salesforce push**: Sync opportunities to external CRM
4. **Custom webhooks**: Connect any REST API

### Example: Lead to Slack

```
Trigger (Odoo Lead Created)
    │
    ▼
HTTP Request (Enrich lead data)
    │
    ▼
Slack (Send notification)
    │
    ▼
Odoo (Update lead status)
```

## CRM Integration

### Native Odoo CRM

SAM AI uses Odoo CRM natively. All leads, contacts, and opportunities are stored in standard Odoo models.

### External CRM Sync

Push data to external CRMs via workflows:

```python
# Example: Salesforce sync via N8N
{
    "trigger": "crm.lead.create",
    "workflow": "sync_to_salesforce",
    "field_mapping": {
        "name": "Name",
        "email_from": "Email",
        "phone": "Phone",
        "expected_revenue": "Amount"
    }
}
```

## Email Integration

### Incoming Email

Configure Odoo's fetchmail to route emails to SAM:

1. Settings > Technical > Incoming Mail Servers
2. Create server pointing to your mailbox
3. Set action to create SAM conversation

### Outgoing Email

SAM uses Odoo's mail system:

1. Configure outgoing mail server
2. SAM can send emails via chat commands
3. Track responses via incoming mail integration

## Calendar Integration

### Google Calendar

Sync Odoo calendar with Google via N8N:

1. Create N8N workflow with Google Calendar node
2. Trigger on Odoo event creation/update
3. Map fields (subject, date, attendees)

### Microsoft 365

Similar approach using N8N's Microsoft nodes.

## Webhook Configuration

### Outgoing Webhooks

Send events to external systems:

```python
# In Odoo, configure webhook for lead events
{
    "model": "crm.lead",
    "events": ["create", "write", "unlink"],
    "url": "https://your-system.com/webhook",
    "headers": {
        "Authorization": "Bearer your-token"
    }
}
```

### Incoming Webhooks

Receive events from external systems:

```
POST /ai_sam/webhook/inbound
{
    "source": "external_system",
    "event": "new_inquiry",
    "data": {
        "name": "John Smith",
        "email": "john@example.com",
        "message": "Interested in your services"
    }
}
```

## Authentication Patterns

### API Key Authentication

For simple integrations:

```python
# Configure in Odoo
api_key = env['ir.config_parameter'].get_param('samai.api_key')

# Use in requests
headers = {"X-API-Key": api_key}
```

### OAuth 2.0

For services requiring OAuth (Google, Microsoft, Salesforce):

1. Configure OAuth credentials in N8N
2. Authorize connection
3. Use in workflows

### Webhook Signatures

Verify incoming webhooks:

```python
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

## Common Integration Patterns

### Lead Enrichment Pipeline

```
New Lead → Clearbit Enrichment → CRM Update → Slack Notification
```

### Support Ticket Routing

```
Email Received → SAM Analysis → Priority Assignment → Team Notification
```

### Sales Activity Sync

```
Odoo Activity → Calendar Sync → Reminder Workflow → Completion Update
```

## Troubleshooting

### Connection Issues
- Verify network connectivity to external service
- Check credentials and permissions
- Review N8N execution logs

### Data Sync Problems
- Confirm field mappings are correct
- Check for required fields in target system
- Validate data formats (dates, numbers)

### Rate Limiting
- Implement retry logic with backoff
- Queue requests for batch processing
- Monitor API usage dashboards

---

*Canonical: https://sme.ec/insights/guides/integration*
