# API Reference

> Complete endpoint documentation for SAM AI integration.

## Authentication

All API calls require Odoo session authentication. Use standard Odoo JSON-RPC authentication:

```json
POST /web/session/authenticate
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "db": "your_database",
        "login": "your_username",
        "password": "your_password"
    }
}
```

## Chat API

### Send Message

Send a message to SAM and receive a response.

```json
POST /ai_sam/api/chat
{
    "message": "Hello, SAM",
    "session_id": "optional-session-id",
    "context": {
        "model": "res.partner",
        "res_id": 123
    }
}
```

**Response:**
```json
{
    "response": "Hello! How can I help you today?",
    "session_id": "generated-session-id",
    "metadata": {
        "model_used": "claude-3-sonnet",
        "tokens_used": 150,
        "processing_time_ms": 1200
    }
}
```

### Stream Message

Stream a response for real-time display.

```json
POST /ai_sam/api/chat/stream
{
    "message": "Explain our sales pipeline",
    "session_id": "session-id"
}
```

**Response:** Server-sent events stream with chunks.

## Memory API

### Get Conversation History

```json
POST /ai_sam_memory/api/history
{
    "session_id": "session-id",
    "limit": 50,
    "offset": 0
}
```

### Search Past Conversations

```json
POST /ai_sam_memory/api/search
{
    "query": "lead generation discussion",
    "user_id": 1,
    "date_from": "2025-01-01",
    "date_to": "2025-01-31"
}
```

## Intelligence API

### List Registered Agents

```json
GET /ai_sam_intelligence/api/agents
```

**Response:**
```json
{
    "agents": [
        {
            "id": "ai_sam_lead_generator",
            "name": "Lead Generator",
            "status": "healthy",
            "capabilities": ["web_scraping", "lead_enrichment"],
            "last_health_check": "2025-01-27T10:00:00Z"
        }
    ]
}
```

### Register Custom Agent

```json
POST /ai_sam_intelligence/api/agents/register
{
    "id": "my_custom_agent",
    "name": "My Custom Agent",
    "endpoint": "/my_module/api/invoke",
    "capabilities": ["custom_capability"],
    "documentation_url": "https://example.com/docs"
}
```

### Get Agent Health

```json
GET /ai_sam_intelligence/api/agents/{agent_id}/health
```

## Workflow API

### Trigger Workflow

```json
POST /ai_sam_workflows/api/trigger
{
    "workflow_id": "workflow-uuid",
    "data": {
        "record_id": 123,
        "model": "crm.lead"
    }
}
```

### List Workflow Executions

```json
GET /ai_sam_workflows/api/executions
{
    "workflow_id": "workflow-uuid",
    "status": "completed",
    "limit": 20
}
```

## Brain API

### Direct LLM Call

For advanced use cases requiring direct LLM access:

```json
POST /ai_brain/api/completion
{
    "messages": [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "What is 2+2?"}
    ],
    "model": "claude-3-sonnet",
    "max_tokens": 1000
}
```

### Get Token Usage

```json
GET /ai_brain/api/usage
{
    "date_from": "2025-01-01",
    "date_to": "2025-01-31"
}
```

## Error Handling

All endpoints return errors in standard format:

```json
{
    "error": {
        "code": "RATE_LIMITED",
        "message": "Too many requests. Please retry after 60 seconds.",
        "retry_after": 60
    }
}
```

Common error codes:
- `UNAUTHORIZED`: Invalid or missing authentication
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `LLM_ERROR`: Error from LLM provider
- `VALIDATION_ERROR`: Invalid request parameters

---

*Canonical: https://sme.ec/insights/guides/api-reference*
