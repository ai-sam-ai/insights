# SAM AI Installer - Complete Process Checklist

> **Document Version:** 1.0
> **Created:** 2026-01-11
> **Purpose:** Master checklist for tracking and fixing all installer process steps
> **CTO Agent:** Infrastructure diagnostic and documentation

---

## Quick Reference: Process Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PHASE A: BUILD TIME                                  │
│                     (Developer runs BUILD.bat)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  A1: BUILD.bat                                                               │
│       │                                                                      │
│       ├──► A2: discover_modules.ps1                                          │
│       │         ├──► A2.1: Load paths_config.ps1                             │
│       │         ├──► A2.2: Scan module repos                                 │
│       │         └──► A2.3: Generate temp_modules.iss                         │
│       │                                                                      │
│       └──► A3: ISCC.exe compiles build_new_exe_file.iss                      │
│                 ├──► A3.1: Load paths_config.iss                             │
│                 ├──► A3.2: Pre-compilation validation                        │
│                 ├──► A3.3: Include temp_modules.iss                          │
│                 └──► A3.4: Bundle all files → EXE                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PHASE B: INSTALL TIME                                │
│                      (User runs the EXE)                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  B1: PrepareToInstall (kill existing processes)                              │
│       │                                                                      │
│       └──► B2: File Extraction (Python, PostgreSQL, Odoo, modules)           │
│                 │                                                            │
│                 └──► B3: ssPostInstall (main installation logic)             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PHASE C: POST-INSTALL                                   │
│                   (ssPostInstall - Critical Phase)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  C1: Launch HTTP Server (port 5000)                                          │
│  C2: Open Welcome Page                                                       │
│  C3: CHECKPOINT 1 - InitializePostgreSQL ◄─── INTERNAL PASCAL                │
│       ├── C3.1: Find available port (5432-5442)                              │
│       ├── C3.2: initdb.exe (create cluster)                                  │
│       ├── C3.3: Configure postgresql.conf                                    │
│       ├── C3.4: Configure pg_hba.conf                                        │
│       ├── C3.5: Register PostgreSQL-SAMAI service                            │
│       ├── C3.6: Start PostgreSQL service                                     │
│       ├── C3.7: CREATE USER sam_ai_user        ◄─── FAILURE POINT            │
│       └── C3.8: CREATE DATABASE sam_ai         ◄─── FAILURE POINT            │
│  C4: ConfigureOdooConf (replace placeholders)                                │
│  C5: CHECKPOINT 3 - InitializeOdoo ◄─── INTERNAL PASCAL                      │
│       ├── C5.1: Smart database drop check                                    │
│       └── C5.2: python odoo-bin -i base                                      │
│  C6: CHECKPOINT 4 - RegisterOdooService ◄─── INTERNAL PASCAL                 │
│       ├── C6.1: Verify PyWin32                                               │
│       ├── C6.2: python samai_service.py install                              │
│       └── C6.3: Start Odoo-SAMAI service                                     │
│  C7: CHECKPOINT 5 - Module Installation ◄─── EXTERNAL PS1 SCRIPT             │
│       └── C7.1: 05_install_default_modules.ps1                               │
│  C8: Write setup_complete.json                                               │
│  C9: Save installation_log.txt                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PHASE A: BUILD TIME CHECKLIST

### A1: BUILD.bat (Entry Point)
| Item | Status | File Location | Notes |
|------|--------|---------------|-------|
| [ ] BUILD.bat exists | | `build_new_exe_file\BUILD.bat` | |
| [ ] Can execute without errors | | | Run from command line |
| [ ] /SKIP_DISC flag works | | | Optional: skip discovery |

