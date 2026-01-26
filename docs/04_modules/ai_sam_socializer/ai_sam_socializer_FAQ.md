# FAQ: ai_sam_socializer

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Socializer

### What is ai_sam_socializer?

ai_sam_socializer is a Marketing/Social Media module for Odoo 18 that provides a unified content creation and social media publishing interface. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_socializer`
- Current version: 18.0.2.1.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3
- Architecture: Platform Skin (UI-only)

### What does ai_sam_socializer do?

ai_sam_socializer provides these capabilities:

1. **Blog Post Editor** - Rich content creation with featured images and HTML editing
2. **Story Board** - Visual content organization with sequenced story items
3. **Blog Visualizer** - Preview how posts will appear in Odoo blog
4. **Platform Variations** - Customize content for Facebook, YouTube, Instagram, LinkedIn, Twitter
5. **Publishing Tracker** - Track which platforms have been updated
6. **Image Gallery** - Manage multiple images per post

### Who is ai_sam_socializer for?

ai_sam_socializer is designed for:
- Content marketers who publish across multiple platforms
- Business owners managing their own social media presence
- Marketing teams using Odoo as their business platform
- Anyone who wants to streamline multi-platform content publishing

### What is a Platform Skin module?

A Platform Skin is a UI-only module in the SAM AI V3 architecture. It provides views, menus, and user interface components but contains NO data models. The models (odoo.blog.post, odoo.blog.story, odoo.blog.image) and their security rules live in the ai_brain module.

---

## Installation & Setup

### How do I install ai_sam_socializer?

1. Ensure Odoo 18.0+ is running
2. Ensure ai_brain and ai_sam modules are installed first
3. Navigate to Apps menu
4. Search for "ai_sam_socializer" or "SAM AI Socializer"
5. Click Install

No additional configuration is required after installation.

### What are the dependencies for ai_sam_socializer?

ai_sam_socializer requires these Odoo modules:
- `base` - Core Odoo framework
- `web` - Web client
- `website_blog` - Odoo's blog module
- `ai_brain` - SAM AI data layer (contains blog models)
- `ai_sam` - SAM AI core framework

Python libraries required:
- None additional (uses base Odoo)

### Why doesn't this module have a security file?

This is intentional. As a Platform Skin module, ai_sam_socializer contains no data models. All security rules for blog-related models are defined in ai_brain module, keeping data protection with the data.

### How do I access ai_sam_socializer?

After installation:
1. Go to SAM AI menu in the main Odoo menu bar
2. Click "Odoo Blogger"
3. Click "Blog Posts"

---

## Usage

### How do I create a blog post?

To create a blog post:
1. Navigate to SAM AI > Odoo Blogger > Blog Posts
2. Click "Create"
3. Enter a title
4. Select category and tags
5. Set publish date
6. Add content in the Content tab

### How do I use the Story Board?

The Story Board helps organize content flow:
1. In the Content tab, find the "Story Board" section
2. Click "Add a line" to add story items
3. Use the handle (drag icon) to reorder items
4. Set content type and add content/images for each item

### How do I preview my blog post?

To see how your post will look:
1. Open a blog post
2. Click the "Odoo Blog Post Visualizer" tab
3. View the styled preview with title, image, and content

### How do I customize content for different platforms?

To create platform variations:
1. Open a blog post
2. Click the "FB Variation" tab
3. You'll see panels for:
   - Facebook Page Content
   - Facebook Group Content
   - YouTube Description
   - Instagram Caption
   - LinkedIn Post
   - Twitter/X Post (280 char limit)
4. Customize each as needed

### How do I push content to social media?

Currently, the publishing buttons track your publishing status:
1. Click buttons in the header: "Push to FB Page", "Push to FB Group", etc.
2. The corresponding status field gets marked
3. Copy your customized content from the FB Variation tab
4. Post manually to the platform

**Note:** Automatic API posting is planned for Phase 2.

### Can I add multiple images to a post?

Yes. Use the Image Gallery:
1. Open a blog post
2. Click the "Image Gallery" tab
3. Click "Add a line"
4. Upload image, add caption, set sequence
5. Images can be reordered using the handle

---

## Troubleshooting

### Why are my blog post views not loading?

**Symptom:** Error when opening Blog Posts or blank form view

**Cause:** ai_brain module not installed or has errors

**Solution:**
1. Verify ai_brain is installed: Apps > ai_brain
2. If not installed, install it first
3. Upgrade ai_sam_socializer: Apps > ai_sam_socializer > Upgrade
4. Clear browser cache and refresh

### Why can't I see the Odoo Blogger menu?

**Symptom:** No "Odoo Blogger" menu under SAM AI

**Cause:** ai_sam not installed or menu not visible to your user group

**Solution:**
1. Verify ai_sam is installed
2. Check you have appropriate user permissions
3. Upgrade the module if recently installed

### Why are push buttons not working?

**Symptom:** Clicking "Push to FB Page" etc. does nothing or shows error

**Cause:** The action methods are defined in ai_brain, may not be fully implemented

**Solution:**
1. Check ai_brain is at latest version
2. Note: Full API integration is Phase 2
3. For now, use buttons to track status, post content manually

### Module is not working after upgrade. What do I do?

After upgrading Odoo or ai_sam_socializer:
1. Clear browser cache
2. Restart Odoo server
3. Upgrade module: Apps > ai_sam_socializer > Upgrade
4. Also upgrade ai_brain if needed
5. If issues persist, check logs for errors

---

## Comparisons

### How does ai_sam_socializer compare to other social media tools?

| Feature | ai_sam_socializer | Hootsuite | Buffer |
|---------|-------------------|-----------|--------|
| Native Odoo Integration | Yes | No | No |
| Blog Post Creation | Yes | Limited | No |
| Story Board | Yes | No | No |
| Platform Variations | Yes | Yes | Yes |
| Automatic Posting | Phase 2 | Yes | Yes |
| Cost | Included | Subscription | Subscription |
| Data Stays in Your Odoo | Yes | No | No |

### Why choose ai_sam_socializer over standalone social tools?

ai_sam_socializer advantages:
- All your content stays in your Odoo database
- No additional subscription costs
- Integrates with other SAM AI modules
- Customizable within your Odoo ecosystem
- Part of broader business intelligence system

---

## Integration

### Does ai_sam_socializer work with ai_brain?

Yes. ai_sam_socializer is the UI layer for blog models defined in ai_brain:
- `odoo.blog.post` - Blog posts (in ai_brain)
- `odoo.blog.story` - Story items (in ai_brain)
- `odoo.blog.image` - Image gallery (in ai_brain)

This is the Platform Skin architecture - data in ai_brain, UI in ai_sam_socializer.

### Does ai_sam_socializer work with website_blog?

Yes. The module depends on website_blog and integrates with Odoo's native blog functionality. The Visualizer shows how posts will appear in the blog.

### Can I use ai_sam_socializer with external services?

Current integrations (Phase 1 - UI only):
- Facebook Pages (content panel, status tracking)
- Facebook Groups (content panel, status tracking)
- YouTube (description panel, status tracking)
- Instagram (caption panel, status tracking)
- LinkedIn (post panel, status tracking)
- Twitter/X (280-char panel, status tracking)

API integrations for automatic posting: Phase 2

---

## Data & Privacy

### Where is my content stored?

All content is stored in your Odoo PostgreSQL database via ai_brain module. ai_sam_socializer does not send data to external servers unless you explicitly post to social platforms.

### Can I export my blog posts?

Yes. You can export data via:
- Odoo's built-in export (list views > Export)
- Direct database access to odoo_blog_post table
- API if configured

### How do I delete blog post data?

To remove blog post data:
1. Delete individual posts via the list view
2. Uninstalling ai_sam_socializer removes only views (not data)
3. To remove data completely, uninstall ai_brain (this removes models and data)

---

## Pricing & Licensing

### Is ai_sam_socializer free?

ai_sam_socializer is licensed under LGPL-3. This means:
- Free to use in your Odoo installation
- Free to modify for your needs
- Modifications must be shared under same license
- Part of the SAM AI ecosystem

### Do I need a SAM AI subscription?

ai_sam_socializer is included with the SAM AI ecosystem. No additional subscription is required for the base functionality.

---

## Support

### Where can I get help with ai_sam_socializer?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-socializer
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance

### How do I report a bug?

1. Check if the issue is documented in Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.2.1.0)
   - Odoo version
   - Steps to reproduce
   - Error messages (if any)
   - Screenshots if helpful

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Legacy view references use `ai_odoo_blogger` | Open | Update context refs if errors occur |
| JS components are placeholders | By design | Full drag-drop in Phase 2 |
| API posting not implemented | Phase 2 | Copy content, post manually |
| TikTok/Pinterest panels are placeholders | Phase 2 | Not functional yet |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.2.1.0 | 2024-11 | V3 Platform Skin architecture, multi-platform support |
| 18.0.1.0.0 | 2024 | Initial release as ai_odoo_blogger |

---

## Roadmap (Phase 2)

Planned features for Phase 2:
- **Drag-and-drop image upload** - Enhanced image_loader.js
- **Story board reordering** - Enhanced story_board.js
- **Facebook API integration** - Automatic posting to FB Pages/Groups
- **YouTube API integration** - Video description updates
- **Instagram API integration** - Caption posting (via FB Business)
- **LinkedIn API integration** - Post publishing
- **Twitter/X API integration** - Tweet publishing
- **TikTok support** - New platform
- **Pinterest support** - New platform
- **Scheduling** - Scheduled publishing across platforms

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
