# Schema: ai_sam_socializer

> **Technical Truth** - Views, UI components, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_socializer` |
| **Version** | 18.0.2.1.0 |
| **Architecture** | Platform Skin (UI-only) |
| **Total Models** | 0 (models live in ai_brain) |
| **Total Controllers** | 0 |
| **Total Views** | 6 (in 2 XML files) |
| **JS Components** | 2 |
| **CSS Files** | 1 |

---

## Platform Skin Architecture

**Important:** This module contains NO data models. It is a Platform Skin that provides UI components for models defined in `ai_brain`.

```
┌─────────────────────────────────────────────────────────────┐
│                    ai_brain (Data Layer)                    │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ odoo.blog.post  │  │ odoo.blog.story │  │odoo.blog.img│ │
│  │                 │  │                 │  │             │ │
│  │ - name          │  │ - sequence      │  │ - sequence  │ │
│  │ - content       │  │ - content_type  │  │ - image     │ │
│  │ - featured_img  │  │ - content       │  │ - caption   │ │
│  │ - category      │  │ - image         │  │             │ │
│  │ - tags          │  │                 │  │             │ │
│  │ - state         │  │                 │  │             │ │
│  │ - fb_page_cont  │  │                 │  │             │ │
│  │ - fb_group_cont │  │                 │  │             │ │
│  │ - youtube_desc  │  │                 │  │             │ │
│  │ - etc.          │  │                 │  │             │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘ │
│           │                    │                   │        │
│           │ story_items (O2M)  │                   │        │
│           ├────────────────────┘                   │        │
│           │ image_gallery (O2M)                    │        │
│           ├────────────────────────────────────────┘        │
└───────────┼─────────────────────────────────────────────────┘
            │
            ▼ UI Layer
┌─────────────────────────────────────────────────────────────┐
│               ai_sam_socializer (Platform Skin)             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Views (XML)                        │   │
│  │  - Blog Post Form (tabs: Content, Visualizer, FB,   │   │
│  │    Image Gallery, Post to Socials)                  │   │
│  │  - Blog Post List                                    │   │
│  │  - Story Board List (editable inline)               │   │
│  │  - Image Gallery List (editable inline)             │   │
│  │  - Menu Items                                        │   │
│  │  - Actions                                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Assets (JS/CSS)                   │   │
│  │  - image_loader.js (drag-drop future)               │   │
│  │  - story_board.js (reorder future)                  │   │
│  │  - blogger_styles.css                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Models Used (Defined in ai_brain)

### odoo.blog.post (Primary Model)

**Purpose:** Stores blog post content and social media variations

| Field | Type | Description |
|-------|------|-------------|
| `name` | Char | Blog post title |
| `content` | Html | Main post content (rich text) |
| `featured_image` | Binary | Featured/hero image |
| `featured_image_filename` | Char | Original filename |
| `category` | Char/Selection | Post category |
| `tags` | Char/Many2many | Post tags |
| `state` | Selection | Workflow state (draft/published/etc.) |
| `publish_date` | Datetime | Scheduled publish date |
| `story_items` | One2many | Related story board items |
| `image_gallery` | One2many | Related gallery images |
| `fb_page_content` | Html | Facebook Page variation |
| `fb_group_content` | Html | Facebook Group variation |
| `youtube_description` | Text | YouTube video description |
| `instagram_caption` | Text | Instagram caption |
| `linkedin_post` | Html | LinkedIn post content |
| `twitter_content` | Char | Twitter/X content (280 char limit) |
| `pushed_to_fb_page` | Boolean | FB Page publish status |
| `pushed_to_fb_group` | Boolean | FB Group publish status |
| `pushed_to_youtube` | Boolean | YouTube publish status |
| `pushed_to_instagram` | Boolean | Instagram publish status |
| `pushed_to_linkedin` | Boolean | LinkedIn publish status |
| `pushed_to_twitter` | Boolean | Twitter publish status |

**Methods (UI Buttons call these in ai_brain):**
| Method | Purpose |
|--------|---------|
| `action_push_to_fb_page()` | Push content to Facebook Page |
| `action_push_to_fb_group()` | Push content to Facebook Group |
| `action_push_to_youtube()` | Push content to YouTube |
| `action_push_to_instagram()` | Push content to Instagram |
| `action_push_to_linkedin()` | Push content to LinkedIn |
| `action_push_to_twitter()` | Push content to Twitter/X |

---

### odoo.blog.story (Story Board Items)

**Purpose:** Individual content blocks within a blog post for story organization

| Field | Type | Description |
|-------|------|-------------|
| `sequence` | Integer | Order in story board (handle widget) |
| `content_type` | Selection | Type of content block |
| `content` | Html | Content (text, quotes, etc.) |
| `image` | Binary | Image content |
| `post_id` | Many2one | Parent blog post reference |

---

### odoo.blog.image (Image Gallery)

**Purpose:** Additional images attached to a blog post

| Field | Type | Description |
|-------|------|-------------|
| `sequence` | Integer | Display order |
| `image` | Binary | Image data |
| `caption` | Char | Image caption |
| `post_id` | Many2one | Parent blog post reference |

---

## Views

### View Definitions

| View ID | Name | Model | Type |
|---------|------|-------|------|
| `view_blog_post_form` | odoo.blog.post.form | odoo.blog.post | Form |
| `view_blog_post_list` | odoo.blog.post.list | odoo.blog.post | List |
| `view_blog_story_tree` | odoo.blog.story.list | odoo.blog.story | List (editable) |
| `view_blog_image_tree` | odoo.blog.image.list | odoo.blog.image | List (editable) |

