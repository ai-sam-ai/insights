# FAQ: ai_sam_members

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Members

### What is ai_sam_members?

ai_sam_members is a membership management module for Odoo 18 that provides tiered membership (free, founding, paid) with automatic pricing and usage tracking.

**Key facts:**
- Technical name: `ai_sam_members`
- Current version: 18.0.2.0.0
- Requires: Odoo 18.0+, ai_sam
- License: LGPL-3

### What are the membership tiers?

| Tier | Price | Access |
|------|-------|--------|
| Free | $0/month | eLearning only |
| Founding | $27/month | Full SAM (first 100 only) |
| Paid | $97/month | Full SAM |

### What is a founding member?

Founding members are the first 100 members to sign up. They are assigned numbers 1-100 and locked in at $27/month for life, regardless of future price increases.

---

## Installation & Setup

### How do I install ai_sam_members?

1. Ensure ai_sam module is installed
2. Navigate to Apps menu
3. Search for "SAM AI Members"
4. Click Install

### What are the dependencies?

- `base`, `base_automation`, `portal`, `website`, `mail`
- `ai_sam` (SAM AI Core)

---

## Usage

### How do members sign up?

Members can sign up via the public signup form at the module's signup template URL. The form creates:
1. A res.partner contact record
2. A res.users login account
3. A sam.member record linking them

### How is monthly price calculated?

Price is computed automatically:
- Free tier = $0
- Founding member (number 1-100) = $27
- Paid member = $97

The price field is read-only and updates when member type changes.

### How do I make someone a founding member?

1. Open the member record
2. Set member_type to "Founding Member"
3. Enter a founding_number (1-100)
4. Save

The number must be unique and between 1-100.

### How do I track member usage?

Each member record shows:
- `total_sessions` - Number of chat sessions
- `total_messages` - Total messages sent
- `last_activity` - Last activity timestamp
- `graph_nodes_count` - Knowledge nodes created

---

## Troubleshooting

### Why can't I assign founding number 101?

Founding numbers are constrained to 1-100. This is enforced at the database level.

### Why does member say "user already has account"?

Each user can only have one member record. Check if a member already exists for that user.

---

## Portal Access

### What portal access do different tiers get?

| Tier | Portal URL | Access Level |
|------|------------|--------------|
| Free | `/my/elearning` | eLearning courses only |
| Founding | `/my/sam` | Full SAM AI portal |
| Paid | `/my/sam` | Full SAM AI portal |

### Can I upgrade a free member to founding?

Yes, if founding slots (1-100) are still available:
1. Open the member record
2. Change member_type to "Founding Member"
3. Assign an available founding_number (1-100)
4. Save - price automatically updates to $27

---

## Comparisons

### How does ai_sam_members compare to bbb_elearning_subscription?

| Feature | ai_sam_members | bbb_elearning_subscription |
|---------|----------------|---------------------------|
| Purpose | Tiered membership | Course subscriptions |
| Payment handling | External/manual | Integrated billing |
| Pricing tiers | 3 (Free/Founding/Paid) | Flexible |
| Usage tracking | Yes (sessions/messages) | No |
| Best for | SaaS membership | Course-based access |

---

## Support

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-members
- **Email:** sam@sme.ec

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
