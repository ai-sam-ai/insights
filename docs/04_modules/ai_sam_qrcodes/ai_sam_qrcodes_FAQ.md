# FAQ: ai_sam_qrcodes

> **Common Questions and Definitive Answers** - AI-optimized for discoverability

---

## About QR Code Generator

### What is ai_sam_qrcodes?

ai_sam_qrcodes is a Productivity module for Odoo 18 that generates custom QR codes with branding capabilities. It is part of the SAM AI ecosystem developed by SME.ec.

**Key facts:**
- Technical name: `ai_sam_qrcodes`
- Current version: 18.0.3.0.1
- Requires: Odoo 18.0+, Python 3.10+, `qrcode` library, `Pillow` library
- License: LGPL-3

### What does ai_sam_qrcodes do?

ai_sam_qrcodes provides 5 key capabilities:

1. **QR Code Generation** - Create QR codes from any URL or text content
2. **Custom Branding** - Add custom colors and center logos to match your brand
3. **Print Labels** - Add text labels above or below QR codes for print materials
4. **Batch Printing** - Print multiple QR codes on A4 paper with configurable layouts
5. **Download as PNG** - Export high-quality PNG files instantly

### Who is ai_sam_qrcodes for?

ai_sam_qrcodes is designed for:
- Marketing teams who need branded QR codes for promotional materials
- Event organizers creating badges, tickets, or check-in materials
- Businesses linking physical products to digital content
- Anyone who needs professional QR codes without external services

---

## Installation & Setup

### How do I install ai_sam_qrcodes?

1. Ensure Odoo 18.0+ is running
2. Install Python dependencies: `pip install qrcode Pillow`
3. Navigate to Apps menu
4. Search for "QR Code Generator"
5. Click Install

No additional configuration required after installation.

### What are the dependencies for ai_sam_qrcodes?

ai_sam_qrcodes requires these Odoo modules:
- `base` - Core Odoo functionality

Python libraries required:
- `qrcode` - For generating QR codes
- `Pillow` - For image processing (logos, labels)

### How do I configure ai_sam_qrcodes?

No configuration needed! After installation:
1. Go to the QR Codes menu (appears in main menu)
2. Click "Create" to make your first QR code
3. Enter URL, customize colors, add logo if desired
4. Save and download

---

## Usage

### How do I create a QR code?

To create a QR code:
1. Navigate to QR Codes menu
2. Click "Create"
3. Enter a name (for your reference) and URL/text
4. Optionally customize colors, add logo, or set label text
5. Click "Save" - QR code generates automatically
6. Click "Download QR Code" to get the PNG file

### How do I customize QR code colors?

To customize colors:
1. Open the QR code form
2. Find "QR Color" field - click to open color picker
3. Select your desired QR code color (supports hex values)
4. Find "Background Color" field - click to open color picker
5. Select background color
6. Save - QR code regenerates with new colors

### How do I add a logo to my QR code?

To add a center logo:
1. Open the QR code form
2. In the "Branding" section, click the logo upload field
3. Upload your logo image (PNG, JPG, etc.)
4. Save - logo is automatically centered and sized

**Note:** Logos are automatically scaled to max 30% of QR code size to maintain scannability.

### How do I print multiple QR codes?

To batch print QR codes:
1. Go to QR Codes list view
2. Select multiple QR codes using checkboxes
3. Click Action menu > "Print Preview"
4. Choose layout: 1 (large centered), 2, 3, or 4 per row
5. Click "Preview" to see A4 layout
6. Use browser print function (Ctrl+P / Cmd+P)

### Can I add text labels to QR codes?

Yes. ai_sam_qrcodes supports text labels for print:
1. Open the QR code form
2. In "Print Label" section:
   - Enter label text (max 50 characters)
   - Choose position: Top or Bottom
   - Set font size
3. Save - label appears in the QR code image

---

## Troubleshooting

### Why isn't my QR code generating?

**Symptom:** QR Code Preview shows nothing after saving

**Cause:** Usually missing Python dependencies

**Solution:**
1. Check Odoo logs for errors
2. Install dependencies: `pip install qrcode Pillow`
3. Restart Odoo server
4. Try saving the QR code again

### Why is my logo not appearing in the QR code?

**Symptom:** Uploaded logo but QR code shows without it

**Cause:** Image format issue or corrupted file

