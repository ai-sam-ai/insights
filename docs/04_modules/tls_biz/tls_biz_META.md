# Module: tls_biz

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `tls_biz` |
| **Version** | 18.0.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\tls_biz` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\tls_biz\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\tls_biz\` |
| **Online URL** | https://sme.ec/documentation/modules/tls-biz |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

TLS Business Model is a simple customization module for Total Lifting Solutions that adds Google Drive folder links and Google Map links to CRM leads, contacts (partners), and projects. It allows users to quickly navigate to the client's Google Drive folder directly from Odoo records. Also adds payment term field to CRM leads.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo base
- `crm` - CRM module for leads
- `project` - Project management
- `project_customer_view` - Project customer view customizations

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Link CRM leads to Google Drive client folders
- Link contacts/partners to their Google Drive folder
- Link contacts/partners to their Google Maps location
- Link projects to their Google Drive folder
- Set payment terms directly on CRM leads
- One-click navigation to external Google resources

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | crm.lead (inherit), res.partner (inherit), project.project (inherit) |
| Controllers | 0 | None |
| Views | 3 | CRM form, partner form, project form |
| JS Files | 0 | None |
| Security Rules | 0 | Uses inherited permissions |

**Key Files:**
- `model/tls_crm.py` - CRM lead extensions
- `model/tls_partner.py` - Partner extensions
- `model/tls_project.py` - Project extensions
- `views/tls_crm.xml` - CRM form view changes
- `views/tls_partner.xml` - Partner form view changes
- `views/tls_project.xml` - Project form view changes

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: Google Drive links, folder URLs, TLS customizations
- User wants to: link Odoo records to Google Drive folders
- User mentions: tls_biz, Total Lifts, client folders, Google folder

### Related Agents
- `/cto-developer` - For customization or bug fixes

### Delegate To
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (TLS custom module)

### Related Modules
- `crm` - CRM leads
- `project` - Project management
- `base` - Partners/contacts
- `RanD` - Another TLS custom module

---

## Known Gotchas (Painfully Learned)

1. **Hardcoded Path** - CRM view includes hardcoded Google Drive path prefix: "This PC/Google Drive (G:)/Shared drives/Sales, and Operations/Total Lifting Solutions/"
2. **project_customer_view Dependency** - Requires this module to be installed
3. **No Security Rules** - Uses inherited permissions from base modules
4. **URL Widget** - Fields use URL widget for clickable links

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
