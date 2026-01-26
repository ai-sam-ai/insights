# Module: ai_youtube_transcribe

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_youtube_transcribe` |
| **Version** | 18.0.4.0.0 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_youtube_transcribe` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_youtube_transcribe\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_youtube_transcribe\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-youtube-transcribe |
| **Status** | Active |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

ai_youtube_transcribe provides YouTube video transcription capabilities for Odoo 18. It enables users to transcribe YouTube videos through a dual-path system: FREE via YouTube auto-captions or PAID via OpenAI Whisper API. The module includes optional visual analysis using Claude Vision AI to "watch" video frames and describe what's shown on screen. Budget Buster integration provides smart cost optimization strategies.

---

## Dependencies

### Odoo Module Dependencies
- `base`
- `web`
- `ai_brain` - Provides the base `youtube.transcript` model
- `ai_sam` - Enables "Chat with SAM" functionality for transcript discussions

### Python Libraries Required
- `yt-dlp` - Downloads audio/video from YouTube
- `openai>=1.0` - OpenAI Whisper API for paid transcription
- `youtube-transcript-api` - Free YouTube auto-captions extraction (optional)
- `anthropic` - Claude Vision API for visual analysis (optional)
- `Pillow` - Image processing for frame extraction (optional)
- `opencv-python` - Fallback frame extraction method (optional)

### External Requirements
- `ffmpeg` - Primary method for video frame extraction (recommended)

---

## For End Users (What Can This Do For Me?)

- **Transcribe any YouTube video** - Paste a URL, get a formatted transcript in minutes
- **Save money with dual-path transcription** - Use free YouTube captions when available, pay for Whisper only when needed
- **See what's happening on screen** - Visual Analysis feature describes UI elements, code, diagrams shown in video
- **Discuss transcripts with SAM** - Ask questions about video content through AI chat integration
- **Track all costs** - Full cost estimation, approval workflows, and token usage tracking

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 1 (extended via inheritance 12x) | See _SCHEMA.md - `youtube.transcript` with multiple extension files |
| Controllers | 0 | Actions via model methods |
| Views | 3 | Form, List, Menu views |
| JS Files | 1 | `clipboard_copy.js` for copy-to-clipboard functionality |
| Security Rules | 1 | ir.model.access.csv - wizard access |
| Wizards | 2 | Cost forecast wizards (audio + vision) |

**Key Files:**
- `models/youtube_transcript.py` - Base model with core fields and methods
- `models/youtube_transcript_dual_path.py` - FREE/PAID path routing with Budget Buster
- `models/youtube_transcript_processing.py` - YouTube download and Whisper transcription
- `models/youtube_transcript_api_integration.py` - api.service.provider integration
- `models/youtube_transcript_preflight.py` - Pre-flight analysis before processing
- `models/youtube_transcript_frame_extraction.py` - Video frame extraction (Phase 1)
- `models/youtube_transcript_vision_analysis.py` - Claude Vision API integration (Phase 2)
- `models/youtube_transcript_context_merger.py` - Merge audio + visual context (Phase 3)
- `models/youtube_transcript_vision_budget.py` - Vision cost optimization (Phase 4)
- `models/youtube_transcript_cost_wizard.py` - Audio cost approval wizard
- `models/youtube_transcript_vision_cost_wizard.py` - Vision cost approval wizard
- `models/res_config_settings.py` - Settings integration
- `views/youtube_transcript_views.xml` - Main form and list views

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: youtube, transcribe, transcript, video transcription, whisper, captions, subtitle
- User wants to: transcribe a video, get captions, convert video to text, extract audio, visual analysis
- User mentions: youtube URL, youtube link, video frames, claude vision, openai whisper

### Related Agents
- `/sam` - Users can chat with SAM about transcripts
- `/cto-developer` - For implementation and bug fixes
- `/mod_intelligence` - For understanding ecosystem integration

### Delegate To
- `/cto` - for architecture decisions about transcription flows
- `/cto-developer` - for implementation work and debugging
- `/docker` - for yt-dlp or ffmpeg installation issues

---

## Cross-References

### Related Documentation
- Architecture: `docs/05_architecture/ai_services/`
- Data Flows: `docs/06_data_flows/transcription/`
- Budget Buster: `docs/04_modules/ai_sam_base/` (Budget Buster rules)

### Related Modules
- `ai_brain` - Provides base `youtube.transcript` model (DEPENDS ON)
- `ai_sam` - Enables conversation integration (DEPENDS ON)
- `ai_sam_base` - Budget Buster cost optimization system (INTEGRATES WITH)

---

## Known Gotchas (Painfully Learned)

1. **yt-dlp Rate Limiting** - YouTube may temporarily block downloads if too many requests. Add delays between batch processing.

2. **FFmpeg Required for Frame Extraction** - Visual analysis requires ffmpeg. Without it, falls back to opencv which may be slower or unavailable.

3. **Whisper API File Size Limit** - OpenAI Whisper has a 25MB limit. Very long videos may need to be split or compressed.

4. **Free Captions Quality Varies** - YouTube auto-captions can be inaccurate. The quality_score field helps estimate reliability.

5. **Claude Vision Token Costs** - Visual analysis can be expensive for long videos with many frames. Always check estimated cost before proceeding.

6. **Temp File Cleanup** - Module creates temp files in system temp directory. If processing fails, orphaned files may remain. Cron job `_cron_cleanup_old_frames` handles this.

7. **API Key Sources** - Module checks `api.service.provider` first, then falls back to `ir.config_parameter`. Ensure keys are configured correctly.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.4.0.0)
- [x] Dependencies list is current
- [x] Model count matches reality (1 model extended via multiple inheritance files)
- [x] Controller count matches reality (0 - uses model actions)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2026-01-26 by Claude

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial creation following four-file standard | Claude |
