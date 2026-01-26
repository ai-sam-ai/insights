# SAM AI Odoo Modules

## Install Odoo Modules Like Installing Apps on Your Phone

---

### The Problem You Know Too Well

You found a great OCA module on GitHub. Now what? Clone the repo. Find the right folder. Copy it to your addons path. Restart Odoo. Update module list. Find it in Apps. Click Install. Hope nothing broke.

Every. Single. Time.

**It doesn't have to be this way.**

---

### What If Installing Was Just... One Click?

Imagine browsing your Odoo Apps menu and seeing modules from GitHub right there alongside your installed modules. See one you want? Click Install. It downloads automatically, then installs. No terminal. No file copying. No restart.

Just like installing an app on your phone.

**That's SAM AI Odoo Modules.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Unified Apps Menu** | GitHub modules appear alongside local ones - no separate catalog |
| **One-Click Install** | Download + Install in a single action |
| **Repository Management** | Add GitHub repos (public or private) or local paths |
| **Source Tracking** | Know where each module came from (OCA, SAM AI, custom) |
| **State Tracking** | See if a module is downloaded, available, or errored |
| **Auto-Refresh** | After download, module list updates automatically |

---

### How It Works (The Simple Version)

1. **Add Your Repository** - Point to GitHub or a local folder
2. **Click Scan** - System discovers all Odoo modules in that repo
3. **Browse the Apps Menu** - Remote modules appear with a download indicator
4. **Click Install** - Module downloads automatically, then installs

**That's it.** No terminal commands. No file management. Just modules.

---

### Real Results

| Before | After |
|--------|-------|
| Clone → copy → restart → update → install | **One click** |
| "Which folder was that module in?" | **Right there in Apps menu** |
| Manually tracking module sources | **Source type shown on module** |
| "Did I already download this?" | **Remote state tells you** |

---

### Who Is This For?

**SAM AI Odoo Modules is perfect for:**

- Developers who frequently install modules from GitHub or OCA
- Teams who want a consistent module management workflow
- Administrators who need to track where modules come from
- Anyone tired of the clone-copy-restart dance

**This probably isn't for you if:**

- You only use modules from the official Odoo Apps store
- You prefer manual file management (some do, we respect that)
- You never install third-party modules

---

### Part of the SAM AI Ecosystem

SAM AI Odoo Modules doesn't work alone. It's one piece of an intelligent business system:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **sam_ai_odoo_modules** | **Module discovery & download** | **You are here** |
| **sam_ai_update_modules** | Batch upgrade queue | Upgrade modules you installed via this system |
| **sam_ui_theme** | Consistent SAM AI theming | Pretty overlay during downloads |

**Together, they make module management effortless.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** `base` only
- **How it works:** Extends `ir.module.module` with GitHub source fields
- **Private repos:** Supports GitHub Personal Access Tokens
- **Local repos:** Can also scan local filesystem paths
- **Documentation:** [Full technical docs](sam_ai_odoo_modules_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Does this work with private GitHub repositories?**
A: Yes! Add your Personal Access Token to the repository configuration.

**Q: Where do downloaded modules go?**
A: To the first writable path in your Odoo addons_path configuration.

**Q: Can I use this for OCA modules?**
A: Absolutely. Add OCA repos and scan them like any other.

---

### Ready to Simplify Module Management?

Install `sam_ai_odoo_modules` from the Apps menu. Then go to SAM AI > Module Repositories to add your first repo.

---

*SAM AI Odoo Modules - Part of SAM AI by SME.ec*
*Version 18.0.2.0.0 | Odoo 18 Compatible*
