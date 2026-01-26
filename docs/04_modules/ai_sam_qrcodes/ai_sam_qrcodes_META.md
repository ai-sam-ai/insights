# Module: ai_sam_qrcodes

> **Agent Intelligence File** - Read this FIRST for routing and context

---

## Identity

| Field | Value |
|-------|-------|
| **Technical Name** | `ai_sam_qrcodes` |
| **Version** | 18.0.3.0.1 |
| **Source Path** | `D:\github_repos\06_samai_extras\ai_sam_qrcodes` |
| **Manifest** | `D:\github_repos\06_samai_extras\ai_sam_qrcodes\__manifest__.py` |
| **Documentation** | `D:\github_repos\30_samai_saas_host_management\samai_software_documentation\docs\04_modules\ai_sam_qrcodes\` |
| **Online URL** | https://sme.ec/documentation/modules/ai-sam-qrcodes |
| **Status** | Active |
| **Last Verified** | 2026-01-26 |

---

## Quick Summary

ai_sam_qrcodes is a standalone QR code generator with custom branding capabilities for Odoo 18. It enables users to create QR codes from URLs or text, customize colors and add center logos, generate printable labels, and download the results as PNG files. The module includes a print preview wizard for batch printing QR codes on A4 paper.

---

## Dependencies

### Odoo Module Dependencies
- `base`

### Python Libraries Required
- `qrcode` - QR code generation library
- `Pillow` - Image processing for logos and labels

---

## For End Users (What Can This Do For Me?)

- Create custom-branded QR codes with your company logo in seconds
- Choose your own colors to match your brand identity
- Add text labels above or below QR codes for print materials
- Download QR codes as PNG files for use anywhere
- Print multiple QR codes on A4 paper with configurable layouts

---

## For Developers (Technical Reference)

| Component | Count | Details |
|-----------|-------|---------|
| Models | 2 | 1 regular (ai.qr.code), 1 transient (ai.qr.code.print.wizard) |
| Controllers | 1 | 2 HTTP routes (download, print_preview) |
| Views | 3 | form, tree, search views + print wizard |
| JS Files | 1 | qr_generator.js |
| Security Rules | 2 | Full CRUD for base.group_user |

**Key Files:**
- `models/qr_code.py` - Main QR code model with generation logic
- `models/qr_print_wizard.py` - Transient wizard for batch print
- `controllers/qr_controller.py` - HTTP routes for download and print preview

---

## Agent Instructions

### When to Use This Knowledge
- User asks about: QR code, QR generator, barcode, scan code, quick response
- User wants to: create QR codes, generate QR codes, customize QR colors, add logo to QR
- User mentions: print QR codes, download QR, branded QR, marketing materials

### Related Agents
- `/cto-developer` - Implementation and bug fixes
- `/sam` - End-user guidance on QR code usage

### Delegate To
- `/cto` - for architecture decisions about this module
- `/cto-developer` - for implementation work
- `/docker` - for container deployment issues with Python dependencies

---

## Cross-References

### Related Documentation
- Parent Repo: `D:\github_repos\06_samai_extras\`

### Related Modules
- `ai_sam_creatives` - May use QR codes in marketing materials
- `ai_sam_email_marketing` - QR codes for email campaigns

---

## Known Gotchas (Painfully Learned)

1. **Font Loading** - Label text requires fonts; falls back to default if Arial/DejaVuSans not available. On Docker containers, ensure fonts are installed.
2. **Logo Size Limit** - Logos are automatically scaled to max 30% of QR code size to maintain scannability.
3. **Error Correction Level** - Uses HIGH error correction (ERROR_CORRECT_H) which allows more damage/logo overlay but creates denser codes.

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

**Last Verification:** 2026-01-26 by Claude

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial creation | Claude |
