# Module: ai_sam_creatives

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_creatives` |
| **Version** | 18.0.1.0.1 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_creatives` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_creatives\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_creatives\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-creatives |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

ai_sam_creatives is a **Platform Skin** module that provides a multimedia content creation experience built on top of the SAM Canvas Core framework. It registers the "Creatives" platform with custom node renderers for rich media content (images, video, audio), an AI chat panel for content generation, and specialized toolbar/sidebar extensions. This module contains **UI components only** - all data models live in ai_brain.

---

## Dependencies

### Odoo Module Dependencies
- `ai_brain` - Data layer (canvas models, business data)
- `ai_sam` - Canvas core framework (universal canvas rendering)

### Python Libraries Required
- None additional (uses base Odoo + parent modules)

---

## For End Users (What Can This Do For Me?)

- **Create multimedia content** - Build rich media projects with images, video, audio on a visual canvas
- **AI-powered content generation** - Chat with SAM to generate and refine creative content
- **Project management** - Kanban landing page for organizing creative projects
- **Interactive canvas** - Drag-and-drop multimedia nodes with visual connections

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Platform Skin - no data models (uses ai_brain) |
| Controllers | 1 | creatives_controller.py (4 JSON-RPC endpoints) |
| Views | 2 | Canvas UI, Landing Kanban |
| JS Files | 5 | Node renderer, sidebar, toolbar, multimedia, AI chat panel |
| CSS Files | 1 | creatives_canvas_styles.css |
| Security Rules | 1 | For creatives.landing.card (model in ai_brain) |

**Key Files:**
- `controllers/creatives_controller.py` - AI chat panel endpoints
- `static/src/js/creatives_node_renderer.js` - Custom node rendering
- `static/src/js/creatives_ai_chat_panel.js` - Chat with SAM integration
- `static/src/js/creatives_multimedia.js` - Rich media handling
- `data/creatives_platform.xml` - Platform registration

---

## Architecture: Platform Skin Pattern

```
ai_brain (data layer)
    └── canvas models, creatives_landing_card
        │
        ▼
ai_sam (framework layer)
    └── canvas.platform registry, universal renderer
        │
        ▼
ai_sam_creatives (skin layer) ← YOU ARE HERE
    └── CreativesNodeRenderer, UI components only
```

**Key Principle:** Uninstalling this module does NOT delete any data. Reinstalling restores UI access.

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: creatives, creative canvas, multimedia content, content creation platform
- User wants to: create visual content, use creative tools, build multimedia projects
- User mentions: CreativesNodeRenderer, creatives platform, ai_sam_creatives

### Related Agents
- `/cto-developer` - For implementation or customization work
- `/sam_chat` - For AI chat panel integration

### Delegate To
- `/cto` - For architecture decisions about this module
- `/cto-developer` - For implementation work
- `/mod_sam` - For ai_sam core questions

---

## Cross-References

### Related Documentation
- Parent Module: `docs/04_modules/ai_sam/` (canvas framework)
- Data Layer: `docs/04_modules/ai_brain/` (data models)

### Related Modules
- `ai_brain` - Provides creatives.landing.card model and canvas data
- `ai_sam` - Provides canvas.platform registry and core renderer
- `ai_sam_socializer` - Sibling platform skin for social media content

---

## Known Gotchas (Painfully Learned)

1. **No models in this module** - All data is in ai_brain. Don't add models here.
2. **Platform registration required** - The creatives_platform.xml must load to register "creatives" in canvas.platform
3. **JS load order matters** - Node renderer must load before being used
4. **Security rules reference ai_brain** - Note the `ai_brain.model_creatives_landing_card` reference

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.0.1)
- [x] Dependencies list is current
- [x] Model count matches reality (0 models - Platform Skin)
- [x] Controller count matches reality (1 controller, 4 endpoints)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation - four-file standard | CTO Module Docs Agent |
