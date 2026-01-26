# FAQ: ai_sam_cache_manager

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Cache Manager

### What is ai_sam_cache_manager?

ai_sam_cache_manager is a developer utility module for Odoo 18 that provides comprehensive cache clearing across all 9 Odoo cache layers with cross-platform support. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_cache_manager`
- Current version: 18.0.3.1
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does ai_sam_cache_manager do?

ai_sam_cache_manager provides 3 main capabilities:

1. **Complete Cache Clearing** - Clears all 9 Odoo cache layers in one click (Python bytecode, registry, ORM, assets, QWeb, translations, sessions, manifest LRU, logs)
2. **Cross-Platform Operation** - Auto-detects Docker, Windows, Linux, macOS and uses appropriate methods
3. **Smart Service Restart** - Properly stops processes before restarting to eliminate stale cached data

### Who is ai_sam_cache_manager for?

ai_sam_cache_manager is designed for:
- Odoo developers experiencing "changes not showing" issues
- System administrators who need reliable cache management
- DevOps teams deploying to Docker containers
- Businesses using Odoo 18 that require production-ready cache clearing

---

## Installation & Setup

### How do I install ai_sam_cache_manager?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "ai_sam_cache_manager" or "SAM AI Cache Manager"
4. Click Install
5. No additional configuration required - works out of the box

### What are the dependencies for ai_sam_cache_manager?

ai_sam_cache_manager requires these Odoo modules:
- `base` - Core Odoo functionality
- `web` - Web framework for UI components
- `samai_business_manager` - Platform detection services (lazy-loaded)

Python libraries required:
- None additional (uses standard library: shutil, pathlib, subprocess)

### How do I configure ai_sam_cache_manager?

After installation, you can optionally configure via Settings > Technical > System Parameters:

| Parameter | Default | Purpose |
|-----------|---------|---------|
| `ai_sam_cache_manager.logs_path` | `C:\Program Files\SAM AI\logs` | Log file location (Windows fallback) |
| `ai_sam_cache_manager.service_name` | `Odoo 18 (SAM AI Edition)` | Windows service name |
| `ai_sam_cache_manager.enable_restart` | `True` | Enable/disable service restart |

---

## Usage

### How do I clear all caches?

To clear all caches:
1. Go to Settings > Technical > Clear All Caches (or search "Clear Cache" in menu)
2. Read the confirmation dialog showing all 9 layers that will be cleared
3. Click "Yes, Clear All Caches"
4. Wait 10-30 seconds for completion
5. Service will restart automatically (users briefly disconnected)

### How do I check what platform is detected?

The platform is shown in the success message after clearing. Or call the platform_info endpoint:
- The module auto-detects: Docker, Windows, Linux, macOS
- No manual platform configuration needed

### Can I clear caches without restarting the service?

Yes. Set the system parameter `ai_sam_cache_manager.enable_restart` to `False`:

1. Go to Settings > Technical > System Parameters
2. Search for `ai_sam_cache_manager.enable_restart`
3. Set value to `False`
4. Now cache clearing will not restart the service

---

## Troubleshooting

### Why are my CSS/JS changes still not showing after cache clear?

**Symptom:** You clicked Clear Cache but styles/scripts still show old versions

**Cause:** Browser-side caching (not Odoo-side)

**Solution:**
1. Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache manually
3. Try incognito/private window to verify

### Why did cache clearing fail with "Access Denied"?

**Symptom:** Error message "Access Denied: Only administrators can clear cache"

**Cause:** Your user doesn't have administrator rights

**Solution:**
1. Log in as a user with "Administration / Settings" group
2. Or ask your admin to clear the cache for you
3. Check user's groups in Settings > Users > [user] > Access Rights

### Why is the service restart not working in Docker?

**Symptom:** Message says "Manual container restart required"

**Cause:** Docker container doesn't have supervisor or the module can't access it

**Solution:**
1. This is expected behavior if supervisor isn't configured
2. Manually restart your Docker container: `docker restart <container_name>`
3. Or configure supervisor in your Dockerfile

### Cache cleared but module version still shows old number?

**Symptom:** Module info shows old version even after cache clear

**Cause:** This is rare - usually means the manifest wasn't properly cleared

**Solution:**
1. Run Clear Cache again
2. Check if `samai_business_manager` is installed (provides platform_service)
3. Manually restart Odoo service if auto-restart failed
4. Verify the actual file on disk has new version

---

## Comparisons

### How does ai_sam_cache_manager compare to manual cache clearing?

| Feature | ai_sam_cache_manager | Manual Clearing |
|---------|---------------------|-----------------|
| Cache layers cleared | All 9 | Usually 1-3 |
| Time required | 30 seconds | 10-30 minutes |
| Platform detection | Automatic | Manual path finding |
| Manifest LRU cache | Yes (critical!) | Often missed |
| Service restart | Proper stop/kill/start | Usually just restart |
| Error handling | Built-in | Hope for the best |

### Why choose ai_sam_cache_manager over Odoo's built-in "Update Apps List"?

ai_sam_cache_manager goes far beyond "Update Apps List":

- **Update Apps List:** Only refreshes module list from filesystem
- **ai_sam_cache_manager:** Clears ALL 9 cache layers including:
  - Python bytecode that holds old code
  - ORM method caches that return stale data
  - Asset caches that serve old CSS/JS
  - Manifest LRU cache that blocks version updates

---

## Integration

### Does ai_sam_cache_manager work with ai_sam (SAM AI chat)?

Yes, indirectly. They're both part of the SAM AI ecosystem but operate independently. You can ask SAM to guide you through cache clearing, but the actual clearing is done by this module.

### Can I use ai_sam_cache_manager with external monitoring?

Yes. The endpoint returns JSON with detailed breakdown:
- Call `/ai_sam_cache_manager/clear_cache` via RPC
- Response includes count of items cleared per layer
- Can be integrated into deployment scripts

---

## Data & Privacy

### Where is my data stored?

ai_sam_cache_manager doesn't store any data. It's a utility module that:
- Reads system configuration
- Clears caches (destructive operation on cache data)
- Logs operations to Odoo logs (which it then clears!)

No data is sent to external servers.

### What exactly gets deleted when I clear caches?

| Data Cleared | Recoverable? | Impact |
|--------------|--------------|--------|
| Python bytecode | Auto-regenerated | None - just temporary files |
| Registry caches | Auto-rebuilt | Brief slowdown on first request |
| ORM method caches | Auto-rebuilt | Brief slowdown on first request |
| Asset attachments | Auto-rebuilt | CSS/JS regenerated on access |
| QWeb templates | Auto-rebuilt | Views recompiled on access |
| Session files | Lost | Users need to log in again |
| Log file content | Lost | History cleared, logging continues |

---

## Pricing & Licensing

### Is ai_sam_cache_manager free?

Yes. ai_sam_cache_manager is licensed under LGPL-3. You can use it, modify it, and distribute it freely. No subscription required.

### Do I need a SAM AI subscription?

No. This module works independently and doesn't require any subscription or external service.

---

## Support

### Where can I get help with ai_sam_cache_manager?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-cache-manager
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.3.1)
   - Odoo version
   - Platform (Docker/Windows/Linux)
   - Steps to reproduce
   - Error messages from Odoo logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Docker without supervisor shows manual restart message | By Design | Restart container manually |
| Windows may require PowerShell execution policy | By Design | Run: `Set-ExecutionPolicy RemoteSigned` |
| First request after clear is slower | Expected | Caches rebuilding - normal behavior |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.3.1 | 2025-01-10 | Lazy import fix for platform_service |
| 18.0.3.0 | 2025-01-09 | Cross-platform support via platform_service |
| 18.0.2.x | 2024-12 | Initial enhanced version with 9 cache layers |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