### A2: Module Discovery (discover_modules.ps1)
| Item | Status | File Location | Notes |
|------|--------|---------------|-------|
| [ ] Script exists | | `scripts\discover_modules.ps1` | |
| [ ] paths_config.ps1 exists | | `scripts\paths_config.ps1` | **MACHINE-SPECIFIC** |
| [ ] paths_config.ps1 has correct BaseRepoPath | | | Currently: `H:\GitHub` |
| [ ] SAM AI Brain repo path valid | | `$BaseRepoPath\04-samai-brain` | |
| [ ] SAM AI Core repo path valid | | `$BaseRepoPath\05-samai-core` | |
| [ ] temp_modules.iss generated | | `temp\temp_modules.iss` | Check after running |
| [ ] temp_modules.txt generated | | `temp\temp_modules.txt` | Module list for Odoo |
| [ ] Module count > 0 | | | **CRITICAL** |

#### A2 Fix Checklist (If No Modules Found):
| Item | Status | Action |
|------|--------|--------|
| [ ] Update BaseRepoPath | | Change to your actual repo location |
| [ ] Update SAMAIModuleRepos array | | Add/remove repos as needed |
| [ ] Verify __manifest__.py exists | | Each module folder needs this |
| [ ] Check installable flag | | Must NOT be `'installable': False` |

### A3: ISS Compilation (build_new_exe_file.iss)
| Item | Status | File Location | Notes |
|------|--------|---------------|-------|
| [ ] paths_config.iss exists | | `build_new_exe_file\paths_config.iss` | **MACHINE-SPECIFIC** |
| [ ] Python bundle path valid | | `{PythonPath}` variable | ~350MB |
| [ ] PostgreSQL path valid | | `{PostgreSQLPath}` variable | ~250MB |
| [ ] Odoo server path valid | | `{OdooServerPath}` variable | ~500MB |
| [ ] Odoo core modules path valid | | `{OdooCoreModulesPath}` variable | 15 modules |
| [ ] Odoo 18 standard modules path valid | | `{Odoo18StandardModulesPath}` variable | 641+ apps |
| [ ] Pre-compilation validation passes | | Lines 180-291 | All ✓ messages |
| [ ] temp_modules.iss included | | Line 389 | `#include "temp\temp_modules.iss"` |
| [ ] EXE file generated | | `Output\SAMAI_Business_Management_Software.exe` | |

---

## PHASE B: INSTALL TIME CHECKLIST

### B1: PrepareToInstall
| Item | Status | ISS Location | Notes |
|------|--------|--------------|-------|
| [ ] KillExistingProcesses runs | | Lines 1948-1985 | Stops services, kills Python |
| [ ] Odoo-SAMAI service stopped | | Line 1959 | `net stop Odoo-SAMAI` |
| [ ] PostgreSQL-SAMAI service stopped | | Line 1962 | `net stop PostgreSQL-SAMAI` |
| [ ] Python processes killed | | Lines 1967-1968 | `taskkill /F /IM python.exe` |
| [ ] Port 5000 cleared | | Line 1977 | HTTP server cleanup |
| [ ] Port 8069 cleared | | Line 1978 | Odoo cleanup |

### B2: File Extraction
| Item | Status | ISS Location | Notes |
|------|--------|--------------|-------|
| [ ] Python extracted to {app}\python | | Line 372 | ~350MB |
| [ ] PostgreSQL extracted to {app}\postgresql | | Line 375 | ~250MB |
| [ ] Odoo extracted to {app}\server | | Line 378 | ~500MB |
| [ ] odoo.conf copied | | Line 379 | Template with placeholders |
| [ ] Core modules extracted | | Line 382 | 15 base modules |
| [ ] Standard modules extracted | | Line 386 | App catalog |
| [ ] SAM AI modules extracted | | Line 389 | From temp_modules.iss |
| [ ] Scripts deployed | | Lines 398-420 | All .ps1 and .py files |
| [ ] Assets deployed | | Lines 423-424 | Icons, HTML |

---

## PHASE C: POST-INSTALL CHECKLIST (Critical)

### C1-C2: Welcome Page
| Item | Status | ISS Location | Notes |
|------|--------|--------------|-------|
| [ ] LaunchAutoLoginServer runs | | Lines 1668-1672 | Port 5000 |
| [ ] Welcome page opens | | Line 1679 | http://localhost:5000/ |

