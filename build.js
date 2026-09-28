const fs = require('fs');
const path = require('path');

// Create public directory
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Generate firebase-config.js inside public/
const config = `export const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}"
};`;

fs.writeFileSync(path.join('public', 'firebase-config.js'), config);

// Copy static files to public/
const filesToCopy = ['index.html', 'export.html', 'import.html', 'logo.png'];
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('public', file));
  }
});

console.log('Build completed: static files and config moved to public/');
