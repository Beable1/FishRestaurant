import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { randomUUID } from 'crypto';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cpf from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc); dayjs.extend(cpf);

function parse(date: string, time: string) {
  const f = [
    'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD hh:mm A', 'YYYY-MM-DD hh:mm:ss A',
    'YYYY-MM-DD h:mm A',  'YYYY-MM-DD h:mm:ss A',
  ];
  return dayjs.utc(`${date} ${time}`.trim(), f, true);
}

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
    table   = 't01',
    name, phone, email,
    guests, requests,
  } = await req.json();

  if (!date || !time)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const start = parse(date, time);
  if (!start.isValid())
    return NextResponse.json({ error: 'Invalid date/time' }, { status: 400 });

  const slotId  = 's_' + start.format('YYYYMMDDHH');    // s_2025071018
  const startAt = start.toDate();
  const expires = start.add(2, 'h').toDate();           // +2 h

  const tableRef = adminDb.doc(`sections/${section}/tables/${table}`);
  const slotRef  = tableRef.collection('slots').doc(slotId);

  const payload = clean({
    userId   : randomUUID(),               // rastgele benzersiz kimlik
    email,
    status   : 'pending',
    startAt  : Timestamp.fromDate(startAt),
    expiresAt: Timestamp.fromDate(expires), // TTL alanı
    createdAt: Timestamp.now(),
    name,
    phone,
    guests : guests ? Number(guests) : undefined,
    requests,
  });

  try {
    await adminDb.runTransaction(async tx => {
      // Masa belgesindeki harita dolu mu?
      const tblSnap = await tx.get(tableRef);
      if (tblSnap.exists && tblSnap.get(`booked.${slotId}`))
        throw new Error('ALREADY_BOOKED');

      // Slot belgesi
      tx.set(slotRef, payload);
      // Haritaya işaret
      tx.update(tableRef, { [`booked.${slotId}`]: true });
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'ALREADY_BOOKED')
      return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
