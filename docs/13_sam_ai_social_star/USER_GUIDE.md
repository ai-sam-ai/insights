# SAM AI Social Star - User Guide

## Overview

SAM AI Social Star is an AI-powered content creation pipeline that transforms your ideas into professional talking-head videos and publishes them across multiple social media platforms.

---

## Getting Started

### 1. Create a Campaign

1. Navigate to **Social Star > Campaigns**
2. Click **Create**
3. Fill in the required fields:
   - **Campaign Name**: Descriptive name for your content
   - **Avatar**: Select your AI presenter
   - **Voice**: Choose the voice profile
   - **Platforms**: Select target platforms (TikTok, YouTube, LinkedIn, etc.)

### 2. Add Your Content

Choose your source content type:

| Source Type | Description | Best For |
|-------------|-------------|----------|
| **Topic** | Simple topic or idea | Quick content |
| **Text** | Detailed text content | Blog posts, articles |
| **Transcript** | Existing script | Repurposing content |
| **Script** | Ready-to-record script | Pre-written content |
| **Document** | Upload PDF/DOC | Long-form content |
| **URL** | Web page URL | Summarizing articles |

### 3. Configure Style Settings

- **Tone**: Professional, Casual, Energetic, etc.
- **Include Hook**: Add attention-grabbing opener
- **Include CTA**: Add call-to-action ending
- **Captions**: Enable/disable auto-captions
- **Caption Style**: Default, Bold, TikTok, etc.

### 4. Generate Content

**Option A: One-Click Generation**
- Click **Generate All** to run the full pipeline
- Wait for completion (typically 3-10 minutes)

**Option B: Step-by-Step**
1. Click **1. Script** - Generate platform-optimized scripts
2. Click **2. Audio** - Generate voiceover with TTS
3. Click **3. Video** - Create avatar video
4. Click **4. Publish** - Post to platforms

### 5. Review & Publish

1. Preview generated content in the **Generated Content** tab
2. Download videos for review
3. Edit titles, descriptions, hashtags if needed
4. Click **Publish** or schedule for later

---

## Avatars

### Creating an Avatar

1. Go to **Social Star > Avatars**
2. Click **Create**
3. Upload a high-quality portrait photo:
   - **Recommended**: 512x512 or higher
   - **Format**: PNG or JPG
   - **Lighting**: Even, front-facing
   - **Expression**: Neutral, slight smile

### Avatar Settings

| Setting | Description | Recommendation |
|---------|-------------|----------------|
| **Animation Engine** | SadTalker, MuseTalk, LivePortrait | SadTalker for best quality |
| **Quality Level** | Basic, Good, Premium | Good for most uses |
| **Face Enhancement** | GFPGAN, CodeFormer | GFPGAN recommended |
| **Expressiveness** | 0.5 - 1.5 | 1.0 for natural look |
| **Pose Style** | 0-45 | 0 for minimal head movement |

### Background Options

- **Keep Original**: Use photo background
- **Solid Color**: Replace with color
- **Custom Image**: Replace with image
- **Transparent**: Green screen output

---

## Voice Profiles

### Creating a Voice Profile

1. Go to **Social Star > Voices**
2. Click **Create**
3. Configure voice settings

### TTS Engine Options

| Engine | Quality | Cost | Features |
|--------|---------|------|----------|
| **Bark** | Good | Free | Emotion tags, multiple voices |
| **Coqui TTS** | Good | Free | Voice cloning |
| **ElevenLabs** | Excellent | Paid | Premium quality, cloning |

### Voice Presets

Quick-apply settings for common use cases:

- **Warm Professional**: Business presentations
- **Energetic**: TikTok, shorts
- **Calm Narrator**: Documentaries, explainers
- **News Anchor**: Formal announcements
- **Friendly Casual**: Social media, vlogs

### Voice Adjustments

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Pitch** | -12 to +12 | Semitones up/down |
| **Speed** | 0.5 to 2.0 | Playback speed |
| **Warmth** | -10 to +10 | Low frequency boost |
| **Clarity** | -10 to +10 | High frequency boost |
| **Reverb** | 0 to 1 | Room ambience |
| **Compression** | 0 to 1 | Dynamic range |

---

## Platform-Specific Content

### Format Specifications

| Platform | Aspect Ratio | Resolution | Max Duration |
|----------|--------------|------------|--------------|
| TikTok | 9:16 | 1080x1920 | 60s |
| Instagram Reels | 9:16 | 1080x1920 | 90s |
| YouTube Shorts | 9:16 | 1080x1920 | 60s |
| YouTube | 16:9 | 1920x1080 | No limit |
| LinkedIn | 1:1 or 16:9 | 1080x1080 | 10min |
| Twitter/X | 16:9 | 1280x720 | 140s |
| Facebook | 16:9 | 1920x1080 | No limit |

### Platform Best Practices

**TikTok**
- Start with a hook in first 3 seconds
- Use trending hashtags
- Keep videos 15-30 seconds
- Add captions (TikTok style)

**LinkedIn**
- Professional tone
- Value-driven content
- 60-90 seconds optimal
- Include CTA

**YouTube**
- Strong thumbnail
- SEO-optimized title/description
- Call to subscribe
- End screens

---

## Scheduling

### Schedule Types

- **Draft**: Generate but don't publish
- **Immediate**: Publish right away
- **Scheduled**: Publish at specific time

### Scheduling Tips

1. Set timezone in user preferences
2. Schedule for peak engagement times
3. Allow 30 minutes buffer for processing
4. Check platform-specific limits

---

## Troubleshooting

### Common Issues

**Script generation fails**
- Check Claude API key configuration
- Verify internet connection
- Reduce content length

**Audio sounds robotic**
- Try different TTS engine
- Adjust voice settings
- Use ElevenLabs for best quality

**Video generation slow**
- Lower quality setting
- Check GPU availability
- Reduce video duration

**Publishing fails**
- Verify platform credentials
- Check rate limits
- Ensure video meets platform specs

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "API key not configured" | Missing credentials | Add in Settings |
| "Rate limit exceeded" | Too many requests | Wait and retry |
| "File too large" | Video exceeds limit | Reduce quality/duration |
| "Authentication failed" | Invalid/expired token | Re-authenticate |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save campaign |
| `Ctrl+G` | Generate all |
| `Ctrl+P` | Preview |
| `Esc` | Cancel operation |

---

## Tips for Best Results

1. **Quality Input = Quality Output**: Provide clear, well-structured source content
2. **Test First**: Use Draft mode to preview before publishing
3. **Platform-Specific**: Let the AI optimize for each platform
4. **Consistent Branding**: Use the same avatar/voice across content
5. **Monitor Analytics**: Track which content performs best

---

## Support

- **Documentation**: Full docs in Settings > Help
- **Issues**: Report bugs via GitHub
- **Email**: support@sme.ec

---

*SAM AI Social Star v18.0.1.0.0*
