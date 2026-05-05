/**
 * Verifies every project MDX exists in BOTH `en` and `ar`.
 * Run via `pnpm check:projects:parity`.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const enDir = path.join(root, 'src', 'content', 'projects', 'en')
const arDir = path.join(root, 'src', 'content', 'projects', 'ar')

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .toSorted((a, b) => a.localeCompare(b))
}

const en = new Set(listSlugs(enDir))
const ar = new Set(listSlugs(arDir))

const missingInAr = [...en].filter((s) => !ar.has(s))
const missingInEn = [...ar].filter((s) => !en.has(s))

if (missingInAr.length === 0 && missingInEn.length === 0) {
  console.warn(`OK: ${en.size} projects present in both en and ar.`)
} else {
  if (missingInAr.length > 0) {
    console.error(`Missing in ar/ (${missingInAr.length}):`)
    for (const s of missingInAr) console.error(`  - ${s}`)
  }
  if (missingInEn.length > 0) {
    console.error(`Missing in en/ (${missingInEn.length}):`)
    for (const s of missingInEn) console.error(`  - ${s}`)
  }
  // eslint-disable-next-line unicorn/no-process-exit -- this is a CLI script; non-zero exit signals CI failure
  process.exit(1)
}
