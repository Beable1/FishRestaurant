import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminAuth: any = null;
let adminDb: any = null;

// Only initialize Firebase Admin if we have the service account
if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
  try {
    // .env.local ⇒ GOOGLE_SERVICE_ACCOUNT_BASE64=eyJ...
    const serviceJson = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString()
    );

    const app =
      getApps().length === 0
        ? initializeApp({ credential: cert(serviceJson) })
        : getApps()[0];

    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
  }
}

export { adminAuth, adminDb };
