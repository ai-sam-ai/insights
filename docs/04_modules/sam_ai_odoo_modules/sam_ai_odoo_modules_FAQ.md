# FAQ: sam_ai_odoo_modules

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Odoo Modules

### What is sam_ai_odoo_modules?

sam_ai_odoo_modules is a module management extension for Odoo 18 that enables "download to install" workflow for modules from GitHub and other sources. It is developed by Better Business Builders.

**Key facts:**
- Technical name: `sam_ai_odoo_modules`
- Current version: 18.0.2.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does sam_ai_odoo_modules do?

sam_ai_odoo_modules provides module discovery and management:

1. **Unified Module List** - Remote modules appear in standard Apps menu
2. **One-Click Download + Install** - No manual file copying
3. **Repository Management** - Configure GitHub repos or local paths
4. **Source Tracking** - Know where each module originated

### Who is sam_ai_odoo_modules for?

sam_ai_odoo_modules is designed for:
- Developers who frequently install modules from GitHub
- Teams managing multi-source module ecosystems
- Administrators who need to track module provenance
- Anyone tired of manually copying module folders

---

## Installation & Setup

### How do I install sam_ai_odoo_modules?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "SAM AI Odoo Modules"
4. Click Install
5. Go to SAM AI > Module Repositories to configure your first repo

### What are the dependencies for sam_ai_odoo_modules?

sam_ai_odoo_modules requires:
- `base` - Core Odoo functionality

No additional Python libraries are required.

### How do I configure a GitHub repository?

To add a GitHub repository:
1. Go to SAM AI > Module Repositories
2. Click Create
3. Enter:
   - **Name**: Descriptive name (e.g., "OCA Web Modules")
   - **Repository Type**: "GitHub (Public)" or "GitHub (Private)"
   - **GitHub Organization**: e.g., "OCA"
   - **Repository Name**: e.g., "web"
   - **Branch**: e.g., "18.0"
   - **GitHub Token**: (only for private repos)
4. Click Save
5. Click "Scan Repository"

### How do I configure a local filesystem repository?

To add a local repository:
1. Go to SAM AI > Module Repositories
2. Click Create
3. Enter:
   - **Name**: Descriptive name
   - **Repository Type**: "Local Filesystem"
   - **Local Path**: Absolute path (e.g., `D:\repos\my-modules`)
4. Click Save
5. Click "Scan Repository"

---

## Usage

### How do I discover modules from a repository?

1. Go to SAM AI > Module Repositories
2. Select your repository
3. Click "Scan Repository"
4. Modules appear in the standard Apps menu with `is_remote=True`

### How do I install a remote module?

1. Go to Apps
2. Find the module (it will show a download indicator if remote)
3. Click Install
4. The module downloads automatically, then installs

Or use "Download & Install" action for one-click operation.

### How do I know if a module is local or remote?

In the module form view:
- **is_remote = True**: Module needs to be downloaded before install
- **is_remote = False**: Module is already on disk
- **remote_state**: Shows "available", "downloading", "downloaded", or "error"
- **source_type**: Shows where module came from (OCA, SAM AI, etc.)

### Can I download a module without installing it?

Yes. On the module form:
1. Click the "Download" button
2. Module downloads to addons path
3. Install later when ready

### How do I remove a repository?

To remove a repository configuration:
1. Go to SAM AI > Module Repositories
2. Select the repository you want to remove
3. Click Action > Archive (to disable) or Action > Delete (to remove permanently)

**Important notes:**
- Archiving keeps the record but stops it from being scanned
- Deleting removes the repository configuration only
- Already-downloaded modules remain on disk (they don't get deleted)
- Remote module records (`is_remote=True`) from that repo remain in Apps list

To fully clean up:
1. Delete or archive the repository
2. Go to Apps, filter by `is_remote=True` and the source repository
3. Delete orphaned remote module records if desired
4. Optionally delete downloaded module folders from addons path manually

---

## Troubleshooting

### Why is my scan failing with "Repository scan failed"?

**Symptom:** Scan button shows error notification

**Cause:** Usually network or authentication issues

**Solution:**
1. For GitHub: Verify org/repo names are correct
2. For private repos: Ensure token is valid and has repo access
3. For local paths: Verify path exists and is readable
4. Click "Test Connection" to diagnose

### Why is the module download failing?

**Symptom:** remote_state shows "error"

**Cause:** Network issue, permissions, or disk space

**Solution:**
1. Check `remote_state_message` for error details
2. Verify addons_path is writable
3. Check disk space
4. Click "Reset Remote State" and try again

### Why don't I see scanned modules in Apps?

**Symptom:** Scan succeeds but modules don't appear

**Cause:** Module records may be filtered out

**Solution:**
1. Remove filters in Apps list view
2. Search by exact technical name
3. Check if modules have `is_remote=True` (filter by remote status)
4. Verify scan result shows modules found

### Private repo scan returns empty

**Symptom:** Scan succeeds but finds 0 modules

**Cause:** Token doesn't have access or repo has no modules

**Solution:**
1. Verify token has "repo" scope in GitHub settings
2. Check that modules have `__manifest__.py` files
3. Try scanning manually via GitHub API to verify access

---

## Comparisons

### How does this compare to manually copying modules?

| Feature | sam_ai_odoo_modules | Manual Copy |
|---------|---------------------|-------------|
| Steps to install | 1 click | 5+ steps |
| Source tracking | Automatic | Manual notes |
| Error handling | Built-in | Hope it works |
| Repository scanning | Automatic | Browse GitHub manually |
| Module list refresh | Automatic | Manual update_list |

### Can I still install modules manually?

Yes. sam_ai_odoo_modules extends the native module system; it doesn't replace it. You can still copy modules to addons_path and use standard installation.

---

## Integration

### Does sam_ai_odoo_modules work with sam_ai_update_modules?

Yes. Modules installed via sam_ai_odoo_modules can be added to the upgrade queue in sam_ai_update_modules for batch upgrades.

### Can I track updates to installed modules?

Currently, sam_ai_odoo_modules tracks download state but doesn't detect upstream changes. Future versions may add update detection.

---

## Data & Privacy

### Does this module send data externally?

sam_ai_odoo_modules:
- Queries GitHub API to list repository contents (public info)
- Downloads module files from GitHub
- Does NOT send your Odoo data anywhere
- Tokens are stored in your Odoo database only

### Where are downloaded modules stored?

Downloaded modules go to the first writable directory in your `addons_path` configuration. This is typically:
- Docker: `/mnt/extra-addons`
- Linux: `/opt/odoo/addons`
- Windows: Your configured addons folder

---

## Pricing & Licensing

### Is sam_ai_odoo_modules free?

sam_ai_odoo_modules is licensed under LGPL-3. It is free to use, modify, and distribute.

---

## Support

### Where can I get help with sam_ai_odoo_modules?

- **Documentation:** https://sme.ec/documentation/modules/sam-ai-odoo-modules
- **Email:** sam@sme.ec
- **Website:** https://betterbusinessbuilders.com.au

### How do I report a bug?

Email anthony@sme.ec with:
- Module version (18.0.2.0.0)
- Odoo version
- Steps to reproduce
- Error messages from server logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Large repos take time to scan | By design | Use branch filter or subset repos |
| Private repo tokens stored in plain text | Open | Use environment variables for production |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.2.0.0 | 2025-01 | Stable release with local filesystem support |
| 18.0.1.0.0 | 2024-12 | Initial release with GitHub support |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
