# FAQ: sam_ai_customization

> **Searchable Q&A** - Common questions for discoverability

---

## General Questions

### What is SAM AI Customization Suite?
A two-part toolkit for customizing Odoo without code: View Customizer for drag-and-drop field placement, and Report Builder for visual PDF report design.

### What Odoo version is required?
Odoo 18.0 or later.

### Is this a SAM AI original module?
Yes, developed by SAM AI as part of the SAM AI ecosystem.

### What license is it under?
LGPL-3 (open source).

---

## View Customizer Questions

### How do I add a field to a view?
Click the systray icon (when View Customizer is enabled), find the field in the sidebar, and drag it to the desired position in the form/list/kanban view.

### Can I add fields to list views?
Yes, View Customizer works with form, list (tree), and kanban views.

### Can I create new custom fields?
Yes, Managers can create new x_* fields through the New Field dialog. The fields are created on the model and can then be added to views.

### What happens when I click Apply?
The system generates an inherited ir.ui.view with XPath expressions that add your fields to the base view. The view cache is cleared and changes appear immediately.

### Can I undo changes?
Yes, there's undo/redo support before applying. After applying, you can revert to remove the inherited view entirely.

### Can I export my customizations?
Yes, use the Export XML feature to download your customizations for backup or migration to another database.

### Why did my customization fail?
Most failures occur when the XPath expression doesn't match any element in the base view. This can happen if the base view structure changed. Check the error_message field on the customizer record.

### Is it company-scoped?
Yes, each customization set is tied to a specific company, allowing different customizations per company in multi-company setups.

---

## Report Builder Questions

### How do I create a new report?
Go to SAM Customization > Report Templates > Create. Name it, select the target model (e.g., account.move for invoices), then click "Open Visual Builder".

### What elements can I add to reports?
- Static Text
- Dynamic Fields (from the model)
- Images (field-based, static, or company logo)
- Tables (for line items like invoice lines)
- Lines (horizontal/vertical separators)
- Rectangles/Boxes
- Barcodes (Code128, EAN13, QR Code, etc.)
- Page Numbers

### How do I add invoice line items?
Add a Table element, set the "Table Source Field" to the line items field (e.g., `invoice_line_ids`), and configure columns in JSON format.

### Can I use company logo?
Yes, add an Image element, set Image Source to "Company Logo", and it will automatically use the current company's logo.

### How do I preview the report?
First click "Generate Report" to create the QWeb template and report action, then click "Preview PDF". It will render with data from an actual record in the system.

### What if there are no records to preview?
You need at least one record in the target model to preview. Create a test record first.

### Can I duplicate a template?
Yes, use the "Duplicate Template" action to create a copy you can modify.

### What paper formats are supported?
Any Odoo paper format. Default is A4 (794x1123 pixels at 96 DPI). You can also configure custom margins.

### Can I replace the standard Odoo invoice report?
Yes, enable "Replace Standard Report" on the template. This deactivates the original and uses yours instead.

---

## Security Questions

### Who can use View Customizer?
Three permission levels:
- **User**: Can add existing fields to views
- **Manager**: Can create new custom fields
- **Administrator**: Can delete customizations and views

### Who can design reports?
Same three-tier system:
- **User**: Can view report templates
- **Manager**: Can create and edit report templates
- **Administrator**: Full access including deletion

### Can users break the system?
The module includes protections:
- XPath validation before apply
- Preview before committing
- Revert capability
- Company scoping

---

## Troubleshooting

### My view customization isn't showing
1. Check that state is "applied" not "draft" or "error"
2. Clear browser cache
3. Check that the inherited_view_id exists
4. Verify company context matches

### The XPath doesn't match
XPath expressions are validated against the current combined view. If other modules have changed the base view structure, your XPath may no longer match. Try re-creating the customization.

### Report preview is blank
1. Ensure state is "active" (Generate Report was clicked)
2. Ensure at least one record exists in target model
3. Check browser console for JavaScript errors

### QWeb template has errors
Check the generated QWeb in the qweb_view_id field. Common issues:
- Invalid field names
- Missing required fields on the model
- Syntax errors in visibility conditions

### Performance is slow
Large numbers of customizations or complex reports can slow down view rendering. Consider:
- Limiting number of customizations per view
- Simplifying report element count
- Using style presets instead of inline styles

---

## Integration Questions

### Does it work with other SAM AI modules?
Yes, you can customize views for any installed module, including other SAM AI modules.

### Can I version control customizations?
Export as XML and commit to your repository. Import to restore.

### Does it affect module upgrades?
Customizations are separate from module code, so they survive module upgrades. However, if a base view structure changes significantly, customizations may need updating.

---

## Search Keywords

view customizer, drag and drop fields, custom fields, x_fields, report builder, pdf reports, qweb designer, visual editor, no-code customization, xpath generator, inherited views, report templates, invoice layout, form customization, list view fields, kanban customization, export xml, import customization

---

## Related Documentation

- [META - Module Overview](sam_ai_customization_META.md)
- [SCHEMA - Technical Reference](sam_ai_customization_SCHEMA.md)
- [WOW - Feature Highlights](sam_ai_customization_WOW.md)