### C3: CHECKPOINT 1 - PostgreSQL Initialization
| Item | Status | ISS Location | Log Evidence | Notes |
|------|--------|--------------|--------------|-------|
| [ ] FindAvailablePostgreSQLPort | | Lines 687-724 | `[SELECTED] PostgreSQL will use port XXXX` | |
| [ ] Port stored in PostgreSQLPort variable | | Line 899 | | Global variable |
| [ ] initdb.exe runs | | Lines 930-943 | `[OK] Database cluster created` | |
| [ ] postgresql.conf configured | | Lines 962-974 | `[OK] postgresql.conf configured` | |
| [ ] pg_hba.conf md5 rule added | | Lines 976-1000 | `[OK] md5 authentication rule added` | |
| [ ] PostgreSQL-SAMAI registered | | Lines 1005-1051 | `[OK] Service registered` | |
| [ ] PostgreSQL-SAMAI started | | Lines 1063-1079 | `[OK] Service started` | |
| [ ] **sam_ai_user created** | | Lines 1082-1128 | `[VERIFIED] User sam_ai_user created` | **CRITICAL** |
| [ ] **sam_ai database created** | | Lines 1130-1166 | `[VERIFIED] Database sam_ai created` | **CRITICAL** |

#### C3 Failure Diagnostics:
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| No `02_database_setup.log` | Script not called | User/DB created by Pascal, not PS1 |
| `role "sam_ai_user" does not exist` | C3.7 failed silently | Check postgres password = "postgres" |
| `database "sam_ai" does not exist` | C3.8 skipped | C3.7 must succeed first |
| Service running but no user/db | Connection issue | Verify port matches, password correct |

### C4: Configure odoo.conf
| Item | Status | ISS Location | Notes |
|------|--------|--------------|-------|
| [ ] __INSTALL_DIR__ replaced | | Lines 777-782 | With actual install path |
| [ ] __POSTGRESQL_PORT__ replaced | | Lines 786-791 | With detected port |
| [ ] __DATABASE_NAME__ replaced | | Lines 794-799 | With "sam_ai" |
| [ ] __ODOO_PORT__ replaced | | Lines 802-807 | With "8069" |

### C5: CHECKPOINT 3 - Odoo Initialization
| Item | Status | ISS Location | Log Evidence | Notes |
|------|--------|--------------|--------------|-------|
| [ ] Prerequisites verified | | Lines 1295-1322 | `[OK] All prerequisites verified` | |
| [ ] python odoo-bin -i base runs | | Lines 1332-1354 | `[OK] Odoo initialization completed` | 5-10 min |
| [ ] Database verified | | Lines 1358-1377 | `[VERIFIED] Database sam_ai exists` | |
| [ ] Base module verified | | Lines 1379-1391 | `[VERIFIED] Base module installed` | |

