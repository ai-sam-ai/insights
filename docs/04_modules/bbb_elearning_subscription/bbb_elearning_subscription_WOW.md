# BBB E-Learning Subscription Platform

## A Complete LMS with Built-In Stripe Billing - Finally

---

### The Problem You Know Too Well

You want to sell courses online. Not just host them - actually sell them with recurring subscriptions.

So you look at your options:
- External platforms (Teachable, Thinkific) that don't integrate with your Odoo
- Odoo's website_slides - great for free courses, no payment integration
- Building it yourself - months of development

**It doesn't have to be this way.**

---

### What If Your LMS and Billing Were One System?

Imagine creating a course, setting up a subscription plan, and having students auto-enroll when they subscribe. Imagine Stripe handling the recurring billing while Odoo handles everything else - enrollments, progress, certificates, support tickets.

No Zapier. No manual processes. No spreadsheets tracking who paid what.

**That's BBB E-Learning Subscription.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Complete LMS** | Courses, lessons, quizzes, progress tracking - all built-in |
| **Stripe Subscriptions** | Monthly, quarterly, yearly billing with automatic renewals |
| **Trial Periods** | Configurable free trials that convert to paid |
| **Auto-Enrollment** | Subscribers automatically get access to plan courses |
| **Access Control** | Subscription status controls course access in real-time |
| **Learning Paths** | Visual course workflows via Knowledge Visualizer |
| **Certificates** | Auto-generated on course completion |
| **Full Analytics** | Course performance, revenue, student engagement |

---

### Subscription Plans

| Feature | Basic | Standard | Premium | Enterprise |
|---------|-------|----------|---------|------------|
| Course Access | Selected | All | All | All |
| Downloads | No | Yes | Yes | Yes |
| Certificates | No | Yes | Yes | Yes |
| Forum Access | No | Yes | Yes | Yes |
| Instructor Chat | No | No | Yes | Yes |
| Priority Support | No | No | No | Yes |

*Plans are fully configurable - this is just an example structure.*

---

### How It Works

1. **Create Courses** - Add lessons, videos, quizzes, resources
2. **Define Plans** - Set pricing, billing interval, included courses
3. **Stripe Sync** - Plans automatically create Stripe products/prices
4. **Student Subscribes** - Payment handled by Stripe, enrollment handled by Odoo
5. **Auto-Access** - Subscription status controls what student can access
6. **Track Everything** - Progress, payments, renewals, cancellations

---

### Who Is This For?

**BBB E-Learning Subscription is perfect for:**

- Course creators who want integrated billing
- Training companies selling subscriptions
- Membership sites with educational content
- Anyone who's tired of juggling LMS + payment + CRM tools

**This probably isn't for you if:**

- You just need free course hosting (use website_slides)
- You don't need subscriptions (use individual course sales)
- You're not ready for Stripe integration

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+ with stripe, requests libraries
- **Dependencies:** sale, account, payment, website, portal, crm, project, hr, calendar
- **Models:** 12+ including course, content, enrollment, subscription, plan
- **Status:** Alpha (active development)
- **Documentation:** [Full technical docs](bbb_elearning_subscription_SCHEMA.md)

</details>

---

### Ready to Sell Courses?

Install BBB E-Learning Subscription, configure your Stripe API key, and launch your first subscription plan.

---

*BBB E-Learning Subscription Platform - By Better Business Builders*
*Version 18.0.1.0.0 | Odoo 18 Compatible | LGPL-3 License*
