# Toggle Developer Mode

## One Click to Debug Mode - From Any Screen

---

### The Problem You Know Too Well

You need to check a technical field. Or access the debug menu. Or enable developer mode to see what's happening under the hood. So you go to Settings, scroll down, find General Settings, expand Developer Tools, click "Activate developer mode"... or you manually type `?debug=1` in the URL bar.

**Every. Single. Time.**

---

### What If Debug Mode Was One Click Away?

Imagine a simple toggle icon in the top-right corner of every screen. Click it once - debug mode on. Click again - debug mode off. No hunting through menus. No URL editing. Just click.

**That's Toggle Developer Mode.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **One-Click Toggle** | Debug mode on/off instantly |
| **Always Visible** | Icon in navbar on every screen |
| **Visual Feedback** | Green = on, White = off |
| **Works Everywhere** | Desktop, tablet, mobile |

---

### How It Works (The Simple Version)

1. **Look at the top-right** - See the toggle icon near your user menu
2. **Click the icon** - Page refreshes with debug mode enabled
3. **Click again** - Debug mode disabled

**That's it.** No menus. No URL hacking. Just a click.

---

### Real Results

| Before | After |
|--------|-------|
| 5+ clicks to enable debug | 1 click |
| Remember URL parameter syntax | Just click |
| Navigate away from current screen | Stay on current screen |

---

### Who Is This For?

**Toggle Developer Mode is perfect for:**

- Developers who live in debug mode
- Functional consultants configuring Odoo
- Technical support staff troubleshooting issues
- Anyone who toggles debug mode more than once a day

**This probably isn't for you if:**

- You never use developer mode
- You prefer the scenic route through Settings
- You enjoy typing URLs

---

### Visual Guide

**Debug Mode OFF:**
```
[Apps] [CRM] [Sales] ...                    [🔘] [🔔] [👤]
                                             ^
                                        Toggle (white)
```

**Debug Mode ON:**
```
[Apps] [CRM] [Sales] ...                    [🔛] [🔔] [👤]
                                             ^
                                        Toggle (green)
```

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0
- **Author:** CodeFusion OdooWorks
- **Dependencies:** base, web
- **License:** AGPL-3
- **How it works:** Patches NavBar component, adds/removes ?debug=1 URL parameter
- **Documentation:** [Full technical docs](debug_mode_toggle_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Will I lose unsaved work?**
A: The toggle refreshes the page, so save your work first (same as toggling debug any other way).

**Q: Can I restrict who sees the toggle?**
A: Currently visible to all users. Access to debug features is still controlled by Odoo's standard permissions.

**Q: Is this the same as ts_debug_switch?**
A: Similar functionality, different implementation. Don't install both - pick one.

---

### Ready to Save Clicks?

Install from the Odoo Apps menu - search for "Toggle Developer Mode"

---

*Toggle Developer Mode - A CodeFusion OdooWorks Module*
*Version 18.0 | Odoo 18 Compatible*
