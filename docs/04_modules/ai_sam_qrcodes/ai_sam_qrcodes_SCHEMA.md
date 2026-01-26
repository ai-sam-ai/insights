# Schema: ai_sam_qrcodes

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ai_sam_qrcodes` |
| **Version** | 18.0.3.0.1 |
| **Total Models** | 2 (1 regular, 1 transient) |
| **Total Controllers** | 1 |
| **API Endpoints** | 2 |

---

## Models

### ai.qr.code (Primary Model)

**Purpose:** Stores QR code configurations and generated images

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | Char | Yes | Display name to identify this QR code |
| `url` | Char | Yes | URL or text to encode in the QR code |
| `qr_color` | Char | No | Color of QR code in hex format (default: #000000) |
| `background_color` | Char | No | Background color in hex format (default: #FFFFFF) |
| `logo_image` | Binary | No | Logo image to place in center of QR code |
| `logo_filename` | Char | No | Original filename of uploaded logo |
| `box_size` | Integer | No | Size of each box in QR code grid (default: 10) |
| `border` | Integer | No | Border size around the QR code (default: 4) |
| `qr_image` | Binary | No | Generated QR code image (readonly) |
| `qr_filename` | Char | No | Computed filename for download |
| `label_text` | Char | No | Text label for print (max 50 chars) |
| `label_position` | Selection | No | Label position: 'top' or 'bottom' (default: bottom) |
| `label_font_size` | Integer | No | Font size for label text in points (default: 12) |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `_generate_qr_code()` | Generates QR image from configuration | None (updates qr_image field) |
| `_compute_qr_filename()` | Computes safe filename from name | Sets qr_filename |
| `create()` | Override to auto-generate QR on create | Created record(s) |
| `write()` | Override to regenerate QR on relevant field changes | Boolean |

**Automatic Regeneration Triggers:**
The QR code regenerates automatically when any of these fields change:
- `url`, `qr_color`, `background_color`, `logo_image`
- `box_size`, `border`, `label_text`, `label_position`, `label_font_size`

---

### ai.qr.code.print.wizard (Transient Model)

**Purpose:** Wizard for batch print preview of QR codes

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `qr_code_ids` | Many2many | Yes | Selected QR codes to print |
| `columns` | Selection | Yes | QR codes per row: '1' (centered), '2', '3', '4' (default: 3) |

**Key Methods:**
| Method | Purpose | Returns |
|--------|---------|---------|
| `default_get()` | Pre-populates selected QR codes from context | Dict |
| `action_print_preview()` | Opens print preview in new window | URL action |

---

## Controllers / API Endpoints

### HTTP Endpoints

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/ai_sam_qrcodes/download/<int:qr_id>` | GET | user | Download QR code as PNG file |
| `/ai_sam_qrcodes/print_preview` | GET | user | Render A4 print preview HTML page |

### Download QR Code

**Route:** `/ai_sam_qrcodes/download/<int:qr_id>`

**Parameters:**
- `qr_id` (path, int): ID of the ai.qr.code record

**Response:**
- Success: PNG image file with Content-Disposition header
- Error: 404 Not Found if record doesn't exist or has no image

### Print Preview

**Route:** `/ai_sam_qrcodes/print_preview`

**Parameters:**
- `wizard_id` (query, int): ID of the print wizard

**Response:**
- Success: HTML page with A4 print layout
- Error: 404 Not Found if wizard doesn't exist

**Print Layout Calculations:**
- A4 dimensions: 210mm x 297mm
- Page margins: 10mm
- Gap between QR codes: 5mm
- Single centered: 150mm QR size
- Multiple columns: Calculated to fit evenly

---

## Request/Response Examples

### GET /ai_sam_qrcodes/download/1

**Request:**
```http
GET /ai_sam_qrcodes/download/1 HTTP/1.1
Cookie: session_id={session}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="My_QR_Code_qr.png"
Content-Length: 12345

[Binary PNG data]
```

### GET /ai_sam_qrcodes/print_preview?wizard_id=5

**Request:**
```http
GET /ai_sam_qrcodes/print_preview?wizard_id=5 HTTP/1.1
Cookie: session_id={session}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
<!-- A4 print preview with embedded QR codes as base64 images -->
</html>
```

---

## Data Relationships Diagram

```
┌─────────────────────────┐
│     ai.qr.code          │
│                         │
│  - name                 │
│  - url                  │
│  - qr_color             │
│  - background_color     │
│  - logo_image           │
│  - box_size             │
│  - border               │
│  - qr_image (generated) │
│  - label_text           │
│  - label_position       │
│  - label_font_size      │
└──────────┬──────────────┘
           │
           │ Many2many (via print wizard)
           ▼
┌─────────────────────────────┐
│ ai.qr.code.print.wizard     │
│        (Transient)          │
│                             │
│  - qr_code_ids (M2M)        │
│  - columns                  │
└─────────────────────────────┘
```

---

## Security Rules

| Model | Group | Read | Write | Create | Delete |
|-------|-------|------|-------|--------|--------|
| `ai.qr.code` | base.group_user | Yes | Yes | Yes | Yes |
| `ai.qr.code.print.wizard` | base.group_user | Yes | Yes | Yes | Yes |

---

## Database Tables

| Table Name | Model | Purpose |
|------------|-------|---------|
| `ai_qr_code` | `ai.qr.code` | Stores QR code configurations and generated images |
| `ai_qr_code_print_wizard` | `ai.qr.code.print.wizard` | Temporary storage for print wizard sessions |

---

## QR Code Generation Details

**Library Configuration:**
```python
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # High correction (30%)
    box_size=self.box_size or 10,
    border=self.border or 4,
)
```

**Logo Overlay:**
- Maximum logo size: 30% of QR code dimensions
- Logo is centered with white background padding
- Uses Pillow LANCZOS resampling for quality

**Label Text:**
- Font priority: Arial > DejaVuSans > Default
- Label padding: 20px
- Text is centered below/above QR code
- Font size multiplied by 3 for print quality

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2026-01-26 | Initial schema documentation | Claude |
