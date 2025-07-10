import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "dishes"))
    const dishes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ dishes })
  } catch (error) {
    console.error('Error fetching dishes:', error)
    return NextResponse.json({ error: 'Failed to fetch dishes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image, popular } = body
    
    const dishData = {
      name,
      description,
      price,
      category,
      image,
      popular: popular || false,
      createdAt: new Date()
    }
    
    const docRef = await addDoc(collection(db, "dishes"), dishData)
    
    return NextResponse.json({ 
      id: docRef.id,
      ...dishData 
    })
  } catch (error) {
    console.error('Error adding dish:', error)
    return NextResponse.json({ error: 'Failed to add dish' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    await updateDoc(doc(db, "dishes", id), updateData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating dish:', error)
    return NextResponse.json({ error: 'Failed to update dish' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Dish ID is required' }, { status: 400 })
    }
    
    await deleteDoc(doc(db, "dishes", id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting dish:', error)
    return NextResponse.json({ error: 'Failed to delete dish' }, { status: 500 })
  }
} 