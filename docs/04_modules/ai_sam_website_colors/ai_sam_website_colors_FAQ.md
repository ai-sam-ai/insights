# FAQ: ai_sam_website_colors

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Website Colors

### What is ai_sam_website_colors?

A simple theme module that sets SAM AI Blue (#4A90FF) as the default website color instead of Odoo purple.

**Key facts:**
- Technical name: `ai_sam_website_colors`
- Current version: 18.0.1.0.0
- Requires: Odoo 18.0+, website
- License: LGPL-3

### What colors does it set?

| Name | Hex | Purpose |
|------|-----|---------|
| Alpha | #4A90FF | Primary (SAM AI Blue) |
| Beta | #2D5AA0 | Secondary (Deep Blue) |
| Gamma | #6BB3FF | Accent (Light Blue) |
| Delta | #4A5568 | Neutral (Slate Gray) |
| Epsilon | #1A365D | Dark (Navy) |

---

## Installation & Usage

### How do I install?

1. Go to Apps
2. Search "SAM AI Website Colors"
3. Click Install
4. Done - colors are applied automatically

### How do I change the colors?

Edit the SCSS files directly:
- `static/src/scss/primary_variables.scss`

Then clear assets cache: Website > Configuration > Regenerate Assets

### Why is my site still purple?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Clear Odoo assets cache (Website > Configuration > Regenerate Assets)
3. Hard refresh (Ctrl+Shift+R)

---

## Technical

### Does this module have any models?

No. This is a pure CSS/SCSS module with no Python models, controllers, or database tables. It only contains:
- `ir_asset.xml` for registering SCSS files
- SCSS files for color variables

### How does the SCSS override work?

The module uses Odoo's ir.asset system to append SCSS files to the asset bundles. Since our variables are appended *after* Odoo's defaults, they override the previous values through CSS cascade.

### Can I use this with other themes?

Yes, but there may be conflicts. This module overrides `$o-color-1` through `$o-color-5` which other themes may also modify. The last-loaded module wins.

### What happens if I uninstall?

Colors revert to Odoo defaults (purple). No data is stored, so uninstallation is clean.

---

## Comparisons

### How does this compare to ai_sam_e_learning header colors?

| Module | Scope | Method |
|--------|-------|--------|
| ai_sam_website_colors | Entire website | SCSS variables |
| ai_sam_e_learning | eLearning header only | Dynamic CSS injection |

You can use both - this module sets the base palette, ai_sam_e_learning allows per-section customization.

### Should I use this or Website > Customize colors?

Use this module for:
- Consistent SAM AI branding out of the box
- Same colors across all SAM AI modules

Use Website > Customize for:
- Per-site color customization
- Non-SAM AI branded sites

---

## Support

- **Email:** sam@sme.ec

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
