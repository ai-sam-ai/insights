# FAQ: tls_biz

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is TLS Business Model?
A simple customization module that adds Google Drive folder links and Google Maps links to CRM leads, contacts, and projects in Odoo.

### What does TLS stand for?
Total Lifting Solutions - the client this module was originally developed for.

### What Odoo version is required?
Odoo 18.0 or later.

### What license is it under?
AGPL-3.0 (open source).

---

## Feature Questions

### What fields does this add?
- `google_folder` on CRM leads, contacts, and projects
- `google_map` on contacts only
- `payment_term` on CRM leads only

### Where do I see these fields?
- **Contacts:** After the VAT field in the form view
- **CRM Leads:** After the phone field in the form view
- **Projects:** After the partner/customer field in the form view

### How do I add a Google Drive link?
1. Open the record (contact, lead, or project)
2. Find the "Client/Supplier Folder" field
3. Paste the Google Drive folder URL
4. Save the record

### How do I add a Google Maps link?
1. Open a contact record
2. Find the "Google Map" field
3. Paste the Google Maps URL
4. Save the record

### Are the links clickable?
Yes, all URL fields use the URL widget which makes them clickable. Clicking opens in a new browser tab.

---

## CRM Lead Questions

### Why is there a path shown on CRM leads?
The CRM view includes a hardcoded reference to the Total Lifts Google Drive structure:
"This PC/Google Drive (G:)/Shared drives/Sales, and Operations/Total Lifting Solutions/"

This helps users understand where in the folder structure to paste from.

### What is the payment term field for?
Allows sales to capture agreed payment terms directly on the lead, before converting to an opportunity or customer.

---

## Technical Questions

### Does this require Google authentication?
No, it's just storing URLs. Users still need Google Drive access to open the folders.

### What dependency is project_customer_view?
This is another custom module that must be installed for tls_biz to work. It provides project view customizations.

### Are there any security rules?
No custom security rules. The module uses the inherited permissions from base, crm, and project modules.

### Can I customize the hardcoded path in CRM?
Yes, edit `views/tls_crm.xml` and modify the static text in the label/div section.

---

## Troubleshooting

### The fields don't appear
1. Make sure the module is installed
2. Check that dependencies are installed (crm, project, project_customer_view)
3. Clear browser cache and refresh

### Links don't work
1. Check that you have access to the Google Drive folder
2. Ensure the URL is complete and correct
3. Try opening the URL directly in a browser first

### Payment term field is empty
The payment term field links to `account.payment.term` model. Make sure you have payment terms configured in Invoicing settings.

---

## Search Keywords

tls_biz, google drive, google folder, google map, client folder, supplier folder, total lifts, tls, google link, drive url, payment term crm, project folder

---

## Related Documentation

- [META - Module Overview](tls_biz_META.md)
- [SCHEMA - Technical Reference](tls_biz_SCHEMA.md)
- [WOW - Feature Highlights](tls_biz_WOW.md)
