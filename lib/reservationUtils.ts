import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cpf from 'dayjs/plugin/customParseFormat';
import { adminDb } from './firebaseAdmin';
import { QuerySnapshot } from 'firebase-admin/firestore';

export interface TableInfo { id: string; capacity: number }

dayjs.extend(utc);
dayjs.extend(cpf);

// ----- 1 ▸ Tarih/saat parse (format listesi dışarıda) -----
const FORMATS = [
  'YYYY-MM-DD HH:mm',  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD hh:mm A','YYYY-MM-DD hh:mm:ss A',
  'YYYY-MM-DD h:mm A', 'YYYY-MM-DD h:mm:ss A',
] as const;

export const parse = (date: string, time: string) =>
  dayjs.utc(`${date} ${time}`.trim(), FORMATS as any, true);

// ----- 2 ▸ Sabit saat listesi -----
export const TIMES = [
  '5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
  '7:30 PM','8:00 PM','8:30 PM','9:00 PM'
] as const;

// ----- 3 ▸ Yardımcı: tek sefer koleksiyon okuma -----
async function fetchTables(section: string): Promise<QuerySnapshot | null> {
  if (!adminDb) {
    console.warn('Firebase Admin not initialized');
    return null;
  }
  return adminDb.collection('sections')
                .doc(section)
                .collection('tables')
                .get();
}

// ----- 4 ▸ booked kontrolü tek pass -----
export async function availableTables(
  section: string, slotId: string,
  snap?: QuerySnapshot | null
): Promise<TableInfo[]> {
  const tblSnap = snap ?? await fetchTables(section);
  
  if (!tblSnap) {
    console.warn('Unable to fetch table data');
    return [];
  }

  return tblSnap.docs.reduce<TableInfo[]>((arr, d) => {
    if (!d.get(`booked.${slotId}`)) {
      const cap = d.get('capacity') ?? 0;
      if (cap > 0) arr.push({ id: d.id, capacity: cap });
    }
    return arr;
  }, []);
}

// ----- 5 ▸ DFS kombinasyon (küçük pruning) -----
export function pickTables(
  tables: TableInfo[], guests: number
): string[] | null {
  let bestCap = Infinity;
  let bestIds: string[] | null = null;

  function dfs(i: number, cap: number, ids: string[]) {
    if (cap >= guests) {
      if (cap < bestCap) { bestCap = cap; bestIds = [...ids]; }
      return;
    }
    if (i >= tables.length || cap >= bestCap) return;
    dfs(i + 1, cap + tables[i].capacity, [...ids, tables[i].id]);
    dfs(i + 1, cap, ids);
  }
  dfs(0, 0, []);
  return bestIds;
}

// ----- 6 ▸ Bir slot için uygun masalar -----
export async function findTablesForSlot(
  section: string, slotId: string, guests: number
): Promise<string[] | null> {
  const tblSnap = await fetchTables(section);
  if (!tblSnap) {
    return null;
  }
  const free    = await availableTables(section, slotId, tblSnap);
  return pickTables(free, guests);
}

// ----- 7 ▸ Günlük zaman-aralığı uygunluğu (tek read, O(n·tables)) -----
export async function slotAvailability(
  section: string, date: string, guests: number
): Promise<Record<string, boolean>> {
  const availability: Record<string, boolean> = {};
  const tblSnap = await fetchTables(section);

  if (!tblSnap) {
    // If we can't fetch tables, return false for all times
    for (const t of TIMES) {
      availability[t] = false;
    }
    return availability;
  }

  for (const t of TIMES) {
    const parsed = parse(date, t);
    if (!parsed.isValid()) { availability[t] = false; continue; }

    const slotId = 's_' + parsed.format('YYYYMMDDHH');
    const free   = await availableTables(section, slotId, tblSnap);
    availability[t] = !!pickTables(free, guests);
  }
  return availability;
}
