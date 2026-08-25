/**
 * Macht die Asset-Adressen in public/admin/index.html origin-relativ.
 *
 * Die CLI schreibt die Datei bei jedem Start neu und traegt dabei
 * http://localhost:4001 fest ein - im Browser auf einem anderen Rechner zeigt
 * das ins Leere. Deshalb laeuft dieser Patch als Teil des dev-Skripts direkt
 * vor `next dev`, also nach dem Zeitpunkt, zu dem die CLI die Datei erzeugt.
 *
 * Aus http://localhost:4001/admin/@vite/client wird /admin/@vite/client. Den
 * Rest erledigt der Dev-Proxy in next.config.ts, der /admin/* an den
 * Tina-Server weiterreicht. Damit laeuft alles ueber den Ursprung der Seite -
 * egal ob per IP, SSH-Tunnel oder Reverse Proxy erreicht.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = new URL('../public/admin/index.html', import.meta.url)
const ABSOLUTE_LOCALHOST = /https?:\/\/localhost:\d+(?=\/)/g

let html
try {
  html = readFileSync(FILE, 'utf8')
} catch {
  console.warn('[patch-tina-admin-html] public/admin/index.html fehlt, uebersprungen.')
  process.exit(0)
}

const patched = html.replace(ABSOLUTE_LOCALHOST, '')
if (patched === html) {
  console.log('[patch-tina-admin-html] keine localhost-Adressen, nichts zu tun.')
  process.exit(0)
}

writeFileSync(FILE, patched)
const count = html.match(ABSOLUTE_LOCALHOST)?.length ?? 0
console.log(`[patch-tina-admin-html] ${count} Adresse(n) auf origin-relativ umgestellt.`)
