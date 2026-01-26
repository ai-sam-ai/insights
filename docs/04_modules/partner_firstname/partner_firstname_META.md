# Module: partner_firstname

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `partner_firstname` |
| **Version** | 18.0.1.0.1 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\partner_firstname` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\partner_firstname\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\partner_firstname\` |
| **Online URL** | https://sme.ec/documentation/modules/partner-firstname |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

partner_firstname is an OCA module that adds separate `firstname` and `lastname` fields to partners (contacts). The `name` field becomes a computed field that combines firstname and lastname based on configurable order (first-last, last-first, or last-comma-first). Existing partner names are automatically split during installation using intelligent parsing.

---

## Dependencies

### Odoo Module Dependencies
- `base_setup` - Odoo base settings

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Enter first name and last name separately for contacts
- Configure name display order (First Last, Last First, Last, First)
- Full name computed automatically from parts
- Edit full name and it splits back into parts
- Existing contacts parsed automatically during installation
- Required by `crm_lead_firstname` for CRM integration

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | res.partner (inherit), res.users (inherit), res.config.settings (inherit) |
| Controllers | 0 | None |
| Views | 3 | Partner, user, and settings forms |
| JS Files | 0 | None |
| Security Rules | 0 | Uses inherited permissions |

**Key Files:**
- `models/res_partner.py` - Core name splitting/computing logic
- `models/res_users.py` - User name handling
- `models/base_config_settings.py` - Name order configuration
- `hooks.py` - Post-install hook to split existing names

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: partner names, first name field, split names, name order
- User wants to: separate firstname/lastname, change name display order
- User mentions: partner_firstname, OCA name module, firstname lastname fields

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto` - For architecture decisions about name handling
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Child Module: `crm_lead_firstname` - Extends this for CRM leads

### Related Modules
- `crm_lead_firstname` - Uses this for lead name handling
- `base_setup` - Required dependency

---

## Known Gotchas (Painfully Learned)

1. **Name Becomes Computed** - The `name` field changes to computed/stored - some code assuming writeable `name` may break
2. **Installation Parsing** - On install, all existing names are parsed - results may vary for unusual name formats
3. **Company Names** - Company names go entirely to `lastname`, `firstname` stays empty
4. **Name Order Setting** - Changing name order requires recalculating all partner names
5. **SQL Constraint Disabled** - The native check_name constraint is disabled - validation is Python-based

---

## Verification Checklist

- [x] Source path exists and is correct
- [x] Version matches __manifest__.py
- [x] Dependencies list is current
- [x] Model count matches reality
- [x] Controller count matches reality
- [x] Quick summary accurately describes module
- [x] Cross-references are valid
- [x] Known gotchas are still relevant

**Last Verification:** 2025-01-26 by CTO Module Docs Agent

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial creation | CTO Module Docs Agent |
