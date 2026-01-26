# SAM AI Cache Manager

## One Click. Nine Cache Layers. Zero Headaches.

---

### The Problem You Know Too Well

You've updated your CSS. Refreshed the page. Nothing changed. You've upgraded a module. The old version still shows. You've spent 30 minutes hunting through folders, deleting __pycache__ directories, clearing browser cache, restarting services... and it STILL doesn't work.

**Because Odoo has NINE different cache layers.** And clearing one or two isn't enough.

**It doesn't have to be this way.**

---

### What If Cache Clearing Just... Worked?

Imagine clicking ONE button and watching every cache layer get cleared automatically. Instead of manually hunting through directories and guessing which cache is stale, you simply click "Clear All Caches" and go back to work. And the best part? It works whether you're on Windows, Linux, or Docker - no configuration needed.

**That's SAM AI Cache Manager.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **One-Click Complete Clear** | Clears ALL 9 cache layers in one action - no more guessing which one |
| **Cross-Platform Magic** | Auto-detects Docker, Windows, Linux - works everywhere without setup |
| **Smart Service Restart** | Stops, kills stale processes, then restarts - properly, not just "restart" |
| **Real-Time Feedback** | See exactly what's being cleared as it happens |
| **Manifest Cache Clearing** | The hidden cache that blocks module upgrades - finally cleared |

---

### How It Works (The Simple Version)

1. **Click the menu** - Settings > Technical > Clear All Caches
2. **Confirm** - See exactly what will be cleared
3. **Watch it work** - 9 cache layers cleared, service restarted
4. **Done** - Fresh state, changes visible

**That's it.** No terminal commands. No hunting for folders. Just results.

---

### Real Results

| Before | After |
|--------|-------|
| 30+ minutes hunting for cache locations | 30 seconds with one click |
| CSS changes require manual steps | Changes visible immediately after clear |
| Module upgrades sometimes don't "take" | Manifest cache cleared = upgrades work |
| Different steps for Windows vs Linux | Same button works everywhere |

---

### Who Is This For?

**SAM AI Cache Manager is perfect for:**

- Developers who are tired of "why isn't this updating?"
- System admins who need reliable cache clearing
- Teams deploying to Docker who need container-aware clearing
- Anyone who has ever deleted __pycache__ manually

**This probably isn't for you if:**

- You enjoy manually clearing 9 different cache locations
- You don't have admin access to your Odoo instance
- You prefer typing terminal commands over clicking buttons

---

### Part of the SAM AI Ecosystem

SAM AI Cache Manager doesn't work alone. It's one piece of an intelligent business system:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **ai_sam_base** | The brain - memory and intelligence | N/A - independent utility |
| **samai_business_manager** | Platform detection service | Provides cross-platform awareness |
| **ai_sam_cache_manager** | **Developer cache clearing utility** | **You are here** |
| **ai_sam** | The SAM AI chat interface | Can tell SAM to clear cache for you |

**Together, they make your development workflow smarter, faster, and less frustrating.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

**Cache Layers Cleared:**
1. Python bytecode (.pyc, __pycache__)
2. Odoo registry caches
3. ORM method caches (@ormcache)
4. Database asset cache (ir_attachment)
5. QWeb template cache
6. Translation cache
7. Filestore session cache
8. Manifest LRU cache (_get_manifest_cached)
9. Odoo log files

**Platform Support:**
- Docker (supervisor or container restart)
- Windows (PowerShell service control)
- Linux (systemd)
- macOS (development)

**Requirements:**
- Odoo Version: 18.0+
- Python: 3.10+
- Dependencies: base, web, samai_business_manager
- Installation: Via Odoo Apps menu
- Documentation: [Full technical docs](ai_sam_cache_manager_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Will this disconnect all users?**
A: Yes, briefly. The service restarts after clearing, which disconnects users for a few seconds. They'll need to refresh.

**Q: Can I disable the service restart?**
A: Yes. Set system parameter `ai_sam_cache_manager.enable_restart` to `False` to clear caches without restarting.

**Q: What if I'm in Docker?**
A: The module auto-detects Docker and uses appropriate methods. If supervisor isn't available, it tells you to restart the container manually.

---

### Ready to Stop Fighting Caches?

Install from Apps menu. Click Clear All Caches. Get back to actual work.

---

*SAM AI Cache Manager - Part of SAM AI by SME.ec*
*Version 18.0.3.1 | Odoo 18 Compatible*
