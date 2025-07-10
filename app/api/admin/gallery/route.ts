import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "gallery"))
    const images = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, imageUrl, featured } = body
    
    const imageData = {
      title,
      description,
      category,
      imageUrl,
      featured: featured || false,
      createdAt: new Date()
    }
    
    const docRef = await addDoc(collection(db, "gallery"), imageData)
    
    return NextResponse.json({ 
      id: docRef.id,
      ...imageData 
    })
  } catch (error) {
    console.error('Error adding gallery image:', error)
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    await updateDoc(doc(db, "gallery", id), updateData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }
    
    await deleteDoc(doc(db, "gallery", id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
} 