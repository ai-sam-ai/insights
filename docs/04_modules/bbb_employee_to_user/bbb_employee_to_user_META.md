# Module: bbb_employee_to_user

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `bbb_employee_to_user` |
| **Version** | 18.0.0.0 |
| **Source Path** | `D:\github_repos\05_samai_business_environment\bbb_employee_to_user` |
| **Manifest** | `D:\github_repos\05_samai_business_environment\bbb_employee_to_user\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\bbb_employee_to_user\` |
| **Online URL** | https://sme.ec/documentation/modules/bbb-employee-to-user |
| **Status** | Active |
| **Last Verified** | 2025-01-26 |

---

## Quick Summary

bbb_employee_to_user is a Human Resources utility module that creates Odoo user accounts directly from employee records. It adds buttons to the employee form allowing HR managers to instantly provision system access for employees, archive user links, or reactivate archived users - all without leaving the employee profile.

---

## Dependencies

### Odoo Module Dependencies
- `hr` - Odoo Human Resources base module

### Python Libraries Required
- None additional (uses base Odoo)

---

## For End Users (What Can This Do For Me?)

- Create a login account for any employee with one click
- Automatically copies employee name, email, and photo to the new user
- Archive/disable user access while keeping employee record intact
- Reactivate previously archived users without recreating them
- Links user and employee records bidirectionally for easy navigation

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | hr.employee (inherit), res.users (inherit) |
| Controllers | 0 | None |
| Views | 2 | Form view extensions |
| JS Files | 0 | None |
| Security Rules | 0 | Uses inherited permissions |

**Key Files:**
- `models/hr.py` - Employee model extension with user creation logic
- `models/users.py` - User model extension with employee link fields
- `views/hr_views.xml` - Buttons on employee form
- `views/res_users_views.xml` - Employee info display on user form

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: creating users from employees, employee user provisioning, HR user management
- User wants to: give employees system access, link employees to users, archive user accounts
- User mentions: employee to user, create user from employee, HR onboarding

### Related Agents
- `/cto-developer` - For customization or bug fixes
- `/mod_sam` - For integration with SAM AI core

### Delegate To
- `/cto` - For architecture decisions about user provisioning
- `/cto-developer` - For implementation changes

---

## Cross-References

### Related Documentation
- Parent Module: None (standalone utility)

### Related Modules
- `hr` - Core HR module this extends
- `base` - Odoo base (res.users model)

---

## Known Gotchas (Painfully Learned)

1. **Email Required** - User creation uses `work_email` as login - employees without work email will fail
2. **Sudo Creation** - Users are created with sudo() which bypasses access rights - intentional for HR workflow
3. **Partner Linking** - Creates/links partner record automatically - may cause duplicates if partner already exists
4. **Archive vs Delete** - Archiving user also archives the partner record - may affect other partner usages

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
