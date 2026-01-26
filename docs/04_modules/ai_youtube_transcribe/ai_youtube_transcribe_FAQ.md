# FAQ: ai_youtube_transcribe

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About AI YouTube Transcribe

### What is ai_youtube_transcribe?

ai_youtube_transcribe is a Tools module for Odoo 18 that transcribes YouTube videos using dual-path technology: free YouTube captions or paid OpenAI Whisper API. It optionally includes Claude Vision AI for visual analysis of video frames.

**Key facts:**
- Technical name: `ai_youtube_transcribe`
- Current version: 18.0.4.0.0
- Requires: Odoo 18.0+, Python 3.10+
- License: LGPL-3

### What does ai_youtube_transcribe do?

ai_youtube_transcribe provides 5 main capabilities:

1. **Audio Transcription** - Converts spoken words in YouTube videos to text
2. **Dual-Path Cost Optimization** - Uses free captions when available, paid API when needed
3. **Visual Analysis** - Claude AI describes what's shown on screen at key timestamps
4. **Context Merging** - Combines audio and visual into unified searchable document
5. **SAM Integration** - Chat with SAM AI about transcript content

### Who is ai_youtube_transcribe for?

ai_youtube_transcribe is designed for:
- Content creators who need to repurpose video content
- Developers learning from coding tutorials
- Teams sharing knowledge from training videos
- Researchers citing video content
- Anyone who prefers reading over watching

---

## Installation & Setup

### How do I install ai_youtube_transcribe?

1. Ensure Odoo 18.0+ is running
2. Install dependencies: `ai_brain`, `ai_sam`
3. Navigate to Apps menu
4. Search for "ai_youtube_transcribe"
5. Click Install
6. Configure API keys in Settings

### What are the dependencies for ai_youtube_transcribe?

**Odoo Modules:**
- `base` - Core Odoo
- `web` - Web interface
- `ai_brain` - Provides base youtube.transcript model
- `ai_sam` - Enables SAM AI conversation integration

**Python Libraries:**
- `yt-dlp` - YouTube video/audio download
- `openai>=1.0` - Whisper API (paid transcription)
- `youtube-transcript-api` - Free captions (optional)
- `anthropic` - Claude Vision (optional, for visual analysis)
- `Pillow` - Image processing (optional)
- `opencv-python` - Fallback frame extraction (optional)

**External:**
- `ffmpeg` - Recommended for frame extraction

### How do I configure ai_youtube_transcribe?

After installation:

1. **Configure API Keys (Option A - Recommended):**
   - Go to Settings > API Service Providers
   - Add OpenAI provider with `voice_to_text` service type
   - Add Anthropic provider with `vision_analysis` service type (if using visual analysis)

2. **Configure API Keys (Option B - Legacy):**
   - Go to Settings > Technical > Parameters > System Parameters
   - Add key: `ai_youtube_transcribe.openai_api_key`
   - Add key: `ai_youtube_transcribe.anthropic_api_key` (for visual analysis)

3. **Access transcription:**
   - Navigate to SAM AI > YouTube Transcribe

---

## Usage

### How do I transcribe a YouTube video?

1. Go to SAM AI > YouTube Transcribe
2. Click "New"
3. Enter a name for your transcript
4. Paste the YouTube URL
5. Click "Analyze Video" to check caption availability
6. Click "Process Transcript" to start transcription

### How do I enable visual analysis?

Before processing:
1. Check "Enable Visual Analysis" checkbox
2. Select frame strategy:
   - Thumbnail Only (1 frame, free)
   - Key Frames (10-30 frames, recommended)
   - Detailed (50+ frames)
   - Custom (specify frame count)
3. Click "Analyze Video" to see cost estimate
4. Approve cost and process

After audio transcription:
1. Go to "Visual Analysis" tab
2. Click "Analyze Video Frames"
3. Wait for Claude to process frames
4. View visual timeline

### How do I use the free transcription path?

The module automatically detects if free YouTube captions are available:

1. Paste URL and click "Analyze Video"
2. If green banner shows "Free Captions Available!", you're set
3. Select "YouTube Captions (Free)" in transcription method
4. Click "Process Transcript"

Free transcription works when:
- Video has auto-generated captions
- Video has manual subtitles
- Captions aren't disabled by uploader

### How do I chat with SAM about a transcript?

1. Complete transcription (status = Done)
2. Click "Chat with SAM" button
3. A new conversation opens with transcript context loaded
4. Ask questions like "What did they say about authentication?"

### Can I copy the transcript to clipboard?

Yes:
1. Go to "Transcript" tab (after processing)
2. Click "Copy to Clipboard" button
3. Paste anywhere - HTML tags are stripped for plain text

---

## Troubleshooting

### Why is my transcription failing with "yt-dlp not found"?

**Symptom:** Error message about yt-dlp library not installed

**Cause:** The yt-dlp Python package isn't available in Odoo's Python environment

**Solution:**
1. Access your Odoo server's terminal
2. Run: `pip install yt-dlp`
3. Restart Odoo server
4. Try transcription again

### Why is visual analysis failing with "ffmpeg not found"?

**Symptom:** Frame extraction fails, falls back to opencv or errors out

**Cause:** ffmpeg isn't installed on the system

**Solution:**
- Windows: `choco install ffmpeg` or download from ffmpeg.org
- macOS: `brew install ffmpeg`
- Linux: `apt-get install ffmpeg` or `yum install ffmpeg`

