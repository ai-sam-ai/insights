# Module: ai_sam_socializer

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_socializer` |
| **Version** | 18.0.2.1.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_socializer` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_socializer\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_socializer\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-socializer |
| **Status** | Active |
| **Architecture** | Platform Skin (UI-only, no data models) |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

ai_sam_socializer is a Platform Skin module that provides content creation and social media publishing interfaces for SAM AI. It enables users to create blog posts, organize content with story boards, preview posts in an Odoo blog visualizer, and push content to multiple social media platforms (Facebook Pages, Facebook Groups, YouTube, Instagram, LinkedIn, Twitter/X). As a Platform Skin, it contains NO data models - all blog post models and security live in ai_brain.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo framework
- `web` - Web client framework
- `website_blog` - Odoo Blog module for integration
- `ai_brain` - V3 The Brain (data models - where blog post models live)
- `ai_sam` - V3 SAM AI Core (framework, parent menu)

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Create blog posts with rich content editor directly in Odoo
- Upload and manage images with the image loader component
- Organize your content flow using the story board feature
- Preview exactly how your blog post will look before publishing
- Customize content variations for each social media platform (Facebook, YouTube, Instagram, LinkedIn, Twitter)
- Track publishing status across all your social channels

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Platform Skin - uses models from ai_brain |
| Controllers | 0 | UI-only module |
| Views | 2 | blog_post_views.xml, blogger_menu.xml |
| JS Files | 2 | image_loader.js, story_board.js |
| CSS Files | 1 | blogger_styles.css |
| Security Rules | 0 | Security defined in ai_brain |

**Key Files:**
- `views/blog_post_views.xml` - Blog post form, list views, story board, visualizer, FB variations
- `views/blogger_menu.xml` - Menu items under SAM AI root menu
- `static/src/js/image_loader.js` - Image upload and preview handling (Phase 2 placeholder)
- `static/src/js/story_board.js` - Story board organization (Phase 2 placeholder)
- `static/src/css/blogger_styles.css` - Custom styling for blogger UI components

**Models Used (from ai_brain):**
- `odoo.blog.post` - Main blog post model
- `odoo.blog.story` - Story board items
- `odoo.blog.image` - Image gallery items

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: blog posts, blogging, social media, content publishing, Facebook, YouTube, Instagram, LinkedIn, Twitter
- User wants to: create blog content, publish to social media, manage social posts, set up content variations
- User mentions: socializer, blogger, story board, image loader, FB variations, content distribution

### Related Agents
- `/mod_sam` - Core SAM AI module interactions
- `/sam` - SAM AI assistant for content creation help
- `/cto-developer` - For implementation and bug fixes

### Delegate To
- `/cto` - For architecture decisions about content/social media features
- `/cto-developer` - For implementation work in views/JS/CSS
- `/mod_sam` - For ai_brain data model questions (where blog models live)

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/v3_platform_skin/`
- Parent Module: `docs/04_modules/ai_sam/`
- Data Layer: `docs/04_modules/ai_brain/`

### Related Modules
- `ai_brain` - Provides data models (odoo.blog.post, odoo.blog.story, odoo.blog.image) - this module is the UI skin
- `ai_sam` - Provides parent menu and core framework
- `website_blog` - Odoo's native blog integration
- `ai_sam_creatives` - Related content creation module

---

## V3 Architecture Context

**Platform Skin Pattern:**
```
ai_brain (data layer)
    └── odoo.blog.post (model)
    └── odoo.blog.story (model)
    └── odoo.blog.image (model)
    └── Security rules (ir.model.access.csv)
         │
         ▼
ai_sam (framework layer)
    └── Parent menu structure
    └── Core components
         │
         ▼
ai_sam_socializer (Platform Skin)
    └── Views only (no models)
    └── JS components (UI enhancement)
    └── CSS styles
    └── Menu items (child of ai_sam)
```

---

## Known Gotchas (Painfully Learned)

1. **No Security File Here** - Do NOT create ir.model.access.csv in this module. Security rules for blog models are in ai_brain. This is intentional Platform Skin architecture.

2. **Model References** - Views reference `odoo.blog.post`, `odoo.blog.story`, `odoo.blog.image` which live in ai_brain. If views break, check ai_brain is installed.

3. **Legacy References** - Some view references use `ai_odoo_blogger` (old module name) for tree view context. May need updating if issues arise.

4. **Phase 2 Placeholders** - image_loader.js and story_board.js are currently placeholders with console.log only. Full drag-and-drop functionality planned for Phase 2.

5. **Social API Integration** - Push buttons (FB, YouTube, etc.) are UI-ready but API integration is Phase 2. Buttons currently call methods that need implementation in ai_brain.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.2.1.0)
- [x] Dependencies list is current
- [x] Model count matches reality (0 - Platform Skin)
- [x] View count matches reality (2 XML files)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2026-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
