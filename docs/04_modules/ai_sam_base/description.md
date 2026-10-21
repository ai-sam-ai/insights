# SAM AI Base

**Technical Name**: `ai_sam_base`
**Version**: 18.0.2.51

SAM AI - Minimal Foundation Module (Essential Models Only)

## Description


SAM AI Base - Minimal Foundation Module
=========================================

This module contains only the essential models needed for basic AI conversation functionality.

**Core Components:**
- API credentials storage
- API service providers (Claude, OpenAI, etc.)
- AI provider models (GPT-4, Claude Sonnet, etc.)
- AI service integration
- Conversation threads and messages
- Token usage tracking
- Settings and configuration
- SAM context system

**Purpose:**
This is a minimal split from ai_brain to resolve module installation issues.
Contains only 13 essential models to test installer stability.

**Architecture:**
- Foundation layer for SAM AI ecosystem
- No UI components (views, wizards)
- Pure data layer only


## Module Details

# SAM AI Base 

The intelligent foundation for perfect memory AI assistance Version 1.0.0 
## What is SAM AI Base? 

SAM AI Base is the foundation layer of **SAM **(Simplify, Automate, Manage),
 an AI assistant with **perfect memory **built directly into Odoo 18. 

**Unlike ChatGPT or other generic AI assistants, SAM: **
- **Remembers every conversation **you've ever had (per user, forever) 
- **Learns your unique style **automatically over time 
- **Knows where you are **in Odoo and provides contextual help 
- **Adapts to your preferences **(brief vs. detailed, emoji usage, coding style) 
- **Optimizes AI costs **by automatically selecting the best provider 
## Module Statistics 43 Python Models 67 API Endpoints 10 Controllers 8+ AI Providers 
## Core Capabilities 🧠 
### Perfect Memory (Per User) 

Every conversation is saved and organized. SAM remembers what you discussed
 yesterday, last week, or six months ago—automatically. 🔌 
### Multi-Provider AI 

Connect to multiple AI providers (Claude, OpenAI, Google, Azure) and
 automatically select the best one for cost, performance, and availability. 🎯 
### Context Intelligence 

SAM knows exactly where you are in Odoo (Invoices, CRM, Inventory, etc.)
 and provides relevant help without you having to explain. 👤 
### User Personalization 

SAM learns YOUR preferences: communication style, coding standards,
 work patterns, and permission levels. 💰 
### Cost Intelligence 

Track AI usage and costs in real-time. Set budgets, get alerts, and
 automatically switch to cheaper providers when appropriate. 🤖 
### Agent Ecosystem 

Specialized AI agents for specific tasks: QA Guardian, CTO Developer,
 Sales Strategist, N8N Expert, and more. 
## Supported AI Providers 

**SAM AI Base supports multiple AI providers for vendor independence: **
- **Anthropic **- Claude Sonnet, Opus, Haiku 
- **OpenAI **- GPT-4, GPT-4 Turbo, GPT-3.5 
- **Google Cloud AI **- Gemini, PaLM models 
- **Microsoft Azure AI **- Azure OpenAI Service 
- **Stability AI **- Image generation models 
- **ElevenLabs **- Voice synthesis 
- **HeyGen **- Video generation 
- **Custom APIs **- Bring your own provider 
## How It Works 
- **Install the Module: **Install `ai_sam_base `(this module) + `ai_sam `(UI layer) 
- **Configure API Provider: **Add your Claude API key or OpenAI key in Settings → SAM AI Configuration 
- **Start Chatting: **Open the SAM chat interface from any screen in Odoo 
- **Grant Permissions: **SAM will ask permission before saving memories or accessing files 
- **Watch SAM Learn: **Over time, SAM adapts to your style automatically 
## Technical Details 
### Key Components Component Count Purpose **Models **43 Data storage (35 regular, 5 abstract, 5 transient) **Controllers **10 HTTP endpoints (67 routes total) **Security Rules **31 Access control per model **Dependencies **3 base, web, mail 
### Architecture - Platform Skin Pattern 

This module follows the **Platform Skin Architecture **: 
- **ai_sam_base **(this module) - Python code only (models, controllers, business logic) 
- **ai_sam **(UI module) - Views, templates, menus, static assets 

