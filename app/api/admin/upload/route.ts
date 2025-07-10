import { NextRequest, NextResponse } from 'next/server'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Create a unique filename
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name}`
    
    // Create storage reference
    const storageRef = ref(storage, `uploads/${fileName}`)
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, bytes)
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return NextResponse.json({ 
      url: downloadURL,
      fileName: fileName
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
} 