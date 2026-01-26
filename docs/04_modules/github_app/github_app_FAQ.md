# FAQ: github_app

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About GitHub Module Manager

### What is github_app?

github_app (GitHub Module Manager) is an Odoo 18 module that integrates Odoo with GitHub repositories for module management. It allows you to clone, pull, and push git repositories directly from the Odoo UI without SSH access.

**Key facts:**
- Technical name: `github_app`
- Current version: 18.0.3.0.0
- Requires: Odoo 18.0+, Python 3.10+, git installed on server
- License: AGPL-3

### What does github_app do?

github_app provides 5 main capabilities:

1. **Git Operations** - Clone, pull, and push repositories from Odoo UI
2. **Credential Management** - Store GitHub PAT once, use across all repos
3. **Directory Management** - Auto-compute paths from base path + repo name
4. **Config File Editing** - Load, edit, and save Odoo config (addons_path)
5. **Version Checking** - Compare installed vs latest module versions

### Who is github_app for?

github_app is designed for:
- Odoo administrators who need to manage community modules
- Teams using Odoo modules from GitHub repositories
- Developers who want central visibility of all module sources

---

## Installation & Setup

### How do I install github_app?

1. Ensure Odoo 18.0+ is running
2. Ensure git is installed on the server (`apt-get install git`)
3. Navigate to Apps menu
4. Search for "github_app" or "GitHub Module Manager"
5. Click Install

### What are the dependencies for github_app?

github_app requires these Odoo modules:
- `base` - Core Odoo functionality
- `mail` - Chatter for tracking changes

Python libraries required:
- `requests` - For GitHub API testing
- `git` (GitPython) - **Bundled with module** - no pip install needed

System requirements:
- `git` executable must be in PATH

### How do I configure a GitHub account?

After installation:
1. Go to GitHub > Accounts
2. Click Create
3. Enter:
   - Account Name (e.g., "Work Account")
   - GitHub Username
   - Personal Access Token (PAT)
   - Default Base Path (e.g., "/opt/odoo18/addons/")
4. Click "Test Connection" to verify

### How do I generate a GitHub PAT?

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token immediately (shown only once)
5. Paste into github_app Account form

---

## Usage

### How do I add a repository?

To add a repository:
1. Go to GitHub > Repositories
2. Click Create
3. Select Account (with your PAT)
4. Enter Repository URL (e.g., `https://github.com/org/repo.git`)
5. Enter Branch (default: main)
6. Save

Directory path is auto-computed from account's base path + repo name.

### How do I pull updates from a repository?

To pull latest changes:
1. Go to GitHub > Repositories
2. Find your repository
3. Click "Pull" button
4. Wait for notification (success or error)

Or use the wizard:
1. Go to GitHub > Pull Module
2. Select repository
3. Click "Execute"

### How do I sync addons_path with my repositories?

To add repository paths to Odoo config:
1. Go to GitHub > Accounts
2. Select your account
3. Click "Load Config" to load current config file
4. Click "Sync Addons Path" to update paths
5. Review changes in the text field
6. Click "Save Config" to write to disk
7. Restart Odoo to apply changes

### Can I push changes from Odoo?

Yes. The module supports push:
1. Go to GitHub > Repositories
2. Find your repository
3. Click "Push" button
4. All changes are staged, committed with auto-message, and pushed

**Note:** Auto-commit message is "Odoo auto push from [username]"

---

## Troubleshooting

### Why is "git not available" error appearing?

**Symptom:** "Git is not available on this server" error

**Cause:** Git executable is not installed or not in PATH

**Solution:**
1. Install git: `sudo apt-get install git`
2. Verify: `git --version`
3. Restart Odoo
4. Try again

### Why is clone/pull failing with authentication error?

**Symptom:** "Authentication failed" or similar error

**Cause:** PAT is invalid, expired, or lacks permissions

**Solution:**
1. Go to GitHub > Accounts
2. Click "Test Connection"
3. If failed, regenerate PAT on GitHub
4. Update PAT in account form
5. Ensure PAT has `repo` scope

### Why does "dubious ownership" error appear?

**Symptom:** "fatal: detected dubious ownership in repository"

**Cause:** Odoo runs as different user than repo owner

**Solution:** The module auto-adds repos to git's `safe.directory`. If error persists:
```bash
git config --global --add safe.directory /path/to/repo
```

### Why is config file not saving?

**Symptom:** "Save Config" button doesn't work or errors

**Cause:** Permission issues or invalid path

**Solution:**
1. Verify config path exists
2. Check Odoo user has write permission
3. Look for backup files: `/etc/odoo18.conf.backup.*`

---

## Comparisons

### How does github_app compare to manual git management?

| Feature | github_app | Manual (SSH + git) |
|---------|-----------|-------------------|
| UI | Odoo form views | Terminal |
| Credentials | Stored once in Odoo | Typed each time or in .git/config |
| Multiple repos | All visible in one place | Navigate directories |
| Config editing | In-app with backup | vim/nano with manual backup |
| Security | PAT in-memory only | Often in .git/config |

### Why choose github_app over git CLI?

github_app advantages:
- No SSH access needed
- Credentials managed securely
- Central view of all repos
- Config file editing built-in
- Audit trail via mail.thread

---

## Integration

### Does github_app work with private repositories?

Yes. Private repos work if:
- Your PAT has `repo` scope
- The account username has access to the repo

### Can I use SSH URLs instead of HTTPS?

Yes. SSH URLs work but:
- PAT is not used (SSH key auth instead)
- SSH keys must be configured on server
- Recommended for users comfortable with SSH

### Does github_app work with GitLab or Bitbucket?

The module is designed for GitHub but may work with other git hosts:
- Clone/pull/push operations use standard git
- API test connection is GitHub-specific (will fail for others)
- URL parsing assumes GitHub format

---

## Data & Privacy

### Where is my PAT stored?

Your PAT is stored in `git.hub.account.pat` field in the Odoo database:
- Encrypted at rest (Odoo's standard field encryption)
- Accessible only to Odoo users with model access
- **Never written to .git/config**

### What data does github_app send to GitHub?

github_app makes these GitHub calls:
- **Test Connection:** `GET https://api.github.com/user` (verifies PAT)
- **Clone/Pull/Push:** Standard git operations over HTTPS

No other data is sent to GitHub.

---

## Pricing & Licensing

### Is github_app free?

Yes. github_app is licensed under AGPL-3. You can use it, modify it, and distribute it freely.

**Note:** AGPL-3 requires that modifications be made available if you distribute the module.

### Do I need a GitHub paid plan?

No. github_app works with free GitHub accounts. You only need a paid plan if your repositories are private and require additional collaborators.

---

## Support

### Where can I get help with github_app?

- **Documentation:** https://sme.ec/documentation/modules/github-app
- **Email:** sam@sme.ec

### How do I report a bug?

Email anthony@sme.ec with:
- Module version (18.0.3.0.0)
- Odoo version
- Error message (full traceback if available)
- Steps to reproduce
- Server OS and git version

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| SSH key auth requires server config | By Design | Use HTTPS with PAT for easier setup |
| No merge conflict resolution | Known Limitation | Resolve manually on server |
| No branch switching in UI | Future | Use terminal or add branch field |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.3.0.0 | 2025-01 | Account model separation, config management |
| 18.0.2.x.x | 2024 | Safe directory auto-configuration |
| 18.0.1.x.x | 2024 | Initial release |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
