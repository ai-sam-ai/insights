# Schema: ts_debug_switch

> **Technical Truth** - Models, API endpoints, and data structures

---

## Module Overview

| Attribute | Value |
|-----------|-------|
| **Technical Name** | `ts_debug_switch` |
| **Version** | 18.0.1.0.0 |
| **Total Models** | 0 |
| **Total Controllers** | 0 |
| **Frontend Components** | 1 (OWL systray component) |

---

## Models

This module has no backend models. It is purely a frontend JavaScript component.

---

## Frontend Components

### DebugSwitch (OWL Component)

**File:** `static/src/core/debug/debug_switch.js`
**Template:** `ts_debug_switch.debugswitch`
**Registry:** systray (sequence: 2)

**Purpose:** Systray button to toggle Odoo debug mode

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `isDebug` | Boolean | Current debug mode state |
| `has_debug_access` | Boolean | User has access to see toggle |
| `orm` | Service | ORM service for group check |

**Methods:**

| Method | Purpose |
|--------|---------|
| `setup()` | Initialize component, check user access |
| `switchDebugMode()` | Toggle debug mode and reload page |

**Access Check:**
```javascript
this.orm.call("res.users", "has_group",
    [user.userId],
    {group_ext_id: 'ts_debug_switch.group_debug_switch_access'})
```

**Toggle Logic:**
```javascript
const oppositeDebug = (isDebug || isAssets || isTests) ? 0 : 1;
router.pushState({ debug: oppositeDebug }, { reload: true });
```

---

## Security Rules

### Groups

| Group XML ID | Name | Implied By |
|--------------|------|------------|
| `ts_debug_switch.group_debug_switch_access` | Show Debug Switch | base.group_user (all internal users) |

### Module Category

| XML ID | Name | Description |
|--------|------|-------------|
| `ts_debug_switch.group_debug_switch` | Debug Tool | User access for debug switch |

---

## Template Structure

### ts_debug_switch.debugswitch

```xml
<t t-if="this.has_debug_access">
    <button class="o_nav_entry" t-on-click="() => this.switchDebugMode()">
        <t t-if="isDebug">
            <i class="fa fa-toggle-on" style="color:green;"/>
        </t>
        <t t-else="">
            <i class="fa fa-toggle-off"/>
        </t>
    </button>
</t>
```

**Visual States:**
- Debug ON: Green toggle-on icon (fa-toggle-on)
- Debug OFF: Gray toggle-off icon (fa-toggle-off)

---

## Data Flow Diagram

```
┌─────────────────────────────────────┐
│        User clicks systray          │
│                                     │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│      has_debug_access check         │
│                                     │
│  res.users.has_group()              │
│  group: group_debug_switch_access   │
└───────────────┬─────────────────────┘
                │ If has access
                ▼
┌─────────────────────────────────────┐
│      switchDebugMode()              │
│                                     │
│  odoo.debug → check current state   │
│  router.pushState({ debug: X })     │
│  reload: true                       │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│        Page reloads with            │
│        ?debug=1 or ?debug=0         │
└─────────────────────────────────────┘
```

---

## Assets Bundle

**Bundle:** `web.assets_backend`

**Files loaded:**
- `ts_debug_switch/static/src/core/**/*`

This wildcard loads:
- `debug_switch.js`
- `debug_switch.xml`

---

## Debug Mode States

The component checks three debug states:

| State | Value | Meaning |
|-------|-------|---------|
| Debug | `Boolean(odoo.debug)` | Any debug mode active |
| Assets | `odoo.debug.includes("assets")` | Assets debug mode |
| Tests | `odoo.debug.includes("tests")` | Tests debug mode |

Toggle action:
- If ANY debug mode is on → turn OFF (debug=0)
- If NO debug mode is on → turn ON (debug=1)

---

## Database Tables

This module creates no database tables. Security groups are standard Odoo records.

---

## Change History

| Date | Change | By |
|------|--------|-----|
| 2025-01-26 | Initial schema documentation | CTO Module Docs Agent |