#### C5 Failure Diagnostics:
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Connection to the database failed` | C3.7/C3.8 didn't run | Run 02_setup_database.ps1 manually |
| Exit code non-zero | Python/Odoo error | Check odoo.log for details |
| ir_module_module not found | Odoo didn't initialize | Re-run with `--stop-after-init` |

### C6: CHECKPOINT 4 - Odoo Service Registration
| Item | Status | ISS Location | Log Evidence | Notes |
|------|--------|--------------|--------------|-------|
| [ ] PyWin32 verified | | Lines 1431-1447 | `[OK] PyWin32 available` | |
| [ ] Existing service removed | | Lines 1453-1470 | `[OK] Existing service removed` | If exists |
| [ ] samai_service.py install runs | | Lines 1475-1491 | `[OK] Odoo service installed` | |
| [ ] Auto startup configured | | Lines 1493-1501 | `[OK] Service set to automatic` | |
| [ ] Odoo-SAMAI started | | Lines 1506-1515 | `[OK] Odoo service started` | |

### C7: CHECKPOINT 5 - Module Installation (EXTERNAL PS1)
| Item | Status | ISS Location | Log File | Notes |
|------|--------|--------------|----------|-------|
| [ ] ExecutePowerShellScript called | | Lines 1842-1843 | | |
| [ ] 05_install_default_modules.ps1 runs | | `{app}\scripts\` | `05_install_modules.log` | |
| [ ] Base module state = "installed" | | | `[OK] Base module is installed` | |
| [ ] Available modules counted | | | `[INFO] Available: X modules` | |
| [ ] Modules installed | | | `[OK] Installed: X` | |
| [ ] Odoo-SAMAI restarted | | | `[OK] Odoo service started` | |

#### C7 Failure Diagnostics:
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `role "sam_ai_user" does not exist` | C3.7 never ran | Run CREATE USER manually |
| `Please run Step 3 first` | Base module not installed | Run C5 (odoo-bin -i base) |
| `0 modules available` | Modules not discovered | Check addons_path in odoo.conf |

### C8-C9: Completion
| Item | Status | ISS Location | Notes |
|------|--------|--------------|-------|
| [ ] setup_complete.json written | | Lines 815-831 | `{app}\sam\assets\` |
| [ ] installation_log.txt saved | | Lines 552-566 | `{app}\installation_log.txt` |

---

## EXTERNAL PS1 SCRIPTS STATUS

| Script | Deployed To | Called By Installer? | Purpose |
|--------|-------------|---------------------|---------|
| 00_patch_missing_categories.ps1 | {app}\scripts\ | ❌ NO | Patch enterprise module categories |
| 01_check_postgresql_service.ps1 | {app}\scripts\ | ❌ NO | Verify PostgreSQL service |
| 02_setup_database.ps1 | {app}\scripts\ | ❌ NO | Create user + database |
| 03_initialize_odoo.ps1 | {app}\scripts\ | ❌ NO | Initialize Odoo base |
| 04_register_odoo_service.ps1 | {app}\scripts\ | ❌ NO | Register Odoo service |
| **05_install_default_modules.ps1** | {app}\scripts\ | **✅ YES** | Install SAM AI modules |

**Note:** Scripts 00-04 are deployed but NOT called. Their functionality is duplicated in the internal Pascal code (InitializePostgreSQL, InitializeOdoo, RegisterOdooService functions).

---

## KNOWN ISSUES & FIXES

### Issue 1: No SAM AI Modules Bundled
**Symptom:** temp_modules.iss is empty or missing
**Cause:** paths_config.ps1 points to wrong location
**Fix:**
```powershell
# Edit scripts\paths_config.ps1
$BaseRepoPath = "D:\your\actual\repo\path"  # Update this

