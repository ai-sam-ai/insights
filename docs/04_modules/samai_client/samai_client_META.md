# Module: samai_client

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `samai_client` |
| **Version** | 18.0.1.1.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\samai_client` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\samai_client\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\samai_client\` |
| **Online URL** | https://sme.ec/documentation/modules/samai-client |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

samai_client is installed on CLIENT sites (e.g., tls.samai.software, client007) to receive module updates from the SAM AI Host. It connects to the host's odoo_saas_kit API to check for available modules, detect updates (using both version and community_rev tracking), download updates, and request container restarts. Features a systray indicator for available updates and scheduled cron checks.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `web` - Web framework for systray widget

### Python Libraries Required
- `requests` - HTTP client for API communication

---

## For End Users (What Can This Do For Me?)

- **Automatic update detection** - System checks for SAM AI module updates on a schedule
- **One-click updates** - View available updates and apply them with a single button
- **Systray indicator** - See at a glance when updates are available
- **Safe restarts** - Request container restart after updates to apply changes cleanly
- **No manual FTP/SSH** - Updates downloaded and extracted automatically

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | Config singleton, Module Rev tracker |
| Controllers | 0 | No HTTP endpoints (client-side only) |
| Views | 2 | Config form, menu |
| Cron Jobs | 1 | Scheduled update check |
| OWL Components | 1 | Systray update indicator |
| Security Rules | 4 | User (read-only) and Admin (full) per model |

**Key Files:**
- `models/samai_config.py` - Host connection config, update checking, download logic
- `models/samai_module_rev.py` - Tracks community_rev for sub-version updates
- `static/src/js/update_systray.js` - OWL systray widget for update notifications
- `data/cron_data.xml` - Scheduled update check cron

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: module updates, SAM AI updates, client configuration
- User wants to: update modules, connect to host, check for updates
- User mentions: samai_client, update systray, host connection, API token

### Related Agents
- `/cto-developer` - For implementing fixes to this module
- `/docker-debug` - For container restart issues
- `/n8n` - If integrating with workflow automation

### Delegate To
- `/cto` - For architecture decisions about update distribution
- `/cto-developer` - For bug fixes or enhancements
- `/docker` - For container restart and deployment issues

---

## Cross-References

### Related Documentation
- Companion: `odoo_saas_kit` module on host site (provides API endpoints)

### Related Modules
- `odoo_saas_kit` - Host-side module that serves the update API
- `ai_sam_cache_manager` - Often needed after updates to clear cache

---

## Known Gotchas (Painfully Learned)

1. **community_rev tracking** - Version comparison alone misses updates where manifest version unchanged but code differs. The `samai.module.rev` model tracks the community_rev number from the host to catch these.

2. **Writable addons path** - Updates extract to `/mnt/extra-addons` (or first writable addons path). If no path is writable, updates fail. Check Docker volume mounts.

3. **Restart required after download** - Updates download to disk but don't take effect until container restarts. The restart_pending flag tracks this state.

4. **Token in two places** - API token stored in `samai.client.config` record AND optionally in `ir.config_parameter`. The config model auto-loads from parameters if set by host during provisioning.

5. **Cron doesn't auto-apply** - The cron job only CHECKS for updates and stores results. User must click "Apply Updates" to download. This is intentional for safety.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.1.0)
- [x] Dependencies list is current
- [x] Model count matches reality (2)
- [x] Security rule count matches reality (4)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
