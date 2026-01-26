# Module: crm_lead_firstname

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `crm_lead_firstname` |
| **Version** | 18.0.0.1 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\crm_lead_firstname` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\crm_lead_firstname\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\crm_lead_firstname\` |
| **Online URL** | https://sme.ec/documentation/modules/crm-lead-firstname |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

crm_lead_firstname is an OCA (Odoo Community Association) module that adds separate first name and last name fields to CRM leads. It integrates with the `partner_firstname` module to ensure name data flows correctly between leads and contacts when converting leads to opportunities or partners.

---

## Dependencies

### Odoo Module Dependencies
- `crm` - Odoo CRM module
- `partner_firstname` - OCA module for split partner names

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Enter contact first and last names separately on leads
- Automatic name sync when converting leads to contacts
- Names pulled from partner when selecting existing contact on lead
- Cleaner data for personalized communication and mail merge
- Better data quality for reporting and segmentation

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 1 | crm.lead (inherit) |
| Controllers | 0 | None |
| Views | 2 | Partner form extensions |
| JS Files | 0 | None |
| Security Rules | 0 | Uses inherited permissions |

**Key Files:**
- `models/crm_lead.py` - Lead model with firstname/lastname fields and sync logic
- `views/crm_lead_view.xml` - Partner form modifications for name display

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: CRM lead names, firstname on leads, split names in CRM
- User wants to: separate first and last name on leads, sync names to partners
- User mentions: lead firstname, contact_lastname, OCA CRM modules

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto` - For architecture decisions
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (OCA community module)

### Related Modules
- `partner_firstname` - Required dependency - provides firstname/lastname on res.partner
- `crm` - Core CRM module this extends

---

## Known Gotchas (Painfully Learned)

1. **Requires partner_firstname** - Won't work without OCA partner_firstname module installed first
2. **Name Field Behavior** - contact_name field is repurposed as "First name" - may confuse users expecting full name
3. **Social Media Fields** - View XML adds social media fields that may not exist in base Odoo - check for field errors
4. **Partner Sync Direction** - Names sync FROM partner TO lead when partner selected, but lead names CREATE partner with firstname/lastname

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
