// app/api/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { randomUUID } from 'crypto';
import { parse, findTablesForSlot } from '@/lib/reservationUtils';
import { sendVerifyEmail } from '@/lib/sendEmail';
import dayjs from 'dayjs';

const clean = (o: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(o).filter(
      ([, v]) =>
        v !== undefined && v !== '' && !(typeof v === 'number' && Number.isNaN(v))
    )
  );

export async function POST(req: NextRequest) {
  const {
    date, time,
    section = 'indoor',
    name, phone, email,
    guests, requests,
  } = await req.json();

  if (!date || !time || !email)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const start = parse(date, time);
  if (!start.isValid())
    return NextResponse.json({ error: 'Invalid date/time' }, { status: 400 });

  const slotId  = 's_' + start.format('YYYYMMDDHH');
  const startAt = start.toDate();
  const expires = start.add(2, 'h').toDate();

  const g       = guests ? Number(String(guests).replace('+', '')) : 1;
  const tableIds = await findTablesForSlot(section, slotId, g);
  if (!tableIds)
    return NextResponse.json({ error: 'No tables available' }, { status: 409 });

  const tableRefs = tableIds.map(id =>
    adminDb.doc(`sections/${section}/tables/${id}`)
  );
  const slotRefs = tableRefs.map(ref => ref.collection('slots').doc(slotId));

  const verifyToken = randomUUID().slice(0, 8);           // 8 karakter

  const payload = clean({
    userId   : randomUUID(),          // auth’suz benzersiz ID
    email,
    status   : 'pending',
    token    : verifyToken,
    startAt  : Timestamp.fromDate(startAt),
    expiresAt: Timestamp.fromDate(expires),
    createdAt: Timestamp.now(),
    name, phone, guests: g, requests,
    tables   : tableIds,
  });

  try {
    // ─── Transaction: slot + booked map ─────────────────────────────────
    await adminDb.runTransaction(async tx => {
      // Çakışma kontrolü
      for (const ref of tableRefs) {
        if ((await tx.get(ref)).get(`booked.${slotId}`))
          throw new Error('ALREADY_BOOKED');
      }
      // Yaz
      tableRefs.forEach((ref, i) => {
        tx.set(slotRefs[i], payload);
        tx.update(ref, { [`booked.${slotId}`]: true });
      });
    });

    // ─── E-posta doğrulama linki ────────────────────────────────────────
    const verifyLink = `${process.env.BASE_URL}/api/reservations/verify` +
      `?section=${section}&tables=${tableIds.join(',')}` +
      `&slot=${slotId}&t=${verifyToken}`;

    await sendVerifyEmail(email, verifyLink);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'ALREADY_BOOKED')
      return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });

    console.error('Reservation error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
