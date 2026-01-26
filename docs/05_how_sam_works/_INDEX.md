# Data Flow Diagrams Index

> **Purpose:** Visual documentation of how data moves through SAM AI modules

---

## How to Use This Section

1. **Browse flows** - Each subdirectory contains a specific data flow
2. **Start with DIAGRAM.md** - Visual overview first
3. **Read DETAIL.md** - Step-by-step if you need more

---

## Creating New Data Flows

```bash
/cto-dataflow {description}        # Create diagram
/cto-dataflow-review {flow_name}   # Review to 10/10
```

---

## Data Flows

| Flow Name | Modules | Description | Status |
|-----------|---------|-------------|--------|
| [sam_ai_api_infrastructure](./sam_ai_api_infrastructure/) | ai_sam_base, ai_sam | Complete API infrastructure: HTTP endpoints, session management, AI provider routing, tool execution | Created 2025-01-25 |

---

## Related Documentation

- [Module Documentation](../04_modules/) - SCHEMA.md files used as source
- [Architecture Docs](../05_architecture/) - High-level system design

---

## Diagram Types Used

| Type | Mermaid | Best For |
|------|---------|----------|
| Sequence | `sequenceDiagram` | API request/response flows |
| Flowchart | `flowchart` | Decision trees, processes |
| ER Diagram | `erDiagram` | Model relationships |
| State | `stateDiagram-v2` | Workflow state transitions |

---

## Standards

All diagrams follow standards in:
- [diagram_standards.md](../../.claude/agents/cto-dataflow/diagram_standards.md)
- SAM AI color scheme (Blue #4A90E2, Gold #F4C430)
