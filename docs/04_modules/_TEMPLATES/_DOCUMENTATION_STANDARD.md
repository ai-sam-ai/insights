# SAM AI Module Documentation Standard

> **The Four-File Standard** - Consistent, complete, AI-ready documentation for every module

---

## Overview

Every SAM AI module follows a four-file documentation standard designed for three audiences:

| Audience | Primary File | What They Need |
|----------|--------------|----------------|
| AI Agents | `_META.md` | Routing, context, cross-references |
| Developers | `_SCHEMA.md` | Models, API, technical specs |
| End Users | `_WOW.md` | Benefits, use cases, transformation |
| AI + SEO | `_FAQ.md` | Q&A pairs, definitive answers |

---

## File Structure

### Per Module (in docs/04_modules/)

```
docs/04_modules/{module_name}/
    ├── {module_name}_META.md       ← Agent Intelligence
    ├── {module_name}_SCHEMA.md     ← Technical Truth
    ├── {module_name}_WOW.md        ← Human Excitement
    ├── {module_name}_FAQ.md        ← AI Discoverability
    └── [existing files]            ← Legacy docs (keep for now)
```

### Per Module (in source repo)

```
{repo}/{module_name}/
    ├── __manifest__.py
    ├── README.md                   ← Points to documentation
    ├── models/
    ├── controllers/
    └── ...
```

---

## The Four Files Explained

### 1. `{module_name}_META.md` - Agent Intelligence

**Purpose:** First file agents read. Routing layer for questions and context.

**Contains:**
- Identity (name, version, paths)
- Quick summary (one paragraph)
- Dependencies (Odoo + Python)
- Agent instructions (when to use, related agents)
- Cross-references (related docs and modules)
- Known gotchas (painfully learned lessons)
- Verification checklist

**Template:** `_TEMPLATES/TEMPLATE_META.md`

---

### 2. `{module_name}_SCHEMA.md` - Technical Truth

**Purpose:** Definitive technical reference. Models, API, data structures.

**Contains:**
- Model definitions (fields, types, relationships)
- API endpoints (routes, methods, request/response)
- Data relationship diagrams
- Security rules
- Database tables

**Template:** `_TEMPLATES/TEMPLATE_SCHEMA.md`

---

### 3. `{module_name}_WOW.md` - Human Excitement

**Purpose:** Non-technical benefits. The sales story for the module.

**Contains:**
- The problem it solves (pain points)
- The transformation (before/after)
- WOW factor (key features as benefits)
- Who it's for (target audience)
- Ecosystem connection (how it fits with other modules)

**Template:** `_TEMPLATES/TEMPLATE_WOW.md`

---

### 4. `{module_name}_FAQ.md` - AI Discoverability

**Purpose:** Q&A format for AI crawlers and user search.

**Contains:**
- Common questions (written as actual questions)
- Definitive answers (specific, factual)
- Troubleshooting (problem/solution pairs)
- Comparisons (vs alternatives)
- Version/compatibility facts

**Template:** `_TEMPLATES/TEMPLATE_FAQ.md`

---

## The Bridge: Module README.md

Each module's source code includes a `README.md` that points to the documentation:

**Purpose:** Bidirectional linking. Source → Docs → Source.

**Contains:**
- Quick summary
- Path to documentation
- List of doc files
- Dependencies
- Quick start

**Template:** `_TEMPLATES/TEMPLATE_MODULE_README.md`

---

## Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Module folder | `{module_name}` (matches technical name) | `ai_sam_workflows` |
| META file | `{module_name}_META.md` | `ai_sam_workflows_META.md` |
| SCHEMA file | `{module_name}_SCHEMA.md` | `ai_sam_workflows_SCHEMA.md` |
| WOW file | `{module_name}_WOW.md` | `ai_sam_workflows_WOW.md` |
| FAQ file | `{module_name}_FAQ.md` | `ai_sam_workflows_FAQ.md` |

---

## Workflow: Creating Documentation for a Module

### Step 1: Gather Information

```
1. Read __manifest__.py for:
   - Version
   - Dependencies
   - Description
   - Author

2. Scan models/ folder for:
   - Model names
   - Field definitions
   - Key methods

3. Scan controllers/ folder for:
   - API endpoints
   - Routes

4. Check existing docs for:
   - Content to migrate
   - Information to verify
```

### Step 2: Create the Four Files

```
1. Start with _META.md (routing layer)
2. Create _SCHEMA.md (technical truth from code)
3. Write _WOW.md (benefits story)
4. Build _FAQ.md (common questions)
```

### Step 3: Create Module README

```
1. Copy TEMPLATE_MODULE_README.md to module source
2. Fill in quick summary
3. Verify documentation path is correct
```

### Step 4: Verify

```
Run through _META.md verification checklist:
- [ ] Source path exists
- [ ] Version matches manifest
- [ ] Dependencies current
- [ ] Counts accurate
- [ ] Cross-references valid
```

---

## Workflow: Updating Documentation

### When Code Changes

1. Identify which file(s) need updates:
   - Model changes → `_SCHEMA.md`
   - New features → `_WOW.md`, `_FAQ.md`
   - Dependency changes → `_META.md`

2. Update the relevant file(s)

3. Update verification date in `_META.md`

4. Update version history in `_FAQ.md`

---

## For AI Agents

### Starting a Documentation Session

```
Agent receives: "Update docs for {module_name}"

1. Read {module}/README.md → Get docs path
2. Read {docs}/{module}_META.md → Get context
3. Scan source code → Compare to _SCHEMA.md
4. Identify gaps
5. Update files
6. Update verification date
```

### Finding Module Information

```
Agent needs info about {module_name}:

1. Search: docs/04_modules/{module_name}_META.md
2. Read Quick Summary → Can answer simple questions
3. If need more → Follow cross-references
4. If need code → Use Source Path from META
```

---

## Quality Checklist

### META File Quality
- [ ] All paths are absolute and verified
- [ ] Version matches actual __manifest__.py
- [ ] Dependencies list is complete
- [ ] Agent instructions are actionable
- [ ] Cross-references link to real files

### SCHEMA File Quality
- [ ] All models documented
- [ ] All fields have descriptions
- [ ] API endpoints match actual routes
- [ ] Relationship diagram is accurate

### WOW File Quality
- [ ] No technical jargon in main content
- [ ] Benefits (not features) are highlighted
- [ ] Target audience is clear
- [ ] Ecosystem connection explained

### FAQ File Quality
- [ ] Questions are actual questions users ask
- [ ] Answers are specific and definitive
- [ ] Troubleshooting covers common issues
- [ ] Version info is current

---

## Templates Location

All templates are in:
```
docs/04_modules/_TEMPLATES/
    ├── _DOCUMENTATION_STANDARD.md    ← This file
    ├── TEMPLATE_META.md
    ├── TEMPLATE_SCHEMA.md
    ├── TEMPLATE_WOW.md
    ├── TEMPLATE_FAQ.md
    └── TEMPLATE_MODULE_README.md
```

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-25 | Initial standard created | Anthony Gardiner + CoS Agent |

---

*SAM AI Module Documentation Standard v1.0*
*Created by Chief of Staff Agent in collaboration with Anthony Gardiner*
