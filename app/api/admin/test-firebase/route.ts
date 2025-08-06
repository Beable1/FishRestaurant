import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/firebase'
import { ref, listAll } from 'firebase/storage'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Firebase Storage connection...')
    
    // Check if Firebase is properly initialized
    if (!storage) {
      console.error('Firebase storage not initialized')
      return NextResponse.json({ 
        error: 'Firebase storage not initialized',
        config: {
          apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        }
      }, { status: 500 })
    }

    console.log('Firebase storage initialized successfully')
    
    // Try to list files in uploads folder
    const uploadsRef = ref(storage, 'uploads')
    console.log('Attempting to list files in uploads folder...')
    
    const result = await listAll(uploadsRef)
    console.log('Files in uploads folder:', result.items.length)
    
    return NextResponse.json({ 
      success: true,
      message: 'Firebase Storage connection successful',
      filesCount: result.items.length,
      files: result.items.map(item => item.name)
    })
  } catch (error) {
    console.error('Firebase Storage test error:', error)
    return NextResponse.json({ 
      error: 'Firebase Storage test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 