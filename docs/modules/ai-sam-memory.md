# ai_sam_memory - Conversation Persistence

Conversation persistence module providing message history, session continuity, and learning from interactions for contextual AI responses.

## Core Capabilities

- **Message History**: Complete conversation logs with timestamps, roles, and metadata
- **Session Continuity**: Seamless context preservation across browser sessions and devices
- **Context Retrieval**: Efficient retrieval of relevant past conversations for current context
- **Learning Integration**: Patterns and preferences extracted for personalized responses

## How It Works

The ai_sam_memory module ensures SAM never forgets:

1. Every message (user and assistant) is stored with full metadata
2. Sessions are linked to users and optionally to Odoo records (leads, orders, etc.)
3. When processing new messages, relevant history is retrieved for context
4. Patterns are extracted to understand user preferences and communication style

This enables SAM to reference previous conversations, remember user preferences, and provide increasingly personalized assistance over time.

## Example Workflows

### Context-Aware Responses
User asks "What was that lead I was working on yesterday?" SAM queries memory for recent lead-related conversations and retrieves the specific context.

### Preference Learning
Over time, SAM learns that a user prefers brief responses, uses specific terminology, or focuses on certain business areas. These preferences inform future responses.

## Frequently Asked Questions

### How long is conversation history retained?
By default, conversations are retained indefinitely. Configure retention policies in the module settings to automatically archive or delete old conversations.

### Is conversation data encrypted?
Conversations are stored in the Odoo database with standard database encryption. For additional security, enable field-level encryption in the module settings.

### Can I export conversation history?
Yes. Use the export function to download conversations in JSON or CSV format. Exports can be filtered by date range, user, or session.

### How does context retrieval work?
When processing a message, the module retrieves the most recent messages from the current session plus semantically similar messages from past sessions using embedding-based search.

## Related

- [ai_sam](./ai-sam.md) - Core module that uses memory for context
- [ai_brain](./ai-brain.md) - Intelligence layer for understanding
- [Developer Agent](../agents/developer.md) - Technical implementation details
- [API Reference](../guides/api-reference.md) - Memory API documentation

---

*Canonical: https://sme.ec/insights/modules/ai-sam-memory*
