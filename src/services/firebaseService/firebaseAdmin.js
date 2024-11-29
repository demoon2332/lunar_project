// firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from 'lunarmess-f928e-firebase-adminsdk-6d6fc-a7c00b502a.json' assert { type: 'json' };

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
