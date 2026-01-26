# FAQ: bbb_employee_to_user

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Create User from Employee

### What is bbb_employee_to_user?

bbb_employee_to_user is a Human Resources module for Odoo 18 that creates user accounts directly from employee records with a single click.

**Key facts:**
- Technical name: `bbb_employee_to_user`
- Current version: 18.0.0.0
- Requires: Odoo 18.0+, hr module
- License: AGPL-3

### What does bbb_employee_to_user do?

bbb_employee_to_user provides 3 capabilities:

1. **User Creation** - Creates a res.users record from hr.employee data with one click
2. **User Archiving** - Disables user access while preserving employee record
3. **User Reactivation** - Restores archived user accounts without recreating them

### Who is bbb_employee_to_user for?

bbb_employee_to_user is designed for:
- HR managers who need to provision system access for employees
- Companies using Odoo HR module who want streamlined onboarding
- Businesses that need to manage temporary/seasonal worker access

---

## Installation & Setup

### How do I install bbb_employee_to_user?

1. Ensure Odoo 18.0+ is running with HR module installed
2. Navigate to Apps menu
3. Search for "Create a user from an employee"
4. Click Install
5. No additional configuration needed - buttons appear automatically

### What are the dependencies for bbb_employee_to_user?

bbb_employee_to_user requires this Odoo module:
- `hr` - Odoo Human Resources base module

Python libraries required:
- None (uses base Odoo libraries only)

### How do I configure bbb_employee_to_user?

No configuration needed. After installation:
1. Go to Employees menu
2. Open any employee form
3. New buttons appear in the header automatically

---

## Usage

### How do I create a user from an employee?

To create a user from an employee:
1. Go to Employees > Employees
2. Open the employee's form view
3. Click "Link to a user" button in the header
4. User is created instantly with employee's work email as login

### How do I archive a user link?

To disable an employee's system access:
1. Open the employee's form view
2. Click "Archive user" button (visible when user exists)
3. User and their partner are set to inactive

### How do I reactivate an archived user?

To restore a previously archived user:
1. Open the employee's form view
2. Click "Active user" button (visible when user_archived=True)
3. User and partner are reactivated with original settings

### Can I use this for bulk user creation?

No. This module is designed for individual user creation via form buttons. For bulk operations, you would need custom development or use Odoo's import feature.

---

## Troubleshooting

### Why is the "Link to a user" button not appearing?

**Symptom:** Button is missing from employee form

**Cause:** Employee already has a linked user (is_user=True) or had one archived (user_archived=True)

**Solution:**
1. Check if "Archive user" or "Active user" button appears instead
2. If neither appears, check the employee record's is_user and user_archived fields via developer mode

### Why did user creation fail?

**Symptom:** Error when clicking "Link to a user"

**Cause:** Usually missing work email on employee record

**Solution:**
1. Ensure employee has a work email set (this becomes the login)
2. Ensure work email is unique (not used by another user)
3. Check Odoo logs for specific error message

### User was created but can't log in

**Symptom:** User exists but login fails

**Cause:** Password not set - new users have no password by default

**Solution:**
1. Go to Settings > Users
2. Find the new user
3. Click "Change Password" or send password reset email

### Why is the partner showing as archived?

**Symptom:** Employee's partner/contact is inactive after archiving user

**Cause:** The archive_user_link method deactivates both user AND partner

**Solution:**
1. This is intentional behavior
2. If partner is used elsewhere, manually reactivate it in Contacts
3. Or use "Active user" button to restore both

---

## Comparisons

### How does this compare to manual user creation?

| Feature | bbb_employee_to_user | Manual Creation |
|---------|---------------------|-----------------|
| Data entry | Automatic | Manual typing |
| Employee linking | Automatic | Manual selection |
| Time required | 5 seconds | 2-5 minutes |
| Error potential | Low | Higher |
| Bulk creation | No | No (without import) |

### Why not use Odoo's built-in employee-user linking?

Odoo 18's native hr module allows linking existing users to employees, but doesn't create users FROM employees. This module adds that capability - create the employee first, then generate the user with one click.

---

## Integration

### Does bbb_employee_to_user work with hr_contract?

Yes. This module only extends hr.employee and res.users. It doesn't interfere with contracts, timesheets, or other HR modules.

### Does it work with multi-company setups?

Yes, but the user is created in the current company context. For multi-company user access, additional configuration may be needed after creation.

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database in standard Odoo tables (hr_employee, res_users, res_partner). No external services are contacted.

### Can I export user-employee linkage data?

Yes. Export from:
- hr.employee list view (includes is_user, user_archived fields)
- res.users list view (includes employee_id, is_employee fields)

### What happens when I uninstall the module?

The added fields (is_user, user_archived, employee_id, is_employee) will be removed. Existing user accounts remain but lose their employee linkage tracking.

---

## Pricing & Licensing

### Is bbb_employee_to_user free?

Yes. bbb_employee_to_user is licensed under AGPL-3. You can use, modify, and distribute it freely under the terms of that license.

### Do I need any subscriptions?

No. This module has no external dependencies or subscription requirements.

---

## Support

### Where can I get help with bbb_employee_to_user?

- **Original Author:** BBB
- **For SAM AI deployments:** sam@sme.ec
- **Community:** Odoo forums and GitHub issues

### How do I report a bug?

1. Check Known Issues below first
2. Document steps to reproduce
3. Include Odoo version and module version
4. Report to module maintainer or SAM AI support

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| No password set on creation | By design | Manually set password or send reset email |
| Partner archived with user | By design | Manually reactivate if needed elsewhere |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.0.0 | 2024 | Initial Odoo 18 release |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
