# BaskLab — Migration Guide

> Step-by-step instructions for cloning BaskLab to a new Firebase project.

---

## Prerequisites

- A Google account
- Access to the [Firebase Console](https://console.firebase.google.com/)
- The original BaskLab app running (for export)
- A modern web browser (Chrome, Edge, Firefox)
- A local web server for running the clone (e.g., VS Code Live Server, `npx serve`, or Python's `http.server`)

---

## Phase 1: Export Data from Original Project

### Step 1.1 — Open the Export Tool

1. Navigate to the `basketball-clone/` directory.
2. Start a local web server:
   ```bash
   # Option A: Using npx
   npx -y serve .

   # Option B: Using Python
   python -m http.server 8080

   # Option C: Use VS Code "Live Server" extension
   ```
3. Open `export.html` in your browser (e.g., `http://localhost:3000/export.html`).

### Step 1.2 — Run the Export

1. Review the source project info displayed on the page.
2. Click **"📦 Start Export Backup"**.
3. Wait for all 4 collections to be read:
   - `students`
   - `batches`
   - `attendance`
   - `payments`
4. A JSON file named `basklab_backup_YYYY-MM-DD-HH-MM-SS.json` will download automatically.
5. Review the **Export Manifest** at the bottom:
   - All collections should show ✅ Success.
   - Note the document counts for each collection.

### Step 1.3 — Verify the Backup

1. Open the downloaded JSON file in a text editor.
2. Verify `__meta.format` is `"basklab-backup-v1"`.
3. Verify `__meta.sourceProjectId` is `"hoops-coach-a28a0"`.
4. Verify each collection has documents with `__docId` fields.
5. **Keep this file safe** — it contains all your student data.

> ⚠️ **Do NOT share this file publicly.** It contains student personal information.

---

## Phase 2: Create a New Firebase Project

### Step 2.1 — Create the Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Create a project"** (or "Add project").
3. Enter a project name (e.g., `basklab-clone` or `my-basketball-academy`).
4. Optionally enable Google Analytics (not required).
5. Click **"Create project"** and wait for it to finish.

### Step 2.2 — Enable Firestore

1. In your new project, go to **Build → Firestore Database**.
2. Click **"Create database"**.
3. Choose a location (pick the one closest to your users).
4. Start in **test mode** for now (you can lock it down later).
5. Click **"Enable"**.

### Step 2.3 — Register a Web App

1. Go to **Project Settings** (⚙️ gear icon → Project settings).
2. Scroll to **"Your apps"** section.
3. Click the **Web** icon (`</>`) to add a web app.
4. Enter a nickname (e.g., "BaskLab Clone").
5. ✅ Check **"Also set up Firebase Hosting"** if you plan to use it (optional).
6. Click **"Register app"**.
7. **Copy the Firebase configuration object** that appears:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
8. Save these values — you'll need them in the next steps.

### Step 2.4 — Set Firestore Security Rules

For initial setup and import, use these temporary permissive rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **After completing the migration, restrict these rules** to prevent unauthorized access. The original app has no authentication, so you should consider adding Firebase Authentication to the clone.

---

## Phase 3: Configure the Clone

### Step 3.1 — Update firebase-config.js

1. Open `basketball-clone/firebase-config.js`.
2. Replace the placeholder values with your new project's credentials:
   ```javascript
   export const firebaseConfig = {
     apiKey:            "YOUR_ACTUAL_API_KEY",
     authDomain:        "your-actual-project.firebaseapp.com",
     projectId:         "your-actual-project-id",
     storageBucket:     "your-actual-project.appspot.com",
     messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
     appId:             "YOUR_ACTUAL_APP_ID"
   };
   ```
3. Save the file.

### Step 3.2 — Verify the Clone Starts

1. Open `index.html` in your local server.
2. The app should load and show an empty dashboard (0 students, 0 batches).
3. If you see an error about the original project, double-check `firebase-config.js`.

---

## Phase 4: Import Data into New Project

### Step 4.1 — Open the Import Tool

1. Open `import.html` in your browser (e.g., `http://localhost:3000/import.html`).

### Step 4.2 — Load Backup File

1. Click the file drop zone or drag your `basklab_backup_*.json` file onto it.
2. Review the file info and manifest shown.
3. Click **"Continue →"**.

### Step 4.3 — Configure Target Firebase

1. Enter your **NEW** Firebase project credentials (same ones from Step 2.3).
2. The tool will **block you** if you accidentally enter the original project ID.
3. Click **"Continue →"**.

### Step 4.4 — Dry Run First

1. On the Review page, make sure **"Dry-run mode"** is checked ✅.
2. Click **"🚀 Start Import"**.
3. Review the dry-run results — it should show all documents would be written.
4. If satisfied, click **"↻ Start Over"**.

### Step 4.5 — Real Import

1. Repeat steps 4.2–4.3.
2. On the Review page:
   - **Uncheck** "Dry-run mode".
   - Leave "Overwrite existing documents" **unchecked** (unless re-importing).
3. Click **"🚀 Start Import"**.
4. Wait for all collections to be imported.
5. Review the results table for any failures.

### Step 4.6 — Verify in Firebase Console

1. Go to your new project in the Firebase Console.
2. Open **Firestore Database**.
3. Verify you can see all 4 collections: `students`, `batches`, `attendance`, `payments`.
4. Spot-check a few documents to ensure data looks correct.

---

## Phase 5: Verify the Clone

### Step 5.1 — Open the Clone

1. Open `index.html` in your local server.
2. The dashboard should now show student counts, batch counts, and today's attendance.

### Step 5.2 — Run the Verification Checklist

Use the checklist below to verify everything works:

- [ ] Dashboard shows correct total students
- [ ] Dashboard shows correct active/expired plan counts
- [ ] Dashboard shows correct paid/unpaid/on-hold/discontinued counts
- [ ] Dashboard shows correct batch count
- [ ] Students tab lists all students with correct names
- [ ] Student plan badges show correct status (active/expired/warning)
- [ ] Student batch assignments are correct
- [ ] Batches tab shows all batches with correct student counts
- [ ] Attendance tab shows today's attendance records
- [ ] Historical attendance is preserved (check student profiles)
- [ ] Payments tab shows payment history
- [ ] Monthly earned totals are consistent
- [ ] Student profile modal shows attendance calendar
- [ ] Student profile CSV download works

### Step 5.3 — Test Independence

1. **In the clone**, create a test student named "TEST_CLONE_STUDENT".
2. **In the original app**, verify "TEST_CLONE_STUDENT" does NOT appear.
3. **In the clone**, delete "TEST_CLONE_STUDENT".
4. The original app should be completely unaffected.

---

## Phase 6: Deploy to Netlify (Optional)

### Step 6.1 — Prepare for Deployment

1. Make sure `firebase-config.js` has your real credentials.
2. The clone directory contains:
   - `index.html` — the main app
   - `firebase-config.js` — your credentials (will be public in client-side app)
   - `logo.png` — the logo
   - `export.html` — export tool (optional, can remove for production)
   - `import.html` — import tool (optional, can remove for production)

### Step 6.2 — Deploy

1. Go to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** → **"Deploy manually"**.
3. Drag the `basketball-clone/` folder onto the deploy zone.
4. Your clone will be live at a unique Netlify URL.

### Step 6.3 — Custom Domain (Optional)

1. In Netlify site settings, go to **"Domain management"**.
2. Add your custom domain.
3. Follow the DNS configuration instructions.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Clone is pointing to the original Firebase project" | Update `firebase-config.js` with your NEW project credentials |
| "Firebase not configured" | Create `firebase-config.js` from the template |
| Export fails with permission error | The original Firestore rules may have changed; verify the original app still works |
| Import shows 0 written documents | Check that Firestore is enabled in your new project and rules allow writes |
| Clone shows empty dashboard after import | Hard-refresh the page (Ctrl+Shift+R); verify `firebase-config.js` points to the correct project |
| "Missing or insufficient permissions" in clone | Update Firestore rules in your new project to allow read/write |

---

## Security Recommendations

After migration is complete:

1. **Restrict Firestore rules** — don't leave test-mode rules in production.
2. **Add Firebase Authentication** — the original app has no auth; consider adding it.
3. **Remove export/import tools** from production deployment.
4. **Never commit** `firebase-config.js` with real credentials to a public repository.
5. **Back up regularly** — use the export tool periodically to create backups.
