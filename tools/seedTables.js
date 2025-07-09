// tools/seedTables.ts  (node ts-node tools/seedTables.ts)
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';

initializeApp({ credential: cert(JSON.parse(fs.readFileSync('./service.json','utf8')) as ServiceAccount) });
const db = getFirestore();

const tables = {
  indoor : [{id:'t01',name:'A1',capacity:4},{id:'t02',name:'A2',capacity:2}],
  outdoor: [{id:'t11',name:'B1',capacity:4},{id:'t12',name:'B2',capacity:6}],
};

for (const [section, arr] of Object.entries(tables)) {
  for (const t of arr) {
    await db.doc(`sections/${section}/tables/${t.id}`).set(t);
  }
}
console.log('seed ok');
