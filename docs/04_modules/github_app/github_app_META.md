# Module: github_app

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `github_app` |
| **Version** | 18.0.3.0.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\github_app` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\github_app\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\github_app\` |
| **Online URL** | https://sme.ec/documentation/modules/github-app |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

github_app is a GitHub integration module for Odoo that enables repository management directly from the Odoo UI. It handles git operations (clone, pull, push), manages GitHub account credentials (PAT stored securely), auto-computes directory paths, checks module versions, and can edit Odoo configuration files (addons_path) through the interface. Includes bundled GitPython library to avoid external dependencies.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality
- `mail` - Chatter for tracking changes

### Python Libraries Required
- `requests` - For GitHub API connection testing
- `git` (GitPython) - Bundled in `lib/` folder, no pip install needed

---

## For End Users (What Can This Do For Me?)

- **Pull modules from GitHub** - Update community modules with one click
- **Clone repositories** - Install new modules from any GitHub repo
- **Manage credentials once** - Set up PAT once, use across all repos
- **Version checking** - See which modules need upgrades
- **Config file editing** - Modify addons_path without SSH access

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 4 | git.hub.account, git.hub, git.hub.app (transient), version.check (transient) |
| Controllers | 0 | None |
| Views | 4 | Settings, accounts, apps/repos, version check |
| JS Files | 0 | None |
| Security Rules | 4 | Full CRUD for all users |

**Key Files:**
- `models/github_account.py` - Account management (PAT, base path, config)
- `models/github_view_settings.py` - Repository model (clone, pull, push)
- `models/github_view_app.py` - Pull wizard
- `models/version_check.py` - Version comparison
- `lib/git/` - Bundled GitPython library

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: github, git pull, clone repo, module updates, addons_path
- User wants to: pull from github, update modules, manage repositories
- User mentions: github_app, git.hub, PAT, personal access token, repository

### Related Agents
- `/github` - For git operations and commits (different purpose - working with code)
- `/cto-developer` - For implementation changes to this module

### Delegate To
- `/github` - For actual git operations on SAM AI codebases
- `/cto-developer` - For code changes to this module
- `/cto` - For architecture decisions about deployment workflows

---

## Cross-References

### Related Documentation
- None specific (standalone utility module)

### Related Modules
- None - This is an independent utility module

---

## Known Gotchas (Painfully Learned)

1. **PAT never written to .git/config** - The module explicitly restores clean URLs after operations to prevent credential leakage. If you see PAT in .git/config, something is wrong.

2. **GitPython bundled in lib/** - The module includes its own GitPython to avoid pip dependency issues. Don't install GitPython system-wide and expect this module to use it.

3. **safe.directory configuration** - The module auto-adds repos to git's safe.directory to prevent "dubious ownership" errors when Odoo runs as a different user than file owner.

4. **Lazy git import** - Git module is imported lazily to prevent crashes if git executable isn't installed. If git isn't available, operations fail with clear error message.

5. **Config file backup** - Before saving config files, the module creates timestamped backups. Check for `.backup.*` files if something goes wrong.

6. **License is AGPL-3** - Note this is AGPL, not LGPL like most SAM modules. Important for distribution considerations.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.3.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (4)
- [x] Controller count matches reality (0)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
