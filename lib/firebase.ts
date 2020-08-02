// @ts-nocheck
import admin from 'firebase-admin';

try {
  const priv_key = process.env.FIREBASE_PRIVATE_KEY ? 
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') :
    "";
    const project_id = process.env.FIREBASE_PROJECT_ID ?
      process.env.FIREBASE_PROJECT_ID : "";
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: project_id,
      private_key: priv_key,
      client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: 'https://spacetag-8c5c4.firebaseio.com/'
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

let database = admin.database().ref();

export {
  database,
  admin
};
