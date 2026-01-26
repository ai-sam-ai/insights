# Module: ai_sam_insights

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_insights` |
| **Version** | 18.0.1.0 |
| **Source Path** | `D:\github_repos\30_samai_saas_host_management\ai_sam_insights` |
| **Manifest** | `D:\github_repos\30_samai_saas_host_management\ai_sam_insights\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_insights\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-insights |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_insights is the **Ecosystem Intelligence Tool** for SAM AI. It scans, analyzes, and reports on the health of the SAM AI codebase. It detects dangling references, orphaned assets, duplicate code, and maps relationships between models, views, actions, and menus. Think of it as a code health dashboard that knows everything about your ecosystem.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `web`
- `ai_sam_base`

### Python Libraries Required
- None additional (uses base Odoo + AST parsing)

---

## For End Users (What Can This Do For Me?)

- **Find broken references** - Detect views pointing to deleted models, actions referencing missing records
- **Identify orphaned code** - Find JS/CSS files not loaded anywhere, Python files not imported
- **Spot duplicates** - Discover models/functions doing similar things (with similarity scoring)
- **Map relationships** - Trace Model → View → Action → Menu chains to understand how components connect
- **Monitor health** - Get a health score (0-100) for your ecosystem and track improvement over time

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 6 | `insights.scan`, `insights.finding`, `insights.relationship`, `insights.scan.settings`, `insights.scan.module`, `insights.docs.sync.settings` |
| Controllers | 0 | Uses URL actions for reports |
| Views | 6 | Settings, Scan, Finding, Dashboard, Docs Sync, Menus |
| JS Files | 0 | CSS only for dashboard styling |
| Security Rules | 6 | All models accessible to base.group_user |

**Key Files:**
- `models/insights_scan.py` - Main scan execution and result storage
- `models/insights_finding.py` - Finding storage with fingerprint deduplication
- `models/insights_scan_settings.py` - Default scan configuration (singleton)
- `analyzers/ecosystem_analyzer.py` - Core analysis engine (AST parsing)

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: code health, ecosystem analysis, duplicate detection, orphaned files
- User wants to: scan codebase, find broken references, clean up unused code
- User mentions: dangling reference, orphan, duplicate model, code quality

### Related Agents
- `/mod_intelligence` - Primary agent for this module
- `/cto-developer` - For implementing fixes found by insights
- `/cto-auditor` - Uses insights data for quality reviews

### Delegate To
- `/cto` - For architecture decisions about findings
- `/cto-developer` - For fixing identified issues
- `/docs` - For documentation gaps identified

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/` (when insights finds architecture issues)
- Data Flows: `docs/06_data_flows/` (insights maps these)

### Related Modules
- `ai_sam_base` - Required dependency, provides base infrastructure
- `ai_sam` - Can query insights via chat ("how healthy is the codebase?")

---

## Known Gotchas (Painfully Learned)

1. **Scan path must exist** - If default_scan_path is not set or invalid, scan fails with UserError
2. **Registry scan requires running Odoo** - include_registry=True only works when Odoo is running (not in scripts)
3. **Large codebases take time** - Scanning 100+ modules can take several minutes; don't kill the process
4. **Fingerprint uniqueness** - Findings use fingerprints to prevent duplicates; same issue won't create multiple records

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (6 models)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Documentor

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation | CTO Module Documentor |
