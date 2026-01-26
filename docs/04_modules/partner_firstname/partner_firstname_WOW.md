# Partner First Name and Last Name

## Finally, Names That Make Sense

---

### The Problem You Know Too Well

You open a contact record. There's one field: "Name." Is "Smith John" supposed to be last-first or first-last? When you merge data from different sources, half say "John Smith" and half say "Smith, John." And don't even think about generating personalized emails - "Dear John Smith" just feels wrong.

**One name field isn't enough.**

---

### What If Names Were Actually Structured?

Imagine entering "John" in the first name field and "Smith" in the last name field. The system shows "John Smith" (or "Smith, John" if you prefer). Export it? Both fields are there. Mail merge? "Dear John" just works. Different cultural convention? Change the setting, and all names reformat automatically.

**That's Partner First Name and Last Name.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Separate Name Fields** | First name and last name stored independently |
| **Configurable Display** | Choose "First Last", "Last First", or "Last, First" |
| **Automatic Parsing** | Existing names split intelligently on install |
| **Computed Full Name** | `name` field updates automatically |

---

### How It Works (The Simple Version)

1. **Install the module** - Existing contacts are automatically parsed
2. **Enter contacts** - Type first name and last name separately
3. **Change settings** - Pick your preferred name order
4. **Use everywhere** - Full name appears correctly throughout Odoo

**That's it.** Clean name data, finally.

---

### Real Results

| Before | After |
|--------|-------|
| "John Smith" or "Smith John"? | Clear first/last fields |
| "Dear John Smith" | "Dear John" |
| Messy imports | Structured data |
| One display format | Configurable by preference |

---

### Who Is This For?

**Partner First Name is perfect for:**

- Anyone using Odoo contacts for personalized communication
- International companies with varying name conventions
- Teams importing contact data from multiple sources
- Organizations needing clean, structured name data

**This probably isn't for you if:**

- You only deal with company names (no people)
- You don't care about name personalization
- You like guessing which part is the first name

---

### Name Order Options

Choose how names display:

| Setting | Example |
|---------|---------|
| **First Last** | John Smith |
| **Last First** | Smith John |
| **Last, First** | Smith, John |

Change it anytime - one click recalculates all contacts.

---

### Smart Name Parsing

When you install, existing names are intelligently split:

- "John Smith" → First: John, Last: Smith
- "Smith, John" → First: John, Last: Smith
- "ACME Corp" (company) → Last: ACME Corp, First: (empty)

It's not perfect for every culture, but it handles common formats well.

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0+
- **Origin:** OCA (Odoo Community Association)
- **Authors:** Camptocamp, Grupo ESOC, Tecnativa, LasLabs, ACSONE
- **Dependencies:** base_setup
- **License:** AGPL-3
- **Documentation:** [Full technical docs](partner_firstname_SCHEMA.md)

</details>

---

### Frequently Asked Questions

**Q: What happens to my existing contacts?**
A: They're automatically parsed into first/last name during installation.

**Q: Can I still edit the full name field?**
A: Yes - editing the full name splits it back into parts automatically.

**Q: Does this work with crm_lead_firstname?**
A: Yes - crm_lead_firstname depends on this module and syncs lead names to partner names.

---

### Ready for Better Name Data?

Install from the Odoo Apps menu - search for "Partner first name and last name"

---

*Partner First Name and Last Name - An OCA Module*
*Version 18.0.1.0.1 | Odoo 18 Compatible*
