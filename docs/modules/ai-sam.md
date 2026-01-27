# ai_sam - Core Module

The central orchestration module providing SAM's chat interface, personality configuration, and session management. This is the primary entry point for all SAM AI interactions.

## Core Capabilities

- **Chat Interface**: Full-featured chat widget for Odoo backend with real-time streaming responses
- **Voice Configuration**: Customizable personality traits, tone, and communication style
- **Session Management**: Persistent conversation sessions with context preservation
- **Orchestration**: Routes requests to specialized modules based on intent

## How It Works

The ai_sam module acts as the central hub for all SAM AI interactions. When a user sends a message, ai_sam:

1. Receives the input through the chat widget
2. Retrieves relevant context from ai_sam_memory
3. Routes to ai_brain for intelligence processing
4. Coordinates with specialized modules (workflows, lead_generator) as needed
5. Returns a contextual, personality-aware response

The module maintains SAM's consistent voice and behavior across all interactions while delegating specialized tasks to the appropriate modules.

## Example Workflows

### Basic Chat Interaction
User sends a message through the Odoo backend chat widget. SAM processes the intent, retrieves relevant business context, and responds with actionable insights or completes the requested task.

### Task Delegation
When a user requests a complex operation like "generate leads for tech companies in Sydney", ai_sam coordinates with ai_sam_lead_generator for scraping and ai_sam_memory for context, orchestrating the full workflow transparently.

## Frequently Asked Questions

### How do I customize SAM's personality?
Configure the voice and behavior settings in the module configuration. You can adjust tone (formal/casual), verbosity, emoji usage, and domain-specific language preferences.

### Can I embed the chat widget in the website frontend?
Yes. The ai_sam module includes both backend (Odoo systray) and frontend (website) chat widget options. Enable the frontend widget in the module settings.

### How does session management work?
Sessions are automatically created per user and persist across browser sessions. Context is maintained through ai_sam_memory, allowing SAM to remember previous conversations and preferences.

## Related

- [ai_brain](./ai-brain.md) - Intelligence layer used for processing
- [ai_sam_memory](./ai-sam-memory.md) - Conversation persistence
- [ai_sam_workflows](./ai-sam-workflows.md) - Workflow automation integration
- [Architecture Guide](../guides/architecture.md) - System overview

---

*Canonical: https://sme.ec/insights/modules/ai-sam*
