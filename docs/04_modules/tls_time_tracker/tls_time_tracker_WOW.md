# TLS Time Tracker

## Track Every Hour, Know Every Cost

---

### The Problem You Know Too Well

Manufacturing projects need precise time tracking. Which employee worked on which project? How many hours on crane assembly vs. GL structure? What's the total labor cost?

Spreadsheets get messy. Handwritten timesheets get lost. And at payroll time, everyone's scrambling to figure out pay week allocations.

**Time tracking shouldn't be guesswork.**

---

### What If Every Hour Was Automatically Tracked?

Imagine employees logging time against specific activities - GL structure, crane assembly, installation. The system automatically calculates the pay week. Labor costs compute themselves. Projects show total hours and costs in real-time.

**That's TLS Time Tracker.**

---

### The WOW Factor

| What You Get | Why It Matters |
|--------------|----------------|
| **Activity-Based Tracking** | Know exactly where time goes - structure, assembly, installation |
| **Automatic Pay Week** | Date entered, pay week calculated |
| **Labor Cost Calculation** | Hours × rate = instant cost visibility |
| **Project Summaries** | Total hours and costs per project |
| **Activity Breakdowns** | See costs per activity type |
| **Printable Reports** | PDF reports ready for management |

---

### How It Works (The Simple Version)

1. **Employee logs time** - Select project, activity, hours
2. **System calculates** - Pay week from date, labor cost from rate
3. **Project updates** - Total hours and costs aggregate automatically
4. **Print report** - One-click PDF for management review

**Real-time visibility into where labor costs go.**

---

### Manufacturing-Specific Activities

Built for lifting equipment manufacturing:

**GL (Goods Lift) Activities:**
- Structure
- Platform
- Counter Weight
- Electrics
- Doors
- Pre Assembly
- Installation

**Crane Activities:**
- Posts/Column
- Arm
- Runways
- Assembly
- Installation

**Support Activities:**
- Improvements
- Clean Up
- Courier
- Travel
- Maintenance
- Lunch

---

### Pay Week Magic

No more counting calendars. Enter a date, get the pay week.

The system uses an adjusted calculation (date minus 3 days) to align with your payroll period. Every time entry automatically knows which pay week it belongs to.

**Payroll preparation just got simpler.**

---

### Labor Cost Transparency

Set your hourly rate once. Every time entry calculates:
- **Cost per entry** = Hours × Rate
- **Activity totals** = Sum of all entries for that activity
- **Project totals** = Complete labor cost picture

Default rate: $80/hour. Configurable in Labor Cost settings.

---

### Who Is This For?

**TLS Time Tracker is perfect for:**

- Manufacturing companies tracking project labor
- Project managers needing cost visibility
- Payroll departments allocating time to pay weeks
- Management reviewing labor efficiency

**This probably isn't for you if:**

- You don't track time against projects
- You don't need activity-level detail
- Standard Odoo timesheet is sufficient

---

### The Technical Stuff (For Those Who Care)

<details>
<summary>Click to expand technical details</summary>

- **Odoo Version:** 18.0
- **Author:** Totallifts
- **Dependencies:** base, hr, project, hr_timesheet, tls_projects, sme_project_stages
- **Models:** 10 (time tracker, job tracker, activities, time lines, labor config)

**Documentation:** [Full technical docs](tls_time_tracker_SCHEMA.md)

</details>

---

*TLS Time Tracker - A Total Lifts Custom Module*
*Version 1.2 | Odoo 18 Compatible*
