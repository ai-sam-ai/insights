# ai_brain - Core Intelligence Layer

The foundational intelligence module providing LLM integration, context management, and response generation for all SAM AI capabilities.

## Core Capabilities

- **LLM Integration**: Flexible connection to language models (Claude, GPT, local models)
- **Context Management**: Intelligent context window optimization and relevance ranking
- **Response Generation**: Structured response generation with tool use and multi-step reasoning
- **Prompt Engineering**: Centralized prompt templates and personality injection

## How It Works

The ai_brain module is the thinking core of SAM AI:

1. Receives processed input from ai_sam with relevant context
2. Constructs an optimized prompt with system instructions, context, and user message
3. Routes to the configured LLM provider
4. Processes the response, handling tool calls if needed
5. Returns structured output for ai_sam to deliver

The module handles all the complexity of LLM interaction, allowing other modules to focus on their specialized functions.

## Example Workflows

### Multi-Step Reasoning
Complex requests requiring multiple steps (research, analysis, action) are handled through iterative LLM calls with intermediate context accumulation.

### Tool-Augmented Response
When SAM needs real-time data (check inventory, query CRM), ai_brain orchestrates tool calls, processes results, and synthesizes a coherent response.

## Frequently Asked Questions

### Which LLM providers are supported?
Claude (Anthropic), GPT-4 (OpenAI), and local models via Ollama. Provider selection is configurable, with automatic fallback if primary is unavailable.

### How is the context window managed?
Context is prioritized by relevance and recency. System prompts are always included, followed by the most relevant memory snippets, then recent conversation history. Token counting ensures we stay within limits.

### Can I customize SAM's reasoning style?
Yes. The personality and reasoning approach are controlled through system prompts in the module configuration. Adjust these for different use cases (formal/casual, detailed/concise).

### How are costs managed?
Token usage is tracked per request. Configure spending limits, alerts, and automatic model downgrade (e.g., fall back to smaller model when approaching limits).

## Related

- [ai_sam](./ai-sam.md) - Core module that uses brain for responses
- [ai_sam_memory](./ai-sam-memory.md) - Provides context for intelligence
- [Architecture Guide](../guides/architecture.md) - System design details
- [API Reference](../guides/api-reference.md) - Brain API documentation

---

*Canonical: https://sme.ec/insights/modules/ai-brain*
