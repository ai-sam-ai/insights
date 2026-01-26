# Schema: {module_name}

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `{module_name}` |
| **Version** | 18.0.x.x.x |
| **Total Models** | X (Y regular, Z transient, W abstract) |
| **Total Controllers** | X |
| **API Endpoints** | X |

---

## Models

### {model.name} (Primary Model)

**Purpose:** [What this model stores/manages]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name |
| `state` | Selection | Yes | draft / active / archived |
| `{field_name}` | {Type} | {Yes/No} | {Description} |
| `{field_name}` | {Type} | {Yes/No} | {Description} |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `action_{name}()` | [What it does] | [Return type] |
| `_compute_{name}()` | [What it computes] | [Field updated] |

**Relationships:**
- `{field}_id` → `{other.model}` (Many2one)
- `{field}_ids` → `{other.model}` (One2many)

---

### {model.name.2} (Secondary Model)

**Purpose:** [What this model stores/manages]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `{field_name}` | {Type} | {Yes/No} | {Description} |

---

## Controllers / API Endpoints

### REST Endpoints

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/{module}/endpoint` | GET | user | [What it returns] |
| `/api/{module}/endpoint` | POST | user | [What it does] |
| `/api/{module}/endpoint/<int:id>` | PUT | user | [What it updates] |

### JSON-RPC Methods

| Model | Method | Purpose |
|-------|--------|---------|
| `{model.name}` | `rpc_method_name` | [What it does] |

---

## Request/Response Examples

### GET /api/{module}/endpoint

**Request:**
```http
GET /api/{module}/endpoint HTTP/1.1
Authorization: Bearer {token}
```

**Response:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "Example",
        "state": "active"
    }
}
```

### POST /api/{module}/endpoint

**Request:**
```json
{
    "name": "New Record",
    "config": {
        "option1": true
    }
}
```

**Response:**
```json
{
    "status": "success",
    "id": 123
}
```

---

## Data Relationships Diagram

```
┌─────────────────────┐
│   {primary.model}   │
│                     │
│  - name             │
│  - state            │
│  - config_json      │
└──────────┬──────────┘
           │
           │ One2many
           ▼
┌─────────────────────┐
│  {child.model}      │
│                     │
│  - parent_id (M2O)  │◄────────┐
│  - sequence         │         │
│  - data             │         │
└─────────────────────┘         │
                                │
┌─────────────────────┐         │
│  {related.model}    │─────────┘
│                     │  Many2one
│  - reference_id     │
│  - type             │
└─────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `{model.name}` | base.group_user | ✅ | ✅ | ✅ | ❌ |
| `{model.name}` | base.group_system | ✅ | ✅ | ✅ | ✅ |
| `{model.name.2}` | base.group_user | ✅ | ❌ | ❌ | ❌ |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `{table_name}` | `{model.name}` | [What it stores] |
| `{table_name_2}` | `{model.name.2}` | [What it stores] |

---

## Indexes and Performance

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| `{table}` | `{index_name}` | `field1, field2` | [Why indexed] |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| YYYY-MM-DD | Initial schema documentation | [name] |
