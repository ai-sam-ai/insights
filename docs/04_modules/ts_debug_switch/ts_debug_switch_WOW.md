# Quick Debug Switch

## Toggle Debug Mode in One Click

---

### The Problem You Know Too Well

You need to check a field's technical name. Or see view inheritance. Or debug a workflow.

So you navigate to Settings, scroll down, click "Activate Developer Mode"...

Or you remember the URL trick: add `?debug=1` to the URL. But then you have to find the right place to add it and remember the syntax.

**Debug mode shouldn't require a treasure hunt.**

---

### What If There Was a Button?

Imagine a simple toggle in the navbar. Click once: debug on. Click again: debug off. Green icon when active. Gray when inactive.

No settings navigation. No URL editing. Just click.

**That's Quick Debug Switch.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Systray Toggle Button** | Always visible, always accessible |
| **Visual Status Indicator** | Green = on, Gray = off |
| **One-Click Toggle** | No menus, no typing |
| **Security Controlled** | Restrict who can toggle debug |
| **Lightweight** | No backend, pure JavaScript |

---

### How It Works (The Simple Version)

1. **Look at the systray** - Top right of Odoo, next to your profile
2. **See the toggle icon** - Gray (off) or green (on)
3. **Click it** - Page reloads with opposite state

**That's it.** Three seconds to toggle debug mode.

---

### Security Built In

Not everyone should toggle debug mode. The module includes a security group:

- **Show Debug Switch** - Users who see the toggle
- By default: All internal users
- Customize: Remove users who shouldn't have access

**Give developers what they need. Keep others focused.**

---

### Who Is This For?

**Quick Debug Switch is perfect for:**

- Developers debugging Odoo
- Functional consultants configuring systems
- Power users who need technical details
- Anyone who toggles debug mode frequently

**This probably isn't for you if:**

- You never use debug mode
- You prefer the settings menu
- You enjoy typing URL parameters

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0
- **Author:** Techvaria
- **License:** OPL-1 (Proprietary)
- **Dependencies:** web
- **Technology:** OWL Component (JavaScript)

**How it toggles:**
```javascript
router.pushState({ debug: oppositeDebug }, { reload: true });
```

**Documentation:** [Full technical docs](ts_debug_switch_SCHEMA.md)

</details>

---

*Quick Debug Switch - A Techvaria Module*
*Version 18.0.1.0.0 | Odoo 18 Compatible*
