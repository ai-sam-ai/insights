# SAM AI Modules

> Core building blocks of the SAM AI business operating system.

## Module Overview

| Module | Purpose | Status |
|--------|---------|--------|
| [ai_sam](./ai-sam.md) | Core chat interface and orchestration | Active |
| [ai_sam_workflows](./ai-sam-workflows.md) | N8N workflow integration | Active |
| [ai_sam_intelligence](./ai-sam-intelligence.md) | Agent registry and ecosystem health | Active |
| [ai_sam_lead_generator](./ai-sam-lead-generator.md) | Web scraping and lead generation | Active |
| [ai_sam_memory](./ai-sam-memory.md) | Conversation persistence | Active |
| [ai_brain](./ai-brain.md) | Core intelligence layer | Active |

## Architecture

```
                    ┌─────────────────┐
                    │    ai_brain     │
                    │  (Intelligence) │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │     ai_sam      │
                    │ (Orchestration) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────┴───────┐   ┌────────┴────────┐   ┌───────┴───────┐
│  ai_sam_      │   │   ai_sam_       │   │   ai_sam_     │
│  workflows    │   │   intelligence  │   │   memory      │
└───────────────┘   └─────────────────┘   └───────────────┘
        │
┌───────┴───────┐
│  ai_sam_      │
│lead_generator │
└───────────────┘
```

## Getting Started

1. [Install SAM AI](../guides/getting-started.md)
2. Configure the core [ai_sam](./ai-sam.md) module
3. Enable additional modules based on your needs

---

*Canonical: https://sme.ec/insights/modules*
