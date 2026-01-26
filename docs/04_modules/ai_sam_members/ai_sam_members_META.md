# Module: ai_sam_members

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_members` |
| **Version** | 18.0.2.0.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\ai_sam_members` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\ai_sam_members\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_members\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-members |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_members provides a complete membership management system for the SAM AI platform. It supports free, founding member (first 100 at $27/month), and paid member ($97/month) tiers. Includes member signup portal, automated welcome emails, portal access control, and usage tracking (sessions, messages, knowledge nodes). The module uses inherits delegation from res.partner for contact info.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo
- `base_automation` - Automated actions for welcome emails
- `portal` - Portal access
- `website` - Signup pages
- `mail` - Email templates
- `ai_sam` - SAM AI Core (framework, menus)

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- **Member tiers** - Free, Founding (#1-100 at $27/month), and Paid ($97/month)
- **Automatic pricing** - Founding members locked in at $27/month for life
- **Signup portal** - Public signup form creates member accounts
- **Welcome automation** - Automated welcome emails on signup
- **Usage tracking** - Track sessions, messages, and knowledge nodes per member
- **Funnel stages** - Track visitor > lead > free > paid > SaaS progression

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | sam.member (new), res.partner (inherit) |
| Controllers | 1 | Signup controller (implied in signup_template) |
| Views | 4 | Member views, menu, signup template, portal |
| Email Templates | 1 | Welcome email |
| Automated Actions | 1 | Welcome email trigger |
| Security Rules | 3 | ir.model.access.csv (3 rules: free read-only, paid read+write, admin full) |

**Key Files:**
- `models/sam_member.py` - Core member model with tiers and pricing
- `models/res_partner.py` - Partner extensions
- `views/signup_template.xml` - Public signup form
- `views/portal_templates.xml` - Member portal pages
- `data/mail_templates.xml` - Welcome email template
- `data/automated_actions.xml` - Welcome email automation

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: members, membership, founding members, member pricing
- User wants to: sign up, manage members, check member tier, founding member status
- User mentions: $27, $97, first 100, member portal, subscription tier

### Related Agents
- `/sam` - SAM AI chat integration
- `/cto-developer` - For implementation changes

### Delegate To
- `/cto-architect` - For membership tier changes
- `/cto-developer` - For code implementation

---

## Cross-References

### Related Modules
- `ai_sam` - SAM AI Core (depends on)
- `ai_sam_base` - For brain/intelligence integration
- `ai_sam_e_learning` - For learning portal access

---

## Known Gotchas (Painfully Learned)

1. **Inherits vs Inherit** - Uses `_inherits` delegation from res.partner, meaning sam.member has its own table but delegates fields to res.partner. Don't confuse with standard `_inherit`.

2. **Founding number constraint** - founding_number must be 1-100 or NULL. Unique constraint prevents duplicates.

3. **User uniqueness** - One user can only have one member record (constraint enforced).

4. **Monthly price is computed** - Based on member_type and is_founding_member, not directly editable.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (2)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid

**Last Verification:** 2025-01-26 by CTO Module Docs Reviewer (enhanced to 10/10)

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
