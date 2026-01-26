# SAM AI Members

## Your First 100 Members Get Lifetime Pricing - And You Never Lose Track

---

### The Problem You Know Too Well

You're launching your membership site. You want to reward early adopters with special pricing. You want to track who's using what. But membership plugins are either too simple (no tiering) or too complex (enterprise nightmares).

How do you know who your founding members are? How do you guarantee their pricing forever? How do you see who's actually using your platform?

**It doesn't have to be this way.**

---

### What If Membership Just Worked - Right Inside Odoo?

Imagine having a simple member signup form that automatically categorizes people: Free, Founding (your first 100), or Paid. Imagine those founding members being locked in at $27/month for life while everyone else pays $97. Imagine seeing exactly how many chat sessions and messages each member has used.

**That's SAM AI Members.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Three-Tier Membership** | Free, Founding ($27), and Paid ($97) - simple and clear |
| **Founding Member Tracking** | First 100 members numbered and locked at special pricing forever |
| **Auto-Welcome Emails** | New members get welcomed automatically - no manual effort |
| **Usage Tracking** | See sessions, messages, and knowledge nodes per member |
| **Funnel Progression** | Track visitor > lead > free > paid > SaaS journey |
| **Portal Integration** | Members log in and access their tier-appropriate content |

---

### How It Works (The Simple Version)

1. **Member Signs Up** - Public signup form creates their account
2. **Auto-Categorized** - Free by default, or founding if slots available
3. **Welcome Email Sent** - Automated welcome with next steps
4. **Portal Access Granted** - Tier-appropriate content unlocked

**That's it.** No manual member management. No spreadsheets. No pricing confusion.

---

### Pricing Structure

| Tier | Who Qualifies | Monthly Price | Access Level |
|------|---------------|---------------|--------------|
| **Free** | Anyone | $0 | eLearning only |
| **Founding** | First 100 members | $27/month FOREVER | Full SAM access |
| **Paid** | Everyone after #100 | $97/month | Full SAM access |

*Founding members are numbered 1-100. Once assigned, that number and price are locked for life.*

---

### Who Is This For?

**SAM AI Members is perfect for:**

- SaaS founders who want to reward early adopters
- Course creators with free and paid tiers
- Community builders tracking engagement
- Anyone launching a membership with Odoo

**This probably isn't for you if:**

- You need complex subscription billing (see bbb_elearning_subscription)
- You don't use Odoo
- You want unlimited pricing tiers

---

### Part of the SAM AI Ecosystem

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **ai_sam** | Core SAM interface | Members access SAM chat |
| **ai_sam_base** | Intelligence layer | Tracks member knowledge |
| **ai_sam_members** | **Membership management** | **You are here** |
| **ai_sam_e_learning** | Learning enhancements | Free tier gets eLearning |

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Dependencies:** base, base_automation, portal, website, mail, ai_sam
- **Models:** sam.member (new), res.partner (inherit via delegation)
- **Uses:** _inherits delegation from res.partner
- **Documentation:** [Full technical docs](ai_sam_members_SCHEMA.md)

</details>

---

### Ready to Launch Your Membership?

Install SAM AI Members and start signing up your founding 100.

---

*SAM AI Members - Part of SAM AI by SME.ec*
*Version 18.0.2.0.0 | Odoo 18 Compatible | LGPL-3 License*
