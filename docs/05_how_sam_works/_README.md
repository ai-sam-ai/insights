# How SAM Works

## Purpose
Technical deep-dive into SAM AI - architecture, data flows, and how all the pieces fit together.

## What's Here
- **Architecture** - High-level patterns, decisions, why things are structured this way
- **Data Flows** - How data moves through the system (Mermaid diagrams, sequence flows)
- **Implementation Details** - Technical specifics of each subsystem

## Subfolders (by Domain)

| Folder | Contents |
|--------|----------|
| `api/` | API strategy, provider architecture, MCP integration |
| `canvas/` | Canvas architecture + node/overlay flows |
| `chat/` | Chat system design |
| `chat_message_flow/` | Complete message flow diagrams |
| `context_assembly_flow/` | How context is built for AI calls |
| `sam_ai_api_infrastructure/` | API infrastructure diagrams (current) |
| `n8n_integration/` | N8N workflow integration |
| `n8n_workflows/` | Workflow execution details |
| `node_creation/` | How nodes are created |
| `workflows/` | Workflow system architecture |
| `core/` | Core system patterns |
| `database/` | Database design |
| `platform/` | Platform skin architecture |
| `insights/` | Insights system design |

## Examples
- "How does a chat message flow from UI to Claude and back?" → `chat_message_flow/`
- "What's the API provider architecture?" → `sam_ai_api_infrastructure/`
- "How is the canvas structured?" → `canvas/`

## Does NOT Include
- Individual module reference docs (go to `04_modules/`)
- Vision/strategy documents (go to `00_vision/`)
- Prompt engineering guides (go to `03_prompt_engineering/`)
