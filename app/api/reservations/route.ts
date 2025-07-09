import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { randomUUID } from 'crypto';
import { parse, findTablesForSlot } from '@/lib/reservationUtils';

const clean = (o: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(o).filter(
      ([, v]) => v !== undefined && v !== '' && !(typeof v === 'number' && Number.isNaN(v))
    )
  );

export async function POST(req: NextRequest) {
  const {
    date, time,
    section = 'indoor',
    name, phone, email,
    guests, requests,
  } = await req.json();

  if (!date || !time)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const start = parse(date, time);
  if (!start.isValid())
    return NextResponse.json({ error: 'Invalid date/time' }, { status: 400 });

  const slotId  = 's_' + start.format('YYYYMMDDHH');
  const startAt = start.toDate();

  const g = guests ? Number(String(guests).replace('+','')) : 1;
  const tableIds = await findTablesForSlot(section, slotId, g);
  if (!tableIds)
    return NextResponse.json({ error: 'No tables available' }, { status: 409 });

  const tableRefs = tableIds.map(id => adminDb.doc(`sections/${section}/tables/${id}`));
  const slotRefs  = tableRefs.map(ref => ref.collection('slots').doc(slotId));

  const payload = clean({
    userId   : randomUUID(),
    email,
    status   : 'pending',
    startAt  : Timestamp.fromDate(startAt),
    createdAt: Timestamp.now(),
    name,
    phone,
    guests : g,
    requests,
    tables: tableIds,
  });

  try {
    await adminDb.runTransaction(async tx => {
      for (const ref of tableRefs) {
        const snap = await tx.get(ref);
        if (snap.exists && snap.get(`booked.${slotId}`)) {
          throw new Error('ALREADY_BOOKED');
        }
      }

      tableRefs.forEach((ref, idx) => {
        const slotRef = slotRefs[idx];
        tx.set(slotRef, payload);
        tx.update(ref, { [`booked.${slotId}`]: true });
      });
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'ALREADY_BOOKED')
      return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
