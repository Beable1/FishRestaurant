import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

// Only initialize Firebase if we have the required config
let app: any = null
let db: any = null
let auth: any = null
let storage: any = null

console.log('Firebase config check:')
console.log('- apiKey:', !!firebaseConfig.apiKey)
console.log('- projectId:', !!firebaseConfig.projectId)
console.log('- storageBucket:', !!firebaseConfig.storageBucket)

if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.storageBucket) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
    storage = getStorage(app)
    console.log('✅ Firebase initialized successfully')
  } catch (error) {
    console.error('❌ Firebase initialization error:', error)
  }
} else {
  console.error('❌ Firebase config incomplete')
  console.log('Missing config:', {
    apiKey: !firebaseConfig.apiKey,
    projectId: !firebaseConfig.projectId,
    storageBucket: !firebaseConfig.storageBucket
  })
}

export { db, auth, storage }
