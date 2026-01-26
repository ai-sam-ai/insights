# Module: {module_name}

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `{module_name}` |
| **Version** | 18.0.x.x.x |
| **Source Path** | `D:\github_repos\{repo_folder}\{module_name}` |
| **Manifest** | `D:\github_repos\{repo_folder}\{module_name}\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\{module_name}\` |
| **Online URL** | https://sme.ec/documentation/modules/{module-slug} |
| **Status** | Active / Deprecated / WIP |
| **Last Verified** | YYYY-MM-DD |

---

## Quick Summary

<!-- One paragraph: what this module IS and DOES in plain English. Agent reads this to answer simple questions immediately. -->

{module_name} provides [WHAT IT DOES] for [WHO/WHAT]. It enables [KEY CAPABILITY] by [HOW IT WORKS AT HIGH LEVEL].

---

## Dependencies

### Odoo Module Dependencies
<!-- List modules from __manifest__.py 'depends' -->
- `base`
- `web`
- `{other_dependency}`

### Python Libraries Required
<!-- List from requirements.txt or external_dependencies in manifest -->
- None additional (uses base Odoo)
<!-- OR -->
- `library_name>=version` - [what it's used for]

---

## For End Users (What Can This Do For Me?)

<!-- 3-5 bullet points in plain English, no tech jargon -->
- [Benefit 1 - what problem it solves]
- [Benefit 2 - what capability it adds]
- [Benefit 3 - what time/effort it saves]

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | X | See _SCHEMA.md |
| Controllers | X | [X REST endpoints] |
| Views | X | [form, tree, kanban, etc.] |
| JS Files | X | [key files] |
| Security Rules | X | ir.model.access.csv |

**Key Files:**
- `models/{main_model}.py` - [purpose]
- `controllers/{main_controller}.py` - [purpose]
- `static/src/js/{main_js}.js` - [purpose]

---

## Agent Instructions

### When to Use This Knowledge
<!-- Keywords and question patterns that should route here -->
- User asks about: [keyword1], [keyword2], [keyword3]
- User wants to: [action1], [action2]
- User mentions: [feature1], [feature2]

### Related Agents
<!-- Which agents know about this module -->
- `/agent_name` - [what they do with this module]
- `/other_agent` - [relationship]

### Delegate To
<!-- When to hand off to another agent -->
- `/cto` - for architecture decisions about this module
- `/cto-developer` - for implementation work
- `/{other}` - for [specific topic]

---

## Cross-References

### Related Documentation
<!-- Links to other doc sections -->
- Architecture: `docs/05_architecture/{related}/`
- Data Flows: `docs/06_data_flows/{related}/`
- Parent Module: `docs/04_modules/{parent}/`
- Child Module: `docs/04_modules/{child}/`

### Related Modules
<!-- Modules that work together with this one -->
- `{related_module_1}` - [relationship: depends on / extends / uses]
- `{related_module_2}` - [relationship]

---

## Known Gotchas (Painfully Learned)

<!-- Capture lessons learned, common mistakes, non-obvious behaviors -->
1. **[Issue Title]** - [What goes wrong and why]
2. **[Issue Title]** - [What goes wrong and why]
3. **[Issue Title]** - [What goes wrong and why]

---

## Verification Checklist

<!-- Used when reviewing/updating this documentation -->
- [ ] Source path exists and is correct
- [ ] Version matches __manifest__.py
- [ ] Dependencies list is current
- [ ] Model count matches reality
- [ ] Controller count matches reality
- [ ] Quick summary accurately describes module
- [ ] Cross-references are valid
- [ ] Known gotchas are still relevant

**Last Verification:** YYYY-MM-DD by [who]

---

## Change History

| Date | Change | By |
|------|--------|-----|
| YYYY-MM-DD | Initial creation | [name] |