**Benefits: **
- ✅ Independent testing of business logic 
- ✅ UI reskinning without touching Python code 
- ✅ Clearer debugging (model issues vs. UI issues) 
- ✅ Better separation of concerns 
## Privacy & Security 
### Multi-User Isolation 
- Your conversations are **completely private **
- Your memories are **only visible to you **
- SAM adapts to YOUR preferences (not other users') 
### Memory Permissions (You Control What SAM Remembers) Permission Level Description **Ask Always **SAM asks before saving anything (default for new users) **Auto-Work **Auto-save work info, ask for personal info **Auto-All **Auto-save everything (maximum trust) 
### File Access Control 
- SAM requests permission before accessing any file or folder 
- You grant access per-path (single file, folder, or recursive) 
- Your approved paths don't affect other users 
### Enterprise Security 
- OAuth 2.0 support for providers that support it 
- API credentials stored securely in encrypted fields 
- Automatic token refresh for OAuth providers 
- Revokable access at any time 
## What Makes SAM Different? Feature ChatGPT / Generic AI SAM AI **Memory **"I don't have access to previous conversations" ✅ Remembers EVERY conversation forever (per user) **Personalization **Same generic responses for everyone ✅ Learns YOUR unique style and adapts automatically **Context **You must explain what you're working on ✅ SAM knows where you are in Odoo automatically **Integration **External tool, copy-paste workflow ✅ Built INTO Odoo, works with your data directly **Multi-Provider **Locked to one AI provider ✅ Switch between Claude, OpenAI, Google, etc. **Cost Control **No visibility into costs ✅ Real-time cost tracking + budget alerts 
## Getting Started 
### Prerequisites 
- Odoo 18.0 or higher 
- Python 3.10 or higher 
- API key from at least one provider (Claude, OpenAI, etc.) 
### Installation Steps 
- Install `ai_sam_base `(this module) via Apps menu 
- Install `ai_sam `(UI module) for the interface 
- Navigate to **Settings → SAM AI Configuration **
- Click "Add Provider" and configure your API credentials 
- Open SAM chat from any Odoo screen and start chatting! First Conversation Experience 

When you first talk to SAM, you'll experience: 
- **Introduction: **SAM introduces itself and explains memory permissions 
- **Permission Requests: **SAM asks before saving anything about you 
- **Adaptive Learning: **SAM starts learning your communication style 
- **Context Awareness: **SAM knows where you are in Odoo 
## Roadmap 
### Version 1.0 (Current) ✅ 
- ✅ Multi-user memory system 
- ✅ Multi-provider API orchestration 
- ✅ Context intelligence 
- ✅ Cost tracking & optimization 
- ✅ Agent ecosystem 
- ✅ OAuth 2.0 authentication 
- ✅ Developer mode with QA integration 
### Version 2.0 (Planned) 🚀 
- 🔲 Provider plugin architecture (extensible providers) 
- 🔲 Multi-language support (SAM speaks your language) 
- 🔲 Advanced memory graph visualization 
- 🔲 Team workspaces (shared conversations) 
- 🔲 Custom agent builder (create your own agents) 
- 🔲 Enhanced voice capabilities (voice responses) 
## Support & Resources 
### Documentation 
- **Developer Guide: **See `README.md `in module directory 
- **API Documentation: **See `API_DOCUMENTATION.yaml `(OpenAPI 3.0 spec) 
- **Architecture Diagrams: **See `ARCHITECTURE.mermaid `(6 system diagrams) 
### Links 
- **Website: **https://samai.com 
- **Author: **Better Business Builders 
- **License: **LGPL-3 ⚠️ Important Notes 
- API keys are required for SAM to function (not included) 
- AI provider costs are separate from Odoo/SAM licensing 
- Use cost budgets to control AI spending 
- Review memory permissions with your team for compliance 
## Strategic Business Value 
### Return on Investment Value Proposition Quantified Impact **Time Savings **30% reduction in context re-explanation **Cost Optimization **40-60% lower AI costs via provider selection **Knowledge Retention **100% conversation history preserved forever **Onboarding Speed **New users productive in 1 conversation vs. 10+ **Vendor Independence **Switch AI providers without code changes **Scalability **Supports thousands of users with per-user isolation 

**SAM AI Base **- The intelligent foundation for perfect memory AI assistance 

Version 1.0.0 | LGPL-3 License | Better Business Builders Visit SAM AI Website Get Started

## Dependencies

- `base`
- `web`
- `mail`
