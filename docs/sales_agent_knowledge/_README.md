# Sales Agent Knowledge Bank

> **Purpose:** Centralized knowledge for SAM AI's Sales Agent (VSL landing page companion)
> **Architecture:** CTO + CMO collaboration (2026-01-26)

---

## Overview

This folder contains the knowledge bank for the SAM AI Sales Agent - an AI assistant that sits under Video Sales Letter (VSL) landing pages to handle prospect questions and close sales.

### Architecture

```
LAYER 1: Product Knowledge (from WOW files)
├── Aggregated benefits from all modules
├── Transformation stories
└── Target audience understanding

LAYER 2: Sales Overlay (this folder)
├── Objection handling
├── Pricing justification
├── Urgency triggers
├── Social proof
└── Closing sequences

LAYER 3: Agent Parameters
├── Personality/tone
├── Escalation rules
└── CTA sequences
```

---

## Files in This Folder

| File | Purpose | Status |
|------|---------|--------|
| `sam_ai_sales_foundation.md` | Aggregated product benefits (from WOW files) | Pending |
| `objection_handling.md` | Price, timing, trust, fit objection responses | Pending |
| `pricing_value.md` | Tier explanations, value justification, anchoring | Pending |
| `urgency_triggers.md` | Scarcity, deadlines, cost of inaction messaging | Pending |
| `proof_arsenal.md` | Testimonials, case studies, metrics | Pending |
| `closing_sequences.md` | CTA flows, follow-up sequences | Pending |
| `agent_parameters.md` | Personality, rules, escalation logic | Pending |

---

## How This Connects to Four-File Standard

| Source | What Sales Agent Uses |
|--------|----------------------|
| WOW files (all modules) | Aggregated into `sam_ai_sales_foundation.md` |
| FAQ files | Reference for common questions |
| META/SCHEMA files | NOT used (too technical for sales) |

---

## Owners

| Role | Responsibility |
|------|----------------|
| CMO | Sales psychology content (objections, urgency, closing) |
| CTO | Architecture, integration with documentation system |
| CEO | Pricing decisions, proof collection (testimonials) |

---

## Related

- [llms_txt_alignment_plan.md](D:\github_repos\Github Management\llms_txt_alignment_plan.md) - Parent strategic plan
- [Four-File Standard](..\04_modules\_TEMPLATES\_DOCUMENTATION_STANDARD.md) - Module documentation standard
- WOW files in `docs/04_modules/{module}/{module}_WOW.md`

---

*Created: 2026-01-26 | CTO + CMO Collaboration*
