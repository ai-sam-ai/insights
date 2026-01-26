# FAQ: ai_sam_e_learning

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI eLearning

### What is ai_sam_e_learning?

ai_sam_e_learning is an enhancement module for Odoo's native eLearning (website_slides) that adds UX customizations and branding options.

**Key facts:**
- Technical name: `ai_sam_e_learning`
- Current version: 18.0.1.1.0
- Requires: Odoo 18.0+, website_slides
- License: LGPL-3

### What does ai_sam_e_learning do?

ai_sam_e_learning provides 4 main enhancements:

1. **Fullscreen Control** - Disable auto-fullscreen when clicking lessons
2. **Custom Colors** - Override header background color
3. **Menu Categories** - Create filtered course views with custom URLs
4. **Full-Width Layout** - Option to use full browser width

### Is this a complete LMS?

No. ai_sam_e_learning enhances Odoo's existing website_slides module. For a standalone LMS with subscriptions and payments, see `bbb_elearning_subscription`.

---

## Installation & Setup

### How do I install ai_sam_e_learning?

1. Ensure website_slides is installed
2. Navigate to Apps menu
3. Search for "SAM AI eLearning"
4. Click Install

### How do I configure ai_sam_e_learning?

After installation:
1. Go to Website > Configuration > eLearning
2. Set your preferences:
   - Disable Fullscreen Mode
   - Header Background Color (e.g., #4A90FF)
   - Enable Menu Categories
   - Full Page Width
3. Save changes

---

## Usage

### How do I create a menu category?

To create a custom course category:
1. Enable Menu Categories in settings
2. Go to Website > eLearning > Menu Categories
3. Create new category:
   - Name: "SAM Docs"
   - Slug: "sam-docs" (becomes /learn/sam-docs)
   - Filter by tags or specific courses
4. Save - menu item is auto-created

### How do I change the header color?

1. Go to Website > Configuration > eLearning
2. Enter color in "Header Background Color" (e.g., #4A90FF)
3. Save
4. Clear browser cache and refresh

### How do I disable fullscreen mode?

1. Go to Website > Configuration > eLearning
2. Check "Disable Fullscreen Mode"
3. Save
4. May need to upgrade module or restart

---

## Troubleshooting

### Why isn't my color showing?

**Symptom:** Changed header color but still see purple

**Cause:** Browser cache or CSS specificity

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. If still not working, upgrade the module

### Why isn't my category URL working?

**Symptom:** /learn/my-category returns 404

**Cause:** Routes need module upgrade to register

**Solution:**
1. Go to Apps > ai_sam_e_learning
2. Click Upgrade
3. Try the URL again

---

## Comparisons

### How does ai_sam_e_learning compare to bbb_elearning_subscription?

| Feature | ai_sam_e_learning | bbb_elearning_subscription |
|---------|-------------------|---------------------------|
| Purpose | UX enhancements | Full subscription LMS |
| Base module | Extends website_slides | Extends website_slides |
| Payment integration | No | Yes - subscriptions |
| Standalone LMS | No | Yes |
| Custom branding | Yes (colors, layout) | Limited |

**Use ai_sam_e_learning** when you want to customize Odoo's existing eLearning.
**Use bbb_elearning_subscription** when you need subscription-based course access.

---

## Support

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-e-learning
- **Email:** sam@sme.ec

---

*Last updated: 2025-01-26 (Enhanced to 10/10 by CTO Module Docs Reviewer)*
*Part of SAM AI by SME.ec*
