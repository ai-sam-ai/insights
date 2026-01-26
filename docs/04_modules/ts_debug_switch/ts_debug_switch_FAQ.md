# FAQ: ts_debug_switch

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is Quick Debug Switch?
A lightweight Odoo module that adds a toggle button to the systray for instantly enabling/disabling Debug Mode (Developer Mode).

### Who made this module?
Techvaria Solutions Pvt. Ltd. (https://techvaria.com)

### What Odoo version is required?
Odoo 18.0 or later.

### What license is it under?
OPL-1 (Odoo Proprietary License - commercial/proprietary).

---

## Usage Questions

### Where is the toggle button?
In the systray (top right of Odoo, near your profile picture and notifications).

### What do the icons mean?
- **Green toggle-on icon:** Debug mode is active
- **Gray toggle-off icon:** Debug mode is inactive

### Does clicking the toggle reload the page?
Yes, the page reloads to apply the debug mode change.

### Can I toggle to assets debug or tests debug?
No, this toggle only switches between debug=0 and debug=1. For assets or tests debug, use the URL parameters manually.

---

## Security Questions

### Who can see the toggle button?
Users in the "Show Debug Switch" security group (`ts_debug_switch.group_debug_switch_access`).

### By default, who has access?
All internal users (base.group_user) can see and use the toggle.

### How do I restrict access?
1. Go to Settings > Users & Companies > Groups
2. Find "Show Debug Switch" group
3. Remove users who shouldn't have access

### Can I give it to specific users only?
Yes, remove base.group_user from the implied_ids and manually assign users to the group.

---

## Technical Questions

### Does this module have any backend models?
No, it's purely a frontend JavaScript (OWL) component.

### What's the systray sequence?
Sequence 2 (appears early in systray order).

### How does it check user access?
```javascript
this.orm.call("res.users", "has_group",
    [user.userId],
    {group_ext_id: 'ts_debug_switch.group_debug_switch_access'})
```

### How does the toggle work?
```javascript
const oppositeDebug = (isDebug || isAssets || isTests) ? 0 : 1;
router.pushState({ debug: oppositeDebug }, { reload: true });
```

---

## Comparison Questions

### How is this different from debug_mode_toggle?
Both modules provide similar functionality. Key differences:
- ts_debug_switch uses OWL component with security group
- debug_mode_toggle may use different implementation
- Having both installed could cause conflicts

### Should I use this or debug_mode_toggle?
Use one or the other, not both. Choose based on:
- Which security model you prefer
- Which UI appearance you like
- License requirements (ts_debug_switch is OPL-1)

---

## Troubleshooting

### I don't see the toggle button
1. Check if the module is installed
2. Verify you're in the "Show Debug Switch" group
3. Clear browser cache and refresh
4. Check browser console for JavaScript errors

### Toggle doesn't work
1. Check browser console for errors
2. Verify web module is loaded
3. Try clearing browser cache

### Page doesn't reload after clicking
1. Check for JavaScript errors in console
2. Verify router service is available
3. Check for popup blockers or browser restrictions

---

## Search Keywords

ts_debug_switch, quick debug, debug mode toggle, developer mode, systray button, techvaria, debug switch, one-click debug

---

## Related Documentation

- [META - Module Overview](ts_debug_switch_META.md)
- [SCHEMA - Technical Reference](ts_debug_switch_SCHEMA.md)
- [WOW - Feature Highlights](ts_debug_switch_WOW.md)
