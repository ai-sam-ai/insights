# Schema: crm_lead_firstname

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `crm_lead_firstname` |
| **Version** | 18.0.0.1 |
| **Total Models** | 1 (inherits crm.lead) |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Models

### crm.lead (Inherited)

**Purpose:** Extends CRM lead with separate first and last name fields for contacts

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contact_name` | Char | No | First name (repurposed from standard "Contact Name") |
| `contact_lastname` | Char | No | Last name of contact |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `_create_lead_partner_data()` | Overrides to pass firstname/lastname when creating partner | dict |
| `_onchange_partner_id_values()` | Overrides to pull firstname/lastname from selected partner | dict |

**Method Details:**

#### _create_lead_partner_data(name, is_company, parent_id=False)
Extends the partner creation data to include split names:
- If not a company and `contact_name` is set: adds `firstname` to data, removes `name`
- If not a company and `contact_lastname` is set: adds `lastname` to data, removes `name`

This ensures the `partner_firstname` module properly computes the full name from parts.

#### _onchange_partner_id_values(partner_id)
When a partner is selected on the lead:
- If partner is not a company: copies `partner.firstname` to `contact_name`
- If partner is not a company: copies `partner.lastname` to `contact_lastname`

---

## View Modifications

### res.partner Simple Form (Kanban)

**View ID:** `view_partner_simple_form_firstname`
**Inherits:** `base.view_partner_simple_form`

**Changes:**
- Makes `name` field readonly for persons (not is_company)
- Makes `name` field required only for companies
- Adds `firstname` and `lastname` fields after name header (visible in edit mode for persons)

### res.partner Full Form

**View ID:** `view_partner_form_firstname`
**Inherits:** `base.view_partner_form`

**Changes:**
- Adds "Social Media" page before Internal Notes with fields:
  - facebook_url, linkedin_url, twitter_url, youtube_url
  - instagram_url, angellist_url, googleplus_url, github_url
  - skype_url, fbpage_url, fbgroup_url
  - google_contacts_id, google_contacts_account
- Makes `name` readonly/required based on is_company
- Adds firstname/lastname fields in header for persons
- Modifies child_ids inline form with same name logic

---

## Controllers / API Endpoints

This module has no controllers or API endpoints.

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│        crm.lead             │
│                             │
│  - contact_name (Char)      │──── First name
│  - contact_lastname (Char)  │──── Last name
│  - partner_id (M2O) ────────┼─────┐
└─────────────────────────────┘     │
                                    │
        _create_lead_partner_data() │  _onchange_partner_id_values()
        ──────────────────────────► │ ◄────────────────────────────
                                    ▼
┌─────────────────────────────┐
│       res.partner           │
│   (via partner_firstname)   │
│                             │
│  - firstname (Char)         │
│  - lastname (Char)          │
│  - name (computed)          │
└─────────────────────────────┘
```

---

## Security Rules

This module does not define its own security rules. Access is controlled by:
- `crm` module - for crm.lead access
- `base` module - for res.partner access

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `crm_lead` | `crm.lead` | Extended with contact_lastname field |

Note: `contact_name` already exists in base crm.lead; this module repurposes it.

---

## Tests

The module includes tests at `tests/test_crm_lead.py` to verify:
- Name sync behavior on partner selection
- Partner creation from lead with split names

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
