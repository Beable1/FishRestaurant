import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')
    const section = searchParams.get('section')
    
    const reservations: any[] = []
    
    // Get all sections
    const sectionsSnapshot = await adminDb.collection('sections').get()
    
    for (const sectionDoc of sectionsSnapshot.docs) {
      const sectionName = sectionDoc.id
      
      // Filter by section if specified
      if (section && sectionName !== section) continue
      
      // Get all tables in this section
      const tablesSnapshot = await adminDb
        .collection('sections')
        .doc(sectionName)
        .collection('tables')
        .get()
      
      for (const tableDoc of tablesSnapshot.docs) {
        // Get all slots for this table
        const slotsSnapshot = await adminDb
          .collection('sections')
          .doc(sectionName)
          .collection('tables')
          .doc(tableDoc.id)
          .collection('slots')
          .get()
        
        for (const slotDoc of slotsSnapshot.docs) {
          const slotData = slotDoc.data()
          
          // Filter by status if specified
          if (status && status !== 'all' && slotData.status !== status) continue
          
          // Filter by date if specified
          if (date) {
            const slotDate = slotData.startAt?.toDate?.() || new Date(slotData.startAt)
            const slotDateStr = slotDate.toISOString().split('T')[0]
            if (slotDateStr !== date) continue
          }
          
          // Convert to reservation format
          const reservation = {
            id: `${sectionName}_${tableDoc.id}_${slotDoc.id}`,
            section: sectionName,
            tableId: tableDoc.id,
            slotId: slotDoc.id,
            name: slotData.name || '',
            email: slotData.email || '',
            phone: slotData.phone || '',
            date: slotData.startAt?.toDate?.() || new Date(slotData.startAt),
            time: slotData.startAt?.toDate?.() || new Date(slotData.startAt),
            guests: slotData.guests || 1,
            requests: slotData.requests || '',
            status: slotData.status || 'pending',
            token: slotData.token || '',
            tables: slotData.tables || [],
            createdAt: slotData.createdAt?.toDate?.() || new Date(slotData.createdAt),
            expiresAt: slotData.expiresAt?.toDate?.() || new Date(slotData.expiresAt)
          }
          
          reservations.push(reservation)
        }
      }
    }
    
    // Sort by creation date (newest first)
    reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({ reservations })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // Parse the ID to get section, table, and slot
    const [section, tableId, slotId] = id.split('_')
    
    if (!section || !tableId || !slotId) {
      return NextResponse.json({ error: 'Invalid reservation ID' }, { status: 400 })
    }
    
    // Update the slot document
    await adminDb
      .collection('sections')
      .doc(section)
      .collection('tables')
      .doc(tableId)
      .collection('slots')
      .doc(slotId)
      .update({
        ...updateData,
        updatedAt: new Date()
      })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 })
    }
    
    // Parse the ID to get section, table, and slot
    const [section, tableId, slotId] = id.split('_')
    
    if (!section || !tableId || !slotId) {
      return NextResponse.json({ error: 'Invalid reservation ID' }, { status: 400 })
    }
    
    // Delete the slot document
    await adminDb
      .collection('sections')
      .doc(section)
      .collection('tables')
      .doc(tableId)
      .collection('slots')
      .doc(slotId)
      .delete()
    
    // Also remove the booked flag from the table
    await adminDb
      .collection('sections')
      .doc(section)
      .collection('tables')
      .doc(tableId)
      .update({
        [`booked.${slotId}`]: FieldValue.delete()
      })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 })
  }
} 