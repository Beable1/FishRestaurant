// app/api/reservations/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams;
  const section = p.get('section');
  const tableStr= p.get('tables');          // "t01,t02"
  const slotId  = p.get('slot');
  const token   = p.get('t');

  if (!section || !tableStr || !slotId || !token)
    return NextResponse.json({ error: 'Bad params' }, { status: 400 });

  const tables = tableStr.split(',');

  // Her masa için token doğrula & onayla
  const batch = adminDb.batch();
  for (const tbl of tables) {
    const slotRef = adminDb.doc(`sections/${section}/tables/${tbl}/slots/${slotId}`);
    const snap    = await slotRef.get();
    if (!snap.exists || snap.get('token') !== token)
      return NextResponse.json({ error: 'Invalid link' }, { status: 401 });
    batch.update(slotRef, { status: 'confirmed', token: FieldValue.delete() });
  }
  await batch.commit();

  return NextResponse.redirect(`${process.env.BASE_URL}/reservation-confirmed`);
}