$SAMAIModuleRepos = @(
    @{ Name = "SAM AI Brain"; Folder = "04-samai-brain"; Priority = 1 },
    @{ Name = "SAM AI Core"; Folder = "05-samai-core"; Priority = 2 }
)
```

### Issue 2: sam_ai_user Not Created
**Symptom:** `role "sam_ai_user" does not exist` in logs
**Cause:** Pascal code (C3.7) failed silently - postgres password mismatch
**Fix (Manual):**
```powershell
$env:PGPASSWORD = "postgres"
& "C:\Program Files\SAM AI\postgresql\bin\psql.exe" -U postgres -h localhost -p 5433 -d postgres -c "CREATE USER sam_ai_user WITH PASSWORD 'samai_secure_pass' CREATEDB;"
```

### Issue 3: sam_ai Database Not Created
**Symptom:** `database "sam_ai" does not exist`
**Cause:** C3.8 skipped because C3.7 failed
**Fix (Manual):**
```powershell
$env:PGPASSWORD = "samai_secure_pass"
& "C:\Program Files\SAM AI\postgresql\bin\createdb.exe" -U sam_ai_user -h localhost -p 5433 -E UTF8 -O sam_ai_user -T template0 -l C sam_ai
```

### Issue 4: Odoo Not Initialized
**Symptom:** No ir_module_module table
**Cause:** C5 failed or skipped
**Fix (Manual):**
```powershell
& "C:\Program Files\SAM AI\python\python.exe" "C:\Program Files\SAM AI\server\odoo-bin" -c "C:\Program Files\SAM AI\server\odoo.conf" -d sam_ai -i base --stop-after-init
```

### Issue 5: Port Conflicts
**Symptom:** PostgreSQL won't start, port already in use
**Cause:** Another PostgreSQL instance on same port
**Fix:** The installer auto-detects (5432-5442), but check:
```powershell
netstat -ano | findstr ":5432 :5433 :5434"
```

---

## LOG FILES REFERENCE

| Log File | Location | Created By | Contains |
|----------|----------|------------|----------|
| installation_log.txt | {app}\ | ISS Pascal code | All checkpoint messages |
| odoo.log | {app}\logs\ | Odoo | Database/module errors |
| 01_postgresql_check.log | {app}\logs\ | PS1 script (if called) | Service check |
| 02_database_setup.log | {app}\logs\ | PS1 script (if called) | User/DB creation |
| 03_odoo_init.log | {app}\logs\ | PS1 script (if called) | Base module init |
| 04_service_register.log | {app}\logs\ | PS1 script (if called) | Odoo service |
| 05_install_modules.log | {app}\logs\ | PS1 script | Module installation |

---

## DIAGNOSTIC SCRIPT

Run this on a failed installation to identify issues:

```powershell
# Location: {app}\scripts\DIAGNOSE_SAMAI_INSTALL_v2.ps1
# Or download from installer repo

.\DIAGNOSE_SAMAI_INSTALL_v2.ps1
```

Output saved to: `Desktop\SAMAI_Diagnostic_v2_YYYYMMDD_HHMMSS.txt`

---

## ARCHITECTURE DECISION: Pascal vs PS1 Scripts

**Current State:**
- Steps C3-C6 use **Internal Pascal** code in ISS
- Step C7 uses **External PS1** script
- PS1 scripts 00-04 are deployed but NOT called

**Options for Future:**

| Option | Pros | Cons |
|--------|------|------|
| **Keep Pascal (Current)** | All in one file, no external deps | Hard to test, debug, maintain |
| **Switch to PS1 Scripts** | Testable, modular, reusable | More files, potential execution issues |
| **Hybrid (Current)** | Best of both | Confusing, duplicate logic |

**Recommendation:** Either go full Pascal OR full PS1, not both.

---

## QUICK FIX COMMANDS

### Complete Manual Installation (After File Extraction)
```powershell
# Run as Administrator
cd "C:\Program Files\SAM AI"

# Step 1: Create user
$env:PGPASSWORD = "postgres"
.\postgresql\bin\psql.exe -U postgres -h localhost -p 5433 -d postgres -c "CREATE USER sam_ai_user WITH PASSWORD 'samai_secure_pass' CREATEDB;"

# Step 2: Create database
$env:PGPASSWORD = "samai_secure_pass"
.\postgresql\bin\createdb.exe -U sam_ai_user -h localhost -p 5433 -E UTF8 -O sam_ai_user -T template0 -l C sam_ai

# Step 3: Initialize Odoo
.\python\python.exe .\server\odoo-bin -c .\server\odoo.conf -d sam_ai -i base --stop-after-init

# Step 4: Install modules
.\scripts\05_install_default_modules.ps1 -InstallDir "C:\Program Files\SAM AI" -Database "sam_ai"

# Step 5: Start service
Start-Service Odoo-SAMAI
```

---

## CHECKLIST SIGN-OFF

| Phase | Verified By | Date | Notes |
|-------|-------------|------|-------|
| Phase A: Build Time | | | |
| Phase B: Install Time | | | |
| Phase C: Post-Install | | | |
| End-to-End Test | | | |

---

*Document maintained by CTO Agent. Update after each sprint or significant change.*
