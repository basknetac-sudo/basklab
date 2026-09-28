# BaskLab — Migration Verification Checklist

> Run through this checklist after completing the migration to verify everything works correctly.

---

## 1. Original Application Integrity

Verify the original app at its existing Netlify URL (or local `basketball/index.html`) is completely untouched.

| # | Check | Status |
|---|-------|--------|
| 1.1 | Original `basketball/index.html` has NOT been modified | ⬜ |
| 1.2 | Original Firebase config still points to `hoops-coach-a28a0` | ⬜ |
| 1.3 | Original app loads and displays the dashboard | ⬜ |
| 1.4 | Original app shows correct student count | ⬜ |
| 1.5 | Original app shows correct batch count | ⬜ |
| 1.6 | Original app attendance page works normally | ⬜ |
| 1.7 | Original app payments page works normally | ⬜ |

---

## 2. Clone Configuration Safety

| # | Check | Status |
|---|-------|--------|
| 2.1 | Clone `index.html` does NOT contain original Firebase credentials | ⬜ |
| 2.2 | Clone imports config from `firebase-config.js` | ⬜ |
| 2.3 | `firebase-config.js` has NEW project credentials (not the original) | ⬜ |
| 2.4 | `.env.example` exists with placeholder values only | ⬜ |
| 2.5 | `.gitignore` excludes `firebase-config.js` and `.env` | ⬜ |
| 2.6 | Clone shows error if configured with original project ID | ⬜ |
| 2.7 | Clone shows error if `firebase-config.js` has empty/placeholder values | ⬜ |

---

## 3. Export Verification

| # | Check | Status |
|---|-------|--------|
| 3.1 | `export.html` page loads without errors | ⬜ |
| 3.2 | Export requires explicit "Start Export Backup" button click | ⬜ |
| 3.3 | Export progress bar and log display correctly | ⬜ |
| 3.4 | All 4 collections exported: students, batches, attendance, payments | ⬜ |
| 3.5 | Export manifest shows document counts for each collection | ⬜ |
| 3.6 | JSON backup file downloads with correct filename | ⬜ |
| 3.7 | Backup JSON contains `__meta.format: "basklab-backup-v1"` | ⬜ |
| 3.8 | Backup JSON contains `__meta.sourceProjectId: "hoops-coach-a28a0"` | ⬜ |
| 3.9 | Every document has `__docId` and `__path` fields | ⬜ |
| 3.10 | Timestamps are serialized as `{ __type: "Timestamp", seconds, nanoseconds }` | ⬜ |
| 3.11 | No student personal data appears in browser console | ⬜ |
| 3.12 | Failed collections (if any) are clearly reported in the manifest | ⬜ |

---

## 4. Import Verification

| # | Check | Status |
|---|-------|--------|
| 4.1 | `import.html` page loads without errors | ⬜ |
| 4.2 | File upload accepts only `.json` files | ⬜ |
| 4.3 | Invalid/non-backup JSON files are rejected | ⬜ |
| 4.4 | Backup file info displays correctly after loading | ⬜ |
| 4.5 | Firebase config form requires API Key, Auth Domain, Project ID, App ID | ⬜ |
| 4.6 | Import REFUSES to proceed if target project ID = `hoops-coach-a28a0` | ⬜ |
| 4.7 | Import REFUSES to proceed if target project ID = backup source project | ⬜ |
| 4.8 | Dry-run mode previews without writing data | ⬜ |
| 4.9 | Real import writes documents to the new project | ⬜ |
| 4.10 | Import respects document ID preservation | ⬜ |
| 4.11 | Import skips existing documents when overwrite is unchecked | ⬜ |
| 4.12 | Import overwrites existing documents when overwrite IS checked | ⬜ |
| 4.13 | Import manifest shows written/skipped/failed counts per collection | ⬜ |
| 4.14 | Failed imports are clearly reported | ⬜ |

---

## 5. Data Integrity

Compare between original and clone after import. Record the actual counts:

| # | Metric | Original | Clone | Match? |
|---|--------|----------|-------|--------|
| 5.1 | Total students | ___ | ___ | ⬜ |
| 5.2 | Active plan students | ___ | ___ | ⬜ |
| 5.3 | Expired plan students | ___ | ___ | ⬜ |
| 5.4 | Paid students | ___ | ___ | ⬜ |
| 5.5 | Unpaid students | ___ | ___ | ⬜ |
| 5.6 | On Hold students | ___ | ___ | ⬜ |
| 5.7 | Discontinued students | ___ | ___ | ⬜ |
| 5.8 | Total batches | ___ | ___ | ⬜ |
| 5.9 | Total attendance records (from export manifest) | ___ | ___ | ⬜ |
| 5.10 | Total payment records (from export manifest) | ___ | ___ | ⬜ |
| 5.11 | Student → Batch assignments intact | — | — | ⬜ |
| 5.12 | Student plan details correct (type, sessions, dates) | — | — | ⬜ |
| 5.13 | Student profile attendance calendar accurate | — | — | ⬜ |
| 5.14 | Monthly payment totals consistent | — | — | ⬜ |

---

## 6. Independence Test

| # | Test | Result |
|---|------|--------|
| 6.1 | Create test student "CLONE_TEST" in clone | ⬜ Created |
| 6.2 | Verify "CLONE_TEST" does NOT appear in original | ⬜ Verified |
| 6.3 | Edit test student in clone (change age to 99) | ⬜ Edited |
| 6.4 | Verify change does NOT appear in original | ⬜ Verified |
| 6.5 | Mark test student present in clone attendance | ⬜ Marked |
| 6.6 | Verify attendance does NOT appear in original | ⬜ Verified |
| 6.7 | Add test payment in clone | ⬜ Added |
| 6.8 | Verify payment does NOT appear in original | ⬜ Verified |
| 6.9 | Delete test student from clone | ⬜ Deleted |
| 6.10 | Verify original is completely unaffected | ⬜ Verified |

---

## Summary

| Section | Total Checks | Passed | Status |
|---------|-------------|--------|--------|
| 1. Original Integrity | 7 | ___ | ⬜ |
| 2. Clone Configuration | 7 | ___ | ⬜ |
| 3. Export | 12 | ___ | ⬜ |
| 4. Import | 14 | ___ | ⬜ |
| 5. Data Integrity | 14 | ___ | ⬜ |
| 6. Independence | 10 | ___ | ⬜ |
| **TOTAL** | **64** | ___ | ⬜ |

**Migration Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete / ❌ Issues Found

---

> **Date:** _______________  
> **Performed by:** _______________  
> **Notes:** _______________
