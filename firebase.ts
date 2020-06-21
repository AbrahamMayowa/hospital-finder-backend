import * as admin from 'firebase-admin';
const serviceAccount = require('./firebaseCredential.json');
// Initialize our project application
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

// Set up database connection
const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();
export default firestoreDb;