import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import cpf from 'dayjs/plugin/customParseFormat'
import { adminDb } from './firebaseAdmin'

export interface TableInfo { id: string; capacity: number }

dayjs.extend(utc)
dayjs.extend(cpf)

export function parse(date: string, time: string) {
  const f = [
    'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD hh:mm A', 'YYYY-MM-DD hh:mm:ss A',
    'YYYY-MM-DD h:mm A',  'YYYY-MM-DD h:mm:ss A',
  ]
  return dayjs.utc(`${date} ${time}`.trim(), f, true)
}

export const TIMES = [
  '5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM',
  '7:30 PM','8:00 PM','8:30 PM','9:00 PM'
]

export async function availableTables(section: string, slotId: string): Promise<TableInfo[]> {
  const snap = await adminDb.collection(`sections/${section}/tables`).get()
  const tables: TableInfo[] = []
  for (const doc of snap.docs) {
    if (!doc.get(`booked.${slotId}`)) {
      tables.push({ id: doc.id, capacity: doc.data().capacity || 0 })
    }
  }
  return tables
}

export function pickTables(tables: TableInfo[], guests: number): string[] | null {
  let best: { ids: string[]; cap: number } | null = null
  const n = tables.length
  function dfs(i: number, cap: number, ids: string[]) {
    if (cap >= guests) {
      if (!best || cap < best.cap) best = { ids: [...ids], cap }
      return
    }
    if (i >= n) return
    dfs(i + 1, cap + tables[i].capacity, [...ids, tables[i].id])
    dfs(i + 1, cap, ids)
  }
  dfs(0, 0, [])
  return best ? best.ids : null
}

export async function findTablesForSlot(section: string, slotId: string, guests: number): Promise<string[] | null> {
  const tables = await availableTables(section, slotId)
  return pickTables(tables, guests)
}

export async function slotAvailability(section: string, date: string, guests: number): Promise<Record<string, boolean>> {
  const availability: Record<string, boolean> = {}
  for (const t of TIMES) {
    const start = parse(date, t)
    if (!start.isValid()) { availability[t] = false; continue }
    const slotId = 's_' + start.format('YYYYMMDDHH')
    const tables = await availableTables(section, slotId)
    const ids = pickTables(tables, guests)
    availability[t] = !!ids
  }
  return availability
}
