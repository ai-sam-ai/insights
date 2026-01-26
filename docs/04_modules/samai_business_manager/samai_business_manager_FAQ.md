# samai_business_manager - Frequently Asked Questions

> **AI-Discoverable FAQ** - Common questions and troubleshooting

---

## General Questions

### What is samai_business_manager?
The foundation module for SAM AI's Business Unit navigation system. It organizes Odoo's flat app menu into logical Business Units (Sales, HR, Accounting) with the "3 Clicks to Workplace" philosophy.

### What version is this module?
Version 18.0.4.0.0 - This is the consolidated v4.0 that merged the former samai_business_management module.

### What are the dependencies?
Only `base` and `web` - minimal dependencies for maximum compatibility.

### Is this module an Application?
Yes, `application: True` with `sequence: 1` - it loads first to set up the navigation foundation.

---

## Business Unit Questions

### How do I enable/disable a Business Unit?
Use the System Builder wizard: Settings → SAM AI → System Builder. Check/uncheck the Business Units you want enabled, click Apply.

### Why don't my menus appear after enabling a Business Unit?
Clear the menu cache: either use the Cache Manager module or restart Odoo. The `_load_menus_blacklist()` cache needs refreshing.

### Can I create custom Business Units?
Yes! Go to SAM AI → Business Units → Create. Set the name, icon, and which menus should be claimed.

### What happens to menus when I disable a Business Unit?
They're hidden (blacklisted) but not deleted. Re-enable the Business Unit and they return immediately.

---

## Platform Service Questions

### How do I use the Platform Service?
```python
from odoo.addons.samai_business_manager.utils import platform_service

platform = platform_service.get_platform_type()  # Returns 'docker', 'windows', etc.
log_path = platform_service.get_log_path()        # Platform-appropriate path
success, msg = platform_service.restart_service() # Restart Odoo safely
```

### What platforms are supported?
- Docker containers (auto-detected via /.dockerenv)
- Windows (service management via PowerShell)
- Linux (systemd or sysvinit)
- macOS (for development)

### Why does platform detection matter?
Log paths differ (`/var/log/odoo` vs `C:\odoo\server.log`), service restart commands differ (`supervisorctl` vs `sc.exe`), and process management differs (`pkill` vs `taskkill`). The Platform Service handles all this automatically.

---

## Troubleshooting

### Business Units not showing in app switcher
1. Check if the Business Unit has `is_enabled = True`
2. Verify the user has `group_business_unit_user` group
3. Clear menu cache or restart Odoo
4. Check if another module overrides `_load_menus_blacklist()` without calling super()

### Menus duplicated or in wrong place
1. Check `samai.business.unit.menu` records for duplicate menu claims
2. Verify `original_parent_id` is set for menu restoration
3. Uninstall/reinstall module to reset menu claims

### System Builder wizard not working
1. Verify user has `base.group_system` (Settings admin)
2. Check JavaScript console for OWL errors
3. Clear browser cache and assets cache

### Platform Service returns UNKNOWN
1. Check if running in an unusual environment
2. Verify file permissions on `/.dockerenv` (Docker detection)
3. Check `platform.system()` returns expected value

### Service restart fails
- **Docker:** Check if supervisorctl is available, or use container restart
- **Windows:** Verify Odoo service name (default: odoo-server-18.0)
- **Linux:** Check systemd unit name or init script path

---

## Security Questions

### What security groups does this module create?
- `group_business_unit_user` - Read-only access to view Business Units
- `group_business_unit_admin` - Full CRUD access to manage Business Units

### Who can use the System Builder?
Only users with `base.group_system` (Settings/Administration: Settings) can access the System Builder wizard.

### Can regular users modify Business Units?
No, regular users only have read access. Admins (group_business_unit_admin) can modify.

---

## Migration Questions

### I have the old samai_business_management module installed
Uninstall `samai_business_management` before upgrading. All functionality is now in `samai_business_manager` v4.0.0.

### How do I migrate from v2.0 to v4.0?
The systray switcher (v2.0) has been removed. Navigation is now purely menu-based. No data migration needed - just upgrade and clear caches.

### Will my existing Business Unit configurations be preserved?
Yes, the database models haven't changed. Upgrade preserves all configurations.

---

## Development Questions

### How do I add a menu to a Business Unit programmatically?
```python
unit = env['samai.business.unit'].browse(unit_id)
menu = env['ir.ui.menu'].browse(menu_id)
env['samai.business.unit.menu'].create({
    'business_unit_id': unit.id,
    'menu_id': menu.id,
    'original_parent_id': menu.parent_id.id,
})
menu.parent_id = unit.root_menu_id  # Reparent menu
```

### How do I create a Contact Variant?
```python
custom_menu = env['samai.business.unit.custom.menu'].browse(menu_id)
env['samai.business.unit.contact.variant'].create({
    'name': 'VIP Customers',
    'custom_menu_id': custom_menu.id,
    'domain': "[('is_vip', '=', True)]",
})
```

### Can I extend the Platform Service?
Yes, import and extend:
```python
from odoo.addons.samai_business_manager.utils.platform_service import PlatformType

# Add custom platform handling
if platform_service.get_platform_type() == PlatformType.DOCKER:
    # Docker-specific logic
```

---

## Performance Questions

### Does menu blacklisting affect performance?
No, `_load_menus_blacklist()` is called once per session and cached. The blacklist is a simple set lookup.

### How many Business Units can I have?
No hard limit. The system scales to hundreds of Business Units, though for UX reasons we recommend 5-10.

### Does Platform Service cache results?
Platform type detection is lightweight (file check + system call) and typically runs once per process. No explicit caching needed.

---

**Last Updated:** 2025-01-26
**Module Version:** 18.0.4.0.0
