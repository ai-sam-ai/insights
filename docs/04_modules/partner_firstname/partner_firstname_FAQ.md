# FAQ: partner_firstname

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About Partner First Name

### What is partner_firstname?

partner_firstname is an OCA module for Odoo 18 that adds separate firstname and lastname fields to contacts (res.partner), making the name field computed from these parts.

**Key facts:**
- Technical name: `partner_firstname`
- Current version: 18.0.1.0.1
- Origin: OCA (Odoo Community Association)
- Authors: Camptocamp, Grupo ESOC, Tecnativa, LasLabs, ACSONE
- License: AGPL-3

### What does partner_firstname do?

partner_firstname provides 4 capabilities:

1. **Split Name Fields** - Adds firstname and lastname fields to contacts
2. **Computed Full Name** - The name field is computed from firstname + lastname
3. **Configurable Order** - Choose First-Last, Last-First, or Last-comma-First
4. **Automatic Migration** - Existing names parsed on installation

### Who is partner_firstname for?

partner_firstname is designed for:
- Companies needing structured contact data
- Organizations doing personalized communication
- Teams importing data from multiple sources
- Anyone wanting cleaner name handling

---

## Installation & Setup

### How do I install partner_firstname?

1. Ensure Odoo 18.0+ is running
2. Navigate to Apps menu
3. Search for "Partner first name and last name"
4. Click Install
5. Existing contacts are automatically parsed

### What are the dependencies for partner_firstname?

partner_firstname requires this Odoo module:
- `base_setup` - Odoo base settings

Python libraries required:
- None

### How do I configure name order?

After installation:
1. Go to Settings > General Settings
2. Find "Partner names order" setting
3. Choose: First Last, Last First, or Last, First
4. Click "Recalculate Names" if you change it

---

## Usage

### How do I enter a contact with split names?

To enter a contact:
1. Go to Contacts
2. Create new contact
3. The form shows First Name and Last Name fields
4. Enter each part separately
5. Full name computes automatically

### Can I still edit the full name?

Yes. If you edit the full name field directly:
1. The module parses it back into parts
2. Based on configured name order
3. Both firstname and lastname update

### How are company names handled?

For companies (is_company = True):
- The full company name goes to `lastname`
- `firstname` remains empty
- This is by design - companies don't have first/last names

### How does name parsing work?

The module guesses based on your configured order:

**If order is "First Last":**
- "John Smith" → First: John, Last: Smith
- First word = firstname, rest = lastname

**If order is "Last, First":**
- "Smith, John" → First: John, Last: Smith
- Split on comma

**If order is "Last First":**
- "Smith John" → First: John, Last: Smith
- First word = lastname, rest = firstname

---

## Troubleshooting

### Names parsed incorrectly after installation

**Symptom:** Some names have first/last swapped

**Cause:** Name format didn't match configured order

**Solution:**
1. Manually fix affected records
2. Or change name order setting and recalculate
3. Complex names (middle names, suffixes) may need manual review

### "Empty names" error when saving

**Symptom:** Error saying contact requires a name

**Cause:** Neither firstname nor lastname provided for a contact-type partner

**Solution:**
1. Enter at least one of firstname or lastname
2. This validation applies to contacts, not addresses

### Full name not updating

**Symptom:** Changed firstname/lastname but name stays same

**Cause:** Computed field cache issue

**Solution:**
1. Save the record
2. Refresh the page
3. Name should update

### Name order change didn't apply

**Symptom:** Changed setting but names still show old format

**Cause:** Need to recalculate names after changing order

**Solution:**
1. Go to Settings > General Settings
2. Find "Partner names order"
3. Click "Recalculate Names" button
4. All partner names will be recomputed

---

## Comparisons

### How does this compare to standard Odoo?

| Feature | partner_firstname | Standard Odoo |
|---------|-------------------|---------------|
| First name field | Yes | No |
| Last name field | Yes | No |
| Name order config | Yes | No |
| Personalization | Easy | Difficult |

### Does this replace the name field?

No. The name field still exists and displays everywhere. It's just computed from firstname + lastname instead of being directly editable (for persons).

---

## Integration

### Does partner_firstname work with crm_lead_firstname?

Yes. crm_lead_firstname depends on this module. Together they:
- Split names on leads
- Sync lead names to partner firstname/lastname when converting
- Pull partner firstname/lastname to lead when selecting partner

### Does it work with imports?

Yes. When importing:
- Import firstname and lastname columns directly
- Or import name column - it will be parsed
- Best practice: import firstname/lastname separately for accuracy

### Does it work with LDAP/Active Directory?

Yes, with caveats:
- LDAP may provide names in various formats
- Module includes handling for UTF-8 encoded strings
- Results depend on how names are stored in LDAP

---

## Data & Privacy

### Where is my data stored?

Data is stored in your Odoo PostgreSQL database:
- `res_partner` table gains `firstname` and `lastname` columns
- Both columns are indexed for search performance

### Can I export firstname/lastname?

Yes. When exporting contacts:
- firstname and lastname are available as export fields
- Export both for clean data migration

### What happens when I uninstall?

If you uninstall:
- firstname and lastname columns are removed
- Existing `name` field values remain
- You lose the structured name data

---

## Pricing & Licensing

### Is partner_firstname free?

Yes. This is an OCA (Odoo Community Association) module licensed under AGPL-3.

### Where can I get the source?

- OCA GitHub: https://github.com/OCA/partner-contact
- Odoo Apps Store

---

## Support

### Where can I get help with partner_firstname?

- **OCA Repository:** https://github.com/OCA/partner-contact
- **OCA Website:** https://odoo-community.org
- **Maintainers:** Camptocamp, Acsone
- **For SAM AI deployments:** sam@sme.ec

### How do I report a bug?

1. Check OCA GitHub issues first
2. If new issue, report to https://github.com/OCA/partner-contact/issues
3. Include Odoo version, module version, steps to reproduce

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Middle names not separated | By design | Goes into firstname or lastname |
| Suffixes (Jr., PhD) may parse incorrectly | By design | Manual correction needed |
| Non-Western name formats | Varies | May need manual correction |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.1.0.1 | 2024 | Odoo 18 port |
| 16.0.1.0.0 | 2022 | Previous stable |

---

*Last updated: 2025-01-26*
*Documentation by CTO Module Docs Agent*
