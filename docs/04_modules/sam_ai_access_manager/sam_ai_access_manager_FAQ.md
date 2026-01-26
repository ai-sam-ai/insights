# FAQ: sam_ai_access_manager

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About SAM AI Access Manager

### What is sam_ai_access_manager?

sam_ai_access_manager is an Administration module that simplifies Odoo's permission system by introducing Business Units - human-readable department groupings with pre-configured access templates.

**Key facts:**
- Technical name: `sam_ai_access_manager`
- Current version: 18.0.1.2.0
- Author: SAM AI
- License: LGPL-3

### What does sam_ai_access_manager do?

sam_ai_access_manager provides 5 capabilities:

1. **Business Units** - Department-based permission groupings
2. **Visual Access Summary** - See what each user can do
3. **Quick Permission Toggles** - Import/Export, Debug checkboxes
4. **Protected Groups** - Prevent accidental lockouts
5. **Confirmation Wizard** - Review before bulk changes

### Who is sam_ai_access_manager for?

sam_ai_access_manager is designed for:
- System administrators managing multiple users
- Companies with department-based access needs
- Organizations wanting clearer permission management

---

## Installation & Setup

### How do I install sam_ai_access_manager?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "SAM AI Access Manager"
4. Click Install
5. Menu appears under Settings > Access Manager

### What are the dependencies for sam_ai_access_manager?

sam_ai_access_manager requires these Odoo modules:
- `base` - Odoo base
- `mail` - For change tracking

### How do I configure sam_ai_access_manager?

After installation:
1. Go to Settings > Access Manager > Business Units
2. Create units (Sales, Accounts, etc.)
3. Add Odoo groups to each unit
4. Assign users to units
5. Click "Apply to Users" to sync

---

## Usage

### How do I create a Business Unit?

1. Go to Settings > Access Manager > Business Units
2. Click Create
3. Enter name (e.g., "Sales Department")
4. Add groups in "Access Groups" tab
5. Add users in "Users" tab
6. Save

### How do I assign users to a Business Unit?

Two ways:
1. **From Business Unit:** Edit unit > Users tab > Add users
2. **From User:** Edit user > Business Units field > Add units

Note: Adding users does NOT automatically apply permissions.

### How do I apply permissions to users?

After assigning users to a unit:
1. Open the Business Unit
2. Click "Apply to Users" button
3. Confirm in the wizard
4. Groups are added to all users in the unit

### What is a Super User unit?

A Super User unit is a special Business Unit where:
- `is_super_user = True`
- Users automatically inherit ALL groups from ALL other units
- Useful for system administrators

### How do I see what a user can access?

1. Open the user record
2. Look at "Access Summary" field
3. Shows: Business Units, Quick Permissions, Total Groups

Or click "View All Groups" to see detailed list.

---

## Troubleshooting

### Users don't have expected permissions

**Symptom:** User assigned to unit but missing access

**Cause:** Permissions not applied after assignment

**Solution:**
1. Open the Business Unit
2. Click "Apply to Users" button
3. Permissions will sync

### "Apply to Users" shows errors

**Symptom:** Partial success message with errors

**Cause:** Some users couldn't be updated (permissions, database issues)

**Solution:**
1. Check Odoo logs for specific errors
2. Verify all users are active
3. Try applying to individual users

### Can't remove Internal User group

**Symptom:** User still has Internal User after removal attempt

**Cause:** This is a protected group - by design

**Solution:**
This is correct behavior. Internal User (base.group_user) is protected to prevent lockouts. You cannot remove it via this module.

### Import/Export checkbox doesn't work

**Symptom:** Checking import/export has no effect

**Cause:** The underlying group (base.group_allow_export) may not exist

**Solution:**
1. Verify Odoo 18 is installed
2. Check if base.group_allow_export exists
3. The module handles Odoo 18's combined import/export group

---

## Comparisons

### How does this compare to standard Odoo permissions?

| Feature | sam_ai_access_manager | Standard Odoo |
|---------|----------------------|---------------|
| Grouping | Business Units | Individual groups |
| Visual summary | Yes | No |
| Bulk apply | Yes | Manual per user |
| Protected groups | Yes | No |
| Confirmation wizard | Yes | No |

### Can I use both approaches?

Yes. Business Units work alongside standard Odoo groups. You can:
- Use Business Units for department access
- Add individual groups for exceptions
- Both coexist without conflict

---

## Integration

### Does this work with other SAM AI modules?

Yes. sam_ai_access_manager is part of the SAM AI ecosystem and integrates with:
- ai_sam - Ask SAM about permissions
- ai_sam_base - SAM remembers access patterns

### Can I automate permission assignment?

The module deliberately avoids auto-apply for safety. However, you can:
- Call `action_apply_to_users()` programmatically
- Use `action_sync_from_business_units()` on users
- Build automated jobs if needed

---

## Data & Privacy

### Where is permission data stored?

Data is stored in your Odoo PostgreSQL database:
- `sam_business_unit` - Business unit definitions
- `business_unit_user_rel` - User assignments
- Standard `res_groups_users_rel` - Actual permissions

### Is there an audit trail?

Yes. The module uses `mail.thread` for tracking:
- Business unit changes are logged
- Permission applications are logged to Odoo logs
- Check logs for `[ACCESS-MANAGER]` entries

---

## Pricing & Licensing

### Is sam_ai_access_manager free?

Yes. Licensed under LGPL-3 as part of SAM AI.

---

## Support

### Where can I get help?

- **Website:** https://sam-ai.com
- **Email:** sam@sme.ec
- **Documentation:** [Technical docs](sam_ai_access_manager_SCHEMA.md)

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Post-init hook for computed fields | By design | Views load after model registration |
| No auto-apply on save | By design | Click "Apply to Users" explicitly |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.2.0 | 2025-01 | Added confirmation wizard, protected groups |
| 18.0.1.0.0 | 2024 | Initial release |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
