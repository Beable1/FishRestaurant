// app/api/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
    }

    const {
      date, time,
      section = 'indoor',
      name, phone, email,
      guests, requests,
    } = await req.json();

    if (!date || !time || !email)
      return NextResponse.json({ error: 'Eksik alanlar var' }, { status: 400 });

    const reservationData = {
      name,
      phone,
      email,
      date,
      time,
      section,
      guests: guests ? Number(String(guests).replace('+', '')) : 1,
      requests: requests || '',
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await adminDb.collection('reservations').add(reservationData);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Reservation error:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