### Blog Post Form Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Push to FB Page] [FB Group] [YouTube] [Instagram]         │
│ [LinkedIn] [Twitter/X]                                      │
│ ═══════════════════════════ State Statusbar ═══════════════ │
├─────────────────────────────────────────────────────────────┤
│ SHEET                                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Title: _________________________________                │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌──────────────────┐ ┌──────────────────┐                   │
│ │ Category: ______ │ │ Publish Date: __ │                   │
│ │ Tags: __________ │ │                  │                   │
│ └──────────────────┘ └──────────────────┘                   │
│                                                             │
│ ╔═══════════════════════════════════════════════════════╗   │
│ ║ [Content] [Visualizer] [FB Variation] [Gallery] [Post]║   │
│ ╠═══════════════════════════════════════════════════════╣   │
│ ║                                                       ║   │
│ ║  Tab content varies by selection                      ║   │
│ ║                                                       ║   │
│ ╚═══════════════════════════════════════════════════════╝   │
└─────────────────────────────────────────────────────────────┘
```

### Tab Pages

| Tab | Purpose | Components |
|-----|---------|------------|
| **Content** | Main editing | Image loader, Story board, HTML editor |
| **Odoo Blog Post Visualizer** | Preview | Read-only styled preview |
| **FB Variation** | Platform variations | 6 variation panels + 2 placeholders |
| **Image Gallery** | Additional images | Editable inline list with thumbnails |
| **Post To Socials** | Status tracking | Boolean checkboxes, future API notes |

---

## Menu Structure

```
SAM AI (ai_sam.menu_sam_ai_root)
    └── Odoo Blogger (menu_ai_blogger) [sequence: 30]
            └── Blog Posts (menu_blog_posts) [sequence: 10]
                    └── action: action_blog_post
```

---

## Actions

| Action ID | Name | Model | View Mode |
|-----------|------|-------|-----------|
| `action_blog_post` | Blog Posts | odoo.blog.post | list,form |

---

## JavaScript Components

### image_loader.js

**Purpose:** Enhanced image upload handling

**Current State:** Phase 1 - Console log placeholder

**Planned Features (Phase 2):**
- Drag and drop image upload
- Image cropping and resizing
- Image optimization
- Multiple image selection
- Image gallery management

### story_board.js

**Purpose:** Story board content organization

**Current State:** Phase 1 - Console log placeholder

**Planned Features (Phase 2):**
- Drag and drop story item reordering
- Rich content blocks (text, image, video, quote, embed)
- Story flow visualization
- Content preview in story board
- Export story board to different formats

---

## CSS Styles

### blogger_styles.css

| Class | Purpose |
|-------|---------|
| `.blogger_image_loader` | Dashed border upload area |
| `.blogger_story_board` | Flexbox container for story items |
| `.blogger_story_item` | Individual story item card |
| `.blogger_visualizer` | Orange-bordered preview container |
| `.blogger_fb_variation` | Red-bordered variation panel |
| `.blogger_social_buttons` | Social media button container |
| `.blogger_social_button` | Base social button style |
| `.blogger_social_button.facebook` | FB blue (#4267B2) |
| `.blogger_social_button.youtube` | YouTube red (#FF0000) |
| `.blogger_social_button.instagram` | Instagram gradient |
| `.blogger_social_button.linkedin` | LinkedIn blue (#0077B5) |
| `.blogger_social_button.twitter` | Twitter blue (#1DA1F2) |

---

## Assets Registration

```python
# From __manifest__.py
'assets': {
    'web.assets_backend': [
        'ai_sam_socializer/static/src/css/blogger_styles.css',
        'ai_sam_socializer/static/src/js/image_loader.js',
        'ai_sam_socializer/static/src/js/story_board.js',
    ],
},
```

---

## Security Rules

**None in this module.** All security rules for `odoo.blog.post`, `odoo.blog.story`, and `odoo.blog.image` are defined in `ai_brain` module.

This is intentional Platform Skin architecture - data protection stays with the data.

---

## Social Media Platforms Supported

| Platform | Content Field | Status Field | Button | Status |
|----------|---------------|--------------|--------|--------|
| Facebook Page | `fb_page_content` | `pushed_to_fb_page` | `action_push_to_fb_page` | UI Ready |
| Facebook Group | `fb_group_content` | `pushed_to_fb_group` | `action_push_to_fb_group` | UI Ready |
| YouTube | `youtube_description` | `pushed_to_youtube` | `action_push_to_youtube` | UI Ready |
| Instagram | `instagram_caption` | `pushed_to_instagram` | `action_push_to_instagram` | UI Ready |
| LinkedIn | `linkedin_post` | `pushed_to_linkedin` | `action_push_to_linkedin` | UI Ready |
| Twitter/X | `twitter_content` | `pushed_to_twitter` | `action_push_to_twitter` | UI Ready |
| TikTok | - | - | - | Phase 2 |
| Pinterest | - | - | - | Phase 2 |

---

## File Structure

```
ai_sam_socializer/
├── __init__.py              # Empty (no models)
├── __manifest__.py          # Module definition
├── static/
│   ├── description/
│   │   └── icon.png         # Module icon
│   └── src/
│       ├── css/
│       │   └── blogger_styles.css
│       └── js/
│           ├── image_loader.js
│           └── story_board.js
└── views/
    ├── blog_post_views.xml  # All view definitions
    └── blogger_menu.xml     # Menu items
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | CTO Module Docs Agent |
