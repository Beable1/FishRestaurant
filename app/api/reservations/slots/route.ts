import { NextRequest, NextResponse } from 'next/server';
import { slotAvailability } from '@/lib/reservationUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const section = searchParams.get('section') ?? 'indoor';
  const gParam = searchParams.get('guests') ?? '1';
  const guests = parseInt(gParam.replace('+', ''), 10) || 1;

  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }


  const availability = await slotAvailability(section, date, guests);
  return NextResponse.json({ available });

}
