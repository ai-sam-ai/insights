# SAM AI for Developers

> Build integrations, extend functionality, and customize SAM AI for your needs.

## What SAM AI Does For You

- **Provides comprehensive APIs** for all SAM AI capabilities
- **Offers extensibility points** to add custom modules and agents
- **Includes development tools** for testing and debugging
- **Documents everything** with examples and reference implementations

## Quick Start

1. **Set up development environment** - Clone the repo, install dependencies
2. **Explore the APIs** - Review endpoints, try sample requests
3. **Build your first integration** - Start with a simple read operation
4. **Extend as needed** - Add custom modules for specialized functionality

## Key Modules

| Module | What It Does For You |
|--------|---------------------|
| [ai_brain](../modules/ai-brain.md) | Core intelligence API for LLM integration |
| [ai_sam](../modules/ai-sam.md) | Chat interface and orchestration APIs |
| [ai_sam_workflows](../modules/ai-sam-workflows.md) | Workflow engine for custom automations |
| [ai_sam_intelligence](../modules/ai-sam-intelligence.md) | Agent registration and health APIs |

## Common Questions

### What's the architecture of SAM AI?
SAM AI follows a three-layer architecture: ai_brain (intelligence) at the core, ai_sam (orchestration) in the middle, and specialized modules (workflows, lead_generator, etc.) for specific capabilities. See the [Architecture Guide](../guides/architecture.md) for details.

### How do I add a custom agent?
Implement the agent interface, register with ai_sam_intelligence, and add documentation. Custom agents can be called through the standard chat interface or directly via API. Check [API Reference](../guides/api-reference.md) for registration endpoints.

### Can I use my own LLM?
Yes. The ai_brain module supports multiple providers and can connect to local models via Ollama. Configure your provider and credentials in the module settings.

### How do I test integrations locally?
Use the development Docker container which includes all dependencies. Test endpoints are available at `/api/test/*`. Mock the LLM responses for deterministic testing.

## Next Steps

- [Getting Started Guide](../guides/getting-started.md) - Development environment setup
- [Architecture Guide](../guides/architecture.md) - System design deep dive
- [API Reference](../guides/api-reference.md) - Complete endpoint documentation
- [Full Documentation](https://sme.ec/insights) - Complete feature reference

---

*Canonical: https://sme.ec/insights/agents/developer*
