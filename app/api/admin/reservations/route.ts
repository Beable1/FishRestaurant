import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  section: string
  guests: number | string
  requests: string
  status: string
  createdAt: any
  updatedAt?: any
}

export async function GET(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')
    const section = searchParams.get('section')

    let queryRef = adminDb.collection('reservations')
    let query = queryRef

    // Filtering is done in-memory for simplicity
    const snapshot = await query.get()
    let reservations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }) as Reservation)

    if (status && status !== 'all') {
      reservations = reservations.filter(r => r.status === status)
    }
    if (date) {
      reservations = reservations.filter(r => r.date === date)
    }
    if (section && section !== 'all') {
      reservations = reservations.filter(r => r.section === section)
    }

    // Sort by creation date (newest first)
    reservations.sort((a, b) => {
      const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
      const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
      return bDate.getTime() - aDate.getTime()
    })

    return NextResponse.json({ reservations })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 })
    }

    await adminDb
      .collection('reservations')
      .doc(id)
      .update({
        ...updateData,
        updatedAt: Timestamp.now(),
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 })
    }

    await adminDb
      .collection('reservations')
      .doc(id)
      .delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 })
  }
} 