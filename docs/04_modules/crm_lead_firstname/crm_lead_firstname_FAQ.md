# FAQ: crm_lead_firstname

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About CRM Lead First Name

### What is crm_lead_firstname?

crm_lead_firstname is a CRM module for Odoo 18 that adds separate first name and last name fields to leads, ensuring names sync correctly with the partner_firstname module.

**Key facts:**
- Technical name: `crm_lead_firstname`
- Current version: 18.0.0.1
- Origin: OCA (Odoo Community Association)
- Requires: Odoo 18.0+, crm, partner_firstname
- License: AGPL-3

### What does crm_lead_firstname do?

crm_lead_firstname provides 3 capabilities:

1. **Split Name Fields** - Adds contact_lastname field; repurposes contact_name as "First name"
2. **Lead-to-Partner Sync** - Passes firstname/lastname when creating partner from lead
3. **Partner-to-Lead Sync** - Pulls firstname/lastname when selecting partner on lead

### Who is crm_lead_firstname for?

crm_lead_firstname is designed for:
- Sales teams who need personalized communication
- Marketing teams doing mail merge or email campaigns
- Businesses wanting consistent name data across CRM and contacts

---

## Installation & Setup

### How do I install crm_lead_firstname?

1. First install `partner_firstname` module (required dependency)
2. Navigate to Apps menu
3. Search for "Firstname and Lastname in Leads"
4. Click Install
5. No additional configuration needed

### What are the dependencies for crm_lead_firstname?

crm_lead_firstname requires these Odoo modules:
- `crm` - Odoo CRM base module
- `partner_firstname` - OCA module that adds firstname/lastname to partners

Python libraries required:
- None

### How do I configure crm_lead_firstname?

No configuration needed. After installation:
- Lead forms automatically show "First name" and "Last name" fields
- Partner forms are enhanced with name fields (via partner_firstname)

---

## Usage

### How do I enter split names on a lead?

To enter first and last name on a lead:
1. Create or edit a CRM lead
2. Find the "First name" field (this is the contact_name field, relabeled)
3. Enter first name
4. Find the "Last name" field
5. Enter last name

### How do names sync when I convert a lead?

When converting a lead to an opportunity/partner:
1. If first name is set → creates partner with `firstname` field populated
2. If last name is set → creates partner with `lastname` field populated
3. The `name` field is computed automatically from firstname + lastname

### What happens when I select a partner on a lead?

When you select an existing partner on a lead:
1. If partner is a person (not company)
2. Partner's `firstname` copies to lead's "First name"
3. Partner's `lastname` copies to lead's "Last name"

### Can I import leads with split names?

Yes. When importing via CSV:
- Use `contact_name` column for first name
- Use `contact_lastname` column for last name

---

## Troubleshooting

### Why don't I see the Last Name field?

**Symptom:** Only "Contact Name" shows, no Last Name field

**Cause:** Module not installed or partner_firstname missing

**Solution:**
1. Check Apps > Installed > Search "firstname"
2. Ensure both `partner_firstname` and `crm_lead_firstname` are installed
3. Clear browser cache and refresh

### Why are names not syncing to partner?

**Symptom:** Lead converted but partner has full name in `name`, empty firstname/lastname

**Cause:** partner_firstname module may not be properly installed

**Solution:**
1. Verify partner_firstname is installed
2. Check partner form - should show firstname/lastname fields
3. Try creating partner manually to verify fields work

### I get field errors on partner form

**Symptom:** View errors mentioning facebook_url, linkedin_url, etc.

**Cause:** The view XML adds social media fields that may not exist in your Odoo

**Solution:**
1. These fields require additional modules or customization
2. You can remove the social media page from the view via customization
3. Or install a social media fields module

### Existing leads don't have split names

**Symptom:** Old leads still show single contact_name

**Cause:** Module doesn't retroactively split existing names

**Solution:**
1. Manually update leads
2. Or use data import to split and re-import names
3. New leads will work correctly

---

## Comparisons

### How does this compare to standard Odoo CRM?

| Feature | crm_lead_firstname | Standard Odoo |
|---------|-------------------|---------------|
| First name field | Yes (contact_name) | Yes (but full name) |
| Last name field | Yes (contact_lastname) | No |
| Partner sync | Splits to firstname/lastname | Single name field |
| Personalization | Easy | Requires parsing |

### Why use this over manual name parsing?

- Consistent data entry - users enter names the same way
- Automatic sync - no manual field mapping
- Clean data - firstname/lastname always separate
- Better UX - standard Odoo forms enhanced

---

## Integration

### Does crm_lead_firstname work with partner_firstname?

Yes - it requires partner_firstname. They work together:
- partner_firstname: adds firstname/lastname to res.partner
- crm_lead_firstname: adds sync between crm.lead and partner firstname/lastname

### Does it work with marketing automation?

Yes. With split names, you can use:
- `{{object.contact_name}}` for first name in lead templates
- `{{object.partner_id.firstname}}` for first name on linked partner

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database:
- `crm_lead` table gains `contact_lastname` column
- No external services contacted

### Can I export split names?

Yes. When exporting leads:
- Include `contact_name` for first name
- Include `contact_lastname` for last name

---

## Pricing & Licensing

### Is crm_lead_firstname free?

Yes. This is an OCA (Odoo Community Association) module licensed under AGPL-3. Free to use, modify, and distribute.

### Where does this module come from?

Original author: Antiun Ingeniería S.L. - Jairo Llopis
Maintained by: Tecnativa, OCA
Repository: https://github.com/OCA/crm

---

## Support

### Where can I get help with crm_lead_firstname?

- **OCA Repository:** https://github.com/OCA/crm
- **OCA Website:** https://odoo-community.org
- **For SAM AI deployments:** sam@sme.ec

### How do I report a bug?

1. Check OCA GitHub issues first
2. If new issue, report to https://github.com/OCA/crm/issues
3. Include Odoo version, module version, steps to reproduce

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Social media fields may error | Open | Remove social media page or add field module |
| Existing leads not split | By design | Manual update or import |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.0.1 | 2024 | Odoo 18 port |
| 16.0.1.0.0 | 2022 | Previous stable |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
