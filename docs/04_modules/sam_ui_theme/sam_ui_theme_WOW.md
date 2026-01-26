# SAM UI Theme

## Your Odoo, Your Colors, Zero Compromise

---

### The Problem You Know Too Well

Default Odoo looks... default. Your brand has specific colors, a specific feel, and you want your team to work in an environment that feels like yours. But customizing Odoo themes usually means diving into SCSS files, rebuilding assets, and hoping nothing breaks.

**Your brand deserves better than vanilla.**

**It doesn't have to be this way.**

---

### What If Theming Were Just a Settings Page?

Imagine opening a settings panel, picking your brand colors, and watching your entire Odoo transform instantly. No code. No asset rebuilds. No "it works locally but breaks in production." Just pick colors, save, refresh.

**That's SAM UI Theme.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **One-Click Presets** | 6 beautiful themes ready to use - SAM Default, Dark, Ocean, Forest, Sunset, Purple |
| **Full Color Control** | Primary, secondary, accent, navbar - every color customizable |
| **Animated Bling Line** | Eye-catching gradient animation on the app menu |
| **Typography Options** | Choose from 5 font families for headings and body text |
| **Consistent Modals** | All popups and dialogs styled uniformly |
| **Login Page Branding** | Even the login screen matches your brand |

---

### How It Works (The Simple Version)

1. **Go to Settings** - Settings > SAM AI Theme
2. **Choose preset or customize** - Pick a preset or set your own colors
3. **Save** - Changes apply instantly
4. **Done** - Entire Odoo reflects your brand

**That's it.** No terminal. No CSS editing. No asset rebuilding.

---

### Real Results

| Before | After |
|--------|-------|
| Default Odoo purple | Your brand's primary color |
| Generic login page | Branded login with your colors |
| Plain app menu | Animated bling line effect |
| Inconsistent popups | Unified modal styling |

---

### Who Is This For?

**SAM UI Theme is perfect for:**

- Businesses that want Odoo to match their brand
- Teams who appreciate a polished, professional interface
- Companies tired of "default" looking software
- Anyone who wants visual variety without developer effort

**This probably isn't for you if:**

- You love default Odoo purple (we won't judge)
- You need deep CSS customization (use the variables as a starting point)
- You're not using Odoo 18

---

### Part of the SAM AI Ecosystem

SAM UI Theme provides the visual foundation for the entire SAM AI experience:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **sam_ui_theme** | **Colors, fonts, styling** | **You are here** |
| **ai_sam** | SAM AI chat interface | Uses theme colors |
| **ai_sam_ui** | Public website chat | Uses theme variables |
| **ai_sam_base** | Core intelligence | Consistent visual identity |

**Together, they create a cohesive, branded experience.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** web, bus
- **License:** LGPL-3
- **Settings Storage:** Company-specific in database
- **CSS Generation:** Dynamic at runtime
- **Asset Loading:** CSS variables + SCSS prepend
- **Documentation:** [Full technical docs](sam_ui_theme_SCHEMA.md)

**CSS Variables Available:**
- `--sam-blue-primary` - Primary brand color
- `--sam-gold-sparkle` - Secondary/accent color
- `--sam-navbar-bg` - Navbar background
- `--sam-button-radius` - Button corners
- `--sam-card-radius` - Card corners
- And many more...

</details>

---

### Frequently Asked Questions

**Q: Do I need to restart Odoo to see changes?**
A: No. Changes apply immediately. You may need to hard-refresh your browser (Ctrl+Shift+R) due to CSS caching.

**Q: Can different companies have different themes?**
A: Yes! Theme settings are company-specific. Each company can have its own colors.

**Q: What about the login page?**
A: The login page is also themed! It uses your primary color for buttons and accents.

---

### Ready to Make Odoo Yours?

Install from Apps menu. Open Settings > SAM AI Theme. Pick your colors. Done.

---

*SAM UI Theme - Part of SAM AI by SME.ec*
*Version 18.0.21.0.0 | Odoo 18 Compatible*
