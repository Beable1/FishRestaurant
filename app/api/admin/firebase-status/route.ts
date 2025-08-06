import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/firebase'

export async function GET(request: NextRequest) {
  try {
    console.log('=== FIREBASE STATUS CHECK ===')
    
    const status = {
      storage: !!storage,
      envVars: {
        apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      },
      config: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'MISSING',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'MISSING'
      }
    }
    
    console.log('Firebase status:', status)
    
    return NextResponse.json(status)
  } catch (error) {
    console.error('Firebase status check error:', error)
    return NextResponse.json({ 
      error: 'Firebase status check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 