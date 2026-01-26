# Module: bbb_elearning_subscription

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `bbb_elearning_subscription` |
| **Version** | 18.0.1.0.0 |
| **Source Path** | `D:\github_repos\07_samai_website_and_options\bbb_elearning_subscription` |
| **Manifest** | `D:\github_repos\07_samai_website_and_options\bbb_elearning_subscription\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\bbb_elearning_subscription\` |
| **Online URL** | https://sme.ec/documentation/modules/bbb-elearning-subscription |
| **Status** | Alpha |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

bbb_elearning_subscription is a complete standalone e-learning platform with integrated Stripe subscription billing. Unlike ai_sam_e_learning (which extends website_slides), this is a full LMS with its own course, content, enrollment, and progress models. Features include subscription plans (monthly/quarterly/yearly), automatic recurring billing, trial periods, course access management based on subscription status, and Knowledge Visualizer integration for learning paths.

---

## Dependencies

### Odoo Module Dependencies
- `base`, `web`, `mail` - Core Odoo
- `sale`, `account`, `payment` - E-commerce
- `website`, `portal` - Frontend
- `crm`, `project`, `hr`, `calendar` - Business integration

### Python Libraries Required
- `stripe` - Stripe API integration
- `requests` - HTTP requests

---

## For End Users (What Can This Do For Me?)

- **Full LMS** - Create courses with lessons, quizzes, and multimedia content
- **Subscription billing** - Monthly, quarterly, or yearly plans via Stripe
- **Automatic enrollment** - Students get course access based on their subscription
- **Progress tracking** - Track completion, time spent, and quiz scores
- **Certificates** - Auto-generate certificates on course completion
- **Learning paths** - Visual course workflows via Knowledge Visualizer

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 12+ | elearning.course, elearning.content, elearning.enrollment, elearning.progress, subscription.plan, elearning.subscription, etc. |
| Controllers | 2 | Portal, Stripe webhook |
| Views | 15+ | Backend forms, trees, portal templates |
| Wizards | 3 | Enrollment, subscription change, bulk enrollment |
| Reports | 3 | Course analytics, subscription analytics, progress |
| Security Rules | 22 | User and portal access |

**Key Files:**
- `models/elearning_course.py` - Course with categories, instructors, prerequisites
- `models/subscription.py` - Subscription plan and active subscription management
- `models/stripe_integration.py` - Stripe API wrapper
- `controllers/` - Portal and webhook endpoints

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: LMS, course creation, subscription billing, Stripe integration
- User wants to: sell courses, manage subscriptions, track student progress
- User mentions: e-learning subscriptions, recurring billing, course enrollment

### Related Agents
- `/cto-developer` - For implementation changes
- `/sales-strategist` - For pricing strategy

### Delegate To
- `/cto-architect` - For subscription model changes
- `/cto-developer` - For code implementation

---

## Cross-References

### Related Modules
- `ai_sam_e_learning` - Different approach (extends website_slides)
- `ai_sam_members` - Membership tiers (different scope)
- `knowledge.canvas` - Learning path visualization

---

## Known Gotchas (Painfully Learned)

1. **Stripe API key required** - Set `stripe_secret_key` in System Parameters before creating plans

2. **Alpha status** - Module is in active development; breaking changes possible

3. **Knowledge Visualizer dependency** - Learning path feature requires knowledge.canvas model (not bundled)

4. **Many dependencies** - Pulls in sale, account, payment, crm, project, hr, calendar

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Quick summary accurately describes module

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Documentor |
