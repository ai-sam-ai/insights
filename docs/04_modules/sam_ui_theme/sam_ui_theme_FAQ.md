# FAQ: sam_ui_theme

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM UI Theme

### What is sam_ui_theme?

sam_ui_theme is a backend theme module for Odoo 18 that provides customizable branding, colors, typography, and visual effects. It includes the animated "bling line" on the app menu, system overlays, and consistent modal styling. Part of the SAM AI ecosystem by SME.ec.

**Key facts:**
- Technical name: `sam_ui_theme`
- Current version: 18.0.21.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does sam_ui_theme do?

sam_ui_theme provides 5 main capabilities:

1. **Color Customization** - Primary, secondary, accent, navbar, and bling colors
2. **Theme Presets** - 6 ready-to-use themes (SAM Default, Dark, Ocean, Forest, Sunset, Purple)
3. **Typography Options** - 5 font families for headings and body text
4. **Visual Effects** - Animated bling line on app menu overlay
5. **System Overlays** - Consistent modal and loading overlay styling

### Who is sam_ui_theme for?

sam_ui_theme is designed for:
- Businesses wanting to brand their Odoo instance
- Teams who prefer a modern, polished interface
- SAM AI users who want visual consistency across modules

---

## Installation & Setup

### How do I install sam_ui_theme?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "sam_ui_theme" or "SAM UI Theme"
4. Click Install
5. Go to Settings > SAM AI Theme to customize

### What are the dependencies for sam_ui_theme?

sam_ui_theme requires these Odoo modules:
- `web` - Odoo web framework
- `bus` - Long polling support

Python libraries required:
- None additional

### How do I access theme settings?

After installation:
1. Go to Settings
2. Look for "SAM AI Theme" section
3. Or search "SAM Theme" in the menu

---

## Usage

### How do I change the primary color?

To change the primary color:
1. Go to Settings > SAM AI Theme
2. Find "Primary Color" field
3. Enter hex color (e.g., #FF5733) or use color picker
4. Click Save
5. Refresh browser to see changes

### How do I apply a theme preset?

To apply a preset:
1. Go to Settings > SAM AI Theme
2. Find "Theme Preset" dropdown
3. Select a preset (SAM Default, Dark, Ocean, Forest, Sunset, Purple)
4. All color fields auto-populate
5. Click Save

### How do I disable the bling line?

To disable the animated bling line:
1. Go to Settings > SAM AI Theme
2. Find "Enable Bling Line" checkbox
3. Uncheck it
4. Click Save
5. Refresh browser

### Can I use custom fonts?

Yes, from the available options:
1. Go to Settings > SAM AI Theme
2. Find "Display Font" and "Body Font" fields
3. Choose from:
   - Plus Jakarta Sans (default for headings)
   - DM Sans (default for body)
   - Inter
   - Roboto
   - System Default
4. Click Save

---

## Troubleshooting

### Why aren't my color changes showing?

**Symptom:** Changed colors in settings but Odoo still shows old colors

**Cause:** Browser CSS cache

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Wait 5 minutes (dynamic CSS is cached)
4. Try incognito/private window

### Why does the navbar color not match my setting?

**Symptom:** Navbar background color different from setting

**Cause:** CSS specificity conflicts or cache

**Solution:**
1. Hard refresh browser
2. Check if "Navbar Background" field is set correctly
3. Clear Odoo cache (Settings > Technical > Clear Cache)
4. Upgrade the module: Apps > sam_ui_theme > Upgrade

### Why is the bling line not animating?

**Symptom:** Bling line visible but not moving

**Cause:** CSS animation not loading properly

**Solution:**
1. Check "Enable Bling Line" is checked
2. Hard refresh browser
3. Check browser console for CSS errors
4. Verify bling colors are set (all 3)

### Why do modals look different than expected?

**Symptom:** Popups/dialogs have inconsistent styling

**Cause:** Other modules may override modal CSS

**Solution:**
1. sam_ui_theme should be at sequence 100 (loads last)
2. Check for conflicting theme modules
3. Clear cache and upgrade module

---

## Comparisons

### How does sam_ui_theme compare to Odoo Enterprise theme?

| Feature | sam_ui_theme | Odoo Enterprise |
|---------|-------------|-----------------|
| Color Customization | Full (all colors) | Limited |
| Theme Presets | 6 presets | None |
| Bling Effects | Yes | No |
| Typography Options | 5 fonts | None |
| Company-Specific | Yes | Yes |
| Price | Free (LGPL-3) | Enterprise License |

### Why choose sam_ui_theme over custom CSS?

sam_ui_theme advantages:
- No CSS/SCSS knowledge needed
- Settings stored in database (not files)
- Survives Odoo upgrades
- Company-specific settings
- Integrated with SAM AI ecosystem

---

## Integration

### Does sam_ui_theme work with ai_sam (SAM chat)?

Yes. ai_sam uses sam_ui_theme's CSS variables for:
- Chat bubble colors
- Button styling
- Card borders

Changes to sam_ui_theme colors automatically update chat styling.

### Does sam_ui_theme affect the website?

Partially. sam_ui_theme provides:
- Login page styling (web.assets_frontend)
- Portal header colors (if using SAM portal modules)

The main website uses separate themes.

### Can I use sam_ui_theme CSS variables in custom modules?

Yes. In your SCSS/CSS, reference:
```css
.my-element {
    background-color: var(--sam-blue-primary);
    border-color: var(--sam-gold-sparkle);
    border-radius: var(--sam-card-radius);
}
```

---

## Data & Privacy

### Where are theme settings stored?

Theme settings are stored in:
- `sam.theme.settings` model in Odoo database
- `ir.config_parameter` for quick access
- Company-specific (one record per company)

### Can I export/import theme settings?

Not directly via UI. To transfer settings:
1. Export `sam.theme.settings` via database export
2. Or note color values and re-enter in new instance
3. Or use Odoo data migration tools

---

## Pricing & Licensing

### Is sam_ui_theme free?

Yes. sam_ui_theme is licensed under LGPL-3. You can use it, modify it, and distribute it freely.

### Do I need a SAM AI subscription?

No. sam_ui_theme works independently. No subscription or external service required.

---

## Support

### Where can I get help with sam_ui_theme?

- **Documentation:** https://sme.ec/documentation/modules/sam-ui-theme
- **Email:** sam@sme.ec

### How do I report a bug?

Email anthony@sme.ec with:
- Module version (18.0.21.0.0)
- Odoo version
- Browser and version
- Steps to reproduce
- Screenshots showing the issue

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| 5-minute cache on dynamic CSS | By Design | Hard refresh or wait |
| Font changes need refresh | Expected | Ctrl+Shift+R |
| Dark preset needs more contrast | Minor | Customize colors manually |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.21.0.0 | 2025-01 | Login page styling, kanban card side color |
| 18.0.20.x.x | 2024-12 | Consolidated ai_sam_system_overlay features |
| 18.0.19.x.x | 2024-12 | Font family options |
| 18.0.18.x.x | 2024-11 | Theme presets |

---

*Last updated: 2025-01-26*
*Part of SAM AI by SME.ec*
