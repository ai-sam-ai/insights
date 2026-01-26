# samai_client - Frequently Asked Questions

> **AI-Discoverable FAQ** - Common questions and troubleshooting

---

## General Questions

### What is samai_client?
The client-side module for receiving SAM AI module updates. Install it on CLIENT sites (not the host) to connect to SAM AI Host and receive module updates automatically.

### What version is this module?
Version 18.0.1.1.0

### What are the dependencies?
- Odoo modules: `base`, `web`
- Python: `requests` library

### Where should this be installed?
On CLIENT sites only (e.g., tls.samai.software, client007.samai.software). The HOST site runs `odoo_saas_kit` instead.

---

## Configuration Questions

### How do I configure the host connection?
1. Go to SAM AI → SAM AI Client (or Settings → SAM AI)
2. Enter the Host URL (e.g., https://samai.software)
3. Enter your API Token (provided by host admin)
4. Click "Test Connection"

### Where does the API token come from?
The host administrator generates a token when provisioning your client site. It may be pre-configured via system parameters during site creation.

### What are the system parameters?
- `samai.host_url` - The SAM AI Host URL
- `samai.api_token` - Your client's API token

These are auto-loaded if set by the host during provisioning.

---

## Update Questions

### How do I check for updates?
Click the "Check for Updates" button in SAM AI Client settings. Or wait for the daily cron job to check automatically.

### How do I apply updates?
1. Click "Check for Updates" (or wait for cron)
2. If updates available, click "Apply Updates"
3. After download completes, click "Request Restart"
4. Wait for container to restart

### What does "Request Restart" do?
It sends a request to the host to restart your container. This applies the downloaded updates. The page will be unavailable briefly during restart.

### Why do I need to restart?
Downloaded modules are extracted to the addons folder but Python doesn't reload them automatically. A container restart loads the new code.

### Does the cron auto-install updates?
No. The cron only CHECKS for updates and stores the results. You must click "Apply Updates" manually. This is intentional for safety.

---

## Technical Questions

### What is community_rev?
A revision number that tracks code changes independent of manifest version. It catches updates where the version stays the same but code differs (hotfixes, patches).

### How are SAM AI modules identified?
Modules matching any of:
- Name starting with `sam`
- Name starting with `ai_sam`
- Name starting with `samai`
- Author containing `SME`

### Where are updates downloaded to?
Updates are extracted to the first writable addons path, preferring paths containing `extra-addons` (typically `/mnt/extra-addons` in Docker).

### What API endpoints does this module call?
- `POST /api/samai/catalog` - List available modules
- `POST /api/samai/check_updates` - Check for updates
- `GET /api/samai/download/{id}` - Download module ZIP
- `POST /api/samai/request_restart` - Request container restart

---

## Troubleshooting

### "No writable addons path found"
**Cause:** None of the configured addons paths are writable by the Odoo process.
**Solution:** Check Docker volume mounts. Ensure `/mnt/extra-addons` is mounted as a writable volume.

### Updates downloaded but not taking effect
**Cause:** Container wasn't restarted after download.
**Solution:** Click "Request Restart" or manually restart the container.

### "Connection failed: HTTP 401"
**Cause:** Invalid or expired API token.
**Solution:** Get a new token from your host administrator and update the configuration.

### "Connection failed: HTTP 403"
**Cause:** Token valid but lacks permission for requested modules.
**Solution:** Contact host admin to verify your subscription tier includes the modules you need.

### Systray doesn't show update badge
**Cause:** JavaScript not loading or updates_available = 0.
**Solution:**
1. Clear browser cache
2. Clear Odoo assets cache
3. Verify Check for Updates shows available updates

### Cron not running
**Cause:** Cron job disabled or Odoo cron processor not running.
**Solution:**
1. Check Settings → Technical → Scheduled Actions
2. Find "SAM AI Update Check" and verify it's active
3. Check container logs for cron errors

### Download fails mid-way
**Cause:** Network timeout or host unavailable.
**Solution:** Retry the Apply Updates action. The system will re-download failed modules.

### Version shows as updated but systray still shows updates
**Cause:** community_rev not updated after download.
**Solution:** The module should auto-update the rev. If stuck, manually delete the record from samai.module.rev and re-check for updates.

---

## Security Questions

### Who can configure the client?
Only users with `base.group_system` (Settings Administrator) can modify the configuration.

### Is the API token stored securely?
The token is stored in the database (samai.client.config record) and optionally in ir.config_parameter. It's not encrypted at rest - standard Odoo security applies.

### Can regular users see the API token?
Yes, if they have read access to the config. Consider restricting access to the SAM AI Client menu to admins only.

---

## Integration Questions

### Does this work with odoo_saas_kit?
Yes! The host site runs `odoo_saas_kit` which provides the API endpoints this module calls.

### Can I use this without the host?
No, this module requires a SAM AI Host running odoo_saas_kit to function. It's designed for the SAM AI SaaS ecosystem.

### Can I customize which modules get updated?
Currently no - all available updates for installed SAM AI modules are offered. Future versions may add selective updates.

---

**Last Updated:** 2025-01-26
**Module Version:** 18.0.1.1.0