Alternatively, install opencv as fallback: `pip install opencv-python`

### Why does pre-flight check show "Video Unavailable"?

**Symptom:** Pre-flight status shows "Video Unavailable"

**Cause:** The video is private, age-restricted, region-blocked, or deleted

**Solution:**
1. Verify the URL opens in a browser
2. Try a different video
3. Private videos cannot be transcribed
4. Age-restricted videos require sign-in (not supported)

### Why is my Whisper transcription timing out?

**Symptom:** Processing hangs or times out during Whisper API call

**Cause:** Very long video or slow network connection

**Solution:**
1. Whisper has a 25MB file size limit
2. For videos over 2 hours, consider:
   - Using free captions if available
   - Splitting the video manually
3. Check your network connection
4. Check Odoo logs for detailed error

### My transcription costs more than expected. Why?

**Symptom:** Cost is higher than initially shown

**Cause:** Visual analysis was enabled, adding per-frame costs

**Solution:**
1. Pre-flight check shows audio cost only
2. Visual analysis cost is shown separately
3. Review "Forecast Vision Cost" before enabling visual analysis
4. Use "thumbnail_only" strategy for minimal cost

---

## Comparisons

### How does ai_youtube_transcribe compare to online transcription services?

| Feature | ai_youtube_transcribe | Online Services |
|---------|----------------------|-----------------|
| Free option | Yes (YouTube captions) | Usually no |
| Cost transparency | Full pre-flight check | Often hidden |
| Visual analysis | Yes (Claude Vision) | Rare |
| Odoo integration | Native | Requires export/import |
| Data privacy | Your database only | Third-party servers |
| SAM AI chat | Yes | No |

### Why use Whisper when YouTube has free captions?

| Aspect | YouTube Captions | OpenAI Whisper |
|--------|-----------------|----------------|
| Cost | Free | $0.006/minute |
| Accuracy | Variable (auto-generated can be poor) | Excellent (10/10) |
| Availability | Only if uploader enabled | Always works |
| Languages | Depends on uploader | 50+ auto-detected |
| Timing | Sometimes off | Precise |

**Recommendation:** Use free captions for casual use, Whisper for important content.

---

## Integration

### Does ai_youtube_transcribe work with ai_sam?

Yes! Full integration:
- Transcripts can spawn SAM AI conversations
- SAM can answer questions about video content
- Conversation context includes full transcript

### Does ai_youtube_transcribe work with Budget Buster?

Yes! Budget Buster integration includes:
- Automatic strategy selection (max_savings, balanced, quality_first)
- Per-service-type rules for voice_to_text and vision_analysis
- Cost thresholds for automatic approval

### Can I use ai_youtube_transcribe with external services?

ai_youtube_transcribe integrates with:
- OpenAI Whisper API (audio transcription)
- Anthropic Claude Vision API (visual analysis)
- YouTube Data API (via youtube-transcript-api for free captions)

API keys can be configured via:
- api.service.provider records (recommended)
- ir.config_parameter (legacy)

---

## Data & Privacy

### Where is my data stored?

All transcription data is stored in your Odoo PostgreSQL database. The module does not send data to external servers except:
- OpenAI (when using Whisper - audio only)
- Anthropic (when using visual analysis - frames only)
- YouTube (when fetching captions or downloading video)

### Can I export my transcripts?

Yes. Export options:
- Copy to clipboard (built-in button)
- Odoo's standard export (list view > Export)
- Direct database access (youtube_transcript table)

### How do I delete my transcript data?

1. Go to SAM AI > YouTube Transcribe
2. Select records to delete
3. Action > Delete
4. Confirm deletion

Note: Token usage records in ai.token.usage remain for cost tracking.

---

## Pricing & Licensing

### Is ai_youtube_transcribe free?

The module itself is licensed under LGPL-3 (free to use and modify).

**Costs may apply for:**
- OpenAI Whisper API: $0.006 per minute of audio
- Anthropic Claude Vision: ~$0.005 per frame analyzed

Free transcription is available when YouTube captions exist.

### Do I need API keys?

- **For free path:** No API key needed (uses youtube-transcript-api)
- **For Whisper:** OpenAI API key required
- **For visual analysis:** Anthropic API key required

---

## Support

### Where can I get help with ai_youtube_transcribe?

- **Documentation:** https://sme.ec/documentation/modules/ai-youtube-transcribe
- **Email:** sam@sme.ec
- **Chat:** Ask SAM directly in your Odoo instance
- **Author:** Anthony Gardiner (anthony@sme.ec)

### How do I report a bug?

1. Check Known Issues below
2. Email anthony@sme.ec with:
   - Module version (18.0.4.0.0)
   - Odoo version
   - YouTube URL (if shareable)
   - Steps to reproduce
   - Error messages from Odoo logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| yt-dlp rate limiting by YouTube | Known | Add delays between batch operations |
| Very long videos may timeout | Known | Use free captions or split video |
| Some YouTube URLs not recognized | Known | Use standard format: youtube.com/watch?v=XXX |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.4.0.0 | 2025-11 | Visual analysis (Path C), Budget Buster integration |
| 18.0.3.0.0 | 2025-10 | Dual-path transcription, pre-flight checks |
| 18.0.2.0.0 | 2025-09 | api.service.provider integration, token tracking |
| 18.0.1.0.0 | 2025-08 | Initial release with basic Whisper transcription |

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
