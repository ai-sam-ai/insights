# TLS Time Tracker Website

## Time Entry Without the Login Hassle

---

### The Problem You Know Too Well

Your manufacturing team needs to log their hours. But they're on the floor, not at desks. Asking them to log into Odoo, navigate menus, and fill out forms? Good luck.

Some use their phones. Some forget. Some write on paper that gets lost.

**Time tracking shouldn't require IT training.**

---

### What If Anyone Could Submit Time From Any Device?

Imagine a simple web page. No login. Pick your name, pick your project, enter your hours, done. Works on phones, tablets, workshop computers.

Click "Start My Day" when you arrive. Click "End My Day" when you leave. The system captures timestamps automatically.

**That's TLS Time Tracker Website.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Public Form at /job-tracker** | No login required - anyone can access |
| **Start/End Day Buttons** | Capture exact arrival and departure |
| **Project + Activity Selection** | Guided choices prevent errors |
| **Instant Email Notification** | Managers know immediately |
| **Daily Team Summary** | Automated email with everyone's hours |
| **Weekly Individual Report** | Each employee gets their hours summary |
| **Training Video Embedded** | New employees learn right on the form |

---

### How It Works (The Simple Version)

1. **Go to /job-tracker** - Open browser on any device
2. **Select your name** - Dropdown of employees
3. **Pick project and activity** - Filtered to show relevant options
4. **Click "Start My Day"** - Captures timestamp
5. **Enter hours and description** - Simple form fields
6. **Click "End My Day"** - Captures end timestamp
7. **Submit** - Done! Manager gets notified

**No passwords. No training. Just click and submit.**

---

### Automatic Email Reports

**Daily Team Summary:**
- Sent to managers every day
- Shows hours logged by each employee
- Flags who updated (or didn't)

**Weekly Individual Report:**
- Sent to each employee
- Their hours for the week
- Total hours calculated

**Never chase people for timesheets again.**

---

### Smart Filtering

Not all projects need tracking. Not all employees submit their own time.

**Projects:** Only those marked "Show In Timesheet" appear
**Employees:** Only those marked "Display Show" appear
**Activities:** Filtered by project type selection

**Less confusion. Fewer mistakes.**

---

### Who Is This For?

**TLS Time Tracker Website is perfect for:**

- Manufacturing teams on the floor
- Field workers with smartphones
- Any team that needs simple time entry
- Managers who want automated reports

**This probably isn't for you if:**

- You need full Odoo login security
- Your team is already in Odoo all day
- You don't trust public-facing forms

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0
- **Author:** Totallifts
- **Dependencies:** base, project, tls_time_tracker, web, website
- **Public URL:** /job-tracker
- **Auth:** Public (no login)
- **Cron Jobs:** 2 (daily team, weekly individual)

**Documentation:** [Full technical docs](tls_time_tracker_website_SCHEMA.md)

</details>

---

*TLS Time Tracker Website - A Total Lifts Custom Module*
*Version 1.21 | Odoo 18 Compatible*
