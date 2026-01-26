# SAM AI Insights

## Your Codebase, Under X-Ray

---

### The Problem You Know Too Well

Your Odoo ecosystem has grown. Modules added, features built, integrations connected. But somewhere along the way, you lost track. Which views still reference that model you deleted last month? Which JS files aren't loaded anywhere? How many times have you copied that utility function across modules?

**Technical debt compounds silently.** One day your system "just works." The next, a simple upgrade breaks everything because of a reference you forgot existed.

**It doesn't have to be this way.**

---

### What If You Could See Everything?

Imagine having a dashboard that shows you exactly where your code is healthy and where it's rotting. A tool that finds the orphaned CSS file you forgot about, the duplicate function spread across five modules, the view referencing a field that no longer exists.

Instead of hunting through files manually, you simply run a scan and get a health score. Red flags highlighted. Recommendations prioritized. The exact file and line number, ready to fix.

**That's SAM AI Insights.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Ecosystem Health Score** | One number (0-100) tells you if your codebase is thriving or struggling |
| **Dangling Reference Detection** | Find views pointing to deleted models before they crash production |
| **Duplicate Code Finder** | Spot copy-paste patterns with similarity scoring - consolidate or clean up |
| **Orphan Asset Discovery** | Identify JS/CSS files that aren't loaded anywhere (dead weight) |
| **Relationship Mapping** | Trace Model → View → Action → Menu chains visually |
| **Recurring Issue Tracking** | Same issue appears across scans? It's flagged as recurring, demanding attention |

---

### How It Works (The Simple Version)

1. **Configure Your Scan Path** - Point Insights at your modules directory
2. **Click "Run Scan"** - AST parsing, XML analysis, registry queries all happen automatically
3. **Review Your Health Score** - Critical issues, warnings, and recommendations ranked by severity
4. **Fix What Matters** - Click through to exact files and locations

**That's it.** No complex setup. No manual analysis. Just actionable intelligence about your code.

---

### Real Results

| Before | After |
|--------|-------|
| "I think we removed that model..." | **Know exactly** which 3 views still reference it |
| Hours hunting for orphaned code | **Seconds** - full list with file paths |
| Duplicate code hidden everywhere | **Similarity scoring** shows 87% match across modules |
| "Is our codebase healthy?" | **Health score: 73/100** - and here's why |

---

### Who Is This For?

**SAM AI Insights is perfect for:**

- Developers maintaining Odoo ecosystems who want to reduce technical debt
- Teams upgrading Odoo versions who need to find all the broken references first
- Architects who want to understand how modules interconnect
- Anyone tired of "mystery errors" from forgotten dependencies

**This probably isn't for you if:**

- You have a single, small module with no integrations
- You don't maintain the code (just use it)
- You prefer to debug in production (we can't help you there)

---

### Part of the SAM AI Ecosystem

SAM AI Insights doesn't work alone. It's one piece of an intelligent business system:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **ai_sam_base** | The brain - memory and intelligence | Insights stores findings in SAM's knowledge base |
| **ai_sam** | The interface - chat with SAM | Ask SAM "how healthy is our codebase?" and get insights |
| **ai_sam_insights** | **Ecosystem intelligence** | **You are here** |
| **ai_sam_workflows** | Automation engine | Auto-scan on schedule, auto-create tasks for critical findings |

**Together, they make your codebase smarter, cleaner, and more maintainable.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:** `base`, `web`, `ai_sam_base`
- **Installation:** Via Odoo Apps menu
- **Analysis Methods:** AST parsing (Python), XML parsing (views), Registry queries (runtime)
- **Documentation:** [Full technical docs](ai_sam_insights_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: How long does a scan take?**
A: For 20-30 modules, typically under 2 minutes. Larger codebases (100+ modules) can take 5-10 minutes.

**Q: Will it break my running Odoo?**
A: No. Scanning is read-only. Registry queries don't modify anything.

**Q: Can I scan external modules (OCA, etc.)?**
A: Yes. Just point the scan path at any directory containing Odoo modules.

---

### Ready to Know Your Codebase?

Install `ai_sam_insights` from the Apps menu and run your first scan. Your health score is waiting.

---

*SAM AI Insights - Part of SAM AI by SME.ec*
*Version 18.0.1.0 | Odoo 18 Compatible*
