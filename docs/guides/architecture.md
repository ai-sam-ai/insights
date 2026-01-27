# SAM AI Architecture

> System design, module relationships, and deployment topology.

## Overview

SAM AI is a modular AI-powered business operating system built on Odoo 18. It follows a three-layer architecture that separates intelligence, orchestration, and specialized capabilities.

## Architecture Diagram

```
                         ┌──────────────────────────────┐
                         │         User Layer           │
                         │  (Chat Widget, API, Hooks)   │
                         └──────────────┬───────────────┘
                                        │
                         ┌──────────────▼───────────────┐
                         │          ai_sam              │
                         │    (Orchestration Layer)     │
                         │                              │
                         │  • Request routing           │
                         │  • Personality management    │
                         │  • Session handling          │
                         │  • Response formatting       │
                         └──────────────┬───────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          │                             │                             │
┌─────────▼─────────┐      ┌────────────▼────────────┐   ┌────────────▼────────────┐
│   ai_brain        │      │    ai_sam_memory        │   │  ai_sam_intelligence    │
│ (Intelligence)    │      │    (Persistence)        │   │  (Registry/Monitoring)  │
│                   │      │                         │   │                         │
│ • LLM integration │      │ • Conversation history  │   │ • Agent registry        │
│ • Context mgmt    │      │ • Session continuity    │   │ • Health monitoring     │
│ • Response gen    │      │ • Learning extraction   │   │ • Doc intelligence      │
└───────────────────┘      └─────────────────────────┘   └─────────────────────────┘
          │
          │ (reasoning requests)
          │
┌─────────▼───────────────────────────────────────────────────────────────────────┐
│                          Capability Layer                                        │
│                                                                                  │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │  ai_sam_workflows   │  │ai_sam_lead_generator│  │   (future modules)      │  │
│  │                     │  │                     │  │                         │  │
│  │  • N8N integration  │  │  • Web scraping     │  │  • Custom capabilities  │  │
│  │  • Trigger mgmt     │  │  • Lead enrichment  │  │  • Third-party agents   │  │
│  │  • Execution logs   │  │  • Batch processing │  │  • Domain-specific AI   │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────────┘  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

## Layer Descriptions

### User Layer
Entry points for interaction:
- **Chat Widget**: Odoo backend systray and website frontend
- **API**: JSON-RPC endpoints for programmatic access
- **Hooks**: Odoo model hooks for event-driven interaction

### Orchestration Layer (ai_sam)
Central coordinator that:
- Receives user input from all channels
- Routes requests to appropriate modules
- Manages conversation context and personality
- Formats responses for the requesting channel

### Core Services
Foundational capabilities used across the system:
- **ai_brain**: LLM interaction, reasoning, tool use
- **ai_sam_memory**: Conversation persistence and context retrieval
- **ai_sam_intelligence**: Agent registry, monitoring, documentation

### Capability Layer
Specialized modules that extend SAM's abilities:
- **ai_sam_workflows**: Process automation via N8N
- **ai_sam_lead_generator**: Sales prospecting
- **(extensible)**: Add custom modules for domain-specific needs

## Data Flow

```
User Message
    │
    ▼
ai_sam (receive)
    │
    ├──► ai_sam_memory (retrieve context)
    │
    ├──► ai_sam_intelligence (check capabilities)
    │
    ▼
ai_brain (process)
    │
    ├──► Tool calls (if needed)
    │    └──► Capability modules
    │
    ▼
ai_sam (format response)
    │
    ├──► ai_sam_memory (store interaction)
    │
    ▼
User Response
```

## Deployment Topology

### Minimal (Development)
```
┌─────────────────────────────┐
│  Single Server              │
│  ├── Odoo 18 + SAM modules  │
│  ├── PostgreSQL             │
│  └── N8N (optional)         │
└─────────────────────────────┘
```

### Production
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Load        │     │ Odoo        │     │ PostgreSQL  │
│ Balancer    │────►│ Cluster     │────►│ Primary     │
│             │     │ (2+ nodes)  │     │ + Replica   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
             ┌───────────┐  ┌───────────┐
             │ N8N       │  │ LLM       │
             │ Cluster   │  │ Provider  │
             └───────────┘  └───────────┘
```

## Extension Points

### Adding Custom Modules
1. Create standard Odoo module structure
2. Implement agent interface
3. Register with ai_sam_intelligence
4. Add documentation for discoverability

### Custom LLM Integration
1. Implement provider interface in ai_brain
2. Configure credentials in settings
3. Add to provider selection list

### Custom Triggers
1. Define Odoo model hooks
2. Connect to ai_sam_workflows
3. Configure N8N workflow

---

*Canonical: https://sme.ec/insights/guides/architecture*
