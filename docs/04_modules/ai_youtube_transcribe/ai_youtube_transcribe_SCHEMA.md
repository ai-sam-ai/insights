# Schema: ai_youtube_transcribe

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_youtube_transcribe` |
| **Version** | 18.0.4.0.0 |
| **Total Models** | 1 primary + 2 transient wizards |
| **Total Controllers** | 0 (uses model actions) |
| **API Endpoints** | 0 (internal Odoo actions only) |

---

## Models

### youtube.transcript (Primary Model)

**Purpose:** Stores YouTube video transcription records with metadata, audio transcripts, visual analysis, and cost tracking.

**Base Definition:** `ai_brain` module (inherited and extended by this module)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | User-defined name for transcript |
| `youtube_url` | Char | Yes | Full YouTube video URL |
| `video_id` | Char | No (computed) | Extracted YouTube video ID |
| `video_title` | Char | No | Title fetched from YouTube |
| `video_duration` | Integer | No | Duration in seconds |
| `status` | Selection | Yes | draft / processing / done / error |
| `transcript` | Html | No | Formatted transcript (HTML paragraphs) |
| `error_message` | Text | No | Error details if processing failed |
| `processed_date` | Datetime | No | When transcription completed |
| `processing_time` | Float | No | Processing time in seconds |
| `cost_estimate` | Float | No | Estimated API cost (USD) |

**Dual-Path Fields (youtube_transcript_dual_path.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transcription_method` | Selection | Yes | auto / free / whisper |
| `actual_method_used` | Selection | No | youtube_captions / openai_whisper |
| `budget_strategy` | Selection | No | max_savings / balanced / smart_routing / quality_first / premium_only |
| `caption_quality_score` | Float | No | Quality score 0-10 for auto-captions |

