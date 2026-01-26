# FAQ: ai_sam_website_management

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Website Management

### What is ai_sam_website_management?

A utility module that exposes hidden per-page header/footer visibility controls and fixes a JavaScript bug in Odoo's website management.

**Key facts:**
- Technical name: `ai_sam_website_management`
- Current version: 18.0.1.2.0
- Requires: Odoo 18.0+, website
- License: LGPL-3

### What bug does it fix?

Fixes "Cannot read properties of undefined (reading metadata)" error that occurs when accessing navbar dropdown items outside the website editor context.

---

## Usage

### How do I hide the header on a page?

1. Go to Website > Site > Pages
2. Edit the page
3. Open Page Properties (gear icon)
4. Uncheck "Show Header"
5. Save

### Why can't I find the header toggle?

Make sure ai_sam_website_management is installed. The toggle only appears after installation.

### Does this affect all pages?

No. Each page has its own setting. Hiding the header on one page doesn't affect others.

### Can I hide just the footer but keep the header?

Yes. The header and footer toggles are independent. You can:
- Show header, hide footer
- Hide header, show footer
- Hide both
- Show both (default)

---

## Technical

### What's the JavaScript bug this fixes?

The bug: Odoo's `websiteCustomMenus` service calls `website.currentWebsite.metadata` without checking if `currentWebsite` exists. In backend context (outside website editor), this is undefined and throws:
```
Cannot read properties of undefined (reading 'metadata')
```

The fix adds null checks before accessing these properties.

### Where does this bug appear?

In navbar dropdown menus when accessed from the backend (not in website editor mode). The error appears in browser console and can cause dropdown functionality to break.

### Do I need to configure anything after install?

No. The module works immediately:
- Header/footer toggles appear in Page Properties
- JavaScript patch is automatically applied to backend assets

---

## Integration

### Does this work with ai_sam_funnels?

Yes! Funnel landing pages often need hidden headers for distraction-free conversions. After installing both modules:
1. Create your funnel page
2. Open Page Properties
3. Uncheck "Show Header"
4. Your funnel page is now clean and focused

### Can I use this with custom themes?

Yes. This module only:
- Exposes existing Odoo fields (header_visible, footer_visible)
- Patches a JavaScript service

It doesn't modify theme styles or templates.

---

## Troubleshooting

### The header toggle isn't showing in Page Properties

1. Verify module is installed: Apps > Search "ai_sam_website_management"
2. Clear browser cache
3. Refresh the page editor
4. Check for JavaScript errors in console

### Header still shows after hiding

1. Save the page properties
2. Hard refresh (Ctrl+Shift+R)
3. Check if another module is forcing header visibility

---

## Support

- **Email:** sam@sme.ec

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
