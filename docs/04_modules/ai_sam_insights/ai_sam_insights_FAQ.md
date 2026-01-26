# FAQ: ai_sam_insights

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Insights

### What is ai_sam_insights?

ai_sam_insights is an ecosystem intelligence module for Odoo 18 that scans, analyzes, and reports on the health of your SAM AI codebase. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_insights`
- Current version: 18.0.1.0
- Requires: Odoo 18.0+, Python 3.10+, `ai_sam_base` module
- License: LGPL-3

### What does ai_sam_insights do?

ai_sam_insights provides ecosystem analysis capabilities:

1. **Health Scoring** - Calculates a 0-100 score based on code quality indicators
2. **Dangling Reference Detection** - Finds views/actions pointing to non-existent models or fields
3. **Orphan Discovery** - Identifies JS/CSS/Python files not imported or loaded anywhere
4. **Duplicate Detection** - Spots similar code patterns with similarity scoring
5. **Relationship Mapping** - Traces Model → View → Action → Menu chains

### Who is ai_sam_insights for?

ai_sam_insights is designed for:
- Developers maintaining Odoo module ecosystems
- Teams planning Odoo version upgrades who need to audit dependencies
- Architects who need to understand module interconnections
- Anyone managing technical debt in an Odoo codebase

---

## Installation & Setup

### How do I install ai_sam_insights?

1. Ensure Odoo 18.0+ is running
2. Ensure `ai_sam_base` is installed
3. Navigate to Apps menu
4. Search for "SAM AI Insights"
5. Click Install
6. Go to SAM AI > Insights > Settings to configure your scan path

### What are the dependencies for ai_sam_insights?

ai_sam_insights requires these Odoo modules:
- `base` - Core Odoo functionality
- `web` - Web assets and UI
- `ai_sam_base` - SAM AI core infrastructure

Python libraries required:
- None additional (uses built-in `ast` module for Python parsing)

### How do I configure ai_sam_insights?

After installation:
1. Go to SAM AI > Insights > Settings
2. Enter your **Default Scan Path** (e.g., `/opt/odoo/addons` or `D:\repos\modules`)
3. Click "Scan Path" to discover modules in that directory
4. Select which modules to include in scans (or click "Select SAM Modules" for ai_sam* only)
5. Enable "Include Registry Scan" if you want runtime validation (recommended)

---

## Usage

### How do I run a scan?

To run an ecosystem scan:
1. Go to SAM AI > Insights > Scans
2. Click "Create" to start a new scan
3. Either use default settings or customize the scan path/module filter
4. Click "Run Scan"
5. Wait for completion (state changes from "Running" to "Completed")
6. Review the health score and findings

### How do I view scan results?

After a scan completes:
1. Open the scan record to see summary statistics
2. Click "Findings" tab to see all issues categorized by severity
3. Click "View Report" for an HTML dashboard view
4. Click "Export JSON" to download raw results

### How do I mark findings as resolved?

To manage findings:
1. Go to SAM AI > Insights > Findings
2. Filter by severity, category, or status
3. Open a finding record
4. Use action buttons: "Mark Resolved", "Acknowledge", "Won't Fix", or "False Positive"
5. Add resolution notes if needed

### Can I schedule automatic scans?

Yes. ai_sam_insights includes scheduled actions:
1. Go to Settings > Technical > Automation > Scheduled Actions
2. Find "Insights: Weekly Ecosystem Scan"
3. Enable and configure the schedule as needed

---

## Troubleshooting

### Why is my scan failing with "No scan path configured"?

**Symptom:** Scan fails immediately with "No scan path configured"

**Cause:** Neither the scan record nor default settings have a valid path

**Solution:**
1. Go to SAM AI > Insights > Settings
2. Enter a valid path in "Default Scan Path"
3. Ensure the path exists and contains Odoo modules (folders with `__manifest__.py`)

### Why is the health score 0?

**Symptom:** Scan completes but health score is 0

**Cause:** Either no modules were found, or the path contains no analyzable code

**Solution:**
1. Check that your scan path points to a directory containing Odoo modules
2. Verify modules have `__manifest__.py` files
3. Check the "Files Scanned" count - if 0, path is wrong
4. Review error_message field for details

### Why are some findings marked as "recurring"?

**Symptom:** Findings show high occurrence counts

**Cause:** The same issue has been detected in multiple scans. Insights uses fingerprinting to deduplicate findings.

**Solution:**
This is working correctly. Recurring findings indicate issues that haven't been addressed. Prioritize fixing high-occurrence issues.

### Scan is taking too long. What do I do?

**Symptom:** Scan runs for 10+ minutes without completing

**Cause:** Very large codebase or slow disk I/O

**Solution:**
1. Use module_filter to scan only specific modules
2. Go to Settings and select only the modules you need
3. Disable "Include Registry Scan" for faster (but less thorough) analysis
4. Check server resources - ensure adequate CPU/memory

### How do I interpret different finding severities?

Findings are categorized by severity to help you prioritize:

| Severity | Meaning | Action Required |
|----------|---------|-----------------|
| **Critical** | Broken functionality - code references non-existent models/fields/views | Fix immediately - these cause runtime errors |
| **Warning** | Potential issues - orphaned files, duplicate code, stale references | Review and fix in next sprint |
| **Info** | Observations - patterns detected, relationships mapped | Informational only, no action required |
| **Recommendation** | Best practice suggestions - code improvements, optimization opportunities | Consider implementing when time permits |

**Priority Guide:**
- **Critical findings**: Fix before next deployment
- **Warnings with high occurrence count**: Fix soon - recurring issues compound
- **New findings**: Address before they become recurring
- **Recommendations**: Add to technical debt backlog

---

## Comparisons

### How does ai_sam_insights compare to Odoo's built-in linting?

| Feature | ai_sam_insights | Odoo Built-in |
|---------|-----------------|---------------|
| Ecosystem-wide analysis | Yes | No |
| Dangling reference detection | Yes | Limited |
| Cross-module duplicate detection | Yes | No |
| Health scoring | Yes (0-100) | No |
| Relationship mapping | Yes (full traces) | No |
| Historical tracking | Yes (recurring findings) | No |

### Why choose ai_sam_insights over manual code review?

ai_sam_insights automates what would take hours:
- Scanning 50 modules for orphaned files manually: hours
- Running an Insights scan: 2 minutes
- Finding all views referencing a specific model: instant with Insights

---

## Integration

### Does ai_sam_insights work with ai_sam chat?

Yes. When both modules are installed:
- Ask SAM "How healthy is our codebase?" to get the latest health score
- Ask SAM "What critical issues do we have?" to list critical findings
- Ask SAM to explain findings in natural language

### Can I use ai_sam_insights with external modules (OCA, etc.)?

Yes. ai_sam_insights can scan any Odoo module directory:
- Point scan path at OCA repos
- Include third-party modules in your scan
- Compare health scores across different module sources

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database. ai_sam_insights does not send data to external servers. Analysis happens locally.

### Can I export my findings?

Yes. You can export data via:
- JSON export button on scan records
- Odoo's built-in export (list views > Export)
- Direct database queries if needed

### How do I delete scan history?

To remove scan data:
1. Go to SAM AI > Insights > Scans
2. Select scans to delete
3. Action > Delete
4. Findings and relationships cascade-delete with their parent scan

---

## Pricing & Licensing

### Is ai_sam_insights free?

ai_sam_insights is licensed under LGPL-3. It is free to use, modify, and distribute under the terms of the LGPL-3 license.

### Do I need a SAM AI subscription?

No subscription required. ai_sam_insights is open source and freely available.

---

## Support

### Where can I get help with ai_sam_insights?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-insights
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.1.0)
   - Odoo version
   - Steps to reproduce
   - Error messages from server logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Registry scan requires running Odoo | By design | Disable registry scan for offline analysis |
| Large codebases (500+ modules) may timeout | Open | Use module filter to scan in batches |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0 | 2025-01 | Initial release with full analysis capabilities |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
