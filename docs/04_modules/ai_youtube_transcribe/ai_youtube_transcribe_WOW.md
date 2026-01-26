# AI YouTube Transcribe

## Turn Any YouTube Video Into Searchable, Shareable Knowledge

---

### The Problem You Know Too Well

You found the perfect tutorial on YouTube. 45 minutes of gold. But now you need that one specific part about database migrations, and you're scrubbing through the timeline hoping to find it. You take notes manually, pausing every few seconds. And forget about sharing the knowledge with your team - they'll have to watch the whole thing too.

**Hours of your life, lost to video scrubbing.**

---

### What If You Could Read Videos Like Documents?

Imagine pasting a YouTube URL and getting back a beautifully formatted transcript in minutes. Not just the words - but what was shown on screen too. Timestamps, visual descriptions, everything searchable. Copy it, share it, ask SAM questions about it.

**That's AI YouTube Transcribe.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Dual-Path Transcription** | Free when YouTube has captions, paid only when necessary - your wallet stays happy |
| **Pre-Flight Analysis** | Know the cost BEFORE spending money - no surprise API bills |
| **Visual Analysis** | Claude AI "watches" your video and describes what's on screen - perfect for tutorials with code or UI walkthroughs |
| **Combined Context** | Audio + visual merged into one searchable document - find anything instantly |
| **Chat with SAM** | Ask questions about the transcript - "What did they say about authentication?" |
| **Budget Buster Integration** | Automatic cost optimization based on your business rules |

---

### How It Works (The Simple Version)

1. **Paste YouTube URL** - Any public video, any length
2. **Click "Analyze Video"** - We check if free captions exist and estimate costs
3. **Click "Process"** - Transcription happens automatically (free or paid based on your preference)
4. **Optional: Enable Visual Analysis** - Claude AI describes what's shown in key frames

**That's it.** No manual typing. No scrubbing timelines. Just readable, searchable text.

---

### Real Results

| Before | After |
|--------|-------|
| 30 minutes watching a 30-minute video | 2 minutes reading the transcript |
| Scrubbing to find "that part about X" | Ctrl+F and done |
| Taking notes while video plays | Copy-paste ready text |
| Explaining video content to teammates | Share the transcript link |
| Paying for every transcription | Free path saves ~70% of videos |

---

### Who Is This For?

**AI YouTube Transcribe is perfect for:**

- Content creators who want to repurpose video content into blog posts
- Developers learning from coding tutorials who hate rewatching
- Teams that need to share knowledge from training videos
- Researchers who need to cite video content accurately
- Anyone who values their time over video scrubbing

**This probably isn't for you if:**

- You enjoy manually transcribing videos (we can't help you there)
- You only watch cat videos
- You have unlimited time to rewatch content

---

### Part of the SAM AI Ecosystem

AI YouTube Transcribe doesn't work alone. It's one piece of an intelligent business system:

| Module | What It Adds | How It Connects |
|--------|--------------|-----------------|
| **ai_brain** | Memory and data storage | Stores transcript records |
| **ai_sam** | AI conversation interface | Chat about transcripts with SAM |
| **ai_sam_base** | Budget Buster cost rules | Automatic cost optimization |
| **ai_youtube_transcribe** | **Video transcription** | **You are here** |

**Together, they make your video content accessible, searchable, and actionable.**

---

### The Three Paths

#### Path A: Free (YouTube Captions)
- Zero cost
- Instant results
- Quality varies by video
- Best for: videos with professional captions

#### Path B: Paid (OpenAI Whisper)
- $0.006 per minute
- Premium quality (10/10)
- Works on any audio
- Best for: important content, no captions available

#### Path C: Visual Analysis (Claude Vision)
- ~$0.005 per frame
- Describes what's shown on screen
- Timeline of visual changes
- Best for: tutorials, demos, presentations with slides

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Python:** 3.10+
- **Dependencies:**
  - `yt-dlp` (video/audio download)
  - `openai` (Whisper API)
  - `youtube-transcript-api` (free captions)
  - `anthropic` (Claude Vision)
  - `ffmpeg` (frame extraction)
- **Installation:** Via Odoo Apps menu
- **Documentation:** [Full technical docs](ai_youtube_transcribe_SCHEMA.md)

**API Integrations:**
- OpenAI Whisper API for audio-to-text
- Anthropic Claude Vision for visual analysis
- YouTube Data API (via youtube-transcript-api)

</details>

---

### Frequently Asked Questions

**Q: How long does transcription take?**
A: Free path: 10-30 seconds. Paid path: 1-3 minutes for most videos. Visual analysis adds 1-2 seconds per frame.

**Q: Is there a video length limit?**
A: OpenAI Whisper has a 25MB file limit. For very long videos (3+ hours), consider splitting or using free captions if available.

**Q: What languages are supported?**
A: YouTube captions support whatever the uploader provided. Whisper supports 50+ languages and auto-detects the language.

**Q: Can I transcribe private videos?**
A: No. Only public YouTube videos can be transcribed.

**Q: What if I want to cancel mid-processing?**
A: Processing happens quickly. If you need to stop, the pre-flight check ensures you approve costs before any money is spent.

---

### Ready to Stop Wasting Time on Video Scrubbing?

Install the module, paste your first YouTube URL, and experience the difference.

**Your future self (the one who finds that tutorial section in 5 seconds) will thank you.**

---

*AI YouTube Transcribe - Part of SAM AI by SME.ec*
*Version 18.0.4.0.0 | Odoo 18 Compatible*
