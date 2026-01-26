# GitHub Module Manager

## Manage Your GitHub Repos Without Leaving Odoo

---

### The Problem You Know Too Well

Every time a community module updates, you SSH into your server, navigate to the right directory, run `git pull`, maybe deal with authentication issues, then restart Odoo. If you have modules from multiple repos, multiply that headache. And don't get started on managing addons_path in the config file.

**Server management should be simple, not a chore.**

**It doesn't have to be this way.**

---

### What If Module Updates Were Just a Button Click?

Imagine opening Odoo, clicking "Pull" next to a repository, and watching it update. No terminal. No remembering which directory each module lives in. No copy-pasting PATs into git commands. Just click and done.

**That's GitHub Module Manager.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **One-Click Pull** | Update any repository without SSH access |
| **Centralized Credentials** | Store your PAT once, use it across all repos |
| **Auto Directory Management** | Paths computed automatically from repo names |
| **Config File Editor** | Edit addons_path directly in Odoo UI |
| **Version Checking** | See which installed modules are outdated |
| **Secure by Design** | PAT never written to disk - used in-memory only |

---

### How It Works (The Simple Version)

1. **Add your GitHub account** - Enter username and PAT once
2. **Add repositories** - Just paste the GitHub URL
3. **Click Pull** - Repository clones or updates automatically
4. **Sync config** - One click adds paths to addons_path

**That's it.** No SSH. No terminal commands. Just Odoo.

---

### Real Results

| Before | After |
|--------|-------|
| SSH → cd → git pull → restart | Click "Pull" → done |
| Manual addons_path editing | Auto-sync with one button |
| PAT in git config (security risk) | PAT in-memory only (secure) |
| Track repos in spreadsheet | All repos visible in Odoo |

---

### Who Is This For?

**GitHub Module Manager is perfect for:**

- Odoo admins who manage servers without deep Linux experience
- Teams that need to keep community modules updated
- Developers who want a central view of all module repos
- Anyone tired of SSH-ing just to run `git pull`

**This probably isn't for you if:**

- You prefer terminal for everything
- You only use modules from Odoo Apps (not GitHub)
- Your server doesn't have git installed

---

### Part of the SAM AI Ecosystem

GitHub Module Manager is a standalone utility that works independently but integrates smoothly with SAM AI:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **github_app** | **GitHub repository management** | **You are here** |
| **ai_sam_cache_manager** | Clear caches after updates | Run after pulling new code |
| **ai_sam_base** | Core SAM AI infrastructure | Can be updated via this module |

**Together, they make Odoo server management painless.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** base, mail, requests
- **Git Library:** Bundled GitPython (no pip install needed)
- **License:** AGPL-3
- **Documentation:** [Full technical docs](github_app_SCHEMA.md)

**Security Features:**
- PAT never written to .git/config
- Secure URLs used only during operations
- Clean URLs restored immediately after
- Config file backups before changes

</details>

---

### Frequently Asked Questions

**Q: Is my PAT safe?**
A: Yes. The PAT is stored in Odoo's encrypted database and is never written to .git/config. It's used in-memory only during git operations.

**Q: What if git pull fails?**
A: You'll see a clear error notification explaining what went wrong. Common issues: network, auth, or merge conflicts.

**Q: Can I push changes too?**
A: Yes. The module supports push operations - it will stage all changes, commit with an auto-message, and push to remote.

---

### Ready to Simplify Module Management?

Install from Apps menu. Add your GitHub account. Never SSH for git pull again.

---

*GitHub Module Manager - Part of SAM AI by SME.ec*
*Version 18.0.3.0.0 | Odoo 18 Compatible*
