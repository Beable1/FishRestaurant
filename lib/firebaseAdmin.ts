import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// .env.local ⇒ GOOGLE_SERVICE_ACCOUNT_BASE64=eyJ...
const serviceJson = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64!, 'base64').toString()
);

const app =
  getApps().length === 0
    ? initializeApp({ credential: cert(serviceJson) })
    : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb   = getFirestore(app);
