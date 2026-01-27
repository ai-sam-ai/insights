# ai_sam_workflows - Workflow Automation

Workflow automation module connecting N8N with Odoo, enabling visual workflow building, trigger management, and multi-step business process automation.

## Core Capabilities

- **N8N Integration**: Connect to N8N for visual workflow building and execution
- **Trigger Management**: Event-driven triggers from Odoo records, schedules, or webhooks
- **Execution Logging**: Complete audit trail of workflow executions with status tracking
- **Odoo Orchestration**: Automate Odoo operations (create records, send emails, update states)

## How It Works

The ai_sam_workflows module bridges N8N's powerful workflow engine with Odoo's business data:

1. Define workflows in N8N's visual builder
2. Configure triggers in Odoo (record changes, schedules, webhooks)
3. When triggered, the module sends data to N8N
4. N8N executes the workflow steps
5. Results are logged and optionally written back to Odoo

This enables complex automations like: when a lead is marked qualified, automatically enrich the data, send a personalized email sequence, and create a follow-up task.

## Example Workflows

### Lead Follow-up Automation
When a lead status changes to "Interested", trigger a workflow that: waits 24 hours, sends a follow-up email, logs the interaction, and schedules a reminder if no response within 3 days.

### Order Processing Pipeline
When a sales order is confirmed, trigger a workflow that: validates inventory, notifies the warehouse, generates shipping labels, and updates the customer with tracking information.

## Frequently Asked Questions

### How do I connect to N8N?
Configure the N8N host URL and credentials in the module settings. The module supports both cloud N8N and self-hosted instances. Test the connection using the built-in health check.

### Can workflows modify Odoo records?
Yes. Workflows can create, update, and delete Odoo records through the JSON-RPC callback mechanism. Use the Odoo nodes in N8N for read/write operations.

### How do I debug failed workflows?
Check the execution log in Odoo (Workflows > Executions). Each execution includes the trigger data, N8N response, and any error messages. You can also view detailed logs in N8N's execution history.

### What triggers are available?
Record triggers (on create/update/delete), scheduled triggers (cron), webhook triggers (external events), and manual triggers (user-initiated).

## Related

- [ai_sam](./ai-sam.md) - Core orchestration module
- [ai_sam_lead_generator](./ai-sam-lead-generator.md) - Lead generation for workflow input
- [Integration Guide](../guides/integration.md) - External system connections
- [Operations Agent](../agents/operations.md) - Workflow best practices

---

*Canonical: https://sme.ec/insights/modules/ai-sam-workflows*
