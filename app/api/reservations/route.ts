import { NextRequest, NextResponse } from 'next/server'
import { collection, doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, email, phone, date, time, guests, requests } = data

  if (!email || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const sectionId = 'indoor'
    const tableId = 'table1'
    const [timePart, meridiem] = time.split(' ')
    let [hours, minutes] = timePart.split(':').map(Number)
    if (meridiem?.toUpperCase() === 'PM' && hours < 12) hours += 12
    if (meridiem?.toUpperCase() === 'AM' && hours === 12) hours = 0
    const startAt = new Date(`${date}T${String(hours).padStart(2, '0')}:${minutes}`)
    const slotId = startAt
      .toISOString()
      .replace(/[-:]/g, '')
      .slice(0, 10)

    const slotRef = doc(db, 'sections', sectionId, 'tables', tableId, 'slots', slotId)

    await setDoc(slotRef, {
      userId: email,
      status: 'pending',
      startAt: Timestamp.fromDate(startAt),
      expiresAt: Timestamp.fromDate(new Date(startAt.getTime() + 2 * 60 * 60 * 1000)),
      createdAt: serverTimestamp(),
      name,
      phone,
      guests,
      requests,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
