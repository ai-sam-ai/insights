# FAQ: sam_ai_update_modules

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Update Modules

### What is sam_ai_update_modules?

sam_ai_update_modules is a batch module upgrade system for Odoo 18 that allows you to queue and upgrade multiple modules with a single click. It is part of the SAM AI ecosystem developed by SAM AI.

**Key facts:**
- Technical name: `sam_ai_update_modules`
- Current version: 18.0.1.8
- Requires: Odoo 18.0+, Python 3.10+, `sam_ui_theme`
- License: LGPL-3

### What does sam_ai_update_modules do?

sam_ai_update_modules provides batch upgrade capabilities:

1. **Queue Management** - Add up to 20 modules with priority ordering
2. **One-Click Upgrade** - Single button triggers batch upgrade
3. **Progress Overlay** - Beautiful gold-star UI during upgrade
4. **State Tracking** - Track pending/upgrading/done/error states
5. **Auto-Reset** - Queue resets automatically for next upgrade cycle

### Who is sam_ai_update_modules for?

sam_ai_update_modules is designed for:
- Teams managing many Odoo modules who upgrade frequently
- Administrators who need repeatable upgrade processes
- Developers who want efficient batch upgrades during deployment
- Anyone tired of upgrading modules one-by-one

---

## Installation & Setup

### How do I install sam_ai_update_modules?

1. Ensure Odoo 18.0+ is running
2. Ensure `sam_ui_theme` is installed
3. Navigate to Apps menu
4. Search for "SAM AI Update Modules"
5. Click Install
6. Go to Apps > SAM Apps Upgrade to access

### What are the dependencies for sam_ai_update_modules?

sam_ai_update_modules requires:
- `base` - Core Odoo functionality
- `web` - Web assets
- `sam_ui_theme` - Provides base overlay styling

No additional Python libraries required.

### How do I configure the upgrade queue?

To configure your upgrade queue:
1. Go to Apps > SAM Apps Upgrade > Configure Apps to Upgrade
2. Click Create
3. Select an installed module from the dropdown
4. Set position (1-20) - lower numbers upgrade first
5. Repeat for additional modules
6. Save

---

## Usage

### How do I run a batch upgrade?

1. Ensure your queue has modules with state 'pending'
2. Go to Apps > SAM Apps Upgrade > Activate Upgrade
3. Click to confirm
4. Watch the gold star overlay showing progress
5. After completion, page refreshes with all upgrades applied

### What do the queue states mean?

| State | Meaning |
|-------|---------|
| `pending` | Waiting to be upgraded |
| `upgrading` | Currently being upgraded |
| `done` | Upgrade completed successfully |
| `error` | Upgrade failed (check error_message) |
| `skipped` | User chose to skip this module |

### Can I add more than 20 modules?

No. The queue is limited to 20 modules per cycle. For more modules:
1. Run first batch (up to 20)
2. Wait for completion
3. Add remaining modules
4. Run second batch

### How do I reset the queue?

To reset items to pending:
1. Go to Configure Apps to Upgrade
2. Select items you want to reset
3. Action > Reset to Pending

Or use "Reset All" to reset the entire queue.

---

## Troubleshooting

### Why won't my upgrade start?

**Symptom:** "Activate Upgrade" shows notification but nothing happens

**Cause:** No pending modules in queue

**Solution:**
1. Go to Configure Apps to Upgrade
2. Check that modules have state = 'pending'
3. If all are 'done', use Reset to Pending
4. Try again

### Why is my module stuck in 'upgrading'?

**Symptom:** Module shows 'upgrading' but never completes

**Cause:** Server restarted before completion could be recorded, or upgrade is still running

**Solution:**
1. Check Odoo server logs for errors
2. If server is running normally, the `_register_hook` should mark as 'done'
3. If stuck, manually reset to 'pending' and try again

### Why do I see a white flash on page load?

**Symptom:** Brief white screen before overlay appears

**Cause:** `upgrade_early_load.js` not loading early enough, or browser cache issue

**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. If persists, check that asset bundle is loading correctly

### Why can't I add this module to the queue?

**Symptom:** Module doesn't appear in dropdown

**Cause:** Only installed modules can be added to upgrade queue

**Solution:**
1. Verify module is installed (state = 'installed')
2. Uninstalled modules won't appear
3. Install the module first, then add to queue

### What happens if the server crashes during upgrade?

**Symptom:** Server stops unexpectedly during batch upgrade

**Recovery process:**

1. **Check the database state:**
   - Queue items will show `state='upgrading'`
   - Some modules may have upgraded, others may not

2. **Restart Odoo server normally:**
   - The `_register_hook()` method runs on every server start
   - It automatically marks `upgrading` items as `done`
   - This assumes if server started, upgrade succeeded

3. **If modules are partially upgraded:**
   - Check Odoo server logs for which modules completed
   - Reset failed items to `pending`: Action > Reset to Pending
   - Run upgrade again for remaining modules

4. **If upgrade broke the system:**
   - Restore from database backup
   - Check which module caused the issue
   - Remove problematic module from queue
   - Try again with remaining modules

**Prevention tips:**
- Always backup database before batch upgrades
- Start with smaller batches (5-10 modules) until confident
- Review module changelogs before upgrading
- Test upgrades on staging environment first

---

## Comparisons

### How does this compare to upgrading modules individually?

| Feature | sam_ai_update_modules | Individual Upgrade |
|---------|----------------------|-------------------|
| Clicks for 20 modules | 1 | 100+ |
| State tracking | Automatic | Manual notes |
| Progress visibility | Gold star overlay | Watch logs |
| Repeatable | Auto-reset queue | Start over each time |
| Batch optimization | Single registry reload | 20 separate reloads |

### Can I still upgrade modules individually?

Yes. sam_ai_update_modules adds batch capability; it doesn't remove standard Odoo upgrade functionality.

---

## Integration

### Does sam_ai_update_modules work with sam_ai_odoo_modules?

Yes. Modules installed via sam_ai_odoo_modules can be added to the upgrade queue.

### What about CI/CD integration?

The `start_upgrade_queue()` method can be called programmatically:
```python
env['sam.upgrade.queue'].start_upgrade_queue()
```

Useful for automated deployment scripts.

---

## Data & Privacy

### Where is queue data stored?

Queue data is stored in:
- **Database:** `sam_upgrade_queue` table (module list, states)
- **Browser:** localStorage (overlay state during upgrade)

### Is any data sent externally?

No. All processing happens locally on your Odoo server.

---

## Pricing & Licensing

### Is sam_ai_update_modules free?

sam_ai_update_modules is licensed under LGPL-3. It is free to use, modify, and distribute.

---

## Support

### Where can I get help with sam_ai_update_modules?

- **Documentation:** https://sme.ec/documentation/modules/sam-ai-update-modules
- **Email:** sam@sme.ec

### How do I report a bug?

Email anthony@sme.ec with:
- Module version (18.0.1.8)
- Odoo version
- Steps to reproduce
- Server logs showing error

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| 20 module limit | By design | Run multiple cycles |
| Admin only access | By design | Use admin account |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.8 | 2025-01 | Auto-reset, improved overlay |
| 18.0.1.0 | 2024-12 | Initial release |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
