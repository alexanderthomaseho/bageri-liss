/**
 * Zwei Korrekturen an @tinacms/cli, die sich nicht ueber die Konfiguration
 * setzen lassen. Laeuft idempotent aus `predev` und `postinstall` - ein
 * npm install setzt node_modules zurueck, danach muss neu gepatcht werden.
 *
 * 1) optimizeDeps.force
 *    Die CLI erzwingt den Dependency-Scan bei jedem Start. Der Vite-Cache ist
 *    damit wirkungslos und ein zweiter esbuild-Prozess laeuft parallel hoch.
 *    Auf einer 4-GB-Maschine reicht das fuer den OOM-Killer (~2,1 GB zusammen).
 *    Mit force:false und GOGC/GOMEMLIMIT aus dem dev-Skript: ~730 MB.
 *
 * 2) __API_URL__
 *    Die Admin-SPA bekommt die GraphQL-Adresse als http://localhost:4001/graphql
 *    fest einkompiliert. Im Browser auf einem anderen Rechner zeigt das ins Leere.
 *    Der Patch macht daraus einen origin-relativen Pfad (/graphql), sobald
 *    TINA_ADMIN_RELATIVE_API=1 gesetzt ist - der Proxy in next.config.ts leitet
 *    weiter. Ohne die Variable (also im Build) bleibt alles unveraendert, und
 *    auch mit ihr werden nur localhost-Adressen angefasst.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const TARGET = new URL('../node_modules/@tinacms/cli/dist/index.js', import.meta.url)

const PATCHES = [
  {
    name: 'optimizeDeps.force',
    from: 'optimizeDeps: {\n      force: true,',
    to: 'optimizeDeps: {\n      force: false,',
  },
  {
    name: '__API_URL__',
    from: '__API_URL__: `"${apiURL}"`,',
    to:
      '__API_URL__: `"${process.env.TINA_ADMIN_RELATIVE_API === "1" ' +
      '&& /^https?:\\/\\/localhost:\\d+\\//.test(apiURL) ' +
      '? new URL(apiURL).pathname : apiURL}"`,',
  },
]

let source
try {
  source = readFileSync(TARGET, 'utf8')
} catch {
  console.warn('[patch-tina-cli] @tinacms/cli nicht gefunden, uebersprungen.')
  process.exit(0)
}

let changed = false
for (const patch of PATCHES) {
  if (source.includes(patch.to)) {
    console.log(`[patch-tina-cli] ${patch.name}: bereits gepatcht.`)
    continue
  }
  if (!source.includes(patch.from)) {
    console.warn(
      `[patch-tina-cli] ${patch.name}: Stelle nicht gefunden - die CLI hat sich ` +
      'geaendert. Bitte pruefen, ob der Patch noch noetig ist.'
    )
    continue
  }
  source = source.replace(patch.from, patch.to)
  changed = true
  console.log(`[patch-tina-cli] ${patch.name}: gepatcht.`)
}

if (changed) writeFileSync(TARGET, source)
