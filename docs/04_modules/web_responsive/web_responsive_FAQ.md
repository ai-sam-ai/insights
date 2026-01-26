# FAQ: web_responsive

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is Web Responsive?
An OCA community module that adds comprehensive responsive design to Odoo's backend, making it work better on mobile devices and improving desktop experience.

### Who maintains this module?
The Odoo Community Association (OCA), with primary maintainers Tardo and SplashS.

### What Odoo version is required?
Odoo 18.0 or later (Community Edition).

### What license is it under?
LGPL-3 (open source, free to use).

### Does it work with Odoo Enterprise?
No, this module explicitly excludes `web_enterprise`. It's designed for Community Edition only.

---

## Feature Questions

### What's the fullscreen app menu?
A redesigned navigation that fills the screen, making apps easier to find and select on all devices.

### How does the quick search work?
Type in the search box to filter apps. Three modes available:
- **Canonical:** Exact text matching
- **Fuse:** Fuzzy matching (tolerates typos)
- **Command Palette:** Power user command-style

### What are sticky headers?
In list views, column headers stay visible as you scroll down. Same for footers with totals.

### What's the sticky statusbar?
In form views, the status bar (Draft → Confirmed → Done) stays visible while scrolling.

### Why are checkboxes bigger?
To make them easier to tap on touch screens without accidentally selecting the wrong row.

### How does the side-by-side document viewer work?
When viewing attachments with chatter on the side, documents appear in that panel instead of full-screen. Click maximize for full view.

---

## Keyboard Questions

### Why Alt+Shift+NUM instead of Alt+NUM?
Firefox uses Alt+NUM for tab switching. Alt+Shift avoids this conflict.

### What keyboard shortcuts are available?
- Arrow keys: Navigate app search results
- Enter: Select highlighted app
- Esc: Close app menu
- Alt+S: Save
- Alt+Shift+[NUM]: Access app by number

---

## Configuration Questions

### How do I change my search type?
Go to your user preferences (profile menu) and change "Apps Menu Search Type" to Canonical, Fuse, or Command Palette.

### How do I change the theme?
In user preferences, change "Apps Menu Theme" to Milk or Community.

### What does "Redirect to Home" do?
When enabled, you go to the dashboard after login. Disabled means you go to your home action if set.

### Can I configure settings for all users?
Set defaults in the model, or configure each user individually in their profile.

---

## Troubleshooting

### Module won't install
1. Check you're on Community Edition (not Enterprise)
2. Verify web, web_tour, and mail are installed
3. Look for conflict with web_enterprise

### Sticky headers not working
1. Clear browser cache
2. Check SCSS is loading (browser dev tools)
3. Verify module is fully installed

### App menu search not finding results
1. Check search_type preference
2. Try different search type (Canonical vs Fuse)
3. Verify apps are installed and visible

### Keyboard shortcuts not working
1. Check for browser extension conflicts
2. Try different browser
3. Verify you're in backend (not website frontend)

### Mobile display issues
1. Clear browser cache
2. Check viewport meta tag
3. Try landscape mode

---

## Technical Questions

### What's Fuse.js?
A lightweight fuzzy-search library bundled with this module for the "Fuse" search type.

### How does session_info work?
The ir.http model is extended to add apps_menu configuration to the session, making it available to JavaScript.

### Can I customize the themes?
Yes, override the SCSS variables in primary_variable.scss or create your own theme.

### Where are the components?
In `static/src/components/` - each feature has its own folder with JS/XML files.

---

## Compatibility Questions

### Does this work with other OCA modules?
Yes, it's designed to be compatible with the OCA ecosystem.

### Any known conflicts?
- Cannot be used with web_enterprise
- May conflict with other modules that heavily modify the web client

### Does it affect website frontend?
No, only affects the backend (`web.assets_backend`).

---

## Search Keywords

web_responsive, responsive design, mobile odoo, fullscreen menu, app search, fuse search, sticky header, sticky footer, keyboard shortcuts, OCA web, community responsive

---

## Related Documentation

- [META - Module Overview](web_responsive_META.md)
- [SCHEMA - Technical Reference](web_responsive_SCHEMA.md)
- [WOW - Feature Highlights](web_responsive_WOW.md)
- [OCA GitHub](https://github.com/OCA/web/tree/18.0/web_responsive)
