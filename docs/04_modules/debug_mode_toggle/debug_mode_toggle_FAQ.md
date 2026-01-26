# FAQ: debug_mode_toggle

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Toggle Developer Mode

### What is debug_mode_toggle?

debug_mode_toggle is a Tools module for Odoo 18 that adds a clickable toggle icon to the navbar for instantly enabling or disabling developer/debug mode.

**Key facts:**
- Technical name: `debug_mode_toggle`
- Current version: 18.0
- Author: CodeFusion OdooWorks
- Requires: Odoo 18.0+, base, web
- License: AGPL-3

### What does debug_mode_toggle do?

debug_mode_toggle provides one capability:

1. **Quick Debug Toggle** - Adds an icon to the systray that toggles the `?debug=1` URL parameter with one click

### Who is debug_mode_toggle for?

debug_mode_toggle is designed for:
- Developers who frequently need debug mode
- Functional consultants configuring Odoo
- Technical support staff troubleshooting issues

---

## Installation & Setup

### How do I install debug_mode_toggle?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "Toggle Developer Mode"
4. Click Install
5. Refresh browser - toggle icon appears in navbar

### What are the dependencies for debug_mode_toggle?

debug_mode_toggle requires these Odoo modules:
- `base` - Odoo base
- `web` - Odoo web client

Python libraries required:
- None

### How do I configure debug_mode_toggle?

No configuration needed. After installation, the toggle icon automatically appears in the navbar systray area (top-right).

---

## Usage

### How do I toggle debug mode?

To toggle debug mode:
1. Look at the top-right navbar area
2. Find the toggle icon (before notifications/user menu)
3. Click the icon
4. Page refreshes with debug mode on/off

### How do I know if debug mode is active?

Visual indicators:
- **Toggle icon green** = Debug mode ON
- **Toggle icon white** = Debug mode OFF
- URL contains `?debug=1` = Debug mode ON

### Does it support debug=assets mode?

No. This module only toggles between no debug and `debug=1`. It does not support `debug=assets` mode. To use assets debug, you'll need to manually edit the URL.

---

## Troubleshooting

### Why don't I see the toggle icon?

**Symptom:** No toggle icon in navbar after installation

**Cause:** Browser cache or asset compilation issue

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart Odoo and try again
4. Check browser console for JavaScript errors

### Toggle icon appears but styling is wrong

**Symptom:** Icon is visible but not colored correctly

**Cause:** CSS class mismatch between JS and CSS files

**Solution:**
1. This is a known issue in the module
2. Functionality still works, just visual styling may be off
3. Can be fixed by developer aligning CSS classes

### I lost my unsaved work when toggling

**Symptom:** Data disappeared after clicking toggle

**Cause:** Toggle causes page refresh - unsaved data is lost

**Solution:**
1. Always save before toggling debug mode
2. This is expected behavior - same as any debug toggle method

### Debug mode doesn't seem to enable

**Symptom:** Page refreshes but no debug features visible

**Cause:** User may not have debug access permissions

**Solution:**
1. Check if user has appropriate group memberships
2. Verify URL actually contains `?debug=1` after click
3. Some debug features require admin/settings access rights

---

## Comparisons

### How does this compare to ts_debug_switch?

| Feature | debug_mode_toggle | ts_debug_switch |
|---------|-------------------|-----------------|
| Author | CodeFusion OdooWorks | Techvaria |
| Implementation | NavBar patch | Systray component |
| debug=assets support | No | Check module |
| Permission control | No | Has security group |
| License | AGPL-3 | OPL-1 (proprietary) |

### Why use this over manual URL editing?

- Faster - one click vs typing
- Consistent - same location on every screen
- Visual feedback - see current state at a glance
- Error-free - no typos in URL parameter

### Why use this over Settings menu?

- Faster - one click vs 5+ clicks
- Available everywhere - don't need to navigate away
- Stays on current page - useful when debugging specific screen

---

## Integration

### Does debug_mode_toggle conflict with other modules?

Known conflicts:
- **ts_debug_switch** - Both modify navbar/systray. Don't install both.
- Other systray-modifying modules may have CSS/layout conflicts

### Does it work with multi-company?

Yes. Debug mode is a session/URL setting, not company-specific.

---

## Data & Privacy

### Does this module store any data?

No. This module stores no data. It only modifies the URL parameter on page load.

### Can I audit who used debug mode?

No. This module provides no audit trail. Odoo's standard logging may capture some debug mode access.

---

## Pricing & Licensing

### Is debug_mode_toggle free?

Yes. debug_mode_toggle is licensed under AGPL-3. Free to use and modify.

---

## Support

### Where can I get help with debug_mode_toggle?

- **Author:** CodeFusion OdooWorks
- **Website:** https://codefusion-odooworks.odoo.com/
- **Maintainers:** yashsuvta1236@gmail.com, nitinupmanyu12@gmail.com
- **For SAM AI deployments:** sam@sme.ec

### How do I report a bug?

Contact the maintainers via email with:
- Odoo version
- Module version
- Browser and version
- Steps to reproduce
- Any console errors

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| CSS class mismatch | Open | Styling may not apply; functionality works |
| Asset path mismatch | Open | May cause loading issues in some configs |
| No debug=assets support | By design | Use URL manually for assets debug |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0 | 2024 | Odoo 18 release |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
