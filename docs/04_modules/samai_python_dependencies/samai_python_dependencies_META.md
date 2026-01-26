# Module: samai_python_dependencies

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `samai_python_dependencies` |
| **Version** | 18.0.1.1.0 |
| **Source Path** | `D:\github_repos\04_samai_user_experience\samai_python_dependencies` |
| **Manifest** | `D:\github_repos\04_samai_user_experience\samai_python_dependencies\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\samai_python_dependencies\` |
| **Online URL** | https://sme.ec/documentation/modules/samai-python-dependencies |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

samai_python_dependencies provides centralized Python dependency management for the SAM AI ecosystem. Instead of each module declaring its own external_dependencies, modules depend on this one. It offers utility functions to check dependency availability, get package info, generate requirements.txt, and even attempt pip install. On module installation, a post_init_hook logs which dependencies are available and which are missing.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Core Odoo functionality

### Python Libraries Required (External Dependencies)
**Document Processing:**
- `markdown` - Markdown to HTML conversion
- `python-docx` (import as `docx`) - Microsoft Word processing
- `PyPDF2` - PDF reading and manipulation
- `openpyxl` - Excel file handling

**Web & API:**
- `requests` - HTTP requests library
- `httpx` - Modern async HTTP client
- `beautifulsoup4` (import as `bs4`) - HTML/XML parsing
- `lxml` - Fast XML processing

---

## For End Users (What Can This Do For Me?)

- **Single install point** - Install this module and all SAM AI dependencies are checked
- **Clear error messages** - Know exactly which pip packages are missing
- **requirements.txt included** - Easy to install all packages with one pip command
- **Auto-check on install** - Post-init hook reports status immediately

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 0 | Utility-only module, no models |
| Controllers | 0 | No HTTP endpoints |
| Views | 0 | No UI |
| Python Functions | 7 | check_dependency, get_missing, etc. |
| Hooks | 1 | post_init_check_dependencies |

**Key Files:**
- `__init__.py` - All utility functions and DEPENDENCIES registry
- `requirements.txt` - pip-installable requirements file

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: Python dependencies, pip packages, import errors, missing libraries
- User wants to: install dependencies, check what's missing, understand import names
- User mentions: samai_python_dependencies, requirements.txt, pip install

### Related Agents
- `/cto-developer` - For adding new dependencies
- `/docker` - For container environment setup with pip packages

### Delegate To
- `/cto` - For decisions about adding new ecosystem-wide dependencies
- `/cto-developer` - For bug fixes or enhancements

---

## Cross-References

### Related Documentation
- None (foundational utility module)

### Related Modules
- All SAM AI modules that require Python libraries should depend on this module
- `ai_sam_base` - Uses httpx via this module's external_tools support

---

## Known Gotchas (Painfully Learned)

1. **Import name vs package name** - `python-docx` imports as `docx`, `beautifulsoup4` imports as `bs4`. The module's `PACKAGE_TO_IMPORT` and `IMPORT_TO_PACKAGE` dicts handle this mapping.

2. **Required vs optional** - Some dependencies in `DEPENDENCIES` dict are marked `required: False`. These are nice-to-have (pandas, numpy, openai, anthropic) and won't block module installation.

3. **install_dependency() is risky** - The function attempts pip install at runtime. This may fail in containerized environments without write access. Use requirements.txt pre-installation instead.

4. **Manifest external_dependencies** - The manifest only lists REQUIRED dependencies. Optional ones (pandas, openai) are in the DEPENDENCIES dict but not enforced at install time.

5. **Cache clearing** - The `_dependency_cache` dict caches import results. If you pip install a package after Odoo starts, clear the cache or restart Odoo.

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py (18.0.1.1.0)
- [x] Dependencies list is current
- [x] No models (utility module)
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are documented

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial four-file documentation creation | CTO Module Docs Agent |
