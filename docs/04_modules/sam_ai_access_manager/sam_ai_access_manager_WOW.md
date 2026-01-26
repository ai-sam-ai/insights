# SAM AI Access Manager

## Stop Fighting Odoo Permissions - Start Managing People

---

### The Problem You Know Too Well

You need to give Sarah access to Sales. In Odoo, that means: Settings > Users > Sarah > Access Rights tab > scroll through 50+ checkboxes > hope you picked the right ones > pray you didn't accidentally remove something important.

Next week, you hire three more salespeople. Do it all again. Three times.

**Odoo's permission system is powerful. It's also a nightmare to manage.**

---

### What If Permissions Were About Departments, Not Checkboxes?

Imagine creating a "Sales" department once. Add the right groups. Then just assign Sarah to Sales. Done. New hires? Add them to Sales. One click.

Need to audit access? Click on any user and see a clear summary: "Sales Department - Can Import/Export - 23 Access Groups."

**That's SAM AI Access Manager.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Business Units** | Manage departments, not checkboxes |
| **One-Click Apply** | Assign permissions instantly |
| **Visual Summary** | See what each user can do at a glance |
| **Protected Groups** | Can't accidentally lock users out |
| **Confirmation Wizard** | Review changes before applying |
| **Super User Role** | One unit that inherits everything |

---

### How It Works (The Simple Version)

1. **Create Business Units** - Sales, Accounts, Project Management
2. **Add Groups to Units** - Configure once, use forever
3. **Assign Users to Units** - Click, click, done
4. **Apply Permissions** - One button syncs everything

**That's it.** No more checkbox hunting. No more permission mysteries.

---

### Real Results

| Before | After |
|--------|-------|
| 15 minutes per user setup | 30 seconds per user |
| "What can this user do?" - Unknown | Clear access summary |
| Accidental lockouts | Protected groups prevent disasters |
| Permission drift over time | Consistent unit-based access |

---

### Who Is This For?

**SAM AI Access Manager is perfect for:**

- Companies with 5+ Odoo users
- Admins tired of permission management
- Organizations with clear department structures
- Anyone who's ever locked themselves out of Odoo

**This probably isn't for you if:**

- You have only 1-2 users
- You enjoy hunting through checkboxes
- You don't believe in job roles

---

### Safety Features Built In

**Protected Groups:**
- Internal User, Portal, Public groups can NEVER be removed
- Even if you try, the system prevents lockouts

**Confirmation Wizard:**
- See exactly what will change before applying
- "This will add 12 groups to 5 users. Continue?"

**No Auto-Apply:**
- Edit freely without accidental changes
- Permissions only sync when you click "Apply"

**Audit Trail:**
- Full logging of all permission changes
- Know who changed what and when

---

### Part of the SAM AI Ecosystem

SAM AI Access Manager works seamlessly with other SAM AI modules:

| Module | Connection |
|--------|------------|
| **ai_sam** | Chat with SAM about user permissions |
| **ai_sam_base** | SAM remembers access patterns |
| **sam_ai_customization** | Customize the access views |

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Author:** SAM AI
- **Dependencies:** base, mail
- **License:** LGPL-3
- **Security Levels:** User, Manager, Admin
- **Documentation:** [Full technical docs](sam_ai_access_manager_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Will this break my existing permissions?**
A: No. The module only ADDS groups when you click Apply. It never removes permissions automatically.

**Q: Can I still use the old permission UI?**
A: Yes. Business Units work alongside standard Odoo groups.

**Q: What's a Super User unit?**
A: A special unit that automatically inherits ALL permissions from ALL other units.

---

### Ready to Simplify Access Management?

Install from the SAM AI module set.

---

*SAM AI Access Manager - Part of SAM AI by SME.ec*
*Version 18.0.1.2.0 | Odoo 18 Compatible*
