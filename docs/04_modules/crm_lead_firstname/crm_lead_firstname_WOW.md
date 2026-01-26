# CRM Lead First Name

## Finally, Know Your Leads by Name - First AND Last

---

### The Problem You Know Too Well

You get a new lead. Their name is "John Smith." You enter it in one field. Later, you want to send a personalized email: "Dear John" - but Odoo doesn't know which part is the first name. So you end up with awkward "Dear John Smith" or worse, you're manually splitting names in spreadsheets.

**Names shouldn't be this hard.**

---

### What If Names Just Worked?

Imagine entering "John" in the first name field and "Smith" in the last name. When you convert that lead to a contact, the names stay separate. Your email templates can say "Dear {{firstname}}" and it just works.

**That's CRM Lead First Name.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Separate Name Fields** | Enter first and last name independently |
| **Automatic Sync** | Names flow correctly to contacts |
| **Partner Integration** | Select a contact and names populate automatically |
| **Cleaner Data** | Better segmentation and personalization |

---

### How It Works (The Simple Version)

1. **Create a lead** - Enter first name and last name separately
2. **Convert to contact** - Names automatically become partner firstname/lastname
3. **Select existing contact** - Their first/last names populate the lead

**That's it.** No manual splitting. No copy-paste errors. Just clean name data.

---

### Real Results

| Before | After |
|--------|-------|
| "John Smith" in one field | "John" + "Smith" in separate fields |
| Manual name parsing | Automatic name sync |
| Generic "Dear Customer" | Personalized "Dear John" |

---

### Who Is This For?

**CRM Lead First Name is perfect for:**

- Sales teams doing personalized outreach
- Marketing teams running mail merge campaigns
- Anyone who wants clean, usable contact data

**This probably isn't for you if:**

- You only deal with company names
- You don't use Odoo CRM
- You enjoy parsing names manually

---

### Part of a Name-Aware System

This module works with `partner_firstname` to create a complete solution:

| Module | What It Does |
|--------|--------------|
| **partner_firstname** | Split names on contacts/partners |
| **crm_lead_firstname** | Split names on leads (syncs with above) |

**Together, names stay clean from first contact to loyal customer.**

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Origin:** OCA (Odoo Community Association)
- **Dependencies:** crm, partner_firstname
- **License:** AGPL-3
- **Documentation:** [Full technical docs](crm_lead_firstname_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: Do I need partner_firstname too?**
A: Yes. This module extends partner_firstname to work with CRM leads.

**Q: What happens to existing leads?**
A: Existing leads keep their current contact_name. You can manually split names or update via import.

**Q: Does it work with lead-to-opportunity conversion?**
A: Yes. When you convert a lead, the firstname/lastname are passed to the created partner.

---

### Ready for Better Name Data?

Install from the Odoo Apps menu - search for "Firstname and Lastname in Leads"

---

*CRM Lead First Name - An OCA Module by Tecnativa*
*Version 18.0.0.1 | Odoo 18 Compatible*
