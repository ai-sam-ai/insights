# Schema: bbb_elearning_subscription

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `bbb_elearning_subscription` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 12+ |
| **Total Controllers** | 2 |
| **Wizards** | 3 |
| **Status** | Alpha |

---

## Models

### elearning.course (Primary)

**Purpose:** Course definition with content, instructors, and subscription access

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Course title |
| `description` | Html | No | Full description |
| `short_description` | Text | No | Brief overview |
| `sequence` | Integer | No | Display order |
| `category_id` | Many2one | No | Course category |
| `tag_ids` | Many2many | No | Course tags |
| `content_ids` | One2many | No | Course content/lessons |
| `lesson_count` | Integer | No | Computed lesson count |
| `total_duration` | Float | No | Computed total hours |
| `instructor_ids` | Many2many | No | Instructors (hr.employee) |
| `main_instructor_id` | Many2one | No | Lead instructor |
| `difficulty_level` | Selection | No | beginner/intermediate/advanced/expert |
| `prerequisite_course_ids` | Many2many | No | Required courses |
| `enrollment_ids` | One2many | No | Enrollments |
| `student_count` | Integer | No | Computed enrolled students |
| `completion_rate` | Float | No | Computed completion % |
| `subscription_plan_ids` | Many2many | No | Plans including this course |
| `is_premium` | Boolean | No | Requires active subscription |
| `individual_price` | Monetary | No | One-time purchase price |
| `state` | Selection | Yes | draft/review/published/archived |
| `course_image` | Binary | No | Cover image |
| `rating_avg` | Float | No | Computed average rating |
| `knowledge_canvas_id` | Many2one | No | Learning path canvas |
| `enable_certificate` | Boolean | No | Enable completion certificates |

**Inherits:** mail.thread, mail.activity.mixin, website.seo.metadata, website.published.mixin

---

### elearning.content

**Purpose:** Individual lessons/content items within a course

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Content title |
| `course_id` | Many2one | Yes | Parent course |
| `sequence` | Integer | No | Order within course |
| `content_type` | Selection | Yes | video/document/quiz/interactive |
| `duration` | Float | No | Duration in hours |
| `description` | Html | No | Content description |
| `video_url` | Char | No | Video embed URL |
| `document_id` | Many2one | No | Attached document |

---

### elearning.enrollment

**Purpose:** Student enrollment in a course

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `course_id` | Many2one | Yes | Enrolled course |
| `student_id` | Many2one | Yes | Student (res.partner) |
| `subscription_id` | Many2one | No | Associated subscription |
| `enrollment_date` | Datetime | Yes | When enrolled |
| `state` | Selection | Yes | enrolled/in_progress/completed/suspended/cancelled |
| `progress` | Float | No | Completion percentage |
| `rating` | Float | No | Student's course rating |

---

### elearning.progress

**Purpose:** Track progress on individual content items

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `enrollment_id` | Many2one | Yes | Parent enrollment |
| `content_id` | Many2one | Yes | Content item |
| `completed` | Boolean | No | Completion flag |
| `completed_date` | Datetime | No | When completed |
| `time_spent` | Float | No | Time in hours |
| `quiz_score` | Float | No | Quiz score if applicable |

---

### subscription.plan

**Purpose:** Subscription plan definitions with Stripe integration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Plan name |
| `description` | Html | No | Plan description |
| `stripe_product_id` | Char | No | Stripe product ID |
| `stripe_price_id` | Char | No | Stripe price ID |
| `price` | Monetary | Yes | Price per billing interval |
| `currency_id` | Many2one | Yes | Currency |
| `billing_interval` | Selection | Yes | month/quarter/year |
| `billing_interval_count` | Integer | No | Billing every X intervals |
| `trial_period_days` | Integer | No | Trial days (default: 14) |
| `setup_fee` | Monetary | No | One-time setup fee |
| `course_access` | Selection | Yes | all/premium/selected |
| `included_course_ids` | Many2many | No | Selected courses |
| `course_limit` | Integer | No | Max courses (0=unlimited) |
| `download_enabled` | Boolean | No | Allow downloads |
| `certificate_enabled` | Boolean | No | Enable certificates |
| `forum_access` | Boolean | No | Forum access |
| `instructor_chat` | Boolean | No | Chat with instructors |
| `priority_support` | Boolean | No | Priority support |
| `active` | Boolean | No | Active plan |
| `public` | Boolean | No | Visible for signup |
| `plan_type` | Selection | No | basic/standard/premium/enterprise |

---

### elearning.subscription

**Purpose:** Active subscription records with Stripe sync

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Subscription reference |
| `partner_id` | Many2one | Yes | Customer |
| `plan_id` | Many2one | Yes | Subscription plan |
| `stripe_customer_id` | Char | No | Stripe customer ID |
| `stripe_subscription_id` | Char | No | Stripe subscription ID |
| `amount` | Monetary | No | Subscription amount |
| `state` | Selection | Yes | draft/active/trialing/past_due/canceled/unpaid/paused |
| `start_date` | Datetime | Yes | Start date |
| `trial_end_date` | Datetime | No | Trial end |
| `current_period_start` | Datetime | No | Current billing period start |
| `current_period_end` | Datetime | No | Current billing period end |
| `canceled_at` | Datetime | No | Cancellation timestamp |
| `enrollment_ids` | One2many | No | Course enrollments |
| `payment_ids` | One2many | No | Payment history |
| `total_paid` | Monetary | No | Computed total paid |
| `cancellation_reason` | Text | No | Why cancelled |

---

### elearning.course.category

**Purpose:** Course categorization

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Category name |
| `description` | Text | No | Description |
| `sequence` | Integer | No | Display order |
| `color` | Integer | No | Color index |

---

### elearning.course.tag

**Purpose:** Course tagging

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Tag name |
| `color` | Integer | No | Color index |

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| elearning.course | user | Yes | Yes | Yes | Yes |
| elearning.course | portal | Yes | No | No | No |
| elearning.enrollment | user | Yes | Yes | Yes | Yes |
| elearning.enrollment | portal | Yes | Yes | No | No |
| subscription.plan | user | Yes | Yes | Yes | Yes |
| subscription.plan | portal | Yes | No | No | No |
| elearning.subscription | user | Yes | Yes | Yes | Yes |
| elearning.subscription | portal | Yes | No | No | No |

---

## Stripe Integration

### Creating Plans in Stripe

```python
plan.action_create_stripe_plan()
# Creates stripe.Product and stripe.Price
# Stores IDs in stripe_product_id and stripe_price_id
```

### Creating Subscriptions

```python
subscription.action_create_stripe_subscription()
# Creates stripe.Customer (if needed)
# Creates stripe.Subscription with trial
# Updates state to 'trialing' or 'active'
```

### Webhook Events (to be implemented)

- `invoice.paid` - Mark subscription active
- `invoice.payment_failed` - Mark past_due
- `customer.subscription.deleted` - Mark canceled

---

## Wizards

| Wizard | Purpose |
|--------|---------|
| `elearning.enrollment.wizard` | Enroll student in course |
| `subscription.change.wizard` | Change subscription plan |
| `bulk.enrollment.wizard` | Bulk enroll students |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
