# Module: sam_ai_access_manager

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `sam_ai_access_manager` |
| **Version** | 18.0.1.2.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\sam_ai_access_manager` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\sam_ai_access_manager\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\sam_ai_access_manager\` |
| **Online URL** | https://sme.ec/documentation/modules/sam-ai-access-manager |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

sam_ai_access_manager simplifies Odoo's complex permission system by introducing "Business Units" - human-readable department groupings with pre-configured access templates. Instead of hunting through scattered settings, administrators can assign users to business units (Sales, Accounts, Project Management) and apply all associated permissions with one click. Includes safety features like protected groups and confirmation wizards.

---

## Dependencies

### Odoo Module Dependencies
- `base` - Odoo base
- `mail` - For tracking changes

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Assign users to departments (Business Units) instead of managing individual groups
- See a visual summary of what each user can access
- Toggle common permissions (Import/Export, Debug) with simple checkboxes
- Super User role that automatically inherits all permissions
- Confirmation dialog before applying bulk permission changes
- Protected groups prevent accidental lockouts

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 3 | sam.business.unit (new), sam.common.permission (new), res.users (inherit) |
| Controllers | 0 | None |
| Views | 5 | Business unit forms, user access views, menus |
| JS Files | 0 | None |
| Security Rules | 9 | Three-tier: User/Manager/Admin |
| Wizards | 1 | Apply groups confirmation wizard |

**Key Files:**
- `models/business_unit.py` - Core business unit logic with safety features
- `models/res_users.py` - User extensions with access summary
- `models/common_permission.py` - Human-readable permission definitions
- `wizards/apply_groups_wizard.py` - Confirmation wizard

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: user permissions, access rights, business units, user groups
- User wants to: manage user access, assign permissions, create departments
- User mentions: access manager, SAM permissions, user lockout prevention

### Related Agents
- `/cto-developer` - For customization or bug fixes
- `/mod_sam` - For SAM AI core integration

### Delegate To
- `/cto` - For architecture decisions about access control
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (SAM AI original)

### Related Modules
- `base` - Core Odoo groups/users
- `mail` - For activity tracking

---

## Known Gotchas (Painfully Learned)

1. **No Auto-Apply** - Groups are NOT automatically applied when you edit business units - must click "Apply to Users"
2. **Protected Groups** - Internal User (base.group_user), Portal, Public groups can NEVER be removed
3. **Super User Inheritance** - Super User units inherit ALL groups from ALL other units
4. **Odoo 18 Import/Export** - In Odoo 18, import and export are combined into single group (base.group_allow_export)
5. **Post-Init Hook** - Some views loaded via post_init_hook after model registration

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
