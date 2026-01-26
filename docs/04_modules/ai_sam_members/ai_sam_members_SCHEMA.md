# Schema: ai_sam_members

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_members` |
| **Version** | 18.0.2.0.0 |
| **Total Models** | 2 (1 new, 1 inherited) |
| **Total Controllers** | 1 (signup) |
| **API Endpoints** | Portal routes |

---

## Models

### sam.member (Primary Model)

**Purpose:** Member management with tiered pricing and usage tracking

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `active` | Boolean | No | Archive flag (default: True) |
| `partner_id` | Many2one | Yes | Delegated res.partner (cascade delete) |
| `user_id` | Many2one | Yes | Login account for member |
| `member_type` | Selection | Yes | free / founding / paid |
| `monthly_price` | Float | No | Computed based on tier (stored) |
| `founding_number` | Integer | No | 1-100 for founding members (unique) |
| `is_founding_member` | Boolean | No | Computed: founding_number is 1-100 |
| `subscription_status` | Selection | Yes | active / trial / cancelled / expired |
| `subscription_start` | Date | No | Start date |
| `subscription_end` | Date | No | End date |
| `total_sessions` | Integer | No | Chat session count |
| `total_messages` | Integer | No | Message count |
| `last_activity` | Datetime | No | Last activity timestamp |
| `graph_nodes_count` | Integer | No | Knowledge nodes count |
| `funnel_stage` | Selection | Yes | visitor / lead / free / paid / saas |

**Inherits:** mail.thread, mail.activity.mixin
**Inherits Delegation:** res.partner (via partner_id)

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `_compute_is_founding()` | Check if founding_number is 1-100 | Updates is_founding_member |
| `_compute_monthly_price()` | Calculate price based on tier | Updates monthly_price |
| `get_portal_url()` | Get appropriate portal URL | "/my/sam" or "/my/elearning" |

**SQL Constraints:**
- `founding_number_unique` - founding_number must be unique
- `founding_number_range` - founding_number must be 1-100 or NULL

**Python Constraints:**
- `_check_unique_user` - One user can only have one member record

---

### res.partner (Inherited)

**Purpose:** Extend partner with membership fields (if any)

*Note: Primary membership data is in sam.member via inherits delegation*

---

## Member Types and Pricing

| Type | Condition | Monthly Price |
|------|-----------|---------------|
| `free` | Default | $0 |
| `founding` | founding_number 1-100 | $27 |
| `paid` | Standard paid | $97 |

---

## Funnel Stages

| Stage | Description |
|-------|-------------|
| `visitor` | Anonymous website visitor |
| `lead` | Captured lead (email collected) |
| `free` | Free member signup complete |
| `paid` | Paying member |
| `saas` | Full SaaS customer |

---

## Subscription Status

| Status | Description |
|--------|-------------|
| `active` | Active subscription |
| `trial` | In trial period |
| `cancelled` | User cancelled |
| `expired` | Subscription expired |

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│      sam.member         │
│                         │
│  - member_type          │
│  - founding_number      │
│  - subscription_status  │
│  - partner_id ──────────┼─────┐ (_inherits delegation)
│  - user_id ─────────────┼──────► res.users
└─────────────────────────┘     │
                                ▼
                    ┌─────────────────────┐
                    │    res.partner      │
                    │                     │
                    │  - name             │
                    │  - email            │
                    │  - phone            │
                    │  - (all partner     │
                    │    fields)          │
                    └─────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `sam.member` | group_sam_free_member | Yes | No | No | No |
| `sam.member` | group_sam_paid_member | Yes | Yes | No | No |
| `sam.member` | group_sam_admin | Yes | Yes | Yes | Yes |

**Custom Security Groups (security_groups.xml):**
- `group_sam_free_member` - Free tier members (read-only access)
- `group_sam_paid_member` - Paid/Founding members (can edit own record)
- `group_sam_admin` - Full administrative access

---

## Email Templates

### Welcome Email (mail_templates.xml)

- **Template Name:** SAM AI Welcome
- **Model:** sam.member
- **Trigger:** Automated action on create

---

## Automated Actions

### Welcome Email Automation

- **Trigger:** On create of sam.member
- **Action:** Send welcome email template
- **Condition:** member_type in ('free', 'founding', 'paid')

---

## Portal Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/my/sam` | Paid/Founding | Full SAM portal |
| `/my/elearning` | Free | eLearning only portal |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `sam_member` | `sam.member` | Member records |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
| 2025-01-26 | Enhanced to 10/10: Corrected security groups | CTO Module Docs Reviewer |
