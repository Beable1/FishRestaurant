import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cpf from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(cpf);

function parse(date: string, time: string) {
  const f = [
    'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD hh:mm A', 'YYYY-MM-DD hh:mm:ss A',
    'YYYY-MM-DD h:mm A',  'YYYY-MM-DD h:mm:ss A',
  ];
  return dayjs.utc(`${date} ${time}`.trim(), f, true);
}

const TIMES = [
  '5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
  '7:30 PM','8:00 PM','8:30 PM','9:00 PM'
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const section = searchParams.get('section') ?? 'indoor';

  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  const tablesSnap = await adminDb.collection(`sections/${section}/tables`).get();
  const availability: Record<string, boolean> = {};

  for (const t of TIMES) {
    const start = parse(date, t);
    if (!start.isValid()) {
      availability[t] = false;
      continue;
    }
    const slotId = 's_' + start.format('YYYYMMDDHH');
    let free = false;
    for (const doc of tablesSnap.docs) {
      if (!doc.get(`booked.${slotId}`)) {
        free = true;
        break;
      }
    }
    availability[t] = free;
  }

  return NextResponse.json({ available: availability });
}
