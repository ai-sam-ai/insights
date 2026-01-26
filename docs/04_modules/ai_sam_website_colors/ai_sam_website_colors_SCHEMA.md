# Schema: ai_sam_website_colors

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_website_colors` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 0 |
| **Total Controllers** | 0 |
| **API Endpoints** | 0 |

---

## Asset Registration

### ir_asset.xml

Registers SCSS files into Odoo's asset bundle system.

| Record ID | Bundle | Directive | Path |
|-----------|--------|-----------|------|
| `primary_variables_scss` | web._assets_primary_variables | append | static/src/scss/primary_variables.scss |
| `secondary_variables_scss` | web._assets_secondary_variables | append | static/src/scss/secondary_variables.scss |

---

## SCSS Variables

### primary_variables.scss

Sets the primary color palette:

```scss
$o-color-1: #4A90FF;  // SAM AI Blue (Alpha)
$o-color-2: #2D5AA0;  // Deep Blue (Beta)
$o-color-3: #6BB3FF;  // Light Blue (Gamma)
$o-color-4: #4A5568;  // Slate Gray (Delta)
$o-color-5: #1A365D;  // Navy (Epsilon)
```

### secondary_variables.scss

Additional utility variables for consistent theming.

---

## Color Specifications

### Primary Color: SAM AI Blue

| Property | Value |
|----------|-------|
| Hex | #4A90FF |
| RGB | 74, 144, 255 |
| HSL | 216°, 100%, 65% |

### Full Palette

| Name | Purpose | Hex |
|------|---------|-----|
| Alpha | Primary actions, buttons, links | #4A90FF |
| Beta | Headers, secondary emphasis | #2D5AA0 |
| Gamma | Highlights, hover states | #6BB3FF |
| Delta | Text, neutral elements | #4A5568 |
| Epsilon | Dark backgrounds, footers | #1A365D |

---

## How It Works

1. **Install module** - Registers ir.asset records
2. **Asset compilation** - Odoo includes SCSS in bundles
3. **Variable override** - Our variables append after Odoo defaults
4. **CSS cascade** - Last defined values win

---

## Files

| Path | Purpose |
|------|---------|
| `__manifest__.py` | Module definition |
| `data/ir_asset.xml` | Asset bundle registration |
| `static/src/scss/primary_variables.scss` | Primary colors |
| `static/src/scss/secondary_variables.scss` | Secondary utilities |

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Documentor |
