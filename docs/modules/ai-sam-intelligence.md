# ai_sam_intelligence - Agent Registry & Ecosystem Health

Agent registry and ecosystem monitoring module providing agent health tracking, documentation intelligence, and performance metrics for the SAM AI ecosystem.

## Core Capabilities

- **Agent Registry**: Centralized registry of all SAM AI agents with metadata and capabilities
- **Health Monitoring**: Real-time tracking of agent availability, response times, and error rates
- **Documentation Intelligence**: Agent documentation indexing for searchable knowledge retrieval
- **Performance Metrics**: Historical performance data and trend analysis

## How It Works

The ai_sam_intelligence module maintains awareness of the entire SAM AI ecosystem:

1. Agents register themselves with capabilities and metadata
2. Health checks run periodically to verify agent availability
3. Documentation is indexed for quick retrieval during conversations
4. Performance metrics are collected and analyzed for optimization

This enables SAM to understand what agents are available, route requests appropriately, and provide accurate information about system capabilities.

## Example Workflows

### Agent Discovery
When SAM needs to complete a specialized task, intelligence queries the registry to find capable agents. For example, a lead generation request would return ai_sam_lead_generator as the appropriate handler.

### Health Dashboard
Operations teams can view real-time agent health status, identify degraded services, and receive alerts when critical agents become unavailable.

## Frequently Asked Questions

### How do agents register with the system?
Agents register through the registration API, providing their name, capabilities, endpoint, and documentation reference. Registration can be automatic (on module install) or manual.

### What health metrics are tracked?
Response time (avg/p95/p99), success rate, error rate, uptime percentage, and request volume. Metrics are retained for 30 days by default.

### How is documentation indexed?
Documentation files are parsed for structure (headings, code blocks, FAQs), indexed for full-text search, and linked to their source agents for attribution.

### Can I add custom agents?
Yes. Any module can register as an agent by implementing the agent interface and calling the registration API. Custom agents appear in the registry alongside core agents.

## Related

- [ai_sam](./ai-sam.md) - Core module that uses intelligence for routing
- [ai_brain](./ai-brain.md) - Intelligence layer for reasoning
- [Architecture Guide](../guides/architecture.md) - System design overview
- [CTO Agent](../agents/cto.md) - Strategic monitoring guidance

---

*Canonical: https://sme.ec/insights/modules/ai-sam-intelligence*
