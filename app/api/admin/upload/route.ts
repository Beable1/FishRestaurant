import { NextRequest, NextResponse } from 'next/server'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    console.log('=== UPLOAD API STARTED ===')
    console.log('Upload API called')
    
    // Check if Firebase is properly initialized
    if (!storage) {
      console.error('❌ Firebase storage not initialized')
      console.log('Environment variables check:')
      console.log('- NEXT_PUBLIC_FIREBASE_API_KEY:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
      console.log('- NEXT_PUBLIC_FIREBASE_PROJECT_ID:', !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
      console.log('- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:', !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
      return NextResponse.json({ error: 'Firebase storage not initialized' }, { status: 500 })
    }
    
    console.log('✅ Firebase storage initialized successfully')

    const formData = await request.formData()
    console.log('FormData received')
    
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File received:', {
      name: file.name,
      size: file.size,
      type: file.type
    })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size)
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Create a unique filename
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    console.log('Creating storage reference for:', fileName)
    
    // Create storage reference
    const storageRef = ref(storage, `uploads/${fileName}`)
    
    // Convert file to buffer
    console.log('Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    
    // Upload file
    console.log('Uploading file to Firebase...')
    const snapshot = await uploadBytes(storageRef, bytes)
    
    console.log('File uploaded successfully:', snapshot.ref.fullPath)
    
    // Get download URL
    console.log('Getting download URL...')
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    console.log('Download URL obtained:', downloadURL)
    
    return NextResponse.json({ 
      url: downloadURL,
      fileName: fileName
    })
  } catch (error) {
    console.error('=== UPLOAD API ERROR ===')
    console.error('Error uploading file:', error)
    console.error('Error type:', typeof error)
    console.error('Error constructor:', error?.constructor?.name)
    
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      // More specific error messages
      if (error.message.includes('storage/unauthorized')) {
        console.error('❌ Firebase storage access denied')
        return NextResponse.json({ error: 'Firebase storage access denied. Check your Firebase configuration.' }, { status: 500 })
      }
      if (error.message.includes('storage/quota-exceeded')) {
        console.error('❌ Storage quota exceeded')
        return NextResponse.json({ error: 'Storage quota exceeded' }, { status: 500 })
      }
      if (error.message.includes('storage/network-error')) {
        console.error('❌ Network error')
        return NextResponse.json({ error: 'Network error. Please check your internet connection.' }, { status: 500 })
      }
      if (error.message.includes('storage/bucket-not-found')) {
        console.error('❌ Storage bucket not found')
        return NextResponse.json({ error: 'Storage bucket not found. Check your Firebase project configuration.' }, { status: 500 })
      }
    }
    
    console.error('❌ Unknown error occurred')
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error',
      errorType: typeof error,
      errorName: error instanceof Error ? error.name : 'N/A'
    }, { status: 500 })
  }
} 