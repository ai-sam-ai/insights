# Module: sam_ai_odoo_modules

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_odoo_modules` |
| **Version** | 18.0.2.0.0 |
| **Source Path** | `D:\github_repos\21_samai_docker_container\101-samai-docker\samai-modules\01_user_experience\sam_ai_odoo_modules` |
| **Manifest** | (see source path)/__manifest__.py |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_odoo_modules\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-odoo-modules |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

sam_ai_odoo_modules extends Odoo's native Apps menu to support a **"Download to Install"** workflow for modules from GitHub and other sources. Remote modules appear in the standard Apps menu alongside installed modules. Click Install → module downloads automatically → then installs. One unified experience.

---

## Dependencies

### Odoo Module Dependencies
- `base`

### Python Libraries Required
- None additional (uses Odoo's built-in HTTP capabilities)

---

## For End Users (What Can This Do For Me?)

- **Unified module discovery** - See available modules from GitHub in the same Apps menu as installed modules
- **One-click install** - Click Install on a remote module → it downloads and installs automatically
- **Repository management** - Configure multiple GitHub repos (public/private) or local filesystem paths
- **Source tracking** - Know where each module came from (OCA, SAM AI, custom, etc.)
- **No manual downloads** - Stop copying module folders manually; let the system do it

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | `ir.module.module` (extended), `module.catalog.repository` |
| Services | 1 | `github.download.service` (in github_download_service.py) |
| Controllers | 0 | Uses standard Odoo module actions |
| Views | 3 | ir.module.module extensions, repository management, menus |
| Security Rules | 2 | Repository: read for users, full for admins |

**Key Files:**
- `models/ir_module_module.py` - Extends ir.module.module with GitHub source fields
- `models/module_catalog_repository.py` - Repository configuration model
- `models/github_download_service.py` - Download and scan logic

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: module catalog, download modules, GitHub integration, install from GitHub
- User wants to: add a GitHub repository, install a module from GitHub, scan for modules
- User mentions: remote module, OCA module, download to install

### Related Agents
- `/docker` - Uses this for container module management
- `/cto-developer` - For implementation work

### Delegate To
- `/github` - For GitHub authentication/token issues
- `/cto` - For architecture decisions about module sources

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/` (module loading)

### Related Modules
- `sam_ai_update_modules` - Batch upgrade queue (uses modules installed via this system)
- `base` - Core Odoo module system (this extends it)

---

## Known Gotchas (Painfully Learned)

1. **Private repos need tokens** - If GitHub repo is private, you must provide a Personal Access Token
2. **addons_path matters** - Downloaded modules go to the FIRST writable addons path
3. **Module name = folder name** - The technical name must match the folder name exactly
4. **Scan creates placeholders** - Scanned remote modules create ir.module.module records even before download
5. **is_remote flag** - Check `is_remote` field to know if module is downloaded or still needs download

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality (2 models + 1 service)
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
