# FAQ: bbb_elearning_subscription

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About BBB E-Learning Subscription

### What is bbb_elearning_subscription?

A complete e-learning platform with integrated Stripe subscription billing for Odoo 18.

**Key facts:**
- Technical name: `bbb_elearning_subscription`
- Current version: 18.0.1.0.0
- Status: Alpha
- Requires: Odoo 18.0+, stripe and requests Python libraries
- License: LGPL-3

### How is this different from Odoo website_slides?

| Feature | website_slides | bbb_elearning_subscription |
|---------|----------------|---------------------------|
| Free courses | Yes | Yes |
| Subscription billing | No | Yes (Stripe) |
| Own data model | No (shared) | Yes (dedicated) |
| Progress tracking | Basic | Advanced |
| Certificates | Manual | Automatic |
| Learning paths | No | Yes (Knowledge Visualizer) |

### How is this different from ai_sam_members?

ai_sam_members is for membership tiers with simple pricing. bbb_elearning_subscription is a full LMS with courses, lessons, and content delivery.

---

## Installation & Setup

### How do I install?

1. Install Python dependencies: `pip install stripe requests`
2. Go to Apps
3. Search "BBB E-Learning"
4. Click Install

### How do I configure Stripe?

1. Go to Settings > Technical > System Parameters
2. Create parameter: `stripe_secret_key`
3. Set value to your Stripe secret key (sk_live_xxx or sk_test_xxx)

### What modules does this install?

Depends on: sale, account, payment, website, portal, crm, project, hr, calendar

---

## Usage

### How do I create a course?

1. Go to E-Learning > Courses
2. Click Create
3. Fill in title, description, category
4. Add content (lessons, videos, quizzes)
5. Publish when ready

### How do I create a subscription plan?

1. Go to E-Learning > Subscription Plans
2. Click Create
3. Set name, price, billing interval
4. Configure course access (all, premium, or selected)
5. Save - Stripe product/price created automatically

### How does auto-enrollment work?

When a subscription is created/activated:
1. System checks plan's course access setting
2. Creates enrollment records for included courses
3. Student can access courses based on subscription status

---

## Troubleshooting

### Why didn't my plan create in Stripe?

Check:
1. `stripe_secret_key` is set in System Parameters
2. API key is valid (test with Stripe dashboard)
3. Check Odoo logs for error messages

### Why can't a student access a course?

Check:
1. Subscription state is 'active' or 'trialing'
2. Enrollment exists for that course
3. Enrollment state is not 'suspended' or 'cancelled'

---

## Billing & Payments

### What billing intervals are supported?

- Monthly (1 month)
- Quarterly (3 months)
- Yearly (12 months)
- Custom intervals via `billing_interval_count`

### How do trial periods work?

1. Set `trial_period_days` on subscription plan (default: 14)
2. New subscriptions start in 'trialing' state
3. Student has full access during trial
4. Stripe auto-converts to 'active' when trial ends

### What happens when payment fails?

Subscription moves to 'past_due' state. Stripe handles retry logic. Course access may be suspended based on your configuration.

---

## Course Management

### What content types are supported?

- `video` - Embedded video (YouTube, Vimeo, etc.)
- `document` - Attached files for download
- `quiz` - Interactive quizzes with scoring
- `interactive` - Custom interactive content

### How do certificates work?

1. Enable certificates on course (`enable_certificate = True`)
2. Student completes all content
3. Certificate auto-generated with completion date
4. Accessible from student portal

### What is Knowledge Visualizer integration?

Optional integration with `knowledge.canvas` model for visual learning paths. Shows course relationships and recommended progressions.

---

## Technical

### Is this module production-ready?

No. Status is Alpha (see `development_status: 'Alpha'` in manifest). Expect:
- Breaking changes between versions
- Missing features
- Bugs and rough edges

Use in production at your own risk.

### What webhooks should I configure in Stripe?

Configure these webhook endpoints in Stripe dashboard:
- `invoice.paid` - Activate subscription
- `invoice.payment_failed` - Mark past_due
- `customer.subscription.deleted` - Mark canceled
- `customer.subscription.updated` - Sync status

---

## Support

- **Email:** sam@sme.ec
- **Author:** Better Business Builders

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Status: Alpha - Active Development*