**Pre-Flight Fields (youtube_transcript_preflight.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `preflight_status` | Selection | No | not_checked / captions_available / captions_unavailable / video_unavailable |
| `estimated_whisper_cost` | Float | No | Estimated Whisper API cost |
| `user_approved_cost` | Boolean | No | User approved paid transcription |
| `preflight_error` | Text | No | Error from pre-flight check |

**Visual Analysis Fields (youtube_transcript_frame_extraction.py, youtube_transcript_vision_analysis.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `visual_analysis_enabled` | Boolean | No | Enable Claude Vision analysis |
| `frame_extraction_strategy` | Selection | No | thumbnail_only / key_frames / detailed / custom |
| `custom_frame_count` | Integer | No | User-defined frame count |
| `frames_extracted` | Integer | No | Actual frames extracted |
| `frame_extraction_time` | Float | No | Extraction time in seconds |
| `frame_extraction_method` | Selection | No | ffmpeg / opencv / thumbnail |
| `visual_analysis` | Html | No | Claude Vision analysis (HTML timeline) |
| `visual_analysis_cost` | Float | No | Vision API cost (USD) |
| `visual_tokens_used` | Integer | No | Total tokens for vision analysis |
| `visual_analysis_time` | Float | No | Vision analysis time in seconds |
| `vision_provider_id` | Many2one | No | api.service.provider used for vision |
| `vision_token_usage_id` | Many2one | No | ai.token.usage record for vision |

**Context Merger Fields (youtube_transcript_context_merger.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `combined_context` | Html | No | Merged audio + visual context |
| `combined_context_generated` | Boolean | No | True if combined context exists |
| `combined_context_generation_date` | Datetime | No | When combined context was generated |

**Vision Budget Fields (youtube_transcript_vision_budget.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `vision_budget_strategy` | Selection | No | max_savings / balanced / quality_first / custom |
| `vision_cost_approved` | Boolean | No | User approved vision analysis cost |
| `estimated_vision_cost` | Float | No (computed) | Estimated vision cost (USD) |
| `estimated_vision_frames` | Integer | No (computed) | Estimated frames to analyze |

**API Integration Fields (youtube_transcript_api_integration.py):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `service_provider_id` | Many2one | No | api.service.provider for transcription |
| `token_usage_id` | Many2one | No | ai.token.usage record |
| `conversation_id` | Many2one | No | ai.conversation for SAM chat |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_process_transcript()` | Main transcription workflow with dual-path routing | Notification action |
| `action_run_preflight_check()` | Check caption availability and estimate costs | Wizard/notification action |
| `action_process_with_user_approval()` | Process after user cost approval | Notification action |
| `action_extract_frames()` | Extract video frames for visual analysis | List of frame paths |
| `action_analyze_frames_vision()` | Analyze frames with Claude Vision | Notification action |
| `action_generate_combined_context()` | Merge audio + visual into unified context | Notification action |
| `action_copy_transcript()` | Copy transcript to clipboard | Client action |
| `action_copy_combined_context()` | Copy combined context to clipboard | Client action |
| `action_create_conversation()` | Create SAM AI conversation for transcript | Window action |
| `action_forecast_vision_cost()` | Show vision cost forecast wizard | Wizard action |
| `_extract_video_id(url)` | Extract YouTube video ID from URL | String (video_id) |
| `_format_transcript(raw_text)` | Format raw text into HTML paragraphs | String (HTML) |
| `_transcribe_via_youtube_captions()` | Free path transcription | Dict with result |
| `_transcribe_via_whisper()` | Paid path transcription | Dict with result |
| `_get_openai_client()` | Get OpenAI client from provider | Tuple (client, provider, source) |
| `_get_claude_client()` | Get Anthropic client from provider | Tuple (client, provider, source) |
| `_get_budget_strategy()` | Get applicable budget strategy | String (strategy name) |

**Relationships:**
- `service_provider_id` -> `api.service.provider` (Many2one)
- `vision_provider_id` -> `api.service.provider` (Many2one)
- `token_usage_id` -> `ai.token.usage` (Many2one)
- `vision_token_usage_id` -> `ai.token.usage` (Many2one)
- `conversation_id` -> `ai.conversation` (Many2one)

---

### youtube.transcript.cost.wizard (Transient Model)

**Purpose:** Cost forecast and approval wizard for Whisper transcription

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transcript_id` | Many2one | Yes | Related youtube.transcript |
| `estimated_cost` | Float | No | Estimated API cost |
| `video_duration` | Integer | No | Video duration in seconds |
| `message` | Text | No | Display message for user |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_approve()` | User approves cost, proceeds with transcription | Window action |
| `action_cancel()` | User cancels, returns to transcript | Window action |

---

### youtube.transcript.vision.cost.wizard (Transient Model)

**Purpose:** Cost forecast and approval wizard for Claude Vision analysis

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transcript_id` | Many2one | Yes | Related youtube.transcript |
| `estimated_frames` | Integer | No | Estimated frames to analyze |
| `estimated_cost` | Float | No | Estimated vision cost |
| `strategy` | Char | No | Selected strategy name |
| `video_duration` | Integer | No | Video duration in seconds |

**Key Methods:**

| Method | Purpose | Returns |
|--------|---------|---------|
| `action_approve()` | Approve vision cost, proceed with analysis | Window action |
| `action_cancel()` | Cancel, return to transcript | Window action |

---

## Processing Flows

### Path A: Free Transcription (YouTube Captions)

```
User provides URL
       |
       v
Pre-flight Check
       |
       v
Captions Available? ──Yes──> Extract via youtube-transcript-api
       |                              |
       No                             v
       |                      Format to HTML paragraphs
       v                              |
Fall through to Path B                v
                              Save transcript (cost: $0.00)
```

### Path B: Paid Transcription (OpenAI Whisper)

```
User provides URL
       |
       v
Download audio via yt-dlp
       |
       v
Send to Whisper API
       |
       v
Format raw text to HTML paragraphs
       |
       v
Save transcript + create token usage record
       |
       v
Cleanup temp audio file
```

### Path C: Visual Analysis (Claude Vision)

```
Phase 1: Frame Extraction
    |
    v
Download video via yt-dlp (720p max)
    |
    v
Extract frames via ffmpeg (or opencv fallback)
    |
    v
Delete video file, keep frames

Phase 2: Vision Analysis
    |
    v
Get Claude API client
    |
    v
For each frame:
    - Encode to base64
    - Send to Claude Vision API
    - Record timestamp and description
    |
    v
Format as HTML timeline
    |
    v
Create vision token usage record
    |
    v
Cleanup frame files

Phase 3: Context Merger
    |
    v
Parse audio transcript paragraphs
    |
    v
Parse visual timeline timestamps
    |
    v
Merge into unified HTML (timeline or interleaved style)
```

---

## Data Relationships Diagram

```
┌─────────────────────────────┐
│    youtube.transcript       │
│                             │
│  - name                     │
│  - youtube_url              │
│  - status                   │
│  - transcript (HTML)        │
│  - visual_analysis (HTML)   │
│  - combined_context (HTML)  │
└──────────┬──────────────────┘
           │
           │ Many2one
           ▼
┌─────────────────────────────┐
│   api.service.provider      │◄────────┐
│                             │         │
│  - supplier (openai/anthr.) │         │
│  - service_type             │         │
│  - api_key                  │         │
└─────────────────────────────┘         │
                                        │
┌─────────────────────────────┐         │
│     ai.token.usage          │─────────┘
│                             │  Many2one
│  - input_tokens             │
│  - output_tokens            │
│  - cost                     │
│  - operation_type           │
└─────────────────────────────┘
           │
           │ Many2one
           ▼
┌─────────────────────────────┐
│     ai.conversation         │
│                             │
│  - name                     │
│  - message_ids              │
│  - context                  │
└─────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `youtube.transcript` | base.group_user | Inherited from ai_brain | | | |
| `youtube.transcript.cost.wizard` | base.group_user | Yes | Yes | Yes | Yes |
| `youtube.transcript.vision.cost.wizard` | base.group_user | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `youtube_transcript` | `youtube.transcript` | Main transcript records |

---

## Configuration Parameters

| Parameter Key | Default | Description |
|---------------|---------|-------------|
| `ai_youtube_transcribe.openai_api_key` | None | Legacy OpenAI API key (prefer api.service.provider) |
| `ai_youtube_transcribe.anthropic_api_key` | None | Legacy Anthropic API key (prefer api.service.provider) |
| `ai_youtube_transcribe.vision_cost_threshold` | 0.10 | Cost threshold for requiring user approval (USD) |

---

## Cost Calculations

### Whisper API (Audio Transcription)
- Rate: $0.006 per minute of audio
- Formula: `cost = (video_duration_seconds / 60) * 0.006`

### Claude Vision API (Visual Analysis)
- Input tokens: ~1,600 per image
- Output tokens: ~100 per description
- Input rate: $3 per million tokens
- Output rate: $15 per million tokens
- Average per frame: ~$0.005
- Formula: `cost = frames * 0.005`

---

## External API Integration

### OpenAI Whisper API
```python
client = OpenAI(api_key=api_key)
response = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
    response_format="text"
)
```

### Anthropic Claude Vision API
```python
client = anthropic.Anthropic(api_key=api_key)
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", ...}},
            {"type": "text", "text": "Describe this frame..."}
        ]
    }]
)
```

### YouTube Transcript API (Free)
```python
from youtube_transcript_api import YouTubeTranscriptApi
transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
raw_text = ' '.join([entry['text'] for entry in transcript_list])
```

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | Claude |
