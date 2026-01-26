# SAM AI eLearning

## Make Odoo's eLearning Feel Like Yours

---

### The Problem You Know Too Well

You've installed Odoo eLearning and it works... but it looks like everyone else's. That bright purple header? Not your brand. Every time you click a lesson, it takes over your whole screen whether you want it to or not.

And what if you want different course categories for different audiences? "All Courses" is too generic - you need `/learn/sam-docs` for documentation and `/learn/tutorials` for video courses.

**It doesn't have to be this way.**

---

### What If Your eLearning Portal Felt Like Your Brand?

Imagine clicking through your courses and seeing your brand colors, not Odoo purple. Imagine staying in the comfortable sidebar view instead of being forced into fullscreen. Imagine creating custom learning paths like `/learn/getting-started` that only show the courses your beginners need.

**That's SAM AI eLearning.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Fullscreen Control** | Stay in sidebar view when clicking lessons - your choice, not forced |
| **Custom Header Colors** | Replace purple with SAM AI blue or any brand color instantly |
| **Menu Categories** | Create URLs like `/learn/sam-docs` with filtered course views |
| **Full-Width Option** | Use the entire browser width instead of narrow containers |
| **Auto Website Menus** | Categories automatically create navigation menu items |

---

### How It Works (The Simple Version)

1. **Install the Module** - One click in Odoo Apps
2. **Configure Settings** - Website > Configuration > eLearning
3. **Create Categories** - Define filtered views with custom URLs
4. **Done** - Your eLearning portal now matches your brand

**That's it.** No code. No templates to edit. Just settings.

---

### Real Results

| Before | After |
|--------|-------|
| Forced fullscreen on every click | Choose your viewing preference |
| Purple Odoo branding | Your custom brand colors |
| One generic course list | Multiple filtered category views |
| Narrow container layouts | Full-width when you need it |

---

### Who Is This For?

**SAM AI eLearning is perfect for:**

- Businesses using Odoo eLearning who want brand consistency
- Course creators who need organized category views
- Anyone annoyed by forced fullscreen lesson views
- Teams wanting custom learning paths for different audiences

**This probably isn't for you if:**

- You love Odoo's default purple
- You want a completely separate LMS (see bbb_elearning_subscription instead)
- You don't use website_slides

---

### Part of the SAM AI Ecosystem

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **website_slides** | Base eLearning | SAM AI eLearning extends this |
| **ai_sam_website_colors** | Website theming | Works together for consistent branding |
| **ai_sam_e_learning** | **eLearning enhancements** | **You are here** |
| **ai_sam_members** | Member portal | Can use same learning portal |

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Dependencies:** website_slides, website
- **Models:** res.config.settings (inherit), elearning.menu.category (new)
- **Frontend:** JavaScript fullscreen override
- **Documentation:** [Full technical docs](ai_sam_e_learning_SCHEMA.md)

</details>

---

### Ready to Brand Your eLearning?

Install SAM AI eLearning, set your colors, and create your first category.

---

*SAM AI eLearning - Part of SAM AI by SME.ec*
*Version 18.0.1.1.0 | Odoo 18 Compatible | LGPL-3 License*
