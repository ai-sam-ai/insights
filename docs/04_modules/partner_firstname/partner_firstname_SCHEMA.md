# Schema: partner_firstname

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `partner_firstname` |
| **Version** | 18.0.1.0.1 |
| **Total Models** | 3 (all inherit existing models) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### res.partner (Inherited)

**Purpose:** Adds firstname/lastname fields and makes name computed

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstname` | Char | No* | First name, indexed |
| `lastname` | Char | No* | Last name, indexed |
| `name` | Char | No | Computed from firstname + lastname |

*At least one of firstname or lastname required for contacts (not addresses)

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_name()` | Computes `name` from firstname/lastname | None |
| `_inverse_name_after_cleaning_whitespace()` | Splits name back to parts | None |
| `_get_inverse_name(name, is_company)` | Parses full name into parts | dict {lastname, firstname} |
| `_get_computed_name(lastname, firstname)` | Joins parts into full name | string |
| `_get_names_order()` | Gets configured name order | string |
| `_install_partner_firstname()` | Migrates existing names on install | None |

**Name Order Options:**

| Order | Code | Example |
|-------|------|---------|
| First Last | `first_last` | "John Smith" |
| Last First | `last_first` | "Smith John" |
| Last, First | `last_first_comma` | "Smith, John" |

**Constraints:**
- Contact-type partners must have at least firstname OR lastname
- Company names go to lastname only (firstname stays empty)

---

### res.users (Inherited)

**Purpose:** Extends user with firstname/lastname support

Inherits the same firstname/lastname fields from res.partner.

---

### res.config.settings (Inherited)

**Purpose:** Adds name order configuration to Settings

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_names_order` | Selection | Yes | Order for composing full name |
| `partner_names_order_changed` | Boolean | No | Flag when order changed |

**Selection Options:**
- `last_first` - "Lastname Firstname"
- `last_first_comma` - "Lastname, Firstname"
- `first_last` - "Firstname Lastname"

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_recalculate_partners_name()` | Recalculates all partner names with new order | True |

---

## Configuration Parameters

Stored in `ir.config_parameter`:

| Key | Default | Purpose |
|-----|---------|---------|
| `partner_names_order` | `first_last` | How to compose full name |
| `partner_names_order_changed` | (empty) | Flag for UI indication |

---

## Name Parsing Logic

**When creating partner with full name:**
```python
# Input: name = "John Smith"
# Order: first_last
# Result: firstname = "John", lastname = "Smith"

# Input: name = "Smith, John"
# Order: last_first_comma
# Result: firstname = "John", lastname = "Smith"
```

**When computing name from parts:**
```python
# firstname = "John", lastname = "Smith"
# Order: first_last → "John Smith"
# Order: last_first → "Smith John"
# Order: last_first_comma → "Smith, John"
```

**For companies:**
- Full name goes to `lastname`
- `firstname` stays empty

---

## Hooks

### post_init_hook

**File:** `hooks.py`

Called after module installation to split existing partner names into firstname/lastname.

```python
def post_init_hook(cr, registry):
    env = api.Environment(cr, SUPERUSER_ID, {})
    env["res.partner"]._install_partner_firstname()
```

---

## Exceptions

**File:** `exceptions.py`

| Exception | When Raised |
|-----------|-------------|
| `EmptyNamesError` | Contact has neither firstname nor lastname |

---

## View Modifications

### res.partner Form

- Adds firstname/lastname fields in header
- Makes `name` field readonly for persons
- Shows firstname/lastname in edit mode

### res.users Form

- Same modifications as partner form

### res.config.settings Form

- Adds "Partner names order" selection
- Adds "Recalculate Names" button

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│     User Input / Import         │
│  "John Smith" OR               │
│  firstname="John"              │
│  lastname="Smith"              │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│       res.partner.create()      │
│                                 │
│  If name provided without       │
│  firstname/lastname:            │
│    → _get_inverse_name()        │
│    → Split into parts           │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│       res.partner               │
│                                 │
│  firstname = "John"             │
│  lastname = "Smith"             │
│  name = computed ───────────────┼──► "John Smith" (or other order)
└─────────────────────────────────┘
               ▲
               │
┌──────────────┴──────────────────┐
│     ir.config_parameter         │
│                                 │
│  partner_names_order = "first_last"
└─────────────────────────────────┘
```

---

## Security Rules

No custom security rules. Uses inherited res.partner permissions.

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `res_partner` | `res.partner` | Extended with firstname, lastname columns |
| `res_users` | `res.users` | Extended with firstname, lastname columns |

**Indexes:**
- `firstname` - indexed for search performance
- `lastname` - indexed for search performance

---

## Tests

Comprehensive test suite in `tests/`:
- `test_config_settings.py` - Settings behavior
- `test_copy.py` - Partner copying
- `test_create.py` - Partner creation
- `test_defaults.py` - Default values
- `test_delete.py` - Deletion behavior
- `test_empty.py` - Empty name handling
- `test_name.py` - Name computation
- `test_order.py` - Name ordering
- `test_partner_form.py` - Form behavior
- `test_user_form.py` - User form behavior

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