**Solution:**
1. Try a different image format (PNG works best)
2. Ensure image isn't too small (at least 100x100 pixels recommended)
3. Re-upload the logo
4. Save the record

### Why does my QR code not scan?

**Symptom:** Phone camera won't read the QR code

**Cause:** Usually color contrast or logo too large

**Solution:**
1. Ensure QR color contrasts with background (dark on light works best)
2. If using a logo, try removing it to test
3. Increase box_size for larger, more scannable codes
4. Test with multiple QR scanner apps

### Module not working after upgrade. What do I do?

After upgrading Odoo or ai_sam_qrcodes:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart Odoo server
3. Upgrade module: Apps > QR Code Generator > Upgrade
4. If issues persist, check Odoo logs for errors

---

## Technical Questions

### What error correction level does the QR code use?

ai_sam_qrcodes uses **ERROR_CORRECT_H** (High), which allows approximately 30% of the code to be damaged/covered while still being readable. This is why logos can be placed in the center.

### What is the maximum logo size?

Logos are automatically scaled to a maximum of 30% of the QR code dimensions. This maintains scannability while allowing visible branding.

### What fonts are used for labels?

Font priority:
1. Arial (Windows)
2. DejaVuSans (Linux)
3. Default system font (fallback)

On Docker containers, ensure fonts are installed or labels may use a basic font.

### What image format is the output?

QR codes are generated and downloaded as **PNG** files with RGBA color support (transparency capable).

---

## Comparisons

### How does ai_sam_qrcodes compare to online QR generators?

| Feature | ai_sam_qrcodes | Online Generators |
|---------|----------------|-------------------|
| Custom colors | Yes | Sometimes |
| Logo overlay | Yes | Often paid |
| No watermarks | Yes | Often paid |
| History tracking | Yes (in Odoo) | No |
| Batch printing | Yes | Rarely |
| Data privacy | Your server | Third party |
| Subscription needed | No | Often yes |

### Why choose ai_sam_qrcodes over online tools?

ai_sam_qrcodes provides advantages:
- **Privacy** - Your data stays on your server
- **History** - All QR codes saved and searchable in Odoo
- **No watermarks** - Professional output, always
- **Batch printing** - Print sheets of QR codes easily
- **Integration** - Lives where your business already works

---

## Integration

### Does ai_sam_qrcodes work with other SAM AI modules?

Yes. While ai_sam_qrcodes is standalone, QR codes can be used in:
- Marketing materials created with ai_sam_creatives
- Email campaigns via ai_sam_email_marketing
- Any module that needs QR code images

### Can I use the QR code images in other Odoo modules?

Yes. The `qr_image` field is a standard Odoo Binary field containing base64-encoded PNG data. You can reference it from other models using standard Odoo relationships.

---

## Data & Privacy

### Where is my data stored?

All data is stored in your Odoo PostgreSQL database. ai_sam_qrcodes does not send data to external servers. QR code generation happens entirely on your server.

### Can I export my QR codes?

Yes. You can:
- Download individual QR codes as PNG files
- Export the list via Odoo's built-in export
- Access images via the download controller endpoint

### How do I delete QR code data?

To remove QR codes:
1. Go to QR Codes list view
2. Select records to delete
3. Action > Delete

Uninstalling the module will delete all ai_qr_code table data.

---

## Pricing & Licensing

### Is ai_sam_qrcodes free?

ai_sam_qrcodes is licensed under LGPL-3. It is free to use, modify, and distribute according to the license terms.

### Do I need a SAM AI subscription?

No. ai_sam_qrcodes is standalone and does not require any subscription or external service.

---

## Support

### Where can I get help with ai_sam_qrcodes?

- **Documentation:** https://sme.ec/documentation/modules/ai-sam-qrcodes
- **Email:** sam@sme.ec
- **Author:** Anthony Gardiner (anthony@sme.ec)

### How do I report a bug?

1. Check if the issue is documented in this FAQ
2. Email anthony@sme.ec with:
   - Module version (18.0.3.0.1)
   - Odoo version
   - Steps to reproduce
   - Error messages from Odoo logs

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Fonts missing in Docker | Known | Install fonts in container: `apt-get install fonts-dejavu` |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 18.0.3.0.1 | 2025-01 | Current version with label support |

---

*Last updated: 2026-01-26*
*Part of SAM AI by SME.ec*
